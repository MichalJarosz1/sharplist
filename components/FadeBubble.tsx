import { useState, useEffect, ReactNode } from 'react';

interface FadeBubbleProps
{
  delay: number | 2000; //ms
  children?: ReactNode;
  containerStyle: string | "";
  isShown: boolean | false;
}


//not tested
export default function Popup({delay, children, containerStyle, isShown}: FadeBubbleProps)
{
  const [showPopup, setShowPopup] = useState(isShown);

  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(false);
      }, delay); // Dymek zniknie po 2 sekundach (2000ms)

      return () => clearTimeout(timeout);
    }
  }, [showPopup]);

  return (
    <div>
      {showPopup && (
        <div className={`${containerStyle} fixed bottom-5 right-5 p-3 bg-blue-500 text-white rounded-md transition-opacity ${
          showPopup ? 'opacity-100' : 'opacity-0'
        }`}>
          {children}
        </div>
      )}
    </div>
  );
}
