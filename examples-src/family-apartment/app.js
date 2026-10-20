// Family apartment 3D example — application source.
//
// This file is spliced into public/examples/family-apartment.html by
// `pnpm build:family-apartment` (scripts/build-family-apartment.mjs). It runs in the
// same module scope as the minified Three.js r185 bundle that precedes it in that page,
// so it uses the bundle's short names. The ones used here:
//   vi Mesh · W Group · ra BoxGeometry · ju RoundedBoxGeometry · ia CylinderGeometry
//   oa SphereGeometry · sa TorusGeometry · aa PlaneGeometry · Ar BufferGeometry
//   vr Float32BufferAttribute · ya MeshStandardMaterial · ba MeshPhysicalMaterial
//   oi MeshBasicMaterial · $i CanvasTexture · V Vector3 · B Vector2 · G Color · Pi Plane
//   Zn Box3 · to PointLight · io DirectionalLight · Va HemisphereLight · Ve SRGBColorSpace
//   Mu wall height (2.6 m, defined in the bundle part of the page)
// New top-level names must not collide with the bundle's (check before adding one).
//
// Helpers: J(w,h,d,mat,pos) box · Y(w,h,d,radius,mat,pos) rounded box ·
// Ru(rTop,rBot,h,mat,pos,seg) cylinder · Q(parent,obj,x,z,rotY,y) place ·
// Z(obj,name,description,type) make selectable.
// Layout: x runs 0–14.875 m west→east, z runs 0–9.35 m north→south (from the 2D plan).
//   Ad()  walls, windows, doors        qd()  furniture placement (both layouts)
//   F*()  furniture models from the client's list   Yd()  scene, wall paint, space analysis
function Lu(e, t = !0, n = !0) {
  return ((e.castShadow = t), (e.receiveShadow = n), e);
}
function J(e, t, n, r, i = new V()) {
  let a = new vi(new ra(e, t, n), r);
  return (a.position.copy(i), Lu(a));
}
function Y(e, t, n, r, i, a = new V()) {
  let o = new vi(new ju(e, t, n, 4, Math.min(r, e * 0.24, t * 0.24, n * 0.24)), i);
  return (o.position.copy(a), Lu(o));
}
function Ru(e, t, n, r, i = new V(), a = 24) {
  let o = new vi(new ia(e, t, n, a), r);
  return (o.position.copy(i), Lu(o));
}
function zu(e) {
  let t = e >>> 0;
  return () => ((t = (Math.imul(t, 1664525) + 1013904223) >>> 0), t / 4294967296);
}
function Bu(e) {
  let t = document.createElement(`canvas`);
  return ((t.width = e), (t.height = e), { canvas: t, drawingContext: t.getContext(`2d`, { alpha: !1 }) });
}
function Vu(e, t, r, i = !1) {
  let a = new $i(e);
  return ((a.wrapS = n), (a.wrapT = n), a.repeat.set(t, r), (a.anisotropy = 4), i && (a.colorSpace = Ve), a);
}
function Hu(e, t, n, r, i, a, o, s) {
  ((e.strokeStyle = o), (e.lineWidth = s), e.beginPath(), e.moveTo(0, n));
  for (let o = 0; o <= t; o += 8) {
    let t = Math.sin(o * i + a) * r,
      s = Math.sin(o * i * 0.37 + a * 1.7) * r * 0.32;
    e.lineTo(o, n + t + s);
  }
  e.stroke();
}
function Uu(e, t, n, planks = !1) {
  let r = zu(e),
    S = 1024,
    i = Bu(S),
    a = Bu(S),
    o = Bu(S),
    s = i.drawingContext,
    c = a.drawingContext,
    l = o.drawingContext;
  ((s.fillStyle = `rgb(226,214,196)`),
    s.fillRect(0, 0, S, S),
    (c.fillStyle = `rgb(128,128,128)`),
    c.fillRect(0, 0, S, S),
    (l.fillStyle = `rgb(196,196,196)`),
    l.fillRect(0, 0, S, S));
  let rows = planks ? 8 : 1,
    rh = S / rows;
  for (let row = 0; row < rows; row += 1) {
    let y0 = row * rh,
      x = -r() * S * 0.6;
    for (; x < S; ) {
      let len = planks ? S * (0.42 + r() * 0.5) : S * 2,
        tone = planks ? (r() - 0.5) * 34 : 0,
        warm = planks ? (r() - 0.5) * 10 : 0;
      for (let k = 0; k < 2; k += 1) {
        let px = k === 0 ? x : x - S;
        ((s.fillStyle = `rgb(${226 + tone + warm},${214 + tone},${196 + tone - warm})`), s.fillRect(px, y0, len, rh));
        let rg = 196 + Math.round((r() - 0.5) * 26);
        ((l.fillStyle = `rgb(${rg},${rg},${rg})`), l.fillRect(px, y0, len, rh));
      }
      for (let g = 0; g < (planks ? 34 : 260); g += 1) {
        let gy = y0 + r() * rh,
          amp = 0.6 + r() * (planks ? 2.2 : 3.2),
          fr = 0.004 + r() * 0.018,
          ph = r() * Math.PI * 2,
          al = 0.03 + r() * 0.085,
          w = 0.5 + r() * 1.2;
        (s.save(), s.beginPath(), s.rect(x, y0, len, rh), s.clip(),
          Hu(s, S, gy, amp, fr, ph, `rgba(92,66,42,${al})`, w), s.restore(),
          c.save(), c.beginPath(), c.rect(x, y0, len, rh), c.clip(),
          Hu(c, S, gy, amp, fr, ph, `rgba(90,90,90,${0.12 + al * 2})`, w), c.restore());
      }
      if (planks && r() > 0.45) {
        let kx = x + r() * len,
          ky = y0 + rh * (0.25 + r() * 0.5),
          kr = 3 + r() * 6;
        for (let q = 0; q < 4; q += 1)
          ((s.strokeStyle = `rgba(84,58,36,${0.12 - q * 0.025})`),
            (s.lineWidth = 1.2),
            s.beginPath(),
            s.ellipse(kx, ky, kr * (1 + q * 0.6), kr * 0.45 * (1 + q * 0.5), 0, 0, Math.PI * 2),
            s.stroke());
      }
      if (planks) {
        ((s.fillStyle = `rgba(70,52,36,0.42)`), s.fillRect(x, y0, 1.5, rh));
        ((c.fillStyle = `rgb(60,60,60)`), c.fillRect(x, y0, 2, rh));
      }
      x += len;
    }
    if (planks) {
      ((s.fillStyle = `rgba(70,52,36,0.38)`), s.fillRect(0, y0, S, 1.5));
      ((c.fillStyle = `rgb(58,58,58)`), c.fillRect(0, y0, S, 2.5));
      ((l.fillStyle = `rgb(230,230,230)`), l.fillRect(0, y0, S, 2));
    }
  }
  return { colorMap: Vu(i.canvas, t, n, !0), bumpMap: Vu(a.canvas, t, n), roughnessMap: Vu(o.canvas, t, n) };
}
function Wu(e, t = 4, n = 4) {
  let r = zu(e),
    i = Bu(256),
    a = Bu(256),
    o = Bu(256),
    s = i.drawingContext,
    c = a.drawingContext,
    l = o.drawingContext;
  ((s.fillStyle = `rgb(236,236,234)`),
    s.fillRect(0, 0, 256, 256),
    (c.fillStyle = `rgb(126,126,126)`),
    c.fillRect(0, 0, 256, 256),
    (l.fillStyle = `rgb(238,238,238)`),
    l.fillRect(0, 0, 256, 256));
  for (let e = 0; e < 256; e += 3) {
    let t = e % 6 == 0 ? 255 : 205;
    ((s.strokeStyle = e % 6 == 0 ? `rgba(255,255,255,0.16)` : `rgba(35,35,35,0.055)`),
      (s.lineWidth = 1),
      s.beginPath(),
      s.moveTo(e, 0),
      s.lineTo(e, 256),
      s.stroke(),
      s.beginPath(),
      s.moveTo(0, e),
      s.lineTo(256, e),
      s.stroke(),
      (c.strokeStyle = `rgb(${t},${t},${t})`),
      c.beginPath(),
      c.moveTo(e, 0),
      c.lineTo(e, 256),
      c.stroke(),
      (c.strokeStyle = e % 6 == 0 ? `rgb(208,208,208)` : `rgb(92,92,92)`),
      c.beginPath(),
      c.moveTo(0, e),
      c.lineTo(256, e),
      c.stroke());
  }
  for (let e = 0; e < 1800; e += 1) {
    let e = r() * 256,
      t = r() * 256,
      n = 0.02 + r() * 0.055;
    ((s.fillStyle = r() > 0.5 ? `rgba(255,255,255,${n})` : `rgba(20,20,20,${n})`), s.fillRect(e, t, 1, 1));
  }
  return { colorMap: Vu(i.canvas, t, n, !0), bumpMap: Vu(a.canvas, t, n), roughnessMap: Vu(o.canvas, t, n) };
}
function Gu(e, t = 1.6, n = 1.6) {
  let r = zu(e),
    i = Bu(512),
    a = Bu(512),
    o = Bu(512),
    s = i.drawingContext,
    c = a.drawingContext,
    l = o.drawingContext;
  ((s.fillStyle = `rgb(232,230,224)`),
    s.fillRect(0, 0, 512, 512),
    (c.fillStyle = `rgb(128,128,128)`),
    c.fillRect(0, 0, 512, 512),
    (l.fillStyle = `rgb(154,154,154)`),
    l.fillRect(0, 0, 512, 512));
  for (let e = 0; e < 20; e += 1) {
    let e = -30 + r() * 120,
      t = r() * 512,
      n = r() > 0.5 ? 1 : -1,
      i = [];
    for (let a = 0; a < 28; a += 1)
      ((e += 12 + r() * 16), (t += n * (4 + r() * 12) + (r() - 0.5) * 18), i.push([e, t]));
    let a = (e, t, n) => {
      ((e.strokeStyle = t), (e.lineWidth = n), e.beginPath(), e.moveTo(i[0][0], i[0][1]));
      for (let t = 1; t < i.length; t += 1) e.lineTo(i[t][0], i[t][1]);
      e.stroke();
    };
    (a(s, `rgba(94,91,84,${0.045 + r() * 0.08})`, 0.7 + r() * 2.2),
      a(c, `rgba(95,95,95,${0.2 + r() * 0.28})`, 0.8 + r() * 1.8),
      a(l, `rgba(105,105,105,${0.16 + r() * 0.24})`, 1 + r() * 2.4));
  }
  for (let e = 0; e < 2500; e += 1) {
    let e = r() * 512,
      t = r() * 512,
      n = 0.35 + r() * 1.1;
    ((s.fillStyle = r() > 0.5 ? `rgba(80,78,73,0.035)` : `rgba(255,255,255,0.07)`), s.fillRect(e, t, n, n));
  }
  return { colorMap: Vu(i.canvas, t, n, !0), bumpMap: Vu(a.canvas, t, n), roughnessMap: Vu(o.canvas, t, n) };
}
function Ku(e, t = 5, n = 5) {
  let r = zu(e),
    i = Bu(256),
    a = Bu(256),
    o = Bu(256),
    s = i.drawingContext,
    c = a.drawingContext,
    l = o.drawingContext;
  ((s.fillStyle = `rgb(224,222,216)`),
    s.fillRect(0, 0, 256, 256),
    (c.fillStyle = `rgb(112,112,112)`),
    c.fillRect(0, 0, 256, 256),
    (l.fillStyle = `rgb(250,250,250)`),
    l.fillRect(0, 0, 256, 256));
  for (let e = 0; e < 6500; e += 1) {
    let e = r() * 256,
      t = r() * 256,
      n = 1 + r() * 3,
      i = r() * Math.PI;
    ((s.strokeStyle = r() > 0.5 ? `rgba(255,255,255,0.13)` : `rgba(55,52,47,0.08)`),
      (s.lineWidth = 0.55),
      s.beginPath(),
      s.moveTo(e, t),
      s.lineTo(e + Math.cos(i) * n, t + Math.sin(i) * n),
      s.stroke());
    let a = 122 + Math.round(r() * 96);
    ((c.fillStyle = `rgb(${a},${a},${a})`), c.fillRect(e, t, 1, 1));
  }
  return { colorMap: Vu(i.canvas, t, n, !0), bumpMap: Vu(a.canvas, t, n), roughnessMap: Vu(o.canvas, t, n) };
}
function qu(e, t = 4, n = 4) {
  let r = zu(e),
    i = Bu(256),
    a = Bu(256),
    o = Bu(256),
    s = i.drawingContext,
    c = a.drawingContext,
    l = o.drawingContext;
  ((s.fillStyle = `rgb(245,244,241)`),
    s.fillRect(0, 0, 256, 256),
    (c.fillStyle = `rgb(128,128,128)`),
    c.fillRect(0, 0, 256, 256),
    (l.fillStyle = `rgb(218,218,218)`),
    l.fillRect(0, 0, 256, 256));
  for (let e = 0; e < 9e3; e += 1) {
    let e = r() * 256,
      t = r() * 256,
      n = 235 + Math.round((r() - 0.5) * 22),
      i = 128 + Math.round((r() - 0.5) * 24);
    ((s.fillStyle = `rgba(${n},${n},${n},0.23)`),
      s.fillRect(e, t, 1, 1),
      (c.fillStyle = `rgb(${i},${i},${i})`),
      c.fillRect(e, t, 1, 1));
  }
  return { colorMap: Vu(i.canvas, t, n, !0), bumpMap: Vu(a.canvas, t, n), roughnessMap: Vu(o.canvas, t, n) };
}
function Ju(e, t, n, r = 3.2, i = 3.2) {
  let a = Bu(512),
    o = Bu(512),
    s = Bu(512),
    c = a.drawingContext,
    l = o.drawingContext,
    u = s.drawingContext;
  ((c.fillStyle = e),
    c.fillRect(0, 0, 512, 512),
    (l.fillStyle = `rgb(146,146,146)`),
    l.fillRect(0, 0, 512, 512),
    (u.fillStyle = `rgb(176,176,176)`),
    u.fillRect(0, 0, 512, 512));
  let d = 512 / n;
  for (let e = 0; e <= n; e += 1) {
    let n = e * d;
    ((c.strokeStyle = t),
      (c.lineWidth = 4),
      c.beginPath(),
      c.moveTo(n, 0),
      c.lineTo(n, 512),
      c.stroke(),
      c.beginPath(),
      c.moveTo(0, n),
      c.lineTo(512, n),
      c.stroke(),
      (l.strokeStyle = `rgb(62,62,62)`),
      (l.lineWidth = 6),
      l.beginPath(),
      l.moveTo(n, 0),
      l.lineTo(n, 512),
      l.stroke(),
      l.beginPath(),
      l.moveTo(0, n),
      l.lineTo(512, n),
      l.stroke(),
      (u.strokeStyle = `rgb(236,236,236)`),
      (u.lineWidth = 6),
      u.beginPath(),
      u.moveTo(n, 0),
      u.lineTo(n, 512),
      u.stroke(),
      u.beginPath(),
      u.moveTo(0, n),
      u.lineTo(512, n),
      u.stroke());
  }
  return { colorMap: Vu(a.canvas, r, i, !0), bumpMap: Vu(o.canvas, r, i), roughnessMap: Vu(s.canvas, r, i) };
}
function Yu(e, t = 1, n = 5) {
  let r = zu(e),
    i = Bu(256),
    a = Bu(256),
    o = Bu(256),
    s = i.drawingContext,
    c = a.drawingContext,
    l = o.drawingContext;
  ((s.fillStyle = `rgb(205,207,206)`),
    s.fillRect(0, 0, 256, 256),
    (c.fillStyle = `rgb(128,128,128)`),
    c.fillRect(0, 0, 256, 256),
    (l.fillStyle = `rgb(108,108,108)`),
    l.fillRect(0, 0, 256, 256));
  for (let e = 0; e < 256; e += 1) {
    let t = 150 + Math.round(r() * 90);
    ((s.strokeStyle = `rgba(${t},${t},${t},0.22)`),
      s.beginPath(),
      s.moveTo(0, e),
      s.lineTo(256, e),
      s.stroke(),
      (c.strokeStyle = `rgb(${105 + Math.round(r() * 46)},${105 + Math.round(r() * 46)},${105 + Math.round(r() * 46)})`),
      c.beginPath(),
      c.moveTo(0, e),
      c.lineTo(256, e),
      c.stroke());
  }
  return { colorMap: Vu(i.canvas, t, n, !0), bumpMap: Vu(a.canvas, t, n), roughnessMap: Vu(o.canvas, t, n) };
}
function X(e, t) {
  return (
    (e.name = t.displayName),
    (e.userData.materialLabel = t.displayName),
    (e.userData.materialFamily = t.family),
    (e.userData.finish = t.finish),
    (e.userData.pattern = t.pattern),
    (e.userData.defaultBumpMap = e.bumpMap ?? null),
    (e.userData.defaultRoughnessMap = e.roughnessMap ?? null),
    (e.userData.includeInInspector = t.includeInInspector ?? !0),
    e
  );
}
function Xu(e = !0) {
  let t = e ? Uu(9173, 1, 1, !0) : {},
    n = e ? Uu(4739, 1.4, 1.4) : {},
    r = e ? Wu(7801, 5.4, 5.4) : {},
    i = e ? Wu(10211, 7.2, 7.2) : {},
    a = e ? Ku(2707, 5.8, 5.8) : {},
    o = e ? qu(3329, 4.2, 4.2) : {},
    s = e ? Gu(1907, 1.8, 1.8) : {},
    c = e ? Ju(`#cbc8c1`, `rgba(103,99,92,0.25)`, 6, 1, 1) : {},
    l = e ? Ju(`#ded8ce`, `rgba(126,118,107,0.22)`, 6, 1, 1) : {},
    u = e ? Yu(5549, 1, 5.5) : {};
  return {
    floorWood: X(
      new ya({
        map: t.colorMap,
        bumpMap: t.bumpMap,
        bumpScale: 0.028,
        roughnessMap: t.roughnessMap,
        color: 14730394,
        roughness: 0.77,
        metalness: 0,
      }),
      { displayName: `Oak plank flooring`, family: `Natural wood`, finish: `Brushed matte oak`, pattern: `wood` },
    ),
    floorGreyTile: X(
      new ya({
        map: c.colorMap,
        bumpMap: c.bumpMap,
        bumpScale: 0.018,
        roughnessMap: c.roughnessMap,
        roughness: 0.7,
        metalness: 0,
      }),
      {
        displayName: `Cool porcelain tile`,
        family: `Porcelain tile`,
        finish: `Low-sheen rectified tile`,
        pattern: `stone`,
      },
    ),
    floorWarmTile: X(
      new ya({
        map: l.colorMap,
        bumpMap: l.bumpMap,
        bumpScale: 0.018,
        roughnessMap: l.roughnessMap,
        roughness: 0.72,
        metalness: 0,
      }),
      {
        displayName: `Warm porcelain tile`,
        family: `Porcelain tile`,
        finish: `Soft stone-look tile`,
        pattern: `stone`,
      },
    ),
    wall: X(
      new ya({
        map: o.colorMap,
        bumpMap: o.bumpMap,
        bumpScale: 0.012,
        roughnessMap: o.roughnessMap,
        color: 14735822,
        roughness: 0.88,
      }),
      { displayName: `Interior wall paint`, family: `Mineral paint`, finish: `Fine matte plaster`, pattern: `plaster` },
    ),
    wallCap: X(new ya({ color: 4078905, roughness: 0.68 }), {
      displayName: `Cutaway wall cap`,
      family: `Painted composite`,
      finish: `Charcoal satin`,
      pattern: `solid`,
    }),
    wallAccent: X(
      new ya({
        map: o.colorMap,
        bumpMap: o.bumpMap,
        bumpScale: 0.01,
        roughnessMap: o.roughnessMap,
        color: 13157046,
        roughness: 0.82,
      }),
      { displayName: `Accent wall finish`, family: `Mineral paint`, finish: `Textured matte`, pattern: `plaster` },
    ),
    glass: X(
      new ba({
        color: 12900058,
        roughness: 0.08,
        metalness: 0,
        transparent: !0,
        opacity: 0.28,
        transmission: 0.72,
        thickness: 0.06,
        ior: 1.46,
        side: 2,
      }),
      {
        displayName: `Clear architectural glass`,
        family: `Tempered glass`,
        finish: `Low-iron clear`,
        pattern: `glass`,
      },
    ),
    windowFrame: X(
      new ya({
        map: u.colorMap,
        bumpMap: u.bumpMap,
        bumpScale: 0.006,
        roughnessMap: u.roughnessMap,
        color: 7700613,
        roughness: 0.38,
        metalness: 0.72,
      }),
      { displayName: `Window frame`, family: `Powder-coated aluminium`, finish: `Brushed graphite`, pattern: `metal` },
    ),
    lightWood: X(
      new ba({
        map: n.colorMap,
        bumpMap: n.bumpMap,
        bumpScale: 0.024,
        roughnessMap: n.roughnessMap,
        color: 11963743,
        roughness: 0.62,
        clearcoat: 0.08,
        clearcoatRoughness: 0.72,
      }),
      { displayName: `Oak furniture frame`, family: `Oak veneer`, finish: `Open-grain matte lacquer`, pattern: `wood` },
    ),
    paleWood: X(
      new ba({
        map: n.colorMap,
        bumpMap: n.bumpMap,
        bumpScale: 0.02,
        roughnessMap: n.roughnessMap,
        color: 13281661,
        roughness: 0.66,
        clearcoat: 0.06,
        clearcoatRoughness: 0.78,
      }),
      {
        displayName: `Pale cabinetry veneer`,
        family: `Engineered timber veneer`,
        finish: `Silk-matte clear coat`,
        pattern: `wood`,
      },
    ),
    darkWood: X(
      new ba({
        map: n.colorMap,
        bumpMap: n.bumpMap,
        bumpScale: 0.02,
        roughnessMap: n.roughnessMap,
        color: 7295287,
        roughness: 0.6,
        clearcoat: 0.08,
        clearcoatRoughness: 0.7,
      }),
      {
        displayName: `Dark timber detailing`,
        family: `Stained oak veneer`,
        finish: `Low-sheen stain`,
        pattern: `wood`,
      },
    ),
    doorWood: X(
      new ba({
        map: n.colorMap,
        bumpMap: n.bumpMap,
        bumpScale: 0.018,
        roughnessMap: n.roughnessMap,
        color: 10120258,
        roughness: 0.58,
        clearcoat: 0.12,
        clearcoatRoughness: 0.65,
      }),
      {
        displayName: `Timber door leaf`,
        family: `Oak veneer door`,
        finish: `Satin protective lacquer`,
        pattern: `wood`,
      },
    ),
    creamFabric: X(
      new ba({
        map: r.colorMap,
        bumpMap: r.bumpMap,
        bumpScale: 0.026,
        roughnessMap: r.roughnessMap,
        color: 14670028,
        roughness: 0.92,
        sheen: 0.26,
        sheenColor: new G(16248804),
        sheenRoughness: 0.82,
      }),
      {
        displayName: `Woven cream upholstery`,
        family: `Performance textile`,
        finish: `Basket-weave upholstery`,
        pattern: `fabric`,
      },
    ),
    oliveFabric: X(
      new ba({
        map: r.colorMap,
        bumpMap: r.bumpMap,
        bumpScale: 0.026,
        roughnessMap: r.roughnessMap,
        color: 9212528,
        roughness: 0.93,
        sheen: 0.22,
        sheenColor: new G(12172446),
        sheenRoughness: 0.84,
      }),
      {
        displayName: `Olive woven textile`,
        family: `Performance textile`,
        finish: `Durable woven finish`,
        pattern: `fabric`,
      },
    ),
    sageFabric: X(
      new ba({
        map: r.colorMap,
        bumpMap: r.bumpMap,
        bumpScale: 0.026,
        roughnessMap: r.roughnessMap,
        color: 10922635,
        roughness: 0.94,
        sheen: 0.22,
        sheenColor: new G(13883072),
        sheenRoughness: 0.86,
      }),
      {
        displayName: `Sage woven textile`,
        family: `Performance textile`,
        finish: `Soft woven upholstery`,
        pattern: `fabric`,
      },
    ),
    linen: X(
      new ba({
        map: i.colorMap,
        bumpMap: i.bumpMap,
        bumpScale: 0.018,
        roughnessMap: i.roughnessMap,
        color: 14867407,
        roughness: 0.96,
        sheen: 0.18,
        sheenColor: new G(16777215),
        sheenRoughness: 0.9,
      }),
      { displayName: `Linen bedding`, family: `Linen blend`, finish: `Fine washed weave`, pattern: `fabric` },
    ),
    rugCream: X(
      new ya({
        map: a.colorMap,
        bumpMap: a.bumpMap,
        bumpScale: 0.042,
        roughnessMap: a.roughnessMap,
        color: 13747635,
        roughness: 1,
      }),
      { displayName: `Cream textured rug`, family: `Wool-blend rug`, finish: `Dense loop pile`, pattern: `rug` },
    ),
    rugSage: X(
      new ya({
        map: a.colorMap,
        bumpMap: a.bumpMap,
        bumpScale: 0.042,
        roughnessMap: a.roughnessMap,
        color: 10330753,
        roughness: 1,
      }),
      { displayName: `Sage textured rug`, family: `Wool-blend rug`, finish: `Dense loop pile`, pattern: `rug` },
    ),
    whiteCeramic: X(new ba({ color: 16052973, roughness: 0.2, clearcoat: 0.66, clearcoatRoughness: 0.22, ior: 1.48 }), {
      displayName: `White vitreous ceramic`,
      family: `Glazed ceramic`,
      finish: `High-gloss sanitary glaze`,
      pattern: `ceramic`,
    }),
    countertop: X(
      new ba({
        map: s.colorMap,
        bumpMap: s.bumpMap,
        bumpScale: 0.012,
        roughnessMap: s.roughnessMap,
        color: 14999251,
        roughness: 0.34,
        clearcoat: 0.18,
        clearcoatRoughness: 0.42,
      }),
      {
        displayName: `Stone composite worktop`,
        family: `Engineered quartz`,
        finish: `Honed fine-vein surface`,
        pattern: `stone`,
      },
    ),
    darkMetal: X(
      new ya({
        map: u.colorMap,
        bumpMap: u.bumpMap,
        bumpScale: 0.005,
        roughnessMap: u.roughnessMap,
        color: 3224368,
        roughness: 0.3,
        metalness: 0.76,
      }),
      {
        displayName: `Dark metal hardware`,
        family: `Powder-coated steel`,
        finish: `Fine brushed graphite`,
        pattern: `metal`,
      },
    ),
    brushedMetal: X(
      new ya({
        map: u.colorMap,
        bumpMap: u.bumpMap,
        bumpScale: 0.004,
        roughnessMap: u.roughnessMap,
        color: 11448749,
        roughness: 0.3,
        metalness: 0.86,
      }),
      {
        displayName: `Brushed stainless steel`,
        family: `Stainless steel`,
        finish: `Linear satin brush`,
        pattern: `metal`,
      },
    ),
    blackScreen: X(
      new ba({ color: 1118995, roughness: 0.12, metalness: 0.08, clearcoat: 0.72, clearcoatRoughness: 0.12 }),
      {
        displayName: `Display glass`,
        family: `Coated display panel`,
        finish: `Gloss black anti-reflective`,
        pattern: `glass`,
      },
    ),
    plantLeaf: X(new ya({ color: 5401411, roughness: 0.74 }), {
      displayName: `Natural plant foliage`,
      family: `Living foliage`,
      finish: `Soft satin leaf`,
      pattern: `organic`,
    }),
    plantLeafLight: X(new ya({ color: 7439197, roughness: 0.78 }), {
      displayName: `Light plant foliage`,
      family: `Living foliage`,
      finish: `Soft satin leaf`,
      pattern: `organic`,
    }),
    plantPot: X(new ba({ color: 10647896, roughness: 0.68, clearcoat: 0.08, clearcoatRoughness: 0.7 }), {
      displayName: `Ceramic plant pot`,
      family: `Stoneware ceramic`,
      finish: `Hand-finished matte glaze`,
      pattern: `ceramic`,
    }),
    soil: X(new ya({ color: 4535594, roughness: 1 }), {
      displayName: `Planting soil`,
      family: `Natural soil`,
      finish: `Loose organic texture`,
      pattern: `organic`,
    }),
    lampShade: X(
      new ba({
        map: i.colorMap,
        bumpMap: i.bumpMap,
        bumpScale: 0.012,
        roughnessMap: i.roughnessMap,
        color: 15655112,
        roughness: 0.82,
        transmission: 0.05,
        emissive: 6047013,
        emissiveIntensity: 0.08,
      }),
      { displayName: `Linen lamp shade`, family: `Linen textile`, finish: `Light-diffusing weave`, pattern: `fabric` },
    ),
    artworkBackground: X(new ya({ color: 15327701, roughness: 0.9 }), {
      displayName: `Art paper`,
      family: `Fine-art paper`,
      finish: `Uncoated matte`,
      pattern: `paper`,
    }),
    artworkInk: X(new ya({ color: 7108181, roughness: 0.9 }), {
      displayName: `Artwork pigment`,
      family: `Printed pigment`,
      finish: `Matte botanical ink`,
      pattern: `paper`,
    }),
    doorGroove: X(new ya({ color: 0x6b4a32, roughness: 0.7 }), {
      displayName: `Door panel groove`,
      family: `Oak veneer door`,
      finish: `Routed groove`,
      pattern: `solid`,
      includeInInspector: !1,
    }),
    steel: X(new ya({ color: 0xcfd2d3, roughness: 0.32, metalness: 0.55 }), {
      displayName: `Stainless steel`,
      family: `Stainless steel`,
      finish: `Brushed satin`,
      pattern: `metal`,
    }),
    skirting: X(new ya({ color: 0xf3f1ec, roughness: 0.5 }), {
      displayName: `Skirting & trims`,
      family: `Painted MDF`,
      finish: `Satin white`,
      pattern: `solid`,
    }),
    ceiling: X(new ya({ color: 0xf6f4ef, roughness: 0.95, emissive: 0xf4efe6, emissiveIntensity: 0.32 }), {
      displayName: `Ceiling paint`,
      family: `Mineral paint`,
      finish: `Flat white`,
      pattern: `plaster`,
      includeInInspector: !1,
    }),
    sill: X(new ba({ map: s.colorMap, roughnessMap: s.roughnessMap, color: 0xeeebe4, roughness: 0.38, clearcoat: 0.2 }), {
      displayName: `Window sill`,
      family: `Engineered quartz`,
      finish: `Honed`,
      pattern: `stone`,
    }),
    curtainSheer: X(
      new ya({ color: 0xf7f4ee, roughness: 1, transparent: !0, opacity: 0.62, side: 2, depthWrite: !1 }),
      { displayName: `Sheer curtain`, family: `Voile`, finish: `Translucent weave`, pattern: `fabric` },
    ),
    curtainLinen: X(
      new ba({
        map: i.colorMap,
        bumpMap: i.bumpMap,
        bumpScale: 0.01,
        color: 0xd9ccb8,
        roughness: 0.96,
        sheen: 0.3,
        sheenColor: new G(0xfff4e2),
        side: 2,
      }),
      { displayName: `Blackout linen curtain`, family: `Linen blend`, finish: `Soft drape`, pattern: `fabric` },
    ),
    creamLeather: X(
      new ba({
        map: r.colorMap,
        bumpMap: r.bumpMap,
        bumpScale: 0.008,
        color: 0xece4d6,
        roughness: 0.72,
        sheen: 0.4,
        sheenColor: new G(0xfffaf0),
        sheenRoughness: 0.6,
      }),
      { displayName: `Cream tech-fabric upholstery`, family: `Tech fabric (科技布)`, finish: `Soft matte`, pattern: `fabric` },
    ),
    pineSlat: X(
      new ba({ map: n.colorMap, bumpMap: n.bumpMap, bumpScale: 0.012, color: 0xe2c08a, roughness: 0.7 }),
      { displayName: `Pine lift board`, family: `Solid pine`, finish: `Clear matte`, pattern: `wood` },
    ),
    mattress: X(
      new ba({ map: i.colorMap, bumpMap: i.bumpMap, bumpScale: 0.012, color: 0xf6f3ee, roughness: 0.95, sheen: 0.2 }),
      { displayName: `Mattress (not included)`, family: `Knit cover`, finish: `Quilted`, pattern: `fabric` },
    ),
    duvet: X(
      new ba({
        map: i.colorMap,
        bumpMap: i.bumpMap,
        bumpScale: 0.016,
        color: 0xf1ece4,
        roughness: 0.97,
        sheen: 0.3,
        sheenColor: new G(0xffffff),
      }),
      { displayName: `Duvet & pillows`, family: `Washed cotton`, finish: `Soft weave`, pattern: `fabric` },
    ),
    throwBlush: X(
      new ba({ map: r.colorMap, bumpMap: r.bumpMap, bumpScale: 0.02, color: 0xe6c3bd, roughness: 0.96, sheen: 0.25 }),
      { displayName: `Knit throw`, family: `Cotton knit`, finish: `Chunky weave`, pattern: `fabric` },
    ),
    throwOat: X(
      new ba({ map: r.colorMap, bumpMap: r.bumpMap, bumpScale: 0.02, color: 0xcbb79a, roughness: 0.96, sheen: 0.25 }),
      { displayName: `Knit throw`, family: `Cotton knit`, finish: `Chunky weave`, pattern: `fabric` },
    ),
    walnut: X(
      new ba({
        map: n.colorMap,
        bumpMap: n.bumpMap,
        bumpScale: 0.014,
        roughnessMap: n.roughnessMap,
        color: 0x7a5038,
        roughness: 0.55,
        clearcoat: 0.12,
        clearcoatRoughness: 0.5,
      }),
      { displayName: `Red walnut (红胡桃)`, family: `Solid wood / walnut veneer`, finish: `Satin lacquer`, pattern: `wood` },
    ),
    naturalWood: X(
      new ba({
        map: n.colorMap,
        bumpMap: n.bumpMap,
        bumpScale: 0.014,
        roughnessMap: n.roughnessMap,
        color: 0xd2b28a,
        roughness: 0.6,
        clearcoat: 0.08,
      }),
      { displayName: `Natural wood (原木色)`, family: `Engineered board`, finish: `Matte`, pattern: `wood` },
    ),
    whiteBoard: X(new ba({ color: 0xf2f0eb, roughness: 0.45, clearcoat: 0.15, clearcoatRoughness: 0.5 }), {
      displayName: `White board (白色)`,
      family: `Melamine board`,
      finish: `Satin white`,
      pattern: `solid`,
    }),
    ashTop: X(
      new ba({
        map: n.colorMap,
        bumpMap: n.bumpMap,
        bumpScale: 0.01,
        color: 0xd8c6ad,
        roughness: 0.5,
        clearcoat: 0.18,
        clearcoatRoughness: 0.45,
      }),
      { displayName: `Ash wood table top`, family: `Solid ash`, finish: `Natural oil`, pattern: `wood` },
    ),
    deskGrey: X(new ba({ color: 0x8f918b, roughness: 0.5, clearcoat: 0.1 }), {
      displayName: `Grey-white desk frame (灰白色)`,
      family: `Solid wood, painted`,
      finish: `Eco matte paint`,
      pattern: `solid`,
    }),
    deskBlue: X(new ba({ color: 0x86b6cf, roughness: 0.5, clearcoat: 0.1 }), {
      displayName: `Blue-white desk frame (蓝白色)`,
      family: `Solid wood, painted`,
      finish: `Eco matte paint`,
      pattern: `solid`,
    }),
    deskPink: X(new ba({ color: 0xe597a3, roughness: 0.5, clearcoat: 0.1 }), {
      displayName: `Pink-white desk frame (粉白色)`,
      family: `Solid wood, painted`,
      finish: `Eco matte paint`,
      pattern: `solid`,
    }),
    pegboard: X(new ya({ color: 0x3a3b3d, roughness: 0.6, metalness: 0.3 }), {
      displayName: `Pegboard back panel`,
      family: `Powder-coated steel`,
      finish: `Perforated matte`,
      pattern: `metal`,
    }),
    cushion: X(
      new ba({ map: r.colorMap, bumpMap: r.bumpMap, bumpScale: 0.02, color: 0xe9e0d0, roughness: 0.92, sheen: 0.35 }),
      { displayName: `Cream cushion`, family: `Boucle / tech fabric`, finish: `Soft`, pattern: `fabric` },
    ),
    blackFrame: X(new ya({ color: 0x2c2a28, roughness: 0.4, metalness: 0.6 }), {
      displayName: `Glass-door frame`,
      family: `Aluminium`,
      finish: `Matte black`,
      pattern: `metal`,
    }),
    cabinetGlass: X(
      new ba({ color: 0xd8dcd8, roughness: 0.05, transparent: !0, opacity: 0.18, ior: 1.5, side: 2, depthWrite: !1 }),
      { displayName: `Cabinet glass`, family: `Tempered glass`, finish: `Clear`, pattern: `glass` },
    ),
    mirror: X(new ya({ color: 0xeef1f2, roughness: 0.12, metalness: 0.85, emissive: 0x8a8f92, emissiveIntensity: 0.35 }), {
      displayName: `Mirror`,
      family: `Silvered glass`,
      finish: `Polished`,
      pattern: `glass`,
    }),
    led: X(new ya({ color: 0xffffff, emissive: 0xfff2dc, emissiveIntensity: 1.6, roughness: 0.4 }), {
      displayName: `LED light`,
      family: `LED strip`,
      finish: `Warm white`,
      pattern: `solid`,
    }),
    bookA: X(new ya({ color: 0xd9cdb8, roughness: 0.9 }), { displayName: `Books`, family: `Paper`, finish: `Matte`, pattern: `paper`, includeInInspector: !1 }),
    bookB: X(new ya({ color: 0x8c9a86, roughness: 0.9 }), { displayName: `Books`, family: `Paper`, finish: `Matte`, pattern: `paper`, includeInInspector: !1 }),
    bookC: X(new ya({ color: 0xb98b6e, roughness: 0.9 }), { displayName: `Books`, family: `Paper`, finish: `Matte`, pattern: `paper`, includeInInspector: !1 }),
    bookD: X(new ya({ color: 0x5d6b78, roughness: 0.9 }), { displayName: `Books`, family: `Paper`, finish: `Matte`, pattern: `paper`, includeInInspector: !1 }),
    bookE: X(new ya({ color: 0xefe9df, roughness: 0.9 }), { displayName: `Books`, family: `Paper`, finish: `Matte`, pattern: `paper`, includeInInspector: !1 }),
    transparentHighlight: X(new oi({ color: 11910549, transparent: !0, opacity: 0.12 }), {
      displayName: `Selection overlay`,
      family: `Interface overlay`,
      finish: `Transparent`,
      pattern: `solid`,
      includeInInspector: !1,
    }),
  };
}
var Zu = {
    flooring: {
      "light-oak": { floorWood: 16773844, roughness: 0.84 },
      "natural-oak": { floorWood: 14728588, roughness: 0.8 },
      walnut: { floorWood: 9200199, roughness: 0.78 },
      "ash-grey": { floorWood: 13815494, roughness: 0.88 },
    },
    walls: {
      "warm-white": { wall: 15262167, wallAccent: 13157046 },
      "soft-white": { wall: 15921386, wallAccent: 14276045 },
      "soft-sage": { wall: 13490120, wallAccent: 11451561 },
      sand: { wall: 14338229, wallAccent: 12757649 },
    },
    cabinetry: {
      "pale-oak": {
        lightWood: 11963743,
        paleWood: 13281661,
        darkWood: 7295287,
        doorWood: 10120258,
        countertop: 14999251,
      },
      white: { lightWood: 15196889, paleWood: 15789285, darkWood: 12103587, doorWood: 13945274, countertop: 15724008 },
      walnut: { lightWood: 9134660, paleWood: 7753785, darkWood: 4993830, doorWood: 6898991, countertop: 13222068 },
      sage: { lightWood: 11055771, paleWood: 12108205, darkWood: 6582366, doorWood: 9280387, countertop: 14737366 },
    },
    fabrics: {
      neutral: {
        creamFabric: 15920355,
        linen: 15196115,
        oliveFabric: 10918784,
        sageFabric: 11054483,
        rugCream: 14142650,
        rugSage: 10988685,
      },
      sage: {
        creamFabric: 15657439,
        linen: 14998993,
        oliveFabric: 8358763,
        sageFabric: 10332812,
        rugCream: 13879736,
        rugSage: 9608575,
      },
      ocean: {
        creamFabric: 15068396,
        linen: 14542567,
        oliveFabric: 7440788,
        sageFabric: 9546158,
        rugCream: 13621720,
        rugSage: 9414570,
      },
      peach: {
        creamFabric: 15852764,
        linen: 15391697,
        oliveFabric: 12092784,
        sageFabric: 13673357,
        rugCream: 14535100,
        rugSage: 13081220,
      },
    },
  },
  Qu = {
    flooring: { "light-oak": `Light oak`, "natural-oak": `Natural oak`, walnut: `Walnut`, "ash-grey": `Ash grey` },
    walls: { "warm-white": `Warm white`, "soft-white": `Soft white`, "soft-sage": `Soft sage`, sand: `Sand` },
    cabinetry: { "pale-oak": `Pale oak`, white: `Soft white`, walnut: `Walnut`, sage: `Sage` },
    fabrics: { neutral: `Neutral`, sage: `Sage`, ocean: `Ocean`, peach: `Peach` },
  };
