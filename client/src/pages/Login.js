import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Custom Hooks
import { useUser } from '../hooks/useUser';

// Context
import { useAuth } from '../AuthContext';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { Login, setUsername, setPassword, username, password } = useUser();
    const { loginHandle } = useAuth();
    const navigate = useNavigate();

    // Handle login form submission
    const login = async (e) => {
        e.preventDefault();
        const response = await Login();
        if (response.error) {
            toast.error(response.error);
            console.log(response.error);
        } else {
            loginHandle(response.access_token)
            toast.success("Login successful! Welcome back!");
            navigate('/');
        }
    };

    // Toggle password visibility
    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="login-body">
            <div className="login-main">
                <h1 className="login-title">LOGIN</h1>

                <form onSubmit={login}>
                    <div className="input-group">
                        <label className="label" htmlFor="username">Username:</label>
                        <input
                            className="login-input"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your Username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label className="label" htmlFor="password">Password:</label>
                        <input
                            className="login-input"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Enter your Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="options">
                        <div className="show-password">
                            <input
                                type="checkbox"
                                id="show-password"
                                checked={showPassword}
                                onChange={toggleShowPassword}
                            />
                            <label htmlFor="show-password">Show password</label>
                        </div>
                        <Link to="/forgotpassword" className="forgot-password">Forgot password?</Link>
                    </div>

                    <div className="wrap">
                        <button className="login-button" type="submit">
                            Login
                        </button>
                    </div>
                </form>

                <div className="register">
                    Not registered? 
                    <Link to="/registration" className="register-link">Create an account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
