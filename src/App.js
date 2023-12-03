// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudRain, faBolt, faSmog, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [weatherCondition, setWeatherCondition] = useState('clear');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const apiKey = 'ba17e4f50a4784643b4acb1d6bd07644';
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        const response = await axios.get(weatherApiUrl);
        const weather = response.data.weather[0].main.toLowerCase();
        setWeatherCondition(weather);

        const currentHour = new Date().getHours();
        const isDayTime = currentHour >= 6 && currentHour < 18;
        setTimeOfDay(isDayTime ? 'day' : 'night');
      } catch (error) {
        console.error('Error fetching weather data:', error);
        console.error('Response:', error.response);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = () => {
    switch (weatherCondition) {
      case 'clear':
        return timeOfDay === 'day' ? faSun : faMoon;
      case 'clouds':
        return faCloud;
      case 'rainy':
        return faCloudRain;
      case 'thunderstorms':
        return faBolt;
      case 'mist':
        return faSmog;
      default:
        return faMoon;
    }
  };

  const textColor = timeOfDay === 'night' ? '#fff' : '#333';

  return (
    <div className={`app ${timeOfDay} ${weatherCondition}`}>
      <div className="weather-animation">
        <div className="animation-container">
          <FontAwesomeIcon icon={getWeatherIcon()} className="icon" />
        </div>
      </div>

      
      <div className="content" >
        <h2 style={{ color: textColor }}>{`${timeOfDay}`}</h2>
        <h1 style={{ color: textColor }}>Weather Based Theme Changer</h1>
        {/* Additional components and content go here */}
        <div>
          <p style={{ color: textColor }}>This is additional content.</p>
          {/* Add more components as needed */}
        </div>
      </div>
    </div>
  );
};

export default App;
