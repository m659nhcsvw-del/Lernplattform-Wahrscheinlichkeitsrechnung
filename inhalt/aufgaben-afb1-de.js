/* Aufgaben AFB I, Abschnitte 8.1–8.7 (je eine Aufgabe) */
(function () {
  const R = String.raw;
  AN_TASKS_ADD("afb1", [
    {
      id: "afb1-01", abschnitt: "8.1", title: "Glücksrad mit acht Feldern",
      aufgabenstellung: R`<p>Ein Glücksrad hat acht gleich große Felder mit den Zahlen 1 bis 8. Es wird einmal gedreht.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit für eine Primzahl.`, a: 0.5, tol: 0.001,
          hilfen: [R`Welche der Zahlen 1 bis 8 sind Primzahlen?`, R`Die 1 ist keine Primzahl. Primzahlen sind 2, 3, 5 und 7.`, R`Laplace: $\frac{\text{günstige}}{\text{mögliche}}=\frac{4}{8}$.`],
          fehler: [{ a: 0.625, msg: "Du hast die 1 mitgezählt. Die 1 ist keine Primzahl." }], lsg: R`$E=\{2;3;5;7\}$, also $P(E)=\frac48=0{,}5$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit für eine Zahl größer als 6.`, a: 0.25, tol: 0.001,
          hilfen: [R`„Größer als 6“ schließt die 6 nicht ein.`, R`Günstig sind 7 und 8.`, R`$\frac28$`],
          fehler: [{ a: 0.375, msg: "„Größer als 6“ heißt 7 oder 8. Die 6 gehört nicht dazu." }], lsg: R`$\{7;8\}$, also $\frac28=0{,}25$.` },
        { typ: "mc", frage: R`<b class="op">Gib</b> das Gegenereignis von „Zahl größer als 6“ <b class="op">an</b>.`, o: ["Zahl kleiner als 6", "Zahl höchstens 6", "Zahl mindestens 6"], a: 1,
          why: R`Das Gegenereignis enthält alle übrigen Zahlen: 1 bis 6, also „höchstens 6“. Bei „kleiner als 6“ würde die 6 fehlen.`, hilfen: [R`Ereignis und Gegenereignis ergeben zusammen alle Zahlen von 1 bis 8.`, R`Zum Ereignis gehören 7 und 8. Was bleibt übrig?`, R`Es bleiben 1, 2, 3, 4, 5, 6.`] },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit für „gerade Zahl oder Zahl größer als 6“.`, a: 0.625, tol: 0.001,
          hilfen: [R`Schreibe beide Ereignisse als Mengen auf.`, R`Gerade: $\{2;4;6;8\}$. Größer als 6: $\{7;8\}$. Die 8 darf nur einmal gezählt werden.`, R`$\frac48+\frac28-\frac18$`],
          fehler: [{ a: 0.75, msg: "Du hast die 8 doppelt gezählt. Ziehe P(A∩B) = 1/8 wieder ab." }], lsg: R`$A\cup B=\{2;4;6;7;8\}$, also $\frac58=0{,}625$. Mit dem Additionssatz: $\frac48+\frac28-\frac18$.` }
      ],
      analyse: R`<p>Ein Glücksrad hat <span class="hl-given">acht gleich große Felder mit den Zahlen 1 bis 8</span> und wird <span class="hl-condition">einmal gedreht</span>. Gesucht sind die <span class="hl-target">Wahrscheinlichkeiten verschiedener Ereignisse</span>.</p><p>„Berechne“ verlangt einen kurzen Rechenweg mit Ergebnis, „gib an“ nur das Ergebnis.</p>`,
      ansatz: R`<p>Weil alle Felder gleich groß sind, ist das Drehen ein Laplace-Experiment. Du zählst die günstigen Felder und teilst durch 8. Bei „oder“ schreibst du die Mengen auf oder nutzt den Additionssatz. Addiere nicht einfach beide Wahrscheinlichkeiten, sonst zählst du gemeinsame Zahlen doppelt.</p>`,
      loesung: R`<p><b>a)</b> $\{2;3;5;7\}$: $P=\frac48=0{,}5$.</p><p><b>b)</b> $\{7;8\}$: $P=\frac28=0{,}25$.</p><p><b>c)</b> Gegenereignis: $\{1;\dots;6\}$, also „höchstens 6“ mit $P=1-0{,}25=0{,}75$.</p><p><b>d)</b> $\{2;4;6;8\}\cup\{7;8\}=\{2;4;6;7;8\}$: $P=\frac58=0{,}625$.</p>`,
      antwortsatz: R`<p>Eine Primzahl erscheint mit 50 %, eine Zahl größer als 6 mit 25 % und „gerade oder größer als 6“ mit 62,5 % Wahrscheinlichkeit.</p>`
    },
    {
      id: "afb1-02", abschnitt: "8.2", title: "Führerschein im Jahrgang",
      aufgabenstellung: R`<p>In einem Jahrgang mit 120 Lernenden sind 70 volljährig ($V$). Einen Führerschein ($F$) haben 50 der Volljährigen und 5 der Minderjährigen (begleitetes Fahren).</p>
        <div class="nv-table-wrap"><table class="nv-table"><tr><th></th><th>$F$</th><th>$\overline{F}$</th><th>Summe</th></tr><tr><th>$V$</th><td>50</td><td>20</td><td>70</td></tr><tr><th>$\overline{V}$</th><td>5</td><td>45</td><td>50</td></tr><tr><th>Summe</th><td>55</td><td>65</td><td>120</td></tr></table></div>
        <p>Eine Person wird zufällig ausgewählt.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(F)$.`, a: 55 / 120, tol: 0.002, hilfen: [R`Gesucht ist der Anteil aller Personen mit Führerschein.`, R`Lies die Spaltensumme bei $F$ ab.`, R`$\frac{55}{120}$`], lsg: R`$P(F)=\frac{55}{120}\approx0{,}458$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P_V(F)$, also die Wahrscheinlichkeit für einen Führerschein unter den Volljährigen.`, a: 50 / 70, tol: 0.002,
          hilfen: [R`Die Bedingung „volljährig“ legt die Grundgesamtheit fest.`, R`Betrachte nur die Zeile $V$ mit 70 Personen.`, R`$\frac{50}{70}$`],
          fehler: [{ a: 50 / 120, msg: "Das ist P(V∩F). Unter der Bedingung V teilst du durch 70." }, { a: 50 / 55, msg: "Das ist P_F(V). Die Bedingung ist hier V, also teilst du durch 70." }], lsg: R`$P_V(F)=\frac{50}{70}\approx0{,}714$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P_F(V)$.`, a: 50 / 55, tol: 0.002, hilfen: [R`Jetzt ist „hat Führerschein“ die Bedingung.`, R`Betrachte nur die Spalte $F$ mit 55 Personen.`, R`$\frac{50}{55}$`],
          fehler: [{ a: 50 / 70, msg: "Das ist P_V(F). Hier ist F die Bedingung, also teilst du durch 55." }], lsg: R`$P_F(V)=\frac{50}{55}\approx0{,}909$.` },
        { typ: "mc", frage: R`<b class="op">Entscheide</b>, welcher Satz zu $P_F(V)$ passt.`, o: ["Etwa 91 % aller Lernenden sind volljährig und haben einen Führerschein.", "Etwa 91 % der Volljährigen haben einen Führerschein.", "Etwa 91 % der Lernenden mit Führerschein sind volljährig."], a: 2,
          why: R`Die Bedingung steht unten: Grundgesamtheit sind die Personen mit Führerschein. Von ihnen sind 91 % volljährig.`, hilfen: [R`Was steht bei $P_F(V)$ als Bedingung?`, R`Die Bedingung ist $F$.`, R`Formuliere: „Von den Personen mit Führerschein sind …“`] }
      ],
      analyse: R`<p>Von <span class="hl-given">120 Lernenden</span> sind <span class="hl-given">70 volljährig</span>, <span class="hl-given">50 bzw. 5</span> haben einen Führerschein. Gesucht sind <span class="hl-target">$P(F)$, $P_V(F)$ und $P_F(V)$</span>. Die Wörter <span class="hl-condition">„unter den Volljährigen“</span> kennzeichnen eine Bedingung.</p><p>„Berechne“: Bruch aus der Tafel aufstellen und als Dezimalzahl angeben.</p>`,
      ansatz: R`<p>Alle drei Größen liest du aus der Vierfeldertafel ab. Der Zähler ist jedes Mal eine Anzahl aus der Tafel. Entscheidend ist der Nenner: ohne Bedingung die Gesamtzahl 120, mit Bedingung die Summe der Zeile oder Spalte, die zur Bedingung gehört.</p>`,
      loesung: R`<p><b>a)</b> $P(F)=\frac{55}{120}\approx0{,}458$.</p><p><b>b)</b> $P_V(F)=\frac{50}{70}\approx0{,}714$.</p><p><b>c)</b> $P_F(V)=\frac{50}{55}\approx0{,}909$.</p><div class="nv-merke"><p><b>Merke:</b> $P_V(F)$ und $P_F(V)$ haben denselben Zähler 50, aber verschiedene Nenner.</p></div>`,
      antwortsatz: R`<p>Etwa 46 % des Jahrgangs haben einen Führerschein. Unter den Volljährigen sind es etwa 71 %. Von den Personen mit Führerschein sind etwa 91 % volljährig.</p>`
    },
    {
      id: "afb1-03", abschnitt: "8.3", title: "Unabhängig oder nicht?",
      aufgabenstellung: R`<p>Für zwei Ereignisse $A$ und $B$ gilt $P(A)=0{,}5$, $P(B)=0{,}3$ und $P(A\cap B)=0{,}15$.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> das Produkt $P(A)\cdot P(B)$.`, a: 0.15, tol: 0.001, hilfen: [R`Multipliziere die beiden Wahrscheinlichkeiten.`, R`$0{,}5\cdot0{,}3$`, R`Die Hälfte von $0{,}3$.`], lsg: R`$0{,}5\cdot0{,}3=0{,}15$.` },
        { typ: "mc", frage: R`<b class="op">Entscheide</b>, ob $A$ und $B$ stochastisch unabhängig sind.`, o: ["unabhängig, denn P(A∩B) = P(A)·P(B)", "abhängig, denn P(A) ≠ P(B)", "abhängig, denn P(A∩B) > 0"], a: 0,
          why: R`$P(A\cap B)=0{,}15$ stimmt mit dem Produkt überein. Ob $P(A)$ und $P(B)$ gleich sind, spielt keine Rolle.`, hilfen: [R`Wie lautet die Definition der Unabhängigkeit?`, R`Vergleiche $P(A\cap B)$ mit dem Produkt aus a).`, R`Beide Werte sind $0{,}15$.`] },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P_B(A)$.`, a: 0.5, tol: 0.001, hilfen: [R`Benutze die Definition der bedingten Wahrscheinlichkeit.`, R`$P_B(A)=\frac{P(A\cap B)}{P(B)}$`, R`$\frac{0{,}15}{0{,}3}$`], lsg: R`$P_B(A)=\frac{0{,}15}{0{,}3}=0{,}5=P(A)$. Das bestätigt die Unabhängigkeit.` },
        { typ: "num", frage: R`Ein Würfel wird zweimal geworfen. <b class="op">Berechne</b> die Wahrscheinlichkeit für zwei Sechsen (Bruch oder Dezimalzahl).`, a: 1 / 36, tol: 0.0005, hilfen: [R`Die beiden Würfe sind unabhängig.`, R`Multipliziere die Wahrscheinlichkeiten der beiden Würfe.`, R`$\frac16\cdot\frac16$`],
          fehler: [{ a: 1 / 3, msg: "Du hast addiert. Bei „und“ mit unabhängigen Würfen wird multipliziert." }], lsg: R`$\frac16\cdot\frac16=\frac1{36}\approx0{,}028$.` }
      ],
      analyse: R`<p>Gegeben sind <span class="hl-given">$P(A)=0{,}5$, $P(B)=0{,}3$, $P(A\cap B)=0{,}15$</span>. Zu <span class="hl-target">prüfen ist die Unabhängigkeit</span>.</p><p>„Entscheide“ verlangt ein Urteil, das sich auf die Rechnung stützt.</p>`,
      ansatz: R`<p>Unabhängigkeit wird immer gleich geprüft: Produkt $P(A)\cdot P(B)$ bilden und mit $P(A\cap B)$ vergleichen. Gleichwertig ist der Vergleich von $P_B(A)$ mit $P(A)$.</p>`,
      loesung: R`<p><b>a)</b> $0{,}5\cdot0{,}3=0{,}15$.</p><p><b>b)</b> $P(A\cap B)=0{,}15=P(A)\cdot P(B)$, also unabhängig.</p><p><b>c)</b> $P_B(A)=\frac{0{,}15}{0{,}3}=0{,}5$.</p><p><b>d)</b> $\frac16\cdot\frac16=\frac{1}{36}$.</p>`,
      antwortsatz: R`<p>$A$ und $B$ sind stochastisch unabhängig. Zwei Sechsen hintereinander fallen mit einer Wahrscheinlichkeit von etwa 2,8 %.</p>`
    },
    {
      id: "afb1-04", abschnitt: "8.4", title: "Elfmeter simulieren",
      aufgabenstellung: R`<p>Ein Torwart hält jeden Elfmeter mit einer Wahrscheinlichkeit von 20 %. Ein Elfmeterschießen mit fünf Schüssen soll mit Zufallsziffern (0 bis 9) simuliert werden. Untersucht wird das Ereignis „Der Torwart hält mindestens zwei der fünf Elfmeter“.</p>`,
      teile: [
        { typ: "mc", frage: R`<b class="op">Gib</b> eine passende Zuordnung <b class="op">an</b>.`, o: ["Ziffer 2: gehalten, alle anderen: Tor", "Ziffern 0 und 1: gehalten, Ziffern 2 bis 9: Tor", "Ziffern 0 bis 2: gehalten, Ziffern 3 bis 9: Tor"], a: 1,
          why: R`Zwei von zehn Ziffern bedeuten „gehalten“, das sind 20 %.`, hilfen: [R`Wie viele der zehn Ziffern müssen „gehalten“ bedeuten?`, R`20 % von 10 Ziffern sind 2 Ziffern.`, R`Zum Beispiel die Ziffern 0 und 1.`] },
        { typ: "num", frage: R`Bei 50 simulierten Elfmeterschießen trat das Ereignis 16-mal ein. <b class="op">Gib</b> den Schätzwert für die Wahrscheinlichkeit <b class="op">an</b>.`, a: 0.32, tol: 0.001, hilfen: [R`Der Schätzwert ist die relative Häufigkeit.`, R`Teile die Anzahl der Treffer durch die Anzahl der Versuche.`, R`$\frac{16}{50}$`], lsg: R`$\frac{16}{50}=0{,}32$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit des Ereignisses exakt (vier Nachkommastellen).`, a: 0.2627, tol: 0.001,
          hilfen: [R`Nutze das Gegenereignis: „kein oder genau ein Elfmeter gehalten“.`, R`$P(\text{keiner})=0{,}8^5$. Für „genau einer“ gibt es fünf Pfade.`, R`$1-0{,}8^5-5\cdot0{,}2\cdot0{,}8^4$`],
          fehler: [{ a: 0.6723, msg: "Das ist 1 − 0,8⁵, also „mindestens ein gehaltener“. Ziehe auch „genau einer“ ab." }], lsg: R`$1-0{,}8^5-5\cdot0{,}2\cdot0{,}8^4=1-0{,}32768-0{,}4096\approx0{,}2627$.` },
        { typ: "mc", frage: R`<b class="op">Gib an</b>, wie der Schätzwert zuverlässiger wird.`, o: ["andere Ziffern zuordnen", "deutlich mehr Elfmeterschießen simulieren", "nur drei statt fünf Schüsse simulieren"], a: 1,
          why: R`Die Schwankung der relativen Häufigkeit beträgt etwa $\frac{1}{\sqrt n}$, bei 50 Versuchen also rund $0{,}14$. Mehr Versuche machen sie kleiner.`, hilfen: [R`Wovon hängt die Schwankung einer relativen Häufigkeit ab?`, R`Denke an das Gesetz der großen Zahlen.`, R`Erhöhe die Anzahl der Versuche.`] }
      ],
      analyse: R`<p>Der Torwart hält mit <span class="hl-given">20 %</span>, es gibt <span class="hl-given">fünf Schüsse</span>. Simuliert wird mit <span class="hl-condition">Zufallsziffern</span>. Gesucht: <span class="hl-target">Schätzwert und exakter Wert für „mindestens zwei gehalten“</span>.</p><p>„Gib an“ verlangt kein Rechnen, „berechne“ einen Rechenweg.</p>`,
      ansatz: R`<p>Die Zuordnung muss die Wahrscheinlichkeit 20 % abbilden: 2 von 10 Ziffern. Der Schätzwert ist die relative Häufigkeit. Für den exakten Wert ist das Gegenereignis am kürzesten, weil „mindestens zwei“ sehr viele Pfade umfasst.</p>`,
      loesung: R`<p><b>a)</b> Zum Beispiel 0 und 1 für „gehalten“.</p><p><b>b)</b> $\frac{16}{50}=0{,}32$.</p><p><b>c)</b> $P(\text{keiner})=0{,}8^5=0{,}32768$, $P(\text{genau einer})=5\cdot0{,}2\cdot0{,}8^4=0{,}4096$. Also $P=1-0{,}32768-0{,}4096=0{,}26272$.</p><p><b>d)</b> Mehr Versuche durchführen.</p>`,
      antwortsatz: R`<p>Die Simulation schätzt die Wahrscheinlichkeit auf 0,32, der exakte Wert ist etwa 0,263. Die Abweichung ist bei nur 50 Versuchen normal.</p>`
    },
    {
      id: "afb1-05", abschnitt: "8.5", title: "Zwei Münzen",
      aufgabenstellung: R`<p>Eine Münze wird zweimal geworfen. Die Zufallsgröße $X$ gibt an, wie oft „Zahl“ fällt.</p>`,
      teile: [
        { typ: "mc", frage: R`<b class="op">Gib</b> alle Werte <b class="op">an</b>, die $X$ annehmen kann.`, o: ["1 und 2", "0, 1 und 2", "ZZ, ZW, WZ, WW"], a: 1, why: R`$X$ ist eine Zahl: die Anzahl von „Zahl“. Möglich sind 0, 1 und 2. Die Wurffolgen sind die Ergebnisse, nicht die Werte von $X$.`, hilfen: [R`$X$ ordnet jedem Ergebnis eine Zahl zu.`, R`Wie oft kann „Zahl“ bei zwei Würfen fallen?`, R`Auch „keinmal“ ist möglich.`] },
        { typ: "zahlen", frage: R`<b class="op">Gib</b> die Wahrscheinlichkeitsverteilung von $X$ <b class="op">an</b>.`, felder: [{ l: "P(X=0) =", a: 0.25 }, { l: "P(X=1) =", a: 0.5 }, { l: "P(X=2) =", a: 0.25 }], tol: 0.001,
          hilfen: [R`Schreibe alle vier Wurffolgen auf.`, R`WW, WZ, ZW, ZZ sind gleich wahrscheinlich.`, R`Zu $X=1$ gehören zwei Wurffolgen.`], lsg: R`$P(X=0)=\frac14$, $P(X=1)=\frac24$, $P(X=2)=\frac14$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(X\ge1)$.`, a: 0.75, tol: 0.001, hilfen: [R`„Mindestens einmal Zahl“.`, R`Addiere $P(X=1)$ und $P(X=2)$ oder nutze das Gegenereignis.`, R`$1-0{,}25$`], lsg: R`$P(X\ge1)=1-P(X=0)=0{,}75$.` }
      ],
      analyse: R`<p>Eine Münze wird <span class="hl-given">zweimal</span> geworfen, <span class="hl-condition">$X$ zählt „Zahl“</span>. Gesucht ist die <span class="hl-target">Wahrscheinlichkeitsverteilung</span>.</p><p>„Gib an“: Ergebnisse ohne ausführliche Begründung.</p>`,
      ansatz: R`<p>Schreibe die vier gleich wahrscheinlichen Wurffolgen auf und zähle zu jeder die Anzahl von „Zahl“. Die Werte von $X$ sind nicht gleich wahrscheinlich, die Wurffolgen schon.</p>`,
      loesung: R`<p>Wurffolgen: WW ($X=0$), WZ und ZW ($X=1$), ZZ ($X=2$).</p><p><b>b)</b> $P(X=0)=0{,}25$, $P(X=1)=0{,}5$, $P(X=2)=0{,}25$. Kontrolle: Summe 1.</p><p><b>c)</b> $P(X\ge1)=0{,}5+0{,}25=0{,}75$.</p>`,
      antwortsatz: R`<p>Genau einmal „Zahl“ ist mit 50 % am wahrscheinlichsten. Mindestens einmal „Zahl“ fällt mit 75 % Wahrscheinlichkeit.</p>`,
      kontrolle: R`Addiere zur Kontrolle alle Wahrscheinlichkeiten: $0{,}25+0{,}5+0{,}25=1$.`
    },
    {
      id: "afb1-06", abschnitt: "8.6", title: "Losbude",
      aufgabenstellung: R`<p>In einer Lostrommel liegen 100 Lose: 1 Hauptgewinn zu 20 €, 9 Gewinne zu 5 €, 30 Trostpreise zu 1 € und 60 Nieten. Ein Los kostet 1,50 €. $X$ ist die Auszahlung in Euro für ein zufällig gezogenes Los.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> den Erwartungswert der Auszahlung.`, a: 0.95, tol: 0.005, einheit: "€",
          hilfen: [R`Jeder Betrag wird mit seiner Wahrscheinlichkeit multipliziert.`, R`Die Wahrscheinlichkeiten sind $0{,}01$; $0{,}09$; $0{,}30$; $0{,}60$.`, R`$20\cdot0{,}01+5\cdot0{,}09+1\cdot0{,}30+0\cdot0{,}60$`],
          fehler: [{ a: 6.5, msg: "Du hast die Beträge ungewichtet gemittelt. Multipliziere jeden Betrag mit seiner Wahrscheinlichkeit." }], lsg: R`$E(X)=0{,}20+0{,}45+0{,}30=0{,}95$ €.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> den Erwartungswert des Gewinns (Auszahlung minus Lospreis).`, a: -0.55, tol: 0.005, einheit: "€", hilfen: [R`Vom Erwartungswert der Auszahlung geht der Lospreis ab.`, R`$E(X)-1{,}50$`, R`$0{,}95-1{,}50$`],
          fehler: [{ a: 0.55, msg: "Achte auf das Vorzeichen: Die Auszahlung ist kleiner als der Lospreis, der Gewinn ist negativ." }], lsg: R`$0{,}95-1{,}50=-0{,}55$ €.` },
        { typ: "mc", frage: R`<b class="op">Entscheide</b>, ob das Spiel fair ist.`, o: ["fair, denn 40 % der Lose gewinnen etwas", "nicht fair, der Loskäufer verliert im Mittel 0,55 € pro Los", "nicht fair, der Loskäufer gewinnt im Mittel 0,95 € pro Los"], a: 1, why: R`Fair wäre das Spiel bei einem erwarteten Gewinn von 0, also bei einem Lospreis von 0,95 €.`, hilfen: [R`Wann heißt ein Spiel fair?`, R`Der Erwartungswert des Gewinns muss 0 sein.`, R`Hier ist er $-0{,}55$ €.`] },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Standardabweichung der Auszahlung (zwei Nachkommastellen).`, a: 2.38, tol: 0.01, einheit: "€",
          hilfen: [R`Erst die Varianz, dann die Wurzel.`, R`$V(X)=\sum(x_i-0{,}95)^2\cdot P(X=x_i)$`, R`$19{,}05^2\cdot0{,}01+4{,}05^2\cdot0{,}09+0{,}05^2\cdot0{,}3+0{,}95^2\cdot0{,}6$`],
          fehler: [{ a: 5.65, msg: "Das ist die Varianz. Ziehe noch die Wurzel." }], lsg: R`$V(X)\approx3{,}629+1{,}476+0{,}001+0{,}542=5{,}6475$, $\sigma=\sqrt{5{,}6475}\approx2{,}38$ €.` }
      ],
      analyse: R`<p>Unter <span class="hl-given">100 Losen</span> sind <span class="hl-given">1 × 20 €, 9 × 5 €, 30 × 1 €, 60 Nieten</span>, der <span class="hl-condition">Lospreis ist 1,50 €</span>. Gesucht: <span class="hl-target">Erwartungswert von Auszahlung und Gewinn, Standardabweichung</span>.</p><p>„Berechne“: Ansatz mit Summe, dann Zahlenwert.</p>`,
      ansatz: R`<p>Aus den Anzahlen werden Wahrscheinlichkeiten (durch 100 teilen). Der Erwartungswert ist die mit den Wahrscheinlichkeiten gewichtete Summe der Beträge. Für den Gewinn ziehst du den Lospreis ab. Die Standardabweichung berechnest du über die Varianz.</p>`,
      loesung: R`<p><b>a)</b> $E(X)=20\cdot0{,}01+5\cdot0{,}09+1\cdot0{,}3+0\cdot0{,}6=0{,}95$.</p><p><b>b)</b> $E(G)=0{,}95-1{,}50=-0{,}55$.</p><p><b>c)</b> Nicht fair, denn $E(G)\ne0$.</p><p><b>d)</b> $V(X)=19{,}05^2\cdot0{,}01+4{,}05^2\cdot0{,}09+0{,}05^2\cdot0{,}3+(-0{,}95)^2\cdot0{,}6=5{,}6475$, $\sigma\approx2{,}38$.</p>`,
      antwortsatz: R`<p>Im Mittel werden 0,95 € pro Los ausgezahlt. Wer Lose kauft, verliert im Mittel 0,55 € pro Los. Die Auszahlung streut mit etwa 2,38 € stark, weil es wenige hohe Gewinne gibt.</p>`
    },
    {
      id: "afb1-07", abschnitt: "8.7", title: "Schraubenkontrolle",
      aufgabenstellung: R`<p>Erfahrungsgemäß sind 5 % der Schrauben einer Produktion defekt. Zwei Schrauben werden zufällig entnommen. Die Entnahmen gelten als unabhängig. $X$ ist die Anzahl der defekten Schrauben.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(X=0)$.`, a: 0.9025, tol: 0.0005, hilfen: [R`Beide Schrauben müssen in Ordnung sein.`, R`Eine Schraube ist mit $0{,}95$ in Ordnung.`, R`$0{,}95\cdot0{,}95$`], lsg: R`$0{,}95^2=0{,}9025$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(X=1)$.`, a: 0.095, tol: 0.0005, hilfen: [R`Es gibt zwei Pfade.`, R`„defekt – in Ordnung“ und „in Ordnung – defekt“.`, R`$2\cdot0{,}05\cdot0{,}95$`], fehler: [{ a: 0.0475, msg: "Es gibt zwei Pfade mit genau einer defekten Schraube. Verdopple." }], lsg: R`$2\cdot0{,}05\cdot0{,}95=0{,}095$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit für mindestens eine defekte Schraube.`, a: 0.0975, tol: 0.0005, hilfen: [R`Nutze das Gegenereignis.`, R`Das Gegenereignis ist $X=0$.`, R`$1-0{,}9025$`], lsg: R`$1-0{,}9025=0{,}0975$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $E(X)$.`, a: 0.1, tol: 0.001, hilfen: [R`Du brauchst noch $P(X=2)$.`, R`$P(X=2)=0{,}05^2=0{,}0025$`, R`$1\cdot0{,}095+2\cdot0{,}0025$`], lsg: R`$E(X)=0\cdot0{,}9025+1\cdot0{,}095+2\cdot0{,}0025=0{,}1$.` }
      ],
      analyse: R`<p><span class="hl-given">5 % defekt</span>, <span class="hl-given">zwei Schrauben</span>, <span class="hl-condition">unabhängige Entnahmen</span>. Gesucht: <span class="hl-target">Verteilung und Erwartungswert von $X$</span>.</p><p>„Berechne“: Rechenweg mit Pfadregeln angeben.</p>`,
      ansatz: R`<p>Weil die Entnahmen unabhängig sind, steht in beiden Stufen des Baums dieselbe Wahrscheinlichkeit ($0{,}05$ und $0{,}95$). Du multiplizierst entlang der Pfade und addierst gleichartige Pfade.</p>`,
      loesung: R`<p><b>a)</b> $0{,}95^2=0{,}9025$.</p><p><b>b)</b> $2\cdot0{,}05\cdot0{,}95=0{,}095$.</p><p><b>c)</b> $1-0{,}9025=0{,}0975$.</p><p><b>d)</b> $P(X=2)=0{,}0025$, $E(X)=0{,}095+0{,}005=0{,}1$.</p>`,
      antwortsatz: R`<p>Mit etwa 90 % sind beide Schrauben in Ordnung, mit knapp 10 % ist mindestens eine defekt. Im Mittel sind 0,1 der zwei Schrauben defekt (5 % von 2).</p>`
    }
  ]);
})();
