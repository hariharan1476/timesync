import React from 'react';
import { Clock, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-4 md:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Clock className="h-8 w-8 text-primary-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Time<span className="text-primary-500">Sync</span>
          </h1>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-gray-700" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-300" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;