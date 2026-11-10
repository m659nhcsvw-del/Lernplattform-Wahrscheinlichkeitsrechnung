/* Lernkarten AFB II (Nr. 7–9) · 7 (8.2) Bedingung umkehren · 8 (8.3) Unabhängigkeit · 9 (8.6) Standardabweichung */
(function () {
  const R = String.raw;
  AN_KARTEN_ADD([
    { nr: 7, afb: 2, abschnitt: "8.2", titel: "Bedingung umkehren",
      aufgabe: R`
<p>Bei einem Wettkampf sind 10 % der Teilnehmenden gedopt ($D$). Ein Test fällt bei 90 % der Gedopten positiv aus ($T$), aber auch bei 5 % der nicht Gedopten.</p>
<p class="teil"><span class="l">a)</span><b class="op">Ermittle</b> die Wahrscheinlichkeit für ein positives Testergebnis.</p>
<p class="teil"><span class="l">b)</span><b class="op">Berechne</b> die Wahrscheinlichkeit, dass eine positiv getestete Person gedopt ist.</p>
<p class="teil"><span class="l">c)</span><b class="op">Berechne</b> die Wahrscheinlichkeit, dass eine negativ getestete Person trotzdem gedopt ist.</p>
<p class="teil"><span class="l">d)</span><b class="op">Interpretiere</b> das Ergebnis aus b).</p>`,
      loesung: R`
<p class="schritt"><b>Gegeben:</b> $P(D)=0{,}1$; $P_D(T)=0{,}9$; $P_{\overline{D}}(T)=0{,}05$.</p>
<p class="schritt"><b>a)</b> <span class="c1">Beide Pfade</span> zu $T$ berechnen und addieren:</p>
$$P(T)=0{,}1\cdot0{,}9+0{,}9\cdot0{,}05=0{,}09+0{,}045=0{,}135$$
<p class="schritt"><b>b)</b> <span class="c2">Gesuchten Pfad durch die Summe teilen:</span></p>
$$P_T(D)=\frac{P(D\cap T)}{P(T)}=\frac{0{,}09}{0{,}135}=\frac23\approx0{,}667$$
<p class="schritt"><b>c)</b> Bedingung $\overline{T}$ mit $P(\overline{T})=0{,}865$:</p>
$$P_{\overline{T}}(D)=\frac{0{,}1\cdot0{,}1}{0{,}865}\approx0{,}012$$
<p class="schritt"><b>d)</b> Nur zwei von drei positiv Getesteten sind gedopt. Jede dritte positiv getestete Person wäre zu Unrecht beschuldigt. Ein zweiter Test ist nötig.</p>
<p class="ergebnis">a) $0{,}135$ &nbsp; b) $\approx0{,}667$ &nbsp; c) $\approx0{,}012$</p>`,
      theorie: R`
<ul>
<li><b>Was gegeben ist:</b> Der Test wird an Gedopten und nicht Gedopten erprobt. Bekannt sind deshalb Wahrscheinlichkeiten mit der Bedingung „gedopt“ oder „nicht gedopt“: $P_D(T)$ und $P_{\overline{D}}(T)$.</li>
<li><b>Was gefragt ist:</b> Wer ein Ergebnis in der Hand hat, kennt das Testergebnis und fragt nach dem Doping: $P_T(D)$. Bedingung und Ereignis sind vertauscht. <i>(Aufgabe b.)</i></li>
<li><b>Totale Wahrscheinlichkeit:</b> Ein positiver Test entsteht auf zwei Wegen: gedopt und erkannt oder nicht gedopt und falsch positiv. Beide Pfade zusammen ergeben $P(T)$. <i>(Aufgabe a.)</i></li>
<li><b>Umkehren:</b> Unter allen positiven Tests interessiert der Anteil, der von Gedopten stammt: Pfad „gedopt und positiv“ geteilt durch $P(T)$.</li>
<li><b>Warum nur $\frac23$?</b> Es gibt neunmal so viele nicht Gedopte. Schon 5 % von ihnen sind halb so viele Personen wie 90 % der Gedopten.</li>
</ul>`,
      merk: R`<p><b>Bedingung umkehren: Baum aufstellen, alle Pfade zur neuen Bedingung addieren, gesuchten Pfad durch diese Summe teilen (Satz von Bayes).</b></p>`,
      formeln: R`
<table><tr><th>Schritt</th><th>Rechnung</th></tr>
<tr><td>Pfad 1</td><td>$P(D\cap T)=P(D)\cdot P_D(T)$</td></tr>
<tr><td>Pfad 2</td><td>$P(\overline{D}\cap T)=P(\overline{D})\cdot P_{\overline{D}}(T)$</td></tr>
<tr><td>Summe</td><td>$P(T)=$ Pfad 1 + Pfad 2</td></tr>
<tr><td>Umkehrung</td><td>$P_T(D)=\dfrac{\text{Pfad 1}}{P(T)}$</td></tr></table>
<ol>
<li>Ereignisse benennen, Angaben mit richtiger Bedingung notieren.</li>
<li>Baum: erste Stufe = Bedingung der Angaben.</li>
<li>Pfade berechnen und addieren.</li>
<li>Teilen und im Sachzusammenhang deuten.</li>
</ol>
<p>Alternative: Vierfeldertafel mit 1000 Personen (90; 10; 45; 855).</p>`,
      fehler: R`<ul>
<li>$P_D(T)=0{,}9$ als Antwort auf b) angegeben.</li>
<li>Nur den Pfad „gedopt und positiv“ als $P(T)$ benutzt.</li>
<li>Die 5 % auf alle statt auf die nicht Gedopten bezogen.</li>
</ul>` },

    { nr: 8, afb: 2, abschnitt: "8.3", titel: "Unabhängigkeit prüfen",
      aufgabe: R`
<p>Von 300 Befragten haben 120 ein Haustier ($H$) und 200 Geschwister ($G$). 80 haben beides.</p>
<p class="teil"><span class="l">a)</span><b class="op">Untersuche</b>, ob $H$ und $G$ stochastisch unabhängig sind.</p>
<p class="teil"><span class="l">b)</span><b class="op">Berechne</b> $P_G(H)$ und <b class="op">vergleiche</b> mit $P(H)$.</p>
<p class="teil"><span class="l">c)</span><b class="op">Ermittle</b>, wie viele Befragte weder Haustier noch Geschwister haben.</p>
<p class="teil"><span class="l">d)</span>Angenommen, 95 statt 80 hätten beides. <b class="op">Beurteile</b>, was das für die Unabhängigkeit bedeutet.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Wahrscheinlichkeiten:</span> $P(H)=\frac{120}{300}=0{,}4$; $P(G)=\frac{200}{300}=\frac23$; $P(H\cap G)=\frac{80}{300}=\frac{4}{15}$.</p>
<p class="schritt"><span class="c2">Produkt bilden und vergleichen:</span></p>
$$P(H)\cdot P(G)=\frac25\cdot\frac23=\frac{4}{15}=P(H\cap G)$$
<p class="kommentar">Gleichheit: $H$ und $G$ sind unabhängig.</p>
<p class="schritt"><b>b)</b> $P_G(H)=\dfrac{80}{200}=0{,}4=P(H)$. Das bestätigt a).</p>
<p class="schritt"><b>c)</b> Mindestens eines: $120+200-80=240$. Keines: $300-240=60$.</p>
<p class="schritt"><b>d)</b> Dann wäre $P(H\cap G)=\frac{95}{300}\approx0{,}317$, das Produkt bleibt $\approx0{,}267$. <span class="c3">Abhängig:</span> $P_G(H)=\frac{95}{200}=0{,}475&gt;0{,}4$. Befragte mit Geschwistern hätten häufiger ein Haustier. Eine Ursache ist damit nicht bewiesen.</p>
<p class="ergebnis">a) unabhängig &nbsp; b) $0{,}4$ &nbsp; c) 60 &nbsp; d) abhängig</p>`,
      theorie: R`
<ul>
<li><b>Idee:</b> Zwei Ereignisse sind unabhängig, wenn die Information über das eine die Wahrscheinlichkeit des anderen nicht ändert: $P_G(H)=P(H)$. <i>(Aufgabe b.)</i></li>
<li><b>Produktform:</b> Setzt man $P_G(H)=\frac{P(H\cap G)}{P(G)}$ ein und multipliziert mit $P(G)$, entsteht $P(H\cap G)=P(H)\cdot P(G)$. Diese Form ist bequem, weil man nur drei Zahlen aus der Tafel braucht. <i>(Aufgabe a.)</i></li>
<li><b>Nachrechnen statt fühlen:</b> Ob Haustier und Geschwister „etwas miteinander zu tun haben“, entscheidet die Rechnung und nicht die Vermutung.</li>
<li><b>Abhängig heißt nicht ursächlich:</b> Ein Zusammenhang kann durch eine dritte Größe entstehen, zum Beispiel die Wohnsituation. <i>(Aufgabe d.)</i></li>
<li><b>Echte Daten</b> erfüllen die Gleichung selten exakt. Dann beurteilt man, ob die Abweichung klein oder deutlich ist.</li>
</ul>`,
      merk: R`<p><b>$A$ und $B$ sind stochastisch unabhängig, wenn $P(A\cap B)=P(A)\cdot P(B)$ gilt. Gleichwertig: $P_B(A)=P(A)$.</b></p>`,
      formeln: R`
<table><tr><th>Weg</th><th>Vergleich</th></tr>
<tr><td>1: Produkt</td><td>$P(A\cap B)$ mit $P(A)\cdot P(B)$</td></tr>
<tr><td>2: Bedingung</td><td>$P_B(A)$ mit $P(A)$</td></tr>
<tr><td>Baum</td><td>gleiche Äste in der 2. Stufe</td></tr></table>
<ol>
<li>$P(A)$, $P(B)$ und $P(A\cap B)$ bestimmen.</li>
<li>Produkt $P(A)\cdot P(B)$ berechnen.</li>
<li>Vergleichen: gleich oder ungleich?</li>
<li>Schlusssatz schreiben.</li>
</ol>
<p>Bei Unabhängigkeit auch unabhängig: $A$ und $\overline{B}$, $\overline{A}$ und $\overline{B}$.</p>`,
      fehler: R`<ul>
<li>Unabhängig mit unvereinbar verwechselt (unvereinbar heißt $A\cap B=\emptyset$ und ist abhängig).</li>
<li>Produktregel benutzt, ohne Unabhängigkeit zu prüfen.</li>
<li>Aus Abhängigkeit auf eine Ursache geschlossen.</li>
</ul>` },

    { nr: 9, afb: 2, abschnitt: "8.6", titel: "Erwartungswert und Streuung",
      aufgabe: R`
<p>Bei einem Spiel ist der Gewinn $X$ (in €) so verteilt:</p>
<table><tr><th>$k$</th><td>$-2$</td><td>1</td><td>6</td></tr>
<tr><th>$P(X=k)$</th><td>$0{,}5$</td><td>$0{,}3$</td><td>$0{,}2$</td></tr></table>
<p class="teil"><span class="l">a)</span><b class="op">Berechne</b> den Erwartungswert $\mu$.</p>
<p class="teil"><span class="l">b)</span><b class="op">Berechne</b> Varianz und Standardabweichung.</p>
<p class="teil"><span class="l">c)</span><b class="op">Interpretiere</b> beide Kennzahlen.</p>
<p class="teil"><span class="l">d)</span>Ein zweites Spiel hat $\mu=0{,}5$ € und $\sigma=1$ €. <b class="op">Vergleiche</b> die Spiele.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Gewichtete Summe:</span></p>
$$\mu=(-2)\cdot0{,}5+1\cdot0{,}3+6\cdot0{,}2=-1+0{,}3+1{,}2=0{,}5$$
<p class="schritt"><b>b)</b> <span class="c2">Abweichungen</span> von $\mu$ quadrieren und gewichten:</p>
<table><tr><th>$x_i$</th><td>$-2$</td><td>1</td><td>6</td></tr>
<tr><th>$x_i-\mu$</th><td>$-2{,}5$</td><td>$0{,}5$</td><td>$5{,}5$</td></tr>
<tr><th>$(x_i-\mu)^2$</th><td>$6{,}25$</td><td>$0{,}25$</td><td>$30{,}25$</td></tr></table>
$$V(X)=6{,}25\cdot0{,}5+0{,}25\cdot0{,}3+30{,}25\cdot0{,}2=9{,}25$$
$$\sigma=\sqrt{9{,}25}\approx3{,}04$$
<p class="schritt"><b>c)</b> Auf lange Sicht gewinnt man 0,50 € pro Spiel. Einzelne Spiele weichen typischerweise um etwa 3 € davon ab.</p>
<p class="schritt"><b>d)</b> <span class="c3">Gleicher Erwartungswert</span>, aber das zweite Spiel streut viel weniger. Es ist berechenbarer, bietet aber keine hohen Gewinne.</p>
<p class="ergebnis">a) $0{,}5$ € &nbsp; b) $9{,}25$; $\approx3{,}04$ €</p>`,
      theorie: R`
<ul>
<li><b>Zwei Kennzahlen:</b> Der Erwartungswert sagt, wo die Werte im Mittel liegen. Die Standardabweichung sagt, wie weit sie typischerweise davon entfernt sind. Erst beide zusammen beschreiben ein Spiel.</li>
<li><b>Warum quadrieren?</b> Die Abweichungen $x_i-\mu$ sind teils positiv, teils negativ. Gewichtet addiert ergeben sie immer 0. Durch das Quadrieren werden alle positiv, und große Abweichungen zählen besonders stark. <i>(Aufgabe b: Der Wert 6 liefert den größten Beitrag.)</i></li>
<li><b>Warum die Wurzel?</b> Die Varianz hat die Einheit Euro². Die Wurzel bringt die Einheit Euro zurück, sodass man $\sigma$ mit $\mu$ vergleichen kann.</li>
<li><b>Risiko:</b> Großes $\sigma$ bedeutet große Ausschläge nach oben und unten. <i>(Aufgabe d.)</i></li>
<li><b>Verschieben:</b> Zieht man von allen Werten denselben Betrag ab, ändert sich $\mu$, aber $\sigma$ bleibt gleich.</li>
</ul>`,
      merk: R`<p><b>$V(X)=\sum (x_i-\mu)^2\cdot P(X=x_i)$ und $\sigma=\sqrt{V(X)}$. Je größer $\sigma$, desto stärker streuen die Werte um $\mu$.</b></p>`,
      formeln: R`
<table><tr><th>Größe</th><th>Formel</th></tr>
<tr><td>Erwartungswert</td><td>$\mu=\sum x_i\,p_i$</td></tr>
<tr><td>Varianz</td><td>$V=\sum (x_i-\mu)^2\,p_i$</td></tr>
<tr><td>Standardabweichung</td><td>$\sigma=\sqrt{V}$</td></tr></table>
<ol>
<li>$\mu$ berechnen.</li>
<li>Zeile $x_i-\mu$ anlegen.</li>
<li>Zeile $(x_i-\mu)^2$ anlegen.</li>
<li>Mit $p_i$ multiplizieren und addieren.</li>
<li>Wurzel ziehen, Einheit angeben.</li>
</ol>
<p>Rechner: Werte und Wahrscheinlichkeiten als Listen, Statistik mit einer Variablen liefert $\bar x$ und $\sigma_x$.</p>`,
      fehler: R`<ul>
<li>Abweichungen nicht quadriert (Summe wird 0).</li>
<li>Quadrate nicht mit den Wahrscheinlichkeiten gewichtet.</li>
<li>Varianz als Standardabweichung angegeben (Wurzel vergessen).</li>
</ul>` }
  ]);
})();
