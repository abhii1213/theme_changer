// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [weatherCondition, setWeatherCondition] = useState('clear');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const apiKey = 'ba17e4f50a4784643b4acb1d6bd07644';

      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      try {
        const response = await axios.get(weatherApiUrl);
        const weather = response.data.weather[0].main.toLowerCase();
        setWeatherCondition(weather);
        console.log(weather)

        const currentHour = new Date().getHours();
        const isDayTime = currentHour >= 6 && currentHour < 18;
        setTimeOfDay(isDayTime ? 'day' : 'night');
      } catch (error) {
        console.error('Error fetching weather data:', error);
        console.error('Response:', error.response);
      }
    });
  }, []);

  return (
    <div className={`app ${timeOfDay} ${weatherCondition}`}>
      <h1>Weather Based Theme Changer</h1>
      {/* Your other components and content go here */}
    </div>
  );
};

export default App;
