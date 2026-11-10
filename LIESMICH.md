# Lernplattform Wahrscheinlichkeitsrechnung

Interaktive Lernplattform zu Kapitel 8 „Grundbegriffe der Wahrscheinlichkeitsrechnung“ des Lehrbuchs.
Aufbau, Didaktik und Bausteine nach der „Lernplattform Analysis“ (Seitenrahmen, Tabs, Abschnitte, Aufgabenkarten, Vermutungskästen, Herleitungen zum Aufdecken, Wissensspeicher, Fortschritt).
Neu sind die **3D-animierten Simulationen** (three.js), mit denen sich jedes Zufallsexperiment einmal mit Animation oder 10-, 100-, 1000-mal wiederholen lässt.
Alles läuft statisch im Browser; keine KI zur Laufzeit, keine Schülerdaten verlassen das Gerät.

## Starten
- Lokal: Ordner im Terminal öffnen, `python3 -m http.server 8791` ausführen, dann `http://localhost:8791/` aufrufen.
- Online: Ordner auf GitHub Pages hochladen.
- Offline: Formelsatz (MathJax 3.2.2) und 3D (three.js r128) liegen im Ordner `libs/`. Aus dem Internet kommen nur noch die Schriften (Google Fonts); ohne Verbindung werden Systemschriften verwendet. Ohne WebGL laufen die Simulationen ohne 3D-Bild weiter (Diagramme und Zahlen bleiben).

## Inhalt (Stand: Ausbaustufe 2, Deutsch)
| Tab | Inhalt |
|---|---|
| Start | Wegweiser, Fortschritt, erste Simulation, Lernweg |
| 8 · Wahrscheinlichkeitsrechnung | Ihr Fundament · 8.1 Wiederholung: Grundlagen der Stochastik (zwei Abschnitte: Grundbegriffe, Pfadregeln) · 8.2 Bedingte Wahrscheinlichkeit · 8.3 Stochastische Unabhängigkeit · 8.4 Simulation von Zufallsexperimenten · 8.5 Zufallsgrößen und Wahrscheinlichkeitsverteilung · 8.6 Erwartungswert und Standardabweichung · 8.7 Abiturtraining · Prüfen Sie Ihr neues Fundament · Zusammenfassung |
| Simulationslabor | alle 3D-Simulationen zum freien Experimentieren (12 Stationen) |
| Aufgaben · AFB I–III | je 14 Aufgaben (zwei je Abschnitt 8.1–8.7), zusammen 42 Aufgaben mit 170 Teilaufgaben; Selbstprüfung, Hilfen in 3 Stufen, Analyse, Ansatz, Lösung, Antwortsatz |
| Wissensspeicher | 18 Karten, durchsuchbar |
| Lernkarten | 18 Karten im Format DIN A6 (je AFB 6; Nr. 1–6 AFB I, 7–12 AFB II, 13–18 AFB III): Aufgabe, Musterlösung, Theorie mit Merksatz, Formeln/Vorgehen, häufigste Fehler; Aufruf `lernkarten.html?n=1` bis `18`; Druck: A5 quer, 100 %, beidseitig „Wenden an der kurzen Kante“ |

Noch nicht enthalten (in der Analysis-Plattform vorhanden): CAS-Rechner-Tabs, Werkzeuge-Tab, Englisch/Ukrainisch, verschleierte `dist/`-Fassung.

## Didaktischer Aufbau eines Abschnitts
Einstieg (Alltagsfrage) → **Das neue Problem** → **Erst vermuten** (gespeicherte Vermutung) → **Probiere aus** (3D-Simulation mit Beobachtungsauftrag) → Erklärung in kleinen Schritten → durchgerechnete Beispiele → Herleitung zum Aufdecken → **Merke** → **Häufige Fehler** → Selbsttest.

## 3D-Simulationen (`shared/ws-sim3d.js`)
Einbindung im Text: `<div data-an="NAME" data-…></div>`

