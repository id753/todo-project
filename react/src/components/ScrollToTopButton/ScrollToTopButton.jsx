import React, { useEffect, useState } from 'react';
import s from './ScrollToTopButton.module.css';
import { UpIcon } from '../../components/Icons/ActionIcons';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }
  return (
    <button className={s.scroll_to_top} onClick={scrollToTop} type="button">
      <UpIcon />
    </button>
  );
};

export default ScrollToTopButton;