function $u(e, t, n) {
  let r = Zu[t]?.[n];
  if (!r) return !1;
  let i = Qu[t]?.[n] ?? n;
  for (let [t, n] of Object.entries(r)) {
    if (t === `roughness`) {
      ((e.floorWood.roughness = n), (e.floorWood.userData.paletteSelection = i), (e.floorWood.needsUpdate = !0));
      continue;
    }
    let r = e[t];
    r?.color && (r.color.setHex(n), (r.userData.paletteSelection = i), (r.needsUpdate = !0));
  }
  return !0;
}
function ed(e, t) {
  for (let n of Object.values(e))
    n?.isMaterial &&
      ((n.bumpMap = t ? (n.userData.defaultBumpMap ?? null) : null),
      (n.roughnessMap = t ? (n.userData.defaultRoughnessMap ?? null) : null),
      (n.needsUpdate = !0));
}
function td(e) {
  let t = new Map();
  return (
    e.traverse((e) => {
      if (!e.isMesh || !e.material) return;
      let n = Array.isArray(e.material) ? e.material : [e.material];
      for (let e of n) !e?.isMaterial || e.userData.includeInInspector === !1 || t.has(e.uuid) || t.set(e.uuid, e);
    }),
    [...t.values()].map((e) => {
      let t = e.userData.finish ?? `Standard finish`,
        n = e.userData.paletteSelection,
        r = n ? `${t} · ${n}` : t;
      return {
        name: e.userData.materialLabel ?? e.name ?? `Material`,
        family: e.userData.materialFamily ?? `Surface material`,
        finish: r,
        pattern: e.userData.pattern ?? `solid`,
        color: e.color?.getStyle?.() ?? `#d9d4ca`,
        roughness: Number.isFinite(e.roughness) ? e.roughness : null,
        metalness: Number.isFinite(e.metalness) ? e.metalness : null,
      };
    })
  );
}
function Z(e, t, n, r) {
  return (
    (e.userData.displayName = t),
    (e.userData.description = n),
    (e.userData.interactionType = r),
    (e.userData.collidable = r === `furniture` || r === `fixture` || r === `door`),
    e.traverse((t) => {
      t.isMesh && (t.userData.interactiveRoot = e);
    }),
    e
  );
}
function nd({ name: e, description: t, xStart: n, xEnd: r, zStart: i, zEnd: a, material: o }) {
  let s = J(r - n, Fu, a - i, o, new V((n + r) / 2, -Fu / 2, (i + a) / 2)),
    tile = o.userData.worldTile ?? 1.6,
    pos = s.geometry.attributes.position,
    uv = s.geometry.attributes.uv;
  for (let k = 0; k < pos.count; k += 1)
    uv.setXY(k, (pos.getX(k) + (n + r) / 2) / tile, -(pos.getZ(k) + (i + a) / 2) / tile);
  return ((uv.needsUpdate = !0), s.geometry.setAttribute(`uv2`, uv.clone()), Z(s, e, t, `room`), s);
}
function rd({
  xStart: e,
  zStart: t,
  xEnd: n,
  zEnd: r,
  materialCollection: i,
  thickness: a = Pu,
  height: o = Mu,
  includeCap: s = !0,
  wallMaterial: c = i.wall,
}) {
  let l = n - e,
    u = r - t,
    d = Math.hypot(l, u),
    f = Math.atan2(u, l),
    p = new W(),
    m = J(d, o, a, c, new V(0, o / 2, 0));
  if (((m.userData.collidable = !0), p.add(m), s)) {
    let e = J(d + 0.015, 0.055, a + 0.018, i.wallCap, new V(0, o + 0.0275, 0));
    ((e.castShadow = !1), (e.userData.isWallCap = o >= Mu - 0.01), p.add(e));
  }
  if (o > 0.3) {
    let k = J(Math.max(d - 0.002, 0.01), 0.085, a + 0.022, i.skirting, new V(0, 0.0425, 0));
    ((k.castShadow = !1), p.add(k));
  }
  return (p.position.set((e + n) / 2, 0, (t + r) / 2), (p.rotation.y = -f), p);
}
function id({
  parentGroup: e,
  materialCollection: t,
  xStart: n,
  xEnd: r,
  z: i,
  doorStart: a,
  doorEnd: o,
  thickness: s = Pu,
}) {
  (a > n && e.add(rd({ xStart: n, zStart: i, xEnd: a, zEnd: i, materialCollection: t, thickness: s })),
    o < r && e.add(rd({ xStart: o, zStart: i, xEnd: r, zEnd: i, materialCollection: t, thickness: s })),
    a < o && e.add(Dw(a, o, s, t, (a + o) / 2, i, 0)));
}
function Dw(a, o, s, t, cx, cz, ry) {
  let g = new W(),
    w = o - a,
    H = 2.1;
  g.add(J(w, Mu - H, s, t.wall, new V(0, H + (Mu - H) / 2, 0)));
  for (let side of [-1, 1]) {
    let jb = J(0.07, H + 0.07, s + 0.03, t.skirting, new V((side * (w - 0.01)) / 2, (H + 0.07) / 2, 0));
    ((jb.castShadow = !1), g.add(jb));
  }
  let hd2 = J(w + 0.07, 0.07, s + 0.03, t.skirting, new V(0, H + 0.035, 0));
  return ((hd2.castShadow = !1), g.add(hd2), g.position.set(cx, 0, cz), (g.rotation.y = ry), g);
}
function ad({
  parentGroup: e,
  materialCollection: t,
  x: n,
  zStart: r,
  zEnd: i,
  doorStart: a,
  doorEnd: o,
  thickness: s = Pu,
}) {
  (a > r && e.add(rd({ xStart: n, zStart: r, xEnd: n, zEnd: a, materialCollection: t, thickness: s })),
    o < i && e.add(rd({ xStart: n, zStart: o, xEnd: n, zEnd: i, materialCollection: t, thickness: s })),
    a < o && e.add(Dw(a, o, s, t, n, (a + o) / 2, Math.PI / 2)));
}
function od({
  parentGroup: e,
  materialCollection: t,
  xStart: n,
  xEnd: r,
  z: i,
  windowStart: a,
  windowEnd: o,
  thickness: s = Nu,
  sillHeight: c = 0.9,
  windowTop: l = 2.15,
}) {
  (a > n && e.add(rd({ xStart: n, zStart: i, xEnd: a, zEnd: i, materialCollection: t, thickness: s })),
    o < r && e.add(rd({ xStart: o, zStart: i, xEnd: r, zEnd: i, materialCollection: t, thickness: s })));
  let u = o - a,
    d = J(u, c, s, t.wall, new V((a + o) / 2, c / 2, i));
  ((d.userData.collidable = !0), e.add(d));
  let f = Math.max(Mu - l, 0.06),
    p = J(u, f, s, t.wall, new V((a + o) / 2, l + f / 2, i));
  e.add(p);
  let cp2 = J(u, 0.055, s + 0.018, t.wallCap, new V((a + o) / 2, Mu + 0.0275, i));
  ((cp2.castShadow = !1), (cp2.userData.isWallCap = !0), e.add(cp2));
  let sl = J(u + 0.1, 0.035, s + 0.1, t.sill, new V((a + o) / 2, c + 0.0175, i));
  ((sl.castShadow = !1), e.add(sl));
  let m = l - c,
    h = J(u - 0.06, m - 0.08, 0.024, t.glass, new V((a + o) / 2, c + m / 2, i));
  ((h.castShadow = !1), e.add(h));
  let g = 0.035,
    _ = s + 0.03;
  for (let n of [a, (a + o) / 2, o]) {
    let r = J(g, m, _, t.windowFrame, new V(n, c + m / 2, i));
    e.add(r);
  }
  for (let n of [c, l]) {
    let r = J(u, g, _, t.windowFrame, new V((a + o) / 2, n, i));
    e.add(r);
  }
}
function sd({
  parentGroup: e,
  materialCollection: t,
  x: n,
  zStart: r,
  zEnd: i,
  windowStart: a,
  windowEnd: o,
  thickness: s = Nu,
  sillHeight: c = 0.9,
  windowTop: l = 2.15,
}) {
  (a > r && e.add(rd({ xStart: n, zStart: r, xEnd: n, zEnd: a, materialCollection: t, thickness: s })),
    o < i && e.add(rd({ xStart: n, zStart: o, xEnd: n, zEnd: i, materialCollection: t, thickness: s })));
  let u = o - a,
    d = J(s, c, u, t.wall, new V(n, c / 2, (a + o) / 2));
  ((d.userData.collidable = !0), e.add(d));
  let f = Math.max(Mu - l, 0.06),
    p = J(s, f, u, t.wall, new V(n, l + f / 2, (a + o) / 2));
  e.add(p);
  let cp2 = J(s + 0.018, 0.055, u, t.wallCap, new V(n, Mu + 0.0275, (a + o) / 2));
  ((cp2.castShadow = !1), (cp2.userData.isWallCap = !0), e.add(cp2));
  let sl = J(s + 0.1, 0.035, u + 0.1, t.sill, new V(n, c + 0.0175, (a + o) / 2));
  ((sl.castShadow = !1), e.add(sl));
  let m = l - c,
    h = J(0.024, m - 0.08, u - 0.06, t.glass, new V(n, c + m / 2, (a + o) / 2));
  ((h.castShadow = !1), e.add(h));
  let g = 0.035,
    _ = s + 0.03;
  for (let r of [a, (a + o) / 2, o]) {
    let i = J(_, m, g, t.windowFrame, new V(n, c + m / 2, r));
    e.add(i);
  }
  for (let r of [c, l]) {
    let i = J(_, g, u, t.windowFrame, new V(n, r, (a + o) / 2));
    e.add(i);
  }
}
function cd({
  hingeX: e,
  hingeZ: t,
  width: n,
  closedAngle: r,
  openAngle: i,
  materialCollection: a,
  name: o,
  description: s,
  initiallyOpen: c = !0,
}) {
  let l = new W();
  l.position.set(e, 0, t);
  let u = 2.08,
    d = 0.042,
    f = J(n - 0.01, u, d, a.doorWood, new V(n / 2, u / 2 + 0.01, 0));
  ((f.userData.collidable = !0), l.add(f));
  for (let side of [-1, 1])
    for (let [py, ph] of [
      [0.62, 0.9],
      [1.58, 0.72],
    ]) {
      let gv = J(n - 0.26, ph, 0.006, a.doorGroove, new V(n / 2, py, (side * d) / 2));
      ((gv.castShadow = !1), (gv.scale.set(1, 1, 1)), l.add(gv));
      let gi = J(n - 0.3, ph - 0.04, 0.008, a.doorWood, new V(n / 2, py, (side * d) / 2));
      ((gi.castShadow = !1), l.add(gi));
    }
  let p = new W();
  for (let side of [-1, 1]) {
    let rose = Ru(0.028, 0.028, 0.012, a.brushedMetal, new V(0, 0, side * (d / 2 + 0.006)), 20);
    ((rose.rotation.x = Math.PI / 2), p.add(rose));
    let lev = Y(0.13, 0.018, 0.02, 0.008, a.brushedMetal, new V(-0.055, 0, side * (d / 2 + 0.045)));
    p.add(lev);
    let nk = Ru(0.009, 0.009, 0.045, a.brushedMetal, new V(0, 0, side * (d / 2 + 0.025)), 10);
    ((nk.rotation.x = Math.PI / 2), p.add(nk));
  }
  p.position.set(n - 0.075, 1.02, 0);
  return (
    l.add(p),
    (l.userData.closedAngle = r),
    (l.userData.openAngle = i),
    (l.userData.isOpen = c),
    (l.userData.targetAngle = c ? i : r),
    (l.rotation.y = l.userData.targetAngle),
    Z(l, o, s, `door`),
    l
  );
}
function ld(e, t, n, r = `Textured area rug`) {
  let i = Y(e, 0.018, t, 0.008, n, new V(0, 0.009, 0));
  ((i.castShadow = !1), (i.userData.collidable = !1));
  return (Z(i, r, `Soft woven rug with visible pile and surface relief.`, `decor`), i);
}
function ud({ width: e, length: t, materialCollection: n, blanketMaterial: r, name: i }) {
  let a = new W(),
    o = ld(e + 0.38, t + 0.3, n.rugCream);
  ((o.position.z = 0.12), a.add(o));
  let s = Y(e, 0.22, t, 0.06, n.lightWood, new V(0, 0.22, 0));
  a.add(s);
  let c = Y(e - 0.08, 0.25, t - 0.08, 0.08, n.linen, new V(0, 0.43, 0));
  a.add(c);
  let l = Y(e + 0.03, 0.72, 0.11, 0.035, n.lightWood, new V(0, 0.53, -t / 2 + 0.055));
  a.add(l);
  let u = Y(e - 0.14, 0.045, t * 0.5, 0.025, r, new V(0, 0.59, t * 0.18));
  a.add(u);
  let d = e * 0.37;
  for (let r of [-e * 0.23, e * 0.23]) {
    let e = Y(d, 0.12, 0.42, 0.055, n.creamFabric, new V(r, 0.61, -t * 0.31));
    ((e.rotation.x = -0.08), a.add(e));
  }
  return (Z(a, i, `Upholstered bed with warm neutral bedding.`, `furniture`), a);
}
function dd(e, t = `Bedside table and lamp`) {
  let n = new W();
  n.add(Y(0.42, 0.42, 0.38, 0.035, e.lightWood, new V(0, 0.25, 0)));
  let r = Ru(0.09, 0.11, 0.06, e.darkMetal, new V(0, 0.5, 0), 20);
  n.add(r);
  let i = Ru(0.018, 0.018, 0.22, e.darkMetal, new V(0, 0.62, 0), 12);
  n.add(i);
  let a = Ru(0.13, 0.19, 0.2, e.lampShade, new V(0, 0.78, 0), 24);
  return (n.add(a), Z(n, t, `Timber bedside table with brushed-metal lamp and linen shade.`, `furniture`), n);
}
function fd(e, t, n = `Wardrobe`) {
  let r = new W(),
    i = Y(e, 1.42, 0.46, 0.025, t.paleWood, new V(0, 0.71, 0));
  r.add(i);
  let a = Math.max(2, Math.round(e / 0.55));
  for (let n = 1; n < a; n += 1) {
    let i = -e / 2 + (e * n) / a;
    r.add(J(0.012, 1.25, 0.02, t.darkWood, new V(i, 0.72, 0.242)));
  }
  for (let n = 0; n < a; n += 1) {
    let i = -e / 2 + (e * (n + 0.5)) / a;
    r.add(Ru(0.013, 0.013, 0.12, t.darkMetal, new V(i, 0.73, 0.253), 10));
  }
  return (Z(r, n, `Built-in pale timber storage.`, `furniture`), r);
}
function pd(e, t = `Study desk`) {
  let n = new W(),
    r = Y(1.18, 0.08, 0.55, 0.025, e.lightWood, new V(0, 0.73, 0));
  n.add(r);
  for (let t of [-0.48, 0.48]) for (let r of [-0.2, 0.2]) n.add(J(0.05, 0.68, 0.05, e.darkWood, new V(t, 0.36, r)));
  let i = Y(0.38, 0.025, 0.25, 0.015, e.darkMetal, new V(0.15, 0.79, 0));
  n.add(i);
  let a = Y(0.38, 0.25, 0.025, 0.012, e.blackScreen, new V(0.15, 0.93, -0.11));
  ((a.rotation.x = -0.14), n.add(a));
  let o = Ru(0.015, 0.015, 0.32, e.darkMetal, new V(-0.39, 0.93, 0.08), 12);
  return (
    (o.rotation.z = -0.22),
    n.add(o),
    n.add(Ru(0.07, 0.11, 0.12, e.lampShade, new V(-0.43, 1.09, 0.08), 18)),
    Z(n, t, `Compact timber workspace with laptop and task lamp.`, `furniture`),
    n
  );
}
function md(e, t = e.sageFabric, n = `Upholstered chair`) {
  let r = new W(),
    i = Y(0.46, 0.12, 0.45, 0.055, t, new V(0, 0.48, 0));
  r.add(i);
  let a = Y(0.44, 0.52, 0.1, 0.045, t, new V(0, 0.76, -0.19));
  ((a.rotation.x = -0.08), r.add(a));
  for (let t of [-0.17, 0.17])
    for (let n of [-0.16, 0.16]) {
      let i = J(0.045, 0.43, 0.045, e.darkWood, new V(t, 0.235, n));
      ((i.rotation.z = t > 0 ? -0.04 : 0.04), r.add(i));
    }
  return (Z(r, n, `Upholstered chair with a timber frame and woven textile finish.`, `furniture`), r);
}
function hd(e, t, n = `Bookcase`) {
  let r = new W(),
    i = 1.32,
    a = 0.34;
  for (let n of [-e / 2, e / 2]) r.add(J(0.055, i, a, t.darkWood, new V(n, i / 2, 0)));
  for (let n of [0.05, 0.36, 0.68, 1, 1.29]) r.add(J(e, 0.055, a, t.lightWood, new V(0, n, 0)));
  let o = [7627598, 9277805, 11697498, 13746597, 7305828];
  for (let t = 0; t < 3; t += 1)
    for (let n = 0; n < 5; n += 1) {
      let i = new ya({ color: o[(t + n) % o.length], roughness: 0.9 }),
        a = J(0.085, 0.18 + ((n + t) % 3) * 0.035, 0.18, i, new V(-e / 2 + 0.12 + n * 0.1, 0.17 + t * 0.32, 0.02));
      r.add(a);
    }
  return (Z(r, n, `Open shelving with books and decor.`, `furniture`), r);
}
function gd(e, t = 1, n = `Indoor plant`) {
  let r = new W(),
    i = Ru(0.16 * t, 0.2 * t, 0.32 * t, e.plantPot, new V(0, 0.16 * t, 0), 24);
  r.add(i);
  let a = Ru(0.145 * t, 0.145 * t, 0.02 * t, e.soil, new V(0, 0.325 * t, 0), 24);
  r.add(a);
  for (let n = 0; n < 9; n += 1) {
    let i = (n / 9) * Math.PI * 2,
      a = n % 2 == 0 ? e.plantLeaf : e.plantLeafLight,
      o = new oa(0.16 * t, 16, 10);
    o.scale(0.45, 1.35, 0.22);
    let s = new vi(o, a);
    (s.position.set(Math.cos(i) * 0.1 * t, (0.52 + (n % 3) * 0.11) * t, Math.sin(i) * 0.1 * t),
      (s.rotation.z = Math.cos(i) * 0.55),
      (s.rotation.x = Math.sin(i) * 0.45),
      (s.rotation.y = -i),
      Lu(s),
      r.add(s));
  }
  return (Z(r, n, `Decorative greenery in a warm ceramic planter.`, `decor`), r);
}
function _d(e) {
  let t = new W();
  t.add(J(2.0, 0.08, 0.76, e.darkWood, new V(0, 0.06, 0)));
  t.add(Y(2.1, 0.24, 0.86, 0.04, e.creamFabric, new V(0, 0.22, 0)));
  for (let n of [-1.0, 1.0]) t.add(Y(0.16, 0.42, 0.86, 0.06, e.creamFabric, new V(n, 0.39, 0)));
  t.add(Y(1.84, 0.46, 0.18, 0.06, e.creamFabric, new V(0, 0.55, -0.34)));
  for (let n of [-0.61, 0, 0.61]) {
    t.add(Y(0.6, 0.13, 0.62, 0.05, e.creamFabric, new V(n, 0.405, 0.08)));
    let r = Y(0.58, 0.42, 0.16, 0.07, e.creamFabric, new V(n, 0.66, -0.2));
    ((r.rotation.x = -0.16), t.add(r));
  }
  for (let [n, m] of [
    [-0.7, e.sageFabric],
    [0.72, e.throwOat],
  ]) {
    let r = Y(0.4, 0.4, 0.12, 0.07, m, new V(n, 0.68, -0.08));
    ((r.rotation.x = -0.22), (r.rotation.z = n * 0.08), t.add(r));
  }
  return (
    t.add(Fshadow(2.1, 0.86, 0.4)),
    Z(t, `Living room sofa`, `Existing three-seat sofa facing the media wall (not part of the new furniture list).`, `furniture`),
    t
  );
}
function vd(e) {
  let t = new W(),
    top = Ru(0.5, 0.5, 0.035, e.lightWood, new V(0, 0.4, 0), 48);
  (top.scale.set(1, 1, 0.55), t.add(top));
  let base = Ru(0.36, 0.4, 0.33, e.lightWood, new V(0, 0.2, 0), 40);
  (base.scale.set(1, 1, 0.42), t.add(base));
  let n = Flathe([[0, 0], [0.07, 0.005], [0.11, 0.04], [0.1, 0.045], [0, 0.02]], e.countertop, 28);
  return (n.position.set(0.15, 0.418, 0), t.add(n), t.add(Fshadow(1, 0.55, 0.35)), Z(t, `Coffee table`, `Oval oak coffee table on the living room rug.`, `furniture`), t);
}
function yd(e) {
  let t = new W();
  t.add(Y(1.85, 0.46, 0.38, 0.035, e.darkWood, new V(0, 0.26, 0)));
  let n = Y(1.5, 0.86, 0.08, 0.025, e.blackScreen, new V(0, 0.98, 0));
  t.add(n);
  let r = J(1.2, 0.07, 0.006, new oi({ color: 6055525, transparent: !0, opacity: 0.22 }), new V(-0.06, 1.2, -0.044));
  return (
    (r.rotation.z = -0.25),
    (r.castShadow = !1),
    t.add(r),
    Z(t, `Media console`, `Timber media unit and flat display.`, `furniture`),
    t
  );
}
function bd(e) {
  let t = new W(),
    n = Y(1.65, 0.1, 0.88, 0.045, e.lightWood, new V(0, 0.75, 0));
  t.add(n);
  for (let n of [-0.64, 0.64]) for (let r of [-0.29, 0.29]) t.add(J(0.07, 0.7, 0.07, e.darkWood, new V(n, 0.37, r)));
  let r = [
    { x: -0.55, z: -0.68, rotation: 0 },
    { x: 0.55, z: -0.68, rotation: 0 },
    { x: -0.55, z: 0.68, rotation: Math.PI },
    { x: 0.55, z: 0.68, rotation: Math.PI },
  ];
  for (let n of r) {
    let r = md(e);
    (r.position.set(n.x, 0, n.z), (r.rotation.y = n.rotation), t.add(r));
  }
  let i = Ru(0.16, 0.22, 0.08, e.countertop, new V(0, 0.84, 0), 28);
  t.add(i);
  let a = new ya({ color: 11761980, roughness: 0.8 });
  for (let e = 0; e < 5; e += 1) {
    let n = (e / 5) * Math.PI * 2,
      r = new vi(new oa(0.055, 12, 8), a);
    (r.position.set(Math.cos(n) * 0.08, 0.91, Math.sin(n) * 0.08), Lu(r), t.add(r));
  }
  return (Z(t, `Dining setting`, `Four-seat dining table placed beside the kitchen.`, `furniture`), t);
}
function xd(e) {
  let t = new W(),
    n = Y(0.5, 0.28, 0.64, 0.12, e.whiteCeramic, new V(0, 0.28, 0.08));
  t.add(n);
  let r = Y(0.48, 0.58, 0.2, 0.05, e.whiteCeramic, new V(0, 0.48, -0.31));
  t.add(r);
  let i = new vi(new sa(0.19, 0.035, 10, 28), e.whiteCeramic);
  return (
    (i.scale.z = 1.25),
    (i.rotation.x = Math.PI / 2),
    i.position.set(0, 0.445, 0.08),
    Lu(i),
    t.add(i),
    Z(t, `Toilet`, `Modern sanitary fixture.`, `fixture`),
    t
  );
}
function Sd(e, t = 0.72) {
  let n = new W();
  (n.add(Y(t, 0.42, 0.42, 0.012, e.paleWood, new V(0, 0.6, 0))),
    n.add(Y(t + 0.03, 0.03, 0.46, 0.008, e.countertop, new V(0, 0.825, 0))),
    n.add(Y(t - 0.04, 0.6, 0.02, 0.01, e.mirror, new V(0, 1.45, -0.2))));
  let r = Ru(0.19, 0.16, 0.1, e.whiteCeramic, new V(0, 0.88, 0), 28);
  n.add(r);
  let i = Ru(0.018, 0.018, 0.22, e.brushedMetal, new V(0, 0.99, -0.15), 12);
  return (
    (i.rotation.x = -0.35),
    n.add(i),
    Z(n, `Bathroom vanity`, `Timber vanity with white basin and metal tap.`, `fixture`),
    n
  );
}
function Cd(e, t, n) {
  let r = new W(),
    i = Y(t, 0.06, n, 0.025, e.whiteCeramic, new V(0, 0.13, 0));
  r.add(i);
  let a = 1.95,
    o = J(t, a, 0.018, e.glass, new V(0, 1.1, n / 2));
  ((o.castShadow = !1), r.add(o));
  let s = J(0.018, a, n, e.glass, new V(t / 2, 1.1, 0));
  ((s.castShadow = !1), r.add(s));
  let c = Ru(0.045, 0.045, 0.012, e.darkMetal, new V(0, 0.17, 0), 20);
  r.add(c);
  let l = Ru(0.015, 0.015, 1.5, e.brushedMetal, new V(-t / 2 + 0.11, 1.05, -n / 2 + 0.08), 12);
  r.add(l);
  let u = Ru(0.1, 0.1, 0.012, e.brushedMetal, new V(-t / 2 + 0.11, 1.95, -n / 2 + 0.18), 24);
  return (
    r.add(u),
    Z(r, `Glass shower`, `Compact shower enclosure with clear glass panels.`, `fixture`),
    r
  );
}
function wd(e) {
  let t = new W();
  t.add(Y(0.62, 0.88, 0.62, 0.045, e.whiteCeramic, new V(0, 0.45, 0)));
  let n = new vi(new ia(0.22, 0.22, 0.035, 30), e.darkMetal);
  ((n.rotation.x = Math.PI / 2), n.position.set(0, 0.44, 0.327), Lu(n), t.add(n));
  let r = new vi(new ia(0.16, 0.16, 0.038, 30), e.glass);
  ((r.rotation.x = Math.PI / 2), r.position.set(0, 0.44, 0.349), (r.castShadow = !1), t.add(r));
  let i = J(0.44, 0.08, 0.025, e.darkMetal, new V(0, 0.78, 0.326));
  return (t.add(i), Z(t, `Washing machine`, `Front-loading laundry appliance in the service yard.`, `appliance`), t);
}
function Td(e) {
  let t = new W(),
    n = Y(0.72, 1.82, 0.68, 0.02, e.steel, new V(0, 0.91, 0));
  return (
    t.add(n),
    t.add(J(0.7, 0.008, 0.02, e.darkMetal, new V(0, 1.12, 0.342))),
    t.add(Ru(0.012, 0.012, 0.5, e.darkMetal, new V(0.3, 0.8, 0.37), 10)),
    t.add(Ru(0.012, 0.012, 0.3, e.darkMetal, new V(0.3, 1.35, 0.37), 10)),
    Z(t, `Refrigerator`, `Tall stainless-steel refrigerator beside the kitchen counter.`, `appliance`),
    t
  );
}
function Ed({ width: e, materialCollection: t, includeSink: n = !1, includeStove: r = !1 }) {
  let i = new W(),
    a = 0.84;
  (i.add(J(e - 0.04, 0.1, 0.5, t.darkWood, new V(0, 0.05, -0.04))),
    i.add(Y(e, a - 0.1, 0.58, 0.012, t.paleWood, new V(0, 0.1 + (a - 0.1) / 2, 0))),
    i.add(Y(e + 0.03, 0.04, 0.62, 0.006, t.countertop, new V(0, 0.88, 0.01))));
  let o = Math.max(2, Math.round(e / 0.65));
  for (let n = 1; n < o; n += 1) {
    let r = -e / 2 + (e * n) / o;
    i.add(J(0.006, a - 0.14, 0.012, t.darkWood, new V(r, 0.1 + (a - 0.1) / 2, 0.292)));
  }
  if (n) {
    let e = Y(0.7, 0.08, 0.37, 0.025, t.darkMetal, new V(0.2, 0.865, 0));
    i.add(e);
    let n = Y(0.58, 0.06, 0.28, 0.022, t.brushedMetal, new V(0.2, 0.875, 0));
    i.add(n);
    let r = Ru(0.018, 0.018, 0.28, t.brushedMetal, new V(0.2, 1.03, -0.21), 12);
    ((r.rotation.x = -0.38), i.add(r));
  }
  if (r) {
    let e = Y(0.65, 0.012, 0.5, 0.006, t.blackScreen, new V(0.35, 0.905, 0));
    i.add(e);
    let n = new ya({ color: 6645603, roughness: 0.42, metalness: 0.38 });
    for (let e of [0.17, 0.53])
      for (let t of [-0.12, 0.12]) {
        let r = new vi(new sa(0.09, 0.012, 8, 24), n);
        ((r.rotation.x = Math.PI / 2), r.position.set(e, 0.912, t), Lu(r), i.add(r));
      }
    let r = Y(0.6, 0.58, 0.02, 0.01, t.blackScreen, new V(0.35, 0.47, 0.3));
    i.add(r);
  }
  return i;
}
function Dd(e) {
  let t = new W(),
    n = Y(0.92, 0.62, 0.52, 0.05, e.wallAccent, new V(0, 0.35, 0));
  t.add(n);
  let r = new vi(new ia(0.2, 0.2, 0.025, 32), e.darkMetal);
  ((r.rotation.x = Math.PI / 2), r.position.set(0, 0.37, 0.274), Lu(r), t.add(r));
  for (let n = 0; n < 5; n += 1) {
    let r = (n / 5) * Math.PI * 2,
      i = Y(0.17, 0.025, 0.055, 0.012, e.brushedMetal, new V(Math.cos(r) * 0.07, 0.37 + Math.sin(r) * 0.07, 0.292));
    ((i.rotation.z = r), t.add(i));
  }
  return (Z(t, `Air-conditioning condenser`, `Mechanical equipment on the external ledge.`, `equipment`), t);
}
function Od(e) {
  let t = hd(1, e, `Household shelter storage`),
    n = new ya({ color: 10387552, roughness: 0.9 });
  for (let e of [-0.28, 0.28]) {
    let r = Y(0.34, 0.2, 0.24, 0.025, n, new V(e, 0.49, 0.02));
    t.add(r);
  }
  return t;
}
function kd(e) {
  let t = document.createElement(`canvas`);
  ((t.width = 700), (t.height = 160));
  let n = t.getContext(`2d`);
  (n.clearRect(0, 0, t.width, t.height),
    (n.fillStyle = `rgba(255,255,255,0.88)`),
    (n.strokeStyle = `rgba(47,44,38,0.14)`),
    (n.lineWidth = 4),
    n.beginPath(),
    n.roundRect(12, 12, t.width - 24, t.height - 24, 38),
    n.fill(),
    n.stroke(),
    (n.fillStyle = `#39362f`),
    (n.font = `700 48px Inter, Arial, sans-serif`),
    (n.textAlign = `center`),
    (n.textBaseline = `middle`),
    n.fillText(e, t.width / 2, t.height / 2 + 2));
  let r = new $i(t);
  r.colorSpace = Ve;
  let i = new Xr(new Ir({ map: r, transparent: !0, depthWrite: !1 }));
  return (i.scale.set(2.1, 0.48, 1), i);
}
function Q(e, t, n, r, i = 0, a = 0) {
  return (t.position.set(n, a, r), (t.rotation.y = i), e.add(t), t);
}
function Ad(e, t, n) {
  let P = Math.PI,
    T = 0.25;
  // Exterior — measured from the 2D plan (x: 0–14.875, z: 0–9.35)
  (sd({ parentGroup: e, materialCollection: t, x: 0, zStart: 0.9, zEnd: 5.6, windowStart: 2.1, windowEnd: 4.5 }),
    od({ parentGroup: e, materialCollection: t, xStart: 0, xEnd: 3.15, z: 0.9, windowStart: 0.72, windowEnd: 2.42 }),
    od({ parentGroup: e, materialCollection: t, xStart: 0, xEnd: 2.82, z: 5.6, windowStart: 0.5, windowEnd: 2.3 }),
    od({ parentGroup: e, materialCollection: t, xStart: 3.15, xEnd: 6.2, z: 0, windowStart: 3.72, windowEnd: 5.5 }),
    od({ parentGroup: e, materialCollection: t, xStart: 6.2, xEnd: 9.15, z: 0, windowStart: 6.78, windowEnd: 8.58 }),
    od({ parentGroup: e, materialCollection: t, xStart: 9.15, xEnd: 11.05, z: 0, windowStart: 9.55, windowEnd: 11.05 }),
    od({ parentGroup: e, materialCollection: t, xStart: 11.05, xEnd: 14.875, z: 0, windowStart: 11.65, windowEnd: 14.2 }),
    sd({ parentGroup: e, materialCollection: t, x: 14.875, zStart: 0, zEnd: 6.1, windowStart: 1.35, windowEnd: 4.45 }),
    ad({ parentGroup: e, materialCollection: t, x: 14.875, zStart: 6.1, zEnd: 7.18, doorStart: 6.15, doorEnd: 7.05, thickness: Nu }),
    e.add(rd({ xStart: 12.48, zStart: 7.18, xEnd: 14.875, zEnd: 7.18, materialCollection: t, thickness: Nu })),
    e.add(rd({ xStart: 12.48, zStart: 7.18, xEnd: 12.48, zEnd: 9.35, materialCollection: t, thickness: Nu })),
    e.add(rd({ xStart: 5.87, zStart: 9.35, xEnd: 12.48, zEnd: 9.35, materialCollection: t, thickness: Nu })),
    sd({ parentGroup: e, materialCollection: t, x: 5.87, zStart: 6.85, zEnd: 9.35, windowStart: 7.95, windowEnd: 9.0 }),
    e.add(rd({ xStart: 2.82, zStart: 4.92, xEnd: 2.82, zEnd: 6.85, materialCollection: t, thickness: Nu })),
    // Bedroom wing
    e.add(rd({ xStart: 3.15, zStart: 0, xEnd: 3.15, zEnd: 3.85, materialCollection: t })),
    ad({ parentGroup: e, materialCollection: t, x: 3.15, zStart: 3.85, zEnd: 4.92, doorStart: 3.95, doorEnd: 4.85 }),
    e.add(rd({ xStart: 2.82, zStart: 4.92, xEnd: 3.15, zEnd: 4.92, materialCollection: t })),
    e.add(rd({ xStart: 6.2, zStart: 0, xEnd: 6.2, zEnd: 3.85, materialCollection: t })),
    e.add(rd({ xStart: 9.15, zStart: 0, xEnd: 9.15, zEnd: 3.85, materialCollection: t })),
    id({ parentGroup: e, materialCollection: t, xStart: 3.15, xEnd: 6.2, z: 3.85, doorStart: 5.3, doorEnd: 6.1 }),
    id({ parentGroup: e, materialCollection: t, xStart: 6.2, xEnd: 9.15, z: 3.85, doorStart: 6.3, doorEnd: 7.1 }),
    // Bathrooms
    id({ parentGroup: e, materialCollection: t, xStart: 3.15, xEnd: 5.13, z: 4.92, doorStart: 3.85, doorEnd: 4.6 }),
    id({ parentGroup: e, materialCollection: t, xStart: 5.13, xEnd: 7.3, z: 4.92, doorStart: 6.35, doorEnd: 7.1 }),
    e.add(rd({ xStart: 5.13, zStart: 4.92, xEnd: 5.13, zEnd: 6.85, materialCollection: t })),
    e.add(rd({ xStart: 2.82, zStart: 6.85, xEnd: 7.3, zEnd: 6.85, materialCollection: t })),
    // Household shelter (thick RC walls)
    e.add(rd({ xStart: 7.3, zStart: 4.92, xEnd: 9.15, zEnd: 4.92, materialCollection: t, thickness: T })),
    e.add(rd({ xStart: 7.3, zStart: 4.92, xEnd: 7.3, zEnd: 7.55, materialCollection: t, thickness: T })),
    e.add(rd({ xStart: 9.15, zStart: 4.92, xEnd: 9.15, zEnd: 7.55, materialCollection: t, thickness: T })),
    id({ parentGroup: e, materialCollection: t, xStart: 7.3, xEnd: 9.15, z: 7.55, doorStart: 7.7, doorEnd: 8.5, thickness: T }),
    // Service yard / kitchen divider
    ad({ parentGroup: e, materialCollection: t, x: 7.3, zStart: 7.55, zEnd: 9.35, doorStart: 7.75, doorEnd: 8.6 }),
    // 三妹 room: the suggested study enclosed with a light partition
    e.add(rd({ xStart: 11.5, zStart: 0.05, xEnd: 11.5, zEnd: 3.75, materialCollection: t, thickness: 0.1 })),
    id({ parentGroup: e, materialCollection: t, xStart: 9.15, xEnd: 11.5, z: 3.7, doorStart: 10.55, doorEnd: 11.35, thickness: 0.1 }));
  // Air-con ledge parapet
  for (let [x0, z0, x1, z1] of [
    [2.82, 6.85, 2.82, 7.75],
    [2.82, 7.75, 5.87, 7.75],
  ])
    e.add(rd({ xStart: x0, zStart: z0, xEnd: x1, zEnd: z1, materialCollection: t, height: 0.9, wallMaterial: t.wallAccent }));
  for (let [name, desc, hx, hz, w, c, o] of [
    [`Main bedroom door`, `Door between the main bedroom and the bedroom corridor.`, 3.15, 3.95, 0.9, -P / 2, -P * 0.08],
    [`Bedroom 3 door`, `大姐's bedroom door.`, 6.1, 3.85, 0.8, P, P * 1.32],
    [`Bedroom 2 door`, `二姐's bedroom door.`, 6.3, 3.85, 0.8, 0, -P * 0.32],
    [`Bathroom 1 door`, `Door to Bath/WC 1.`, 4.6, 4.92, 0.75, P, P * 1.29],
    [`Bathroom 2 door`, `Door to Bath/WC 2.`, 6.35, 4.92, 0.75, 0, -P * 0.28],
    [`Household shelter door`, `Heavy door to the household shelter.`, 8.5, 7.55, 0.8, P, P * 1.32],
    [`Service yard door`, `Door between the kitchen and the service yard.`, 7.3, 8.6, 0.85, P / 2, P * 0.92],
    [`Main entrance`, `Apartment entrance.`, 14.875, 7.05, 0.9, P / 2, P * 0.9],
    [`三妹 bedroom door`, `New door into the converted study, now 三妹's bedroom.`, 11.35, 3.7, 0.8, P, P * 0.58],
  ]) {
    let d = cd({ hingeX: hx, hingeZ: hz, width: w, closedAngle: c, openAngle: o, materialCollection: t, name, description: desc });
    (e.add(d), n.push(d));
  }
}
function jd(e, t = `Two-child bunk bed`) {
  let n = new W(),
    r = 1.02,
    i = 1.92,
    a = 0.27;
  for (let t of [a, 1.05]) {
    let o = Y(r, 0.14, i, 0.035, e.lightWood, new V(0, t, 0));
    n.add(o);
    let s = Y(r - 0.08, 0.18, i - 0.1, 0.06, e.linen, new V(0, t + 0.15, 0));
    n.add(s);
    let c = t === a ? e.sageFabric : e.oliveFabric,
      l = Y(r - 0.15, 0.035, i * 0.52, 0.02, c, new V(0, t + 0.255, i * 0.18));
    n.add(l);
    let u = Y(r * 0.62, 0.09, 0.34, 0.045, e.creamFabric, new V(0, t + 0.275, -1.92 * 0.32));
    n.add(u);
  }
  for (let t of [-0.465, r / 2 - 0.045])
    for (let r of [-0.9149999999999999, i / 2 - 0.045]) n.add(J(0.075, 1.48, 0.075, e.darkWood, new V(t, 0.74, r)));
  for (let t of [-1.92 * 0.26, i * 0.05, i * 0.36]) n.add(J(r - 0.12, 0.05, 0.05, e.darkWood, new V(0, 1.38, t)));
  let o = 0.59;
  for (let t of [-0.18, 0.18]) n.add(J(0.045, 1.15, 0.045, e.darkWood, new V(o, 0.7, t)));
  for (let t = 0; t < 5; t += 1) n.add(J(0.045, 0.045, 0.42, e.darkWood, new V(o, 0.26 + t * 0.23, 0)));
  return (Z(n, t, `Space-efficient bunk bed providing dedicated sleep zones for two children.`, `furniture`), n);
}
function Md(e, t = `Single-child loft bed`) {
  let n = new W(),
    r = 1.02,
    i = 1.9;
  (n.add(Y(r, 0.14, i, 0.035, e.lightWood, new V(0, 1.08, 0))),
    n.add(Y(r - 0.08, 0.18, i - 0.1, 0.06, e.linen, new V(0, 1.23, 0))),
    n.add(Y(r - 0.15, 0.035, i * 0.52, 0.02, e.sageFabric, new V(0, 1.335, i * 0.18))),
    n.add(Y(r * 0.62, 0.09, 0.34, 0.045, e.creamFabric, new V(0, 1.355, -1.9 * 0.32))));
  for (let t of [-0.465, r / 2 - 0.045])
    for (let r of [-0.9049999999999999, i / 2 - 0.045]) n.add(J(0.075, 1.48, 0.075, e.darkWood, new V(t, 0.74, r)));
  let a = Y(0.9, 0.07, 0.5, 0.025, e.paleWood, new V(0, 0.68, 0.1));
  n.add(a);
  for (let t of [-0.36, 0.36]) n.add(J(0.045, 0.64, 0.045, e.darkWood, new V(t, 0.34, 0.1)));
  let o = md(e, e.creamFabric);
  (o.position.set(0, 0, 0.64), (o.rotation.y = Math.PI), n.add(o));
  for (let t of [-0.18, 0.18]) n.add(J(0.045, 1.12, 0.045, e.darkWood, new V(0.59, 0.68, t)));
  for (let t = 0; t < 5; t += 1) n.add(J(0.045, 0.045, 0.42, e.darkWood, new V(0.59, 0.25 + t * 0.22, 0)));
  return (Z(n, t, `Raised bed with a compact individual study station underneath.`, `furniture`), n);
}
function Nd({ width: e, seatCount: t, materialCollection: n, name: r = `Shared study desk` }) {
  let i = new W();
  i.add(Y(e, 0.075, 0.54, 0.024, n.lightWood, new V(0, 0.72, 0)));
  for (let t of [-e / 2 + 0.08, e / 2 - 0.08])
    (i.add(J(0.055, 0.67, 0.055, n.darkWood, new V(t, 0.35, -0.16))),
      i.add(J(0.055, 0.67, 0.055, n.darkWood, new V(t, 0.35, 0.16))));
  for (let r = 1; r < t; r += 1) {
    let a = -e / 2 + (e * r) / t;
    i.add(J(0.025, 0.25, 0.42, n.wallAccent, new V(a, 0.88, -0.02)));
  }
  for (let r = 0; r < t; r += 1) {
    let a = -e / 2 + (e * (r + 0.5)) / t,
      o = md(n, r % 2 == 0 ? n.sageFabric : n.creamFabric);
    (o.position.set(a, 0, 0.62), (o.rotation.y = Math.PI), i.add(o));
    let s = Y(0.24, 0.035, 0.18, 0.012, r % 2 == 0 ? n.oliveFabric : n.sageFabric, new V(a, 0.79, -0.06));
    i.add(s);
  }
  return (Z(i, r, `${t}-seat homework surface with individual task positions.`, `furniture`), i);
}
function Pd(e, t, n = `Kids storage cubbies`) {
  let r = new W(),
    i = 0.62;
  r.add(Y(e, i, 0.34, 0.025, t.paleWood, new V(0, i / 2, 0)));
  for (let n of [-e / 6, e / 6]) r.add(J(0.025, i - 0.08, 0.36000000000000004, t.darkWood, new V(n, i / 2, 0.01)));
  return (
    r.add(J(e - 0.08, 0.025, 0.36000000000000004, t.darkWood, new V(0, i / 2, 0.01))),
    Z(r, n, `Low-access storage for books, toys, and school bags.`, `furniture`),
    r
  );
}
function Fd(e, t = `Reading bean bag`) {
  let n = new oa(0.42, 24, 14);
  n.scale(1, 0.68, 1);
  let r = new vi(n, e.sageFabric);
  return ((r.position.y = 0.3), Lu(r), Z(r, t, `Soft seat for reading, relaxing, or quiet play.`, `furniture`), r);
}
function Id(e, t = `Kids activity table`) {
  let n = new W();
  n.add(Y(0.92, 0.07, 0.68, 0.06, e.lightWood, new V(0, 0.42, 0)));
  for (let t of [-0.34, 0.34]) for (let r of [-0.22, 0.22]) n.add(J(0.055, 0.38, 0.055, e.darkWood, new V(t, 0.2, r)));
  for (let t of [-0.7, 0.7]) n.add(Ru(0.2, 0.22, 0.28, e.creamFabric, new V(t, 0.14, 0), 20));
  return (Z(n, t, `Low table for crafts, construction toys, and shared leisure activities.`, `furniture`), n);
}
function Ld(e, t = `Reading bench`) {
  let n = new W();
  (n.add(Y(1.15, 0.34, 0.48, 0.06, e.paleWood, new V(0, 0.2, 0))),
    n.add(Y(1.04, 0.12, 0.42, 0.05, e.creamFabric, new V(0, 0.43, 0))));
  for (let t of [-0.36, 0.36]) n.add(Y(0.3, 0.3, 0.11, 0.045, e.sageFabric, new V(t, 0.61, -0.14)));
  return (Z(n, t, `Window-side leisure seat with concealed low storage.`, `furniture`), n);
}
function Rd(e, t = `Parent bedroom vanity desk`) {
  let n = new W();
  (n.add(Y(1.18, 0.075, 0.44, 0.025, e.lightWood, new V(0, 0.74, 0))),
    n.add(Y(0.42, 0.18, 0.38, 0.025, e.paleWood, new V(0.34, 0.61, 0))));
  for (let t of [-0.5, 0.5]) for (let r of [-0.16, 0.16]) n.add(J(0.045, 0.7, 0.045, e.darkWood, new V(t, 0.36, r)));
  let r = Y(0.72, 0.78, 0.04, 0.035, e.darkWood, new V(-0.08, 1.2, -0.2));
  n.add(r);
  let i = Y(0.64, 0.7, 0.012, 0.025, e.glass, new V(-0.08, 1.2, -0.224));
  ((i.castShadow = !1), n.add(i));
  let a = md(e, e.creamFabric, `Vanity chair`);
  return (
    a.scale.setScalar(0.82),
    a.position.set(0, 0, 0.48),
    (a.rotation.y = Math.PI),
    n.add(a),
    Z(
      n,
      t,
      `Compact vanity or laptop station that uses the free wall without narrowing the main circulation path.`,
      `furniture`,
    ),
    n
  );
}
function zd(e, t = `Entry storage wall`) {
  let n = new W();
  (n.add(Y(1.24, 0.46, 0.4, 0.035, e.paleWood, new V(0, 0.25, 0))),
    n.add(Y(0.72, 0.11, 0.36, 0.045, e.creamFabric, new V(-0.18, 0.53, 0))),
    n.add(Y(0.43, 1.5, 0.42, 0.03, e.paleWood, new V(0.4, 0.76, 0))));
  for (let t of [0.75, 1.02, 1.29]) {
    let r = Ru(0.022, 0.022, 0.12, e.brushedMetal, new V(-0.28, t, -0.23), 12);
    ((r.rotation.x = Math.PI / 2), n.add(r));
  }
  let r = Y(0.46, 0.78, 0.018, 0.035, e.glass, new V(-0.28, 1.12, -0.225));
  return (
    (r.castShadow = !1),
    n.add(r),
    Z(
      n,
      t,
      `Shoe drawers, sitting bench, coat hooks, mirror, and tall daily-use storage arranged in one compact unit.`,
      `furniture`,
    ),
    n
  );
}
function Bd(e, t = `Family command sideboard`) {
  let n = new W();
  (n.add(Y(1.3, 0.74, 0.38, 0.035, e.paleWood, new V(0, 0.39, 0))),
    n.add(Y(1.36, 0.055, 0.42, 0.02, e.countertop, new V(0, 0.79, 0))));
  for (let t of [-0.42, 0, 0.42]) n.add(Ru(0.012, 0.012, 0.11, e.darkMetal, new V(t, 0.52, 0.205), 10));
  for (let t of [-0.43, 0, 0.43]) {
    let r = Y(0.3, 0.035, 0.22, 0.015, t === 0 ? e.sageFabric : e.creamFabric, new V(t, 0.84, 0));
    n.add(r);
  }
  return (
    Z(n, t, `Storage for school bags, charging, stationery, family paperwork, and dining supplies.`, `furniture`),
    n
  );
}
function Vd(e, t = `Living room lounge chair`) {
  let n = new W();
  n.add(Y(0.72, 0.18, 0.7, 0.075, e.sageFabric, new V(0, 0.48, 0)));
  let r = Y(0.7, 0.65, 0.16, 0.07, e.sageFabric, new V(0, 0.78, -0.29));
  ((r.rotation.x = -0.14), n.add(r));
  for (let t of [-0.29, 0.29]) n.add(Y(0.12, 0.42, 0.68, 0.05, e.lightWood, new V(t, 0.36, 0)));
  for (let t of [-0.25, 0.25])
    for (let r of [-0.24, 0.24]) {
      let i = J(0.045, 0.38, 0.045, e.darkWood, new V(t, 0.2, r));
      ((i.rotation.z = t > 0 ? -0.06 : 0.06), n.add(i));
    }
  return (
    Z(
      n,
      t,
      `Movable reading chair that adds a leisure seat without committing the open floor to a large fixed item.`,
      `furniture`,
    ),
    n
  );
}
function Hd(e, t, n = `Kitchen upper cabinets`) {
  let r = new W(),
    i = 0.7;
  r.add(Y(e, i, 0.34, 0.012, t.paleWood, new V(0, 1.86, 0)));
  let a = Math.max(2, Math.round(e / 0.65));
  for (let n = 1; n < a; n += 1) {
    let o = -e / 2 + (e * n) / a;
    r.add(J(0.006, i - 0.02, 0.012, t.darkWood, new V(o, 1.86, 0.172)));
  }
  for (let n = 0; n < a; n += 1) {
    let i = -e / 2 + (e * (n + 0.5)) / a;
    r.add(J(0.16, 0.012, 0.02, t.darkMetal, new V(i, 1.53, 0.18)));
  }
  return (
    Z(r, n, `Wall-mounted storage that increases kitchen capacity while keeping the floor area open.`, `furniture`),
    r
  );
}
function Ud(e, t = `Shared-study storage divider`) {
  let n = new W(),
    r = 1.38,
    i = 0.78;
  n.add(Y(r, i, 0.34, 0.025, e.paleWood, new V(0, i / 2, 0)));
  for (let t of [-1.38 / 6, r / 6]) n.add(J(0.025, i - 0.08, 0.36000000000000004, e.darkWood, new V(t, i / 2, 0.01)));
  return (
    n.add(J(r - 0.08, 0.025, 0.36000000000000004, e.darkWood, new V(0, i / 2, 0.01))),
    Z(n, t, `Low two-sided cubbies that define the study zone without creating a closed fourth room.`, `furniture`),
    n
  );
}
function Wd(e, t) {
  (Q(e, jd(t, `Shared bedroom bunk bed`), 3.82, 1.95, 0),
    Q(e, fd(1.16, t, `Shared bedroom wardrobe`), 5.88, 1.12, Math.PI / 2),
    Q(e, Pd(1.35, t, `Shared bedroom cubbies`), 4.78, 3.12, 0),
    Q(e, ld(1.15, 0.85, t.rugSage), 4.72, 2.42, 0, 0.01),
    Q(e, Md(t, `Single-child loft study bed`), 8.46, 1.62, 0),
    Q(e, fd(0.9, t, `Single-child wardrobe`), 6.48, 1.06, Math.PI / 2),
    Q(e, Fd(t, `Single bedroom reading bean bag`), 7.15, 2.65, 0),
    Q(e, Pd(0.92, t, `Single bedroom cubbies`), 7.52, 0.42, 0),
    Q(e, Nd({ width: 2.25, seatCount: 3, materialCollection: t, name: `Three-child homework desk` }), 10.72, 0.67, 0),
    Q(e, hd(0.82, t, `Shared homework bookcase`), 9.48, 1.28, Math.PI / 2),
    Q(e, Ld(t, `Shared reading bench`), 11.52, 1.72, 0),
    Q(e, Ud(t, `Balanced-layout study divider`), 10, 2.25, Math.PI / 2));
}
function Gd(e, t) {
  (Q(e, jd(t, `Shared bedroom bunk bed`), 3.72, 2.05, 0),
    Q(e, Nd({ width: 1.72, seatCount: 2, materialCollection: t, name: `Two-child bedroom study desk` }), 4.86, 0.64, 0),
    Q(e, fd(0.94, t, `Shared bedroom wardrobe`), 5.9, 1.75, Math.PI / 2),
    Q(e, Md(t, `Single-child loft study bed`), 8.4, 1.55, 0),
    Q(e, hd(0.72, t, `Single-child bookcase`), 6.5, 1.05, Math.PI / 2),
    Q(e, Fd(t, `Quiet reading seat`), 7.1, 2.62, 0),
    Q(e, Id(t, `Shared project table`), 10.68, 1.42, 0),
    Q(e, hd(1.05, t, `Shared learning library`), 9.48, 1.25, Math.PI / 2),
    Q(e, Ld(t, `Project-zone reading bench`), 11.58, 0.56, 0),
    Q(e, Ud(t, `Study-focused storage divider`), 10, 2.25, Math.PI / 2));
}
function Kd(e, t) {
  (Q(e, jd(t, `Shared bedroom bunk bed`), 3.72, 1.86, 0),
    Q(e, fd(1, t, `Shared bedroom wardrobe`), 5.9, 1.12, Math.PI / 2),
    Q(e, Id(t, `Shared bedroom play table`), 4.88, 2.7, 0),
    Q(e, Pd(1.18, t, `Shared play storage`), 4.82, 0.42, 0),
    Q(
      e,
      ud({
        width: 1.08,
        length: 1.9,
        materialCollection: t,
        blanketMaterial: t.sageFabric,
        name: `Single-child day bed`,
      }),
      8.42,
      1.38,
      0,
    ),
    Q(e, pd(t, `Single-child hobby desk`), 7.1, 0.58, 0),
    Q(e, md(t, t.creamFabric), 7.1, 1.12, Math.PI),
    Q(e, Fd(t, `Single bedroom leisure seat`), 7.15, 2.68, 0),
    Q(e, fd(0.8, t, `Single-child wardrobe`), 8.86, 2.83, Math.PI / 2),
    Q(
      e,
      Nd({ width: 2.18, seatCount: 3, materialCollection: t, name: `Compact three-child study desk` }),
      10.65,
      0.66,
      0,
    ),
    Q(e, Ld(t, `Shared leisure bench`), 11.58, 1.74, 0),
    Q(e, Pd(0.88, t, `Shared games storage`), 9.48, 1.32, Math.PI / 2),
    Q(e, Ud(t, `Leisure-layout storage divider`), 10, 2.25, Math.PI / 2));
}
// ---- Yan Shiuan family: final furniture selection -------------------------------------------
var Fx = { shadowTexture: null };
function Fbend(w, h, d, R, mat, seg = 28) {
  let g = new ra(w, h, d, seg, 1, 2),
    p = g.attributes.position;
  for (let k = 0; k < p.count; k += 1) {
    let x = p.getX(k),
      z = p.getZ(k),
      th = x / R,
      rho = R - z;
    p.setXYZ(k, rho * Math.sin(th), p.getY(k), -rho * Math.cos(th));
  }
  (g.computeVertexNormals(), (p.needsUpdate = !0));
  let m = new vi(g, mat);
  return Lu(m);
}
function Flathe(pts, mat, seg = 40) {
  let pos = [],
    uv = [],
    idx = [];
  for (let i = 0; i < pts.length; i += 1)
    for (let j = 0; j <= seg; j += 1) {
      let a = (j / seg) * Math.PI * 2;
      (pos.push(Math.cos(a) * pts[i][0], pts[i][1], Math.sin(a) * pts[i][0]), uv.push(j / seg, i / (pts.length - 1)));
    }
  for (let i = 0; i < pts.length - 1; i += 1)
    for (let j = 0; j < seg; j += 1) {
      let a = i * (seg + 1) + j,
        b = a + seg + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  let g = new Ar();
  (g.setAttribute(`position`, new vr(pos, 3)), g.setAttribute(`uv`, new vr(uv, 2)), g.setIndex(idx), g.computeVertexNormals());
  let m = new vi(g, mat);
  return Lu(m);
}
function Fshadow(w, d, opacity = 0.42) {
  if (!Fx.shadowTexture) {
    let c = document.createElement(`canvas`);
    ((c.width = 128), (c.height = 128));
    let x = c.getContext(`2d`);
    ((x.filter = `blur(13px)`), (x.fillStyle = `#000`), x.fillRect(26, 26, 76, 76));
    ((Fx.shadowTexture = new $i(c)), (Fx.shadowTexture.colorSpace = Ve));
  }
  let mat = new oi({ color: 0, map: Fx.shadowTexture, transparent: !0, opacity, depthWrite: !1 });
  mat.userData.includeInInspector = !1;
  let m = new vi(new aa(w * 1.32, d * 1.32), mat);
  return ((m.rotation.x = -Math.PI / 2), (m.position.y = 0.003), (m.renderOrder = 1), m);
}
function Fbooks(t, width, maxH = 0.24, depth = 0.17, seed = 1) {
  let g = new W(),
    r = zu(seed * 977),
    mats = [t.bookA, t.bookB, t.bookC, t.bookD, t.bookE, t.bookA, t.bookE],
    x = -width / 2;
  for (; x < width / 2 - 0.03; ) {
    let bw = 0.018 + r() * 0.03,
      bh = maxH * (0.68 + r() * 0.32),
      b = J(bw, bh, depth * (0.8 + r() * 0.2), mats[Math.floor(r() * mats.length)], new V(x + bw / 2, bh / 2, 0));
    ((b.castShadow = !1), g.add(b), (x += bw + 0.003));
    if (r() > 0.86) x += 0.06 + r() * 0.08;
  }
  return g;
}
function Flamp(t, base, shade, scale = 1) {
  let g = new W();
  g.add(Flathe([[0, 0], [0.07, 0], [0.075, 0.012], [0.02, 0.03], [0.012, 0.05], [0, 0.05]].map(([a, b]) => [a * scale, b * scale]), base, 24));
  g.add(Ru(0.008 * scale, 0.008 * scale, 0.26 * scale, base, new V(0, 0.17 * scale, 0), 10));
  let s = [];
  for (let k = 0; k <= 10; k += 1) {
    let a = k / 10;
    s.push([(0.04 + 0.1 * Math.sin((a * Math.PI) / 2)) * scale, (0.42 - a * 0.13) * scale]);
  }
  s.reverse();
  return (g.add(Flathe([[0, 0.3 * scale], ...s, [0, 0.42 * scale]], shade, 32)), g);
}
function Fart(t, w, h, hue = 0) {
  let g = new W();
  g.add(J(w, h, 0.025, t.walnut, new V(0, 0, 0)));
  g.add(J(w - 0.05, h - 0.05, 0.028, t.artworkBackground, new V(0, 0, 0.001)));
  let ink = hue === 0 ? t.artworkInk : t.throwOat;
  let a = J((w - 0.05) * 0.45, (h - 0.05) * 0.5, 0.03, ink, new V(-w * 0.06, -h * 0.05, 0.002));
  g.add(a);
  let b = Ru(Math.min(w, h) * 0.12, Math.min(w, h) * 0.12, 0.031, t.throwOat, new V(w * 0.16, h * 0.16, 0.002), 28);
  return ((b.rotation.x = Math.PI / 2), g.add(b), g.traverse((e) => e.isMesh && (e.castShadow = !1)), g);
}

// 1.8 × 2 m / 1.5 × 2 m gas-lift storage bed, cream upholstered (head toward local -z)
function Fbed(t, w, name, desc, throwMat) {
  let g = new W(),
    l = 2,
    Wd2 = w + 0.14,
    Ld = l + 0.12;
  for (let sx of [-1, 1]) for (let sz of [-1, 1]) g.add(J(0.05, 0.05, 0.05, t.darkMetal, new V((sx * (Wd2 - 0.16)) / 2, 0.025, (sz * (Ld - 0.16)) / 2)));
  g.add(Y(Wd2, 0.3, Ld, 0.06, t.creamLeather, new V(0, 0.2, 0)));
  g.add(J(w, 0.02, l, t.pineSlat, new V(0, 0.34, 0)));
  g.add(Y(w - 0.02, 0.22, l - 0.04, 0.06, t.mattress, new V(0, 0.44, 0.01)));
  let du = Y(w + 0.06, 0.09, l * 0.7, 0.04, t.duvet, new V(0, 0.52, l * 0.15 + 0.02));
  g.add(du);
  let roll = Ru(0.045, 0.045, w + 0.05, t.duvet, new V(0, 0.565, l * 0.15 - l * 0.35 + 0.04), 16);
  ((roll.rotation.z = Math.PI / 2), g.add(roll));
  g.add(Y(w + 0.1, 0.03, 0.5, 0.012, throwMat ?? t.throwOat, new V(0, 0.575, l / 2 - 0.3)));
  let np = w > 1.6 ? 2 : 2,
    pw = (w - 0.14) / np;
  for (let k = 0; k < np; k += 1) {
    let x = -w / 2 + 0.07 + pw * (k + 0.5),
      p = Y(pw - 0.04, 0.15, 0.4, 0.07, t.duvet, new V(x, 0.62, -l / 2 + 0.3));
    ((p.rotation.x = -0.32), g.add(p));
  }
  let accent = Y(0.42, 0.28, 0.12, 0.05, throwMat ?? t.throwOat, new V(0, 0.64, -l / 2 + 0.47));
  ((accent.rotation.x = -0.18), g.add(accent));
  g.add(Y(Wd2, 1, 0.12, 0.04, t.creamLeather, new V(0, 0.5, -Ld / 2 - 0.04)));
  for (let sx of [-1, 1]) {
    let c = Y(Wd2 / 2 - 0.03, 0.44, 0.22, 0.1, t.creamLeather, new V((sx * Wd2) / 4, 0.78, -Ld / 2 + 0.06));
    ((c.rotation.x = -0.1), g.add(c));
  }
  return (g.add(Fshadow(Wd2, Ld + 0.15, 0.45)), Z(g, name, desc, `furniture`), g);
}
// Red-walnut slim bedside 20 × 40 × 50 cm (front local +z)
function Fbedside(t) {
  let g = new W();
  g.add(Y(0.2, 0.5, 0.4, 0.04, t.walnut, new V(0, 0.25, 0)));
  for (let y of [0.14, 0.36]) g.add(Y(0.17, 0.2, 0.02, 0.03, t.walnut, new V(0, y, 0.2)));
  return (
    g.add(Fshadow(0.2, 0.4, 0.35)),
    Z(g, `Red-walnut bedside cabinet`, `20 × 40 × 50 cm slim two-drawer bedside, rounded solid-wood corners · S$20 each.`, `furniture`),
    g
  );
}
// ENF solid-core 1.2 m desk + 1.2 m six-drawer chest, walnut (front +z, chest on the left)
function FchestDesk(t) {
  let g = new W();
  g.add(Y(1.2, 0.6, 0.4, 0.03, t.walnut, new V(-0.6, 0.33, 0)));
  g.add(J(1.12, 0.04, 0.36, t.darkWood, new V(-0.6, 0.02, 0)));
  for (let c = 0; c < 2; c += 1)
    for (let rw = 0; rw < 3; rw += 1) {
      let x = -1.2 + 0.31 + c * 0.58,
        y = 0.135 + rw * 0.19;
      g.add(Y(0.565, 0.18, 0.02, 0.012, t.walnut, new V(x, y, 0.205)));
      g.add(J(0.16, 0.008, 0.01, t.darkWood, new V(x, y + 0.075, 0.216)));
    }
  g.add(Y(1.22, 0.035, 0.42, 0.012, t.walnut, new V(0.6, 0.782, -0.01)));
  g.add(J(1.12, 0.1, 0.38, t.walnut, new V(0.6, 0.715, -0.02)));
  g.add(J(1.12, 0.005, 0.01, t.darkWood, new V(0.6, 0.715, 0.17)));
  g.add(J(0.035, 0.765, 0.4, t.walnut, new V(1.19, 0.382, -0.01)));
  g.add(J(0.035, 0.765, 0.4, t.walnut, new V(0.02, 0.382, -0.01)));
  let lamp = Flamp(t, t.brushedMetal, t.lampShade, 1);
  (lamp.position.set(-1.0, 0.63, -0.05), g.add(lamp));
  let vase = Flathe([[0, 0], [0.045, 0], [0.06, 0.08], [0.03, 0.17], [0.022, 0.2], [0, 0.2]], t.whiteCeramic, 24);
  (vase.position.set(-0.32, 0.63, 0), g.add(vase));
  for (let k = 0; k < 5; k += 1) {
    let st = Ru(0.003, 0.003, 0.32, t.throwOat, new V(-0.32 + (k - 2) * 0.02, 0.92, (k % 2) * 0.02), 5);
    ((st.rotation.z = (k - 2) * 0.12), g.add(st));
  }
  let bk = Fbooks(t, 0.3, 0.2, 0.15, 3);
  (bk.position.set(0.95, 0.8, -0.1), g.add(bk));
  return (
    g.add(Fshadow(2.4, 0.42, 0.4)),
    Z(g, `Walnut six-drawer chest + 1.2 m desk`, `ENF-grade solid-wood-core 1.2 m six-drawer chest paired with a 1.2 m writing desk · S$176.`, `furniture`),
    g
  );
}
function Fstool(t) {
  let g = new W();
  return (g.add(Y(0.38, 0.4, 0.32, 0.025, t.walnut, new V(0, 0.2, 0))), g.add(Y(0.38, 0.06, 0.32, 0.03, t.cushion, new V(0, 0.43, 0))), g);
}
// Walnut 48 cm dressing table with tall cabinet + LED mirror (front +z)
function FvanityTall(t) {
  let g = new W();
  g.add(Y(0.48, 0.76, 0.42, 0.015, t.walnut, new V(0, 0.38, 0)));
  for (let y of [0.66, 0.55]) g.add(J(0.44, 0.095, 0.015, t.walnut, new V(0, y, 0.213)));
  g.add(J(0.44, 0.4, 0.015, t.walnut, new V(0, 0.27, 0.213)));
  g.add(J(0.48, 1.47, 0.02, t.walnut, new V(0, 0.735, -0.2)));
  for (let s of [-1, 1]) g.add(J(0.02, 0.71, 0.27, t.walnut, new V((s * 0.23), 1.115, -0.075)));
  g.add(J(0.36, 0.42, 0.012, t.mirror, new V(0, 0.99, -0.185)));
  for (let s of [-1, 1]) g.add(J(0.012, 0.36, 0.006, t.led, new V(s * 0.155, 0.99, -0.178)));
  for (let y of [1.2, 1.46]) g.add(J(0.46, 0.02, 0.27, t.walnut, new V(0, y, -0.075)));
  g.add(J(0.46, 0.015, 0.25, t.walnut, new V(0, 1.33, -0.08)));
  let r = zu(41);
  for (let k = 0; k < 6; k += 1) {
    let b = Ru(0.018, 0.018, 0.06 + r() * 0.06, k % 2 ? t.whiteCeramic : t.throwOat, new V(-0.17 + k * 0.065, 1.24 + 0.04, -0.1), 12);
    g.add(b);
  }
  let st = Fstool(t);
  return (
    st.position.set(0, 0, 0.48),
    g.add(st),
    g.add(Fshadow(0.48, 0.9, 0.35)),
    Z(g, `Walnut dressing table + tall cabinet`, `48 × 50 × 147 cm walnut dressing table with tall storage cabinet, LED mirror and USB socket upgrade · S$211.`, `furniture`),
    g
  );
}
// Walnut 48 cm flip-top vanity with lighted mirror + stool (front +z)
function FvanityFlip(t) {
  let g = new W();
  g.add(Y(0.48, 0.72, 0.4, 0.015, t.walnut, new V(0, 0.36, 0)));
  for (let y of [0.5, 0.27]) g.add(J(0.44, 0.2, 0.015, t.walnut, new V(0, y, 0.205)));
  g.add(J(0.44, 0.02, 0.36, t.darkWood, new V(0, 0.7, 0)));
  let lid = new W();
  (lid.add(J(0.48, 0.4, 0.02, t.walnut, new V(0, 0.2, 0))), lid.add(J(0.4, 0.32, 0.006, t.mirror, new V(0, 0.2, 0.012))));
  for (let [w, h, x, y] of [
    [0.34, 0.01, 0, 0.36],
    [0.34, 0.01, 0, 0.04],
    [0.01, 0.31, -0.17, 0.2],
    [0.01, 0.31, 0.17, 0.2],
  ])
    lid.add(J(w, h, 0.004, t.led, new V(x, y, 0.016)));
  (lid.position.set(0, 0.72, -0.19), (lid.rotation.x = -0.12), g.add(lid));
  let st = Fstool(t);
  return (
    st.position.set(0, 0, 0.45),
    g.add(st),
    g.add(Fshadow(0.48, 0.85, 0.35)),
    Z(g, `Walnut flip-top vanity`, `48 cm flip-top dressing table with lighted mirror and storage stool · S$40.`, `furniture`),
    g
  );
}
function FkidsChair(t, frame) {
  let g = new W();
  for (let sx of [-1, 1])
    for (let sz of [-1, 1]) {
      let lg = J(0.035, 0.44, 0.035, frame, new V(sx * 0.19, 0.22, sz * 0.18));
      g.add(lg);
    }
  g.add(J(0.42, 0.03, 0.4, frame, new V(0, 0.43, 0)));
  g.add(Y(0.42, 0.06, 0.4, 0.03, t.cushion, new V(0, 0.47, 0.01)));
  for (let sx of [-1, 1]) g.add(J(0.035, 0.42, 0.035, frame, new V(sx * 0.19, 0.65, -0.18)));
  let bk = Y(0.42, 0.24, 0.05, 0.025, t.cushion, new V(0, 0.75, -0.19));
  ((bk.rotation.x = 0.08), g.add(bk));
  for (let sx of [-1, 1]) g.add(Y(0.04, 0.03, 0.34, 0.012, frame, new V(sx * 0.21, 0.62, -0.02)));
  for (let sx of [-1, 1]) g.add(J(0.03, 0.17, 0.03, frame, new V(sx * 0.21, 0.53, 0.13)));
  g.add(J(0.38, 0.025, 0.025, frame, new V(0, 0.12, 0.18)));
  return g;
}
// 120 × 60 × 185 cm study desk with hutch, pegboard and chair (front +z)
function FkidsDesk(t, frame, name, desc) {
  let g = new W();
  g.add(Y(1.2, 0.035, 0.6, 0.012, frame, new V(0, 0.742, 0)));
  g.add(J(1.08, 0.09, 0.5, t.whiteBoard, new V(0, 0.68, 0.02)));
  g.add(J(0.004, 0.08, 0.01, t.darkWood, new V(0, 0.68, 0.272)));
  for (let x of [-0.27, 0.27]) g.add(Y(0.12, 0.016, 0.012, 0.005, t.darkMetal, new V(x, 0.7, 0.277)));
  for (let sx of [-1, 1]) {
    for (let sz of [-1, 1]) g.add(Y(0.05, 0.725, 0.05, 0.012, frame, new V(sx * 0.565, 0.362, sz * 0.26)));
    g.add(J(0.04, 0.05, 0.5, frame, new V(sx * 0.565, 0.6, 0)));
    g.add(J(0.04, 0.04, 0.5, frame, new V(sx * 0.565, 0.16, 0)));
  }
  let loop = new vi(new sa(0.085, 0.018, 8, 20, Math.PI), frame);
  (loop.position.set(0.6, 0.76, 0.1), (loop.rotation.y = Math.PI / 2), Lu(loop), g.add(loop));
  g.add(J(1.09, 0.025, 0.3, frame, new V(0, 0.2, -0.1)));
  g.add(J(1.12, 0.42, 0.015, t.pegboard, new V(0, 0.97, -0.285)));
  for (let sx of [-1, 1]) g.add(J(0.02, 0.44, 0.28, t.whiteBoard, new V(sx * 0.59, 0.98, -0.16)));
  let hb = 1.2,
    ht = 1.85;
  g.add(J(1.2, 0.025, 0.3, t.whiteBoard, new V(0, hb, -0.15)));
  g.add(J(1.2, 0.025, 0.3, t.whiteBoard, new V(0, ht, -0.15)));
  for (let x of [-0.59, -0.2, 0.2, 0.59]) g.add(J(0.022, ht - hb, 0.3, t.whiteBoard, new V(x, (hb + ht) / 2, -0.15)));
  g.add(J(1.18, ht - hb, 0.012, t.whiteBoard, new V(0, (hb + ht) / 2, -0.294)));
  for (let y of [1.42, 1.63]) g.add(J(0.38, 0.018, 0.28, t.whiteBoard, new V(-0.395, y, -0.15)));
  g.add(J(0.78, 0.018, 0.28, t.whiteBoard, new V(0.2, 1.52, -0.16)));
  for (let [y, s] of [
    [1.213, 1],
    [1.433, 2],
    [1.643, 3],
  ]) {
    let b = Fbooks(t, 0.34, 0.18, 0.17, s + name.length);
    (b.position.set(-0.395, y, -0.15), g.add(b));
  }
  for (let y of [1.213, 1.53]) {
    let b = Fbooks(t, 0.7, 0.24, 0.16, y * 10 + name.length);
    (b.position.set(0.2, y, -0.17), g.add(b));
  }
  for (let cx of [0, 0.395]) {
    let x = cx;
    g.add(J(0.37, ht - hb - 0.04, 0.008, t.cabinetGlass, new V(x, (hb + ht) / 2, 0.005)));
    for (let [w, h, px, py] of [
      [0.37, 0.025, x, hb + 0.03],
      [0.37, 0.025, x, ht - 0.03],
      [0.022, ht - hb - 0.04, x - 0.175, (hb + ht) / 2],
      [0.022, ht - hb - 0.04, x + 0.175, (hb + ht) / 2],
    ])
      g.add(J(w, h, 0.02, t.whiteBoard, new V(px, py, 0.005)));
  }
  let lamp = Flamp(t, t.whiteCeramic, t.lampShade, 0.85);
  (lamp.position.set(-0.4, 0.76, -0.12), g.add(lamp));
  let tab = J(0.26, 0.012, 0.18, t.blackScreen, new V(0.15, 0.766, 0.02));
  ((tab.rotation.y = 0.12), g.add(tab));
  let ch = FkidsChair(t, frame);
  return (
    ch.position.set(-0.05, 0, 0.5),
    (ch.rotation.y = Math.PI),
    g.add(ch),
    g.add(Fshadow(1.2, 1.1, 0.38)),
    Z(g, name, desc, `furniture`),
    g
  );
}
// 80 × 32 × 200 cm two-door cupboard with glass upper doors (front +z)
function Fcupboard(t, body, name, desc, seed = 1) {
  let g = new W(),
    H = 2,
    Wc = 0.8,
    D = 0.32;
  for (let s of [-1, 1]) g.add(J(0.02, H, D, body, new V((s * (Wc - 0.02)) / 2, H / 2, 0)));
  g.add(J(Wc, 0.02, D, body, new V(0, H - 0.01, 0)));
  g.add(J(Wc - 0.04, 0.06, D - 0.03, t.darkWood, new V(0, 0.03, -0.01)));
  g.add(J(Wc - 0.04, H - 0.06, 0.01, body, new V(0, H / 2 + 0.02, -D / 2 + 0.006)));
  g.add(J(Wc - 0.04, 0.02, D - 0.01, body, new V(0, 0.07, 0)));
  for (let s of [-1, 1]) {
    g.add(J(Wc / 2 - 0.012, 0.8, 0.018, body, new V((s * Wc) / 4, 0.48, D / 2 + 0.002)));
    g.add(J(0.012, 0.14, 0.018, t.darkMetal, new V(s * 0.035, 0.8, D / 2 + 0.018)));
  }
  g.add(J(Wc - 0.04, 0.02, D - 0.02, body, new V(0, 0.89, 0)));
  for (let y of [1.16, 1.43, 1.7]) g.add(J(Wc - 0.04, 0.018, D - 0.03, body, new V(0, y, -0.005)));
  let r = zu(seed * 131);
  for (let y of [0.9, 1.169, 1.439, 1.709]) {
    let b = Fbooks(t, 0.36 + r() * 0.2, 0.2 + r() * 0.04, 0.2, seed * 7 + y * 10);
    (b.position.set(-0.12 + r() * 0.08, y + 0.009, -0.02), g.add(b));
    if (r() > 0.4) {
      let o = Ru(0.035, 0.035, 0.09, r() > 0.5 ? t.whiteCeramic : t.plantPot, new V(0.25, y + 0.055, 0), 16);
      g.add(o);
    }
  }
  g.add(J(Wc - 0.06, 0.008, 0.012, t.led, new V(0, H - 0.03, D / 2 - 0.04)));
  for (let s of [-1, 1]) {
    let cx = (s * Wc) / 4,
      dw = Wc / 2 - 0.012,
      y0 = 0.905,
      y1 = H - 0.025,
      dh = y1 - y0;
    g.add(J(dw - 0.03, dh - 0.03, 0.006, t.cabinetGlass, new V(cx, (y0 + y1) / 2, D / 2 + 0.004)));
    for (let [w, h, px, py] of [
      [dw, 0.022, cx, y0 + 0.011],
      [dw, 0.022, cx, y1 - 0.011],
      [0.022, dh, cx - dw / 2 + 0.011, (y0 + y1) / 2],
      [0.022, dh, cx + dw / 2 - 0.011, (y0 + y1) / 2],
    ])
      g.add(J(w, h, 0.02, t.blackFrame, new V(px, py, D / 2 + 0.006)));
  }
  return (g.add(Fshadow(Wc, D, 0.4)), Z(g, name, desc, `furniture`), g);
}
// Ram-horn dining chair (sitter faces local +z)
function FramChair(t) {
  let g = new W();
  for (let [x, z, rz, rx] of [
    [-0.2, 0.17, 0.06, -0.06],
    [0.2, 0.17, -0.06, -0.06],
    [-0.19, -0.16, 0.06, 0.08],
    [0.19, -0.16, -0.06, 0.08],
  ]) {
    let lg = Ru(0.017, 0.013, 0.44, t.walnut, new V(x, 0.22, z), 10);
    ((lg.rotation.z = rz), (lg.rotation.x = rx), g.add(lg));
  }
  g.add(Y(0.44, 0.035, 0.4, 0.012, t.walnut, new V(0, 0.425, 0)));
  g.add(Y(0.46, 0.07, 0.43, 0.035, t.cushion, new V(0, 0.475, 0.01)));
  let arm = Fbend(0.84, 0.03, 0.035, 0.27, t.walnut);
  (arm.position.set(0, 0.63, 0.02), g.add(arm));
  for (let s of [-1, 1]) g.add(Ru(0.014, 0.014, 0.2, t.walnut, new V(s * 0.265, 0.53, 0.02), 8));
  let back = Fbend(0.78, 0.17, 0.06, 0.26, t.cushion);
  return (back.position.set(0, 0.74, 0.02), g.add(back), g.add(Fshadow(0.52, 0.5, 0.3)), g);
}
// 1.8 × 0.8 m swan dining table + 6 ram-horn chairs (long axis local x)
function FswanDining(t) {
  let g = new W();
  g.add(Y(1.8, 0.04, 0.8, 0.02, t.ashTop, new V(0, 0.75, 0)));
  g.add(J(1.72, 0.02, 0.72, t.ashTop, new V(0, 0.72, 0)));
  for (let s of [-1, 1]) {
    let leg = Ru(0.2, 0.34, 0.7, t.walnut, new V(s * 0.36, 0.36, 0), 4);
    ((leg.rotation.y = Math.PI / 4), leg.scale.set(1, 1, 1));
    let holder = new W();
    (holder.add(leg), holder.scale.set(1, 1, 0.28), holder.position.set(0, 0, 0), (holder.rotation.z = s * -0.09), g.add(holder));
  }
  g.add(J(0.9, 0.06, 0.09, t.walnut, new V(0, 0.68, 0)));
  for (let x of [-0.6, 0, 0.6])
    for (let s of [-1, 1]) {
      let c = FramChair(t);
      (c.position.set(x, 0, s * 0.6), (c.rotation.y = s > 0 ? Math.PI : 0), g.add(c));
    }
  let bowl = Flathe([[0, 0], [0.08, 0.005], [0.13, 0.04], [0.14, 0.07], [0.13, 0.072], [0.06, 0.02], [0, 0.02]], t.whiteCeramic, 32);
  (bowl.position.set(0.1, 0.77, 0), g.add(bowl));
  let vase = Flathe([[0, 0], [0.05, 0], [0.065, 0.1], [0.035, 0.2], [0.03, 0.24], [0, 0.24]], t.whiteCeramic, 24);
  (vase.position.set(-0.35, 0.77, 0.05), g.add(vase));
  for (let k = 0; k < 4; k += 1) {
    let st = Ru(0.003, 0.003, 0.4, t.darkWood, new V(-0.35 + (k - 1.5) * 0.03, 1.17, 0.05), 5);
    ((st.rotation.z = (k - 1.5) * 0.18), g.add(st));
  }
  return (
    g.add(Fshadow(1.9, 0.9, 0.4)),
    Z(g, `Swan dining table + 6 ram-horn chairs`, `1.8 × 0.8 m swan-base dining table with six walnut ram-horn chairs in cream upholstery · S$683.`, `furniture`),
    g
  );
}
// Folded curtain set (local x = along window, hangs in local z = 0)
function Fcurtains(t, span) {
  let g = new W(),
    H = 2.42,
    pw = 0.48;
  g.add(J(span + 0.5, 0.025, 0.05, t.windowFrame, new V(0, H + 0.03, 0)));
  let sheer = new aa(span + 0.2, H - 0.03, 60, 1),
    sp = sheer.attributes.position;
  for (let k = 0; k < sp.count; k += 1) sp.setZ(k, Math.sin(sp.getX(k) * 26) * 0.012 + 0.03);
  sheer.computeVertexNormals();
  let sm = new vi(sheer, t.curtainSheer);
  (sm.position.set(0, H / 2 + 0.01, -0.03), (sm.castShadow = !1), g.add(sm));
  for (let s of [-1, 1]) {
    let geo = new aa(pw, H - 0.02, 30, 1),
      p = geo.attributes.position;
    for (let k = 0; k < p.count; k += 1) p.setZ(k, Math.sin((p.getX(k) / pw) * Math.PI * 7) * 0.035);
    geo.computeVertexNormals();
    let m = new vi(geo, t.curtainLinen);
    (m.position.set(s * (span / 2 + 0.25 - pw / 2 + 0.02), H / 2 + 0.01, 0.05), Lu(m), (m.castShadow = !1), g.add(m));
  }
  return g;
}
function Fpendant(t) {
  let g = new W();
  g.add(Ru(0.004, 0.004, 0.7, t.darkMetal, new V(0, 2.25, 0), 6));
  let pts = [];
  for (let k = 0; k <= 12; k += 1) {
    let a = k / 12;
    pts.push([0.05 + 0.27 * Math.sin((a * Math.PI) / 2) + (k % 2) * 0.012, 1.9 - a * 0.2]);
  }
  pts.reverse();
  let shade = Flathe(pts, t.lampShade, 48);
  ((shade.material = t.lampShade), (shade.castShadow = !1), g.add(shade));
  return g;
}
function Fdownlight(t, x, z) {
  let m = Ru(0.045, 0.045, 0.01, t.led, new V(x, Mu - 0.006, z), 20);
  return ((m.castShadow = !1), (m.receiveShadow = !1), m);
}

function qd(e, t) {
  let P = Math.PI,
    n = { balanced: new W(), movable: [] },
    k = n.balanced;
  ((k.name = `YanShiuanFinalSelection`), e.add(k));
  // placed = first proposal, saving = space-saving arrangement ([x, z, rotationY])
  function M(obj, placed, saving) {
    return ((obj.userData.layouts = { placed, saving: saving ?? placed }), Q(k, obj, placed[0], placed[1], placed[2]), n.movable.push(obj), obj);
  }
  // Parents' bedroom (interior x 0.09–3.085, z 0.99–5.51)
  (M(Fbed(t, 1.8, `1.8 m gas-lift storage bed`, `1.8 × 2.0 m bed with gas-strut lift storage, cream tech-fabric upholstery (mattress not included) · S$530.`), [1.28, 3.3, P / 2]),
    M(Fbedside(t), [0.29, 2.19, P / 2]),
    M(Fbedside(t), [0.29, 4.41, P / 2]),
    M(FchestDesk(t), [1.35, 5.3, P]),
    M(FvanityTall(t), [2.875, 1.5, -P / 2], [2.875, 1.25, -P / 2]),
    M(ld(1.3, 2.3, t.rugCream, `Bedroom rug`), [2.1, 3.3, 0]),
    Q(k, Fcurtains(t, 1.7), 1.57, 1.07, 0));
  // 大姐 · Bedroom 3 (interior x 3.215–6.135, z 0.09–3.785; door at the south-east)
  (M(Fbed(t, 1.5, `1.5 m gas-lift storage bed · 大姐`, `1.5 × 2.0 m bed with gas-strut lift storage, cream upholstery (mattress not included) · S$525.`, t.sageFabric), [4.395, 2.5, P / 2], [4.045, 2.62, P]),
    M(Fcupboard(t, t.naturalWood, `Glass-door cupboard · 原木色 · 大姐`, `80 × 32 × 200 cm two-door cupboard, glass upper doors with black frames, natural wood · S$162.`, 1), [3.375, 0.6, P / 2], [3.375, 0.65, P / 2]),
    M(FvanityFlip(t), [4.65, 0.36, 0], [4.45, 0.36, 0]),
    M(FkidsDesk(t, t.deskGrey, `Study desk + hutch · 灰白色 · 大姐`, `120 × 60 × 185 cm study desk with glass-door hutch, pegboard and matching chair in grey-white · S$156.`), [5.835, 0.95, -P / 2]),
    M(ld(1.3, 1.9, t.rugSage, `Bedroom rug`), [5.0, 2.5, 0], [5.4, 2.65, 0]),
    Q(k, Fart(t, 0.62, 0.46), 3.225, 2.5, P / 2, 1.45),
    Q(k, Fcurtains(t, 1.78), 4.61, 0.15, 0));
  // 二姐 · Bedroom 2 (interior x 6.265–9.085, z 0.09–3.785; door at the south-west)
  (M(Fbed(t, 1.5, `1.5 m gas-lift storage bed · 二姐`, `1.5 × 2.0 m bed with gas-strut lift storage, cream upholstery (mattress not included) · S$525.`, t.throwOat), [7.905, 2.5, -P / 2], [8.255, 2.62, P]),
    M(Fcupboard(t, t.walnut, `Glass-door cupboard · 胡桃色 · 二姐`, `80 × 32 × 200 cm two-door cupboard, glass upper doors with black frames, walnut · S$162.`, 2), [8.925, 0.6, -P / 2], [8.925, 0.65, -P / 2]),
    M(FkidsDesk(t, t.deskBlue, `Study desk + hutch · 蓝白色 · 二姐`, `120 × 60 × 185 cm study desk with glass-door hutch, pegboard and matching chair in blue-white · S$156.`), [6.565, 0.95, P / 2]),
    M(ld(1.3, 1.9, t.rugCream, `Bedroom rug`), [6.95, 2.5, 0], [6.95, 2.65, 0]),
    Q(k, Fcurtains(t, 1.8), 7.68, 0.15, 0));
  let art2 = Fart(t, 0.62, 0.46, 1);
  (art2.position.set(9.075, 1.45, 2.5), (art2.rotation.y = -P / 2), k.add(art2));
  // 三妹 · converted study (interior x 9.2–11.45, z 0.09–3.65)
  (M(Fbed(t, 1.5, `1.5 m gas-lift storage bed · 三妹`, `1.5 × 2.0 m bed with gas-strut lift storage, cream upholstery (mattress not included) · S$525.`, t.throwBlush), [10.395, 1.04, P / 2]),
    M(FkidsDesk(t, t.deskPink, `Study desk + hutch · 粉白色 · 三妹`, `120 × 60 × 185 cm study desk with glass-door hutch, pegboard and matching chair in pink-white · S$156.`), [9.515, 2.6, P / 2], [9.515, 2.45, P / 2]),
    M(Fcupboard(t, t.whiteBoard, `Glass-door cupboard · 白色 · 三妹`, `80 × 32 × 200 cm two-door cupboard, glass upper doors with black frames, white · S$162.`, 3), [11.29, 2.35, -P / 2], [9.62, 3.49, P]),
    M(ld(1.1, 1.3, t.rugCream, `Bedroom rug`), [10.55, 2.45, 0], [10.6, 2.45, 0]),
    Q(k, Fcurtains(t, 1.5), 10.3, 0.15, 0));
  let art3 = Fart(t, 0.5, 0.62);
  (art3.position.set(9.225, 1.5, 1.04), (art3.rotation.y = P / 2), k.add(art3));
  // Living & dining (living x 11.5–14.875; dining x 9.15–12.48, z 3.7–6.85)
  (Q(e, ld(2.2, 1.7, t.rugCream), 12.85, 2.8, 0, 0.004),
    Q(e, _d(t), 12.05, 2.8, P / 2),
    Q(e, vd(t), 12.95, 2.8, P / 2),
    Q(e, yd(t), 14.25, 2.8, P / 2),
    Q(e, gd(t, 1.1, `Living room plant`), 14.4, 0.5, 0),
    Q(e, ld(2.5, 1.85, t.rugCream, `Dining rug`), 11.0, 5.4, 0, 0.004),
    Q(e, FswanDining(t), 11.0, 5.4, 0),
    Q(e, Fpendant(t), 11.0, 5.4, 0),
    Q(e, Fcurtains(t, 2.55), 12.925, 0.15, 0),
    Q(e, Fcurtains(t, 3.1), 14.725, 2.9, -P / 2),
    Q(e, zd(t), 13.3, 6.88, P),
    Q(e, gd(t, 0.8, `Entrance plant`), 12.75, 6.75, 0));
  // Bathrooms (Bath 1 x 2.89–5.065, Bath 2 x 5.195–7.235, z 4.985–6.785)
  (Q(e, Cd(t, 0.8, 0.83), 3.3, 5.43, 0),
    Q(e, xd(t), 4.35, 6.42, P),
    Q(e, Sd(t, 0.62), 3.45, 6.55, P),
    Q(e, Cd(t, 0.8, 0.83), 5.61, 5.43, 0),
    Q(e, xd(t), 5.75, 6.42, P),
    Q(e, Sd(t, 0.62), 6.65, 6.55, P));
  // Shelter, service yard, air-con ledge
  (Q(e, Od(t), 8.22, 5.25, 0),
    Q(e, gd(t, 0.42, `Storage plant`), 8.6, 6.9, 0),
    Q(e, wd(t), 6.6, 8.92, P),
    Q(e, Dd(t), 3.6, 7.3, 0),
    Q(e, Dd(t), 4.8, 7.3, 0));
  let o = Ed({ width: 1.05, materialCollection: t, includeSink: !0 });
  (Q(e, o, 6.25, 7.55, P / 2), Z(o, `Service-yard counter`, `Compact utility sink and worktop.`, `fixture`));
  // Kitchen (x 7.3–12.48, z 6.85–9.35)
  let i = Ed({ width: 3.0, materialCollection: t, includeStove: !0 });
  Q(e, i, 10.9, 7.25, 0);
  let a = Ed({ width: 4.0, materialCollection: t, includeSink: !0 });
  (Q(e, a, 10.25, 8.97, P),
    Z(i, `Kitchen cooking run`, `Peninsula with hob and oven, open to the dining area.`, `furniture`),
    Z(a, `Kitchen sink run`, `Long counter with integrated sink and storage along the back wall.`, `furniture`),
    Q(e, Hd(3.6, t, `Kitchen upper cabinets`), 10.25, 9.14, P),
    Q(e, Td(t), 7.8, 8.9, P),
    Q(e, gd(t, 0.42, `Kitchen counter plant`), 12.15, 7.25, 0, 0.88));
  return n;
}
function Jd(e) {
  for (let t of [
    { text: `Parents`, x: 1.55, z: 3.3 },
    { text: `大姐 · Eldest`, x: 4.65, z: 1.9 },
    { text: `二姐 · Second`, x: 7.65, z: 1.9 },
    { text: `三妹 · Youngest`, x: 10.3, z: 2.0 },
    { text: `Living`, x: 13.0, z: 2.0 },
    { text: `Dining`, x: 11.0, z: 5.4 },
    { text: `Bath / WC 1`, x: 4.0, z: 5.9 },
    { text: `Bath / WC 2`, x: 6.2, z: 5.9 },
    { text: `Shelter`, x: 8.22, z: 6.2 },
    { text: `Service yard`, x: 6.6, z: 8.1 },
    { text: `Kitchen`, x: 10.0, z: 8.1 },
  ]) {
    let n = kd(t.text);
    (n.position.set(t.x, 2.0, t.z), e.add(n));
  }
}
function Yd(e = {}) {
  let t = e.detailedTextures !== !1,
    n = new W();
  n.name = `ApartmentRoot`;
  let r = new W();
  r.name = `FloorGroup`;
  let i = new W();
  i.name = `CutawayArchitecture`;
  let a = new W();
  a.name = `FurnitureGroup`;
  let o = new W();
  ((o.name = `RoomLabels`), (o.visible = !1), n.add(r, i, a, o));
  let s = Xu(t);
  ($u(s, `flooring`, `light-oak`),
    $u(s, `walls`, `warm-white`),
    $u(s, `cabinetry`, `pale-oak`),
    $u(s, `fabrics`, `sage`));
  ((s.floorWood.userData.worldTile = 1.6), (s.floorGreyTile.userData.worldTile = 3.6), (s.floorWarmTile.userData.worldTile = 3.6));
  for (let m of [s.floorWood, s.floorGreyTile, s.floorWarmTile]) for (let k of [`map`, `bumpMap`, `roughnessMap`]) m[k]?.repeat.set(1, 1);
  let clip = new Pi(new V(0, -1, 0), Mu * 0.6);
  for (let m of [s.wall, s.wallAccent, s.glass, s.windowFrame, s.doorWood, s.skirting, s.sill, s.curtainLinen, s.curtainSheer, s.paleWood, s.doorGroove, s.mirror])
    ((m.clippingPlanes = [clip]), (m.clipShadows = !0));
  let c = [],
    l = [
      { name: `Parents' bedroom`, description: `1.8 m lift bed, walnut bedsides, six-drawer chest + desk, and walnut dressing table.`, xStart: 0, xEnd: 3.15, zStart: 0.9, zEnd: 5.6, material: s.floorWood },
      { name: `Bedroom 3 · 大姐 (eldest)`, description: `1.5 m lift bed, grey-white study desk with hutch, natural-wood glass cupboard, and flip-top vanity.`, xStart: 3.15, xEnd: 6.2, zStart: 0, zEnd: 3.85, material: s.floorWood },
      { name: `Bedroom 2 · 二姐 (second)`, description: `1.5 m lift bed, blue-white study desk with hutch, and walnut glass cupboard.`, xStart: 6.2, xEnd: 9.15, zStart: 0, zEnd: 3.85, material: s.floorWood },
      { name: `Bedroom corridor`, description: `1.07 m corridor linking the bedrooms and bathrooms (per the 2D plan).`, xStart: 3.15, xEnd: 9.15, zStart: 3.85, zEnd: 4.92, material: s.floorWood },
      { name: `三妹 (youngest) · converted study`, description: `The suggested study enclosed with a light partition: 1.5 m lift bed, pink-white study desk, and white glass cupboard.`, xStart: 9.15, xEnd: 11.5, zStart: 0, zEnd: 3.7, material: s.floorWood },
      { name: `Living room`, description: `Sofa, oval coffee table, and media wall facing the full-width windows.`, xStart: 11.5, xEnd: 14.875, zStart: 0, zEnd: 6.85, material: s.floorWood },
      { name: `Dining`, description: `1.8 m swan dining table with six ram-horn chairs, open to the kitchen.`, xStart: 9.15, xEnd: 11.5, zStart: 3.7, zEnd: 6.85, material: s.floorWood },
      { name: `Entrance`, description: `Main entrance with shoe storage.`, xStart: 12.48, xEnd: 14.875, zStart: 6.85, zEnd: 7.18, material: s.floorWarmTile },
      { name: `Bath / WC 1`, description: `Shower, vanity, and toilet.`, xStart: 2.82, xEnd: 5.13, zStart: 4.92, zEnd: 6.85, material: s.floorGreyTile },
      { name: `Bath / WC 2`, description: `Shower, vanity, and toilet.`, xStart: 5.13, xEnd: 7.3, zStart: 4.92, zEnd: 6.85, material: s.floorGreyTile },
      { name: `Household shelter`, description: `Reinforced storage room.`, xStart: 7.3, xEnd: 9.15, zStart: 4.92, zEnd: 7.55, material: s.floorWood },
      { name: `Air-con ledge`, description: `External ledge for the condensers.`, xStart: 2.82, xEnd: 5.87, zStart: 6.85, zEnd: 7.75, material: s.floorGreyTile },
      { name: `Service yard`, description: `Laundry and utility zone.`, xStart: 5.87, xEnd: 7.3, zStart: 6.85, zEnd: 9.35, material: s.floorGreyTile },
      { name: `Kitchen`, description: `Peninsula with hob and oven, sink run along the back wall.`, xStart: 7.3, xEnd: 12.48, zStart: 7.55, zEnd: 9.35, material: s.floorWarmTile },
      { name: `Kitchen`, description: `Peninsula with hob and oven, sink run along the back wall.`, xStart: 9.15, xEnd: 12.48, zStart: 6.85, zEnd: 7.55, material: s.floorWarmTile },
    ];
  for (let e of l) r.add(nd(e));
  Ad(i, s, c);
  let u = qd(a, s),
    ceil = new W();
  ceil.name = `Ceiling`;
  let cg = new vi(new aa(15.2, 9.6), s.ceiling);
  (cg.rotation.x = Math.PI / 2), cg.position.set(7.44, Mu + 0.02, 4.7), (cg.castShadow = !0), ceil.add(cg);
  for (let [x, z] of [
    [1.0, 2.2], [2.2, 2.2], [1.0, 4.4], [2.2, 4.4],
    [4.0, 1.4], [5.4, 1.4], [4.0, 2.9], [5.4, 2.9],
    [7.0, 1.4], [8.4, 1.4], [7.0, 2.9], [8.4, 2.9],
    [10.3, 1.2], [10.3, 2.7],
    [12.4, 1.4], [13.8, 1.4], [12.4, 3.6], [13.8, 3.6], [13.6, 5.6],
    [10.4, 5.4], [11.6, 5.4],
    [8.6, 8.15], [10.0, 8.15], [11.4, 8.15],
    [4.5, 4.4], [6.5, 4.4], [8.4, 4.4],
    [4.0, 5.9], [6.2, 5.9], [6.6, 8.1], [8.22, 6.2],
  ])
    ceil.add(Fdownlight(s, x, z));
  ((ceil.visible = !1), n.add(ceil));
  let roomLights = new W();
  if (t)
    for (let [x, z, k] of [
      [1.6, 3.3, 1.7],
      [4.7, 1.9, 1.5],
      [7.7, 1.9, 1.5],
      [10.3, 1.9, 1.3],
      [13.0, 2.6, 2.4],
      [11.0, 5.4, 1.8],
      [10.0, 8.15, 1.8],
      [6.2, 4.4, 1.0],
      [4.0, 5.9, 0.8],
      [6.2, 5.9, 0.8],
    ]) {
      let L = new to(16771792, k * 2.6, 8, 2);
      (L.position.set(x, Mu - 0.25, z), roomLights.add(L));
    }
  n.add(roomLights);
  let caps = [];
  i.traverse((e) => e.userData.isWallCap && caps.push(e));
  function setCut(v) {
    let full = v > 1.05,
      h = full ? 100 : v * Mu;
    clip.constant = h;
    for (let c of caps) ((c.visible = !full), (c.position.y = h + 0.0275));
    ((ceil.visible = full), (roomLights.visible = full));
  }
  // ---- Per-room wall paint: each wall face takes the colour of the room it faces ----
  let paintRooms = [
      { key: `parents`, rect: [0, 0.9, 3.15, 5.6], color: null },
      { key: `eldest`, rect: [3.15, 0, 6.2, 3.85], color: `#b4c0c8` },
      { key: `second`, rect: [6.2, 0, 9.15, 3.85], color: `#e9dfcf` },
      { key: `youngest`, rect: [9.15, 0, 11.5, 3.7], color: `#cde0eb` },
      { key: `living`, rect: [9.15, 0, 14.875, 7.18], color: null },
    ],
    paintU = {
      uRoomMin: { value: paintRooms.map((r) => new V(r.rect[0], r.rect[1], r.color ? 1 : 0)) },
      uRoomMax: { value: paintRooms.map((r) => new V(r.rect[2], r.rect[3], 0)) },
      uRoomCol: { value: paintRooms.map((r) => new G(r.color ?? `#ffffff`)) },
    };
  s.wall.onBeforeCompile = (sh) => {
    (Object.assign(sh.uniforms, paintU),
      (sh.vertexShader = sh.vertexShader
        .replace(`#include <common>`, `#include <common>\nvarying vec3 vRoomP;`)
        .replace(
          `#include <project_vertex>`,
          `#include <project_vertex>\n{ vec4 rw = modelMatrix * vec4( transformed, 1.0 ); vec3 rn = normalize( mat3( modelMatrix ) * objectNormal ); vRoomP = rw.xyz + rn * 0.08; }`,
        )),
      (sh.fragmentShader = sh.fragmentShader
        .replace(`#include <common>`, `#include <common>\nvarying vec3 vRoomP;\nuniform vec3 uRoomMin[5];\nuniform vec3 uRoomMax[5];\nuniform vec3 uRoomCol[5];`)
        .replace(
          `vec4 diffuseColor = vec4( diffuse, opacity );`,
          `vec4 diffuseColor = vec4( diffuse, opacity );\nfor ( int ri = 0; ri < 5; ri ++ ) { if ( vRoomP.x > uRoomMin[ ri ].x && vRoomP.x < uRoomMax[ ri ].x && vRoomP.z > uRoomMin[ ri ].y && vRoomP.z < uRoomMax[ ri ].y ) { if ( uRoomMin[ ri ].z > 0.5 ) diffuseColor.rgb = uRoomCol[ ri ]; break; } }`,
        )));
  };
  s.wall.needsUpdate = !0;
  function setRoomWallColor(key, color) {
    let i2 = paintRooms.findIndex((r) => r.key === key);
    if (i2 < 0) return !1;
    return (
      (paintRooms[i2].color = color),
      (paintU.uRoomMin.value[i2].z = color ? 1 : 0),
      color && paintU.uRoomCol.value[i2].set(color),
      !0
    );
  }
  // ---- Layout switching (first proposal vs space-saving) ----
  let layoutMode = `placed`,
    layoutAnim = null;
  function setLayout(mode, instant = !1) {
    layoutMode = mode;
    let items = u.movable.map((obj) => {
      let tgt = obj.userData.layouts[mode] ?? obj.userData.layouts.placed,
        dr = tgt[2] - obj.rotation.y;
      return (
        (dr = Math.atan2(Math.sin(dr), Math.cos(dr))),
        { obj, fx: obj.position.x, fz: obj.position.z, fr: obj.rotation.y, tx: tgt[0], tz: tgt[1], tr: obj.rotation.y + dr }
      );
    });
    layoutAnim = { t: instant ? 1 : 0, items };
    updateLayout(0);
  }
  function updateLayout(dt) {
    if (!layoutAnim) return !1;
    layoutAnim.t = Math.min(1, layoutAnim.t + dt / 0.9);
    let q = layoutAnim.t < 0.5 ? 4 * layoutAnim.t ** 3 : 1 - (-2 * layoutAnim.t + 2) ** 3 / 2;
    for (let it of layoutAnim.items)
      ((it.obj.position.x = it.fx + (it.tx - it.fx) * q),
        (it.obj.position.z = it.fz + (it.tz - it.fz) * q),
        (it.obj.rotation.y = it.fr + (it.tr - it.fr) * q));
    return layoutAnim.t >= 1 ? ((layoutAnim = null), spaceGroup.visible && buildSpaceOverlay(), !0) : !1;
  }
  // ---- Open-floor analysis ----
  let spaceGroup = new W();
  ((spaceGroup.name = `SpacePlanOverlay`), (spaceGroup.visible = !1), n.add(spaceGroup));
  let spaceRooms = [
    { key: `parents`, name: `Parents`, rect: [0.09, 0.99, 3.085, 5.51], blocked: [[2.73, 4.83, 3.1, 5.6, 3]] },
    { key: `eldest`, name: `大姐`, rect: [3.215, 0.09, 6.135, 3.785], blocked: [] },
    { key: `second`, name: `二姐`, rect: [6.265, 0.09, 9.085, 3.785], blocked: [] },
    { key: `youngest`, name: `三妹`, rect: [9.2, 0.09, 11.45, 3.65], blocked: [[10.55, 2.88, 11.35, 3.65]] },
  ];
  function analyseSpace() {
    (n.updateMatrixWorld(!0));
    let boxes = [];
    k: for (let obj of a.children[0]?.children ?? []) {
      if (!obj.visible || obj.userData.interactionType !== `furniture`) continue k;
      let bx = new Zn();
      (obj.traverse((m) => {
        m.isMesh && m.material?.map !== Fx.shadowTexture && bx.expandByObject(m);
      }),
        bx.isEmpty() || boxes.push(bx));
    }
    let C = 0.05;
    return spaceRooms.map((rm) => {
      let [x0, z0, x1, z1] = rm.rect,
        cols = Math.round((x1 - x0) / C),
        rows = Math.round((z1 - z0) / C),
        g = new Uint8Array(cols * rows),
        mark = (bx0, bz0, bx1, bz1, v) => {
          let c0 = Math.max(0, Math.floor((bx0 - x0) / C)),
            c1 = Math.min(cols, Math.ceil((bx1 - x0) / C)),
            r0 = Math.max(0, Math.floor((bz0 - z0) / C)),
            r1 = Math.min(rows, Math.ceil((bz1 - z0) / C));
          for (let r = r0; r < r1; r += 1) for (let c = c0; c < c1; c += 1) g[r * cols + c] = Math.max(g[r * cols + c], v);
        };
      for (let bx of boxes) bx.max.y > 0.05 && mark(bx.min.x, bx.min.z, bx.max.x, bx.max.z, 1);
      for (let bl of rm.blocked) mark(bl[0], bl[1], bl[2], bl[3], bl[4] ?? 2);
      let free = 0;
      for (let v of g) v === 0 && (free += 1);
      let hts = new Int32Array(cols),
        best = { area: 0 };
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) hts[c] = g[r * cols + c] === 0 ? hts[c] + 1 : 0;
        let st = [];
        for (let c = 0; c <= cols; c += 1) {
          let hgt = c < cols ? hts[c] : 0,
            start = c;
          for (; st.length && st[st.length - 1][1] >= hgt; ) {
            let [sc, sh2] = st.pop(),
              ar = sh2 * (c - sc);
            (ar > best.area && (best = { area: ar, c0: sc, c1: c, r0: r - sh2 + 1, r1: r + 1 }), (start = sc));
          }
          st.push([start, hgt]);
        }
      }
      let walls3 = 0;
      for (let v of g) v === 3 && (walls3 += 1);
      let area = (x1 - x0) * (z1 - z0) - walls3 * C * C,
        rect = best.area
          ? { x0: x0 + best.c0 * C, x1: x0 + best.c1 * C, z0: z0 + best.r0 * C, z1: z0 + best.r1 * C }
          : null;
      return { ...rm, area, freeArea: free * C * C, freePct: (free * C * C) / area, zone: rect, grid: g, cols, rows };
    });
  }
  function buildSpaceOverlay() {
    for (; spaceGroup.children.length; ) {
      let ch = spaceGroup.children.pop();
      (ch.material?.map?.dispose(), ch.material?.dispose(), ch.geometry?.dispose());
    }
    let res = analyseSpace();
    for (let rm of res) {
      let [x0, z0, x1, z1] = rm.rect,
        cv = document.createElement(`canvas`),
        S = 8;
      ((cv.width = rm.cols * S), (cv.height = rm.rows * S));
      let cx = cv.getContext(`2d`);
      for (let r = 0; r < rm.rows; r += 1)
        for (let c = 0; c < rm.cols; c += 1) {
          let v = rm.grid[r * rm.cols + c];
          ((cx.fillStyle = v === 0 ? `rgba(118,178,128,0.42)` : v === 2 ? `rgba(214,150,92,0.38)` : `rgba(0,0,0,0)`),
            cx.fillRect(c * S, r * S, S, S));
        }
      if (rm.zone) {
        let zx = ((rm.zone.x0 - x0) / 0.05) * S,
          zz = ((rm.zone.z0 - z0) / 0.05) * S,
          zw = ((rm.zone.x1 - rm.zone.x0) / 0.05) * S,
          zh = ((rm.zone.z1 - rm.zone.z0) / 0.05) * S;
        ((cx.fillStyle = `rgba(62,140,88,0.5)`), cx.fillRect(zx, zz, zw, zh));
        ((cx.strokeStyle = `rgba(32,96,56,0.95)`), (cx.lineWidth = 6), cx.setLineDash([18, 10]), cx.strokeRect(zx + 3, zz + 3, zw - 6, zh - 6));
      }
      let tx = new $i(cv);
      tx.colorSpace = Ve;
      let pm = new oi({ map: tx, transparent: !0, depthWrite: !1 });
      pm.userData.includeInInspector = !1;
      let pl = new vi(new aa(x1 - x0, z1 - z0), pm);
      ((pl.rotation.x = -Math.PI / 2), pl.position.set((x0 + x1) / 2, 0.035, (z0 + z1) / 2), (pl.renderOrder = 2), spaceGroup.add(pl));
      if (rm.zone) {
        let w = rm.zone.x1 - rm.zone.x0,
          dd = rm.zone.z1 - rm.zone.z0,
          lb = kd(`${rm.name} · ${w.toFixed(1)} × ${dd.toFixed(1)} m open`);
        ((lb.material.depthTest = !1), (lb.renderOrder = 5), lb.scale.multiplyScalar(0.82));
        (lb.position.set((rm.zone.x0 + rm.zone.x1) / 2, 0.9, (rm.zone.z0 + rm.zone.z1) / 2), spaceGroup.add(lb));
      }
    }
    return res;
  }
  function setSpaceOverlay(on) {
    return ((spaceGroup.visible = on), on ? buildSpaceOverlay() : analyseSpace());
  }
  (Jd(o),
    n.traverse((e) => {
      e.isMesh &&
        !e.userData.interactiveRoot &&
        e.parent?.userData?.displayName &&
        (e.userData.interactiveRoot = e.parent);
    }));
  let d = [];
  n.traverse((e) => {
    e.isMesh && e.userData.interactiveRoot && d.push(e);
  });
  let f = [];
  n.traverse((e) => {
    if (e.userData.collidable) {
      if (e.userData.interactionType) {
        f.push(e);
        return;
      }
      e.isMesh && !e.userData.interactiveRoot && f.push(e);
    }
  });
  let p = l.map((e) => ({ xStart: e.xStart, xEnd: e.xEnd, zStart: e.zStart, zEnd: e.zEnd }));
  function m(e) {
    return !1;
    if (!u[e]) return !1;
    for (let [t, n] of Object.entries(u)) n.visible = t === e;
    return !0;
  }
  function h(e, t) {
    return $u(s, e, t);
  }
  function g(e) {
    return t ? (ed(s, e), !0) : !1;
  }
  function _(e) {
    return e ? td(e) : [];
  }
  return {
    apartmentRoot: n,
    cutawayGroup: i,
    furnitureGroup: a,
    labelGroup: o,
    doorPivots: c,
    interactiveMeshes: d,
    collisionObjects: f,
    walkableAreas: p,
    bedroomLayoutGroups: u,
    materialCollection: s,
    setBedroomLayout: m,
    setMaterialOption: h,
    setTextureDetail: g,
    getObjectMaterialSpecifications: _,
    textureDetailAvailable: t,
    defaultWallHeight: Mu,
    setCut: setCut,
    setRoomWallColor,
    setLayout,
    updateLayout,
    setSpaceOverlay,
    analyseSpace,
    getLayout: () => layoutMode,
  };
}
var Xd = document.querySelector(`#apartment-canvas`),
  Zd = document.querySelector(`#loading-overlay`),
  Qd = document.querySelector(`#loading-status`),
  $d = document.querySelector(`#loading-detail`),
  ef = document.querySelector(`#selection-panel`),
  tf = document.querySelector(`#selection-title`),
  nf = document.querySelector(`#selection-description`),
  rf = document.querySelector(`#selection-material-list`),
  af = document.querySelector(`#selection-material-count`),
  of = document.querySelector(`#labels-toggle`),
  sf = document.querySelector(`#rotation-toggle`),
  cf = document.querySelector(`#shadows-toggle`),
  lf = document.querySelector(`#texture-detail-toggle`),
  uf = document.querySelector(`#wall-height-slider`),
  df = document.querySelector(`#doors-button`),
  ff = document.querySelector(`#reset-button`),
  pf = document.querySelector(`#reference-button`),
  mf = document.querySelector(`#help-button`),
  hf = document.querySelector(`#reference-dialog`),
  gf = document.querySelector(`#help-dialog`),
  _f = document.querySelector(`#dollhouse-mode-button`),
  vf = document.querySelector(`#walkthrough-mode-button`),
  yf = document.querySelector(`#camera-panel`),
  bf = document.querySelector(`#walkthrough-location-panel`),
  xf = document.querySelector(`#walkthrough-pause-overlay`),
  Sf = document.querySelector(`#walkthrough-start-button`),
  Cf = document.querySelector(`#walkthrough-exit-button`),
  wf = document.querySelector(`#walkthrough-exit-mini-button`),
  Tf = document.querySelector(`#walkthrough-hud`),
  Ef = document.querySelector(`#walkthrough-focus-label`),
  Df = document.querySelector(`#interaction-hint`),
  Of = document.querySelector(`#interaction-hint-text`),
  kf = document.querySelector(`#bedroom-layout-description`),
  Af = [...document.querySelectorAll(`[data-camera-view]`)],
  jf = [...document.querySelectorAll(`[data-walkthrough-location]`)],
  Mf = [...document.querySelectorAll(`[data-material-category]`)],
  Nf = [...document.querySelectorAll(`[data-bedroom-layout]`)],
  Pf = document.querySelector(`#touch-joystick`),
  Ff = document.querySelector(`#touch-joystick-knob`),
  If = new URLSearchParams(window.location.search).get(`safe`) === `1`,
  Lf = window.matchMedia(`(pointer: coarse)`).matches,
  Rf = If ? 1 : Lf ? 1.25 : 1.5,
  zf = !If && !Lf;
