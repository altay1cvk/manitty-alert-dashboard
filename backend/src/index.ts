import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import alertsRouter from './routes/alerts';
import { checkJwt, handleAuthError } from './middleware/auth';

dotenv.config();

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

app.use('/api/alerts', checkJwt, alertsRouter);
app.use(handleAuthError);

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔐 Auth0 configured: ${!!process.env.AUTH0_AUDIENCE}`);
});
