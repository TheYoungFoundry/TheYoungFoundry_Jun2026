-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  child_name TEXT NOT NULL,
  grade INTEGER DEFAULT 3 CHECK (grade >= 1 AND grade <= 6),
  preferred_themes TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Story Journal Table (tracks stories read by each user)
CREATE TABLE IF NOT EXISTS story_journal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  theme TEXT NOT NULL,
  grade INTEGER NOT NULL,
  seconds INTEGER DEFAULT 0,
  words INTEGER DEFAULT 0,
  rating INTEGER DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  child_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Creative Writing Submissions Table
CREATE TABLE IF NOT EXISTS creative_writings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  story_id TEXT,
  story_title TEXT,
  content TEXT NOT NULL,
  grade INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Word Progress Table (tracks words learned by each user)
CREATE TABLE IF NOT EXISTS word_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  word_telugu TEXT NOT NULL,
  word_english TEXT,
  times_seen INTEGER DEFAULT 1,
  mastered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, word_telugu)
);

-- Story Performance Table (tracks comprehension scores)
CREATE TABLE IF NOT EXISTS story_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  story_title TEXT NOT NULL,
  theme TEXT,
  questions_total INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  percentage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_story_journal_user_id ON story_journal(user_id);
CREATE INDEX IF NOT EXISTS idx_story_journal_created_at ON story_journal(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_creative_writings_user_id ON creative_writings(user_id);
CREATE INDEX IF NOT EXISTS idx_word_progress_user_id ON word_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_story_performance_user_id ON story_performance(user_id);

-- Enable Row Level Security (if needed for multi-user setup)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE creative_writings ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_performance ENABLE ROW LEVEL SECURITY;

-- Optional: Create policies for RLS (uncomment if using auth)
-- CREATE POLICY "Users can view own profile" ON user_profiles
--   FOR SELECT USING (auth.uid() = id);
--
-- CREATE POLICY "Users can update own profile" ON user_profiles
--   FOR UPDATE USING (auth.uid() = id);
