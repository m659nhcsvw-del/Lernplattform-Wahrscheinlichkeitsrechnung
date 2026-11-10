/* Lernkarten AFB III (Nr. 16–18) · 16 (8.2) Testergebnis beurteilen · 17 (8.3) Unabhängigkeit begründen · 18 (8.7) Abiturtraining */
(function () {
  const R = String.raw;
  AN_KARTEN_ADD([
    { nr: 16, afb: 3, abschnitt: "8.2", titel: "Ein Testergebnis beurteilen",
      aufgabe: R`
<p>1 % der Bevölkerung hat eine bestimmte Krankheit ($K$). Ein Test ist bei 98 % der Kranken positiv ($T$) und bei 95 % der Gesunden negativ. Die Werbung sagt: „98 % Sicherheit“.</p>
<p class="teil"><span class="l">a)</span><b class="op">Berechne</b> $P_T(K)$.</p>
<p class="teil"><span class="l">b)</span>Ein zweiter, unabhängiger Test ist ebenfalls positiv. <b class="op">Berechne</b> die Wahrscheinlichkeit für $K$ neu.</p>
<p class="teil"><span class="l">c)</span><b class="op">Untersuche</b>, wie sich $P_T(K)$ ändert, wenn 10 % krank sind.</p>
<p class="teil"><span class="l">d)</span><b class="op">Beurteile</b> die Werbeaussage.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Pfade zu $T$:</span> $0{,}01\cdot0{,}98=0{,}0098$ und $0{,}99\cdot0{,}05=0{,}0495$.</p>
$$P_T(K)=\frac{0{,}0098}{0{,}0098+0{,}0495}=\frac{0{,}0098}{0{,}0593}\approx0{,}165$$
<p class="schritt"><b>b)</b> <span class="c2">Neuer Ausgangswert</span> $P(K)=0{,}165$ statt $0{,}01$:</p>
$$\frac{0{,}165\cdot0{,}98}{0{,}165\cdot0{,}98+0{,}835\cdot0{,}05}\approx\frac{0{,}162}{0{,}204}\approx0{,}795$$
<p class="schritt"><b>c)</b> Mit $P(K)=0{,}1$:</p>
$$P_T(K)=\frac{0{,}098}{0{,}098+0{,}9\cdot0{,}05}=\frac{0{,}098}{0{,}143}\approx0{,}685$$
<p class="schritt"><b>d)</b> <span class="c3">Irreführend.</span> Die 98 % sind $P_K(T)$: Kranke werden fast immer erkannt. Wer positiv getestet ist, fragt aber nach $P_T(K)$, und das sind nur etwa 16,5 %. Der Wert hängt stark davon ab, wie verbreitet die Krankheit ist (c). Ein positiver Test ist ein Anlass zur Nachprüfung, kein Beweis.</p>
<p class="ergebnis">a) $\approx0{,}165$ &nbsp; b) $\approx0{,}795$ &nbsp; c) $\approx0{,}685$</p>`,
      theorie: R`
<ul>
<li><b>Zwei Richtungen:</b> $P_K(T)$ beschreibt den Test (wie gut erkennt er Kranke?). $P_T(K)$ beschreibt die Lage der getesteten Person (wie wahrscheinlich bin ich krank?). Beide können weit auseinanderliegen. <i>(Aufgabe a.)</i></li>
<li><b>Der Anteil der Kranken entscheidet:</b> Sind nur wenige krank, stammen die meisten positiven Tests von den vielen Gesunden, auch wenn der Test nur bei 5 % von ihnen irrt. Von 10 000 Personen sind 100 krank (98 positiv) und 9900 gesund (495 positiv).</li>
<li><b>Mehr Kranke, mehr Aussagekraft:</b> In einer Gruppe mit vielen Kranken (zum Beispiel Personen mit Beschwerden) ist derselbe Test viel aussagekräftiger. <i>(Aufgabe c.)</i></li>
<li><b>Zweiter Test:</b> Nach dem ersten positiven Test gehört die Person zu einer Gruppe mit 16,5 % Kranken. Diese Zahl ist der neue Startwert im Baum. <i>(Aufgabe b.)</i></li>
</ul>`,
      merk: R`<p><b>Die Aussagekraft eines positiven Tests hängt von der Güte des Tests <i>und</i> vom Anteil der Kranken ab. $P_K(T)$ ist nicht $P_T(K)$.</b></p>`,
      formeln: R`
<table><tr><th>Anteil der Kranken</th><td>1 %</td><td>10 %</td><td>50 %</td></tr>
<tr><th>$P_T(K)$</th><td>$0{,}165$</td><td>$0{,}685$</td><td>$0{,}951$</td></tr></table>
$$P_T(K)=\frac{P(K)\cdot P_K(T)}{P(K)\cdot P_K(T)+P(\overline{K})\cdot P_{\overline{K}}(T)}$$
<ol>
<li>Angaben mit der richtigen Bedingung notieren.</li>
<li>Falsch-positiv-Rate bestimmen: $1-0{,}95=0{,}05$.</li>
<li>Beide Pfade zu $T$ berechnen.</li>
<li>Teilen.</li>
<li>Urteil: Welche Wahrscheinlichkeit nennt die Aussage, welche ist gemeint?</li>
</ol>`,
      fehler: R`<ul>
<li>Mit $0{,}95$ statt $0{,}05$ im zweiten Pfad gerechnet.</li>
<li>Beim zweiten Test wieder mit $P(K)=0{,}01$ begonnen.</li>
<li>Urteil ohne Rechnung („98 % ist viel, also stimmt es“).</li>
</ul>` },

    { nr: 17, afb: 3, abschnitt: "8.3", titel: "Unabhängigkeit begründen",
      aufgabe: R`
<p>Für zwei Ereignisse gilt $P(A)=0{,}6$, $P(B)=0{,}5$ und $P(A\cup B)=0{,}8$.</p>
<p class="teil"><span class="l">a)</span><b class="op">Zeige</b>, dass $A$ und $B$ stochastisch unabhängig sind.</p>
<p class="teil"><span class="l">b)</span><b class="op">Weise nach</b>, dass dann auch $\overline{A}$ und $\overline{B}$ unabhängig sind.</p>
<p class="teil"><span class="l">c)</span><b class="op">Begründe</b>, dass $A$ und $B$ nicht unvereinbar sein können.</p>
<p class="teil"><span class="l">d)</span><b class="op">Beurteile</b>: „Unabhängige Ereignisse treten nie gemeinsam ein.“</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Additionssatz</span> nach $P(A\cap B)$ umstellen:</p>
$$P(A\cap B)=P(A)+P(B)-P(A\cup B)=0{,}6+0{,}5-0{,}8=0{,}3$$
<p class="schritt"><span class="c2">Produkt:</span> $P(A)\cdot P(B)=0{,}6\cdot0{,}5=0{,}3$. Beide Werte sind gleich, also unabhängig.</p>
<p class="schritt"><b>b)</b> „Weder $A$ noch $B$“ ist das Gegenereignis von $A\cup B$:</p>
$$P(\overline{A}\cap\overline{B})=1-0{,}8=0{,}2$$
<p class="schritt">Produkt: $P(\overline{A})\cdot P(\overline{B})=0{,}4\cdot0{,}5=0{,}2$. Gleich, also unabhängig.</p>
<p class="schritt"><b>c)</b> <span class="c3">Unvereinbar</span> hieße $P(A\cap B)=0$ und damit $P(A\cup B)=0{,}6+0{,}5=1{,}1$. Eine Wahrscheinlichkeit über 1 gibt es nicht. $A$ und $B$ müssen sich überschneiden, mindestens mit $0{,}1$.</p>
<p class="schritt"><b>d)</b> Falsch. Hier treten $A$ und $B$ mit Wahrscheinlichkeit $0{,}3$ gemeinsam ein und sind unabhängig. Ereignisse, die nie gemeinsam eintreten, sind unvereinbar und damit abhängig: Tritt das eine ein, ist das andere ausgeschlossen.</p>
<p class="ergebnis">a) $0{,}3=0{,}3$ &nbsp; b) $0{,}2=0{,}2$</p>`,
      theorie: R`
<ul>
<li><b>Fehlende Größe beschaffen:</b> Für den Test braucht man $P(A\cap B)$. Ist stattdessen $P(A\cup B)$ gegeben, liefert der Additionssatz den fehlenden Wert. <i>(Aufgabe a.)</i></li>
<li><b>„Zeige“ und „weise nach“:</b> Verlangt ist eine lückenlose Rechnung, die mit dem Vergleich und einem Schlusssatz endet. Ein Zahlenwert allein genügt nicht.</li>
<li><b>Gegenereignisse:</b> Unabhängigkeit überträgt sich immer auf die Gegenereignisse. Allgemein: $P(\overline{A}\cap\overline{B})=1-P(A)-P(B)+P(A)P(B)=(1-P(A))(1-P(B))$. <i>(Aufgabe b.)</i></li>
<li><b>Unvereinbar oder unabhängig:</b> Unvereinbar betrifft die Mengen (kein gemeinsames Ergebnis). Unabhängig betrifft die Wahrscheinlichkeiten (Produktgleichung). Bei positiven Wahrscheinlichkeiten schließt das eine das andere aus. <i>(Aufgaben c und d.)</i></li>
</ul>`,
      merk: R`<p><b>Unabhängig: $P(A\cap B)=P(A)\cdot P(B)$. Unvereinbar: $P(A\cap B)=0$. Beides zugleich geht nur, wenn eines der Ereignisse die Wahrscheinlichkeit 0 hat.</b></p>`,
      formeln: R`
<table><tr><th></th><th>$B$</th><th>$\overline{B}$</th><th>Summe</th></tr>
<tr><th>$A$</th><td>$0{,}3$</td><td>$0{,}3$</td><td>$0{,}6$</td></tr>
<tr><th>$\overline{A}$</th><td>$0{,}2$</td><td>$0{,}2$</td><td>$0{,}4$</td></tr>
<tr><th>Summe</th><td>$0{,}5$</td><td>$0{,}5$</td><td>1</td></tr></table>
<ol>
<li>$P(A\cap B)$ beschaffen (Additionssatz oder Tafel).</li>
<li>Produkt bilden und vergleichen.</li>
<li>Schlusssatz formulieren.</li>
</ol>
<p>Bei Unabhängigkeit ist jedes innere Feld das Produkt seiner Randsummen: $0{,}6\cdot0{,}5$, $0{,}4\cdot0{,}5$ und so weiter.</p>`,
      fehler: R`<ul>
<li>$P(A\cup B)$ mit $P(A\cap B)$ verwechselt.</li>
<li>Nur ein Zahlenbeispiel statt einer Begründung geliefert.</li>
<li>Unvereinbar und unabhängig gleichgesetzt.</li>
</ul>` },

    { nr: 18, afb: 3, abschnitt: "8.7", titel: "Abiturtraining: Mensa",
      aufgabe: R`
<p>In einer Mensa wählen 40 % der Gäste das vegetarische Gericht ($V$). Von ihnen nehmen 70 % einen Nachtisch ($N$), von den übrigen Gästen 50 %.</p>
<p class="teil"><span class="l">a)</span><b class="op">Bestimme</b> $P(N)$.</p>
<p class="teil"><span class="l">b)</span><b class="op">Berechne</b> $P_N(V)$.</p>
<p class="teil"><span class="l">c)</span><b class="op">Zeige</b>, dass $V$ und $N$ abhängig sind, und <b class="op">bestimme</b> den Anteil $x$ statt 50 %, bei dem sie unabhängig wären.</p>
<p class="teil"><span class="l">d)</span>Ein Nachtisch kostet 1,50 €. <b class="op">Berechne</b> die erwartete Nachtisch-Einnahme bei 200 Gästen und <b class="op">beurteile</b> die Aussagekraft.</p>`,
      loesung: R`
<p class="schritt"><b>a)</b> <span class="c1">Totale Wahrscheinlichkeit:</span></p>
$$P(N)=0{,}4\cdot0{,}7+0{,}6\cdot0{,}5=0{,}28+0{,}30=0{,}58$$
<p class="schritt"><b>b)</b> <span class="c2">Bedingung umkehren:</span></p>
$$P_N(V)=\frac{0{,}28}{0{,}58}\approx0{,}483$$
<p class="schritt"><b>c)</b> $P_V(N)=0{,}7\ne0{,}58=P(N)$, also abhängig. <span class="c3">Unabhängig</span> wären sie, wenn beide Gruppen gleich oft Nachtisch nähmen: $x=0{,}7$. Probe: $P(N)=0{,}4\cdot0{,}7+0{,}6\cdot0{,}7=0{,}7=P_V(N)$.</p>
<p class="schritt"><b>d)</b> Pro Gast: $1{,}50\cdot0{,}58=0{,}87$ €. Bei 200 Gästen:</p>
$$200\cdot0{,}87=174\text{ €}$$
<p class="kommentar">174 € ist ein Mittelwert über viele Tage. An einem einzelnen Tag sind Abweichungen von 10 bis 20 € normal. Außerdem setzt die Rechnung voraus, dass die Gäste unabhängig entscheiden und die Anteile stabil bleiben.</p>
<p class="ergebnis">a) $0{,}58$ &nbsp; b) $\approx0{,}483$ &nbsp; c) $x=0{,}7$ &nbsp; d) 174 €</p>`,
      theorie: R`
<ul>
<li><b>Aufbau von Prüfungsaufgaben:</b> Meist folgen vier Bausteine aufeinander: totale Wahrscheinlichkeit, umgekehrte Bedingung, Unabhängigkeit, Erwartungswert. Jeder nutzt Ergebnisse des vorigen.</li>
<li><b>Angaben übersetzen:</b> „Von ihnen nehmen 70 %“ ist $P_V(N)=0{,}7$ und nicht $P(V\cap N)$. Diese Übersetzung entscheidet über die ganze Aufgabe. <i>(Aufgabe a.)</i></li>
<li><b>Unabhängigkeit im Baum:</b> Stehen in der zweiten Stufe in beiden Teilbäumen dieselben Wahrscheinlichkeiten, sind die Merkmale unabhängig. Daraus ergibt sich $x$ ohne lange Rechnung. <i>(Aufgabe c.)</i></li>
<li><b>Erwartungswert bei vielen Personen:</b> Der Erwartungswert pro Person mal Anzahl der Personen ergibt die erwartete Summe. <i>(Aufgabe d.)</i></li>
<li><b>Beurteilen:</b> Eine erwartete Summe ist ein langfristiger Mittelwert. Nenne die Modellannahmen und die Schwankung.</li>
</ul>`,
      merk: R`<p><b>Erst Ereignisse und Angaben sauber notieren, dann Baum, dann rechnen. Jede Teilaufgabe endet mit einem Satz im Sachzusammenhang.</b></p>`,
      formeln: R`
<table><tr><th>Operator</th><th>erwartet wird</th></tr>
<tr><td>bestimme</td><td>Weg frei, aber dokumentiert</td></tr>
<tr><td>berechne</td><td>Ansatz, Rechnung, Ergebnis</td></tr>
<tr><td>zeige</td><td>lückenlos bis zur Behauptung</td></tr>
<tr><td>beurteile</td><td>Rechnung, Argumente, Urteil</td></tr></table>
<ol>
<li>Ereignisse mit Buchstaben festlegen.</li>
<li>Prozentangaben mit Bedingung notieren.</li>
<li>Baum oder Vierfeldertafel anlegen.</li>
<li>Teilaufgaben der Reihe nach, Zwischenergebnisse weiterverwenden.</li>
<li>Antwortsätze schreiben.</li>
</ol>`,
      fehler: R`<ul>
<li>$0{,}7$ als $P(V\cap N)$ in die Tafel eingetragen.</li>
<li>Bei c) nur behauptet statt verglichen.</li>
<li>174 € als sichere Tageseinnahme gedeutet.</li>
</ul>` }
  ]);
})();
