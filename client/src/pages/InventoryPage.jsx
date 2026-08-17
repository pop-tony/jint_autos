import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CarCard } from '../components/CarCard';

export function InventoryPage({ cars, theme, onBook }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('low');

  const filtered = cars
    .filter((car) => (cat === 'All' ? true : car.category === cat))
    .filter((car) => `${car.name} ${car.model} ${car.year}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
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
          <select value={sort} onChange={(event) => setSort(event.target.value)} className={`rounded-full border px-4 py-2 bg-transparent ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="year">Newest Year</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 items-center">
        <div className={`flex items-center gap-2 rounded-full border px-4 h-11 w-full md:w-[360px] ${theme === 'dark' ? 'border-white/15 bg-white/[0.06]' : 'border-black/15 bg-black/[0.04]'}`}>
          <Search className="h-4 w-4 opacity-60" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Prado, GLE, Lexus..." className="w-full bg-transparent outline-none text-[14px]" />
        </div>
        <div className="flex gap-2">
          {['All', 'SUV', 'Sedan', 'Luxury'].map((option) => (
            <button
              key={option}
              onClick={() => setCat(option)}
              className={`rounded-full px-5 h-11 text-[12px] font-bold tracking-wide border transition ${cat === option ? 'bg-[#FFB400] text-black border-[#FFB400]' : theme === 'dark' ? 'border-white/15 hover:bg-white/10' : 'border-black/15 hover:bg-black/5'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {filtered.map((car) => (
          <CarCard key={car.id} car={car} theme={theme} onBook={onBook} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 grid place-items-center rounded-[22px] border border-dashed p-16 text-center opacity-70">No cars match. Try another filter.</div>
      )}
    </div>
  );
}
