// =========================
// ROUTER (hash-baserade “sidor”)
// =========================
const routes = {
  "#start": "page-start",
  "#spel": "page-spel",
  "#skaparen": "page-skaparen",
  "#historien": "page-historien"
};

function setActiveNav(hash){
  document.querySelectorAll(".chip").forEach(ch => {
    ch.classList.toggle("active", ch.getAttribute("data-route") === hash);
  });
}

function go(hash){
  if (!routes[hash]) hash = "#start";
  if (location.hash !== hash) location.hash = hash;
  else showPage(hash);
}

document.querySelectorAll("[data-route]").forEach(el => {
  el.addEventListener("click", () => go(el.getAttribute("data-route")));
});

function showPage(hash){
  if (!routes[hash]) hash = "#start";
  const pageId = routes[hash];

  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const page = document.getElementById(pageId);
  if (page) page.classList.add("active");

  setActiveNav(hash);

  // auto-paus när man lämnar spelet
  if (hash !== "#spel") softPaused = true;

  // när man går IN på spelet: resiza canvas när den är synlig
  if (hash === "#spel") {
    softPaused = false;
    const ok = fitCanvas();
    if (!ok) setTimeout(() => { fitCanvas(); syncBirdToCanvas(); }, 80);
    syncBirdToCanvas();
  }
}

window.addEventListener("hashchange", () => showPage(location.hash));
if (!location.hash) location.hash = "#start";
showPage(location.hash);

// =========================
// FLAPPY-STYLE GAME
// =========================
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestEl  = document.getElementById("best");

const startOverlay = document.getElementById("startOverlay");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const finalScoreEl = document.getElementById("finalScore");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const pauseBtn = document.getElementById("pauseBtn");
const overlayStart = document.getElementById("overlayStart");
const overlayRestart = document.getElementById("overlayRestart");

const STORAGE_KEY = "flappy_site_best_v1";
let bestScore = Number(localStorage.getItem(STORAGE_KEY) || 0);
bestEl.textContent = bestScore;

let running = false;
let paused = false;
let softPaused = true;
let gameOver = false;

const state = {
  t: 0,
  speed: 2.6,
  gravity: 0.55,
  flap: -9.2,
  gap: 160,
  pipeW: 78,
  pipeEvery: 105,
  groundH: 78,
  score: 0,
  pipes: [],
  bird: { x: 0, y: 0, vy: 0, r: 16 }
};

// Viktigt: canvas kan vara "dold" på startsidan. Då blir rect.width=0.
// Denna returnerar false om canvas inte går att resiza just nu.
function fitCanvas(){
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || rect.width < 10) return false;

  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const w = Math.round(rect.width * dpr);
  const h = Math.round((rect.width * (700/450)) * dpr);
  canvas.width = w;
  canvas.height = h;
  return true;
}

function syncBirdToCanvas(){
  state.bird.x = canvas.width * 0.28;
  if (!state.bird.y || state.bird.y < 10) state.bird.y = canvas.height * 0.42;
  state.bird.y = Math.min(state.bird.y, canvas.height * 0.70);
  state.bird.r = Math.max(14, Math.min(18, canvas.width * 0.035));
}

window.addEventListener("resize", () => {
  if (location.hash === "#spel") {
    const ok = fitCanvas();
    if (ok) syncBirdToCanvas();
  }
});

function resetGame(){
  state.t = 0;
  state.speed = 2.6;
  state.gap = 160;
  state.score = 0;
  state.pipes = [];
  syncBirdToCanvas();
  state.bird.vy = 0;

  scoreEl.textContent = "0";
  paused = false;
  gameOver = false;
  pauseBtn.textContent = "Pausa";

  startOverlay.classList.remove("hidden");
  gameOverOverlay.classList.add("hidden");
}

function setGameOver(){
  running = false;
  gameOver = true;
  finalScoreEl.textContent = state.score;

  if (state.score > bestScore){
    bestScore = state.score;
    localStorage.setItem(STORAGE_KEY, String(bestScore));
    bestEl.textContent = bestScore;
  }
  gameOverOverlay.classList.remove("hidden");
}

