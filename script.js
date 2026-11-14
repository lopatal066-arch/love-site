const CONFIG = {
  herName: "Малышка",
  myName: "самый любящий",
  since: "2024-02-14T00:00:00",
  fallbackNote: "…и каждый следующий день только лучше.",
  reasons: [
    { emoji: "🌸", title: "За твою улыбку", text: "Она вызывает у меня бабочек даже в самый скучный день." },
    { emoji: "☕", title: "За уют", text: "С тобой даже обычный вечер становится лучшим в неделе." },
    { emoji: "🧸", title: "За заботу", text: "Ты замечаешь мелочи, которые я сам не замечаю." },
    { emoji: "😂", title: "За смех", text: "Твои шутки, даже самые плохие, для меня самые смешные." },
    { emoji: "💫", title: "За то, что ты есть", text: "Без пафоса: с тобой мне спокойно, тепло и по-настоящему хорошо." }
  ],
  heartMessages: [
    "Я тебя люблю 💗",
    "Ты моя самая любимая 🌸",
    "Ещё один поцелуй в щёчку 😚",
    "Ты — лучшее, что со мной случилось ✨",
    "Спасибо, что ты рядом 💞"
  ],
  quiz: [
    { q: "Кто самый красивый человек в интернете?", opts: ["Ты", "Тоже ты", "Ну конечно ты 💗"] },
    { q: "Сколько раз в день я о тебе думаю?", opts: ["Много", "Очень много", "Бесконечно"] },
    { q: "Что я выберу на ужин?", opts: ["Что ты захочешь", "Что ты захочешь", "Что ты захочешь"] },
    { q: "Насколько сильно я тебя люблю?", opts: ["Сильно", "Очень сильно", "Больше, чем можно измерить"] }
  ]
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  buildPetals();
  buildReasons();
  startClock();
  setupReveal();
  setupTabs();
  setupCatch();
  setupMemory();
  setupQuiz();
  setupLetter();
  setupMusic();
  setupBigHeart();
  $("#startBtn").addEventListener("click", () => {
    $(".counter").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function applyConfig() {
  $$("[data-name]").forEach((el) => { el.textContent = CONFIG.herName; });
  $$("[data-myname]").forEach((el) => { el.textContent = CONFIG.myName; });
  document.title = `Для тебя, ${CONFIG.herName} ♥`;
}

function buildPetals() {
  const box = $("#petals");
  const emojis = ["🌸", "💗", "🌷", "✨", "💕", "🦋", "💖"];
  const count = window.innerWidth < 600 ? 12 : 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = Math.random() * 100 + "vw";
    p.style.fontSize = 12 + Math.random() * 16 + "px";
    p.style.animationDuration = 11 + Math.random() * 14 + "s";
    p.style.animationDelay = -Math.random() * 20 + "s";
    p.style.setProperty("--sway", (Math.random() * 120 - 60).toFixed(0) + "px");
    box.appendChild(p);
  }
}

function buildReasons() {
  const grid = $("#reasonsGrid");
  CONFIG.reasons.forEach((r, i) => {
    const card = document.createElement("article");
    card.className = "reason";
    card.style.transitionDelay = i * 40 + "ms";
    card.innerHTML = `<span class="reason-emoji">${r.emoji}</span><h3>${r.title}</h3><p>${r.text}</p>`;
    grid.appendChild(card);
  });
}

function startClock() {
  const since = new Date(CONFIG.since);
  const valid = !isNaN(since.getTime());
  const note = $("#counterNote");
  if (!valid) {
    note.textContent = CONFIG.fallbackNote;
    $$("#clock .clock-cell span").forEach((el) => { el.textContent = "♥"; });
    return;
  }
  const tick = () => {
    let diff = Date.now() - since.getTime();
    if (diff < 0) diff = 0;
    const secs = Math.floor(diff / 1000);
    $("#cdDays").textContent = Math.floor(secs / 86400);
    $("#cdHours").textContent = Math.floor((secs % 86400) / 3600);
    $("#cdMins").textContent = Math.floor((secs % 3600) / 60);
    $("#cdSecs").textContent = secs % 60;
  };
  tick();
  setInterval(tick, 1000);
}

function setupReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
}

function toast(text) {
  const el = $("#toast");
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 1900);
}

