/* Kapitel 8, Teil 5 — 8.5 Zufallsgrößen und Wahrscheinlichkeitsverteilung */
(function () {
  const R = String.raw, H = AN.H;

  AN.QUIZ["k8-5"] = [
    { t: "num", q: R`Drei Münzen werden geworfen, $X$ ist die Anzahl der Münzen mit „Wappen“. Berechne $P(X=2)$.`, a: 0.375, tol: 0.002, why: R`Von den 8 gleich wahrscheinlichen Ergebnissen haben genau drei zweimal Wappen: WWZ, WZW, ZWW. Also $P(X=2)=\frac38=0{,}375$.` },
    { t: "num", q: R`Zwei Würfel werden geworfen, $X$ ist die Augensumme. Berechne $P(X=8)$.`, a: 5 / 36, tol: 0.002, why: R`Günstig sind $(2|6),(3|5),(4|4),(5|3),(6|2)$, also $\frac{5}{36}\approx0{,}139$.` },
    { q: R`Welche Tabelle kann die Wahrscheinlichkeitsverteilung einer Zufallsgröße sein?`, o: [R`Werte 0; 1; 2 mit Wahrscheinlichkeiten $0{,}5$; $0{,}4$; $0{,}2$`, R`Werte $-1$; 0; 4 mit Wahrscheinlichkeiten $0{,}6$; $0{,}3$; $0{,}1$`, R`Werte 1; 2; 3 mit Wahrscheinlichkeiten $0{,}7$; $0{,}5$; $-0{,}2$`], a: 1, why: R`Die Wahrscheinlichkeiten müssen zwischen 0 und 1 liegen und zusammen 1 ergeben. In der ersten Tabelle ist die Summe $1{,}1$, in der dritten kommt eine negative Wahrscheinlichkeit vor. Negative <i>Werte</i> der Zufallsgröße (zum Beispiel ein Verlust von 1 €) sind dagegen erlaubt.` },
    { t: "num", q: R`Eine Zufallsgröße nimmt die Werte 0; 1; 2; 3 an mit $P(X=0)=0{,}2$, $P(X=1)=0{,}5$ und $P(X=3)=0{,}1$. Bestimme $P(X=2)$.`, a: 0.2, tol: 0.001, why: R`Alle Wahrscheinlichkeiten ergeben zusammen 1: $P(X=2)=1-0{,}2-0{,}5-0{,}1=0{,}2$.` },
    { t: "num", q: R`Drei Münzen, $X$ = Anzahl „Wappen“. Berechne $P(X\ge1)$.`, a: 0.875, tol: 0.002, why: R`Gegenereignis: $P(X\ge1)=1-P(X=0)=1-\frac18=\frac78=0{,}875$.` }
  ];

  window.WS_K8_5_DE = function (S) {
    return S("8.5&nbsp;·&nbsp;Zufallsgrößen und Wahrscheinlichkeitsverteilung", R`
    <p>Auf dem Schulfest steht ein Glücksrad. Dich interessiert nicht, auf welchem der farbigen Felder der Zeiger stehen bleibt. Dich interessiert, <b>wie viel Geld</b> du bekommst. Bei einem Brettspiel interessiert dich nicht, welcher Würfel welche Zahl zeigt, sondern die <b>Augensumme</b>. In vielen Situationen schaut man also nicht auf das Ergebnis selbst, sondern auf eine Zahl, die zum Ergebnis gehört.</p>
    ` + H.P(R`Ein Zufallsexperiment hat oft sehr viele Ergebnisse (36 Paare bei zwei Würfeln, 8 Wurffolgen bei drei Münzen). <b>Wie beschreibst du übersichtlich, mit welcher Wahrscheinlichkeit welche Zahl herauskommt, wenn dich nur eine Zahl pro Ergebnis interessiert?</b>`)
    + H.V("v-8-5", R`Drei Münzen werden geworfen. Du zählst, wie viele davon „Wappen“ zeigen. Möglich sind 0, 1, 2 oder 3. Welche Anzahl ist am wahrscheinlichsten?`, 2, [
      [R`Alle vier Anzahlen sind gleich wahrscheinlich, jeweils 25 %.`, R`Es gibt vier mögliche Anzahlen, aber acht gleich wahrscheinliche Wurffolgen. Nur <i>eine</i> davon (ZZZ) ergibt 0, aber <i>drei</i> (WZZ, ZWZ, ZZW) ergeben 1. Prüfe es unten.`],
      [R`Die 3, denn drei Münzen können dreimal Wappen zeigen.`, R`Dreimal Wappen ist nur auf eine Art möglich (WWW) und hat die Wahrscheinlichkeit $\frac18$. Prüfe es unten mit 1000 Würfen.`],
      [R`Die 1 und die 2, beide gleich wahrscheinlich.`, R`Genau. Von den acht Wurffolgen gehören je drei zu „einmal Wappen“ und zu „zweimal Wappen“: jeweils $\frac38$. Die Anzahlen 0 und 3 haben nur je $\frac18$.`]
    ]) + R`
    <h3>Entdecken: drei Münzen, eine Zahl</h3>
    <figure class="nv-figure"><div data-an="w-muenze" data-n="3"></div><figcaption>Abb. 1: Drei Münzen. Zu jedem Wurf wird $X$ = Anzahl der Münzen mit „Wappen“ notiert.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Wirf einige Male mit Animation und lies oben rechts den Wert von $X$ ab. Führe dann 1000 Würfe durch. <b>Wie verteilen sich die Würfe auf die Werte 0, 1, 2 und 3?</b> Vergleiche mit deiner Vermutung.</p></div>
    <p>Die Säulen für $X=1$ und $X=2$ sind etwa dreimal so hoch wie die für $X=0$ und $X=3$. Um das zu erklären, schreibst du alle acht gleich wahrscheinlichen Ergebnisse auf und notierst zu jedem die Anzahl der Wappen:</p>
    <div class="nv-table-wrap"><table class="nv-table">
      <tr><th>Ergebnis</th><td>ZZZ</td><td>WZZ</td><td>ZWZ</td><td>ZZW</td><td>WWZ</td><td>WZW</td><td>ZWW</td><td>WWW</td></tr>
      <tr><th>Wert von $X$</th><td>0</td><td>1</td><td>1</td><td>1</td><td>2</td><td>2</td><td>2</td><td>3</td></tr>
    </table></div>

    <h3>Zufallsgröße und Wahrscheinlichkeitsverteilung</h3>
    <div class="nv-def"><p><b>Definition.</b> Eine <b>Zufallsgröße</b> $X$ ordnet jedem Ergebnis eines Zufallsexperiments eine Zahl zu. Mit $P(X=k)$ bezeichnet man die Wahrscheinlichkeit, dass $X$ den Wert $k$ annimmt. Die Zuordnung, die jedem möglichen Wert $k$ die Wahrscheinlichkeit $P(X=k)$ zuordnet, heißt <b>Wahrscheinlichkeitsverteilung</b> von $X$.</p></div>
    <p>Die Schreibweise „$X=2$“ ist eine Abkürzung für ein Ereignis: „Es fällt ein Ergebnis, dem die Zahl 2 zugeordnet ist“, hier also $\{\text{WWZ};\text{WZW};\text{ZWW}\}$. Deshalb ist $P(X=2)=\frac38$. Die Verteilung gibst du am übersichtlichsten als Tabelle an:</p>
    <div class="nv-table-wrap"><table class="nv-table">
      <tr><th>$k$</th><td>0</td><td>1</td><td>2</td><td>3</td></tr>
      <tr><th>$P(X=k)$</th><td>$\frac18$</td><td>$\frac38$</td><td>$\frac38$</td><td>$\frac18$</td></tr>
    </table></div>
    <p>Zwei Kontrollen helfen dir immer: Jede Wahrscheinlichkeit liegt zwischen 0 und 1, und die <b>Summe aller Wahrscheinlichkeiten ist 1</b>. Zeichnest du über jedem Wert eine Säule mit der Höhe $P(X=k)$, erhältst du ein <b>Histogramm</b>. Die roten gestrichelten Linien im Baustein oben zeigen genau dieses Histogramm, die blauen Säulen nähern sich ihm bei vielen Versuchen an.</p>
    <p>Mit der Tabelle beantwortest du auch Fragen nach Bereichen, indem du addierst: $P(X\le1)=\frac18+\frac38=\frac12$ („höchstens einmal Wappen“) oder $P(X\ge1)=1-P(X=0)=\frac78$ („mindestens einmal Wappen“).</p>

    <div class="nv-example"><p><b>Beispiel 1 (Augensumme).</b> Zwei Würfel werden geworfen, $X$ ist die Augensumme. Gib die Wahrscheinlichkeitsverteilung an und berechne $P(X\ge10)$.</p>
      <p>Es gibt 36 gleich wahrscheinliche Paare. Du zählst zu jeder Summe die passenden Paare:</p>
      <div class="nv-table-wrap"><table class="nv-table">
        <tr><th>$k$</th><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td></tr>
        <tr><th>$P(X=k)$</th><td>$\frac1{36}$</td><td>$\frac2{36}$</td><td>$\frac3{36}$</td><td>$\frac4{36}$</td><td>$\frac5{36}$</td><td>$\frac6{36}$</td><td>$\frac5{36}$</td><td>$\frac4{36}$</td><td>$\frac3{36}$</td><td>$\frac2{36}$</td><td>$\frac1{36}$</td></tr>
      </table></div>
      <p>$P(X\ge10)=\frac{3}{36}+\frac{2}{36}+\frac{1}{36}=\frac{6}{36}=\frac16$.</p>
      <p><b>Ergebnis:</b> Eine Augensumme von mindestens 10 fällt im Mittel bei jedem sechsten Wurf.</p></div>

    <h3>Zufallsgrößen bei Spielen: Auszahlung und Gewinn</h3>
    <p>Das Glücksrad unten hat acht gleich große Felder. Fünf Felder zahlen nichts aus, je eines zahlt 1 €, 2 € und 5 €. Die Zufallsgröße $X$ ist die <b>Auszahlung</b> in Euro.</p>
    <figure class="nv-figure"><div data-an="w-rad" data-sektoren="0:2;1:1;0:2;2:1;0:1;5:1"></div><figcaption>Abb. 2: Glücksrad mit acht gleich großen Feldern. $X$ = Auszahlung in Euro.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Stelle zuerst selbst die Tabelle der Wahrscheinlichkeitsverteilung auf (zähle die Felder). Drehe dann 1000-mal und vergleiche. <b>Auf welchen Wert pendelt sich der Mittelwert der Auszahlung ein?</b> Merke dir diese Zahl für Abschnitt 8.6.</p></div>
    <div class="nv-table-wrap"><table class="nv-table">
      <tr><th>Auszahlung $k$ in €</th><td>0</td><td>1</td><td>2</td><td>5</td></tr>
      <tr><th>$P(X=k)$</th><td>$\frac58$</td><td>$\frac18$</td><td>$\frac18$</td><td>$\frac18$</td></tr>
    </table></div>
    <p>Kostet ein Spiel 2 € Einsatz, dann betrachtet man oft lieber den <b>Gewinn</b> $G$ = Auszahlung minus Einsatz. $G$ nimmt die Werte $-2$, $-1$, $0$ und $3$ an, die Wahrscheinlichkeiten bleiben dieselben. Zufallsgrößen dürfen also auch negative Werte haben.</p>

    <div class="nv-merke"><p><b>Merke:</b> Eine Zufallsgröße $X$ ordnet jedem Ergebnis eine Zahl zu. Ihre Wahrscheinlichkeitsverteilung gibt zu jedem Wert $k$ die Wahrscheinlichkeit $P(X=k)$ an, meist als Tabelle oder Histogramm. Die Summe aller $P(X=k)$ ist 1.</p></div>
    <div class="nv-fehler"><p><b>Häufige Fehler</b></p><ul>
      <li><b>Alle Werte für gleich wahrscheinlich gehalten.</b> „$X$ kann 0, 1, 2 oder 3 sein, also je $\frac14$.“ Falsch: Gleich wahrscheinlich sind die acht Wurffolgen. Zähle, wie viele zu jedem Wert gehören.</li>
      <li><b>Summe nicht kontrolliert.</b> Ergeben deine Wahrscheinlichkeiten zusammen nicht 1, hast du Ergebnisse vergessen oder doppelt gezählt.</li>
      <li><b>„Mindestens“ und „höchstens“ verwechselt.</b> $P(X\ge2)$ heißt „mindestens 2“ (2 oder mehr), $P(X\le2)$ heißt „höchstens 2“ (2 oder weniger). Der Wert 2 gehört beide Male dazu.</li>
      <li><b>Auszahlung und Gewinn vermischt.</b> Lege am Anfang fest, was $X$ bedeutet. Beim Gewinn ziehst du den Einsatz von jeder Auszahlung ab.</li>
    </ul></div>
    <div data-an="quiz" data-quiz="k8-5"></div>
  `, false, "8-5");
  };
})();