function spawnPipe(){
  const marginTop = 60;
  const marginBottom = state.groundH + 80;
  const available = canvas.height - marginTop - marginBottom - state.gap;
  const topH = marginTop + Math.random() * Math.max(60, available);
  state.pipes.push({ x: canvas.width + state.pipeW, topH, passed:false });
}

function startGame(){
  // säkerställ canvas storlek när spelet startar
  if (location.hash === "#spel") {
    const ok = fitCanvas();
    if (!ok) setTimeout(() => { fitCanvas(); syncBirdToCanvas(); }, 80);
    syncBirdToCanvas();
  }
  resetGame();
  running = true;
  startOverlay.classList.add("hidden");
}

function restartGame(){ startGame(); }

function togglePause(){
  if (!running || gameOver) return;
  paused = !paused;
  pauseBtn.textContent = paused ? "Fortsätt" : "Pausa";
}

function flap(){
  if (location.hash !== "#spel") return;
  if (!running && !gameOver) startGame();
  if (paused || softPaused || gameOver) return;
  state.bird.vy = state.flap;
}

startBtn.addEventListener("click", () => { if (!running) startGame(); });
restartBtn.addEventListener("click", restartGame);
pauseBtn.addEventListener("click", togglePause);
overlayStart.addEventListener("click", startGame);
overlayRestart.addEventListener("click", restartGame);

window.addEventListener("keydown", (e) => {
  if (e.code === "Space"){ e.preventDefault(); flap(); }
  if (e.code === "KeyP"){ e.preventDefault(); if (location.hash==="#spel") togglePause(); }
  if (e.code === "KeyR"){ e.preventDefault(); if (location.hash==="#spel") restartGame(); }
}, { passive:false });

canvas.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  flap();
}, { passive:false });

function roundRect(x,y,w,h,r){
  const rr = Math.min(r, w/2, h/2);
  ctx.beginPath();
  ctx.moveTo(x+rr, y);
  ctx.arcTo(x+w, y, x+w, y+h, rr);
  ctx.arcTo(x+w, y+h, x, y+h, rr);
  ctx.arcTo(x, y+h, x, y, rr);
  ctx.arcTo(x, y, x+w, y, rr);
  ctx.closePath();
}

