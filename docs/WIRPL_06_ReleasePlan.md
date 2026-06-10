# Release Plan
## WIRPL — Web Integration for Resources, Projects & Learning

---

| Atribut | Nilai |
|---------|-------|
| **Dokumen ID** | RP-WIRPL-001 |
| **Versi** | 1.0.0 |
| **Tanggal** | 10 Juni 2026 |
| **Status** | Draft |
| **Target Launch** | Minggu ke-8 |

---

## Daftar Isi

1. [Timeline Overview](#1-timeline-overview)
2. [Fase 1 — Foundation & Setup](#2-fase-1--foundation--setup-minggu-12)
3. [Fase 2 — Core Features](#3-fase-2--core-features-minggu-34)
4. [Fase 3 — Enhanced Features](#4-fase-3--enhanced-features-minggu-56)
5. [Fase 4 — Launch & Polish](#5-fase-4--launch--polish-minggu-78)
6. [Milestone Summary](#6-milestone-summary)
7. [Manajemen Risiko](#7-manajemen-risiko)
8. [Pembagian Tim](#8-pembagian-tim)
9. [Git Branching Strategy](#9-git-branching-strategy)

---

## 1. Timeline Overview

```
MINGGU 1-2            MINGGU 3-4            MINGGU 5-6            MINGGU 7-8
┌───────────────┐     ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│    FASE 1     │────►│    FASE 2     │────►│    FASE 3     │────►│    FASE 4     │
│  Foundation   │     │    Core       │     │  Enhanced     │     │    Launch     │
│   & Setup     │     │  Features     │     │  Features     │     │   & Polish    │
│               │     │               │     │               │     │               │
│ - Infra       │     │ - Auth Flow   │     │ - Portfolio   │     │ - Full QA     │
│ - DB Schema   │     │ - Opportunities│     │ - Notifikasi  │     │ - Security    │
│ - Auth API    │     │ - Apply       │     │ - Badge       │     │ - UI Polish   │
│ - Auth UI     │     │ - Admin Mod   │     │ - Simpan      │     │ - Deploy Prod │
│ - CI/CD Setup │     │ - Mitra UI    │     │ - Profil Publik│    │ - Demo Prep   │
└───────────────┘     └───────────────┘     └───────────────┘     └───────────────┘
     M1 ✓                  M2 ✓                  M3 ✓                  M4 🚀
```

---

## 2. Fase 1 — Foundation & Setup (Minggu 1–2)

**Goal:** Infrastruktur siap, CI/CD aktif, autentikasi berjalan end-to-end.

### Backend Tasks

| Task | PIC | Est. | Deliverable |
|------|-----|------|-------------|
| Inisialisasi project (package.json, Express, folder structure) | BE | 2 jam | Server bisa dijalankan |
| Konfigurasi Prisma + schema database awal | BE | 3 jam | `schema.prisma` dengan semua model |
| Migrasi database pertama ke Railway | BE | 1 jam | DB terkoneksi di cloud |
| Implementasi `POST /auth/register/mahasiswa` | BE | 3 jam | Registrasi Mahasiswa berfungsi |
| Implementasi `POST /auth/register/industri` | BE | 2 jam | Registrasi Mitra berfungsi |
| Implementasi `POST /auth/login` + JWT generation | BE | 3 jam | Login + token diterbitkan |
| Implementasi `POST /auth/refresh` | BE | 2 jam | Refresh token berfungsi |
| Setup middleware: auth, role, validate, rateLimiter, error | BE | 3 jam | Middleware pipeline aktif |
| Setup CORS, Helmet, globalLimiter | BE | 1 jam | Security headers aktif |
| Unit test auth service | BE | 3 jam | Test pass untuk auth functions |

### Frontend Tasks

| Task | PIC | Est. | Deliverable |
|------|-----|------|-------------|
| Inisialisasi Vite + React + Tailwind | FE | 2 jam | Dev server berjalan |
| Setup Axios instance + interceptor JWT | FE | 2 jam | Auto-attach token berfungsi |
| Implementasi `AuthContext` (login, logout, user state) | FE | 3 jam | Context tersedia global |
| Setup React Router + `ProtectedRoute` + `RoleRoute` | FE | 2 jam | Route guard aktif |
| Halaman Login (`/login`) | FE | 3 jam | Form login dengan validasi |
| Halaman Register (`/register`) | FE | 4 jam | Form register dengan validasi |
| Layout dasar: AppLayout, Sidebar, Navbar | FE | 4 jam | Struktur navigasi tersedia |

### DevOps Tasks

| Task | PIC | Est. | Deliverable |
|------|-----|------|-------------|
| Setup Railway project + PostgreSQL plugin | DevOps | 1 jam | DB cloud live |
| Deploy backend ke Railway | DevOps | 2 jam | API live di cloud |
| Deploy frontend ke Vercel (initial) | DevOps | 1 jam | Frontend live di cloud |
| Setup environment variables (prod) | DevOps | 1 jam | `.env` produksi terkonfigurasi |
| Seed data development awal | BE | 2 jam | Data dummy untuk testing |

**Total Estimasi Fase 1:** ~47 jam  
**Milestone M1:** Auth flow berjalan end-to-end, deploy pipeline aktif.

---

## 3. Fase 2 — Core Features (Minggu 3–4)

**Goal:** Fitur P0 selesai — Mahasiswa dapat apply, Mitra dapat post, Admin dapat moderasi.

### Backend Tasks

| Task | PIC | Est. | Deliverable |
|------|-----|------|-------------|
| CRUD Opportunity API (`POST`, `GET`, `PUT`, `DELETE`) | BE | 6 jam | Semua endpoint peluang berfungsi |
| Filter & search opportunities (`?category`, `?skills`, `?search`) | BE | 3 jam | Filter query berfungsi |
| Match score calculation service | BE | 3 jam | `matchScore` di respons detail |
| Trending & recommended endpoints | BE | 2 jam | Dua endpoint tambahan |
| Application API (apply, riwayat, update status) | BE | 5 jam | Semua endpoint lamaran berfungsi |
| Admin moderation API (approve, reject) | BE | 3 jam | Moderasi berfungsi |
| Admin stats API | BE | 2 jam | Statistik platform tersedia |
| Notification trigger pada apply + status change + moderasi | BE | 3 jam | Notifikasi tersimpan di DB |
| Integration test core APIs | BE | 5 jam | Test pass untuk semua endpoint |

### Frontend Tasks

| Task | PIC | Est. | Deliverable |
|------|-----|------|-------------|
| Halaman Daftar Peluang + filter sidebar (`/peluang`) | FE | 6 jam | Browse & filter berfungsi |
| Halaman Detail Peluang + modal apply (`/peluang/:id`) | FE | 5 jam | Apply flow berfungsi |
| Dashboard Mahasiswa (`/dashboard`) | FE | 5 jam | Stats + rekomendasi tampil |
| Halaman Onboarding (`/onboarding`) | FE | 4 jam | Onboarding multi-step |
| Dashboard Mitra + buat peluang (`/perusahaan/*`) | FE | 6 jam | Mitra bisa post peluang |
| Kelola listing Mitra | FE | 3 jam | Edit/hapus listing |
| Daftar pelamar + update status (`/perusahaan/pelamar`) | FE | 4 jam | Mitra bisa manage pelamar |
| Dashboard Admin + halaman moderasi (`/admin/*`) | FE | 5 jam | Admin bisa approve/reject |
| Manajemen pengguna Admin | FE | 3 jam | Suspend/aktifkan akun |

**Total Estimasi Fase 2:** ~72 jam  
**Milestone M2:** E2E flow apply → moderat → active berjalan; demo-able MVP.

---

## 4. Fase 3 — Enhanced Features (Minggu 5–6)

**Goal:** Fitur P1 selesai — portofolio, notifikasi, profil publik, simpan, badge, Cloudinary.

### Backend Tasks

| Task | PIC | Est. | Deliverable |
|------|-----|------|-------------|
| Portfolio CRUD API + badge trigger | BE | 5 jam | Semua endpoint portofolio |
| Notification API (get, mark read, mark all read) | BE | 3 jam | Notifikasi bisa dikelola |
| Saved opportunity API + badge KOLEKTOR trigger | BE | 3 jam | Simpan + badge berfungsi |
| Badge system (all badge types, auto-trigger logic) | BE | 4 jam | Semua badge terdefinisi |
| Candidate search API dengan filter | BE | 3 jam | Filter kandidat berfungsi |
| Cloudinary integration (avatar, CV, dokumen upload) | BE | 4 jam | Upload file ke CDN |
| Admin analytics API (registrasi, kategori, roles) | BE | 3 jam | Data analitik tersedia |
| User profile API (get, update) | BE | 3 jam | Profil bisa diubah |
| Public profile API | BE | 2 jam | Profil publik bisa diakses |

### Frontend Tasks

| Task | PIC | Est. | Deliverable |
|------|-----|------|-------------|
| Halaman Portofolio + form entri (`/portofolio`) | FE | 5 jam | CRUD portofolio berfungsi |
| Halaman Notifikasi (`/notifikasi`) | FE | 4 jam | Notifikasi in-app tampil |
| Halaman Tersimpan (`/tersimpan`) | FE | 3 jam | Daftar tersimpan tampil |
| Halaman Profil Publik (`/profil/:profileId`) | FE | 4 jam | Profil publik bisa diakses |
| Halaman Riwayat Lamaran (`/lamaran`) | FE | 3 jam | Status lamaran tampil |
| Profile Settings (`/profil`) + upload avatar/CV | FE | 5 jam | Edit profil + upload file |
| Cari Kandidat (`/perusahaan/kandidat`) | FE | 4 jam | Filter kandidat berfungsi |
| Admin Analytics dengan Recharts | FE | 4 jam | Grafik analitik tampil |
| Badge display di dashboard + profil | FE | 3 jam | Badge tampil dengan icon |
| Landing page polished (`/`) | FE | 5 jam | Landing page final |

**Total Estimasi Fase 3:** ~73 jam  
**Milestone M3:** Platform feature-complete, semua P0+P1 selesai dan teruji.

---

## 5. Fase 4 — Launch & Polish (Minggu 7–8)

**Goal:** QA menyeluruh, UI polish, keamanan diverifikasi, produksi siap, demo ready.

| Task | PIC | Est. | Deliverable |
|------|-----|------|-------------|
| Full UAT — jalankan semua test case di checklist | All | 8 jam | Semua TC marked PASS/FAIL |
| Bug fixing dari hasil UAT | All | 8 jam | Semua bug HIGH/CRITICAL resolved |
| Security audit — OWASP checklist, header check | BE | 4 jam | TC-SEC-01 s/d TC-SEC-10 pass |
| Cross-browser testing (Chrome, Firefox, Safari, Edge) | FE | 3 jam | UI konsisten di semua browser |
| Responsive testing (320px, 768px, 1280px) | FE | 3 jam | Layout tidak rusak di semua ukuran |
| Performance: lazy load routes, image optimization | FE | 4 jam | FCP ≤ 3 detik |
| Seed data lengkap untuk demo (mitra, mahasiswa, peluang) | BE | 3 jam | Data demo realistis tersedia |
| Update dokumentasi API (Postman collection / README) | All | 3 jam | Dokumentasi API final |
| Final `.env.example` update | BE | 1 jam | Semua variable terdokumentasi |
| Konfigurasi environment variables produksi final | DevOps | 2 jam | Produksi terkonfigurasi |
| Final deploy + smoke test | All | 3 jam | Platform live dan berfungsi |
| Demo preparation (script, akun demo, data skenario) | All | 4 jam | Demo siap dijalankan |
| Stakeholder review / presentasi | All | 3 jam | Feedback dikumpulkan |

**Total Estimasi Fase 4:** ~51 jam  
**Milestone M4 🚀:** Platform live di produksi, QA passed, demo siap.

---

## 6. Milestone Summary

| Milestone | Target Tanggal | Kriteria Sukses | Status |
|-----------|---------------|-----------------|--------|
| **M1** — Auth & Infra Live | Akhir Minggu 2 | Register/login berjalan, DB terkoneksi cloud, deploy pipeline aktif | ⬜ |
| **M2** — Core MVP Live | Akhir Minggu 4 | Apply peluang end-to-end berfungsi, moderasi Admin berjalan | ⬜ |
| **M3** — Feature Complete | Akhir Minggu 6 | Semua fitur P0+P1 selesai, test pass ≥ 80% | ⬜ |
| **M4** — Production Launch 🚀 | Akhir Minggu 8 | Platform live, semua TC pass, demo ready | ⬜ |

---

## 7. Manajemen Risiko

| ID | Risiko | Likelihood | Impact | Strategi Mitigasi |
|----|--------|-----------|--------|-------------------|
| R01 | Anggota tim tidak tersedia (ujian, sakit) | Tinggi | Tinggi | Buffer 20% di setiap fase; task dapat didelegasi; pair programming |
| R02 | Integrasi Cloudinary terhambat | Sedang | Sedang | Fase awal: gunakan URL manual; Cloudinary dikerjakan di Fase 3 terpisah |
| R03 | Railway/Vercel mengalami downtime saat demo | Rendah | Tinggi | Persiapkan backup demo di localhost; rekam video demo sebagai fallback |
| R04 | Scope creep — fitur baru muncul saat development | Tinggi | Sedang | Semua perubahan scope melalui diskusi tim + update dokumen; fitur baru masuk backlog v2.0 |
| R05 | Bug kritis ditemukan saat Fase 4 | Sedang | Tinggi | Fase 4 dialokasikan 2 minggu penuh untuk buffer QA + fixing |
| R06 | PostgreSQL schema perlu perubahan besar di Fase 3 | Sedang | Sedang | Desain schema secara menyeluruh di Fase 1; gunakan Prisma migrations |
| R07 | Performa lambat saat load data besar | Rendah | Sedang | Implementasi pagination di semua list endpoint sejak Fase 2 |
| R08 | Konflik kode saat merge (Git conflict) | Tinggi | Rendah | Disiplin branching strategy; review PR sebelum merge |

---

## 8. Pembagian Tim

Saran pembagian kerja untuk tim student kecil (4–5 orang):

| Role | Tanggung Jawab Utama | Jumlah Ideal |
|------|---------------------|-------------|
| **Frontend Dev** | React components, routing, UI/UX, responsive | 1–2 orang |
| **Backend Dev** | Express API, Prisma schema, services, security | 1–2 orang |
| **Fullstack / Lead** | Arsitektur, code review, integrasi, deployment | 1 orang |
| **QA / Dokumentasi** | Test case execution, bug report, update SRS | 1 orang (merangkap dev) |

> **Tips:** Untuk tim ≤ 3 orang, setiap orang merangkap 2 role. Prioritaskan Backend + Frontend selesai bersamaan agar integrasi tidak menjadi bottleneck.

---

## 9. Git Branching Strategy

```
main (production)
  │
  ├── develop (staging, integrasi)
  │     │
  │     ├── feature/auth-login
  │     ├── feature/opportunity-crud
  │     ├── feature/portfolio-page
  │     ├── fix/bug-apply-duplicate
  │     └── chore/update-docs
  │
  └── hotfix/critical-bug (dari main langsung, jika darurat)
```

### Aturan Branching

| Aturan | Detail |
|--------|--------|
| **Naming** | `feature/`, `fix/`, `chore/`, `hotfix/` prefix wajib |
| **PR Review** | Setiap PR ke `develop` wajib direview minimal 1 orang |
| **Merge ke main** | Hanya dari `develop` setelah QA sign-off di milestone |
| **Commit message** | Format: `[type]: deskripsi singkat` — contoh: `feat: add portfolio CRUD API` |
| **Protect main** | Branch `main` di-lock dari direct push |

### Commit Types

| Type | Kapan Digunakan |
|------|----------------|
| `feat` | Fitur baru |
| `fix` | Bug fix |
| `chore` | Maintenance (update deps, config) |
| `docs` | Update dokumentasi |
| `style` | CSS/formatting, bukan logic |
| `refactor` | Refactoring kode |
| `test` | Tambah atau update test |

---

*Standar referensi: IEEE 830-1998 · ISO/IEC 12207*
*© 2026 Tim Pengembang WIRPL*
