/*
  # Chat Messages Schema

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `content` (text) - Message content
      - `is_user` (boolean) - True if message is from user, false if from Eva
      - `timestamp` (timestamptz) - When message was sent
      - `read` (boolean) - Whether message has been read
      - `created_at` (timestamptz)
    
    - `quick_actions`
      - `id` (uuid, primary key)
      - `label` (text) - Action button label
      - `icon` (text) - Icon name
      - `order` (integer) - Display order
      - `active` (boolean) - Whether action is currently shown
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public access (since this is a demo chatbot)
*/

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  is_user boolean NOT NULL DEFAULT true,
  timestamp timestamptz DEFAULT now(),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quick_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  icon text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  active boolean DEFAULT true
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quick_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read messages"
  ON messages FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update messages"
  ON messages FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can read quick actions"
  ON quick_actions FOR SELECT
  USING (true);

INSERT INTO quick_actions (label, icon, "order", active) VALUES
  ('Browse Products', 'ShoppingBag', 1, true),
  ('Track Order', 'Package', 2, true),
  ('Get Support', 'Headphones', 3, true),
  ('Special Offers', 'Sparkles', 4, true)
ON CONFLICT DO NOTHING;