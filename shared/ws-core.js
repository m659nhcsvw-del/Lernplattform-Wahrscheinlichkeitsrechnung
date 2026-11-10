/* ==========================================================================
   ws-core.js — Grundgerüst der Bausteine (Register, Selbsttest, Montage)
   Übernommen aus shared/an-widgets.js der Lernplattform Analysis.
   Einbindung im Text:  <div data-an="NAME" data-…></div>
   AN.mount(wurzel) ersetzt alle Platzhalter durch den benannten Baustein.
   ========================================================================== */
(function (global) {
  "use strict";
  const AN = global.AN, el = AN.el, button = AN.button;
  const REG = AN.REG = AN.REG || {};

  AN.card = function (host, title) {
    host.classList.add("nv-tool", "an-widget");
    host.textContent = "";
    if (title) host.appendChild(el("div", { class: "an-title", text: title }));
    return host;
  };
  AN.row = (kids) => el("div", { class: "nv-tool-grid" }, kids);
  AN.info = () => el("div", { class: "nv-tool-result an-info", "aria-live": "polite" });
  AN.typeset = (root) => { if (global.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([root]).catch(() => {}); };

  /* ======================= Quiz / Selbstprüfung ======================= */
  AN.QUIZ = AN.QUIZ || {};
  REG["quiz"] = function (host) {
    const id = host.dataset.quiz, Q = (AN.QUIZ[id] || []);
    host.classList.add("an-quiz", "nv-tool"); host.textContent = "";
    let score = 0, done = 0;
    const tot = el("div", { class: "an-quizscore", "aria-live": "polite" });
    Q.forEach((q, i) => {
      const box = el("div", { class: "an-q" }), fb = el("div", { class: "an-fb" });
      box.appendChild(el("p", { html: `<b>${i + 1}.</b> ${q.q}` }));
      let finished = false;
      const finish = (ok) => { if (finished) return; finished = true; done++; if (ok) score++; fb.innerHTML = (ok ? "<b class='an-ok'>✓ Richtig.</b> " : "<b class='an-bad'>✗ Nicht ganz.</b> ") + (q.why || ""); AN.typeset(fb); tot.textContent = `Stand: ${score} von ${Q.length} richtig (${done} bearbeitet)`; };
      if (q.t === "num") {
        const inp = el("input", { type: "text", class: "nv-input", inputmode: "decimal", "aria-label": "Antwort" });
        const b = button("Prüfen", () => { const v = AN.num(inp.value); if (!isFinite(v)) { fb.innerHTML = "<span class='an-bad'>Bitte eine Zahl eingeben (Dezimalzahl oder Bruch).</span>"; return; } finish(Math.abs(v - q.a) <= (q.tol === undefined ? 0.01 : q.tol)); });
        box.append(el("div", { class: "an-btnrow" }, [inp, b]));
      } else {
        const ul = el("div", { class: "an-mc" });
        q.o.forEach((t, k) => { const b = el("button", { class: "an-mcbtn", type: "button", html: t }); b.addEventListener("click", () => { if (finished) return; b.classList.add(k === q.a ? "ok" : "bad"); if (k !== q.a) ul.children[q.a].classList.add("ok"); finish(k === q.a); }); ul.appendChild(b); });
        box.append(ul);
      }
      box.append(fb); host.appendChild(box);
    });
    host.append(tot);
    tot.textContent = `${Q.length} Fragen – antworte und lass dir die Begründung zeigen.`;
    AN.typeset(host);
  };

  /* ======================= Montage ======================= */
  AN.mount = function (root) {
    root.querySelectorAll("[data-an]").forEach((e) => {
      if (e.dataset.anMounted) return; e.dataset.anMounted = "1";
      const f = REG[e.getAttribute("data-an")];
      if (!f) { e.textContent = "(Baustein „" + e.getAttribute("data-an") + "“ nicht gefunden)"; return; }
      try { f(e); } catch (err) { e.textContent = "(Baustein konnte nicht geladen werden: " + err.message + ")"; if (global.console) console.error(err); }
    });
  };

  /* ======================= Textbausteine für die Inhaltsdateien ======================= */
  AN.H = {
    P: (html) => `<div class="nv-problem"><p class="pb-h">Das neue Problem</p><p>${html}</p></div>`,
    V: (id, frage, ok, opts) => `<div data-an="a-vermutung" data-id="${id}" data-ok="${ok}"><div class="q">${frage}</div><ol>${opts.map((o) => `<li>${o[0]}<span class="fb">${o[1]}</span></li>`).join("")}</ol></div>`,
    ST: (titel, steps) => `<div data-an="a-schritte" data-titel="${titel}"><ol>${steps.map((s) => `<li>${s}</li>`).join("")}</ol></div>`
  };
})(window);
