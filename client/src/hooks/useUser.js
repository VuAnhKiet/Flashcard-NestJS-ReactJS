import { useState } from 'react';
import { toast } from 'react-toastify';
import {
    fetchUser,
    userRegister,
    userLogin,
    userSendResetLink,
    userResetPassWord,
    userLogout
} from "../services/userService";

export const useUser = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('')



    const Login = async () => {
        const data = { fullname: username, password: password }
        try {
            const response = await userLogin(data);
            return response;
        } catch (err) {
            return { error: err.response?.data?.error || "Login failed" };
        }
    }

    const Logout = async () => {
        try {
            await userLogout();
        } catch (err) {
            return err;
        }
    }

    const FetchUser = async () => {
        try {
            await fetchUser();
        } catch (err) {
            console.log(err);
        }
    }

    const Register = async (data) => {
        try {
            const response = await userRegister(data);
            return response;
        } catch (err) {
            return { error: err.response?.data?.message || "Registration failed" };
        }
    }

    const ResetLink = async () => {
        try {
            const response = await userSendResetLink(email);
            toast.success('Please check your email');
        } catch (err) {
            if (err.response && err.response.status === 404) {
                toast.error('User not found. Please check the email address.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        }
    }

    const ResetPassword = async (token) => {
        try {
            const response = await userResetPassWord(token, confirmPassword);
        } catch (err) {
            alert(err)
        }
    }

    return {
        Login,
        Logout,
        FetchUser,
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        Register,
        email,
        setEmail,
        ResetLink,
        ResetPassword,
    };
}