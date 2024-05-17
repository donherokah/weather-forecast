import axios from 'axios';

const apiKey = 'YOUR_WEATHER_API_KEY';

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const getWeatherByCity = async (city) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric', 
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export default weatherApi;
