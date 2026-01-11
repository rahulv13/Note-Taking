import React from 'react';
import useTheme from '../../utils/useTheme';
import { FiMoon, FiSun } from "react-icons/fi";

const DarkModeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-12 h-12 flex items-center justify-center rounded-2xl border-2 transition-all duration-300 ease-in-out ${
        theme === 'dark'
          ? 'bg-slate-900 border-slate-700 text-white hover:border-slate-500'
          : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400'
      }`}
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon (Visible in Dark Mode) */}
        <FiSun
          className={`absolute text-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50'
          }`}
        />

        {/* Moon Icon (Visible in Light Mode) */}
        <FiMoon
          className={`absolute text-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            theme === 'dark'
              ? 'opacity-0 rotate-90 scale-50'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;
