import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  return data;
}

export async function updateUserProfile(userId: string, updates: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select();

  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
  return data;
}

export async function saveStoryToJournal(journalEntry: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('story_journal')
    .insert([journalEntry])
    .select();

  if (error) {
    console.error('Error saving story to journal:', error);
    return null;
  }
  return data;
}

export async function getStoryJournal(userId: string, limit = 30) {
  const { data, error } = await supabase
    .from('story_journal')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching story journal:', error);
    return [];
  }
  return data;
}

export async function saveCreativeWriting(writingEntry: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('creative_writings')
    .insert([writingEntry])
    .select();

  if (error) {
    console.error('Error saving creative writing:', error);
    return null;
  }
  return data;
}

export async function getCreativeWritings(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from('creative_writings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching creative writings:', error);
    return [];
  }
  return data;
}
