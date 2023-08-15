import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../store/actions/user.actions';
import { userService } from '../services/user.service';

export default function PasswordResetPage() {
    const { token } = useParams();
    const [showForm, setShowForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New loading state
    const dispatch = useDispatch();

    useEffect(() => {
        async function validateToken() {
            try {
                const message = await userService.getByResetToken(token);
                console.log('Response message:', message);

                if (message === 'Token is valid') {
                    setShowForm(true);
                } else if (message === 'Invalid or expired token') {
                    setErrorMessage('Invalid or expired token. Please request a new password reset.');
                }
            } catch (error) {
                console.error('Error validating token:', error);
            }
        }

        validateToken();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true); // Set loading to true when starting the process
        try {
            await dispatch(resetPassword(token, newPassword));
            setSuccessMessage('Password reset successfully!');
        } catch (error) {
            setErrorMessage('Error resetting password. Please try again.');
            console.log('Error resetting password:', error);
        } finally {
            setIsLoading(false); // Reset loading to false when the process is complete
        }
    };

    return (
        <div className="reset-password-page">
            <div className="reset-password-form">
                {showForm ? (
                    <form className='form' onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="newPassword">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                className="input-field"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="reset-button" disabled={isLoading}>
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                ) : (
                    <p className="error-message">{errorMessage || 'Invalid or expired token. Please request a new password reset.'}</p>
                )}

                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
}
