import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { projectSchema } from '../validators';

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { featured, search, tech } = req.query;

    const where: any = {};

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: 'insensitive' } },
        { summary: { contains: String(search), mode: 'insensitive' } },
        { technologies: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    if (tech) {
      where.technologies = { contains: String(tech), mode: 'insensitive' };
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      count: 0,
      projects: [],
    });
  }
};

export const getProjectBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const slug = req.params.slug as string;

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found',
      });
      return;
    }

    // Increment view counter asynchronously
    await prisma.project.update({
      where: { id: project.id },
      data: { viewsCount: { increment: 1 } },
    });

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = projectSchema.parse(req.body);

    const slug =
      validatedData.slug ||
      validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        slug,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const validatedData = projectSchema.parse(req.body);

    const project = await prisma.project.update({
      where: { id },
      data: validatedData,
    });

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    await prisma.project.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
