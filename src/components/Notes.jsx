import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave } from 'react-icons/fi';

function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved || '';
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem('notes', notes);
      setSaving(false);
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [notes]);

  const handleChange = (e) => {
    setNotes(e.target.value);
    setSaving(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="widget"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notes</h2>
        {saving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center text-sm text-gray-500"
          >
            <FiSave className="w-4 h-4 mr-1 animate-spin" />
            Saving...
          </motion.div>
        )}
      </div>
      <textarea
        value={notes}
        onChange={handleChange}
        placeholder="Write your notes here..."
        className="input h-64 resize-none"
      />
    </motion.div>
  );
}

export default Notes; 