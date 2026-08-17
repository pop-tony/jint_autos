import React, { useState, useEffect, useRef, createContext, useContext, ReactNode } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  X,
  ShieldCheck,
  Award,
  Banknote,
  Users,
  Sun,
  Moon,
  Menu,
  ChevronRight,
  Play,
} from "lucide-react";

// ---------- MINI ROUTER (replaces react-router-dom for build) ----------
type RouterCtxType = {
  pathname: string;
  params: Record<string, string>;
  navigate: (to: string) => void;
};
const RouterContext = createContext<RouterCtxType>({ pathname: "/", params: {}, navigate: () => {} });

function matchPath(pattern: string, pathname: string): { matched: boolean; params: Record<string, string> } {
  if (pattern === "*") return { matched: true, params: {} };
  const pParts = pattern.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);
  // root special
  if (pParts.length === 0 && pathParts.length === 0) return { matched: true, params: {} };
  if (pParts.length !== pathParts.length && !pattern.includes(":")) {
    // allow exact only
    if (pattern !== pathname) return { matched: false, params: {} };
  }
  // handle param patterns
  if (pParts.length !== pathParts.length) return { matched: false, params: {} };
  const params: Record<string, string> = {};
  for (let i = 0; i < pParts.length; i++) {
    if (pParts[i].startsWith(":")) {
      params[pParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (pParts[i] !== pathParts[i]) {
      return { matched: false, params: {} };
    }
  }
  return { matched: true, params };
}

function BrowserRouter({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState(() => (typeof window !== "undefined" ? window.location.pathname : "/"));
  const [params, setParams] = useState<Record<string, string>>({});
  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (to: string) => {
    if (to === pathname) return;
    window.history.pushState({}, "", to);
    setPathname(to);
  };
  return (
    <RouterContext.Provider value={{ pathname, params, navigate }}>
      {/* internal setter for params via effect */}
      <RouteParamsSetter setParams={setParams} pathname={pathname} />
      {children}
    </RouterContext.Provider>
  );
}
function RouteParamsSetter({ setParams, pathname }: { setParams: (p: any) => void; pathname: string }) {
  // This component does nothing visible; actual param setting happens in Routes
  useEffect(() => {}, [pathname]);
  return null;
}

function Routes({ children }: { children: ReactNode }) {
  const { pathname } = useContext(RouterContext);
  const [currentParams, setCurrentParams] = useState<Record<string, string>>({});
  let matchedElement: ReactNode = null;
  React.Children.forEach(children as any, (child: any) => {
    if (matchedElement) return;
    if (!child || !child.props) return;
    const { path, element } = child.props;
    const m = matchPath(path, pathname);
    if (m.matched) {
      matchedElement = element;
      // defer param set
      if (JSON.stringify(m.params) !== JSON.stringify(currentParams)) {
        // schedule update
        queueMicrotask(() => setCurrentParams(m.params));
      }
    }
  });
  // Provide params via context override
  const ctx = useContext(RouterContext);
  const merged = { ...ctx, params: currentParams };
  if (!matchedElement) {
    // look for * route
    React.Children.forEach(children as any, (child: any) => {
      if (matchedElement) return;
      if (child?.props?.path === "*") matchedElement = child.props.element;
    });
  }
  return <RouterContext.Provider value={merged}>{matchedElement}</RouterContext.Provider>;
}
function Route({ path, element }: { path: string; element: ReactNode }) {
  return null as any;
}
function Link({ to, children, className, onClick, ...rest }: any) {
  const { navigate } = useContext(RouterContext);
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
function NavLink({ to, children, className }: any) {
  const { pathname, navigate } = useContext(RouterContext);
  const isActive = pathname === to || (to !== "/" && pathname.startsWith(to));
  const cls = typeof className === "function" ? className({ isActive }) : className;
  return (
    <a
      href={to}
      className={cls}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {typeof children === "function" ? children({ isActive }) : children}
    </a>
  );
}
function useLocation() {
  const { pathname } = useContext(RouterContext);
  return { pathname };
}
function useParams<T extends Record<string, string> = any>(): T {
  const { params } = useContext(RouterContext);
  return params as T;
}
function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

// ---------- TYPES ----------
type Car = {
  id: string;
  name: string;
  model: string;
  year: number;
  price: number;
  category: "SUV" | "Sedan" | "Luxury";
  mileage: string;
  fuel: string;
  transmission: string;
  engine: string;
  color: string;
  mainImage: string;
  gallery: string[];
  features: string[];
  description: string;
};

// ---------- IMAGE ASSETS ----------
const HERO_BG = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000";
const SHOWROOM_BG = "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2000";
const INTERIOR_1 = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200";
const INTERIOR_2 = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200";

const INITIAL_CARS: Car[] = [
  {
    id: "prado-2020",
    name: "Toyota Land Cruiser Prado",
    model: "Prado TX-L",
    year: 2020,
    price: 485000,
    category: "SUV",
    mileage: "42,000 km",
    fuel: "Diesel",
    transmission: "Automatic",
    engine: "2.8L D-4D",
    color: "Pearl White",
    mainImage: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200",
      INTERIOR_1,
      INTERIOR_2,
    ],
    features: ["Sunroof", "Leather Seats", "360 Camera", "JBL Audio", "DVLA Registered", "Duty Fully Paid"],
    description: "Executive Prado TX-L, Ghana used but immaculate. Full duty paid, DVLA registered, accident-free. Perfect for Madina hills and long trips.",
  },
  {
    id: "gle-2021",
    name: "Mercedes-Benz GLE 350",
    model: "GLE 350 4MATIC",
    year: 2021,
    price: 620000,
    category: "Luxury",
    mileage: "28,500 km",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "2.0L Turbo",
    color: "Obsidian Black",
    mainImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200",
      INTERIOR_1,
      INTERIOR_2,
    ],
    features: ["MBUX", "Panoramic Roof", "Air Suspension", "Burmester Sound", "Heads Up Display", "Duty Paid"],
    description: "US imported GLE, fully loaded. One owner in Ghana, service history intact. Luxury meets capability.",
  },
  {
    id: "lexus-rx-2019",
    name: "Lexus RX 350",
    model: "RX 350 F-Sport",
    year: 2019,
    price: 395000,
    category: "Luxury",
    mileage: "56,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "3.5L V6",
    color: "Atomic Silver",
    mainImage: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200",
      INTERIOR_2,
      INTERIOR_1,
    ],
    features: ["Mark Levinson", "Ventilated Seats", "F-Sport Kit", "Wireless Charger", "Blind Spot", "Duty Paid"],
    description: "Reliable luxury SUV, Lexus smooth ride, fuel efficient for its class. Ideal family car in Accra traffic.",
  },
  {
    id: "bmw-5-2020",
    name: "BMW 5 Series",
    model: "530i M-Sport",
    year: 2020,
    price: 365000,
    category: "Sedan",
    mileage: "38,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "2.0L TwinPower",
    color: "Carbon Black",
    mainImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
      INTERIOR_1,
      INTERIOR_2,
    ],
    features: ["M-Sport Package", "Harman Kardon", "Gesture Control", "Laser Lights", "Duty Paid", "DVLA"],
    description: "Executive sedan, M-Sport trim, pristine interior. Business class comfort with German precision.",
  },
  {
    id: "crv-2021",
    name: "Honda CR-V",
    model: "CR-V Touring AWD",
    year: 2021,
    price: 295000,
    category: "SUV",
    mileage: "31,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "1.5L Turbo",
    color: "Modern Steel",
    mainImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200",
      INTERIOR_2,
      INTERIOR_1,
    ],
    features: ["Honda Sensing", "Panoramic Sunroof", "Leather", "Wireless Apple CarPlay", "Duty Paid"],
    description: "Most sought after family SUV, low fuel, high reliability. Perfect first big car for young family.",
  },
  {
    id: "tucson-2022",
    name: "Hyundai Tucson",
    model: "Tucson Limited",
    year: 2022,
    price: 340000,
    category: "SUV",
    mileage: "19,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "2.5L GDI",
    color: "Amazon Gray",
    mainImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
      INTERIOR_1,
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200",
    ],
    features: ["Bose Audio", "360 Camera", "Smart Tailgate", "Heated Seats", "Duty Paid", "DVLA Registered"],
    description: "2022 facelift, futuristic design, tech loaded. Almost new, foreign used only 3 months in Ghana.",
  },
  {
    id: "range-2020",
    name: "Range Rover Velar",
    model: "Velar P250 R-Dynamic",
    year: 2020,
    price: 575000,
    category: "Luxury",
    mileage: "44,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "2.0L Ingenium",
    color: "Santorini Black",
    mainImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200",
      INTERIOR_2,
      INTERIOR_1,
    ],
    features: ["Touch Pro Duo", "Meridian 3D", "Sliding Panoramic", "Air Suspension", "Duty Paid"],
    description: "British luxury, minimal design, maximum presence. Stands out in East Legon and Trasacco.",
  },
  {
    id: "camry-2021",
    name: "Toyota Camry",
    model: "Camry XSE V6",
    year: 2021,
    price: 285000,
    category: "Sedan",
    mileage: "35,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "3.5L V6",
    color: "Midnight Black",
    mainImage: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200",
      INTERIOR_1,
      INTERIOR_2,
    ],
    features: ["JBL", "HUD", "Heated Seats", "Toyota Safety Sense", "Duty Paid", "Economical"],
    description: "Full size sedan power, XSE sport trim, red leather option. Ghana's favorite executive sedan.",
  },
];

