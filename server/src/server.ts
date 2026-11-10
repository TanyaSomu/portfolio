import { createApp } from './app';
import { ENV } from './config/env';
import { prisma } from './config/prisma';

const app = createApp();

const startServer = async () => {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log('✅ PostgreSQL database connected successfully via Prisma');
  } catch (dbError) {
    console.warn(
      '⚠️ Database connection notice: Could not connect to PostgreSQL immediately.',
      (dbError as any)?.message || dbError
    );
    console.log('ℹ️ Server will continue running; check DATABASE_URL credentials if migrations are needed.');
  }

  const server = app.listen(ENV.PORT, () => {
    console.log(`🚀 Production Developer Portfolio Backend running on http://localhost:${ENV.PORT}`);
    console.log(`📡 Environment: ${ENV.NODE_ENV}`);
  });

  const gracefulShutdown = async () => {
    console.log('Stopping server gracefully...');
    server.close(async () => {
      await prisma.$disconnect();
      console.log('Server and database connections closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
};

startServer();

