/* Kapitel 8, Teil 2 — 8.2 Bedingte Wahrscheinlichkeit */
(function () {
  const R = String.raw, H = AN.H;

  AN.QUIZ["k8-2"] = [
    { t: "num", q: R`Von 200 Befragten treiben 80 regelmäßig Sport. 50 dieser 80 sind Nichtraucher. Wie groß ist die Wahrscheinlichkeit, dass eine zufällig gewählte Person <i>unter den Sporttreibenden</i> Nichtraucher ist?`, a: 0.625, tol: 0.002, why: R`Die Bedingung „treibt Sport“ verkleinert die Grundgesamtheit auf 80 Personen. Davon sind 50 Nichtraucher: $P_S(N)=\frac{50}{80}=0{,}625$. Wer durch 200 teilt, berechnet $P(S\cap N)=0{,}25$.` },
    { q: R`Welche Aussage über $P_B(A)$ und $P_A(B)$ stimmt?`, o: [R`Beide sind immer gleich groß.`, R`Sie haben denselben Zähler $P(A\cap B)$, aber verschiedene Nenner, und sind deshalb im Allgemeinen verschieden.`, R`Ihre Summe ist immer 1.`], a: 1, why: R`$P_B(A)=\frac{P(A\cap B)}{P(B)}$ und $P_A(B)=\frac{P(A\cap B)}{P(A)}$. Nur wenn $P(A)=P(B)$ ist, stimmen sie überein. Die Summe 1 ergeben $P_B(A)$ und $P_B(\overline{A})$.` },
    { t: "num", q: R`In einem Haus wird in $1\,\%$ aller Nächte eingebrochen. Die Alarmanlage löst bei einem Einbruch mit $99\,\%$ aus, ohne Einbruch gibt es in $2\,\%$ der Nächte Fehlalarm. Der Alarm geht los. Mit welcher Wahrscheinlichkeit wird wirklich eingebrochen?`, a: 1 / 3, tol: 0.003, why: R`$P(\text{Alarm})=0{,}01\cdot0{,}99+0{,}99\cdot0{,}02=0{,}0099+0{,}0198=0{,}0297$. Davon entfällt $0{,}0099$ auf echte Einbrüche: $\frac{0{,}0099}{0{,}0297}=\frac13$. Zwei von drei Alarmen sind Fehlalarme.` },
    { q: R`Wo stehen in einem zweistufigen Baumdiagramm die bedingten Wahrscheinlichkeiten?`, o: [R`An den Ästen der ersten Stufe`, R`An den Ästen der zweiten Stufe`, R`Am Ende der Pfade`], a: 1, why: R`Ein Ast der zweiten Stufe gilt nur für die Fälle, die den Ast davor genommen haben. Er trägt also eine bedingte Wahrscheinlichkeit. Am Pfadende steht das Produkt, also $P(A\cap B)$.` },
    { t: "num", q: R`Es ist $P(A)=0{,}4$ und $P_A(B)=0{,}25$. Berechne $P(A\cap B)$.`, a: 0.1, tol: 0.001, why: R`Multiplikationssatz (Pfadregel): $P(A\cap B)=P(A)\cdot P_A(B)=0{,}4\cdot0{,}25=0{,}1$.` }
  ];

  window.WS_K8_2_DE = function (S) {
    return S("8.2&nbsp;·&nbsp;Bedingte Wahrscheinlichkeit", R`
    <p>Du machst einen Schnelltest auf eine Krankheit, und er zeigt „positiv“. Auf der Packung steht: „Der Test erkennt 95 % der Erkrankten.“ Bist du jetzt mit 95 % Wahrscheinlichkeit krank? Diese Frage klingt einfach und wird doch sehr oft falsch beantwortet, auch von Erwachsenen. In diesem Abschnitt lernst du das Werkzeug, mit dem du sie sicher beantwortest.</p>
    ` + H.P(R`Du weißt schon etwas über den Ausgang eines Zufallsexperiments, zum Beispiel „der Test ist positiv“ oder „die erste Kugel war rot“. <b>Wie verändert diese Information die Wahrscheinlichkeit eines anderen Ereignisses?</b>`)
    + H.V("v-8-2", R`Von 1000 Personen sind 2 % krank. Der Test erkennt 95 % der Kranken. Von den Gesunden zeigt er bei 10 % fälschlich „positiv“. Eine Person hat ein positives Testergebnis. Wie wahrscheinlich ist sie krank?`, 2, [
      [R`Etwa 95 %, denn so gut erkennt der Test die Kranken.`, R`95 % ist die Wahrscheinlichkeit für „positiv“, <i>wenn man krank ist</i>. Gefragt ist die umgekehrte Richtung: „krank“, <i>wenn der Test positiv ist</i>. Sieh dir unten an, wie viele Gesunde ebenfalls positiv getestet werden.`],
      [R`Etwa 90 %, denn bei 10 % irrt sich der Test.`, R`Die 10 % beziehen sich nur auf die Gesunden. Weil es aber sehr viele Gesunde gibt, sind 10 % von ihnen viel mehr Personen als 95 % der wenigen Kranken. Sieh es dir unten an.`],
      [R`Nur etwa 16 %, denn die meisten positiven Tests stammen von Gesunden.`, R`Genau. Von 1000 Personen sind 20 krank, 19 davon testen positiv. Von den 980 Gesunden testen 98 positiv. Unter den 117 positiv Getesteten sind also nur 19 Kranke: $\frac{19}{117}\approx16\,\%$.`]
    ]) + R`
    <h3>Entdecken: 1000 Personen auf einen Blick</h3>
    <figure class="nv-figure"><div data-an="w-test" data-p="2" data-se="95" data-sp="90"></div><figcaption>Abb. 1: Jede Säule ist eine Person. Rot: krank, blau: gesund. Hohe Säulen haben ein positives Testergebnis.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Tippe auf „Sortieren“. Jetzt stehen links die Kranken und rechts die Gesunden, jeweils zuerst die positiv Getesteten. <b>Vergleiche die Anzahl der hohen roten mit der Anzahl der hohen blauen Säulen.</b> Erzeuge mehrere neue Stichproben. Schiebe dann den Anteil der Kranken auf 20 %: Was passiert mit dem Anteil der Kranken unter den positiv Getesteten?</p></div>
    <p>Die hohen Säulen sind die positiv Getesteten. Nur ein kleiner Teil davon ist rot. Der Grund ist nicht ein schlechter Test, sondern die Zusammensetzung der Gruppe: Es gibt 49-mal so viele Gesunde wie Kranke. Selbst ein kleiner Anteil falsch positiver Gesunder ergibt mehr Personen als fast alle Kranken zusammen.</p>

    <h3>Die Vierfeldertafel</h3>
    <p>Zwei Merkmale mit je zwei Ausprägungen (krank oder gesund, positiv oder negativ) ordnest du in einer <b>Vierfeldertafel</b>. Mit den erwarteten Anzahlen für 1000 Personen sieht sie so aus:</p>
    <div class="nv-table-wrap"><table class="nv-table">
      <tr><th></th><th>Test positiv ($T$)</th><th>Test negativ ($\overline{T}$)</th><th>Summe</th></tr>
      <tr><th>krank ($K$)</th><td><span class="hl-target">19</span></td><td>1</td><td>20</td></tr>
      <tr><th>gesund ($\overline{K}$)</th><td>98</td><td>882</td><td>980</td></tr>
      <tr><th>Summe</th><td><span class="hl-given">117</span></td><td>883</td><td>1000</td></tr>
    </table></div>
    <p>So entsteht die Tafel: 2 % von 1000 sind 20 Kranke. 95 % von 20 sind 19. 10 % von 980 sind 98. Den Rest füllst du durch Subtrahieren und Addieren auf. Jetzt kannst du verschiedene Fragen beantworten, und es kommt darauf an, <b>durch welche Zahl du teilst</b>:</p>
    <ul>
      <li>„Wie groß ist der Anteil der positiv getesteten Kranken an <i>allen</i>?“ $\frac{19}{1000}=0{,}019$. Das ist $P(K\cap T)$.</li>
      <li>„Wie groß ist der Anteil der positiv Getesteten <i>unter den Kranken</i>?“ $\frac{19}{20}=0{,}95$. Das ist $P_K(T)$.</li>
      <li>„Wie groß ist der Anteil der Kranken <i>unter den positiv Getesteten</i>?“ $\frac{19}{117}\approx0{,}162$. Das ist $P_T(K)$.</li>
    </ul>
    <p>Eine Bedingung („unter den …“, „wenn man weiß, dass …“) verkleinert die Grundgesamtheit. Du betrachtest nur noch eine Zeile oder eine Spalte der Tafel und teilst durch deren Summe.</p>
    <div class="nv-def"><p><b>Definition.</b> Die <b>bedingte Wahrscheinlichkeit</b> von $A$ unter der Bedingung $B$ ist</p>
      $$P_B(A)=\frac{P(A\cap B)}{P(B)}\qquad(P(B)&gt;0)$$
      <p>Sprich: „Wahrscheinlichkeit von $A$ unter der Bedingung $B$“. Sie gibt an, wie wahrscheinlich $A$ ist, wenn man schon weiß, dass $B$ eingetreten ist. (In manchen Büchern steht dafür $P(A\,|\,B)$.)</p></div>

    <h3>Bedingte Wahrscheinlichkeiten im Baumdiagramm</h3>
    <p>Stellst du die Definition nach $P(A\cap B)$ um, erhältst du $P(A\cap B)=P(B)\cdot P_B(A)$. Das kennst du schon: Es ist die Pfadmultiplikationsregel. An den Ästen der zweiten Stufe eines Baumdiagramms stehen also immer bedingte Wahrscheinlichkeiten. Du hast sie in Abschnitt 8.1 längst benutzt: Der Bruch $\frac24$ für „zweite Kugel rot“ galt nur unter der Bedingung „erste Kugel rot“.</p>
    <figure class="nv-figure"><div data-an="w-urne" data-r="3" data-b="2" data-ev="zweiterot"></div><figcaption>Abb. 2: Achte auf die graue Zeile unter den Diagrammen. Dort werden nur die Versuche mit „1. Kugel rot“ (oder „1. Kugel blau“) ausgewertet.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Führe 1000 Versuche ohne Zurücklegen durch. In der grauen Zeile steht, wie oft die 2. Kugel rot war, wenn man nur die Versuche mit roter 1. Kugel zählt. <b>Welchem Bruch im Baumdiagramm entspricht dieser Anteil?</b></p></div>
    <p>Der Anteil liegt bei $0{,}5$. Das ist der Bruch $\frac24$ am Ast der zweiten Stufe, also $P_{\text{1. rot}}(\text{2. rot})$. Eine bedingte Wahrscheinlichkeit kannst du also auch als relative Häufigkeit messen: Du wertest nur die Versuche aus, in denen die Bedingung eingetreten ist.</p>

    <h3>Den Baum umkehren</h3>
    <p>Beim Test kennst du $P_K(T)$ (Bedingung: krank), gesucht ist $P_T(K)$ (Bedingung: positiv). Bedingung und Ereignis tauschen die Rollen. Dafür brauchst du zwei Schritte, die immer gleich ablaufen.</p>
    ` + H.ST(R`Vom Baum zur umgekehrten Bedingung: $P_T(K)$ beim Test`, [
      R`<b>Baum aufstellen.</b> Erste Stufe: $P(K)=0{,}02$ und $P(\overline{K})=0{,}98$. Zweite Stufe: $P_K(T)=0{,}95$ und $P_{\overline{K}}(T)=0{,}10$.`,
      R`<b>Pfade berechnen, die zu „positiv“ führen.</b> $P(K\cap T)=0{,}02\cdot0{,}95=0{,}019$ und $P(\overline{K}\cap T)=0{,}98\cdot0{,}10=0{,}098$.`,
      R`<b>Addieren (totale Wahrscheinlichkeit).</b> $P(T)=0{,}019+0{,}098=0{,}117$. So wahrscheinlich ist ein positiver Test überhaupt.`,
      R`<b>Teilen.</b> $P_T(K)=\dfrac{P(K\cap T)}{P(T)}=\dfrac{0{,}019}{0{,}117}\approx0{,}162$. Deine Vermutung war: <span data-echo="v-8-2">noch keine abgegeben</span>.`,
      R`<b>Deuten.</b> Nur etwa 16 % der positiv Getesteten sind krank. Ein positives Ergebnis ist ein Anlass für einen zweiten, genaueren Test, aber kein Beweis.`
    ]) + R`
    <p>Die beiden Schritte „alle passenden Pfade addieren“ und „den gesuchten Pfad durch diese Summe teilen“ fasst man im <b>Satz von Bayes</b> zusammen:</p>
    $$P_B(A)=\frac{P(A)\cdot P_A(B)}{P(A)\cdot P_A(B)+P(\overline{A})\cdot P_{\overline{A}}(B)}$$
    <p>Du musst diese Formel nicht auswendig lernen. Es genügt, wenn du den Baum zeichnest, die Pfade berechnest und dann teilst. Oder du füllst eine Vierfeldertafel aus und liest ab.</p>

    <div class="nv-example"><p><b>Beispiel (Sportverein).</b> An einer Schule sind 60 % der Lernenden Mädchen. 30 % der Mädchen und 45 % der Jungen sind in einem Sportverein. Eine zufällig ausgewählte Person ist im Sportverein. Mit welcher Wahrscheinlichkeit ist sie ein Mädchen?</p>
      <p>$M$: Mädchen, $V$: im Verein. Gegeben: $P(M)=0{,}6$, $P_M(V)=0{,}3$, $P_{\overline{M}}(V)=0{,}45$. Gesucht: $P_V(M)$.</p>
      <p>Pfade zu $V$: $P(M\cap V)=0{,}6\cdot0{,}3=0{,}18$ und $P(\overline{M}\cap V)=0{,}4\cdot0{,}45=0{,}18$. Also $P(V)=0{,}36$.</p>
      <p>$P_V(M)=\dfrac{0{,}18}{0{,}36}=0{,}5$.</p>
      <p><b>Ergebnis:</b> Obwohl es mehr Mädchen als Jungen gibt, ist unter den Vereinsmitgliedern genau die Hälfte weiblich, weil die Jungen häufiger im Verein sind.</p></div>

    <div class="nv-merke"><p><b>Merke:</b> $P_B(A)=\dfrac{P(A\cap B)}{P(B)}$. Die Bedingung steht unten am $P$ und bestimmt, durch welche Summe du teilst. $P_B(A)$ und $P_A(B)$ sind verschiedene Größen. Im Baumdiagramm stehen bedingte Wahrscheinlichkeiten an den Ästen der zweiten Stufe.</p></div>
    <div class="nv-fehler"><p><b>Häufige Fehler</b></p><ul>
      <li><b>Bedingung und Ereignis vertauscht.</b> „Der Test erkennt 95 % der Kranken, also bin ich bei positivem Test zu 95 % krank.“ Falsch: $P_K(T)=0{,}95$, gesucht ist aber $P_T(K)\approx0{,}16$. Frage dich immer: Welche Gruppe ist die Grundgesamtheit?</li>
      <li><b>Durch die Gesamtzahl geteilt.</b> $\frac{19}{1000}$ ist $P(K\cap T)$ und keine bedingte Wahrscheinlichkeit. Bei „unter den positiv Getesteten“ teilst du durch 117.</li>
      <li><b>„und“ mit „unter der Bedingung“ verwechselt.</b> „krank <i>und</i> positiv“ ist ein Feld der Tafel (Anteil an allen). „krank, <i>wenn</i> positiv“ ist ein Feld geteilt durch seine Spaltensumme.</li>
      <li><b>Nur einen Pfad für $P(B)$ benutzt.</b> Zu „Test positiv“ führen zwei Pfade (krank und gesund). Beide gehören in den Nenner.</li>
    </ul></div>
    <div data-an="quiz" data-quiz="k8-2"></div>
  `, false, "8-2");
  };
})();
