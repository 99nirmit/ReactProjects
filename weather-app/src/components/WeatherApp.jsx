import React, { useState } from 'react'

const WeatherApp = () => {

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_KEY = "6319663d7f2fc16eb7da543cfbf5e5e2";

    const fetchWeather = async () => {
        setLoading(true);

        try{
            const reponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
            const data = await reponse.json();
            setWeather(data);
        }catch (error) {
            console.error("Failed to fetch the Weather: ", error);
        }finally{
            setLoading(false);
        }
    };

  return (
    <div>
        <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
        />

        <button onClick={fetchWeather} disabled={loading}>
            {loading ? 'Loading..' : 'Get Weather'}
        </button>

        {weather && (
            <div>
                <h2>{weather.name}</h2>
                <p>Temperature : {(weather.main.temp - 273.15).toFixed(1)} C</p>
                <p>Weather: {weather.weather[0].description}</p>
            </div>
        )}
    </div>
  );
}

export default WeatherApp