import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { FiCalendar, FiPlus } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('calendarEvents');
    return saved ? JSON.parse(saved) : {};
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addEvent = (e) => {
    e.preventDefault();
    const eventText = e.target.event.value;
    if (!eventText.trim()) return;

    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const newEvents = {
      ...events,
      [dateKey]: [...(events[dateKey] || []), eventText],
    };

    setEvents(newEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(newEvents));
    e.target.event.value = '';
  };

  const deleteEvent = (dateKey, index) => {
    const newEvents = {
      ...events,
      [dateKey]: events[dateKey].filter((_, i) => i !== index),
    };
    setEvents(newEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(newEvents));
  };

  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const dayEvents = events[dateKey] || [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="widget bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h2 className="text-xl font-bold mb-4">Calendar</h2>
      <div className="mb-4">
        <div className="relative">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="w-full px-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            customInput={
              <input
                type="text"
                readOnly
                className="w-full px-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              />
            }
          />
          <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 pointer-events-none" />
        </div>
      </div>

      <form onSubmit={addEvent} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-2">
          <input
            type="text"
            name="event"
            placeholder="Add an event..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
          />
          <button
            type="submit"
            className="w-full sm:w-auto whitespace-nowrap px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </form>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {dayEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <span className="text-gray-900 dark:text-white break-words flex-1 mr-2">{event}</span>
            <button
              onClick={() => deleteEvent(dateKey, index)}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200 flex-shrink-0"
            >
              ×
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Calendar; 