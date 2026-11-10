/* Tab „Simulationslabor“ (deutsch): alle 3D-Simulationen zum freien Experimentieren */
AN_REG("labor", "de", function (S) {
  const R = String.raw;
  return R`<div class="nv-lede"><b>Simulationslabor.</b> Hier findest du alle 3D-Simulationen der Plattform an einem Ort. In der Wahrscheinlichkeitsrechnung geht es fast immer darum, was passiert, wenn man ein Zufallsexperiment <b>sehr oft</b> wiederholt. Genau das kannst du hier tun: erst <b>einmal mit Animation</b> zusehen, dann 10-, 100- und 1000-mal wiederholen. Die blauen Säulen zeigen, was tatsächlich passiert ist (relative Häufigkeiten). Die rot gestrichelten Linien zeigen, was die Rechnung vorhersagt (Wahrscheinlichkeiten).</div>
<div class="nv-idee"><p><b>So forschst du:</b> 1. Erst vermuten, was herauskommt. 2. Wenige Versuche ansehen. 3. Viele Versuche durchführen. 4. Mit der Rechnung vergleichen. Notiere dir, bei welcher Versuchszahl relative Häufigkeit und Wahrscheinlichkeit auf zwei Nachkommastellen übereinstimmen.</p></div>
` + S("Würfel&nbsp;·&nbsp;ein Würfel", R`
  <p>Wähle ein Ereignis und beobachte, wie sich seine relative Häufigkeit mit wachsender Versuchszahl bei der Wahrscheinlichkeit einpendelt (empirisches Gesetz der großen Zahlen, Abschnitt 8.1).</p>
  <div data-an="w-wuerfel" data-ev="sechs"></div>`, true, "lab-w1")
  + S("Würfel&nbsp;·&nbsp;zwei Würfel und die Augensumme", R`
  <p>Die Augensummen 2 bis 12 sind <b>nicht</b> gleich wahrscheinlich. Warum ist die 7 am häufigsten? Zähle die Ergebnisse $(1|6), (2|5), \dots$</p>
  <div data-an="w-wuerfel" data-ev="summe7"></div>`, false, "lab-w2")
  + S("Münzen&nbsp;·&nbsp;eine Münze", R`
  <div data-an="w-muenze" data-n="1"></div>`, false, "lab-m1")
  + S("Münzen&nbsp;·&nbsp;drei Münzen, Zufallsgröße X = Anzahl „Wappen“", R`
  <p>Hier wird jedem Ergebnis eine Zahl zugeordnet: die Anzahl der Münzen, die „Wappen“ zeigen (Abschnitt 8.5). Der Mittelwert vieler Versuche nähert sich dem Erwartungswert 1,5 (Abschnitt 8.6).</p>
  <div data-an="w-muenze" data-n="3"></div>`, false, "lab-m3")
  + S("Urne&nbsp;·&nbsp;3 rote und 2 blaue Kugeln, mit und ohne Zurücklegen", R`
  <p>Stelle oben „ohne Zurücklegen“ oder „mit Zurücklegen“ ein. Achte auf die Zeile unter den Diagrammen: Dort wird nur ein Teil der Versuche ausgewertet. Das ist die Idee der <b>bedingten Wahrscheinlichkeit</b> (Abschnitt 8.2) und der <b>Unabhängigkeit</b> (Abschnitt 8.3).</p>
  <div data-an="w-urne" data-r="3" data-b="2"></div>`, false, "lab-u1")
  + S("Urne&nbsp;·&nbsp;große Urne mit 12 roten und 8 blauen Kugeln", R`
  <p>Derselbe Anteil roter Kugeln (60 %), aber viermal so viele Kugeln. Vergleiche „ohne Zurücklegen“ mit der kleinen Urne: Wie stark hängt der zweite Zug jetzt noch vom ersten ab?</p>
  <div data-an="w-urne" data-r="12" data-b="8"></div>`, false, "lab-u2")
  + S("Test&nbsp;·&nbsp;1000 Personen, Vierfeldertafel", R`
  <p>Jede Säule ist eine Person. Verändere den Anteil der Kranken und die Güte des Tests. Mit „Sortieren“ stellst du die vier Gruppen der Vierfeldertafel nebeneinander.</p>
  <div data-an="w-test"></div>`, false, "lab-t")
  + S("Glücksrad&nbsp;·&nbsp;Auszahlung als Zufallsgröße", R`
  <p>Das Rad zahlt 0 €, 1 €, 2 € oder 5 € aus. Wie viel bekommst du im Mittel pro Spiel? Diese Zahl ist der Erwartungswert.</p>
  <div data-an="w-rad" data-sektoren="0:2;1:1;0:2;2:1;0:1;5:1"></div>`, false, "lab-r1")
  + S("Glücksrad&nbsp;·&nbsp;Spiel mit 2 € Einsatz", R`
  <p>Dasselbe Rad, aber jedes Spiel kostet 2 € Einsatz. Die Zufallsgröße ist jetzt der <b>Gewinn</b> (Auszahlung minus Einsatz). Ist das Spiel fair?</p>
  <div data-an="w-rad" data-sektoren="0:2;1:1;0:2;2:1;0:1;5:1" data-einsatz="2"></div>`, false, "lab-r2")
  + S("Simulation&nbsp;·&nbsp;Freiwürfe mit Zufallsziffern", R`
  <div data-an="w-sim-freiwurf"></div>`, false, "lab-s1")
  + S("Simulation&nbsp;·&nbsp;Sammelproblem mit dem Würfel", R`
  <div data-an="w-sim-sammeln"></div>`, false, "lab-s2")
  + S("Simulation&nbsp;·&nbsp;Geburtstagsproblem", R`
  <p>Wie groß muss eine Gruppe sein, damit mit mehr als 50 % Wahrscheinlichkeit zwei Personen am selben Tag Geburtstag haben? Verändere die Gruppengröße.</p>
  <div data-an="w-sim-geburtstag" data-k="23"></div>`, false, "lab-s3");
});