function confettiBurst(emojis = ["💖", "🌸", "✨", "💕", "🌷", "💗"]) {
  const layer = $("#confetti");
  const total = 30;
  for (let i = 0; i < total; i++) {
    const bit = document.createElement("span");
    bit.className = "confetti-bit";
    bit.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    bit.style.left = Math.random() * 100 + "vw";
    bit.style.fontSize = 14 + Math.random() * 16 + "px";
    bit.style.setProperty("--dx", (Math.random() * 220 - 110).toFixed(0) + "px");
    bit.style.animationDelay = Math.random() * 0.35 + "s";
    bit.style.animationDuration = 2.2 + Math.random() * 1.4 + "s";
    layer.appendChild(bit);
    setTimeout(() => bit.remove(), 4200);
  }
}

function setupTabs() {
  const tabs = $$(".tab");
  const panels = {
    catch: $("#panel-catch"),
    memory: $("#panel-memory"),
    quiz: $("#panel-quiz")
  };
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", String(on));
      });
      Object.entries(panels).forEach(([key, panel]) => {
        panel.classList.toggle("hidden", key !== tab.dataset.tab);
      });
      if (tab.dataset.tab === "memory" && !memoryState.built) startMemory();
      if (tab.dataset.tab === "quiz" && !quizState.rendered) startQuiz();
    });
  });
}

function setupBigHeart() {
  const heart = $("#bigHeart");
  heart.addEventListener("click", () => {
    confettiBurst();
    toast(CONFIG.heartMessages[Math.floor(Math.random() * CONFIG.heartMessages.length)]);
  });
}

/* ---------- Поймай сердечки ---------- */

const catchState = { running: false, hearts: [], score: 0, time: 30, last: 0, spawnId: 0, tickId: 0, rafId: 0, el: null };

function setupCatch() {
  $("#catchStart").addEventListener("click", startCatch);
  catchState.el = $("#catchArea");
}

function startCatch() {
  stopCatch();
  const area = catchState.el;
  $$(".catch-heart", area).forEach((el) => el.remove());
  $("#catchOverlay").classList.remove("show");

  catchState.running = true;
  catchState.hearts = [];
  catchState.score = 0;
  catchState.time = 30;
  catchState.last = performance.now();
  $("#catchScore").textContent = "0";
  $("#catchTime").textContent = "30";
  $("#catchStart").textContent = "Заново";

  catchState.spawnId = setInterval(spawnCatchHeart, 470);
  catchState.tickId = setInterval(() => {
    catchState.time -= 1;
    $("#catchTime").textContent = String(Math.max(catchState.time, 0));
    if (catchState.time <= 0) endCatch();
  }, 1000);
  catchState.rafId = requestAnimationFrame(catchLoop);

  for (let i = 0; i < 3; i++) spawnCatchHeart();
}

function spawnCatchHeart() {
  if (!catchState.running) return;
  const area = catchState.el;
  const width = area.clientWidth;
  const roll = Math.random();
  let type = "normal";
  let emoji = "💗";
  let size = 34;
  if (roll > 0.92) { type = "gold"; emoji = "⭐"; size = 38; }
  else if (roll > 0.8) { type = "broken"; emoji = "💔"; size = 32; }
  else {
    const hearts = ["💗", "💖", "💕", "💘", "❤️", "💝"];
    emoji = hearts[Math.floor(Math.random() * hearts.length)];
  }

  const el = document.createElement("button");
  el.type = "button";
  el.className = "catch-heart";
  el.textContent = emoji;
  el.style.fontSize = size + "px";
  el.setAttribute("aria-label", type === "broken" ? "Разбитое сердце" : "Сердечко");
  const h = {
    el,
    x: Math.random() * Math.max(width - size - 10, 10),
    y: -size,
    vy: 95 + Math.random() * 70 + catchState.score * 1.5,
    type,
    alive: true
  };
  el.style.transform = `translate3d(${h.x}px, ${h.y}px, 0)`;
  el.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    hitCatchHeart(h);
  });
  area.appendChild(el);
  catchState.hearts.push(h);
}

