import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uqddffqzhbbzmnaikayl.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZGRmZnF6aGJiem1uYWlrYXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNzA0NjAsImV4cCI6MjA1NTc0NjQ2MH0.placeholder';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function signInWithGoogleReal() {
  const redirectUrl = `${window.location.origin}/auth/callback`;

  if (typeof window !== 'undefined') {
    localStorage.setItem('last_google_auth_email', 'info.zentroax@zentroax.com');
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      console.warn('[Supabase OAuth Warning]:', error.message || error);
      window.location.href = redirectUrl;
    }
  } catch (err) {
    console.warn('[Supabase Auth Exception]:', err);
    window.location.href = redirectUrl;
  }
}


export async function signOutUserReal() {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Supabase signout error:', err);
  }
}
