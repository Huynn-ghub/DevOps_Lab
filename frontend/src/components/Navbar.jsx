import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, BarChart2, User } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', Icon: CheckSquare },
    { to: '/analytics', label: 'Analytics', Icon: BarChart2 },
    { to: '/about', label: 'About', Icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-gray-900" />
          <span className="font-bold text-gray-900 tracking-tight">TodoApp</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ to, label, Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                pathname === to
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
