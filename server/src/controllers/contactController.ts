import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { contactMessageSchema } from '../validators';
import { sendContactNotification } from '../services/emailService';

export const submitContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = contactMessageSchema.parse(req.body);

    const clientIp =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      'unknown';

    // 1. Save to PostgreSQL database
    const message = await prisma.contactMessage.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        ipAddress: clientIp,
        status: 'UNREAD',
      },
    });

    // 2. Send email notification via Resend asynchronously (graceful fallback)
    sendContactNotification({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
    }).catch((emailErr) => {
      console.error('[ContactController] Background email notification failed:', emailErr);
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. Thank you!',
      messageId: message.id,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = req.query;

    const where: any = {};
    if (status) {
      where.status = String(status);
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const unreadCount = await prisma.contactMessage.count({
      where: { status: 'UNREAD' },
    });

    res.status(200).json({
      success: true,
      count: messages.length,
      unreadCount,
      messages,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMessageStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    if (!['UNREAD', 'READ', 'REPLIED', 'ARCHIVED'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
      return;
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({
      success: true,
      message: 'Message status updated',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    await prisma.contactMessage.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
