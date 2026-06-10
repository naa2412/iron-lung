# User Flow Diagram
## WIRPL — Web Integration for Resources, Projects & Learning

---

| Atribut | Nilai |
|---------|-------|
| **Dokumen ID** | UFD-WIRPL-001 |
| **Versi** | 1.0.0 |
| **Tanggal** | 10 Juni 2026 |
| **Status** | Draft |

---

## Daftar Isi

1. [Flow 1 — Registrasi & Onboarding (Mahasiswa)](#flow-1--registrasi--onboarding-mahasiswa)
2. [Flow 2 — Browse & Apply Peluang (Mahasiswa)](#flow-2--browse--apply-peluang-mahasiswa)
3. [Flow 3 — Posting & Moderasi Peluang (Mitra → Admin)](#flow-3--posting--moderasi-peluang-mitra--admin)
4. [Flow 4 — Kelola Lamaran (Mitra)](#flow-4--kelola-lamaran-mitra)
5. [Flow 5 — Kelola Portofolio (Mahasiswa)](#flow-5--kelola-portofolio-mahasiswa)
6. [Ringkasan Navigasi Per Role](#ringkasan-navigasi-per-role)

---

## Flow 1 — Registrasi & Onboarding (Mahasiswa)

```
[Landing Page]
     │
     ▼
[Klik "Daftar Sekarang"]
     │
     ▼
[Halaman Register] ── /register
  Input: Nama, Email, Password, Univ, Prodi, Semester
     │
     ├──[Validasi Gagal]──► Tampilkan error inline ──► (kembali ke form)
     │
     ▼
[POST /auth/register/mahasiswa]
     │
     ├──[Email Sudah Ada]──► Toast error "Email telah terdaftar" ──► (kembali ke form)
     │
     ▼
[Akun dibuat + JWT diterbitkan]
     │
     ▼
[Halaman Onboarding] ── /onboarding
  Step 1: Bio & Foto Profil (upload ke Cloudinary)
  Step 2: Skills & Interests (tag input, multi-select)
  Step 3: CV URL & Portfolio URL
     │
     ├──[Skip]──────────────────────────────────────────────────┐
     │                                                          │
     ▼                                                          ▼
[onboardingComplete = true]                    [onboardingComplete = false]
[Redirect ke /dashboard]                       [Dapat dilengkapi nanti di /profil]
     │                                                          │
     └──────────────────────┬───────────────────────────────────┘
                            ▼
                  [Dashboard Mahasiswa] ── /dashboard
```

**Catatan:**
- JWT access token disimpan di memory; refresh token di `localStorage`
- Jika `onboardingComplete = false` dan user mencoba akses halaman lain, redirect ke `/onboarding`

---

## Flow 2 — Browse & Apply Peluang (Mahasiswa)

```
[Dashboard] atau [Nav: Peluang]
     │
     ▼
[Halaman Daftar Peluang] ── /peluang
  ┌──────────────────────────────────────────────┐
  │  Filter: Kategori | Lokasi | Keyword         │
  │  Sort: Terbaru | Deadline | Relevansi        │
  └──────────────────────────────────────────────┘
     │
     ▼
[Daftar Card Peluang]
     │
     ▼
[Klik Card / "Lihat Detail"]
     │
     ▼
[Halaman Detail Peluang] ── /peluang/:id
  Tampilan: Judul, Deskripsi, Requirements, Deadline
  Skor Kecocokan Skills (jika login sebagai Mahasiswa)
     │
     ├──[Belum Login]──► Redirect ke /login ──► (kembali ke detail setelah login)
     │
     ├──[Sudah Pernah Daftar]──► Tombol "Sudah Didaftarkan" (disabled, abu-abu)
     │
     ├──[Klik "Simpan"]──► POST /saved/:id ──► Toast "Disimpan!" ──► Icon bookmark aktif
     │
     ▼
[Klik "Daftar Sekarang"] ← CTA utama
     │
     ▼
[Modal Form Lamaran]
  ┌──────────────────────────────────────────────┐
  │ Cover Letter (textarea, opsional)            │
  │ Portfolio URL (opsional, pre-fill dari profil│
  │ [Batal]                    [Kirim Lamaran →] │
  └──────────────────────────────────────────────┘
     │
     ├──[Batal]──► Tutup modal
     │
     ▼
[POST /applications]
     │
     ├──[Gagal]──► Toast error dengan pesan spesifik dari server
     │
     ▼
[Lamaran Terkirim ✅]
  - Toast "Lamaran berhasil dikirim!"
  - Tombol berubah jadi "Sudah Didaftarkan" (disabled)
  - Notifikasi in-app dikirim ke Mitra
  - Status lamaran: APPLIED
```

---

## Flow 3 — Posting & Moderasi Peluang (Mitra → Admin)

```
[Mitra Login] ── /login
     │
     ▼
[Dashboard Mitra] ── /perusahaan/dashboard
     │
     ▼
[Klik "Buat Peluang Baru"] ── /perusahaan/buat-peluang
  Form:
  ┌────────────────────────────────────────────────┐
  │ Judul        [________________________]        │
  │ Kategori     [Dropdown ▼]                      │
  │ Deskripsi    [textarea, min 50 karakter]       │
  │ Requirements [textarea, per baris]             │
  │ Tipe Lokasi  [Remote | On-site | Hybrid]       │
  │ Kota         [________________________]        │
  │ Durasi       [________________________]        │
  │ Deadline     [date picker]                     │
  │ Skills       [tag input]                       │
  │ URL Registrasi [______________________]        │
  └────────────────────────────────────────────────┘
     │
     ├──[Validasi Gagal]──► Highlight field error merah
     │
     ▼
[POST /opportunities]
  Status otomatis: PENDING
     │
     ▼
[Toast "Peluang dikirim, menunggu persetujuan Admin"]
     │
     │ ─── Admin menerima notifikasi in-app ───────────────────────
     │
     ▼
[Admin Login] ── /admin/dashboard
     │
     ▼
[Halaman Moderasi] ── /admin/moderasi
  Daftar kartu peluang berstatus PENDING
     │
     ├──[Klik "Setujui"] ──► PUT /admin/opportunities/:id/approve
     │                        Status: PENDING → ACTIVE
     │                        Notifikasi → Mitra ✅
     │                        Peluang tampil ke publik
     │
     └──[Klik "Tolak"] ───► Modal: input alasan penolakan (wajib)
                             PUT /admin/opportunities/:id/reject + { rejectionReason }
                             Status: PENDING → REJECTED
                             Notifikasi → Mitra ❌
```

---

## Flow 4 — Kelola Lamaran (Mitra)

```
[Dashboard Mitra] ── /perusahaan/dashboard
     │
     ▼
[Menu "Daftar Pelamar"] ── /perusahaan/pelamar
     │
     ▼
[Dropdown: Pilih Peluang]
     │
     ▼
[Tabel Pelamar]
  ┌──────────────────────────────────────────────────────┐
  │ Nama  │ Universitas │ Status  │ Tanggal Daftar │ Aksi│
  ├────────┼─────────────┼─────────┼────────────────┼─────┤
  │ Andi   │ UGM         │ APPLIED │ 5 Jun 2026     │ ... │
  │ Budi   │ UI          │ VIEWED  │ 4 Jun 2026     │ ... │
  └──────────────────────────────────────────────────────┘
     │
     ▼
[Klik nama Mahasiswa]
  ──► Lihat Profil Publik + Cover Letter + Portfolio URL
     │
     ├──[Klik "Lihat Profil"]──► /profil/:profileId (tab baru)
     │
     ├──[Klik "Terima"] ──► PUT /applications/:id/status { status: "ACCEPTED" }
     │                       Toast "Lamaran diterima"
     │                       Status → ACCEPTED
     │                       Notifikasi → Mahasiswa ✅
     │
     └──[Klik "Tolak"] ───► PUT /applications/:id/status { status: "REJECTED" }
                             Toast "Lamaran ditolak"
                             Status → REJECTED
                             Notifikasi → Mahasiswa ❌
```

---

## Flow 5 — Kelola Portofolio (Mahasiswa)

```
[Sidebar: Portofolio] ── /portofolio
     │
     ▼
[Halaman Portofolio]
  Tampilkan daftar entri yang sudah ada
     │
     ▼
[Klik "+ Tambah Entri"]
     │
     ▼
[Form Tambah Entri] (muncul di atas daftar)
  Tipe | Judul | Organisasi | Tanggal | Deskripsi | Skills
     │
     ├──[Simpan] ──► POST /portfolio
     │               Entri ditambahkan ke daftar
     │               Cek badge "Portofolio Lengkap" (auto-trigger)
     │
     └──[Batal] ──► Tutup form

[Dari daftar entri]
     │
     ├──[Klik ✏ Edit] ──► Isi form dengan data entri
     │                     PUT /portfolio/:id
     │                     Toast "Entri diperbarui"
     │
     └──[Klik 🗑 Hapus] ──► Konfirmasi dialog "Yakin ingin menghapus?"
                            DELETE /portfolio/:id
                            Toast "Entri dihapus"
```

---

## Ringkasan Navigasi Per Role

| Role | Halaman Home | Akses Navigasi |
|------|-------------|----------------|
| **Mahasiswa** | `/dashboard` | `/peluang` · `/lamaran` · `/tersimpan` · `/portofolio` · `/notifikasi` · `/profil` |
| **Mitra** | `/perusahaan/dashboard` | `/perusahaan/buat-peluang` · `/perusahaan/kelola` · `/perusahaan/pelamar` · `/perusahaan/kandidat` · `/perusahaan/profil` |
| **Admin** | `/admin/dashboard` | `/admin/moderasi` · `/admin/pengguna` |
| **Publik** | `/` (Landing) | `/peluang` (read-only) · `/peluang/:id` · `/profil/:id` |

---

## Error & Edge Case Flows

| Skenario | Respons Sistem |
|----------|---------------|
| Akses halaman protected tanpa login | Redirect ke `/login`, setelah login kembali ke URL asal |
| Akses halaman role lain | Redirect ke dashboard sesuai role aktif |
| Token expired saat request | Axios interceptor auto-refresh; jika gagal, redirect ke `/login` |
| Peluang deadline terlampaui | Badge "Berakhir" tampil; tombol Daftar di-disable |
| Koneksi internet putus | Toast "Gagal terhubung ke server. Coba lagi." |
| Upload file gagal (Cloudinary) | Toast error spesifik, form tidak ter-submit |

---

*© 2026 Tim Pengembang WIRPL*
