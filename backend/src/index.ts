import dotenv from 'dotenv';

// CHARGER DOTENV EN PREMIER !
dotenv.config();

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { handleAuthError } from './middleware/auth';
import alertsRouter from './routes/alerts';

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Manitty Alert API',
  });
});

app.use('/api/alerts', alertsRouter);
app.use(handleAuthError);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Auth0 configured: ${!!process.env.AUTH0_AUDIENCE}`);
});
