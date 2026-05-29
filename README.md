# IRON LUNG

**Intelligent Resource Organizer for Networking, Learning, Unified iNternships, and Group collaboration**

> Jembatan Mahasiswa Menuju Dunia Profesional

Platform terpusat untuk mahasiswa Informatika Indonesia yang menghubungkan mereka dengan peluang magang, kolaborasi proyek, kompetisi teknologi, dan program pelatihan industri.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite + Tailwind CSS v3 |
| Backend | Node.js + Express.js |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT (access + refresh token) |
| State | React Context API |
| HTTP Client | Axios |
| Validation | React Hook Form + Zod |
| File Storage | Cloudinary |
| Charts | Recharts |

## Prasyarat

- Node.js >= 18
- PostgreSQL >= 14
- npm >= 9

## Instalasi

### 1. Clone repository
```bash
git clone <repo-url>
cd iron-lung
```

### 2. Setup Backend
```bash
cd server
cp .env.example .env
# Edit .env dengan kredensial database Anda
npm install
npx prisma migrate dev
npx prisma db seed
```

### 3. Setup Frontend
```bash
cd client
npm install
```

### 4. Jalankan Aplikasi
```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Aplikasi akan berjalan di:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Akun Demo

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@ironlung.id | admin123 |
| Mahasiswa | budi@mail.com | password123 |
| Mahasiswa | siti@mail.com | password123 |
| Industri | recruitment@gojek.com | password123 |
| Industri | hr@tokopedia.com | password123 |

## Deployment

### Frontend — Vercel
1. Connect repository ke Vercel
2. Set root directory: `client`
3. Build command: `npm run build`
4. Output directory: `dist`

### Backend — Railway
1. Connect repository ke Railway
2. Add PostgreSQL plugin
3. Set environment variables dari `.env.example`
4. Railway akan otomatis menjalankan migrasi saat deploy

## Lisensi

MIT
