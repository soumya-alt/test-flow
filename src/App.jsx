import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TodoList from './components/TodoList';
import Calendar from './components/Calendar';
import Weather from './components/Weather';
import Notes from './components/Notes';
import Quotes from './components/Quotes';
import PomodoroTimer from './components/PomodoroTimer';
import { FiMenu, FiX } from 'react-icons/fi';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [background, setBackground] = useState(() => {
    return localStorage.getItem('background') || 'gradient-blue';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  React.useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  React.useEffect(() => {
    localStorage.setItem('background', background);
  }, [background]);

  const getBackgroundClass = (bg) => {
    const bgMap = {
      'gradient-blue': 'bg-gradient-blue',
      'gradient-purple': 'bg-gradient-purple',
      'gradient-green': 'bg-gradient-green',
      'gradient-orange': 'bg-gradient-orange',
      'gradient-pink': 'bg-gradient-pink',
      'gradient-cyber': 'bg-gradient-cyber',
      'gradient-sunset': 'bg-gradient-sunset',
      'gradient-aurora': 'bg-gradient-aurora',
      'gradient-ocean': 'bg-gradient-ocean',
      'gradient-forest': 'bg-gradient-forest',
    };
    return bgMap[bg] || 'bg-gradient-blue';
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass(background)} transition-all duration-500`}>
      <div className="flex">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Sidebar
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                background={background}
                setBackground={setBackground}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Productivity Dashboard
            </motion.h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg hover:shadow-glow transition-all duration-200"
            >
              {isSidebarOpen ? (
                <FiX className="w-6 h-6 text-accent" />
              ) : (
                <FiMenu className="w-6 h-6 text-accent" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Main Productivity Tools */}
            <div className="lg:col-span-8 space-y-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <TodoList />
                <Calendar />
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <PomodoroTimer />
                <Weather />
              </motion.div>
            </div>

            {/* Right Column - Supporting Tools */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Notes />
              </motion.div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Quotes />
              </motion.div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}

export default App; 