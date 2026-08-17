import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '../App';
import { formatGHS } from '../App';

export function CarCard({ car, theme, onBook }) {
  const magRef = React.useRef(null);

  const handleMove = (event) => {
    const el = magRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
  };

  const handleLeave = () => {
    if (magRef.current) magRef.current.style.transform = 'translate(0px,0px)';
  };

  return (
    <div className={`group overflow-hidden rounded-[22px] border transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
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
          <button ref={magRef} onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={() => onBook(car)} className="inline-flex items-center gap-1 rounded-full bg-[#FFB400] px-4 py-2 text-[12px] font-bold text-black transition-transform">
            Book <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