(document.body.classList.toggle(`compatibility-mode`, If),
  (Qd.textContent = If ? `Building the compatibility apartment…` : `Building the apartment with detailed materials…`),
  ($d.textContent = If
    ? `Using simplified surfaces, lower pixel density, and no real-time shadows.`
    : `Generating shared wood, fabric, stone, tile, plaster, rug, and metal surface maps.`));
var Bf = new In();
((Bf.background = new G(0xf1ede6)), (Bf.fog = new Fn(0xf1ede6, 34, 64)));
var $ = new Kl({ canvas: Xd, antialias: !If, alpha: !1, powerPreference: If ? `default` : `high-performance` });
if (
  ($.setPixelRatio(Math.min(window.devicePixelRatio, Rf)),
  $.setSize(window.innerWidth, window.innerHeight, !1),
  ($.shadowMap.enabled = zf),
  ($.shadowMap.type = If ? 1 : 2),
  ($.outputColorSpace = Ve),
  ($.toneMapping = 7),
  ($.toneMappingExposure = If ? 1 : 0.86),
  ($.localClippingEnabled = !0),
  !If)
) {
  let e = new $o($);
  ((Bf.environment = e.fromScene(new Du(), 0.04).texture), (Bf.environmentIntensity = 0.38), e.dispose());
}
var Vf = 18,
  Hf = new no(-1, 1, 1, -1, 0.1, 100);
