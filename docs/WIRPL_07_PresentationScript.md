# 🎤 IRON LUNG — Presentation Script
### Durasi: ±10 Menit | Bahasa: Indonesia
### Presenters: Anders · Dhimas · Evan · Azhar

---

> **Panduan Penggunaan:**
> - `[SLIDE X]` = isyarat ganti slide
> - `[PAUSE]` = berhenti sebentar untuk efek
> - `(X menit)` = estimasi waktu kumulatif
> - 🟦 **ANDERS** · 🟩 **DHIMAS** · 🟧 **EVAN** · 🟥 **AZHAR**
> - Kecepatan bicara ideal: ~130 kata/menit

---

## Ringkasan Pembagian Bagian

| Bagian | Topik | Durasi | Presenter |
|--------|-------|--------|-----------|
| Pembukaan + Problem | Intro, latar belakang masalah | 0:00 – 1:00 | 🟦 **Anders** |
| Overview Platform | Aktor, fitur utama | 1:00 – 2:30 | 🟦 **Anders** |
| Dok. 1: PRD | User stories, acceptance criteria, prioritas | 2:30 – 4:30 | 🟩 **Dhimas** |
| Dok. 2: User Flow | 5 alur utama | 4:30 – 6:00 | 🟧 **Evan** |
| Dok. 3: Wireframe | 9 layar kunci | 6:00 – 7:00 | 🟧 **Evan** |
| Dok. 4: Architecture | Tech stack, system diagram, security | 7:00 – 8:30 | 🟥 **Azhar** |
| Dok. 5: Test Plan | Strategi, checklist, DoD | 8:30 – 9:30 | 🟥 **Azhar** |
| Dok. 6: Release Plan | 4 fase, milestone, risiko | 9:30 – 9:45 | 🟥 **Azhar** |
| Penutup + Closing | Summary, closing statement | 9:45 – 10:00 | 🟦 **Anders** |

---

---

# 🟦 ANDERS — Bagian 1 & 2 (0:00 – 2:30)

---

## BAGIAN 1 — PEMBUKAAN (0:00 – 1:00)

**[SLIDE 1 — Cover / Judul Project]**

Selamat pagi / siang / sore — *[sesuaikan waktu]*

Perkenalkan, kami dari Tim Pengembang IRON LUNG. Saya Anders, dan bersama saya ada Dhimas, Evan, dan Azhar.

Hari ini kami akan mempresentasikan **IRON LUNG** — yang merupakan singkatan dari **Intelligent Resource Organizer for Networking, Learning, Unified iNternships, and Group collaboration** — sebuah platform web yang kami rancang dan kembangkan sebagai bagian dari mata kuliah Workshop Rekayasa Perangkat Lunak, Semester 4.

**[PAUSE]**

Sebelum kami masuk ke dokumentasi teknisnya, izinkan saya cerita sebentar tentang **masalah yang melatarbelakangi proyek ini.**

Sebagai mahasiswa, kita semua pasti pernah mengalami momen di mana kita ingin mencari magang, ikut kompetisi, atau bergabung dalam proyek kolaborasi — tapi bingung *harus mulai dari mana*. Informasinya ada di mana-mana: di grup WhatsApp, di Instagram, di papan pengumuman kampus — dan semuanya tidak terorganisir dengan baik.

**[SLIDE 2 — Problem Statement]**

IRON LUNG hadir untuk menjawab masalah itu. Satu platform web terpusat yang **menjembatani mahasiswa Informatika Indonesia dengan dunia profesional** — memfasilitasi pencarian magang, kolaborasi lintas institusi, pendaftaran kompetisi teknologi, dan akses ke program pelatihan industri.

*(1 menit)*

---

## BAGIAN 2 — OVERVIEW PLATFORM (1:00 – 2:30)

**[SLIDE 3 — Tiga Aktor Utama]**

IRON LUNG melibatkan **tiga aktor utama** dalam ekosistemnya:

Yang **pertama**, **Mahasiswa** — sebagai pengguna utama. Mahasiswa bisa browse peluang, mendaftar, menyimpan peluang favorit, dan membangun portofolio digital mereka langsung di platform.

Yang **kedua**, **Industri** — perusahaan atau organisasi penyedia peluang. Mereka bisa posting peluang, mengelola listing, dan mereview pelamar yang masuk.

