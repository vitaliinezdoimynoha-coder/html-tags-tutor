import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

// GET /api/tags?q=&category=
router.get('/', async (req, res, next) => {
  try {
    const q = (req.query.q || '').toString().trim().toLowerCase();
    const category = (req.query.category || '').toString().trim().toLowerCase();

    let sql = 'SELECT id, slug, name, category, description, example_html FROM tags';
    const where = [];
    const params = [];

    if (q) {
      params.push(`%${q}%`);
      where.push('(LOWER(name) LIKE $1 OR LOWER(slug) LIKE $1 OR LOWER(description) LIKE $1)');
    }

    if (category) {
      params.push(category);
      where.push(`LOWER(category) = $${params.length}`);
    }

    if (where.length) {
      sql += ' WHERE ' + where.join(' AND ');
    }

    sql += ' ORDER BY name ASC';

    const result = await query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/tags/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const result = await query(
      'SELECT id, slug, name, category, description, attributes, example_html, notes FROM tags WHERE slug = $1',
      [slug]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