function hitCatchHeart(h) {
  if (!h.alive || !catchState.running) return;
  h.alive = false;
  if (h.type === "broken") {
    catchState.score = Math.max(0, catchState.score - 2);
    h.el.classList.add("missed");
    toast("Ой, разбитое 💔 −2");
  } else if (h.type === "gold") {
    catchState.score += 3;
    toast("Золотое! +3 ⭐");
  } else {
    catchState.score += 1;
  }
  $("#catchScore").textContent = String(catchState.score);
  h.el.style.transition = "transform .25s ease, opacity .25s ease";
  h.el.style.transform = `translate3d(${h.x}px, ${h.y}px, 0) scale(${h.type === "broken" ? 1.2 : 1.9})`;
  h.el.style.opacity = "0";
  h.el.style.pointerEvents = "none";
  setTimeout(() => h.el.remove(), 260);
}

function catchLoop(ts) {
  if (!catchState.running) return;
  const dt = Math.min((ts - catchState.last) / 1000, 0.05);
  catchState.last = ts;
  const height = catchState.el.clientHeight;
  catchState.hearts.forEach((h) => {
    if (!h.alive) return;
    h.y += h.vy * dt;
    h.el.style.transform = `translate3d(${h.x}px, ${h.y}px, 0)`;
    if (h.y > height + 40) {
      h.alive = false;
      h.el.remove();
    }
  });
  catchState.hearts = catchState.hearts.filter((h) => h.alive);
  catchState.rafId = requestAnimationFrame(catchLoop);
}

function stopCatch() {
  catchState.running = false;
  clearInterval(catchState.spawnId);
  clearInterval(catchState.tickId);
  cancelAnimationFrame(catchState.rafId);
}

function endCatch() {
  stopCatch();
  const score = catchState.score;
  $$(".catch-heart", catchState.el).forEach((el) => el.remove());
  catchState.hearts = [];

  let title = "Неплохо! 💗";
  let text = "Но главный приз всё равно ты — забирай все мои сердечки.";
  if (score >= 25) {
    title = "Ты чемпионка! 👑";
    text = "Столько сердечек за 30 секунд — официально подтверждаю: ты украла моё.";
  } else if (score >= 12) {
    title = "Красотка! 💞";
    text = "Ловкость как у тебя, а красота как у тебя. Совпадение? Не думаю.";
  }

  const overlay = $("#catchOverlay");
  overlay.innerHTML = `<h3>${title}</h3><p>Счёт: <b>${score}</b> · ${text}</p><button class="btn small primary" type="button">Играть ещё</button>`;
  overlay.classList.add("show");
  overlay.querySelector("button").addEventListener("click", startCatch);
  if (score >= 25) confettiBurst(["💖", "⭐", "✨", "💕"]);
}

/* ---------- Найди пару ---------- */

const MEM_EMOJIS = ["🌸", "💖", "🧸", "🌷", "🍓", "🦋", "🐰", "🍒"];
const memoryState = { built: false, first: null, lock: false, moves: 0, pairs: 0 };

function setupMemory() {
  $("#memRestart").addEventListener("click", startMemory);
  startMemory();
}

