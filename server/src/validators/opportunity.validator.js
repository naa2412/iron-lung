const { z } = require('zod');

const createOpportunitySchema = z.object({
  title: z.string().min(5, 'Judul minimal 5 karakter').max(200, 'Judul maksimal 200 karakter'),
  category: z.enum(['INTERNSHIP', 'COLLABORATION', 'COMPETITION', 'TRAINING'], {
    errorMap: () => ({ message: 'Kategori harus salah satu dari: Magang, Kolaborasi, Kompetisi, Pelatihan' }),
  }),
  description: z.string().min(20, 'Deskripsi minimal 20 karakter'),
  requirements: z.array(z.string()).min(1, 'Minimal 1 persyaratan'),
  locationType: z.enum(['REMOTE', 'ONSITE', 'HYBRID'], {
    errorMap: () => ({ message: 'Tipe lokasi harus: Remote, On-site, atau Hybrid' }),
  }),
  city: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Format tanggal deadline tidak valid',
  }),
  skillsRequired: z.array(z.string()).min(1, 'Minimal 1 skill yang dibutuhkan'),
  registrationUrl: z.string().url('Format URL tidak valid').optional().nullable().or(z.literal('')),
});

const updateOpportunitySchema = createOpportunitySchema.partial();

module.exports = {
  createOpportunitySchema,
  updateOpportunitySchema,
};