Dan yang **ketiga**, **Admin** — yang bertugas menjaga kualitas konten platform. Setiap peluang yang diposting oleh Industri harus melalui proses moderasi Admin sebelum bisa dilihat publik. Ini adalah mekanisme kontrol kualitas yang kami rancang sejak awal.

**[SLIDE 4 — Fitur Utama]**

Kategori peluang yang difasilitasi IRON LUNG ada empat, sesuai dengan yang tertuang di SRS kami:
- **Internship** — kesempatan magang
- **Collaboration** — proyek kolaborasi lintas institusi
- **Competition** — kompetisi teknologi
- **Training** — program pelatihan industri

Dan fitur-fitur pendukungnya meliputi: sistem apply lamaran, portofolio digital, notifikasi in-app, sistem lencana atau badge berbasis pencapaian, serta profil publik mahasiswa yang bisa dilihat oleh pihak Industri.

Nah, untuk dokumentasi lebih detailnya — saya serahkan kepada Dhimas untuk membahas PRD kita.

*(2,5 menit)*

---

---

# 🟩 DHIMAS — Bagian 3: PRD (2:30 – 4:30)

---

## BAGIAN 3 — DOKUMEN 1: PRD (2:30 – 4:30)

**[SLIDE 5 — PRD Cover]**

Terima kasih, Anders. Saya Dhimas, dan saya akan membahas dokumen pertama kami — **PRD, atau Product Requirements Document.**

PRD adalah fondasi dari seluruh pengembangan IRON LUNG. Tanpa PRD yang jelas, tim tidak punya panduan yang sama tentang *apa* yang harus dibangun, *untuk siapa*, dan *mengapa*. Inilah mengapa kami menyusunnya sebelum menyentuh satu baris kode pun.

**[SLIDE 6 — User Stories]**

Di dalam PRD kami, terdapat **14 user stories** yang mencakup kebutuhan semua aktor. Setiap user story ditulis dalam format standar:
> *"Sebagai [aktor], saya ingin [aksi], agar [tujuan]."*

Dan setiap user story dilengkapi dengan **Acceptance Criteria** — kriteria terukur yang menentukan apakah sebuah fitur sudah selesai atau belum.

Sebagai contoh, untuk fitur mendaftar peluang: Mahasiswa tidak boleh bisa mendaftar ke peluang yang sama lebih dari satu kali — ini juga sudah didokumentasikan di SRS sebagai constraint bisnis B02. Sistem akan mengembalikan error 409 Conflict. Ini bukan sekadar kata-kata — ini adalah kontrak antara tim developer dan stakeholder.

**[SLIDE 7 — In Scope vs Out of Scope]**

PRD kami juga secara eksplisit mendefinisikan apa yang masuk dan **tidak masuk** dalam lingkup v1.0. Fitur seperti real-time chat, pembayaran, dan integrasi OAuth dengan kampus — kami tandai sebagai *out of scope* dan direncanakan untuk iterasi berikutnya.

Ini penting untuk mencegah **scope creep** — musuh terbesar proyek berbatas waktu seperti yang kami kerjakan.

**[SLIDE 8 — Priority Matrix]**

Terakhir dari PRD, kami menyusun **matriks prioritas** fitur dari P0 hingga P3:
- **P0 — Must Have**: Auth, browse peluang, apply, moderasi admin
- **P1 — Should Have**: Portofolio, notifikasi, profil publik
- **P2 — Nice to Have**: Badge system, analitik
- **P3 — Future**: Real-time chat, AI matching, mobile app

Dengan matriks ini, tim selalu tahu mana yang harus diselesaikan lebih dulu — bahkan saat deadline mendekat.

Selanjutnya, saya persilakan Evan untuk menjelaskan User Flow dan Wireframe IRON LUNG.

*(4,5 menit)*

---

---

# 🟧 EVAN — Bagian 4 & 5: User Flow + Wireframe (4:30 – 7:00)

---

## BAGIAN 4 — DOKUMEN 2: USER FLOW (4:30 – 6:00)

**[SLIDE 9 — User Flow Overview]**

Terima kasih, Dhimas. Saya Evan. Saya akan membawakan dua dokumen: User Flow dan Wireframe.

Dokumen kedua adalah **User Flow Diagram**.

