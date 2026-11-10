/* Übernommen aus der Lernplattform Analysis (Tabs und Texte angepasst) */
/* ==========================================================================
   an-app.js — Rahmen der Lernplattform Wahrscheinlichkeitsrechnung (Tabs, Sprachen, Abschnitte)
   Inhalte werden von den Dateien in inhalt/ registriert:
     AN_REG("k3", "de", function(S){ return `…${S("3.1 · Titel", `…`, true, "3-1")}…`; });
   Sprachen: Deutsch fertig; Englisch/Ukrainisch vorbereitet (Fallback auf Deutsch).
   ========================================================================== */
(function (global) {
  "use strict";
  const CONTENT = global.AN_CONTENT = global.AN_CONTENT || {};
  global.AN_REG = function (panel, lang, fn) { (CONTENT[panel] = CONTENT[panel] || {})[lang] = fn; };

  const TAB_IDS = ["start", "k8", "labor", "afb1", "afb2", "afb3", "speicher", "karten"];

  const I18N = {
    de: {
      menuTrigger: "Optionen", collapse: "Einklappen", expand: "Ausklappen", langDe: "Deutsch", langEn: "Englisch", langUk: "Ukrainisch",
      eyebrow: "Mathematik · Stochastik · Kapitel 8",
      title: "Wahrscheinlichkeitsrechnung / Eri",
      subtitle: "Vom Zufallsexperiment über bedingte Wahrscheinlichkeit und Unabhängigkeit bis zu Erwartungswert und Standardabweichung — mit 3D-Simulationen zum Ausprobieren und Aufgaben in drei Anforderungsbereichen.",
      tabs: { start: "Start", k8: "8 · Wahrscheinlichkeitsrechnung", labor: "Simulationslabor", afb1: "Aufgaben · AFB I", afb2: "Aufgaben · AFB II", afb3: "Aufgaben · AFB III", speicher: "Wissensspeicher", karten: "Lernkarten" },
      soon: (what) => `<div class="an-soon"><b>${what}</b> sind in Vorbereitung und erscheinen in einer der nächsten Ausbaustufen der Plattform.</div>`,
      soonTasks: "Die Aufgaben dieses Anforderungsbereichs", soonCards: "Die Lernkarten",
      fallbackNote: "", sectionHint: "Tippe auf eine Überschrift, um den Abschnitt zu öffnen oder zu schließen."
    },
    en: {
      menuTrigger: "Options", collapse: "Collapse", expand: "Expand", langDe: "German", langEn: "English", langUk: "Ukrainian",
      eyebrow: "Grade 11 · Mathematics · Calculus",
      title: "Calculus Gr. 11 / Eri",
      subtitle: "From rates of change to the derivative and the study of functions — with animations to try out, tasks at three levels and learning cards.",
      tabs: { start: "Start", k3: "3 · Slope and derivative", k4: "4 · Investigating functions", afb1: "Tasks · Level I", afb2: "Tasks · Level II", afb3: "Tasks · Level III", karten: "Learning cards", cas: "5 · CAS calculator", casrechner: "CAS calculator", videos: "TI videos", speicher: "Knowledge store", werkzeuge: "Tools" },
      soon: (what) => `<div class="an-soon"><b>${what}</b> are in preparation.</div>`, soonTasks: "The tasks of this level", soonCards: "The learning cards",
      fallbackNote: "The English version of this content is being prepared. For now the German text is shown.", sectionHint: ""
    },
    uk: {
      menuTrigger: "Опції", collapse: "Згорнути", expand: "Розгорнути", langDe: "Німецька", langEn: "Англійська", langUk: "Українська",
      eyebrow: "11 клас · Математика · Аналіз",
      title: "Аналіз 11 кл. / Eri",
      subtitle: "Від швидкості зміни до похідної та дослідження функцій — з анімаціями, завданнями трьох рівнів і картками для навчання.",
      tabs: { start: "Початок", k3: "3 · Нахил і похідна", k4: "4 · Дослідження функцій", afb1: "Завдання · Рівень I", afb2: "Завдання · Рівень II", afb3: "Завдання · Рівень III", karten: "Картки", cas: "5 · CAS", casrechner: "CAS-калькулятор", videos: "Відео TI", speicher: "Довідник", werkzeuge: "Інструменти" },
      soon: (what) => `<div class="an-soon"><b>${what}</b> готуються.</div>`, soonTasks: "Завдання цього рівня", soonCards: "Картки",
      fallbackNote: "Українська версія цього змісту готується. Поки що показано німецький текст.", sectionHint: ""
    }
  };

  let currentLang = "de";
  try { const s = localStorage.getItem("ws-lang"); if (s && I18N[s]) currentLang = s; } catch (e) {}
  const $ = (id) => document.getElementById(id);

  /* ---------- Abschnitte ---------- */
  let sidN = 0;
  function section(title, body, open, key) {
    const id = "an-s" + (++sidN);
    return `<div class="nv-section"${key ? ` data-key="${key}"` : ""}>
      <button class="nv-section-toggle" data-toggle="${id}" aria-expanded="${open ? "true" : "false"}"><span class="nv-chevron">▸</span><span>${title}</span></button>
      <div class="nv-section-body${open ? "" : " tex2jax_ignore"}" id="${id}" ${open ? "" : "hidden"}>${body}</div></div>`;
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".nv-section-toggle");
    if (btn) {
      const body = $(btn.getAttribute("data-toggle")), exp = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", exp ? "false" : "true"); if (body) body.hidden = exp;
      if (!exp && body) { body.classList.remove("tex2jax_ignore"); AN.mount(body); typeset(body); }
      return;
    }
    const go = e.target.closest("[data-goto]");
    if (go) { gotoSection(go.getAttribute("data-goto")); return; }
    const tab = e.target.closest("[data-tab]");
    if (tab) { activateTab(tab.getAttribute("data-tab")); }
  });
  function gotoSection(key) {
    const sec = document.querySelector(`.nv-section[data-key="${key}"]`);
    if (!sec) return;
    const panel = sec.closest(".nv-panel"); if (panel && !panel.hasAttribute("data-active")) activateTab(panel.id.replace("panel-", ""));
    const b = sec.querySelector(".nv-section-toggle");
    if (b.getAttribute("aria-expanded") !== "true") b.click();
    setTimeout(() => { const y = sec.getBoundingClientRect().top + window.scrollY - (($("an-sticky") || {}).offsetHeight || 140) - 8; window.scrollTo({ top: y, behavior: "smooth" }); }, 60);
  }
  global.AN_gotoSection = gotoSection;

  /* ---------- Mathe-Satz (MathJax) ---------- */
  const typeset = (root) => {
    const run = () => { if (global.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([root]).catch(() => {}); else setTimeout(run, 80); };
    run();
  };

  /* ---------- Rendern ---------- */
  function renderPanel(id) {
    const panel = $("panel-" + id), t = I18N[currentLang];
    const reg = CONTENT[id];
    let html = "", fb = "";
    if (reg) {
      const f = reg[currentLang] || reg.de;
      if (!reg[currentLang] && currentLang !== "de" && t.fallbackNote) fb = `<div class="an-langnote">${t.fallbackNote}</div>`;
      html = fb + f(section, t);
    } else if (id.indexOf("afb") === 0) html = (AN.tasksTabHtml && AN.tasksTabHtml(id, section)) || t.soon(t.soonTasks);
    else if (id === "karten") html = kartenHtml() || t.soon(t.soonCards);
    panel.innerHTML = html;
    AN.mount(panel);
    if (id.indexOf("afb") === 0 && AN.initTasks && AN.TASKS[id].length) AN.initTasks(panel, id);
  }
  global.AN_KARTEN = global.AN_KARTEN || [];
  global.AN_KARTEN_ADD = global.AN_KARTEN_ADD || function (arr) { arr.forEach(function (k) { global.AN_KARTEN.push(k); }); };
  function kartenHtml() {
    const K = global.AN_KARTEN; if (!K.length) return null;
    const NAME = { 1: "AFB I – Grundwissen sicher anwenden", 2: "AFB II – Zusammenhänge herstellen", 3: "AFB III – Begründen und beurteilen" };
    let html = `<div class="nv-lede"><b>Lernkarten.</b> Zu jedem Anforderungsbereich gibt es ${K.filter(function (k) { return k.afb === 1; }).length} Karten im Format DIN A6 (zwei Blätter DIN A5 quer, in der Mitte gefaltet). <b>Vorderseite:</b> Aufgabe. <b>Rückseite:</b> Musterlösung. <b>Innenseite:</b> ausführliche Theorie mit Merksatz, Formeln, Vorgehen und den häufigsten Fehlern. Tippe auf eine Karte, um sie zu öffnen; dort kannst du sie drucken.</div>`;
    [1, 2, 3].forEach(function (afb) {
      html += `<h3 class="an-kartenh">${NAME[afb]}</h3><div class="an-kartengrid">` + K.filter(function (k) { return k.afb === afb; }).sort(function (a, b) { return a.nr - b.nr; }).map(function (k) {
        return `<a class="an-kartenlink afb${afb}" href="lernkarten.html?n=${k.nr}"><span class="an-kn">Karte ${k.nr}</span><b>${k.titel}</b><span class="an-hint">Abschnitt ${k.abschnitt}</span></a>`; }).join("") + `</div>`;
    });
    return html;
  }
  function renderAll() { TAB_IDS.forEach((id) => { if (id !== "werkzeuge") { try { renderPanel(id); } catch (err) { try { console.error("Tab " + id, err); $("panel-" + id).insertAdjacentHTML("afterbegin", "<div class='nv-lede' style='border-left:4px solid #c0392b;padding:.6rem 1rem'><b>Dieser Bereich konnte nicht vollständig geladen werden.</b> Bitte Seite neu laden (Strg/Cmd+Umschalt+R). Technische Meldung: " + String(err && err.message || err).replace(/</g, "&lt;") + "</div>"); } catch (e2) {} } } });  }

  /* ---------- Werkzeuge (Funktionen-Explorer, Formeleditor) ---------- */
  const TOOLS = { explorer: { name: { de: "Funktionen-Explorer", en: "Function Explorer", uk: "Дослідник функцій" }, src: "tools/explorer/index.html" }, formeleditor: { name: { de: "Formeleditor", en: "Formula Editor", uk: "Редактор формул" }, src: "tools/formeleditor/index.html" } };
  let toolKey = "explorer";
  function renderTools() {
    const panel = $("panel-werkzeuge"), L = currentLang;
    const intro = { de: "Zwei Werkzeuge helfen dir beim Arbeiten: Mit dem <b>Funktionen-Explorer</b> zeichnest du Funktionen, ihre Ableitungen und Tangenten und untersuchst sie. Mit dem <b>Formeleditor</b> schreibst du Rechenwege und Terme sauber auf.", en: "Two tools help you work: use the <b>Function Explorer</b> to draw functions, derivatives and tangents; use the <b>Formula Editor</b> to write terms and solutions neatly.", uk: "Два інструменти допомагають у роботі: <b>Дослідник функцій</b> — для графіків функцій, похідних і дотичних; <b>Редактор формул</b> — для запису виразів і розв’язань." }[L];
    const open = { de: "In neuem Fenster öffnen ↗", en: "Open in a new window ↗", uk: "Відкрити в новому вікні ↗" }[L];
    panel.innerHTML = `<div class="nv-lede">${intro}</div>
      <div class="an-btnrow">${Object.keys(TOOLS).map((k) => `<button class="an-btn" data-tool="${k}" style="${k === toolKey ? "background:var(--nv-accent-soft)" : ""}">${TOOLS[k].name[L]}</button>`).join("")}
      <a class="an-btn" id="an-tool-open" href="${TOOLS[toolKey].src}" target="_blank" rel="noopener" style="text-decoration:none">${open}</a></div>
      <div id="an-tool-frame-wrap"></div>`;
    panel.querySelectorAll("[data-tool]").forEach((b) => b.addEventListener("click", () => { toolKey = b.dataset.tool; renderTools(); loadToolFrame(); }));
  }
  function loadToolFrame() {
    const w = $("an-tool-frame-wrap"); if (!w) return;
    w.innerHTML = `<iframe class="an-frame" src="${TOOLS[toolKey].src}" title="${TOOLS[toolKey].name[currentLang]}" loading="lazy" allow="clipboard-write"></iframe>`;
  }

  /* ---------- Kopf, Tabs, Sprache ---------- */
  function applyChrome() {
    const t = I18N[currentLang];
    document.documentElement.setAttribute("lang", currentLang);
    $("an-eyebrow").textContent = t.eyebrow; $("an-title").textContent = t.title; $("an-subtitle").textContent = t.subtitle;
    document.title = t.title;
    $("an-menu-label").textContent = t.menuTrigger; $("an-mi-collapse").textContent = t.collapse; $("an-mi-expand").textContent = t.expand;
    $("an-mi-de").textContent = t.langDe; $("an-mi-en").textContent = t.langEn; $("an-mi-uk").textContent = t.langUk;
    ["de", "en", "uk"].forEach((l) => $("an-mi-" + l).setAttribute("aria-current", l === currentLang ? "true" : "false"));
    TAB_IDS.forEach((id) => { const b = $("tabbtn-" + id); if (b) b.textContent = t.tabs[id]; });
  }
  global.setLanguage = function (lang) {
    if (!I18N[lang]) return;
    currentLang = lang; try { localStorage.setItem("ws-lang", lang); } catch (e) {}
    AN.setLang(lang); applyChrome(); renderAll(); if (AN.refreshProgress) AN.refreshProgress();
    const act = document.querySelector('.nv-tab-btn[aria-selected="true"]'); const id = act ? act.id.replace("tabbtn-", "") : "start";
    
    typeset($("panel-" + id));
  };
  function buildTabs() {
    const nav = document.querySelector("nav.nv-tabs");
    TAB_IDS.forEach((id, i) => {
      const b = document.createElement("button");
      b.className = "nv-tab-btn"; b.id = "tabbtn-" + id; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.addEventListener("click", () => activateTab(id)); nav.appendChild(b);
    });
  }
  function activateTab(id) {
    if (AN.refreshProgress) AN.refreshProgress();
    TAB_IDS.forEach((t) => {
      const on = t === id; $("tabbtn-" + t).setAttribute("aria-selected", on ? "true" : "false");
      const p = $("panel-" + t); if (on) p.setAttribute("data-active", "true"); else p.removeAttribute("data-active");
    });
    if (location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
    window.scrollTo({ top: 0, behavior: "auto" });
    const nv = document.querySelector("nav.nv-tabs"), ab = $("tabbtn-" + id);
    if (nv && ab) nv.scrollTo({ left: ab.offsetLeft - (nv.clientWidth - ab.clientWidth) / 2, behavior: "auto" });
    
    typeset($("panel-" + id));
  }
  function initHeader() {
    const header = $("an-header"), trig = $("an-menu-trigger"), menu = $("an-menu");
    let collapsed = false; try { collapsed = localStorage.getItem("ws-collapsed") === "1"; } catch (e) {}
    const setC = (v) => { collapsed = v; header.setAttribute("data-collapsed", v ? "true" : "false"); try { localStorage.setItem("ws-collapsed", v ? "1" : "0"); } catch (e) {} };
    setC(collapsed);
    const open = () => { menu.hidden = false; trig.setAttribute("aria-expanded", "true"); }, close = () => { menu.hidden = true; trig.setAttribute("aria-expanded", "false"); };
    trig.addEventListener("click", (e) => { e.stopPropagation(); menu.hidden ? open() : close(); });
    document.addEventListener("click", (e) => { if (!menu.hidden && !menu.contains(e.target) && e.target !== trig) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    menu.addEventListener("click", (e) => { const it = e.target.closest(".nv-menu-item"); if (!it) return; if (it.dataset.action === "collapse") setC(true); else if (it.dataset.action === "expand") setC(false); else if (it.dataset.lang) global.setLanguage(it.dataset.lang); close(); });
  }

  /* Sprachauswahl: nur die hier aufgeführten Sprachen erscheinen im Menü. Englisch/Ukrainisch sind
     vorbereitet (AN_REG(panel, "en"/"uk", …)), werden aber derzeit nicht angeboten. */
  const LANGS_ON = ["de"];
  function applyLangMenu() {
    ["de", "en", "uk"].forEach(function (l) { const b = $("an-mi-" + l); if (b) b.hidden = LANGS_ON.indexOf(l) < 0 || LANGS_ON.length < 2; });
    const sep = document.querySelector("#an-menu .nv-menu-sep"); if (sep && LANGS_ON.length < 2) sep.style.display = "none";
    if (LANGS_ON.indexOf(currentLang) < 0) currentLang = "de";
  }
  global.AN_start = function () {
    applyLangMenu();
    if (AN.installInjections) AN.installInjections();
    AN.setLang(currentLang);
    initHeader(); buildTabs(); applyChrome(); renderAll(); if (AN.refreshProgress) AN.refreshProgress();
    const hash = (location.hash || "#start").slice(1);
    activateTab(TAB_IDS.indexOf(hash) >= 0 ? hash : "start");
  };
})(window);