function drawBackground(){
  const g = ctx.createLinearGradient(0,0,0,canvas.height);
  g.addColorStop(0, "rgba(125,211,252,0.18)");
  g.addColorStop(0.55, "rgba(255,255,255,0.02)");
  g.addColorStop(1, "rgba(0,0,0,0.25)");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.globalAlpha = 0.18;
  for (let i=0;i<28;i++){
    const x = (i*97 + (state.t*0.2)) % canvas.width;
    const y = (i*53) % (canvas.height*0.65);
    ctx.beginPath();
    ctx.arc(x, y, 1.3, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.globalAlpha = 0.20;
  ctx.fillStyle = "rgba(134,239,172,0.55)";
  ctx.beginPath();
  const baseY = canvas.height - state.groundH - 38;
  ctx.moveTo(0, baseY);
  for (let x=0; x<=canvas.width; x+=30){
    const y = baseY - 18*Math.sin((x+state.t*1.1)/90) - 9*Math.sin((x+state.t*0.9)/44);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawGround(){
  const y = canvas.height - state.groundH;
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, y, canvas.width, state.groundH);
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(0, y, canvas.width, 2);

  ctx.globalAlpha = 0.18;
  const stripeW = 26;
  const offset = (state.t * state.speed * 2) % (stripeW*2);
  for (let x=-offset; x<canvas.width+stripeW*2; x+=stripeW*2){
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillRect(x, y+16, stripeW, 10);
  }
  ctx.globalAlpha = 1;
}

function drawPipes(){
  const pipeColor = "rgba(125,211,252,0.22)";
  const pipeEdge  = "rgba(255,255,255,0.20)";
  const pipeDark  = "rgba(0,0,0,0.25)";

  for (const p of state.pipes){
    const x = p.x;
    const topH = p.topH;
    const gap = state.gap;
    const yBottom = topH + gap;
    const bottomH = (canvas.height - state.groundH) - yBottom;

    ctx.fillStyle = pipeColor;
    roundRect(x, 0, state.pipeW, topH, 14);
    ctx.fill();

    ctx.fillStyle = pipeColor;
    roundRect(x, yBottom, state.pipeW, bottomH, 14);
    ctx.fill();

    ctx.strokeStyle = pipeEdge;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = pipeDark;
    roundRect(x-6, topH-22, state.pipeW+12, 22, 12);
    ctx.fill();

    ctx.fillStyle = pipeDark;
    roundRect(x-6, yBottom, state.pipeW+12, 22, 12);
    ctx.fill();
  }
}

function drawBird(){
  const b = state.bird;
  ctx.save();
  ctx.translate(b.x, b.y);
  const tilt = Math.max(-0.6, Math.min(0.8, b.vy / 12));
  ctx.rotate(tilt);

  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.ellipse(4, 10, b.r*0.85, b.r*0.55, 0, 0, Math.PI*2);
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fill();
  ctx.globalAlpha = 1;

  const g = ctx.createLinearGradient(-b.r, -b.r, b.r, b.r);
  g.addColorStop(0, "rgba(251,191,36,0.95)");
  g.addColorStop(1, "rgba(125,211,252,0.75)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, b.r, 0, Math.PI*2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.20)";
  ctx.beginPath();
  ctx.ellipse(-3, 2, b.r*0.55, b.r*0.35, 0.3, 0, Math.PI*2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();
  ctx.arc(b.r*0.35, -b.r*0.18, b.r*0.28, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.beginPath();
  ctx.arc(b.r*0.42, -b.r*0.16, b.r*0.12, 0, Math.PI*2);
  ctx.fill();

  ctx.restore();
}

function collidePipe(p){
  const b = state.bird;
  const bx=b.x, by=b.y, br=b.r;
  const px=p.x, pw=state.pipeW;
  const topH=p.topH;
  const bottomY=topH + state.gap;
  const groundY=canvas.height - state.groundH;

  const withinX = (bx + br > px) && (bx - br < px + pw);
  if (!withinX) return false;

  if (by - br < topH) return true;
  if (by + br > bottomY && by + br < groundY + br) return true;
  return false;
}

function step(){
  state.t++;

  const canRun = running && !paused && !softPaused && (location.hash === "#spel");

  if (canRun){
    state.speed = Math.min(5.0, state.speed + 0.0009);
    state.gap = Math.max(130, state.gap - 0.003);

    if (state.t % state.pipeEvery === 0) spawnPipe();

    state.bird.vy += state.gravity;
    state.bird.y  += state.bird.vy;

    for (const p of state.pipes) p.x -= state.speed;
    state.pipes = state.pipes.filter(p => p.x + state.pipeW > -40);

    for (const p of state.pipes){
      const passX = p.x + state.pipeW;
      if (!p.passed && passX < state.bird.x - state.bird.r){
        p.passed = true;
        state.score++;
        scoreEl.textContent = String(state.score);
      }
    }

    const groundY = canvas.height - state.groundH;
    if (state.bird.y + state.bird.r > groundY){
      state.bird.y = groundY - state.bird.r;
      setGameOver();
    }

    for (const p of state.pipes){
      if (collidePipe(p)){ setGameOver(); break; }
    }
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawBackground();
  drawPipes();
  drawGround();
  drawBird();

  if (location.hash !== "#spel"){
    startOverlay.classList.add("hidden");
    gameOverOverlay.classList.add("hidden");
  } else {
    if (!running && !gameOver) startOverlay.classList.remove("hidden");
  }

  requestAnimationFrame(step);
}

function setGameOver(){
  running = false;
  gameOver = true;

  finalScoreEl.textContent = state.score;
  if (state.score > bestScore){
    bestScore = state.score;
    localStorage.setItem(STORAGE_KEY, String(bestScore));
    bestEl.textContent = bestScore;
  }
  gameOverOverlay.classList.remove("hidden");
}

// Init: ge canvas en default så ritningen funkar även när den är dold
canvas.width = 450;
canvas.height = 700;
syncBirdToCanvas();
resetGame();
requestAnimationFrame(step);
