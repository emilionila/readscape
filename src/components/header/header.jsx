import React, {useEffect, useState} from 'react';
import './header.scss';
import {NotificationIcon, ProfileIcon} from '../../assets/icons';
import useAuth from "../../db/user";

const Header = () => {
    const user = useAuth();

    const [userName, setUserName] = useState('');
    useEffect(() => {
        if (user) {
            setUserName(user.email);
        }
    }, [user]);

    console.log(userName, 'user')
    const truncatedUserName = userName.length > 10 ? userName.slice(0, 10) + '...' : userName;


    return (
        <header className="header">
            <div className="header__left">
                <span className="header__greeting">Welcome,</span>
                <span className="header__userName">{truncatedUserName}</span>
            </div>
            <div className="header__right">
                <div className="header__button">
                    <NotificationIcon width="24px" height="24px"/>
                </div>
                <div className="header__button">
                    <ProfileIcon width="24px" height="24px"/>
                </div>
            </div>
        </header>
    );
}

export default Header;
