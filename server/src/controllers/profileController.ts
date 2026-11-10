import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { profileSchema } from '../validators';

export const getProfile = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let profile = await prisma.profile.findFirst();

    // If no profile exists yet, create an initial editable profile record
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          fullName: '[Your Name]',
          title: '[Full-Stack Developer & Database Architect]',
          headline: 'Designing resilient architectures, scalable backends, and creative interactive web applications.',
          bio: 'Full-stack software developer with expertise in the PERN stack, relational schema architecture, API optimization, and modern React interfaces.',
          location: 'Available Globally / Remote',
          email: 'contact@portfolio.local',
          githubUrl: 'https://github.com',
          linkedinUrl: 'https://linkedin.com',
          availableForHire: true,
          statusMessage: 'Open to high-impact software engineering roles',
        },
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      profile: {
        id: 'default',
        fullName: '[Your Name]',
        title: '[Full-Stack Developer & Database Architect]',
        headline: 'Designing resilient architectures, scalable backends, and creative interactive web applications.',
        bio: 'Full-stack software developer with expertise in the PERN stack, relational schema architecture, API optimization, and modern React interfaces.',
        location: 'Available Globally / Remote',
        email: 'contact@portfolio.local',
        githubUrl: 'https://github.com',
        linkedinUrl: 'https://linkedin.com',
        availableForHire: true,
        statusMessage: 'Open to high-impact software engineering roles',
        updatedAt: new Date().toISOString(),
      },
    });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = profileSchema.parse(req.body);

    let profile = await prisma.profile.findFirst();

    if (!profile) {
      profile = await prisma.profile.create({
        data: validatedData as any,
      });
    } else {
      profile = await prisma.profile.update({
        where: { id: profile.id },
        data: validatedData as any,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile,
    });
  } catch (error) {
    next(error);
  }
};
