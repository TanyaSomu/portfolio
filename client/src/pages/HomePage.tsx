import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { EducationSection } from '../components/sections/EducationSection';
import { CertificationsSection } from '../components/sections/CertificationsSection';
import { PlaygroundSection } from '../components/sections/PlaygroundSection';
import { BlogSection } from '../components/sections/BlogSection';
import { ResumeSection } from '../components/sections/ResumeSection';
import { ContactSection } from '../components/sections/ContactSection';
import {
  fetchProfile,
  fetchProjects,
  fetchSkills,
  fetchExperiences,
  fetchEducation,
  fetchCertifications,
  fetchBlogPosts,
  trackAnalyticsEvent,
} from '../services/api';
import {
  Profile,
  Project,
  SkillCategory,
  Experience,
  Education,
  Certification,
  Achievement,
  BlogPost,
} from '../types';

export const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track anonymous page visit
    trackAnalyticsEvent('PAGE_VIEW', '/');

    const loadData = async () => {
      try {
        const [
          profileData,
          projectsData,
          skillsData,
          expData,
          eduData,
          certsData,
          blogData,
        ] = await Promise.allSettled([
          fetchProfile(),
          fetchProjects(),
          fetchSkills(),
          fetchExperiences(),
          fetchEducation(),
          fetchCertifications(),
          fetchBlogPosts(),
        ]);

        if (profileData.status === 'fulfilled') setProfile(profileData.value);
        if (projectsData.status === 'fulfilled') setProjects(projectsData.value);
        if (skillsData.status === 'fulfilled') setSkillCategories(skillsData.value);
        if (expData.status === 'fulfilled') setExperiences(expData.value);
        if (eduData.status === 'fulfilled') setEducation(eduData.value);
        if (certsData.status === 'fulfilled') {
          setCertifications(certsData.value.certifications);
          setAchievements(certsData.value.achievements);
        }
        if (blogData.status === 'fulfilled') setBlogPosts(blogData.value.posts);
      } catch (err) {
        console.warn('Backend data sync notice; fallback components ready.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection categories={skillCategories} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <EducationSection education={education} />
      <CertificationsSection certifications={certifications} achievements={achievements} />
      <PlaygroundSection />
      <BlogSection posts={blogPosts} />
      <ResumeSection />
      <ContactSection />
    </main>
  );
};

