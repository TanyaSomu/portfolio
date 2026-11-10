import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { ENV } from '../config/env';
import { loginSchema } from '../validators';
import { AuthRequest } from '../middleware/auth';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // Check if an admin exists; if no admin user exists in DB, initialize the default one
    let admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    const adminCount = await prisma.adminUser.count();
    if (adminCount === 0 && email === (process.env.ADMIN_EMAIL || 'admin@portfolio.local')) {
      const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'Admin@Portfolio2026';
      if (password === defaultPassword) {
        const hashedPassword = await bcrypt.hash(defaultPassword, 12);
        admin = await prisma.adminUser.create({
          data: {
            email,
            passwordHash: hashedPassword,
            name: 'Portfolio Administrator',
            role: 'ADMIN',
          },
        });
      }
    }

    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.',
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password credentials.',
      });
      return;
    }

    // Sign JWT Token
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set secure HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const admin = await prisma.adminUser.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!admin) {
      res.status(404).json({
        success: false,
        message: 'Admin user not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: admin,
    });
  } catch (error) {
    next(error);
  }
};

