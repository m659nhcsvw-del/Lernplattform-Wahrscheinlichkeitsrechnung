/* Aufgaben AFB II, Abschnitte 8.1–8.7 (je eine Aufgabe) */
(function () {
  const R = String.raw;
  AN_TASKS_ADD("afb2", [
    {
      id: "afb2-01", abschnitt: "8.1", title: "Gummibärchen aus der Tüte",
      aufgabenstellung: R`<p>In einer Tüte sind 10 Gummibärchen: 5 rote, 3 grüne und 2 gelbe. Lea nimmt ohne hinzusehen nacheinander zwei Gummibärchen heraus und isst sie.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Bestimme</b> die Wahrscheinlichkeit, dass beide rot sind.`, a: 20 / 90, tol: 0.002,
          hilfen: [R`Wird zurückgelegt oder nicht?`, R`Nach dem ersten roten Gummibärchen sind noch 4 rote unter 9.`, R`$\frac{5}{10}\cdot\frac49$`],
          fehler: [{ a: 0.25, msg: "Du hast mit Zurücklegen gerechnet. Lea isst das erste Gummibärchen, beim zweiten Zug sind es nur noch 9." }], lsg: R`$\frac{5}{10}\cdot\frac{4}{9}=\frac{20}{90}\approx0{,}222$.` },
        { typ: "num", frage: R`<b class="op">Bestimme</b> die Wahrscheinlichkeit, dass beide dieselbe Farbe haben.`, a: 28 / 90, tol: 0.002,
          hilfen: [R`Welche Pfade gehören dazu?`, R`rot – rot, grün – grün und gelb – gelb.`, R`$\frac{5}{10}\cdot\frac49+\frac{3}{10}\cdot\frac29+\frac{2}{10}\cdot\frac19$`], lsg: R`$\frac{20+6+2}{90}=\frac{28}{90}\approx0{,}311$.` },
        { typ: "num", frage: R`<b class="op">Bestimme</b> die Wahrscheinlichkeit, dass mindestens ein rotes dabei ist.`, a: 70 / 90, tol: 0.002,
          hilfen: [R`Das Gegenereignis ist kürzer.`, R`„Kein rotes“: beide stammen aus den 5 nicht roten.`, R`$1-\frac{5}{10}\cdot\frac49$`], lsg: R`$1-\frac{5}{10}\cdot\frac49=1-\frac{20}{90}=\frac{70}{90}\approx0{,}778$.` },
        { typ: "mc", frage: R`<b class="op">Begründe</b>, warum bei c) das Gegenereignis sinnvoll ist.`, o: ["Weil das Gegenereignis immer die kleinere Wahrscheinlichkeit hat", "Weil „mindestens ein rotes“ aus fünf Pfaden besteht, „kein rotes“ aber als ein Pfad „nicht rot – nicht rot“ berechnet werden kann", "Weil man bei „mindestens“ nie direkt rechnen darf"], a: 1,
          why: R`Direkt rechnen ist erlaubt, aber aufwendiger. Fasst man grün und gelb zu „nicht rot“ zusammen, besteht das Gegenereignis aus einem einzigen Pfad.`, hilfen: [R`Zähle die Pfade, die zu „mindestens ein rotes“ gehören.`, R`Fasse grün und gelb zu „nicht rot“ zusammen.`, R`Dann hat das Gegenereignis nur einen Pfad.`] }
      ],
      analyse: R`<p>In der Tüte sind <span class="hl-given">5 rote, 3 grüne, 2 gelbe</span> Gummibärchen. Lea nimmt <span class="hl-condition">zwei nacheinander und isst sie</span> (ohne Zurücklegen). Gesucht sind <span class="hl-target">drei Wahrscheinlichkeiten</span>.</p><p>„Bestimme“ lässt den Weg offen (Baum, Rechnung), er muss aber erkennbar sein. „Begründe“ verlangt ein Argument.</p>`,
      ansatz: R`<p>Zweistufiges Experiment ohne Zurücklegen: Baumdiagramm mit drei Ästen je Stufe. In der zweiten Stufe ist der Nenner 9, und der Zähler der schon gezogenen Farbe ist um 1 kleiner. Für c) fasst du grün und gelb zu „nicht rot“ zusammen.</p>`,
      loesung: R`<p><b>a)</b> $\frac{5}{10}\cdot\frac49=\frac{20}{90}=\frac29$.</p><p><b>b)</b> $\frac{20}{90}+\frac{3}{10}\cdot\frac29+\frac{2}{10}\cdot\frac19=\frac{20+6+2}{90}=\frac{28}{90}=\frac{14}{45}$.</p><p><b>c)</b> $P(\text{kein rotes})=\frac{5}{10}\cdot\frac49=\frac{20}{90}$, also $P=\frac{70}{90}=\frac79$.</p><div class="nv-fehler"><p><b>Typischer Fehler:</b> Dass $P(\text{beide rot})$ und $P(\text{kein rotes})$ gleich sind, liegt nur daran, dass es genau 5 rote und 5 nicht rote gibt.</p></div>`,
      antwortsatz: R`<p>Beide Gummibärchen sind mit etwa 22 % rot und mit etwa 31 % gleichfarbig. Mit etwa 78 % ist mindestens ein rotes dabei.</p>`
    },
    {
      id: "afb2-02", abschnitt: "8.2", title: "Spamfilter",
      aufgabenstellung: R`<p>30 % der eingehenden E-Mails eines Postfachs sind Spam ($S$). Der Filter markiert ($M$) 96 % der Spam-Mails. Von den erwünschten Mails markiert er fälschlich 5 %.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Ermittle</b> die Wahrscheinlichkeit, dass eine eingehende Mail markiert wird.`, a: 0.323, tol: 0.001,
          hilfen: [R`Zu „markiert“ führen zwei Pfade.`, R`Spam und markiert, kein Spam und markiert.`, R`$0{,}3\cdot0{,}96+0{,}7\cdot0{,}05$`], fehler: [{ a: 0.288, msg: "Das ist nur der Pfad „Spam und markiert“. Auch erwünschte Mails werden manchmal markiert." }], lsg: R`$P(M)=0{,}288+0{,}035=0{,}323$.` },
        { typ: "num", frage: R`Eine Mail wurde markiert. <b class="op">Ermittle</b> die Wahrscheinlichkeit, dass sie wirklich Spam ist.`, a: 0.288 / 0.323, tol: 0.002,
          hilfen: [R`Gesucht ist $P_M(S)$, die Bedingung ist „markiert“.`, R`$P_M(S)=\frac{P(S\cap M)}{P(M)}$`, R`$\frac{0{,}288}{0{,}323}$`], fehler: [{ a: 0.96, msg: "0,96 ist P_S(M). Gesucht ist die umgekehrte Bedingung P_M(S)." }], lsg: R`$P_M(S)=\frac{0{,}288}{0{,}323}\approx0{,}892$.` },
        { typ: "num", frage: R`Eine Mail wurde <b>nicht</b> markiert. <b class="op">Ermittle</b> die Wahrscheinlichkeit, dass sie trotzdem Spam ist (vier Nachkommastellen).`, a: 0.012 / 0.677, tol: 0.0006,
          hilfen: [R`Jetzt ist die Bedingung „nicht markiert“.`, R`$P(S\cap\overline{M})=0{,}3\cdot0{,}04$ und $P(\overline{M})=1-0{,}323$.`, R`$\frac{0{,}012}{0{,}677}$`], lsg: R`$P_{\overline{M}}(S)=\frac{0{,}012}{0{,}677}\approx0{,}0177$.` },
        { typ: "mc", frage: R`<b class="op">Interpretiere</b> das Ergebnis aus b).`, o: ["Der Filter erkennt etwa 89 % aller Spam-Mails.", "Etwa 89 % der markierten Mails sind Spam, rund jede neunte markierte Mail ist erwünscht.", "Etwa 89 % aller Mails werden markiert."], a: 1,
          why: R`Die Grundgesamtheit sind die markierten Mails. Rund 11 % davon sind erwünschte Mails. Es lohnt sich also, den Spam-Ordner gelegentlich durchzusehen.`, hilfen: [R`Welche Gruppe ist bei $P_M(S)$ die Grundgesamtheit?`, R`Die markierten Mails.`, R`$1-0{,}892\approx0{,}108$ der markierten Mails sind kein Spam.`] }
      ],
      analyse: R`<p><span class="hl-given">30 % Spam</span>, der Filter markiert <span class="hl-given">96 % der Spam-Mails</span> und <span class="hl-given">5 % der erwünschten Mails</span>. Gesucht: <span class="hl-target">$P(M)$, $P_M(S)$, $P_{\overline{M}}(S)$</span>. Die Formulierungen <span class="hl-condition">„wurde markiert“ / „wurde nicht markiert“</span> sind Bedingungen.</p><p>„Ermittle“: Weg frei, aber dokumentiert. „Interpretiere“: Satz im Sachzusammenhang.</p>`,
      ansatz: R`<p>Gegeben sind $P(S)=0{,}3$, $P_S(M)=0{,}96$ und $P_{\overline{S}}(M)=0{,}05$. Gefragt sind Wahrscheinlichkeiten mit der umgekehrten Bedingung. Also: Baum aufstellen, Pfade berechnen, passende Pfade addieren, teilen. Eine Vierfeldertafel mit 1000 Mails führt zum selben Ergebnis (288, 12, 35, 665).</p>`,
      loesung: R`<p><b>a)</b> $P(M)=0{,}3\cdot0{,}96+0{,}7\cdot0{,}05=0{,}288+0{,}035=0{,}323$.</p><p><b>b)</b> $P_M(S)=\frac{0{,}288}{0{,}323}\approx0{,}892$.</p><p><b>c)</b> $P(\overline{M})=0{,}677$, $P(S\cap\overline{M})=0{,}3\cdot0{,}04=0{,}012$, $P_{\overline{M}}(S)=\frac{0{,}012}{0{,}677}\approx0{,}018$.</p>`,
      antwortsatz: R`<p>Etwa 32 % aller Mails werden markiert. Eine markierte Mail ist mit etwa 89 % Spam. Eine nicht markierte Mail ist nur mit etwa 1,8 % Spam.</p>`
    },
    {
      id: "afb2-03", abschnitt: "8.3", title: "Musik und Sport",
      aufgabenstellung: R`<p>Von 400 befragten Jugendlichen spielen 160 ein Instrument ($I$), 240 sind in einem Sportverein ($S$), 96 tun beides.</p>`,
      teile: [
        { typ: "mc", frage: R`<b class="op">Untersuche</b>, ob $I$ und $S$ stochastisch unabhängig sind.`, o: ["unabhängig, denn 0,4 · 0,6 = 0,24 = P(I∩S)", "abhängig, denn 0,4 ≠ 0,6", "abhängig, denn 96 Jugendliche tun beides"], a: 0,
          why: R`$P(I)=0{,}4$, $P(S)=0{,}6$, $P(I\cap S)=\frac{96}{400}=0{,}24$. Das Produkt ist ebenfalls $0{,}24$.`, hilfen: [R`Berechne $P(I)$, $P(S)$ und $P(I\cap S)$.`, R`$0{,}4$; $0{,}6$; $0{,}24$`, R`Vergleiche $0{,}4\cdot0{,}6$ mit $0{,}24$.`] },
        { typ: "num", frage: R`<b class="op">Ermittle</b>, wie viele Jugendliche weder ein Instrument spielen noch im Sportverein sind.`, a: 96, tol: 0.5,
          hilfen: [R`Fülle eine Vierfeldertafel aus.`, R`Kein Instrument: 240. Davon im Sportverein: $240-96=144$.`, R`$240-144$`], fehler: [{ a: 0, msg: "160 + 240 = 400 zählt die 96 doppelt. Mindestens eines tun 160 + 240 − 96 = 304." }], lsg: R`$400-(160+240-96)=400-304=96$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $P_S(I)$.`, a: 0.4, tol: 0.001, hilfen: [R`Die Bedingung ist „im Sportverein“.`, R`Teile durch 240.`, R`$\frac{96}{240}$`], lsg: R`$P_S(I)=\frac{96}{240}=0{,}4=P(I)$.` },
        { typ: "mc", frage: R`Angenommen, 120 statt 96 Jugendliche täten beides (bei sonst gleichen Zahlen). <b class="op">Beurteile</b> die Aussage „Dann wären $I$ und $S$ abhängig“.`, o: ["Richtig: P_S(I) = 0,5 wäre größer als P(I) = 0,4. Jugendliche im Sportverein spielten häufiger ein Instrument.", "Falsch: Die Randsummen bleiben gleich, also bleibt alles unabhängig.", "Richtig: Sport wäre dann die Ursache für das Musizieren."], a: 0,
          why: R`$\frac{120}{240}=0{,}5\ne0{,}4$. Die Ereignisse wären abhängig. Über Ursachen sagt die Rechnung nichts.`, hilfen: [R`Berechne $P_S(I)$ mit der neuen Zahl.`, R`$\frac{120}{240}=0{,}5$`, R`Vergleiche mit $P(I)=0{,}4$ und überlege, ob Abhängigkeit eine Ursache beweist.`] }
      ],
      analyse: R`<p><span class="hl-given">400 Jugendliche</span>, <span class="hl-given">160 Instrument</span>, <span class="hl-given">240 Sportverein</span>, <span class="hl-given">96 beides</span>. Zu <span class="hl-target">untersuchen ist die Unabhängigkeit</span>.</p><p>„Untersuche“: rechnen, vergleichen, Schluss ziehen. „Beurteile“: Aussage mit Rechnung prüfen und Urteil formulieren.</p>`,
      ansatz: R`<p>Aus den Anzahlen werden Wahrscheinlichkeiten. Dann vergleichst du $P(I\cap S)$ mit $P(I)\cdot P(S)$. Eine Vierfeldertafel liefert alle weiteren Anzahlen.</p>`,
      loesung: R`<div class="nv-table-wrap"><table class="nv-table"><tr><th></th><th>$S$</th><th>$\overline{S}$</th><th>Summe</th></tr><tr><th>$I$</th><td>96</td><td>64</td><td>160</td></tr><tr><th>$\overline{I}$</th><td>144</td><td>96</td><td>240</td></tr><tr><th>Summe</th><td>240</td><td>160</td><td>400</td></tr></table></div><p><b>a)</b> $0{,}4\cdot0{,}6=0{,}24=P(I\cap S)$: unabhängig.</p><p><b>b)</b> 96 Jugendliche.</p><p><b>c)</b> $P_S(I)=\frac{96}{240}=0{,}4$.</p><p><b>d)</b> Mit 120: $P_S(I)=0{,}5\ne0{,}4$, also abhängig.</p>`,
      antwortsatz: R`<p>In dieser Umfrage sind Instrument und Sportverein stochastisch unabhängig: Unter den Sportlern spielen genauso viele ein Instrument (40 %) wie insgesamt. 96 Jugendliche tun keines von beiden.</p>`
    },
    {
      id: "afb2-04", abschnitt: "8.4", title: "Sammelfiguren",
      aufgabenstellung: R`<p>In jeder Müslipackung steckt eine von sechs verschiedenen Sammelfiguren, jede mit gleicher Wahrscheinlichkeit. Mit der Simulation kannst du untersuchen, wie viele Packungen man braucht, bis man alle sechs Figuren hat.</p><div data-an="w-sim-sammeln"></div>`,
      teile: [
        { typ: "num", frage: R`Führe mindestens 1000 Versuche durch. <b class="op">Ermittle</b> einen Schätzwert für die mittlere Anzahl der benötigten Packungen.`, a: 14.7, tol: 0.5,
          hilfen: [R`Ein Würfelwurf ersetzt eine Packung.`, R`Tippe im Baustein auf „1000×“.`, R`Lies den „Mittelwert der Wurfanzahl“ unter den Diagrammen ab.`], lsg: R`Der Mittelwert liegt bei etwa $14{,}7$. (Exakt: $6\cdot\left(1+\frac12+\frac13+\frac14+\frac15+\frac16\right)=14{,}7$.)` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit, dass schon die ersten sechs Packungen sechs verschiedene Figuren enthalten (vier Nachkommastellen).`, a: 720 / 46656, tol: 0.0005,
          hilfen: [R`Die zweite Figur muss sich von der ersten unterscheiden, die dritte von den ersten beiden …`, R`$\frac66\cdot\frac56\cdot\frac46\cdot\dots$`, R`$\frac{6\cdot5\cdot4\cdot3\cdot2\cdot1}{6^6}$`], lsg: R`$\frac{720}{46656}\approx0{,}0154$.` },
        { typ: "mc", frage: R`<b class="op">Erläutere</b>, warum der Mittelwert so viel größer als 6 ist.`, o: ["Weil der Würfel nicht fair ist", "Weil neue Figuren immer seltener werden: Fehlt nur noch eine, braucht man im Mittel allein dafür 6 Packungen", "Weil die Simulation zu wenige Versuche hatte"], a: 1,
          why: R`Die erste Packung bringt sicher eine neue Figur. Hat man schon fünf, ist nur jede sechste Packung ein Treffer.`, hilfen: [R`Wie wahrscheinlich ist eine neue Figur, wenn schon fünf vorhanden sind?`, R`$\frac16$`, R`Bei Wahrscheinlichkeit $\frac16$ wartet man im Mittel 6 Versuche.`] },
        { typ: "selbst", frage: R`Der Hersteller erhöht auf zehn verschiedene Figuren. <b class="op">Beschreibe</b>, wie du die Simulation mit Zufallsziffern anpassen würdest.`,
          erwartung: R`<ul><li>Modell: Eine Zufallsziffer von 0 bis 9 steht für eine Packung, jede Ziffer für eine Figur.</li><li>Ein Versuch: Ziffern erzeugen, bis jede der zehn Ziffern mindestens einmal vorkam. Die Anzahl der Ziffern notieren.</li><li>Sehr oft wiederholen (zum Beispiel 1000-mal) und den Mittelwert der Anzahlen bilden.</li><li>Genauigkeit: Mehr Versuche ergeben einen stabileren Mittelwert. (Der Erwartungswert ist etwa 29,3.)</li></ul>`, hilfen: [R`Welches Zufallsgerät hat zehn gleich wahrscheinliche Ausgänge?`, R`Lege fest, wann ein Versuch endet.`, R`Wiederhole oft und bilde den Mittelwert.`] }
      ],
      analyse: R`<p><span class="hl-given">Sechs Figuren, gleich wahrscheinlich</span>, <span class="hl-condition">eine je Packung</span>. Gesucht ist die <span class="hl-target">mittlere Anzahl der Packungen bis zur vollständigen Sammlung</span>.</p><p>„Ermittle“: hier durch Simulation. „Erläutere“ und „beschreibe“: zusammenhängende Sätze mit Fachbegriffen.</p>`,
      ansatz: R`<p>Die exakte Berechnung der mittleren Wartezeit ist mit den Mitteln des Kapitels schwierig. Deshalb wird simuliert: Würfel als Modell, ein Versuch endet, wenn alle sechs Augenzahlen gefallen sind. Die Einzelfrage b) lässt sich dagegen mit der Pfadregel berechnen.</p>`,
      loesung: R`<p><b>a)</b> Simulation: Mittelwert etwa $14{,}7$.</p><p><b>b)</b> $\frac66\cdot\frac56\cdot\frac46\cdot\frac36\cdot\frac26\cdot\frac16=\frac{720}{46656}\approx0{,}0154$.</p><p><b>c)</b> Die Wartezeit auf die nächste neue Figur wächst: im Mittel $\frac66, \frac65, \frac64, \frac63, \frac62, \frac61$ Packungen, zusammen $14{,}7$.</p>`,
      antwortsatz: R`<p>Im Mittel braucht man etwa 14,7 Packungen für alle sechs Figuren. Nur in etwa 1,5 % der Fälle reichen sechs Packungen.</p>`
    },
    {
      id: "afb2-05", abschnitt: "8.5", title: "Augendifferenz",
      aufgabenstellung: R`<p>Zwei Würfel werden geworfen. Die Zufallsgröße $X$ ist die Differenz „größere minus kleinere Augenzahl“ (bei einem Pasch ist $X=0$).</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Ermittle</b> $P(X=1)$.`, a: 10 / 36, tol: 0.002, hilfen: [R`Zähle die Paare mit Differenz 1.`, R`$(1|2),(2|3),(3|4),(4|5),(5|6)$ und jeweils umgekehrt.`, R`$\frac{10}{36}$`], fehler: [{ a: 5 / 36, msg: "Jedes Paar gibt es in zwei Reihenfolgen, zum Beispiel (1|2) und (2|1)." }], lsg: R`10 Paare, also $\frac{10}{36}\approx0{,}278$.` },
        { typ: "num", frage: R`<b class="op">Ermittle</b> $P(X\ge3)$.`, a: 12 / 36, tol: 0.002, hilfen: [R`Du brauchst $P(X=3)$, $P(X=4)$ und $P(X=5)$.`, R`Es gibt 6, 4 und 2 passende Paare.`, R`$\frac{6+4+2}{36}$`], lsg: R`$\frac{12}{36}=\frac13$.` },
        { typ: "mc", frage: R`<b class="op">Gib</b> den wahrscheinlichsten Wert von $X$ <b class="op">an</b>.`, o: ["0", "1", "2,5"], a: 1, why: R`Die Anzahlen der Paare sind 6; 10; 8; 6; 4; 2 für $X=0$ bis $5$. Am größten ist 10 bei $X=1$.`, hilfen: [R`Stelle die ganze Verteilung auf.`, R`$X=0$: 6 Paare (Pasch).`, R`$X=1$: 10 Paare.`] },
        { typ: "num", frage: R`<b class="op">Berechne</b> den Erwartungswert von $X$ (zwei Nachkommastellen).`, a: 70 / 36, tol: 0.01, hilfen: [R`Gewichte jeden Wert mit seiner Wahrscheinlichkeit.`, R`$\frac{0\cdot6+1\cdot10+2\cdot8+3\cdot6+4\cdot4+5\cdot2}{36}$`, R`$\frac{70}{36}$`], lsg: R`$E(X)=\frac{10+16+18+16+10}{36}=\frac{70}{36}\approx1{,}94$.` }
      ],
      analyse: R`<p><span class="hl-given">Zwei Würfel</span>, <span class="hl-condition">$X$ = größere minus kleinere Augenzahl</span>. Gesucht: <span class="hl-target">einzelne Wahrscheinlichkeiten, wahrscheinlichster Wert, Erwartungswert</span>.</p><p>„Ermittle“: Zählen in einer Tabelle ist ein zulässiger Weg.</p>`,
      ansatz: R`<p>Grundlage sind die 36 gleich wahrscheinlichen Paare. Am sichersten zählst du in einer 6×6-Tabelle, in die du zu jedem Paar die Differenz einträgst. Die Werte von $X$ selbst sind nicht gleich wahrscheinlich.</p>`,
      loesung: R`<div class="nv-table-wrap"><table class="nv-table"><tr><th>$k$</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr><th>$P(X=k)$</th><td>$\frac{6}{36}$</td><td>$\frac{10}{36}$</td><td>$\frac{8}{36}$</td><td>$\frac{6}{36}$</td><td>$\frac{4}{36}$</td><td>$\frac{2}{36}$</td></tr></table></div><p><b>a)</b> $\frac{10}{36}$. <b>b)</b> $\frac{12}{36}=\frac13$. <b>c)</b> $X=1$. <b>d)</b> $E(X)=\frac{70}{36}\approx1{,}94$.</p>`,
      antwortsatz: R`<p>Am häufigsten unterscheiden sich die Augenzahlen um 1 (etwa 28 %). In einem Drittel der Würfe beträgt die Differenz mindestens 3. Im Mittel liegt sie bei etwa 1,94.</p>`,
      kontrolle: R`Summe der Paare: $6+10+8+6+4+2=36$.`
    },
    {
      id: "afb2-06", abschnitt: "8.6", title: "Handyversicherung",
      aufgabenstellung: R`<p>Eine Handyversicherung kostet 60 € pro Jahr. Nach Erfahrung des Anbieters tritt pro Vertrag und Jahr mit 4 % ein Totalschaden ein (Auszahlung 600 €) und mit 10 % ein Reparaturfall (Auszahlung 150 €). Sonst wird nichts ausgezahlt. $X$ ist die Auszahlung pro Vertrag und Jahr in Euro.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> $E(X)$.`, a: 39, tol: 0.01, einheit: "€", hilfen: [R`Gewichtete Summe der Auszahlungen.`, R`$600\cdot0{,}04+150\cdot0{,}10+0\cdot0{,}86$`, R`$24+15$`], lsg: R`$E(X)=24+15=39$ €.` },
        { typ: "num", frage: R`<b class="op">Ermittle</b>, wie viel der Anbieter im Mittel pro Vertrag und Jahr einnimmt, nachdem die Auszahlungen abgezogen sind.`, a: 21, tol: 0.01, einheit: "€", hilfen: [R`Der Anbieter erhält den Beitrag und zahlt im Mittel $E(X)$.`, R`Beitrag minus erwartete Auszahlung.`, R`$60-39$`], lsg: R`$60-39=21$ €.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Standardabweichung von $X$.`, a: 123, tol: 0.1, einheit: "€", hilfen: [R`Erst die Varianz mit $\mu=39$.`, R`$561^2\cdot0{,}04+111^2\cdot0{,}10+39^2\cdot0{,}86$`, R`$V(X)=15129$, dann die Wurzel.`], fehler: [{ a: 15129, msg: "Das ist die Varianz. Ziehe noch die Wurzel." }], lsg: R`$V(X)=12588{,}84+1232{,}1+1308{,}06=15129$, $\sigma=\sqrt{15129}=123$ €.` },
        { typ: "mc", frage: R`<b class="op">Interpretiere</b> die Ergebnisse aus Sicht einer Kundin.`, o: ["Die Versicherung lohnt sich immer, weil 600 € mehr sind als 60 €.", "Im Mittel zahlt die Kundin 21 € pro Jahr drauf. Dafür ist sie gegen den seltenen, aber teuren Schaden abgesichert. Die große Standardabweichung zeigt dieses Risiko.", "Die Versicherung ist ein faires Spiel."], a: 1,
          why: R`Der erwartete „Gewinn“ der Kundin ist $39-60=-21$ €. Versicherungen sind nie fair im Sinne des Erwartungswerts. Man bezahlt für die Verringerung des Risikos.`, hilfen: [R`Vergleiche Beitrag und erwartete Auszahlung.`, R`$39&lt;60$`, R`Was sagt $\sigma=123$ € über einzelne Jahre?`] }
      ],
      analyse: R`<p>Beitrag <span class="hl-given">60 €</span>, <span class="hl-given">4 % Totalschaden (600 €)</span>, <span class="hl-given">10 % Reparatur (150 €)</span>. Gesucht: <span class="hl-target">Erwartungswert, Überschuss des Anbieters, Standardabweichung</span> und eine Deutung <span class="hl-condition">aus Sicht der Kundin</span>.</p>`,
      ansatz: R`<p>$X$ hat drei Werte: 600, 150 und 0 mit den Wahrscheinlichkeiten $0{,}04$; $0{,}10$; $0{,}86$ (die dritte ergibt sich aus der Summe 1). Erwartungswert und Varianz berechnest du nach Definition. Für die Deutung vergleichst du $E(X)$ mit dem Beitrag.</p>`,
      loesung: R`<p><b>a)</b> $E(X)=600\cdot0{,}04+150\cdot0{,}1=39$.</p><p><b>b)</b> $60-39=21$.</p><p><b>c)</b> $V(X)=(600-39)^2\cdot0{,}04+(150-39)^2\cdot0{,}1+(0-39)^2\cdot0{,}86=15129$, $\sigma=123$.</p>`,
      antwortsatz: R`<p>Der Anbieter zahlt im Mittel 39 € pro Vertrag aus und behält 21 €. Für die Kundin ist der Vertrag im Mittel ein Verlust, er schützt sie aber vor dem seltenen hohen Schaden. Die Standardabweichung von 123 € zeigt, wie stark einzelne Jahre vom Mittel abweichen.</p>`
    },
    {
      id: "afb2-07", abschnitt: "8.7", title: "Bauteile aus zwei Werken",
      aufgabenstellung: R`<p>Ein Hersteller bezieht 70 % seiner Bauteile aus Werk A und 30 % aus Werk B. Aus Werk A sind 3 % der Bauteile defekt ($D$), aus Werk B 6 %.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Bestimme</b> die Wahrscheinlichkeit, dass ein zufällig gewähltes Bauteil defekt ist.`, a: 0.039, tol: 0.0005, hilfen: [R`Zwei Pfade führen zu „defekt“.`, R`$0{,}7\cdot0{,}03$ und $0{,}3\cdot0{,}06$`, R`$0{,}021+0{,}018$`], fehler: [{ a: 0.045, msg: "Du hast die beiden Ausschussquoten gemittelt. Sie müssen mit den Anteilen 0,7 und 0,3 gewichtet werden." }], lsg: R`$P(D)=0{,}021+0{,}018=0{,}039$.` },
        { typ: "num", frage: R`Ein Bauteil ist defekt. <b class="op">Berechne</b> die Wahrscheinlichkeit, dass es aus Werk B stammt.`, a: 0.018 / 0.039, tol: 0.002, hilfen: [R`Gesucht ist $P_D(B)$.`, R`$\frac{P(B\cap D)}{P(D)}$`, R`$\frac{0{,}018}{0{,}039}$`], fehler: [{ a: 0.06, msg: "0,06 ist P_B(D). Gesucht ist P_D(B)." }], lsg: R`$P_D(B)=\frac{0{,}018}{0{,}039}\approx0{,}462$.` },
        { typ: "mc", frage: R`<b class="op">Untersuche</b>, ob „stammt aus Werk B“ und „ist defekt“ stochastisch unabhängig sind.`, o: ["unabhängig, weil beide Werke Ausschuss liefern", "abhängig, weil P_B(D) = 0,06 nicht gleich P(D) = 0,039 ist", "unabhängig, weil 0,3 · 0,06 = 0,018 ist"], a: 1, why: R`Die Information „Werk B“ erhöht die Wahrscheinlichkeit für einen Defekt von $0{,}039$ auf $0{,}06$. Das Produkt $0{,}3\cdot0{,}06$ ist $P(B\cap D)$ und kein Test.`, hilfen: [R`Vergleiche $P_B(D)$ mit $P(D)$.`, R`$0{,}06$ und $0{,}039$`, R`Oder: $P(B)\cdot P(D)=0{,}0117\ne0{,}018$.`] },
        { typ: "num", frage: R`Ein defektes Bauteil verursacht 40 € Kosten, ein intaktes keine. <b class="op">Berechne</b> die erwarteten Kosten pro Bauteil.`, a: 1.56, tol: 0.005, einheit: "€", hilfen: [R`Die Kosten sind eine Zufallsgröße mit den Werten 40 und 0.`, R`$40\cdot P(D)$`, R`$40\cdot0{,}039$`], lsg: R`$40\cdot0{,}039=1{,}56$ €.` }
      ],
      analyse: R`<p><span class="hl-given">70 % aus Werk A (3 % defekt)</span>, <span class="hl-given">30 % aus Werk B (6 % defekt)</span>. Gesucht: <span class="hl-target">$P(D)$, $P_D(B)$, Unabhängigkeit, erwartete Kosten</span>. <span class="hl-condition">„Ein Bauteil ist defekt“</span> ist eine Bedingung.</p><p>Das ist der typische Aufbau einer Prüfungsaufgabe: totale Wahrscheinlichkeit, umgekehrte Bedingung, Unabhängigkeit, Erwartungswert.</p>`,
      ansatz: R`<p>Die 3 % und 6 % sind bedingte Wahrscheinlichkeiten: $P_A(D)$ und $P_B(D)$. Mit dem Baum berechnest du $P(D)$, daraus $P_D(B)$. Die Unabhängigkeit prüfst du durch Vergleich von $P_B(D)$ mit $P(D)$. Die Kosten sind eine Zufallsgröße mit zwei Werten.</p>`,
      loesung: R`<p><b>a)</b> $P(D)=0{,}7\cdot0{,}03+0{,}3\cdot0{,}06=0{,}039$.</p><p><b>b)</b> $P_D(B)=\frac{0{,}018}{0{,}039}=\frac{6}{13}\approx0{,}462$.</p><p><b>c)</b> $P_B(D)=0{,}06\ne0{,}039=P(D)$: abhängig.</p><p><b>d)</b> $E(K)=40\cdot0{,}039+0\cdot0{,}961=1{,}56$.</p>`,
      antwortsatz: R`<p>3,9 % aller Bauteile sind defekt. Ein defektes Bauteil stammt mit etwa 46 % aus Werk B, obwohl dieses nur 30 % liefert. Herkunft und Defekt sind abhängig. Pro Bauteil entstehen im Mittel 1,56 € Kosten.</p>`
    }
  ]);
})();
