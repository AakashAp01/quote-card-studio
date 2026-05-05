import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recoveryMode, setRecoveryMode] = useState(false);

  const fetchProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null);
      return;
    }
    
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error || !data) {
        // If profile missing but user exists, try to auto-create it (self-healing)
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.id === userId) {
          const username = user.user_metadata?.username || user.email?.split('@')[0] || 'User';
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .upsert({
              id: userId,
              username: username,
              email: user.email,
              updated_at: new Date().toISOString()
            })
            .select()
            .single();
          
          if (!insertError) {
            data = newProfile;
          }
        }
      }
      setProfile(data);
    } catch (err) {
      console.error('Error fetching/creating profile:', err);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      fetchProfile(u?.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      fetchProfile(u?.id);
      if (event === 'PASSWORD_RECOVERY') {
        setRecoveryMode(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signUp = useCallback(async (email, password, username) => {
    // 1. Check if username exists in profiles first to give immediate error
    const { data: existing } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existing) throw new Error('Username already taken');

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { username }
      }
    });

    if (error) throw error;

    // 2. Manually create profile record if user is created (and possibly auto-logged in)
    if (data?.user) {
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            username: username.trim(),
            email: email.trim(),
            updated_at: new Date().toISOString()
          });
      } catch (profileErr) {
        console.warn('Profile record creation delayed or failed:', profileErr.message);
        // We don't throw here to avoid blocking the signup flow if RLS is strict
      }
    }

    return data;
  }, []);

  const signIn = useCallback(async (identifier, password) => {
    let email = identifier;

    // Check if identifier is an email (contains @)
    if (!identifier.includes('@')) {
      // It's a username, look up the email
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', identifier)
        .single();

      if (profileError || !profile) {
        throw new Error('User not found');
      }
      email = profile.email;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }, []);

  const resetPassword = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
    });
    if (error) throw error;
  }, []);

  const updatePassword = useCallback(async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    setRecoveryMode(false);
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      loading, 
      recoveryMode, 
      setRecoveryMode, 
      signUp, 
      signIn, 
      signOut, 
      resetPassword, 
      updatePassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
