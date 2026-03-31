import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, BarChart2, User, Moon, Sun } from 'lucide-react';

export default function Navbar({ isDark, onToggleDark }) {
  const { pathname } = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', Icon: CheckSquare },
    { to: '/analytics', label: 'Analytics', Icon: BarChart2 },
    { to: '/about', label: 'About', Icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-gray-900 dark:text-gray-100" />
          <span className="font-bold text-gray-900 dark:text-gray-100 tracking-tight">TodoApp</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {navLinks.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  pathname === to
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700
                       text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
