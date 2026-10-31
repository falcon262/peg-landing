export type Vec3 = [number, number, number]

export type LiveryId = "onyx" | "navy" | "green"
export type Livery = {
  id: LiveryId
  name: string
  note: string
  box: string
  deep: string
  body: string
}

export const LIVERIES: Livery[] = [
  {
    id: "onyx",
    name: "Onyx and gold",
    note: "The PEG mark colours",
    box: "#151515",
    deep: "#0b0b0b",
    body: "#191919",
  },
  {
    id: "navy",
    name: "Customer navy",
    note: "From the PEG customer app",
    box: "#19296c",
    deep: "#101c4d",
    body: "#19296c",
  },
  {
    id: "green",
    name: "Partner green",
    note: "From PEG Partner",
    box: "#0b5c46",
    deep: "#063f30",
    body: "#0b5c46",
  },
]

export type PartId = "box" | "doors" | "rail" | "cockpit" | "engine" | "fork" | "axle"
export type Part = {
  id: PartId
  title: string
  kicker: string
  body: string
  cam: Vec3
  target: Vec3
  doors?: boolean
  cutaway?: boolean
  canopy?: boolean
}

export const PARTS: Part[] = [
  {
    id: "box",
    title: "Laundry box",
    kicker: "Body",
    body: "An enclosed box replaces the open cage of the stock 200L. It keeps orders dry and out of the dust, and carries the PEG wordmark on both sides and the roof. Modelled at about 2.0 m long, 1.3 m wide and 1.3 m tall.",
    cam: [1.9, 2.6, 4.2],
    target: [-0.95, 1.25, 0],
  },
  {
    id: "doors",
    title: "Rear doors",
    kicker: "Body",
    body: "Twin doors open fully for loading. Inside: hanging garments on the right, sealed laundry bags and folded orders on the left. The doors carry the booking line and the app prompt.",
    cam: [-4.9, 1.6, 3.1],
    target: [-1.75, 1.0, 0.2],
    doors: true,
  },
  {
    id: "rail",
    title: "Garment rail",
    kicker: "Interior",
    body: "A chrome rail is bolted to the roof of the box and runs front to back on the right-hand side. Shirts and kaftans hang on it, and suits travel in PEG garment bags, so pressed orders arrive without creases. They sway slightly while the trike is moving.",
    cam: [-1.75, 1.85, -3.6],
    target: [-1.15, 1.25, 0.2],
    doors: true,
    cutaway: true,
  },
  {
    id: "cockpit",
    title: "Rider cockpit",
    kicker: "Motorcycle",
    body: "Wide handlebar, mirrors and a long saddle in front of the box. The canopy shades the rider on long Accra runs and can be switched off in Options.",
    cam: [2.4, 2.0, 1.9],
    target: [0.65, 1.0, 0],
    canopy: true,
  },
  {
    id: "engine",
    title: "Engine and drive",
    kicker: "Drivetrain",
    body: "A 150cc-class air-cooled single, as on the SL150 range. A shaft carries drive back to the differential on the rear axle. The exhaust runs low along the right side.",
    cam: [1.6, 0.75, 2.1],
    target: [0.55, 0.45, 0],
  },
  {
    id: "fork",
    title: "Front suspension",
    kicker: "Chassis",
    body: "A telescopic fork with exposed coil springs, finished in PEG gold. The front mudguard and headlamp cowl take the livery colour.",
    cam: [2.9, 1.1, 1.35],
    target: [1.2, 0.7, 0],
  },
  {
    id: "axle",
    title: "Rear axle",
    kicker: "Chassis",
    body: "A live rear axle on leaf springs, with twin wheels under the box. This is what lets the trike carry a full box of bags over rough roads.",
    cam: [-1.0, 0.55, 2.7],
    target: [-0.95, 0.35, 0],
  },
]

export type ViewId = "hero" | "side" | "rear" | "front" | "top" | "low"
export const VIEWS: { id: ViewId; label: string; cam: Vec3; target: Vec3 }[] = [
  {
    id: "hero",
    label: "¾ front",
    cam: [3.9, 2.25, 4.3],
    target: [-0.25, 0.95, 0],
  },
  {
    id: "side",
    label: "Side",
    cam: [-0.25, 1.15, 6.1],
    target: [-0.25, 0.95, 0],
  },
  {
    id: "rear",
    label: "Rear",
    cam: [-6.6, 1.75, 1.6],
    target: [-0.5, 0.95, 0],
  },
  {
    id: "front",
    label: "Front",
    cam: [5.4, 1.5, -0.9],
    target: [-0.25, 0.95, 0],
  },
  { id: "top", label: "Top", cam: [-0.45, 7.0, 0.9], target: [-0.45, 0.4, 0] },
  {
    id: "low",
    label: "Low ¾",
    cam: [-3.4, 0.45, -3.8],
    target: [-0.3, 0.85, 0],
  },
]

export type TrikeOptions = {
  spin: boolean
  drive: boolean
  doors: boolean
  cut: boolean
  lights: boolean
  canopy: boolean
}

export const OPTION_LABELS: { key: keyof TrikeOptions; label: string }[] = [
  { key: "spin", label: "Turntable" },
  { key: "drive", label: "Ride along" },
  { key: "doors", label: "Rear doors open" },
  { key: "cut", label: "See inside" },
  { key: "lights", label: "Lights on" },
  { key: "canopy", label: "Rider canopy" },
]
