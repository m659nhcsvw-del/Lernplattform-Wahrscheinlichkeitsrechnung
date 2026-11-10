/* Tab „Wissensspeicher“: alles Wichtige auf einen Blick, durchsuchbar */
AN_REG("speicher", "de", function () {
  const R = String.raw;
  const card = (k, chip, titel, body) => `<article class="an-sp" data-k="${k}"><h3>${titel} <span class="chip${k === "f" ? " f" : ""}">${chip}</span></h3>${body}</article>`;
  const G = "Grundlagen", B = "Bedingt und unabhängig", Z = "Zufallsgrößen", F = "Typische Fehler";
  const cards = [
    card("g", G, "Ergebnis, Ereignis, Gegenereignis", R`
      <p>Ergebnismenge $\Omega$: alle möglichen Ergebnisse. Ereignis $E$: Teilmenge von $\Omega$. Gegenereignis $\overline{E}$: alle übrigen Ergebnisse.</p>
      $$P(\overline{E})=1-P(E)$$
      <p>Beispiel Würfel: $E$ = „gerade“ $=\{2;4;6\}$, $\overline{E}=\{1;3;5\}$.</p>`),
    card("g", G, "Laplace-Experiment", R`
      <p>Alle Ergebnisse sind gleich wahrscheinlich. Dann wird gezählt:</p>
      $$P(E)=\frac{|E|}{|\Omega|}=\frac{\text{günstige}}{\text{mögliche}}$$
      <p>Beispiel: zwei Würfel, Augensumme 7: $\frac{6}{36}=\frac16$.</p>`),
    card("g", G, "Relative Häufigkeit und Gesetz der großen Zahlen", R`
      <p>Relative Häufigkeit = absolute Häufigkeit geteilt durch die Anzahl der Versuche.</p>
      <p>Bei sehr vielen Versuchen stabilisiert sich die relative Häufigkeit in der Nähe der Wahrscheinlichkeit. Übliche Schwankung bei $n$ Versuchen: etwa $\frac{1}{\sqrt n}$.</p>`),
    card("g", G, "Additionssatz", R`
      $$P(A\cup B)=P(A)+P(B)-P(A\cap B)$$
      <p>$A\cup B$: „$A$ oder $B$“ (mindestens eines), $A\cap B$: „$A$ und $B$“ (beide). Schließen $A$ und $B$ einander aus, entfällt der letzte Summand.</p>`),
    card("g", G, "Baumdiagramm und Pfadregeln", R`
      <ul><li><b>Pfadmultiplikationsregel:</b> entlang eines Pfades multiplizieren.</li>
      <li><b>Pfadadditionsregel:</b> Wahrscheinlichkeiten mehrerer Pfade addieren.</li>
      <li>An jeder Verzweigung ist die Summe 1.</li>
      <li>Ohne Zurücklegen ändern sich Zähler und Nenner in der nächsten Stufe.</li></ul>
      <p>Beispiel (3 rote, 2 blaue, ohne Zurücklegen): $P(\text{rot – rot})=\frac35\cdot\frac24=0{,}3$.</p>`),
    card("g", G, "„Mindestens ein …“", R`
      <p>Über das Gegenereignis rechnen:</p>
      $$P(\text{mindestens ein Erfolg})=1-P(\text{kein Erfolg})$$
      <p>Beispiel: mindestens eine 6 bei drei Würfen: $1-\left(\frac56\right)^3\approx0{,}421$.</p>`),
    card("b", B, "Bedingte Wahrscheinlichkeit", R`
      $$P_B(A)=\frac{P(A\cap B)}{P(B)}$$
      <p>Wahrscheinlichkeit von $A$, wenn man weiß, dass $B$ eingetreten ist. Die Bedingung legt die Grundgesamtheit fest. Im Baum: Äste der zweiten Stufe.</p>
      <p>Multiplikationssatz: $P(A\cap B)=P(B)\cdot P_B(A)$.</p>`),
    card("b", B, "Vierfeldertafel", R`
      <div class="nv-table-wrap"><table class="nv-table"><tr><th></th><th>$B$</th><th>$\overline{B}$</th><th>Summe</th></tr>
      <tr><th>$A$</th><td>$P(A\cap B)$</td><td>$P(A\cap\overline{B})$</td><td>$P(A)$</td></tr>
      <tr><th>$\overline{A}$</th><td>$P(\overline{A}\cap B)$</td><td>$P(\overline{A}\cap\overline{B})$</td><td>$P(\overline{A})$</td></tr>
      <tr><th>Summe</th><td>$P(B)$</td><td>$P(\overline{B})$</td><td>1</td></tr></table></div>
      <p>Bedingte Wahrscheinlichkeit = inneres Feld geteilt durch die Summe seiner Zeile oder Spalte.</p>`),
    card("b", B, "Bedingung umkehren (Satz von Bayes)", R`
      <ul><li>1. Baum mit den gegebenen Wahrscheinlichkeiten aufstellen.</li><li>2. Alle Pfade berechnen, die zu $B$ führen, und addieren: $P(B)$.</li><li>3. Gesuchten Pfad durch $P(B)$ teilen.</li></ul>
      $$P_B(A)=\frac{P(A)\cdot P_A(B)}{P(A)\cdot P_A(B)+P(\overline{A})\cdot P_{\overline{A}}(B)}$$`),
    card("b", B, "Stochastische Unabhängigkeit", R`
      $$P(A\cap B)=P(A)\cdot P(B)$$
      <p>Gleichwertig: $P_B(A)=P(A)$. Prüfen heißt nachrechnen und vergleichen. Im Baum: gleiche Wahrscheinlichkeiten in beiden Teilbäumen der zweiten Stufe.</p>
      <p>Ziehen mit Zurücklegen, Würfeln, Münzwurf: unabhängige Wiederholungen.</p>`),
    card("z", Z, "Simulation", R`
      <ul><li>1. Modell mit denselben Wahrscheinlichkeiten festlegen (Ziffern, Würfel, Rechner).</li><li>2. Einen Versuch und das Ereignis festlegen.</li><li>3. Sehr oft wiederholen.</li><li>4. Relative Häufigkeit als Schätzwert angeben.</li><li>5. Genauigkeit und Modellannahmen beurteilen.</li></ul>
      <p>TI-Nspire: <span class="mono">randInt(0,9,3)</span> liefert drei Zufallsziffern.</p>`),
    card("z", Z, "Zufallsgröße und Verteilung", R`
      <p>Eine Zufallsgröße $X$ ordnet jedem Ergebnis eine Zahl zu. Die Wahrscheinlichkeitsverteilung gibt zu jedem Wert $k$ die Wahrscheinlichkeit $P(X=k)$ an. Summe aller $P(X=k)$: 1.</p>
      <p>Beispiel (drei Münzen, $X$ = Anzahl Wappen): $\frac18;\frac38;\frac38;\frac18$ für $k=0;1;2;3$.</p>`),
    card("z", Z, "Erwartungswert", R`
      $$\mu=E(X)=\sum x_i\cdot P(X=x_i)$$
      <p>Mittelwert bei sehr vielen Wiederholungen. Faires Spiel: Erwartungswert des Gewinns ist 0, also Einsatz = erwartete Auszahlung.</p>
      <p>Beispiel Würfel: $\mu=3{,}5$.</p>`),
    card("z", Z, "Varianz und Standardabweichung", R`
      $$V(X)=\sum (x_i-\mu)^2\cdot P(X=x_i),\qquad \sigma=\sqrt{V(X)}$$
      <ul><li>1. $\mu$ berechnen</li><li>2. Abweichungen $x_i-\mu$ bilden und quadrieren</li><li>3. mit den Wahrscheinlichkeiten gewichten und addieren</li><li>4. Wurzel ziehen</li></ul>
      <p>Großes $\sigma$: starke Streuung, hohes Risiko.</p>`),
    card("f", F, "Bedingung und Ereignis vertauscht", R`
      <p>$P_K(T)$ („Test positiv, wenn krank“) ist nicht $P_T(K)$ („krank, wenn Test positiv“). Frage immer: Welche Gruppe ist die Grundgesamtheit?</p>`),
    card("f", F, "Unabhängig ist nicht unvereinbar", R`
      <p>Unvereinbare Ereignisse schließen einander aus und sind deshalb abhängig. Unabhängige Ereignisse können gemeinsam eintreten.</p>`),
    card("f", F, "Laplace-Formel falsch angewendet", R`
      <p>Die Augensummen 2 bis 12 sind nicht gleich wahrscheinlich, die Werte einer Zufallsgröße meist auch nicht. Gezählt werden die gleich wahrscheinlichen Ergebnisse (36 Paare, 8 Wurffolgen).</p>`),
    card("f", F, "Erwartungswert falsch gedeutet", R`
      <p>$\mu$ ist nicht der wahrscheinlichste Wert und nicht der ungewichtete Mittelwert der Werte. Er beschreibt den Mittelwert vieler Versuche.</p>`)
  ];
  return `<div class="nv-lede"><b>Wissensspeicher.</b> Alle wichtigen Begriffe, Regeln und Verfahren des Kapitels auf einen Blick, zum Nachschlagen und zum Wiederholen vor der Klausur. Tippe ein Stichwort ein oder wähle einen Bereich.</div>
  <div class="an-sp-tools">
    <input type="search" id="sp-q" class="nv-input" placeholder="Suchen, zum Beispiel „Vierfeldertafel“ oder „Erwartungswert“" aria-label="Wissensspeicher durchsuchen" autocomplete="off">
    <button type="button" class="an-sp-chip on" data-k="alle">Alle</button><button type="button" class="an-sp-chip" data-k="g">${G}</button><button type="button" class="an-sp-chip" data-k="b">${B}</button><button type="button" class="an-sp-chip" data-k="z">${Z}</button><button type="button" class="an-sp-chip" data-k="f">${F}</button>
  </div>
  <div class="an-sp-grid">${cards.join("")}</div>
  <p id="sp-none" class="an-hint" hidden>Dazu steht nichts im Wissensspeicher. Versuche ein anderes Stichwort.</p>`;
});
