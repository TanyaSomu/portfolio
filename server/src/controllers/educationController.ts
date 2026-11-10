import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { educationSchema } from '../validators';

export const getEducation = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: 'asc' },
    });

    res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      education: [],
    });
  }
};

export const createEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = educationSchema.parse(req.body);

    const education = await prisma.education.create({
      data: validatedData,
    });

    res.status(201).json({
      success: true,
      message: 'Education record added successfully',
      education,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const validatedData = educationSchema.parse(req.body);

    const education = await prisma.education.update({
      where: { id },
      data: validatedData,
    });

    res.status(200).json({
      success: true,
      message: 'Education record updated successfully',
      education,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    await prisma.education.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Education record deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
