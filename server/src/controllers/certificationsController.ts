import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { certificationSchema } from '../validators';

export const getCertifications = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { order: 'asc' },
    });

    const achievements = await prisma.achievement.findMany({
      orderBy: { order: 'asc' },
    });

    res.status(200).json({
      success: true,
      certifications,
      achievements,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      certifications: [],
      achievements: [],
    });
  }
};

export const createCertification = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = certificationSchema.parse(req.body);

    const certification = await prisma.certification.create({
      data: validatedData,
    });

    res.status(201).json({
      success: true,
      message: 'Certification added successfully',
      certification,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCertification = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const validatedData = certificationSchema.parse(req.body);

    const certification = await prisma.certification.update({
      where: { id },
      data: validatedData,
    });

    res.status(200).json({
      success: true,
      message: 'Certification updated successfully',
      certification,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCertification = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    await prisma.certification.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