| Name | Zeigt | Optionen |
|---|---|---|
| `w-wuerfel` | ein oder zwei Würfel, Säulen der Augenzahlen/Augensummen, Verlauf der relativen Häufigkeit eines Ereignisses | `data-ev` = sechs, gerade, min5 (ein Würfel) · summe7, pasch, min1sechs, summe10 (zwei Würfel) |
| `w-muenze` | 1–3 Münzen; ab 2 Münzen Zufallsgröße X = Anzahl Wappen mit Mittelwert | `data-n` |
| `w-urne` | Glasurne, zweimal ziehen mit/ohne Zurücklegen, mitzählendes Baumdiagramm, bedingte relative Häufigkeiten | `data-r`, `data-b`, `data-zurueck` (0/1), `data-ev` = zweiterot, beiderot, verschieden, min1rot |
| `w-rad` | Glücksrad, Verteilung der Auszahlung bzw. des Gewinns, Mittelwert gegen Erwartungswert, μ und σ | `data-sektoren="Wert:Gewicht;…"`, `data-einsatz`, `data-einheit` |
| `w-test` | 1000 Personen als Säulen (krank/gesund, Test positiv/negativ), Sortieren, Vierfeldertafel, P_positiv(krank) | `data-p`, `data-se`, `data-sp` (Prozent) |
| `w-sim-freiwurf` | Ziffernrad 0–9, drei Freiwürfe mit 70 % | – |
| `w-sim-sammeln` | Würfeln, bis alle Augenzahlen da sind (Sammelproblem) | – |
| `w-sim-geburtstag` | Kalender mit 365 Feldern, Geburtstagsproblem | `data-k` (Gruppengröße) |

Technik: Alle Szenen teilen sich einen WebGL-Renderer, das Bild wird in die Leinwand des jeweiligen Bausteins kopiert (keine Grenze für die Anzahl der Bausteine). Gerendert wird nur bei Animation oder Größenänderung.

## Dateien
| Pfad | Zweck |
|---|---|
| `index.html` | Seitenrahmen (aus der Analysis-Plattform, Tabs und Skripte angepasst) |
| `shared/an-plot.js`, `an.css`, `an-neu.css` | unverändert aus der Analysis-Plattform |
| `shared/an-app.js`, `an-tasks.js`, `an-neu.js` | aus der Analysis-Plattform, angepasst (Tabs, Abschnittsliste 8.1–8.7, eigene Speicherschlüssel `ws-…`) |
| `shared/ws-core.js` | Register, Selbsttest, Montage, Textbausteine `AN.H.P/V/ST` |
| `shared/ws-sim3d.js`, `shared/ws.css` | 3D-Simulationen und Diagramme |
| `inhalt/k8-N-de.js` | Texte je Abschnitt (in `String.raw`, LaTeX-Backslashes einfach) |
| `inhalt/aufgaben-afbN-de.js`, `aufgaben-afbN-b-de.js` | erste und zweite Aufgabe je Abschnitt (`AN_TASKS_ADD`), Format wie in der Analysis-Plattform |
| `lernkarten.html`, `shared/lernkarten.js/.css`, `inhalt/karten/karten-afbN-de.js`, `karten-afbN-b-de.js` | Lernkarten-Seite und Kartendaten (`AN_KARTEN_ADD`) |
| `inhalt/start-de.js`, `k8-de.js`, `labor-de.js`, `speicher-de.js` | Startseite, Kapitelrahmen, Simulationslabor, Wissensspeicher |
| `libs/three.min.js`, `libs/mathjax/tex-svg.js` | lokale Kopien der Bibliotheken (von cdnjs.cloudflare.com, MIT- bzw. Apache-2.0-Lizenz) |
| `werkzeuge/check_zahlen.py` | Prüfrechnungen zu allen Zahlenwerten (`python3 -I werkzeuge/check_zahlen.py`) |

---
Copyright B. Ericke – Schuljahr 2026/2027. Nur für den Unterricht. Weitergabe, Veränderungen, Veröffentlichung durch Dritte nicht gestattet.