(Hf.position.set(18.4, 18.4, 18.7), (Hf.zoom = 1));
var Uf = new $a(68, 1, 0.05, 100);
Uf.rotation.order = `YXZ`;
var Wf = 1.58;
Uf.position.set(13.1, Wf, 4.4);
var Gf = Hf,
  Kf = `dollhouse`,
  qf = new ru(Hf, $.domElement);
(qf.target.set(7.45, 0.25, 4.25),
  (qf.enableDamping = !0),
  (qf.dampingFactor = 0.075),
  (qf.enablePan = !0),
  (qf.screenSpacePanning = !1),
  (qf.minZoom = 0.55),
  (qf.maxZoom = 3.4),
  (qf.maxPolarAngle = Math.PI * 0.49),
  (qf.minPolarAngle = 0.12),
  (qf.autoRotateSpeed = 0.42),
  (qf.zoomToCursor = !0),
  qf.update());
var Jf = new Cu(Uf, $.domElement),
  Yf = new Va(0xfff7ec, 0x8a7a66, 0.5);
Bf.add(Yf);
var Xf = new io(0xffeed6, If ? 2 : 2.5);
(Xf.position.set(5.5, 17, 11.5),
  (Xf.castShadow = zf),
  Xf.shadow.mapSize.set(If ? 1024 : 2048, If ? 1024 : 2048),
  (Xf.shadow.radius = 3),
  (Xf.shadow.bias = -45e-5),
  (Xf.shadow.normalBias = 0.018),
  (Xf.shadow.camera.left = -13),
  (Xf.shadow.camera.right = 13),
  (Xf.shadow.camera.top = 13),
  (Xf.shadow.camera.bottom = -13),
  (Xf.shadow.camera.near = 1),
  (Xf.shadow.camera.far = 40),
  Bf.add(Xf));
