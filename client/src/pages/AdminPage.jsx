import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from '../App';
import { INITIAL_CARS, HERO_BG, INTERIOR_1, INTERIOR_2 } from '../data/cars';

function formatGHS(value) {
  return `GHS ${Number(value).toLocaleString()}`;
}

function SettingsEditor({ settings, setSettings, theme }) {
  return (
    <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.9fr]">
      <div className={`rounded-[24px] border p-6 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
        <div className="text-[12px] tracking-[0.2em] opacity-60">SITE SETTINGS</div>
        <h3 className="mt-2 text-[22px] font-[800]">Brand and contact configuration</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input value={settings.brandName} onChange={(e) => setSettings((s) => ({ ...s, brandName: e.target.value }))} placeholder="Brand name" className={`h-11 rounded-full border px-4 ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
          <input value={settings.phone} onChange={(e) => setSettings((s) => ({ ...s, phone: e.target.value }))} placeholder="Phone" className={`h-11 rounded-full border px-4 ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
          <input value={settings.whatsapp} onChange={(e) => setSettings((s) => ({ ...s, whatsapp: e.target.value }))} placeholder="WhatsApp number" className={`h-11 rounded-full border px-4 ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
          <input value={settings.email} onChange={(e) => setSettings((s) => ({ ...s, email: e.target.value }))} placeholder="Email" className={`h-11 rounded-full border px-4 ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
          <div className="md:col-span-2">
            <input value={settings.address} onChange={(e) => setSettings((s) => ({ ...s, address: e.target.value }))} placeholder="Address" className={`h-11 w-full rounded-full border px-4 ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
          </div>
          <div className="md:col-span-2">
            <input value={settings.hours} onChange={(e) => setSettings((s) => ({ ...s, hours: e.target.value }))} placeholder="Opening hours" className={`h-11 w-full rounded-full border px-4 ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
          </div>
          <div className="md:col-span-2">
            <textarea value={settings.announcement} onChange={(e) => setSettings((s) => ({ ...s, announcement: e.target.value }))} rows={4} placeholder="Announcement" className={`w-full rounded-[18px] border p-4 resize-none ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
          </div>
          <select value={settings.status} onChange={(e) => setSettings((s) => ({ ...s, status: e.target.value }))} className={`h-11 rounded-full border px-4 ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`}>
            <option value="Open">Open</option>
            <option value="Busy">Busy</option>
            <option value="Closed">Closed</option>
          </select>
          <input type="color" value={settings.accent} onChange={(e) => setSettings((s) => ({ ...s, accent: e.target.value }))} className="h-11 w-full rounded-full border border-transparent bg-transparent p-1" />
        </div>
      </div>

      <div className={`rounded-[24px] border p-6 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
        <div className="text-[12px] tracking-[0.2em] opacity-60">LIVE PREVIEW</div>
        <div className="mt-5 rounded-[20px] border border-dashed p-5" style={{ borderColor: settings.accent }}>
          <div className="flex items-center gap-3">
            <img src="/jint-autos-logo.png" alt="Jint Autos logo" className="h-10 w-10 rounded-full object-cover ring-1 ring-[#FFB400]/50" />
            <div>
              <div className="text-[13px] font-[800] tracking-[0.12em]">{settings.brandName.toUpperCase()}</div>
              <div className="text-[10px] opacity-60 tracking-[0.18em]">MADINA • GHANA</div>
            </div>
          </div>

          <div className="mt-5 rounded-[18px] p-4" style={{ background: `${settings.accent}22` }}>
            <div className="text-[11px] uppercase tracking-[0.18em] opacity-70">Announcement</div>
            <div className="mt-2 text-[13px] leading-6">{settings.announcement}</div>
          </div>

          <div className="mt-5 grid gap-2 text-[12px] opacity-75">
            <div>Phone: {settings.phone}</div>
            <div>Email: {settings.email}</div>
            <div>Hours: {settings.hours}</div>
          </div>

          <button className="mt-5 rounded-full px-4 py-2 text-[12px] font-bold text-black" style={{ background: settings.accent }}>Save site settings</button>
        </div>
      </div>
    </div>
  );
}

export function AdminPage({ cars, setCars, theme, settings, setSettings }) {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState('');
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 700000]);
  const [newCar, setNewCar] = useState({
    name: '',
    model: '',
    year: 2022,
    price: 300000,
    category: 'SUV',
    mileage: '20,000 km',
    fuel: 'Petrol',
    transmission: 'Automatic',
    engine: '2.0L',
    color: 'White',
    mainImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200',
    features: ['Duty Paid', 'DVLA'],
    description: 'Fresh stock, duty paid',
  });

  const tryLogin = () => {
    if (pwd === 'jint2026') {
      setAuthed(true);
      return;
    }
    alert('Wrong password');
  };

  // Analytics
  const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
  const averagePrice = cars.length ? Math.round(totalValue / cars.length) : 0;
  
  const categoryBreakdown = {
    SUV: cars.filter(c => c.category === 'SUV').length,
    Sedan: cars.filter(c => c.category === 'Sedan').length,
    Luxury: cars.filter(c => c.category === 'Luxury').length,
  };

  const luxuryCount = cars.filter(c => c.category === 'Luxury').length;
  const luxuryValue = cars.filter(c => c.category === 'Luxury').reduce((sum, car) => sum + car.price, 0);
  const avgLuxuryPrice = luxuryCount ? Math.round(luxuryValue / luxuryCount) : 0;

  // Filtered inventory
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || car.category === categoryFilter;
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const addCar = () => {
    if (!newCar.name || !newCar.mainImage) {
      alert('Name and main image required');
      return;
    }

    const id = `${(newCar.name || 'car').toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    const car = {
      id,
      name: newCar.name,
      model: newCar.model || newCar.name,
      year: Number(newCar.year) || 2022,
      price: Number(newCar.price) || 300000,
      category: newCar.category || 'SUV',
      mileage: newCar.mileage || '20,000 km',
      fuel: newCar.fuel || 'Petrol',
      transmission: newCar.transmission || 'Automatic',
      engine: newCar.engine || '2.0L',
      color: newCar.color || 'White',
      mainImage: newCar.mainImage,
      gallery: [newCar.mainImage, INTERIOR_1, INTERIOR_2],
      features: newCar.features || ['Duty Paid'],
      description: newCar.description || 'New stock',
    };

    setCars((currentCars) => [car, ...currentCars]);
    alert('Car added (session only). Refresh will reset to default stock.');
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-[420px] px-6 pt-20">
        <div className={`rounded-[22px] border p-8 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
          <div className="text-[12px] tracking-[0.22em] opacity-60">ADMIN LOGIN</div>
          <h2 className="mt-2 text-[22px] font-bold">Enter password to manage stock</h2>
          <p className="mt-2 text-[13px] opacity-70">Password is <code className="rounded bg-black/10 px-2 py-1">jint2026</code>. Session-only, no persistence.</p>
          <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Password" className={`mt-6 h-12 w-full rounded-full border px-5 text-[14px] outline-none ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
          <button onClick={tryLogin} className="mt-4 h-12 w-full rounded-full bg-[#FFB400] font-bold text-black">Unlock Admin</button>
          <Link to="/" className="mt-4 block text-center text-[12px] opacity-60 underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 md:px-8 pt-10 animate-[fadeUp_0.6s_ease]">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-[12px] tracking-[0.22em] opacity-60">ADMIN • SESSION ONLY</div>
          <h1 className="mt-2 text-[28px] font-[800]">Dealership Management</h1>
          <p className="mt-1 text-[13px] opacity-70">Real-time inventory and analytics dashboard</p>
        </div>
        <button onClick={() => setAuthed(false)} className={`rounded-full border px-5 py-2 text-[12px] font-bold ${theme === 'dark' ? 'border-white/15' : 'border-black/15'}`}>Lock</button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className={`rounded-[20px] border p-5 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
          <div className="text-[11px] tracking-[0.18em] opacity-60">TOTAL INVENTORY</div>
          <div className="mt-3 text-[32px] font-[900]">{cars.length}</div>
          <div className="mt-2 text-[11px] opacity-60">{formatGHS(totalValue)} total value</div>
        </div>
        <div className={`rounded-[20px] border p-5 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
          <div className="text-[11px] tracking-[0.18em] opacity-60">AVERAGE PRICE</div>
          <div className="mt-3 text-[32px] font-[900]">{formatGHS(averagePrice)}</div>
          <div className="mt-2 text-[11px] opacity-60">Across all stock</div>
        </div>
        <div className={`rounded-[20px] border p-5 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
          <div className="text-[11px] tracking-[0.18em] opacity-60">LUXURY SEGMENT</div>
          <div className="mt-3 text-[32px] font-[900]">{luxuryCount}</div>
          <div className="mt-2 text-[11px] opacity-60">{formatGHS(avgLuxuryPrice)} avg</div>
        </div>
        <div className={`rounded-[20px] border p-5 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
          <div className="text-[11px] tracking-[0.18em] opacity-60">STORE STATUS</div>
          <div className="mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold text-black" style={{ background: settings.status === 'Open' ? '#34D399' : settings.status === 'Busy' ? '#FBBF24' : '#F87171' }}>{settings.status}</div>
          <div className="mt-2 text-[11px] opacity-60">{settings.hours.split('•')[0]}</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className={`rounded-[20px] border p-6 mb-8 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
        <div className="text-[12px] tracking-[0.18em] opacity-60">INVENTORY BREAKDOWN</div>
        <div className="mt-4 grid grid-cols-3 gap-4 md:gap-6">
          {['SUV', 'Sedan', 'Luxury'].map((cat) => (
            <div key={cat} className="text-center">
              <div className="text-[24px] font-[900]">{categoryBreakdown[cat]}</div>
              <div className="mt-1 text-[12px] opacity-60">{cat}</div>
              <div className="mt-2 text-[11px] opacity-50">{Math.round((categoryBreakdown[cat] / cars.length) * 100)}% of total</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 border-b border-white/10">
        {[
          { id: 'inventory', label: 'INVENTORY' },
          { id: 'add', label: 'ADD STOCK' },
          { id: 'settings', label: 'SETTINGS' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-[12px] font-bold tracking-[0.15em] border-b-2 transition ${
              activeTab === tab.id
                ? `border-[#FFB400] text-[#FFB400]`
                : `border-transparent opacity-60 hover:opacity-100`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className={`rounded-[20px] border p-6 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
            <div className="text-[12px] tracking-[0.18em] opacity-60 mb-4">ADVANCED FILTERS</div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] opacity-70 block mb-2">Search by name or model</label>
                <input
                  type="text"
                  placeholder="Toyota, Prado, Mercedes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full h-11 rounded-full border px-4 text-[13px] outline-none ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`}
                />
              </div>
              <div>
                <label className="text-[11px] opacity-70 block mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className={`w-full h-11 rounded-full border px-4 text-[13px] bg-transparent outline-none ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}
                >
                  <option>All</option>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Luxury</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] opacity-70 block mb-2">Price range: {formatGHS(priceRange[0])} - {formatGHS(priceRange[1])}</label>
                <input
                  type="range"
                  min="0"
                  max="700000"
                  step="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-4 text-[12px] opacity-70">
              Showing {filteredCars.length} of {cars.length} vehicles
            </div>
          </div>

          {/* Stock List */}
          <div className={`rounded-[20px] border p-6 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-bold">Current Stock ({filteredCars.length})</h3>
              <button onClick={() => setCars(INITIAL_CARS)} className="text-[12px] underline opacity-70 hover:opacity-100">Reset to defaults</button>
            </div>
            <div className="grid gap-3 max-h-[600px] overflow-y-auto">
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <div key={car.id} className={`flex gap-4 rounded-[16px] border p-4 items-center transition hover:border-[#FFB400]/50 ${theme === 'dark' ? 'bg-[#111] border-white/5' : 'bg-white border-black/5'}`}>
                    <img src={car.mainImage} alt={car.name} className="h-16 w-24 rounded-[12px] object-cover flex-shrink-0" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[13px]">{car.name}</div>
                      <div className="text-[12px] opacity-60">{car.model} • {car.year}</div>
                      <div className="mt-2 flex gap-3 text-[11px] opacity-70">
                        <span>{car.mileage}</span>
                        <span>{car.fuel}</span>
                        <span>{car.color}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-[14px]">{formatGHS(car.price)}</div>
                      <div className={`mt-1 px-2 py-1 rounded-full text-[10px] font-bold text-black ${car.category === 'Luxury' ? 'bg-purple-400' : car.category === 'Sedan' ? 'bg-blue-400' : 'bg-amber-400'}`}>
                        {car.category}
                      </div>
                    </div>
                    <button onClick={() => setCars((currentCars) => currentCars.filter((item) => item.id !== car.id))} className="grid h-8 w-8 place-items-center rounded-full bg-red-500/15 text-red-500 hover:bg-red-500/25 flex-shrink-0">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 opacity-60">
                  <div className="text-[13px]">No vehicles match your filters</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Stock Tab */}
      {activeTab === 'add' && (
        <div className={`rounded-[22px] border p-8 ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
          <div className="max-w-2xl">
            <h3 className="text-[16px] font-bold mb-6">Add New Vehicle to Inventory</h3>
            <div className="grid gap-4">
              <input placeholder="Vehicle name e.g. Toyota Prado 2020" value={newCar.name} onChange={(e) => setNewCar({ ...newCar, name: e.target.value })} className={`h-11 rounded-full border px-4 outline-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
              
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Model" value={newCar.model} onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} className={`h-11 rounded-full border px-4 outline-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
                <input type="number" placeholder="Year" value={newCar.year} onChange={(e) => setNewCar({ ...newCar, year: Number(e.target.value) })} className={`h-11 rounded-full border px-4 outline-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price GHS" value={newCar.price} onChange={(e) => setNewCar({ ...newCar, price: Number(e.target.value) })} className={`h-11 rounded-full border px-4 outline-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
                <select value={newCar.category} onChange={(e) => setNewCar({ ...newCar, category: e.target.value })} className={`h-11 rounded-full border px-4 bg-transparent outline-none text-[13px] ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              <input placeholder="Main Image URL (Unsplash or direct URL)" value={newCar.mainImage} onChange={(e) => setNewCar({ ...newCar, mainImage: e.target.value })} className={`h-11 rounded-full border px-4 outline-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />

              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Mileage e.g. 42,000 km" value={newCar.mileage} onChange={(e) => setNewCar({ ...newCar, mileage: e.target.value })} className={`h-11 rounded-full border px-4 outline-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
                <input placeholder="Color" value={newCar.color} onChange={(e) => setNewCar({ ...newCar, color: e.target.value })} className={`h-11 rounded-full border px-4 outline-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Fuel type" value={newCar.fuel} onChange={(e) => setNewCar({ ...newCar, fuel: e.target.value })} className={`h-11 rounded-full border px-4 outline-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
                <input placeholder="Transmission" value={newCar.transmission} onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })} className={`h-11 rounded-full border px-4 outline-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />
              </div>

              <input placeholder="Engine size" value={newCar.engine} onChange={(e) => setNewCar({ ...newCar, engine: e.target.value })} className={`h-11 rounded-full border px-4 outline-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />

              <textarea placeholder="Description" value={newCar.description} onChange={(e) => setNewCar({ ...newCar, description: e.target.value })} rows={4} className={`rounded-[18px] border p-4 outline-none resize-none text-[13px] ${theme === 'dark' ? 'bg-white/[0.06] border-white/10' : 'bg-black/[0.04] border-black/10'}`} />

              <div className="mt-4 overflow-hidden rounded-[14px] aspect-[16/10] bg-black/10">
                <img src={newCar.mainImage || HERO_BG} alt="Preview" className="h-full w-full object-cover" />
              </div>

              <button onClick={addCar} className="h-12 rounded-full bg-[#FFB400] font-bold text-black text-[14px] hover:bg-[#FFB400]/90 transition">
                Add Vehicle to Inventory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <SettingsEditor settings={settings} setSettings={setSettings} theme={theme} />
      )}
    </div>
  );
}

export default AdminPage;
