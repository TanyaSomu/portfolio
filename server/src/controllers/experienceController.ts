import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { experienceSchema } from '../validators';

export const getExperiences = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });

    res.status(200).json({
      success: true,
      experiences,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      experiences: [],
    });
  }
};

export const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = experienceSchema.parse(req.body);

    const experience = await prisma.experience.create({
      data: validatedData,
    });

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      experience,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const validatedData = experienceSchema.parse(req.body);

    const experience = await prisma.experience.update({
      where: { id },
      data: validatedData,
    });

    res.status(200).json({
      success: true,
      message: 'Experience updated successfully',
      experience,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    await prisma.experience.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
