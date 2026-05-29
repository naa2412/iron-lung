const { z } = require('zod');

const createPortfolioSchema = z.object({
  type: z.enum(['INTERNSHIP', 'PROJECT', 'COMPETITION', 'CERTIFICATION', 'TRAINING'], {
    errorMap: () => ({ message: 'Tipe portofolio harus salah satu dari: Magang, Proyek, Kompetisi, Sertifikasi, Pelatihan' }),
  }),
  title: z.string().min(3, 'Judul minimal 3 karakter').max(200, 'Judul maksimal 200 karakter'),
  description: z.string().optional().nullable(),
  date: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: 'Format tanggal tidak valid',
  }).optional().nullable(),
  organization: z.string().optional().nullable(),
  docUrl: z.string().url('Format URL tidak valid').optional().nullable().or(z.literal('')),
  skills: z.array(z.string()).default([]),
});

const updatePortfolioSchema = createPortfolioSchema.partial();

module.exports = {
  createPortfolioSchema,
  updatePortfolioSchema,
};
