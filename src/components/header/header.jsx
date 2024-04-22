import React from 'react';
import './header.scss';
import { NotificationIcon, ProfileIcon } from '../../assets/icons';

const Header = () => {
  const userName = "User";

  return (
    <header className="header">
      <div className="header__left">
        <span className="header__greeting">Welcome,</span>
        <span className="header__userName">{userName}</span>
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