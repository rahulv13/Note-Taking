import React from 'react';
import useTheme from '../../utils/useTheme';
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const DarkModeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 transition-colors duration-300 hover:bg-slate-200 dark:hover:bg-slate-700"
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-5 h-5">
        <BsSunFill
          className={`absolute inset-0 text-xl text-orange-400 transition-all duration-500 transform ${
            theme === 'dark' ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'
          }`}
        />
        <BsMoonStarsFill
          className={`absolute inset-0 text-lg text-blue-500 transition-all duration-500 transform ${
            theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'
          }`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
