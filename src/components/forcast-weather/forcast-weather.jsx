import React from 'react'
import styles from './forcast-weather.module.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';


const forcastWeather = ({ weatherData }) => {
    return (
        <Box className={styles.container}>
            {weatherData ? (
                <Box className={styles.weatherDetails} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#fff' }}>
                    <Image src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" width={150} height={150} />
                    <Box>
                        <Typography variant='h6'>{weatherData.name}</Typography>
                        <Typography variant='h6'>{weatherData ? `${Math.round(weatherData.main.temp - 273.15)}°C` : '25°C'}</Typography>
                    </Box>
                </Box>
            ) : (
                <Typography variant='h6'>No weather data available. Please search for a city.</Typography>
            )}
        </Box>
    )
}

export default forcastWeather

// weatherData example:
// {
//     "coord": {
//         "lon": 77.23,
//         "lat": 28.66
//     },
//     "weather": [
//         {
//             "id": 500,
//             "main": "Rain",
//             "description": "light rain",
//             "icon": "10d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 303.31,
//         "feels_like": 307.38,
//         "tem,
//         "temp_max": 303.31p_min": 303.31,
//         "pressure": 998,
//         "humidity": 65,
//         "sea_level": 998,
//         "grnd_level": 973
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 4.65,
//         "deg": 1,
//         "gust": 6.32
//     },
//     "rain": {
//         "1h": 0.22
//     },
//     "clouds": {
//         "all": 100
//     },
//     "dt": 1783597998,
//     "sys": {
//         "country": "IN",
//         "sunrise": 1783555186,
//         "sunset": 1783605138
//     },
//     "timezone": 19800,
//     "id": 1273294,
//     "name": "Delhi",
//     "cod": 200
// }
