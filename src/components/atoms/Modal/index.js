import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // When opening, render the modal and then make it visible
      document.body.style.overflow = "hidden";
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10); // Small delay to trigger the animation
    } else {
      // When closing, make the modal invisible and then remove it from the DOM after the animation
      document.body.style.overflow = "auto";
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300); // Match the duration of the animation
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose} // Close modal when clicking outside
    >
      <div
        className={`bg-[#262624] p-6 shadow-lg w-11/12 max-w-md transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;