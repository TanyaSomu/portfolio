import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { prisma } from '../config/prisma';

export const getActiveResume = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const resume = await prisma.resume.findFirst({
      where: { isActive: true },
      orderBy: { uploadedAt: 'desc' },
    });

    if (!resume) {
      res.status(200).json({
        success: true,
        available: false,
        message: 'No active resume uploaded yet. You can upload one via the Admin Dashboard.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      available: true,
      resume: {
        id: resume.id,
        fileName: resume.fileName,
        originalName: resume.originalName,
        fileSize: resume.fileSize,
        uploadedAt: resume.uploadedAt,
        downloadCount: resume.downloadCount,
      },
    });
  } catch (error) {
    // Graceful fallback if database credentials are not yet configured
    res.status(200).json({
      success: true,
      available: false,
      message: 'No active resume uploaded yet. You can upload one via the Admin Dashboard.',
    });
  }
};

export const downloadResume = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const resume = await prisma.resume.findFirst({
      where: { isActive: true },
      orderBy: { uploadedAt: 'desc' },
    });

    if (!resume || !fs.existsSync(resume.filePath)) {
      res.status(404).json({
        success: false,
        message: 'Resume file is currently unavailable or has not been uploaded yet.',
      });
      return;
    }

    // Increment download count
    await prisma.resume.update({
      where: { id: resume.id },
      data: { downloadCount: { increment: 1 } },
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(resume.originalName)}"`
    );

    const stream = fs.createReadStream(resume.filePath);
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
};

export const previewResume = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const resume = await prisma.resume.findFirst({
      where: { isActive: true },
      orderBy: { uploadedAt: 'desc' },
    });

    if (!resume || !fs.existsSync(resume.filePath)) {
      res.status(404).json({
        success: false,
        message: 'Resume PDF is not available for preview.',
      });
      return;
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');

    const stream = fs.createReadStream(resume.filePath);
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
};

export const uploadNewResume = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid PDF file to upload.',
      });
      return;
    }

    // Deactivate previous active resumes
    await prisma.resume.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    const newResume = await prisma.resume.create({
      data: {
        fileName: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        isActive: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Resume uploaded and activated successfully.',
      resume: newResume,
    });
  } catch (error) {
    next(error);
  }
};

export const listAllResumes = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const resumes = await prisma.resume.findMany({
      orderBy: { uploadedAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    next(error);
  }
};
