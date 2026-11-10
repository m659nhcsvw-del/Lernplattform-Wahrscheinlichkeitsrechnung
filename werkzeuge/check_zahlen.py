"""Prüfrechnungen zu den Zahlenwerten der Plattform (python3 -I werkzeuge/check_zahlen.py)."""
from fractions import Fraction as F
from math import comb, sqrt, prod
from itertools import product
ok = True
def chk(name, got, want, tol=6e-4):
    global ok
    good = abs(float(got) - want) <= tol; ok &= good
    print(("ok   " if good else "FEHLER"), name, float(got), want)
W = list(product(range(1, 7), repeat=2))
chk("genau 10 Sechsen bei 60", comb(60, 10) * (1/6)**10 * (5/6)**50, 0.137, 2e-3)
chk("Summe 7", F(sum(a+b == 7 for a, b in W), 36), 1/6)
chk("mind. eine 6 (2 Wuerfel)", F(sum(6 in w for w in W), 36), 0.3056)
chk("Summe 5", F(sum(a+b == 5 for a, b in W), 36), 0.1111)
chk("mind. eine 6 (3 Wuerfe)", 1-F(5, 6)**3, 0.4213)
chk("Urne 3r2b verschieden ohne", F(3,5)*F(2,4)+F(2,5)*F(3,4), 0.6)
chk("Urne 3r2b verschieden mit", 2*F(3,5)*F(2,5), 0.48)
chk("Test 2/95/90", 0.02*0.95/(0.02*0.95+0.98*0.10), 0.1624)
chk("Alarm", 0.0099/0.0297, 1/3)
chk("Sportverein", 0.18/0.36, 0.5)
chk("Freiwurf >=2", 0.7**3+3*0.7**2*0.3, 0.784)
chk("Sammelproblem 6", 6*sum(F(1, k) for k in range(1, 7)), 14.7)
chk("Sammelproblem 10", 10*sum(F(1, k) for k in range(1, 11)), 29.29, 1e-2)
gb = lambda k: 1-prod((365-i)/365 for i in range(k))
chk("Geburtstag 23", gb(23), 0.5073); chk("Geburtstag 41 > 0,9", gb(41), 0.9032); assert gb(40) < 0.9
rad = {0: F(5,8), 1: F(1,8), 2: F(1,8), 5: F(1,8)}
mu = sum(x*p for x, p in rad.items()); var = sum((x-mu)**2*p for x, p in rad.items())
chk("Rad mu", mu, 1); chk("Rad V", var, 2.75); chk("Rad sigma", sqrt(var), 1.658)
chk("Wuerfel V", sum((x-3.5)**2 for x in range(1,7))/6, 2.9167)
chk("3 Muenzen E", sum(k*comb(3,k) for k in range(4))/8, 1.5)
v = {-1: .7, 2: .2, 5: .1}; m = sum(x*p for x, p in v.items())
chk("Pruefen E", m, 0.2); chk("Pruefen sigma", sqrt(sum((x-m)**2*p for x, p in v.items())), 1.99, 5e-3)
chk("Abi A gleich", F(4,10)*F(3,9)+F(6,10)*F(5,9), 7/15); chk("Abi A E", F(48,90)+2*F(12,90), 0.8)
chk("Abi B", 0.02/0.032, 0.625); chk("k8-7 E", F(12,20)+2*F(2,20), 0.8); chk("k8-7 3%", 1-0.97**2, 0.0591)
chk("afb1-04 exakt", 1-0.8**5-5*0.2*0.8**4, 0.2627)
los = {20: .01, 5: .09, 1: .3, 0: .6}; ml = sum(x*p for x, p in los.items())
chk("Los E", ml, 0.95); chk("Los sigma", sqrt(sum((x-ml)**2*p for x, p in los.items())), 2.3764)
chk("afb2-01 gleich", F(20+6+2, 90), 0.3111); chk("Spam", 0.288/0.323, 0.8916); chk("Spam nicht markiert", 0.012/0.677, 0.01773)
chk("6!/6^6", F(720, 6**6), 0.01543)
d = [abs(a-b) for a, b in W]; chk("Differenz E", F(sum(d), 36), 1.9444); assert [d.count(k) for k in range(6)] == [6,10,8,6,4,2]
hv = {600: .04, 150: .1, 0: .86}; mh = sum(x*p for x, p in hv.items())
chk("Handy E", mh, 39); chk("Handy sigma", sqrt(sum((x-mh)**2*p for x, p in hv.items())), 123)
chk("Werke", 0.018/0.039, 0.4615)
q = 0.00099/0.02097; chk("selten 1", q, 0.0472); chk("selten 2", q*.99/(q*.99+(1-q)*.02), 0.7104)
chk("0,5^7", 0.5**7, 0.0078); assert 0.5**6 > 0.01 and 0.8**10 > 0.1 > 0.8**11
chk("Kekse >=2", 3*0.04*0.8+0.008, 0.104); chk("Wurzel 2", sqrt(2), 1.414)
# ---- zweite Aufgaben je Abschnitt und Lernkarten ----
chk("Skat Herz oder Ass", F(11,32), 0.34375); chk("Skat zwei Asse", F(4,32)*F(3,31), 0.0121)
chk("Bus", 0.06/0.09, 2/3); chk("LED exakt", 1-0.9**5, 0.4095)
g = "52731 80946 13375 60482 97315 24680 11359 73921 05567 38214 69953 42178 90326 15784 86431 27059 33618 74295 58162 41937".split()
assert len(g) == 20 and sum("0" in x for x in g) == 6
zr = {1: .4, 2: .3, 5: .2, 10: .1}; mz = sum(x*p for x, p in zr.items())
chk("Zahlenrad mu", mz, 3); chk("Zahlenrad V", sum((x-mz)**2*p for x, p in zr.items()), 7.6); chk("Zahlenrad sigma", sqrt(7.6), 2.757)
chk("Ampeln genau eine", .4*.5*.75+.6*.5*.75+.6*.5*.25, 0.45); chk("Ampeln keine", .6*.5*.75, 0.225)
chk("Grippe", 0.024/0.084, 0.2857); chk("Schaltung", .1*.8+.9*.2, 0.26); chk("1/sqrt(500)", 1/sqrt(500), 0.0447)
chk("Schluessel 3", F(3,4)*F(2,3)*F(1,2), 0.25)
for nm, d, m0, s0 in [("A", {4: .5, -2: .5}, 1, 3), ("B", {10: .2, -1.25: .8}, 1, 4.5)]:
    m = sum(x*p for x, p in d.items()); chk("Spiel "+nm+" mu", m, m0); chk("Spiel "+nm+" sigma", sqrt(sum((x-m)**2*p for x, p in d.items())), s0)
