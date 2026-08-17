import React from 'react';
import { MapPin, Mail, Clock, Phone, MessageCircle } from 'lucide-react';
import { Link } from '../App';

export function Footer({ theme, settings }) {
  return (
    <footer className={`mt-24 border-t ${theme === 'dark' ? 'border-white/10 bg-[#0A0A0A]' : 'border-black/10 bg-[#F5F3EF]'}`}>
      <div className="mx-auto max-w-[1320px] px-6 py-14 md:px-8 grid md:grid-cols-[1.4fr_0.8fr_0.8fr] gap-10">
        <div>
          <div className="flex items-center gap-3">
            <img src="/jint-autos-logo.png" alt="Jint Autos logo" className="h-10 w-10 rounded-full object-cover ring-1 ring-[#FFB400]/50" />
            <span className="font-[800] tracking-[0.18em] text-[13px]">JINT AUTOS</span>
          </div>
          <p className="mt-4 max-w-[38ch] text-[14px] leading-6 opacity-70">
            Luxury & everyday cars, fully duty paid, DVLA registered. Madina New Road, behind Madina Market. Trusted by 500+ Ghanaian drivers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-[13px]">
            <a href="tel:0551365466" className="inline-flex items-center gap-2 rounded-full bg-[#FFB400] px-4 py-2 font-bold text-black">
              <Phone className="h-4 w-4" /> 0551365466
            </a>
            <a href="https://wa.me/233551365466" target="_blank" rel="noopener" className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="text-[13px] leading-7 opacity-80">
          <div className="mb-3 font-bold tracking-[0.15em] text-[12px] opacity-100">SHOWROOM</div>
          <div className="flex gap-2"><MapPin className="h-4 w-4 mt-1" /> {settings.address}</div>
          <div className="flex gap-2 mt-2"><Mail className="h-4 w-4 mt-1" /> {settings.email}</div>
          <div className="flex gap-2 mt-2"><Clock className="h-4 w-4 mt-1" /> {settings.hours}</div>
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

      <div className={`border-t py-4 text-center text-[11px] tracking-wide opacity-60 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
        © {new Date().getFullYear()} {settings.brandName} • {settings.footerText}
      </div>
    </footer>
  );
}
