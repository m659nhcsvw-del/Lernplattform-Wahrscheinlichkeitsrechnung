/* Lernkarten AFB I (Nr. 4–6) · 4 (8.3) Unabhängigkeit erkennen · 5 (8.4) Zufallsziffern auswerten · 6 (8.5) Verteilung aufstellen */
(function () {
  const R = String.raw;
  AN_KARTEN_ADD([
    { nr: 4, afb: 1, abschnitt: "8.3", titel: "Unabhängigkeit am Würfel",
      aufgabe: R`
<p>Ein Würfel wird einmal geworfen. $A$: „gerade Augenzahl“, $B$: „mindestens 5“, $C$: „Primzahl“ (2, 3 oder 5).</p>
<p class="teil"><span class="l">a)</span><b class="op">Gib</b> $A$, $B$, $C$ als Mengen <b class="op">an</b> und <b class="op">berechne</b> ihre Wahrscheinlichkeiten.</p>
<p class="teil"><span class="l">b)</span><b class="op">Entscheide</b>, ob $A$ und $B$ stochastisch unabhängig sind.</p>
<p class="teil"><span class="l">c)</span><b class="op">Entscheide</b>, ob $A$ und $C$ stochastisch unabhängig sind.</p>
<p class="teil"><span class="l">d)</span><b class="op">Berechne</b> $P_C(A)$.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> $A=\{2;4;6\}$, $B=\{5;6\}$, $C=\{2;3;5\}$.</p>
$$P(A)=\frac36=\frac12\qquad P(B)=\frac26=\frac13\qquad P(C)=\frac36=\frac12$$
<p class="schritt"><b>b)</b> <span class="c1">Schnittmenge:</span> $A\cap B=\{6\}$, also $P(A\cap B)=\frac16$. <span class="c2">Produkt:</span></p>
$$P(A)\cdot P(B)=\frac12\cdot\frac13=\frac16$$
<p class="kommentar">Beide Werte sind gleich: $A$ und $B$ sind unabhängig.</p>
<p class="schritt"><b>c)</b> <span class="c1">Schnittmenge:</span> $A\cap C=\{2\}$, also $P(A\cap C)=\frac16$. <span class="c2">Produkt:</span></p>
$$P(A)\cdot P(C)=\frac12\cdot\frac12=\frac14\ne\frac16$$
<p class="kommentar">Die Werte sind verschieden: $A$ und $C$ sind abhängig.</p>
<p class="schritt"><b>d)</b> Unter den drei Primzahlen ist nur die 2 gerade:</p>
$$P_C(A)=\frac{P(A\cap C)}{P(C)}=\frac{1/6}{1/2}=\frac13$$
<p class="ergebnis">b) unabhängig &nbsp; c) abhängig &nbsp; d) $\frac13$</p>`,
      theorie: R`
<ul>
<li><b>Ereignisse als Mengen:</b> Schreibe jedes Ereignis als Menge von Augenzahlen. „Und“ bedeutet Schnittmenge: die Augenzahlen, die in beiden Mengen liegen. <i>(Aufgabe a.)</i></li>
<li><b>Unabhängig</b> heißt: Die Information über das eine Ereignis ändert die Wahrscheinlichkeit des anderen nicht. Unter den Zahlen ab 5 ist die Hälfte gerade, genau wie unter allen Zahlen. <i>(Aufgabe b.)</i></li>
<li><b>Abhängig:</b> Unter den Primzahlen ist nur ein Drittel gerade, unter allen Zahlen die Hälfte. Die Information „Primzahl“ macht „gerade“ unwahrscheinlicher. <i>(Aufgaben c und d.)</i></li>
<li><b>Test:</b> Statt lange zu überlegen, rechnest du: Stimmt $P(A\cap B)$ mit $P(A)\cdot P(B)$ überein?</li>
<li><b>Nicht nach Gefühl:</b> Dass $A$ und $B$ unabhängig sind, sieht man den Ereignissen nicht an. Man muss es nachrechnen.</li>
</ul>`,
      merk: R`<p><b>$A$ und $B$ sind stochastisch unabhängig genau dann, wenn $P(A\cap B)=P(A)\cdot P(B)$ ist. Sonst sind sie abhängig.</b></p>`,
      formeln: R`
<table><tr><th>Paar</th><th>$P(\text{Schnitt})$</th><th>Produkt</th><th>Urteil</th></tr>
<tr><td>$A$, $B$</td><td>$\frac16$</td><td>$\frac12\cdot\frac13=\frac16$</td><td>unabhängig</td></tr>
<tr><td>$A$, $C$</td><td>$\frac16$</td><td>$\frac12\cdot\frac12=\frac14$</td><td>abhängig</td></tr></table>
<ol>
<li>Ereignisse als Mengen schreiben.</li>
<li>Schnittmenge bilden.</li>
<li>$P(A)$, $P(B)$ und $P(A\cap B)$ berechnen.</li>
<li>Produkt $P(A)\cdot P(B)$ bilden.</li>
<li>Vergleichen und Urteil mit Begründung notieren.</li>
</ol>
<p>Zweiter Weg: $P_B(A)$ mit $P(A)$ vergleichen.</p>`,
      fehler: R`<ul>
<li>$P(A\cap B)$ einfach als Produkt berechnet, statt die Schnittmenge zu zählen.</li>
<li>Ereignisse mit gemeinsamen Ergebnissen automatisch für abhängig gehalten.</li>
<li>Bei „Primzahl“ die 1 mitgezählt.</li>
</ul>` },

    { nr: 5, afb: 1, abschnitt: "8.4", titel: "Simulation mit Zufallsziffern",
      aufgabe: R`
<p>Bei einer Tombola sind 30 % der Lose Gewinne. Paula kauft 3 Lose. Simuliert wird mit Zufallsziffern, je drei Ziffern stehen für einen Kauf:</p>
<p class="kommentar" style="font-family:monospace">417 293 058 664 120 875 931 346 702 589</p>
<p class="teil"><span class="l">a)</span><b class="op">Gib</b> eine passende Zuordnung der Ziffern <b class="op">an</b>.</p>
<p class="teil"><span class="l">b)</span><b class="op">Bestimme</b> mit den zehn Gruppen einen Schätzwert für „mindestens ein Gewinn“.</p>
<p class="teil"><span class="l">c)</span><b class="op">Berechne</b> die Wahrscheinlichkeit exakt.</p>
<p class="teil"><span class="l">d)</span><b class="op">Gib an</b>, wie der Schätzwert besser wird.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Drei von zehn Ziffern</span> bedeuten „Gewinn“, zum Beispiel 0, 1 und 2. Die Ziffern 3 bis 9 bedeuten „Niete“. So ist $P(\text{Gewinn})=\frac{3}{10}$.</p>
<p class="schritt"><b>b)</b> Gruppen mit mindestens einer der Ziffern 0, 1, 2 zählen:</p>
<p class="kommentar"><span class="c3">417</span> · <span class="c3">293</span> · <span class="c3">058</span> · 664 · <span class="c3">120</span> · 875 · <span class="c3">931</span> · 346 · <span class="c3">702</span> · 589</p>
$$\text{Schätzwert}=\frac{6}{10}=0{,}6$$
<p class="schritt"><b>c)</b> <span class="c2">Gegenereignis</span> „drei Nieten“:</p>
$$P=1-0{,}7^3=1-0{,}343=0{,}657$$
<p class="schritt"><b>d)</b> Mehr Dreiergruppen auswerten. Bei nur 10 Versuchen schwankt die relative Häufigkeit um etwa $\frac{1}{\sqrt{10}}\approx0{,}3$. Bei 1000 Versuchen sind es nur noch etwa $0{,}03$.</p>
<p class="ergebnis">b) $0{,}6$ &nbsp; c) $0{,}657$</p>`,
      theorie: R`
<ul>
<li><b>Simulation:</b> Das echte Experiment (Lose kaufen) wird durch ein Modell ersetzt, das dieselben Wahrscheinlichkeiten hat, sich aber schnell wiederholen lässt.</li>
<li><b>Zuordnung:</b> Alle zehn Ziffern sind gleich wahrscheinlich. Sollen 30 % „Gewinn“ bedeuten, müssen drei Ziffern dafür stehen. Welche drei, ist gleichgültig. <i>(Aufgabe a.)</i></li>
<li><b>Ein Versuch:</b> Drei Lose entsprechen drei Ziffern. Vorher wird festgelegt, wann das Ereignis eingetreten ist: mindestens eine Gewinnziffer. <i>(Aufgabe b.)</i></li>
<li><b>Schätzwert:</b> Die relative Häufigkeit des Ereignisses schätzt seine Wahrscheinlichkeit. Sie ist nicht exakt und fällt bei jeder Ziffernfolge anders aus.</li>
<li><b>Gesetz der großen Zahlen:</b> Je mehr Versuche, desto näher liegt die relative Häufigkeit an der Wahrscheinlichkeit. <i>(Aufgabe d.)</i></li>
</ul>`,
      merk: R`<p><b>Simulation: Modell mit denselben Wahrscheinlichkeiten festlegen, oft wiederholen, relative Häufigkeit als Schätzwert angeben. Übliche Schwankung: etwa $\frac{1}{\sqrt n}$.</b></p>`,
      formeln: R`
<table><tr><th>Wahrscheinlichkeit</th><th>Zuordnung</th></tr>
<tr><td>$30\,\%$</td><td>Ziffern 0–2 von 0–9</td></tr>
<tr><td>$50\,\%$</td><td>gerade Ziffern</td></tr>
<tr><td>$25\,\%$</td><td>Zahlen 00–24 von 00–99</td></tr>
<tr><td>$\frac16$</td><td>ein Würfel</td></tr></table>
<ol>
<li>Zuordnung festlegen.</li>
<li>Einen Versuch und das Ereignis festlegen.</li>
<li>Viele Versuche durchführen.</li>
<li>Treffer zählen, durch die Versuchszahl teilen.</li>
<li>Genauigkeit einschätzen.</li>
</ol>
<p>TI-Nspire: <span style="font-family:monospace">randInt(0,9,3)</span></p>`,
      fehler: R`<ul>
<li>Vier Ziffern (0 bis 3) für 30 % gewählt.</li>
<li>Einzelne Gewinnziffern gezählt statt Gruppen mit mindestens einer.</li>
<li>Den Schätzwert $0{,}6$ als exakte Wahrscheinlichkeit angegeben.</li>
</ul>` },

    { nr: 6, afb: 1, abschnitt: "8.5", titel: "Wahrscheinlichkeitsverteilung",
      aufgabe: R`
<p>In einer Urne liegen 2 rote und 3 blaue Kugeln. Es wird zweimal <b>mit Zurücklegen</b> gezogen. Die Zufallsgröße $X$ gibt die Anzahl der roten Kugeln an.</p>
<p class="teil"><span class="l">a)</span><b class="op">Gib an</b>, welche Werte $X$ annehmen kann.</p>
<p class="teil"><span class="l">b)</span><b class="op">Bestimme</b> die Wahrscheinlichkeitsverteilung von $X$.</p>
<p class="teil"><span class="l">c)</span><b class="op">Berechne</b> $P(X\ge1)$.</p>
<p class="teil"><span class="l">d)</span><b class="op">Prüfe</b> deine Tabelle mit einer Kontrolle.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> $X$ kann 0, 1 oder 2 sein.</p>
<p class="schritt"><b>b)</b> Mit Zurücklegen gilt in beiden Stufen: rot $\frac25$, blau $\frac35$.</p>
<p class="schritt"><span class="c1">$X=0$</span> (blau – blau): $\frac35\cdot\frac35=\frac{9}{25}$</p>
<p class="schritt"><span class="c2">$X=1$</span> (rot – blau oder blau – rot): $2\cdot\frac25\cdot\frac35=\frac{12}{25}$</p>
<p class="schritt"><span class="c3">$X=2$</span> (rot – rot): $\frac25\cdot\frac25=\frac{4}{25}$</p>
<table><tr><th>$k$</th><td>0</td><td>1</td><td>2</td></tr>
<tr><th>$P(X=k)$</th><td>$0{,}36$</td><td>$0{,}48$</td><td>$0{,}16$</td></tr></table>
<p class="schritt"><b>c)</b> „Mindestens eine rote“:</p>
$$P(X\ge1)=0{,}48+0{,}16=0{,}64$$
<p class="kommentar">Oder über das Gegenereignis: $1-0{,}36$.</p>
<p class="schritt"><b>d)</b> Summe: $0{,}36+0{,}48+0{,}16=1$. Die Tabelle ist vollständig.</p>
<p class="ergebnis">b) $0{,}36$; $0{,}48$; $0{,}16$ &nbsp; c) $0{,}64$</p>`,
      theorie: R`
<ul>
<li><b>Zufallsgröße:</b> Sie ordnet jedem Ergebnis eine Zahl zu. Hier wird aus „rot – blau“ die Zahl 1. Mehrere Ergebnisse können dieselbe Zahl bekommen. <i>(Aufgabe a.)</i></li>
<li><b>$P(X=k)$:</b> „$X=1$“ ist eine Abkürzung für das Ereignis „genau eine rote Kugel“. Seine Wahrscheinlichkeit erhältst du mit den Pfadregeln. <i>(Aufgabe b.)</i></li>
<li><b>Verteilung:</b> Die Tabelle aller Werte mit ihren Wahrscheinlichkeiten. Sie fasst das ganze Zufallsexperiment zusammen, soweit es um die Anzahl geht.</li>
<li><b>Nicht gleich wahrscheinlich:</b> Zu $X=1$ gehören zwei Pfade, zu den anderen Werten je einer. Deshalb darfst du nicht „drei Werte, also je ein Drittel“ rechnen.</li>
<li><b>Bereiche:</b> Für „mindestens“ und „höchstens“ addierst du die passenden Spalten. <i>(Aufgabe c.)</i></li>
</ul>`,
      merk: R`<p><b>Die Wahrscheinlichkeitsverteilung gibt zu jedem Wert $k$ die Wahrscheinlichkeit $P(X=k)$ an. Die Summe aller Wahrscheinlichkeiten ist 1.</b></p>`,
      formeln: R`
<table><tr><th>Schreibweise</th><th>Bedeutung</th></tr>
<tr><td>$P(X=1)$</td><td>genau 1</td></tr>
<tr><td>$P(X\ge1)$</td><td>mindestens 1</td></tr>
<tr><td>$P(X\le1)$</td><td>höchstens 1</td></tr>
<tr><td>$P(X&gt;1)$</td><td>mehr als 1</td></tr></table>
<ol>
<li>Festlegen, was $X$ zählt oder misst.</li>
<li>Mögliche Werte notieren.</li>
<li>Zu jedem Wert alle passenden Pfade suchen.</li>
<li>Pfade berechnen und addieren.</li>
<li>Tabelle anlegen, Summe 1 prüfen.</li>
</ol>`,
      fehler: R`<ul>
<li>Jedem Wert die Wahrscheinlichkeit $\frac13$ gegeben.</li>
<li>Bei $X=1$ nur einen der beiden Pfade gerechnet.</li>
<li>Mit $\frac25\cdot\frac14$ gerechnet, obwohl zurückgelegt wird.</li>
</ul>` }
  ]);
})();
