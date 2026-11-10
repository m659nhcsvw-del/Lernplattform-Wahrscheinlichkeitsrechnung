/* ==========================================================================
   ws-sim3d.js — 3D-animierte Simulationen von Zufallsexperimenten (three.js)
   Bausteine (Einbindung: <div data-an="NAME" data-…></div>):
     w-wuerfel         ein oder zwei Würfel            data-ev = sechs | gerade | min5 | summe7 | pasch | min1sechs | summe10
     w-muenze          1 bis 3 Münzen                  data-n = 1 | 2 | 3
     w-urne            zweimal ziehen, Baumdiagramm    data-r, data-b, data-zurueck = 0 | 1, data-ev = zweiterot | beiderot | verschieden
     w-rad             Glücksrad, Zufallsgröße         data-sektoren = "Wert:Gewicht;…", data-einsatz, data-einheit
     w-test            1000 Personen, Vierfeldertafel  data-p, data-se, data-sp (in Prozent)
     w-sim-freiwurf    Simulation mit Zufallsziffern   (Trefferquote 70 %, drei Würfe)
     w-sim-sammeln     Würfeln, bis alle Augenzahlen da sind
     w-sim-geburtstag  Geburtstagsproblem              data-k = Gruppengröße
   Alle Szenen teilen sich EINEN WebGL-Renderer; das Bild wird in die Leinwand des
   jeweiligen Bausteins kopiert. So gibt es keine Grenze für die Anzahl der Bausteine.
   Ohne three.js/WebGL laufen die Simulationen ohne 3D-Bild weiter.
   ========================================================================== */
