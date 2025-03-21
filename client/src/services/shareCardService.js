import { get, post, put, del } from './api';

export const fetchShareCards = async () => {
    return await get('/share-card-section');
};

export const addToShare = async (card) => {
    return await post('/share-card-section/add', card);
};

export const deleteShareCard = async (cardId) => {
    return await del(`/share-card-section/remove-from-section/${cardId}`);
};

export const getFriendsShareSetCard = async (id) => {
    return await get(`/share-card-section/friend-set-card/${id}`)
}

export const getFriendsShareCard = async (id) => {
    return await get(`/share-card-section/friend-card/${id}`)
}