// ---------- HELPERS ----------
const formatGHS = (n: number) => `GHS ${n.toLocaleString()}`;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Magnetic Button Hook
function useMagnetic() {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = `translate(0px,0px)`;
  };
  return { ref, onMove, onLeave };
}

// ---------- LAYOUT ----------
function Header({ theme, toggleTheme }: { theme: "dark" | "light"; toggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${
        theme === "dark" ? "bg-[#0A0A0A]/80 border-white/10" : "bg-[#F5F3EF]/80 border-black/10"
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFB400] text-black font-black text-[14px]">JA</div>
          <div className="leading-none">
            <div className="font-[800] tracking-[0.18em] text-[13px]">JINT AUTOS</div>
            <div className="text-[10px] opacity-60 tracking-[0.2em]">MADINA • GHANA</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.12em] font-medium">
          {[
            { to: "/", label: "HOME" },
            { to: "/inventory", label: "INVENTORY" },
            { to: "/about", label: "ABOUT" },
            { to: "/contact", label: "CONTACT" },
            { to: "/admin", label: "ADMIN" },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative py-1 transition ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"}`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#FFB400] transition-all ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:0551365466"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#FFB400] px-4 py-2 text-[12px] font-bold tracking-wide text-black"
          >
            <Phone className="h-4 w-4" /> 0551365466
          </a>
          <button
            onClick={toggleTheme}
            className={`grid h-9 w-9 place-items-center rounded-full border transition ${
              theme === "dark" ? "border-white/15 hover:bg-white/10" : "border-black/15 hover:bg-black/5"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-white/10" onClick={() => setOpen(!open)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`md:hidden border-t px-6 py-6 ${theme === "dark" ? "bg-[#0A0A0A] border-white/10" : "bg-[#F5F3EF] border-black/10"}`}>
          <div className="flex flex-col gap-4 text-[13px] tracking-wide">
            <Link to="/" onClick={() => setOpen(false)}>HOME</Link>
            <Link to="/inventory" onClick={() => setOpen(false)}>INVENTORY</Link>
            <Link to="/about" onClick={() => setOpen(false)}>ABOUT</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>CONTACT</Link>
            <Link to="/admin" onClick={() => setOpen(false)}>ADMIN</Link>
            <a href="tel:0551365466" className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#FFB400] px-5 py-3 text-black font-bold">
              <Phone className="h-4 w-4" /> Call 0551365466
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ theme }: { theme: "dark" | "light" }) {
  return (
    <footer className={`mt-24 border-t ${theme === "dark" ? "border-white/10 bg-[#0A0A0A]" : "border-black/10 bg-[#F5F3EF]"}`}>
      <div className="mx-auto max-w-[1320px] px-6 py-14 md:px-8 grid md:grid-cols-[1.4fr_0.8fr_0.8fr] gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFB400] text-black font-black text-[14px]">JA</div>
            <span className="font-[800] tracking-[0.18em] text-[13px]">JINT AUTOS</span>
          </div>
          <p className="mt-4 max-w-[38ch] text-[14px] leading-6 opacity-70">
            Luxury & everyday cars, fully duty paid, DVLA registered. Madina New Road, behind Madina Market. Trusted by 500+ Ghanaian drivers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-[13px]">
            <a href="tel:0551365466" className="inline-flex items-center gap-2 rounded-full bg-[#FFB400] px-4 py-2 font-bold text-black">
              <Phone className="h-4 w-4" /> 0551365466
            </a>
            <a href="https://wa.me/233551365466" target="_blank" rel="noopener" className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${theme === "dark" ? "border-white/15" : "border-black/15"}`}>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
        <div className="text-[13px] leading-7 opacity-80">
          <div className="mb-3 font-bold tracking-[0.15em] text-[12px] opacity-100">SHOWROOM</div>
          <div className="flex gap-2"><MapPin className="h-4 w-4 mt-1" /> Madina New Road, Near Zongo Junction, Accra - Ghana</div>
          <div className="flex gap-2 mt-2"><Mail className="h-4 w-4 mt-1" /> jintautos.madina@gmail.com</div>
          <div className="flex gap-2 mt-2"><Clock className="h-4 w-4 mt-1" /> Mon - Sat 8am - 6pm | Sun 1pm - 5pm</div>
        </div>
        <div className="text-[13px] leading-7 opacity-80">
          <div className="mb-3 font-bold tracking-[0.15em] text-[12px] opacity-100">QUICK LINKS</div>
          <div className="flex flex-col">
            <Link to="/inventory" className="hover:opacity-100 opacity-80">All Inventory</Link>
            <Link to="/about" className="hover:opacity-100 opacity-80">About Jint Autos</Link>
            <Link to="/contact" className="hover:opacity-100 opacity-80">Contact & Directions</Link>
            <a href="https://wa.me/233551365466" target="_blank" rel="noopener" className="hover:opacity-100 opacity-80">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
      <div className={`border-t py-4 text-center text-[11px] tracking-wide opacity-60 ${theme === "dark" ? "border-white/10" : "border-black/10"}`}>
        © {new Date().getFullYear()} Jint Autos • DVLA Certified • Duty Paid • Madina, Accra
      </div>
    </footer>
  );
}

// ---------- BOOKING MODAL ----------
function BookingModal({
  car,
  open,
  onClose,
  theme,
}: {
  car: Car | null;
  open: boolean;
  onClose: () => void;
  theme: "dark" | "light";
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  if (!open || !car) return null;
  const waText = encodeURIComponent(
    `Hello Jint Autos, I want to book a TEST DRIVE for ${car.year} ${car.name} (${car.model}) - ${formatGHS(car.price)}. My name: ${name || "[Your Name]"}, Phone: ${phone || "055..."}, Preferred Date: ${date || "ASAP"}. Please confirm. Madina showroom.`
  );
  const waLink = `https://wa.me/233551365466?text=${waText}`;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 backdrop-blur-md p-4">
      <div className={`w-full max-w-[520px] rounded-[24px] p-6 md:p-8 shadow-2xl ${theme === "dark" ? "bg-[#111] text-white border border-white/10" : "bg-white text-black border border-black/10"}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[12px] tracking-[0.2em] opacity-60">BOOK TEST DRIVE</div>
            <h3 className="mt-1 text-[22px] font-[800] leading-tight">{car.name}</h3>
            <div className="mt-1 text-[13px] opacity-70">{formatGHS(car.price)} • {car.mileage} • {car.color}</div>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-black/5 dark:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-3">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" className={`h-12 rounded-full px-5 text-[14px] outline-none border ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone e.g. 0551365466" className={`h-12 rounded-full px-5 text-[14px] outline-none border ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className={`h-12 rounded-full px-5 text-[14px] outline-none border ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a href={waLink} target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFB400] text-black font-bold text-[13px]">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a href="tel:0551365466" className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border font-bold text-[13px] ${theme==="dark"?"border-white/15":"border-black/15"}`}>
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </div>
        <div className="mt-4 text-center text-[11px] opacity-60">Opens WhatsApp to 233551365466 with prefilled details. DVLA & duty papers ready.</div>
      </div>
    </div>
  );
}

// ---------- CAR CARD ----------
function CarCard({ car, theme, onBook }: { car: Car; theme: "dark" | "light"; onBook: (c: Car) => void }) {
  const mag = useMagnetic();
  return (
    <div className={`group overflow-hidden rounded-[22px] border transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${theme==="dark"?"bg-[#111] border-white/10":"bg-white border-black/10"}`}>
      <Link to={`/inventory/${car.id}`} className="block relative aspect-[16/11] overflow-hidden">
        <img src={car.mainImage} alt={car.name} loading="lazy" className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-[1.08]" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold tracking-wide text-white backdrop-blur">{car.category}</span>
          <span className="rounded-full bg-[#FFB400] px-3 py-1 text-[11px] font-bold text-black">{car.year}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="text-white text-[13px] opacity-80">{car.mileage} • {car.transmission}</div>
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/inventory/${car.id}`} className="block">
          <h3 className="text-[16px] font-[750] leading-tight">{car.name}</h3>
          <div className="mt-1 text-[13px] opacity-60">{car.model} • {car.color}</div>
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-[18px] font-[800]">{formatGHS(car.price)}</div>
          <button ref={mag.ref} onMouseMove={mag.onMove} onMouseLeave={mag.onLeave} onClick={() => onBook(car)} className="inline-flex items-center gap-1 rounded-full bg-[#FFB400] px-4 py-2 text-[12px] font-bold text-black transition-transform">
            Book <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- PAGES ----------
function HomePage({ cars, theme, onBook }: { cars: Car[]; theme: "dark" | "light"; onBook: (c: Car) => void }) {
  const featured = cars.slice(0, 3);
  return (
    <div className="animate-[fadeUp_0.7s_ease]">
      {/* HERO */}
      <section className="relative min-h-[86vh] overflow-hidden">
        <img src={HERO_BG} alt="Hero luxury car" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_20%,rgba(255,180,0,0.25),transparent)]" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-[1320px] flex-col justify-end px-6 pb-16 pt-24 md:px-8 md:pb-24">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-[0.2em] text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#FFB400] animate-pulse" /> MADINA NEW ROAD • DVLA CERTIFIED
            </div>
            <h1 className="mt-6 text-[38px] md:text-[64px] font-[900] leading-[0.95] tracking-[-0.02em] text-white">
              DRIVE LUXURY,<br /> PAY FAIR IN <span className="text-[#FFB400]">GHANA</span>.
            </h1>
            <p className="mt-5 max-w-[56ch] text-[15px] md:text-[17px] leading-7 text-white/80">
              Jint Autos curates duty-paid, DVLA-registered SUVs & sedans. No stories. Clear papers. Test drive today at Madina. Call <span className="font-bold text-white">0551365466</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/inventory" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFB400] px-7 text-[13px] font-bold tracking-wide text-black">
                View Inventory <ChevronRight className="h-4 w-4" />
              </Link>
              <a href="https://wa.me/233551365466" target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white text-[13px] font-bold tracking-wide text-black px-7">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 max-w-[520px] gap-6 border-t border-white/15 pt-6 text-white">
              {[
                { k: "500+", v: "Cars Sold" },
                { k: "8 yrs", v: "In Madina" },
                { k: "100%", v: "Duty Paid" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="text-[26px] font-[800] leading-none">{s.k}</div>
                  <div className="mt-1 text-[11px] tracking-[0.18em] opacity-70">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1320px] px-6 md:px-8 mt-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[12px] tracking-[0.22em] opacity-60">FEATURED THIS WEEK</div>
            <h2 className="mt-2 text-[28px] md:text-[36px] font-[800] tracking-[-0.02em]">Fresh arrivals, papers ready</h2>
          </div>
          <Link to="/inventory" className={`hidden md:inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[12px] font-bold ${theme==="dark"?"border-white/15":"border-black/15"}`}>
            See all 8 <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((c) => (
            <CarCard key={c.id} car={c} theme={theme} onBook={onBook} />
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className={`mt-20 border-y ${theme==="dark"?"border-white/10 bg-[#0F0F0F]":"border-black/10 bg-white"}`}>
        <div className="mx-auto max-w-[1320px] px-6 md:px-8 py-14 grid md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Duty & DVLA", desc: "Every car fully duty paid with GRA receipt + DVLA. We show papers before payment." },
            { icon: Award, title: "No Accident Stories", desc: "Verified VIN, inspection, honest mileage. We reject flood or salvaged units." },
            { icon: Banknote, title: "Fair GHS Pricing", desc: "Cedi pricing, no hidden dollar surprises. Swap & installment options via partners." },
            { icon: Users, title: "Madina Trusted", desc: "8 years on New Road. Ask around. Real showroom, real after-sales." },
          ].map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#FFB400] text-black"><f.icon className="h-5 w-5" /></div>
              <div>
                <div className="font-bold text-[14px]">{f.title}</div>
                <div className="mt-1 text-[13px] leading-6 opacity-70">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mt-20 overflow-hidden rounded-[28px] mx-auto max-w-[1320px] px-6 md:px-8">
        <div className="relative overflow-hidden rounded-[28px]">
          <img src={HERO_BG} alt="CTA texture" className="absolute inset-0 h-full w-full object-cover scale-110" />
          <div className="absolute inset-0 bg-[#0A0A0A]/80" />
          <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-8 p-8 md:p-12 items-center">
            <div className="text-white">
              <h3 className="text-[28px] md:text-[40px] font-[850] leading-[0.95]">Come see them live.<br/>Madina New Road.</h3>
              <p className="mt-4 max-w-[50ch] text-[14px] leading-6 opacity-80">Open today. Drive in, test drive, check documents. No appointment needed, but call 0551365466 to hold a car.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/233551365466" target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center rounded-full bg-[#FFB400] px-7 text-[13px] font-bold text-black">Chat on WhatsApp</a>
              <Link to="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[13px] font-bold text-black">Get Directions</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InventoryPage({ cars, theme, onBook }: { cars: Car[]; theme: "dark" | "light"; onBook: (c: Car) => void }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"All" | Car["category"]>("All");
  const [sort, setSort] = useState<"low" | "high" | "year">("low");

  const filtered = cars
    .filter((c) => (cat === "All" ? true : c.category === cat))
    .filter((c) => `${c.name} ${c.model} ${c.year}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return b.year - a.year;
    });

  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-8 pt-10 animate-[fadeUp_0.6s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-[12px] tracking-[0.22em] opacity-60">INVENTORY • {cars.length} CARS</div>
          <h1 className="mt-2 text-[32px] md:text-[44px] font-[850] tracking-[-0.02em] leading-[0.95]">Duty-paid stock in Madina today</h1>
          <p className="mt-3 max-w-[60ch] text-[14px] opacity-70">All prices in GHS, DVLA registered. Search, filter, sort. Tap any car for full gallery & specs.</p>
        </div>
        <div className="flex items-center gap-2 text-[12px]">
          <SlidersHorizontal className="h-4 w-4 opacity-60" />
          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className={`rounded-full border px-4 py-2 bg-transparent ${theme==="dark"?"border-white/15":"border-black/15"}`}>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="year">Newest Year</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 items-center">
        <div className={`flex items-center gap-2 rounded-full border px-4 h-11 w-full md:w-[360px] ${theme==="dark"?"border-white/15 bg-white/[0.06]":"border-black/15 bg-black/[0.04]"}`}>
          <Search className="h-4 w-4 opacity-60" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Prado, GLE, Lexus..." className="w-full bg-transparent outline-none text-[14px]" />
        </div>
        <div className="flex gap-2">
          {(["All", "SUV", "Sedan", "Luxury"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setCat(t as any)}
              className={`rounded-full px-5 h-11 text-[12px] font-bold tracking-wide border transition ${cat===t ? "bg-[#FFB400] text-black border-[#FFB400]" : theme==="dark" ? "border-white/15 hover:bg-white/10" : "border-black/15 hover:bg-black/5"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {filtered.map((c) => (
          <CarCard key={c.id} car={c} theme={theme} onBook={onBook} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 grid place-items-center rounded-[22px] border border-dashed p-16 text-center opacity-70">No cars match. Try another filter.</div>
      )}
    </div>
  );
}

function CarDetailPage({ cars, theme, onBook }: { cars: Car[]; theme: "dark" | "light"; onBook: (c: Car) => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((c) => c.id === id);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
  }, [id]);

  if (!car) {
    return (
      <div className="mx-auto max-w-[900px] px-6 py-24 text-center">
        <h2 className="text-[28px] font-bold">Car not found</h2>
        <p className="mt-2 opacity-70">It may have been sold. Check fresh inventory.</p>
        <Link to="/inventory" className="mt-6 inline-flex rounded-full bg-[#FFB400] px-6 py-3 text-black font-bold">Back to Inventory</Link>
      </div>
    );
  }

  const related = cars.filter((c) => c.category === car.category && c.id !== car.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-8 pt-8 animate-[fadeUp_0.6s_ease]">
      <button onClick={() => navigate(-1)} className={`inline-flex items-center gap-1 text-[12px] tracking-wide opacity-70 hover:opacity-100`}>
        <ChevronRight className="h-4 w-4 rotate-180" /> Back
      </button>

      <div className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-[24px] aspect-[16/11] bg-black/10">
            <img src={car.gallery[activeImg]} alt={`${car.name} view ${activeImg+1}`} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute bottom-3 left-3 flex gap-2">
              {car.gallery.map((_, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`h-2 w-8 rounded-full transition ${i===activeImg?"bg-[#FFB400]":"bg-white/50"}`} />
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {car.gallery.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`overflow-hidden rounded-[14px] aspect-[16/11] border-2 ${i===activeImg?"border-[#FFB400]":"border-transparent"}`}>
                <img src={img} alt={`${car.name} thumb ${i+1}`} className="h-full w-full object-cover hover:scale-105 transition" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="inline-flex gap-2">
            <span className="rounded-full bg-[#FFB400] px-3 py-1 text-[11px] font-bold text-black">{car.category}</span>
            <span className={`rounded-full border px-3 py-1 text-[11px] font-bold ${theme==="dark"?"border-white/15":"border-black/15"}`}>{car.year} • {car.mileage}</span>
          </div>
          <h1 className="mt-4 text-[30px] md:text-[38px] font-[850] leading-[0.95] tracking-[-0.02em]">{car.name}</h1>
          <div className="mt-1 text-[14px] opacity-60">{car.model} • {car.color}</div>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="text-[32px] font-[900]">{formatGHS(car.price)}</div>
            <div className="text-[12px] opacity-60 tracking-wide">DUTY PAID • DVLA</div>
          </div>

          <p className="mt-5 text-[14px] leading-7 opacity-80">{car.description}</p>

          {/* Specs table */}
          <div className={`mt-8 overflow-hidden rounded-[18px] border ${theme==="dark"?"border-white/10":"border-black/10"}`}>
            <div className={`grid grid-cols-2 text-[13px] divide-x divide-y ${theme==="dark"?"divide-white/10":"divide-black/10"}`}>
              {[
                ["Engine", car.engine],
                ["Fuel", car.fuel],
                ["Transmission", car.transmission],
                ["Color", car.color],
                ["Mileage", car.mileage],
                ["Year", String(car.year)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 px-4 py-3">
                  <span className="opacity-60">{k}</span><span className="font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[12px] tracking-[0.2em] opacity-60 font-bold">FEATURES</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {car.features.map((f) => (
                <span key={f} className={`rounded-full border px-3 py-1 text-[11px] ${theme==="dark"?"border-white/15 bg-white/[0.04]":"border-black/10 bg-black/[0.03]"}`}>{f}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button onClick={() => onBook(car)} className="h-12 rounded-full bg-[#FFB400] text-black font-bold text-[13px] inline-flex items-center justify-center gap-2">
              <Play className="h-4 w-4" /> Book Test Drive
            </button>
            <a href={`https://wa.me/233551365466?text=${encodeURIComponent(`Hi Jint Autos, I'm interested in ${car.year} ${car.name} - ${formatGHS(car.price)} (${car.id}). Is it still available?`)}`} target="_blank" rel="noopener" className={`h-12 rounded-full border font-bold text-[13px] inline-flex items-center justify-center gap-2 ${theme==="dark"?"border-white/15":"border-black/15"}`}>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <a href="tel:0551365466" className={`mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border text-[13px] font-bold ${theme==="dark"?"border-white/10 bg-white/[0.04]":"border-black/10 bg-black/[0.04]"}`}>
            <Phone className="h-4 w-4" /> Call 0551365466 now
          </a>
          <div className="mt-3 text-[11px] opacity-60 text-center">Madina New Road showroom • GRA & DVLA papers ready for inspection</div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h3 className="text-[18px] font-bold tracking-wide">Related {car.category}s</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <CarCard key={r.id} car={r} theme={theme} onBook={onBook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AboutPage({ theme }: { theme: "dark" | "light" }) {
  return (
    <div className="animate-[fadeUp_0.6s_ease]">
      <section className="relative overflow-hidden">
        <img src={SHOWROOM_BG} alt="Showroom" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-[1320px] px-6 md:px-8 py-20 md:py-28">
          <div className="max-w-[720px] text-white">
            <div className="text-[12px] tracking-[0.22em] opacity-70">ABOUT JINT AUTOS • MADINA</div>
            <h1 className="mt-4 text-[36px] md:text-[56px] font-[900] leading-[0.9] tracking-[-0.02em]">We started with one Prado in 2016. Now 500+ families drive with us.</h1>
            <p className="mt-6 text-[15px] leading-7 opacity-80">Jint Autos is not a flier car business. We are on Madina New Road, behind the market, Zongo Junction. You can walk in, see 8 cars live, touch papers. Owner is on site.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-6 md:px-8 py-14 grid md:grid-cols-3 gap-10">
        <div className={`rounded-[22px] border p-6 ${theme==="dark"?"bg-[#111] border-white/10":"bg-white border-black/10"}`}>
          <div className="text-[12px] tracking-[0.2em] opacity-60">OUR STORY</div>
          <p className="mt-3 text-[14px] leading-7 opacity-80">From clearing agent to dealer. We learned GRA duty, DVLA, accident checks the hard way. So we now only buy clean VIN, duty-paid stock. No auction stories.</p>
        </div>
        <div className={`rounded-[22px] border p-6 ${theme==="dark"?"bg-[#111] border-white/10":"bg-white border-black/10"}`}>
          <div className="text-[12px] tracking-[0.2em] opacity-60">VALUES</div>
          <ul className="mt-3 text-[14px] leading-7 opacity-80 list-disc pl-5">
            <li>Papers before payment</li>
            <li>Real mileage, no rollback</li>
            <li>GHS pricing, no dollar shock</li>
            <li>After-sales: we pick your call</li>
          </ul>
        </div>
        <div className={`rounded-[22px] border p-6 ${theme==="dark"?"bg-[#111] border-white/10":"bg-white border-black/10"}`}>
          <div className="text-[12px] tracking-[0.2em] opacity-60">TEAM</div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#FFB400] grid place-items-center font-black text-black">JD</div>
            <div><div className="font-bold text-[14px]">Joseph Dint - Founder</div><div className="text-[12px] opacity-60">Clearing, sales, DVLA liaison</div></div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-black text-white grid place-items-center font-black">SA</div>
            <div><div className="font-bold text-[14px]">Sarah A. - Client Care</div><div className="text-[12px] opacity-60">Test drive & WhatsApp 0551365466</div></div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-6 md:px-8">
        <div className="relative overflow-hidden rounded-[24px]">
          <img src={HERO_BG} alt="Texture" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className={`relative border rounded-[24px] p-8 md:p-10 grid md:grid-cols-3 gap-8 ${theme==="dark"?"bg-[#0A0A0A]/90 border-white/10":"bg-[#F5F3EF]/90 border-black/10"}`}>
            {[
              ["500+", "Cars sold, most by referral"],
              ["8 years", "Same spot in Madina, not moving"],
              ["24 hrs", "Papers transfer & DVLA support"],
            ].map(([k, v]) => (
              <div key={k}><div className="text-[32px] font-[900]">{k}</div><div className="mt-1 text-[13px] opacity-70">{v}</div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage({ theme }: { theme: "dark" | "light" }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const waLink = `https://wa.me/233551365466?text=${encodeURIComponent(`Hello Jint Autos, Name: ${name || "Guest"}, Phone: ${phone || "N/A"}, Message: ${message || "I need info about your cars in Madina."}`)}`;

  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-8 pt-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 animate-[fadeUp_0.6s_ease]">
      <div>
        <div className="text-[12px] tracking-[0.22em] opacity-60">CONTACT • MADINA SHOWROOM</div>
        <h1 className="mt-3 text-[36px] font-[850] leading-[0.9]">Visit us, or WhatsApp 0551365466</h1>
        <div className={`mt-8 rounded-[22px] border p-6 ${theme==="dark"?"bg-[#111] border-white/10":"bg-white border-black/10"}`}>
          <div className="grid gap-4 text-[14px]">
            <div className="flex gap-3"><MapPin className="h-5 w-5 text-[#FFB400]" /> Madina New Road, Behind Madina Market, Near Zongo Junction, Accra, Ghana</div>
            <div className="flex gap-3"><Phone className="h-5 w-5 text-[#FFB400]" /> 0551365466 (Call / WhatsApp) - 24/7 response</div>
            <div className="flex gap-3"><Mail className="h-5 w-5 text-[#FFB400]" /> jintautos.madina@gmail.com</div>
            <div className="flex gap-3"><Clock className="h-5 w-5 text-[#FFB400]" /> Mon-Sat 8am-6pm, Sun 1pm-5pm</div>
          </div>
          <div className="mt-6 flex gap-3">
            <a href="tel:0551365466" className="inline-flex h-11 items-center justify-center rounded-full bg-[#FFB400] px-6 text-[13px] font-bold text-black">Call Now</a>
            <a href={waLink} target="_blank" rel="noopener" className={`inline-flex h-11 items-center justify-center rounded-full border px-6 text-[13px] font-bold ${theme==="dark"?"border-white/15":"border-black/15"}`}>WhatsApp</a>
          </div>
        </div>

        <div className="mt-6 rounded-[18px] overflow-hidden border border-black/10">
          <iframe
            title="Madina New Road"
            src="https://www.google.com/maps?q=Madina%20New%20Road%20Accra%20Ghana&z=15&output=embed"
            className="h-[260px] w-full"
            loading="lazy"
          />
        </div>
      </div>

      <div className={`rounded-[24px] border p-6 md:p-8 ${theme==="dark"?"bg-[#111] border-white/10":"bg-white border-black/10"}`}>
        <h3 className="text-[18px] font-bold">Send us a message → WhatsApp</h3>
        <p className="mt-2 text-[13px] opacity-70">Form opens WhatsApp to 233551365466 with your details. No data stored - session only.</p>
        <div className="mt-6 grid gap-4">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className={`h-12 rounded-full border px-5 text-[14px] outline-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone e.g. 0551365466" className={`h-12 rounded-full border px-5 text-[14px] outline-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
          <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Which car are you looking for? Budget? etc." rows={5} className={`rounded-[20px] border p-4 text-[14px] outline-none resize-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
          <a href={waLink} target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFB400] font-bold text-black text-[14px]">
            <MessageCircle className="h-5 w-5" /> Send to WhatsApp 0551365466
          </a>
          <div className="text-[11px] opacity-60 text-center">We reply within 10 mins during work hours. Duty-paid papers ready.</div>
        </div>
      </div>
    </div>
  );
}

function AdminPage({ cars, setCars, theme }: { cars: Car[]; setCars: React.Dispatch<React.SetStateAction<Car[]>>; theme: "dark" | "light" }) {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [newCar, setNewCar] = useState<Partial<Car>>({
    name: "",
    model: "",
    year: 2022,
    price: 300000,
    category: "SUV",
    mileage: "20,000 km",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "2.0L",
    color: "White",
    mainImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200",
    features: ["Duty Paid", "DVLA"],
    description: "Fresh stock, duty paid",
  });

  const tryLogin = () => {
    if (pwd === "jint2026") setAuthed(true);
    else alert("Wrong password");
  };

  const addCar = () => {
    if (!newCar.name || !newCar.mainImage) { alert("Name and main image required"); return; }
    const id = (newCar.name || "car").toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const car: Car = {
      id,
      name: newCar.name as string,
      model: (newCar.model as string) || newCar.name as string,
      year: Number(newCar.year) || 2022,
      price: Number(newCar.price) || 300000,
      category: (newCar.category as Car["category"]) || "SUV",
      mileage: newCar.mileage || "20,000 km",
      fuel: newCar.fuel || "Petrol",
      transmission: newCar.transmission || "Automatic",
      engine: newCar.engine || "2.0L",
      color: newCar.color || "White",
      mainImage: newCar.mainImage as string,
      gallery: [newCar.mainImage as string, INTERIOR_1, INTERIOR_2],
      features: newCar.features || ["Duty Paid"],
      description: newCar.description || "New stock",
    };
    setCars([car, ...cars]);
    alert("Car added (session only). Refresh will reset to default 8.");
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-[420px] px-6 pt-20">
        <div className={`rounded-[22px] border p-8 ${theme==="dark"?"bg-[#111] border-white/10":"bg-white border-black/10"}`}>
          <div className="text-[12px] tracking-[0.22em] opacity-60">ADMIN LOGIN</div>
          <h2 className="mt-2 text-[22px] font-bold">Enter password to manage stock</h2>
          <p className="mt-2 text-[13px] opacity-70">Password is <code className="rounded bg-black/10 px-2 py-1">jint2026</code>. Session-only, no persistence.</p>
          <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Password" className={`mt-6 h-12 w-full rounded-full border px-5 text-[14px] outline-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
          <button onClick={tryLogin} className="mt-4 h-12 w-full rounded-full bg-[#FFB400] font-bold text-black">Unlock Admin</button>
          <Link to="/" className="mt-4 block text-center text-[12px] opacity-60 underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-8 pt-10 animate-[fadeUp_0.6s_ease]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[12px] tracking-[0.22em] opacity-60">ADMIN • SESSION ONLY</div>
          <h1 className="mt-2 text-[28px] font-[800]">Manage Inventory (in-memory preview)</h1>
          <p className="mt-1 text-[13px] opacity-70">Add/delete works live in this session. No localStorage - refresh resets to original 8 cars, per policy.</p>
        </div>
        <button onClick={() => setAuthed(false)} className={`rounded-full border px-5 py-2 text-[12px] font-bold ${theme==="dark"?"border-white/15":"border-black/15"}`}>Lock</button>
      </div>

      <div className="mt-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-8">
        <div className={`rounded-[22px] border p-6 ${theme==="dark"?"bg-[#111] border-white/10":"bg-white border-black/10"}`}>
          <h3 className="font-bold">Add New Car</h3>
          <div className="mt-5 grid gap-3 text-[13px]">
            <input placeholder="Name e.g. Toyota Prado 2020" value={newCar.name} onChange={e=>setNewCar({...newCar,name:e.target.value})} className={`h-11 rounded-full border px-4 outline-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Model" value={newCar.model} onChange={e=>setNewCar({...newCar,model:e.target.value})} className={`h-11 rounded-full border px-4 outline-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
              <input type="number" placeholder="Year" value={newCar.year as any} onChange={e=>setNewCar({...newCar,year:Number(e.target.value)})} className={`h-11 rounded-full border px-4 outline-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Price GHS" value={newCar.price as any} onChange={e=>setNewCar({...newCar,price:Number(e.target.value)})} className={`h-11 rounded-full border px-4 outline-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
              <select value={newCar.category} onChange={e=>setNewCar({...newCar,category:e.target.value as any})} className={`h-11 rounded-full border px-4 bg-transparent outline-none ${theme==="dark"?"border-white/10":"border-black/10"}`}>
                <option value="SUV">SUV</option><option value="Sedan">Sedan</option><option value="Luxury">Luxury</option>
              </select>
            </div>
            <input placeholder="Main Image URL (Unsplash)" value={newCar.mainImage} onChange={e=>setNewCar({...newCar,mainImage:e.target.value})} className={`h-11 rounded-full border px-4 outline-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Mileage" value={newCar.mileage} onChange={e=>setNewCar({...newCar,mileage:e.target.value})} className={`h-11 rounded-full border px-4 outline-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
              <input placeholder="Color" value={newCar.color} onChange={e=>setNewCar({...newCar,color:e.target.value})} className={`h-11 rounded-full border px-4 outline-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />
            </div>
            <textarea placeholder="Description" value={newCar.description} onChange={e=>setNewCar({...newCar,description:e.target.value})} rows={3} className={`rounded-[18px] border p-4 outline-none resize-none ${theme==="dark"?"bg-white/[0.06] border-white/10":"bg-black/[0.04] border-black/10"}`} />

            <div className="mt-2 overflow-hidden rounded-[14px] aspect-[16/10] bg-black/10">
              <img src={newCar.mainImage || HERO_BG} alt="Preview" className="h-full w-full object-cover" />
            </div>
            <button onClick={addCar} className="h-12 rounded-full bg-[#FFB400] font-bold text-black">Add Car to Session Inventory</button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Current Stock ({cars.length})</h3>
            <button onClick={() => setCars(INITIAL_CARS)} className="text-[12px] underline opacity-70">Reset to 8 defaults</button>
          </div>
          <div className="mt-5 grid gap-3">
            {cars.map((c) => (
              <div key={c.id} className={`flex gap-4 rounded-[18px] border p-3 items-center ${theme==="dark"?"bg-[#111] border-white/10":"bg-white border-black/10"}`}>
                <img src={c.mainImage} alt={c.name} className="h-14 w-20 rounded-[10px] object-cover" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[13px] truncate">{c.name}</div>
                  <div className="text-[12px] opacity-60">{formatGHS(c.price)} • {c.category}</div>
                </div>
                <button onClick={() => setCars(cars.filter(x=>x.id!==c.id))} className="grid h-8 w-8 place-items-center rounded-full bg-red-500/15 text-red-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- ROOT APP ----------
export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [cars, setCars] = useState<Car[]>(INITIAL_CARS);
  const [bookingCar, setBookingCar] = useState<Car | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleBook = (c: Car) => {
    setBookingCar(c);
    setShowBooking(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className={`${theme === "dark" ? "bg-[#0A0A0A] text-[#F5F3EF]" : "bg-[#F5F3EF] text-[#0A0A0A]"} min-h-screen antialiased selection:bg-[#FFB400]/30`}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
          *{font-family:'Plus Jakarta Sans',system-ui,sans-serif}
          @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        `}</style>

        <Header theme={theme} toggleTheme={toggleTheme} />

        <main className="pb-10">
          <Routes>
            <Route path="/" element={<HomePage cars={cars} theme={theme} onBook={handleBook} />} />
            <Route path="/inventory" element={<InventoryPage cars={cars} theme={theme} onBook={handleBook} />} />
            <Route path="/inventory/:id" element={<CarDetailPage cars={cars} theme={theme} onBook={handleBook} />} />
            <Route path="/about" element={<AboutPage theme={theme} />} />
            <Route path="/contact" element={<ContactPage theme={theme} />} />
            <Route path="/admin" element={<AdminPage cars={cars} setCars={setCars} theme={theme} />} />
            <Route path="*" element={
              <div className="mx-auto max-w-[800px] px-6 py-24 text-center">
                <div className="text-[64px] font-black">404</div>
                <p className="opacity-70">Page not found. Go to inventory.</p>
                <Link to="/inventory" className="mt-6 inline-flex rounded-full bg-[#FFB400] px-6 py-3 text-black font-bold">View Cars</Link>
              </div>
            }/>
          </Routes>
        </main>

        <Footer theme={theme} />

        <BookingModal car={bookingCar} open={showBooking} onClose={() => setShowBooking(false)} theme={theme} />

        {/* Floating Call */}
        <a href="tel:0551365466" className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#FFB400] text-black shadow-[0_12px_30px_rgba(0,0,0,0.3)] md:hidden">
          <Phone className="h-6 w-6" />
        </a>
      </div>
    </BrowserRouter>
  );
}
