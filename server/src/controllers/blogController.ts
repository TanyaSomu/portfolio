import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { blogPostSchema } from '../validators';

export const getBlogPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, search, all } = req.query;

    const where: any = {};

    // Public only sees published articles unless all=true (with admin auth)
    if (all !== 'true') {
      where.isPublished = true;
    }

    if (category) {
      where.category = {
        slug: String(category),
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: 'insensitive' } },
        { excerpt: { contains: String(search), mode: 'insensitive' } },
        { content: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
      },
    });

    const categories = await prisma.blogCategory.findMany();

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogPostBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const slug = req.params.slug as string;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    // Increment view count asynchronously
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { viewsCount: { increment: 1 } },
    });

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const createBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = blogPostSchema.parse(req.body);

    const slug =
      validatedData.slug ||
      validatedData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const post = await prisma.blogPost.create({
      data: {
        ...validatedData,
        slug,
      },
      include: {
        category: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const validatedData = blogPostSchema.parse(req.body);

    const post = await prisma.blogPost.update({
      where: { id },
      data: validatedData,
      include: {
        category: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;

    await prisma.blogPost.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
