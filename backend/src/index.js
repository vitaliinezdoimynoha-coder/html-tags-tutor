import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import tagsRouter from './routes/tags.js';
import questionsRouter from './routes/questions.js';
import resultsRouter from './routes/results.js';

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 5000);
const ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: ORIGIN }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'html-tags-tutor-backend' });
});

app.use('/api/tags', tagsRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/results', resultsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
