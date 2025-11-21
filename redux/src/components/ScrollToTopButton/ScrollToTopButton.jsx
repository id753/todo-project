import React, { useEffect, useState } from 'react';
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
    <button
      className="rounded-2 opacity- (--transition) fixed right-[20px] bottom-[20px] z-1000 h-[30px] w-[30px] cursor-pointer rounded-[8px] border-none bg-(--color-utility) p-[2px] font-[600] text-(--color-white) transition duration-(--transition) hover:bg-(--color-utility-hover)"
      onClick={scrollToTop}
      type="button"
    >
      <UpIcon />
    </button>
  );
};

export default ScrollToTopButton;
