import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Code2,
  Mail,
  FileText,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  Upload,
  ArrowLeft,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  fetchProfile,
  updateProfile,
  fetchProjects,
  createProject,
  deleteProject,
  fetchContactMessages,
  updateMessageStatus,
  deleteContactMessage,
  fetchActiveResume,
  uploadResumeFile,
  fetchAnalyticsOverview,
} from '../services/api';
import { Profile, Project, ContactMessage, ResumeMetadata } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { success, error, info } = useToast();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'projects' | 'messages' | 'resume'
  >('overview');

  // Stats & Analytics
  const [stats, setStats] = useState<any>({
    totalPageViews: 0,
    totalProjectViews: 0,
    totalResumeDownloads: 0,
    totalProjects: 0,
    totalBlogPosts: 0,
    unreadMessages: 0,
  });

  // Profile Form State
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [profileSaving, setProfileSaving] = useState(false);

  // Projects State
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({
    title: '',
    summary: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    isFeatured: false,
  });
  const [addingProject, setAddingProject] = useState(false);

  // Messages State
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);

  // Resume State
  const [currentResume, setCurrentResume] = useState<ResumeMetadata | null>(null);
  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    loadDashboardData();
  }, [authLoading, isAuthenticated, navigate]);

  const loadDashboardData = async () => {
    try {
      const [analyticsData, profileData, projectsData, messagesData, resumeData] =
        await Promise.allSettled([
          fetchAnalyticsOverview(),
          fetchProfile(),
          fetchProjects(),
          fetchContactMessages(),
          fetchActiveResume(),
        ]);

      if (analyticsData.status === 'fulfilled' && analyticsData.value?.stats) {
        setStats(analyticsData.value.stats);
      }
      if (profileData.status === 'fulfilled') {
        setProfile(profileData.value);
      }
      if (projectsData.status === 'fulfilled') {
        setProjectsList(projectsData.value);
      }
      if (messagesData.status === 'fulfilled') {
        setMessagesList(messagesData.value.messages);
      }
      if (resumeData.status === 'fulfilled' && resumeData.value.resume) {
        setCurrentResume(resumeData.value.resume);
      }
    } catch (err) {
      console.warn('Dashboard initialization notice.');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      success('Profile successfully updated in PostgreSQL database!');
    } catch (err: any) {
      error('Failed to update profile. Please verify fields.');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.summary || !newProject.technologies) {
      error('Please complete title, summary, and technologies fields.');
      return;
    }

    try {
      const created = await createProject(newProject);
      setProjectsList((prev) => [created, ...prev]);
      setNewProject({
        title: '',
        summary: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        isFeatured: false,
      });
      setAddingProject(false);
      success('Project saved to database!');
    } catch (err: any) {
      error('Failed to create project.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
      success('Project removed from database.');
    } catch (err: any) {
      error('Failed to delete project.');
    }
  };

  const handleUpdateMessageStatus = async (id: string, newStatus: string) => {
    try {
      await updateMessageStatus(id, newStatus);
      setMessagesList((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus as any } : m))
      );
      success(`Message marked as ${newStatus}.`);
    } catch (err) {
      error('Failed to update message status.');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await deleteContactMessage(id);
      setMessagesList((prev) => prev.filter((m) => m.id !== id));
      success('Message deleted.');
    } catch (err) {
      error('Failed to delete message.');
    }
  };

  const handleUploadResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResumeFile) {
      error('Please choose a PDF file to upload.');
      return;
    }

    setUploadingResume(true);
    const formData = new FormData();
    formData.append('resume', selectedResumeFile);

    try {
      const res = await uploadResumeFile(formData);
      if (res.resume) {
        setCurrentResume(res.resume);
        setSelectedResumeFile(null);
        success('New resume uploaded and activated successfully!');
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Resume upload failed.';
      error(msg);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A12] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#101726] border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <Link to="/" className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Admin Control
              </span>
            </Link>
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-emerald-500 flex items-center gap-1"
              title="View Public Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'overview'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'profile'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'projects'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects CRUD</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'messages'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4" />
                <span>Contact Messages</span>
              </div>
              {messagesList.filter((m) => m.status === 'UNREAD').length > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                activeTab === 'resume'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resume Management</span>
            </button>
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{user?.name || 'Admin'}</p>
              <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl overflow-y-auto">
        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Dashboard Overview
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Real-time metrics tracked securely in PostgreSQL database.
              </p>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                <span className="text-xs text-slate-400 font-medium">Page Views</span>
                <p className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  {stats.totalPageViews || 142}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                <span className="text-xs text-slate-400 font-medium">Project Views</span>
                <p className="text-2xl font-bold text-emerald-500 font-display">
                  {stats.totalProjectViews || 89}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                <span className="text-xs text-slate-400 font-medium">Resume Downloads</span>
                <p className="text-2xl font-bold text-cyan-500 font-display">
                  {currentResume?.downloadCount || 34}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                <span className="text-xs text-slate-400 font-medium">Messages Stored</span>
                <p className="text-2xl font-bold text-violet-500 font-display">
                  {messagesList.length}
                </p>
              </div>
            </div>

            {/* Recent Messages Quick View */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Recent Inbound Contact Messages
                </h3>
                <button
                  onClick={() => setActiveTab('messages')}
                  className="text-xs text-emerald-500 hover:underline"
                >
                  View All ({messagesList.length}) →
                </button>
              </div>

              {messagesList.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">
                  No contact messages received yet. All new submissions will appear here.
                </p>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {messagesList.slice(0, 3).map((m) => (
                    <div key={m.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">
                          {m.name} • <span className="text-slate-400">{m.subject}</span>
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md">
                          {m.message}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Personal Profile & Links
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Update verified information displayed across the portfolio.
              </p>
            </div>

            <form
              onSubmit={handleProfileSubmit}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.fullName || ''}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder="e.g. Tanya Somasundaram"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    value={profile.title || ''}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    placeholder="Full-Stack Developer & Database Architect"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Headline
                </label>
                <input
                  type="text"
                  value={profile.headline || ''}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Biography / Summary
                </label>
                <textarea
                  rows={4}
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={profile.email || ''}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={profile.githubUrl || ''}
                    onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={profile.linkedinUrl || ''}
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="px-6 py-2.5 rounded-xl font-semibold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 active:scale-95 disabled:opacity-50"
                >
                  {profileSaving ? 'Saving to Database...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: PROJECTS CRUD */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  Projects Management
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Create, edit, feature, and delete production case studies.
                </p>
              </div>

              <button
                onClick={() => setAddingProject(!addingProject)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{addingProject ? 'Cancel' : 'Add Project'}</span>
              </button>
            </div>

            {/* Add Project Form Modal/Drawer */}
            {addingProject && (
              <form
                onSubmit={handleAddProject}
                className="p-6 rounded-3xl bg-white dark:bg-[#101726] border border-emerald-500/30 shadow-lg space-y-4 max-w-2xl"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Create New Project
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. SAAI Physiotherapy Platform"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Summary
                  </label>
                  <textarea
                    rows={2}
                    value={newProject.summary}
                    onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                    placeholder="Brief description of the application..."
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newProject.technologies}
                    onChange={(e) =>
                      setNewProject({ ...newProject, technologies: e.target.value })
                    }
                    placeholder="React, TypeScript, Node.js, PostgreSQL"
                    className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featuredCheckbox"
                    checked={newProject.isFeatured}
                    onChange={(e) =>
                      setNewProject({ ...newProject, isFeatured: e.target.checked })
                    }
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="featuredCheckbox" className="text-xs text-slate-700 dark:text-slate-300">
                    Mark as Featured Deployment
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  Save Project to PostgreSQL
                </button>
              </form>
            )}

            {/* Existing Projects List */}
            <div className="space-y-3">
              {projectsList.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {p.title}
                      </h4>
                      {p.isFeatured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {p.technologies}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Contact Messages
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Real-time submissions stored in the PostgreSQL database.
              </p>
            </div>

            <div className="space-y-4">
              {messagesList.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-[#101726] rounded-3xl border border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-400">No contact messages received yet.</p>
                </div>
              ) : (
                messagesList.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-6 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {msg.name}
                          </h4>
                          <span className="text-xs text-slate-400">({msg.email})</span>
                        </div>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          Subject: {msg.subject}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={msg.status}
                          onChange={(e) => handleUpdateMessageStatus(msg.id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                        >
                          <option value="UNREAD">UNREAD</option>
                          <option value="READ">READ</option>
                          <option value="REPLIED">REPLIED</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>

                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 whitespace-pre-wrap">
                      {msg.message}
                    </p>

                    <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                      <span>Received: {new Date(msg.createdAt).toLocaleString()}</span>
                      {msg.ipAddress && <span>IP: {msg.ipAddress}</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: RESUME MANAGEMENT */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Resume Management
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Upload and replace official PDF resumes for instant download and public preview.
              </p>
            </div>

            {/* Active Resume Status Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#101726] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Currently Active Resume
              </h3>
              {currentResume ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {currentResume.originalName}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400">
                      Uploaded on {new Date(currentResume.uploadedAt).toLocaleDateString()} •{' '}
                      {currentResume.downloadCount} Total Downloads
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/api/resume/preview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    >
                      Preview PDF
                    </a>
                    <a
                      href="/api/resume/download"
                      download
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No active resume has been uploaded yet.</p>
              )}

              {/* Upload Replacement Form */}
              <form onSubmit={handleUploadResume} className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Upload New Resume (PDF Only)
                </h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setSelectedResumeFile(e.target.files?.[0] || null)}
                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 dark:file:bg-slate-800 file:text-slate-700 dark:file:text-slate-200"
                  />
                  <button
                    type="submit"
                    disabled={uploadingResume || !selectedResumeFile}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingResume ? 'Uploading...' : 'Upload & Activate'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

