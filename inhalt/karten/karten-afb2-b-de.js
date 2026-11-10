/* Lernkarten AFB II (Nr. 10–12) · 10 (8.1) Dreistufig mit Gegenereignis · 11 (8.4) Simulation planen · 12 (8.5) Verteilung ohne Zurücklegen */
(function () {
  const R = String.raw;
  AN_KARTEN_ADD([
    { nr: 10, afb: 2, abschnitt: "8.1", titel: "Drei Stufen, verschiedene Chancen",
      aufgabe: R`
<p>Drei Freunde verabreden sich. Erfahrungsgemäß kommt Ali mit Wahrscheinlichkeit $0{,}9$ pünktlich, Bea mit $0{,}8$ und Cem mit $0{,}5$, unabhängig voneinander.</p>
<p class="teil"><span class="l">a)</span><b class="op">Bestimme</b> die Wahrscheinlichkeit, dass alle pünktlich sind.</p>
<p class="teil"><span class="l">b)</span><b class="op">Bestimme</b> die Wahrscheinlichkeit, dass genau einer zu spät kommt.</p>
<p class="teil"><span class="l">c)</span><b class="op">Bestimme</b> die Wahrscheinlichkeit, dass mindestens zwei zu spät kommen.</p>
<p class="teil"><span class="l">d)</span><b class="op">Erläutere</b>, wozu die Unabhängigkeit gebraucht wird.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Ein Pfad</span>, entlang multiplizieren:</p>
$$0{,}9\cdot0{,}8\cdot0{,}5=0{,}36$$
<p class="schritt"><b>b)</b> <span class="c2">Drei Pfade:</span> nur Ali, nur Bea oder nur Cem zu spät.</p>
$$0{,}1\cdot0{,}8\cdot0{,}5+0{,}9\cdot0{,}2\cdot0{,}5+0{,}9\cdot0{,}8\cdot0{,}5$$
$$=0{,}04+0{,}09+0{,}36=0{,}49$$
<p class="schritt"><b>c)</b> <span class="c3">Rest</span> zu 1 (Gegenereignis „keiner oder genau einer“):</p>
$$1-0{,}36-0{,}49=0{,}15$$
<p class="kommentar">Kontrolle direkt: $0{,}1\cdot0{,}2\cdot0{,}5+0{,}1\cdot0{,}8\cdot0{,}5+0{,}9\cdot0{,}2\cdot0{,}5+0{,}1\cdot0{,}2\cdot0{,}5=0{,}15$.</p>
<p class="schritt"><b>d)</b> Nur bei Unabhängigkeit bleiben die Wahrscheinlichkeiten in der zweiten und dritten Stufe unverändert, egal was vorher geschah. Kämen Bea und Cem mit demselben Bus, hinge Cems Pünktlichkeit von Beas ab, und man bräuchte bedingte Wahrscheinlichkeiten.</p>
<p class="ergebnis">a) $0{,}36$ &nbsp; b) $0{,}49$ &nbsp; c) $0{,}15$</p>`,
      theorie: R`
<ul>
<li><b>Dreistufiger Baum:</b> Jede Person ist eine Stufe mit zwei Ästen (pünktlich, zu spät). Es entstehen $2\cdot2\cdot2=8$ Pfade.</li>
<li><b>Verschiedene Wahrscheinlichkeiten je Stufe:</b> Anders als beim Würfeln hat jede Stufe eigene Werte. Die Pfadregeln gelten trotzdem unverändert. <i>(Aufgabe a.)</i></li>
<li><b>„Genau einer“:</b> Das Ereignis besteht aus so vielen Pfaden, wie es Stufen gibt. Weil die Wahrscheinlichkeiten verschieden sind, haben die Pfade verschiedene Werte. Man darf nicht einen Pfad mal 3 rechnen. <i>(Aufgabe b.)</i></li>
<li><b>Rest zu 1:</b> „Keiner“, „genau einer“ und „mindestens zwei“ decken alle Fälle ab. Kennt man zwei davon, erhält man den dritten ohne weiteren Pfad. <i>(Aufgabe c.)</i></li>
<li><b>Unabhängigkeit</b> ist eine Modellannahme. Sie erlaubt das einfache Multiplizieren. <i>(Aufgabe d.)</i></li>
</ul>`,
      merk: R`<p><b>Auch bei mehr als zwei Stufen gilt: entlang multiplizieren, Pfade addieren. Zerlege in „keiner – genau einer – mindestens zwei“ und nutze den Rest zu 1.</b></p>`,
      formeln: R`
<table><tr><th>Ereignis</th><th>Pfade</th><th>Wert</th></tr>
<tr><td>keiner zu spät</td><td>1</td><td>$0{,}36$</td></tr>
<tr><td>genau einer</td><td>3</td><td>$0{,}49$</td></tr>
<tr><td>mindestens zwei</td><td>4</td><td>$0{,}15$</td></tr>
<tr><td>Summe</td><td>8</td><td>1</td></tr></table>
<ol>
<li>Für jede Stufe beide Wahrscheinlichkeiten notieren.</li>
<li>Pfade zum Ereignis systematisch aufschreiben.</li>
<li>Jeden Pfad einzeln multiplizieren.</li>
<li>Addieren.</li>
<li>Kontrolle über die Summe 1.</li>
</ol>`,
      fehler: R`<ul>
<li>Bei „genau einer“ einen Pfad berechnet und mit 3 multipliziert.</li>
<li>Gegenwahrscheinlichkeiten vertauscht ($0{,}9$ statt $0{,}1$ für „zu spät“).</li>
<li>Wahrscheinlichkeiten der drei Personen addiert.</li>
</ul>` },

    { nr: 11, afb: 2, abschnitt: "8.4", titel: "Eine Simulation planen",
      aufgabe: R`
<p>Eine Familie hat vier Kinder. Untersucht wird das Ereignis $E$: „Mindestens drei Kinder haben dasselbe Geschlecht.“ Modell: Mädchen und Junge sind gleich wahrscheinlich, die Geburten unabhängig.</p>
<p class="teil"><span class="l">a)</span><b class="op">Beschreibe</b> eine Simulation mit Zufallsziffern.</p>
<p class="teil"><span class="l">b)</span>Bei 200 simulierten Familien trat $E$ 131-mal ein. <b class="op">Gib</b> den Schätzwert <b class="op">an</b>.</p>
<p class="teil"><span class="l">c)</span><b class="op">Berechne</b> $P(E)$ exakt.</p>
<p class="teil"><span class="l">d)</span><b class="op">Vergleiche</b> Schätzwert und exakten Wert.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Modell:</span> Gerade Ziffer = Mädchen, ungerade Ziffer = Junge (je 5 von 10 Ziffern, also 50 %). <span class="c2">Ein Versuch:</span> vier Ziffern = eine Familie. $E$ tritt ein, wenn mindestens drei Ziffern gerade oder mindestens drei ungerade sind. <span class="c3">Wiederholen</span> und den Anteil der Familien mit $E$ bestimmen.</p>
<p class="schritt"><b>b)</b> $\dfrac{131}{200}=0{,}655$</p>
<p class="schritt"><b>c)</b> Es gibt $2^4=16$ gleich wahrscheinliche Geburtenfolgen. Vier gleiche: MMMM, JJJJ (2 Folgen). Genau drei gleiche: Das abweichende Kind kann an 4 Stellen stehen, für Mädchen und für Jungen, also 8 Folgen.</p>
$$P(E)=\frac{2+8}{16}=\frac{10}{16}=0{,}625$$
<p class="schritt"><b>d)</b> Abweichung: $0{,}655-0{,}625=0{,}03$. Übliche Schwankung bei 200 Versuchen: $\frac{1}{\sqrt{200}}\approx0{,}07$. Die Abweichung ist kleiner, Simulation und Rechnung passen zusammen.</p>
<p class="ergebnis">b) $0{,}655$ &nbsp; c) $0{,}625$ &nbsp; d) verträglich</p>`,
      theorie: R`
<ul>
<li><b>Fünf Schritte:</b> Modell festlegen, einen Versuch festlegen, oft wiederholen, auswerten, Genauigkeit beurteilen. Eine Beschreibung ist erst vollständig, wenn alle fünf vorkommen. <i>(Aufgabe a.)</i></li>
<li><b>Modell:</b> Das Zufallsgerät muss dieselben Wahrscheinlichkeiten liefern wie die Wirklichkeit. Für 50 % eignen sich Münze, gerade und ungerade Ziffern oder die Würfelzahlen 1 bis 3 gegen 4 bis 6.</li>
<li><b>Ereignis klar fassen:</b> „Mindestens drei gleiche“ umfasst zwei Fälle (Mädchen oder Jungen). Wer nur „mindestens drei Mädchen“ zählt, erhält die halbe Wahrscheinlichkeit.</li>
<li><b>Exakte Kontrolle:</b> Wenn eine Rechnung möglich ist, prüft sie die Simulation. <i>(Aufgabe c.)</i> Bei schwierigen Problemen ist die Simulation der einzige Weg.</li>
<li><b>Beurteilen:</b> Eine Abweichung unter $\frac{1}{\sqrt n}$ ist normal. <i>(Aufgabe d.)</i></li>
</ul>`,
      merk: R`<p><b>Eine Simulation beschreibst du vollständig mit: Modell, Versuch und Ereignis, Anzahl der Wiederholungen, Auswertung, Genauigkeit.</b></p>`,
      formeln: R`
<table><tr><th>Schritt</th><th>hier</th></tr>
<tr><td>Modell</td><td>gerade / ungerade Ziffer</td></tr>
<tr><td>Versuch</td><td>4 Ziffern</td></tr>
<tr><td>Ereignis</td><td>mind. 3 gleiche Art</td></tr>
<tr><td>Wiederholen</td><td>200-mal</td></tr>
<tr><td>Auswerten</td><td>$\frac{131}{200}$</td></tr>
<tr><td>Genauigkeit</td><td>$\pm\frac{1}{\sqrt{200}}\approx0{,}07$</td></tr></table>
<p>Zählen bei 4 Kindern: 1 Folge mit 4 Mädchen, 4 mit genau 3, 6 mit genau 2, 4 mit genau 1, 1 mit keinem (zusammen 16).</p>`,
      fehler: R`<ul>
<li>Nur „mindestens drei Mädchen“ gezählt.</li>
<li>Zuordnung genannt, aber nicht gesagt, was ein Versuch ist.</li>
<li>Die Abweichung $0{,}03$ als Fehler der Simulation gedeutet.</li>
</ul>` },

    { nr: 12, afb: 2, abschnitt: "8.5", titel: "Verteilung ohne Zurücklegen",
      aufgabe: R`
<p>In einer Lostrommel liegen 10 Lose: 3 Gewinne und 7 Nieten. Tim zieht zwei Lose. $X$ ist die Anzahl seiner Gewinne.</p>
<p class="teil"><span class="l">a)</span><b class="op">Ermittle</b> die Wahrscheinlichkeitsverteilung von $X$.</p>
<p class="teil"><span class="l">b)</span><b class="op">Berechne</b> $P(X\ge1)$.</p>
<p class="teil"><span class="l">c)</span><b class="op">Berechne</b> $E(X)$ und <b class="op">interpretiere</b> den Wert.</p>
<p class="teil"><span class="l">d)</span><b class="op">Vergleiche</b> mit dem Ziehen mit Zurücklegen.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> Ohne Zurücklegen, zweite Stufe mit Nenner 9:</p>
<p class="schritt"><span class="c1">$X=0$:</span> $\frac{7}{10}\cdot\frac69=\frac{42}{90}$ &nbsp; <span class="c3">$X=2$:</span> $\frac{3}{10}\cdot\frac29=\frac{6}{90}$</p>
<p class="schritt"><span class="c2">$X=1$:</span> $\frac{3}{10}\cdot\frac79+\frac{7}{10}\cdot\frac39=\frac{42}{90}$</p>
<table><tr><th>$k$</th><td>0</td><td>1</td><td>2</td></tr>
<tr><th>$P(X=k)$</th><td>$\frac{42}{90}\approx0{,}467$</td><td>$\frac{42}{90}\approx0{,}467$</td><td>$\frac{6}{90}\approx0{,}067$</td></tr></table>
<p class="schritt"><b>b)</b> $P(X\ge1)=1-\frac{42}{90}=\frac{48}{90}\approx0{,}533$</p>
<p class="schritt"><b>c)</b></p>
$$E(X)=1\cdot\frac{42}{90}+2\cdot\frac{6}{90}=\frac{54}{90}=0{,}6$$
<p class="kommentar">Bei sehr vielen Doppelzügen hat Tim im Mittel $0{,}6$ Gewinne pro Doppelzug. Das sind 30 % von 2 Losen.</p>
<p class="schritt"><b>d)</b> Mit Zurücklegen: $0{,}49$; $0{,}42$; $0{,}09$. Der Erwartungswert ist ebenfalls $0{,}6$. Ohne Zurücklegen ist „zwei Gewinne“ seltener, weil nach einem Gewinn weniger Gewinne übrig sind.</p>
<p class="ergebnis">b) $\approx0{,}533$ &nbsp; c) $0{,}6$</p>`,
      theorie: R`
<ul>
<li><b>Ohne Zurücklegen:</b> Zwei Lose auf einmal zu ziehen ist dasselbe wie zwei Lose nacheinander ohne Zurücklegen. In der zweiten Stufe sind 9 Lose übrig, und die Anzahl der Gewinne hängt vom ersten Zug ab.</li>
<li><b>Verteilung:</b> Jeder Wert von $X$ sammelt die Pfade mit dieser Gewinnanzahl. Zu $X=1$ gehören zwei Pfade. <i>(Aufgabe a.)</i></li>
<li><b>Erwartungswert:</b> Er verbindet die Verteilung zu einer Zahl. Dass genau 30 % von 2 herauskommt, ist kein Zufall: Jedes einzelne Los ist mit 30 % ein Gewinn, egal ob als erstes oder zweites gezogen. <i>(Aufgabe c.)</i></li>
<li><b>Vergleich:</b> Mit Zurücklegen sind die Züge unabhängig, ohne Zurücklegen abhängig. Der Erwartungswert ist gleich, aber die Verteilung ändert sich: Extreme Werte werden ohne Zurücklegen seltener. <i>(Aufgabe d.)</i></li>
</ul>`,
      merk: R`<p><b>Ohne Zurücklegen ändern sich die Wahrscheinlichkeiten in jeder Stufe. Der Erwartungswert der Trefferzahl bleibt trotzdem Anzahl der Züge mal Trefferanteil.</b></p>`,
      formeln: R`
<table><tr><th></th><th>ohne Zurückl.</th><th>mit Zurückl.</th></tr>
<tr><td>$P(X=0)$</td><td>$\frac{7}{10}\cdot\frac69$</td><td>$0{,}7^2$</td></tr>
<tr><td>$P(X=1)$</td><td>$2\cdot\frac{3}{10}\cdot\frac79$</td><td>$2\cdot0{,}3\cdot0{,}7$</td></tr>
<tr><td>$P(X=2)$</td><td>$\frac{3}{10}\cdot\frac29$</td><td>$0{,}3^2$</td></tr>
<tr><td>$E(X)$</td><td>$0{,}6$</td><td>$0{,}6$</td></tr></table>
<ol>
<li>Baum mit angepassten Brüchen zeichnen.</li>
<li>Pfade nach dem Wert von $X$ sortieren.</li>
<li>Tabelle anlegen, Summe prüfen.</li>
<li>$E(X)$ als gewichtete Summe berechnen und deuten.</li>
</ol>`,
      fehler: R`<ul>
<li>Zweite Stufe mit Nenner 10 gerechnet.</li>
<li>Bei $X=1$ nur „Gewinn – Niete“ berücksichtigt.</li>
<li>$E(X)=0{,}6$ als „meistens 0,6 Gewinne“ gedeutet.</li>
</ul>` }
  ]);
})();
