import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';

function Quotes() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback quotes in case API fails
  const fallbackQuotes = [
    {
      content: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      content: "It always seems impossible until it's done.",
      author: "Nelson Mandela"
    },
    {
      content: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson"
    },
    {
      content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      content: "The future depends on what you do today.",
      author: "Mahatma Gandhi"
    }
  ];

  const getRandomFallbackQuote = () => {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  };

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('https://api.quotable.io/random', {
        timeout: 5000, // 5 second timeout
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.data && response.data.content) {
        setQuote(response.data);
      } else {
        throw new Error('Invalid quote data received');
      }
    } catch (err) {
      console.error('Quote fetch error:', err);
      // Use a fallback quote instead of showing error
      setQuote(getRandomFallbackQuote());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="widget bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Daily Quote</h2>
        <button
          onClick={fetchQuote}
          disabled={loading}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 disabled:opacity-50"
          aria-label="Refresh quote"
        >
          <FiRefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <motion.div
        key={quote?.content || 'loading'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : quote ? (
          <>
            <blockquote className="text-lg mb-4 text-gray-900 dark:text-white">
              "{quote.content}"
            </blockquote>
            <p className="text-gray-600 dark:text-gray-400">
              - {quote.author}
            </p>
          </>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export default Quotes; 