var Zf = new io(0xdfe8f2, 0.5);
(Zf.position.set(-10, 9, -4), Bf.add(Zf));
var Qf = new to(16769980, 4, 16, 2.2);
(Qf.position.set(11.2, 5.5, 4.7), Bf.add(Qf));
var $f = new ca({ color: 7630696, opacity: 0.14 }),
  ep = new vi(new aa(42, 34), $f);
((ep.rotation.x = -Math.PI / 2), ep.position.set(7.4, -0.085, 4.3), (ep.receiveShadow = !0), Bf.add(ep));
var tp = Yd({ detailedTextures: !If });
(Bf.add(tp.apartmentRoot), tp.setCut(0.6));
var np = new Co(),
  rp = new B(),
  ip = new B(),
  ap = new B(0, 0),
  op = new Zn(),
  sp = new V(),
  cp = new V(),
  lp = new V(),
  up = new un(0, 0, 0, `YXZ`),
  dp = performance.now(),
  fp = null,
  pp = null,
  mp = null,
  hp = !0,
  gp = 0.6,
  _p = null,
  vp = 0,
  yp = `balanced`,
  bp = new Set(),
  xp = { horizontal: 0, forward: 0 },
  Sp = null,
  Cp = null,
  wp = 0,
  Tp = 0,
  Ep = {
    overview: { position: new V(18.4, 18.4, 19.1), target: new V(7.35, 0.22, 4.68), zoom: 1.15 },
    top: { position: new V(7.45, 25, 4.75), target: new V(7.45, 0, 4.7), zoom: 1.12 },
    living: { position: new V(18.8, 10.5, 10.4), target: new V(12.05, 0.3, 3.35), zoom: 1.72 },
    children: { position: new V(6.2, 12, 10), target: new V(7.1, 0.3, 1.9), zoom: 1.6 },
    kitchen: { position: new V(13.4, 9.2, 16.2), target: new V(9.6, 0.3, 7.6), zoom: 1.7 },
  },
  Dp = {
    living: { position: new V(13.9, Wf, 4.75), target: new V(11.9, 1.05, 2.4) },
    parents: { position: new V(2.6, Wf, 4.75), target: new V(0.6, 0.85, 2.8) },
    eldest: { position: new V(5.7, Wf, 3.35), target: new V(3.6, 0.95, 1.2) },
    second: { position: new V(6.72, Wf, 3.35), target: new V(8.7, 0.95, 1.2) },
    youngest: { position: new V(10.45, Wf, 3.4), target: new V(9.7, 0.9, 0.7) },
    dining: { position: new V(9.5, Wf, 4.35), target: new V(11.2, 0.8, 5.7) },
    kitchen: { position: new V(12.1, Wf, 8.1), target: new V(8.6, 0.9, 8.2) },
  },
  Op = {
    balanced: `Two children share a bunk room, one child has a loft-study room, and all three use the open three-seat homework zone.`,
    study: `Homework moves closer to each child: a two-seat desk in the shared room, a loft desk in the single room, and a project library outside.`,
    leisure: `Bedrooms gain more play and reading space while the open study keeps a compact three-seat desk for daily homework.`,
  };
