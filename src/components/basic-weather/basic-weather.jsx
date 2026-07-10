import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const getWeatherDescription = (code) => {
    if (code === 0) return "Clear";
    if ([1, 2, 3].includes(code)) return "Cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rainy";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
    if ([95, 96, 99].includes(code)) return "Stormy";
    return "Sunny";
};

const basicWeather = ({ weatherData }) => {
    const [dateString, setDateString] = useState('');
    const [timeString, setTimeString] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timezone = weatherData?.forecast?.timezone;
            if (timezone) {
                try {
                    setDateString(now.toLocaleDateString('en-US', {
                        timeZone: timezone,
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }));
                    setTimeString(now.toLocaleTimeString('en-US', {
                        timeZone: timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    }));
                } catch (e) {
                    setDateString(now.toLocaleDateString());
                    setTimeString(now.toLocaleTimeString());
                }
            }
        };

        updateTime();
        const intervalId = setInterval(updateTime, 60000);
        return () => clearInterval(intervalId);
    }, [weatherData]);

    const temp = weatherData?.forecast?.current?.temperature_2m;
    const weatherCode = weatherData?.forecast?.current?.weather_code;

    return (
        <Box sx={{ color: '#ffffff' }}>
            <Typography variant='h3' sx={{ fontWeight: '500'}}>
                {timeString || '--:--'}
            </Typography>
            <Typography variant='h6' sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                {dateString || '---'}
            </Typography>
            <Typography variant='h2' sx={{ fontWeight: 'bold' }}>
                {temp !== undefined ? `${Math.round(temp)}°C` : '25°C'}
            </Typography>

            <Typography variant='body1'>
                {weatherData?.forecast?.current?.apparent_temperature !== undefined ? `Feels like ${Math.round(weatherData.forecast.current.apparent_temperature)}°C` : 'Feels like: 25°C'}
            </Typography>

            <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'rgba(5, 10, 29, 0.19)', padding: 1, borderRadius: '10px', justifyContent: 'center', alignItems: 'center', ":hover": { bgcolor: 'rgba(5, 10, 29, 0.29)', scale: 1.05 } }}>

                    <Typography variant='h4' sx={{ bgcolor: '#ffffff00', }}>
                        {weatherData?.forecast?.current?.relative_humidity_2m !== undefined ? `${weatherData.forecast.current.relative_humidity_2m}%` : '50%'}
                    </Typography>
                    <Typography sx={{ fontSize: '12px' }}>
                        Humidity
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'rgba(5, 10, 29, 0.19)', padding: 1, borderRadius: '10px', justifyContent: 'center', alignItems: 'center', ":hover": { bgcolor: 'rgba(5, 10, 29, 0.29)', scale: 1.05 } }}>
                    <Typography variant='h4' sx={{ bgcolor: '#ffffff00', marginTop: 0 }}>
                        {weatherData?.forecast?.current?.wind_speed_10m !== undefined ? `${weatherData.forecast.current.wind_speed_10m}` : '8'}
                    </Typography>
                    <Typography sx={{ fontSize: '12px' }}>
                        Wind Speed
                    </Typography>
                </Box>


            </Box>
        </Box>
    )
}

export default basicWeather