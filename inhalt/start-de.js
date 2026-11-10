/* Startseite (deutsch) */
AN_REG("start", "de", function (S) {
  const R = String.raw;
  return R`
<div class="nv-lede"><b>Willkommen!</b> Ob ein Würfel die 6 zeigt, weiß vorher niemand. Wie oft die 6 bei 6000 Würfen fällt, lässt sich dagegen erstaunlich genau vorhersagen. Mit dieser Plattform lernst du, <b>den Zufall zu berechnen</b>: Wie sicher ist ein medizinischer Test? Hängen zwei Merkmale zusammen? Lohnt sich ein Glücksspiel? Weil es in der Wahrscheinlichkeitsrechnung immer um viele Wiederholungen geht, kannst du jedes Experiment hier als <b>3D-Simulation</b> selbst durchführen, einmal zum Zusehen oder tausendmal auf einen Tipp.</div>
<div data-an="a-fortschritt"></div>
` + S("So arbeitest du mit dieser Plattform", R`
  <p>Jeder Abschnitt ist gleich aufgebaut. Du kannst ihn Schritt für Schritt von oben nach unten durcharbeiten:</p>
  <div class="nv-table-wrap"><table class="nv-table">
    <tr><th>Baustein</th><th>Was dich erwartet</th></tr>
    <tr><td class="l"><b>Einstieg und „Das neue Problem“</b></td><td class="l">Eine Frage aus dem Alltag und das Problem, das der Abschnitt löst.</td></tr>
    <tr><td class="l"><b>Erst vermuten</b> <span class="an-hint">(gestrichelter Kasten)</span></td><td class="l">Du legst dich fest, bevor du rechnest oder simulierst. Deine Vermutung wird auf diesem Gerät gespeichert.</td></tr>
    <tr><td class="l"><b>Probiere aus</b> <span class="an-hint">(violetter Kasten)</span></td><td class="l">Eine <b>3D-Simulation</b> mit Beobachtungsauftrag: würfeln, Münzen werfen, Kugeln ziehen, ein Glücksrad drehen.</td></tr>
    <tr><td class="l"><b>Erklärung und Beispiele</b></td><td class="l">Schritt für Schritt hergeleitet, mit vollständig durchgerechneten Beispielen <span class="an-hint">(gelber Kasten)</span> und Herleitungen zum Aufdecken.</td></tr>
    <tr><td class="l"><b>Merke</b> <span class="an-hint">(grüner Kasten)</span></td><td class="l">Das Wichtigste in einem Satz.</td></tr>
    <tr><td class="l"><b>Häufige Fehler</b> <span class="an-hint">(roter Kasten)</span></td><td class="l">Was erfahrungsgemäß falsch gemacht wird, und wie du es vermeidest.</td></tr>
    <tr><td class="l"><b>Selbsttest</b></td><td class="l">Fragen mit sofortiger Rückmeldung und Begründung.</td></tr>
  </table></div>
  <p>Außerdem gibt es das <b>Simulationslabor</b> (alle Simulationen zum freien Experimentieren), drei Aufgaben-Tabs (<b>AFB I</b>: Grundwissen anwenden, <b>AFB II</b>: Zusammenhänge herstellen, <b>AFB III</b>: Problemlösen und Begründen) den <b>Wissensspeicher</b> zum Nachschlagen und <b>Lernkarten</b> zum Ausdrucken.</p>
  <p class="an-hint">Tipp: Die Abschnitte klappst du mit einem Tipp auf die Überschrift auf und zu. Über „Optionen“ oben rechts kannst du die Kopfzeile einklappen.</p>
`, true, "start-1")
  + S("Probiere gleich etwas aus", R`
  <p>Zwei Würfel werden geworfen. Wetten wir: Du gewinnst, wenn die Augensumme 7 fällt. Wie oft gewinnst du?</p>
  <div data-an="w-wuerfel" data-ev="summe7"></div>
  <div class="nv-idee"><p><b>Probiere aus:</b> Würfle einmal mit Animation. Tippe dann auf „10×“, auf „100×“ und mehrmals auf „1000×“. Beobachte das rechte Diagramm: Am Anfang springt die blaue Linie wild, dann beruhigt sie sich. <b>Bei welchem Wert?</b> Genau diese Zahl kannst du am Ende von Abschnitt 8.1 ohne einen einzigen Wurf berechnen.</p></div>
`, false, "start-2")
  + S("Dein Lernweg im Überblick", R`
  <p><b>Kapitel 8 – Grundbegriffe der Wahrscheinlichkeitsrechnung</b></p>
  <div class="an-pfad an-fahrplan">
    <button type="button" data-goto="8-fund">Ihr Fundament</button><button type="button" data-goto="8-1">8.1 Wiederholung: Grundlagen der Stochastik</button><button type="button" data-goto="8-2">8.2 Bedingte Wahrscheinlichkeit</button><button type="button" data-goto="8-3">8.3 Stochastische Unabhängigkeit</button><button type="button" data-goto="8-4">8.4 Simulation von Zufallsexperimenten</button><button type="button" data-goto="8-5">8.5 Zufallsgrößen und Wahrscheinlichkeitsverteilung</button><button type="button" data-goto="8-6">8.6 Erwartungswert und Standardabweichung</button><button type="button" data-goto="8-7">8.7 Abiturtraining</button><button type="button" data-goto="8-pruefen">Prüfen Sie Ihr neues Fundament</button><button type="button" data-goto="8-zus">Zusammenfassung</button>
  </div>
  <div class="nv-idee"><p><b>Empfehlung:</b> Arbeite die Abschnitte in der Reihenfolge durch. Besonders wichtig ist <b>Abschnitt 8.2</b>: Wer sicher unterscheidet, <i>welche Gruppe die Grundgesamtheit ist</i>, hat mit 8.3 und mit den Prüfungsaufgaben in 8.7 wenig Mühe.</p></div>
`, false, "start-3")
  + S("Nützlich zu wissen", R`
  <ul>
    <li><b>Eingaben:</b> Wahrscheinlichkeiten kannst du als Dezimalzahl (0,25 oder 0.25) oder als Bruch (1/4) eingeben.</li>
    <li><b>Schreibweisen:</b> Die bedingte Wahrscheinlichkeit von $A$ unter der Bedingung $B$ schreiben wir $P_B(A)$. Das Gegenereignis von $A$ ist $\overline{A}$.</li>
    <li><b>3D-Simulationen:</b> „1× mit Animation“ zeigt einen Versuch in Ruhe. „10×“ läuft im Schnelldurchlauf, „100×“ und „1000×“ rechnen sofort. Jede Simulation liefert bei jedem Durchgang andere Zahlen, genau wie ein echtes Experiment.</li>
    <li><b>Offline und Datenschutz:</b> Alles läuft in deinem Browser, auch ohne Internetverbindung (dann nur mit einer anderen Schrift). Vermutungen und Fortschritt bleiben nur auf diesem Gerät gespeichert.</li>
  </ul>
`, false, "start-4");
});
