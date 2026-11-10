/* ==========================================================================
   an-plot.js — Lernplattform Analysis
   Termparser (sicher, ohne eval) und SVG-Koordinatensystem mit Kurven, Punkten,
   Geraden, Flächen und Zeigerinteraktion. Reine Vanilla-JS-Bibliothek.
   ========================================================================== */
(function (global) {
  "use strict";
  const AN = global.AN = global.AN || {};

  /* ---------------------------------------------------------------------
     1. Zahlenformat (Dezimalkomma bei de/uk, Punkt bei en)
     --------------------------------------------------------------------- */
  AN.lang = "de";
  AN.setLang = (l) => { AN.lang = l; };
  AN.fmt = function (x, d) {
    if (!isFinite(x)) return "–";
    if (d === undefined) d = 2;
    let s = (Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    s = s.replace(/\.?0+$/, "");
    if (s === "-0" || s === "") s = "0";
    s = s.replace("-", "−");
    return AN.lang === "en" ? s : s.replace(".", ",");
  };
  AN.fmtFix = function (x, d) {          // feste Nachkommastellen
    if (!isFinite(x)) return "–";
    let s = x.toFixed(d).replace("-", "−");
    return AN.lang === "en" ? s : s.replace(".", ",");
  };

  /* ---------------------------------------------------------------------
     2. Termparser:  "2x^3 - 4*sin(x)/x"  →  Funktion(x)
        Erlaubt: + - * / ^, Klammern, Zahlen (Komma oder Punkt), x,
        pi, e, sin cos tan exp ln log sqrt abs, implizites Malzeichen (2x, 3(x+1), x(x-1)).
     --------------------------------------------------------------------- */
  const FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan, exp: Math.exp, ln: Math.log, log: Math.log10,
    sqrt: Math.sqrt, abs: Math.abs, asin: Math.asin, acos: Math.acos, atan: Math.atan, sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh
  };
  AN.parse = function (src) {
    const s0 = String(src).replace(/\s+/g, " ").trim().replace(/,/g, ".").replace(/[−–]/g, "-").replace(/[·×]/g, "*").replace(/π/g, "pi").replace(/√/g, "sqrt");
    if (!s0) throw new Error("leer");
    const toks = [];
    const re = /\s*(?:(\d+\.?\d*|\.\d+)|([a-zA-Z]+)|([-+*/^()]))/y;
    let m, pos = 0;
    while (pos < s0.length) {
      if (/\s/.test(s0[pos]) && /^\s*$/.test(s0.slice(pos))) break;
      re.lastIndex = pos; m = re.exec(s0);
      if (!m) throw new Error("Unbekanntes Zeichen: " + s0[pos]);
      if (m[1] !== undefined) toks.push({ t: "n", v: parseFloat(m[1]) });
      else if (m[2] !== undefined) {
        let w = m[2].toLowerCase();
        while (w) {            // zusammengeschriebene Namen zerlegen: xsin → x sin, xe → x e
          const names = ["asin", "acos", "atan", "sinh", "cosh", "tanh", "sqrt", "sin", "cos", "tan", "exp", "abs", "log", "ln", "pi", "e", "x"];
          const hit = names.find((n) => w.indexOf(n) === 0);
          if (!hit) throw new Error("Unbekannt: " + w);
          toks.push({ t: "id", v: hit }); w = w.slice(hit.length);
        }
      }
      else toks.push({ t: m[3] });
      pos = re.lastIndex;
    }
    let i = 0;
    const peek = () => toks[i];
    const eat = (t) => { if (!toks[i] || toks[i].t !== t) throw new Error("erwartet " + t); i++; };
    function expr() {
      let l = term();
      while (peek() && (peek().t === "+" || peek().t === "-")) {
        const op = toks[i++].t, r = term(), a = l;
        l = op === "+" ? (x) => a(x) + r(x) : (x) => a(x) - r(x);
      }
      return l;
    }
    function startsFactor(t) { return t && (t.t === "n" || t.t === "id" || t.t === "("); }
    function term() {
      let l = unary();
      for (;;) {
        const p = peek();
        if (p && (p.t === "*" || p.t === "/")) {
          i++; const r = unary(), a = l;
          l = p.t === "*" ? (x) => a(x) * r(x) : (x) => a(x) / r(x);
        } else if (startsFactor(p)) {            // implizite Multiplikation
          const r = unary(), a = l;
          l = (x) => a(x) * r(x);
        } else break;
      }
      return l;
    }
    function unary() {
      if (peek() && peek().t === "-") { i++; const a = unary(); return (x) => -a(x); }
      if (peek() && peek().t === "+") { i++; return unary(); }
      return power();
    }
    function power() {
      const b = atom();
      if (peek() && peek().t === "^") {
        i++; const e = unary(); // rechtsassoziativ, erlaubt x^-2
        return (x) => Math.pow(b(x), e(x));
      }
      return b;
    }
    function atom() {
      const p = toks[i];
      if (!p) throw new Error("unerwartetes Ende");
      if (p.t === "n") { i++; const v = p.v; return () => v; }
      if (p.t === "(") { i++; const e = expr(); eat(")"); return e; }
      if (p.t === "id") {
        i++;
        if (p.v === "x") return (x) => x;
        if (p.v === "pi") return () => Math.PI;
        if (p.v === "e") return () => Math.E;
        if (FUNCS[p.v]) {
          let arg;
          if (peek() && peek().t === "(") { i++; arg = expr(); eat(")"); }
          else arg = power();                      // sin x, sin x^2 → sin(x^2)
          const f = FUNCS[p.v];
          return (x) => f(arg(x));
        }
        throw new Error("Unbekannt: " + p.v);
      }
      throw new Error("Unerwartet: " + p.t);
    }
    const f = expr();
    if (i < toks.length) throw new Error("Rest im Term");
    return f;
  };
  AN.tryParse = (s) => { try { return AN.parse(s); } catch (e) { return null; } };
  /* Zahleneingabe: Komma/Punkt, typografisches Minus, Brüche "a/b" */
  AN.num = function (s) {
    s = String(s).trim().replace(/[−–]/g, "-").replace(/,/g, ".").replace(/\s+/g, "");
    const m = /^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/.exec(s);
    if (m) return parseFloat(m[1]) / parseFloat(m[2]);
    return /^-?(\d+\.?\d*|\.\d+)$/.test(s) ? parseFloat(s) : NaN;
  };

  /* numerische Ableitung (zentral, adaptiv genug für Anzeigezwecke) */
  AN.d = (f, h) => (x) => { const e = h || 1e-5 * Math.max(1, Math.abs(x)); return (f(x + e) - f(x - e)) / (2 * e); };
  AN.d2 = (f) => (x) => { const e = 1e-3 * Math.max(1, Math.abs(x)); return (f(x + e) - 2 * f(x) + f(x - e)) / (e * e); };

  /* Nullstellen im Intervall (Vorzeichenwechsel + Bisektion) */
  AN.roots = function (f, a, b, n) {
    n = n || 800; const out = []; let xp = a, yp = f(a);
    for (let i = 1; i <= n; i++) {
      const x = a + (b - a) * i / n, y = f(x);
      if (isFinite(yp) && isFinite(y)) {
        if (yp === 0) out.push(xp);
        else if (yp * y < 0) {
          let lo = xp, hi = x, flo = yp;
          for (let k = 0; k < 60; k++) { const mid = (lo + hi) / 2, fm = f(mid); if (flo * fm <= 0) hi = mid; else { lo = mid; flo = fm; } }
          out.push((lo + hi) / 2);
        }
      }
      xp = x; yp = y;
    }
    if (isFinite(yp) && yp === 0) out.push(b);
    return out.filter((r, i) => i === 0 || Math.abs(r - out[i - 1]) > 1e-7);
  };

  /* ---------------------------------------------------------------------
     3. SVG-Koordinatensystem
     --------------------------------------------------------------------- */
  const NS = "http://www.w3.org/2000/svg";
  const svgEl = (tag, attrs, text) => {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    return e;
  };
  AN.svgEl = svgEl;
  function niceStep(range, target) {
    const raw = range / target, p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p;
    return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p;
  }

  /* o: {xMin,xMax,yMin,yMax,width,height,
         curves:[{fn,cls,label,dash,from,to,w}], areas:[{fn,fn2,from,to,cls,op}],
         lines:[{x0,y0,m,cls,dash,w}], segs:[{x1,y1,x2,y2,cls,dash,w,arrow}],
         pts:[{x,y,cls,r,open,label,dx,dy}], vlines:[{x,label,cls,dash}], hlines:[{y,label,cls,dash}],
         bands:[{x1,x2,y1,y2,cls,op}], texts:[{x,y,t,cls,anchor}],
         xLabel,yLabel,grid,legend,pointer:(x,y,type,ev)=>{}, ariaLabel, xStep, yStep} */
  AN.plot = function (container, o) {
    const W = o.width || 640, H = o.height || 320;
    const pad = { l: o.yLabel ? 50 : 38, r: 16, t: 16, b: o.xLabel ? 40 : 28 };
    const pw = W - pad.l - pad.r, ph = H - pad.t - pad.b;
    let xMin = o.xMin, xMax = o.xMax, yMin = o.yMin, yMax = o.yMax;
    if (yMin === undefined || yMax === undefined) {          // automatische y-Skala
      const ys = [0];
      (o.curves || []).forEach((c) => {
        const a = c.from !== undefined ? Math.max(c.from, xMin) : xMin, b = c.to !== undefined ? Math.min(c.to, xMax) : xMax;
        for (let i = 0; i <= 120; i++) { const y = c.fn(a + (b - a) * i / 120); if (isFinite(y) && Math.abs(y) < 1e6) ys.push(y); }
      });
      (o.pts || []).forEach((p) => ys.push(p.y));
      ys.sort((a, b) => a - b);
      const lo = ys[Math.floor(ys.length * 0.02)], hi = ys[Math.ceil(ys.length * 0.98) - 1];
      const padY = (hi - lo || 1) * 0.12;
      if (yMin === undefined) yMin = lo - padY; if (yMax === undefined) yMax = hi + padY;
    }
    const sx = (x) => pad.l + (x - xMin) / (xMax - xMin) * pw;
    const sy = (y) => pad.t + ph - (y - yMin) / (yMax - yMin) * ph;
    const ix = (px) => xMin + (px - pad.l) / pw * (xMax - xMin);
    const iy = (py) => yMin + (pad.t + ph - py) / ph * (yMax - yMin);

    container.classList.add("an-plot");
    container.textContent = "";
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", role: "img", "aria-label": o.ariaLabel || "Koordinatensystem" });
    container.appendChild(svg);
    const clipId = "c" + Math.random().toString(36).slice(2, 8);
    const defs = svgEl("defs"); const cp = svgEl("clipPath", { id: clipId });
    cp.appendChild(svgEl("rect", { x: pad.l, y: pad.t, width: pw, height: ph })); defs.appendChild(cp); svg.appendChild(defs);

    // Raster + Achsen + Skalierung
    const xs = o.xStep || niceStep(xMax - xMin, 8), ys2 = o.yStep || niceStep(yMax - yMin, 6);
    const gridG = svgEl("g", { class: "an-grid" }), axG = svgEl("g");
    for (let x = Math.ceil(xMin / xs) * xs; x <= xMax + 1e-9; x += xs) {
      const X = sx(x);
      if (o.grid !== false) gridG.appendChild(svgEl("line", { x1: X, y1: pad.t, x2: X, y2: pad.t + ph }));
      if (Math.abs(x) > xs * 1e-6) axG.appendChild(svgEl("text", { x: X, y: Math.min(Math.max(sy(0), pad.t) , pad.t + ph) + 15, class: "an-tick", "text-anchor": "middle" }, AN.fmt(x, 3)));
    }
    for (let y = Math.ceil(yMin / ys2) * ys2; y <= yMax + 1e-9; y += ys2) {
      const Y = sy(y);
      if (o.grid !== false) gridG.appendChild(svgEl("line", { x1: pad.l, y1: Y, x2: pad.l + pw, y2: Y }));
      if (Math.abs(y) > ys2 * 1e-6) axG.appendChild(svgEl("text", { x: Math.min(Math.max(sx(0), pad.l), pad.l + pw) - 5, y: Y + 4, class: "an-tick", "text-anchor": "end" }, AN.fmt(y, 3)));
    }
    svg.appendChild(gridG);
    const x0p = Math.min(Math.max(sx(0), pad.l), pad.l + pw), y0p = Math.min(Math.max(sy(0), pad.t), pad.t + ph);
    axG.appendChild(svgEl("line", { x1: pad.l, y1: y0p, x2: pad.l + pw, y2: y0p, class: "an-axis" }));
    axG.appendChild(svgEl("line", { x1: x0p, y1: pad.t, x2: x0p, y2: pad.t + ph, class: "an-axis" }));
    svg.appendChild(axG);
    if (o.xLabel) svg.appendChild(svgEl("text", { x: pad.l + pw / 2, y: H - 5, class: "an-axlabel", "text-anchor": "middle" }, o.xLabel));
    if (o.yLabel) svg.appendChild(svgEl("text", { x: 13, y: pad.t + ph / 2, class: "an-axlabel", "text-anchor": "middle", transform: `rotate(-90 13 ${pad.t + ph / 2})` }, o.yLabel));

    const g = svgEl("g", { "clip-path": `url(#${clipId})` });
    svg.appendChild(g);
    (o.bands || []).forEach((b) => {
      const x1 = sx(b.x1 === undefined ? xMin : b.x1), x2 = sx(b.x2 === undefined ? xMax : b.x2);
      const y1 = sy(b.y2 === undefined ? yMax : b.y2), y2 = sy(b.y1 === undefined ? yMin : b.y1);
      g.appendChild(svgEl("rect", { x: Math.min(x1, x2), y: Math.min(y1, y2), width: Math.abs(x2 - x1), height: Math.abs(y2 - y1), class: "an-fill " + (b.cls || "an-a1"), opacity: b.op === undefined ? 0.22 : b.op }));
    });
    (o.areas || []).forEach((a) => {
      const N = 160, from = Math.max(a.from, xMin), to = Math.min(a.to, xMax);
      let d = "";
      for (let i = 0; i <= N; i++) { const x = from + (to - from) * i / N; d += (i ? "L" : "M") + sx(x) + " " + sy(a.fn(x)) + " "; }
      for (let i = N; i >= 0; i--) { const x = from + (to - from) * i / N; d += "L" + sx(x) + " " + sy(a.fn2 ? a.fn2(x) : 0) + " "; }
      g.appendChild(svgEl("path", { d: d + "Z", class: "an-fill " + (a.cls || "an-a1"), opacity: a.op === undefined ? 0.28 : a.op }));
    });
    (o.vlines || []).forEach((v) => {
      g.appendChild(svgEl("line", { x1: sx(v.x), y1: pad.t, x2: sx(v.x), y2: pad.t + ph, class: "an-ref " + (v.cls || ""), "stroke-dasharray": v.dash === false ? "" : "5 4" }));
      if (v.label) g.appendChild(svgEl("text", { x: sx(v.x) + 4, y: pad.t + 12, class: "an-note " + (v.cls || "") }, v.label));
    });
    (o.hlines || []).forEach((v) => {
      g.appendChild(svgEl("line", { x1: pad.l, y1: sy(v.y), x2: pad.l + pw, y2: sy(v.y), class: "an-ref " + (v.cls || ""), "stroke-dasharray": v.dash === false ? "" : "5 4" }));
      if (v.label) g.appendChild(svgEl("text", { x: pad.l + 4, y: sy(v.y) - 4, class: "an-note " + (v.cls || "") }, v.label));
    });
    (o.curves || []).forEach((c, ci) => {
      const a = c.from !== undefined ? Math.max(c.from, xMin) : xMin, b = c.to !== undefined ? Math.min(c.to, xMax) : xMax;
      const N = c.n || 400; let d = "", pen = false, last = null;
      for (let i = 0; i <= N; i++) {
        const x = a + (b - a) * i / N, y = c.fn(x);
        const ok = isFinite(y) && Math.abs(y) < 1e7 && !(last !== null && Math.abs(y - last) > (yMax - yMin) * 3);
        if (ok) { d += (pen ? "L" : "M") + sx(x).toFixed(2) + " " + sy(y).toFixed(2) + " "; pen = true; last = y; } else { pen = false; last = isFinite(y) ? y : null; }
      }
      const p = svgEl("path", { d, class: "an-curve " + (c.cls || "an-c" + ((ci % 4) + 1)), fill: "none" });
      if (c.dash) p.setAttribute("stroke-dasharray", "7 5");
      if (c.w) p.setAttribute("stroke-width", c.w);
      g.appendChild(p);
    });
    (o.lines || []).forEach((l) => {
      const y1 = l.y0 + l.m * (xMin - l.x0), y2 = l.y0 + l.m * (xMax - l.x0);
      const p = svgEl("line", { x1: sx(xMin), y1: sy(y1), x2: sx(xMax), y2: sy(y2), class: "an-curve " + (l.cls || "an-c2") });
      if (l.dash) p.setAttribute("stroke-dasharray", "7 5");
      if (l.w) p.setAttribute("stroke-width", l.w);
      g.appendChild(p);
    });
    (o.segs || []).forEach((s) => {
      const p = svgEl("line", { x1: sx(s.x1), y1: sy(s.y1), x2: sx(s.x2), y2: sy(s.y2), class: "an-curve " + (s.cls || "an-c3") });
      if (s.dash) p.setAttribute("stroke-dasharray", "5 4");
      if (s.w) p.setAttribute("stroke-width", s.w);
      g.appendChild(p);
    });
    (o.texts || []).forEach((t) => g.appendChild(svgEl("text", { x: sx(t.x) + (t.dx || 0), y: sy(t.y) + (t.dy || 0), class: "an-note " + (t.cls || ""), "text-anchor": t.anchor || "start" }, t.t)));
    (o.pts || []).forEach((p) => {
      const cx = sx(p.x), cy = sy(p.y);
      g.appendChild(svgEl("circle", { cx, cy, r: p.r || 5, class: "an-pt " + (p.cls || "an-c2") + (p.open ? " open" : "") }));
      if (p.label) g.appendChild(svgEl("text", { x: cx + (p.dx === undefined ? 8 : p.dx), y: cy + (p.dy === undefined ? -8 : p.dy), class: "an-note " + (p.cls || ""), "text-anchor": p.anchor || "start" }, p.label));
    });
    // Legende
    if (o.legend !== false) {
      const items = (o.curves || []).filter((c) => c.label).map((c, ci) => ({ cls: c.cls || "an-c" + ((ci % 4) + 1), label: c.label, dash: c.dash }));
      items.forEach((it, k) => {
        const ly = pad.t + 12 + k * 16, lx = pad.l + 10;
        const ln = svgEl("line", { x1: lx, y1: ly, x2: lx + 22, y2: ly, class: "an-curve " + it.cls });
        if (it.dash) ln.setAttribute("stroke-dasharray", "7 5");
        svg.appendChild(ln);
        svg.appendChild(svgEl("text", { x: lx + 28, y: ly + 4, class: "an-leg" }, it.label));
      });
    }
    // Zeigerinteraktion
    if (o.pointer) {
      svg.style.touchAction = "none"; svg.style.cursor = "ew-resize";
      let down = false;
      const toData = (ev) => {
        const r = svg.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width * W, py = (ev.clientY - r.top) / r.height * H;
        return [ix(px), iy(py)];
      };
      svg.addEventListener("pointerdown", (ev) => { down = true; svg.setPointerCapture(ev.pointerId); const [x, y] = toData(ev); o.pointer(x, y, "down", ev); });
      svg.addEventListener("pointermove", (ev) => { if (!down) return; const [x, y] = toData(ev); o.pointer(x, y, "move", ev); });
      const up = (ev) => { if (!down) return; down = false; const [x, y] = toData(ev); o.pointer(x, y, "up", ev); };
      svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up);
    }
    return { svg, sx, sy, ix, iy, pad, W, H };
  };

  /* kleine DOM-Helfer für Widgets */
  AN.el = function (tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) { if (k === "class") e.className = attrs[k]; else if (k === "html") e.innerHTML = attrs[k]; else if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach((c) => c && e.appendChild(c));
    return e;
  };
  AN.slider = function (label, min, max, step, value, onInput, fmtFn) {
    const out = AN.el("span", { class: "an-val" });
    const inp = AN.el("input", { type: "range", min, max, step, value });
    const f = fmtFn || ((v) => AN.fmt(v, 3));
    out.textContent = f(+value);
    inp.addEventListener("input", () => { const v = parseFloat(inp.value); onInput(v); out.textContent = f(v); });
    const wrap = AN.el("label", { class: "nv-field an-slider" }, [AN.el("span", { html: label }), inp, out]);
    return { wrap, inp, set(v) { inp.value = v; out.textContent = f(+v); }, get: () => parseFloat(inp.value) };
  };
  AN.select = function (label, options, value, onChange) {
    const sel = AN.el("select", { class: "nv-input" });
    options.forEach(([v, t]) => sel.appendChild(AN.el("option", { value: v, text: t })));
    sel.value = value;
    sel.addEventListener("change", () => onChange(sel.value));
    const wrap = AN.el("label", { class: "nv-field" }, [AN.el("span", { html: label }), sel]);
    return { wrap, sel };
  };
  AN.button = function (text, onClick, cls) {
    const b = AN.el("button", { class: "an-btn " + (cls || ""), type: "button", text });
    b.addEventListener("click", onClick);
    return b;
  };

  /* Funktionsbibliothek für Widgets: [Schlüssel, Name, f, f', TeX, TeX von f'] */
  AN.LIB = {
    quad:  { name: "f(x) = x²",            f: (x) => x * x,             df: (x) => 2 * x,                 tex: "x^2",        dtex: "2x" },
    cube:  { name: "f(x) = x³",            f: (x) => x * x * x,         df: (x) => 3 * x * x,             tex: "x^3",        dtex: "3x^2" },
    lin:   { name: "f(x) = 0,5x + 1",      f: (x) => 0.5 * x + 1,       df: () => 0.5,                    tex: "0{,}5x+1",   dtex: "0{,}5" },
    sin:   { name: "f(x) = sin(x)",        f: Math.sin,                 df: Math.cos,                     tex: "\\sin x",    dtex: "\\cos x" },
    cos:   { name: "f(x) = cos(x)",        f: Math.cos,                 df: (x) => -Math.sin(x),          tex: "\\cos x",    dtex: "-\\sin x" },
    inv:   { name: "f(x) = 1/x",           f: (x) => 1 / x,             df: (x) => -1 / (x * x),          tex: "\\frac1x",   dtex: "-\\frac1{x^2}" },
    sqrt:  { name: "f(x) = √x",            f: Math.sqrt,                df: (x) => 0.5 / Math.sqrt(x),    tex: "\\sqrt x",   dtex: "\\frac1{2\\sqrt x}" },
    poly:  { name: "f(x) = 0,25x³ − x",    f: (x) => 0.25 * x * x * x - x, df: (x) => 0.75 * x * x - 1,   tex: "0{,}25x^3-x", dtex: "0{,}75x^2-1" },
    poly4: { name: "f(x) = 0,1x⁴ − 0,8x² + 1", f: (x) => 0.1 * Math.pow(x, 4) - 0.8 * x * x + 1, df: (x) => 0.4 * x * x * x - 1.6 * x, tex: "0{,}1x^4-0{,}8x^2+1", dtex: "0{,}4x^3-1{,}6x" },
    abs:   { name: "f(x) = |x|",           f: Math.abs,                 df: (x) => (x > 0 ? 1 : x < 0 ? -1 : NaN), tex: "|x|", dtex: "\\pm1" }
  };
})(window);
