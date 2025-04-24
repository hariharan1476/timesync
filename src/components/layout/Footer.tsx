import React from 'react';
import { Globe, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 px-4 shadow-inner mt-auto transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Globe className="h-5 w-5 text-primary-500" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Connecting people across time zones since 2025
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              Terms of Service
            </a>
            <a 
              href="#"
              className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;