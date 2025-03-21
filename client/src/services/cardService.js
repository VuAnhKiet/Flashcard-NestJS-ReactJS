import { get, post, put, del } from './api';

// Fetch all cards
export const fetchCards = async (id) => {
    return await get(`/group-card/byId/${id}`);
};

// Create a new card
export const createCard = async (flashcard) => {
    return await post('/cards', flashcard);
};

// Update an existing card
export const updateCard = async ({ id, word, definition }) => {
    return await put(`/card`, { id, word, definition });
};

// Delete a card
export const deleteCard = async (id) => {
    return await del(`/card/${id}`);
};

//Search a card
export const searchCard = async ({ s, groupCardId }) => {
    return await get('/card/search', { params: { s, groupCardId } }); 
};
