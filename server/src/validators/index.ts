import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address format'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export const profileSchema = z.object({
  fullName: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  headline: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  linkedinUrl: z.string().url().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  availableForHire: z.boolean().optional(),
  statusMessage: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2).optional(),
  summary: z.string().min(5),
  problemStatement: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  challenges: z.string().optional().nullable(),
  technologies: z.string().min(1),
  featuredImage: z.string().optional().nullable(),
  liveUrl: z.string().url().optional().nullable().or(z.literal('')),
  githubUrl: z.string().url().optional().nullable().or(z.literal('')),
  playStoreUrl: z.string().url().optional().nullable().or(z.literal('')),
  isFeatured: z.boolean().optional(),
  order: z.number().int().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1),
  categoryId: z.string().uuid().or(z.string().min(1)),
  icon: z.string().optional().nullable(),
  proficiency: z.number().int().min(1).max(100).optional().nullable(),
  isFeatured: z.boolean().optional(),
  order: z.number().int().optional(),
});

export const experienceSchema = z.object({
  organization: z.string().min(1),
  designation: z.string().min(1),
  duration: z.string().min(1),
  period: z.string().optional().nullable(),
  description: z.string().min(5),
  responsibilities: z.string().optional().nullable(),
  technologies: z.string().optional().nullable(),
  achievements: z.string().optional().nullable(),
  type: z.enum(['INTERNSHIP', 'FULL_TIME', 'CONTRACT']).optional(),
  order: z.number().int().optional(),
});

export const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  department: z.string().min(1),
  duration: z.string().min(1),
  graduationYear: z.string().min(4),
  achievements: z.string().optional().nullable(),
  order: z.number().int().optional(),
});

export const certificationSchema = z.object({
  name: z.string().min(1),
  issuingOrg: z.string().min(1),
  issueDate: z.string().min(1),
  credentialId: z.string().optional().nullable(),
  verificationUrl: z.string().url().optional().nullable().or(z.literal('')),
  certificateImage: z.string().optional().nullable(),
  order: z.number().int().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).optional(),
  excerpt: z.string().min(5),
  content: z.string().min(10),
  coverImage: z.string().optional().nullable(),
  readTimeMinutes: z.number().int().positive().optional(),
  isPublished: z.boolean().optional(),
  categoryId: z.string().min(1),
  tags: z.string().optional().nullable(),
});

export const analyticsTrackSchema = z.object({
  eventType: z.enum(['PAGE_VIEW', 'PROJECT_VIEW', 'BLOG_VIEW', 'RESUME_DOWNLOAD', 'CONTACT_SUBMIT']),
  pagePath: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