function kp() {
  let e = window.innerWidth / window.innerHeight;
  ((Hf.left = (-18 * e) / 2),
    (Hf.right = (Vf * e) / 2),
    (Hf.top = Vf / 2),
    (Hf.bottom = -18 / 2),
    Hf.updateProjectionMatrix(),
    (Uf.aspect = e),
    Uf.updateProjectionMatrix());
}
function Ap(e) {
  return e < 0.5 ? 4 * e * e * e : 1 - (-2 * e + 2) ** 3 / 2;
}
function jp(e, t = !1) {
  let n = Ep[e];
  if (!(!n || Kf !== `dollhouse`)) {
    for (let t of Af) t.classList.toggle(`is-active`, t.dataset.cameraView === e);
    if (t) {
      (Hf.position.copy(n.position),
        qf.target.copy(n.target),
        (Hf.zoom = n.zoom),
        Hf.updateProjectionMatrix(),
        qf.update(),
        (mp = null));
      return;
    }
    mp = {
      elapsed: 0,
      duration: 0.85,
      startingPosition: Hf.position.clone(),
      endingPosition: n.position.clone(),
      startingTarget: qf.target.clone(),
      endingTarget: n.target.clone(),
      startingZoom: Hf.zoom,
      endingZoom: n.zoom,
    };
  }
}
function Mp(e) {
  if (!mp || Kf !== `dollhouse`) return;
  mp.elapsed += e;
  let t = Math.min(mp.elapsed / mp.duration, 1),
    n = Ap(t);
  (Hf.position.lerpVectors(mp.startingPosition, mp.endingPosition, n),
    qf.target.lerpVectors(mp.startingTarget, mp.endingTarget, n),
    (Hf.zoom = At.lerp(mp.startingZoom, mp.endingZoom, n)),
    Hf.updateProjectionMatrix(),
    qf.update(),
    t >= 1 && (mp = null));
}
function Np(e) {
  if ((rf.replaceChildren(), !e)) {
    af.textContent = `0 surfaces`;
    return;
  }
  let t = tp.getObjectMaterialSpecifications(e),
    n = t.length === 1 ? `surface` : `surfaces`;
  if (((af.textContent = `${t.length} ${n}`), t.length === 0)) {
    let e = document.createElement(`p`);
    ((e.className = `selection-material-empty`),
      (e.textContent = `No inspectable surface data is attached to this object.`),
      rf.append(e));
    return;
  }
  for (let e of t) {
    let t = document.createElement(`div`);
    t.className = `selection-material-row`;
    let n = document.createElement(`div`);
    ((n.className = `selection-material-swatch material-pattern-${e.pattern.replace(/[^a-z0-9-]/gi, ``).toLowerCase()}`),
      n.style.setProperty(`--material-color`, e.color),
      n.setAttribute(`aria-hidden`, `true`));
    let r = document.createElement(`div`);
    r.className = `selection-material-copy`;
    let i = document.createElement(`strong`);
    i.textContent = e.name;
    let a = document.createElement(`span`);
    a.textContent = `${e.family} · ${e.finish}`;
    let o = [];
    (e.roughness !== null && o.push(`roughness ${e.roughness.toFixed(2)}`),
      e.metalness !== null && e.metalness > 0.01 && o.push(`metalness ${e.metalness.toFixed(2)}`));
    let s = document.createElement(`small`);
    ((s.textContent = o.length > 0 ? o.join(` · `) : `non-metallic PBR surface`),
      r.append(i, a, s),
      t.append(n, r),
      rf.append(t));
  }
}
function Pp(e) {
  if (
    ((fp = e), (pp &&= (Bf.remove(pp), pp.geometry.dispose(), pp.material.dispose(), null)), !fp || Kf !== `dollhouse`)
  ) {
    (Np(null), ef.classList.add(`is-hidden`));
    return;
  }
  ((pp = new Do(new Zn().setFromObject(fp), 6648662)),
    (pp.material.transparent = !0),
    (pp.material.opacity = 0.86),
    (pp.material.depthTest = !1),
    (pp.renderOrder = 100),
    Bf.add(pp),
    (tf.textContent = fp.userData.displayName ?? `Selected object`),
    (nf.textContent = fp.userData.description ?? `Interactive object in the apartment model.`),
    Np(fp),
    ef.classList.remove(`is-hidden`));
}
function Fp(e) {
  ((e.userData.isOpen = !e.userData.isOpen),
    (e.userData.targetAngle = e.userData.isOpen ? e.userData.openAngle : e.userData.closedAngle),
    (hp = tp.doorPivots.every((e) => e.userData.isOpen)),
    (df.textContent = hp ? `Close all doors` : `Open all doors`));
}
function Ip(e) {
  hp = e;
  for (let t of tp.doorPivots)
    ((t.userData.isOpen = e), (t.userData.targetAngle = e ? t.userData.openAngle : t.userData.closedAngle));
  df.textContent = e ? `Close all doors` : `Open all doors`;
}
function Lp(e) {
  let t = 1 - Math.exp(-8.5 * e);
  for (let e of tp.doorPivots) e.rotation.y = At.lerp(e.rotation.y, e.userData.targetAngle, t);
}
function Rp(e, t) {
  if (Kf !== `dollhouse`) return;
  let n = $.domElement.getBoundingClientRect();
  ((rp.x = ((e - n.left) / n.width) * 2 - 1), (rp.y = -((t - n.top) / n.height) * 2 + 1), np.setFromCamera(rp, Hf));
  let r = np.intersectObjects(tp.interactiveMeshes, !1);
  if (r.length === 0) {
    Pp(null);
    return;
  }
  let i = r[0].object.userData.interactiveRoot;
  if (!i) {
    Pp(null);
    return;
  }
  (Pp(i), i.userData.interactionType === `door` && Fp(i));
}
function zp(e, t) {
  if (tp.setMaterialOption(e, t)) {
    for (let n of Mf)
      n.dataset.materialCategory === e && n.classList.toggle(`is-active`, n.dataset.materialOption === t);
    fp && Np(fp);
  }
}
function Bp(e) {
  if (tp.setBedroomLayout(e)) {
    ((yp = e), (kf.textContent = Op[e]));
    for (let t of Nf) t.classList.toggle(`is-active`, t.dataset.bedroomLayout === e);
    Pp(null);
  }
}
function Vp(e) {
  let t = Dp[e];
  if (t) {
    (Uf.position.copy(t.position), Uf.lookAt(t.target), up.setFromQuaternion(Uf.quaternion, `YXZ`));
    for (let t of jf) t.classList.toggle(`is-active`, t.dataset.walkthroughLocation === e);
  }
}
function Hp() {
  if (Kf === `walkthrough`) {
    !Lf && !Jf.isLocked && Jf.lock();
    return;
  }
  ((Kf = `walkthrough`),
    (Gf = Uf),
    (mp = null),
    (qf.enabled = !1),
    (qf.autoRotate = !1),
    (sf.checked = !1),
    (gp = Number(uf.value)),
    tp.setCut(2),
    (Xf.intensity = 1.1),
    (Yf.intensity = 1.05),
    (Bf.environmentIntensity = 0.62),
    (uf.disabled = !0),
    Pp(null),
    Vp(`living`),
    document.body.classList.add(`walkthrough-mode`),
    _f.classList.remove(`is-active`),
    vf.classList.add(`is-active`),
    yf.setAttribute(`aria-hidden`, `true`),
    bf.setAttribute(`aria-hidden`, `false`),
    Df.classList.add(`is-hidden`),
    Tf.classList.remove(`is-hidden`),
    Lf ? xf.classList.add(`is-hidden`) : (xf.classList.remove(`is-hidden`), Jf.lock()));
}
function Up() {
  (Jf.isLocked && Jf.unlock(),
    (Kf = `dollhouse`),
    (Gf = Hf),
    (qf.enabled = !0),
    tp.setCut(gp),
    (Xf.intensity = If ? 2 : 2.5),
    (Yf.intensity = 0.5),
    (Bf.environmentIntensity = 0.38),
    (uf.value = String(gp)),
    (uf.disabled = !1),
    bp.clear(),
    (xp.horizontal = 0),
    (xp.forward = 0),
    Zp(),
    document.body.classList.remove(`walkthrough-mode`, `pointer-locked`),
    _f.classList.add(`is-active`),
    vf.classList.remove(`is-active`),
    yf.setAttribute(`aria-hidden`, `false`),
    bf.setAttribute(`aria-hidden`, `true`),
    xf.classList.add(`is-hidden`),
    Tf.classList.add(`is-hidden`),
    Df.classList.remove(`is-hidden`),
    (Of.textContent = `Drag to orbit · Scroll to zoom · Click rooms or doors`),
    (Ef.textContent = ``),
    (_p = null));
}
function Wp(e) {
  let t = e;
  for (; t;) {
    if (!t.visible) return !1;
    t = t.parent;
  }
  return !0;
}
function Gp(e, t) {
  return tp.walkableAreas.some((n) => e >= n.xStart && e <= n.xEnd && t >= n.zStart && t <= n.zEnd);
}
function Kp(e, t, n, r) {
  let i = At.clamp(e, r.min.x, r.max.x),
    a = At.clamp(t, r.min.z, r.max.z),
    o = e - i,
    s = t - a;
  return o * o + s * s < n * n;
}
function qp(e, t) {
  if (!Gp(e, t)) return !1;
  tp.apartmentRoot.updateMatrixWorld(!0);
  for (let n of tp.collisionObjects)
    if (
      Wp(n) &&
      (op.setFromObject(n, !0), !op.isEmpty() && !(op.max.y <= 0.08 || op.min.y >= 1.12) && Kp(e, t, 0.16, op))
    )
      return !1;
  return !0;
}
function Jp(e, t) {
  let n = Uf.position.x + e;
  qp(n, Uf.position.z) && (Uf.position.x = n);
  let r = Uf.position.z + t;
  (qp(Uf.position.x, r) && (Uf.position.z = r), (Uf.position.y = Wf));
}
function Yp(e) {
  if (Kf !== `walkthrough` || (!Lf && !Jf.isLocked)) return;
  let t = (bp.has(`KeyW`) || bp.has(`ArrowUp`) ? 1 : 0) - (bp.has(`KeyS`) || bp.has(`ArrowDown`) ? 1 : 0),
    n = (bp.has(`KeyD`) || bp.has(`ArrowRight`) ? 1 : 0) - (bp.has(`KeyA`) || bp.has(`ArrowLeft`) ? 1 : 0),
    r = At.clamp(t + xp.forward, -1, 1),
    i = At.clamp(n + xp.horizontal, -1, 1);
  if (Math.abs(r) < 0.001 && Math.abs(i) < 0.001) return;
  (Uf.getWorldDirection(sp),
    (sp.y = 0),
    sp.normalize(),
    cp.crossVectors(sp, Uf.up).normalize(),
    lp.set(0, 0, 0).addScaledVector(sp, r).addScaledVector(cp, i),
    lp.lengthSq() > 1 && lp.normalize());
  let a = bp.has(`ShiftLeft`) || bp.has(`ShiftRight`) ? 2.75 : 1.75;
  (lp.multiplyScalar(a * e), Jp(lp.x, lp.z));
}
function Xp(e) {
  if (Kf === `walkthrough` && ((vp -= e), !(vp > 0))) {
    if (
      ((vp = 0.12),
      np.setFromCamera(ap, Uf),
      (np.far = 2.25),
      (_p =
        np.intersectObjects(tp.interactiveMeshes, !1).find((e) => {
          let t = e.object.userData.interactiveRoot;
          return t && Wp(t);
        })?.object.userData.interactiveRoot ?? null),
      !_p)
    ) {
      Ef.textContent = ``;
      return;
    }
    _p.userData.interactionType === `door`
      ? (Ef.textContent = `Click to open or close · ${_p.userData.displayName}`)
      : (Ef.textContent = _p.userData.displayName ?? ``);
  }
}
function Zp() {
  ((Sp = null), (Ff.style.transform = `translate(-50%, -50%)`));
}
function Qp(e, t) {
  let n = Pf.getBoundingClientRect(),
    r = n.left + n.width / 2,
    i = n.top + n.height / 2,
    a = n.width * 0.31,
    o = e - r,
    s = t - i,
    c = Math.hypot(o, s);
  (c > a && ((o = (o / c) * a), (s = (s / c) * a)),
    (xp.horizontal = o / a),
    (xp.forward = -s / a),
    (Ff.style.transform = `translate(calc(-50% + ${o}px), calc(-50% + ${s}px))`));
}
function $p() {
  (Kf === `walkthrough` && Up(),
    (of.checked = !1),
    (sf.checked = !1),
    (cf.checked = zf),
    (lf.checked = !If),
    (uf.value = `0.6`),
    (gp = 0.6),
    (tp.labelGroup.visible = !1),
    tp.setCut(0.6),
    (qf.autoRotate = !1),
    ($.shadowMap.enabled = zf),
    (Xf.castShadow = zf),
    tp.setTextureDetail(!If),
    Ip(!0),
    zp(`flooring`, `light-oak`),
    zp(`walls`, `warm-white`),
    zp(`cabinetry`, `pale-oak`),
    zp(`fabrics`, `sage`),
    Bp(`balanced`),
    tp.setLayout(`placed`, !0),
    yzSpaceToggle && ((yzSpaceToggle.checked = !1), tp.setSpaceOverlay(!1)),
    Object.entries(yzPaintDefaults).forEach(([k2, v2]) => yzSetPaint(k2, v2)),
    yzRenderSpace(),
    Pp(null),
    jp(`overview`));
}
function em(e) {
  (($.shadowMap.enabled = e), (Xf.castShadow = e), ($.shadowMap.needsUpdate = !0));
}
function tm(e) {
  requestAnimationFrame(tm);
  let t = Math.min((e - dp) / 1e3, 0.05);
  ((dp = e),
    Mp(t),
    Lp(t),
    tp.updateLayout(t) && yzRenderSpace(),
    Yp(t),
    Xp(t),
    Kf === `dollhouse` && qf.update(t),
    pp && fp && pp.box.setFromObject(fp),
    $.render(Bf, Gf));
}
($.domElement.addEventListener(`pointerdown`, (e) => {
  (ip.set(e.clientX, e.clientY),
    Kf === `walkthrough` &&
      Lf &&
      e.pointerType === `touch` &&
      e.target === $.domElement &&
      ((Cp = e.pointerId), (wp = e.clientX), (Tp = e.clientY), $.domElement.setPointerCapture(e.pointerId)));
}),
  $.domElement.addEventListener(`pointerup`, (e) => {
    if (Cp === e.pointerId) {
      ((Cp = null), $.domElement.hasPointerCapture(e.pointerId) && $.domElement.releasePointerCapture(e.pointerId));
      return;
    }
    Kf === `dollhouse` && ip.distanceTo(new B(e.clientX, e.clientY)) <= 5 && Rp(e.clientX, e.clientY);
  }),
  $.domElement.addEventListener(`pointercancel`, (e) => {
    Cp === e.pointerId && (Cp = null);
  }),
  $.domElement.addEventListener(`pointermove`, (e) => {
    if (Kf === `walkthrough` && Cp === e.pointerId) {
      let t = e.clientX - wp,
        n = e.clientY - Tp;
      ((wp = e.clientX),
        (Tp = e.clientY),
        up.setFromQuaternion(Uf.quaternion, `YXZ`),
        (up.y -= t * 0.0042),
        (up.x -= n * 0.0042),
        (up.x = At.clamp(up.x, -Math.PI * 0.47, Math.PI * 0.47)),
        Uf.quaternion.setFromEuler(up));
      return;
    }
    if (Kf !== `dollhouse`) {
      $.domElement.style.cursor = `crosshair`;
      return;
    }
    let t = $.domElement.getBoundingClientRect();
    ((rp.x = ((e.clientX - t.left) / t.width) * 2 - 1),
      (rp.y = -((e.clientY - t.top) / t.height) * 2 + 1),
      np.setFromCamera(rp, Hf));
    let n = np.intersectObjects(tp.interactiveMeshes, !1);
    $.domElement.style.cursor = n.length > 0 ? `pointer` : `grab`;
  }),
  $.domElement.addEventListener(`click`, () => {
    Kf === `walkthrough` && _p?.userData.interactionType === `door` && Fp(_p);
  }),
  Jf.addEventListener(`lock`, () => {
    Kf === `walkthrough` && (document.body.classList.add(`pointer-locked`), xf.classList.add(`is-hidden`));
  }),
  Jf.addEventListener(`unlock`, () => {
    (document.body.classList.remove(`pointer-locked`), Kf === `walkthrough` && !Lf && xf.classList.remove(`is-hidden`));
  }));
