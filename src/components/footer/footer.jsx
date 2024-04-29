import React, { useState, useEffect } from 'react';
import './footer.scss';
import { BookIcon, SearchIcon, CalendarIcon, CommunityIcon } from '../../assets/icons';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const location = useLocation();

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
        <Link to="/inProgress" className={location.pathname === '/inProgress' ? 'footer__button active' : 'footer__button'}>
          <BookIcon width="30px" height="30px" color={location.pathname === '/inProgress' ? '#ffffff' : '#000000'}/>
          <span>Library</span>
        </Link>
        <Link to="/search" className={location.pathname === '/search' ? 'footer__button active' : 'footer__button'}>
          <SearchIcon width="30px" height="30px" color={location.pathname === '/search' ? '#ffffff' : '#000000'} />
          <span>Search</span>
        </Link>
        <Link to="/analytics" className={location.pathname === '/analytics' ? 'footer__button active' : 'footer__button'}>
          <CalendarIcon width="30px" height="30px" color={location.pathname === '/analytics' ? '#ffffff' : '#000000'} />
          <span>Analytics</span>
        </Link>
        <Link to="/community" className={location.pathname === '/community' ? 'footer__button active' : 'footer__button'}>
          <CommunityIcon width="30px" height="30px" color={location.pathname === '/community' ? '#ffffff' : '#000000'}/>
          <span>Community</span>
        </Link>
      </div>
    </footer>

  );
}

export default Footer;
