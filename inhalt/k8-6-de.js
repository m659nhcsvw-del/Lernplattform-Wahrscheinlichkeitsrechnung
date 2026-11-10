/* Kapitel 8, Teil 6 — 8.6 Erwartungswert und Standardabweichung */
(function () {
  const R = String.raw, H = AN.H;

  AN.QUIZ["k8-6"] = [
    { t: "num", q: R`Ein Würfel wird geworfen, $X$ ist die Augenzahl. Berechne den Erwartungswert $E(X)$.`, a: 3.5, tol: 0.01, why: R`$E(X)=\frac16\cdot(1+2+3+4+5+6)=\frac{21}{6}=3{,}5$. Der Erwartungswert muss kein Wert sein, den $X$ annehmen kann.` },
    { t: "num", q: R`Bei einer Lotterie gewinnt $1\,\%$ der Lose 50 €, $10\,\%$ der Lose gewinnen 5 €, der Rest sind Nieten. Ein Los kostet 2 €. Berechne den Erwartungswert des <b>Gewinns</b> (Auszahlung minus Lospreis) in Euro.`, a: -1, tol: 0.01, why: R`Erwartete Auszahlung: $0{,}01\cdot50+0{,}10\cdot5+0{,}89\cdot0=0{,}5+0{,}5=1$ €. Abzüglich des Lospreises: $1-2=-1$ €. Im Mittel verliert man pro Los 1 €.` },
    { q: R`Der Erwartungswert einer Auszahlung beträgt $1{,}75$ €. Was bedeutet das?`, o: [R`Bei jedem Spiel erhält man $1{,}75$ €.`, R`$1{,}75$ € ist die wahrscheinlichste Auszahlung.`, R`Bei sehr vielen Spielen erhält man im Mittel etwa $1{,}75$ € pro Spiel.`], a: 2, why: R`Der Erwartungswert ist eine Vorhersage für den Mittelwert bei sehr vielen Wiederholungen. Im einzelnen Spiel kommt der Wert $1{,}75$ € vielleicht gar nicht vor.` },
    { t: "num", q: R`$X$ nimmt die Werte 0 und 2 jeweils mit Wahrscheinlichkeit $0{,}5$ an. Berechne die Standardabweichung $\sigma$.`, a: 1, tol: 0.01, why: R`$\mu=0\cdot0{,}5+2\cdot0{,}5=1$. Varianz: $(0-1)^2\cdot0{,}5+(2-1)^2\cdot0{,}5=1$. Also $\sigma=\sqrt1=1$: Jeder Wert liegt genau 1 vom Erwartungswert entfernt.` },
    { q: R`Wann heißt ein Spiel fair?`, o: [R`Wenn Gewinnen und Verlieren gleich wahrscheinlich sind`, R`Wenn der Erwartungswert des Gewinns 0 ist, der Einsatz also gleich der erwarteten Auszahlung ist`, R`Wenn die höchste Auszahlung größer als der Einsatz ist`], a: 1, why: R`Fair heißt: Auf lange Sicht gewinnt und verliert keine Seite. Das ist genau dann der Fall, wenn der erwartete Gewinn 0 beträgt. Die Wahrscheinlichkeiten für Gewinn und Verlust dürfen dabei sehr verschieden sein.` }
  ];

  window.WS_K8_6_DE = function (S) {
    return S("8.6&nbsp;·&nbsp;Erwartungswert und Standardabweichung", R`
    <p>Das Glücksrad aus Abschnitt 8.5 zahlt 0 €, 1 €, 2 € oder 5 € aus. Auf dem Schulfest soll ein Spiel 2 € kosten. Lohnt sich das für dich? Und lohnt es sich für die Klasse, die das Rad betreibt? Für eine Antwort brauchst du <b>eine einzige Zahl</b>, die sagt, was das Rad „im Durchschnitt“ auszahlt.</p>
    ` + H.P(R`Eine Wahrscheinlichkeitsverteilung besteht aus vielen Zahlen. <b>Wie fasst du sie in einer Kennzahl für „das, was im Mittel herauskommt“ zusammen, und in einer zweiten Kennzahl dafür, wie stark die Werte um dieses Mittel streuen?</b>`)
    + H.V("v-8-6", R`Das Rad hat acht gleich große Felder: fünfmal 0 €, je einmal 1 €, 2 € und 5 €. Du spielst sehr oft. Wie viel wird dir im Mittel <b>pro Spiel</b> ausgezahlt?`, 1, [
      [R`0 €, denn das ist die häufigste Auszahlung.`, R`0 € ist der wahrscheinlichste <i>einzelne</i> Wert. Aber in drei von acht Spielen bekommst du etwas. Auf viele Spiele verteilt ist das mehr als nichts. Rechne für 8 Spiele: $0+0+0+0+0+1+2+5=8$ €.`],
      [R`1 €.`, R`Genau. Bei 8 „idealen“ Spielen kommt jedes Feld einmal: $5\cdot0+1+2+5=8$ €, also 1 € pro Spiel. Bei 2 € Einsatz verlierst du im Mittel 1 € pro Spiel.`],
      [R`2 €, denn das ist der Mittelwert der vier Beträge 0, 1, 2 und 5.`, R`$\frac{0+1+2+5}{4}=2$ wäre richtig, wenn alle vier Beträge gleich wahrscheinlich wären. Die 0 kommt aber fünfmal so oft vor wie jeder andere Betrag. Du musst die Beträge mit ihren Wahrscheinlichkeiten <i>gewichten</i>.`]
    ]) + R`
    <h3>Entdecken: Was bringt das Spiel auf Dauer?</h3>
    <figure class="nv-figure"><div data-an="w-rad" data-sektoren="0:2;1:1;0:2;2:1;0:1;5:1" data-einsatz="2"></div><figcaption>Abb. 1: Dasselbe Glücksrad, jedes Spiel kostet 2 € Einsatz. $X$ = Gewinn = Auszahlung minus Einsatz.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Spiele zehnmal und notiere deinen Kontostand. Spiele dann 1000-mal. <b>Bei welchem Wert pendelt sich der mittlere Gewinn pro Spiel ein?</b> Wie viel hast du nach 1000 Spielen ungefähr verloren?</p></div>
    <p>Nach zehn Spielen kannst du Glück gehabt haben. Nach 1000 Spielen liegt der mittlere Gewinn aber sehr nah bei $-1$ €: Du hast etwa 1000 € verloren. Dieses „Mittel auf lange Sicht“ lässt sich ohne Simulation aus der Verteilung berechnen.</p>

    <h3>Der Erwartungswert</h3>
    <p>Stell dir 8000 Spiele vor. Bei etwa $\frac58$ davon (5000 Spiele) ist die Auszahlung 0 €, bei je etwa 1000 Spielen 1 €, 2 € und 5 €. Die gesamte Auszahlung ist dann ungefähr $5000\cdot0+1000\cdot1+1000\cdot2+1000\cdot5=8000$ €, also 1 € pro Spiel. Teilst du diese Rechnung durch 8000, steht dort:</p>
    $$0\cdot\frac58+1\cdot\frac18+2\cdot\frac18+5\cdot\frac18=1$$
    <p>Jeder Wert wird mit seiner Wahrscheinlichkeit multipliziert, dann wird addiert. Die Wahrscheinlichkeiten wirken als <b>Gewichte</b>.</p>
    <div class="nv-def"><p><b>Definition.</b> Nimmt die Zufallsgröße $X$ die Werte $x_1, x_2, \dots, x_n$ an, dann heißt</p>
      $$E(X)=\mu=x_1\cdot P(X=x_1)+x_2\cdot P(X=x_2)+\dots+x_n\cdot P(X=x_n)$$
      <p>der <b>Erwartungswert</b> von $X$. Er gibt an, welchen Mittelwert man bei sehr vielen Wiederholungen erwarten kann. ($\mu$ ist der griechische Buchstabe „mü“.)</p></div>
    <p>Für den Gewinn $G$ bei 2 € Einsatz ziehst du von jedem Wert 2 ab und erhältst $E(G)=(-2)\cdot\frac58+(-1)\cdot\frac18+0\cdot\frac18+3\cdot\frac18=-1$. Das geht auch kürzer: $E(G)=E(X)-2=1-2=-1$. Ein Spiel heißt <b>fair</b>, wenn der Erwartungswert des Gewinns 0 ist. Dieses Rad wäre bei einem Einsatz von 1 € fair.</p>
    <p>Achte auf die Deutung: Der Erwartungswert ist <i>nicht</i> der wahrscheinlichste Wert (das wäre hier 0 €) und muss im einzelnen Spiel gar nicht vorkommen. Beim Würfeln ist $E(X)=3{,}5$, und eine $3{,}5$ kann man nicht würfeln.</p>

    <div class="nv-example"><p><b>Beispiel 1 (drei Münzen).</b> $X$ ist die Anzahl der Münzen mit „Wappen“ bei drei Münzen. Berechne $E(X)$.</p>
      <p>Mit der Verteilung aus Abschnitt 8.5: $E(X)=0\cdot\frac18+1\cdot\frac38+2\cdot\frac38+3\cdot\frac18=\frac{0+3+6+3}{8}=\frac{12}{8}=1{,}5$.</p>
      <p><b>Ergebnis:</b> Bei sehr vielen Würfen zeigen im Mittel $1{,}5$ der drei Münzen „Wappen“. Das passt zur Anschauung: die Hälfte von drei.</p></div>

    <h3>Gleicher Erwartungswert, ganz verschiedene Spiele</h3>
    <p>Vergleiche drei Spiele, die alle im Mittel 1 € auszahlen. <b>Spiel A:</b> Du bekommst sicher 1 €. <b>Spiel B:</b> Münzwurf, bei „Wappen“ 2 €, bei „Zahl“ 0 €. <b>Spiel C:</b> das Glücksrad. Der Erwartungswert ist jedes Mal 1 €, trotzdem fühlen sich die Spiele verschieden an: Bei A gibt es keine Überraschung, bei C liegt die Auszahlung manchmal weit vom Mittel entfernt. Dafür brauchst du eine zweite Kennzahl, die die <b>Streuung</b> misst.</p>
    <p>Die Idee: Du misst für jeden Wert den Abstand zum Erwartungswert, $x_i-\mu$. Damit sich positive und negative Abweichungen nicht aufheben, quadrierst du sie. Dann bildest du wieder den gewichteten Mittelwert. Das Ergebnis heißt Varianz. Weil dabei die Einheit quadriert wird (Euro²), ziehst du am Ende die Wurzel.</p>
    <div class="nv-def"><p><b>Definition.</b> Die <b>Varianz</b> von $X$ ist die mittlere quadratische Abweichung vom Erwartungswert:</p>
      $$V(X)=(x_1-\mu)^2\cdot P(X=x_1)+\dots+(x_n-\mu)^2\cdot P(X=x_n)$$
      <p>Die <b>Standardabweichung</b> ist $\sigma=\sqrt{V(X)}$ („sigma“). Sie hat dieselbe Einheit wie $X$ und gibt an, wie weit die Werte typischerweise vom Erwartungswert entfernt liegen.</p></div>
    ` + H.ST(R`Standardabweichung der Auszahlung beim Glücksrad ($\mu=1$)`, [
      R`<b>Tabelle anlegen.</b> Schreibe zu jedem Wert $x_i$ die Wahrscheinlichkeit: $0$ mit $\frac58$, $1$ mit $\frac18$, $2$ mit $\frac18$, $5$ mit $\frac18$.`,
      R`<b>Abweichungen vom Erwartungswert.</b> $x_i-\mu$: $\;-1;\;0;\;1;\;4$.`,
      R`<b>Quadrieren.</b> $(x_i-\mu)^2$: $\;1;\;0;\;1;\;16$.`,
      R`<b>Gewichten und addieren.</b> $V(X)=1\cdot\frac58+0\cdot\frac18+1\cdot\frac18+16\cdot\frac18=\frac{5+0+1+16}{8}=\frac{22}{8}=2{,}75$.`,
      R`<b>Wurzel ziehen.</b> $\sigma=\sqrt{2{,}75}\approx1{,}66$ €. Die Auszahlung liegt typischerweise etwa $1{,}66$ € vom Erwartungswert 1 € entfernt.`
    ]) + R`
    <div class="nv-table-wrap"><table class="nv-table">
      <tr><th>Spiel</th><th>Erwartungswert $\mu$</th><th>Varianz</th><th>Standardabweichung $\sigma$</th></tr>
      <tr><td class="l">A: sicher 1 €</td><td>1 €</td><td>0</td><td>0 €</td></tr>
      <tr><td class="l">B: Münze, 0 € oder 2 €</td><td>1 €</td><td>1</td><td>1 €</td></tr>
      <tr><td class="l">C: Glücksrad</td><td>1 €</td><td>$2{,}75$</td><td>$\approx1{,}66$ €</td></tr>
    </table></div>
    <p>Je größer $\sigma$, desto riskanter das Spiel: Es gibt größere Ausschläge nach oben und nach unten. Wird von jedem Wert derselbe Betrag abgezogen (zum Beispiel der Einsatz), verschiebt sich $\mu$ um diesen Betrag, aber $\sigma$ bleibt gleich. Denn die Abstände zum Erwartungswert ändern sich nicht.</p>

    <div class="nv-example"><p><b>Beispiel 2 (ein Würfel).</b> $X$ ist die Augenzahl. Berechne $\mu$ und $\sigma$.</p>
      <p>$\mu=\frac{1+2+3+4+5+6}{6}=3{,}5$. Die Abweichungen sind $\pm2{,}5$; $\pm1{,}5$; $\pm0{,}5$, ihre Quadrate $6{,}25$; $2{,}25$; $0{,}25$ (jeweils zweimal).</p>
      <p>$V(X)=\frac{2\cdot(6{,}25+2{,}25+0{,}25)}{6}=\frac{17{,}5}{6}\approx2{,}92$ und $\sigma=\sqrt{2{,}92}\approx1{,}71$.</p>
      <p><b>Ergebnis:</b> Die Augenzahl liegt im Mittel bei $3{,}5$ und streut typischerweise um etwa $1{,}7$ darum.</p></div>
    <p class="an-hint">Rechner-Tipp: Trage die Werte in eine Liste und die Wahrscheinlichkeiten in eine zweite Liste ein. Die Statistik mit einer Variablen (mit der zweiten Liste als Häufigkeit) liefert $\bar x=\mu$ und $\sigma_x=\sigma$.</p>

    <div class="nv-merke"><p><b>Merke:</b> Erwartungswert $\mu=\sum x_i\cdot P(X=x_i)$: Mittelwert auf lange Sicht. Varianz $V(X)=\sum (x_i-\mu)^2\cdot P(X=x_i)$, Standardabweichung $\sigma=\sqrt{V(X)}$: Maß für die Streuung. Ein Spiel ist fair, wenn der Erwartungswert des Gewinns 0 ist.</p></div>
    <div class="nv-fehler"><p><b>Häufige Fehler</b></p><ul>
      <li><b>Ungewichteter Mittelwert.</b> $\frac{0+1+2+5}{4}=2$ ist falsch, weil die Werte nicht gleich wahrscheinlich sind. Jeder Wert wird mit seiner Wahrscheinlichkeit multipliziert.</li>
      <li><b>Erwartungswert als wahrscheinlichsten Wert gedeutet.</b> $\mu$ sagt etwas über den Mittelwert vieler Versuche und nichts über den nächsten Versuch.</li>
      <li><b>Einsatz vergessen.</b> Für die Frage „Lohnt sich das Spiel?“ zählt der Gewinn, also Auszahlung minus Einsatz.</li>
      <li><b>Bei der Varianz nicht quadriert oder nicht gewichtet.</b> Erst die Abweichung quadrieren, dann mit der Wahrscheinlichkeit multiplizieren, dann addieren.</li>
      <li><b>Wurzel vergessen.</b> $2{,}75$ ist die Varianz. Die Standardabweichung ist $\sqrt{2{,}75}\approx1{,}66$.</li>
    </ul></div>
    <div data-an="quiz" data-quiz="k8-6"></div>
  `, false, "8-6");
  };
})();
