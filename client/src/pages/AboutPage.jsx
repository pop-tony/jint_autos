import React from 'react';

export function AboutPage({ theme }) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-8 py-12 animate-[fadeUp_0.6s_ease]">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
        <div>
          <div className="text-[12px] tracking-[0.22em] opacity-60">ABOUT JINT AUTOS</div>
          <h1 className="mt-3 text-[32px] md:text-[44px] font-[850] tracking-[-0.02em] leading-[0.95]">Built on trust, paperwork, and real value.</h1>
          <p className="mt-5 text-[15px] leading-7 opacity-80">Jint Autos was founded to make vehicle buying in Ghana easier and clearer. We help buyers compare cars, inspect documents, and confidently complete a purchase without hidden costs or confusion.</p>
          <p className="mt-4 text-[15px] leading-7 opacity-80">At our Madina showroom, we focus on duty-paid vehicles, verified histories, and transparent pricing in GHS — so the experience feels professional from first call to final handover.</p>
        </div>
        <div className={`rounded-[26px] border p-8 ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ['8+', 'Years in business'],
              ['500+', 'Cars sold'],
              ['100%', 'Duty-paid stock'],
              ['24/7', 'WhatsApp support'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[18px] border p-5 text-center">
                <div className="text-[28px] font-[800] text-[#FFB400]">{value}</div>
                <div className="mt-2 text-[12px] tracking-[0.18em] opacity-60">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {[
          ['Transparent pricing', 'We quote clear GHS values and explain all paperwork before purchase.'],
          ['Verified cars', 'Each unit is checked for mileage, papers, condition, and road-worthiness.'],
          ['After-sales help', 'We remain available after the sale for follow-up questions and support.'],
        ].map(([title, desc]) => (
          <div key={title} className={`rounded-[22px] border p-6 ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
            <div className="mb-4 h-11 w-11 rounded-full bg-[#FFB400] text-black grid place-items-center font-black">✓</div>
            <div className="text-[18px] font-bold">{title}</div>
            <div className="mt-2 text-[14px] leading-6 opacity-75">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
