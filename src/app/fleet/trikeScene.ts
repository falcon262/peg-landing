import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { CONTACT_PHONE } from "../../config";
import {
  LIVERIES,
  PARTS,
  VIEWS,
  type Livery,
  type LiveryId,
  type PartId,
  type TrikeOptions,
  type Vec3,
  type ViewId,
} from "./trikeData";

// PEG wordmark, from public/assets/client/4bcf8.svg (viewBox 94 x 57).
const LOGO = {
  w: 94,
  h: 57,
  g: "M81.0786 46.72C79.0686 46.72 77.2021 46.3853 75.4793 45.7159C73.7564 45.0465 72.2808 44.1141 71.0525 42.9187C69.8242 41.7233 68.9388 40.3128 68.3964 38.6871L75.0486 36.3442C75.3995 37.5555 76.1174 38.5118 77.2021 39.2131C78.2869 39.9143 79.579 40.265 81.0786 40.265C82.259 40.265 83.28 40.0498 84.1414 39.6195C85.0029 39.1892 85.6649 38.5596 86.1275 37.7308C86.5901 36.902 86.8214 35.9298 86.8214 34.8141V28.8372L88.2093 30.5586C87.3159 32.0249 86.1674 33.1167 84.7636 33.8339C83.3598 34.5511 81.7167 34.9097 79.8343 34.9097C77.4095 34.9097 75.24 34.3598 73.3257 33.2601C71.4114 32.1604 69.9119 30.6462 68.8271 28.7177C67.7424 26.7892 67.2 24.5976 67.2 22.1431C67.2 19.6886 67.7424 17.5131 68.8271 15.6164C69.9119 13.7197 71.3955 12.2295 73.2779 11.1457C75.1602 10.0619 77.2979 9.52 79.6907 9.52C81.5731 9.52 83.2162 9.89455 84.62 10.6437C86.0238 11.3928 87.2202 12.5323 88.2093 14.0624L87.3 15.7838V10.0938H94V34.8141C94 37.1092 93.4417 39.1573 92.325 40.9583C91.2083 42.7593 89.6849 44.1699 87.7546 45.1899C85.8244 46.21 83.599 46.72 81.0786 46.72ZM80.8393 28.4069C82.0517 28.4069 83.1045 28.1519 83.9979 27.6419C84.8912 27.1318 85.5851 26.4146 86.0796 25.4902C86.5742 24.5658 86.8214 23.482 86.8214 22.2388C86.8214 20.9956 86.5662 19.9038 86.0557 18.9634C85.5452 18.0231 84.8433 17.2899 83.95 16.764C83.0567 16.238 82.0198 15.975 80.8393 15.975C79.6269 15.975 78.5501 16.238 77.6089 16.764C76.6677 17.2899 75.9339 18.0231 75.4075 18.9634C74.8811 19.9038 74.6179 20.9956 74.6179 22.2388C74.6179 23.4501 74.8811 24.5179 75.4075 25.4424C75.9339 26.3668 76.6677 27.092 77.6089 27.6179C78.5501 28.1439 79.6269 28.4069 80.8393 28.4069Z",
  e: "M52.5963 36.77C49.8294 36.77 47.4281 36.1554 45.3927 34.9261C43.3572 33.6968 41.7829 32.0444 40.6697 29.9689C39.5566 27.8935 39 25.5946 39 23.0721C39 20.4539 39.5804 18.123 40.7413 16.0795C41.9021 14.036 43.4685 12.4235 45.4404 11.2421C47.4122 10.0607 49.6385 9.47 52.1193 9.47C54.1865 9.47 56.0153 9.79728 57.6055 10.4518C59.1957 11.1064 60.5394 12.0244 61.6367 13.2058C62.7339 14.3872 63.5688 15.7522 64.1413 17.3008C64.7138 18.8494 65 20.5337 65 22.3537C65 22.8646 64.9761 23.3675 64.9284 23.8624C64.8807 24.3573 64.7933 24.7804 64.6661 25.1316H45.1541V19.8632H60.611L57.2239 22.3537C57.5419 20.9807 57.526 19.7594 57.1761 18.6897C56.8263 17.6201 56.2141 16.7739 55.3394 16.1513C54.4648 15.5287 53.3914 15.2174 52.1193 15.2174C50.8789 15.2174 49.8135 15.5207 48.9229 16.1274C48.0324 16.734 47.3645 17.6281 46.9193 18.8095C46.474 19.9909 46.2991 21.4277 46.3945 23.12C46.2673 24.5888 46.4422 25.8819 46.9193 26.9995C47.3963 28.117 48.1278 28.9871 49.1138 29.6097C50.0997 30.2324 51.2924 30.5437 52.6917 30.5437C53.9639 30.5437 55.0532 30.2882 55.9596 29.7774C56.8661 29.2665 57.5737 28.564 58.0826 27.67L63.8073 30.4C63.2985 31.6772 62.4954 32.7947 61.3982 33.7526C60.3009 34.7105 59.0049 35.4529 57.5101 35.9797C56.0153 36.5066 54.3774 36.77 52.5963 36.77Z",
  mark: "M0 18.3871C8.85597e-07 14.8333 1.02865 11.3556 2.96148 8.37483C4.89432 5.39408 7.64851 3.03799 10.8908 1.59165C14.1331 0.145313 17.7246 -0.329301 21.2307 0.225237C24.7367 0.779774 28.0072 2.3397 30.6463 4.71627C33.2854 7.09284 35.1801 10.1842 36.1011 13.6163C37.022 17.0485 36.9299 20.6743 35.8357 24.055C34.7415 27.4358 32.6922 30.4267 29.9358 32.6657C27.1794 34.9048 23.8339 36.2962 20.3042 36.6714L0 57V18.3871ZM7.89695 18.3871C7.89696 16.2566 8.54549 14.1767 9.75611 12.4245C10.9667 10.6724 12.682 9.33129 14.6732 8.57991C16.6644 7.82853 18.8371 7.70258 20.9016 8.21885C22.9661 8.73511 24.8245 9.86907 26.229 11.4696C27.6335 13.0701 28.5175 15.0612 28.7631 17.1775C29.0087 19.2938 28.6043 21.4347 27.6037 23.315C26.6032 25.1954 25.054 26.7257 23.1627 27.7022C21.2714 28.6787 19.1278 29.0548 17.0176 28.7806L7.89695 37.9122V18.3871Z",
};
const GOLD = "#f0c749";
const SITE = "justpegit.online";
const DISPLAY = '"Plus Jakarta Sans", "Segoe UI", sans-serif';
const BODY = 'Inter, "Segoe UI", sans-serif';
// Light intensities were tuned with legacy lighting; physical lighting needs a factor of pi.
const LUX = Math.PI;

export type TrikeController = {
  setView: (id: ViewId) => void;
  inspect: (id: PartId) => void;
  setLivery: (id: LiveryId) => void;
  setOptions: (options: TrikeOptions) => void;
  zoom: (factor: number) => void;
  dispose: () => void;
};

export type TrikeSceneEvents = {
  /** The visitor started dragging the model. */
  onInteract?: () => void;
};

