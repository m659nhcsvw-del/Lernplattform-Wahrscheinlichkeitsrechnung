/* Kapitel 8, Teil 1 — Ihr Fundament · 8.1 Wiederholung: Grundlagen der Stochastik
   Texte in String.raw: LaTeX-Backslashes werden einfach geschrieben. */
(function () {
  const R = String.raw, H = AN.H;

  AN.QUIZ["k8-fund"] = [
    { t: "num", q: R`Schreibe den Bruch $\frac{3}{8}$ in Prozent (nur die Zahl).`, a: 37.5, tol: 0.01, why: R`$3:8=0{,}375$, und $0{,}375=37{,}5\,\%$. Vom Dezimalbruch zur Prozentzahl verschiebst du das Komma um zwei Stellen.` },
    { q: R`Was ergibt $\frac13\cdot\frac25$?`, o: [R`$\frac{3}{8}$`, R`$\frac{2}{15}$`, R`$\frac{11}{15}$`], a: 1, why: R`Brüche multiplizierst du „Zähler mal Zähler, Nenner mal Nenner“: $\frac{1\cdot2}{3\cdot5}=\frac{2}{15}$. Der Wert $\frac{11}{15}$ wäre die Summe der beiden Brüche.` },
    { t: "num", q: R`In einer Klasse mit 40 Lernenden kommen 12 mit dem Fahrrad. Wie groß ist die relative Häufigkeit (als Dezimalzahl)?`, a: 0.3, tol: 0.001, why: R`Relative Häufigkeit = absolute Häufigkeit geteilt durch die Gesamtzahl: $\frac{12}{40}=0{,}3=30\,\%$.` },
    { q: R`Was ergibt $\frac16+\frac14$?`, o: [R`$\frac{2}{10}$`, R`$\frac{5}{12}$`, R`$\frac{1}{24}$`], a: 1, why: R`Zuerst auf den Hauptnenner 12 bringen: $\frac{2}{12}+\frac{3}{12}=\frac{5}{12}$. „Zähler plus Zähler, Nenner plus Nenner“ ist falsch.` },
    { t: "num", q: R`Wie viel sind $20\,\%$ von 150?`, a: 30, tol: 0.01, why: R`$20\,\%=0{,}2$ und $0{,}2\cdot150=30$.` }
  ];

  AN.QUIZ["k8-1"] = [
    { t: "num", q: R`Zwei Würfel werden geworfen. Wie groß ist die Wahrscheinlichkeit für die Augensumme 5? (Dezimalzahl oder Bruch)`, a: 4 / 36, tol: 0.002, why: R`Günstig sind $(1|4),(2|3),(3|2),(4|1)$, also 4 von 36 gleich wahrscheinlichen Ergebnissen: $\frac{4}{36}=\frac19\approx0{,}111$.` },
    { q: R`Eine faire Münze zeigt fünfmal hintereinander „Zahl“. Wie groß ist die Wahrscheinlichkeit für „Zahl“ beim sechsten Wurf?`, o: [R`Kleiner als $0{,}5$, denn jetzt ist „Wappen“ an der Reihe.`, R`Genau $0{,}5$.`, R`Größer als $0{,}5$, denn die Münze hat eine Serie.`], a: 1, why: R`Die Münze hat kein Gedächtnis. Jeder Wurf ist ein neues Zufallsexperiment mit $P(\text{Zahl})=0{,}5$. Das Gesetz der großen Zahlen gleicht nichts aus, es „verdünnt“ nur frühere Abweichungen durch viele neue Würfe.` },
    { t: "num", q: R`In einer Urne liegen 4 rote und 6 blaue Kugeln. Es wird zweimal ohne Zurücklegen gezogen. Wie groß ist $P(\text{beide rot})$?`, a: 12 / 90, tol: 0.002, why: R`Pfadmultiplikationsregel: $\frac{4}{10}\cdot\frac{3}{9}=\frac{12}{90}=\frac{2}{15}\approx0{,}133$. Beim zweiten Zug fehlt eine rote Kugel, deshalb $\frac39$ und nicht $\frac4{10}$.` },
    { q: R`Ein Würfel wird dreimal geworfen. Was ist das Gegenereignis von „mindestens eine 6“?`, o: [R`„genau eine 6“`, R`„keine 6“`, R`„höchstens eine 6“`], a: 1, why: R`„Mindestens eine“ heißt: eine, zwei oder drei Sechsen. Alles andere ist „keine 6“. Mit dem Gegenereignis rechnet man hier viel schneller.` },
    { t: "num", q: R`Ein Würfel wird dreimal geworfen. Wie groß ist die Wahrscheinlichkeit für mindestens eine 6?`, a: 91 / 216, tol: 0.002, why: R`$P(\text{keine 6})=\left(\frac56\right)^3=\frac{125}{216}$. Also $P(\text{mindestens eine 6})=1-\frac{125}{216}=\frac{91}{216}\approx0{,}421$.` }
  ];

  window.WS_K8_1_DE = function (S) {
    return S("Ihr&nbsp;Fundament", R`
    <p>In diesem Kapitel rechnest du mit <b>Anteilen</b>. Eine Wahrscheinlichkeit ist nichts anderes als ein Anteil: der Anteil der Fälle, in denen etwas eintritt. Deshalb brauchst du vor allem drei Dinge sicher: Brüche, Dezimalzahlen und Prozente ineinander umwandeln, mit Brüchen rechnen und relative Häufigkeiten bestimmen. Hier frischst du das kurz auf.</p>

    <h4>Bruch, Dezimalzahl, Prozent</h4>
    <p>Die drei Schreibweisen bedeuten dasselbe. Du wechselst zwischen ihnen, je nachdem, was gerade bequemer ist: Mit Brüchen rechnet man genau, Dezimalzahlen vergleicht man leicht, Prozente versteht jeder im Alltag.</p>
    <div class="nv-table-wrap"><table class="nv-table">
      <tr><th>Bruch</th><td>$\frac12$</td><td>$\frac14$</td><td>$\frac15$</td><td>$\frac16$</td><td>$\frac38$</td><td>$\frac1{36}$</td></tr>
      <tr><th>Dezimalzahl</th><td>$0{,}5$</td><td>$0{,}25$</td><td>$0{,}2$</td><td>$\approx0{,}167$</td><td>$0{,}375$</td><td>$\approx0{,}028$</td></tr>
      <tr><th>Prozent</th><td>$50\,\%$</td><td>$25\,\%$</td><td>$20\,\%$</td><td>$\approx16{,}7\,\%$</td><td>$37{,}5\,\%$</td><td>$\approx2{,}8\,\%$</td></tr>
    </table></div>

    <h4>Mit Brüchen rechnen</h4>
    <p><b>Multiplizieren:</b> Zähler mal Zähler, Nenner mal Nenner, zum Beispiel $\frac35\cdot\frac24=\frac{6}{20}=\frac{3}{10}$. Das brauchst du ständig, wenn du im Baumdiagramm einen Pfad entlanggehst. <b>Addieren:</b> erst gleichnamig machen, dann die Zähler addieren, zum Beispiel $\frac{3}{10}+\frac{6}{20}=\frac{6}{20}+\frac{6}{20}=\frac{12}{20}=\frac35$. Das brauchst du, wenn mehrere Pfade zu einem Ereignis gehören.</p>

    <h4>Absolute und relative Häufigkeit</h4>
    <p>Du wirfst eine Reißzwecke 50-mal, 31-mal bleibt sie auf dem Kopf liegen. Die <b>absolute Häufigkeit</b> ist 31. Die <b>relative Häufigkeit</b> ist der Anteil: $\frac{31}{50}=0{,}62=62\,\%$. Relative Häufigkeiten liegen immer zwischen 0 und 1, und alle relativen Häufigkeiten eines Versuchs ergeben zusammen 1.</p>
    <div class="nv-merke"><p><b>Merke:</b> relative Häufigkeit $=\dfrac{\text{absolute Häufigkeit}}{\text{Anzahl der Versuche}}$. Eine relative Häufigkeit wird <i>gemessen</i> (nach dem Versuch). Eine Wahrscheinlichkeit wird <i>vorhergesagt</i> (vor dem Versuch).</p></div>
    <div data-an="quiz" data-quiz="k8-fund"></div>
  `, true, "8-fund")

    + S("8.1&nbsp;·&nbsp;Wiederholung: Grundlagen der Stochastik", R`
    <p>Der Wetterbericht meldet „Regenwahrscheinlichkeit 30 %“. Ein Fußballer verwandelt „8 von 10 Elfmetern“. Beim Würfeln „kommt die 6 in einem Sechstel der Fälle“. In allen drei Sätzen geht es um Vorgänge, deren Ausgang du im Einzelfall <b>nicht</b> vorhersagen kannst. Trotzdem kannst du etwas darüber sagen, was auf lange Sicht passiert. Genau das leistet die Wahrscheinlichkeitsrechnung.</p>
    ` + H.P(R`Einen einzelnen Würfelwurf kann niemand vorhersagen. Wie kann man dann überhaupt eine Zahl wie $\frac16$ angeben, und <b>was genau sagt diese Zahl aus</b>, wenn doch jeder Wurf anders ausgehen kann?`)
    + H.V("v-8-1", R`Du wirfst einen fairen Würfel 60-mal. Wie oft fällt die 6?`, 1, [
      [R`Genau 10-mal, denn $\frac16$ von 60 ist 10.`, R`10 ist der Wert, den man im Mittel erwartet. Dass es <i>genau</i> 10 werden, ist aber eher selten (Wahrscheinlichkeit etwa 14 %). Probiere es unten aus: Wirf mehrmals 60-mal und vergleiche.`],
      [R`Ungefähr 10-mal, es können aber auch 7 oder 13 sein.`, R`Genau. Die Wahrscheinlichkeit $\frac16$ sagt eine Größenordnung voraus und keinen festen Wert. Bei wenigen Würfen schwankt das Ergebnis deutlich, bei sehr vielen Würfen liegt der Anteil der Sechsen nahe bei $\frac16$.`],
      [R`Das kann man überhaupt nicht sagen, alles zwischen 0 und 60 ist gleich gut möglich.`, R`Möglich ist alles zwischen 0 und 60, aber nicht gleich wahrscheinlich. 30 Sechsen bei 60 Würfen wirst du praktisch nie sehen. Probiere es unten aus.`]
    ]) + R`
    <h3>Entdecken: Was bedeutet „Wahrscheinlichkeit $\frac16$“?</h3>
    <figure class="nv-figure"><div data-an="w-wuerfel" data-ev="sechs"></div><figcaption>Abb. 1: Würfeln in 3D. Links die relativen Häufigkeiten aller Augenzahlen, rechts der Anteil der Sechsen im Verlauf.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Würfle zuerst einmal mit Animation. Tippe dann sechsmal auf „10×“ (das sind deine 60 Würfe) und lies ab, wie oft die 6 gefallen ist. Setze zurück und wiederhole das zwei- oder dreimal. Tippe danach mehrmals auf „1000×“. <b>Was passiert mit der blauen Linie im rechten Diagramm?</b></p></div>
    <p>Du hast vermutlich gesehen: Nach 60 Würfen fällt die 6 mal 7-mal, mal 12-mal. Der Anteil schwankt also stark. Nach einigen Tausend Würfen aber liegt die blaue Linie fast genau auf der gestrichelten Linie bei $0{,}167$. Diese Beobachtung heißt <b>empirisches Gesetz der großen Zahlen</b>: Wiederholt man ein Zufallsexperiment sehr oft, dann stabilisiert sich die relative Häufigkeit eines Ereignisses bei einem festen Wert. Diesen Wert nennt man die Wahrscheinlichkeit des Ereignisses.</p>

    <h3>Die Fachbegriffe</h3>
    <p>Ein <b>Zufallsexperiment</b> ist ein Vorgang, der sich unter gleichen Bedingungen beliebig oft wiederholen lässt und dessen Ausgang nicht vorhersagbar ist. Jeder mögliche Ausgang heißt <b>Ergebnis</b>. Alle Ergebnisse zusammen bilden die <b>Ergebnismenge</b> $\Omega$ (sprich „Omega“). Beim Würfeln ist $\Omega=\{1;2;3;4;5;6\}$.</p>
    <p>Oft interessiert nicht ein einzelnes Ergebnis, sondern eine Frage wie „Ist die Augenzahl gerade?“. So eine Frage fasst mehrere Ergebnisse zusammen. Man nennt das ein <b>Ereignis</b>. Ein Ereignis ist also eine Teilmenge von $\Omega$, zum Beispiel $E=\{2;4;6\}$. Das Ereignis <i>tritt ein</i>, wenn eines seiner Ergebnisse fällt. Das <b>Gegenereignis</b> $\overline{E}$ enthält alle Ergebnisse, die nicht zu $E$ gehören, hier $\overline{E}=\{1;3;5\}$.</p>
    <div class="nv-def"><p><b>Wahrscheinlichkeit.</b> Jedem Ergebnis wird eine Zahl zwischen 0 und 1 zugeordnet, seine Wahrscheinlichkeit. Alle diese Zahlen ergeben zusammen 1. Die Wahrscheinlichkeit $P(E)$ eines Ereignisses ist die Summe der Wahrscheinlichkeiten seiner Ergebnisse. Für das Gegenereignis gilt $P(\overline{E})=1-P(E)$.</p></div>

    <h3>Laplace-Experimente: zählen statt messen</h3>
    <p>Bei einem fairen Würfel gibt es keinen Grund, warum eine Seite öfter fallen sollte als eine andere. Sind alle Ergebnisse gleich wahrscheinlich, spricht man von einem <b>Laplace-Experiment</b>. Dann musst du nur zählen:</p>
    $$P(E)=\frac{\text{Anzahl der günstigen Ergebnisse}}{\text{Anzahl aller möglichen Ergebnisse}}=\frac{|E|}{|\Omega|}$$
    <p>Für „gerade Augenzahl“ sind 3 von 6 Ergebnissen günstig, also $P(E)=\frac36=0{,}5$. Aber Vorsicht: Die Formel gilt <i>nur</i>, wenn wirklich alle Ergebnisse gleich wahrscheinlich sind. Bei einer Reißzwecke („Kopf“ oder „Seite“) gibt es zwei Ergebnisse, aber die Wahrscheinlichkeiten sind nicht $\frac12$ und $\frac12$. Dort bleibt nur der Weg über viele Versuche: Die relative Häufigkeit nach vielen Würfen ist ein <b>Schätzwert</b> für die Wahrscheinlichkeit.</p>

    <div class="nv-example"><p><b>Beispiel 1 (zwei Würfel).</b> Ein roter und ein weißer Würfel werden geworfen. Wie groß ist die Wahrscheinlichkeit für die Augensumme 7? Wie groß ist sie für „mindestens eine 6“?</p>
      <p>Die Ergebnisse sind Paare wie $(3|4)$: weiß 3, rot 4. Es gibt $6\cdot6=36$ Paare, alle gleich wahrscheinlich. Für die Augensumme 7 sind $(1|6),(2|5),(3|4),(4|3),(5|2),(6|1)$ günstig, also $P(\text{Summe 7})=\frac{6}{36}=\frac16$.</p>
      <p>Für „mindestens eine 6“ ist das Gegenereignis einfacher: „keine 6“. Dafür hat jeder Würfel 5 Möglichkeiten, also $5\cdot5=25$ Paare. Damit ist $P(\text{mindestens eine 6})=1-\frac{25}{36}=\frac{11}{36}\approx0{,}306$.</p>
      <p><b>Ergebnis:</b> Die Augensumme 7 fällt im Mittel bei jedem sechsten Wurf, mindestens eine 6 bei knapp jedem dritten.</p></div>
    <figure class="nv-figure"><div data-an="w-wuerfel" data-ev="summe7"></div><figcaption>Abb. 2: Zwei Würfel. Wähle oben das Ereignis „mindestens eine 6“ und prüfe den Wert $0{,}306$ mit 1000 Würfen.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Wirf 1000-mal. Die Säulen für die Augensummen bilden ein Dreieck. <b>Warum ist die 7 am häufigsten und die 2 am seltensten?</b> Zähle die Paare: Für die Summe 2 gibt es nur $(1|1)$, für die Summe 7 gibt es sechs Paare.</p></div>

    <h3>„Oder“ und „und“: der Additionssatz</h3>
    <p>Ein Würfel wird geworfen. $A$: „gerade Augenzahl“, also $A=\{2;4;6\}$. $B$: „mindestens 5“, also $B=\{5;6\}$. Das Ereignis „$A$ oder $B$“ schreibt man $A\cup B=\{2;4;5;6\}$, das Ereignis „$A$ und $B$“ schreibt man $A\cap B=\{6\}$. Wenn du $P(A)+P(B)=\frac36+\frac26$ rechnest, hast du die 6 doppelt gezählt. Deshalb ziehst du sie einmal wieder ab:</p>
    $$P(A\cup B)=P(A)+P(B)-P(A\cap B)=\frac36+\frac26-\frac16=\frac46$$
    <div class="nv-merke"><p><b>Merke:</b> Bei einem Laplace-Experiment ist $P(E)=\frac{|E|}{|\Omega|}$. Immer gilt: $0\le P(E)\le1$, $P(\overline{E})=1-P(E)$ und $P(A\cup B)=P(A)+P(B)-P(A\cap B)$. Die relative Häufigkeit nach sehr vielen Versuchen liegt nahe bei der Wahrscheinlichkeit.</p></div>
  `, false, "8-1")

    + S("8.1&nbsp;·&nbsp;Mehrstufige Zufallsexperimente und Pfadregeln", R`
    <p>Viele Zufallsexperimente bestehen aus mehreren Schritten nacheinander: zweimal würfeln, dreimal eine Münze werfen, zwei Kugeln ziehen. Solche <b>mehrstufigen Zufallsexperimente</b> stellst du am besten in einem <b>Baumdiagramm</b> dar. Jeder Weg von links nach rechts (ein <b>Pfad</b>) steht für ein Ergebnis.</p>
    <figure class="nv-figure"><div data-an="w-urne" data-r="3" data-b="2" data-ev="verschieden"></div><figcaption>Abb. 3: Aus einer Urne mit 3 roten und 2 blauen Kugeln wird zweimal gezogen. Das Baumdiagramm zählt mit.</figcaption></figure>
    <div class="nv-idee"><p><b>Probiere aus:</b> Lass „ohne Zurücklegen“ eingestellt und ziehe einige Male mit Animation. Verfolge im Baumdiagramm den hervorgehobenen Pfad. Führe dann 1000 Versuche durch. <b>Vergleiche die gezählten Anteile mit den Produkten der Brüche entlang der Pfade.</b> Stelle danach auf „mit Zurücklegen“ um: Welche Brüche im Baum ändern sich?</p></div>
    <p>Sieh dir den obersten Pfad „rot – rot“ ohne Zurücklegen an. Beim ersten Zug sind 3 von 5 Kugeln rot, also $\frac35$. Wurde eine rote Kugel gezogen, liegen noch 2 rote unter 4 Kugeln, also $\frac24$. Von allen Versuchen beginnen etwa $\frac35$ mit Rot, und von <i>diesen</i> geht wieder etwa die Hälfte mit Rot weiter. Der Anteil „rot – rot“ ist deshalb $\frac35\cdot\frac24=\frac{6}{20}=0{,}3$. Das ist die erste Pfadregel.</p>
    <div class="nv-def"><p><b>Pfadmultiplikationsregel.</b> Die Wahrscheinlichkeit eines Ergebnisses ist das Produkt der Wahrscheinlichkeiten entlang seines Pfades.</p>
    <p><b>Pfadadditionsregel.</b> Gehören mehrere Pfade zu einem Ereignis, dann ist seine Wahrscheinlichkeit die Summe der Pfadwahrscheinlichkeiten.</p></div>
    <div class="nv-example"><p><b>Beispiel 2 (ohne Zurücklegen).</b> Urne mit 3 roten und 2 blauen Kugeln, zwei Züge ohne Zurücklegen. Bestimme die Wahrscheinlichkeit für zwei verschiedene Farben.</p>
      <p>Zum Ereignis gehören die Pfade „rot – blau“ und „blau – rot“:</p>
      $$P(\text{verschieden})=\frac35\cdot\frac24+\frac25\cdot\frac34=\frac{6}{20}+\frac{6}{20}=\frac{12}{20}=0{,}6$$
      <p><b>Ergebnis:</b> In 60 % aller Versuche haben die beiden Kugeln verschiedene Farben.</p></div>
    <div class="nv-example"><p><b>Beispiel 3 (mit Zurücklegen).</b> Wird die erste Kugel zurückgelegt, steht in der zweiten Stufe wieder $\frac35$ und $\frac25$:</p>
      $$P(\text{verschieden})=\frac35\cdot\frac25+\frac25\cdot\frac35=\frac{6}{25}+\frac{6}{25}=\frac{12}{25}=0{,}48$$
      <p><b>Ergebnis:</b> Mit Zurücklegen sind verschiedene Farben seltener (48 %), denn dieselbe Farbe kann leichter noch einmal gezogen werden.</p></div>
    <p>Eine Kontrolle hast du immer: An jeder Verzweigung ergeben die Wahrscheinlichkeiten zusammen 1, und alle Pfadwahrscheinlichkeiten zusammen ergeben ebenfalls 1. Hier: $0{,}3+0{,}3+0{,}3+0{,}1=1$.</p>
    <div class="nv-merke"><p><b>Merke:</b> Entlang eines Pfades wird <b>multipliziert</b>, verschiedene Pfade werden <b>addiert</b>. Bei „mindestens“-Fragen ist das Gegenereignis oft der kürzeste Weg.</p></div>
    <div class="nv-fehler"><p><b>Häufige Fehler</b></p><ul>
      <li><b>Laplace-Formel ohne Laplace-Experiment.</b> „Zwei Würfel haben die Augensummen 2 bis 12, also hat jede die Wahrscheinlichkeit $\frac1{11}$.“ Falsch, denn die Summen sind nicht gleich wahrscheinlich. Gleich wahrscheinlich sind die 36 Paare. Richtig: $P(\text{Summe 7})=\frac{6}{36}$.</li>
      <li><b>Ohne Zurücklegen, aber die Brüche bleiben gleich.</b> Nach dem ersten Zug liegt eine Kugel weniger in der Urne. Zähler <i>und</i> Nenner der zweiten Stufe ändern sich: $\frac35\cdot\frac24$ und nicht $\frac35\cdot\frac35$.</li>
      <li><b>Entlang des Pfades addiert.</b> $\frac35+\frac24$ wäre größer als 1 und kann keine Wahrscheinlichkeit sein. Entlang eines Pfades wird multipliziert.</li>
      <li><b>Die Münze „muss“ ausgleichen.</b> Nach fünfmal „Zahl“ ist „Wappen“ nicht wahrscheinlicher. Jeder Wurf ist neu. Das Gesetz der großen Zahlen ist eine Aussage über sehr viele Würfe und nicht über den nächsten.</li>
      <li><b>„Mindestens eine“ direkt gerechnet und dabei Fälle vergessen.</b> Rechne über das Gegenereignis „keine“: $1-P(\text{keine})$.</li>
    </ul></div>
    <div data-an="quiz" data-quiz="k8-1"></div>
  `, false, "8-1b");
  };
})();
