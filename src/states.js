export const GameStates = {
  TITLE: 0,
  CHAR_SELECT: 1,
  ARENA_SELECT: 2,
  READY: 3
};

const characters = [
  {
    key: "rex",
    name: "Rex",
    img: "assets/images/characters/rex/rex.png",
    stats: { atk: 5, hp: 3, spd: 2 }
  },
  {
    key: "jet",
    name: "Jet",
    img: "assets/images/characters/jet/jet.png",
    stats: { atk: 2, hp: 3, spd: 5 }
  },
  {
    key: "bruno",
    name: "Bruno",
    img: "assets/images/characters/bruno/bruno.png",
    stats: { atk: 4, hp: 5, spd: 1 }
  },
  {
    key: "luna",
    name: "Luna",
    img: "assets/images/characters/luna/luna.png",
    stats: { atk: 4, hp: 2, spd: 4 }
  }
];

const arenas = [
  { key: "desert", name: "Desert Valley", img: "assets/images/maps/desert_valley/desert_valley.png" },
  { key: "glacier", name: "Glacier Falls", img: "assets/images/maps/glacier_falls/glacier_falls.png" },
  { key: "forest", name: "Forest Park", img: "assets/images/maps/forest_park/forest_park.png" },
  { key: "coliseum", name: "Coliseum of Valor", img: "assets/images/maps/coliseum_valor/coliseum_valor.png" }
];

// Draw functions
window.drawState = function(ctx, canvas, state, selection) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (state === GameStates.TITLE) {
    let img = new window.Image();
    img.src = "assets/images/pxf.png";
    img.onload = () => {
      ctx.fillStyle = "#181818";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, (canvas.width-img.width)/2, 60);
      ctx.font = "bold 32px sans-serif";
      ctx.fillStyle = "#ffd700";
      ctx.textAlign = "center";
      ctx.fillText("PIXEL FIGHTERS", canvas.width/2, 60+img.height+40);
      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.fillText("Press ENTER or click START", canvas.width/2, canvas.height-80);
      // Draw start button
      ctx.fillStyle = "#ffd700";
      ctx.fillRect(canvas.width/2-100, canvas.height-60, 200, 40);
      ctx.font = "bold 22px sans-serif";
      ctx.fillStyle = "#222";
      ctx.fillText("START", canvas.width/2, canvas.height-32);
    };
  }
  else if (state === GameStates.CHAR_SELECT) {
    ctx.fillStyle = "#161a24";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let step = selection.step;
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#ffd700";
    ctx.textAlign = "center";
    ctx.fillText(`Player ${step} - Select Your Fighter`, canvas.width/2, 50);

    let charW = 140, charH = 210, gap = 40;
    let startX = (canvas.width - (4*charW + 3*gap))/2;
    let y = 110;

    characters.forEach((char, i) => {
      let x = startX + i*(charW+gap);
      ctx.fillStyle = "#232626";
      ctx.fillRect(x, y, charW, charH);
      let img = new window.Image();
      img.src = char.img;
      img.onload = () => {
        ctx.drawImage(img, x+20, y+10, 100, 100);
      };
      ctx.font = "bold 18px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.fillText(char.name, x+charW/2, y+125);
      ctx.font = "16px monospace";
      ctx.fillStyle = "#ffd700";
      ctx.fillText("ATK " + "★".repeat(char.stats.atk), x+charW/2, y+150);
      ctx.fillText("HP  " + "★".repeat(char.stats.hp), x+charW/2, y+175);
      ctx.fillText("SPD " + "★".repeat(char.stats.spd), x+charW/2, y+200);

      // Highlight box if selected
      if ((step === 1 && selection.player1 && selection.player1.key === char.key) ||
          (step === 2 && selection.player2 && selection.player2.key === char.key)) {
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 4;
        ctx.strokeRect(x-2, y-2, charW+4, charH+4);
      }
      // Grey out if taken by other player
      if ((step === 2 && selection.player1 && selection.player1.key === char.key)) {
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(x, y, charW, charH);
        ctx.font = "bold 20px sans-serif";
        ctx.fillStyle = "#aaa";
        ctx.fillText("PICKED", x+charW/2, y+charH-18);
      }
    });

    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Click a character, then press ENTER to continue", canvas.width/2, canvas.height-32);
  }
  else if (state === GameStates.ARENA_SELECT) {
    ctx.fillStyle = "#181818";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#ffd700";
    ctx.textAlign = "center";
    ctx.fillText("Select Arena", canvas.width/2, 50);

    let boxW = 160, boxH = 150, gap = 40, startX = (canvas.width - (4*boxW + 3*gap))/2, y = 120;
    arenas.forEach((arena, i) => {
      let x = startX + i*(boxW+gap);
      ctx.fillStyle = "#222";
      ctx.fillRect(x, y, boxW, boxH);
      let img = new window.Image();
      img.src = arena.img;
      img.onload = () => {
        ctx.drawImage(img, x+16, y+12, 128, 80);
      };
      ctx.font = "18px monospace";
      ctx.fillStyle = "#fff";
      ctx.fillText(arena.name, x+boxW/2, y+110);

      // Selected highlight
      if (selection.arena && selection.arena.key === arena.key) {
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 4;
        ctx.strokeRect(x-2, y-2, boxW+4, boxH+4);
      }
    });
    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Click an arena, then press ENTER to begin", canvas.width/2, canvas.height-32);
  }
  else if (state === GameStates.READY) {
    ctx.fillStyle = "#232626";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#ffd700";
    ctx.textAlign = "center";
    ctx.fillText("Get Ready!", canvas.width/2, canvas.height/2-40);
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Gameplay coming soon...", canvas.width/2, canvas.height/2+16);
  }
};

// Click logic
window.handleStateClick = function(state, selection, mx, my, nextState, draw) {
  if (state === GameStates.TITLE) {
    // Start button
    if (mx >= 300 && mx <= 500 && my >= 420 && my <= 460) nextState();
  }
  else if (state === GameStates.CHAR_SELECT) {
    let charW = 140, charH = 210, gap = 40;
    let startX = (800 - (4*charW + 3*gap))/2;
    let y = 110;
    for (let i=0; i<characters.length; ++i) {
      let x = startX + i*(charW+gap);
      if (mx >= x && mx <= x+charW && my >= y && my <= y+charH) {
        // Prevent duplicate pick for player 2
        if (selection.step === 2 && selection.player1 && selection.player1.key === characters[i].key) return;
        if (selection.step === 1) selection.player1 = characters[i];
        else selection.player2 = characters[i];
        draw();
        return;
      }
    }
  }
  else if (state === GameStates.ARENA_SELECT) {
    let boxW = 160, boxH = 150, gap = 40, startX = (800 - (4*boxW + 3*gap))/2, y = 120;
    for (let i=0; i<arenas.length; ++i) {
      let x = startX + i*(boxW+gap);
      if (mx >= x && mx <= x+boxW && my >= y && my <= y+boxH) {
        selection.arena = arenas[i];
        draw();
        return;
      }
    }
  }
};
