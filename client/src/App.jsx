import React, { useState, useEffect, useContext, createContext } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { INITIAL_CARS } from './data/cars';
import { DEFAULT_SITE_SETTINGS } from './data/siteDefaults';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { CarDetailPage } from './pages/CarDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

const RouterContext = createContext({ pathname: '/', params: {}, navigate: () => {} });

function matchPath(pattern, pathname) {
  if (pattern === '*') return { matched: true, params: {} };
  const pParts = pattern.split('/').filter(Boolean);
  const pathParts = pathname.split('/').filter(Boolean);

  if (pParts.length === 0 && pathParts.length === 0) return { matched: true, params: {} };
  if (pParts.length !== pathParts.length && !pattern.includes(':')) {
    if (pattern !== pathname) return { matched: false, params: {} };
  }
  if (pParts.length !== pathParts.length) return { matched: false, params: {} };

  const params = {};
  for (let i = 0; i < pParts.length; i += 1) {
    if (pParts[i].startsWith(':')) {
      params[pParts[i].slice(1)] = decodeURIComponent(pathParts[i]);
    } else if (pParts[i] !== pathParts[i]) {
      return { matched: false, params: {} };
    }
  }

  return { matched: true, params };
}

export function BrowserRouter({ children }) {
  const [pathname, setPathname] = useState(() => (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const [params, setParams] = useState({});

  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to) => {
    if (to === pathname) return;
    window.history.pushState({}, '', to);
    setPathname(to);
  };

  return (
    <RouterContext.Provider value={{ pathname, params, navigate }}>
      <RouteParamsSetter setParams={setParams} pathname={pathname} />
      {children}
    </RouterContext.Provider>
  );
}

function RouteParamsSetter({ setParams, pathname }) {
  useEffect(() => {
    setParams({});
  }, [pathname, setParams]);

  return null;
}

export function Routes({ children }) {
  const { pathname } = useContext(RouterContext);
  const [currentParams, setCurrentParams] = useState({});

  let matchedElement = null;
  React.Children.forEach(children, (child) => {
    if (matchedElement || !child || !child.props) return;
    const { path, element } = child.props;
    const match = matchPath(path, pathname);
    if (match.matched) {
      matchedElement = element;
      if (JSON.stringify(match.params) !== JSON.stringify(currentParams)) {
        queueMicrotask(() => setCurrentParams(match.params));
      }
    }
  });

  const ctx = useContext(RouterContext);
  const merged = { ...ctx, params: currentParams };

  if (!matchedElement) {
    React.Children.forEach(children, (child) => {
      if (matchedElement) return;
      if (child?.props?.path === '*') matchedElement = child.props.element;
    });
  }

  return <RouterContext.Provider value={merged}>{matchedElement}</RouterContext.Provider>;
}

export function Route({ path, element }) {
  return null;
}

export function Link({ to, children, className, onClick, ...rest }) {
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

export function NavLink({ to, children, className }) {
  const { pathname, navigate } = useContext(RouterContext);
  const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));
  const cls = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <a
      href={to}
      className={cls}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  );
}

export function useLocation() {
  const { pathname } = useContext(RouterContext);
  return { pathname };
}

export function useParams() {
  const { params } = useContext(RouterContext);
  return params;
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function formatGHS(value) {
  return `GHS ${Number(value).toLocaleString()}`;
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [cars, setCars] = useState(INITIAL_CARS);
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [bookingCar, setBookingCar] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  const handleBook = (car) => {
    setBookingCar(car);
    setShowBooking(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className={`${theme === 'dark' ? 'bg-[#0A0A0A] text-[#F5F3EF]' : 'bg-[#F5F3EF] text-[#0A0A0A]'} min-h-screen antialiased selection:bg-[#FFB400]/30`}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
          *{font-family:'Plus Jakarta Sans',system-ui,sans-serif}
          @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
        `}</style>

        <Header theme={theme} toggleTheme={toggleTheme} settings={siteSettings} />

        <main className="pb-10">
          <Routes>
            <Route path="/" element={<HomePage cars={cars} theme={theme} onBook={handleBook} />} />
            <Route path="/inventory" element={<InventoryPage cars={cars} theme={theme} onBook={handleBook} />} />
            <Route path="/inventory/:id" element={<CarDetailPage cars={cars} theme={theme} onBook={handleBook} />} />
            <Route path="/about" element={<AboutPage theme={theme} />} />
            <Route path="/contact" element={<ContactPage theme={theme} />} />
            <Route path="/admin" element={<AdminPage cars={cars} setCars={setCars} theme={theme} settings={siteSettings} setSettings={setSiteSettings} />} />
            <Route
              path="*"
              element={
                <div className="mx-auto max-w-[800px] px-6 py-24 text-center">
                  <div className="text-[64px] font-black">404</div>
                  <p className="opacity-70">Page not found. Go to inventory.</p>
                  <Link to="/inventory" className="mt-6 inline-flex rounded-full bg-[#FFB400] px-6 py-3 text-black font-bold">
                    View Cars
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer theme={theme} settings={siteSettings} />
        <BookingModal car={bookingCar} open={showBooking} onClose={() => setShowBooking(false)} theme={theme} />

        <a href="tel:0551365466" className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#FFB400] text-black shadow-[0_12px_30px_rgba(0,0,0,0.3)] md:hidden">
          <Phone className="h-6 w-6" />
        </a>
      </div>
    </BrowserRouter>
  );
}

