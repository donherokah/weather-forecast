import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDetails = ({ singleweatherData, handleCloseShowDetails }: any) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!singleweatherData) return;

      const { latitude, longitude } = singleweatherData;
      setLoading(true);
      try {
        const response = await axios.post('/api/weather-proxy', {
          latitude,
          longitude,
        });
        console.log('seema seema =>', response.data);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [singleweatherData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    return `${day}/${month}`;
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="weather-details-container">
      <div className="header">
        <h2>7-Day Weather Forecast</h2>
        <button className="close-btn" onClick={handleCloseShowDetails}>
          Close
        </button>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        weatherData && (
          <div className="content">
            <div className="grid-header">
              <p></p>
              <p>Min Temperature</p>
              <p>Max Temperature</p>
              <p>Sunrise</p>
              <p>Sunset</p>
              <p>Rain Sum</p>
            </div>
            <div className="grid grid-cols-[repeat(7,6rem)]">
              {weatherData.daily.time.map((day: string, index: number) => (
                <div key={index} className="grid grid-rows-[repeat(7,3rem)] text-center">
                  <p>{formatDate(day)}</p>
                  <p>{weatherData.daily.temperature_2m_min[index]}°C</p>
                  <p>{weatherData.daily.temperature_2m_max[index]}°C</p>
                  <p>{formatTime(weatherData.daily.sunrise[index])}</p>
                  <p>{formatTime(weatherData.daily.sunset[index])}</p>
                  <p>{weatherData.daily.rain_sum[index]}mm</p>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      <style jsx>{`
        .weather-details-container {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: max-content;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          border-bottom: 1px solid gray;
          padding-bottom: 1rem;
        }

        .close-btn {
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 3px;
          padding: 5px 10px;
          cursor: pointer;
        }

        .close-btn:hover {
          background-color: #d32f2f;
        }

        .loading {
          text-align: center;
          font-size: 1.5rem;
          margin: 20px;
        }

        .content {
          display: flex;
        }

        .grid-header {
          display: flex;
          flex-direction: column;
          font-weight: bold;
          margin-right: 20px;
          gap: 1rem;
          padding-top: 16px;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          flex: 1;
        }

        .grid-row {
          display: contents;
        }

        .grid-row > p {
          border-bottom: 1px solid #ccc;
          padding: 5px;
        }

        .grid-header > p {
          margin: 0;
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default WeatherDetails;
