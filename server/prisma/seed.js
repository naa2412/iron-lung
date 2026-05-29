require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');

const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Mulai seeding database...');

  // Hapus data lama
  await prisma.badge.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.savedOpportunity.deleteMany();
  await prisma.application.deleteMany();
  await prisma.portfolioEntry.deleteMany();
  await prisma.opportunity.deleteMany();
  await prisma.companyProfile.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 12);
  const adminPasswordHash = await bcrypt.hash('admin123', 12);

  // ===== ADMIN =====
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ironlung.id',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
  });
  console.log('Admin dibuat:', admin.email);

  // ===== COMPANIES =====
  const gojekUser = await prisma.user.create({
    data: {
      email: 'recruitment@gojek.com',
      passwordHash,
      role: 'INDUSTRI',
      companyProfile: {
        create: {
          companyName: 'Gojek',
          logoUrl: 'https://ui-avatars.com/api/?name=Gojek&background=00AA13&color=fff&size=200&bold=true&font-size=0.4',
          description: 'Gojek adalah platform teknologi terdepan di Asia Tenggara yang menyediakan layanan transportasi, pembayaran, pengiriman makanan, logistik, dan berbagai layanan on-demand lainnya. Bergabunglah dengan tim teknologi kami untuk membangun produk yang digunakan jutaan pengguna setiap hari.',
          website: 'https://www.gojek.com',
          contactEmail: 'recruitment@gojek.com',
        },
      },
    },
    include: { companyProfile: true },
  });

  const tokopediaUser = await prisma.user.create({
    data: {
      email: 'hr@tokopedia.com',
      passwordHash,
      role: 'INDUSTRI',
      companyProfile: {
        create: {
          companyName: 'Tokopedia',
          logoUrl: 'https://ui-avatars.com/api/?name=Tokopedia&background=42B549&color=fff&size=200&bold=true&font-size=0.33',
          description: 'Tokopedia adalah marketplace terbesar di Indonesia yang menghubungkan jutaan penjual dan pembeli. Tim teknologi kami bekerja dengan skala besar menggunakan microservices, machine learning, dan big data untuk memberikan pengalaman belanja terbaik.',
          website: 'https://www.tokopedia.com',
          contactEmail: 'hr@tokopedia.com',
        },
      },
    },
    include: { companyProfile: true },
  });

  const bukalapakUser = await prisma.user.create({
    data: {
      email: 'talent@bukalapak.com',
      passwordHash,
      role: 'INDUSTRI',
      companyProfile: {
        create: {
          companyName: 'Bukalapak',
          logoUrl: 'https://ui-avatars.com/api/?name=Bukalapak&background=E31E52&color=fff&size=200&bold=true&font-size=0.33',
          description: 'Bukalapak adalah perusahaan teknologi Indonesia yang berfokus pada e-commerce dan layanan keuangan digital. Kami memberdayakan UMKM melalui teknologi dan terus berinovasi dalam bidang fintech, AI, dan cloud computing.',
          website: 'https://www.bukalapak.com',
          contactEmail: 'talent@bukalapak.com',
        },
      },
    },
    include: { companyProfile: true },
  });

  const travelokaUser = await prisma.user.create({
    data: {
      email: 'careers@traveloka.com',
      passwordHash,
      role: 'INDUSTRI',
      companyProfile: {
        create: {
          companyName: 'Traveloka',
          logoUrl: 'https://ui-avatars.com/api/?name=Traveloka&background=0194F3&color=fff&size=200&bold=true&font-size=0.33',
          description: 'Traveloka adalah platform teknologi travel dan lifestyle terbesar di Asia Tenggara. Menyediakan layanan pemesanan tiket pesawat, hotel, aktivitas wisata, dan layanan finansial. Tim teknologi kami membangun platform yang melayani jutaan pengguna di 6 negara.',
          website: 'https://www.traveloka.com',
          contactEmail: 'careers@traveloka.com',
        },
      },
    },
    include: { companyProfile: true },
  });

  const shopeeUser = await prisma.user.create({
    data: {
      email: 'recruit@shopee.co.id',
      passwordHash,
      role: 'INDUSTRI',
      companyProfile: {
        create: {
          companyName: 'Shopee Indonesia',
          logoUrl: 'https://ui-avatars.com/api/?name=Shopee&background=EE4D2D&color=fff&size=200&bold=true&font-size=0.33',
          description: 'Shopee adalah platform e-commerce terdepan di Asia Tenggara dan Taiwan. Shopee Indonesia terus berinovasi dalam teknologi marketplace, logistik, pembayaran digital, dan pengalaman belanja yang personal untuk ratusan juta pengguna.',
          website: 'https://shopee.co.id',
          contactEmail: 'recruit@shopee.co.id',
        },
      },
    },
    include: { companyProfile: true },
  });

  console.log('5 perusahaan dibuat: Gojek, Tokopedia, Bukalapak, Traveloka, Shopee');

  // ===== STUDENTS =====
  const budiUser = await prisma.user.create({
    data: {
      email: 'budi@mail.com',
      passwordHash,
      role: 'MAHASISWA',
      studentProfile: {
        create: {
          name: 'Budi Santoso',
          university: 'Universitas Indonesia',
          studyProgram: 'Ilmu Komputer',
          semester: 6,
          bio: 'Mahasiswa Ilmu Komputer UI yang passionate di bidang Data Science dan Machine Learning. Berpengalaman mengerjakan proyek prediksi dan analisis data menggunakan Python, TensorFlow, dan scikit-learn. Aktif mengikuti kompetisi data science.',
          skills: ['Python', 'TensorFlow', 'Pandas', 'SQL', 'Machine Learning', 'Data Visualization', 'Jupyter Notebook', 'scikit-learn'],
          interests: ['Data Science / Machine Learning', 'Software Engineering', 'Cloud / DevOps'],
          avatarUrl: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=2563EB&color=fff&size=200&bold=true',
          onboardingComplete: true,
        },
      },
    },
    include: { studentProfile: true },
  });

  const sitiUser = await prisma.user.create({
    data: {
      email: 'siti@mail.com',
      passwordHash,
      role: 'MAHASISWA',
      studentProfile: {
        create: {
          name: 'Siti Nurhaliza',
          university: 'Institut Teknologi Bandung',
          studyProgram: 'Teknik Informatika',
          semester: 5,
          bio: 'Mahasiswi Teknik Informatika ITB yang fokus di bidang Cybersecurity dan CTF. Anggota aktif tim CTF kampus dan telah memenangkan beberapa kompetisi keamanan siber tingkat nasional. Tertarik pada penetration testing dan digital forensics.',
          skills: ['Cybersecurity', 'CTF', 'Penetration Testing', 'Linux', 'Networking', 'Python', 'Wireshark', 'Burp Suite'],
          interests: ['Cybersecurity / CTF / Pentesting', 'Software Engineering', 'Cloud / DevOps'],
          avatarUrl: 'https://ui-avatars.com/api/?name=Siti+N&background=7C3AED&color=fff&size=200&bold=true',
          onboardingComplete: true,
        },
      },
    },
    include: { studentProfile: true },
  });

  const rakaUser = await prisma.user.create({
    data: {
      email: 'raka@mail.com',
      passwordHash,
      role: 'MAHASISWA',
      studentProfile: {
        create: {
          name: 'Raka Pratama',
          university: 'Universitas Gadjah Mada',
          studyProgram: 'Teknik Informatika',
          semester: 7,
          bio: 'Mahasiswa tingkat akhir UGM dengan passion di Mobile Development dan UI/UX Design. Berpengalaman membangun aplikasi mobile menggunakan React Native dan Flutter. Pernah magang di startup lokal sebagai mobile developer.',
          skills: ['React Native', 'Flutter', 'Dart', 'JavaScript', 'Figma', 'UI/UX Design', 'Firebase', 'TypeScript'],
          interests: ['Mobile Development', 'UI/UX Design', 'Software Engineering'],
          avatarUrl: 'https://ui-avatars.com/api/?name=Raka+P&background=0EA5E9&color=fff&size=200&bold=true',
          onboardingComplete: true,
        },
      },
    },
    include: { studentProfile: true },
  });

  const dewiUser = await prisma.user.create({
    data: {
      email: 'dewi@mail.com',
      passwordHash,
      role: 'MAHASISWA',
      studentProfile: {
        create: {
          name: 'Dewi Lestari',
          university: 'Universitas Brawijaya',
          studyProgram: 'Sistem Informasi',
          semester: 4,
          bio: 'Mahasiswi Sistem Informasi UB yang tertarik dengan Cloud Computing dan DevOps. Saat ini belajar tentang containerization, CI/CD, dan cloud architecture. Memiliki sertifikasi AWS Cloud Practitioner.',
          skills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'Terraform', 'Git', 'Node.js'],
          interests: ['Cloud / DevOps', 'Software Engineering', 'IoT / Embedded Systems'],
          avatarUrl: 'https://ui-avatars.com/api/?name=Dewi+L&background=10B981&color=fff&size=200&bold=true',
          onboardingComplete: true,
        },
      },
    },
    include: { studentProfile: true },
  });

  const fajarUser = await prisma.user.create({
    data: {
      email: 'fajar@mail.com',
      passwordHash,
      role: 'MAHASISWA',
      studentProfile: {
        create: {
          name: 'Fajar Hidayat',
          university: 'Institut Teknologi Sepuluh Nopember',
          studyProgram: 'Teknik Informatika',
          semester: 6,
          bio: 'Mahasiswa Teknik Informatika ITS yang passionate di bidang Software Engineering dan Blockchain. Aktif berkontribusi di proyek open source dan membangun smart contract di platform Ethereum. Memiliki pengalaman fullstack development.',
          skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Solidity', 'Go', 'PostgreSQL', 'Redis'],
          interests: ['Software Engineering', 'Blockchain', 'Cloud / DevOps'],
          avatarUrl: 'https://ui-avatars.com/api/?name=Fajar+H&background=F59E0B&color=fff&size=200&bold=true',
          onboardingComplete: true,
        },
      },
    },
    include: { studentProfile: true },
  });

  console.log('5 mahasiswa dibuat: Budi, Siti, Raka, Dewi, Fajar');

  // ===== OPPORTUNITIES (10 total: 3 magang, 3 kompetisi, 2 kolaborasi, 2 pelatihan) =====
  const now = new Date();
  const addDays = (days) => new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  const opportunities = await Promise.all([
    // --- 3 MAGANG (INTERNSHIP) ---
    prisma.opportunity.create({
      data: {
        companyId: gojekUser.companyProfile.id,
        title: 'Frontend Developer Intern',
        category: 'INTERNSHIP',
        description: 'Bergabunglah dengan tim frontend Gojek untuk membangun antarmuka pengguna yang digunakan jutaan orang setiap hari. Kamu akan bekerja dengan React.js, Next.js, dan design system internal kami. Kesempatan untuk belajar langsung dari senior engineer berpengalaman di lingkungan agile yang dinamis.',
        requirements: [
          'Mahasiswa aktif semester 5-8 jurusan Informatika/Ilmu Komputer',
          'Menguasai HTML, CSS, dan JavaScript dengan baik',
          'Pengalaman menggunakan React.js atau framework frontend serupa',
          'Memahami konsep responsive design dan web accessibility',
          'Mampu bekerja dalam tim dan berkomunikasi dengan baik',
        ],
        locationType: 'HYBRID',
        city: 'Jakarta',
        duration: '6 bulan',
        deadline: addDays(21),
        skillsRequired: ['React.js', 'JavaScript', 'HTML/CSS', 'TypeScript', 'Git'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: tokopediaUser.companyProfile.id,
        title: 'Data Analyst Intern',
        category: 'INTERNSHIP',
        description: 'Tim Data Analytics Tokopedia mencari intern yang passionate dengan data. Kamu akan membantu menganalisis perilaku pengguna, membuat dashboard, dan memberikan insight berbasis data untuk pengambilan keputusan bisnis. Akan bekerja dengan dataset berskala besar menggunakan SQL, Python, dan tools visualisasi data.',
        requirements: [
          'Mahasiswa aktif semester 5-8 jurusan Informatika/Statistika/Matematika',
          'Menguasai SQL dan Python untuk analisis data',
          'Pengalaman menggunakan tools visualisasi data (Tableau, Metabase, atau sejenisnya)',
          'Memahami konsep dasar statistika dan probabilitas',
          'Memiliki kemampuan analytical thinking yang kuat',
        ],
        locationType: 'ONSITE',
        city: 'Jakarta',
        duration: '3 bulan',
        deadline: addDays(5),
        skillsRequired: ['Python', 'SQL', 'Data Visualization', 'Pandas', 'Statistics'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: bukalapakUser.companyProfile.id,
        title: 'Backend Engineer Intern',
        category: 'INTERNSHIP',
        description: 'Bukalapak membuka kesempatan magang sebagai Backend Engineer. Kamu akan terlibat dalam pengembangan microservices yang menangani jutaan transaksi harian. Belajar tentang high-performance computing, distributed systems, dan best practices software engineering dari tim senior kami.',
        requirements: [
          'Mahasiswa aktif semester 5-8 jurusan Informatika/Ilmu Komputer',
          'Menguasai minimal satu bahasa pemrograman backend (Go, Java, Node.js)',
          'Memahami konsep RESTful API dan database relasional',
          'Familiar dengan version control menggunakan Git',
          'Memiliki motivasi belajar tinggi dan mampu bekerja mandiri',
        ],
        locationType: 'REMOTE',
        city: null,
        duration: '4 bulan',
        deadline: addDays(2),
        skillsRequired: ['Go', 'Node.js', 'PostgreSQL', 'REST API', 'Docker'],
        status: 'ACTIVE',
      },
    }),

    // --- 3 KOMPETISI (COMPETITION) ---
    prisma.opportunity.create({
      data: {
        companyId: gojekUser.companyProfile.id,
        title: 'Hackathon Nasional 2025 — Gojek Innovation Challenge',
        category: 'COMPETITION',
        description: 'Gojek Innovation Challenge adalah hackathon nasional yang mengundang mahasiswa dari seluruh Indonesia untuk menciptakan solusi teknologi inovatif. Tema tahun ini: "Technology for Inclusive Economy". Peserta akan berkompetisi dalam tim (3-5 orang) selama 48 jam untuk membangun prototype yang dapat membantu UMKM Indonesia. Total hadiah Rp 150.000.000 untuk 3 tim terbaik.',
        requirements: [
          'Tim terdiri dari 3-5 mahasiswa aktif',
          'Minimal 1 anggota memiliki kemampuan programming',
          'Terbuka untuk semua jurusan',
          'Memiliki ide inovatif yang sesuai tema',
          'Bersedia mengikuti seluruh rangkaian acara selama 48 jam',
        ],
        locationType: 'ONSITE',
        city: 'Jakarta',
        duration: '48 jam (2 hari)',
        deadline: addDays(14),
        skillsRequired: ['Problem Solving', 'Programming', 'Presentation', 'Teamwork'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: tokopediaUser.companyProfile.id,
        title: 'CTF Competition — Tokopedia Security Challenge 2025',
        category: 'COMPETITION',
        description: 'Tokopedia Security Challenge adalah kompetisi Capture The Flag (CTF) yang menguji kemampuan keamanan siber peserta. Kompetisi mencakup berbagai kategori: web exploitation, reverse engineering, cryptography, forensics, dan binary exploitation. Peserta individu atau tim (maks 3 orang). Pemenang berkesempatan mendapatkan fast-track interview untuk posisi security engineer.',
        requirements: [
          'Mahasiswa aktif jurusan Informatika/Ilmu Komputer/Teknik Elektro',
          'Memiliki pengetahuan dasar keamanan siber',
          'Familiar dengan tools CTF (Burp Suite, Wireshark, IDA, dsb.)',
          'Individu atau tim maksimal 3 orang',
          'Pernah mengikuti CTF sebelumnya (diutamakan)',
        ],
        locationType: 'REMOTE',
        city: null,
        duration: '24 jam',
        deadline: addDays(6),
        skillsRequired: ['Cybersecurity', 'CTF', 'Penetration Testing', 'Networking', 'Linux'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: bukalapakUser.companyProfile.id,
        title: 'UI/UX Design Competition — Reimagine E-Commerce',
        category: 'COMPETITION',
        description: 'Bukalapak mengadakan kompetisi desain UI/UX dengan tema "Reimagine E-Commerce Experience". Peserta ditantang untuk merancang ulang pengalaman belanja online yang lebih intuitif, inklusif, dan menyenangkan. Submission berupa prototype interaktif menggunakan Figma. Pemenang mendapat hadiah uang tunai dan kesempatan magang di tim design Bukalapak.',
        requirements: [
          'Mahasiswa aktif dari semua jurusan',
          'Memiliki kemampuan UI/UX Design yang baik',
          'Menguasai tools desain (Figma, Adobe XD, atau Sketch)',
          'Mampu membuat prototype interaktif',
          'Submission dalam bentuk Figma prototype dan deck presentasi',
        ],
        locationType: 'REMOTE',
        city: null,
        duration: '2 minggu',
        deadline: addDays(1),
        skillsRequired: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
        status: 'ACTIVE',
      },
    }),

    // --- 2 KOLABORASI (COLLABORATION) ---
    prisma.opportunity.create({
      data: {
        companyId: gojekUser.companyProfile.id,
        title: 'Open Source Contribution — GoPay SDK Development',
        category: 'COLLABORATION',
        description: 'Gojek mengundang mahasiswa developer untuk berkontribusi dalam pengembangan GoPay SDK open source. Proyek ini bertujuan membuat library pembayaran yang mudah diintegrasikan oleh merchant kecil dan menengah. Contributor aktif akan mendapat mentorship langsung dari senior engineer Gojek dan sertifikat kontribusi resmi.',
        requirements: [
          'Mahasiswa aktif dengan pengalaman pemrograman minimal 1 tahun',
          'Familiar dengan Git dan workflow open source (fork, PR, code review)',
          'Menguasai minimal satu bahasa: JavaScript, Python, atau Go',
          'Memahami konsep API dan SDK development',
          'Komitmen kontribusi minimal 10 jam per minggu selama 2 bulan',
        ],
        locationType: 'REMOTE',
        city: null,
        duration: '2 bulan',
        deadline: addDays(18),
        skillsRequired: ['JavaScript', 'Git', 'API Development', 'Open Source', 'Node.js'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: tokopediaUser.companyProfile.id,
        title: 'Research Collaboration — AI for Product Recommendation',
        category: 'COLLABORATION',
        description: 'Tokopedia membuka program kolaborasi riset dengan mahasiswa S1/S2 di bidang Machine Learning. Fokus penelitian: pengembangan model rekomendasi produk menggunakan teknik deep learning terbaru. Peserta akan mendapat akses ke dataset anonim Tokopedia dan bimbingan dari tim AI Research. Hasil riset berpotensi dipublikasikan di konferensi internasional.',
        requirements: [
          'Mahasiswa S1 semester 6+ atau S2 jurusan Informatika/Data Science',
          'Memiliki pemahaman kuat tentang Machine Learning dan Deep Learning',
          'Pengalaman menggunakan PyTorch atau TensorFlow',
          'Memiliki pengalaman riset atau publikasi (diutamakan)',
          'Komitmen 3 bulan dengan presentasi progress bulanan',
        ],
        locationType: 'HYBRID',
        city: 'Jakarta',
        duration: '3 bulan',
        deadline: addDays(4),
        skillsRequired: ['Machine Learning', 'Python', 'TensorFlow', 'Deep Learning', 'Data Science'],
        status: 'ACTIVE',
      },
    }),

    // --- 2 PELATIHAN (TRAINING) ---
    prisma.opportunity.create({
      data: {
        companyId: bukalapakUser.companyProfile.id,
        title: 'Google Cloud Study Jam — Cybersecurity Track',
        category: 'TRAINING',
        description: 'Bukalapak bekerja sama dengan Google Cloud menyelenggarakan Study Jam khusus track Cybersecurity. Program pelatihan 4 minggu ini mencakup hands-on labs tentang cloud security, identity management, network security, dan incident response di Google Cloud Platform. Peserta yang menyelesaikan semua modul mendapat sertifikasi Google Cloud.',
        requirements: [
          'Mahasiswa aktif jurusan Informatika/Ilmu Komputer/Sistem Informasi',
          'Memiliki pengetahuan dasar cloud computing',
          'Familiar dengan command line Linux',
          'Memiliki akun Google Cloud (gratis)',
          'Komitmen mengikuti seluruh sesi (4 minggu, 2x pertemuan/minggu)',
        ],
        locationType: 'REMOTE',
        city: null,
        duration: '4 minggu',
        deadline: addDays(10),
        skillsRequired: ['Cloud Computing', 'Cybersecurity', 'Linux', 'Networking'],
        registrationUrl: 'https://cloud.google.com/edu',
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: gojekUser.companyProfile.id,
        title: 'Gojek Engineering Bootcamp — Mobile Development with Flutter',
        category: 'TRAINING',
        description: 'Gojek Engineering Bootcamp adalah program pelatihan intensif selama 6 minggu yang dirancang untuk mahasiswa yang ingin menguasai mobile development menggunakan Flutter. Materi mencakup Dart fundamentals, Flutter widgets, state management, API integration, testing, dan deployment. Peserta akan membangun aplikasi mobile nyata sebagai proyek akhir.',
        requirements: [
          'Mahasiswa aktif semester 3+ jurusan Informatika atau terkait',
          'Memiliki laptop dengan spesifikasi minimal untuk development',
          'Menguasai dasar pemrograman (OOP, data structure)',
          'Tidak wajib pengalaman mobile development sebelumnya',
          'Komitmen penuh selama 6 minggu (15 jam/minggu)',
        ],
        locationType: 'HYBRID',
        city: 'Bandung',
        duration: '6 minggu',
        deadline: addDays(3),
        skillsRequired: ['Mobile Development', 'Dart', 'Flutter', 'Programming'],
        registrationUrl: 'https://gojek.com/bootcamp',
        status: 'ACTIVE',
      },
    }),
  ]);

  // ===== MORE OPPORTUNITIES (Traveloka & Shopee) =====
  const moreOpportunities = await Promise.all([
    prisma.opportunity.create({
      data: {
        companyId: travelokaUser.companyProfile.id,
        title: 'Software Engineer Intern — Search & Discovery',
        category: 'INTERNSHIP',
        description: 'Tim Search & Discovery Traveloka mencari intern untuk membantu mengoptimalkan algoritma pencarian hotel dan penerbangan. Kamu akan bekerja dengan Elasticsearch, Kotlin, dan microservices architecture. Kesempatan untuk belajar bagaimana search engine bekerja di skala jutaan query per hari.',
        requirements: [
          'Mahasiswa aktif semester 5-8 jurusan Informatika/Ilmu Komputer',
          'Menguasai minimal satu bahasa pemrograman (Java, Kotlin, atau Python)',
          'Memahami konsep data structure dan algoritma dengan baik',
          'Pengalaman dengan database SQL dan NoSQL',
          'Memiliki pemahaman dasar tentang information retrieval',
        ],
        locationType: 'HYBRID',
        city: 'Jakarta',
        duration: '6 bulan',
        deadline: addDays(25),
        skillsRequired: ['Java', 'Kotlin', 'Elasticsearch', 'Microservices', 'SQL'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: shopeeUser.companyProfile.id,
        title: 'Product Design Intern',
        category: 'INTERNSHIP',
        description: 'Shopee Design Team membuka kesempatan magang untuk mahasiswa yang passionate dengan product design. Kamu akan terlibat dalam proses design end-to-end mulai dari user research, wireframing, prototyping, hingga design handoff. Fokus pada fitur checkout dan pembayaran.',
        requirements: [
          'Mahasiswa aktif semester 4+ jurusan DKV/Informatika/terkait',
          'Menguasai Figma dengan baik',
          'Memiliki portfolio desain yang bisa ditunjukkan',
          'Memahami prinsip UI/UX dan design thinking',
          'Kemampuan komunikasi visual yang baik',
        ],
        locationType: 'ONSITE',
        city: 'Jakarta',
        duration: '3 bulan',
        deadline: addDays(12),
        skillsRequired: ['Figma', 'UI/UX Design', 'User Research', 'Prototyping', 'Design Thinking'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: travelokaUser.companyProfile.id,
        title: 'Data Engineering Intern',
        category: 'INTERNSHIP',
        description: 'Bergabung dengan tim Data Platform Traveloka untuk membangun dan mengoptimalkan data pipeline yang memproses terabytes data harian. Kamu akan belajar tentang Apache Spark, Airflow, dan cloud data warehouse. Pengalaman langsung dengan real-world big data challenges.',
        requirements: [
          'Mahasiswa aktif semester 5+ jurusan Informatika/Data Science/Statistika',
          'Menguasai Python dan SQL',
          'Familiar dengan konsep ETL dan data pipeline',
          'Pengalaman dengan tools big data (Spark, Hadoop) menjadi nilai tambah',
          'Mampu bekerja dengan dataset besar dan complex queries',
        ],
        locationType: 'HYBRID',
        city: 'Jakarta',
        duration: '4 bulan',
        deadline: addDays(15),
        skillsRequired: ['Python', 'SQL', 'Apache Spark', 'Data Engineering', 'ETL'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: shopeeUser.companyProfile.id,
        title: 'Shopee Code League 2025',
        category: 'COMPETITION',
        description: 'Shopee Code League adalah kompetisi programming regional terbesar di Asia Tenggara. Peserta akan menghadapi serangkaian challenge dalam bidang algorithm, data science, dan system design. Total hadiah Rp 200.000.000. Tim pemenang mendapat kesempatan interview langsung ke Shopee.',
        requirements: [
          'Tim terdiri dari 2-3 mahasiswa aktif',
          'Memiliki kemampuan programming yang kuat',
          'Familiar dengan competitive programming',
          'Terbuka untuk semua jurusan',
          'Memiliki akun HackerRank',
        ],
        locationType: 'REMOTE',
        city: null,
        duration: '3 minggu (3 round)',
        deadline: addDays(20),
        skillsRequired: ['Algorithm', 'Data Structure', 'Problem Solving', 'Python', 'C++'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: travelokaUser.companyProfile.id,
        title: 'Traveloka AI Hackathon — Travel Innovation',
        category: 'COMPETITION',
        description: 'Traveloka AI Hackathon mengundang mahasiswa untuk membangun solusi AI/ML inovatif di industri travel. Tema: "AI-Powered Personalized Travel Experience". Peserta akan mendapat akses ke dataset travel anonymized dan mentoring dari tim AI Traveloka. Hadiah utama: Rp 100.000.000 + kesempatan magang.',
        requirements: [
          'Tim terdiri dari 3-4 mahasiswa aktif',
          'Minimal 1 anggota memiliki pengalaman ML/AI',
          'Mampu membangun prototype dalam 72 jam',
          'Presentasi solusi di depan panel juri',
          'Terbuka untuk semua universitas di Indonesia',
        ],
        locationType: 'HYBRID',
        city: 'Jakarta',
        duration: '72 jam',
        deadline: addDays(30),
        skillsRequired: ['Machine Learning', 'Python', 'Data Science', 'TensorFlow', 'Presentation'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: shopeeUser.companyProfile.id,
        title: 'Open Source Contribution — ShopeeFood SDK',
        category: 'COLLABORATION',
        description: 'Shopee mengundang developer mahasiswa untuk berkontribusi dalam pengembangan ShopeeFood SDK open source untuk integrasi merchant. Proyek mencakup API client library, webhook handler, dan documentation. Contributor terbaik mendapat sertifikat dan swag.',
        requirements: [
          'Mahasiswa aktif dengan pengalaman pemrograman',
          'Menguasai TypeScript atau JavaScript',
          'Familiar dengan Git dan pull request workflow',
          'Memahami konsep REST API dan webhook',
          'Komitmen minimal 8 jam per minggu selama 6 minggu',
        ],
        locationType: 'REMOTE',
        city: null,
        duration: '6 minggu',
        deadline: addDays(22),
        skillsRequired: ['TypeScript', 'JavaScript', 'Git', 'REST API', 'Node.js'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: travelokaUser.companyProfile.id,
        title: 'Research Collaboration — NLP for Travel Reviews',
        category: 'COLLABORATION',
        description: 'Traveloka membuka program kolaborasi riset di bidang NLP untuk analisis review hotel dan destinasi wisata. Peserta akan mengembangkan model sentiment analysis multi-bahasa (Indonesia, English, Thai) untuk meningkatkan kualitas rekomendasi. Akses ke dataset jutaan review.',
        requirements: [
          'Mahasiswa S1 semester 6+ atau S2 jurusan Informatika/Linguistik Komputasional',
          'Pengalaman dengan NLP dan text processing',
          'Menguasai Python dan library NLP (spaCy, Hugging Face, NLTK)',
          'Memiliki pemahaman tentang transformer models',
          'Komitmen 4 bulan dengan weekly check-in',
        ],
        locationType: 'REMOTE',
        city: null,
        duration: '4 bulan',
        deadline: addDays(28),
        skillsRequired: ['NLP', 'Python', 'Machine Learning', 'Hugging Face', 'Deep Learning'],
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: shopeeUser.companyProfile.id,
        title: 'Shopee Academy — Full Stack Web Development Bootcamp',
        category: 'TRAINING',
        description: 'Shopee Academy menyelenggarakan bootcamp intensif 8 minggu untuk mahasiswa yang ingin menguasai full-stack web development. Materi mencakup React.js, Node.js, database design, deployment, dan best practices industri. Instruktur langsung dari engineer Shopee.',
        requirements: [
          'Mahasiswa aktif semester 3+ jurusan Informatika atau terkait',
          'Menguasai dasar HTML, CSS, dan JavaScript',
          'Memiliki laptop yang memadai untuk development',
          'Komitmen penuh 8 minggu (20 jam/minggu)',
          'Lolos tahap seleksi online coding test',
        ],
        locationType: 'HYBRID',
        city: 'Jakarta',
        duration: '8 minggu',
        deadline: addDays(17),
        skillsRequired: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
        registrationUrl: 'https://shopee.co.id/academy',
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: travelokaUser.companyProfile.id,
        title: 'Traveloka Tech Talk & Workshop — System Design at Scale',
        category: 'TRAINING',
        description: 'Workshop 2 hari tentang system design dari engineer senior Traveloka. Topik: distributed systems, caching strategies, database sharding, message queues, dan monitoring. Peserta akan hands-on merancang arsitektur sistem yang menangani jutaan concurrent users.',
        requirements: [
          'Mahasiswa aktif semester 5+ jurusan Informatika/Ilmu Komputer',
          'Memahami konsep dasar networking dan database',
          'Familiar dengan minimal 1 bahasa pemrograman backend',
          'Tertarik dengan software architecture dan system design',
          'Membawa laptop untuk hands-on session',
        ],
        locationType: 'ONSITE',
        city: 'Yogyakarta',
        duration: '2 hari',
        deadline: addDays(8),
        skillsRequired: ['System Design', 'Backend Development', 'Database', 'Distributed Systems'],
        registrationUrl: 'https://traveloka.com/techtalk',
        status: 'ACTIVE',
      },
    }),
    prisma.opportunity.create({
      data: {
        companyId: shopeeUser.companyProfile.id,
        title: 'QA Engineer Intern',
        category: 'INTERNSHIP',
        description: 'Tim Quality Assurance Shopee mencari intern yang teliti dan detail-oriented. Kamu akan belajar automated testing, performance testing, dan test strategy. Bekerja dengan Selenium, Cypress, dan tools CI/CD untuk memastikan kualitas produk Shopee tetap tinggi.',
        requirements: [
          'Mahasiswa aktif semester 4+ jurusan Informatika/Sistem Informasi',
          'Memahami konsep software testing (unit, integration, e2e)',
          'Familiar dengan minimal 1 bahasa pemrograman',
          'Teliti, detail-oriented, dan memiliki analytical thinking',
          'Pengalaman dengan automation tools menjadi nilai tambah',
        ],
        locationType: 'ONSITE',
        city: 'Jakarta',
        duration: '3 bulan',
        deadline: addDays(9),
        skillsRequired: ['Software Testing', 'Selenium', 'JavaScript', 'CI/CD', 'Automation'],
        status: 'ACTIVE',
      },
    }),
  ]);

  const allOpportunities = [...opportunities, ...moreOpportunities];
  console.log(`${allOpportunities.length} peluang dibuat`);

  // ===== PORTFOLIO ENTRIES (2+ per student) =====
  await prisma.portfolioEntry.createMany({
    data: [
      // Budi (Data Science)
      {
        studentId: budiUser.studentProfile.id,
        type: 'PROJECT',
        title: 'Prediksi Harga Rumah Jakarta dengan Random Forest',
        description: 'Membangun model machine learning untuk memprediksi harga rumah di Jakarta berdasarkan fitur lokasi, luas tanah, jumlah kamar, dan fasilitas sekitar. Menggunakan dataset dari scraping properti online. Akurasi model mencapai 87%.',
        date: new Date('2025-03-15'),
        organization: 'Universitas Indonesia',
        skills: ['Python', 'scikit-learn', 'Pandas', 'Data Visualization'],
      },
      {
        studentId: budiUser.studentProfile.id,
        type: 'COMPETITION',
        title: 'Juara 2 Data Science Competition COMPFEST',
        description: 'Mengikuti kompetisi data science tingkat nasional COMPFEST XIV. Menyelesaikan challenge klasifikasi sentimen review produk e-commerce menggunakan NLP dan ensemble methods. Meraih juara 2 dari 120 tim peserta.',
        date: new Date('2024-11-20'),
        organization: 'COMPFEST UI',
        skills: ['Machine Learning', 'NLP', 'Python', 'Data Science'],
      },
      {
        studentId: budiUser.studentProfile.id,
        type: 'CERTIFICATION',
        title: 'Google Data Analytics Professional Certificate',
        description: 'Menyelesaikan program sertifikasi Google Data Analytics yang mencakup spreadsheets, SQL, R, Tableau, dan metodologi analisis data.',
        date: new Date('2025-01-10'),
        organization: 'Google / Coursera',
        skills: ['SQL', 'Data Visualization', 'R', 'Tableau'],
      },
      // Siti (Cybersecurity)
      {
        studentId: sitiUser.studentProfile.id,
        type: 'COMPETITION',
        title: 'Juara 1 CTF Gemastik XVI — Kategori Keamanan Siber',
        description: 'Memenangkan kompetisi CTF di Gemastik XVI kategori Keamanan Siber. Menyelesaikan challenges web exploitation, reverse engineering, dan cryptography. Tim kami berhasil menyelesaikan 18 dari 20 challenge.',
        date: new Date('2024-10-15'),
        organization: 'Kemendikbudristek',
        skills: ['CTF', 'Cybersecurity', 'Penetration Testing', 'Reverse Engineering'],
      },
      {
        studentId: sitiUser.studentProfile.id,
        type: 'TRAINING',
        title: 'Offensive Security Certified Professional (OSCP) Preparation',
        description: 'Mengikuti program persiapan sertifikasi OSCP selama 3 bulan. Materi mencakup penetration testing methodology, privilege escalation, buffer overflow, dan active directory attacks.',
        date: new Date('2025-02-01'),
        organization: 'Cyber Ranges Indonesia',
        skills: ['Penetration Testing', 'Linux', 'Networking', 'Python'],
      },
      // Raka (Mobile Dev)
      {
        studentId: rakaUser.studentProfile.id,
        type: 'INTERNSHIP',
        title: 'Mobile Developer Intern di Startup Fintech',
        description: 'Magang sebagai Mobile Developer di startup fintech selama 3 bulan. Mengembangkan fitur pembayaran QR code dan integrasi API payment gateway menggunakan React Native. Berhasil meningkatkan kecepatan loading halaman transaksi sebesar 40%.',
        date: new Date('2024-07-01'),
        organization: 'PT Fintech Nusantara',
        skills: ['React Native', 'JavaScript', 'Firebase', 'REST API'],
      },
      {
        studentId: rakaUser.studentProfile.id,
        type: 'PROJECT',
        title: 'Aplikasi Manajemen Keuangan Pribadi — "DompetKu"',
        description: 'Membangun aplikasi mobile cross-platform untuk manajemen keuangan pribadi menggunakan Flutter. Fitur utama: pencatatan pemasukan/pengeluaran, kategorisasi otomatis, visualisasi spending pattern, dan pengingat tagihan. Sudah dipublikasikan di Google Play Store dengan 500+ download.',
        date: new Date('2025-01-20'),
        organization: 'Proyek Mandiri',
        skills: ['Flutter', 'Dart', 'Firebase', 'UI/UX Design'],
      },
      // Dewi (Cloud/DevOps)
      {
        studentId: dewiUser.studentProfile.id,
        type: 'CERTIFICATION',
        title: 'AWS Certified Cloud Practitioner',
        description: 'Mendapatkan sertifikasi AWS Cloud Practitioner yang mencakup konsep dasar cloud computing, layanan AWS, pricing, security, dan arsitektur cloud. Skor ujian: 890/1000.',
        date: new Date('2025-02-15'),
        organization: 'Amazon Web Services',
        skills: ['AWS', 'Cloud Computing', 'Networking', 'Security'],
      },
      {
        studentId: dewiUser.studentProfile.id,
        type: 'PROJECT',
        title: 'CI/CD Pipeline untuk Aplikasi Microservices',
        description: 'Membangun pipeline CI/CD lengkap menggunakan GitHub Actions, Docker, dan Kubernetes. Pipeline mencakup automated testing, container building, security scanning, dan deployment ke cluster Kubernetes di AWS EKS.',
        date: new Date('2025-04-01'),
        organization: 'Universitas Brawijaya',
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'AWS'],
      },
      // Fajar (Software Engineering)
      {
        studentId: fajarUser.studentProfile.id,
        type: 'PROJECT',
        title: 'Decentralized Voting System — Smart Contract',
        description: 'Membangun sistem voting terdesentralisasi menggunakan smart contract Solidity di Ethereum. Fitur: transparansi suara, anonimitas pemilih, dan immutable record. Menggunakan Hardhat untuk development dan testing, frontend dengan React + ethers.js.',
        date: new Date('2025-03-10'),
        organization: 'ITS Blockchain Club',
        skills: ['Solidity', 'React', 'Ethereum', 'JavaScript', 'Hardhat'],
      },
      {
        studentId: fajarUser.studentProfile.id,
        type: 'INTERNSHIP',
        title: 'Fullstack Developer Intern di Startup SaaS',
        description: 'Magang sebagai fullstack developer selama 4 bulan di startup SaaS. Mengembangkan fitur dashboard analytics, user management, dan API integration. Stack: React, Node.js, PostgreSQL, Redis. Berhasil mengurangi response time API rata-rata dari 800ms menjadi 200ms.',
        date: new Date('2024-08-01'),
        organization: 'PT Solusi Digital Indonesia',
        skills: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'TypeScript'],
      },
    ],
  });

  console.log('Portfolio entries dibuat untuk semua mahasiswa');

  // ===== BADGES (2+ per student) =====
  await prisma.badge.createMany({
    data: [
      // Budi
      { studentId: budiUser.studentProfile.id, badgeType: 'PELAMAR_PERTAMA' },
      { studentId: budiUser.studentProfile.id, badgeType: 'KOMPETITOR' },
      { studentId: budiUser.studentProfile.id, badgeType: 'AKTIF_MINGGU_INI' },
      // Siti
      { studentId: sitiUser.studentProfile.id, badgeType: 'PELAMAR_PERTAMA' },
      { studentId: sitiUser.studentProfile.id, badgeType: 'KOMPETITOR' },
      // Raka
      { studentId: rakaUser.studentProfile.id, badgeType: 'PELAMAR_PERTAMA' },
      { studentId: rakaUser.studentProfile.id, badgeType: 'PORTOFOLIO_LENGKAP' },
      { studentId: rakaUser.studentProfile.id, badgeType: 'PENCARI_KERJA' },
      // Dewi
      { studentId: dewiUser.studentProfile.id, badgeType: 'PELAMAR_PERTAMA' },
      { studentId: dewiUser.studentProfile.id, badgeType: 'KOLEKTOR' },
      // Fajar
      { studentId: fajarUser.studentProfile.id, badgeType: 'PELAMAR_PERTAMA' },
      { studentId: fajarUser.studentProfile.id, badgeType: 'KOLABORATOR' },
    ],
  });

  console.log('Badges dibuat untuk semua mahasiswa');

  // ===== APPLICATIONS (3+ with mixed statuses) =====
  await prisma.application.createMany({
    data: [
      // Budi applied to Data Analyst (VIEWED)
      {
        studentId: budiUser.studentProfile.id,
        opportunityId: opportunities[1].id,
        coverLetter: 'Saya sangat tertarik dengan posisi Data Analyst Intern di Tokopedia. Sebagai mahasiswa Ilmu Komputer UI yang fokus di bidang Data Science, saya memiliki pengalaman kuat dalam analisis data menggunakan Python dan SQL. Saya yakin kemampuan saya dalam data visualization dan statistical analysis akan menjadi kontribusi berharga bagi tim Data Analytics Tokopedia.',
        portfolioUrl: 'https://github.com/budi-santoso',
        status: 'VIEWED',
      },
      // Siti applied to CTF Competition (ACCEPTED)
      {
        studentId: sitiUser.studentProfile.id,
        opportunityId: opportunities[4].id,
        coverLetter: 'Sebagai anggota aktif tim CTF ITB dan juara 1 CTF Gemastik XVI, saya sangat antusias untuk mengikuti Tokopedia Security Challenge 2025. Saya memiliki pengalaman luas dalam web exploitation, reverse engineering, dan cryptography.',
        portfolioUrl: 'https://ctftime.org/siti',
        status: 'ACCEPTED',
      },
      // Raka applied to Frontend Intern (APPLIED)
      {
        studentId: rakaUser.studentProfile.id,
        opportunityId: opportunities[0].id,
        coverLetter: 'Saya tertarik dengan posisi Frontend Developer Intern di Gojek. Meskipun background utama saya di mobile development, saya juga memiliki kemampuan kuat di React.js dan TypeScript. Pengalaman saya dalam UI/UX Design akan membantu menciptakan antarmuka yang intuitif dan user-friendly.',
        portfolioUrl: 'https://raka-portfolio.vercel.app',
        status: 'APPLIED',
      },
      // Fajar applied to Backend Intern (VIEWED)
      {
        studentId: fajarUser.studentProfile.id,
        opportunityId: opportunities[2].id,
        coverLetter: 'Saya sangat tertarik dengan posisi Backend Engineer Intern di Bukalapak. Pengalaman saya dalam fullstack development dan pemahaman mendalam tentang Node.js, PostgreSQL, dan Docker membuat saya yakin dapat memberikan kontribusi signifikan bagi tim engineering Bukalapak.',
        portfolioUrl: 'https://github.com/fajar-hidayat',
        status: 'VIEWED',
      },
      // Dewi applied to Cloud Study Jam (ACCEPTED)
      {
        studentId: dewiUser.studentProfile.id,
        opportunityId: opportunities[8].id,
        coverLetter: 'Sebagai pemegang sertifikasi AWS Cloud Practitioner, saya sangat tertarik mengikuti Google Cloud Study Jam track Cybersecurity untuk memperluas pengetahuan saya di platform cloud lain. Saya yakin program ini akan melengkapi skill cloud computing saya.',
        portfolioUrl: null,
        status: 'ACCEPTED',
      },
    ],
  });

  console.log('5 applications dibuat dengan status berbeda');

  // ===== SAVED OPPORTUNITIES =====
  await prisma.savedOpportunity.createMany({
    data: [
      { studentId: budiUser.studentProfile.id, opportunityId: opportunities[7].id },
      { studentId: budiUser.studentProfile.id, opportunityId: opportunities[3].id },
      { studentId: sitiUser.studentProfile.id, opportunityId: opportunities[8].id },
      { studentId: rakaUser.studentProfile.id, opportunityId: opportunities[5].id },
      { studentId: rakaUser.studentProfile.id, opportunityId: opportunities[9].id },
      { studentId: dewiUser.studentProfile.id, opportunityId: opportunities[6].id },
      { studentId: dewiUser.studentProfile.id, opportunityId: opportunities[0].id },
      { studentId: dewiUser.studentProfile.id, opportunityId: opportunities[2].id },
      { studentId: fajarUser.studentProfile.id, opportunityId: opportunities[6].id },
      { studentId: fajarUser.studentProfile.id, opportunityId: opportunities[3].id },
    ],
  });

  console.log('Saved opportunities dibuat');

  // ===== NOTIFICATIONS =====
  await prisma.notification.createMany({
    data: [
      {
        userId: budiUser.id,
        type: 'APPLICATION_UPDATE',
        title: 'Lamaran Dilihat',
        message: 'Tokopedia telah melihat lamaran kamu untuk posisi Data Analyst Intern.',
        relatedId: opportunities[1].id,
      },
      {
        userId: budiUser.id,
        type: 'NEW_OPPORTUNITY',
        title: 'Peluang Baru yang Cocok',
        message: 'Ada peluang baru yang cocok dengan minat kamu: Research Collaboration — AI for Product Recommendation di Tokopedia.',
        relatedId: opportunities[7].id,
      },
      {
        userId: sitiUser.id,
        type: 'APPLICATION_UPDATE',
        title: 'Lamaran Diterima',
        message: 'Selamat! Lamaran kamu untuk CTF Competition — Tokopedia Security Challenge 2025 telah diterima.',
        relatedId: opportunities[4].id,
      },
      {
        userId: rakaUser.id,
        type: 'DEADLINE_REMINDER',
        title: 'Deadline Segera',
        message: 'Peluang UI/UX Design Competition — Reimagine E-Commerce akan berakhir dalam 1 hari. Jangan sampai terlewat!',
        relatedId: opportunities[5].id,
      },
      {
        userId: gojekUser.id,
        type: 'NEW_APPLICANT',
        title: 'Pelamar Baru',
        message: 'Raka Pratama telah melamar untuk posisi Frontend Developer Intern.',
        relatedId: opportunities[0].id,
      },
      {
        userId: dewiUser.id,
        type: 'APPLICATION_UPDATE',
        title: 'Lamaran Diterima',
        message: 'Selamat! Kamu diterima di Google Cloud Study Jam — Cybersecurity Track.',
        relatedId: opportunities[8].id,
      },
      {
        userId: fajarUser.id,
        type: 'APPLICATION_UPDATE',
        title: 'Lamaran Dilihat',
        message: 'Bukalapak telah melihat lamaran kamu untuk posisi Backend Engineer Intern.',
        relatedId: opportunities[2].id,
      },
    ],
  });

  console.log('Notifications dibuat');

  console.log('\nSeeding selesai!');
  console.log('==========================================');
  console.log('Akun Demo:');
  console.log('  Admin: admin@ironlung.id / admin123');
  console.log('  Mahasiswa: budi@mail.com / password123');
  console.log('  Mahasiswa: siti@mail.com / password123');
  console.log('  Industri: recruitment@gojek.com / password123');
  console.log('==========================================');
}

main()
  .catch((e) => {
    console.error('Error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
