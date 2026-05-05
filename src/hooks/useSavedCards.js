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
    try {
      // 1. Fetch public cards directly (without join) to ensure we get data
      const { data: cards, error: cardsError } = await supabase
        .from('saved_cards')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (cardsError) throw cardsError;
      if (!cards || cards.length === 0) return [];

      // 2. Fetch profiles for these cards separately
      const userIds = [...new Set(cards.map(c => c.user_id))].filter(Boolean);
      
      let profileMap = {};
      if (userIds.length > 0) {
        const { data: profiles, error: profileError } = await supabase
          .from('profiles')
          .select('id, username')
          .in('id', userIds);
        
        if (!profileError && profiles) {
          profiles.forEach(p => {
            profileMap[p.id] = p;
          });
        }
      }

      // 3. Manually merge the data
      const mergedData = cards.map(card => ({
        ...card,
        profiles: profileMap[card.user_id] || null
      }));

      return mergedData;
    } finally {
      setLoading(false);
    }
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
