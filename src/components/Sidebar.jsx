import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiDroplet, FiSettings, FiLayout } from 'react-icons/fi';

const backgrounds = [
  { name: 'gradient-blue', label: 'Blue Gradient' },
  { name: 'gradient-purple', label: 'Purple Gradient' },
  { name: 'gradient-green', label: 'Green Gradient' },
  { name: 'gradient-orange', label: 'Orange Gradient' },
  { name: 'gradient-pink', label: 'Pink Gradient' },
  { name: 'gradient-cyber', label: 'Cyber Gradient' },
  { name: 'gradient-sunset', label: 'Sunset Gradient' },
  { name: 'gradient-aurora', label: 'Aurora Gradient' },
  { name: 'gradient-ocean', label: 'Ocean Gradient' },
  { name: 'gradient-forest', label: 'Forest Gradient' },
];

function Sidebar({ isDarkMode, setIsDarkMode, background, setBackground }) {
  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 min-h-screen bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg p-6 border-r border-gray-200 dark:border-gray-700"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <FiLayout className="w-6 h-6 text-primary animate-bounce-slow" />
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dashboard
          </h2>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <FiSettings className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Settings</h3>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-full btn btn-primary flex items-center justify-center gap-2 hover:shadow-glow transition-all duration-200 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark"
            >
              {isDarkMode ? (
                <>
                  <FiSun className="w-5 h-5" />
                  Light Mode
                </>
              ) : (
                <>
                  <FiMoon className="w-5 h-5" />
                  Dark Mode
                </>
              )}
            </button>

            <div className="relative">
              <button
                className="w-full btn btn-primary flex items-center justify-center gap-2 hover:shadow-glow transition-all duration-200 bg-gradient-to-r from-accent to-primary hover:from-accent-dark hover:to-primary-dark"
                onClick={() => {
                  const select = document.getElementById('background-select');
                  select.click();
                }}
              >
                <FiDroplet className="w-5 h-5" />
                Background Theme
              </button>
              <select
                id="background-select"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              >
                {backgrounds.map((bg) => (
                  <option key={bg.name} value={bg.name}>
                    {bg.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p className="font-medium">Version 1.0.0</p>
            <p className="mt-2">© 2024 Productivity Dashboard</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export default Sidebar; 