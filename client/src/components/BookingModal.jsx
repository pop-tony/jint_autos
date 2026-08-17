import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { formatGHS } from '../App';

export function BookingModal({ car, open, onClose, theme }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  if (!open || !car) return null;

  const waText = encodeURIComponent(
    `Hello Jint Autos, I want to book a TEST DRIVE for ${car.year} ${car.name} (${car.model}) - ${formatGHS(car.price)}. My name: ${name || '[Your Name]'}, Phone: ${phone || '055...'}, Preferred Date: ${date || 'ASAP'}. Please confirm. Madina showroom.`
  );
  const waLink = `https://wa.me/233551365466?text=${waText}`;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/60 backdrop-blur-md p-4">
      <div className={`w-full max-w-[520px] rounded-[24px] p-6 md:p-8 shadow-2xl ${theme === 'dark' ? 'bg-[#111] text-white border border-white/10' : 'bg-white text-black border border-black/10'}`}>
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
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your Name" className={`h-12 rounded-full px-5 text-[14px] outline-none border ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
          <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone e.g. 0551365466" className={`h-12 rounded-full px-5 text-[14px] outline-none border ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className={`h-12 rounded-full px-5 text-[14px] outline-none border ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a href={waLink} target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFB400] text-black font-bold text-[13px]">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a href="tel:0551365466" className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border font-bold text-[13px] ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </div>
        <div className="mt-4 text-center text-[11px] opacity-60">Opens WhatsApp to 233551365466 with prefilled details. DVLA & duty papers ready.</div>
      </div>
    </div>
  );
}