User Flow menggambarkan *perjalanan* pengguna di dalam platform IRON LUNG — langkah demi langkah, dari titik masuk hingga tujuan akhir mereka. Dokumen ini sangat penting karena memastikan seluruh tim punya gambaran yang sama tentang *bagaimana* sistem bekerja dari sudut pandang pengguna.

**[SLIDE 10 — Flow Registrasi]**

Kami mendokumentasikan **5 alur utama**. Mari ambil contoh **Flow Registrasi dan Onboarding**.

Mahasiswa baru tiba di Landing Page, klik "Daftar Sekarang", mengisi form registrasi dengan data: nama, email, password, universitas, program studi, dan semester. Jika email sudah terdaftar — sistem memberi pesan error 409 yang jelas. Jika berhasil — akun dibuat secara atomik bersama profil Mahasiswa, token JWT diterbitkan, dan pengguna langsung diarahkan ke halaman **Onboarding**.

Di Onboarding, mahasiswa melengkapi bio, skills, interests, dan foto profil. Proses ini hanya terjadi **satu kali** — dan setelah selesai, field `onboardingComplete` diset true, lalu pengguna masuk ke Dashboard.

**[SLIDE 11 — Flow Apply]**

Contoh kedua: **Flow Browse dan Apply Peluang**.

Mahasiswa browse daftar peluang, menggunakan filter kategori atau lokasi, membuka detail peluang — dan di sana mereka melihat **skor kecocokan** yang dihitung berdasarkan skills mereka versus `skillsRequired` dari peluang tersebut. Lalu mereka bisa klik "Daftar Sekarang", mengisi cover letter opsional, dan kirim lamaran.

Setelah terkirim — muncul toast notifikasi sukses, tombol berubah jadi "Sudah Didaftarkan" yang disabled, dan pihak Industri secara otomatis mendapat notifikasi lamaran baru masuk.

Yang kami dokumentasikan bukan hanya happy path — tapi juga semua **edge case**: token expired, belum login, deadline sudah lewat — semuanya ada di dokumen ini.

*(6 menit)*

---

## BAGIAN 5 — DOKUMEN 3: WIREFRAME (6:00 – 7:00)

**[SLIDE 12 — Wireframe Overview]**

Dokumen ketiga adalah **Wireframe Descriptions**.

Kami mendokumentasikan **9 layar utama** IRON LUNG, mulai dari Landing Page, Daftar Peluang, Detail Peluang, Dashboard Mahasiswa, Portofolio, Notifikasi, Dashboard Industri, hingga halaman Moderasi Admin.

**[SLIDE 13 — Contoh Wireframe]**

Ambil contoh halaman **Detail Peluang**. Di sana terdapat: header dengan badge kategori dan countdown deadline, progress bar skor kecocokan yang hanya muncul untuk Mahasiswa yang login, daftar requirements, skills yang dibutuhkan dalam bentuk chip, dan di bagian bawah — panel aksi dengan tombol "Daftar Sekarang" yang berubah menjadi disabled jika Mahasiswa sudah pernah mendaftar.

Setiap wireframe juga disertai **pertimbangan mobile** — bagaimana sidebar berubah jadi drawer, bagaimana panel aksi menjadi fixed bar di bawah layar pada perangkat kecil — mengikuti requirement NF-U01 di SRS kami yang menetapkan UI harus responsif di resolusi minimal 320px.

Wireframe ini menjadi panduan bagi developer frontend agar implementasi konsisten, dan menjadi bahan diskusi dengan stakeholder sebelum kode ditulis.

Selanjutnya saya serahkan kepada Azhar untuk bagian Architecture, Test Plan, dan Release Plan.

*(7 menit)*

---

---

# 🟥 AZHAR — Bagian 6, 7 & 8: Architecture + Test Plan + Release Plan (7:00 – 9:45)

---

## BAGIAN 6 — DOKUMEN 4: ARCHITECTURE (7:00 – 8:30)

**[SLIDE 14 — Architecture Diagram]**

Terima kasih, Evan. Saya Azhar, dan saya akan menjelaskan sisi teknis dari IRON LUNG — dimulai dari **Software Architecture**.

