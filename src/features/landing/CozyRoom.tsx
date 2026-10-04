"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three-landing";
import s from "./cozy-room.module.css";

const palettes = [
  { name: "Apricot", color: "#df986e" },
  { name: "Honey", color: "#d3af68" },
  { name: "Sage", color: "#9eab88" },
];

export function CozyRoom() {
  const mount = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const motionRef = useRef(true);
  const [palette, setPalette] = useState(0);
  const [moving, setMoving] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      motionRef.current = !media.matches;
      setMoving(!media.matches);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    materialRef.current?.color.set(palettes[palette]!.color);
  }, [palette]);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.82;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute(
      "aria-label",
      "Illustrative three-dimensional living room in warm evening light",
    );
    renderer.domElement.setAttribute("role", "img");
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const room = new THREE.Group();
    scene.add(room);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const materials: THREE.Material[] = [];
    const mat = (color: string, roughness = 0.85) => {
      const m = new THREE.MeshStandardMaterial({ color, roughness });
      materials.push(m);
      return m;
    };
    const cream = mat("#ffe4c1"),
      wall = mat("#f4cfac"),
      wood = mat("#b98253"),
      paleWood = mat("#deb382"),
      sofa = mat(palettes[0]!.color),
      rug = mat("#f9e8cd"),
      green = mat("#78916c"),
      darkGreen = mat("#527357"),
      terracotta = mat("#b76843"),
      cushion = mat("#f6d69d"),
      white = mat("#fff5dc"),
      brown = mat("#684c39");
    materialRef.current = sofa;
    function box(
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      m: THREE.Material,
      round = 0.04,
    ) {
      const shape = new THREE.Shape();
      const a = w / 2 - round,
        b = h / 2 - round;
      shape.moveTo(-a, -h / 2);
      shape.lineTo(a, -h / 2);
      shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -b);
      shape.lineTo(w / 2, b);
      shape.quadraticCurveTo(w / 2, h / 2, a, h / 2);
      shape.lineTo(-a, h / 2);
      shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, b);
      shape.lineTo(-w / 2, -b);
      shape.quadraticCurveTo(-w / 2, -h / 2, -a, -h / 2);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: Math.max(0.01, d - 2 * round),
        bevelEnabled: true,
        bevelSize: round,
        bevelThickness: round,
        bevelSegments: 3,
        steps: 1,
        curveSegments: 5,
      });
      geo.center();
      const mesh = new THREE.Mesh(geo, m);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      room.add(mesh);
      return mesh;
    }
    function cylinder(
      top: number,
      bottom: number,
      h: number,
      x: number,
      y: number,
      z: number,
      m: THREE.Material,
    ) {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(top, bottom, h, 40),
        m,
      );
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      room.add(mesh);
      return mesh;
    }
    function ball(
      x: number,
      y: number,
      z: number,
      sx: number,
      sy: number,
      sz: number,
      m: THREE.Material,
    ) {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), m);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      mesh.castShadow = true;
      room.add(mesh);
      return mesh;
    }
    // A cutaway room: open front, softly rounded wooden base, window and framed art.
    box(5.5, 0.24, 4.45, 0, -0.17, 0, paleWood, 0.09);
    box(5.32, 0.08, 4.25, 0, -0.015, 0, cream, 0.025);
    for (let i = 0; i < 14; i++)
      box(0.009, 0.008, 4.05, -2.48 + i * 0.38, 0.037, 0, paleWood, 0.001);
    box(5.4, 2.65, 0.14, 0, 1.32, -2.12, wall, 0.055);
    box(0.14, 2.65, 1.2, -2.62, 1.32, -1.58, wall, 0.055);
    box(0.14, 0.78, 3.03, -2.62, 0.38, 0.5, wall, 0.05);
    // Window inset and sunset glass.
    const glass = mat("#ffc687");
    glass.emissive = new THREE.Color("#fca96c");
    glass.emissiveIntensity = 0.26;
    box(1.45, 1.6, 0.09, -1.28, 1.65, -2.01, paleWood, 0.03);
    box(1.28, 1.43, 0.06, -1.28, 1.65, -1.94, glass, 0.03);
    box(0.065, 1.46, 0.065, -1.28, 1.65, -1.89, white, 0.01);
    box(1.34, 0.065, 0.065, -1.28, 1.65, -1.88, white, 0.01);
    box(1.65, 0.12, 0.32, -1.28, 0.86, -1.93, white, 0.025);
    box(0.8, 1.03, 0.08, 1.03, 1.94, -2.01, wood, 0.025);
    box(0.68, 0.91, 0.04, 1.03, 1.94, -1.95, white, 0.018);
    const art = ball(1.03, 2.03, -1.91, 0.23, 0.28, 0.01, terracotta);
    art.rotation.z = 0.2;
    box(0.55, 0.035, 0.025, 1.03, 1.69, -1.9, paleWood, 0.009);
    // Comfortable three-seat sofa, cushions and an ottoman.
    box(2.75, 0.34, 0.97, 0.35, 0.39, -1.26, sofa, 0.12);
    box(2.75, 0.71, 0.27, 0.35, 0.86, -1.64, sofa, 0.11);
    [-1, 1].forEach((sign) =>
      box(0.3, 0.67, 1.04, 0.35 + sign * 1.3, 0.64, -1.25, sofa, 0.1),
    );
    [-0.5, 0.35, 1.2].forEach((x) =>
      box(0.79, 0.18, 0.73, x, 0.65, -1.16, sofa, 0.075),
    );
    const pillowA = box(0.47, 0.46, 0.19, -0.52, 0.99, -1.4, cushion, 0.08);
    pillowA.rotation.z = 0.15;
    const pillowB = box(0.43, 0.42, 0.19, 1.12, 0.96, -1.38, green, 0.08);
    pillowB.rotation.z = -0.17;
    box(0.85, 0.27, 0.85, 1.42, 0.36, 0.05, sofa, 0.12);
    // Woven rug and small coffee table.
    box(3.42, 0.025, 2.24, 0.15, 0.07, 0.3, rug, 0.08);
    for (let i = 0; i < 17; i++)
      box(0.012, 0.008, 1.97, -1.41 + i * 0.185, 0.089, 0.3, paleWood, 0.002);
    cylinder(0.58, 0.62, 0.1, -0.3, 0.56, 0.42, paleWood);
    [-1, 1].forEach((sign) =>
      cylinder(0.06, 0.075, 0.43, -0.3 + sign * 0.34, 0.3, 0.42, wood),
    );
    cylinder(0.055, 0.075, 0.43, -0.3, 0.3, 0.77, wood);
    box(0.31, 0.045, 0.24, -0.43, 0.64, 0.43, terracotta, 0.01);
    box(0.28, 0.04, 0.22, -0.4, 0.68, 0.43, cream, 0.01);
    cylinder(0.08, 0.065, 0.12, -0.07, 0.7, 0.32, white);
    // Reading nook and a glowing standing lamp.
    cylinder(0.2, 0.24, 0.06, 2.06, 0.09, -1.52, brown);
    cylinder(0.025, 0.025, 1.65, 2.06, 0.93, -1.52, brown);
    const shade = new THREE.Mesh(
      new THREE.ConeGeometry(0.39, 0.44, 40, 1, true),
      cushion,
    );
    shade.position.set(2.06, 1.95, -1.52);
    shade.castShadow = true;
    room.add(shade);
    const lamp = new THREE.PointLight("#ffb866", 0.55, 4, 2);
    lamp.position.set(2.06, 1.75, -1.52);
    room.add(lamp);
    // Leaves, stems, planter.
    cylinder(0.26, 0.18, 0.43, -2.03, 0.28, 0.72, terracotta);
    [-0.2, 0, 0.2].forEach((dx, i) => {
      cylinder(0.014, 0.018, 0.83, -2.03 + dx * 0.4, 0.85, 0.72, brown);
      for (let j = 0; j < 3; j++) {
        const leaf = ball(
          -2.03 + dx + (j % 2 ? 0.13 : -0.13),
          0.75 + j * 0.23 + i * 0.1,
          0.72,
          0.15,
          0.28,
          0.06,
          j % 2 ? green : darkGreen,
        );
        leaf.rotation.z = (j % 2 ? 1 : -1) * 0.65;
        leaf.rotation.y = i;
      }
    });
    // A low bookcase, a vase and a few books.
    box(0.64, 0.68, 1.28, 2.12, 0.4, 0.89, paleWood, 0.035);
    box(0.68, 0.07, 1.36, 2.12, 0.79, 0.89, wood, 0.02);
    for (let i = 0; i < 5; i++)
      box(
        0.42,
        0.34,
        0.08,
        2.13,
        0.4,
        0.42 + i * 0.13,
        i % 2 ? cream : terracotta,
        0.009,
      );
    cylinder(0.09, 0.13, 0.27, 2.12, 0.96, 1.15, white);
    ball(2.12, 1.23, 1.15, 0.15, 0.11, 0.13, green);
    scene.add(new THREE.HemisphereLight("#fff1d4", "#a86242", 0.8));
    const sun = new THREE.DirectionalLight("#ffcf91", 1.65);
    sun.position.set(-3, 6, 4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -6;
    sun.shadow.camera.right = 6;
    sun.shadow.camera.top = 6;
    sun.shadow.camera.bottom = -6;
    sun.shadow.normalBias = 0.025;
    sun.shadow.bias = -0.0003;
    sun.shadow.radius = 4;
    scene.add(sun);
    const fill = new THREE.DirectionalLight("#fff0db", 0.45);
    fill.position.set(4, 3, -1);
    scene.add(fill);
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.ShadowMaterial({ opacity: 0.12, color: "#853d21" }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.34;
    shadow.receiveShadow = true;
    scene.add(shadow);
    materials.push(shadow.material);
    let pointer = 0;
    let view = 0;
    let animation = 0;
    let last = 0;
    let visible = true;
    const onMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.18;
    };
    const onLeave = () => {
      pointer = 0;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    const resize = () => {
      const width = host.clientWidth,
        height = host.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    const intersection = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
    });
    intersection.observe(host);
    const loop = (time: number) => {
      animation = requestAnimationFrame(loop);
      if (!visible || document.hidden || time - last < 32) return;
      last = time;
      view += (pointer - view) * 0.06;
      const drift = motionRef.current ? Math.sin(time * 0.00022) * 0.045 : 0;
      const angle = 0.64 + (motionRef.current ? view : 0) + drift;
      const fit = Math.max(1, 1.3 / camera.aspect);
      camera.position.set(
        Math.sin(angle) * 9.5 * fit,
        0.85 + 5.45 * fit,
        Math.cos(angle) * 9.5 * fit,
      );
      camera.lookAt(0, 0.85, 0);
      renderer.render(scene, camera);
    };
    renderer.render(scene, camera);
    animation = requestAnimationFrame(loop);
    setReady(true);
    const lost = (event: Event) => {
      event.preventDefault();
      setUnavailable(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    return () => {
      cancelAnimationFrame(animation);
      observer.disconnect();
      intersection.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) obj.geometry.dispose();
      });
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      materialRef.current = null;
    };
  }, []);
  return (
    <section className={s.world} aria-label="A warm little room to explore">
      <div className={s.sun} aria-hidden="true" />
      <div className={s.orbit} aria-hidden="true" />
      <div className={s.sceneLabel}>
        <span>SPATIAL STUDY / 01</span>
        <small>Living area · Interactive material preview</small>
      </div>
      <div
        ref={mount}
        className={s.canvas}
        data-cozy-ready={ready && !unavailable}
      />
      {(!ready || unavailable) && (
        <div className={s.fallback}>
          <img
            src="/cases/bto-family/space-reference.png"
            alt="A warm apartment planning reference"
          />
          <p>
            {unavailable
              ? "Your next space, imagined with care."
              : "Making room for you…"}
          </p>
        </div>
      )}
      <div className={s.roomNote}>
        <span aria-hidden="true">↗</span>
        <div>
          Material & proportion
          <small>Study furniture in a spatial context.</small>
        </div>
      </div>
      <div className={s.controls}>
        <div>
          <span className={s.controlLabel}>UPHOLSTERY PALETTE</span>
          <div className={s.swatches}>
            {palettes.map((p, i) => (
              <button
                key={p.name}
                type="button"
                aria-label={`${p.name} sofa colour`}
                aria-pressed={palette === i}
                onClick={() => setPalette(i)}
              >
                <span style={{ background: p.color }} />
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <button
          className={s.motion}
          type="button"
          onClick={() => {
            motionRef.current = !moving;
            setMoving(!moving);
          }}
          aria-label={moving ? "Pause room motion" : "Play room motion"}
        >
          {moving ? "Ⅱ" : "▷"}
        </button>
      </div>
      <p className={s.disclaimer}>
        Illustrative room · Explore colours, then plan your own space with us.
      </p>
    </section>
  );
}
