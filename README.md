# flappy
<!doctype html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Flappy Bird – Spelet, skaparen & historien</title>
  <meta name="description" content="Startsida + spel + fakta om skaparen + historien bakom Flappy Bird – i en enda HTML-fil." />
  <style>
    :root{
      --bg: #0b1220;
      --card: rgba(255,255,255,0.06);
      --card2: rgba(255,255,255,0.10);
      --text: rgba(255,255,255,0.92);
      --muted: rgba(255,255,255,0.70);
      --line: rgba(255,255,255,0.12);
      --accent: #7dd3fc;
      --good: #86efac;
      --warn: #fbbf24;
      --shadow: 0 18px 50px rgba(0,0,0,0.55);
      --radius: 18px;
    }

    *{box-sizing:border-box}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      color:var(--text);
      background:
        radial-gradient(1200px 700px at 10% -20%, rgba(125,211,252,0.22), transparent 55%),
        radial-gradient(900px 600px at 90% 0%, rgba(134,239,172,0.18), transparent 50%),
        radial-gradient(900px 600px at 30% 110%, rgba(251,191,36,0.14), transparent 55%),
        linear-gradient(180deg, #070b14, #0b1220 45%, #060a12);
      min-height:100vh;
    }
    a{color:var(--accent); text-decoration:none}
    a:hover{text-decoration:underline}

    .container{
      width:min(1100px, 92vw);
      margin:0 auto;
      padding:28px 0 56px;
    }

    header{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:16px;
      padding:18px 18px;
      border:1px solid var(--line);
      background:linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
      border-radius:var(--radius);
      box-shadow: var(--shadow);
      position: sticky;
      top: 12px;
      backdrop-filter: blur(10px);
      z-index: 20;
    }

    @media (max-width: 880px){
      header{ position: relative; top: auto; }
    }

    .brand{
      display:flex;
      align-items:center;
      gap:12px;
      min-width: 240px;
    }
    .logo{
      width:40px;height:40px;border-radius:12px;
      background:
        radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), transparent 55%),
        linear-gradient(135deg, rgba(125,211,252,0.95), rgba(134,239,172,0.85));
      border:1px solid rgba(255,255,255,0.18);
      box-shadow: 0 12px 30px rgba(0,0,0,0.35);
      position:relative;
      overflow:hidden;
      flex: 0 0 auto;
    }
    .logo::after{
      content:"";
      position:absolute; inset:0;
      background:
        repeating-linear-gradient(90deg, rgba(0,0,0,0.18), rgba(0,0,0,0.18) 2px, transparent 2px, transparent 6px);
      opacity:0.25;
      mix-blend-mode: overlay;
    }
    .brand h1{
      font-size:14px;
      margin:0;
      letter-spacing:0.2px;
      font-weight:800;
      line-height:1.2;
    }
    .brand p{
      margin:2px 0 0;
      font-size:12px;
      color:var(--muted);
    }

    nav{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      justify-content:flex-end;
    }
    .chip{
      border:1px solid var(--line);
      background: rgba(255,255,255,0.05);
      color: var(--text);
      padding:8px 10px;
      border-radius:999px;
      font-size:12px;
      display:inline-flex;
      align-items:center;
      gap:8px;
      cursor:pointer;
      user-select:none;
      transition: transform .08s ease, background .2s ease, border-color .2s ease;
    }
    .chip:hover{
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.20);
    }
    .chip.active{
      border-color: rgba(125,211,252,0.35);
      background: rgba(125,211,252,0.10);
    }
    .chip:active{ transform: translateY(1px); }
    .dot{
      width:7px;height:7px;border-radius:99px;background:var(--accent);
      box-shadow: 0 0 0 4px rgba(125,211,252,0.12);
    }

    .card{
      border:1px solid var(--line);
      background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.04));
      border-radius:var(--radius);
      box-shadow: var(--shadow);
      overflow:hidden;
    }
    .inner{ padding:16px; }

    .page{
      display:none;
      margin-top:18px;
    }
    .page.active{ display:block; }

    .hero{
      display:grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap:16px;
      align-items:stretch;
    }
    @media (max-width: 900px){
      .hero{ grid-template-columns: 1fr; }
    }

    .title{
      display:flex; align-items:flex-start; justify-content:space-between; gap:14px;
    }
    .title h2{
      margin:0;
      font-size:18px;
      letter-spacing:0.2px;
    }
    .title p{ margin:6px 0 0; color:var(--muted); font-size:13px; line-height:1.55; }

    .grid{
      display:grid;
      grid-template-columns: 1fr;
      gap:16px;
      margin-top:16px;
    }
    @media (min-width: 900px){
      .grid{ grid-template-columns: 1fr 1fr; }
    }

    .section h3{
      margin:0 0 6px;
      font-size:16px;
      letter-spacing:0.2px;
    }
    .section p{
      margin:0;
      color:var(--muted);
      font-size:13px;
      line-height:1.6;
    }
    .bullets{
      margin:10px 0 0;
      padding-left:16px;
      color: var(--muted);
      font-size:13px;
      line-height:1.6;
    }
    .tagrow{
      display:flex;
      flex-wrap:wrap;
      gap:8px;
      margin-top:10px;
    }
    .tag{
      font-size:12px;
      color: var(--muted);
      border:1px solid var(--line);
      background: rgba(255,255,255,0.05);
      border-radius:999px;
      padding:7px 10px;
    }

    .actions{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      margin-top:12px;
    }
    button{
      border:1px solid rgba(255,255,255,0.16);
      background: rgba(255,255,255,0.08);
      color: var(--text);
      padding:10px 12px;
      border-radius:12px;
      font-size:12px;
      font-weight:800;
      cursor:pointer;
      transition: transform .08s ease, background .2s ease, border-color .2s ease;
    }
    button:hover{
      background: rgba(255,255,255,0.12);
      border-color: rgba(255,255,255,0.22);
    }
    button:active{ transform: translateY(1px); }
    button.primary{
      background: linear-gradient(135deg, rgba(125,211,252,0.35), rgba(134,239,172,0.20));
      border-color: rgba(125,211,252,0.35);
    }
    button.good{
      background: linear-gradient(135deg, rgba(134,239,172,0.25), rgba(255,255,255,0.06));
      border-color: rgba(134,239,172,0.25);
    }

    /* --- Game UI --- */
    .gameWrap{ padding: 14px 14px 16px; }
    .gameTop{
      display:flex;
      gap:10px;
      align-items:center;
      justify-content:space-between;
      flex-wrap:wrap;
      margin-bottom:10px;
    }
    .pill{
      display:inline-flex;
      gap:10px;
      align-items:center;
      border:1px solid var(--line);
      background: rgba(0,0,0,0.20);
      padding:8px 10px;
      border-radius:999px;
      font-size:12px;
      color: var(--muted);
    }
    .pill b{ color: var(--text); font-weight:900; letter-spacing:0.3px; }
    .btns{ display:flex; gap:8px; flex-wrap:wrap; }

    .canvasShell{
      border:1px solid rgba(255,255,255,0.14);
      border-radius:16px;
      background: rgba(0,0,0,0.25);
      overflow:hidden;
      position:relative;
    }
    canvas{ display:block; width:100%; height:auto; aspect-ratio: 9 / 14; }

    .overlay{
      position:absolute; inset:0;
      display:flex;
      align-items:center;
      justify-content:center;
      text-align:center;
      padding:18px;
      background: rgba(0,0,0,0.40);
      backdrop-filter: blur(6px);
    }
    .overlay.hidden{ display:none; }
    .panel{
      width:min(420px, 92%);
      border-radius:16px;
      border:1px solid rgba(255,255,255,0.16);
      background: linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05));
      padding:16px;
      box-shadow: 0 25px 70px rgba(0,0,0,0.55);
    }
    .panel h3{
      margin:0 0 8px;
      font-size:16px;
      letter-spacing:0.2px;
    }
    .panel p{ margin:0; color: var(--muted); font-size:13px; line-height:1.45; }
    .panel .row{
      display:flex; gap:10px; justify-content:center; flex-wrap:wrap;
      margin-top:12px;
    }
    .kbd{
      display:inline-flex;
      align-items:center;
      gap:8px;
      border:1px solid rgba(255,255,255,0.14);
      padding:8px 10px;
      border-radius:12px;
      background: rgba(0,0,0,0.22);
      color: var(--muted);
      font-size:12px;
    }
    .kbd span{
      color: var(--text);
      font-weight:900;
      letter-spacing:0.2px;
    }

    /* --- Creator image --- */
    .creatorRow{
      display:grid;
      grid-template-columns: 0.85fr 1.15fr;
      gap:16px;
      align-items:start;
    }
    @media (max-width: 900px){
      .creatorRow{ grid-template-columns: 1fr; }
    }
    .photo{
      border:1px solid rgba(255,255,255,0.14);
      border-radius:16px;
      overflow:hidden;
      background: rgba(0,0,0,0.25);
    }
    .photo img{
      width:100%;
      display:block;
      aspect-ratio: 16 / 10;
      object-fit: cover;
    }
    .caption{
      padding:10px 12px;
      color: var(--muted);
      font-size:12px;
      border-top:1px solid rgba(255,255,255,0.12);
      background: rgba(0,0,0,0.18);
      line-height:1.45;
    }

    footer{
      margin-top:18px;
      padding:14px 16px;
      border:1px solid var(--line);
      background: rgba(255,255,255,0.04);
      border-radius:var(--radius);
      color: var(--muted);
      font-size:12px;
      line-height:1.5;
    }
    .small{ font-size:12px; color: var(--muted); }
  </style>