var yzStats = null,
  yzLayoutBtns = [...document.querySelectorAll(`[data-layout]`)],
  yzSpaceToggle = document.querySelector(`#space-toggle`),
  yzMetrics = document.querySelector(`#space-metrics`),
  yzTips = document.querySelector(`#space-tips`),
  yzPaintBtns = [...document.querySelectorAll(`[data-room-paint]`)],
  yzPaintInputs = [...document.querySelectorAll(`[data-room-paint-input]`)],
  yzPaintDefaults = { parents: null, eldest: `#b4c0c8`, second: `#e9dfcf`, youngest: `#cde0eb`, living: null },
  yzTipText = {
    placed: [
      `Beds sit centred on a wall: symmetrical and easy to make, but the leftover floor is split into narrow strips on both sides.`,
      `Switch to <b>Space-saving</b> to see the same furniture rearranged around one continuous open zone per room.`,
    ],
    saving: [
      `<b>大姐 & 二姐:</b> the bed turns head-to-the-corridor wall and slides into the far corner, so the desk, cupboard and vanity line the other walls and the floor by the door becomes one play / dressing zone.`,
      `<b>三妹:</b> the cupboard moves out of the middle of the side wall into the corner, joining the floor between bed and desk. The inward door swing (orange) stays clear.`,
      `<b>Storage without floor:</b> each lift-up bed holds roughly a wardrobe's worth of seasonal items, the glass cupboards are only 32 cm deep, and the 185 cm desk hutches store upwards instead of outwards.`,
      `<b>Rule of thumb:</b> keep 60 cm in front of desks and cupboards and 70 cm along the open bed side; everything else counts as activity space.`,
    ],
  };
