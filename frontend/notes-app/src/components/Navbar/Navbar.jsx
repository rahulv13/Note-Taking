import React, { useState } from 'react'
import ProfileInfo from './Cards/ProfileInfo';
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar/SearchBar';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({
  userInfo = null,
  onSearchNote = () => {},
  handleClearSearch = () => {}
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className='bg-white dark:bg-slate-900 dark:border-b dark:border-slate-700 flex items-center justify-between px-5 py-2 drop-shadow transition-colors duration-300'>
      <h2 className='text-xl font-medium text-black dark:text-white py-2'>Notes App</h2>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <div className="flex items-center gap-4">
        <DarkModeToggle />
        {userInfo && (
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
