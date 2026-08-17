import express from 'express';
import cors from 'cors';
import { INITIAL_CARS } from '../client/src/data/cars.js';
import { DEFAULT_SITE_SETTINGS } from '../client/src/data/siteDefaults.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let cars = [...INITIAL_CARS];
let siteSettings = { ...DEFAULT_SITE_SETTINGS };

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Jint Autos API is running' });
});

app.get('/api/cars', (_req, res) => {
  res.json({ data: cars });
});

app.post('/api/cars', (req, res) => {
  const payload = req.body || {};
  const newCar = {
    id: payload.id || `${(payload.name || 'car').toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    ...payload,
    gallery: payload.gallery || [payload.mainImage, payload.mainImage],
    features: payload.features || ['Duty Paid'],
    price: Number(payload.price) || 0,
    year: Number(payload.year) || 2022,
  };

  cars = [newCar, ...cars];
  res.status(201).json({ data: newCar });
});

app.get('/api/site-settings', (_req, res) => {
  res.json({ data: siteSettings });
});

app.put('/api/site-settings', (req, res) => {
  siteSettings = { ...siteSettings, ...req.body };
  res.json({ data: siteSettings });
});

app.listen(PORT, () => {
  console.log(`Jint Autos API running on http://localhost:${PORT}`);
});
