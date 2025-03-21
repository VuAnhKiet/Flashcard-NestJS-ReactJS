import { get, post, put, del } from './api';

export const fetchSetCards = async () => {
    return await get('/group-card');
};

export const createSetCard = async (flashcard) => {
    return await post('/group-card', flashcard);
};

export const updateSetCard = async ({name,id}) => {
    return await put(`/group-card`, {name:name,id:id});
};

export const deleteSetCard = async (id) => {
    return await del(`/group-card/${id}`);
};

export const searchSetCard = async (s) => {
    return await get('/group-card/search', { params: {s} }); 
};
