import axios from 'axios';
import {
  Profile,
  Project,
  SkillCategory,
  Experience,
  Education,
  Certification,
  Achievement,
  BlogPost,
  ContactMessage,
  ResumeMetadata,
  User,
} from '../types';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach bearer token if stored in localStorage as fallback
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Profile APIs
export const fetchProfile = async (): Promise<Profile> => {
  const res = await api.get('/profile');
  return res.data.profile;
};

export const updateProfile = async (data: Partial<Profile>): Promise<Profile> => {
  const res = await api.put('/profile', data);
  return res.data.profile;
};

// Projects APIs
export const fetchProjects = async (params?: {
  featured?: boolean;
  search?: string;
  tech?: string;
}): Promise<Project[]> => {
  const res = await api.get('/projects', { params });
  return res.data.projects;
};

export const fetchProjectBySlug = async (slug: string): Promise<Project> => {
  const res = await api.get(`/projects/${slug}`);
  return res.data.project;
};

export const createProject = async (data: Partial<Project>): Promise<Project> => {
  const res = await api.post('/projects', data);
  return res.data.project;
};

export const updateProject = async (id: string, data: Partial<Project>): Promise<Project> => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data.project;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

// Skills APIs
export const fetchSkills = async (): Promise<SkillCategory[]> => {
  const res = await api.get('/skills');
  return res.data.categories;
};

export const createSkill = async (data: any): Promise<any> => {
  const res = await api.post('/skills', data);
  return res.data.skill;
};

export const updateSkill = async (id: string, data: any): Promise<any> => {
  const res = await api.put(`/skills/${id}`, data);
  return res.data.skill;
};

export const deleteSkill = async (id: string): Promise<void> => {
  await api.delete(`/skills/${id}`);
};

// Experience APIs
export const fetchExperiences = async (): Promise<Experience[]> => {
  const res = await api.get('/experience');
  return res.data.experiences;
};

export const createExperience = async (data: Partial<Experience>): Promise<Experience> => {
  const res = await api.post('/experience', data);
  return res.data.experience;
};

export const updateExperience = async (id: string, data: Partial<Experience>): Promise<Experience> => {
  const res = await api.put(`/experience/${id}`, data);
  return res.data.experience;
};

export const deleteExperience = async (id: string): Promise<void> => {
  await api.delete(`/experience/${id}`);
};

// Education APIs
export const fetchEducation = async (): Promise<Education[]> => {
  const res = await api.get('/education');
  return res.data.education;
};

export const createEducation = async (data: Partial<Education>): Promise<Education> => {
  const res = await api.post('/education', data);
  return res.data.education;
};

export const updateEducation = async (id: string, data: Partial<Education>): Promise<Education> => {
  const res = await api.put(`/education/${id}`, data);
  return res.data.education;
};

export const deleteEducation = async (id: string): Promise<void> => {
  await api.delete(`/education/${id}`);
};

// Certifications & Achievements APIs
export const fetchCertifications = async (): Promise<{
  certifications: Certification[];
  achievements: Achievement[];
}> => {
  const res = await api.get('/certifications');
  return {
    certifications: res.data.certifications,
    achievements: res.data.achievements,
  };
};

export const createCertification = async (data: Partial<Certification>): Promise<Certification> => {
  const res = await api.post('/certifications', data);
  return res.data.certification;
};

export const deleteCertification = async (id: string): Promise<void> => {
  await api.delete(`/certifications/${id}`);
};

// Blog APIs
export const fetchBlogPosts = async (params?: {
  category?: string;
  search?: string;
  all?: boolean;
}): Promise<{ posts: BlogPost[]; categories: any[] }> => {
  const res = await api.get('/blog', { params });
  return { posts: res.data.posts, categories: res.data.categories };
};

export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const res = await api.get(`/blog/${slug}`);
  return res.data.post;
};

export const createBlogPost = async (data: Partial<BlogPost>): Promise<BlogPost> => {
  const res = await api.post('/blog', data);
  return res.data.post;
};

export const updateBlogPost = async (id: string, data: Partial<BlogPost>): Promise<BlogPost> => {
  const res = await api.put(`/blog/${id}`, data);
  return res.data.post;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  await api.delete(`/blog/${id}`);
};

// Contact APIs
export const submitContact = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> => {
  const res = await api.post('/contact', data);
  return res.data;
};

export const fetchContactMessages = async (status?: string): Promise<{
  messages: ContactMessage[];
  unreadCount: number;
}> => {
  const res = await api.get('/contact', { params: { status } });
  return {
    messages: res.data.messages,
    unreadCount: res.data.unreadCount,
  };
};

export const updateMessageStatus = async (id: string, status: string): Promise<void> => {
  await api.put(`/contact/${id}`, { status });
};

export const deleteContactMessage = async (id: string): Promise<void> => {
  await api.delete(`/contact/${id}`);
};

// Resume APIs
export const fetchActiveResume = async (): Promise<{
  available: boolean;
  resume?: ResumeMetadata;
  message?: string;
}> => {
  const res = await api.get('/resume');
  return res.data;
};

export const uploadResumeFile = async (formData: FormData): Promise<any> => {
  const res = await api.post('/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// Analytics APIs
export const trackAnalyticsEvent = async (
  eventType: string,
  pagePath: string,
  metadata?: any
): Promise<void> => {
  try {
    await api.post('/analytics/track', { eventType, pagePath, metadata });
  } catch (err) {
    // Analytics failures should never interrupt user experience
  }
};

export const fetchAnalyticsOverview = async (): Promise<any> => {
  const res = await api.get('/analytics/overview');
  return res.data;
};

// Auth APIs
export const loginAdmin = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const logoutAdmin = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getMe = async (): Promise<User> => {
  const res = await api.get('/auth/me');
  return res.data.user;
};

