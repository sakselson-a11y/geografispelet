// Blindkarta – fungerar utan nätverk efter första besöket.
const CACHE = "blindkarta-e66174000a";
const PRECACHE = ["./","index.html","apple-touch-icon.png","icon-512.png","manifest.webmanifest","flags/ad.svg","flags/ae.svg","flags/af.svg","flags/al.svg","flags/am.svg","flags/ao.svg","flags/ar.svg","flags/at.svg","flags/au.svg","flags/az.svg","flags/ba.svg","flags/bd.svg","flags/be.svg","flags/bf.svg","flags/bg.svg","flags/bi.svg","flags/bj.svg","flags/bn.svg","flags/bo.svg","flags/br.svg","flags/bt.svg","flags/bw.svg","flags/by.svg","flags/bz.svg","flags/ca.svg","flags/cd.svg","flags/cf.svg","flags/cg.svg","flags/ch.svg","flags/ci.svg","flags/cl.svg","flags/cm.svg","flags/cn.svg","flags/co.svg","flags/cr.svg","flags/cu.svg","flags/cy.svg","flags/cz.svg","flags/de.svg","flags/dj.svg","flags/dk.svg","flags/do.svg","flags/dz.svg","flags/ec.svg","flags/ee.svg","flags/eg.svg","flags/er.svg","flags/es.svg","flags/et.svg","flags/fi.svg","flags/fj.svg","flags/fr.svg","flags/ga.svg","flags/gb.svg","flags/ge.svg","flags/gh.svg","flags/gm.svg","flags/gn.svg","flags/gq.svg","flags/gr.svg","flags/gt.svg","flags/gw.svg","flags/gy.svg","flags/hn.svg","flags/hr.svg","flags/ht.svg","flags/hu.svg","flags/id.svg","flags/ie.svg","flags/il.svg","flags/in.svg","flags/iq.svg","flags/ir.svg","flags/is.svg","flags/it.svg","flags/jm.svg","flags/jo.svg","flags/jp.svg","flags/ke.svg","flags/kg.svg","flags/kh.svg","flags/kp.svg","flags/kr.svg","flags/kw.svg","flags/kz.svg","flags/la.svg","flags/lb.svg","flags/li.svg","flags/lk.svg","flags/lr.svg","flags/ls.svg","flags/lt.svg","flags/lu.svg","flags/lv.svg","flags/ly.svg","flags/ma.svg","flags/md.svg","flags/me.svg","flags/mg.svg","flags/mk.svg","flags/ml.svg","flags/mm.svg","flags/mn.svg","flags/mr.svg","flags/mw.svg","flags/mx.svg","flags/my.svg","flags/mz.svg","flags/na.svg","flags/ne.svg","flags/ng.svg","flags/ni.svg","flags/nl.svg","flags/no.svg","flags/np.svg","flags/nz.svg","flags/om.svg","flags/pa.svg","flags/pe.svg","flags/pg.svg","flags/ph.svg","flags/pk.svg","flags/pl.svg","flags/pt.svg","flags/py.svg","flags/qa.svg","flags/ro.svg","flags/rs.svg","flags/ru.svg","flags/rw.svg","flags/sa.svg","flags/sb.svg","flags/sd.svg","flags/se.svg","flags/si.svg","flags/sk.svg","flags/sl.svg","flags/sn.svg","flags/so.svg","flags/sr.svg","flags/ss.svg","flags/sv.svg","flags/sy.svg","flags/sz.svg","flags/td.svg","flags/tg.svg","flags/th.svg","flags/tj.svg","flags/tl.svg","flags/tm.svg","flags/tn.svg","flags/tr.svg","flags/tw.svg","flags/tz.svg","flags/ua.svg","flags/ug.svg","flags/us.svg","flags/uy.svg","flags/uz.svg","flags/ve.svg","flags/vn.svg","flags/xk.svg","flags/ye.svg","flags/za.svg","flags/zm.svg","flags/zw.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("blindkarta-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Sidan: hämta nytt när nätet finns, annars den sparade versionen.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Typsnitt från Google Fonts: sparas första gången de hämtas.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(CACHE).then(c => c.match(req).then(hit => hit || fetch(req).then(r => { c.put(req, r.clone()); return r; }))));
    return;
  }
  // Flaggor och övriga filer: från cachen först.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
});