(function (global) {
  "use strict";
  const AN = global.AN, el = AN.el, button = AN.button, slider = AN.slider, select = AN.select, REG = AN.REG;
  const T = global.THREE;
  const f3 = (x) => AN.fmtFix(x, 3), f2 = (x) => AN.fmtFix(x, 2);
  const tx = (s) => String(s).replace(",", "{,}");
  const rnd = (a, b) => a + Math.random() * (b - a), rint = (n) => Math.floor(Math.random() * n);
  const UP = T ? new T.Vector3(0, 1, 0) : null;

  /* ======================= Bühne: gemeinsamer Renderer ======================= */
  let RENDERER;
  function renderer() {
    if (RENDERER !== undefined) return RENDERER;
    RENDERER = null;
    if (!T) return null;
    try {
      const r = new T.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      r.setClearColor(0x000000, 0); r.shadowMap.enabled = true; r.shadowMap.type = T.PCFSoftShadowMap;
      RENDERER = r;
    } catch (e) { RENDERER = null; }
    return RENDERER;
  }
  let stages = [], looping = false;
  function kick() { if (!looping) { looping = true; requestAnimationFrame(loop); } }
  function loop(now) {
    let active = false;
    stages.forEach((s) => { if (s.step(now)) active = true; });
    if (active) requestAnimationFrame(loop); else looping = false;
  }

  function stage(host, opt) {
    opt = opt || {};
    const wrap = el("div", { class: "ws-stage" }), res = el("div", { class: "ws-result", "aria-live": "polite" });
    host.appendChild(wrap);
    const R = renderer();
    const st = { ok: !!R, wrap, result: (t) => { res.textContent = t; } };
    if (!R) {
      wrap.classList.add("ws-nostage");
      wrap.appendChild(el("div", { text: "Die 3D-Ansicht konnte nicht geladen werden (dieser Browser unterstützt kein WebGL). Die Simulation läuft trotzdem, die Ergebnisse stehen unten." }));
      res.style.position = "static"; res.style.display = "inline-block"; res.style.marginTop = "6px"; wrap.appendChild(res);
      st.tween = () => Promise.resolve();
      return st;
    }
    const cv = el("canvas", { role: "img", "aria-label": opt.alt || "3D-Simulation" });
    wrap.append(cv, el("span", { class: "ws-badge", text: "3D" }), res);
    const scene = st.scene = new T.Scene(), cam = new T.PerspectiveCamera(opt.fov || 34, 2, 0.1, 200);
    const camPos = new T.Vector3().fromArray(opt.cam || [0, 5, 7]), look = new T.Vector3().fromArray(opt.look || [0, 0.4, 0]);
    scene.add(new T.HemisphereLight(0xffffff, 0x667788, 0.85));
    const sun = new T.DirectionalLight(0xffffff, 0.75); sun.position.set(3.5, 9, 5); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
    const sc = sun.shadow.camera, ex = opt.extent || 7; sc.left = -ex; sc.right = ex; sc.top = ex; sc.bottom = -ex; sc.near = 0.5; sc.far = 40; sun.shadow.bias = -0.0006;
    scene.add(sun);
    const ground = new T.Mesh(new T.PlaneGeometry(80, 80), new T.ShadowMaterial({ opacity: 0.25 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

    let tweens = [], dirty = true, W = 0, H = 0;
    const tmp = new T.Vector2();
    function size() {
      const w = wrap.clientWidth; if (!w) return false;
      const h = Math.round(Math.max(180, Math.min(w * (opt.ratio || 0.5), opt.maxH || 380)));
      if (w !== W || h !== H) {
        W = w; H = h;
        const d = Math.min(global.devicePixelRatio || 1, 2);
        cv.width = Math.round(w * d); cv.height = Math.round(h * d); cv.style.height = h + "px";
        cam.aspect = w / h;
        const k = Math.max(1, (opt.aspect || 1.9) / cam.aspect);
        cam.position.copy(camPos).sub(look).multiplyScalar(k).add(look); cam.lookAt(look); cam.updateProjectionMatrix();
      }
      return true;
    }
    function render() {
      if (!size()) return;
      R.setPixelRatio(1); R.getSize(tmp);
      if (tmp.x !== cv.width || tmp.y !== cv.height) R.setSize(cv.width, cv.height, false);
      R.render(scene, cam);
      const c = cv.getContext("2d"); c.clearRect(0, 0, cv.width, cv.height); c.drawImage(R.domElement, 0, 0);
      dirty = false;
    }
    st.tween = function (ms, fn) {
      return new Promise((done) => {
        if (ms <= 0) { fn(1); dirty = true; kick(); done(); return; }
        tweens.push({ ms, fn, done, t0: 0 }); kick();
      });
    };
    st.dirty = () => { dirty = true; kick(); };
    st.step = function (now) {
      if (tweens.length) {
        const cur = tweens; tweens = [];
        const keep = [];
        cur.forEach((tw) => { if (!tw.t0) tw.t0 = now; const t = Math.min(1, (now - tw.t0) / tw.ms); tw.fn(t); if (t >= 1) tw.done(); else keep.push(tw); });
        tweens = keep.concat(tweens); dirty = true;
      }
      if (dirty && wrap.offsetParent !== null) render();
      return tweens.length > 0;
    };
    if (global.ResizeObserver) new ResizeObserver(() => st.dirty()).observe(wrap); else global.addEventListener("resize", () => st.dirty());
    stages = stages.filter((s) => document.body.contains(s.wrap) || s === st); stages.push(st);
    kick();
    return st;
  }

  /* ======================= 3D-Bauteile ======================= */
  function tex(size, draw) {
    const c = document.createElement("canvas"); c.width = c.height = size; draw(c.getContext("2d"), size);
    const t = new T.CanvasTexture(c); t.anisotropy = 4; return t;
  }
  function table(st, w, d, col) {
    const m = new T.Mesh(new T.BoxGeometry(w, 0.3, d), new T.MeshStandardMaterial({ color: col || 0x2f6e55, roughness: 1 }));
    m.position.y = -0.15; m.receiveShadow = true; st.scene.add(m); return m;
  }
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  function mv(st, o, to, ms, arc) {
    let f = null;
    return st.tween(ms, (t) => {
      if (!f) f = o.position.clone();
      const e = ease(t);
      o.position.set(f.x + (to[0] - f.x) * e, f.y + (to[1] - f.y) * e + (arc || 0) * Math.sin(Math.PI * e), f.z + (to[2] - f.z) * e);
    });
  }

  /* ---- Würfel ---- */
  const PIPS = { 1: [[.5, .5]], 2: [[.27, .27], [.73, .73]], 3: [[.27, .27], [.5, .5], [.73, .73]], 4: [[.27, .27], [.73, .27], [.27, .73], [.73, .73]],
    5: [[.27, .27], [.73, .27], [.5, .5], [.27, .73], [.73, .73]], 6: [[.27, .25], [.73, .25], [.27, .5], [.73, .5], [.27, .75], [.73, .75]] };
  const DVAL = [3, 4, 1, 6, 2, 5], NORM = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];   // Flächenfolge der BoxGeometry
  function makeDie(col, pip) {
    const mats = DVAL.map((v) => new T.MeshStandardMaterial({ roughness: 0.45, map: tex(128, (c, s) => {
      c.fillStyle = col; c.fillRect(0, 0, s, s); c.strokeStyle = "rgba(0,0,0,.2)"; c.lineWidth = 6; c.strokeRect(3, 3, s - 6, s - 6);
      c.fillStyle = pip; PIPS[v].forEach((p) => { c.beginPath(); c.arc(p[0] * s, p[1] * s, s * 0.088, 0, 7); c.fill(); });
    }) }));
    const m = new T.Mesh(new T.BoxGeometry(1, 1, 1), mats); m.castShadow = true; m.position.y = 0.5; return m;
  }
  function dieQuat(v) {
    const q = new T.Quaternion().setFromUnitVectors(new T.Vector3().fromArray(NORM[DVAL.indexOf(v)]), UP);
    return new T.Quaternion().setFromAxisAngle(UP, rint(4) * Math.PI / 2 + rnd(-0.3, 0.3)).multiply(q);
  }
  function rollDie(st, die, v, end, ms) {
    const qT = dieQuat(v), ax = new T.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)).normalize(), A = rnd(4, 7) * Math.PI * 2, q = new T.Quaternion();
    const sx = end[0] - rnd(3, 4.2), sz = end[1] + rnd(-1, 1);
    return st.tween(ms, (t) => {
      const e = 1 - Math.pow(1 - t, 3);
      q.setFromAxisAngle(ax, A * (1 - e)); die.quaternion.copy(qT).multiply(q);
      const b = Math.abs(Math.cos(t * Math.PI * 2.5)) * Math.pow(1 - t, 2);
      die.position.set(sx + (end[0] - sx) * e, 0.5 + 2.6 * b + 0.25 * (1 - e), sz + (end[1] - sz) * e);
    });
  }

  /* ---- Münze ---- */
  function makeCoin(col) {
    const g = new T.Group();
    const side = new T.Mesh(new T.CylinderGeometry(0.62, 0.62, 0.1, 48, 1, true), new T.MeshStandardMaterial({ color: col, metalness: 0.25, roughness: 0.4 }));
    const face = (txt, sub, flip) => {
      const m = new T.Mesh(new T.CircleGeometry(0.62, 48), new T.MeshStandardMaterial({ metalness: 0.2, roughness: 0.45, map: tex(256, (c, s) => {
        c.fillStyle = col; c.fillRect(0, 0, s, s);
        c.strokeStyle = "rgba(0,0,0,.35)"; c.lineWidth = 8; c.beginPath(); c.arc(s / 2, s / 2, s / 2 - 16, 0, 7); c.stroke();
        c.fillStyle = "rgba(0,0,0,.75)"; c.textAlign = "center"; c.textBaseline = "middle";
        c.font = "bold " + s * 0.46 + "px Georgia, serif"; c.fillText(txt, s / 2, s * 0.45);
        c.font = "600 " + s * 0.1 + "px sans-serif"; c.fillText(sub, s / 2, s * 0.78);
      }) }));
      m.rotation.x = flip ? Math.PI / 2 : -Math.PI / 2; m.position.y = flip ? -0.051 : 0.051; return m;
    };
    g.add(side, face("W", "WAPPEN", false), face("Z", "ZAHL", true));
    g.traverse((o) => { o.castShadow = true; });
    g.position.y = 0.06; g.userData.rot = 0;
    return g;
  }
  function tossCoin(st, coin, zahl, ms) {
    const from = coin.userData.rot % (2 * Math.PI), to = rint(3) * 2 * Math.PI + 10 * Math.PI + (zahl ? Math.PI : 0), hgt = rnd(2.6, 3.4);
    coin.userData.rot = zahl ? Math.PI : 0;
    return st.tween(ms, (t) => {
      const fl = Math.min(1, t / 0.86);
      coin.rotation.x = from + (to - from) * fl;
      coin.rotation.z = Math.sin(fl * Math.PI) * 0.25;
      coin.position.y = 0.06 + hgt * 4 * fl * (1 - fl) + (t > 0.86 ? 0.12 * Math.sin((t - 0.86) / 0.14 * Math.PI) : 0);
    });
  }

  /* ---- Glücksrad ---- */
  const WCOL = ["#3b74c4", "#e0a12e", "#3e8f66", "#c9503f", "#7a5fc0", "#3e9aa0", "#d07a2a", "#8a8f99"];
  function makeWheel(st, secs, y0) {           // secs: [{label, w, col}]
    const tot = secs.reduce((s, x) => s + x.w, 0); let a = -Math.PI / 2;
    secs.forEach((s) => { s.a0 = a; a += 2 * Math.PI * s.w / tot; s.a1 = a; });
    const g = new T.Group(), R0 = 1.6;
    const rim = new T.Mesh(new T.CylinderGeometry(R0 + 0.08, R0 + 0.08, 0.18, 64), new T.MeshStandardMaterial({ color: 0x3a3f47, roughness: 0.6 }));
    rim.rotation.x = Math.PI / 2; rim.castShadow = true;
    const face = new T.Mesh(new T.CircleGeometry(R0, 64), new T.MeshStandardMaterial({ roughness: 0.6, map: tex(512, (c, s) => {
      const m = s / 2;
      secs.forEach((x) => { c.beginPath(); c.moveTo(m, m); c.arc(m, m, m, x.a0, x.a1); c.closePath(); c.fillStyle = x.col; c.fill(); c.strokeStyle = "rgba(255,255,255,.85)"; c.lineWidth = 3; c.stroke(); });
      c.fillStyle = "#fff"; c.textAlign = "center"; c.textBaseline = "middle";
      secs.forEach((x) => {
        const mid = (x.a0 + x.a1) / 2, wdt = x.a1 - x.a0;
        c.save(); c.translate(m + Math.cos(mid) * m * 0.68, m + Math.sin(mid) * m * 0.68); c.rotate(mid + Math.PI / 2);
        c.font = "bold " + Math.round(s * Math.min(0.12, 0.05 + wdt * 0.09)) + "px sans-serif"; c.fillText(x.label, 0, 0); c.restore();
      });
      c.beginPath(); c.arc(m, m, s * 0.045, 0, 7); c.fillStyle = "#2a2e35"; c.fill();
    }) }));
    face.position.z = 0.095;
    g.add(rim, face); g.position.set(0, y0, 0);
    const post = new T.Mesh(new T.BoxGeometry(0.26, y0, 0.2), new T.MeshStandardMaterial({ color: 0x6b6459, roughness: 0.8 })); post.position.set(0, y0 / 2, -0.22); post.castShadow = true;
    const base = new T.Mesh(new T.BoxGeometry(1.8, 0.14, 1.1), new T.MeshStandardMaterial({ color: 0x6b6459, roughness: 0.8 })); base.position.set(0, 0.07, -0.1); base.castShadow = true; base.receiveShadow = true;
    const ptr = new T.Mesh(new T.ConeGeometry(0.17, 0.44, 18), new T.MeshStandardMaterial({ color: 0xd2493d, roughness: 0.4 })); ptr.rotation.z = Math.PI; ptr.position.set(0, y0 + R0 + 0.16, 0.2); ptr.castShadow = true;
    st.scene.add(g, post, base, ptr);
    return {
      spin(i, ms, turns) {
        const s = secs[i], th = s.a0 + rnd(0.15, 0.85) * (s.a1 - s.a0), r0 = g.rotation.z;
        let r1 = Math.PI / 2 + th; const two = 2 * Math.PI;
        r1 += Math.ceil((r0 + (turns || 4) * two - r1) / two) * two;
        return st.tween(ms, (t) => { g.rotation.z = r0 + (r1 - r0) * (1 - Math.pow(1 - t, 3)); });
      },
      pick() { let u = Math.random() * tot; for (let i = 0; i < secs.length; i++) { u -= secs[i].w; if (u < 0) return i; } return secs.length - 1; }
    };
  }

  /* ======================= Diagramme und Zähler ======================= */
  function barSvg(cats, counts, n, theo) {
    const W = 330, H = 190, l = 36, r = 6, t = 14, b = 34, k = cats.length;
    let m = 0; for (let i = 0; i < k; i++) m = Math.max(m, n ? counts[i] / n : 0, theo ? theo[i] : 0);
    const ym = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1].find((v) => v >= m * 1.05) || 1;
    const Y = (v) => t + (H - t - b) * (1 - v / ym), bw = (W - l - r) / k;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Säulendiagramm der relativen Häufigkeiten">`;
    [0, 0.5, 1].forEach((q) => { const y = Y(q * ym); s += `<line class="ws-gridl" x1="${l}" x2="${W - r}" y1="${y}" y2="${y}"/><text class="ws-t" x="${l - 4}" y="${y + 3}" text-anchor="end">${Math.round(q * ym * 100)} %</text>`; });
    for (let i = 0; i < k; i++) {
      const h = n ? counts[i] / n : 0, x = l + i * bw + bw * 0.14, w = bw * 0.72;
      s += `<rect class="ws-barf" x="${x}" y="${Y(h)}" width="${w}" height="${Math.max(0, Y(0) - Y(h))}" rx="2"/>`;
      if (theo) s += `<line class="ws-theo" x1="${x - 2}" x2="${x + w + 2}" y1="${Y(theo[i])}" y2="${Y(theo[i])}"/>`;
      s += `<text class="ws-tl" x="${x + w / 2}" y="${H - b + 13}" text-anchor="middle">${cats[i]}</text><text class="ws-t" x="${x + w / 2}" y="${H - b + 26}" text-anchor="middle">${counts[i]}</text>`;
    }
    return s + `<line class="ws-ax" x1="${l}" x2="${W - r}" y1="${Y(0)}" y2="${Y(0)}"/></svg>`;
  }
  function lineSvg(hist, n, tr) {
    const W = 330, H = 190, l = 36, r = 8, t = 14, b = 34, lo = tr.range ? tr.range[0] : 0, hi = tr.range ? tr.range[1] : 1, N = Math.max(n, 20);
    const X = (i) => l + (W - l - r) * (i / N), Y = (v) => t + (H - t - b) * (1 - (Math.max(lo, Math.min(hi, v)) - lo) / (hi - lo));
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Verlauf über die Anzahl der Versuche">`;
    [lo, (lo + hi) / 2, hi].forEach((v) => { s += `<line class="ws-gridl" x1="${l}" x2="${W - r}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ws-t" x="${l - 4}" y="${Y(v) + 3}" text-anchor="end">${AN.fmt(v, 2)}</text>`; });
    s += `<line class="ws-theo" x1="${l}" x2="${W - r}" y1="${Y(tr.ref)}" y2="${Y(tr.ref)}"/>`;
    if (n) {
      const step = Math.max(1, Math.ceil(n / 260)), pts = [];
      for (let i = 0; i < n; i += step) pts.push(X(i + 1).toFixed(1) + "," + Y(hist[i]).toFixed(1));
      pts.push(X(n).toFixed(1) + "," + Y(hist[n - 1]).toFixed(1));
      s += `<polyline class="ws-run" points="${pts.join(" ")}"/>`;
    }
    s += `<text class="ws-t" x="${l}" y="${H - b + 13}">0</text><text class="ws-t" x="${W - r}" y="${H - b + 13}" text-anchor="end">${N}</text><text class="ws-t" x="${(l + W - r) / 2}" y="${H - b + 26}" text-anchor="middle">Anzahl der Versuche</text>`;
    return s + `<line class="ws-ax" x1="${l}" x2="${W - r}" y1="${Y(lo)}" y2="${Y(lo)}"/></svg>`;
  }
  /* cfg: { cats, theo|null, track:{kind:"p"|"mean", ev|xname, ref, range, name, refName}, info(api) } */
  function stats(host, cfg) {
    let counts, n, sum, hist;
    const bars = el("div", { class: "ws-chart" }), line = el("div", { class: "ws-chart" }), inf = AN.info();
    host.append(el("div", { class: "ws-charts" }, [bars, line]), inf);
    const api = {
      add(cat, val) { counts[cat]++; n++; sum += val; hist.push(sum / n); },
      reset() { counts = cfg.cats.map(() => 0); n = 0; sum = 0; hist = []; api.flush(); },
      set(o) { Object.assign(cfg, o); api.reset(); },
      n: () => n, counts: () => counts, sum: () => sum,
      flush() {
        const tr = cfg.track;
        bars.innerHTML = barSvg(cfg.cats, counts, n, cfg.theo) + `<div class="ws-legend"><span><i></i>relative Häufigkeit (Zahl darunter: absolute Häufigkeit)</span>${cfg.theo ? `<span><i class="t"></i>Wahrscheinlichkeit</span>` : ""}</div>`;
        line.innerHTML = lineSvg(hist, n, tr) + `<div class="ws-legend"><span><i></i>${tr.name}</span><span><i class="t"></i>${tr.refName}</span></div>`;
        let h = !n ? `Noch kein Versuch. Starte mit „1× mit Animation“ und erhöhe dann die Anzahl.`
          : tr.kind === "p" ? `<b>n = ${n}</b> Versuche · „${tr.ev}“ trat <b>${sum}</b>-mal ein · relative Häufigkeit <b>${f3(sum / n)}</b> · Wahrscheinlichkeit ${f3(tr.ref)}`
          : `<b>n = ${n}</b> Versuche · Mittelwert ${tr.xname}: <b>${f3(sum / n)}</b> · Erwartungswert ${f3(tr.ref)}`;
        if (n && cfg.info) h += cfg.info(api);
        inf.innerHTML = h;
      }
    };
    api.reset();
    return api;
  }
  function runner(trial, getS, onReset, ks) {
    let busy = false; const bs = [];
    const mk = (k) => {
      const b = button(k === 1 ? "▶ 1× mit Animation" : k + "×", async () => {
        if (busy) return; busy = true; bs.forEach((x) => { x.disabled = true; });
        try {
          if (k === 1) await trial(1);
          else if (k <= 10) { for (let i = 0; i < k; i++) { await trial(0.3); getS().flush(); } }
          else { for (let i = 0; i < k - 1; i++) await trial(0); await trial(0.3); }
        } finally { getS().flush(); busy = false; bs.forEach((x) => { x.disabled = false; }); }
      });
      bs.push(b); return b;
    };
    const row = el("div", { class: "an-btnrow" }, (ks || [1, 10, 100, 1000]).map(mk));
    row.appendChild(button("↺ Zurücksetzen", () => { if (busy) return; getS().reset(); if (onReset) onReset(); }, "ghost"));
    return row;
  }

  /* ======================= Würfel ======================= */
  const DICE_EV = {
    sechs: { n: 1, name: "Augenzahl 6", p: 1 / 6, f: (a) => a[0] === 6 },
    gerade: { n: 1, name: "gerade Augenzahl", p: 1 / 2, f: (a) => a[0] % 2 === 0 },
    min5: { n: 1, name: "Augenzahl mindestens 5", p: 1 / 3, f: (a) => a[0] >= 5 },
    summe7: { n: 2, name: "Augensumme 7", p: 1 / 6, f: (a) => a[0] + a[1] === 7 },
    pasch: { n: 2, name: "Pasch (zwei gleiche Augenzahlen)", p: 1 / 6, f: (a) => a[0] === a[1] },
    min1sechs: { n: 2, name: "mindestens eine 6", p: 11 / 36, f: (a) => a[0] === 6 || a[1] === 6 },
    summe10: { n: 2, name: "Augensumme mindestens 10", p: 1 / 6, f: (a) => a[0] + a[1] >= 10 }
  };
  REG["w-wuerfel"] = function (host) {
    let key = DICE_EV[host.dataset.ev] ? host.dataset.ev : "sechs";
    const n = DICE_EV[key].n;
    AN.card(host, n === 1 ? "3D-Simulation: Würfeln" : "3D-Simulation: Zwei Würfel");
    const track = () => { const E = DICE_EV[key]; return { kind: "p", ev: E.name, ref: E.p, name: "relative Häufigkeit von „" + E.name + "“", refName: "Wahrscheinlichkeit " + f3(E.p) }; };
    let S;
    const sel = select("Beobachtetes Ereignis", Object.keys(DICE_EV).filter((k) => DICE_EV[k].n === n).map((k) => [k, DICE_EV[k].name]), key, (v) => { key = v; S.set({ track: track() }); });
    host.appendChild(AN.row([sel.wrap]));
    const st = stage(host, { cam: [0, 5.6, 6.6], look: [0, 0.3, 0], ratio: 0.46, alt: "Würfel rollen über einen Tisch" });
    const dice = [];
    if (st.ok) { table(st, 10, 5.4); for (let i = 0; i < n; i++) { const d = makeDie(i ? "#c8372d" : "#fbfaf6", i ? "#ffffff" : "#1c1c1c"); d.position.x = n === 1 ? 0 : (i ? 0.9 : -0.9); st.scene.add(d); dice.push(d); } }
    const trial = (sp) => {
      const a = []; for (let i = 0; i < n; i++) a.push(1 + rint(6));
      const ps = dice.map((d, i) => rollDie(st, d, a[i], [n === 1 ? rnd(-0.6, 0.6) : (i ? 1.1 : -1.1) + rnd(-0.35, 0.35), rnd(-0.5, 0.5)], 1300 * sp));
      return Promise.all(ps).then(() => {
        S.add(n === 1 ? a[0] - 1 : a[0] + a[1] - 2, DICE_EV[key].f(a) ? 1 : 0);
        st.result(n === 1 ? "Augenzahl " + a[0] : a[0] + " + " + a[1] + " = " + (a[0] + a[1]));
        if (sp === 1) S.flush();
      });
    };
    host.appendChild(runner(trial, () => S, () => st.result("")));
    const cats = [], theo = [];
    if (n === 1) for (let i = 1; i <= 6; i++) { cats.push(i); theo.push(1 / 6); } else for (let s = 2; s <= 12; s++) { cats.push(s); theo.push((6 - Math.abs(s - 7)) / 36); }
    S = stats(host, { cats, theo, track: track() });
  };

  /* ======================= Münzen ======================= */
  REG["w-muenze"] = function (host) {
    const n = Math.max(1, Math.min(3, +host.dataset.n || 1));
    AN.card(host, n === 1 ? "3D-Simulation: Münzwurf" : "3D-Simulation: " + n + " Münzen werfen");
    const st = stage(host, { cam: [0, 5.2, 6.4], look: [0, 0.9, 0], ratio: 0.46, alt: "Münzen werden geworfen" });
    const coins = [];
    if (st.ok) { table(st, 9, 5, 0x35557a); ["#e2b33c", "#c9ccd1", "#c98a55"].slice(0, n).forEach((c, i) => { const k = makeCoin(c); k.position.x = (i - (n - 1) / 2) * 1.7; st.scene.add(k); coins.push(k); }); }
    let S;
    const trial = (sp) => {
      const z = []; for (let i = 0; i < n; i++) z.push(Math.random() < 0.5);
      return Promise.all(coins.map((c, i) => tossCoin(st, c, z[i], (1150 + 120 * i) * sp))).then(() => {
        const w = z.filter((x) => !x).length;
        if (n === 1) S.add(z[0] ? 1 : 0, z[0] ? 0 : 1); else S.add(w, w);
        st.result(z.map((x) => (x ? "Z" : "W")).join(" ") + (n > 1 ? "  →  X = " + w : ""));
        if (sp === 1) S.flush();
      });
    };
    host.appendChild(runner(trial, () => S, () => st.result("")));
    if (n === 1) S = stats(host, { cats: ["Wappen", "Zahl"], theo: [0.5, 0.5], track: { kind: "p", ev: "Wappen", ref: 0.5, name: "relative Häufigkeit von „Wappen“", refName: "Wahrscheinlichkeit 0,5" } });
    else {
      const C = [[1, 2, 1], [1, 3, 3, 1]][n - 2], cats = C.map((_, i) => "X = " + i), theo = C.map((c) => c / Math.pow(2, n));
      S = stats(host, { cats, theo, track: { kind: "mean", xname: "von X (Anzahl Wappen)", ref: n / 2, range: [0, n], name: "Mittelwert der Anzahl „Wappen“", refName: "Erwartungswert " + AN.fmt(n / 2, 1) } });
    }
  };

  /* ======================= Urne mit Baumdiagramm ======================= */
  const URN_EV = {
    zweiterot: { name: "2. Kugel rot", cats: [0, 2] },
    beiderot: { name: "beide Kugeln rot", cats: [0] },
    verschieden: { name: "verschiedene Farben", cats: [1, 2] },
    min1rot: { name: "mindestens eine rote Kugel", cats: [0, 1, 2] }
  };
  REG["w-urne"] = function (host) {
    const r = Math.max(1, +host.dataset.r || 3), b = Math.max(1, +host.dataset.b || 2), N = r + b;
    let zur = host.dataset.zurueck === "1", key = URN_EV[host.dataset.ev] ? host.dataset.ev : "zweiterot", last = -1, S;
    AN.card(host, "3D-Simulation: Zweimal ziehen aus der Urne (" + r + " rote, " + b + " blaue Kugeln)");
    const model = () => {
      const p1 = [r / N, b / N], p2 = zur ? [p1, p1] : [[(r - 1) / (N - 1), b / (N - 1)], [r / (N - 1), (b - 1) / (N - 1)]];
      const s1 = [r + "/" + N, b + "/" + N], s2 = zur ? [s1, s1] : [[(r - 1) + "/" + (N - 1), b + "/" + (N - 1)], [r + "/" + (N - 1), (b - 1) + "/" + (N - 1)]];
      const P = [p1[0] * p2[0][0], p1[0] * p2[0][1], p1[1] * p2[1][0], p1[1] * p2[1][1]];
      return { p1, p2, s1, s2, P, pe: URN_EV[key].cats.reduce((s, c) => s + P[c], 0) };
    };
    const cfg = () => { const M = model(); return { theo: M.P, track: { kind: "p", ev: URN_EV[key].name, ref: M.pe, name: "relative Häufigkeit von „" + URN_EV[key].name + "“", refName: "Wahrscheinlichkeit " + f3(M.pe) } }; };
    const sZ = select("Ziehen", [["0", "ohne Zurücklegen"], ["1", "mit Zurücklegen"]], zur ? "1" : "0", (v) => { zur = v === "1"; last = -1; S.set(cfg()); home(0); drawTree(); });
    const sE = select("Beobachtetes Ereignis", Object.keys(URN_EV).map((k) => [k, URN_EV[k].name]), key, (v) => { key = v; S.set(cfg()); drawTree(); });
    host.appendChild(AN.row([sZ.wrap, sE.wrap]));
    const st = stage(host, { cam: [0.4, 4.6, 7.6], look: [0.3, 1.1, 0], ratio: 0.5, alt: "Glasurne mit roten und blauen Kugeln" });
    const UX = -1.5, balls = [], homes = [], ghosts = [], slot = (k) => [1.25 + k * 0.85, 0.37, 0.9];
    if (st.ok) {
      table(st, 9, 5, 0x6f5a45);
      const glass = new T.Mesh(new T.CylinderGeometry(1.25, 1.1, 2.1, 40, 1, true), new T.MeshStandardMaterial({ color: 0xa9cfe8, transparent: true, opacity: 0.24, side: T.DoubleSide, depthWrite: false, roughness: 0.1 }));
      glass.position.set(UX, 1.05, 0);
      const rim = new T.Mesh(new T.TorusGeometry(1.25, 0.05, 8, 40), new T.MeshStandardMaterial({ color: 0xa9cfe8, transparent: true, opacity: 0.7 })); rim.rotation.x = Math.PI / 2; rim.position.set(UX, 2.1, 0);
      const tray = new T.Mesh(new T.BoxGeometry(2.1, 0.1, 1), new T.MeshStandardMaterial({ color: 0xe9dfc8, roughness: 0.9 })); tray.position.set(1.68, 0.05, 0.9); tray.receiveShadow = true; tray.castShadow = true;
      st.scene.add(tray);
      for (let L = 0; L < 3; L++) { homes.push([UX, 0.3 + L * 0.5, 0]); for (let j = 0; j < 8; j++) { const a = j * Math.PI / 4 + L * Math.PI / 8; homes.push([UX + 0.74 * Math.cos(a), 0.3 + L * 0.5, 0.74 * Math.sin(a)]); } }
      const order = []; for (let i = 0; i < N; i++) order.push(i);
      for (let i = N - 1; i > 0; i--) { const j = rint(i + 1), t = order[i]; order[i] = order[j]; order[j] = t; }
      const geo = new T.SphereGeometry(0.27, 24, 16), mats = [new T.MeshStandardMaterial({ color: 0xd2493d, roughness: 0.3 }), new T.MeshStandardMaterial({ color: 0x3b74c4, roughness: 0.3 })];
      for (let i = 0; i < N; i++) { const m = new T.Mesh(geo, mats[i < r ? 0 : 1]); m.castShadow = true; m.userData.home = homes[order[i] % homes.length]; m.position.fromArray(m.userData.home); st.scene.add(m); balls.push(m); }
      for (let k = 0; k < 2; k++) { const g = new T.Mesh(new T.CylinderGeometry(0.27, 0.27, 0.07, 24), new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })); g.position.set(slot(k)[0], 0.135, 0.9); g.visible = false; st.scene.add(g); ghosts.push(g); }
      st.scene.add(glass, rim);
    }
    function home(ms) { ghosts.forEach((g) => { g.visible = false; }); const ps = balls.map((m) => mv(st, m, m.userData.home, ms)); if (st.dirty) st.dirty(); return Promise.all(ps); }
    const tree = el("div", { class: "ws-chart ws-tree" });
    function drawTree() {
      const M = model(), c = S ? S.counts() : [0, 0, 0, 0], y1 = [48, 142], y2 = [22, 74, 116, 168], nm = ["rot – rot", "rot – blau", "blau – rot", "blau – blau"];
      let s = `<svg viewBox="0 0 420 190" role="img" aria-label="Baumdiagramm zum zweimaligen Ziehen">`;
      for (let i = 0; i < 2; i++) {
        s += `<line class="${last >= 0 && (last >> 1) === i ? "on" : ""}" x1="22" y1="95" x2="130" y2="${y1[i]}"/><text class="ws-tl" x="66" y="${(95 + y1[i]) / 2 + (i ? 16 : -8)}" text-anchor="middle">${M.s1[i]}</text>`;
        for (let j = 0; j < 2; j++) { const k = 2 * i + j; s += `<line class="${last === k ? "on" : ""}" x1="130" y1="${y1[i]}" x2="232" y2="${y2[k]}"/><text class="ws-tl" x="186" y="${(y1[i] + y2[k]) / 2 + (j ? 15 : -6)}" text-anchor="middle">${M.s2[i][j]}</text>`; }
      }
      s += `<circle class="root" cx="22" cy="95" r="4"/>`;
      for (let i = 0; i < 2; i++) s += `<circle class="${i ? "b" : "r"}" cx="130" cy="${y1[i]}" r="9"/>`;
      for (let k = 0; k < 4; k++) s += `<circle class="${k % 2 ? "b" : "r"}" cx="232" cy="${y2[k]}" r="9"/><text class="ws-tl" x="250" y="${y2[k] - 2}">${nm[k]}: P = ${f3(M.P[k])}</text><text class="ws-t" x="250" y="${y2[k] + 11}">gezählt: ${c[k]}</text>`;
      tree.innerHTML = s + `</svg><div class="ws-legend"><span>Baumdiagramm: An den Ästen stehen die Wahrscheinlichkeiten, der letzte Versuch ist hervorgehoben.</span></div>`;
    }
    const trial = async (sp) => {
      const i1 = rint(N); let i2 = rint(zur ? N : N - 1); if (!zur && i2 >= i1) i2++;
      const col = [i1 < r ? 0 : 1, i2 < r ? 0 : 1], pick = [i1, i2];
      if (st.ok) {
        await home(sp ? 220 * sp : 0);
        for (let k = 0; k < 2; k++) {
          const m = balls[pick[k]];
          await mv(st, m, [UX, 3.0, 0], 520 * sp);
          if (zur) { ghosts[k].material.color.set(col[k] ? 0x3b74c4 : 0xd2493d); ghosts[k].visible = true; await mv(st, m, [UX, 3.0, 0], 260 * sp); await mv(st, m, m.userData.home, 420 * sp); }
          else await mv(st, m, slot(k), 520 * sp, 0.6);
        }
      }
      const cat = 2 * col[0] + col[1]; last = cat;
      S.add(cat, URN_EV[key].cats.indexOf(cat) >= 0 ? 1 : 0);
      st.result("1. Zug: " + (col[0] ? "blau" : "rot") + " · 2. Zug: " + (col[1] ? "blau" : "rot"));
      if (sp === 1) S.flush();
    };
    host.appendChild(runner(trial, () => S, () => { last = -1; st.result(""); home(0); drawTree(); }));
    host.appendChild(tree);
    S = stats(host, Object.assign({ cats: ["rot–rot", "rot–blau", "blau–rot", "blau–blau"], info(api) {
      drawTree();
      const c = api.counts(), M = model(), a = c[0] + c[1], d = c[2] + c[3];
      return `<br><span class="an-hint">Nur die ${a} Versuche mit <b>1. Kugel rot</b>: 2. Kugel rot in ${a ? f3(c[0] / a) : "–"} der Fälle (Theorie ${f3(M.p2[0][0])}). Nur die ${d} Versuche mit <b>1. Kugel blau</b>: 2. Kugel rot in ${d ? f3(c[2] / d) : "–"} der Fälle (Theorie ${f3(M.p2[1][0])}).</span>`;
    } }, cfg()));
    drawTree();
  };

  /* ======================= Glücksrad: Zufallsgröße ======================= */
  REG["w-rad"] = function (host) {
    const raw = (host.dataset.sektoren || "0:2;1:1;0:2;2:1;0:1;5:1").split(";").map((s) => s.split(":").map(Number));
    const eins = +host.dataset.einsatz || 0, unit = host.dataset.einheit === undefined ? "€" : host.dataset.einheit;
    AN.card(host, host.dataset.titel || "3D-Simulation: Glücksrad");
    const vals = Array.from(new Set(raw.map((x) => x[0] - eins))).sort((a, c) => a - c), tot = raw.reduce((s, x) => s + x[1], 0);
    const P = vals.map((v) => raw.filter((x) => x[0] - eins === v).reduce((s, x) => s + x[1], 0) / tot);
    const mu = vals.reduce((s, v, i) => s + v * P[i], 0), va = vals.reduce((s, v, i) => s + (v - mu) * (v - mu) * P[i], 0);
    const lab = (v) => AN.fmt(v, 2) + (unit ? " " + unit : "");
    const st = stage(host, { cam: [2.6, 3.1, 7.9], look: [0, 1.95, 0], ratio: 0.52, alt: "Glücksrad mit Sektoren" });
    const dist = [...new Set(raw.map((x) => x[0]))].sort((a, c) => a - c);
    const wheel = st.ok ? makeWheel(st, raw.map((x) => ({ label: lab(x[0]), w: x[1], col: WCOL[dist.indexOf(x[0]) % WCOL.length] })), 2.0) : null;
    const pick = () => { let u = Math.random() * tot; for (let i = 0; i < raw.length; i++) { u -= raw[i][1]; if (u < 0) return i; } return raw.length - 1; };
    let S;
    const trial = (sp) => {
      const i = pick(), x = raw[i][0] - eins;
      return (wheel ? wheel.spin(i, 2400 * sp, sp === 1 ? 4 : 2) : Promise.resolve()).then(() => {
        S.add(vals.indexOf(x), x);
        st.result("Auszahlung " + lab(raw[i][0]) + (eins ? " · Gewinn X = " + lab(x) : ""));
        if (sp === 1) S.flush();
      });
    };
    host.appendChild(runner(trial, () => S, () => st.result("")));
    const xn = eins ? "des Gewinns X" : "der Auszahlung X";
    S = stats(host, { cats: vals.map((v) => AN.fmt(v, 2)), theo: P, track: { kind: "mean", xname: xn, ref: mu, range: [vals[0], vals[vals.length - 1]], name: "Mittelwert " + xn, refName: "Erwartungswert μ = " + f2(mu) },
      info: () => `<br><span class="an-hint">${eins ? "Einsatz " + lab(eins) + " je Spiel. " : ""}Theorie: μ = ${f3(mu)}, Varianz ${f3(va)}, Standardabweichung σ = ${f3(Math.sqrt(va))}.</span>` });
  };

  /* ======================= Medizinischer Test: 1000 Personen ======================= */
  REG["w-test"] = function (host) {
    AN.card(host, "3D-Simulation: 1000 Personen und ein Test");
    let prev = +host.dataset.p || 2, se = +host.dataset.se || 95, sp = +host.dataset.sp || 90, sorted = false;
    const NP = 1000, COLS = 40, ROWS = 25, D = 0.3;
    const pc = (v) => AN.fmt(v, 1) + " %";
    const s1 = slider("Anteil der Kranken", 0.5, 30, 0.5, prev, (v) => { prev = v; sample(); }, pc);
    const s2 = slider("Sensitivität: Kranke werden erkannt", 50, 100, 1, se, (v) => { se = v; sample(); }, pc);
    const s3 = slider("Spezifität: Gesunde werden als gesund erkannt", 50, 100, 1, sp, (v) => { sp = v; sample(); }, pc);
    host.appendChild(AN.row([s1.wrap, s2.wrap, s3.wrap]));
    const st = stage(host, { cam: [0, 8.6, 10.6], look: [0, 0, 0.7], ratio: 0.5, extent: 9, alt: "1000 Säulen, eine je Person" });
    const per = [], cur = [], from = [], to = [];
    let mesh = null, dummy = null;
    if (st.ok) {
      table(st, 14.5, 9, 0x4a4f57);
      mesh = new T.InstancedMesh(new T.BoxGeometry(0.22, 1, 0.22), new T.MeshStandardMaterial({ roughness: 0.55 }), NP); mesh.castShadow = true; st.scene.add(mesh); dummy = new T.Object3D();
    }
    for (let i = 0; i < NP; i++) { per.push({ k: false, p: false }); cur.push({ x: 0, z: 0, h: 0.1 }); from.push({}); to.push({}); }
    const CK = T ? new T.Color(0xd2493d) : null, CG = T ? new T.Color(0x4f86d6) : null;
    function apply() {
      if (!mesh) return;
      for (let i = 0; i < NP; i++) { const c = cur[i]; dummy.position.set(c.x, c.h / 2, c.z); dummy.scale.set(1, c.h, 1); dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix); }
      mesh.instanceMatrix.needsUpdate = true;
    }
    function targets() {
      const idx = []; for (let i = 0; i < NP; i++) idx.push(i);
      if (sorted) {
        const g = (q) => (q.k ? 0 : 2) + (q.p ? 0 : 1);
        idx.sort((a, b) => g(per[a]) - g(per[b]) || a - b);
        let c = 0, lastK = true;
        idx.forEach((i) => {
          if (lastK && !per[i].k) { lastK = false; c = Math.ceil(c / ROWS) * ROWS + ROWS; }
          to[i].x = (Math.floor(c / ROWS) - 21) * D; to[i].z = (c % ROWS - 12) * D; c++;
        });
      } else idx.forEach((i) => { to[i].x = (i % COLS - 19.5) * D; to[i].z = (Math.floor(i / COLS) - 12) * D; });
      for (let i = 0; i < NP; i++) to[i].h = per[i].p ? 0.95 : 0.12;
    }
    function go(ms, wave) {
      for (let i = 0; i < NP; i++) { from[i].x = cur[i].x; from[i].z = cur[i].z; from[i].h = cur[i].h; }
      return st.tween(ms, (t) => {
        for (let i = 0; i < NP; i++) {
          const u = wave ? Math.max(0, Math.min(1, t * 1.7 - (i % COLS) / COLS * 0.7)) : t, e = ease(u), f = from[i], g = to[i], c = cur[i];
          c.x = f.x + (g.x - f.x) * e; c.z = f.z + (g.z - f.z) * e; c.h = f.h + (g.h - f.h) * e;
        }
        apply();
      });
    }
    const out = el("div"), inf = AN.info();
    function sample() {
      const n = [0, 0, 0, 0];
      for (let i = 0; i < NP; i++) {
        const q = per[i]; q.k = Math.random() < prev / 100; q.p = q.k ? Math.random() < se / 100 : Math.random() >= sp / 100;
        n[(q.k ? 0 : 2) + (q.p ? 0 : 1)]++;
        if (mesh) mesh.setColorAt(i, q.k ? CK : CG);
        cur[i].h = 0.12;
      }
      if (mesh && mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      targets(); if (!st.ok) { } else if (sorted) { for (let i = 0; i < NP; i++) { cur[i].x = to[i].x; cur[i].z = to[i].z; } }
      go(900, true);
      const pos = n[0] + n[2], neg = n[1] + n[3], P = prev / 100, SE = se / 100, SP = sp / 100, pp = P * SE + (1 - P) * (1 - SP);
      out.innerHTML = `<div class="nv-table-wrap"><table class="nv-table ws-vft"><tr><th>Stichprobe</th><th class="num">Test positiv</th><th class="num">Test negativ</th><th class="num">Summe</th></tr>
        <tr><th>krank</th><td class="num hi">${n[0]}</td><td class="num">${n[1]}</td><td class="num">${n[0] + n[1]}</td></tr>
        <tr><th>gesund</th><td class="num">${n[2]}</td><td class="num">${n[3]}</td><td class="num">${n[2] + n[3]}</td></tr>
        <tr><th>Summe</th><td class="num hi">${pos}</td><td class="num">${neg}</td><td class="num">${NP}</td></tr></table></div>`;
      inf.innerHTML = `Von den <b>${pos}</b> positiv Getesteten sind <b>${n[0]}</b> wirklich krank: Anteil <b>${pos ? pc(100 * n[0] / pos) : "–"}</b>. Rechnung: $P_{\\text{positiv}}(\\text{krank})=\\dfrac{${tx(f3(P))}\\cdot ${tx(f2(SE))}}{${tx(f3(P))}\\cdot ${tx(f2(SE))}+${tx(f3(1 - P))}\\cdot ${tx(f2(1 - SP))}}\\approx ${tx(f3(P * SE / pp))}$.<br><span class="an-hint">Von den ${neg} negativ Getesteten sind ${n[3]} gesund: Anteil ${neg ? pc(100 * n[3] / neg) : "–"}.</span>`;
      AN.typeset(inf);
    }
    const bS = button("Sortieren", () => { sorted = !sorted; bS.textContent = sorted ? "Mischen" : "Sortieren"; targets(); go(1000, false); });
    host.appendChild(el("div", { class: "an-btnrow" }, [button("▶ Neue Stichprobe (1000 Personen)", sample), bS]));
    host.appendChild(el("div", { class: "ws-key", html: `<span style="--c:#d2493d">rot: krank</span><span style="--c:#4f86d6">blau: gesund</span><span style="--c:var(--nv-text-muted)">hohe Säule: Test positiv · flache Säule: Test negativ</span>` }));
    host.append(out, inf);
    for (let i = 0; i < NP; i++) { cur[i].x = (i % COLS - 19.5) * D; cur[i].z = (Math.floor(i / COLS) - 12) * D; }
    sample();
  };

  /* ======================= 8.4 Simulationen ======================= */
  REG["w-sim-freiwurf"] = function (host) {
    AN.card(host, "3D-Simulation mit Zufallsziffern: drei Freiwürfe, Trefferquote 70 %");
    const st = stage(host, { cam: [2.6, 3.1, 7.9], look: [0, 1.95, 0], ratio: 0.52, alt: "Ziffernrad mit den Ziffern 0 bis 9" });
    const secs = []; for (let d = 0; d < 10; d++) secs.push({ label: String(d), w: 1, col: d <= 6 ? (d % 2 ? "#3e8f66" : "#2f7a55") : (d % 2 ? "#c9503f" : "#b0402f") });
    const wheel = st.ok ? makeWheel(st, secs, 2.0) : null;
    const seq = el("div", { class: "ws-seq", "aria-live": "off" }); const lastT = [];
    let S;
    const trial = async (sp) => {
      const d = [rint(10), rint(10), rint(10)];
      if (wheel && sp) for (let i = 0; i < 3; i++) { await wheel.spin(d[i], 1000 * sp + 250, sp === 1 ? 2 : 1); st.result("Ziffern: " + d.slice(0, i + 1).join(" ")); }
      else if (wheel) await wheel.spin(d[2], 0, 1);
      const hits = d.filter((x) => x <= 6).length, ok = hits >= 2;
      S.add(hits, ok ? 1 : 0);
      lastT.push(`<b class="${ok ? "ok" : "no"}">${d.join("")}</b>`); if (lastT.length > 40) lastT.shift();
      st.result("Ziffern " + d.join(" ") + " → " + hits + " Treffer");
      if (sp === 1) S.flush();
    };
    host.appendChild(runner(trial, () => S, () => { lastT.length = 0; seq.innerHTML = ""; st.result(""); }));
    host.appendChild(el("div", { class: "ws-key", html: `<span style="--c:#3e8f66">Ziffern 0 bis 6: Treffer (7 von 10 Ziffern = 70 %)</span><span style="--c:#c9503f">Ziffern 7 bis 9: kein Treffer</span>` }));
    host.appendChild(seq);
    S = stats(host, { cats: ["0 Treffer", "1 Treffer", "2 Treffer", "3 Treffer"], theo: [0.027, 0.189, 0.441, 0.343],
      track: { kind: "p", ev: "mindestens 2 Treffer", ref: 0.784, name: "relative Häufigkeit von „mindestens 2 Treffer“", refName: "Wahrscheinlichkeit 0,784" },
      info: () => { seq.innerHTML = "Letzte Dreiergruppen (grün: mindestens 2 Treffer): " + lastT.join(" "); return ""; } });
  };

  REG["w-sim-sammeln"] = function (host) {
    AN.card(host, "3D-Simulation: Würfeln, bis jede Augenzahl mindestens einmal gefallen ist");
    const st = stage(host, { cam: [0, 5.6, 6.6], look: [0, 0.3, 0], ratio: 0.46, alt: "Ein Würfel wird wiederholt geworfen" });
    let die = null; if (st.ok) { table(st, 10, 5.4); die = makeDie("#fbfaf6", "#1c1c1c"); st.scene.add(die); }
    const seq = el("div", { class: "ws-seq" });
    let S;
    const bins = [[6, 9], [10, 12], [13, 15], [16, 19], [20, 25], [26, 1e9]];
    const show = (seen, k) => { seq.innerHTML = [1, 2, 3, 4, 5, 6].map((v) => `<b class="${seen[v] ? "ok" : "no"}">${v}${seen[v] ? "✓" : "–"}</b>`).join("  ") + "   Würfe: " + k; };
    const trial = async (sp) => {
      const seen = {}; let got = 0, k = 0;
      while (got < 6) {
        const v = 1 + rint(6); k++;
        if (die && sp) await rollDie(st, die, v, [rnd(-0.8, 0.8), rnd(-0.5, 0.5)], 520 * sp + 120);
        if (!seen[v]) { seen[v] = 1; got++; }
        if (sp) { show(seen, k); st.result("Wurf " + k + ": Augenzahl " + v); }
        if (got === 6 && die && !sp) await rollDie(st, die, v, [0, 0], 0);
      }
      S.add(bins.findIndex((b) => k >= b[0] && k <= b[1]), k);
      show(seen, k); st.result("Vollständig nach " + k + " Würfen");
      if (sp === 1) S.flush();
    };
    host.appendChild(runner(trial, () => S, () => { st.result(""); seq.textContent = ""; }, [1, 10, 100, 1000]));
    host.appendChild(seq);
    S = stats(host, { cats: ["6–9", "10–12", "13–15", "16–19", "20–25", "ab 26"], theo: null,
      track: { kind: "mean", xname: "der Wurfanzahl", ref: 14.7, range: [6, 24], name: "Mittelwert der Wurfanzahl", refName: "Erwartungswert 14,7" } });
  };

  REG["w-sim-geburtstag"] = function (host) {
    AN.card(host, "3D-Simulation: Geburtstagsproblem");
    let k = Math.max(2, Math.min(60, +host.dataset.k || 23)), S;
    const MD = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], pos = [];
    MD.forEach((d, m) => { for (let j = 0; j < d; j++) pos.push([(j - 15) * 0.36, (m - 5.5) * 0.4]); });
    const pEx = () => { let q = 1; for (let i = 0; i < k; i++) q *= (365 - i) / 365; return 1 - q; };
    const cfg = () => { const p = pEx(); return { theo: [1 - p, p], track: { kind: "p", ev: "mindestens zwei Personen am selben Tag", ref: p, name: "relative Häufigkeit eines gemeinsamen Geburtstags", refName: "Wahrscheinlichkeit " + f3(p) } }; };
    const sk = slider("Anzahl der Personen", 2, 60, 1, k, (v) => { k = v; S.set(cfg()); }, (v) => String(v));
    host.appendChild(AN.row([sk.wrap]));
    const st = stage(host, { cam: [0, 7.6, 8.4], look: [0, 0, 0.4], ratio: 0.46, extent: 8, alt: "Kalender mit 365 Feldern, zwölf Reihen für die Monate" });
    let mesh = null, dummy = null; const h = new Array(365).fill(0), hf = new Array(365).fill(0), cnt = new Array(365).fill(0);
    const C0 = T ? new T.Color(0xcfd4dc) : null, C1 = T ? new T.Color(0x3b74c4) : null, C2 = T ? new T.Color(0xd2493d) : null;
    if (st.ok) { table(st, 12.4, 5.8, 0x4a4f57); mesh = new T.InstancedMesh(new T.BoxGeometry(0.28, 1, 0.3), new T.MeshStandardMaterial({ roughness: 0.55 }), 365); mesh.castShadow = true; st.scene.add(mesh); dummy = new T.Object3D(); }
    function apply(t) {
      if (!mesh) return;
      for (let i = 0; i < 365; i++) { const tg = cnt[i] ? 0.45 * cnt[i] + 0.15 : 0.06, v = hf[i] + (tg - hf[i]) * ease(t); h[i] = v; dummy.position.set(pos[i][0], v / 2, pos[i][1]); dummy.scale.set(1, v, 1); dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix); }
      mesh.instanceMatrix.needsUpdate = true;
    }
    const trial = (sp) => {
      cnt.fill(0); let dbl = false;
      for (let i = 0; i < k; i++) { const d = rint(365); if (++cnt[d] > 1) dbl = true; }
      S.add(dbl ? 1 : 0, dbl ? 1 : 0);
      st.result(dbl ? "Mindestens ein gemeinsamer Geburtstag" : "Alle Geburtstage verschieden");
      if (sp === 1) S.flush();
      if (!mesh) return Promise.resolve();
      for (let i = 0; i < 365; i++) { hf[i] = h[i]; mesh.setColorAt(i, cnt[i] > 1 ? C2 : cnt[i] ? C1 : C0); }
      mesh.instanceColor.needsUpdate = true;
      return st.tween(650 * sp, apply);
    };
    host.appendChild(runner(trial, () => S, () => { st.result(""); cnt.fill(0); if (mesh) { for (let i = 0; i < 365; i++) { hf[i] = h[i]; mesh.setColorAt(i, C0); } mesh.instanceColor.needsUpdate = true; st.tween(0, apply); } }));
    host.appendChild(el("div", { class: "ws-key", html: `<span style="--c:#3b74c4">blau: ein Geburtstag an diesem Tag</span><span style="--c:#d2493d">rot: zwei oder mehr Personen am selben Tag</span><span style="--c:#cfd4dc">Reihen: Januar (hinten) bis Dezember (vorn)</span>` }));
    S = stats(host, Object.assign({ cats: ["kein Paar", "mind. ein Paar"] }, cfg()));
    if (mesh) { for (let i = 0; i < 365; i++) mesh.setColorAt(i, C0); mesh.instanceColor.needsUpdate = true; apply(1); st.dirty(); }
  };
})(window);
