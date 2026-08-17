import { INITIAL_CARS } from '../data/cars';
import { DEFAULT_SITE_SETTINGS } from '../data/siteDefaults';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
};

export const api = {
  getCars: async () => {
    try {
      const result = await request('/cars');
      return result?.data || result || INITIAL_CARS;
    } catch (error) {
      console.warn('Using fallback cars data while backend is unavailable:', error);
      await delay();
      return INITIAL_CARS;
    }
  },

  createCar: async (carPayload) => {
    try {
      const result = await request('/cars', {
        method: 'POST',
        body: JSON.stringify(carPayload),
      });
      return result?.data || result;
    } catch (error) {
      console.warn('Backend not available, storing in-memory only:', error);
      return carPayload;
    }
  },

  getSiteSettings: async () => {
    try {
      const result = await request('/site-settings');
      return result?.data || result || DEFAULT_SITE_SETTINGS;
    } catch (error) {
      console.warn('Using default site settings while backend is unavailable:', error);
      await delay();
      return DEFAULT_SITE_SETTINGS;
    }
  },

  updateSiteSettings: async (settings) => {
    try {
      const result = await request('/site-settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
      return result?.data || result || settings;
    } catch (error) {
      console.warn('Backend not available, local settings update only:', error);
      return settings;
    }
  },
};

export default api;
