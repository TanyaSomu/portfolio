export interface Profile {
  id: string;
  fullName: string;
  title: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  avatarUrl?: string | null;
  availableForHire: boolean;
  statusMessage: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  categoryId: string;
  icon?: string | null;
  proficiency?: number | null;
  isFeatured: boolean;
  order: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
  skills: Skill[];
}

export interface ProjectImage {
  id: string;
  projectId: string;
  imageUrl: string;
  caption?: string | null;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problemStatement?: string | null;
  solution?: string | null;
  challenges?: string | null;
  technologies: string;
  featuredImage?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  playStoreUrl?: string | null;
  isFeatured: boolean;
  order: number;
  viewsCount: number;
  images?: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  organization: string;
  designation: string;
  duration: string;
  period?: string | null;
  description: string;
  responsibilities?: string | null;
  technologies?: string | null;
  achievements?: string | null;
  type: 'INTERNSHIP' | 'FULL_TIME' | 'CONTRACT';
  order: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  department: string;
  duration: string;
  graduationYear: string;
  achievements?: string | null;
  order: number;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrg: string;
  issueDate: string;
  credentialId?: string | null;
  verificationUrl?: string | null;
  certificateImage?: string | null;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  description?: string | null;
  category: string;
  order: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  readTimeMinutes: number;
  isPublished: boolean;
  publishedAt?: string | null;
  categoryId: string;
  category?: BlogCategory;
  tags?: string | null;
  viewsCount: number;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED';
  ipAddress?: string | null;
  createdAt: string;
}

export interface ResumeMetadata {
  id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  uploadedAt: string;
  downloadCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

