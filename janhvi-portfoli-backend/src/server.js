import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';
import { isAuthEnabled } from './config/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use('/images', express.static(join(__dirname, '..', 'public', 'images'), {
  maxAge: '7d',
  immutable: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/config', (_req, res) => {
  res.json({ authEnabled: isAuthEnabled() });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