Arsitektur IRON LUNG mengikuti pola **client-server yang terpisah** atau *decoupled* — persis seperti yang digambarkan di bagian 2.1 SRS kami. Frontend dibangun dengan **React 18 dan Vite**, di-deploy di **Vercel**. Backend menggunakan **Node.js dan Express**, di-deploy di **Railway**. Database menggunakan **PostgreSQL** yang juga dikelola via Railway Plugin.

Untuk penyimpanan file seperti avatar, CV, dan dokumen portofolio — kami menggunakan **Cloudinary** sebagai CDN eksternal.

**[SLIDE 15 — Backend Architecture]**

Di sisi backend, kami mengikuti arsitektur **MVC yang diperluas** dengan tiga layer utama:
- **Routes** — mendefinisikan endpoint dan menghubungkan ke middleware pipeline
- **Controllers** — layer tipis yang hanya menerima request dan mengirim response
- **Services** — di sinilah seluruh business logic berada, termasuk trigger badge dan pengiriman notifikasi

Ini membuat kode terorganisir, mudah ditest, dan mudah diperluas.

**[SLIDE 16 — Security Stack]**

Untuk **keamanan**, sesuai dengan requirement NF-S01 hingga NF-S10 di SRS kami, kami menerapkan berlapis:
- **JWT HS256** — access token 15 menit, refresh token 7 hari
- **bcryptjs** — password di-hash, tidak ada yang tersimpan plain text
- **Prisma ORM** — semua query melalui prepared statements, SQL Injection terlindungi secara otomatis
- **Zod** — validasi semua input di backend maupun frontend
- **Helmet.js** — HTTP security headers
- **Rate Limiting** — `authLimiter` untuk endpoint autentikasi, `globalLimiter` untuk semua endpoint

*(8,5 menit)*

---

## BAGIAN 7 — DOKUMEN 5: TEST PLAN (8:30 – 9:30)

**[SLIDE 17 — Test Plan]**

Dokumen kelima adalah **Test Plan dan Test Checklist**.

Pengujian adalah bagian yang sering dilewatkan di proyek student — tapi kami percaya ini adalah bagian yang justru paling menentukan kualitas produk akhir IRON LUNG.

Kami mengadopsi **strategi testing berlapis**: Unit Test untuk fungsi service layer, Integration Test untuk endpoint API end-to-end, Manual UAT untuk setiap user flow, dan Security Testing berdasarkan checklist OWASP Top 10.

**[SLIDE 18 — Test Checklist]**

Total kami mendokumentasikan **lebih dari 50 test case**, dibagi dalam 6 kategori:
1. Authentication dan Authorization — 13 test case
2. Peluang (Opportunity) — 15 test case
3. Lamaran (Application) — 10 test case
4. Portofolio dan Badge — 12 test case
5. Keamanan — 10 test case
6. UI/UX — 13 test case

Setiap test case memiliki ID unik, precondition, input, dan expected output yang konkret — sehingga siapapun di tim bisa menjalankan test yang sama dan mendapatkan hasil yang konsisten.

Kami juga mendefinisikan **Definition of Done** yang ketat — sebuah fitur baru dianggap selesai *hanya* setelah semua test case pass, tidak ada eslint error, sudah direview oleh minimal satu anggota tim, dan sudah diverifikasi di staging environment.

*(9,5 menit)*

---

## BAGIAN 8 — DOKUMEN 6: RELEASE PLAN (9:30 – 9:45)

**[SLIDE 19 — Release Plan]**

Terakhir, **Release Plan** — peta jalan pengembangan IRON LUNG selama **8 minggu dalam 4 fase**:

- **Fase 1 (Minggu 1–2)**: Foundation — setup infrastruktur, schema database, sistem autentikasi
- **Fase 2 (Minggu 3–4)**: Core Features — fitur P0 selesai, MVP bisa didemonstrasikan
- **Fase 3 (Minggu 5–6)**: Enhanced Features — portofolio, notifikasi, badge, Cloudinary
- **Fase 4 (Minggu 7–8)**: Launch & Polish — QA menyeluruh, security audit, final deployment ke produksi

Kami juga mendokumentasikan **manajemen risiko** — dari anggota tim yang tidak tersedia, scope creep, hingga kemungkinan downtime layanan cloud saat demo.

Kembali saya serahkan kepada Anders untuk penutup.

---

---

# 🟦 ANDERS — Penutup (9:45 – 10:00)