function startMemory() {
  memoryState.built = true;
  memoryState.first = null;
  memoryState.lock = false;
  memoryState.moves = 0;
  memoryState.pairs = 0;
  $("#memMoves").textContent = "0";
  $("#memPairs").textContent = "0";
  $("#memoryWin").textContent = "";

  const deck = [...MEM_EMOJIS, ...MEM_EMOJIS]
    .map((emoji) => ({ emoji, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort);

  const grid = $("#memoryGrid");
  grid.innerHTML = "";
  deck.forEach((card, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mem-card";
    btn.dataset.emoji = card.emoji;
    btn.dataset.index = String(i);
    btn.setAttribute("aria-label", "Карточка " + (i + 1));
    btn.innerHTML = `<span class="mem-inner"><span class="mem-face mem-front">♥</span><span class="mem-face mem-back">${card.emoji}</span></span>`;
    btn.addEventListener("click", () => flipMemory(btn));
    grid.appendChild(btn);
  });
}

function flipMemory(btn) {
  if (memoryState.lock || btn.classList.contains("flipped") || btn.classList.contains("matched")) return;
  btn.classList.add("flipped");

  if (!memoryState.first) {
    memoryState.first = btn;
    return;
  }

  memoryState.moves += 1;
  $("#memMoves").textContent = String(memoryState.moves);

  if (memoryState.first.dataset.emoji === btn.dataset.emoji) {
    memoryState.first.classList.add("matched");
    btn.classList.add("matched");
    memoryState.first = null;
    memoryState.pairs += 1;
    $("#memPairs").textContent = String(memoryState.pairs);
    tone(660, 0.12, 0.05);
    if (memoryState.pairs === MEM_EMOJIS.length) {
      $("#memoryWin").textContent = `Все пары найдены за ${memoryState.moves} ходов 💞 Идеальная память на любовь!`;
      confettiBurst();
    }
    return;
  }

  memoryState.lock = true;
  const first = memoryState.first;
  memoryState.first = null;
  setTimeout(() => {
    first.classList.remove("flipped");
    btn.classList.remove("flipped");
    memoryState.lock = false;
  }, 700);
}

/* ---------- Тест на любовь ---------- */

const quizState = { rendered: false, index: 0, scores: 0 };

function setupQuiz() {
  startQuiz();
}

function startQuiz() {
  quizState.rendered = true;
  quizState.index = 0;
  quizState.scores = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const wrap = $("#quiz");
  const total = CONFIG.quiz.length;
  if (quizState.index >= total) {
    wrap.innerHTML = `
      <div class="quiz-result">
        <h3>10 / 10 — любовь подтверждена ✅</h3>
        <p>Ты ответила правильно на все вопросы. Впрочем, сомнений не было.</p>
        <button class="btn small primary" type="button" id="quizAgain">Пройти ещё раз</button>
      </div>`;
    $("#quizAgain").addEventListener("click", startQuiz);
    confettiBurst();
    return;
  }

  const item = CONFIG.quiz[quizState.index];
  const progress = Math.round((quizState.index / total) * 100);
  wrap.innerHTML = `
    <div class="quiz-progress"><i style="width:${progress}%"></i></div>
    <p class="quiz-q">${quizState.index + 1}. ${item.q}</p>
    <div class="quiz-opts"></div>`;
  const opts = $(".quiz-opts", wrap);
  item.opts.forEach((text) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-opt";
    btn.textContent = text;
    btn.addEventListener("click", () => answerQuiz(btn, opts));
    opts.appendChild(btn);
  });
}

function answerQuiz(btn, opts) {
  $$(".quiz-opt", opts).forEach((b) => { b.disabled = true; });
  btn.classList.add("correct");
  quizState.scores += 1;
  tone(784, 0.12, 0.05);
  setTimeout(() => {
    quizState.index += 1;
    renderQuizQuestion();
  }, 700);
}

/* ---------- Письмо ---------- */

function setupLetter() {
  const envelope = $("#envelope");
  const paper = $("#letterPaper");
  envelope.addEventListener("click", () => {
    const open = !envelope.classList.contains("open");
    envelope.classList.toggle("open", open);
    paper.classList.toggle("open", open);
    envelope.setAttribute("aria-expanded", String(open));
    envelope.querySelector(".env-hint").textContent = open ? "нажми, чтобы закрыть" : "нажми, чтобы открыть";
    if (open) {
      confettiBurst(["💌", "💖", "🌸", "✨"]);
      setTimeout(() => paper.scrollIntoView({ behavior: "smooth", block: "center" }), 250);
    }
  });
}

/* ---------- Музыка ---------- */

const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880.0, 698.46];
const music = { ctx: null, timer: null, step: 0, on: false };

function audioCtx() {
  if (!music.ctx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    music.ctx = new Ctx();
  }
  if (music.ctx.state === "suspended") music.ctx.resume();
  return music.ctx;
}

function tone(freq, dur = 0.4, vol = 0.05, type = "triangle") {
  const ctx = audioCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(vol, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + dur + 0.05);
}

function musicStep() {
  const freq = melody[music.step % melody.length];
  tone(freq, 0.5, 0.045);
  if (music.step % melody.length === 0) tone(freq / 2, 1.6, 0.03, "sine");
  if (music.step % 4 === 2) tone(freq * 2, 0.25, 0.018, "sine");
  music.step += 1;
}

function setupMusic() {
  const btn = $("#musicBtn");
  btn.addEventListener("click", () => {
    const ctx = audioCtx();
    if (!ctx) return;
    if (music.on) {
      music.on = false;
      clearInterval(music.timer);
      btn.textContent = "♫ Включить музыку";
      btn.setAttribute("aria-pressed", "false");
    } else {
      music.on = true;
      musicStep();
      music.timer = setInterval(musicStep, 430);
      btn.textContent = "❚❚ Выключить музыку";
      btn.setAttribute("aria-pressed", "true");
    }
  });
}
