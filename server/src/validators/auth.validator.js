const { z } = require('zod');

const registerMahasiswaSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter').max(100, 'Nama maksimal 100 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter').max(128, 'Password maksimal 128 karakter'),
  university: z.string().min(2, 'Nama universitas wajib diisi'),
  studyProgram: z.string().min(2, 'Program studi wajib diisi'),
  semester: z.number().int().min(1, 'Semester minimal 1').max(14, 'Semester maksimal 14'),
});

const registerIndustriSchema = z.object({
  companyName: z.string().min(2, 'Nama perusahaan minimal 2 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter').max(128, 'Password maksimal 128 karakter'),
  website: z.string().url('Format URL tidak valid').optional().or(z.literal('')),
  description: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Format email tidak valid'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token wajib diisi'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

module.exports = {
  registerMahasiswaSchema,
  registerIndustriSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
