import axios from "axios";


// city details from api ninjas:
const getCityDetails = async (cityName) => {
  try {
    const response = await axios.get(`https://api.api-ninjas.com/v1/city?name=${cityName}`, {
      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJAS_KEY,
      },
    });

    return getWeatherDetails(response.data[0].latitude, response.data[0].longitude);
  } catch (error) {
    console.error("Error fetching city details:", error);
    throw error;
  }
};

// weather details from open weather api:
const getWeatherDetails = async (latitude, longitude) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather details:", error);
    throw error;
  }
};

// weather forecast data
const getWeatherForecast = async (lat, lon) => {
  const forecastResponse = await fetch(`https://api.openweathermap.org/data/1.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`);
  const forecastData = await forecastResponse.json();
  return forecastData;
}



export { getCityDetails, getWeatherDetails, getWeatherForecast };