---

## BAGIAN 9 — PENUTUP (9:45 – 10:00)

**[SLIDE 20 — Summary / Closing]**

Terima kasih Azhar, Evan, dan Dhimas.

Jadi, kami telah mempresentasikan **6 dokumen** yang menjadi fondasi proyek IRON LUNG: PRD, User Flow, Wireframe, Architecture, Test Plan, dan Release Plan.

**[PAUSE]**

IRON LUNG bukan sekadar proyek akademik. Kami membangunnya dengan standar dokumentasi yang mengacu pada **IEEE Std 830-1998, ISO/IEC 12207, ISO/IEC 25010**, dan best practice keamanan **OWASP Top 10:2021** — standar yang sama yang digunakan di industri perangkat lunak profesional.

Setiap keputusan desain — dari pemilihan tech stack, arsitektur database, hingga strategi pengujian — kami dokumentasikan dengan alasan yang jelas dan terukur. Karena kami percaya bahwa **kode yang baik dimulai dari dokumentasi yang baik.**

**[PAUSE]**

Harapan kami, IRON LUNG bisa benar-benar bermanfaat — menjadi jembatan antara mahasiswa Informatika Indonesia dengan peluang yang selama ini tersebar dan sulit ditemukan.

Sekian dari kami — Anders, Dhimas, Evan, dan Azhar. Kami terbuka untuk pertanyaan dan diskusi.

Terima kasih. 🙏

**[SLIDE 21 — Q&A Slide]**

---

---

## 📌 SPEAKER NOTES & TIPS

### Pembagian Final Per Presenter

| Presenter | Bagian | Topik | Durasi |
|-----------|--------|-------|--------|
| 🟦 **Anders** | Bagian 1 + 2 + Penutup | Pembukaan, Overview Platform, Closing | ~2:45 |
| 🟩 **Dhimas** | Bagian 3 | PRD — User Stories, Acceptance Criteria, Priority | ~2:00 |
| 🟧 **Evan** | Bagian 4 + 5 | User Flow (5 alur), Wireframe (9 layar) | ~2:30 |
| 🟥 **Azhar** | Bagian 6 + 7 + 8 | Architecture, Test Plan, Release Plan | ~2:45 |

### Tips Transisi Antar Presenter

- Setiap akhir giliran, **sebutkan nama presenter berikutnya** secara eksplisit
  > *"Selanjutnya saya serahkan kepada [nama]..."*
- Presenter berikutnya **berdiri / maju** saat namanya disebut untuk transisi yang mulus
- Jangan rebutan mic — tunggu presenter sebelumnya selesai berbicara sepenuhnya

### Tips Presentasi Umum

1. **Jangan baca script kata per kata** — pakai ini sebagai panduan, bicara natural
2. **Kontak mata dengan audiens** — jangan terus lihat slide atau catatan
3. **Gunakan pause** — jeda 1–2 detik setelah poin penting agar audiens mencerna
4. **Latihan bersama minimal 2x** sebelum hari H untuk memastikan durasi tepat

### 3 Pertanyaan Q&A yang Mungkin Ditanyakan

| Pertanyaan | Siapa yang Jawab | Poin Jawaban |
|-----------|-----------------|--------------|
| "Bagaimana kalian memastikan keamanan data pengguna?" | **Azhar** | JWT HS256, bcrypt, Prisma ORM (no raw SQL), Helmet, Zod, OWASP checklist NF-S01–S10 |
| "Mengapa memilih PostgreSQL dibanding MongoDB?" | **Azhar** | Data relasional (user–application–opportunity), ACID transactions, Prisma migration support |
| "Bagaimana rencana pengembangan setelah v1.0?" | **Anders** | Real-time chat, AI matching, mobile app — sudah di-scope sebagai P3, akan masuk roadmap v2.0 |

---

*Script ini dibuat berdasarkan SRS-IRONLUNG-001 — Workshop Rekayasa Perangkat Lunak, Semester 4*
*Proyek: IRON LUNG — Intelligent Resource Organizer for Networking, Learning, Unified iNternships, and Group collaboration*
*Repository: `naa2412/iron-lung`*
*Estimasi durasi: 9,5 – 10 menit (tidak termasuk Q&A)*
*Presenters: Anders · Dhimas · Evan · Azhar*
