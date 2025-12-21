import React from "react";
import { getInitials } from "../../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  // Don’t render until we have a valid name
  if (!userInfo || !userInfo.fullName) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full
                      text-slate-950 font-medium bg-slate-100 dark:bg-slate-800 dark:text-slate-200 transition-colors duration-300">
        {getInitials(userInfo.fullName)}
      </div>
      <div>
        <p className="text-sm font-medium dark:text-white">{userInfo.fullName}</p>
        <button
          className="text-sm text-slate-700 underline dark:text-slate-300"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
