import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock3, MessageCircle, ArrowRight } from 'lucide-react';

export function ContactPage({ theme }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const waLink = `https://wa.me/233551365466?text=${encodeURIComponent(
    `Hello Jint Autos, Name: ${name || 'Guest'}, Phone: ${phone || 'N/A'}, Message: ${message || 'I need info about your cars in Madina.'}`
  )}`;

  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-8 py-12 animate-[fadeUp_0.6s_ease]">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
        <div>
          <div className="text-[12px] tracking-[0.22em] opacity-60">CONTACT • MADINA SHOWROOM</div>
          <h1 className="mt-3 text-[32px] md:text-[44px] font-[850] leading-[0.95] tracking-[-0.02em]">Visit us or reach out on WhatsApp.</h1>

          <div className={`mt-8 rounded-[22px] border p-6 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
            <div className="grid gap-4 text-[14px]">
              <div className="flex gap-3"><MapPin className="h-5 w-5 text-[#FFB400] shrink-0" /> <span>Madina New Road, Behind Madina Market, Near Zongo Junction, Accra, Ghana</span></div>
              <div className="flex gap-3"><Phone className="h-5 w-5 text-[#FFB400] shrink-0" /> <span>0551365466 (Call / WhatsApp) — 24/7 response</span></div>
              <div className="flex gap-3"><Mail className="h-5 w-5 text-[#FFB400] shrink-0" /> <span>jintautos.madina@gmail.com</span></div>
              <div className="flex gap-3"><Clock3 className="h-5 w-5 text-[#FFB400] shrink-0" /> <span>Mon-Sat 8am-6pm, Sun 1pm-5pm</span></div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:0551365466" className="inline-flex h-11 items-center justify-center rounded-full bg-[#FFB400] px-6 text-[13px] font-bold text-black">Call Now</a>
              <a href={waLink} target="_blank" rel="noopener" className={`inline-flex h-11 items-center justify-center rounded-full border px-6 text-[13px] font-bold ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>WhatsApp</a>
            </div>
          </div>
        </div>

        <div className={`rounded-[24px] border p-6 md:p-8 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
          <h3 className="text-[18px] font-bold">Send us a message</h3>
          <p className="mt-2 text-[13px] opacity-70">This opens WhatsApp with your details, so you can quickly ask about pricing or arrange a test drive.</p>

          <div className="mt-6 grid gap-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={`h-12 rounded-full border px-5 text-[14px] outline-none ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone e.g. 0551365466" className={`h-12 rounded-full border px-5 text-[14px] outline-none ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Which car are you looking for? Budget? etc." rows={5} className={`rounded-[20px] border p-4 text-[14px] outline-none resize-none ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
            <a href={waLink} target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFB400] font-bold text-black text-[14px]">
              <MessageCircle className="h-5 w-5" /> Send to WhatsApp
            </a>
            <div className="text-[11px] opacity-60 text-center">We reply quickly during work hours. Duty-paid papers and inspiring test drives are ready.</div>
          </div>
        </div>
      </div>

      <div className="mt-12 overflow-hidden rounded-[26px] border border-white/10">
        <iframe
          title="Jint Autos location map"
          src="https://www.google.com/maps?q=Madina%20New%20Road%20Accra%20Ghana&z=15&output=embed"
          className="h-[360px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 rounded-[20px] border border-dashed border-[#FFB400]/40 bg-[#FFB400]/5 px-5 py-4">
        <div>
          <div className="text-[11px] tracking-[0.2em] opacity-60">DRIVE IN</div>
          <div className="mt-1 text-[16px] font-bold">Madina New Road • Showroom Open Today</div>
        </div>
        <a href="https://wa.me/233551365466" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#FFB400] px-4 py-2 text-[12px] font-bold text-black">
          Get Directions <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
