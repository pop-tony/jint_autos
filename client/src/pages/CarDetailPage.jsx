import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Phone, MessageCircle } from 'lucide-react';
import { Link, useNavigate, useParams, formatGHS } from '../App';
import { CarCard } from '../components/CarCard';

export function CarDetailPage({ cars, theme, onBook }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find((item) => item.id === id);
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

  const related = cars.filter((item) => item.category === car.category && item.id !== car.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-8 pt-8 animate-[fadeUp_0.6s_ease]">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-[12px] tracking-wide opacity-70 hover:opacity-100">
        <ChevronRight className="h-4 w-4 rotate-180" /> Back
      </button>

      <div className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <div>
          <div className="relative overflow-hidden rounded-[24px] aspect-[16/11] bg-black/10">
            <img src={car.gallery[activeImg]} alt={`${car.name} view ${activeImg + 1}`} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute bottom-3 left-3 flex gap-2">
              {car.gallery.map((image, index) => (
                <button key={index} onClick={() => setActiveImg(index)} className={`h-2 w-8 rounded-full transition ${index === activeImg ? 'bg-[#FFB400]' : 'bg-white/50'}`} />
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {car.gallery.map((image, index) => (
              <button key={index} onClick={() => setActiveImg(index)} className={`overflow-hidden rounded-[14px] aspect-[16/11] border-2 ${index === activeImg ? 'border-[#FFB400]' : 'border-transparent'}`}>
                <img src={image} alt={`${car.name} thumb ${index + 1}`} className="h-full w-full object-cover hover:scale-105 transition" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="inline-flex gap-2">
            <span className="rounded-full bg-[#FFB400] px-3 py-1 text-[11px] font-bold text-black">{car.category}</span>
            <span className={`rounded-full border px-3 py-1 text-[11px] font-bold ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>{car.year} • {car.mileage}</span>
          </div>
          <h1 className="mt-4 text-[30px] md:text-[38px] font-[850] leading-[0.95] tracking-[-0.02em]">{car.name}</h1>
          <div className="mt-1 text-[14px] opacity-60">{car.model} • {car.color}</div>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="text-[32px] font-[900]">{formatGHS(car.price)}</div>
            <div className="text-[12px] opacity-60 tracking-wide">DUTY PAID • DVLA</div>
          </div>

          <p className="mt-5 text-[14px] leading-7 opacity-80">{car.description}</p>

          <div className={`mt-8 overflow-hidden rounded-[18px] border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
            <div className={`grid grid-cols-2 text-[13px] divide-x divide-y ${theme === 'dark' ? 'divide-white/10' : 'divide-black/10'}`}>
              {[
                ['Engine', car.engine],
                ['Fuel', car.fuel],
                ['Transmission', car.transmission],
                ['Color', car.color],
                ['Mileage', car.mileage],
                ['Year', String(car.year)],
              ].map(([key, value]) => (
                <div key={key} className="flex justify-between gap-3 px-4 py-3">
                  <span className="opacity-60">{key}</span><span className="font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[12px] tracking-[0.2em] opacity-60 font-bold">FEATURES</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {car.features.map((feature) => (
                <span key={feature} className={`rounded-full border px-3 py-1 text-[11px] ${theme === 'dark' ? 'border-white/15 bg-white/[0.04]' : 'border-black/10 bg-black/[0.03]'}`}>{feature}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button onClick={() => onBook(car)} className="h-12 rounded-full bg-[#FFB400] text-black font-bold text-[13px] inline-flex items-center justify-center gap-2">
              <Play className="h-4 w-4" /> Book Test Drive
            </button>
            <a href={`https://wa.me/233551365466?text=${encodeURIComponent(`Hi Jint Autos, I'm interested in ${car.year} ${car.name} - ${formatGHS(car.price)} (${car.id}). Is it still available?`)}`} target="_blank" rel="noopener" className={`h-12 rounded-full border font-bold text-[13px] inline-flex items-center justify-center gap-2 ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <a href="tel:0551365466" className={`mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border text-[13px] font-bold ${theme === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-black/[0.04]'}`}>
            <Phone className="h-4 w-4" /> Call 0551365466 now
          </a>
          <div className="mt-3 text-[11px] opacity-60 text-center">Madina New Road showroom • GRA & DVLA papers ready for inspection</div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h3 className="text-[18px] font-bold tracking-wide">Related {car.category}s</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <CarCard key={item.id} car={item} theme={theme} onBook={onBook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
