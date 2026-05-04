import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function useSavedCards() {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCards = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('saved_cards')
      .select('id, name, created_at, updated_at, is_public')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (!error) setCards(data || []);
    setLoading(false);
  }, [user]);

  const saveCard = useCallback(async (name, cardState, isPublic = false) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('saved_cards')
      .insert({
        user_id: user.id,
        name: name.trim() || 'Untitled Card',
        card_state: cardState,
        is_public: isPublic,
      })
      .select()
      .single();

    if (error) throw error;
    await loadCards();
    return data;
  }, [user, loadCards]);

  const loadPublicCards = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('saved_cards')
      .select('*, profiles(username)')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    setLoading(false);
    if (error) throw error;
    return data || [];
  }, []);

  const loadCard = useCallback(async (id) => {
    const { data, error } = await supabase
      .from('saved_cards')
      .select('id, user_id, card_state')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }, []);

  const deleteCard = useCallback(async (id) => {
    if (!user) return;
    const { error } = await supabase
      .from('saved_cards')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
    await loadCards();
  }, [user, loadCards]);

  const updateCard = useCallback(async (id, updates) => {
    if (!user) return;
    const { error } = await supabase
      .from('saved_cards')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
    await loadCards();
  }, [user, loadCards]);

  return { cards, loading, loadCards, saveCard, loadCard, deleteCard, loadPublicCards, updateCard };
}
