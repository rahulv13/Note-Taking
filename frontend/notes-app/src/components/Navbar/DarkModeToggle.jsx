import React from 'react';
import useTheme from '../../utils/useTheme';
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const DarkModeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ease-in-out ${
        theme === 'dark' ? 'bg-white text-orange-400' : 'bg-slate-900 text-white'
      }`}
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-6 h-6 overflow-hidden">
        {/* Sun Icon (Visible in Dark Mode) */}
        <BsSunFill
          className={`absolute inset-0 text-xl transition-all duration-500 transform ${
            theme === 'dark' ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-10 opacity-0 rotate-90'
          }`}
        />

        {/* Moon Icon (Visible in Light Mode) */}
        <BsMoonStarsFill
          className={`absolute inset-0 text-lg transition-all duration-500 transform ${
            theme === 'dark' ? '-translate-y-10 opacity-0 -rotate-90' : 'translate-y-0 opacity-100 rotate-0'
          }`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
