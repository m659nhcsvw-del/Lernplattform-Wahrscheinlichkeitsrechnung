/* Lernkarten-Seite (Wahrscheinlichkeitsrechnung, übernommen aus der Analysis-Plattform): zwei Blätter DIN A5 quer je Karte (gefaltet A6).
   Kartendaten: AN_KARTEN_ADD([{nr, afb, abschnitt, titel, aufgabe, skizze?, loesung, theorie, merk, formeln, fehler}, …]) */
(function (global) {
  "use strict";
  const KARTEN = global.AN_KARTEN = [];
  global.AN_KARTEN_ADD = (arr) => arr.forEach((k) => KARTEN.push(k));
  const q = new URLSearchParams(location.search);
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  const AFBN = { 1: "AFB I", 2: "AFB II", 3: "AFB III" };
  const S = { aussen: "Außenseite (Blatt 1)", innen: "Innenseite (Blatt 2)", rueck: "Rückseite · Musterlösung", vorn: "Vorderseite · Aufgabe", theorie: "Theorie im Überblick", merk: "Merksatz", formeln: "Formeln, Vorgehen", fehler: "Häufigste Fehler", lernkarte: "Lernkarte",
    druckHinweis: "Druck: Papierformat DIN A5 quer, Skalierung 100 %, beidseitig mit „Wenden an der kurzen Kante“ (Blatt 1 = Außenseite, Blatt 2 = Innenseite). Danach in der Mitte falzen – ergibt eine DIN-A6-Karte. Alternativ auf A4 drucken und zuschneiden." };
  const COPY = "Copyright B. Ericke – Schuljahr 2026/2027. Nur für den Unterricht. Weitergabe, Veränderungen, Veröffentlichung durch Dritte nicht gestattet.";

  function skizzeHtml(host, spec) {
    // spec: wie AN.plot (curves als Terme: {f:"x^2"}), kleine Standardgröße
    const o = Object.assign({ width: 560, height: 280, legend: true }, spec);
    o.curves = (spec.curves || []).map((c, i) => ({ fn: typeof c.f === "function" ? c.f : AN.parse(c.f), cls: c.cls || "an-c" + ((i % 4) + 1), label: c.label, dash: c.dash, from: c.from, to: c.to }));
    o.areas = (spec.areas || []).map((a) => ({ fn: AN.parse(a.f), fn2: a.f2 ? AN.parse(a.f2) : undefined, from: a.from, to: a.to, cls: a.cls, op: a.op }));
    AN.plot(host, o);
  }
  function seite(cls, band, inhalt, fuss) {
    const s = el("section", "seite " + cls);
    s.innerHTML = `<div class="k-band"><span>${band[0]}</span><b>${band[1]}</b></div>${inhalt}<div class="k-fuss">${fuss || ""}</div>`;
    return s;
  }
  function karteBauen(k) {
    const nr = `${S.lernkarte} ${k.nr}/${KARTEN.length} · ${k.abschnitt}`;
    const vorn = seite("vorne", [nr, AFBN[k.afb]], `<div class="k-titel">${k.titel}</div><div class="aufgabe-text">${k.aufgabe}</div>${k.skizze ? `<div class="k-skizze"></div>` : ""}<div class="k-arbeit">Platz für deine Lösung</div>`, `${S.vorn} · Lösung auf der Rückseite, Theorie innen`);
    const hinten = seite("hinten", [nr, S.rueck], `<div class="k-titel">${k.titel}</div><div class="loesung-text">${k.loesung}</div>`, COPY);
    const innenL = seite("innen-l", [nr, S.theorie], `<div class="k-theorie">${k.theorie}</div><div class="k-box" style="margin-top:auto"><div class="k-kopf">${S.merk}</div>${k.merk}</div>`, "");
    const innenR = seite("innen-r", [nr, S.formeln], `<div class="k-formeln">${k.formeln}</div>${k.fehler ? `<div class="k-box" style="margin-top:auto"><div class="k-kopf">${S.fehler}</div>${k.fehler}</div>` : ""}`, "");
    const aussen = el("div", "blatt"); aussen.append(hinten, vorn);
    const innen = el("div", "blatt"); innen.append(innenL, innenR);
    if (k.skizze) skizzeHtml(vorn.querySelector(".k-skizze"), k.skizze);
    if (k.skizzeLoesung) { const h = el("div", "k-skizze"); hinten.insertBefore(h, hinten.querySelector(".k-fuss")); skizzeHtml(h, k.skizzeLoesung); }
    if (k.skizzeTheorie) { const h = el("div", "k-skizze"); innenL.querySelector(".k-theorie").after(h); skizzeHtml(h, k.skizzeTheorie); }
    return { aussen, innen };
  }
  function zeige(idx) {
    const bahn = document.getElementById("lk-bahn"); bahn.innerHTML = "";
    const k = KARTEN[idx], b = karteBauen(k);
    const h1 = el("div", "lk-beschriftung nur-bildschirm", S.aussen), h2 = el("div", "lk-beschriftung nur-bildschirm", S.innen);
    const w = el("div", "lk-warn nur-bildschirm", "");
    bahn.append(h1, b.aussen, h2, b.innen, w);
    const check = () => {
      const ueber = [...bahn.querySelectorAll(".seite")].filter((s) => [...s.children].some((c) => c.classList.contains("k-fuss") ? false : (c.getBoundingClientRect().bottom > s.getBoundingClientRect().bottom - 8)));
      if (ueber.length) { w.classList.add("an"); w.textContent = "Achtung: Text passt nicht vollständig auf die Karte (" + ueber.map((s) => s.className.replace("seite ", "")).join(", ") + ")."; } else w.classList.remove("an");
    };
    const run = () => { if (global.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([bahn]).then(() => requestAnimationFrame(check)).catch(check); else setTimeout(run, 80); };
    run();
  }
  global.AN_KARTEN_START = function () {
    document.getElementById("lk-eyebrow").textContent = "Wahrscheinlichkeitsrechnung / Eri · Lernkarten";
    document.getElementById("lk-titel").textContent = "Lernkarten Wahrscheinlichkeitsrechnung";
    document.getElementById("lk-hinweis").textContent = S.druckHinweis;
    if (!KARTEN.length) { document.getElementById("lk-bahn").textContent = "Es gibt noch keine Lernkarten."; return; }
    KARTEN.sort((a, b) => a.nr - b.nr);
    const nav = document.getElementById("lk-auswahl");
    let aktuell = Math.min(Math.max((+q.get("n") || 1) - 1, 0), KARTEN.length - 1), lastAfb = 0;
    KARTEN.forEach((k, i) => {
      if (k.afb !== lastAfb) { lastAfb = k.afb; nav.appendChild(el("div", "gruppe", AFBN[k.afb])); }
      const b = el("button", "knopf", `${k.nr} · ${k.abschnitt}`); b.type = "button"; b.title = k.titel;
      b.addEventListener("click", () => { aktuell = i; zeige(i); nav.querySelectorAll("button").forEach((x, j) => x.setAttribute("aria-pressed", String(j === i))); history.replaceState(null, "", "?n=" + (i + 1)); });
      b.setAttribute("aria-pressed", String(i === aktuell)); nav.appendChild(b);
    });
    document.getElementById("lk-druck").addEventListener("click", () => window.print());
    zeige(aktuell);
  };
})(window);
