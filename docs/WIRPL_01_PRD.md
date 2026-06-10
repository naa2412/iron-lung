# Product Requirements Document (PRD)
## IRON LUNG — Intelligent Resource Organizer for Networking, Learning, Unified iNternships, and Group collaboration

---

| Atribut | Nilai |
|---------|-------|
| **Dokumen ID** | PRD-IRONLUNG-001 |
| **Versi** | 1.0.0 |
| **Tanggal** | 10 Juni 2026 |
| **Status** | Draft |
| **Standar** | IEEE 830-1998 · ISO/IEC 25010 |

---

## Daftar Isi

1. [Ringkasan Produk](#1-ringkasan-produk)
2. [Aktor / Roles](#2-aktor--roles)
3. [Goals & Non-Goals](#3-goals--non-goals)
4. [User Stories & Acceptance Criteria](#4-user-stories--acceptance-criteria)
5. [Prioritas Fitur](#5-prioritas-fitur)

---

## 1. Ringkasan Produk

**IRON LUNG** adalah platform web yang menghubungkan mahasiswa dengan kesempatan kolaborasi proyek, magang, dan kompetisi. Platform ini bertindak sebagai jembatan antara mahasiswa yang ingin berkembang, organisasi/perusahaan yang menyediakan peluang, dan admin yang menjaga kualitas konten platform.

**Problem Statement:**
Mahasiswa sering kesulitan menemukan peluang kolaborasi, magang, dan kompetisi yang relevan secara terpusat. Informasi tersebar di berbagai platform, grup chat, dan media sosial tanpa sistem yang terstruktur.

**Vision:** Menjadi platform *one-stop-shop* bagi mahasiswa Indonesia untuk menemukan dan mendaftar peluang pengembangan diri.

---

## 2. Aktor / Roles

| Role | Deskripsi | Hak Akses Utama |
|------|-----------|-----------------|
| **Mahasiswa** | Pengguna utama — pencari peluang | Browse, apply, simpan, kelola profil & portofolio |
| **Industri** | Penyedia peluang (perusahaan, komunitas, kampus) | Posting peluang, kelola listing, review pelamar |
| **Admin** | Pengelola platform | Moderasi konten, manajemen pengguna, analitik |
| **Pengunjung Publik** | Belum login | Lihat daftar & detail peluang (read-only) |

---

## 3. Goals & Non-Goals

### ✅ In Scope (v1.0)

- Registrasi & autentikasi berbasis peran (Mahasiswa, Industri, Admin)
- Mahasiswa dapat browse, filter, dan mendaftar peluang
- Industri dapat memposting dan mengelola peluang
- Admin dapat memoderasi konten sebelum tayang publik
- Sistem notifikasi in-app untuk event penting
- Profil publik mahasiswa dengan portofolio digital
- Sistem lencana (badge) berbasis pencapaian
- Fitur simpan peluang (wishlist)
- Dashboard analitik untuk Admin

### ❌ Out of Scope (v1.0)

- Sistem pembayaran / transaksi finansial
- Real-time chat / messaging antar pengguna
- Aplikasi mobile native (iOS/Android)
- Integrasi SSO kampus / OAuth third-party
- Video interview atau scheduling tool terintegrasi
- Rekomendasi berbasis AI/ML *(direncanakan v2.0)*
- Export PDF untuk profil/portofolio

---

## 4. User Stories & Acceptance Criteria

### 🎓 MAHASISWA

#### US-M01 — Registrasi Akun
> *Sebagai mahasiswa baru, saya ingin mendaftar akun agar dapat mengakses fitur platform.*

| # | Acceptance Criteria |
|---|---------------------|
| AC1 | Form registrasi meminta: nama, email, password, universitas, program studi, semester |
| AC2 | Email harus unik; jika sudah terdaftar, muncul pesan error HTTP 409 |
| AC3 | Password di-hash (bcrypt) sebelum disimpan — tidak boleh plain text |
| AC4 | Setelah registrasi berhasil, pengguna diarahkan ke halaman onboarding |
| AC5 | Input divalidasi (format email, panjang password ≥ 8 karakter) |

---

#### US-M02 — Onboarding Profil
> *Sebagai mahasiswa yang baru terdaftar, saya ingin melengkapi profil saya agar mitra dapat mengenal saya.*

| # | Acceptance Criteria |
|---|---------------------|
| AC1 | Halaman onboarding hanya muncul satu kali setelah registrasi |
| AC2 | Mahasiswa dapat mengisi: bio, skills (multi-select/tag), interests, foto profil, CV URL |
| AC3 | Setelah onboarding selesai, field `onboardingComplete` diset `true` |
| AC4 | Mahasiswa dialihkan ke dashboard setelah selesai |
| AC5 | Onboarding dapat dilewati (skip), profil dapat dilengkapi nanti di halaman Profil |

---

#### US-M03 — Browse & Filter Peluang
> *Sebagai mahasiswa, saya ingin mencari peluang berdasarkan kategori dan skills agar menemukan yang relevan.*

| # | Acceptance Criteria |
|---|---------------------|
| AC1 | Tersedia filter: kategori (Magang/Kolaborasi/Kompetisi/Pelatihan), tipe lokasi, keywords |
| AC2 | Hanya peluang dengan status `ACTIVE` yang ditampilkan |
| AC3 | Setiap card peluang menampilkan: judul, nama mitra, kategori, deadline, lokasi |
| AC4 | Mahasiswa yang login melihat skor kecocokan berdasarkan skills |
| AC5 | Hasil pencarian ter-update real-time tanpa reload halaman |

---

#### US-M04 — Mendaftar Peluang
> *Sebagai mahasiswa, saya ingin mendaftar ke suatu peluang dengan melampirkan cover letter.*

| # | Acceptance Criteria |
|---|---------------------|
| AC1 | Tombol "Daftar" hanya aktif untuk peluang berstatus `ACTIVE` |
| AC2 | Mahasiswa tidak dapat mendaftar ke peluang yang sama dua kali (HTTP 409) |
| AC3 | Cover letter bersifat opsional; portofolio URL juga dapat dilampirkan |
| AC4 | Setelah berhasil, muncul notifikasi sukses (toast) dan Industri mendapat notifikasi |
| AC5 | Status lamaran awal adalah `APPLIED` |

---

#### US-M05 — Kelola Portofolio Digital
> *Sebagai mahasiswa, saya ingin mendokumentasikan pengalaman saya agar dapat ditampilkan di profil publik.*

| # | Acceptance Criteria |
|---|---------------------|
| AC1 | Mahasiswa dapat menambah, mengedit, dan menghapus entri portofolio |
| AC2 | Tipe entri yang tersedia: Magang, Proyek, Kompetisi, Sertifikasi, Pelatihan |
| AC3 | Setiap entri memiliki: judul, deskripsi, organisasi, tanggal, skills, URL dokumen |
| AC4 | Portofolio tampil di halaman profil publik mahasiswa |
| AC5 | Badge "Portofolio Lengkap" diberikan otomatis jika semua tipe terisi |

---

#### US-M06 — Simpan Peluang
> *Sebagai mahasiswa, saya ingin menyimpan peluang menarik untuk dibaca nanti.*

| # | Acceptance Criteria |
|---|---------------------|
| AC1 | Tombol bookmark tersedia di setiap card dan halaman detail peluang |
| AC2 | Peluang tersimpan ditampilkan di halaman `/tersimpan` |
| AC3 | Mahasiswa dapat menghapus peluang dari daftar simpanan |
| AC4 | Menyimpan 5 peluang memicu pemberian badge `KOLEKTOR` |

---

### 🏢 Industri

#### US-O01 — Posting Peluang
> *Sebagai mitra, saya ingin memposting peluang agar dapat ditemukan oleh mahasiswa.*

| # | Acceptance Criteria |
|---|---------------------|
| AC1 | Form posting meminta: judul, kategori, deskripsi, requirements, lokasi, deadline, skills required |
| AC2 | Peluang baru langsung berstatus `PENDING` (tidak langsung publik) |
| AC3 | Industri mendapat notifikasi setelah peluang disetujui atau ditolak oleh Admin |
| AC4 | Input divalidasi (deadline tidak boleh di masa lalu, deskripsi min. 50 karakter) |

---

#### US-O02 — Kelola Pelamar
> *Sebagai mitra, saya ingin melihat dan merespons lamaran yang masuk.*

| # | Acceptance Criteria |
|---|---------------------|
| AC1 | Industri dapat melihat daftar pelamar beserta profil dan cover letter mereka |
| AC2 | Mitra dapat mengubah status lamaran: `VIEWED` → `ACCEPTED` atau `REJECTED` |
| AC3 | Mahasiswa mendapat notifikasi otomatis saat status lamarannya berubah |
| AC4 | Hanya pemilik peluang yang dapat mengelola pelamarnya |

---

### 🛡️ ADMIN

#### US-A01 — Moderasi Peluang
> *Sebagai admin, saya ingin meninjau peluang baru sebelum tayang agar konten terjaga kualitasnya.*

| # | Acceptance Criteria |
|---|---------------------|
| AC1 | Admin melihat daftar semua peluang berstatus `PENDING` |
| AC2 | Admin dapat menyetujui (→ `ACTIVE`) atau menolak (→ `REJECTED`) dengan menyertakan alasan |
| AC3 | Keputusan moderasi memicu notifikasi ke mitra terkait |

---

#### US-A02 — Manajemen Pengguna
> *Sebagai admin, saya ingin mengelola akun pengguna platform.*

| # | Acceptance Criteria |
|---|---------------------|
| AC1 | Admin dapat melihat daftar semua pengguna dengan filter per role |
| AC2 | Admin dapat menonaktifkan (suspend) atau mengaktifkan kembali akun |
| AC3 | Pengguna yang di-suspend tidak dapat login (HTTP 403) |

---

## 5. Prioritas Fitur

| Prioritas | Fitur | Alasan |
|-----------|-------|--------|
| 🔴 **P0 — Must Have** | Auth, Browse Peluang, Apply, Moderasi Admin | Core value proposition |
| 🟠 **P1 — Should Have** | Portofolio, Notifikasi, Profil Publik, Simpan | Meningkatkan engagement |
| 🟡 **P2 — Nice to Have** | Badge System, Rekomendasi, Analitik Admin | Differentiator features |
| 🟢 **P3 — Future** | Real-time chat, AI matching, Mobile app | Roadmap v2.0+ |

---

*Standar referensi: IEEE 830-1998 · ISO/IEC 25010 · OWASP Top 10:2021*
*© 2026 Tim Pengembang IRON LUNG*
