import React, { useState, useEffect } from 'react';

const Modal = () => {
  const [isShown, setIsShown] = useState(false);

  const showModal = () => {
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
  };

  const dynammicModalClass = () => (isShown ? { display: 'block' } : '');

  useEffect(() => {
    if (!sessionStorage.popupModal) {
      const timer = setTimeout(() => {
        setIsShown(true);
        sessionStorage.popupModal = 1;
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return isShown ? <h3>Modal content</h3> : null
}