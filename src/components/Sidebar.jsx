import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  ChevronDown,
  LayoutDashboard,
  Package,
  Grid3x3,
  ShoppingCart,
  ClipboardList,
  CreditCard,
  Users,
  UserCheck,
  LogOut,
  Settings,
  X,
} from 'lucide-react';

export default function Sidebar({ onClose }) {
  const [adminOpen, setAdminOpen] = useState(false);
  const location = useLocation();

  const isActive = path => location.pathname === path;

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'Products', icon: Package, path: '/products' },
    { label: 'Categories', icon: Grid3x3, path: '/categories' },
    { label: 'Carts', icon: ShoppingCart, path: '/carts' },
    { label: 'Orders', icon: ClipboardList, path: '/orders' },
    { label: 'Payments', icon: CreditCard, path: '/payments' },
    { label: 'Customers', icon: Users, path: '/customers' },
    { label: 'Employees', icon: UserCheck, path: '/employees' },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen flex flex-col">
      {/* Close Button (Mobile) */}
      {onClose && (
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>
      )}

      {/* Logo */}
      <div className="px-6 py-8 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm md:text-base ${
                active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Admin Dropdown */}
        <div className="pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={() => setAdminOpen(!adminOpen)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm md:text-base ${
              adminOpen
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <UserCheck size={20} className="flex-shrink-0" />
            <span className="font-medium flex-1 text-left">Admin</span>
            <ChevronDown
              size={18}
              className={`transition-transform flex-shrink-0 ${adminOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Admin Submenu */}
          {adminOpen && (
            <div className="mt-2 space-y-1 ml-4 border-l border-gray-300 pl-4">
              <button
                onClick={onClose}
                className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
              >
                Profile Settings
              </button>
              <button
                onClick={onClose}
                className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
              >
                Account Settings
              </button>
              <button
                onClick={onClose}
                className="w-full text-left px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm flex items-center gap-2"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
