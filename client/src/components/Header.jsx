import React, { useState } from 'react';
import { Phone, Sun, Moon, Menu, X } from 'lucide-react';
import { Link, NavLink } from '../App';

export function Header({ theme, toggleTheme, settings }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${theme === 'dark' ? 'bg-[#0A0A0A]/80 border-white/10' : 'bg-[#F5F3EF]/80 border-black/10'}`}>
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src="/jint-autos-logo.png" alt="Jint Autos logo" className="h-10 w-10 rounded-full object-cover ring-1 ring-[#FFB400]/50 shadow-[0_0_0_2px_rgba(255,180,0,0.18)]" />
          <div className="leading-none">
            <div className="font-[800] tracking-[0.18em] text-[13px]">{settings.brandName.toUpperCase()}</div>
            <div className="text-[10px] opacity-60 tracking-[0.2em]">MADINA • GHANA</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-[0.12em] font-medium">
          {[
            { to: '/', label: 'HOME' },
            { to: '/inventory', label: 'INVENTORY' },
            { to: '/about', label: 'ABOUT' },
            { to: '/contact', label: 'CONTACT' },
            { to: '/admin', label: 'ADMIN' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `relative py-1 transition ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#FFB400] transition-all ${isActive ? 'w-full' : 'w-0'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${settings.phone}`} className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#FFB400] px-4 py-2 text-[12px] font-bold tracking-wide text-black">
            <Phone className="h-4 w-4" /> {settings.phone}
          </a>
          <button
            onClick={toggleTheme}
            className={`grid h-9 w-9 place-items-center rounded-full border transition ${theme === 'dark' ? 'border-white/15 hover:bg-white/10' : 'border-black/15 hover:bg-black/5'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-white/10" onClick={() => setOpen(!open)}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`md:hidden border-t px-6 py-6 ${theme === 'dark' ? 'bg-[#0A0A0A] border-white/10' : 'bg-[#F5F3EF] border-black/10'}`}>
          <div className="flex flex-col gap-4 text-[13px] tracking-wide">
            <Link to="/" onClick={() => setOpen(false)}>HOME</Link>
            <Link to="/inventory" onClick={() => setOpen(false)}>INVENTORY</Link>
            <Link to="/about" onClick={() => setOpen(false)}>ABOUT</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>CONTACT</Link>
            <Link to="/admin" onClick={() => setOpen(false)}>ADMIN</Link>
            <a href={`tel:${settings.phone}`} className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#FFB400] px-5 py-3 text-black font-bold">
              <Phone className="h-4 w-4" /> Call {settings.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
