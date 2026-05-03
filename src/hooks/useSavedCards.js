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
      .select('id, name, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (!error) setCards(data || []);
    setLoading(false);
  }, [user]);

  const saveCard = useCallback(async (name, cardState) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('saved_cards')
      .insert({
        user_id: user.id,
        name: name.trim() || 'Untitled Card',
        card_state: cardState,
      })
      .select()
      .single();

    if (error) throw error;
    await loadCards();
    return data;
  }, [user, loadCards]);

  const loadCard = useCallback(async (id) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('saved_cards')
      .select('card_state')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data.card_state;
  }, [user]);

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

  return { cards, loading, loadCards, saveCard, loadCard, deleteCard };
}
