# Wireframe Descriptions
## IRON LUNG — Intelligent Resource Organizer for Networking, Learning, Unified iNternships, and Group collaboration

---

| Atribut | Nilai |
|---------|-------|
| **Dokumen ID** | WFD-IRONLUNG-001 |
| **Versi** | 1.0.0 |
| **Tanggal** | 10 Juni 2026 |
| **Status** | Draft |

> **Catatan:** Wireframe ini adalah deskripsi tekstual (low-fidelity). Implementasi visual
> menggunakan Tailwind CSS dengan desain glassmorphism, dark-mode friendly, dan responsive.

---

## Daftar Layar

1. [Landing Page — `/`](#1-landing-page--)
2. [Halaman Daftar Peluang — `/peluang`](#2-halaman-daftar-peluang--peluang)
3. [Halaman Detail Peluang — `/peluang/:id`](#3-halaman-detail-peluang--peluangid)
4. [Dashboard Mahasiswa — `/dashboard`](#4-dashboard-mahasiswa--dashboard)
5. [Halaman Portofolio — `/portofolio`](#5-halaman-portofolio--portofolio)
6. [Halaman Notifikasi — `/notifikasi`](#6-halaman-notifikasi--notifikasi)
7. [Dashboard Mitra — `/perusahaan/dashboard`](#7-dashboard-mitra--perusahaandashboard)
8. [Halaman Moderasi Admin — `/admin/moderasi`](#8-halaman-moderasi-admin--adminmoderasi)
9. [Pertimbangan Mobile](#9-pertimbangan-mobile)

---

## 1. Landing Page — `/`

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR (sticky, glassmorphism)                             │
│  [Logo IRON LUNG]          [Peluang] [Tentang]  [Login] [Daftar]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO SECTION (gradient background + illustration SVG)      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │   H1: "Temukan Peluangmu,                          │   │
│  │        Bangun Karier dari Kampus"                   │   │
│  │                                                     │   │
│  │   Subtext: Satu platform untuk magang, proyek       │   │
│  │   kolaborasi, dan kompetisi terbaik Indonesia.      │   │
│  │                                                     │   │
│  │   [Mulai Sekarang →]   [Lihat Semua Peluang]       │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  STATS BAR (animasi count-up saat scroll)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ 48 Peluang  │  │ 1.2K Users  │  │ 30+ Mitra   │         │
│  │   Aktif     │  │ Terdaftar   │  │ Bergabung   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                             │
│  FEATURED OPPORTUNITIES                                     │
│  "Peluang Terkini"                    [Lihat Semua →]       │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐     │
│  │ [Badge:Magang]│ │[Badge:Proyek] │ │[Badge:Kompetisi]    │
│  │ Judul Peluang │ │ Judul Peluang │ │ Judul Peluang │     │
│  │ Nama Mitra    │ │ Nama Mitra    │ │ Nama Mitra    │     │
│  │ 📅 30 hari   │ │ 📅 15 hari   │ │ 📅 7 hari    │     │
│  │ [Lihat Detail]│ │ [Lihat Detail]│ │ [Lihat Detail]│     │
│  └───────────────┘ └───────────────┘ └───────────────┘     │
│                                                             │
│  KATEGORI SECTION                                           │
│  ┌──────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ 💼   │  │  🤝      │  │  🏆      │  │  📚      │        │
│  │Magang│  │Kolaborasi│  │Kompetisi │  │Pelatihan │        │
│  └──────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                             │
│  HOW IT WORKS (3 langkah horizontal)                        │
│  [1. Daftar Akun] ──► [2. Temukan Peluang] ──► [3. Apply!] │
│                                                             │
│  FOOTER                                                     │
│  Logo · Navigasi · GitHub · © 2026 Tim IRON LUNG               │
└─────────────────────────────────────────────────────────────┘
```

**Elemen UI Kunci:**
- Navbar dengan efek blur/frosted glass saat di-scroll
- Hero: animated gradient background (indigo → purple)
- Opportunity cards: shadow hover effect, bookmark icon pojok kanan atas
- Kategori: icon grid dengan hover scale animation
- CTA button: gradient + subtle glow effect

---

## 2. Halaman Daftar Peluang — `/peluang`

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR                                                     │
├──────────────────┬──────────────────────────────────────────┤
│                  │                                          │
│  SIDEBAR FILTER  │  MAIN CONTENT                           │
│  (sticky)        │                                          │
│  ─────────────   │  ┌────────────────────────────────────┐ │
│  🔍 Cari         │  │  [🔍 Cari peluang...        ] [×] │ │
│  [___________]   │  └────────────────────────────────────┘ │
│                  │                                          │
│  Kategori        │  Sort: [Terbaru ▼]     24 hasil ditemukan│
│  ☑ Semua         │  ─────────────────────────────────────  │
│  ☐ Magang        │                                          │
│  ☐ Kolaborasi    │  ┌──────────────────────────────────┐   │
│  ☐ Kompetisi     │  │ [Badge: Magang]  ⭐ 87% match    │   │
│  ☐ Pelatihan     │  │                          [🔖]    │   │
│                  │  │ Judul Peluang Menarik             │   │
│  Tipe Lokasi     │  │ PT Nama Perusahaan · Jakarta      │   │
│  ○ Semua         │  │                                   │   │
│  ○ Remote        │  │ Skills: [React] [Node.js] [...]   │   │
│  ○ On-site       │  │                                   │   │
│  ○ Hybrid        │  │ 📅 Deadline: 30 Jun 2026 · Remote │   │
│                  │  │            [Lihat Detail →]       │   │
│  Skills          │  └──────────────────────────────────┘   │
│  [+ Tambah tag]  │                                          │
│  [React] ×       │  ┌──────────────────────────────────┐   │
│  [Python] ×      │  │ (card 2 ...)                     │   │
│                  │  └──────────────────────────────────┘   │
│  [Reset Filter]  │                                          │
│  [Terapkan]      │  ┌──────────────────────────────────┐   │
│                  │  │ (card 3 ...)                     │   │
│                  │  └──────────────────────────────────┘   │
│                  │                                          │
│                  │  [← Prev]  Hal 1 / 3  [Next →]         │
└──────────────────┴──────────────────────────────────────────┘
```

**Elemen UI Kunci:**
- Filter sidebar collapsible di mobile (bottom drawer)
- Opportunity card: color-coded badge per kategori
- Match score badge (hijau/kuning/merah) hanya tampil jika login sebagai Mahasiswa
- Tombol bookmark: toggle animasi (empty → filled)
- Loading: skeleton card placeholder (3 baris abu-abu animasi)
- Empty state: ilustrasi + "Tidak ada peluang sesuai filter"

---

## 3. Halaman Detail Peluang — `/peluang/:id`

```
┌─────────────────────────────────────────────────────────────┐
│  [← Kembali ke Daftar Peluang]                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HEADER PELUANG                                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │  [Logo Mitra 60x60]   Judul Peluang Panjang        │    │
│  │                       PT Nama Perusahaan · Kota    │    │
│  │                                                    │    │
│  │  [Badge: Magang] [Badge: Remote] [⏳ 15 hari lagi] │    │
│  └────────────────────────────────────────────────────┘    │
│                                                             │
│  MATCH SCORE (hanya untuk Mahasiswa yang login)             │
│  "Kecocokan profile kamu dengan peluang ini:"              │
│  [████████░░░░] 65%  — Kamu punya 4 dari 6 skills         │
│  Skills yang kamu miliki: [React ✓] [Node.js ✓]           │
│  Skills yang kurang: [Docker ✗] [Kubernetes ✗]            │
│                                                             │
│  ─────────────────────────────────────────────────────     │
│  DESKRIPSI                                                  │
│  Lorem ipsum deskripsi lengkap peluang ini...              │
│                                                             │
│  REQUIREMENTS                                               │
│  • Mahasiswa aktif S1 minimal semester 5                    │
│  • Familiar dengan teknologi web modern                     │
│  • Kemampuan komunikasi yang baik                          │
│                                                             │
│  SKILLS YANG DIBUTUHKAN                                     │
│  [React] [TypeScript] [Node.js] [Docker]                   │
│                                                             │
│  DURASI: 3 Bulan   |   TIPE: Remote   |   KOTA: Jakarta   │
│  DEADLINE: 30 Juni 2026                                     │
│                                                             │
├──────────────────────────┬──────────────────────────────────┤
│  INFO PERUSAHAAN         │  PANEL AKSI                     │
│  ─────────────────────   │  ──────────────────────────     │
│  [Logo] Nama Perusahaan  │  [🔖 Simpan Peluang]           │
│  🌐 website.com          │                                 │
│  ✉ kontak@email.com     │  [✉ Daftar Sekarang]  ← CTA    │
│  📋 Lihat Profil         │  (disabled jika sudah daftar)  │
│     Perusahaan           │                                 │
│                          │  ⚠ Pastikan kamu membaca        │
│                          │  semua requirements sebelum     │
│                          │  mendaftar.                     │
└──────────────────────────┴──────────────────────────────────┘
```

**Elemen UI Kunci:**
- Match score bar: animated progress bar dengan warna adaptif
- Skills chip: hijau = dimiliki, merah = tidak dimiliki
- Panel aksi: sticky di mobile (fixed bottom bar)
- Tombol Daftar: disabled + tooltip jika sudah mendaftar
- Share button: copy link ke clipboard

---

## 4. Dashboard Mahasiswa — `/dashboard`

```
┌────────────┬────────────────────────────────────────────────┐
│  SIDEBAR   │  MAIN CONTENT                                  │
│ (sticky)   │                                                │
│            │  "Selamat datang, Andi! 👋"                   │
│  [Avatar]  │  Senin, 10 Juni 2026                          │
│  Andi P.   │                                                │
│  UGM · S5  │  ─── STATS CARDS ───────────────────────      │
│            │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  │
│  ─────────  │  │   5    │ │   1    │ │   8    │ │   3    │  │
│ 🏠 Dashboard│  │Lamaran │ │Diterima│ │Tersimpan│ │ Badge │  │
│ 🔍 Peluang  │  └────────┘ └────────┘ └────────┘ └────────┘  │
│ 📝 Lamaran  │                                                │
│ 🔖 Tersimpan│  ─── PELUANG DIREKOMENDASIKAN ────────────     │
│ 💼 Portofolio│  ┌──────────────┐ ┌──────────────┐            │
│ 🔔 Notifikasi│  │ Peluang 1   │ │ Peluang 2    │            │
│    [3]      │  │ ⭐ 95% match │ │ ⭐ 80% match │            │
│ 👤 Profil   │  └──────────────┘ └──────────────┘            │
│            │  [Lihat Semua Peluang →]                       │
│  ─────────  │                                                │
│  [Logout]  │  ─── RIWAYAT LAMARAN TERBARU ───────────       │
│            │  ┌────────────────────────────────────────┐    │
│            │  │ Peluang          Status    Tanggal      │    │
│            │  │ ─────────────────────────────────────   │    │
│            │  │ Magang PT ABC    VIEWED    5 Jun 2026   │    │
│            │  │ Proyek Kolaborasi APPLIED  3 Jun 2026   │    │
│            │  │ Kompetisi X      APPLIED   1 Jun 2026   │    │
│            │  └────────────────────────────────────────┘    │
│            │  [Lihat Semua Lamaran →]                        │
└────────────┴────────────────────────────────────────────────┘
```

**Elemen UI Kunci:**
- Sidebar: collapsible di mobile (hamburger → drawer)
- Stats cards: hover effect dengan warna unik per metrik
- Notification badge: red dot dengan angka unread
- Rekomendasi: horizontal scroll di mobile

---

## 5. Halaman Portofolio — `/portofolio`

```
┌────────────┬────────────────────────────────────────────────┐
│  SIDEBAR   │  MAIN CONTENT                                  │
├────────────┤                                                │
│            │  H1: "Portofolio Saya"   [+ Tambah Entri]     │
│            │                                                │
│            │  ─── FORM (muncul saat klik Tambah) ──────     │
│            │  ┌──────────────────────────────────────────┐  │
│            │  │ Tipe [Dropdown ▼]  Judul [____________]  │  │
│            │  │ Organisasi [_______]  Tanggal [date ___] │  │
│            │  │ Deskripsi [textarea___________________]  │  │
│            │  │ Skills [tag input: React, Python, ...]   │  │
│            │  │ URL Dokumen [______________________]     │  │
│            │  │               [Batal]  [Simpan Entri →]  │  │
│            │  └──────────────────────────────────────────┘  │
│            │                                                │
│            │  ─── DAFTAR ENTRI ──────────────────────────   │
│            │  ┌──────────────────────────────────────────┐  │
│            │  │ [🖥] PROYEK                              │  │
│            │  │      Sistem Manajemen Inventaris         │  │
│            │  │      PT Teknologi Nusantara · Jan 2025   │  │
│            │  │      Membangun sistem inventaris berbasis│  │
│            │  │      web menggunakan React dan Node.js... │ │
│            │  │      [React] [Node.js] [PostgreSQL]      │  │
│            │  │                      [✏ Edit] [🗑 Hapus] │  │
│            │  └──────────────────────────────────────────┘  │
│            │  ┌──────────────────────────────────────────┐  │
│            │  │ [🏆] KOMPETISI                           │  │
│            │  │      Hackathon Nasional 2024             │  │
│            │  │      Kemendikbud · Nov 2024              │  │
│            │  │      [Python] [Machine Learning]         │  │
│            │  │                      [✏ Edit] [🗑 Hapus] │  │
│            │  └──────────────────────────────────────────┘  │
└────────────┴────────────────────────────────────────────────┘
```

**Elemen UI Kunci:**
- Form: slide-down animation saat ditampilkan
- Tipe icons berbeda: 💼 Magang, 🖥 Proyek, 🏆 Kompetisi, 📜 Sertifikasi, 📚 Pelatihan
- Tag skills: pill-style chip dengan warna abu-abu
- Delete: konfirmasi dialog sebelum eksekusi
- Empty state: ilustrasi + "Mulai dokumentasikan pengalamanmu!"

---

## 6. Halaman Notifikasi — `/notifikasi`

```
┌────────────┬────────────────────────────────────────────────┐
│  SIDEBAR   │  MAIN CONTENT                                  │
├────────────┤                                                │
│            │  H1: "Notifikasi"       [Tandai Semua Dibaca]  │
│            │                                                │
│            │  ┌──────────────────────────────────────────┐  │
│            │  │ 🔵 (unread)                              │  │
│            │  │ Lamaran kamu ke "Magang PT ABC" DITERIMA  │  │
│            │  │ Selamat! Kamu telah diterima...          │  │
│            │  │ 2 jam yang lalu                           │  │
│            │  └──────────────────────────────────────────┘  │
│            │  ┌──────────────────────────────────────────┐  │
│            │  │ 🔵 (unread)                              │  │
│            │  │ Peluang "Proyek X" telah DISETUJUI Admin  │  │
│            │  │ Peluang kamu kini dapat dilihat publik.  │  │
│            │  │ 5 jam yang lalu                           │  │
│            │  └──────────────────────────────────────────┘  │
│            │  ┌──────────────────────────────────────────┐  │
│            │  │ (read, abu-abu)                          │  │
│            │  │ Lamaran kamu ke "Kompetisi Y" DITOLAK    │  │
│            │  │ 2 hari yang lalu                          │  │
│            │  └──────────────────────────────────────────┘  │
│            │                                                │
│            │  [Load More Notifikasi]                        │
└────────────┴────────────────────────────────────────────────┘
```

**Elemen UI Kunci:**
- Notifikasi unread: background biru muda + dot indicator
- Klik notifikasi: otomatis tandai `isRead = true` + navigasi ke relatedId
- Warna indikator: hijau = ACCEPTED, merah = REJECTED, biru = info

---

## 7. Dashboard Mitra — `/perusahaan/dashboard`

```
┌──────────────────────────────────────────────────────────────┐
│ SIDEBAR MITRA                     │  MAIN CONTENT           │
│ [Logo Perusahaan]                 │                         │
│ Nama Perusahaan                   │  "Dashboard Mitra 🏢"   │
│ ──────────────                    │                         │
│ 📊 Dashboard                      │  STATS ROW              │
│ ➕ Buat Peluang                   │  [8 Listing] [45 Lamaran]│
│ 📋 Kelola Listing                 │  [3 Pending] [12 Terima]│
│ 👥 Daftar Pelamar                 │                         │
│ 🔍 Cari Kandidat                  │  LISTING TERBARU        │
│ 👤 Profil Perusahaan              │  ┌──────────────────┐   │
│ ──────────────                    │  │Judul  │ Status  │Aksi│
│ [Logout]                          │  │Magang │ ACTIVE  │[▸] │
│                                   │  │Proyek │ PENDING │[▸] │
│                                   │  └──────────────────┘   │
│                                   │  [Lihat Semua Listing →] │
└───────────────────────────────────┴─────────────────────────┘
```

---

## 8. Halaman Moderasi Admin — `/admin/moderasi`

```
┌──────────────────────────────────────────────────────────────┐
│ SIDEBAR ADMIN      │  MAIN CONTENT                          │
│ 📊 Dashboard       │                                        │
│ 🛡 Moderasi [5]   │  H1: "Moderasi Peluang"                │
│ 👥 Pengguna        │  Filter: [Semua ▼] [Terbaru ▼]        │
├────────────────────┤  ─────────────────────────────────     │
│                    │  ┌──────────────────────────────────┐  │
│                    │  │ [PENDING] Judul Peluang Alpha    │  │
│                    │  │ PT Mitra Jaya · Diposting 9 Jun  │  │
│                    │  │ Kategori: Magang · Remote        │  │
│                    │  │ Deadline: 30 Jul 2026            │  │
│                    │  │                                  │  │
│                    │  │ [Lihat Detail Lengkap ↗]         │  │
│                    │  │                                  │  │
│                    │  │      [✗ Tolak]  [✓ Setujui]      │  │
│                    │  └──────────────────────────────────┘  │
│                    │                                        │
│                    │  ┌──────────────────────────────────┐  │
│                    │  │ [PENDING] Judul Peluang Beta     │  │
│                    │  │ ...                              │  │
│                    │  │      [✗ Tolak]  [✓ Setujui]      │  │
│                    │  └──────────────────────────────────┘  │
└────────────────────┴────────────────────────────────────────┘

  MODAL TOLAK (muncul saat klik "Tolak"):
  ┌────────────────────────────────────┐
  │  Alasan Penolakan (wajib diisi)   │
  │  [textarea____________________]   │
  │         [Batal]  [Kirim Penolakan]│
  └────────────────────────────────────┘
```

---

## 9. Pertimbangan Mobile

| Elemen | Desktop | Mobile (< 768px) |
|--------|---------|------------------|
| Sidebar navigasi | Selalu tampil, sticky | Hidden → hamburger menu → slide-in drawer |
| Filter peluang | Sidebar kiri | Bottom sheet / drawer |
| Opportunity cards | Grid 2–3 kolom | Single column stack |
| Detail peluang action | Panel kanan sticky | Fixed bar di bawah layar |
| Tabel pelamar (Mitra) | Tabel penuh | Card list vertikal |
| Dashboard stats | 4 kolom | 2x2 grid |
| Form tambah portofolio | Side panel | Full screen modal |

**Breakpoints:**
- Mobile: `< 768px`
- Tablet: `768px – 1024px`
- Desktop: `> 1024px`

---

*© 2026 Tim Pengembang IRON LUNG*
