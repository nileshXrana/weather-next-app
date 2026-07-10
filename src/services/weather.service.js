import axios from "axios";


// city details from open metro:
const getCityDetails = async (cityName) => {
  try {
    const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
    const city = response.data.results?.[0];
    if (!city) return null;
    const forecast = await getWeatherForecast(city.latitude, city.longitude);
    return {
      city: {
        name: city.name,
        country: city.country,
        admin1: city.admin1,
        timezone: city.timezone
      },
      forecast: forecast.data
    };
  } catch (error) {
    console.error("Error fetching city details:", error);
    throw error;
  }
};

// weather details from open weather api:
// const getWeatherDetails = async (latitude, longitude) => {
//   try {
//     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching weather details:", error);
//     throw error;
//   }
// };

// weather forecast from open metro
const getWeatherForecast = async (lat, lon) => {
  const forecast = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&forecast_days=7&timezone=auto`
  );
  return forecast;
};

// city suggestions from open metro
const searchCities = async (query) => {
  if (!query) return [];
  try {
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );
    return response.data.results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { getCityDetails, getWeatherDetails, getWeatherForecast, searchCities };