import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { apiRateLimiter } from './middleware/rateLimiter';
import { ENV } from './config/env';

export const createApp = (): Application => {
  const app = express();

  // Security headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false, // Allows flexible image & PDF previews
    })
  );

  // CORS configuration
  app.use(
    cors({
      origin: [ENV.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body and cookie parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Rate limiting for general API requests
  app.use('/api', apiRateLimiter);

  // Static uploads directory for images and public assets
  const uploadsPath = path.resolve(__dirname, '../uploads');
  app.use('/uploads', express.static(uploadsPath));

  // Mount API endpoints
  app.use('/api', routes);

  // Serve Client Build (Production & Standalone)
  const clientDistPath = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(clientDistPath));

  app.get('*', (req: Request, res: Response) => {
    // If request is not an API call, serve React index.html
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      const indexPath = path.join(clientDistPath, 'index.html');
      res.sendFile(indexPath, (err) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: 'API route not found.',
          });
        }
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: 'API route not found.',
    });
  });

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
};
