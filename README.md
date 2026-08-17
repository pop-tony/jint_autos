# Jint Autos – Dealership Management Platform

A modern, full-stack dealership management system built with React (client) and Express.js (server). Manage inventory, configure site settings, and provide customers with a seamless vehicle browsing experience.

---

## 📁 Project Structure

```
jint_autos/
├── client/                 # Vite + React front-end
│   ├── src/
│   │   ├── App.jsx        # Main app shell, router, and state management
│   │   ├── main.jsx       # Entry point
│   │   ├── index.css      # Global styles
│   │   ├── api/           # Backend API layer (fetch-based)
│   │   ├── components/    # Shared UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── BookingModal.jsx
│   │   │   └── CarCard.jsx
│   │   ├── pages/         # Page components (page-per-route)
│   │   │   ├── HomePage.jsx
│   │   │   ├── InventoryPage.jsx
│   │   │   ├── CarDetailPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx (with map embed)
│   │   │   └── AdminPage.jsx (professional dashboard)
│   │   └── data/          # App constants and defaults
│   │       ├── cars.js    # Inventory seed data
│   │       └── siteDefaults.js
│   ├── public/
│   │   └── jint-autos-logo.png
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Express.js backend API
│   ├── index.js           # API server (5 endpoints)
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Development

Run both server and client in separate terminals:

**Terminal 1: Backend API**
```bash
cd server
npm start
# Runs on http://localhost:5000
```

**Terminal 2: Frontend Development**
```bash
cd client
npm run dev
# Runs on http://localhost:5173 (or specified port)
```

### Production Build

```bash
cd client
npm run build
# Output: dist/ folder (ready for deployment)
```

---

## 📊 Admin Dashboard Features

Access the admin panel at `/admin` (password: `jint2026`)

### 1. **Quick Analytics**
- Total inventory count
- Aggregate inventory value
- Average vehicle price
- Luxury segment breakdown
- Real-time store status

### 2. **Inventory Management**
- **Search**: Find vehicles by name or model
- **Filter by Category**: SUV, Sedan, Luxury
- **Price Range Slider**: Filter by price range
- **Detailed Stock View**: See mileage, color, fuel type, transmission
- **Quick Delete**: Remove vehicles from inventory
- **Color-coded Categories**: Visual differentiation by vehicle class

### 3. **Add Stock Tab**
- Full vehicle form with 10+ fields
- Real-time image preview
- Category and pricing controls
- Auto-generated vehicle IDs
- Session-persistent additions

### 4. **Site Settings Tab**
- Brand name & contact info
- Phone, WhatsApp, Email
- Opening hours
- Store announcements
- Status indicator (Open/Busy/Closed)
- Accent color picker
- Live preview of branding

---

## 🔌 API Endpoints

All endpoints run on `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health check |
| GET | `/cars` | Fetch all vehicles |
| POST | `/cars` | Add new vehicle |
| GET | `/site-settings` | Fetch site configuration |
| PUT | `/site-settings` | Update site configuration |

---

## 🎨 Front-End Pages

### **Home** (`/`)
- Hero section with showcase
- Featured inventory cards
- CTA sections
- Brand story intro

### **Inventory** (`/inventory`)
- Filterable vehicle grid
- Quick view cards with specs
- Book test drive buttons

### **Car Detail** (`/inventory/:id`)
- Full vehicle gallery
- Detailed specifications
- Features list
- Test drive booking

### **About** (`/about`)
- Brand story
- Trust-building testimonials
- Company mission

### **Contact** (`/contact`)
- Embedded Google Map
- Contact form
- Direct WhatsApp integration
- Store hours & location

### **Admin** (`/admin`)
- Professional inventory dashboard
- Real-time analytics
- Stock management
- Site configuration

---

## 🛠 Tech Stack

### Client
- **React 19.2** – UI framework
- **Vite 7** – Build tool & dev server
- **Tailwind CSS 4** – Utility-first styling
- **Lucide React** – Icon library
- **Custom Router** – Lightweight page routing

### Server
- **Express.js** – HTTP server
- **CORS** – Cross-origin requests
- **Node.js** – Runtime

---

## 📝 Notes

- **Session-Only Mode**: Admin changes persist during the session only. Page refresh resets to default inventory.
- **No Authentication DB**: Admin login uses hardcoded password (`jint2026`).
- **Fallback Mode**: Client API layer automatically falls back to local data if the server is unavailable.
- **Dark/Light Theme**: Full theme support across all pages.

---

## 🔐 Admin Credentials

```
Username: (not used)
Password: jint2026
```

---

## 📦 Deployment Ready

The app is production-ready:
- ✅ Fully tested build pipeline
- ✅ Responsive design (mobile-first)
- ✅ Dark/light theme support
- ✅ Accessible components
- ✅ Clean code structure
- ✅ Separated concerns (pages, components, data, API)

---

## 📞 Quick Links

- **Live Inventory**: `/inventory`
- **Admin Panel**: `/admin` (password: `jint2026`)
- **Contact Showroom**: `/contact`
- **API Health**: `GET http://localhost:5000/api/health`

---

**Built with ❤️ for Jint Autos Dealership**
