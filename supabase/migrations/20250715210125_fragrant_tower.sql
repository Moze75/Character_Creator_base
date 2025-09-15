/*
  # Add character creation columns to players table

  1. New Columns
    - `armor_class` (integer) - Character's armor class
    - `initiative` (integer) - Initiative modifier
    - `speed` (integer) - Movement speed in feet
    - `proficiency_bonus` (integer) - Proficiency bonus based on level
    - `inspirations` (integer) - Number of inspiration points
    - `strength` (integer) - Strength ability score
    - `dexterity` (integer) - Dexterity ability score
    - `constitution` (integer) - Constitution ability score
    - `intelligence` (integer) - Intelligence ability score
    - `wisdom` (integer) - Wisdom ability score
    - `charisma` (integer) - Charisma ability score
    - `race` (text) - Character race
    - `class` (text) - Character class
    - `background` (text) - Character background
    - `level` (integer) - Character level
    - `hit_points` (integer) - Current hit points
    - `max_hit_points` (integer) - Maximum hit points

  2. Security
    - Maintain existing RLS policies
*/

-- Add missing columns to players table
DO $$
BEGIN
  -- Add armor_class column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'armor_class'
  ) THEN
    ALTER TABLE players ADD COLUMN armor_class integer DEFAULT 10;
  END IF;

  -- Add initiative column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'initiative'
  ) THEN
    ALTER TABLE players ADD COLUMN initiative integer DEFAULT 0;
  END IF;

  -- Add speed column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'speed'
  ) THEN
    ALTER TABLE players ADD COLUMN speed integer DEFAULT 30;
  END IF;

  -- Add proficiency_bonus column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'proficiency_bonus'
  ) THEN
    ALTER TABLE players ADD COLUMN proficiency_bonus integer DEFAULT 2;
  END IF;

  -- Add inspirations column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'inspirations'
  ) THEN
    ALTER TABLE players ADD COLUMN inspirations integer DEFAULT 0;
  END IF;

  -- Add ability score columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'strength'
  ) THEN
    ALTER TABLE players ADD COLUMN strength integer DEFAULT 10;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'dexterity'
  ) THEN
    ALTER TABLE players ADD COLUMN dexterity integer DEFAULT 10;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'constitution'
  ) THEN
    ALTER TABLE players ADD COLUMN constitution integer DEFAULT 10;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'intelligence'
  ) THEN
    ALTER TABLE players ADD COLUMN intelligence integer DEFAULT 10;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'wisdom'
  ) THEN
    ALTER TABLE players ADD COLUMN wisdom integer DEFAULT 10;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'charisma'
  ) THEN
    ALTER TABLE players ADD COLUMN charisma integer DEFAULT 10;
  END IF;

  -- Add character info columns if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'race'
  ) THEN
    ALTER TABLE players ADD COLUMN race text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'class'
  ) THEN
    ALTER TABLE players ADD COLUMN class text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'background'
  ) THEN
    ALTER TABLE players ADD COLUMN background text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'level'
  ) THEN
    ALTER TABLE players ADD COLUMN level integer DEFAULT 1;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'hit_points'
  ) THEN
    ALTER TABLE players ADD COLUMN hit_points integer DEFAULT 8;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'players' AND column_name = 'max_hit_points'
  ) THEN
    ALTER TABLE players ADD COLUMN max_hit_points integer DEFAULT 8;
  END IF;
END $$;