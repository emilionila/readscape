import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log('User signed out successfully');
            navigate('/');
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;
