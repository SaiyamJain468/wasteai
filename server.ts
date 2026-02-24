import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { createServer as createViteServer } from 'vite';
import connectDB from './server/config/db';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes (Placeholders for now, will implement controllers next)
import authRoutes from './server/routes/authRoutes';
import wasteRoutes from './server/routes/wasteRoutes';
import classifyRoutes from './server/routes/classifyRoutes';
import leaderboardRoutes from './server/routes/leaderboardRoutes';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000; // Hardcoded as per environment restrictions

  // Connect to Database
  await connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'WasteAI Backend is running' });
  });

  app.get('/api/status', (req, res) => {
    const state = mongoose.connection.readyState;
    const status = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    res.json({ 
      dbState: status[state] || 'unknown',
      dbHost: mongoose.connection.host 
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/waste', wasteRoutes);
  app.use('/api/classify', classifyRoutes);
  app.use('/api/leaderboard', leaderboardRoutes);

  // Vite Middleware (for Development)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving (if needed, though usually handled by build)
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