chk("Anschluss", 0.14/0.18, 0.7778); chk("0,82^5", 0.82**5, 0.3707)
chk("erste 6 im 3.", F(25,216), 0.1157); chk("(5/6)^6", (5/6)**6, 0.3349); assert (5/6)**3 > .5 > (5/6)**4
mx = [max(a, b) for a, b in W]; chk("Max E", F(sum(mx), 36), 4.4722); chk("Max = 6", F(mx.count(6), 36), 0.3056)
sp = {0: F(1,8), 2: F(1,2), 4: F(1,4), 8: F(1,8)}; ms = sum(x*p for x, p in sp.items())
chk("Verdoppeln E", ms, 3); chk("Verdoppeln V", sum((x-ms)**2*p for x, p in sp.items()), 5); chk("Verdoppeln < 10", 7/8+1/1024, 0.876)
pa = .04*.95+.96*.02; q2 = .04*.05/(1-pa)
chk("Chip P(A)", pa, 0.0572); chk("Chip P_A(D)", .038/pa, 0.6643); chk("Chip P_nA(D)", q2, 0.00212, 2e-5); chk("Chip 50", 1-(1-q2)**50, 0.101, 1e-3)
chk("K1 verschieden", F(16,30), 0.5333); chk("K1 mind. eine", F(28,30), 0.9333); chk("K2", F(35,45), 0.7778)
chk("K4 a", .1*.9+.9*.05, 0.135); chk("K4 b", .09/.135, 2/3); chk("K4 c", .01/.865, 0.01156)
chk("K5", F(2,5)*F(2,3), 80/300)
k6 = {-2: .5, 1: .3, 6: .2}; m6 = sum(x*p for x, p in k6.items()); chk("K6 mu", m6, 0.5); chk("K6 V", sum((x-m6)**2*p for x, p in k6.items()), 9.25)
chk("K7 a", 1-0.7**4, 0.7599); assert 0.7**8 > 0.05 > 0.7**9
chk("K9 V", 9*.4+4*.6, 6)
# ---- Lernkarten 4-6, 10-12, 16-18 ----
gz = "417 293 058 664 120 875 931 346 702 589".split(); assert sum(any(c in "012" for c in x) for x in gz) == 6
chk("K5 exakt", 1-0.7**3, 0.657); chk("K6", F(12,25)+F(4,25), 0.64)
chk("K10 genau einer", .1*.8*.5+.9*.2*.5+.9*.8*.5, 0.49); chk("K10 mind. zwei", .1*.2*.5+.1*.8*.5+.9*.2*.5+.1*.2*.5, 0.15)
chk("K11", sum(comb(4,k) for k in (0,1,3,4))/16, 0.625)
chk("K12 X=1", 2*F(3,10)*F(7,9), 42/90); chk("K12 E", F(42,90)+2*F(6,90), 0.6)
t = lambda p: p*.98/(p*.98+(1-p)*.05)
chk("K16 a", t(.01), 0.1653); chk("K16 b", t(t(.01)), 0.795, 1e-3); chk("K16 c", t(.1), 0.6853); chk("K16 50%", t(.5), 0.9515)
chk("K18 a", .4*.7+.6*.5, 0.58); chk("K18 b", .28/.58, 0.4828); chk("K18 d", 200*1.5*.58, 174); chk("K18 Streuung", 1.5*sqrt(200*.58*.42), 10.47, 1e-2)
print("ALLES OK" if ok else "ES GIBT FEHLER")
