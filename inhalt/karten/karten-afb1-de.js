/* Lernkarten AFB I (Nr. 1–3) · 1 (8.1) Pfadregeln · 2 (8.2) Vierfeldertafel · 3 (8.6) Erwartungswert */
(function () {
  const R = String.raw;
  AN_KARTEN_ADD([
    { nr: 1, afb: 1, abschnitt: "8.1", titel: "Pfadregeln beim Ziehen",
      aufgabe: R`
<p>In einer Urne liegen 4 rote und 2 blaue Kugeln. Es wird zweimal <b>ohne Zurücklegen</b> gezogen.</p>
<p class="teil"><span class="l">a)</span><b class="op">Zeichne</b> ein Baumdiagramm mit allen Wahrscheinlichkeiten.</p>
<p class="teil"><span class="l">b)</span><b class="op">Berechne</b> die Wahrscheinlichkeit für zwei rote Kugeln.</p>
<p class="teil"><span class="l">c)</span><b class="op">Berechne</b> die Wahrscheinlichkeit für zwei verschiedene Farben.</p>
<p class="teil"><span class="l">d)</span><b class="op">Berechne</b> die Wahrscheinlichkeit für mindestens eine rote Kugel.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1"><b>1. Stufe:</b></span> rot $\frac46$, blau $\frac26$. <span class="c2"><b>2. Stufe</b></span> nach Rot: rot $\frac35$, blau $\frac25$. Nach Blau: rot $\frac45$, blau $\frac15$.</p>
<p class="kommentar">Ohne Zurücklegen liegen beim zweiten Zug nur noch 5 Kugeln in der Urne.</p>
<p class="schritt"><b>b)</b> Entlang des Pfades <span class="c1">multiplizieren</span>:</p>
$$P(\text{rot – rot})=\frac46\cdot\frac35=\frac{12}{30}=0{,}4$$
<p class="schritt"><b>c)</b> Zwei Pfade, deren Wahrscheinlichkeiten <span class="c3">addiert</span> werden:</p>
$$\frac46\cdot\frac25+\frac26\cdot\frac45=\frac{8}{30}+\frac{8}{30}=\frac{16}{30}\approx0{,}533$$
<p class="schritt"><b>d)</b> <span class="c4">Gegenereignis</span> „keine rote“ = „blau – blau“:</p>
$$1-\frac26\cdot\frac15=1-\frac{2}{30}=\frac{28}{30}\approx0{,}933$$
<p class="kommentar">Kontrolle: $\frac{12}{30}+\frac{16}{30}+\frac{2}{30}=1$.</p>
<p class="ergebnis">b) $0{,}4$ &nbsp; c) $\approx0{,}533$ &nbsp; d) $\approx0{,}933$</p>`,
      theorie: R`
<ul>
<li><b>Mehrstufiges Zufallsexperiment:</b> Mehrere Schritte nacheinander, hier zwei Züge. Jeder Weg durch das Baumdiagramm (Pfad) ist ein Ergebnis. <i>(Aufgabe: vier Pfade.)</i></li>
<li><b>Warum multiplizieren?</b> Von allen Versuchen beginnen $\frac46$ mit Rot. Von <i>diesen</i> gehen $\frac35$ mit Rot weiter. Ein Anteil von einem Anteil ist ein Produkt. <i>(Aufgabe b.)</i></li>
<li><b>Warum addieren?</b> Verschiedene Pfade können nicht gleichzeitig eintreten. Gehören mehrere zu einem Ereignis, zählt man ihre Anteile zusammen. <i>(Aufgabe c.)</i></li>
<li><b>Ohne Zurücklegen:</b> Die gezogene Kugel fehlt. In der zweiten Stufe wird der Nenner um 1 kleiner und der Zähler der gezogenen Farbe auch.</li>
<li><b>Gegenereignis:</b> „Mindestens eine“ umfasst viele Pfade, „keine“ nur einen. <i>(Aufgabe d.)</i></li>
</ul>`,
      merk: R`<p><b>Entlang eines Pfades multiplizieren, mehrere Pfade addieren. Bei „mindestens ein“ über das Gegenereignis rechnen: $1-P(\text{kein})$.</b></p>`,
      formeln: R`
<table><tr><th>Regel</th><th>Formel / Beispiel</th></tr>
<tr><td>Pfadmultiplikation</td><td>$P(\text{rot – rot})=\frac46\cdot\frac35$</td></tr>
<tr><td>Pfadaddition</td><td>$P(E)=$ Summe der Pfade zu $E$</td></tr>
<tr><td>Gegenereignis</td><td>$P(\overline{E})=1-P(E)$</td></tr>
<tr><td>mit Zurücklegen</td><td>jede Stufe: $\frac46$ und $\frac26$</td></tr></table>
<ol>
<li>Stufen und Äste festlegen.</li>
<li>Wahrscheinlichkeiten an die Äste schreiben (Summe je Verzweigung: 1).</li>
<li>Passende Pfade markieren.</li>
<li>Entlang multiplizieren, Pfade addieren.</li>
<li>Kontrolle: Alle Pfade zusammen ergeben 1.</li>
</ol>`,
      fehler: R`<ul>
<li>Zweite Stufe unverändert: $\frac46\cdot\frac46$ statt $\frac46\cdot\frac35$.</li>
<li>Entlang des Pfades addiert statt multipliziert.</li>
<li>Bei „verschiedene Farben“ nur einen der beiden Pfade gerechnet.</li>
</ul>` },

    { nr: 2, afb: 1, abschnitt: "8.2", titel: "Vierfeldertafel und Bedingung",
      aufgabe: R`
<p>Ein Sportverein hat 80 Mitglieder: 50 Jugendliche ($J$) und 30 Erwachsene. Fußball ($F$) spielen 35 Jugendliche und 10 Erwachsene.</p>
<p class="teil"><span class="l">a)</span><b class="op">Stelle</b> eine Vierfeldertafel <b class="op">auf</b>.</p>
<p class="teil"><span class="l">b)</span><b class="op">Berechne</b> $P(F)$.</p>
<p class="teil"><span class="l">c)</span><b class="op">Berechne</b> $P_J(F)$ und $P_F(J)$.</p>
<p class="teil"><span class="l">d)</span><b class="op">Formuliere</b> beide Ergebnisse aus c) als Satz.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> Gegebene Zahlen eintragen, den Rest ergänzen:</p>
<table><tr><th></th><th>$F$</th><th>$\overline{F}$</th><th>Summe</th></tr>
<tr><th>$J$</th><td><span class="c1">35</span></td><td>15</td><td><span class="c2">50</span></td></tr>
<tr><th>$\overline{J}$</th><td>10</td><td>20</td><td>30</td></tr>
<tr><th>Summe</th><td><span class="c3">45</span></td><td>35</td><td>80</td></tr></table>
<p class="schritt"><b>b)</b> $P(F)=\dfrac{45}{80}\approx0{,}563$</p>
<p class="schritt"><b>c)</b> Bedingung $J$: nur die <span class="c2">Zeile $J$</span> zählt.</p>
$$P_J(F)=\frac{35}{50}=0{,}7$$
<p class="schritt">Bedingung $F$: nur die <span class="c3">Spalte $F$</span> zählt.</p>
$$P_F(J)=\frac{35}{45}\approx0{,}778$$
<p class="schritt"><b>d)</b> 70 % der Jugendlichen spielen Fußball. Etwa 78 % der Fußballspieler sind Jugendliche.</p>
<p class="ergebnis">b) $\approx0{,}563$ &nbsp; c) $0{,}7$ und $\approx0{,}778$</p>`,
      theorie: R`
<ul>
<li><b>Vierfeldertafel:</b> Zwei Merkmale mit je zwei Ausprägungen. Innen stehen die vier Kombinationen, am Rand die Summen. <i>(Aufgabe a.)</i></li>
<li><b>Ohne Bedingung</b> ist die Grundgesamtheit die ganze Gruppe. Man teilt durch 80. <i>(Aufgabe b.)</i></li>
<li><b>Mit Bedingung</b> wird die Grundgesamtheit kleiner: „Unter den Jugendlichen“ heißt, man sieht nur noch die 50 Jugendlichen an. Man teilt durch die Summe dieser Zeile.</li>
<li><b>Die Bedingung steht unten am $P$.</b> $P_J(F)$: Bedingung Jugendliche. $P_F(J)$: Bedingung Fußball. Beide haben denselben Zähler 35, aber verschiedene Nenner. <i>(Aufgabe c.)</i></li>
<li><b>Signalwörter:</b> „unter den …“, „von den …“, „wenn man weiß, dass …“.</li>
</ul>`,
      merk: R`<p><b>$P_B(A)=\dfrac{P(A\cap B)}{P(B)}$: inneres Feld geteilt durch die Summe der Zeile oder Spalte, die zur Bedingung gehört. $P_B(A)$ und $P_A(B)$ sind verschieden.</b></p>`,
      formeln: R`
<table><tr><th>gesucht</th><th>Zähler</th><th>Nenner</th></tr>
<tr><td>$P(J\cap F)$</td><td>35</td><td>80 (alle)</td></tr>
<tr><td>$P_J(F)$</td><td>35</td><td>50 (Zeile $J$)</td></tr>
<tr><td>$P_F(J)$</td><td>35</td><td>45 (Spalte $F$)</td></tr></table>
<ol>
<li>Merkmale und Buchstaben festlegen.</li>
<li>Gegebene Zahlen eintragen.</li>
<li>Fehlende Felder durch Addieren und Subtrahieren ergänzen.</li>
<li>Bedingung erkennen: Welche Gruppe ist die Grundgesamtheit?</li>
<li>Feld durch die passende Summe teilen.</li>
</ol>`,
      fehler: R`<ul>
<li>Bei einer Bedingung durch die Gesamtzahl 80 geteilt.</li>
<li>$P_J(F)$ und $P_F(J)$ vertauscht.</li>
<li>„Jugendlich <i>und</i> Fußball“ mit „Fußball <i>unter</i> den Jugendlichen“ verwechselt.</li>
</ul>` },

    { nr: 3, afb: 1, abschnitt: "8.6", titel: "Erwartungswert eines Spiels",
      aufgabe: R`
<p>Würfelspiel mit 1 € Einsatz: Bei einer 6 werden 4 € ausgezahlt, bei einer 5 wird 1 € ausgezahlt, sonst nichts. $X$ ist die Auszahlung.</p>
<p class="teil"><span class="l">a)</span><b class="op">Gib</b> die Wahrscheinlichkeitsverteilung von $X$ <b class="op">an</b>.</p>
<p class="teil"><span class="l">b)</span><b class="op">Berechne</b> $E(X)$.</p>
<p class="teil"><span class="l">c)</span><b class="op">Berechne</b> den Erwartungswert des Gewinns und <b class="op">entscheide</b>, ob das Spiel fair ist.</p>
<p class="teil"><span class="l">d)</span><b class="op">Bestimme</b> die Auszahlung für eine 6, bei der das Spiel fair wäre.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> Vier der sechs Augenzahlen zahlen nichts aus:</p>
<table><tr><th>$k$ in €</th><td>0</td><td>1</td><td>4</td></tr>
<tr><th>$P(X=k)$</th><td>$\frac46$</td><td>$\frac16$</td><td>$\frac16$</td></tr></table>
<p class="schritt"><b>b)</b> <span class="c1">Wert mal Wahrscheinlichkeit</span>, dann addieren:</p>
$$E(X)=0\cdot\frac46+1\cdot\frac16+4\cdot\frac16=\frac56\approx0{,}83$$
<p class="schritt"><b>c)</b> <span class="c2">Gewinn</span> = Auszahlung minus Einsatz:</p>
$$E(G)=\frac56-1=-\frac16\approx-0{,}17$$
<p class="kommentar">Nicht fair: Man verliert im Mittel etwa 17 Cent pro Spiel.</p>
<p class="schritt"><b>d)</b> <span class="c3">Fair</span> heißt $E(X)=1$. Mit Auszahlung $a$ für die 6:</p>
$$\frac{1+a}{6}=1\quad\Rightarrow\quad a=5$$
<p class="ergebnis">b) $\frac56$ € &nbsp; c) $-\frac16$ €, nicht fair &nbsp; d) 5 €</p>`,
      theorie: R`
<ul>
<li><b>Zufallsgröße:</b> Jedem Ergebnis wird eine Zahl zugeordnet, hier die Auszahlung. Die Verteilung nennt zu jedem Wert die Wahrscheinlichkeit. <i>(Aufgabe a.)</i></li>
<li><b>Erwartungswert:</b> Stell dir 600 Spiele vor. Etwa 100-mal fällt die 6 (400 €), etwa 100-mal die 5 (100 €). Zusammen 500 €, also $\frac{500}{600}=\frac56$ € pro Spiel. Genau das berechnet die Formel. <i>(Aufgabe b.)</i></li>
<li><b>Deutung:</b> Der Erwartungswert ist der Mittelwert bei sehr vielen Spielen. Im einzelnen Spiel kommt er meist gar nicht vor.</li>
<li><b>Gewinn:</b> Für „Lohnt es sich?“ zählt die Auszahlung minus Einsatz. <i>(Aufgabe c.)</i></li>
<li><b>Fair</b> ist ein Spiel, bei dem auf Dauer niemand gewinnt: erwarteter Gewinn 0. <i>(Aufgabe d.)</i></li>
</ul>`,
      merk: R`<p><b>$E(X)=\sum x_i\cdot P(X=x_i)$: jeden Wert mit seiner Wahrscheinlichkeit gewichten. Faires Spiel: Einsatz = erwartete Auszahlung.</b></p>`,
      formeln: R`
<table><tr><th>Größe</th><th>Formel</th></tr>
<tr><td>Erwartungswert</td><td>$\mu=x_1p_1+x_2p_2+\dots$</td></tr>
<tr><td>Gewinn</td><td>$E(G)=E(X)-\text{Einsatz}$</td></tr>
<tr><td>fair</td><td>$E(G)=0$</td></tr></table>
<ol>
<li>Werte der Zufallsgröße festlegen.</li>
<li>Wahrscheinlichkeiten bestimmen (Summe 1).</li>
<li>Jeden Wert mit seiner Wahrscheinlichkeit multiplizieren.</li>
<li>Produkte addieren.</li>
<li>Im Sachzusammenhang deuten.</li>
</ol>`,
      fehler: R`<ul>
<li>Ungewichtet gemittelt: $\frac{0+1+4}{3}$.</li>
<li>Einsatz vergessen und $\frac56$ € als Gewinn gedeutet.</li>
<li>Erwartungswert als wahrscheinlichsten Wert gedeutet (das wäre 0 €).</li>
</ul>` }
  ]);
})();
