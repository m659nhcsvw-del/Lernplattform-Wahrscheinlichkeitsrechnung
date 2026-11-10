/* Übernommen aus der Lernplattform Analysis (Abschnittsliste angepasst) */
/* ==========================================================================
   an-tasks.js — Aufgabenkarten mit Selbstprüfung (Lernplattform Analysis)
   Aufgaben werden von inhalt/aufgaben-*.js registriert:
     AN_TASKS_ADD("afb1", [ {id, abschnitt, title, aufgabenstellung, grafik?, teile:[…], analyse, ansatz, loesung, antwortsatz, kontrolle?}, … ]);
   Teiltypen: num · zahlen · mc · term · selbst  (siehe werkzeuge/gen/AGENT_BRIEF_AUFGABEN.md)
   ========================================================================== */
(function (global) {
  "use strict";
  const AN = global.AN;
  const { el, fmt } = AN;
  AN.TASKS = { afb1: [], afb2: [], afb3: [] };
  global.AN_TASKS_ADD = function (afb, arr) { arr.forEach((t) => AN.TASKS[afb].push(t)); };
  const ABS = ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7"];
  const ABS_KEY = { "8.1": "8-1", "8.2": "8-2", "8.3": "8-3", "8.4": "8-4", "8.5": "8-5", "8.6": "8-6", "8.7": "8-7" };
  const ABS_NAME = { "8.1": "Grundlagen der Stochastik", "8.2": "Bedingte Wahrscheinlichkeit", "8.3": "Stochastische Unabhängigkeit", "8.4": "Simulation von Zufallsexperimenten", "8.5": "Zufallsgrößen und Wahrscheinlichkeitsverteilung", "8.6": "Erwartungswert und Standardabweichung", "8.7": "Abiturtraining" };
  const AFB_TXT = { afb1: "Anforderungsbereich I — Reproduzieren: Gelerntes sicher anwenden", afb2: "Anforderungsbereich II — Zusammenhänge herstellen: Verfahren verknüpfen und im Kontext anwenden", afb3: "Anforderungsbereich III — Reflektieren und Problemlösen: begründen, beurteilen, verallgemeinern" };
  const AFB_SHORT = { afb1: "AFB I", afb2: "AFB II", afb3: "AFB III" };
  const AFB_CLS = { afb1: "badge-afb1", afb2: "badge-afb2", afb3: "badge-afb3" };
  const HILFE_NAMEN = ["Denkanstoß", "Tipp", "Lösungsschritt"];

  /* ---------- Fortschritt (nur im Browser, mit Schutz gegen gesperrten Speicher) ---------- */
  let mem = {};
  const store = {
    load() { try { mem = JSON.parse(localStorage.getItem("ws-progress") || "{}") || {}; } catch (e) { mem = mem || {}; } },
    save() { try { localStorage.setItem("ws-progress", JSON.stringify(mem)); } catch (e) {} },
    ok(id, i) { return !!(mem[id] && mem[id][i]); },
    set(id, i) { (mem[id] = mem[id] || {})[i] = 1; store.save(); },
    reset() { mem = {}; store.save(); }
  };
  store.load();


  /* ---------- NEU: Vorzeichenknopf und automatische Fehlerdiagnose ---------- */
  AN.signBtn = function (inp) {
    const b = AN.el("button", { type: "button", class: "an-btn an-btn-sm an-sign", "aria-label": "Vorzeichen wechseln", title: "Vorzeichen wechseln", text: "±" });
    b.addEventListener("click", () => { const v = inp.value.trim().replace(/^[−–]/, "-"); inp.value = v.charAt(0) === "-" ? v.slice(1) : (v ? "-" + v : "-"); inp.focus(); });
    return b;
  };
  /* Wenn für einen falschen Wert keine eigene Meldung hinterlegt ist, erkennt diese Funktion häufige Muster. */
  AN.autoDiag = function (v, a, p) {
    const tolA = Math.max(0.011, p && p.tol !== undefined ? p.tol : 0), eq = (x, y) => Math.abs(x - y) <= tolA;
    if (a !== 0 && eq(v, -a)) return "Der Betrag stimmt, aber das <b>Vorzeichen</b> nicht. Prüfe das Minuszeichen und die Richtung (steigend oder fallend, links oder rechts).";
    if (a !== 0 && eq(v, 2 * a)) return "Dein Wert ist <b>doppelt so groß</b> wie das richtige Ergebnis. Hast du einen Faktor 2 zu viel mitgenommen, zum Beispiel beim Ableiten oder Ausmultiplizieren?";
    if (a !== 0 && eq(v, a / 2)) return "Dein Wert ist nur <b>halb so groß</b> wie das richtige Ergebnis. Ist ein Faktor 2 verloren gegangen, zum Beispiel weil der Exponent nicht vorgezogen oder zu früh geteilt wurde?";
    if (a !== 0 && isFinite(1 / a) && eq(v, 1 / a)) return "Das sieht nach dem <b>Kehrwert</b> aus. Prüfe, was im Zähler und was im Nenner stehen muss.";
    if (a !== 0 && Math.abs(v - a) <= 0.03 * Math.abs(a)) return "Du bist <b>sehr nah dran</b>. Rechne mit ungerundeten Zwischenergebnissen und runde erst am Ende. Prüfe auch, ob die verlangte Genauigkeit stimmt.";
    if (eq(Math.abs(v - a), 1)) return "Dein Ergebnis ist um genau <b>1</b> daneben. Das passiert oft bei einem Exponenten (n statt n−1) oder bei einer Konstanten, die verloren ging.";
    if (v === 0 && a !== 0) return "Du hast <b>0</b> erhalten. Prüfe, ob du einen Term versehentlich weggelassen oder mit 0 multipliziert hast.";
    return "Prüfe deine Rechnung noch einmal. Öffne bei Bedarf eine Hilfe, oder rechne im Funktionen-Explorer oder im Rechner-Trainer nach.";
  };

  /* ---------- Hilfsfunktionen ---------- */
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  function grafikToPlot(g) {
    const fnOf = (c) => (typeof c.f === "function" ? c.f : AN.parse(c.f));
    const o = { xMin: g.xMin, xMax: g.xMax, yMin: g.yMin, yMax: g.yMax, width: g.width || 560, height: g.height || 300, xLabel: g.xLabel || "x", yLabel: g.yLabel || "y", ariaLabel: g.alt || "Graph zur Aufgabe" };
    o.curves = (g.curves || []).map((c, i) => ({ fn: fnOf(c), cls: c.cls || "an-c" + ((i % 4) + 1), label: c.label, dash: c.dash, from: c.from, to: c.to, n: c.n }));
    o.lines = (g.lines || []).map((l) => ({ x0: l.x0, y0: l.y0, m: l.m, cls: l.cls || "an-c2", dash: l.dash }));
    o.pts = (g.pts || []).map((p) => ({ x: p.x, y: p.y, label: p.label, open: p.open, cls: p.cls || "an-c2", dx: p.dx, dy: p.dy }));
    o.segs = g.segs; o.vlines = g.vlines; o.hlines = g.hlines; o.areas = (g.areas || []).map((a) => ({ fn: fnOf({ f: a.f }), fn2: a.f2 ? fnOf({ f: a.f2 }) : undefined, from: a.from, to: a.to, cls: a.cls, op: a.op })); o.bands = g.bands; o.texts = g.texts;
    if (g.grid === false) o.grid = false;
    return o;
  }

  /* ---------- HTML der Aufgabenkarte ---------- */
  AN.taskCardHtml = function (t, afb, num, section) {
    const sec = (titel, body, open) => section(titel, body, open);
    const base = "tk-" + t.id;
    return `<article class="nv-task" id="${base}" data-task="${t.id}" data-afb="${afb}">
      <div class="nv-task-head">
        <span class="nv-task-num">Aufgabe ${num}</span>
        <span class="nv-task-title">${t.title}</span>
        <span class="nv-badge badge-abschnitt" title="${ABS_NAME[t.abschnitt] || ""}">${t.abschnitt}</span>
        <span class="nv-badge ${AFB_CLS[afb]}" title="${AFB_TXT[afb]}">${AFB_SHORT[afb]}</span>
        <span class="an-score" data-score="${t.id}"></span>
      </div>
      <div class="nv-task-body">
        ${sec("1&nbsp;·&nbsp;Aufgabenstellung und Selbstprüfung", `<div class="an-aufg">${t.aufgabenstellung}</div>${t.grafik ? `<div class="an-grafik" data-grafik="${t.id}"></div>` : ""}<div class="an-teile" data-teile="${t.id}"></div>`, true)}
        ${sec("2&nbsp;·&nbsp;Analyse der Aufgabenstellung", `<div class="nv-legend"><span><span class="swatch" style="background:var(--hl-given)"></span>gegebene Werte/Daten</span><span><span class="swatch" style="background:var(--hl-target)"></span>gesuchte Größe</span><span><span class="swatch" style="background:var(--hl-condition)"></span>Bedingung/Kontext</span></div>${t.analyse || ""}`, false)}
        ${sec("3&nbsp;·&nbsp;Begründeter Lösungsansatz", t.ansatz || "", false)}
        ${sec("4&nbsp;·&nbsp;Durchgerechnete Lösung", t.loesung || "", false)}
        ${sec("5&nbsp;·&nbsp;Antwortsatz und Kontrolle", `${t.antwortsatz || ""}${t.kontrolle ? `<div class="nv-idee"><p><b>Kontrolle:</b> ${t.kontrolle}</p></div>` : ""}`, false)}
      </div>
    </article>`;
  };

  /* ---------- Interaktion einer Karte ---------- */
  function updateScore(card, t) {
    const sc = card.querySelector(`[data-score="${t.id}"]`); if (!sc) return;
    const n = t.teile.length; let k = 0; t.teile.forEach((_, i) => { if (store.ok(t.id, i)) k++; });
    sc.textContent = `${k}/${n}`; sc.className = "an-score" + (k === n ? " all" : k ? " some" : "");
    sc.title = `${k} von ${n} Teilaufgaben richtig bearbeitet`;
    if (AN._prog && AN._prog[card.dataset.afb]) AN._prog[card.dataset.afb]();
    if (AN.refreshProgress) AN.refreshProgress();
  }

  function initTask(card, t) {
    const g = card.querySelector(`[data-grafik="${t.id}"]`);
    if (g && t.grafik) { try { AN.plot(g, grafikToPlot(t.grafik)); } catch (e) { g.textContent = "(Grafik nicht verfügbar)"; } }
    const box = card.querySelector(`[data-teile="${t.id}"]`); box.textContent = "";
    t.teile.forEach((p, i) => box.appendChild(teilEl(card, t, p, i)));
    updateScore(card, t);
  }

  function fallbackLsg(p) {
    if (p.typ === "mc") { const ans = Array.isArray(p.a) ? p.a : [p.a]; return "Richtig " + (ans.length > 1 ? "sind: " : "ist: ") + ans.map((k) => p.o[k]).join("; ") + (p.why ? ". " + p.why : ""); }
    if (p.typ === "zahlen") return "Richtig ist: " + p.felder.map((f) => f.l + " " + fmt(f.a, 4)).join(", ");
    if (p.typ === "term") return "Richtig ist: <code>" + esc(String(p.a)) + "</code>";
    return "Das Ergebnis ist " + fmt(p.a, 4) + (p.einheit ? " " + p.einheit : "") + ".";
  }
  function shuffle(n) { const a = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function teilEl(card, t, p, i) {
    const wrap = el("div", { class: "an-teil" + (store.ok(t.id, i) ? " done" : "") });
    wrap.appendChild(el("div", { class: "an-frage", html: `<b>${p.label || String.fromCharCode(97 + i) + ")"}</b> ${p.frage}` }));
    const fb = el("div", { class: "an-fb", "aria-live": "polite" });
    let tries = 0, hint = 0, solved = false, input = null;
    const hilfen = p.hilfen || [];
    const mark = (ok, msg) => { fb.innerHTML = (ok ? "<b class='an-ok'>✓ Richtig.</b> " : "<b class='an-bad'>✗ Noch nicht.</b> ") + (msg || ""); AN.typeset(fb); };
    const win = (msg) => { solved = true; wrap.classList.add("done"); store.set(t.id, i); updateScore(card, t); mark(true, (msg || "") + (p.lsg ? `<div class="an-lsg">${p.lsg}</div>` : "")); };
    const fail = (msg) => { tries++; mark(false, msg || ""); if (tries >= 2 && !solved) showLsgBtn(); };
    let lsgBtn = null;
    function showLsgBtn() { if (lsgBtn) return; lsgBtn = AN.button("Lösung zeigen", () => { fb.innerHTML = `<b>Lösung:</b> ${p.lsg || fallbackLsg(p)}`; AN.typeset(fb); }, "an-btn-sm"); btns.appendChild(lsgBtn); }
    const btns = el("div", { class: "an-btnrow" });
    const tol = p.tol === undefined ? 0.01 : p.tol;

    if (p.typ === "num") {
      input = el("input", { type: "text", class: "nv-input an-in", inputmode: "decimal", "aria-label": "Antwort", placeholder: "Zahl" });
      const row = el("span", { class: "an-inrow" }, [input, AN.signBtn(input), p.einheit ? el("span", { class: "an-unit", html: p.einheit }) : null]);
      wrap.appendChild(row);
      const check = () => {
        const v = AN.num(input.value);
        if (!isFinite(v)) { fb.innerHTML = "<span class='an-bad'>Bitte eine Zahl eingeben</span> (Dezimalkomma oder Punkt; Brüche wie 3/4 sind erlaubt)."; return; }
        if (Math.abs(v - p.a) <= tol) return win(p.ok);
        const f = (p.fehler || []).find((e) => Math.abs(v - e.a) <= (e.tol === undefined ? tol : e.tol));
        fail(f ? f.msg : AN.autoDiag(v, p.a, p));
      };
      btns.appendChild(AN.button("Prüfen", check)); input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    } else if (p.typ === "zahlen") {
      const ins = p.felder.map((f) => { const inp = el("input", { type: "text", class: "nv-input an-in", inputmode: "decimal", "aria-label": f.l }); return { f, inp }; });
      const row = el("span", { class: "an-inrow" }, ins.flatMap((x) => [el("span", { class: "an-unit", html: x.f.l }), x.inp, AN.signBtn(x.inp), x.f.einheit ? el("span", { class: "an-unit", html: x.f.einheit }) : null]).filter(Boolean));
      wrap.appendChild(row);
      const check = () => {
        const vs = ins.map((x) => AN.num(x.inp.value));
        if (vs.some((v) => !isFinite(v))) { fb.innerHTML = "<span class='an-bad'>Bitte in jedes Feld eine Zahl eingeben.</span>"; return; }
        const okAll = vs.every((v, k) => Math.abs(v - ins[k].f.a) <= (ins[k].f.tol === undefined ? tol : ins[k].f.tol));
        if (okAll) return win(p.ok);
        const wrongs = ins.map((x, k) => Math.abs(vs[k] - x.f.a) > (x.f.tol === undefined ? tol : x.f.tol) ? x.f.l.replace(/<[^>]+>/g, "") : null).filter(Boolean);
        const fm = (p.fehler || []).find((e) => (Array.isArray(e.a) ? e.a : [e.a]).every((a, k) => Math.abs(vs[k] - a) <= tol));
        fail((fm ? fm.msg + " " : "") + "Falsch ist/sind: " + wrongs.join(", ") + ".");
      };
      btns.appendChild(AN.button("Prüfen", check)); ins.forEach((x) => x.inp.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); }));
    } else if (p.typ === "mc") {
      const multi = Array.isArray(p.a), group = "g" + Math.random().toString(36).slice(2, 8), chosen = new Set();
      const list = el("div", { class: "an-mc" });
      const order = shuffle(p.o.length);                 // Reihenfolge der Antworten wird gemischt (richtige Antwort nicht immer oben)
      order.forEach((k) => {
        const txt = p.o[k];
        const lab = el("label", { class: "an-mcopt", "data-k": String(k) });
        const inp = el("input", { type: multi ? "checkbox" : "radio", name: group });
        inp.addEventListener("change", () => { if (multi) { inp.checked ? chosen.add(k) : chosen.delete(k); } else { chosen.clear(); chosen.add(k); } });
        lab.append(inp, el("span", { html: txt })); list.appendChild(lab);
      });
      wrap.appendChild(list);
      btns.appendChild(AN.button("Prüfen", () => {
        if (!chosen.size) { fb.innerHTML = "<span class='an-bad'>Wähle zuerst eine Antwort.</span>"; return; }
        const ans = new Set(multi ? p.a : [p.a]);
        const same = chosen.size === ans.size && [...chosen].every((k) => ans.has(k));
        if (same) return win(p.why); fail((multi ? "Mindestens eine Auswahl stimmt nicht. " : "") + (p.fehlerMsg ? p.fehlerMsg[[...chosen][0]] || "" : ""));
      }));
    } else if (p.typ === "term") {
      input = el("input", { type: "text", class: "nv-input an-in an-term", "aria-label": "Term", placeholder: p.platzhalter || "z. B. 3x^2 - 4" });
      wrap.appendChild(el("span", { class: "an-inrow" }, [p.vor ? el("span", { class: "an-unit", html: p.vor }) : null, input].filter(Boolean)));
      const ref = AN.parse(p.a), pts = p.pts || [-2.3, -1.1, -0.4, 0.7, 1.6, 2.9, 4.2];
      const same = (f, g) => { let n = 0; for (const x of pts) { const a = f(x), b = g(x); if (!isFinite(a)) continue; if (!isFinite(b)) return false; if (Math.abs(a - b) > 1e-6 * (1 + Math.abs(a))) return false; n++; } return n >= 3; };
      const check = () => {
        let s = input.value.trim().replace(/^[A-Za-z]['′]*\s*\(x\)\s*=\s*/, "").replace(/^y\s*=\s*/i, "");
        if (!s) { fb.innerHTML = "<span class='an-bad'>Bitte einen Term eingeben.</span>"; return; }
        const f = AN.tryParse(s);
        if (!f) { fb.innerHTML = "<span class='an-bad'>Den Term kann ich nicht lesen.</span> Schreibe z. B. <code>3x^2 - 4</code>, <code>2*x</code>, <code>sin(x)</code>, <code>1/x^2</code> (Potenz mit ^, Brüche mit /, Funktionen mit Klammern)."; return; }
        if (same(ref, f)) return win(p.ok);
        const fm = (p.fehler || []).find((e) => { const g = AN.tryParse(e.t); return g && same(g, f); });
        fail(fm ? fm.msg : "Der Term stimmt an den Prüfstellen nicht mit der Musterlösung überein.");
      };
      btns.appendChild(AN.button("Prüfen", check)); input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    } else {   // selbst
      const ta = el("textarea", { class: "nv-input an-ta", rows: "4", placeholder: "Deine Lösung / Begründung hier notieren (bleibt nur auf deinem Gerät, wird nicht gespeichert)…" });
      wrap.appendChild(ta);
      btns.appendChild(AN.button("Mit Erwartungshorizont vergleichen", () => { solved = true; wrap.classList.add("done"); store.set(t.id, i); updateScore(card, t); fb.innerHTML = `<b>Erwartungshorizont</b> – vergleiche mit deiner Lösung:<div class="an-lsg">${p.erwartung}</div>`; AN.typeset(fb); }));
    }
    if (hilfen.length) {
      const hb = AN.button("💡 Hilfe: " + HILFE_NAMEN[0], () => {
        if (hint >= hilfen.length) { hint = 0; hs.textContent = ""; hb.textContent = "💡 Hilfe: " + HILFE_NAMEN[0]; return; }
        hs.appendChild(el("div", { class: "an-hilfe", html: `<b>${HILFE_NAMEN[Math.min(hint, 2)]}:</b> ${hilfen[hint]}` })); hint++; AN.typeset(hs);
        hb.textContent = hint >= hilfen.length ? "✕ Hilfen schließen" : "💡 Nächste Hilfe: " + HILFE_NAMEN[Math.min(hint, 2)];
      }, "an-btn-sm");
      const hs = el("div", { class: "an-hilfen" });
      btns.appendChild(hb); wrap.appendChild(btns); wrap.appendChild(hs);
    } else wrap.appendChild(btns);
    wrap.appendChild(fb);
    return wrap;
  }

  /* ---------- Tab: Liste mit Filter und Fortschritt ---------- */
  function tasksOf(afb) {
    return AN.TASKS[afb].slice().sort((a, b) => ABS.indexOf(a.abschnitt) - ABS.indexOf(b.abschnitt) || (a.id < b.id ? -1 : 1));
  }
  AN.tasksTabHtml = function (afb, section) {
    const list = tasksOf(afb);
    if (!list.length) return null;
    const chips = ABS.map((a) => `<button type="button" class="an-chip" data-an-filter="${a}" title="${ABS_NAME[a]}">${a}</button>`).join("");
    let html = `<div class="nv-lede"><b>${AFB_TXT[afb]}.</b> ${list.length} Aufgaben zu den Abschnitten 8.1 bis 8.7. Gib deine Ergebnisse in die Felder ein und lass sie sofort prüfen. Du kannst Hilfen in drei Stufen öffnen (Denkanstoß, Tipp, Lösungsschritt). Danach kannst du dir die Analyse, den Lösungsansatz und die durchgerechnete Lösung ansehen. Jede Aufgabe ist in fünf auf- und zuklappbare Abschnitte gegliedert.<div class="ws-progress" data-progress="${afb}"></div></div>
      <div class="an-filter"><span class="an-hint">Abschnitt:</span> <button type="button" class="an-chip on" data-an-filter="alle">alle</button>${chips}</div>`;
    html += list.map((t, i) => AN.taskCardHtml(t, afb, i + 1, section)).join("");
    return html;
  };
  AN.initTasks = function (panel, afb) {
    const list = tasksOf(afb);
    list.forEach((t) => { const card = panel.querySelector(`[data-task="${t.id}"]`); if (card) initTask(card, t); });
    const upd = () => {
      let tot = 0, ok = 0; list.forEach((t) => t.teile.forEach((_, i) => { tot++; if (store.ok(t.id, i)) ok++; }));
      const bar = panel.querySelector(`[data-progress="${afb}"]`);
      if (bar) bar.innerHTML = `<div class="an-bar"><span style="width:${tot ? Math.round(100 * ok / tot) : 0}%"></span></div><span class="an-hint">${ok} von ${tot} Teilaufgaben richtig</span> <button type="button" class="an-btn an-btn-sm" data-an-reset="1">Fortschritt zurücksetzen</button>`;
    };
    AN._prog = AN._prog || {}; AN._prog[afb] = upd; upd();
    if (panel._anBound) return; panel._anBound = true;
    panel.addEventListener("click", (e) => {
      const f = e.target.closest("[data-an-filter]");
      if (f) {
        const v = f.dataset.anFilter;
        panel.querySelectorAll(".an-chip").forEach((c) => c.classList.toggle("on", c === f));
        panel.querySelectorAll("article.nv-task").forEach((c) => { const t = list.find((x) => x.id === c.dataset.task); c.style.display = v === "alle" || (t && t.abschnitt === v) ? "" : "none"; });
        return;
      }
      if (e.target.closest("[data-an-reset]")) { { const rb = e.target.closest("[data-an-reset]"); if (rb.dataset.armed !== "1") { rb.dataset.armed = "1"; rb.textContent = "Wirklich zurücksetzen? Noch einmal tippen"; setTimeout(function () { rb.dataset.armed = "0"; rb.textContent = "Fortschritt zurücksetzen"; }, 4000); return; } rb.dataset.armed = "0"; store.reset(); list.forEach((t) => { const card = panel.querySelector(`[data-task="${t.id}"]`); if (card) initTask(card, t); }); upd(); if (AN.refreshProgress) AN.refreshProgress(); } }
    });
  };
  AN.progress = (afb) => { let tot = 0, ok = 0; AN.TASKS[afb].forEach((t) => t.teile.forEach((_, i) => { tot++; if (store.ok(t.id, i)) ok++; })); return { ok, tot }; };
  AN.progressReset = () => { store.reset(); };
  AN.ABSCHNITTE = { list: ABS, key: ABS_KEY, name: ABS_NAME };
})(window);
