import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiRefreshCw, FiSettings } from 'react-icons/fi';

function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('pomodoroSettings');
    return saved ? JSON.parse(saved) : {
      workDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15,
      sessionsUntilLongBreak: 4,
    };
  });

  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    audio.play();
    
    if (isBreak) {
      setTimeLeft(settings.workDuration * 60);
      setIsBreak(false);
    } else {
      setTimeLeft(settings.breakDuration * 60);
      setIsBreak(true);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings.workDuration * 60);
    setIsBreak(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: Math.max(1, Math.min(60, value)),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="widget"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Pomodoro Timer</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <FiSettings className="w-5 h-5" />
        </button>
      </div>

      {showSettings ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Work Duration (minutes)</label>
            <input
              type="number"
              value={settings.workDuration}
              onChange={(e) => updateSetting('workDuration', parseInt(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Break Duration (minutes)</label>
            <input
              type="number"
              value={settings.breakDuration}
              onChange={(e) => updateSetting('breakDuration', parseInt(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Long Break Duration (minutes)</label>
            <input
              type="number"
              value={settings.longBreakDuration}
              onChange={(e) => updateSetting('longBreakDuration', parseInt(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sessions Until Long Break</label>
            <input
              type="number"
              value={settings.sessionsUntilLongBreak}
              onChange={(e) => updateSetting('sessionsUntilLongBreak', parseInt(e.target.value))}
              className="input"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
            <div className="text-sm text-gray-500">
              {isBreak ? 'Break Time' : 'Work Time'}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={toggleTimer}
              className="btn btn-primary flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <FiPause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <FiPlay className="w-5 h-5" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={resetTimer}
              className="btn btn-primary flex items-center gap-2"
            >
              <FiRefreshCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default PomodoroTimer; 