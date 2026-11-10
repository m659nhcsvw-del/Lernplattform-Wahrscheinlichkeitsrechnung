/* Aufgaben AFB I, zweite Aufgabe je Abschnitt 8.1–8.7 */
(function () {
  const R = String.raw;
  AN_TASKS_ADD("afb1", [
    {
      id: "afb1-08", abschnitt: "8.1", title: "Skatkarten",
      aufgabenstellung: R`<p>Ein Skatspiel hat 32 Karten in vier Farben (Kreuz, Pik, Herz, Karo) mit je acht Karten: 7, 8, 9, 10, Bube, Dame, König, Ass. Die Karten werden gut gemischt.</p>`,
      teile: [
        { typ: "num", frage: R`Eine Karte wird gezogen. <b class="op">Berechne</b> die Wahrscheinlichkeit für eine Herzkarte.`, a: 0.25, tol: 0.001, hilfen: [R`Wie viele Herzkarten gibt es?`, R`8 von 32 Karten.`, R`$\frac{8}{32}$`], lsg: R`$\frac{8}{32}=0{,}25$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit für ein Bild (Bube, Dame oder König).`, a: 0.375, tol: 0.001, hilfen: [R`Drei Bilder je Farbe.`, R`$3\cdot4=12$ Bilder.`, R`$\frac{12}{32}$`], lsg: R`$\frac{12}{32}=0{,}375$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit für „Herz oder Ass“.`, a: 11 / 32, tol: 0.002, hilfen: [R`Additionssatz: Achte auf Karten, die beides sind.`, R`Das Herz-Ass darf nur einmal gezählt werden.`, R`$\frac{8+4-1}{32}$`], fehler: [{ a: 0.375, msg: "Du hast das Herz-Ass doppelt gezählt." }], lsg: R`$\frac{8}{32}+\frac{4}{32}-\frac{1}{32}=\frac{11}{32}\approx0{,}344$.` },
        { typ: "num", frage: R`Zwei Karten werden ohne Zurücklegen gezogen. <b class="op">Berechne</b> die Wahrscheinlichkeit für zwei Asse (vier Nachkommastellen).`, a: 12 / 992, tol: 0.0005, hilfen: [R`Zweistufiges Experiment ohne Zurücklegen.`, R`Nach dem ersten Ass sind noch 3 Asse unter 31 Karten.`, R`$\frac{4}{32}\cdot\frac{3}{31}$`], fehler: [{ a: 1 / 64, msg: "Du hast mit Zurücklegen gerechnet. Beim zweiten Zug sind es 3 Asse unter 31 Karten." }], lsg: R`$\frac{4}{32}\cdot\frac{3}{31}=\frac{12}{992}\approx0{,}0121$.` }
      ],
      analyse: R`<p>Ein Skatspiel mit <span class="hl-given">32 Karten, 4 Farben, 8 Werte</span>. Gesucht sind <span class="hl-target">Wahrscheinlichkeiten beim Ziehen</span>, zuletzt <span class="hl-condition">ohne Zurücklegen</span>.</p><p>„Berechne“: Bruch aufstellen, Ergebnis angeben.</p>`,
      ansatz: R`<p>Gut gemischte Karten ergeben ein Laplace-Experiment: günstige durch mögliche Karten. Bei „oder“ hilft der Additionssatz. Für zwei Karten nimmst du die Pfadmultiplikationsregel und passt den zweiten Bruch an.</p>`,
      loesung: R`<p><b>a)</b> $\frac{8}{32}=\frac14$.</p><p><b>b)</b> $\frac{12}{32}=\frac38$.</p><p><b>c)</b> $\frac{8+4-1}{32}=\frac{11}{32}$.</p><p><b>d)</b> $\frac{4}{32}\cdot\frac{3}{31}=\frac{3}{248}\approx0{,}0121$.</p>`,
      antwortsatz: R`<p>Eine Herzkarte kommt mit 25 %, ein Bild mit 37,5 %, „Herz oder Ass“ mit etwa 34,4 %. Zwei Asse hintereinander zieht man nur mit etwa 1,2 % Wahrscheinlichkeit.</p>`
    },
    {
      id: "afb1-09", abschnitt: "8.2", title: "Mit dem Bus zur Schule",
      aufgabenstellung: R`<p>40 % der Lernenden einer Schule kommen mit dem Bus ($B$). Von ihnen kommen 15 % morgens zu spät ($V$). Von allen anderen kommen 5 % zu spät.</p>`,
      teile: [
        { typ: "mc", frage: R`<b class="op">Gib an</b>, welche Wahrscheinlichkeit die Angabe „15 %“ ist.`, o: ["P(V)", "P(B ∩ V)", "P_B(V)"], a: 2, why: R`Die 15 % beziehen sich nur auf die Busfahrer. Es ist die Wahrscheinlichkeit für $V$ unter der Bedingung $B$.`, hilfen: [R`Auf welche Gruppe beziehen sich die 15 %?`, R`„Von ihnen“ meint die Busfahrer.`, R`Die Bedingung ist $B$.`] },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(B\cap V)$.`, a: 0.06, tol: 0.0005, hilfen: [R`Pfadmultiplikationsregel.`, R`$P(B)\cdot P_B(V)$`, R`$0{,}4\cdot0{,}15$`], lsg: R`$0{,}4\cdot0{,}15=0{,}06$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(V)$.`, a: 0.09, tol: 0.0005, hilfen: [R`Zwei Pfade führen zu „zu spät“.`, R`Der zweite Pfad: $0{,}6\cdot0{,}05$.`, R`$0{,}06+0{,}03$`], fehler: [{ a: 0.2, msg: "Die beiden Prozentsätze dürfen nicht einfach addiert werden. Gewichte sie mit 0,4 und 0,6." }], lsg: R`$0{,}06+0{,}6\cdot0{,}05=0{,}09$.` },
        { typ: "num", frage: R`Jemand kommt zu spät. <b class="op">Berechne</b> die Wahrscheinlichkeit, dass diese Person mit dem Bus kommt.`, a: 2 / 3, tol: 0.003, hilfen: [R`Gesucht ist $P_V(B)$.`, R`$\frac{P(B\cap V)}{P(V)}$`, R`$\frac{0{,}06}{0{,}09}$`], lsg: R`$\frac{0{,}06}{0{,}09}=\frac23\approx0{,}667$.` }
      ],
      analyse: R`<p><span class="hl-given">40 % Bus</span>, davon <span class="hl-given">15 % zu spät</span>, von den anderen <span class="hl-given">5 %</span>. Gesucht: <span class="hl-target">$P(B\cap V)$, $P(V)$, $P_V(B)$</span>. <span class="hl-condition">„Jemand kommt zu spät“</span> ist die Bedingung in d).</p>`,
      ansatz: R`<p>Zweistufiger Baum: erst Bus oder nicht, dann zu spät oder pünktlich. Die Prozentsätze 15 % und 5 % sind bedingte Wahrscheinlichkeiten an den Ästen der zweiten Stufe. Für d) teilst du den passenden Pfad durch die Summe aller Pfade zu $V$.</p>`,
      loesung: R`<p><b>b)</b> $0{,}4\cdot0{,}15=0{,}06$.</p><p><b>c)</b> $P(V)=0{,}06+0{,}6\cdot0{,}05=0{,}09$.</p><p><b>d)</b> $P_V(B)=\frac{0{,}06}{0{,}09}=\frac23$.</p>`,
      antwortsatz: R`<p>9 % aller Lernenden kommen zu spät. Zwei Drittel der Verspäteten sind Busfahrer, obwohl nur 40 % mit dem Bus kommen.</p>`
    },
    {
      id: "afb1-10", abschnitt: "8.3", title: "Kartenzahlung und Onlinekauf",
      aufgabenstellung: R`<p>Ein Geschäft hat 500 Kundinnen und Kunden befragt. 200 zahlen meistens mit Karte ($K$), 150 kaufen regelmäßig online ($O$), 60 tun beides.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(K\cap O)$.`, a: 0.12, tol: 0.0005, hilfen: [R`Anteil derer, die beides tun.`, R`60 von 500.`, R`$\frac{60}{500}$`], lsg: R`$\frac{60}{500}=0{,}12$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(K)\cdot P(O)$.`, a: 0.12, tol: 0.0005, hilfen: [R`Bestimme zuerst $P(K)$ und $P(O)$.`, R`$0{,}4$ und $0{,}3$`, R`$0{,}4\cdot0{,}3$`], lsg: R`$0{,}4\cdot0{,}3=0{,}12$.` },
        { typ: "mc", frage: R`<b class="op">Entscheide</b>, ob $K$ und $O$ stochastisch unabhängig sind.`, o: ["unabhängig", "abhängig", "nicht entscheidbar"], a: 0, why: R`$P(K\cap O)=0{,}12=P(K)\cdot P(O)$.`, hilfen: [R`Vergleiche die Ergebnisse aus a) und b).`, R`Beide sind $0{,}12$.`, R`Gleichheit bedeutet Unabhängigkeit.`] },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P_K(O)$.`, a: 0.3, tol: 0.001, hilfen: [R`Grundgesamtheit sind die 200 Kartenzahler.`, R`60 von ihnen kaufen online.`, R`$\frac{60}{200}$`], lsg: R`$\frac{60}{200}=0{,}3=P(O)$.` }
      ],
      analyse: R`<p><span class="hl-given">500 Befragte</span>, <span class="hl-given">200 Karte</span>, <span class="hl-given">150 online</span>, <span class="hl-given">60 beides</span>. Zu <span class="hl-target">entscheiden ist die Unabhängigkeit</span>.</p>`,
      ansatz: R`<p>Anzahlen durch 500 teilen, dann $P(K\cap O)$ mit dem Produkt $P(K)\cdot P(O)$ vergleichen. Die bedingte Wahrscheinlichkeit in d) bestätigt das Ergebnis auf dem zweiten Weg.</p>`,
      loesung: R`<p>$P(K)=0{,}4$, $P(O)=0{,}3$, $P(K\cap O)=0{,}12$. Produkt: $0{,}12$. Also unabhängig. $P_K(O)=\frac{60}{200}=0{,}3=P(O)$.</p>`,
      antwortsatz: R`<p>Kartenzahlung und Onlinekauf sind in dieser Befragung stochastisch unabhängig: Unter den Kartenzahlern kaufen 30 % online, genau wie unter allen Befragten.</p>`
    },
    {
      id: "afb1-11", abschnitt: "8.4", title: "Zufallsziffern auswerten",
      aufgabenstellung: R`<p>10 % der LED-Lampen eines Herstellers sind defekt. Eine Packung enthält 5 Lampen. Simuliert wird mit Zufallsziffern: Die Ziffer 0 bedeutet „defekt“, alle anderen „in Ordnung“. Jede Fünfergruppe steht für eine Packung.</p>
        <p class="mono">52731 80946 13375 60482 97315 24680 11359 73921 05567 38214<br>69953 42178 90326 15784 86431 27059 33618 74295 58162 41937</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Gib an</b>, wie viele der 20 Packungen mindestens eine defekte Lampe enthalten.`, a: 6, tol: 0.01, hilfen: [R`Suche die Gruppen, in denen eine 0 vorkommt.`, R`In der ersten Zeile sind es vier Gruppen.`, R`In der zweiten Zeile sind es zwei Gruppen.`], lsg: R`80946, 60482, 24680, 05567, 90326, 27059: sechs Packungen.` },
        { typ: "num", frage: R`<b class="op">Gib</b> den Schätzwert für die Wahrscheinlichkeit „mindestens eine defekte Lampe in der Packung“ <b class="op">an</b>.`, a: 0.3, tol: 0.001, hilfen: [R`Relative Häufigkeit.`, R`6 von 20.`, R`$\frac{6}{20}$`], lsg: R`$\frac{6}{20}=0{,}3$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> diese Wahrscheinlichkeit exakt (vier Nachkommastellen).`, a: 0.4095, tol: 0.0006, hilfen: [R`Gegenereignis: alle fünf Lampen in Ordnung.`, R`$0{,}9^5$`, R`$1-0{,}59049$`], lsg: R`$1-0{,}9^5=1-0{,}59049\approx0{,}4095$.` },
        { typ: "mc", frage: R`<b class="op">Entscheide</b>, wie der Unterschied zwischen $0{,}3$ und $0{,}41$ zu erklären ist.`, o: ["Die Zuordnung der Ziffern ist falsch.", "20 Versuche sind sehr wenig, die übliche Schwankung beträgt hier etwa 0,22.", "Die Rechnung gilt nur für Würfel."], a: 1, why: R`$\frac{1}{\sqrt{20}}\approx0{,}22$. Eine Abweichung von $0{,}11$ ist bei so wenigen Versuchen normal.`, hilfen: [R`Wie groß ist die übliche Schwankung bei $n$ Versuchen?`, R`$\frac{1}{\sqrt{20}}$`, R`Etwa $0{,}22$.`] }
      ],
      analyse: R`<p><span class="hl-given">10 % defekt</span>, <span class="hl-given">5 Lampen je Packung</span>, <span class="hl-condition">Ziffer 0 = defekt</span>. Gesucht: <span class="hl-target">Schätzwert aus der Ziffernfolge und exakter Wert</span>.</p>`,
      ansatz: R`<p>Eine von zehn Ziffern steht für „defekt“, das passt zu 10 %. Du zählst die Fünfergruppen mit mindestens einer 0 und bildest die relative Häufigkeit. Den exakten Wert liefert das Gegenereignis.</p>`,
      loesung: R`<p><b>a)</b> 6 Gruppen enthalten eine 0.</p><p><b>b)</b> $\frac{6}{20}=0{,}3$.</p><p><b>c)</b> $1-0{,}9^5\approx0{,}4095$.</p><p><b>d)</b> Schwankung bei 20 Versuchen etwa $0{,}22$, die Abweichung ist normal.</p>`,
      antwortsatz: R`<p>Die Simulation schätzt 0,3, exakt sind es etwa 0,41. Mit nur 20 Packungen ist der Schätzwert noch sehr ungenau.</p>`
    },
    {
      id: "afb1-12", abschnitt: "8.5", title: "Zahlenrad",
      aufgabenstellung: R`<p>Ein Glücksrad hat zehn gleich große Felder: viermal die Zahl 1, dreimal die 2, zweimal die 5 und einmal die 10. $X$ ist die gedrehte Zahl.</p><div data-an="w-rad" data-sektoren="1:2;2:1;5:1;1:2;2:2;10:1;5:1" data-einheit="" data-titel="3D-Simulation: Zahlenrad"></div>`,
      teile: [
        { typ: "zahlen", frage: R`<b class="op">Gib</b> die Wahrscheinlichkeitsverteilung von $X$ <b class="op">an</b>.`, felder: [{ l: "P(X=1) =", a: 0.4 }, { l: "P(X=2) =", a: 0.3 }, { l: "P(X=5) =", a: 0.2 }, { l: "P(X=10) =", a: 0.1 }], tol: 0.001, hilfen: [R`Zähle die Felder je Zahl.`, R`Teile durch 10.`, R`Die Summe muss 1 sein.`], lsg: R`$0{,}4;\;0{,}3;\;0{,}2;\;0{,}1$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(X\ge5)$.`, a: 0.3, tol: 0.001, hilfen: [R`„Mindestens 5“: die Werte 5 und 10.`, R`$0{,}2+0{,}1$`, R`Addiere.`], lsg: R`$0{,}2+0{,}1=0{,}3$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(X\le2)$.`, a: 0.7, tol: 0.001, hilfen: [R`„Höchstens 2“: die Werte 1 und 2.`, R`$0{,}4+0{,}3$`, R`Oder $1-P(X\ge5)$.`], lsg: R`$0{,}4+0{,}3=0{,}7$.` }
      ],
      analyse: R`<p><span class="hl-given">Zehn gleich große Felder: 4×1, 3×2, 2×5, 1×10</span>, <span class="hl-condition">$X$ = gedrehte Zahl</span>. Gesucht: <span class="hl-target">Verteilung und Bereichswahrscheinlichkeiten</span>.</p>`,
      ansatz: R`<p>Gleich wahrscheinlich sind die zehn Felder, nicht die vier Zahlen. Du zählst die Felder je Zahl. Bereichswahrscheinlichkeiten erhältst du durch Addieren.</p>`,
      loesung: R`<p>Verteilung: $P(X=1)=0{,}4$; $P(X=2)=0{,}3$; $P(X=5)=0{,}2$; $P(X=10)=0{,}1$. $P(X\ge5)=0{,}3$, $P(X\le2)=0{,}7$.</p>`,
      antwortsatz: R`<p>Mit 70 % erscheint eine kleine Zahl (1 oder 2), mit 30 % eine 5 oder 10.</p>`,
      kontrolle: R`Drehe das Rad 1000-mal und vergleiche die blauen Säulen mit deiner Tabelle.`
    },
    {
      id: "afb1-13", abschnitt: "8.6", title: "Zahlenrad: Erwartungswert",
      aufgabenstellung: R`<p>Das Zahlenrad aus der vorigen Aufgabe hat die Verteilung</p><div class="nv-table-wrap"><table class="nv-table"><tr><th>$k$</th><td>1</td><td>2</td><td>5</td><td>10</td></tr><tr><th>$P(X=k)$</th><td>$0{,}4$</td><td>$0{,}3$</td><td>$0{,}2$</td><td>$0{,}1$</td></tr></table></div><p>Die gedrehte Zahl wird in Euro ausgezahlt.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> den Erwartungswert $\mu$.`, a: 3, tol: 0.005, einheit: "€", hilfen: [R`Wert mal Wahrscheinlichkeit, dann addieren.`, R`$1\cdot0{,}4+2\cdot0{,}3+5\cdot0{,}2+10\cdot0{,}1$`, R`$0{,}4+0{,}6+1+1$`], fehler: [{ a: 4.5, msg: "Das ist der ungewichtete Mittelwert der vier Zahlen. Gewichte mit den Wahrscheinlichkeiten." }], lsg: R`$\mu=0{,}4+0{,}6+1+1=3$ €.` },
        { typ: "num", frage: R`<b class="op">Gib</b> den Einsatz <b class="op">an</b>, bei dem das Spiel fair ist.`, a: 3, tol: 0.005, einheit: "€", hilfen: [R`Fair: Einsatz = erwartete Auszahlung.`, R`Das ist $\mu$.`, R`3 €`], lsg: R`3 €.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Varianz.`, a: 7.6, tol: 0.01, hilfen: [R`Abweichungen von $\mu=3$: $-2;-1;2;7$.`, R`Quadrate: $4;1;4;49$.`, R`$4\cdot0{,}4+1\cdot0{,}3+4\cdot0{,}2+49\cdot0{,}1$`], lsg: R`$1{,}6+0{,}3+0{,}8+4{,}9=7{,}6$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Standardabweichung (zwei Nachkommastellen).`, a: 2.76, tol: 0.01, einheit: "€", hilfen: [R`Wurzel aus der Varianz.`, R`$\sqrt{7{,}6}$`, R`Etwa $2{,}76$.`], lsg: R`$\sigma=\sqrt{7{,}6}\approx2{,}76$ €.` }
      ],
      analyse: R`<p>Gegeben ist die <span class="hl-given">Verteilung</span>, die Zahl wird <span class="hl-condition">in Euro ausgezahlt</span>. Gesucht: <span class="hl-target">$\mu$, fairer Einsatz, Varianz, $\sigma$</span>.</p>`,
      ansatz: R`<p>Erwartungswert und Varianz nach Definition, am besten in einer Tabelle mit den Zeilen $x_i$, $P$, $x_i-\mu$, $(x_i-\mu)^2$.</p>`,
      loesung: R`<p>$\mu=3$. Varianz: $4\cdot0{,}4+1\cdot0{,}3+4\cdot0{,}2+49\cdot0{,}1=7{,}6$. $\sigma\approx2{,}76$.</p>`,
      antwortsatz: R`<p>Das Rad zahlt im Mittel 3 € aus, bei 3 € Einsatz ist das Spiel fair. Die Auszahlung streut mit etwa 2,76 € deutlich, vor allem wegen der seltenen 10.</p>`
    },
    {
      id: "afb1-14", abschnitt: "8.7", title: "Hilfsmittelfrei: Ziehen mit Zurücklegen",
      aufgabenstellung: R`<p>In einer Urne liegen 3 rote Kugeln und 1 blaue Kugel. Es wird zweimal <b>mit</b> Zurücklegen gezogen. $X$ ist die Anzahl der blauen Kugeln.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit für zwei rote Kugeln (Bruch erlaubt).`, a: 9 / 16, tol: 0.002, hilfen: [R`Mit Zurücklegen bleiben die Wahrscheinlichkeiten gleich.`, R`$\frac34$ in beiden Stufen.`, R`$\frac34\cdot\frac34$`], lsg: R`$\frac{9}{16}$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P(X=1)$.`, a: 6 / 16, tol: 0.002, hilfen: [R`Zwei Pfade: rot – blau und blau – rot.`, R`Jeder Pfad: $\frac34\cdot\frac14$.`, R`$2\cdot\frac{3}{16}$`], fehler: [{ a: 3 / 16, msg: "Es gibt zwei Reihenfolgen." }], lsg: R`$2\cdot\frac{3}{16}=\frac{6}{16}=\frac38$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $E(X)$.`, a: 0.5, tol: 0.002, hilfen: [R`$P(X=2)=\frac{1}{16}$`, R`$1\cdot\frac{6}{16}+2\cdot\frac{1}{16}$`, R`$\frac{8}{16}$`], lsg: R`$\frac{6}{16}+\frac{2}{16}=\frac12$.` },
        { typ: "mc", frage: R`<b class="op">Entscheide</b>, ob „1. Kugel blau“ und „2. Kugel blau“ unabhängig sind.`, o: ["ja, weil zurückgelegt wird", "nein, weil es nur eine blaue Kugel gibt", "nein, weil beide dieselbe Wahrscheinlichkeit haben"], a: 0, why: R`Durch das Zurücklegen ist die Urne beim zweiten Zug wieder im Ausgangszustand: $P_{\text{1. blau}}(\text{2. blau})=\frac14=P(\text{2. blau})$.`, hilfen: [R`Ändert der erste Zug die Urne für den zweiten?`, R`Die Kugel wird zurückgelegt.`, R`Die Wahrscheinlichkeiten der zweiten Stufe sind in beiden Teilbäumen gleich.`] }
      ],
      analyse: R`<p><span class="hl-given">3 rote, 1 blaue Kugel</span>, <span class="hl-condition">zweimal mit Zurücklegen</span>, <span class="hl-condition">$X$ = Anzahl blau</span>. Gesucht: <span class="hl-target">Pfadwahrscheinlichkeiten und $E(X)$</span>, ohne Hilfsmittel.</p>`,
      ansatz: R`<p>Mit Zurücklegen steht in beiden Stufen $\frac34$ und $\frac14$. Rechne durchgehend mit Sechzehnteln, dann brauchst du keinen Rechner.</p>`,
      loesung: R`<p>$P(X=0)=\frac{9}{16}$, $P(X=1)=\frac{6}{16}$, $P(X=2)=\frac{1}{16}$. $E(X)=\frac{6+2}{16}=\frac12$.</p>`,
      antwortsatz: R`<p>Zwei rote Kugeln zieht man mit $\frac{9}{16}$. Im Mittel ist bei zwei Zügen eine halbe blaue Kugel dabei (ein Viertel von 2).</p>`
    }
  ]);
})();
