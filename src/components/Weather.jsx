import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiCloud, FiCloudRain, FiCloudSnow, FiCloudLightning } from 'react-icons/fi';
import axios from 'axios';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const API_KEY = 'ddc05f8ba18f495193a25039251903';
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`
        );

        setWeather(response.data);
      } catch (err) {
        setError('Unable to fetch weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (code) => {
    // WeatherAPI.com condition codes
    if (code >= 1000 && code <= 1003) return <FiSun className="w-12 h-12" />; // Clear to partly cloudy
    if (code >= 1004 && code <= 1009) return <FiCloud className="w-12 h-12" />; // Cloudy
    if (code >= 1150 && code <= 1201) return <FiCloudRain className="w-12 h-12" />; // Rain
    if (code >= 1210 && code <= 1225) return <FiCloudSnow className="w-12 h-12" />; // Snow
    if (code >= 1273 && code <= 1282) return <FiCloudLightning className="w-12 h-12" />; // Thunder
    return <FiCloud className="w-12 h-12" />; // Default
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="widget bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h2 className="text-xl font-bold mb-4">Weather</h2>
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : weather ? (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {getWeatherIcon(weather.current.condition.code)}
          </div>
          <div className="text-3xl font-bold mb-2">
            {Math.round(weather.current.temp_c)}°C
          </div>
          <div className="text-lg mb-4 capitalize">{weather.current.condition.text}</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500 dark:text-gray-400">Humidity</div>
              <div className="font-medium">{weather.current.humidity}%</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Wind</div>
              <div className="font-medium">{Math.round(weather.current.wind_kph)} km/h</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">Feels Like</div>
              <div className="font-medium">{Math.round(weather.current.feelslike_c)}°C</div>
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400">UV Index</div>
              <div className="font-medium">{weather.current.uv}</div>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

export default Weather; 