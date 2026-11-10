import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { prisma } from '../config/prisma';
import { analyticsTrackSchema } from '../validators';

export const trackEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = analyticsTrackSchema.parse(req.body);

    const clientIp =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      'anonymous';

    // Hash IP for privacy compliance
    const ipHash = crypto.createHash('sha256').update(clientIp).digest('hex').substring(0, 16);
    const userAgent = req.headers['user-agent'] || 'unknown';

    await prisma.portfolioAnalytics.create({
      data: {
        eventType: validatedData.eventType,
        pagePath: validatedData.pagePath || '/',
        userAgent: userAgent.substring(0, 255),
        ipHash,
        metadata: validatedData.metadata ? JSON.stringify(validatedData.metadata) : null,
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getAnalyticsOverview = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [
      totalPageViews,
      totalProjectViews,
      totalResumeDownloads,
      totalContactSubmissions,
      totalProjects,
      totalBlogPosts,
      totalMessages,
      recentEvents,
    ] = await Promise.all([
      prisma.portfolioAnalytics.count({ where: { eventType: 'PAGE_VIEW' } }),
      prisma.portfolioAnalytics.count({ where: { eventType: 'PROJECT_VIEW' } }),
      prisma.portfolioAnalytics.count({ where: { eventType: 'RESUME_DOWNLOAD' } }),
      prisma.contactMessage.count(),
      prisma.project.count(),
      prisma.blogPost.count(),
      prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
      prisma.portfolioAnalytics.findMany({
        take: 20,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalPageViews,
        totalProjectViews,
        totalResumeDownloads,
        totalContactSubmissions,
        totalProjects,
        totalBlogPosts,
        unreadMessages: totalMessages,
      },
      recentEvents,
    });
  } catch (error) {
    next(error);
  }
};

