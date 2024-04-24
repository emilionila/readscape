import React, { useState, useEffect } from 'react';
import './footer.scss';
import { OpenBookIcon, SearchIcon, CalendarIcon, CommunityIcon } from '../../assets/icons';

const Footer = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardOpen(window.innerHeight < 500);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <footer className={isKeyboardOpen ? 'footer keyboard-open' : 'footer'}>
      <div className="footer__container">
        <div className="footer__button">
          <OpenBookIcon width="30px" height="30px"/>
          <span>Library</span>
        </div>
        <div className="footer__button">
          <SearchIcon width="30px" height="30px"/>
          <span>Search</span>
        </div>
        <div className="footer__button">
          <CalendarIcon width="30px" height="30px"/>
          <span>Analytics</span>
        </div>
        <div className="footer__button">
          <CommunityIcon width="30px" height="30px"/>
          <span>Community</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;