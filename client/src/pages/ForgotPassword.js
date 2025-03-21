import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function ForgotPassword() {
    const { email, setEmail, ResetLink } = useUser();

    const Send = async (e) => {
        e.preventDefault();
        await ResetLink();
    };

    return (
        <div className="forgot-pass-body">
            <div className="forgot-pass-main">
                <h1 className="forgot-title">Forgot Password</h1>

                <form id="forgotPasswordForm" onSubmit={Send}>
                    <div className="input-group">
                        <label className="login-label" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="wrap">
                        <button className="button" type="submit">
                            Send Reset Link
                        </button>
                    </div>
                </form>

                <div className="register">
                    Remembered your password?{' '}
                    <Link to="/login" className="register-link">
                        Go back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
