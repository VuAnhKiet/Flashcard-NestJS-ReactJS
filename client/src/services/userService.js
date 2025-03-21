import { get, post, put, del,patch } from './api';

export const fetchUser = async () => {
    return await get('/auth');
};

export const userRegister = async (data) => {
    return await post('/auth/register',data);
};

export const userLogin = async (data) => {
    return await post('/auth/login',data);
};

export const userSendResetLink = async (email) => {
    return await post('auth/reset-password',{email:email})
}

export const userResetPassWord = async (token,data) => {
    return await patch (`auth/reset-password/${token}`,{newPassword:data})
}

export const userLogout = async () => {
    return await post('auth/logout');
}

