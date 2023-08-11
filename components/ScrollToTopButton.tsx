"use client"

import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
   setTimeout(()=> window.scrollTo({
      top: 0,
      behavior: 'smooth',
    }), 200);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-4 right-4 p-2 shadow-xl bg-slate-800 rounded-md text-white hover:border-slate-300 hover:border-1 hover:bg-slate-700 ${
        showButton ? 'visible' : 'invisible'
      }`}
      onClick={scrollToTop}
    >
      <ChevronUpIcon className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTopButton;
