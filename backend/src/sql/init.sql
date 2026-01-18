CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  attributes JSONB NOT NULL DEFAULT '[]'::jsonb,
  example_html TEXT NOT NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  prompt TEXT NOT NULL,
  options JSONB NOT NULL,
  answer_index INTEGER NOT NULL,
  explanation TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS results (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  details JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
