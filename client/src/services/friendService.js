import { get, post, put, del } from './api';

export const fetchFriends = async (id) => {
    return await get(`/user/get-friends`);
};

export const sendRequest = async (id) => {
    return await post('/user/send-request',{receiverId:id});
};

export const getPendingRequest = async () => {
    return await get(`/user/pending`);
};

export const acceptFriend = async (id) => {
    return await put(`/user/accept/${id}`);
};

export const rejectFriend = async (id) => {
    return await put(`/user/reject/${id}`); 
};

export const searchFriends = async (s) => {
    return await get('/user/search-friends',{params:{s}});
}

export const unFriend = async (id) => {
    return await del(`/user/unfriend/${id}`)
}