</head>

<body>
  <div class="container">
    <header>
      <div class="brand">
        <div class="logo" aria-hidden="true"></div>
        <div>
          <h1>Flappy Bird – spelet, skaparen & historien</h1>
          <p>En “riktig” minisajt i en enda HTML-fil med sidkänsla och navigation.</p>
        </div>
      </div>

      <nav aria-label="Meny">
        <div class="chip" data-route="#start"><span class="dot"></span> Start</div>
        <div class="chip" data-route="#spel"><span class="dot"></span> Spelet</div>
        <div class="chip" data-route="#skaparen"><span class="dot"></span> Skaparen</div>
        <div class="chip" data-route="#historien"><span class="dot"></span> Historien</div>
      </nav>
    </header>

    <!-- STARTSIDA -->
    <section class="page" id="page-start" aria-label="Startsida">
      <div class="hero">
        <div class="card">
          <div class="inner">
            <div class="title">
              <div>
                <h2>Välkommen</h2>
                <p>
                  Den här hemsidan finns för att visa två saker: en spelbar “Flappy Bird”-inspirerad version
                  och en tydlig sammanfattning av vem som skapade originalet och varför spelet blev en global snackis.
                </p>
              </div>
            </div>

            <div class="grid">
              <div class="section">
                <h3>Vad kan man göra här?</h3>
                <p>
                  Du kan spela spelet direkt i webbläsaren, läsa om skaparen (Dong Nguyen) och förstå
                  hur ett superenkelt mobilspel kunde bli viralt på rekordtid.
                </p>
                <ul class="bullets">
                  <li>Spel: mobil + dator (tryck för att flyga)</li>
                  <li>Fakta: skaparen + bakgrund</li>
                  <li>Historik: hype, nedtagning, efterspel</li>
                </ul>
              </div>

              <div class="section">
                <h3>Varför är detta intressant?</h3>
                <p>
                  Flappy Bird är ett starkt exempel på hur enkel spelmekanik och “en gång till”-känsla kan skapa
                  enorm spridning. Det är också ett case om press, uppmärksamhet och vad som händer när något exploderar.
                </p>
                <div class="tagrow">
                  <div class="tag">Viralitet</div>
                  <div class="tag">Speldesign</div>
                  <div class="tag">Mobilhistoria</div>
                  <div class="tag">Indie-utveckling</div>
                </div>
              </div>
            </div>

            <div class="actions">
              <button class="primary" data-route="#spel">Gå till spelet</button>
              <button data-route="#skaparen">Läs om skaparen</button>
              <button data-route="#historien">Läs historien</button>
            </div>

            <p class="small" style="margin-top:10px;">
              Tips: du kan även använda webbläsarens bakåt/framåt-knappar eftersom “sidorna” använder URL (hash).
            </p>
          </div>
        </div>

        <div class="card">
          <div class="inner">
            <div class="title">
              <div>
                <h2>Snabböversikt</h2>
                <p>
                  Flappy Bird var ett mobilspel som blev en global trend runt 2014.
                  Det var enkelt att förstå men svårt att bemästra, vilket gjorde att folk fastnade.
                </p>
              </div>
            </div>

            <div class="grid" style="grid-template-columns: 1fr;">
              <div class="section">
                <h3>Hur du navigerar</h3>
                <ul class="bullets">
                  <li>Start: kort om hemsidan</li>
                  <li>Spelet: spela och sätt rekord</li>
                  <li>Skaparen: fakta + bild</li>
                  <li>Historien: tidslinje och förklaringar</li>
                </ul>
              </div>

              <div class="section">
                <h3>Kontroller i spelet</h3>
                <ul class="bullets">
                  <li>Dator: Mellanslag eller klick</li>
                  <li>Mobil: tryck på skärmen</li>
                  <li>P: pausa</li>
                  <li>R: starta om</li>
                </ul>
              </div>
            </div>

            <div class="actions">
              <button class="good" data-route="#spel">Starta och spela</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SPEL -->
    <section class="page" id="page-spel" aria-label="Spelet">
      <div class="card">
        <div class="gameWrap">
          <div class="gameTop">
            <div class="pill" title="Poäng">
              Poäng: <b id="score">0</b> • Bästa: <b id="best">0</b>
            </div>
            <div class="btns">
              <button class="primary" id="startBtn">Starta</button>
              <button id="restartBtn">Starta om</button>
              <button id="pauseBtn">Pausa</button>
              <button id="backToStartBtn">Till startsidan</button>
            </div>
          </div>

          <div class="canvasShell">
            <canvas id="game" width="450" height="700" aria-label="Flappy Bird-inspirerat spel"></canvas>

            <div class="overlay" id="startOverlay">
              <div class="panel">
                <h3>Tryck för att flyga</h3>
                <p>
                  Dator: <b>MELLANSLAG</b> eller klick.<br/>
                  Mobil: tryck på skärmen.
                </p>
                <div class="row">
                  <div class="kbd">Kontroll: <span>Space</span> / <span>Tap</span></div>
                  <button class="primary" id="overlayStart">Starta spelet</button>
                </div>
                <p class="small" style="margin-top:10px;">
                  Tips: små, jämna tryck är bättre än paniktryck.
                </p>
              </div>
            </div>

            <div class="overlay hidden" id="gameOverOverlay">
              <div class="panel">
                <h3>Game Over</h3>
                <p>Du kraschade. Vill du försöka igen?</p>
                <div class="row">
                  <div class="kbd">Poäng: <span id="finalScore">0</span></div>
                  <button class="primary" id="overlayRestart">Starta om</button>
                </div>
              </div>
            </div>
          </div>

          <div class="tagrow" aria-label="Info">
            <div class="tag">Canvas • Ingen backend</div>
            <div class="tag">Mobilvänlig</div>
            <div class="tag">Poäng + Bästa</div>
            <div class="tag">Paus + Restart</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SKAPAREN -->
    <section class="page" id="page-skaparen" aria-label="Skaparen">
      <div class="card">
        <div class="inner">
          <div class="title">
            <div>
              <h2>Skaparen</h2>
              <p>
                Flappy Bird skapades av den vietnamesiske utvecklaren <b>Dong Nguyen</b> (Nguyễn Hà Đông),
                via hans indie-studio <b>.Gears</b>. Spelet visar hur en enkel idé kan bli ett globalt fenomen.
              </p>
            </div>
          </div>

          <div class="creatorRow" style="margin-top:12px;">
            <div class="photo">
              <!-- Bildkälla: ABC News (direktlänk till bild) -->
              <img
                src="https://s.abcnews.com/images/Technology/gty_flappy_bird_nguyen_ha_dong_wy_140211_16x9_992.jpg?w=1200"
                alt="Dong Nguyen i en kaffebar i Hanoi (2014)"
                loading="lazy"
              />
              <div class="caption">
                Dong Nguyen (2014). Foto används här som illustration. Källa: ABC News / AFP/Getty.
              </div>
            </div>

            <div class="section">
              <h3>Vem är han?</h3>
              <p>
                Dong Nguyen är en indie-utvecklare från Vietnam. Han har beskrivit att han gillar en minimalistisk
                designfilosofi: ett spel, en tydlig idé, och sedan finslipa känslan tills det blir “tight”.
              </p>

              <ul class="bullets">
                <li>Indie-utvecklare (små team/solo)</li>
                <li>Skapade Flappy Bird 2013</li>
                <li>Studio: .Gears</li>
              </ul>

              <h3 style="margin-top:12px;">Varför han blev känd</h3>
              <p>
                När spelet toppade listor och spreds viralt blev han snabbt en central person i nyheter och sociala medier.
                Det ökade trycket runt spelet är en del av berättelsen.
              </p>

              <div class="actions">
                <button class="primary" data-route="#spel">Spela spelet</button>
                <button data-route="#historien">Gå till historien</button>
                <button data-route="#start">Till startsidan</button>
              </div>
            </div>
          </div>

          <div class="tagrow" style="margin-top:12px;">
            <div class="tag">Indie</div>
            <div class="tag">.Gears</div>
            <div class="tag">Viral framgång</div>
            <div class="tag">Mobilspel</div>
          </div>
        </div>
      </div>
    </section>

    <!-- HISTORIEN -->
    <section class="page" id="page-historien" aria-label="Historien">
      <div class="card">
        <div class="inner">
          <div class="title">
            <div>
              <h2>Historien bakom Flappy Bird</h2>
              <p>
                Flappy Bird släpptes 2013 men blev en “sleeper hit” som exploderade i början av 2014.
                Spelets enkelhet + höga svårighetsgrad gjorde att folk delade klipp, reaktioner och rekordförsök.
              </p>
            </div>
          </div>

          <div class="grid">
            <div class="section">
              <h3>Varför spelet fastnade</h3>
              <p>
                Spelet har en extremt tydlig loop: du dör snabbt, startar om direkt och känner att “nästa gång går det”.
                Den här typen av friktion + korta rundor kan skapa stark motivation att försöka igen.
              </p>
              <ul class="bullets">
                <li>Korta försök (snabb feedback)</li>
                <li>Enkel kontroll (1 knapp / 1 tryck)</li>
                <li>Svårt att bemästra (precision)</li>
              </ul>
            </div>

            <div class="section">
              <h3>En förenklad tidslinje</h3>
              <ul class="bullets">
                <li><b>2013:</b> Spelet släpps på iOS.</li>
                <li><b>Jan 2014:</b> Stiger snabbt på topplistor och blir viralt.</li>
                <li><b>Feb 2014:</b> Skaparen tar ned spelet från appbutikerna.</li>
                <li><b>Efteråt:</b> Flappy Bird blir ett internetfenomen och inspirerar många kopior.</li>
              </ul>
              <p class="small" style="margin-top:10px;">
                Den här hemsidan är en skol-/projektvänlig sammanfattning med en spelbar inspirerad variant.
              </p>
            </div>
          </div>

          <div class="section" style="margin-top:12px;">
            <h3>Vad man kan lära sig av caset</h3>
            <p>
              Flappy Bird visar hur speldesign inte alltid handlar om “mest content”, utan om känsla, tempo och tydliga regler.
              Samtidigt är det ett case om press, uppmärksamhet och hur snabbt något kan skala bortom vad skaparen tänkt.
            </p>
            <div class="actions">
              <button class="primary" data-route="#spel">Gå till spelet</button>
              <button data-route="#skaparen">Till skaparen</button>
              <button data-route="#start">Till startsidan</button>
            </div>
          </div>

          <div class="tagrow" style="margin-top:12px;">
            <div class="tag">Spel-loop</div>
            <div class="tag">Svårighetskurva</div>
            <div class="tag">Viralitet</div>
            <div class="tag">Kulturfenomen</div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <b>Google Sites:</b> Om du vill bädda in detta i Google Sites behöver du normalt publicera filen som en statisk sida (t.ex. GitHub Pages)
      och sedan använda <i>Infoga → Bädda in → URL</i>. Att klistra in hela HTML som “Embed code” kan blockera script (spelet).
    </footer>
  </div>

  <script>
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
      document.querySelectorAll("nav .chip").forEach(ch => {
        ch.classList.toggle("active", ch.getAttribute("data-route") === hash);
      });
    }

    function showPage(hash){
      if (!routes[hash]) hash = "#start";
      const pageId = routes[hash];

      document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
      const page = document.getElementById(pageId);
      if (page) page.classList.add("active");

      setActiveNav(hash);

      // Pausa spelet om man lämnar spelsidan
      if (hash !== "#spel") gameSetSoftPaused(true);
      if (hash === "#spel") gameSetSoftPaused(false);
    }

    function go(hash){
      if (!routes[hash]) hash = "#start";
      if (location.hash !== hash) location.hash = hash;
      else showPage(hash);
    }

    document.querySelectorAll("[data-route]").forEach(el => {
      el.addEventListener("click", () => go(el.getAttribute("data-route")));
    });

    window.addEventListener("hashchange", () => showPage(location.hash));

    // Standard-route
    if (!location.hash) location.hash = "#start";
    showPage(location.hash);

    // =========================
    // FLAPPY-STYLE GAME (canvas)
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
    const backToStartBtn = document.getElementById("backToStartBtn");

    backToStartBtn.addEventListener("click", () => go("#start"));

    const STORAGE_KEY = "flappy_history_best_v2";
    let bestScore = Number(localStorage.getItem(STORAGE_KEY) || 0);
    bestEl.textContent = bestScore;

    // Canvas scaling (HiDPI)
    function fitCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const w = Math.round(rect.width * dpr);
      const h = Math.round((rect.width * (700/450)) * dpr); // keep ratio
      canvas.width = w;
      canvas.height = h;
    }
    window.addEventListener("resize", fitCanvas);
    setTimeout(fitCanvas, 50);

    // Game state
    let running = false;
    let paused = false;
    let softPaused = false; // auto-paus när man byter “sida”
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

    function gameSetSoftPaused(val){
      softPaused = !!val;
    }

    function resetGame() {
      state.t = 0;
      state.speed = 2.6;
      state.gravity = 0.55;
      state.flap = -9.2;
      state.gap = 160;
      state.pipeW = 78;
      state.pipeEvery = 105;
      state.score = 0;
      state.pipes = [];
      state.bird.x = canvas.width * 0.28;
      state.bird.y = canvas.height * 0.42;
      state.bird.vy = 0;
      state.bird.r = Math.max(14, Math.min(18, canvas.width * 0.035));

      scoreEl.textContent = "0";
      gameOver = false;
      paused = false;
      pauseBtn.textContent = "Pausa";

      startOverlay.classList.add("hidden");
      gameOverOverlay.classList.add("hidden");
    }

    function setGameOver() {
      running = false;
      gameOver = true;
      finalScoreEl.textContent = state.score;

      if (state.score > bestScore) {
        bestScore = state.score;
        localStorage.setItem(STORAGE_KEY, String(bestScore));
        bestEl.textContent = bestScore;
      }
      gameOverOverlay.classList.remove("hidden");
    }

    function spawnPipe() {
      const marginTop = 60;
      const marginBottom = state.groundH + 80;
      const available = canvas.height - marginTop - marginBottom - state.gap;
      const topH = marginTop + Math.random() * Math.max(60, available);
      state.pipes.push({ x: canvas.width + state.pipeW, topH, passed: false });
    }

    function flap() {
      // Bara reagera om man är på spelsidan
      if (location.hash !== "#spel") return;

      if (!running && !gameOver) startGame();
      if (gameOver) return;
      if (paused || softPaused) return;
      state.bird.vy = state.flap;
    }

    function startGame() {
      resetGame();
      running = true;
      startOverlay.classList.add("hidden");
    }

    function restartGame() {
      resetGame();
      running = true;
    }

    function togglePause() {
      if (gameOver) return;
      if (!running) return;
      paused = !paused;
      pauseBtn.textContent = paused ? "Fortsätt" : "Pausa";
    }

    // Buttons
    startBtn.addEventListener("click", () => { if (!running) startGame(); });
    restartBtn.addEventListener("click", () => restartGame());
    pauseBtn.addEventListener("click", () => togglePause());
    overlayStart.addEventListener("click", () => startGame());
    overlayRestart.addEventListener("click", () => restartGame());

    // Keyboard
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") { e.preventDefault(); flap(); }
      if (e.code === "KeyP") { e.preventDefault(); if (location.hash === "#spel") togglePause(); }
      if (e.code === "KeyR") { e.preventDefault(); if (location.hash === "#spel") restartGame(); }
    }, { passive:false });

    // Touch/click on canvas
    canvas.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      flap();
    }, { passive:false });

    // Drawing helpers
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

    function drawBackground() {
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

    function drawGround() {
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

    function drawPipes() {
      const pipeColor = "rgba(125,211,252,0.22)";
      const pipeEdge  = "rgba(255,255,255,0.20)";
      const pipeDark  = "rgba(0,0,0,0.25)";

      for (const p of state.pipes) {
        const x = p.x;
        const topH = p.topH;
        const gap = state.gap;
        const yTop = 0;
        const yBottom = topH + gap;
        const bottomH = (canvas.height - state.groundH) - yBottom;

        ctx.fillStyle = pipeColor;
        roundRect(x, yTop, state.pipeW, topH, 14);
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

    function drawBird() {
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

      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(b.r*0.75, b.r*0.10);
      ctx.lineTo(b.r*1.35, b.r*0.02);
      ctx.lineTo(b.r*0.78, b.r*0.30);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    function drawHUD() {
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      roundRect(10, 10, 190, 30, 10);
      ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = `700 ${Math.max(12, canvas.width*0.03)}px system-ui, sans-serif`;
      ctx.fillText(`Space/Tap • P=paus • R=om`, 18, 31);
      ctx.globalAlpha = 1;
    }

    function collidePipe(p) {
      const b = state.bird;
      const bx = b.x, by = b.y, br = b.r;
      const px = p.x, pw = state.pipeW;
      const topH = p.topH;
      const gap = state.gap;
      const bottomY = topH + gap;
      const playBottom = canvas.height - state.groundH;

      const withinX = (bx + br > px) && (bx - br < px + pw);
      if (!withinX) return false;

      if (by - br < topH) return true;
      if (by + br > bottomY && by + br < playBottom + br) return true;

      return false;
    }

    function step() {
      state.t++;

      const canRun = running && !paused && !softPaused && (location.hash === "#spel");

      if (canRun) {
        state.speed = Math.min(5.0, state.speed + 0.0009);
        state.gap = Math.max(130, state.gap - 0.003);
        if (state.t % state.pipeEvery === 0) spawnPipe();

        state.bird.vy += state.gravity;
        state.bird.y  += state.bird.vy;

        for (const p of state.pipes) p.x -= state.speed;
        state.pipes = state.pipes.filter(p => p.x + state.pipeW > -40);

        for (const p of state.pipes) {
          const passX = p.x + state.pipeW;
          if (!p.passed && passX < state.bird.x - state.bird.r) {
            p.passed = true;
            state.score++;
            scoreEl.textContent = String(state.score);
          }
        }

        const ceiling = 0;
        const groundY = canvas.height - state.groundH;
        if (state.bird.y - state.bird.r < ceiling) {
          state.bird.y = ceiling + state.bird.r;
          state.bird.vy = 0;
        }
        if (state.bird.y + state.bird.r > groundY) {
          state.bird.y = groundY - state.bird.r;
          setGameOver();
        }

        for (const p of state.pipes) {
          if (collidePipe(p)) { setGameOver(); break; }
        }
      }

      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawBackground();
      drawPipes();
      drawGround();
      drawBird();
      drawHUD();

      if (!running && !gameOver) startOverlay.classList.remove("hidden");
      if (location.hash !== "#spel") startOverlay.classList.add("hidden"); // göm overlays när man inte är i spelet

      requestAnimationFrame(step);
    }

    // Init
    resetGame();
    running = false;
    startOverlay.classList.add("hidden");
    requestAnimationFrame(step);
  </script>
</body>
</html>
