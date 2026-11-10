/* ==========================================================================
   an-neu.js — neue Bausteine der Fassung „Lernplattform Analysis neu“
   · a-vermutung   Vermutungskasten mit gespeicherter Antwort und Rückmeldung je Option
   · a-schritte    Herleitung zum schrittweisen Aufdecken
   · a-fortschritt Fortschrittsübersicht (Start) und Zähler an den Aufgaben-Tabs
   · a-ti          Rechner-Trainer (TI-Nspire CAS, vereinfacht)
   · Injektion     „Das neue Problem“, Vermutungen und Herleitungen werden an die
                   vorhandenen Abschnitte angehängt, ohne die Originaltexte zu ändern
   Muss nach allen Inhaltsdateien und vor AN_start() geladen werden.
   ========================================================================== */
(function (global) {
  "use strict";
  const AN = global.AN, REG = AN.REG, el = AN.el, CAS = AN.CAS;

  /* ---------- Speicher (nur dieses Gerät, mit Schutz gegen gesperrten Speicher) ---------- */
  const mem = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const typeset = (root) => { if (AN.typeset) AN.typeset(root); };

  /* ======================= Vermutungskasten ======================= */
  AN.PRED = {};                                   // id -> Text der gewählten Option (für das Echo)
  function fillEchos(root) {
    (root || document).querySelectorAll("[data-echo]").forEach((e) => {
      const id = e.getAttribute("data-echo"), saved = mem.get("ws-pred", {})[id];
      const t = AN.PRED[id] && saved != null ? AN.PRED[id][saved] : null;
      e.innerHTML = t ? "„" + t + "“" : "noch keine abgegeben";
      if (t) typeset(e);
    });
  }
  REG["a-vermutung"] = function (host) {
    const id = host.dataset.id, ok = host.dataset.ok === undefined ? -1 : +host.dataset.ok;
    const q = host.querySelector(".q"), frage = q ? q.innerHTML : "";
    const opts = Array.from(host.querySelectorAll("li")).map((li) => {
      const f = li.querySelector(".fb"), fb = f ? f.innerHTML : ""; if (f) f.remove();
      return { txt: li.innerHTML, fb };
    });
    host.textContent = ""; host.classList.add("an-vermutung");
    AN.PRED[id] = opts.map((o) => o.txt);
    host.appendChild(el("div", { class: "an-v-h", text: "Erst vermuten" }));
    host.appendChild(el("div", { class: "an-v-q", html: frage }));
    const list = el("div", { class: "an-v-opts", role: "group", "aria-label": "Antwortmöglichkeiten" });
    const out = el("div", { class: "an-v-fb", "aria-live": "polite", hidden: "" });
    const btns = opts.map((o, i) => {
      const b = el("button", { type: "button", class: "an-v-opt", html: o.txt }); b.addEventListener("click", () => choose(i, true));
      list.appendChild(b); return b;
    });
    host.append(list, out, el("div", { class: "an-v-note", text: "Deine Auswahl bleibt nur auf diesem Gerät gespeichert. Du kannst sie später noch ändern." }));
    function choose(i, save) {
      btns.forEach((b, j) => { b.setAttribute("aria-pressed", String(i === j)); b.classList.remove("is-ok", "is-bad"); });
      let cls = "";
      if (ok >= 0) { cls = i === ok ? "ok" : "bad"; btns[i].classList.add(cls === "ok" ? "is-ok" : "is-bad"); }
      out.hidden = false; out.className = "an-v-fb" + (cls ? " " + cls : "");
      out.innerHTML = (ok >= 0 ? (cls === "ok" ? "<b>Gut vermutet.</b> " : "<b>Noch nicht ganz.</b> ") : "<b>Vermutung gespeichert.</b> ") + opts[i].fb;
      typeset(out);
      if (save) { const m = mem.get("ws-pred", {}); m[id] = i; mem.set("ws-pred", m); }
      fillEchos(document);
    }
    const saved = mem.get("ws-pred", {})[id];
    if (saved != null && opts[saved]) choose(saved, false);
  };

  /* ======================= Herleitung zum Aufdecken ======================= */
  REG["a-schritte"] = function (host) {
    const titel = host.dataset.titel || "Herleitung Schritt für Schritt";
    const items = Array.from(host.querySelectorAll("ol > li")).map((li) => li.innerHTML);
    host.textContent = ""; host.classList.add("an-schritte");
    host.appendChild(el("div", { class: "an-v-h", text: titel }));
    host.appendChild(el("p", { class: "an-hint", text: "Überlege bei jedem Schritt zuerst selbst, wie es weitergeht. Dann decke den nächsten Schritt auf." }));
    const ol = el("ol", { class: "an-st-list" });
    const lis = items.map((h) => { const li = el("li", { html: h }); ol.appendChild(li); return li; });
    const row = el("div", { class: "an-btnrow" });
    let k = 1;
    const nextB = AN.button("", () => { if (k < lis.length) { lis[k].classList.add("an-reveal"); k++; upd(); } });
    const allB = AN.button("Alle Schritte zeigen", () => { k = lis.length; upd(); }, "ghost");
    const resB = AN.button("Von vorn", () => { k = 1; lis.forEach((l) => l.classList.remove("an-reveal")); upd(); }, "ghost");
    row.append(nextB, allB, resB);
    host.append(ol, row);
    function upd() {
      lis.forEach((l, i) => { l.hidden = i >= k; });
      const done = k >= lis.length;
      nextB.disabled = allB.disabled = done; resB.hidden = !done;
      nextB.textContent = done ? "Alle Schritte gezeigt" : "Nächster Schritt (" + (k + 1) + " von " + lis.length + ")";
    }
    upd(); fillEchos(host); typeset(host);
  };

  /* ======================= Fortschritt ======================= */
  const AFB_NAMEN = { afb1: "AFB I · Grundwissen", afb2: "AFB II · Zusammenhänge", afb3: "AFB III · Begründen" };
  const AFB_TAB = { afb1: "Aufgaben · AFB I", afb2: "Aufgaben · AFB II", afb3: "Aufgaben · AFB III" };
  AN._fort = [];
  REG["a-fortschritt"] = function (host) {
    host.classList.add("an-fortschritt"); host.textContent = "";
    AN._fort.push(host); render(host);
  };
  function render(host) {
    if (!AN.progress) return;
    let ok = 0, tot = 0;
    const rows = ["afb1", "afb2", "afb3"].map((a) => {
      const p = AN.progress(a); ok += p.ok; tot += p.tot;
      const pct = p.tot ? Math.round(100 * p.ok / p.tot) : 0;
      return `<button type="button" class="an-fort-row" data-tab="${a}"><span class="an-fort-n">${AFB_NAMEN[a]}</span><span class="an-bar"><span style="width:${pct}%"></span></span><span class="an-fort-v">${p.ok}/${p.tot}</span></button>`;
    }).join("");
    host.innerHTML = `<div class="an-v-h">Dein Fortschritt auf diesem Gerät</div>
      <p class="an-hint">${ok ? `Du hast ${ok} von ${tot} Teilaufgaben richtig gelöst.` : `${tot} Teilaufgaben warten auf dich. Tippe auf eine Zeile, um zu den Aufgaben zu springen.`}</p>${rows}`;
  }
  AN.refreshProgress = function () {
    AN._fort = AN._fort.filter((h) => document.body.contains(h));
    AN._fort.forEach(render);
    ["afb1", "afb2", "afb3"].forEach((a) => {
      const b = document.getElementById("tabbtn-" + a); if (!b || !AN.progress) return;
      const p = AN.progress(a); let s = b.querySelector(".an-tabbadge");
      if (!s) { s = el("span", { class: "an-tabbadge" }); b.appendChild(s); }
      s.textContent = p.ok + "/" + p.tot; s.classList.toggle("full", p.tot > 0 && p.ok === p.tot); s.classList.toggle("some", p.ok > 0 && p.ok < p.tot);
      s.setAttribute("aria-label", p.ok + " von " + p.tot + " Teilaufgaben richtig");
    });
  };

  /* ======================= Rechner-Trainer (TI-Nspire CAS) ======================= */
  function close(a, b) { return Math.abs(a - b) < 1e-6 * (1 + Math.abs(b)); }
  function sameFn(res, g) {
    if (!res || !res.ast) return false;
    const vs = ["x"]; try { return [-2.3, -0.7, 0.4, 1.9, 3.1].every((x) => close(CAS.valueAt(res.ast, vs[0], x), g(x))); } catch (e) { return false; }
  }
  const lastOf = (H, test) => H.some((h) => h.res && test(h));
  const FDEF = (ctx) => { const F = ctx.funcs.f; if (!F) return false; try { return CAS.valueAt(F.body, F.par, 2) === 2 && CAS.valueAt(F.body, F.par, 3) === 18; } catch (e) { return false; } };
  const MISSIONS = [
    { g: "Eingabe", t: "Gib <code>-3^2</code> ein und danach <code>(-3)^2</code>. Vergleiche beide Ergebnisse.", sol: "-3^2   und   (-3)^2",
      ok: (H) => lastOf(H, (h) => h.res.v === -9 && /^\s*-\s*3\s*\^\s*2\s*$/.test(h.src)) && lastOf(H, (h) => h.res.v === 9), tip: "Ohne Klammer rechnet der TI erst die Potenz: −(3²) = −9. Mit Klammer ist (−3)² = 9." },
    { g: "Eingabe", t: "Lege die Funktion $f(x)=x^3-3x$ mit <code>Define</code> fest.", sol: "Define f(x)=x^3-3x", ok: (H, ctx) => FDEF(ctx), tip: "Danach kennt der Rechner f und du kannst f(2), f'(x) und mehr eingeben." },
    { g: "Rechnen", t: "Berechne den Funktionswert $f(2)$.", sol: "f(2)", ok: (H) => lastOf(H, (h) => h.res.v === 2 && /f\s*\(\s*2\s*\)/.test(h.src)), tip: "Probe von Hand: 2³ − 3·2 = 8 − 6 = 2." },
    { g: "Rechnen", t: "Berechne die mittlere Änderungsrate von $f$ im Intervall $[1;3]$ als Differenzenquotient.", sol: "(f(3)-f(1))/(3-1)", ok: (H) => lastOf(H, (h) => h.res.v !== undefined && close(h.res.v, 10) && /f\s*\(/.test(h.src)), tip: "Setze Zähler und Nenner in Klammern. Ohne Klammern teilt der TI nur durch die erste Zahl." },
    { g: "Ableiten", t: "Bilde die Ableitung von $f$. Zwei Wege gehen: <code>d(f(x),x)</code> oder <code>f'(x)</code>.", sol: "f'(x)", ok: (H) => lastOf(H, (h) => h.res.kind === "expr" && sameFn(h.res, (x) => 3 * x * x - 3)), tip: "Vergleiche mit deiner Rechnung: f′(x) = 3x² − 3." },
    { g: "Ableiten", t: "Wie steil ist der Graph bei $x=2$? Berechne $f'(2)$.", sol: "f'(2)", ok: (H) => lastOf(H, (h) => h.res.v !== undefined && close(h.res.v, 9)), tip: "Von Hand: 3·2² − 3 = 9." },
    { g: "Untersuchen", t: "Finde die Kandidaten für Extremstellen: Löse $f'(x)=0$.", sol: "solve(f'(x)=0,x)", ok: (H) => lastOf(H, (h) => h.res.kind === "sol" && h.res.vals.length === 2 && close(h.res.vals[0], -1) && close(h.res.vals[1], 1)), tip: "Das sind nur Kandidaten. Ob Hoch- oder Tiefpunkt vorliegt, entscheidet erst f″ oder der Vorzeichenwechsel." },
    { g: "Untersuchen", t: "Bestimme $f''(1)$. Ist der Wert positiv, liegt bei $x=1$ ein Tiefpunkt.", sol: "f''(1)", ok: (H) => lastOf(H, (h) => h.res.v !== undefined && close(h.res.v, 6) && /''/.test(h.src)), tip: "f″(x) = 6x, also f″(1) = 6 > 0: Tiefpunkt bei x = 1." },
    { g: "Untersuchen", t: "Suche die Wendestelle: Löse $f''(x)=0$.", sol: "solve(f''(x)=0,x)", ok: (H) => lastOf(H, (h) => h.res.kind === "sol" && h.res.vals.length === 1 && close(h.res.vals[0], 0)), tip: "Auch hier gilt: f″(x) = 0 ist nur die notwendige Bedingung. Hier wechselt f″ bei 0 das Vorzeichen, also ist es ein Wendepunkt." },
    { g: "Kontrolle", t: "Bestimme die Tangente an den Graphen von $f$ bei $x=2$ mit <code>tangentLine</code>.", sol: "tangentLine(f(x),x,2)", ok: (H) => lastOf(H, (h) => h.res.kind === "expr" && sameFn(h.res, (x) => 9 * x - 16)), tip: "Von Hand: y = f′(2)·(x − 2) + f(2) = 9(x − 2) + 2 = 9x − 16." },
    { g: "Kontrolle", t: "Prüfe dein Ableitungsergebnis mit einer Gleichung. Der TI antwortet <code>true</code>, wenn beide Seiten für jedes $x$ gleich sind: <code>f'(x)=3x^2-3</code>.", sol: "f'(x)=3x^2-3", ok: (H) => lastOf(H, (h) => h.res.kind === "bool" && h.res.v === true && /=/.test(h.src) && /f\s*'/.test(h.src)), tip: "So kontrollierst du Umformungen: Lass den TI beide Terme vergleichen." }
  ];
  const KEYS = [
    [["x", "x"], ["^", "^"], ["(", "("], [")", ")"], [",", ","], ["=", "="], ["|", "|"], ["'", "'"]],
    [["√", "sqrt("], ["d(", "d("], ["solve(", "solve("], ["zeros(", "zeros("], ["expand(", "expand("], ["tangentLine(", "tangentLine("], ["Define", "Define "], ["f(", "f("]],
    [["▲", "@up"], ["⌫", "@bs"], ["C", "@clear"], ["≈", "@approx"], ["enter", "@enter"]]
  ];
  REG["a-ti"] = function (host) {
    host.classList.add("an-ti"); host.textContent = "";
    const ctx = CAS.newCtx(), H = [], done = [];
    let cur = 0, lastSrc = "";
    const hist = el("div", { class: "an-ti-hist", "aria-live": "polite" });
    const input = el("input", { type: "text", class: "an-ti-in", id: "ti-in-" + Math.random().toString(36).slice(2, 7), "aria-label": "Eingabezeile", autocapitalize: "off", autocomplete: "off", autocorrect: "off", spellcheck: "false", placeholder: "Eingabe wie am TI" });
    const msg = el("div", { class: "an-ti-msg", "aria-live": "polite" });
    const screen = el("div", { class: "an-ti-screen" }, [
      el("div", { class: "an-ti-bar" }, [el("span", { class: "an-ti-tab", text: "1.1" }), el("span", { text: "Calculator" }), el("span", { class: "an-ti-rad", text: "RAD" })]),
      hist, el("div", { class: "an-ti-entry" }, [el("span", { text: "▸" }), input])
    ]);
    const keys = el("div", { class: "an-ti-keys" });
    KEYS.forEach((r) => r.forEach(([lab, act]) => {
      const b = el("button", { type: "button", class: "an-ti-key" + (act.charAt(0) === "@" ? " ctrl" : "") + (act === "@enter" ? " go" : ""), text: lab, "aria-label": lab });
      b.addEventListener("click", () => key(act)); keys.appendChild(b);
    }));
    const device = el("div", { class: "an-ti-device" }, [screen, keys, msg]);

    const mTitle = el("div", { class: "an-ti-mg" }), mText = el("div", { class: "an-ti-mt" }), mTip = el("div", { class: "an-ti-tip", hidden: "" });
    const dots = el("div", { class: "an-ti-dots" });
    const dotB = MISSIONS.map((m, i) => { const d = el("button", { type: "button", class: "an-ti-dot", text: String(i + 1), "aria-label": "Auftrag " + (i + 1) + ": " + m.g }); d.addEventListener("click", () => { cur = i; showM(); }); dots.appendChild(d); return d; });
    const solB = AN.button("Eingabe verraten", () => { mTip.hidden = false; mTip.innerHTML = "<b>Eingabe:</b> <code>" + MISSIONS[cur].sol.replace(/</g, "&lt;") + "</code>"; }, "ghost");
    const mission = el("div", { class: "an-ti-mission" }, [el("div", { class: "an-v-h", text: "Aufträge mit f(x) = x³ − 3x" }), dots, mTitle, mText, el("div", { class: "an-btnrow" }, [solB]), mTip]);
    host.append(device, mission);

    function showM() {
      const m = MISSIONS[cur];
      dotB.forEach((d, i) => { d.classList.toggle("done", !!done[i]); d.setAttribute("aria-current", String(i === cur)); });
      mTitle.textContent = "Auftrag " + (cur + 1) + " von " + MISSIONS.length + " · " + m.g + (done[cur] ? " · erledigt ✓" : "");
      mText.innerHTML = m.t; mTip.hidden = !done[cur]; if (done[cur]) mTip.innerHTML = "<b>Gut.</b> " + m.tip;
      typeset(mText);
    }
    function add(src, res, err) {
      if (hist.querySelector(".empty")) hist.textContent = "";
      const line = el("div", { class: "an-ti-line" });
      line.append(el("span", { class: "in", text: src }), el("span", { class: "out" + (err ? " err" : ""), text: err ? "Fehler" : res.text }));
      hist.appendChild(line); hist.scrollTop = hist.scrollHeight;
    }
    function submit(approx) {
      const src = input.value; if (!src.trim()) return;
      lastSrc = src; let res = null, err = null;
      try { res = CAS.run(src, ctx, approx); } catch (e) { err = e instanceof CAS.Err ? e.msg : "Der Trainer kann diese Eingabe nicht verarbeiten."; }
      add(src, res, err);
      msg.className = "an-ti-msg" + (err ? " err" : ""); msg.textContent = err ? err : (res && res.note) || "";
      if (res) H.push({ src, res });
      input.value = "";
      let changed = false;
      MISSIONS.forEach((m, i) => { if (!done[i]) { let ok = false; try { ok = m.ok(H, ctx); } catch (e) { ok = false; } if (ok) { done[i] = true; changed = true; } } });
      if (changed) { const n = done.findIndex((d, i) => !d && i >= cur); if (done[cur] && n >= 0) { /* bleibt auf dem erledigten Auftrag, damit die Rückmeldung sichtbar ist */ } }
      showM(); input.focus();
    }
    function key(act) {
      if (act === "@enter") return submit(false);
      if (act === "@approx") return submit(true);
      if (act === "@clear") { input.value = ""; return input.focus(); }
      if (act === "@up") { input.value = lastSrc; return input.focus(); }
      if (act === "@bs") { const s = input.selectionStart; if (s > 0) { input.value = input.value.slice(0, s - 1) + input.value.slice(input.selectionEnd); input.setSelectionRange(s - 1, s - 1); } return input.focus(); }
      const s = input.selectionStart == null ? input.value.length : input.selectionStart, e = input.selectionEnd == null ? s : input.selectionEnd;
      input.value = input.value.slice(0, s) + act + input.value.slice(e); const p = s + act.length; input.setSelectionRange(p, p); input.focus();
    }
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); submit(e.ctrlKey || e.metaKey); }
      else if (e.key === "ArrowUp") { e.preventDefault(); input.value = lastSrc; }
    });
    hist.appendChild(el("div", { class: "empty", text: "Tippe eine Rechnung ein und bestätige mit enter. Mit ≈ (oder ctrl+enter) bekommst du eine Dezimalzahl." }));
    showM();
  };

  /* ======================= Injektion in vorhandene Abschnitte ======================= */
  AN.INJ = AN.INJ || {};          // Schlüssel -> { top, pre, post }
  AN.PANEL_POST = AN.PANEL_POST || {};
  function splice(body, inj) {
    let out = body;
    if (inj.pre) { const i = out.indexOf("</p>"); out = i < 0 ? inj.pre + out : out.slice(0, i + 4) + inj.pre + out.slice(i + 4); }
    if (inj.top) out = inj.top + out;
    if (inj.post) out += inj.post;
    return out;
  }
  AN.installInjections = function () {
    const C = global.AN_CONTENT || {};
    Object.keys(C).forEach((panel) => {
      Object.keys(C[panel]).forEach((lang) => {
        const f = C[panel][lang];
        C[panel][lang] = function (S, t) {
          const S2 = (title, body, open, key) => { const inj = key && AN.INJ[key]; return S(title, inj ? splice(body, inj) : body, open, key); };
          let html = f(S2, t);
          if (AN.PANEL_POST[panel]) html = AN.PANEL_POST[panel](html);
          return html;
        };
      });
    });
  };

  /* ======================= Wissensspeicher: Suche und Filter ======================= */
  function filterSpeicher() {
    const q = ((document.getElementById("sp-q") || {}).value || "").trim().toLowerCase();
    const chip = document.querySelector(".an-sp-chip.on"), k = chip ? chip.dataset.k : "alle";
    let n = 0;
    document.querySelectorAll(".an-sp").forEach((c) => {
      const show = (k === "alle" || c.dataset.k === k) && (!q || c.textContent.toLowerCase().indexOf(q) >= 0);
      c.hidden = !show; if (show) n++;
    });
    const e = document.getElementById("sp-none"); if (e) e.hidden = n > 0;
  }
  document.addEventListener("input", (e) => { if (e.target && e.target.id === "sp-q") filterSpeicher(); });
  document.addEventListener("click", (e) => {
    const c = e.target.closest(".an-sp-chip");
    if (c) { document.querySelectorAll(".an-sp-chip").forEach((x) => x.classList.toggle("on", x === c)); filterSpeicher(); }
    const r = e.target.closest("[data-an-reset2]");
    if (r) {
      if (r.dataset.armed === "1") { AN.progressReset(); r.dataset.armed = "0"; r.textContent = "Fortschritt zurücksetzen"; location.reload(); }
      else { r.dataset.armed = "1"; r.textContent = "Wirklich zurücksetzen? Noch einmal tippen"; setTimeout(() => { r.dataset.armed = "0"; r.textContent = "Fortschritt zurücksetzen"; }, 4000); }
    }
  });
})(window);
