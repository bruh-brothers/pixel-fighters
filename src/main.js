import { GameStates } from './states.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let state = GameStates.TITLE;
let selection = {
  player1: null,
  player2: null,
  arena: null,
  step: 1,
};

function nextState() {
  if (state === GameStates.TITLE) {
    state = GameStates.CHAR_SELECT;
    selection.step = 1;
    selection.player1 = null;
    selection.player2 = null;
  } else if (state === GameStates.CHAR_SELECT && selection.step === 1 && selection.player1) {
    selection.step = 2;
  } else if (state === GameStates.CHAR_SELECT && selection.step === 2 && selection.player2) {
    state = GameStates.ARENA_SELECT;
  } else if (state === GameStates.ARENA_SELECT && selection.arena) {
    state = GameStates.READY;
  }
  draw();
}

canvas.addEventListener('mousedown', handleClick);
window.addEventListener('keydown', e => {
  // Enter key to start or confirm
  if (e.key === 'Enter') nextState();
});

function handleClick(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  window.handleStateClick(state, selection, mx, my, nextState, draw);
}

function draw() {
  window.drawState(ctx, canvas, state, selection);
}

window.onload = () => {
  draw();
};

export { canvas, ctx, state, selection, nextState, draw };
