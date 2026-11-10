/* Kapitel 8, Teil 3 — 8.3 Stochastische Unabhängigkeit */
(function () {
  const R = String.raw, H = AN.H;

  AN.QUIZ["k8-3"] = [
    { t: "num", q: R`$A$ und $B$ sind stochastisch unabhängig mit $P(A)=0{,}3$ und $P(B)=0{,}5$. Berechne $P(A\cap B)$.`, a: 0.15, tol: 0.001, why: R`Bei Unabhängigkeit gilt $P(A\cap B)=P(A)\cdot P(B)=0{,}3\cdot0{,}5=0{,}15$.` },
    { q: R`Es ist $P(A)=0{,}4$, $P(B)=0{,}5$ und $P(A\cap B)=0{,}25$. Sind $A$ und $B$ stochastisch unabhängig?`, o: [R`Ja, denn $0{,}4+0{,}5&lt;1$.`, R`Nein, denn $P(A)\cdot P(B)=0{,}2\ne0{,}25$.`, R`Das kann man ohne Baumdiagramm nicht entscheiden.`], a: 1, why: R`Der Test ist immer derselbe: Produkt bilden und mit $P(A\cap B)$ vergleichen. Hier ist $0{,}4\cdot0{,}5=0{,}2$, aber $P(A\cap B)=0{,}25$. Die Ereignisse treten häufiger gemeinsam auf, als es bei Unabhängigkeit der Fall wäre.` },
    { q: R`$A$ und $B$ können nicht gleichzeitig eintreten (sie sind unvereinbar), und beide haben eine positive Wahrscheinlichkeit. Dann sind $A$ und $B$ …`, o: [R`… stochastisch unabhängig, denn sie haben nichts miteinander zu tun.`, R`… stochastisch abhängig, denn wenn $A$ eintritt, ist $B$ ausgeschlossen.`, R`… manchmal abhängig, manchmal unabhängig.`], a: 1, why: R`Unvereinbar heißt $P(A\cap B)=0$. Das Produkt $P(A)\cdot P(B)$ ist aber größer als 0. Die Information „$A$ ist eingetreten“ ändert die Wahrscheinlichkeit von $B$ sogar maximal: von $P(B)$ auf 0.` },
    { t: "num", q: R`$A$ und $B$ sind unabhängig mit $P(A)=0{,}3$ und $P(B)=0{,}5$. Berechne $P(A\cup B)$.`, a: 0.65, tol: 0.001, why: R`Additionssatz: $P(A\cup B)=P(A)+P(B)-P(A\cap B)=0{,}3+0{,}5-0{,}15=0{,}65$.` },
    { q: R`Aus einer Urne mit 3 roten und 2 blauen Kugeln wird zweimal <b>ohne</b> Zurücklegen gezogen. Sind „1. Kugel rot“ und „2. Kugel rot“ unabhängig?`, o: [R`Ja, denn beide haben die Wahrscheinlichkeit $0{,}6$.`, R`Nein, denn $P_{\text{1. rot}}(\text{2. rot})=\frac24$ ist nicht gleich $P(\text{2. rot})=\frac35$.`, R`Ja, denn die Kugeln beeinflussen sich nicht gegenseitig.`], a: 1, why: R`Beide Ereignisse haben zwar dieselbe Wahrscheinlichkeit $0{,}6$, aber die Information über den ersten Zug ändert die Wahrscheinlichkeit für den zweiten: $\frac24\ne\frac35$. Mit Zurücklegen wären die Züge unabhängig.` }
  ];

  window.WS_K8_3_DE = function (S) {
    return S("8.3&nbsp;·&nbsp;Stochastische Unabhängigkeit", R`
    <p>„Wer viel Sport treibt, hat seltener Rückenschmerzen.“ „Linkshänder tragen genauso oft eine Brille wie Rechtshänder.“ Im ersten Satz hängen zwei Merkmale zusammen, im zweiten nicht. Im Alltag sagt man dazu „das eine hat mit dem anderen (nichts) zu tun“. In der Stochastik kannst du das <b>nachrechnen</b>.</p>
    ` + H.P(R`In Abschnitt 8.2 hat eine Information die Wahrscheinlichkeit verändert. Manchmal ändert eine Information aber gar nichts. <b>Woran erkennst du rechnerisch, ob zwei Ereignisse einander beeinflussen oder nicht?</b>`)
    + H.V("v-8-3", R`Aus einer Urne mit 3 roten und 2 blauen Kugeln wird zweimal gezogen. Vergleiche die Wahrscheinlichkeit für „die <b>zweite</b> Kugel ist rot“ beim Ziehen mit und ohne Zurücklegen.`, 2, [
      [R`Ohne Zurücklegen ist sie kleiner, weil vielleicht schon eine rote Kugel fehlt.`, R`Es kann auch eine blaue Kugel fehlen, dann ist Rot sogar wahrscheinlicher. Beides gleicht sich genau aus: $\frac35\cdot\frac24+\frac25\cdot\frac34=\frac{12}{20}=0{,}6$. Prüfe es unten mit 1000 Versuchen.`],
      [R`Ohne Zurücklegen ist sie größer, weil nur noch 4 Kugeln in der Urne liegen.`, R`Der Nenner wird kleiner, aber manchmal auch der Zähler. Insgesamt ergibt sich $\frac35\cdot\frac24+\frac25\cdot\frac34=0{,}6$, genau wie mit Zurücklegen.`],
      [R`In beiden Fällen ist sie $0{,}6$.`, R`Genau, und das überrascht viele. Der Unterschied liegt woanders: Ohne Zurücklegen <i>hängt</i> die Wahrscheinlichkeit für den zweiten Zug davon ab, was beim ersten Zug passiert ist. Mit Zurücklegen nicht. Darum geht es in diesem Abschnitt.`]
    ]) + R`
    <h3>Entdecken: Ändert der erste Zug etwas?</h3>
    <figure class="nv-figure"><div data-an="w-urne" data-r="3" data-b="2" data-zurueck="1" data-ev="zweiterot"></div><figcaption>Abb. 1: Zweimal ziehen. Oben stellst du „mit Zurücklegen“ oder „ohne Zurücklegen“ ein.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Führe 1000 Versuche <b>mit Zurücklegen</b> durch und lies die graue Zeile: Wie oft ist die 2. Kugel rot nach roter 1. Kugel, wie oft nach blauer 1. Kugel? Stelle dann auf <b>ohne Zurücklegen</b> um und wiederhole. <b>In welchem Fall unterscheiden sich die beiden Anteile?</b></p></div>
    <p>Mit Zurücklegen liegen beide Anteile bei $0{,}6$, egal was beim ersten Zug kam. Ohne Zurücklegen findest du etwa $0{,}5$ (nach Rot) und $0{,}75$ (nach Blau). Im ersten Fall liefert der erste Zug keine Information über den zweiten. Im zweiten Fall schon. Genau das ist der Unterschied zwischen unabhängig und abhängig.</p>

    <h3>Die Definition</h3>
    <p>„Die Information $B$ ändert nichts an der Wahrscheinlichkeit von $A$“ heißt in Formeln $P_B(A)=P(A)$. Setzt du die Definition der bedingten Wahrscheinlichkeit ein, erhältst du $\frac{P(A\cap B)}{P(B)}=P(A)$ und daraus durch Multiplizieren mit $P(B)$ eine Gleichung, in der $A$ und $B$ gleichberechtigt vorkommen:</p>
    <div class="nv-def"><p><b>Definition.</b> Zwei Ereignisse $A$ und $B$ heißen <b>stochastisch unabhängig</b>, wenn gilt:</p>
      $$P(A\cap B)=P(A)\cdot P(B)$$
      <p>Gleichwertig dazu (für $P(B)&gt;0$): $P_B(A)=P(A)$. Gilt die Gleichung nicht, heißen die Ereignisse <b>stochastisch abhängig</b>.</p></div>
    <p>Du hast also zwei Wege für die Prüfung. <b>Weg 1:</b> Berechne $P(A)\cdot P(B)$ und vergleiche mit $P(A\cap B)$. <b>Weg 2:</b> Vergleiche $P_B(A)$ mit $P(A)$. Beide Wege führen immer zum selben Urteil. Im Baumdiagramm erkennst du Unabhängigkeit daran, dass in der zweiten Stufe an beiden Teilbäumen <b>dieselben</b> Wahrscheinlichkeiten stehen.</p>

    <div class="nv-example"><p><b>Beispiel 1 (ein Würfel).</b> $A$: „gerade Augenzahl“ $=\{2;4;6\}$, $B$: „mindestens 5“ $=\{5;6\}$, $C$: „mindestens 4“ $=\{4;5;6\}$. Prüfe $A$ und $B$ sowie $A$ und $C$ auf Unabhängigkeit.</p>
      <p>$A\cap B=\{6\}$, also $P(A\cap B)=\frac16$. Das Produkt ist $P(A)\cdot P(B)=\frac12\cdot\frac13=\frac16$. Beide Werte stimmen überein: $A$ und $B$ sind <b>unabhängig</b>.</p>
      <p>$A\cap C=\{4;6\}$, also $P(A\cap C)=\frac26=\frac13$. Das Produkt ist $P(A)\cdot P(C)=\frac12\cdot\frac12=\frac14$. Die Werte sind verschieden: $A$ und $C$ sind <b>abhängig</b>.</p>
      <p><b>Deutung:</b> Unter den Zahlen ab 5 ist genau die Hälfte gerade, wie unter allen Zahlen. Unter den Zahlen ab 4 sind aber zwei von drei gerade. Die Information „mindestens 4“ macht „gerade“ wahrscheinlicher.</p></div>

    <h3>Unabhängigkeit mit der Vierfeldertafel prüfen</h3>
    <div class="nv-example"><p><b>Beispiel 2 (Umfrage).</b> Von 200 Jugendlichen tragen 60 eine Brille ($B$). 20 sind Linkshänder ($L$), 6 davon tragen eine Brille.</p>
      <div class="nv-table-wrap"><table class="nv-table">
        <tr><th></th><th>$L$</th><th>$\overline{L}$</th><th>Summe</th></tr>
        <tr><th>$B$</th><td>6</td><td>54</td><td>60</td></tr>
        <tr><th>$\overline{B}$</th><td>14</td><td>126</td><td>140</td></tr>
        <tr><th>Summe</th><td>20</td><td>180</td><td>200</td></tr>
      </table></div>
      <p>$P(B)=\frac{60}{200}=0{,}3$, $P(L)=\frac{20}{200}=0{,}1$ und $P(B\cap L)=\frac{6}{200}=0{,}03$. Das Produkt ist $0{,}3\cdot0{,}1=0{,}03$.</p>
      <p><b>Ergebnis:</b> $P(B\cap L)=P(B)\cdot P(L)$. In dieser Umfrage sind „Brille“ und „Linkshänder“ stochastisch unabhängig. Kontrolle mit Weg 2: Unter den Linkshändern tragen $\frac{6}{20}=30\,\%$ eine Brille, genau wie in der ganzen Gruppe.</p></div>
    <p>Bei echten Daten stimmen die beiden Werte fast nie exakt überein. Dann beurteilst du, ob die Abweichung klein ist („näherungsweise unabhängig“) oder deutlich. Und noch etwas ist wichtig: Stochastische Abhängigkeit sagt nichts über <b>Ursache und Wirkung</b>. Wenn Eisverkauf und Sonnenbrand zusammenhängen, verursacht das Eis nicht den Sonnenbrand. Beides hängt vom Wetter ab.</p>

    <h3>Unabhängige Wiederholungen</h3>
    <p>Wird ein Zufallsexperiment mehrfach unter gleichen Bedingungen wiederholt (Würfeln, Münzwurf, Ziehen <i>mit</i> Zurücklegen), dann sind die einzelnen Durchgänge unabhängig. Die Wahrscheinlichkeiten in jeder Stufe des Baums bleiben gleich, und du darfst einfach multiplizieren: Die Wahrscheinlichkeit für dreimal „6“ hintereinander ist $\frac16\cdot\frac16\cdot\frac16=\frac1{216}$. In Sachaufgaben steht die Unabhängigkeit oft als Annahme im Text („Die Bauteile fallen unabhängig voneinander aus“). Dann darfst du so rechnen, solltest aber prüfen können, ob die Annahme vernünftig ist.</p>

    <div class="nv-merke"><p><b>Merke:</b> $A$ und $B$ sind stochastisch unabhängig genau dann, wenn $P(A\cap B)=P(A)\cdot P(B)$. Gleichwertig: $P_B(A)=P(A)$. Unabhängigkeit wird <b>nachgerechnet</b> und nicht nach Gefühl entschieden.</p></div>
    <div class="nv-fehler"><p><b>Häufige Fehler</b></p><ul>
      <li><b>„Unabhängig“ mit „unvereinbar“ verwechselt.</b> Unvereinbare Ereignisse ($A\cap B=\emptyset$) schließen einander aus und sind deshalb stark <i>abhängig</i>. Unabhängige Ereignisse können sehr wohl gleichzeitig eintreten.</li>
      <li><b>Produktregel ohne Prüfung benutzt.</b> $P(A\cap B)=P(A)\cdot P(B)$ gilt nur bei Unabhängigkeit. Allgemein gilt $P(A\cap B)=P(A)\cdot P_A(B)$.</li>
      <li><b>Gleiche Wahrscheinlichkeit für Unabhängigkeit gehalten.</b> Ohne Zurücklegen ist $P(\text{1. rot})=P(\text{2. rot})=0{,}6$, trotzdem sind die Züge abhängig. Entscheidend ist der Vergleich von $P_B(A)$ mit $P(A)$.</li>
      <li><b>Aus Abhängigkeit auf eine Ursache geschlossen.</b> Ein rechnerischer Zusammenhang kann auch durch eine dritte Größe entstehen.</li>
    </ul></div>
    <div data-an="quiz" data-quiz="k8-3"></div>
  `, false, "8-3");
  };
})();
