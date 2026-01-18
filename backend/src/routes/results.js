import { Router } from "express";
import { z } from "zod";
import { query } from "../db.js";

const router = Router();

const ResultSchema = z.object({
  score: z.number().int().nonnegative(),
  total: z.number().int().positive(),
  sessionId: z.string().min(5).max(100).optional(),
  details: z.any().optional(),
});

router.get("/", async (req, res, next) => {
  try {
    const r = await query(
      `SELECT id, score, total, created_at
       FROM results
       ORDER BY created_at DESC
       LIMIT 20`
    );
    res.json(r.rows);
  } catch (err) {
    next(err);
  }
});


router.post("/", async (req, res, next) => {
  try {
    const parsed = ResultSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid payload", details: parsed.error.issues });
    }

    const { sessionId, score, total, details } = parsed.data;

    if (sessionId) {
      const r = await query(
        `INSERT INTO results (session_id, score, total, details, created_at)
         VALUES ($1, $2, $3, $4, NOW())
         RETURNING id, session_id, score, total, created_at`,
        [sessionId, score, total, details ?? null]
      );
      return res.status(201).json(r.rows[0]);
    } else {
      const r = await query(
        `INSERT INTO results (score, total, created_at)
         VALUES ($1, $2, NOW())
         RETURNING id, score, total, created_at`,
        [score, total]
      );
      return res.status(201).json(r.rows[0]);
    }
  } catch (err) {
    next(err);
  }
});


router.get("/latest", async (req, res, next) => {
  try {
    const sessionId = (req.query.sessionId || "").toString();
    if (!sessionId) {
      return res.status(400).json({ error: "sessionId is required" });
    }

    const r = await query(
      `SELECT id, session_id, score, total, details, created_at
       FROM results
       WHERE session_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [sessionId]
    );

    if (!r.rows.length) {
      return res.status(404).json({ error: "No results yet" });
    }

    res.json(r.rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
