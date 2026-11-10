/* Kapitel 8, Teil 7 — 8.7 Abiturtraining · Prüfen Sie Ihr neues Fundament · Zusammenfassung */
(function () {
  const R = String.raw, H = AN.H;

  AN.QUIZ["k8-7"] = [
    { t: "num", q: R`Hilfsmittelfrei: In einer Urne liegen 2 rote und 3 blaue Kugeln. Es werden zwei Kugeln ohne Zurücklegen gezogen, $X$ ist die Anzahl der roten Kugeln. Berechne $E(X)$.`, a: 0.8, tol: 0.005, why: R`$P(X=1)=\frac25\cdot\frac34+\frac35\cdot\frac24=\frac{12}{20}$ und $P(X=2)=\frac25\cdot\frac14=\frac{2}{20}$. Also $E(X)=1\cdot\frac{12}{20}+2\cdot\frac{2}{20}=\frac{16}{20}=0{,}8$.` },
    { q: R`Eine Aufgabe lautet: „Zeigen Sie, dass die Ereignisse $A$ und $B$ stochastisch abhängig sind.“ Was wird erwartet?`, o: [R`Ein Satz wie „$A$ beeinflusst $B$, weil beide mit demselben Thema zu tun haben“`, R`Die Berechnung von $P(A)\cdot P(B)$ und $P(A\cap B)$ (oder von $P_B(A)$ und $P(A)$) und der Vergleich mit dem Ergebnis „ungleich“`, R`Ein vollständiges Baumdiagramm ohne weitere Rechnung`], a: 1, why: R`„Zeigen“ verlangt eine lückenlose Rechnung mit Schlussfolgerung. Bei Unabhängigkeit ist das immer derselbe Vergleich: Stimmt $P(A\cap B)$ mit $P(A)\cdot P(B)$ überein oder nicht?` },
    { t: "num", q: R`$3\,\%$ der Bauteile sind defekt, die Bauteile sind unabhängig voneinander. Zwei Bauteile werden geprüft. Mit welcher Wahrscheinlichkeit ist mindestens eines defekt?`, a: 0.0591, tol: 0.0005, why: R`Gegenereignis „beide in Ordnung“: $0{,}97^2=0{,}9409$. Also $1-0{,}9409=0{,}0591$.` }
  ];

  AN.QUIZ["k8-pruefen"] = [
    { t: "num", q: R`Aus einem Skatspiel mit 32 Karten wird eine Karte gezogen. Wie groß ist die Wahrscheinlichkeit für ein Ass?`, a: 0.125, tol: 0.001, why: R`Laplace-Experiment mit 4 günstigen von 32 Karten: $\frac{4}{32}=\frac18=0{,}125$.` },
    { t: "num", q: R`Von 100 Lernenden sind 55 weiblich. 40 lernen Spanisch, darunter 25 Schülerinnen. Eine Schülerin wird zufällig ausgewählt. Mit welcher Wahrscheinlichkeit lernt sie Spanisch?`, a: 25 / 55, tol: 0.003, why: R`Die Bedingung „weiblich“ verkleinert die Gruppe auf 55 Personen: $P_w(S)=\frac{25}{55}\approx0{,}455$.` },
    { q: R`Dieselben Daten: Sind „weiblich“ und „lernt Spanisch“ stochastisch unabhängig?`, o: [R`Ja, denn $0{,}55\cdot0{,}4=0{,}22$.`, R`Nein, denn $P(w\cap S)=0{,}25$, aber $P(w)\cdot P(S)=0{,}22$.`, R`Das hängt davon ab, wen man zuerst fragt.`], a: 1, why: R`$0{,}25\ne0{,}22$, also abhängig. Kontrolle: $P_w(S)\approx0{,}455$ ist größer als $P(S)=0{,}4$. Schülerinnen lernen in dieser Gruppe etwas häufiger Spanisch.` },
    { t: "num", q: R`$X$ nimmt die Werte $-1$; $2$; $5$ mit den Wahrscheinlichkeiten $0{,}7$; $0{,}2$; $0{,}1$ an. Berechne $E(X)$.`, a: 0.2, tol: 0.005, why: R`$E(X)=(-1)\cdot0{,}7+2\cdot0{,}2+5\cdot0{,}1=-0{,}7+0{,}4+0{,}5=0{,}2$.` },
    { t: "num", q: R`Berechne für dieselbe Zufallsgröße die Standardabweichung $\sigma$ (zwei Nachkommastellen).`, a: 1.99, tol: 0.01, why: R`$V(X)=(-1{,}2)^2\cdot0{,}7+1{,}8^2\cdot0{,}2+4{,}8^2\cdot0{,}1=1{,}008+0{,}648+2{,}304=3{,}96$, also $\sigma=\sqrt{3{,}96}\approx1{,}99$.` },
    { q: R`Eine Simulation mit 100 Versuchen liefert für ein Ereignis die relative Häufigkeit $0{,}31$. Die berechnete Wahrscheinlichkeit ist $0{,}25$. Wie beurteilst du das?`, o: [R`Die Rechnung muss falsch sein.`, R`Die Simulation muss falsch sein.`, R`Die Abweichung von $0{,}06$ liegt im üblichen Schwankungsbereich von etwa $0{,}1$ bei 100 Versuchen. Beides kann stimmen.`], a: 2, why: R`Bei $n=100$ ist eine Schwankung von etwa $\frac{1}{\sqrt{100}}=0{,}1$ normal. Erst mit deutlich mehr Versuchen könnte man einen Widerspruch erkennen.` }
  ];

  window.WS_K8_7_DE = function (S) {
    return S("8.7&nbsp;·&nbsp;Abiturtraining", R`
    <p>In Prüfungen tauchen die Inhalte dieses Kapitels selten einzeln auf. Typisch ist ein Sachzusammenhang, in dem du nacheinander ein Baumdiagramm oder eine Vierfeldertafel aufstellst, eine bedingte Wahrscheinlichkeit berechnest, die Unabhängigkeit prüfst und am Ende einen Erwartungswert deutest. Hier trainierst du diese Verbindung an zwei vollständig durchgerechneten Aufgaben. Danach findest du in den drei Aufgaben-Tabs je eine weitere Aufgabe zum Abschnitt 8.7.</p>

    <h3>Was die Operatoren verlangen</h3>
    <div class="nv-table-wrap"><table class="nv-table">
      <tr><th>Operator</th><th>Das wird erwartet</th></tr>
      <tr><td class="l"><b>Angeben, nennen</b></td><td class="l">Ergebnis ohne Begründung und ohne Rechenweg</td></tr>
      <tr><td class="l"><b>Berechnen</b></td><td class="l">Ergebnis mit nachvollziehbarem Rechenweg (Ansatz, Zwischenschritte)</td></tr>
      <tr><td class="l"><b>Bestimmen, ermitteln</b></td><td class="l">Lösungsweg frei wählbar (Baum, Tafel, Rechner), aber dokumentiert</td></tr>
      <tr><td class="l"><b>Zeigen, nachweisen</b></td><td class="l">lückenlose Rechnung oder Argumentation, die bei der behaupteten Aussage endet</td></tr>
      <tr><td class="l"><b>Interpretieren, deuten</b></td><td class="l">das Rechenergebnis in einem Satz im Sachzusammenhang erklären</td></tr>
      <tr><td class="l"><b>Beurteilen</b></td><td class="l">eine Aussage mit Rechnung und Argumenten prüfen und ein begründetes Urteil formulieren</td></tr>
    </table></div>
    <div class="nv-idee"><p><b>Drei Gewohnheiten, die Punkte bringen:</b> 1. Lege zu Beginn Ereignisse mit Buchstaben fest („$D$: Das Bauteil ist defekt“). 2. Schreibe gegebene Prozentsätze sofort als Wahrscheinlichkeiten mit der richtigen Bedingung auf ($P_A(D)=0{,}02$). 3. Beende jede Teilaufgabe mit einem Antwortsatz.</p></div>

    <h3>Aufgabe A (ohne Hilfsmittel): Urne und Zufallsgröße</h3>
    <p>In einer Urne liegen 4 rote und 6 blaue Kugeln. Es werden nacheinander zwei Kugeln ohne Zurücklegen gezogen. <b>a)</b> Berechnen Sie die Wahrscheinlichkeit dafür, dass beide Kugeln dieselbe Farbe haben. <b>b)</b> Die Zufallsgröße $X$ gibt die Anzahl der gezogenen roten Kugeln an. Geben Sie die Wahrscheinlichkeitsverteilung von $X$ an und berechnen Sie den Erwartungswert.</p>
    <figure class="nv-figure"><div data-an="w-urne" data-r="4" data-b="6" data-ev="beiderot"></div><figcaption>Abb. 1: Die Urne aus Aufgabe A. Kontrolliere deine Ergebnisse mit 1000 Versuchen.</figcaption></figure>
    ` + H.ST("Lösung zu Aufgabe A", [
      R`<b>Baumdiagramm (gedanklich oder als Skizze).</b> Erste Stufe: $\frac{4}{10}$ für Rot, $\frac{6}{10}$ für Blau. Zweite Stufe nach Rot: $\frac39$ und $\frac69$. Nach Blau: $\frac49$ und $\frac59$.`,
      R`<b>a) Pfade „rot – rot“ und „blau – blau“.</b> $P(\text{gleiche Farbe})=\frac{4}{10}\cdot\frac39+\frac{6}{10}\cdot\frac59=\frac{12}{90}+\frac{30}{90}=\frac{42}{90}=\frac{7}{15}$.`,
      R`<b>b) Verteilung.</b> $P(X=0)=\frac{30}{90}=\frac13$ (blau – blau), $P(X=2)=\frac{12}{90}=\frac{2}{15}$ (rot – rot), $P(X=1)=1-\frac{30}{90}-\frac{12}{90}=\frac{48}{90}=\frac{8}{15}$.`,
      R`<b>Erwartungswert.</b> $E(X)=0\cdot\frac{5}{15}+1\cdot\frac{8}{15}+2\cdot\frac{2}{15}=\frac{12}{15}=0{,}8$.`,
      R`<b>Deutung und Kontrolle.</b> Im Mittel sind $0{,}8$ der zwei gezogenen Kugeln rot. Das passt: 40 % der Kugeln sind rot, und 40 % von 2 sind $0{,}8$.`
    ]) + R`
    <h3>Aufgabe B (mit Rechner): Zwei Maschinen</h3>
    <p>Ein Betrieb stellt Bauteile auf zwei Maschinen her. Maschine A liefert 60 % der Bauteile, davon sind 2 % Ausschuss. Maschine B liefert 40 %, davon sind 5 % Ausschuss. <b>a)</b> Bestimmen Sie den Anteil der Ausschussteile an der gesamten Produktion. <b>b)</b> Ein zufällig entnommenes Bauteil ist Ausschuss. Berechnen Sie die Wahrscheinlichkeit, dass es von Maschine B stammt. <b>c)</b> Untersuchen Sie, ob „stammt von Maschine B“ und „ist Ausschuss“ stochastisch unabhängig sind.</p>
    ` + H.ST("Lösung zu Aufgabe B", [
      R`<b>Ereignisse und Angaben.</b> $B$: stammt von Maschine B, $D$: ist Ausschuss. Gegeben: $P(B)=0{,}4$, $P(\overline{B})=0{,}6$, $P_B(D)=0{,}05$, $P_{\overline{B}}(D)=0{,}02$.`,
      R`<b>a) Totale Wahrscheinlichkeit.</b> $P(D)=0{,}6\cdot0{,}02+0{,}4\cdot0{,}05=0{,}012+0{,}020=0{,}032$. Der Ausschussanteil beträgt $3{,}2\,\%$.`,
      R`<b>b) Umgekehrte Bedingung.</b> $P_D(B)=\dfrac{P(B\cap D)}{P(D)}=\dfrac{0{,}020}{0{,}032}=0{,}625$. Ein Ausschussteil stammt mit $62{,}5\,\%$ von Maschine B, obwohl sie nur 40 % der Teile herstellt.`,
      R`<b>c) Unabhängigkeit prüfen.</b> $P(B)\cdot P(D)=0{,}4\cdot0{,}032=0{,}0128$, aber $P(B\cap D)=0{,}020$. Die Werte sind verschieden, also sind die Ereignisse stochastisch abhängig. (Kürzer: $P_B(D)=0{,}05\ne0{,}032=P(D)$.)`
    ]) + R`
    <div data-an="quiz" data-quiz="k8-7"></div>
    <div class="an-pfad"><button type="button" data-tab="afb1">Weiter üben: Aufgaben AFB I</button><button type="button" data-tab="afb2">Aufgaben AFB II</button><button type="button" data-tab="afb3">Aufgaben AFB III</button></div>
  `, false, "8-7")

    + S("Prüfen&nbsp;Sie&nbsp;Ihr&nbsp;neues&nbsp;Fundament", R`
    <p>Hier prüfst du, ob die Inhalte des Kapitels sitzen. Gehe zuerst die Liste durch und sei ehrlich zu dir. Bearbeite dann den Test. Bei Lücken springst du über die Schaltflächen zurück in den passenden Abschnitt.</p>
    <ul class="nv-check">
      <li>Ich kann Ergebnismenge, Ereignis und Gegenereignis angeben und bei Laplace-Experimenten Wahrscheinlichkeiten durch Zählen bestimmen.</li>
      <li>Ich kann mehrstufige Zufallsexperimente im Baumdiagramm darstellen und die Pfadregeln anwenden, mit und ohne Zurücklegen.</li>
      <li>Ich kann eine Vierfeldertafel aufstellen und bedingte Wahrscheinlichkeiten ablesen und berechnen.</li>
      <li>Ich kann $P_B(A)$ und $P_A(B)$ unterscheiden und eine Bedingung „umkehren“.</li>
      <li>Ich kann rechnerisch prüfen, ob zwei Ereignisse stochastisch unabhängig sind.</li>
      <li>Ich kann eine Simulation planen, auswerten und ihre Genauigkeit beurteilen.</li>
      <li>Ich kann die Wahrscheinlichkeitsverteilung einer Zufallsgröße aufstellen.</li>
      <li>Ich kann Erwartungswert und Standardabweichung berechnen und im Sachzusammenhang deuten.</li>
    </ul>
    <div data-an="quiz" data-quiz="k8-pruefen"></div>
    <div class="an-pfad"><button type="button" data-goto="8-1">zurück zu 8.1</button><button type="button" data-goto="8-2">8.2</button><button type="button" data-goto="8-3">8.3</button><button type="button" data-goto="8-4">8.4</button><button type="button" data-goto="8-5">8.5</button><button type="button" data-goto="8-6">8.6</button></div>
  `, false, "8-pruefen")

    + S("Zusammenfassung", R`
    <div class="nv-summary">
      <p><b>Grundbegriffe.</b> Ergebnismenge $\Omega$, Ereignis $E\subseteq\Omega$, Gegenereignis $\overline{E}$ mit $P(\overline{E})=1-P(E)$. Laplace-Experiment: $P(E)=\frac{|E|}{|\Omega|}$. Additionssatz: $P(A\cup B)=P(A)+P(B)-P(A\cap B)$. Empirisches Gesetz der großen Zahlen: Die relative Häufigkeit stabilisiert sich bei vielen Versuchen in der Nähe der Wahrscheinlichkeit.</p>
      <p><b>Pfadregeln.</b> Entlang eines Pfades multiplizieren, mehrere Pfade addieren. Ohne Zurücklegen ändern sich die Wahrscheinlichkeiten von Stufe zu Stufe.</p>
      <p><b>Bedingte Wahrscheinlichkeit.</b> $P_B(A)=\dfrac{P(A\cap B)}{P(B)}$. Die Bedingung legt die Grundgesamtheit fest. Im Baum stehen bedingte Wahrscheinlichkeiten an den Ästen der zweiten Stufe. Umkehren der Bedingung: passende Pfade addieren, gesuchten Pfad durch die Summe teilen (Satz von Bayes).</p>
      <p><b>Unabhängigkeit.</b> $A$ und $B$ sind stochastisch unabhängig $\iff P(A\cap B)=P(A)\cdot P(B)\iff P_B(A)=P(A)$.</p>
      <p><b>Simulation.</b> Modell mit denselben Wahrscheinlichkeiten festlegen, oft wiederholen, relative Häufigkeit als Schätzwert verwenden. Übliche Schwankung etwa $\frac{1}{\sqrt n}$.</p>
      <p><b>Zufallsgröße.</b> $X$ ordnet jedem Ergebnis eine Zahl zu. Die Wahrscheinlichkeitsverteilung gibt alle $P(X=k)$ an, ihre Summe ist 1.</p>
      <p><b>Kennzahlen.</b> Erwartungswert $\mu=E(X)=\sum x_i\cdot P(X=x_i)$. Varianz $V(X)=\sum(x_i-\mu)^2\cdot P(X=x_i)$. Standardabweichung $\sigma=\sqrt{V(X)}$. Faires Spiel: Erwartungswert des Gewinns ist 0.</p>
    </div>
    <div class="nv-table-wrap"><table class="nv-table">
      <tr><th>Frage in der Aufgabe</th><th>Werkzeug</th></tr>
      <tr><td class="l">„Wie wahrscheinlich ist … und dann …?“</td><td class="l">Baumdiagramm, Pfadmultiplikationsregel</td></tr>
      <tr><td class="l">„mindestens ein …“</td><td class="l">Gegenereignis: $1-P(\text{kein})$</td></tr>
      <tr><td class="l">„unter den …“, „wenn man weiß, dass …“</td><td class="l">bedingte Wahrscheinlichkeit, Vierfeldertafel</td></tr>
      <tr><td class="l">„Hängen … und … zusammen?“</td><td class="l">$P(A\cap B)$ mit $P(A)\cdot P(B)$ vergleichen</td></tr>
      <tr><td class="l">„Was ist auf lange Sicht zu erwarten?“, „Ist das Spiel fair?“</td><td class="l">Erwartungswert</td></tr>
      <tr><td class="l">„Wie stark schwanken die Werte?“, „Welches Spiel ist riskanter?“</td><td class="l">Standardabweichung</td></tr>
    </table></div>
    <p>Alle Formeln findest du zum Nachschlagen auch im Tab <button type="button" class="an-btn an-btn-sm" data-tab="speicher">Wissensspeicher</button>, alle Simulationen im Tab <button type="button" class="an-btn an-btn-sm" data-tab="labor">Simulationslabor</button>.</p>
  `, false, "8-zus");
  };
})();
