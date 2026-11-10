import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { skillSchema } from '../validators';

export const getSkills = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        skills: {
          orderBy: { order: 'asc' },
        },
      },
    });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      categories: [],
    });
  }
};

export const createSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = skillSchema.parse(req.body);

    const skill = await prisma.skill.create({
      data: validatedData,
    });

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      skill,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const validatedData = skillSchema.parse(req.body);

    const skill = await prisma.skill.update({
      where: { id },
      data: validatedData,
    });

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      skill,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    await prisma.skill.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
