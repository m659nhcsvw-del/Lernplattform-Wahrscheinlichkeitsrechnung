/* Lernkarten AFB III (Nr. 13–15) · 13 (8.1) „Mindestens ein“ mit n · 14 (8.4) Simulation beurteilen · 15 (8.6) Faires Spiel mit Parameter */
(function () {
  const R = String.raw;
  AN_KARTEN_ADD([
    { nr: 13, afb: 3, abschnitt: "8.1", titel: "„Mindestens ein Treffer“",
      aufgabe: R`
<p>Ein Bogenschütze trifft die Mitte bei jedem Schuss mit Wahrscheinlichkeit $0{,}3$. Die Schüsse gelten als unabhängig.</p>
<p class="teil"><span class="l">a)</span><b class="op">Berechne</b> die Wahrscheinlichkeit für mindestens einen Treffer bei 4 Schüssen.</p>
<p class="teil"><span class="l">b)</span><b class="op">Ermittle</b>, wie viele Schüsse er mindestens braucht, um mit mindestens 95 % Wahrscheinlichkeit mindestens einmal zu treffen.</p>
<p class="teil"><span class="l">c)</span><b class="op">Begründe</b>, warum man hier mit dem Gegenereignis rechnet.</p>
<p class="teil"><span class="l">d)</span><b class="op">Beurteile</b> die Annahme der Unabhängigkeit.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Gegenereignis:</span> kein Treffer in 4 Schüssen.</p>
$$P=1-0{,}7^4=1-0{,}2401\approx0{,}760$$
<p class="schritt"><b>b)</b> <span class="c2">Ansatz mit $n$:</span> $1-0{,}7^n\ge0{,}95$, also $0{,}7^n\le0{,}05$. Probieren:</p>
$$0{,}7^8\approx0{,}058\qquad 0{,}7^9\approx0{,}040$$
<p class="kommentar">Erst bei $n=9$ ist die Bedingung erfüllt.</p>
<p class="schritt"><b>c)</b> „Mindestens ein Treffer“ besteht bei 4 Schüssen aus 15 der 16 Pfade. Das Gegenereignis ist ein einziger Pfad, dessen Wahrscheinlichkeit ein einfaches Produkt ist. So bleibt die Rechnung auch für unbekanntes $n$ möglich.</p>
<p class="schritt"><b>d)</b> <span class="c3">Fraglich:</span> Nach Fehlschüssen kann die Nervosität steigen, mit der Zeit ermüdet der Schütze, oder er schießt sich ein. Dann ändert sich die Trefferwahrscheinlichkeit von Schuss zu Schuss. Das Modell ist eine brauchbare Näherung, wenn die Bedingungen gleich bleiben.</p>
<p class="ergebnis">a) $\approx0{,}760$ &nbsp; b) 9 Schüsse</p>`,
      theorie: R`
<ul>
<li><b>Unabhängige Wiederholung:</b> In jeder Stufe des Baums stehen dieselben Wahrscheinlichkeiten $0{,}3$ und $0{,}7$. Der Pfad „nie getroffen“ hat bei $n$ Schüssen die Wahrscheinlichkeit $0{,}7^n$.</li>
<li><b>Gegenereignis:</b> „Mindestens ein Treffer“ und „kein Treffer“ ergänzen sich zu 1. Deshalb gilt $P(\text{mindestens einer})=1-0{,}7^n$. <i>(Aufgabe a.)</i></li>
<li><b>Mindestanzahl:</b> Die Bedingung führt auf $0{,}7^n\le0{,}05$. Weil $0{,}7^n$ mit jedem Schuss kleiner wird, findet man das kleinste passende $n$ durch systematisches Probieren. <i>(Aufgabe b.)</i></li>
<li><b>Aufrunden:</b> $n$ ist eine Anzahl. Man nimmt das erste $n$, bei dem die Bedingung erfüllt ist, auch wenn es nur knapp ist.</li>
<li><b>Modellkritik:</b> Das Ergebnis ist nur so gut wie die Annahmen (gleiche Trefferwahrscheinlichkeit, Unabhängigkeit). <i>(Aufgabe d.)</i></li>
</ul>`,
      merk: R`<p><b>Bei $n$ unabhängigen Versuchen mit Erfolgswahrscheinlichkeit $p$ gilt $P(\text{mindestens ein Erfolg})=1-(1-p)^n$.</b></p>`,
      formeln: R`
<table><tr><th>Frage</th><th>Ansatz</th></tr>
<tr><td>kein Erfolg</td><td>$(1-p)^n$</td></tr>
<tr><td>mindestens ein Erfolg</td><td>$1-(1-p)^n$</td></tr>
<tr><td>Mindestanzahl</td><td>$(1-p)^n\le1-\text{Sicherheit}$</td></tr></table>
<ol>
<li>Gegenereignis formulieren.</li>
<li>Ungleichung mit $n$ aufstellen.</li>
<li>$n$ durch Probieren (Tabelle im Rechner) bestimmen.</li>
<li>Probe mit $n-1$: Bedingung noch nicht erfüllt.</li>
<li>Antwortsatz mit „mindestens“.</li>
</ol>`,
      fehler: R`<ul>
<li>$4\cdot0{,}3=1{,}2$ als Wahrscheinlichkeit angegeben.</li>
<li>Bei b) abgerundet ($n=8$ erfüllt die Bedingung noch nicht).</li>
<li>Ungleichung falsch herum: $0{,}7^n\ge0{,}05$.</li>
</ul>` },

    { nr: 14, afb: 3, abschnitt: "8.4", titel: "Simulation beurteilen",
      aufgabe: R`
<p>Ein Hersteller behauptet: „In 25 % unserer Überraschungseier ist eine Figur.“ Eine Klasse prüft 400 Eier und findet 108 Figuren.</p>
<p class="teil"><span class="l">a)</span><b class="op">Berechne</b> die relative Häufigkeit und die übliche Schwankung für $n=400$.</p>
<p class="teil"><span class="l">b)</span><b class="op">Beurteile</b>, ob das Ergebnis der Behauptung widerspricht.</p>
<p class="teil"><span class="l">c)</span><b class="op">Ermittle</b>, wie viele Eier nötig wären, damit die Schwankung nur $0{,}02$ beträgt.</p>
<p class="teil"><span class="l">d)</span><b class="op">Beschreibe</b>, wie man den Versuch mit Zufallszahlen simuliert.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Relative Häufigkeit:</span> $\dfrac{108}{400}=0{,}27$. <span class="c2">Übliche Schwankung:</span> $\dfrac{1}{\sqrt{400}}=0{,}05$.</p>
<p class="schritt"><b>b)</b> Die Abweichung beträgt $0{,}27-0{,}25=0{,}02$. Sie ist kleiner als die übliche Schwankung $0{,}05$. Das Ergebnis <span class="c3">widerspricht der Behauptung nicht</span>. Es beweist sie aber auch nicht: Auch ein Anteil von 28 % wäre mit den Daten verträglich.</p>
<p class="schritt"><b>c)</b> <span class="c2">Ansatz:</span></p>
$$\frac{1}{\sqrt n}=0{,}02\;\Rightarrow\;\sqrt n=50\;\Rightarrow\;n=2500$$
<p class="kommentar">Für eine 2,5-mal so kleine Schwankung braucht man 6,25-mal so viele Eier.</p>
<p class="schritt"><b>d)</b> Zweistellige Zufallszahlen 00 bis 99 erzeugen. 00 bis 24 bedeutet „Figur“ (25 von 100). 400 Zahlen sind ein Durchgang, die Figuren werden gezählt. Viele Durchgänge zeigen, welche Anzahlen bei wahren 25 % üblich sind. Liegt 108 im üblichen Bereich, passt die Behauptung.</p>
<p class="ergebnis">a) $0{,}27$; $0{,}05$ &nbsp; b) kein Widerspruch &nbsp; c) 2500</p>`,
      theorie: R`
<ul>
<li><b>Schätzwert:</b> Eine relative Häufigkeit aus $n$ Versuchen ist nie exakt die Wahrscheinlichkeit. Sie schwankt von Stichprobe zu Stichprobe. <i>(Aufgabe a.)</i></li>
<li><b>Faustregel:</b> Die Abweichung beträgt meist höchstens etwa $\frac{1}{\sqrt n}$. Liegt eine beobachtete Abweichung darunter, ist sie durch Zufall erklärbar. <i>(Aufgabe b.)</i></li>
<li><b>Vorsichtige Sprache:</b> „Widerspricht nicht“ ist etwas anderes als „beweist“. Viele verschiedene Wahrscheinlichkeiten sind mit denselben Daten verträglich.</li>
<li><b>Genauigkeit kostet:</b> Wegen der Wurzel braucht man für die halbe Schwankung die vierfache Versuchszahl. <i>(Aufgabe c.)</i></li>
<li><b>Simulation als Prüfwerkzeug:</b> Man tut so, als stimme die Behauptung, und lässt den Zufall oft spielen. So sieht man, welche Ergebnisse dann üblich sind. <i>(Aufgabe d.)</i></li>
</ul>`,
      merk: R`<p><b>Eine relative Häufigkeit aus $n$ Versuchen schwankt um etwa $\frac{1}{\sqrt n}$. Abweichungen in dieser Größe sprechen nicht gegen ein Modell.</b></p>`,
      formeln: R`
<table><tr><th>$n$</th><td>100</td><td>400</td><td>2500</td><td>10 000</td></tr>
<tr><th>$\frac{1}{\sqrt n}$</th><td>$0{,}10$</td><td>$0{,}05$</td><td>$0{,}02$</td><td>$0{,}01$</td></tr></table>
<ol>
<li>Relative Häufigkeit berechnen.</li>
<li>Abweichung von der behaupteten Wahrscheinlichkeit bilden.</li>
<li>Mit $\frac{1}{\sqrt n}$ vergleichen.</li>
<li>Vorsichtig formulieren: „verträglich“ oder „auffällig“.</li>
</ol>
<p>Simulation planen: Modell (Zuordnung der Zufallszahlen), ein Durchgang, viele Wiederholungen, Auswertung, Modellannahmen nennen.</p>`,
      fehler: R`<ul>
<li>$0{,}27\ne0{,}25$ als Widerlegung gedeutet.</li>
<li>„Kein Widerspruch“ als Beweis der Behauptung gedeutet.</li>
<li>Für doppelte Genauigkeit nur die doppelte Versuchszahl angesetzt.</li>
</ul>` },

    { nr: 15, afb: 3, abschnitt: "8.6", titel: "Ein Spiel entwerfen",
      aufgabe: R`
<p>Ein Glücksrad hat ein Gewinnfeld, das den Anteil $p$ der Kreisfläche einnimmt. Bleibt der Zeiger dort stehen, werden 5 € ausgezahlt, sonst nichts. Der Einsatz beträgt 2 €.</p>
<p class="teil"><span class="l">a)</span><b class="op">Bestimme</b> $p$ so, dass das Spiel fair ist.</p>
<p class="teil"><span class="l">b)</span><b class="op">Berechne</b> für dieses $p$ die Standardabweichung der Auszahlung.</p>
<p class="teil"><span class="l">c)</span>Der Betreiber will im Mittel 0,50 € pro Spiel einnehmen. <b class="op">Bestimme</b> $p$.</p>
<p class="teil"><span class="l">d)</span><b class="op">Beurteile</b>: „Bei einem fairen Spiel hat man nach 100 Spielen genau so viel Geld wie vorher.“</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Erwartete Auszahlung</span> $=5\cdot p+0\cdot(1-p)=5p$. <span class="c2">Fair:</span> $5p=2$, also $p=0{,}4$.</p>
<p class="schritt"><b>b)</b> Mit $\mu=2$:</p>
$$V=(5-2)^2\cdot0{,}4+(0-2)^2\cdot0{,}6=3{,}6+2{,}4=6$$
$$\sigma=\sqrt6\approx2{,}45$$
<p class="schritt"><b>c)</b> Der Betreiber nimmt 2 € ein und zahlt im Mittel $5p$ aus:</p>
$$2-5p=0{,}5\;\Rightarrow\;p=0{,}3$$
<p class="schritt"><b>d)</b> <span class="c3">Falsch.</span> Der Erwartungswert 0 beschreibt den Mittelwert sehr vieler Spiele, nicht den Kontostand nach 100 Spielen. Jedes Spiel streut um $\sigma\approx2{,}45$ €. Nach 100 Spielen sind Abweichungen von 20 € und mehr nach oben oder unten normal. Fair heißt nur: Keine Seite ist auf Dauer im Vorteil.</p>
<p class="ergebnis">a) $p=0{,}4$ &nbsp; b) $\approx2{,}45$ € &nbsp; c) $p=0{,}3$</p>`,
      theorie: R`
<ul>
<li><b>Parameter:</b> Die Wahrscheinlichkeit $p$ ist noch nicht festgelegt. Der Erwartungswert wird dadurch zu einem Term in $p$, und eine Forderung (fair, bestimmter Überschuss) wird zu einer Gleichung. <i>(Aufgaben a und c.)</i></li>
<li><b>Fair:</b> Erwartete Auszahlung gleich Einsatz. Dann ist der erwartete Gewinn für beide Seiten 0.</li>
<li><b>Sicht des Betreibers:</b> Sein Gewinn pro Spiel ist Einsatz minus Auszahlung. Sein erwarteter Gewinn ist deshalb $2-5p$.</li>
<li><b>Erwartungswert und Einzelfall:</b> Auch bei einem fairen Spiel gewinnt oder verliert man in jedem einzelnen Spiel. Wie stark, zeigt die Standardabweichung. <i>(Aufgabe b.)</i></li>
<li><b>Viele Spiele:</b> Der <i>Mittelwert</i> pro Spiel nähert sich dem Erwartungswert. Der <i>Kontostand</i> kann sich trotzdem weit von 0 entfernen. <i>(Aufgabe d.)</i></li>
</ul>`,
      merk: R`<p><b>Ein Spiel ist fair, wenn der Erwartungswert des Gewinns 0 ist. Das ist eine Aussage über den Mittelwert vieler Spiele, nicht über das Ergebnis einer Spielserie.</b></p>`,
      formeln: R`
<table><tr><th>Größe</th><th>Term</th></tr>
<tr><td>erwartete Auszahlung</td><td>$5p$</td></tr>
<tr><td>Gewinn Spieler</td><td>$5p-2$</td></tr>
<tr><td>Gewinn Betreiber</td><td>$2-5p$</td></tr>
<tr><td>Varianz</td><td>$(5-\mu)^2p+(0-\mu)^2(1-p)$</td></tr></table>
<ol>
<li>Zufallsgröße und Sichtweise festlegen (Spieler oder Betreiber).</li>
<li>Erwartungswert als Term in $p$ aufstellen.</li>
<li>Forderung als Gleichung schreiben und lösen.</li>
<li>Prüfen: $0\le p\le1$?</li>
<li>Ergebnis deuten.</li>
</ol>`,
      fehler: R`<ul>
<li>Einsatz nicht berücksichtigt und $5p=0$ gesetzt.</li>
<li>Sicht von Spieler und Betreiber vertauscht (Vorzeichen).</li>
<li>„Fair“ als „man verliert nie“ verstanden.</li>
</ul>` }
  ]);
})();
