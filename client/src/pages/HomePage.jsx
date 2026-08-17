import React from 'react';
import { MessageCircle, ChevronRight, ShieldCheck, Award, Banknote, Users } from 'lucide-react';
import { Link } from '../App';
import { CarCard } from '../components/CarCard';
import { HERO_BG } from '../data/cars';

export function HomePage({ cars, theme, onBook }) {
  const featured = cars.slice(0, 3);

  return (
    <div className="animate-[fadeUp_0.7s_ease]">
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
                { k: '500+', v: 'Cars Sold' },
                { k: '8 yrs', v: 'In Madina' },
                { k: '100%', v: 'Duty Paid' },
              ].map((stat) => (
                <div key={stat.k}>
                  <div className="text-[26px] font-[800] leading-none">{stat.k}</div>
                  <div className="mt-1 text-[11px] tracking-[0.18em] opacity-70">{stat.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </section>

      <section className="mx-auto max-w-[1320px] px-6 md:px-8 mt-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[12px] tracking-[0.22em] opacity-60">FEATURED THIS WEEK</div>
            <h2 className="mt-2 text-[28px] md:text-[36px] font-[800] tracking-[-0.02em]">Fresh arrivals, papers ready</h2>
          </div>
          <Link to="/inventory" className={`hidden md:inline-flex items-center gap-2 rounded-full border px-5 py-2 text-[12px] font-bold ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>
            See all 8 <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} theme={theme} onBook={onBook} />
          ))}
        </div>
      </section>

      <section className={`mt-20 border-y ${theme === 'dark' ? 'border-white/10 bg-[#0F0F0F]' : 'border-black/10 bg-white'}`}>
        <div className="mx-auto max-w-[1320px] px-6 md:px-8 py-14 grid md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: 'Duty & DVLA', desc: 'Every car fully duty paid with GRA receipt + DVLA. We show papers before payment.' },
            { icon: Award, title: 'No Accident Stories', desc: 'Verified VIN, inspection, honest mileage. We reject flood or salvaged units.' },
            { icon: Banknote, title: 'Fair GHS Pricing', desc: 'Cedi pricing, no hidden dollar surprises. Swap & installment options via partners.' },
            { icon: Users, title: 'Madina Trusted', desc: '8 years on New Road. Ask around. Real showroom, real after-sales.' },
          ].map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#FFB400] text-black"><feature.icon className="h-5 w-5" /></div>
              <div>
                <div className="font-bold text-[14px]">{feature.title}</div>
                <div className="mt-1 text-[13px] leading-6 opacity-70">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
