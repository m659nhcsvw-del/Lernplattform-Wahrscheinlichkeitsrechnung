/* Kapitel 8, Teil 4 — 8.4 Simulation von Zufallsexperimenten */
(function () {
  const R = String.raw, H = AN.H;

  AN.QUIZ["k8-4"] = [
    { q: R`Eine Handballerin trifft Siebenmeter mit $40\,\%$. Du simulierst einen Wurf mit einer Zufallsziffer von 0 bis 9. Welche Zuordnung passt?`, o: [R`0 bis 4: Treffer, 5 bis 9: kein Treffer`, R`0 bis 3: Treffer, 4 bis 9: kein Treffer`, R`4: Treffer, alle anderen Ziffern: kein Treffer`], a: 1, why: R`Vier der zehn gleich wahrscheinlichen Ziffern (0, 1, 2, 3) müssen „Treffer“ bedeuten, dann ist $P(\text{Treffer})=\frac{4}{10}=40\,\%$. Welche vier Ziffern du nimmst, ist egal. Es müssen nur genau vier sein.` },
    { q: R`Zwei Gruppen simulieren dasselbe Experiment. Gruppe A führt 100 Versuche durch, Gruppe B 10 000. Welche Aussage stimmt?`, o: [R`Beide Schätzwerte sind gleich zuverlässig, denn es ist dasselbe Modell.`, R`Der Schätzwert von B liegt in der Regel deutlich näher an der Wahrscheinlichkeit.`, R`Der Schätzwert von B ist exakt die Wahrscheinlichkeit.`], a: 1, why: R`Je mehr Versuche, desto kleiner die Schwankung der relativen Häufigkeit (Faustregel: etwa $\frac{1}{\sqrt n}$). Bei 100 Versuchen sind Abweichungen bis etwa $0{,}1$ normal, bei 10 000 nur noch etwa $0{,}01$. Exakt wird der Wert aber nie garantiert.` },
    { t: "num", q: R`In einer Simulation tritt das Ereignis bei 2000 Versuchen 1568-mal ein. Gib den Schätzwert für die Wahrscheinlichkeit an.`, a: 0.784, tol: 0.001, why: R`Schätzwert = relative Häufigkeit: $\frac{1568}{2000}=0{,}784$.` },
    { q: R`Was liefert eine Simulation?`, o: [R`Den exakten Wert der Wahrscheinlichkeit`, R`Einen Schätzwert, der bei jeder Durchführung etwas anders ausfällt`, R`Einen Beweis dafür, dass das Modell stimmt`], a: 1, why: R`Eine Simulation ist selbst ein Zufallsexperiment. Sie liefert relative Häufigkeiten, also Schätzwerte. Ob das Modell zur Wirklichkeit passt, muss man zusätzlich überlegen.` },
    { t: "num", q: R`Nach der Faustregel $\frac{1}{\sqrt n}$: Wie groß ist die übliche Schwankung der relativen Häufigkeit bei $n=400$ Versuchen?`, a: 0.05, tol: 0.001, why: R`$\frac{1}{\sqrt{400}}=\frac{1}{20}=0{,}05$. Für die halbe Schwankung brauchst du viermal so viele Versuche.` }
  ];

  window.WS_K8_4_DE = function (S) {
    return S("8.4&nbsp;·&nbsp;Simulation von Zufallsexperimenten", R`
    <p>Eine Basketballerin trifft Freiwürfe mit 70 %. Wie wahrscheinlich ist es, dass sie von drei Freiwürfen mindestens zwei trifft? Du könntest sie tausendmal drei Freiwürfe werfen lassen und zählen. Das dauert. Schneller geht es, wenn du das Experiment durch ein anderes ersetzt, das <b>dieselben Wahrscheinlichkeiten</b> hat, sich aber schnell und oft wiederholen lässt: mit einem Würfel, einem Glücksrad, Zufallsziffern oder einem Rechner. Das nennt man <b>Simulation</b>.</p>
    ` + H.P(R`Manche Wahrscheinlichkeiten sind mühsam oder (mit deinen bisherigen Mitteln) gar nicht zu berechnen. <b>Wie kommst du trotzdem zu einem verlässlichen Zahlenwert, und wie verlässlich ist er?</b>`)
    + H.V("v-8-4", R`Du willst einen Freiwurf mit Trefferwahrscheinlichkeit 70 % durch eine Zufallsziffer (0 bis 9, alle gleich wahrscheinlich) ersetzen. Wie ordnest du zu?`, 0, [
      [R`Die Ziffern 0 bis 6 bedeuten „Treffer“, die Ziffern 7 bis 9 „daneben“.`, R`Genau. Sieben von zehn gleich wahrscheinlichen Ziffern stehen für „Treffer“, also ist $P(\text{Treffer})=\frac{7}{10}$. Du hättest auch sieben andere Ziffern wählen können.`],
      [R`Die Ziffer 7 bedeutet „Treffer“, alle anderen „daneben“.`, R`Dann wäre $P(\text{Treffer})=\frac{1}{10}$. Die Ziffer selbst spielt keine Rolle, es kommt auf den <i>Anteil</i> der Ziffern an, die „Treffer“ bedeuten.`],
      [R`Gerade Ziffern bedeuten „Treffer“, ungerade „daneben“.`, R`Dann wäre $P(\text{Treffer})=\frac{5}{10}=50\,\%$. Für 70 % müssen sieben der zehn Ziffern „Treffer“ bedeuten.`]
    ]) + R`
    <h3>Entdecken: Freiwürfe mit dem Ziffernrad</h3>
    <figure class="nv-figure"><div data-an="w-sim-freiwurf"></div><figcaption>Abb. 1: Das Rad liefert Zufallsziffern. Drei Ziffern nacheinander stehen für drei Freiwürfe.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Sieh dir einen Versuch mit Animation an: Drei Ziffern werden gedreht, die grünen Ziffern (0 bis 6) zählen als Treffer. Führe dann 100 Versuche durch und notiere die relative Häufigkeit von „mindestens 2 Treffer“. Setze zurück und wiederhole das dreimal. <b>Wie stark unterscheiden sich deine vier Schätzwerte?</b> Wiederhole das Ganze mit je 1000 Versuchen.</p></div>
    <p>Bei je 100 Versuchen erhältst du Werte wie $0{,}74$, $0{,}81$ oder $0{,}79$. Bei je 1000 Versuchen liegen die Werte viel enger zusammen, etwa zwischen $0{,}77$ und $0{,}80$. Hier kannst du die Wahrscheinlichkeit auch mit den Pfadregeln berechnen und so die Simulation überprüfen: Zu „mindestens 2 Treffer“ gehören der Pfad mit drei Treffern und die drei Pfade mit genau zwei Treffern.</p>
    $$P(\text{mindestens 2 Treffer})=0{,}7^3+3\cdot0{,}7^2\cdot0{,}3=0{,}343+0{,}441=0{,}784$$

    <h3>So planst du eine Simulation</h3>
    <ol>
      <li><b>Modell festlegen.</b> Welches Zufallsgerät ersetzt einen Schritt des echten Experiments? Lege die Zuordnung so fest, dass die Wahrscheinlichkeiten stimmen (zum Beispiel Ziffern 0 bis 6 für 70 %).</li>
      <li><b>Einen Versuch festlegen.</b> Was gehört zu einem Durchgang (hier: drei Ziffern), und wann gilt das Ereignis als eingetreten (hier: mindestens zwei Ziffern von 0 bis 6)?</li>
      <li><b>Oft wiederholen.</b> Je mehr Versuche, desto besser. Mit einem Rechner sind 1000 Versuche kein Problem.</li>
      <li><b>Auswerten.</b> Die relative Häufigkeit des Ereignisses ist der Schätzwert für seine Wahrscheinlichkeit.</li>
      <li><b>Genauigkeit beurteilen.</b> Wie stark kann der Schätzwert noch schwanken?</li>
    </ol>
    <p>Für andere Wahrscheinlichkeiten passt du das Modell an. Für $25\,\%$ nimmst du zweistellige Zufallszahlen von 00 bis 99 und lässt 00 bis 24 „Erfolg“ bedeuten. Für $\frac16$ nimmst du einen Würfel. Auf dem TI-Nspire erzeugt der Befehl <span class="mono">randInt(0,9,3)</span> drei Zufallsziffern auf einmal, <span class="mono">randInt(1,6)</span> ersetzt einen Würfel.</p>

    <h3>Wie genau ist eine Simulation?</h3>
    <p>Eine Simulation ist selbst ein Zufallsexperiment, ihr Ergebnis schwankt. Als Faustregel gilt: Bei $n$ Versuchen weicht die relative Häufigkeit meist um höchstens etwa $\frac{1}{\sqrt n}$ von der Wahrscheinlichkeit ab.</p>
    <div class="nv-table-wrap"><table class="nv-table">
      <tr><th>Anzahl der Versuche $n$</th><td>100</td><td>400</td><td>1000</td><td>10 000</td></tr>
      <tr><th>übliche Schwankung $\frac{1}{\sqrt n}$</th><td>$0{,}10$</td><td>$0{,}05$</td><td>$\approx0{,}03$</td><td>$0{,}01$</td></tr>
    </table></div>
    <p>Du siehst: Für die halbe Schwankung brauchst du <b>viermal</b> so viele Versuche. Wer eine weitere Nachkommastelle sicher haben will, braucht hundertmal so viele. (Warum gerade die Wurzel auftaucht, zeigt später die Binomialverteilung.)</p>

    <h3>Wenn Rechnen schwierig wird: zwei berühmte Probleme</h3>
    <p><b>Das Sammelproblem.</b> In jeder Packung liegt eine von sechs Sammelfiguren, jede gleich wahrscheinlich. Wie viele Packungen musst du im Mittel kaufen, bis du alle sechs hast? Das Modell: Ein Würfelwurf ersetzt eine Packung, du würfelst, bis jede Augenzahl mindestens einmal gefallen ist.</p>
    <figure class="nv-figure"><div data-an="w-sim-sammeln"></div><figcaption>Abb. 2: Ein Versuch ist beendet, wenn alle sechs Augenzahlen mindestens einmal gefallen sind.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Schätze zuerst: Wie viele Würfe braucht man im Mittel? Sieh dir einen Versuch mit Animation an und führe dann 1000 Versuche durch. <b>Wo pendelt sich der Mittelwert ein? Wie oft dauert es länger als 25 Würfe?</b></p></div>
    <p>Der Mittelwert pendelt sich bei etwa $14{,}7$ ein. Das ist viel mehr, als die meisten schätzen: Die letzten fehlenden Figuren kosten die meiste Geduld. Wenn nur noch eine Figur fehlt, braucht man im Mittel allein dafür sechs weitere Packungen.</p>
    <p><b>Das Geburtstagsproblem.</b> In einer Klasse sind 23 Personen. Wie wahrscheinlich ist es, dass mindestens zwei am selben Tag Geburtstag haben? Das Modell: Jede Person erhält eine Zufallszahl von 1 bis 365.</p>
    <figure class="nv-figure"><div data-an="w-sim-geburtstag" data-k="23"></div><figcaption>Abb. 3: Der Kalender zeigt die zufälligen Geburtstage. Rote Säulen sind gemeinsame Geburtstage.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Führe 1000 Versuche mit 23 Personen durch. Verändere dann die Gruppengröße. <b>Ab welcher Gruppengröße haben in mehr als 90 % der Versuche zwei Personen am selben Tag Geburtstag?</b></p></div>
    <p>Schon bei 23 Personen liegt die Wahrscheinlichkeit knapp über 50 %, bei 41 Personen über 90 %. Das Modell vereinfacht allerdings: Es ignoriert den 29. Februar und nimmt an, dass alle Tage gleich häufig Geburtstage sind. Solche <b>Modellannahmen</b> gehören zu jeder Simulation, und du solltest sie nennen können.</p>

    <div class="nv-merke"><p><b>Merke:</b> Bei einer Simulation ersetzt du ein Zufallsexperiment durch ein Modell mit denselben Wahrscheinlichkeiten und wiederholst es sehr oft. Die relative Häufigkeit ist ein <b>Schätzwert</b> für die Wahrscheinlichkeit. Seine Schwankung beträgt etwa $\frac{1}{\sqrt n}$.</p></div>
    <div class="nv-fehler"><p><b>Häufige Fehler</b></p><ul>
      <li><b>Zuordnung passt nicht zur Wahrscheinlichkeit.</b> Für 70 % müssen 7 von 10 Ziffern „Erfolg“ bedeuten. „0 bis 7“ sind acht Ziffern und ergeben 80 %.</li>
      <li><b>Zu wenige Versuche.</b> Aus 20 Versuchen lässt sich keine Wahrscheinlichkeit auf zwei Nachkommastellen ablesen. Die Schwankung beträgt dort über $0{,}2$.</li>
      <li><b>Schätzwert für den exakten Wert gehalten.</b> $0{,}79$ aus einer Simulation bedeutet „ungefähr $0{,}79$“. Schreibe „$\approx$“ und gib die Versuchszahl an.</li>
      <li><b>Modellannahmen verschwiegen.</b> Die Simulation rechnet mit unabhängigen Würfen und gleichbleibender Trefferquote. Ob das für eine echte Spielerin gilt, muss man diskutieren.</li>
    </ul></div>
    <div data-an="quiz" data-quiz="k8-4"></div>
  `, false, "8-4");
  };
})();
