import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db.js';

const router = Router();


router.get('/', async (req, res, next) => {
  try {
    const count = Math.min(Math.max(parseInt(req.query.count || '10', 10), 1), 50);

const result = await query(
  `SELECT id, prompt, options, answer_index, explanation
   FROM questions
   ORDER BY id ASC
   LIMIT 10`
);
res.json(result.rows);

  } catch (err) {
    next(err);
  }
});

const GradeSchema = z.object({
  answers: z.array(
    z.object({
      id: z.number().int().positive(),
      selectedIndex: z.number().int().nonnegative(),
    })
  ).min(1)
});


router.post('/grade', async (req, res, next) => {
  try {
    const parsed = GradeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid payload', details: parsed.error.issues });
    }

    const answers = parsed.data.answers;
    const ids = answers.map(a => a.id);

    const dbRes = await query(
      `SELECT id, answer_index, explanation FROM questions WHERE id = ANY($1::int[])`,
      [ids]
    );

    const correctMap = new Map(dbRes.rows.map(r => [r.id, r]));

    let score = 0;
    const details = answers.map(a => {
      const row = correctMap.get(a.id);
      const correctIndex = row?.answer_index ?? -1;
      const isCorrect = a.selectedIndex === correctIndex;
      if (isCorrect) score += 1;

      return {
        id: a.id,
        selectedIndex: a.selectedIndex,
        correctIndex,
        isCorrect,
        explanation: row?.explanation || '',
      };
    });

    res.json({ score, total: answers.length, details });
  } catch (err) {
    next(err);
  }
});

export default router;
