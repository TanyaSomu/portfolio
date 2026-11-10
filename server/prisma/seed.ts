import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Tanya Somasundaram PERN Portfolio Database Seed...');

  // 1. Seed Admin User
  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@Portfolio2026';
  const hashedPassword = await bcrypt.hash(defaultPassword, 12);
  const adminEmail = process.env.ADMIN_EMAIL || 'tanyasomu6@gmail.com';

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash: hashedPassword,
      name: 'Tanya Somasundaram',
    },
    create: {
      email: adminEmail,
      passwordHash: hashedPassword,
      name: 'Tanya Somasundaram',
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin user seeded (${adminEmail})`);

  // 2. Seed Profile
  const existingProfile = await prisma.profile.findFirst();
  const profileData = {
    fullName: 'Tanya Somasundaram',
    title: 'Full-Stack Developer & Database Architect',
    headline:
      'Designing scalable, database-backed applications, resilient RESTful APIs, and intuitive digital experiences.',
    bio: 'Bachelor’s Degree in Information Technology with practical experience developing React and Node.js projects, including a production-level healthcare platform available on the Google Play Store and multi-station railway billing management systems. Skilled at designing and incorporating secure JWT-based and token-based RESTful API endpoints (Node.js/Express.js, Django REST Framework), along with React/TypeScript frontend interfaces, role-based authentication/authorization processes, and query/backend optimization. Proficient in relational databases, Object-Oriented Programming, Data Structures & Algorithms, debugging of live applications, and module development in Git.',
    location: 'Erode, Tamil Nadu, India',
    email: 'tanyasomu6@gmail.com',
    phone: '+91-9585988544',
    githubUrl: 'https://github.com/TanyaSomu',
    linkedinUrl: 'https://linkedin.com/in/tanya-somu-3319a0332',
    availableForHire: true,
    statusMessage: 'Available for Full-Stack & Database Engineering Roles',
  };

  if (!existingProfile) {
    await prisma.profile.create({ data: profileData });
  } else {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: profileData,
    });
  }
  console.log('✅ Tanya Somasundaram verified profile seeded');

  // 3. Seed Skill Categories & Skills
  const categories = [
    {
      name: 'Programming Languages',
      slug: 'languages',
      order: 1,
      skills: [
        { name: 'Java', isFeatured: true, order: 1 },
        { name: 'Python', isFeatured: true, order: 2 },
        { name: 'C / C++', isFeatured: false, order: 3 },
        { name: 'HTML', isFeatured: false, order: 4 },
        { name: 'CSS', isFeatured: false, order: 5 },
        { name: 'JavaScript / TypeScript', isFeatured: true, order: 6 },
        { name: 'SQL', isFeatured: true, order: 7 },
      ],
    },
    {
      name: 'Frontend Development',
      slug: 'frontend',
      order: 2,
      skills: [
        { name: 'React.js', isFeatured: true, order: 1 },
        { name: 'TypeScript', isFeatured: true, order: 2 },
        { name: 'HTML5 & CSS3', isFeatured: true, order: 3 },
        { name: 'Tailwind CSS', isFeatured: true, order: 4 },
        { name: 'Framer Motion', isFeatured: false, order: 5 },
      ],
    },
    {
      name: 'Backend & APIs',
      slug: 'backend',
      order: 3,
      skills: [
        { name: 'Node.js', isFeatured: true, order: 1 },
        { name: 'Express.js', isFeatured: true, order: 2 },
        { name: 'REST APIs', isFeatured: true, order: 3 },
        { name: 'Django REST Framework', isFeatured: false, order: 4 },
        { name: 'JWT & Token-Based Auth', isFeatured: true, order: 5 },
        { name: 'Role-Based Access Control', isFeatured: true, order: 6 },
      ],
    },
    {
      name: 'Databases & Query Optimization',
      slug: 'databases',
      order: 4,
      skills: [
        { name: 'PostgreSQL', isFeatured: true, order: 1 },
        { name: 'MySQL', isFeatured: false, order: 2 },
        { name: 'SQL', isFeatured: true, order: 3 },
        { name: 'MongoDB', isFeatured: false, order: 4 },
        { name: 'NoSQL', isFeatured: false, order: 5 },
        { name: 'Relational Database Design', isFeatured: true, order: 6 },
        { name: 'Query Tuning', isFeatured: true, order: 7 },
        { name: 'Prisma ORM', isFeatured: true, order: 8 },
      ],
    },
    {
      name: 'Core Concepts & Developer Tools',
      slug: 'tools',
      order: 5,
      skills: [
        { name: 'Object-Oriented Design', isFeatured: true, order: 1 },
        { name: 'Data Structures & Algorithms', isFeatured: true, order: 2 },
        { name: 'Complexity Analysis', isFeatured: true, order: 3 },
        { name: 'Debugging Live Applications', isFeatured: true, order: 4 },
        { name: 'Git & GitHub', isFeatured: true, order: 5 },
        { name: 'VS Code', isFeatured: false, order: 6 },
        { name: 'Antigravity', isFeatured: true, order: 7 },
      ],
    },
  ];

  for (const cat of categories) {
    const createdCat = await prisma.skillCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, order: cat.order },
      create: { name: cat.name, slug: cat.slug, order: cat.order },
    });

    for (const s of cat.skills) {
      const existingSkill = await prisma.skill.findFirst({
        where: { name: s.name, categoryId: createdCat.id },
      });
      if (!existingSkill) {
        await prisma.skill.create({
          data: {
            name: s.name,
            categoryId: createdCat.id,
            isFeatured: s.isFeatured,
            order: s.order,
          },
        });
      }
    }
  }
  console.log('✅ Verified skills matrix seeded');

  // 4. Seed Projects
  const projects = [
    {
      title: 'SAAI Physiotherapy Clinic Management System',
      slug: 'saai-physiotherapy-clinic-management-system',
      summary:
        'Full-fledged, scalable clinic management platform released on the Google Play Store, managing patient life-cycles, dynamic assessment engines, therapist scheduling, and clinical reporting.',
      problemStatement:
        'Manual clinical tracking caused scheduling conflicts, scattered patient progress evaluations, and delayed prescription workflows for physiotherapists.',
      solution:
        'Designed and deployed the PostgreSQL database for the full-fledged, scalable clinic management system, which was released on the Google Play Store; structured data to support doctors and therapists. Created an efficient backend data layer for JWT-secured REST API consumption by a React and TypeScript frontend application that includes role-based access control and PDF/CSV report generation. Created efficient schemas for therapist-wise booking, patient life-cycle management, dynamic assessment engine, and treatment planning using concepts of algorithm design and data structures.',
      challenges:
        'Handling concurrent therapist appointments, complex assessment engine schemas, and strictly isolated role-based authorization across patient clinical records.',
      technologies: 'React, TypeScript, Node.js, Express.js, PostgreSQL, Google Play Store, Tailwind CSS',
      playStoreUrl: 'https://play.google.com/store',
      githubUrl: 'https://github.com/TanyaSomu',
      isFeatured: true,
      order: 1,
    },
    {
      title: 'Railway Waiting Hall & Clock Room Billing Management System',
      slug: 'railway-waiting-hall-clock-room-billing-system',
      summary:
        'Live operational billing and baggage custody management system created and implemented for 3 rail stations (Erode, Tirupur, Coimbatore) for real staff transactions and revenue monitoring.',
      problemStatement:
        'High-passenger-volume railway stations needed a robust, low-latency transaction recording solution and real-time revenue monitoring for administrative supervisors.',
      solution:
        'Created and implemented a billing system for 3 rail stations (Erode, Tirupur, Coimbatore) with a C# desktop application for transaction operations of the staff and a React administrative panel to monitor the revenue. Used secure database integration and a role-based workflow utilised daily by station employees.',
      challenges:
        'Multi-facility data synchronization, daily revenue shift reconciliation, and continuous high-uptime operation.',
      technologies: 'C#, React, PostgreSQL, REST APIs, Tailwind CSS',
      githubUrl: 'https://github.com/TanyaSomu',
      isFeatured: true,
      order: 2,
    },
    {
      title: 'Student Management System — Database Development',
      slug: 'student-management-system-database-development',
      summary:
        'Database architecture for student placement tracking connected with the college ERP portal via coordinated cross-system data flow.',
      problemStatement:
        'Interview eligibility verification and student placement tracking were hindered by fragmented records across disparate systems.',
      solution:
        'Designed a database for the placement module of students to be used in connection with the college ERP portal via data flow across both systems. Created relational databases for storing data regarding students’ profiles, interview schedules, and placement status using an object-oriented and algorithmic problem-solving approach.',
      challenges:
        'Coordinating real-time data flow and schema constraints between institutional ERP and interview evaluation modules.',
      technologies: 'PostgreSQL, Node.js, Express.js, React, Relational Database Design',
      githubUrl: 'https://github.com/TanyaSomu',
      isFeatured: false,
      order: 3,
    },
  ];

  for (const proj of projects) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj,
    });
  }
  console.log('✅ Verified production projects seeded');

  // 5. Seed Experience
  const experiences = [
    {
      organization: 'iGen Services and Solutions',
      designation: 'Backend Developer Intern',
      duration: 'May 2026 – Aug 2026',
      period: 'Summer 2026',
      description:
        'Built backend systems using Node.js and PostgreSQL, designing relational database schemas and implementing modules for content management, user administration, and authentication.',
      responsibilities:
        'Developed and integrated RESTful APIs with Node.js, including route handlers, request validation, and permission-based access control, with token-based authentication securing API endpoints.',
      technologies: 'Node.js, Express.js, PostgreSQL, RESTful APIs, JWT, Authentication',
      achievements: 'Implemented permission-based access control and token-based authentication across core endpoints',
      type: 'INTERNSHIP' as const,
      order: 1,
    },
    {
      organization: 'AR Technologies',
      designation: 'Database Developer Intern',
      duration: 'Jan 2025 – Nov 2025',
      period: '11 Months',
      description:
        'Supported relational database schema and software design for multiple interconnected web applications accessed by admins and corrected data integrity problems to ensure consistent and reliable application functionality.',
      responsibilities:
        'Collaborated in an agile setting with developers for debugging and optimisation of database schemas throughout an 11-month internship to reduce data integrity problems by 4-6%.',
      technologies: 'PostgreSQL, Relational Database Design, Query Tuning, SQL, Agile',
      achievements: 'Reduced data integrity problems by 4-6% across interconnected administrative applications',
      type: 'INTERNSHIP' as const,
      order: 2,
    },
  ];

  for (const exp of experiences) {
    const existing = await prisma.experience.findFirst({
      where: { organization: exp.organization, designation: exp.designation },
    });
    if (!existing) {
      await prisma.experience.create({ data: exp });
    }
  }
  console.log('✅ Verified experience and internships seeded');

  // 6. Seed Education
  const educations = [
    {
      institution: 'Nandha Engineering College, Erode, Tamil Nadu',
      degree: 'Bachelor of Technology in Information Technology',
      department: 'Information Technology',
      duration: 'Expected May 2027',
      graduationYear: '2027',
      achievements:
        'Relevant Coursework: Backend Development, Object-Oriented Programming, Data Structures and Algorithms, Complexity Analysis.',
      order: 1,
    },
  ];

  for (const edu of educations) {
    const existing = await prisma.education.findFirst({
      where: { institution: edu.institution, degree: edu.degree },
    });
    if (!existing) {
      await prisma.education.create({ data: edu });
    }
  }
  console.log('✅ Verified education records seeded');

  // 7. Seed Certifications
  const certs = [
    {
      name: 'Fundamentals of Python',
      issuingOrg: 'Infosys Springboard',
      issueDate: 'Certified',
      credentialId: 'INF-PY-SPRINGBOARD',
      verificationUrl: 'https://springboard.infosys.com',
      order: 1,
    },
    {
      name: 'Basics of MongoDB',
      issuingOrg: 'MongoDB (Official)',
      issueDate: 'Certified',
      credentialId: 'MDB-OFFICIAL-BASICS',
      verificationUrl: 'https://learn.mongodb.com',
      order: 2,
    },
  ];

  for (const c of certs) {
    const existing = await prisma.certification.findFirst({
      where: { name: c.name, issuingOrg: c.issuingOrg },
    });
    if (!existing) {
      await prisma.certification.create({ data: c });
    }
  }

  const achievements = [
    {
      title: 'Production Google Play Store Application Release',
      event: 'SAAI Physiotherapy Clinic Management System',
      year: '2026',
      description:
        'Engineered PostgreSQL database and JWT-secured RESTful data layer for production clinic management system published on the Google Play Store.',
      category: 'PRODUCTION',
      order: 1,
    },
    {
      title: 'Live Commercial Multi-Station Railway Deployment',
      event: 'Railway Waiting Hall & Clock Room Billing System',
      year: '2026',
      description:
        'Built and deployed operational billing management software utilized daily across 3 stations (Erode, Tirupur, Coimbatore).',
      category: 'DEPLOYMENT',
      order: 2,
    },
  ];

  for (const a of achievements) {
    const existing = await prisma.achievement.findFirst({
      where: { title: a.title, event: a.event },
    });
    if (!existing) {
      await prisma.achievement.create({ data: a });
    }
  }
  console.log('✅ Verified certifications and achievements seeded');

  // 8. Seed Blog
  const blogCat = await prisma.blogCategory.upsert({
    where: { slug: 'database-engineering' },
    update: { name: 'Database Engineering' },
    create: { name: 'Database Engineering', slug: 'database-engineering' },
  });

  await prisma.blogPost.upsert({
    where: { slug: 'query-tuning-and-data-integrity-in-relational-databases' },
    update: {},
    create: {
      title: 'Query Tuning and Data Integrity in Production Relational Databases',
      slug: 'query-tuning-and-data-integrity-in-relational-databases',
      excerpt:
        'Lessons learned debugging interconnected enterprise schemas, eliminating recurring foreign key errors, and optimizing query execution paths.',
      content: `In high-traffic systems, database reliability is paramount. During my work optimizing database schemas across interconnected administrative platforms, reducing recurring data integrity errors required analyzing query execution plans and establishing strict constraint boundaries...`,
      readTimeMinutes: 5,
      isPublished: true,
      categoryId: blogCat.id,
      tags: 'PostgreSQL, Relational Database Design, Query Tuning, Express.js',
    },
  });
  console.log('✅ Verified blog seeded');

  // 9. Seed Active Resume
  const resumeUploadPath = path.resolve(__dirname, '../uploads/resumes/Tanya_Somasundaram_Resume.pdf');
  if (fs.existsSync(resumeUploadPath)) {
    const stats = fs.statSync(resumeUploadPath);
    await prisma.resume.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    await prisma.resume.create({
      data: {
        fileName: 'Tanya_Somasundaram_Resume.pdf',
        originalName: 'TANYA_SOMASUNDARAM_RESUME.pdf',
        filePath: resumeUploadPath,
        fileSize: stats.size,
        mimeType: 'application/pdf',
        isActive: true,
      },
    });
    console.log('✅ Active resume registered in database');
  }

  console.log('🎉 Tanya Somasundaram PERN Database Seed Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
