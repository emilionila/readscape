import React, { useEffect, useState } from 'react';
import './header.scss';
import { NotificationIcon, ProfileIcon } from '../../assets/icons';
import useAuth from "../../db/user";

const Header = () => {
    const user = useAuth();

    const [userName, setUserName] = useState('');
    useEffect(() => {
        if (user) {
            setUserName(user.email);
        }
    }, [user]);

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

    const updateScreenSize = () => {
        setIsLargeScreen(window.innerWidth >= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', updateScreenSize);

        return () => {
            window.removeEventListener('resize', updateScreenSize);
        };
    }, []);

    const displayedUserName = isLargeScreen ? userName : (userName.length > 20 ? userName.slice(0, 20) + '...' : userName);

    return (
        <header className="header">
            <div className="header__left">
                <ul className="header__welcome-list">
                    <li>Welcome,</li>
                    <li>{displayedUserName}</li>
                </ul>
            </div>
            <div className="header__right">
                <div className="header__button">
                    <NotificationIcon width="24px" height="24px" />
                </div>
                <div className="header__button">
                    <ProfileIcon width="24px" height="24px" />
                </div>
            </div>
        </header>
    );
}

export default Header;
