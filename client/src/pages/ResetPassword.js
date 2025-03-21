import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const { confirmPassword, setConfirmPassword, ResetPassword } = useUser();
    const navigate = useNavigate();

    const Send = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match, please try again.");
            return;
        }
        const response = await ResetPassword(token, { password });
        if (response.error) {
            toast.error(response.error);
        } else {
            toast.success('Password reset successful!');
            navigate('/login');
        }
    };

    return (
        <div className="reset-pass-container">
            <div className="reset-pass-body">
                <div className="reset-pass-main">
                    <h1 className="h1">Reset Password</h1>

                    <form id="resetPasswordForm" onSubmit={Send}>
                        
                        <div className="input-group">
                            <label className="reset-label" htmlFor="password">New password:</label>
                            <input
                                className="input"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your new password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label className="reset-label" htmlFor="confirmPassword">Confirm password:</label>
                            <input
                                className="input"
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div className="wrap">
                            <button className="button" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
