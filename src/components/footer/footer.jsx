import React, { useState, useEffect } from 'react';
import './footer.scss';
import { ProfileIcon, OpenBookIcon } from '../../assets/icons';

const Footer = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardOpen(window.innerHeight !== window.outerHeight);
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
          <OpenBookIcon width="50px" height="50px"/>
        </div>
        <div className="footer__button">
          <ProfileIcon width="50px" height="50px"/> 
        </div>
      </div>
    </footer>
  );
}

export default Footer;
