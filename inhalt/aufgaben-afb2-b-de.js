/* Aufgaben AFB II, zweite Aufgabe je Abschnitt 8.1–8.7 */
(function () {
  const R = String.raw;
  AN_TASKS_ADD("afb2", [
    {
      id: "afb2-08", abschnitt: "8.1", title: "Drei Ampeln auf dem Schulweg",
      aufgabenstellung: R`<p>Auf Mias Schulweg liegen drei Ampeln. Die erste zeigt mit Wahrscheinlichkeit $0{,}4$ Rot, die zweite mit $0{,}5$ und die dritte mit $0{,}25$. Die Ampeln sind nicht aufeinander abgestimmt.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Bestimme</b> die Wahrscheinlichkeit, dass Mia an keiner Ampel warten muss.`, a: 0.225, tol: 0.001, hilfen: [R`Alle drei Ampeln müssen „nicht Rot“ zeigen.`, R`Gegenwahrscheinlichkeiten: $0{,}6$; $0{,}5$; $0{,}75$.`, R`$0{,}6\cdot0{,}5\cdot0{,}75$`], lsg: R`$0{,}6\cdot0{,}5\cdot0{,}75=0{,}225$.` },
        { typ: "num", frage: R`<b class="op">Bestimme</b> die Wahrscheinlichkeit, dass sie an genau einer Ampel warten muss.`, a: 0.45, tol: 0.001, hilfen: [R`Drei Pfade: Rot nur an der ersten, nur an der zweiten, nur an der dritten.`, R`$0{,}4\cdot0{,}5\cdot0{,}75$, $0{,}6\cdot0{,}5\cdot0{,}75$, $0{,}6\cdot0{,}5\cdot0{,}25$`, R`$0{,}15+0{,}225+0{,}075$`], lsg: R`$0{,}15+0{,}225+0{,}075=0{,}45$.` },
        { typ: "num", frage: R`<b class="op">Bestimme</b> die Wahrscheinlichkeit, dass sie an mindestens zwei Ampeln warten muss.`, a: 0.325, tol: 0.001, hilfen: [R`Nutze die Ergebnisse aus a) und b).`, R`Gegenereignis: keine oder genau eine rote Ampel.`, R`$1-0{,}225-0{,}45$`], lsg: R`$1-0{,}225-0{,}45=0{,}325$.` },
        { typ: "mc", frage: R`<b class="op">Erläutere</b>, wozu die Angabe „nicht aufeinander abgestimmt“ gebraucht wird.`, o: ["Sie ist überflüssig.", "Sie rechtfertigt, dass man die Wahrscheinlichkeiten der drei Ampeln einfach multiplizieren darf (Unabhängigkeit).", "Sie bedeutet, dass alle Ampeln gleich oft Rot zeigen."], a: 1, why: R`Bei einer „grünen Welle“ hinge die zweite Ampel von der ersten ab. Dann stünden in der zweiten Stufe bedingte Wahrscheinlichkeiten, die man nicht kennt.`, hilfen: [R`Wann darf man $P(A\cap B)=P(A)\cdot P(B)$ benutzen?`, R`Bei Unabhängigkeit.`, R`Was wäre bei einer grünen Welle?`] }
      ],
      analyse: R`<p>Drei Ampeln mit <span class="hl-given">$0{,}4$; $0{,}5$; $0{,}25$ für Rot</span>, <span class="hl-condition">nicht aufeinander abgestimmt</span>. Gesucht: <span class="hl-target">keine, genau eine, mindestens zwei rote Ampeln</span>.</p>`,
      ansatz: R`<p>Dreistufiger Baum mit verschiedenen Wahrscheinlichkeiten je Stufe. Weil die Ampeln unabhängig sind, multiplizierst du entlang der Pfade. „Mindestens zwei“ ergibt sich am schnellsten als Rest.</p>`,
      loesung: R`<p><b>a)</b> $0{,}6\cdot0{,}5\cdot0{,}75=0{,}225$.</p><p><b>b)</b> $0{,}4\cdot0{,}5\cdot0{,}75+0{,}6\cdot0{,}5\cdot0{,}75+0{,}6\cdot0{,}5\cdot0{,}25=0{,}45$.</p><p><b>c)</b> $1-0{,}675=0{,}325$.</p>`,
      antwortsatz: R`<p>Mia kommt mit 22,5 % ohne Halt durch, muss mit 45 % genau einmal und mit 32,5 % mindestens zweimal warten.</p>`
    },
    {
      id: "afb2-09", abschnitt: "8.2", title: "Grippeimpfung",
      aufgabenstellung: R`<p>In einer Stadt sind 60 % der Menschen gegen Grippe geimpft ($I$). Von den Geimpften erkranken in einem Winter 4 % an Grippe ($G$), von den Ungeimpften 15 %. In einer Zeitung steht: „Fast 29 % der Grippekranken waren geimpft. Die Impfung wirkt also kaum.“</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Ermittle</b> $P(G)$.`, a: 0.084, tol: 0.0005, hilfen: [R`Zwei Pfade führen zu $G$.`, R`$0{,}6\cdot0{,}04$ und $0{,}4\cdot0{,}15$`, R`$0{,}024+0{,}06$`], lsg: R`$0{,}024+0{,}06=0{,}084$.` },
        { typ: "num", frage: R`<b class="op">Prüfe</b> die Zahl der Zeitung: <b class="op">Berechne</b> $P_G(I)$.`, a: 0.024 / 0.084, tol: 0.002, hilfen: [R`Bedingung ist „grippekrank“.`, R`$\frac{P(I\cap G)}{P(G)}$`, R`$\frac{0{,}024}{0{,}084}$`], lsg: R`$\frac{0{,}024}{0{,}084}=\frac27\approx0{,}286$. Die Zahl stimmt.` },
        { typ: "num", frage: R`<b class="op">Berechne</b>, um welchen Faktor das Erkrankungsrisiko Ungeimpfter größer ist als das Geimpfter.`, a: 3.75, tol: 0.01, hilfen: [R`Vergleiche $P_{\overline{I}}(G)$ mit $P_I(G)$.`, R`$0{,}15$ und $0{,}04$`, R`$\frac{0{,}15}{0{,}04}$`], lsg: R`$\frac{0{,}15}{0{,}04}=3{,}75$.` },
        { typ: "mc", frage: R`<b class="op">Beurteile</b> die Schlussfolgerung der Zeitung.`, o: ["Sie ist richtig, denn 29 % sind viel.", "Sie ist falsch: Für die Wirkung zählt P_I(G) = 4 % gegen 15 % bei Ungeimpften. Dass Geimpfte unter den Kranken vorkommen, liegt daran, dass die meisten Menschen geimpft sind.", "Sie ist falsch, weil die 29 % falsch berechnet sind."], a: 1, why: R`Die Zeitung nennt $P_G(I)$. Über die Wirkung entscheidet der Vergleich $P_I(G)$ gegen $P_{\overline{I}}(G)$. Ohne Impfwirkung wären 60 % der Kranken geimpft, es sind aber nur 29 %.`, hilfen: [R`Welche bedingte Wahrscheinlichkeit beschreibt die Wirkung?`, R`Wie groß wäre $P_G(I)$, wenn die Impfung gar nicht wirkte?`, R`Dann wäre $P_G(I)=P(I)=0{,}6$.`] }
      ],
      analyse: R`<p><span class="hl-given">60 % geimpft</span>, <span class="hl-given">4 % der Geimpften</span> und <span class="hl-given">15 % der Ungeimpften</span> erkranken. Zu <span class="hl-target">prüfen und zu beurteilen</span> ist die <span class="hl-condition">Zeitungsaussage</span>.</p>`,
      ansatz: R`<p>Der Baum beginnt mit „geimpft / ungeimpft“. Die Zeitung argumentiert mit der umgekehrten Bedingung. Du berechnest sie, zeigst, dass sie stimmt, und erklärst, warum sie nicht die Wirkung beschreibt.</p>`,
      loesung: R`<p><b>a)</b> $P(G)=0{,}6\cdot0{,}04+0{,}4\cdot0{,}15=0{,}084$.</p><p><b>b)</b> $P_G(I)=\frac{0{,}024}{0{,}084}\approx0{,}286$.</p><p><b>c)</b> $\frac{0{,}15}{0{,}04}=3{,}75$.</p><div class="nv-merke"><p><b>Merke:</b> Ein hoher Anteil einer großen Gruppe unter den Betroffenen sagt nichts über das Risiko in dieser Gruppe.</p></div>`,
      antwortsatz: R`<p>Die Zahl der Zeitung stimmt (etwa 29 %), die Schlussfolgerung nicht: Ungeimpfte erkranken 3,75-mal so häufig wie Geimpfte.</p>`
    },
    {
      id: "afb2-10", abschnitt: "8.3", title: "Reihen- und Parallelschaltung",
      aufgabenstellung: R`<p>Zwei Bauteile fallen innerhalb eines Jahres unabhängig voneinander aus: Bauteil 1 mit Wahrscheinlichkeit $0{,}1$, Bauteil 2 mit $0{,}2$. In einer <b>Reihenschaltung</b> funktioniert das Gerät nur, wenn beide Bauteile funktionieren. In einer <b>Parallelschaltung</b> genügt eines.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit, dass die Reihenschaltung ein Jahr lang funktioniert.`, a: 0.72, tol: 0.001, hilfen: [R`Beide Bauteile müssen funktionieren.`, R`$0{,}9$ und $0{,}8$`, R`$0{,}9\cdot0{,}8$`], fehler: [{ a: 0.7, msg: "Du hast 1 − 0,1 − 0,2 gerechnet. Dabei fehlt der Fall, dass beide ausfallen. Multipliziere 0,9 · 0,8." }], lsg: R`$0{,}9\cdot0{,}8=0{,}72$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit, dass die Parallelschaltung ein Jahr lang funktioniert.`, a: 0.98, tol: 0.001, hilfen: [R`Sie versagt nur, wenn beide ausfallen.`, R`$0{,}1\cdot0{,}2$`, R`$1-0{,}02$`], lsg: R`$1-0{,}1\cdot0{,}2=0{,}98$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit, dass genau eines der beiden Bauteile ausfällt.`, a: 0.26, tol: 0.001, hilfen: [R`Zwei Pfade.`, R`$0{,}1\cdot0{,}8$ und $0{,}9\cdot0{,}2$`, R`$0{,}08+0{,}18$`], lsg: R`$0{,}08+0{,}18=0{,}26$.` },
        { typ: "mc", frage: R`<b class="op">Beurteile</b> die Annahme der Unabhängigkeit.`, o: ["Sie ist immer erfüllt, weil es zwei verschiedene Bauteile sind.", "Sie ist fraglich, wenn eine gemeinsame Ursache (Überspannung, Hitze) beide Bauteile zugleich schädigen kann. Dann wäre die Parallelschaltung weniger sicher als berechnet.", "Sie spielt für das Ergebnis keine Rolle."], a: 1, why: R`Gemeinsame Ursachen machen Ausfälle abhängig: $P(\text{beide fallen aus})$ wäre größer als $0{,}02$.`, hilfen: [R`Wodurch könnten beide Bauteile gleichzeitig ausfallen?`, R`Was folgt dann für $P(\text{beide fallen aus})$?`, R`Der Wert wäre größer als das Produkt.`] }
      ],
      analyse: R`<p>Ausfallwahrscheinlichkeiten <span class="hl-given">$0{,}1$ und $0{,}2$</span>, <span class="hl-condition">unabhängig</span>. Gesucht: <span class="hl-target">Funktionswahrscheinlichkeit beider Schaltungen</span> und eine Beurteilung der Annahme.</p>`,
      ansatz: R`<p>Übersetze die Schaltungen in „und“ bzw. „mindestens eines“. Bei Unabhängigkeit multiplizierst du. Für „mindestens eines“ rechnest du über das Gegenereignis.</p>`,
      loesung: R`<p><b>a)</b> $0{,}9\cdot0{,}8=0{,}72$.</p><p><b>b)</b> $1-0{,}1\cdot0{,}2=0{,}98$.</p><p><b>c)</b> $0{,}1\cdot0{,}8+0{,}9\cdot0{,}2=0{,}26$. Kontrolle: $0{,}72+0{,}26+0{,}02=1$.</p>`,
      antwortsatz: R`<p>Die Reihenschaltung funktioniert mit 72 %, die Parallelschaltung mit 98 %. Mit 26 % fällt genau ein Bauteil aus. Die Rechnung gilt nur, solange keine gemeinsame Ausfallursache vorliegt.</p>`
    },
    {
      id: "afb2-11", abschnitt: "8.4", title: "Freiwürfe: Simulation gegen Rechnung",
      aufgabenstellung: R`<p>Eine Spielerin trifft Freiwürfe mit 70 %. Sie wirft dreimal, die Würfe gelten als unabhängig.</p><div data-an="w-sim-freiwurf"></div>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Berechne</b> die Wahrscheinlichkeit für genau zwei Treffer.`, a: 0.441, tol: 0.001, hilfen: [R`Wie viele Pfade haben genau zwei Treffer?`, R`Drei Pfade, jeder mit $0{,}7^2\cdot0{,}3$.`, R`$3\cdot0{,}147$`], fehler: [{ a: 0.147, msg: "Das ist ein einzelner Pfad. Es gibt drei Reihenfolgen." }], lsg: R`$3\cdot0{,}7^2\cdot0{,}3=0{,}441$.` },
        { typ: "num", frage: R`Eine Simulation mit 500 Versuchen liefert 402-mal „mindestens zwei Treffer“. <b class="op">Gib</b> den Schätzwert <b class="op">an</b>.`, a: 0.804, tol: 0.001, hilfen: [R`Relative Häufigkeit.`, R`$\frac{402}{500}$`, R`Teile.`], lsg: R`$\frac{402}{500}=0{,}804$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> die übliche Schwankung $\frac{1}{\sqrt n}$ für $n=500$ (drei Nachkommastellen).`, a: 0.045, tol: 0.001, hilfen: [R`$\sqrt{500}\approx22{,}4$`, R`$\frac{1}{22{,}4}$`, R`Etwa $0{,}045$.`], lsg: R`$\frac{1}{\sqrt{500}}\approx0{,}045$.` },
        { typ: "mc", frage: R`<b class="op">Beurteile</b>, ob der Schätzwert zum exakten Wert $0{,}784$ passt.`, o: ["Ja, die Abweichung 0,02 ist kleiner als die übliche Schwankung 0,045.", "Nein, die Werte müssten übereinstimmen.", "Nein, die Simulation liefert zu große Werte, das Modell ist falsch."], a: 0, why: R`$0{,}804-0{,}784=0{,}02$. Das liegt klar innerhalb der üblichen Schwankung.`, hilfen: [R`Berechne die Abweichung.`, R`$0{,}02$`, R`Vergleiche mit $0{,}045$.`] }
      ],
      analyse: R`<p><span class="hl-given">Trefferquote 70 %, drei Würfe</span>, <span class="hl-given">500 Simulationen, 402 Erfolge</span>. Gesucht: <span class="hl-target">exakter Wert, Schätzwert, Beurteilung der Abweichung</span>.</p>`,
      ansatz: R`<p>Exakte Werte liefert der dreistufige Baum. Den Schätzwert vergleichst du mit dem exakten Wert und beurteilst die Differenz mit der Faustregel $\frac{1}{\sqrt n}$.</p>`,
      loesung: R`<p><b>a)</b> $3\cdot0{,}49\cdot0{,}3=0{,}441$.</p><p><b>b)</b> $0{,}804$.</p><p><b>c)</b> $\approx0{,}045$.</p><p><b>d)</b> Abweichung $0{,}02&lt;0{,}045$: Simulation und Rechnung passen zusammen.</p>`,
      antwortsatz: R`<p>Genau zwei Treffer gelingen mit 44,1 %. Der Schätzwert 0,804 für „mindestens zwei Treffer“ weicht nur um 0,02 vom exakten Wert 0,784 ab und ist damit unauffällig.</p>`
    },
    {
      id: "afb2-12", abschnitt: "8.5", title: "Der richtige Schlüssel",
      aufgabenstellung: R`<p>An einem Schlüsselbund hängen vier ähnliche Schlüssel, genau einer passt. Im Dunkeln probiert Ben die Schlüssel nacheinander aus und legt jeden falschen beiseite. $X$ ist die Anzahl der Versuche, bis die Tür offen ist.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Bestimme</b> $P(X=2)$.`, a: 0.25, tol: 0.001, hilfen: [R`Erst falsch, dann richtig.`, R`$\frac34$, dann $\frac13$ (noch drei Schlüssel).`, R`$\frac34\cdot\frac13$`], lsg: R`$\frac34\cdot\frac13=\frac14$.` },
        { typ: "num", frage: R`<b class="op">Bestimme</b> $P(X=3)$.`, a: 0.25, tol: 0.001, hilfen: [R`Falsch, falsch, richtig.`, R`$\frac34\cdot\frac23\cdot\frac12$`, R`Kürze.`], lsg: R`$\frac34\cdot\frac23\cdot\frac12=\frac14$.` },
        { typ: "num", frage: R`<b class="op">Berechne</b> $E(X)$.`, a: 2.5, tol: 0.005, hilfen: [R`Alle vier Werte haben dieselbe Wahrscheinlichkeit.`, R`$\frac14\cdot(1+2+3+4)$`, R`$\frac{10}{4}$`], lsg: R`$E(X)=\frac{1+2+3+4}{4}=2{,}5$.` },
        { typ: "mc", frage: R`Ben legt falsche Schlüssel <b>nicht</b> beiseite, sondern greift jedes Mal neu zufällig zu. <b class="op">Vergleiche</b>.`, o: ["Es ändert sich nichts.", "Jetzt ist X nicht mehr auf 4 beschränkt, und P(X=2) = 3/4 · 1/4 ist kleiner als vorher. Im Mittel braucht Ben mehr Versuche.", "Jetzt braucht Ben im Mittel weniger Versuche."], a: 1, why: R`Das entspricht Ziehen mit Zurücklegen: In jeder Stufe steht $\frac14$ und $\frac34$. $P(X=2)=\frac{3}{16}$, und der Erwartungswert ist 4 statt $2{,}5$.`, hilfen: [R`Welchem Urnenmodell entspricht das?`, R`Ziehen mit Zurücklegen.`, R`Berechne $P(X=2)$ neu.`] }
      ],
      analyse: R`<p><span class="hl-given">Vier Schlüssel, einer passt</span>, <span class="hl-condition">falsche werden beiseitegelegt</span> (ohne Zurücklegen). Gesucht: <span class="hl-target">Verteilung und Erwartungswert der Anzahl der Versuche</span>.</p>`,
      ansatz: R`<p>Ein Baum, der abbricht, sobald der richtige Schlüssel gefunden ist. Ohne Zurücklegen ändern sich die Brüche in jeder Stufe. Überraschend: Alle vier Werte von $X$ sind gleich wahrscheinlich.</p>`,
      loesung: R`<p>$P(X=1)=\frac14$, $P(X=2)=\frac34\cdot\frac13=\frac14$, $P(X=3)=\frac34\cdot\frac23\cdot\frac12=\frac14$, $P(X=4)=\frac14$. $E(X)=2{,}5$.</p>`,
      antwortsatz: R`<p>Jede Anzahl von 1 bis 4 Versuchen ist gleich wahrscheinlich (25 %). Im Mittel braucht Ben 2,5 Versuche. Ohne Beiseitelegen wären es im Mittel 4.</p>`
    },
    {
      id: "afb2-13", abschnitt: "8.6", title: "Zwei Spiele im Vergleich",
      aufgabenstellung: R`<p><b>Spiel A:</b> Mit Wahrscheinlichkeit $0{,}5$ gewinnst du 4 €, sonst verlierst du 2 €. <b>Spiel B:</b> Mit Wahrscheinlichkeit $0{,}2$ gewinnst du 10 €, sonst verlierst du 1,25 €.</p>`,
      teile: [
        { typ: "zahlen", frage: R`<b class="op">Berechne</b> die Erwartungswerte des Gewinns.`, felder: [{ l: "Spiel A: μ =", a: 1, einheit: "€" }, { l: "Spiel B: μ =", a: 1, einheit: "€" }], tol: 0.005, hilfen: [R`Verluste sind negative Werte.`, R`A: $4\cdot0{,}5+(-2)\cdot0{,}5$`, R`B: $10\cdot0{,}2+(-1{,}25)\cdot0{,}8$`], lsg: R`A: $2-1=1$ €. B: $2-1=1$ €.` },
        { typ: "zahlen", frage: R`<b class="op">Berechne</b> die Standardabweichungen.`, felder: [{ l: "Spiel A: σ =", a: 3, einheit: "€" }, { l: "Spiel B: σ =", a: 4.5, einheit: "€" }], tol: 0.01, hilfen: [R`Abweichungen von $\mu=1$ bilden und quadrieren.`, R`A: $3^2\cdot0{,}5+(-3)^2\cdot0{,}5$`, R`B: $9^2\cdot0{,}2+(-2{,}25)^2\cdot0{,}8$`], lsg: R`A: $V=9$, $\sigma=3$ €. B: $V=16{,}2+4{,}05=20{,}25$, $\sigma=4{,}5$ €.` },
        { typ: "num", frage: R`Du spielst 100-mal Spiel A. <b class="op">Gib</b> den zu erwartenden Gesamtgewinn <b class="op">an</b>.`, a: 100, tol: 0.5, einheit: "€", hilfen: [R`Pro Spiel im Mittel 1 €.`, R`$100\cdot1$`, R`100 €`], lsg: R`$100\cdot1=100$ €.` },
        { typ: "mc", frage: R`<b class="op">Interpretiere</b> den Unterschied der beiden Spiele.`, o: ["Spiel B ist besser, weil man 10 € gewinnen kann.", "Auf lange Sicht bringen beide gleich viel. Spiel B ist riskanter: Man verliert in 80 % der Spiele, und die Ergebnisse streuen stärker.", "Spiel A ist besser, weil sein Erwartungswert größer ist."], a: 1, why: R`Gleiche Erwartungswerte, aber $\sigma_B=4{,}5&gt;\sigma_A=3$. Die Standardabweichung misst das Risiko.`, hilfen: [R`Vergleiche zuerst die Erwartungswerte.`, R`Beide sind 1 €.`, R`Was sagt das größere $\sigma$ aus?`] }
      ],
      analyse: R`<p>Zwei Spiele mit <span class="hl-given">je zwei möglichen Gewinnen</span>. Gesucht: <span class="hl-target">$\mu$ und $\sigma$ beider Spiele</span> und ein <span class="hl-condition">Vergleich</span>.</p>`,
      ansatz: R`<p>Die Zufallsgröße ist jeweils der Gewinn, Verluste sind negativ. Der Erwartungswert beschreibt den langfristigen Durchschnitt, die Standardabweichung das Risiko. Erst beide Kennzahlen zusammen erlauben einen Vergleich.</p>`,
      loesung: R`<p><b>A:</b> $\mu=4\cdot0{,}5-2\cdot0{,}5=1$; $V=(4-1)^2\cdot0{,}5+(-2-1)^2\cdot0{,}5=9$; $\sigma=3$.</p><p><b>B:</b> $\mu=10\cdot0{,}2-1{,}25\cdot0{,}8=1$; $V=(10-1)^2\cdot0{,}2+(-1{,}25-1)^2\cdot0{,}8=16{,}2+4{,}05=20{,}25$; $\sigma=4{,}5$.</p>`,
      antwortsatz: R`<p>Beide Spiele bringen im Mittel 1 € pro Spiel. Spiel B streut mit 4,50 € stärker als Spiel A mit 3 € und ist damit riskanter.</p>`
    },
    {
      id: "afb2-14", abschnitt: "8.7", title: "Anschlusszug",
      aufgabenstellung: R`<p>Herr Kaya fährt täglich mit zwei Zügen zur Arbeit. Der erste Zug ist mit 80 % pünktlich. Ist er pünktlich, erreicht Herr Kaya den Anschlusszug mit 95 %. Ist er verspätet, erreicht er ihn nur mit 30 %.</p>`,
      teile: [
        { typ: "num", frage: R`<b class="op">Bestimme</b> die Wahrscheinlichkeit, dass Herr Kaya den Anschlusszug erreicht.`, a: 0.82, tol: 0.001, hilfen: [R`Zwei Pfade führen zu „Anschluss erreicht“.`, R`$0{,}8\cdot0{,}95$ und $0{,}2\cdot0{,}3$`, R`$0{,}76+0{,}06$`], lsg: R`$0{,}76+0{,}06=0{,}82$.` },
        { typ: "num", frage: R`Herr Kaya hat den Anschluss verpasst. <b class="op">Berechne</b> die Wahrscheinlichkeit, dass der erste Zug verspätet war.`, a: 0.14 / 0.18, tol: 0.002, hilfen: [R`Bedingung: Anschluss verpasst.`, R`Pfade: $0{,}2\cdot0{,}7=0{,}14$ und $0{,}8\cdot0{,}05=0{,}04$.`, R`$\frac{0{,}14}{0{,}18}$`], fehler: [{ a: 0.7, msg: "0,7 ist die Wahrscheinlichkeit für „verpasst“, wenn der Zug verspätet ist. Gesucht ist die umgekehrte Bedingung." }], lsg: R`$\frac{0{,}14}{0{,}18}=\frac79\approx0{,}778$.` },
        { typ: "num", frage: R`Die Tage gelten als unabhängig. <b class="op">Berechne</b> die Wahrscheinlichkeit, dass er an allen fünf Arbeitstagen einer Woche den Anschluss erreicht (drei Nachkommastellen).`, a: 0.371, tol: 0.001, hilfen: [R`Fünfmal dieselbe Wahrscheinlichkeit.`, R`$0{,}82^5$`, R`Etwa $0{,}371$.`], lsg: R`$0{,}82^5\approx0{,}371$.` },
        { typ: "num", frage: R`<b class="op">Ermittle</b>, wie oft er in 20 Arbeitstagen den Anschluss im Mittel verpasst.`, a: 3.6, tol: 0.01, hilfen: [R`Wahrscheinlichkeit für „verpasst“ an einem Tag.`, R`$1-0{,}82=0{,}18$`, R`$20\cdot0{,}18$`], lsg: R`$20\cdot0{,}18=3{,}6$.` }
      ],
      analyse: R`<p><span class="hl-given">80 % pünktlich</span>, Anschluss mit <span class="hl-given">95 %</span> bzw. <span class="hl-given">30 %</span>. Gesucht: <span class="hl-target">totale Wahrscheinlichkeit, umgekehrte Bedingung, Wochenwahrscheinlichkeit, Erwartungswert</span>. <span class="hl-condition">Unabhängigkeit der Tage</span> ist vorausgesetzt.</p>`,
      ansatz: R`<p>Baum mit den Stufen „erster Zug“ und „Anschluss“. Für b) brauchst du die beiden Pfade zu „verpasst“. Für c) und d) wird der einzelne Tag zum Baustein einer unabhängigen Wiederholung.</p>`,
      loesung: R`<p><b>a)</b> $0{,}8\cdot0{,}95+0{,}2\cdot0{,}3=0{,}82$.</p><p><b>b)</b> $P(\text{verpasst})=0{,}18$; $\frac{0{,}2\cdot0{,}7}{0{,}18}=\frac79$.</p><p><b>c)</b> $0{,}82^5\approx0{,}371$.</p><p><b>d)</b> $20\cdot0{,}18=3{,}6$.</p>`,
      antwortsatz: R`<p>Herr Kaya erreicht den Anschluss mit 82 %. Verpasst er ihn, lag es mit etwa 78 % an einer Verspätung des ersten Zugs. Eine Woche ohne verpassten Anschluss gelingt nur mit etwa 37 %. In 20 Tagen verpasst er ihn im Mittel 3,6-mal.</p>`
    }
  ]);
})();