export function createTrikeScene(
  host: HTMLElement,
  initial: TrikeOptions,
  events: TrikeSceneEvents = {},
): TrikeController {
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  let opt: TrikeOptions = { ...initial };

  // ---------- Renderer / scene ----------
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.touchAction = "none";
  canvas.style.cursor = "grab";
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;

  const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 80);

  // On a scrolling page the wheel must keep scrolling the page. Zoom with ctrl/cmd + wheel
  // (which is also the trackpad pinch gesture), pinch on touch screens, or the zoom buttons.
  // This listener is added before OrbitControls so it runs first and can stop it.
  const onWheel = (event: WheelEvent) => {
    if (!event.ctrlKey && !event.metaKey) event.stopImmediatePropagation();
  };
  canvas.addEventListener("wheel", onWheel, { capture: true });

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 1.2;
  controls.maxDistance = 14;
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.autoRotateSpeed = 1.1;

  const hemi = new THREE.HemisphereLight(0xffffff, 0x8c8a80, 0.3 * LUX);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 1.7 * LUX);
  sun.position.set(3.5, 7.5, 4.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, {
    left: -4,
    right: 4,
    top: 4,
    bottom: -4,
    near: 1,
    far: 20,
  });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0xfff3d6, 0.55 * LUX);
  rim.position.set(-5, 3, -4);
  scene.add(rim);

  // ---------- Helpers ----------
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  type Mat = THREE.Material | THREE.Material[];
  const std = (
    color: string,
    roughness: number,
    metalness: number,
    extra: THREE.MeshStandardMaterialParameters = {},
  ) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  const M = {
    paint: new THREE.MeshPhysicalMaterial({
      color: "#191919",
      roughness: 0.32,
      metalness: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.18,
      side: THREE.DoubleSide,
    }),
    gold: std("#e2ad22", 0.38, 0.35),
    frame: std("#1b1c1c", 0.5, 0.5),
    chrome: std("#d9dcdd", 0.12, 1.0),
    alloy: std("#a9adaf", 0.35, 0.85),
    darkMetal: std("#3a3d3e", 0.45, 0.7),
    rubber: std("#101010", 0.92, 0.0),
    seat: std("#121212", 0.7, 0.0),
    rim: std("#26292a", 0.4, 0.7),
    boxEdge: std("#e2ad22", 0.45, 0.1),
    interior: std("#8e908b", 0.9, 0.0),
    interiorDark: std("#5b5d59", 0.9, 0.0),
    headLens: std("#f6f3e6", 0.2, 0.1, {
      emissive: new THREE.Color("#fff6d8"),
      emissiveIntensity: 0,
    }),
    tailLens: std("#a3150f", 0.3, 0.1, {
      emissive: new THREE.Color("#ff2a1a"),
      emissiveIntensity: 0,
    }),
    amberLens: std("#d8860b", 0.3, 0.1, {
      emissive: new THREE.Color("#ffa21a"),
      emissiveIntensity: 0,
    }),
    fabric: std("#f4f3ee", 0.95, 0.0),
    fabricNavy: std("#19296c", 0.9, 0.0),
    mirror: std("#cfd6da", 0.05, 1.0),
  };

  const truck = new THREE.Group();
  const chassis = new THREE.Group(); // everything above the springs: bobs a little when riding
  truck.add(chassis);
  scene.add(truck);

  function mesh(
    geo: THREE.BufferGeometry,
    mat: Mat,
    parent: THREE.Object3D = truck,
    pos?: Vec3,
    rot?: Vec3,
  ) {
    const m = new THREE.Mesh(geo, mat);
    if (pos) m.position.set(pos[0], pos[1], pos[2]);
    if (rot) m.rotation.set(rot[0], rot[1], rot[2]);
    parent.add(m);
    return m;
  }
  function rbox(
    w: number,
    h: number,
    d: number,
    r: number,
    mat: Mat,
    parent: THREE.Object3D,
    pos?: Vec3,
    rot?: Vec3,
  ) {
    return mesh(
      new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2) * 0.999),
      mat,
      parent,
      pos,
      rot,
    );
  }
  function tube(points: Vec3[], radius: number, mat: Mat, parent: THREE.Object3D) {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => V(p[0], p[1], p[2])),
      false,
      "centripetal",
    );
    return mesh(
      new THREE.TubeGeometry(curve, Math.max(24, points.length * 14), radius, 12, false),
      mat,
      parent,
    );
  }
  function rod(a: Vec3, b: Vec3, r: number, mat: Mat, parent: THREE.Object3D, segs = 16) {
    const va = V(a[0], a[1], a[2]);
    const vb = V(b[0], b[1], b[2]);
    const m = mesh(new THREE.CylinderGeometry(r, r, va.distanceTo(vb), segs), mat, parent);
    m.position.copy(va).add(vb).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(V(0, 1, 0), vb.clone().sub(va).normalize());
    return m;
  }
  function helix(
    a: Vec3,
    b: Vec3,
    radius: number,
    turns: number,
    wire: number,
    mat: Mat,
    parent: THREE.Object3D,
  ) {
    const va = V(a[0], a[1], a[2]);
    const axis = V(b[0], b[1], b[2]).sub(va);
    const len = axis.length();
    axis.normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), axis);
    const pts: THREE.Vector3[] = [];
    const n = turns * 24;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const ang = t * turns * Math.PI * 2;
      pts.push(
        V(Math.cos(ang) * radius, t * len, Math.sin(ang) * radius)
          .applyQuaternion(q)
          .add(va),
      );
    }
    return mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n * 2, wire, 8, false),
      mat,
      parent,
    );
  }

  // ---------- Canvas textures ----------
  const paths = {
    mark: new Path2D(LOGO.mark),
    e: new Path2D(LOGO.e),
    g: new Path2D(LOGO.g),
  };
  type Ctx = CanvasRenderingContext2D;
  function drawLogo(
    ctx: Ctx,
    x: number,
    y: number,
    scale: number,
    markColor: string,
    letterColor: string,
    markOnly = false,
  ) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = markColor;
    ctx.fill(paths.mark, "evenodd");
    if (!markOnly) {
      ctx.fillStyle = letterColor;
      ctx.fill(paths.e);
      ctx.fill(paths.g);
    }
    ctx.restore();
  }
  function spaced(ctx: Ctx, text: string, cx: number, y: number, spacing: number) {
    const chars = Array.from(text);
    const widths = chars.map((c) => ctx.measureText(c).width);
    const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
    let x = cx - total / 2;
    const align = ctx.textAlign;
    ctx.textAlign = "left";
    chars.forEach((c, i) => {
      ctx.fillText(c, x, y);
      x += widths[i] + spacing;
    });
    ctx.textAlign = align;
    return total;
  }
  function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function panelGround(ctx: Ctx, W: number, H: number, liv: Livery) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, liv.box);
    g.addColorStop(1, liv.deep);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 3;
    for (let i = 1; i < 4; i++) {
      const x = (W / 4) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H * 0.74);
      ctx.stroke();
    }
  }
  function drawSide(ctx: Ctx, W: number, H: number, liv: Livery) {
    panelGround(ctx, W, H, liv);
    const s = 7.4;
    drawLogo(ctx, (W - LOGO.w * s) / 2, 150, s, GOLD, "#ffffff");
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "center";
    ctx.font = `700 60px ${BODY}`;
    const tw = spaced(ctx, "LAUNDRY PICKUP  ·  DELIVERY", W / 2, 715, 9);
    ctx.fillStyle = GOLD;
    ctx.fillRect(W / 2 - tw / 2, 760, tw, 5);
    const bandY = H * 0.74;
    ctx.fillStyle = liv.deep;
    ctx.fillRect(0, bandY, W, H - bandY);
    ctx.fillStyle = GOLD;
    ctx.fillRect(0, bandY, W, 8);
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 92px ${DISPLAY}`;
    const txt = "Laundry, sorted";
    ctx.fillText(txt, 96, bandY + 180);
    ctx.fillStyle = GOLD;
    ctx.fillText(".", 96 + ctx.measureText(txt).width, bandY + 180);
    const pw = 560;
    const ph = 150;
    const px = W - 96 - pw;
    const py = bandY + 80;
    roundRect(ctx, px, py, pw, ph, 28);
    ctx.lineWidth = 5;
    ctx.strokeStyle = GOLD;
    ctx.stroke();
    drawLogo(ctx, px + 34, py + 30, 1.6, GOLD, GOLD, true);
    ctx.fillStyle = "#ffffff";
    ctx.font = `600 30px ${BODY}`;
    ctx.fillText("Get the PEG app", px + 116, py + 66);
    ctx.fillStyle = GOLD;
    ctx.font = `700 40px ${BODY}`;
    ctx.fillText(SITE, px + 116, py + 114);
  }
  function drawDoors(ctx: Ctx, W: number, H: number, liv: Livery) {
    panelGround(ctx, W, H, liv);
    const half = W / 2;
    const ms = 7.2;
    drawLogo(ctx, half / 2 - (37 * ms) / 2, 170, ms, GOLD, "#fff", true);
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = `800 84px ${DISPLAY}`;
    ctx.fillText("Laundry,", half / 2, 760);
    const w2 = ctx.measureText("sorted").width;
    ctx.fillText("sorted", half / 2 - 14, 860);
    ctx.fillStyle = GOLD;
    ctx.textAlign = "left";
    ctx.fillText(".", half / 2 - 14 + w2 / 2, 860);
    const cx = half + half / 2;
    ctx.textAlign = "center";
    ctx.fillStyle = GOLD;
    ctx.font = `700 32px ${BODY}`;
    spaced(ctx, "BOOK A PICKUP", cx, 250, 7);
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 46px ${BODY}`;
    ctx.fillText(CONTACT_PHONE, cx, 350);
    ctx.font = `600 44px ${BODY}`;
    ctx.fillText(SITE, cx, 430);
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillRect(cx - 200, 490, 400, 3);
    const pw = 460;
    const ph = 128;
    const px = cx - pw / 2;
    const py = 560;
    roundRect(ctx, px, py, pw, ph, 24);
    ctx.lineWidth = 5;
    ctx.strokeStyle = GOLD;
    ctx.stroke();
    drawLogo(ctx, px + 30, py + 26, 1.35, GOLD, GOLD, true);
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = `600 26px ${BODY}`;
    ctx.fillText("Download", px + 104, py + 56);
    ctx.font = `800 40px ${DISPLAY}`;
    ctx.fillText("the PEG app", px + 104, py + 100);
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = `500 30px ${BODY}`;
    ctx.fillText("Laundry pickup in Ghana", cx, 820);
    const bandY = H * 0.88;
    ctx.fillStyle = liv.deep;
    ctx.fillRect(0, bandY, W, H - bandY);
    ctx.fillStyle = GOLD;
    ctx.fillRect(0, bandY, W, 8);
  }
  function drawFront(ctx: Ctx, W: number, H: number, liv: Livery) {
    panelGround(ctx, W, H, liv);
    const s = 9;
    drawLogo(ctx, W / 2 - (37 * s) / 2, H / 2 - (57 * s) / 2 - 40, s, GOLD, "#fff", true);
  }
  function drawRoof(ctx: Ctx, W: number, H: number, liv: Livery) {
    ctx.fillStyle = liv.box;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 4;
    for (let i = 1; i < 8; i++) {
      const x = (W / 8) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    const s = 9;
    drawLogo(ctx, (W - LOGO.w * s) / 2, (H - LOGO.h * s) / 2, s, GOLD, "#ffffff");
  }
  function drawDecal(ctx: Ctx, W: number, H: number) {
    ctx.clearRect(0, 0, W, H);
    const s = H / 64;
    drawLogo(ctx, W / 2 - (37 * s) / 2, (H - 57 * s) / 2, s, GOLD, GOLD, true);
  }
  function drawPlate(ctx: Ctx, W: number, H: number) {
    ctx.fillStyle = "#f4f4ef";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 10;
    ctx.strokeRect(8, 8, W - 16, H - 16);
    ctx.fillStyle = "#111";
    ctx.textAlign = "center";
    ctx.font = `700 92px ${BODY}`;
    ctx.fillText("M-25-GR", W / 2, 128);
    ctx.fillText("7731", W / 2, 236);
  }

  type Painter = (ctx: Ctx, W: number, H: number, liv: Livery) => void;
  const painted: { tex: THREE.CanvasTexture; ctx: Ctx; draw: Painter }[] = [];
  function canvasTexture(w: number, h: number, draw: Painter) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    painted.push({ tex, ctx: c.getContext("2d") as Ctx, draw });
    return tex;
  }
  const TEX = {
    side: canvasTexture(2048, 1332, drawSide),
    doors: canvasTexture(1280, 1280, drawDoors),
    front: canvasTexture(1024, 1024, drawFront),
    roof: canvasTexture(2048, 1332, drawRoof),
    decal: canvasTexture(256, 256, drawDecal),
    plate: canvasTexture(512, 270, drawPlate),
  };
  const extraTex: THREE.Texture[] = [];
  let livery: Livery = LIVERIES[0];
  function paintTextures() {
    painted.forEach(({ tex, ctx, draw }) => {
      draw(ctx, ctx.canvas.width, ctx.canvas.height, livery);
      tex.needsUpdate = true;
    });
    extraTex.forEach((t) => (t.needsUpdate = true));
  }

  // ---------- Vehicle ----------
  const partGroups = {} as Record<PartId, THREE.Group>;
  (["box", "doors", "rail", "cockpit", "engine", "fork", "axle"] as PartId[]).forEach((k) => {
    partGroups[k] = new THREE.Group();
    partGroups[k].name = k;
  });
  chassis.add(
    partGroups.box,
    partGroups.doors,
    partGroups.rail,
    partGroups.cockpit,
    partGroups.engine,
    partGroups.fork,
  );
  truck.add(partGroups.axle);

  const WHEEL_R = 0.285;
  const wheels: THREE.Group[] = [];
  const lugGeo = new THREE.BoxGeometry(0.05, 0.022, 0.13);
  function wheel(pos: Vec3, flip: number) {
    const w = new THREE.Group();
    w.position.set(pos[0], pos[1], pos[2]);
    mesh(new THREE.TorusGeometry(WHEEL_R - 0.07, 0.07, 20, 56), M.rubber, w).scale.set(1, 1, 0.92);
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2;
      mesh(
        lugGeo,
        M.rubber,
        w,
        [Math.cos(a) * (WHEEL_R - 0.005), Math.sin(a) * (WHEEL_R - 0.005), i % 2 ? 0.012 : -0.012],
        [0, 0, a + Math.PI / 2],
      );
    }
    mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.1, 40, 1, true),
      M.rim,
      w,
      [0, 0, 0],
      [Math.PI / 2, 0, 0],
    );
    mesh(
      new THREE.CylinderGeometry(0.155, 0.155, 0.012, 40),
      M.rim,
      w,
      [0, 0, flip * 0.02],
      [Math.PI / 2, 0, 0],
    );
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      mesh(
        new THREE.CylinderGeometry(0.028, 0.028, 0.016, 16),
        M.rubber,
        w,
        [Math.cos(a) * 0.1, Math.sin(a) * 0.1, flip * 0.022],
        [Math.PI / 2, 0, 0],
      );
    }
    mesh(
      new THREE.CylinderGeometry(0.07, 0.08, 0.06, 28),
      M.alloy,
      w,
      [0, 0, flip * 0.05],
      [Math.PI / 2, 0, 0],
    );
    mesh(
      new THREE.CylinderGeometry(0.034, 0.034, 0.02, 20),
      M.gold,
      w,
      [0, 0, flip * 0.082],
      [Math.PI / 2, 0, 0],
    );
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.5;
      mesh(
        new THREE.CylinderGeometry(0.008, 0.008, 0.02, 8),
        M.chrome,
        w,
        [Math.cos(a) * 0.05, Math.sin(a) * 0.05, flip * 0.085],
        [Math.PI / 2, 0, 0],
      );
    }
    wheels.push(w);
    return w;
  }

  const AX = V(1.34, WHEEL_R, 0); // front axle
  const HT = V(1.06, 1.08, 0); // top of the steering head
  const FD = HT.clone().sub(AX).normalize(); // fork direction
  const along = (t: number) => AX.clone().add(FD.clone().multiplyScalar(t));
  const forkLen = HT.distanceTo(AX);

  // --- Front fork (steers) ---
  const fork = partGroups.fork;
  fork.add(wheel([AX.x, AX.y, 0], 1));
  [-0.095, 0.095].forEach((z) => {
    const a = along(0);
    const b = along(0.36);
    const c = along(forkLen);
    rod([a.x, a.y, z], [b.x, b.y, z], 0.03, M.alloy, fork);
    rod([b.x - 0.01, b.y, z], [c.x, c.y, z], 0.021, M.chrome, fork);
    const s0 = along(0.38);
    const s1 = along(0.66);
    helix([s0.x, s0.y, z], [s1.x, s1.y, z], 0.034, 9, 0.0075, M.gold, fork);
    [0.37, 0.67].forEach((t) => {
      const p = along(t);
      rod([p.x, p.y, z], [p.x + FD.x * 0.02, p.y + FD.y * 0.02, z], 0.04, M.darkMetal, fork);
    });
  });
  rod([AX.x, AX.y, -0.13], [AX.x, AX.y, 0.13], 0.014, M.chrome, fork);
  [0.69, 0.98].forEach((t) => {
    const p = along(forkLen * t);
    rbox(0.09, 0.035, 0.27, 0.012, M.darkMetal, fork, [p.x, p.y, 0]).rotation.z = -Math.atan2(
      FD.x,
      FD.y,
    );
  });
  mesh(
    new THREE.CylinderGeometry(
      WHEEL_R + 0.045,
      WHEEL_R + 0.045,
      0.15,
      36,
      1,
      true,
      Math.PI - 1.15,
      1.85,
    ),
    M.paint,
    fork,
    [AX.x, AX.y, 0],
    [Math.PI / 2, 0, 0],
  );
  const hl = along(forkLen * 0.8).add(V(0.11, 0, 0));
  rbox(0.16, 0.2, 0.26, 0.06, M.paint, fork, [hl.x - 0.03, hl.y, 0]).rotation.z = -0.25;
  mesh(
    new THREE.CylinderGeometry(0.085, 0.075, 0.08, 32),
    M.chrome,
    fork,
    [hl.x + 0.06, hl.y + 0.01, 0],
    [0, 0, -Math.PI / 2],
  );
  mesh(
    new THREE.CircleGeometry(0.074, 32),
    M.headLens,
    fork,
    [hl.x + 0.101, hl.y + 0.01, 0],
    [0, Math.PI / 2, 0],
  );
  [-0.15, 0.15].forEach((z) => {
    mesh(new THREE.SphereGeometry(0.028, 16, 12), M.amberLens, fork, [hl.x + 0.02, hl.y - 0.07, z]);
    rod(
      [hl.x - 0.03, hl.y - 0.07, z * 0.6],
      [hl.x + 0.01, hl.y - 0.07, z * 0.95],
      0.007,
      M.darkMetal,
      fork,
    );
  });
  const gauge = mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.035, 28),
    M.darkMetal,
    fork,
    [HT.x - 0.02, HT.y + 0.07, 0],
    [0, 0, 0.5],
  );
  mesh(
    new THREE.CircleGeometry(0.042, 28),
    std("#f4f1e6", 0.3, 0),
    gauge,
    [0, 0.0181, 0],
    [-Math.PI / 2, 0, 0],
  );
  const hb = HT.clone().add(V(-0.02, 0.06, 0));
  tube(
    [
      [hb.x - 0.17, hb.y + 0.09, -0.4],
      [hb.x - 0.08, hb.y + 0.07, -0.26],
      [hb.x, hb.y + 0.03, -0.1],
      [hb.x + 0.01, hb.y + 0.02, 0],
      [hb.x, hb.y + 0.03, 0.1],
      [hb.x - 0.08, hb.y + 0.07, 0.26],
      [hb.x - 0.17, hb.y + 0.09, 0.4],
    ],
    0.013,
    M.chrome,
    fork,
  );
  [-1, 1].forEach((s) => {
    rod(
      [hb.x - 0.165, hb.y + 0.09, s * 0.38],
      [hb.x - 0.19, hb.y + 0.095, s * 0.52],
      0.019,
      M.rubber,
      fork,
    );
    rbox(0.07, 0.05, 0.06, 0.012, M.darkMetal, fork, [hb.x - 0.15, hb.y + 0.085, s * 0.33]);
    tube(
      [
        [hb.x - 0.13, hb.y + 0.085, s * 0.34],
        [hb.x - 0.08, hb.y + 0.07, s * 0.42],
        [hb.x - 0.1, hb.y + 0.06, s * 0.5],
      ],
      0.006,
      M.alloy,
      fork,
    );
    tube(
      [
        [hb.x - 0.11, hb.y + 0.09, s * 0.27],
        [hb.x - 0.12, hb.y + 0.24, s * 0.3],
        [hb.x - 0.1, hb.y + 0.36, s * 0.35],
      ],
      0.007,
      M.chrome,
      fork,
    );
    mesh(new THREE.SphereGeometry(0.06, 24, 16), M.paint, fork, [
      hb.x - 0.1,
      hb.y + 0.4,
      s * 0.37,
    ]).scale.set(0.35, 0.75, 1.15);
    mesh(
      new THREE.CircleGeometry(0.055, 24),
      M.mirror,
      fork,
      [hb.x - 0.122, hb.y + 0.4, s * 0.37],
      [0, -Math.PI / 2, 0],
    ).scale.set(1.12, 0.72, 1);
  });

  // --- Rider cockpit: frame, tank, seat, footboards, canopy ---
  const cp = partGroups.cockpit;
  [-0.09, 0.09].forEach((z) => {
    tube(
      [
        [HT.x - 0.02, HT.y - 0.02, z * 0.4],
        [0.88, 0.94, z],
        [0.55, 0.8, z * 1.4],
        [0.18, 0.74, z * 1.6],
        [0.08, 0.62, z * 1.8],
      ],
      0.024,
      M.frame,
      cp,
    );
    tube(
      [
        [HT.x - 0.04, HT.y - 0.18, z * 0.4],
        [0.95, 0.62, z * 1.1],
        [0.82, 0.32, z * 1.5],
        [0.4, 0.26, z * 1.8],
        [0.16, 0.32, z * 2.2],
        [0.08, 0.52, z * 2.4],
      ],
      0.024,
      M.frame,
      cp,
    );
  });
  rod([HT.x, HT.y - 0.22, 0], [HT.x - 0.02 + FD.x * 0.02, HT.y + 0.02, 0], 0.04, M.frame, cp);
  const tank = mesh(new THREE.SphereGeometry(0.2, 40, 28), M.paint, cp, [0.9, 0.97, 0]);
  tank.scale.set(1.05, 0.6, 0.78);
  tank.rotation.z = -0.12;
  mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 24), M.chrome, cp, [0.92, 1.09, 0]);
  mesh(
    new THREE.CapsuleGeometry(0.15, 0.3, 10, 24),
    M.seat,
    cp,
    [0.37, 0.9, 0],
    [0, 0, Math.PI / 2],
  ).scale.set(0.42, 1, 1);
  rbox(0.5, 0.05, 0.26, 0.02, M.frame, cp, [0.38, 0.83, 0]);
  const decalMat = new THREE.MeshStandardMaterial({
    map: TEX.decal,
    transparent: true,
    roughness: 0.4,
    metalness: 0.3,
  });
  [-1, 1].forEach((s) => {
    rbox(0.42, 0.2, 0.05, 0.03, M.paint, cp, [0.42, 0.7, s * 0.14]);
    mesh(
      new THREE.PlaneGeometry(0.13, 0.13),
      decalMat,
      cp,
      [0.44, 0.7, s * 0.166],
      [0, s > 0 ? 0 : Math.PI, 0],
    );
    rbox(0.32, 0.03, 0.17, 0.012, M.rubber, cp, [0.66, 0.36, s * 0.27]);
    rod([0.66, 0.34, s * 0.14], [0.66, 0.34, s * 0.2], 0.012, M.frame, cp);
  });
  tube(
    [
      [0.13, 0.62, -0.6],
      [0.13, 1.16, -0.58],
      [0.13, 1.22, 0],
      [0.13, 1.16, 0.58],
      [0.13, 0.62, 0.6],
    ],
    0.018,
    M.frame,
    cp,
  );
  const canopy = new THREE.Group();
  cp.add(canopy);
  rbox(0.98, 0.04, 1.28, 0.018, M.paint, canopy, [0.5, 1.985, 0]);
  rod([1.0, 1.985, -0.64], [1.0, 1.985, 0.64], 0.02, M.boxEdge, canopy);
  [-1, 1].forEach((s) => {
    rod([0.02, 1.985, s * 0.64], [1.0, 1.985, s * 0.64], 0.02, M.boxEdge, canopy);
    tube(
      [
        [0.96, 1.97, s * 0.62],
        [0.95, 1.6, s * 0.61],
        [0.92, 1.05, s * 0.57],
        [0.84, 0.6, s * 0.42],
        [0.72, 0.4, s * 0.3],
      ],
      0.02,
      M.frame,
      canopy,
    );
  });

  // --- Engine & drive ---
  const en = partGroups.engine;
  rbox(0.34, 0.24, 0.24, 0.05, M.alloy, en, [0.66, 0.42, 0]);
  const cyl = new THREE.Group();
  cyl.position.set(0.84, 0.52, 0);
  cyl.rotation.z = -0.55;
  en.add(cyl);
  mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.24, 24), M.darkMetal, cyl, [0, 0.1, 0]);
  for (let i = 0; i < 7; i++) rbox(0.17, 0.014, 0.17, 0.006, M.alloy, cyl, [0, i * 0.03, 0]);
  rbox(0.18, 0.07, 0.18, 0.02, M.alloy, cyl, [0, 0.235, 0]);
  [-1, 1].forEach((s) =>
    mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.04, 32),
      M.chrome,
      en,
      [0.62, 0.42, s * 0.135],
      [Math.PI / 2, 0, 0],
    ),
  );
  rbox(0.12, 0.08, 0.1, 0.02, M.frame, en, [0.47, 0.6, -0.05]);
  rod([0.55, 0.6, -0.04], [0.68, 0.62, -0.02], 0.022, M.darkMetal, en);
  tube(
    [
      [0.52, 0.45, 0.16],
      [0.47, 0.4, 0.2],
      [0.38, 0.38, 0.22],
    ],
    0.012,
    M.chrome,
    en,
  );
  tube(
    [
      [0.93, 0.58, 0.04],
      [1.02, 0.42, 0.08],
      [0.94, 0.26, 0.16],
      [0.6, 0.23, 0.22],
      [0.2, 0.26, 0.26],
      [0.0, 0.3, 0.28],
    ],
    0.022,
    M.chrome,
    en,
  );
  rod([0.02, 0.3, 0.28], [-0.5, 0.36, 0.3], 0.058, M.chrome, en, 28);
  rod([-0.18, 0.33, 0.28], [-0.42, 0.36, 0.3], 0.064, M.frame, en, 28);
  rod([-0.5, 0.36, 0.3], [-0.58, 0.37, 0.3], 0.03, M.darkMetal, en);
  rod([0.5, 0.36, 0], [-0.83, 0.3, 0], 0.025, M.darkMetal, en);
  rod([0.5, 0.36, 0], [0.42, 0.37, 0], 0.04, M.alloy, en);

  // --- Rear axle, springs, rear wheels (unsprung) ---
  const ax = partGroups.axle;
  const RX = -0.95;
  ax.add(wheel([RX, WHEEL_R, -0.58], -1), wheel([RX, WHEEL_R, 0.58], 1));
  rod([RX, WHEEL_R, -0.52], [RX, WHEEL_R, 0.52], 0.04, M.darkMetal, ax);
  mesh(new THREE.SphereGeometry(0.12, 32, 24), M.darkMetal, ax, [RX, WHEEL_R, 0]).scale.set(
    1,
    1,
    0.75,
  );
  mesh(
    new THREE.CylinderGeometry(0.05, 0.07, 0.1, 24),
    M.darkMetal,
    ax,
    [RX + 0.12, WHEEL_R + 0.01, 0],
    [0, 0, Math.PI / 2],
  );
  [-0.42, 0.42].forEach((z) => {
    for (let i = 0; i < 4; i++) {
      const geo = new THREE.BoxGeometry(0.9 - i * 0.15, 0.012, 0.06);
      const pos = geo.attributes.position;
      for (let k = 0; k < pos.count; k++)
        pos.setY(k, pos.getY(k) + pos.getX(k) * pos.getX(k) * 0.28);
      geo.computeVertexNormals();
      mesh(geo, M.frame, ax, [RX, WHEEL_R + 0.07 - i * 0.016, z]);
    }
    rbox(0.08, 0.06, 0.08, 0.01, M.darkMetal, ax, [RX, WHEEL_R + 0.03, z]);
    [-0.03, 0.03].forEach((dx) =>
      rod([RX + dx, WHEEL_R - 0.05, z], [RX + dx, WHEEL_R + 0.1, z], 0.007, M.chrome, ax),
    );
  });

  // --- Cargo bed + box ---
  const bx = partGroups.box;
  const X0 = -1.96;
  const X1 = 0.06;
  const Y0 = 0.66;
  const Y1 = 1.96;
  const ZW = 0.66;
  const T = 0.028;
  const L = X1 - X0;
  const H = Y1 - Y0;
  [-0.42, 0.42].forEach((z) =>
    rbox(L + 0.12, 0.08, 0.06, 0.01, M.frame, bx, [(X0 + X1) / 2 + 0.04, 0.53, z]),
  );
  [-1.9, -1.4, -0.95, -0.5, 0.0].forEach((x) =>
    rbox(0.05, 0.06, 0.9, 0.01, M.frame, bx, [x, 0.55, 0]),
  );
  rbox(L + 0.04, 0.06, ZW * 2 + 0.04, 0.01, M.frame, bx, [(X0 + X1) / 2, 0.61, 0]);
  [-0.42, 0.42].forEach((z) => {
    rod([RX - 0.45, 0.5, z], [RX - 0.45, WHEEL_R + 0.13, z], 0.015, M.frame, bx);
    rod([RX + 0.45, 0.5, z], [RX + 0.45, WHEEL_R + 0.13, z], 0.015, M.frame, bx);
  });
  const fenderMat = M.frame.clone();
  fenderMat.side = THREE.DoubleSide;
  [-0.58, 0.58].forEach((z) =>
    mesh(
      new THREE.CylinderGeometry(
        WHEEL_R + 0.05,
        WHEEL_R + 0.05,
        0.16,
        32,
        1,
        true,
        Math.PI - 0.95,
        1.9,
      ),
      fenderMat,
      bx,
      [RX, WHEEL_R, z],
      [Math.PI / 2, 0, 0],
    ),
  );

  const physical = (map: THREE.Texture) =>
    new THREE.MeshPhysicalMaterial({
      map,
      roughness: 0.4,
      metalness: 0.1,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
    });
  const sideMat = physical(TEX.side);
  const frontMat = physical(TEX.front);
  const roofMat = physical(TEX.roof);
  const doorTexL = TEX.doors.clone();
  doorTexL.repeat.set(0.5, 1);
  const doorTexR = TEX.doors.clone();
  doorTexR.repeat.set(0.5, 1);
  doorTexR.offset.set(0.5, 0);
  extraTex.push(doorTexL, doorTexR);
  const doorMatL = physical(doorTexL);
  const doorMatR = physical(doorTexR);
  const inner = M.interior;
  const boxGeo = (w: number, h: number, d: number) => new THREE.BoxGeometry(w, h, d);
  // BoxGeometry face order: +x, -x, +y, -y, +z, -z. The outward face carries the livery.
  mesh(boxGeo(L, H, T), [inner, inner, inner, inner, sideMat, inner], bx, [
    (X0 + X1) / 2,
    (Y0 + Y1) / 2,
    ZW - T / 2,
  ]);
  // The left wall has its own materials so it can fade for the "See inside" cutaway.
  const sideMatL = sideMat.clone();
  const innerL = inner.clone();
  const leftWall = mesh(boxGeo(L, H, T), [innerL, innerL, innerL, innerL, innerL, sideMatL], bx, [
    (X0 + X1) / 2,
    (Y0 + Y1) / 2,
    -ZW + T / 2,
  ]);
  mesh(boxGeo(L, T, ZW * 2), [inner, inner, roofMat, inner, inner, inner], bx, [
    (X0 + X1) / 2,
    Y1 - T / 2,
    0,
  ]);
  mesh(boxGeo(T, H, ZW * 2), [frontMat, inner, inner, inner, inner, inner], bx, [
    X1 - T / 2,
    (Y0 + Y1) / 2,
    0,
  ]);
  mesh(boxGeo(L, 0.02, ZW * 2), M.interiorDark, bx, [(X0 + X1) / 2, Y0 + 0.01, 0]);
  const E = 0.026;
  const ex = [X0 - 0.002, X1 + 0.002];
  const ey = [Y0, Y1 + 0.002];
  const ez = [-ZW - 0.002, ZW + 0.002];
  ey.forEach((y) =>
    ez.forEach((z) => rbox(L + E * 2, E * 2, E * 2, 0.008, M.boxEdge, bx, [(X0 + X1) / 2, y, z])),
  );
  ex.forEach((x) =>
    ez.forEach((z) => rbox(E * 2, H + E * 2, E * 2, 0.008, M.boxEdge, bx, [x, (Y0 + Y1) / 2, z])),
  );
  ex.forEach((x) =>
    ey.forEach((y) => rbox(E * 2, E * 2, ZW * 2 + E * 2, 0.008, M.boxEdge, bx, [x, y, 0])),
  );
  [-0.5, 0, 0.5].forEach((z) =>
    mesh(new THREE.BoxGeometry(0.03, 0.03, 0.08), M.amberLens, bx, [X1 + 0.03, Y1 - 0.03, z]),
  );
  rod([X0 - 0.07, 0.5, -0.6], [X0 - 0.07, 0.5, 0.6], 0.022, M.boxEdge, bx);
  [-0.45, 0.45].forEach((z) => rod([X0 - 0.07, 0.5, z], [X0 + 0.05, 0.53, z], 0.016, M.frame, bx));
  [-1, 1].forEach((s) => {
    rbox(0.04, 0.07, 0.18, 0.01, M.frame, bx, [X0 - 0.02, 0.6, s * 0.5]);
    mesh(new THREE.BoxGeometry(0.012, 0.05, 0.1), M.tailLens, bx, [X0 - 0.045, 0.6, s * 0.52]);
    mesh(new THREE.BoxGeometry(0.012, 0.05, 0.05), M.amberLens, bx, [X0 - 0.045, 0.6, s * 0.43]);
  });
  const plateMat = new THREE.MeshStandardMaterial({
    map: TEX.plate,
    roughness: 0.5,
    metalness: 0.1,
  });
  mesh(
    new THREE.BoxGeometry(0.01, 0.12, 0.23),
    [M.frame, plateMat, M.frame, M.frame, M.frame, M.frame],
    bx,
    [X0 - 0.03, 0.42, 0],
  );
  rod([X0 - 0.025, 0.48, 0], [X0 + 0.02, 0.56, 0], 0.01, M.frame, bx);

  // --- Rear doors ---
  const doorW = ZW - 0.008;
  const doorH = H - 0.02;
  const doors: { pivot: THREE.Group; side: number }[] = [];
  [-1, 1].forEach((s) => {
    const pivot = new THREE.Group();
    pivot.position.set(X0 - T / 2, (Y0 + Y1) / 2, s * ZW);
    partGroups.doors.add(pivot);
    mesh(
      boxGeo(T, doorH, doorW),
      [inner, s < 0 ? doorMatL : doorMatR, inner, inner, inner, inner],
      pivot,
      [0, 0, (-s * doorW) / 2],
    );
    rod(
      [-T / 2 - 0.012, -doorH / 2 + 0.05, -s * (doorW - 0.045)],
      [-T / 2 - 0.012, doorH / 2 - 0.05, -s * (doorW - 0.045)],
      0.008,
      M.chrome,
      pivot,
    );
    rbox(0.02, 0.16, 0.035, 0.008, M.chrome, pivot, [-T / 2 - 0.022, -0.12, -s * (doorW - 0.085)]);
    [-0.45, 0, 0.45].forEach((y) =>
      mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.08, 12), M.chrome, pivot, [
        -T / 2 - 0.01,
        y,
        -s * 0.012,
      ]),
    );
    doors.push({ pivot, side: s });
  });

  // --- Floor load: folded orders and bags on the left, a basket at the front right ---
  const load = new THREE.Group();
  bx.add(load);
  const tagMat = new THREE.MeshStandardMaterial({
    map: TEX.decal,
    transparent: true,
  });
  function parcelStack(x: number, z: number, n: number) {
    for (let i = 0; i < n; i++)
      rbox(0.34, 0.09, 0.26, 0.02, i % 2 ? M.fabricNavy : M.fabric, load, [
        x,
        Y0 + 0.07 + i * 0.1,
        z,
      ]);
    rbox(0.05, n * 0.1 + 0.012, 0.272, 0.006, M.gold, load, [x, Y0 + 0.02 + (n * 0.1) / 2, z]);
    mesh(
      new THREE.PlaneGeometry(0.06, 0.06),
      tagMat,
      load,
      [x - 0.1, Y0 + 0.022 + n * 0.1, z],
      [-Math.PI / 2, 0, 0],
    );
  }
  parcelStack(-1.72, -0.38, 4);
  parcelStack(-1.72, -0.09, 3);
  parcelStack(-1.34, -0.4, 5);
  const bagProfile: THREE.Vector2[] = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const r = t < 0.85 ? 0.16 + Math.sin(t * Math.PI * 0.95) * 0.05 : 0.16 - (t - 0.85) * 0.75;
    bagProfile.push(new THREE.Vector2(Math.max(0.02, r), t * 0.62));
  }
  const bagGeo = new THREE.LatheGeometry(bagProfile, 28);
  [
    [-0.95, -0.36],
    [-0.56, -0.3],
    [-0.2, -0.36],
  ].forEach(([x, z], i) => {
    const b = mesh(bagGeo, M.fabric, load, [x, Y0 + 0.02, z]);
    b.rotation.y = i * 1.3;
    b.scale.set(1, 0.85 + (i % 3) * 0.1, 1);
    mesh(
      new THREE.TorusGeometry(0.06, 0.012, 8, 20),
      M.gold,
      load,
      [x, Y0 + 0.02 + 0.53 * b.scale.y, z],
      [Math.PI / 2, 0, 0],
    );
  });
  const basket = new THREE.Group();
  basket.position.set(-0.26, Y0 + 0.02, 0.33);
  load.add(basket);
  rbox(0.42, 0.3, 0.34, 0.03, std(GOLD, 0.6, 0), basket, [0, 0.15, 0]);
  rbox(0.38, 0.06, 0.3, 0.02, M.fabric, basket, [0, 0.31, 0]);

  // --- Garment rail fixed to the roof, with hanging clothes ---
  const rg = partGroups.rail;
  const RAIL_Y = Y1 - T - 0.09;
  const RAIL_Z = 0.33;
  const RAIL_X0 = -1.88;
  const RAIL_X1 = -0.5;
  rod([RAIL_X0, RAIL_Y, RAIL_Z], [RAIL_X1, RAIL_Y, RAIL_Z], 0.013, M.chrome, rg);
  [RAIL_X0 + 0.04, (RAIL_X0 + RAIL_X1) / 2, RAIL_X1 - 0.04].forEach((x) => {
    rod([x, RAIL_Y, RAIL_Z], [x, Y1 - T, RAIL_Z], 0.009, M.chrome, rg);
    rbox(0.07, 0.012, 0.07, 0.004, M.chrome, rg, [x, Y1 - T - 0.006, RAIL_Z]);
  });
  [RAIL_X0, RAIL_X1].forEach((x) =>
    mesh(new THREE.SphereGeometry(0.018, 16, 12), M.chrome, rg, [x, RAIL_Y, RAIL_Z]),
  );

  function patternTexture(w: number, h: number, draw: (ctx: Ctx, W: number, H: number) => void) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    draw(c.getContext("2d") as Ctx, w, h);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }
  // Kente-style strip weave: blocks of warp and weft stripes.
  function kente(colors: [string, string, string, string]) {
    const t = patternTexture(256, 256, (x, _W, H) => {
      const cell = 64;
      for (let r = 0; r < 4; r++)
        for (let c = 0; c < 4; c++) {
          const ox = c * cell;
          const oy = r * cell;
          x.fillStyle = colors[0];
          x.fillRect(ox, oy, cell, cell);
          if ((r + c) % 2 === 0) {
            for (let i = 0; i < 8; i++) {
              x.fillStyle = colors[1 + (i % 3)];
              x.fillRect(ox, oy + i * 8, cell, 4);
            }
          } else {
            x.fillStyle = colors[1];
            x.fillRect(ox + 10, oy, 10, cell);
            x.fillRect(ox + 44, oy, 10, cell);
            x.fillStyle = colors[2];
            x.fillRect(ox + 26, oy + 8, 12, cell - 16);
            x.fillStyle = colors[3];
            x.fillRect(ox, oy + 28, cell, 8);
          }
        }
      x.fillStyle = colors[3];
      for (let c = 0; c <= 4; c++) x.fillRect(c * cell - 2, 0, 4, H);
    });
    t.repeat.set(4, 4);
    return t;
  }
  // Cream kaftan with gold embroidery round the neck and down the chest.
  const embroidered = patternTexture(512, 640, (x, W, H) => {
    x.fillStyle = "#f1ece0";
    x.fillRect(0, 0, W, H);
    x.strokeStyle = "#c99a22";
    x.lineWidth = 7;
    x.lineCap = "round";
    for (let k = 0; k < 3; k++) {
      x.beginPath();
      x.moveTo(W / 2 - 70 - k * 14, 0);
      x.quadraticCurveTo(W / 2, 110 + k * 16, W / 2 + 70 + k * 14, 0);
      x.stroke();
    }
    for (let y = 120; y < 330; y += 26) {
      x.beginPath();
      x.arc(W / 2 - 14, y, 8, 0, Math.PI * 2);
      x.arc(W / 2 + 14, y + 13, 8, 0, Math.PI * 2);
      x.stroke();
    }
  });
  embroidered.repeat.set(1 / 0.8, 1);
  embroidered.offset.set(0.5, 1);

  const fab = (p: THREE.MeshStandardMaterialParameters) =>
    new THREE.MeshStandardMaterial({
      roughness: 0.92,
      metalness: 0,
      side: THREE.DoubleSide,
      ...p,
    });
  const bagMat = (color: string) =>
    new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.45,
      metalness: 0,
      clearcoat: 0.4,
      side: THREE.DoubleSide,
    });
  const CLOTH = {
    white: fab({ color: "#f6f6f2" }),
    sky: fab({ color: "#c9dcf0" }),
    stone: fab({ color: "#e6dcc7" }),
    kenteGold: fab({
      map: kente(["#e2ad22", "#0b6e3a", "#b3261e", "#141414"]),
    }),
    kenteNavy: fab({
      map: kente(["#19296c", "#e2ad22", "#0b5c46", "#f1ece0"]),
    }),
    embroidered: fab({ map: embroidered }),
    bagNavy: bagMat("#141c45"),
    bagOnyx: bagMat("#1c1d1e"),
    hanger: std("#3b2a1c", 0.6, 0),
  };

  // Silhouettes in metres, origin at the shoulder line, hanging downwards.
  function shirtShape() {
    const s = new THREE.Shape();
    s.moveTo(-0.07, 0);
    s.lineTo(-0.2, -0.04);
    s.lineTo(-0.27, -0.24);
    s.lineTo(-0.2, -0.27);
    s.lineTo(-0.19, -0.22);
    s.lineTo(-0.2, -0.72);
    s.lineTo(0.2, -0.72);
    s.lineTo(0.19, -0.22);
    s.lineTo(0.2, -0.27);
    s.lineTo(0.27, -0.24);
    s.lineTo(0.2, -0.04);
    s.lineTo(0.07, 0);
    s.quadraticCurveTo(0, -0.07, -0.07, 0);
    return s;
  }
  function kaftanShape() {
    const s = new THREE.Shape();
    s.moveTo(-0.07, 0);
    s.lineTo(-0.22, -0.05);
    s.lineTo(-0.29, -0.4);
    s.lineTo(-0.22, -0.44);
    s.lineTo(-0.2, -0.36);
    s.lineTo(-0.25, -0.95);
    s.lineTo(0.25, -0.95);
    s.lineTo(0.2, -0.36);
    s.lineTo(0.22, -0.44);
    s.lineTo(0.29, -0.4);
    s.lineTo(0.22, -0.05);
    s.lineTo(0.07, 0);
    s.quadraticCurveTo(0, -0.08, -0.07, 0);
    return s;
  }
  function bagShape() {
    const s = new THREE.Shape();
    s.moveTo(-0.05, 0.01);
    s.lineTo(-0.22, -0.07);
    s.quadraticCurveTo(-0.25, -0.09, -0.25, -0.13);
    s.lineTo(-0.25, -0.9);
    s.quadraticCurveTo(-0.25, -0.94, -0.21, -0.94);
    s.lineTo(0.21, -0.94);
    s.quadraticCurveTo(0.25, -0.94, 0.25, -0.9);
    s.lineTo(0.25, -0.13);
    s.quadraticCurveTo(0.25, -0.09, 0.22, -0.07);
    s.lineTo(0.05, 0.01);
    s.closePath();
    return s;
  }
  const extrude = (shape: THREE.Shape, depth: number) => {
    const g = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.01,
      bevelSegments: 2,
      curveSegments: 10,
    });
    g.translate(0, 0, -depth / 2);
    return g;
  };
  const GARMENT = {
    shirt: extrude(shirtShape(), 0.022),
    kaftan: extrude(kaftanShape(), 0.02),
    bag: extrude(bagShape(), 0.07),
  };
  type GarmentKind = keyof typeof GARMENT;
  const hookGeo = new THREE.TorusGeometry(0.022, 0.0035, 6, 18, Math.PI * 1.25);
  const hangerGeo = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      V(-0.2, -0.035, 0),
      V(-0.1, 0, 0),
      V(0, 0.02, 0),
      V(0.1, 0, 0),
      V(0.2, -0.035, 0),
    ]),
    24,
    0.009,
    8,
    false,
  );
  const bagDecalMat = new THREE.MeshStandardMaterial({
    map: TEX.decal,
    transparent: true,
    roughness: 0.5,
  });
  const hangers: { pivot: THREE.Group; phase: number }[] = [];
  function hang(x: number, kind: GarmentKind, mat: THREE.Material, i: number) {
    const pivot = new THREE.Group();
    pivot.position.set(x, RAIL_Y, RAIL_Z);
    rg.add(pivot);
    // Garments hang across the rail, so their silhouette lies in the box's width.
    const g = new THREE.Group();
    g.rotation.y = Math.PI / 2 + (i % 2 ? 0.06 : -0.05);
    pivot.add(g);
    mesh(hookGeo, M.chrome, g, [0.004, 0, 0], [0, 0, -Math.PI * 0.12]);
    rod([0, -0.022, 0], [0, -0.07, 0], 0.0035, M.chrome, g, 6);
    const shoulder = -0.085;
    mesh(hangerGeo, CLOTH.hanger, g, [0, shoulder, 0]);
    mesh(GARMENT[kind], mat, g, [0, shoulder - 0.005, 0]);
    if (kind === "bag") {
      rbox(0.012, 0.8, 0.088, 0.004, M.gold, g, [0, shoulder - 0.52, 0]).scale.set(0.6, 1, 1);
      [1, -1].forEach((sd) =>
        mesh(
          new THREE.PlaneGeometry(0.16, 0.16),
          bagDecalMat,
          g,
          [-0.12, shoulder - 0.2, sd * 0.05],
          [0, sd > 0 ? 0 : Math.PI, 0],
        ),
      );
    } else {
      mesh(new THREE.PlaneGeometry(0.035, 0.035), tagMat, g, [0, shoulder - 0.06, 0.025]);
    }
    hangers.push({ pivot, phase: i * 0.9 });
  }
  const rack: [GarmentKind, THREE.Material][] = [
    ["bag", CLOTH.bagNavy],
    ["bag", CLOTH.bagOnyx],
    ["kaftan", CLOTH.kenteGold],
    ["shirt", CLOTH.white],
    ["kaftan", CLOTH.embroidered],
    ["shirt", CLOTH.sky],
    ["shirt", CLOTH.white],
    ["kaftan", CLOTH.kenteNavy],
    ["shirt", CLOTH.stone],
    ["shirt", CLOTH.sky],
    ["shirt", CLOTH.white],
  ];
  rack.forEach(([kind, mat], i) =>
    hang(-1.8 + i * 0.112 + (kind === "bag" ? 0 : 0.03), kind, mat, i),
  );

  // --- Lights ---
  const boxLight = new THREE.PointLight(0xfff2d6, 0, 2.6, 2);
  boxLight.position.set(-1.0, Y1 - 0.15, 0);
  bx.add(boxLight);
  const beam = new THREE.SpotLight(0xfff3d0, 0, 9, 0.45, 0.6, 1.4);
  beam.position.copy(hl).add(V(0.1, 0, 0));
  beam.target.position.set(hl.x + 4, 0, 0);
  fork.add(beam, beam.target);
  const tailGlow = new THREE.PointLight(0xff3020, 0, 1.4, 2);
  tailGlow.position.set(X0 - 0.2, 0.6, 0);
  bx.add(tailGlow);

  // Shadows, and a softer studio reflection so dark paint stays dark.
  truck.traverse((o) => {
    if (!(o instanceof THREE.Mesh)) return;
    o.castShadow = true;
    o.receiveShadow = true;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m: THREE.Material) => {
      if (m instanceof THREE.MeshStandardMaterial && !m.userData.envSet) {
        m.envMapIntensity = m.metalness > 0.6 ? 0.7 : 0.45;
        m.userData.envSet = true;
      }
    });
  });

  // ---------- Ground ----------
  const floorAlpha = patternTexture(256, 256, (x) => {
    const g = x.createRadialGradient(128, 128, 10, 128, 128, 128);
    g.addColorStop(0, "#fff");
    g.addColorStop(0.55, "#bbb");
    g.addColorStop(1, "#000");
    x.fillStyle = g;
    x.fillRect(0, 0, 256, 256);
  });
  floorAlpha.colorSpace = THREE.NoColorSpace;
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(4.6, 72),
    new THREE.MeshStandardMaterial({
      color: "#dcdcd6",
      roughness: 1,
      metalness: 0,
      alphaMap: floorAlpha,
      transparent: true,
      depthWrite: false,
      envMapIntensity: 0.25,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  const shadowFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 16),
    new THREE.ShadowMaterial({ opacity: 0.22 }),
  );
  shadowFloor.rotation.x = -Math.PI / 2;
  shadowFloor.position.y = 0.001;
  shadowFloor.receiveShadow = true;
  scene.add(shadowFloor);
  const road = new THREE.Group();
  scene.add(road);
  const dashMat = new THREE.MeshBasicMaterial({
    color: GOLD,
    transparent: true,
    opacity: 0,
  });
  const dashGeo = new THREE.PlaneGeometry(0.7, 0.06);
  const DASH_GAP = 1.5;
  const DASH_N = 10;
  [-1.15, 1.15].forEach((z) => {
    for (let i = 0; i < DASH_N; i++) {
      const d = new THREE.Mesh(dashGeo, dashMat);
      d.rotation.x = -Math.PI / 2;
      d.position.set(-7 + i * DASH_GAP, 0.003, z);
      road.add(d);
    }
  });

  truck.position.x = 0.2; // centre the trike on the turntable

  // ---------- Camera moves ----------
  type Tween = {
    t: number;
    fromCam: THREE.Vector3;
    fromTarget: THREE.Vector3;
    toCam: THREE.Vector3;
    toTarget: THREE.Vector3;
  };
  let tween: Tween | null = null;
  // Narrow stages need the camera further back to fit the 3.7 m trike.
  const fitScale = () => Math.min(2.4, Math.max(1, 1.45 / camera.aspect));
  function flyTo(cam: Vec3, target: Vec3, instant = false) {
    const toTarget = V(target[0] + truck.position.x, target[1], target[2]);
    const toCam = V(cam[0] + truck.position.x, cam[1], cam[2])
      .sub(toTarget)
      .multiplyScalar(fitScale())
      .add(toTarget);
    if (instant || reduceMotion) {
      tween = null;
      camera.position.copy(toCam);
      controls.target.copy(toTarget);
      controls.update();
      return;
    }
    tween = {
      t: 0,
      fromCam: camera.position.clone(),
      fromTarget: controls.target.clone(),
      toCam,
      toTarget,
    };
  }
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  let flashBox: THREE.Box3Helper | null = null;
  let flashT = 0;
  function flash(id: PartId) {
    if (flashBox) {
      scene.remove(flashBox);
      flashBox.dispose();
    }
    const box = new THREE.Box3().setFromObject(partGroups[id]).expandByScalar(0.04);
    flashBox = new THREE.Box3Helper(box, new THREE.Color(GOLD));
    const m = flashBox.material as THREE.LineBasicMaterial;
    m.transparent = true;
    m.depthTest = false;
    flashBox.renderOrder = 10;
    flashT = 0;
    scene.add(flashBox);
  }

  const onStart = () => {
    tween = null;
    events.onInteract?.();
  };
  controls.addEventListener("start", onStart);

  // ---------- Resize / visibility ----------
  function resize() {
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  const clock = new THREE.Clock();
  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) clock.getDelta();
  });
  io.observe(host);

  // ---------- Loop ----------
  let raf = 0;
  let elapsed = 0;
  let cutLevel = 0;
  let doorAngle = 0;
  let lightLevel = 0;
  let driveSpeed = 0;
  let steer = 0;
  let roadOpacity = 0;

  function tick() {
    raf = requestAnimationFrame(tick);
    if (!visible || document.hidden) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    elapsed += dt;
    const snap = reduceMotion ? 1 : 0;

    doorAngle += ((opt.doors ? 1 : 0) - doorAngle) * Math.min(1, snap || dt * 4);
    doors.forEach((d) => (d.pivot.rotation.y = d.side * doorAngle * 1.75));
    boxLight.intensity = doorAngle * 0.8 * LUX;

    cutLevel += ((opt.cut ? 1 : 0) - cutLevel) * Math.min(1, snap || dt * 5);
    const wallOpacity = 1 - cutLevel * 0.94;
    const seeThrough = wallOpacity < 0.999;
    [sideMatL, innerL].forEach((m) => {
      if (m.transparent !== seeThrough) {
        m.transparent = seeThrough;
        m.depthWrite = !seeThrough;
        m.needsUpdate = true;
      }
      m.opacity = wallOpacity;
    });
    leftWall.castShadow = !seeThrough;

    lightLevel += ((opt.lights ? 1 : 0) - lightLevel) * Math.min(1, dt * 8);
    M.headLens.emissiveIntensity = lightLevel * 2.2;
    M.tailLens.emissiveIntensity = lightLevel * 1.6;
    beam.intensity = lightLevel * 3.2 * LUX;
    tailGlow.intensity = lightLevel * 0.8 * LUX;
    const blink = lightLevel > 0.5 && Math.floor(elapsed * 1.6) % 2 === 0 ? 1 : 0;
    M.amberLens.emissiveIntensity = blink * 1.4 * lightLevel;

    const ds = opt.drive && !reduceMotion ? 1 : 0;
    driveSpeed += (ds - driveSpeed) * Math.min(1, dt * 1.6);
    const v = driveSpeed * 3.2; // metres per second
    wheels.forEach((w) => (w.rotation.z -= (v / WHEEL_R) * dt));
    road.children.forEach((d) => {
      d.position.x -= v * dt;
      if (d.position.x < -7) d.position.x += DASH_GAP * DASH_N;
    });
    roadOpacity += ((ds ? 0.75 : 0) - roadOpacity) * Math.min(1, dt * 3);
    dashMat.opacity = roadOpacity;
    chassis.position.y =
      driveSpeed * (Math.sin(elapsed * 9) * 0.004 + Math.sin(elapsed * 3.3) * 0.003);
    chassis.rotation.x = driveSpeed * Math.sin(elapsed * 2.1) * 0.006;
    steer +=
      ((driveSpeed > 0.1 ? Math.sin(elapsed * 0.7) * 0.06 : 0) - steer) * Math.min(1, dt * 2);
    // Steer the fork about its own head axis.
    fork.quaternion.setFromAxisAngle(FD, steer);
    fork.position.copy(HT).sub(HT.clone().applyQuaternion(fork.quaternion));

    // Clothes swing a little on the rail while riding.
    hangers.forEach(
      (h) => (h.pivot.rotation.z = driveSpeed * (Math.sin(elapsed * 2.4 + h.phase) * 0.045 + 0.02)),
    );

    if (flashBox) {
      flashT += dt;
      (flashBox.material as THREE.LineBasicMaterial).opacity = reduceMotion
        ? 1
        : Math.min(1, flashT / 0.3) * Math.max(0, Math.min(1, (2.2 - flashT) / 0.6));
      if (flashT > 2.2) {
        scene.remove(flashBox);
        flashBox.dispose();
        flashBox = null;
      }
    }

    if (tween) {
      tween.t += dt / 1.1;
      const k = ease(Math.min(1, tween.t));
      camera.position.lerpVectors(tween.fromCam, tween.toCam, k);
      controls.target.lerpVectors(tween.fromTarget, tween.toTarget, k);
      if (tween.t >= 1) tween = null;
    }

    controls.autoRotate = opt.spin && !reduceMotion;
    controls.update();
    renderer.render(scene, camera);
  }

  // ---------- Boot ----------
  paintTextures();
  canopy.visible = opt.canopy;
  const hero = VIEWS[0];
  flyTo(hero.cam, hero.target, true);
  raf = requestAnimationFrame(tick);
  let disposed = false;
  if (document.fonts?.load) {
    Promise.all([
      document.fonts.load('800 80px "Plus Jakarta Sans"'),
      document.fonts.load("700 40px Inter"),
      document.fonts.load("600 40px Inter"),
    ])
      .then(() => {
        if (!disposed) paintTextures();
      })
      .catch(() => undefined);
  }

  return {
    setView(id) {
      const v = VIEWS.find((x) => x.id === id);
      if (v) flyTo(v.cam, v.target);
    },
    inspect(id) {
      const p = PARTS.find((x) => x.id === id);
      if (!p) return;
      flash(id);
      flyTo(p.cam, p.target);
    },
    setLivery(id) {
      livery = LIVERIES.find((l) => l.id === id) ?? LIVERIES[0];
      M.paint.color.set(livery.body);
      paintTextures();
    },
    setOptions(next) {
      opt = { ...next };
      canopy.visible = opt.canopy;
    },
    zoom(factor) {
      tween = null;
      const offset = camera.position.clone().sub(controls.target);
      const d = THREE.MathUtils.clamp(
        offset.length() * factor,
        controls.minDistance,
        controls.maxDistance,
      );
      camera.position.copy(controls.target).add(offset.setLength(d));
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      controls.removeEventListener("start", onStart);
      controls.dispose();
      canvas.removeEventListener("wheel", onWheel, { capture: true });
      const mats = new Set<THREE.Material>();
      const texs = new Set<THREE.Texture>();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.LineSegments) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m: THREE.Material) =>
            mats.add(m),
          );
        }
      });
      mats.forEach((m) => {
        Object.values(m).forEach((value) => {
          if (value instanceof THREE.Texture) texs.add(value);
        });
        m.dispose();
      });
      texs.forEach((t) => t.dispose());
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