function yzComputeStats() {
  let cur = tp.getLayout(),
    out = {};
  for (let m of [`placed`, `saving`]) (tp.setLayout(m, !0), (out[m] = tp.analyseSpace()));
  return (tp.setLayout(cur, !0), out);
}
function yzRenderSpace() {
  if (!yzMetrics) return;
  yzStats ??= yzComputeStats();
  let cur = tp.getLayout(),
    zone = (r) => (r.zone ? `${(r.zone.x1 - r.zone.x0).toFixed(1)} × ${(r.zone.z1 - r.zone.z0).toFixed(1)} m` : `—`),
    za = (r) => (r.zone ? (r.zone.x1 - r.zone.x0) * (r.zone.z1 - r.zone.z0) : 0),
    rows = yzStats.placed
      .map((r, i) => {
        let sv = yzStats.saving[i],
          gain = za(sv) - za(r);
        return `<tr><td>${r.name}<small>${r.area.toFixed(1)} m²</small></td><td class="${cur === `placed` ? `is-current` : ``}">${zone(r)}<small>${Math.round(r.freePct * 100)}% free</small></td><td class="${cur === `saving` ? `is-current` : ``}">${zone(sv)}<small>${Math.round(sv.freePct * 100)}% free${gain > 0.05 ? ` · +${gain.toFixed(1)} m²` : ``}</small></td></tr>`;
      })
      .join(``);
  ((yzMetrics.innerHTML = `<table><thead><tr><th>Room</th><th>As proposed</th><th>Space-saving</th></tr></thead><tbody>${rows}</tbody></table><p class="space-caption">Largest clear rectangle of floor (activity zone) and the share of floor not covered by furniture.</p>`),
    (yzTips.innerHTML = `<ul>${yzTipText[cur].map((x) => `<li>${x}</li>`).join(``)}</ul>`));
  for (let b of yzLayoutBtns) b.classList.toggle(`is-active`, b.dataset.layout === cur);
}
function yzSetPaint(key, color) {
  tp.setRoomWallColor(key, color);
  for (let b of yzPaintBtns) b.dataset.roomPaint === key && b.classList.toggle(`is-active`, (b.dataset.paint === `default` ? null : b.dataset.paint) === color);
  for (let c of yzPaintInputs) c.dataset.roomPaintInput === key && color && (c.value = color);
}
for (let b of yzLayoutBtns)
  b.addEventListener(`click`, () => {
    (tp.setLayout(b.dataset.layout), Pp(null), yzRenderSpace());
  });
yzSpaceToggle?.addEventListener(`change`, () => {
  (tp.setSpaceOverlay(yzSpaceToggle.checked), yzSpaceToggle.checked && Kf === `dollhouse` && jp(`top`));
});
for (let b of yzPaintBtns)
  b.addEventListener(`click`, () => {
    yzSetPaint(b.dataset.roomPaint, b.dataset.paint === `default` ? null : b.dataset.paint);
  });
for (let c of yzPaintInputs)
  c.addEventListener(`input`, () => {
    yzSetPaint(c.dataset.roomPaintInput, c.value);
  });
for (let e of Af)
  e.addEventListener(`click`, () => {
    jp(e.dataset.cameraView);
  });
for (let e of jf)
  e.addEventListener(`click`, () => {
    Vp(e.dataset.walkthroughLocation);
  });
for (let e of Mf)
  e.addEventListener(`click`, () => {
    zp(e.dataset.materialCategory, e.dataset.materialOption);
  });
for (let e of Nf)
  e.addEventListener(`click`, () => {
    Bp(e.dataset.bedroomLayout);
  });
(of.addEventListener(`change`, () => {
  tp.labelGroup.visible = of.checked;
}),
  sf.addEventListener(`change`, () => {
    qf.autoRotate = sf.checked;
  }),
  cf.addEventListener(`change`, () => {
    em(cf.checked);
  }),
  lf.addEventListener(`change`, () => {
    (tp.setTextureDetail(lf.checked), fp && Np(fp));
  }),
  uf.addEventListener(`input`, () => {
    (tp.setCut(Number(uf.value)), (gp = Number(uf.value)));
  }),
  df.addEventListener(`click`, () => {
    Ip(!hp);
  }),
  ff.addEventListener(`click`, $p),
  _f.addEventListener(`click`, Up),
  vf.addEventListener(`click`, Hp),
  Sf.addEventListener(`click`, () => {
    Lf ? xf.classList.add(`is-hidden`) : Jf.lock();
  }),
  Cf.addEventListener(`click`, Up),
  wf.addEventListener(`click`, Up),
  pf.addEventListener(`click`, () => {
    (Jf.isLocked && Jf.unlock(), hf.showModal());
  }),
  mf.addEventListener(`click`, () => {
    (Jf.isLocked && Jf.unlock(), gf.showModal());
  }));
for (let e of document.querySelectorAll(`[data-close-dialog]`))
  e.addEventListener(`click`, () => {
    document.querySelector(`#${e.dataset.closeDialog}`).close();
  });
for (let e of [hf, gf])
  e.addEventListener(`click`, (t) => {
    t.target === e && e.close();
  });
(window.addEventListener(`keydown`, (e) => {
  [
    `KeyW`,
    `KeyA`,
    `KeyS`,
    `KeyD`,
    `ArrowUp`,
    `ArrowDown`,
    `ArrowLeft`,
    `ArrowRight`,
    `ShiftLeft`,
    `ShiftRight`,
  ].includes(e.code) && (bp.add(e.code), Kf === `walkthrough` && e.preventDefault());
}),
  window.addEventListener(`keyup`, (e) => {
    bp.delete(e.code);
  }),
  window.addEventListener(`blur`, () => {
    (bp.clear(), (xp.horizontal = 0), (xp.forward = 0), Zp());
  }),
  Pf.addEventListener(`pointerdown`, (e) => {
    Kf === `walkthrough` &&
      (e.preventDefault(), (Sp = e.pointerId), Pf.setPointerCapture(e.pointerId), Qp(e.clientX, e.clientY));
  }),
  Pf.addEventListener(`pointermove`, (e) => {
    Sp === e.pointerId && (e.preventDefault(), Qp(e.clientX, e.clientY));
  }));
function nm(e) {
  Sp === e.pointerId && ((xp.horizontal = 0), (xp.forward = 0), Zp());
}
(Pf.addEventListener(`pointerup`, nm),
  Pf.addEventListener(`pointercancel`, nm),
  window.addEventListener(`resize`, () => {
    ($.setPixelRatio(Math.min(window.devicePixelRatio, Rf)),
      $.setSize(window.innerWidth, window.innerHeight, !1),
      kp());
  }),
  $.domElement.addEventListener(
    `webglcontextlost`,
    (e) => {
      (e.preventDefault(),
        Zd.classList.remove(`is-hidden`),
        window.familyApartmentRuntime?.showFailure(
          `The browser paused the WebGL graphics context. Reopen in compatibility mode or refresh the page.`,
        ));
    },
    !1,
  ),
  $.domElement.addEventListener(
    `webglcontextrestored`,
    () => {
      window.location.reload();
    },
    !1,
  ),
  (cf.checked = zf),
  (lf.checked = !If),
  (lf.disabled = If || !tp.textureDetailAvailable),
  lf.closest(`.toggle-row`)?.classList.toggle(`is-disabled`, lf.disabled),
  tp.setTextureDetail(!If),
  kp(),
  Bp(yp),
  yzRenderSpace(),
  jp(`overview`, !0),
  $.render(Bf, Gf),
  tm(performance.now()),
  requestAnimationFrame(() => {
    ((document.documentElement.dataset.apartmentReady = `true`),
      window.familyApartmentRuntime?.markReady(),
      Zd.classList.add(`is-hidden`),
      Zd.setAttribute(`aria-hidden`, `true`));
  }));
