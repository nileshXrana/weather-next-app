import React from 'react'
import styles from './basic-weather.module.css'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const basicWeather = ({ weatherData }) => {

    const now = new Date();
    const time = weatherData ? new Date(weatherData.dt * 1000) : now; // Convert Unix timestamp to milliseconds
    const dateString = time.toLocaleDateString();
    const timeString = time.toLocaleTimeString();


    return (
        <Box sx={{fontWeight: 'bold', color: '#ffffffbd'}}>
            {/* <Typography variant='h4'>Weather</Typography> */}
            <Typography variant='h3'>{timeString}</Typography>
            <Typography variant='h4'>{dateString}</Typography>
            <Typography variant='h3' sx={{fontWeight: 'bold', color: '#ffffffbd'}}>{weatherData ? `${Math.round(weatherData.main.temp - 273.15)}°C` : '25°C'}</Typography>
            <Typography variant='h6' sx={{fontWeight: 'bold', color: '#000000bd'}}>{weatherData ? weatherData.weather[0].description : 'Sunny'}</Typography>
        </Box>
    )
}

export default basicWeather
          

// export default basicWeather