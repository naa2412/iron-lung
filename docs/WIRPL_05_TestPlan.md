# Test Plan & Test Checklist
## WIRPL — Web Integration for Resources, Projects & Learning

---

| Atribut | Nilai |
|---------|-------|
| **Dokumen ID** | TP-WIRPL-001 |
| **Versi** | 1.0.0 |
| **Tanggal** | 10 Juni 2026 |
| **Status** | Draft |
| **Standar** | IEEE 829-2008 · ISO/IEC 25010 |

---

## Daftar Isi

1. [Strategi Testing](#1-strategi-testing)
2. [Lingkup Pengujian](#2-lingkup-pengujian)
3. [Checklist — Authentication & Authorization](#3-checklist--authentication--authorization)
4. [Checklist — Peluang (Opportunity)](#4-checklist--peluang-opportunity)
5. [Checklist — Lamaran (Application)](#5-checklist--lamaran-application)
6. [Checklist — Portofolio & Badge](#6-checklist--portofolio--badge)
7. [Checklist — Keamanan (Security)](#7-checklist--keamanan-security)
8. [Checklist — UI/UX](#8-checklist--uiux)
9. [Definition of Done](#9-definition-of-done)
10. [Laporan Bug](#10-laporan-bug)

---

## 1. Strategi Testing

| Level Testing | Metode | Tools | Fase |
|---------------|--------|-------|------|
| **Unit Test** | Test fungsi service layer secara terisolasi | Jest / Vitest | Fase 2–3 |
| **Integration Test** | Test API endpoint end-to-end (request → DB) | Supertest + Jest | Fase 2–3 |
| **Component Test** | Test komponen React dengan mock data | React Testing Library | Fase 3 |
| **Manual UAT** | Exploratory testing per user flow | Browser (Chrome, Firefox) | Fase 4 |
| **Security Testing** | OWASP Top 10 checklist, injection attempt | Manual review | Fase 4 |
| **Regression Testing** | Jalankan kembali semua test setelah perubahan | Full test suite | Setiap merge ke main |
| **Cross-Browser Testing** | Verifikasi UI di berbagai browser | Chrome, Firefox, Safari, Edge | Fase 4 |
| **Responsive Testing** | Uji di berbagai ukuran layar | Chrome DevTools, real device | Fase 4 |

---

## 2. Lingkup Pengujian

### Fitur yang Diuji

| Modul | Fitur | Prioritas |
|-------|-------|-----------|
| Auth | Registrasi, Login, Logout, Refresh Token, Rate Limit | 🔴 P0 |
| Peluang | CRUD, Filter, Detail, Moderasi Admin | 🔴 P0 |
| Lamaran | Apply, Riwayat, Update Status | 🔴 P0 |
| Profil | Onboarding, Edit Profil, Profil Publik | 🟠 P1 |
| Portofolio | CRUD Entri, Badge Trigger | 🟠 P1 |
| Simpan | Simpan/Hapus, Badge KOLEKTOR | 🟠 P1 |
| Notifikasi | Terima, Tandai Dibaca | 🟠 P1 |
| Badge | Auto-trigger, Idempotency | 🟡 P2 |
| Admin Analytics | Stats, Charts | 🟡 P2 |

### Yang Tidak Diuji (v1.0)
- Real-time features (tidak ada WebSocket)
- Email delivery (email service belum diimplementasi di v1.0)
- Load testing / stress testing (di luar kapasitas tim student)

---

## 3. Checklist — Authentication & Authorization

| ID | Test Case | Precondition | Input | Expected Output | Status |
|----|-----------|-------------|-------|-----------------|--------|
| TC-AUTH-01 | Registrasi Mahasiswa berhasil | DB kosong untuk email ini | Email valid, semua field terisi | HTTP 201, `accessToken` dan `refreshToken` diterbitkan | ⬜ |
| TC-AUTH-02 | Registrasi email duplikat | Email sudah terdaftar | Email yang sama | HTTP 409, pesan "Email sudah digunakan" | ⬜ |
| TC-AUTH-03 | Registrasi password terlalu pendek | — | Password < 8 karakter | HTTP 400, validasi Zod error | ⬜ |
| TC-AUTH-04 | Login valid | Akun aktif terdaftar | Email + password benar | HTTP 200, `accessToken` + `refreshToken` | ⬜ |
| TC-AUTH-05 | Login password salah | Akun ada | Password tidak cocok | HTTP 401, tidak menyebutkan field mana yang salah | ⬜ |
| TC-AUTH-06 | Login email tidak terdaftar | — | Email tidak ada di DB | HTTP 401 (sama seperti salah password) | ⬜ |
| TC-AUTH-07 | Login akun suspended | `isActive = false` | Kredensial benar | HTTP 403, "Akun Anda telah dinonaktifkan" | ⬜ |
| TC-AUTH-08 | Akses protected endpoint tanpa token | — | No Authorization header | HTTP 401 Unauthorized | ⬜ |
| TC-AUTH-09 | Akses endpoint MAHASISWA sebagai INDUSTRI | Login sebagai INDUSTRI | Token INDUSTRI valid | HTTP 403 Forbidden | ⬜ |
| TC-AUTH-10 | Akses endpoint ADMIN sebagai MAHASISWA | Login sebagai MAHASISWA | Token MAHASISWA valid | HTTP 403 Forbidden | ⬜ |
| TC-AUTH-11 | Refresh token valid | refreshToken belum expired | `refreshToken` valid | HTTP 200, `accessToken` baru diterbitkan | ⬜ |
| TC-AUTH-12 | Refresh token kedaluwarsa | refreshToken expired | Expired `refreshToken` | HTTP 401 Unauthorized | ⬜ |
| TC-AUTH-13 | Rate limiting autentikasi | — | > 10 request/menit ke `/auth/login` | HTTP 429 Too Many Requests | ⬜ |

---

## 4. Checklist — Peluang (Opportunity)

| ID | Test Case | Precondition | Input | Expected Output | Status |
|----|-----------|-------------|-------|-----------------|--------|
| TC-OPP-01 | Buat peluang valid sebagai Mitra | Login sebagai INDUSTRI | Semua field valid | HTTP 201, `status: PENDING` | ⬜ |
| TC-OPP-02 | Buat peluang deadline lampau | Login sebagai INDUSTRI | `deadline` < today | HTTP 400, validasi error | ⬜ |
| TC-OPP-03 | Buat peluang tanpa field wajib | Login sebagai INDUSTRI | Field `title` kosong | HTTP 400, Zod error detail | ⬜ |
| TC-OPP-04 | Buat peluang sebagai MAHASISWA | Login sebagai MAHASISWA | Data valid | HTTP 403 Forbidden | ⬜ |
| TC-OPP-05 | Daftar peluang publik | — | `GET /opportunities` | HTTP 200, hanya status `ACTIVE` | ⬜ |
| TC-OPP-06 | Filter peluang by kategori | — | `?category=INTERNSHIP` | Hanya peluang `INTERNSHIP` | ⬜ |
| TC-OPP-07 | Filter peluang by lokasi | — | `?locationType=REMOTE` | Hanya peluang `REMOTE` | ⬜ |
| TC-OPP-08 | Detail peluang dengan match score | Login sebagai MAHASISWA | `GET /opportunities/:id` | Response include `matchScore` | ⬜ |
| TC-OPP-09 | Detail peluang tanpa login | — | `GET /opportunities/:id` | HTTP 200, tanpa matchScore | ⬜ |
| TC-OPP-10 | Setujui peluang PENDING (Admin) | Login sebagai ADMIN | `PUT /admin/opportunities/:id/approve` | Status → `ACTIVE`, notif ke Mitra | ⬜ |
| TC-OPP-11 | Tolak peluang dengan alasan (Admin) | Login sebagai ADMIN | `PUT .../reject` + `{ rejectionReason }` | Status → `REJECTED`, notif ke Mitra | ⬜ |
| TC-OPP-12 | Tolak peluang tanpa alasan (Admin) | Login sebagai ADMIN | `PUT .../reject`, tanpa `rejectionReason` | HTTP 400 validasi error | ⬜ |
| TC-OPP-13 | Edit peluang oleh pemilik | Login sebagai INDUSTRI pemilik | `PUT /opportunities/:id` valid | HTTP 200, data ter-update | ⬜ |
| TC-OPP-14 | Edit peluang oleh bukan pemilik | Login sebagai INDUSTRI lain | `PUT /opportunities/:id` | HTTP 403 Forbidden | ⬜ |
| TC-OPP-15 | Hapus peluang (cascade) | Login sebagai INDUSTRI pemilik | `DELETE /opportunities/:id` | HTTP 200, peluang + semua lamaran terhapus | ⬜ |

---

## 5. Checklist — Lamaran (Application)

| ID | Test Case | Precondition | Input | Expected Output | Status |
|----|-----------|-------------|-------|-----------------|--------|
| TC-APP-01 | Ajukan lamaran berhasil | Login MAHASISWA, peluang ACTIVE | `POST /applications` valid | HTTP 201, `status: APPLIED`, notif ke Mitra | ⬜ |
| TC-APP-02 | Lamar dua kali ke peluang sama | Sudah ada lamaran | Duplicate apply | HTTP 409 Conflict | ⬜ |
| TC-APP-03 | Lamar ke peluang PENDING | Peluang belum disetujui | `POST /applications` | HTTP 400 / 403 | ⬜ |
| TC-APP-04 | Lamar sebagai INDUSTRI | Login sebagai INDUSTRI | `POST /applications` | HTTP 403 Forbidden | ⬜ |
| TC-APP-05 | Lihat riwayat lamaran milik sendiri | Login MAHASISWA | `GET /applications/my` | Hanya lamaran milik user tersebut | ⬜ |
| TC-APP-06 | Lihat daftar pelamar (Mitra) | Login INDUSTRI pemilik | `GET /applications/opportunity/:id` | Semua pelamar peluang tersebut | ⬜ |
| TC-APP-07 | Akses pelamar peluang orang lain | Login INDUSTRI yang bukan pemilik | `GET /applications/opportunity/:id` | HTTP 403 Forbidden | ⬜ |
| TC-APP-08 | Update status ke ACCEPTED | Login INDUSTRI pemilik | `PUT /applications/:id/status { ACCEPTED }` | HTTP 200, notif ACCEPTED ke Mahasiswa | ⬜ |
| TC-APP-09 | Update status ke REJECTED | Login INDUSTRI pemilik | `PUT /applications/:id/status { REJECTED }` | HTTP 200, notif REJECTED ke Mahasiswa | ⬜ |
| TC-APP-10 | Update status oleh bukan pemilik | Login INDUSTRI yang bukan pemilik | `PUT /applications/:id/status` | HTTP 403 Forbidden | ⬜ |

---

## 6. Checklist — Portofolio & Badge

| ID | Test Case | Precondition | Input | Expected Output | Status |
|----|-----------|-------------|-------|-----------------|--------|
| TC-PORT-01 | Tambah entri portofolio valid | Login sebagai MAHASISWA | `POST /portfolio` data valid | HTTP 201, entri tersimpan di DB | ⬜ |
| TC-PORT-02 | Tambah entri tanpa judul | Login sebagai MAHASISWA | `POST /portfolio` tanpa `title` | HTTP 400 validasi error | ⬜ |
| TC-PORT-03 | Tambah entri tipe tidak valid | Login sebagai MAHASISWA | `type: "UNKNOWN"` | HTTP 400 Zod error | ⬜ |
| TC-PORT-04 | Edit entri milik sendiri | Login MAHASISWA pemilik | `PUT /portfolio/:id` valid | HTTP 200, data ter-update | ⬜ |
| TC-PORT-05 | Edit entri milik orang lain | Login MAHASISWA lain | `PUT /portfolio/:id` | HTTP 404 (bukan 403, untuk privacy) | ⬜ |
| TC-PORT-06 | Hapus entri milik sendiri | Login MAHASISWA pemilik | `DELETE /portfolio/:id` | HTTP 200, entri terhapus | ⬜ |
| TC-PORT-07 | Badge Portofolio Lengkap | Semua 5 tipe entri ada | Tambah entri terakhir | Badge `PORTOFOLIO_LENGKAP` diterima | ⬜ |
| TC-PORT-08 | Badge idempotent | Badge sudah diterima | Trigger kondisi badge lagi | Badge tidak duplikat (upsert) | ⬜ |
| TC-SAVED-01 | Simpan peluang ke-1 s/d ke-4 | Login MAHASISWA | `POST /saved/:id` | HTTP 201, belum ada badge | ⬜ |
| TC-SAVED-02 | Simpan peluang ke-5 | 4 sudah tersimpan | `POST /saved/:id` ke-5 | HTTP 201, badge `KOLEKTOR` diterima | ⬜ |
| TC-SAVED-03 | Simpan peluang yang sudah tersimpan | Sudah tersimpan | `POST /saved/:id` lagi | HTTP 409 Conflict | ⬜ |
| TC-SAVED-04 | Hapus simpanan | Peluang tersimpan | `DELETE /saved/:id` | HTTP 200, dihapus dari daftar | ⬜ |

---

## 7. Checklist — Keamanan (Security)

| ID | Test Case | Metode | Expected Result | Status |
|----|-----------|--------|-----------------|--------|
| TC-SEC-01 | SQL Injection pada query param | `?search='; DROP TABLE users; --` | Prisma memblokir; tidak ada efek ke DB | ⬜ |
| TC-SEC-02 | XSS pada field input (nama, bio) | Input `<script>alert(1)</script>` | Script tidak dieksekusi saat render | ⬜ |
| TC-SEC-03 | Password tersimpan sebagai hash | Cek DB langsung | Kolom `password_hash` berisi bcrypt string (`$2b$...`) | ⬜ |
| TC-SEC-04 | API key tidak ada di source code | Audit source code | Semua secret hanya dari `.env` | ⬜ |
| TC-SEC-05 | CORS: request dari origin asing | `Origin: https://evil.com` | Response tidak mengizinkan request | ⬜ |
| TC-SEC-06 | Helmet headers terpasang | Cek response headers | `X-Frame-Options`, `X-Content-Type-Options`, dll ada | ⬜ |
| TC-SEC-07 | Data PII Mahasiswa tidak bocor | `GET /candidates` sebagai INDUSTRI | Response tidak mengandung `email` atau `passwordHash` | ⬜ |
| TC-SEC-08 | JWT tidak bisa dimanipulasi | Ubah payload JWT | HTTP 401 Unauthorized | ⬜ |
| TC-SEC-09 | Brute force login | 100+ request login gagal | HTTP 429 setelah batas terpenuhi | ⬜ |
| TC-SEC-10 | Akses endpoint admin tanpa token | No header | HTTP 401 | ⬜ |

---

## 8. Checklist — UI/UX

| ID | Test Case | Device/Browser | Expected Result | Status |
|----|-----------|---------------|-----------------|--------|
| TC-UI-01 | Halaman responsive 320px (mobile) | Chrome DevTools 320px | Layout tidak rusak, tidak overflow | ⬜ |
| TC-UI-02 | Halaman responsive 768px (tablet) | Chrome DevTools 768px | Sidebar collapsible berfungsi | ⬜ |
| TC-UI-03 | Toast sukses muncul setelah aksi | Chrome | Toast muncul 4 detik lalu hilang | ⬜ |
| TC-UI-04 | Toast error muncul saat gagal | Chrome | Toast merah dengan pesan dari server | ⬜ |
| TC-UI-05 | Skeleton loading saat fetch | Chrome (throttle slow 3G) | Skeleton cards tampil, bukan halaman kosong | ⬜ |
| TC-UI-06 | Empty state jika tidak ada data | Login tanpa data | Ilustrasi + pesan, bukan whitespace kosong | ⬜ |
| TC-UI-07 | Validasi form inline | Chrome | Error muncul saat blur field, sebelum submit | ⬜ |
| TC-UI-08 | Navigasi sidebar item aktif | Chrome | Item aktif ter-highlight sesuai route | ⬜ |
| TC-UI-09 | Bookmark toggle animasi | Chrome | Ikon berubah filled/outline dengan transisi | ⬜ |
| TC-UI-10 | Cross-browser: Firefox | Firefox | UI tampil konsisten | ⬜ |
| TC-UI-11 | Cross-browser: Safari | Safari | UI tampil konsisten, tidak ada CSS bug | ⬜ |
| TC-UI-12 | Match score bar tampil untuk Mahasiswa | Login MAHASISWA | Progress bar dengan persentase muncul | ⬜ |
| TC-UI-13 | Match score bar tidak tampil untuk Publik | Tidak login | Tidak ada match score | ⬜ |

---

## 9. Definition of Done

Sebuah fitur atau fix dinyatakan **selesai (DONE)** apabila **semua** kriteria berikut terpenuhi:

- [ ] Semua test case terkait fitur tersebut berstatus **PASS** (`✅`)
- [ ] Tidak ada eslint error maupun warning
- [ ] Kode sudah direview oleh minimal **1 anggota tim lain** (pull request review)
- [ ] Dokumentasi API endpoint diperbarui di Postman Collection / README
- [ ] Di-deploy ke staging environment dan diverifikasi secara manual
- [ ] Tidak ada regresi pada fitur yang sudah ada (regression test pass)
- [ ] UI telah diverifikasi responsive minimal di 320px dan 1280px

---

## 10. Laporan Bug

Gunakan format berikut untuk setiap bug yang ditemukan selama testing:

```markdown
**ID Bug:** BUG-[nomor urut]
**Tanggal:** YYYY-MM-DD
**Reporter:** [Nama]
**Severity:** Critical / High / Medium / Low
**Status:** Open / In Progress / Resolved / Closed

**Deskripsi:**
[Jelaskan bug secara singkat]

**Steps to Reproduce:**
1. [Langkah 1]
2. [Langkah 2]
3. [Langkah 3]

**Expected Behavior:**
[Apa yang seharusnya terjadi]

**Actual Behavior:**
[Apa yang benar-benar terjadi]

**Environment:**
- Browser: Chrome 125 / Firefox 126 / dll
- OS: Windows 11 / macOS 14 / dll
- URL: https://[staging-url]/path
- User Role: MAHASISWA / INDUSTRI / ADMIN

**Screenshot / Log:**
[Tempel screenshot atau error log]
```

### Severity Level

| Level | Deskripsi | Contoh |
|-------|-----------|--------|
| **Critical** | Sistem tidak bisa digunakan, data loss | Login tidak bisa sama sekali, data terhapus tidak sengaja |
| **High** | Fitur utama rusak, tidak ada workaround | Apply peluang selalu gagal, badge tidak diberikan |
| **Medium** | Fitur terdampak tapi ada workaround | Filter tidak bekerja tapi search manual bisa |
| **Low** | Kosmetik / UX minor | Warna tombol tidak sesuai desain, typo teks |

---

*Standar referensi: IEEE 829-2008 · ISO/IEC 25010 · OWASP Top 10:2021*
*© 2026 Tim Pengembang WIRPL*
