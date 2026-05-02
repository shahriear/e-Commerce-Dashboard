import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, ChevronDown, Menu } from 'lucide-react';

export default function Navbar({ onMenuClick, sidebarOpen }) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleProfileClick = () => {
    navigate('/profile-settings');
    setProfileOpen(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        {/* Left Section - Menu Button & Title */}
        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <Menu size={24} className="text-gray-600" />
          </button>

          <div className="min-w-0">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 truncate">
              Dashboard
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5 hidden sm:block">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
          {/* Search Bar - Hidden on small screens */}
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1 md:gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                A
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                Admin
              </span>
              <ChevronDown
                size={16}
                className="text-gray-500 hidden sm:inline"
              />
            </button>

            {/* Profile Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={handleProfileClick}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  👤 Profile Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  ⚙️ Account Settings
                </button>
                <hr className="my-2" />
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  👋 Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
