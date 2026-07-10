import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const getWeatherDescription = (code) => {
    if (code === 0) return "Clear Sky";
    if ([1, 2, 3].includes(code)) return "Cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rainy";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
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
                        second: '2-digit',
                        hour12: false
                    }));
                } catch (e) {
                    setDateString(now.toLocaleDateString());
                    setTimeString(now.toLocaleTimeString());
                }
            } else {
                setDateString(now.toLocaleDateString());
                setTimeString(now.toLocaleTimeString());
            }
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, [weatherData]);

    const temp = weatherData?.forecast?.current?.temperature_2m;
    const weatherCode = weatherData?.forecast?.current?.weather_code;

    return (
        <Box sx={{ color: '#ffffff' }}>
            <Typography variant='h3' sx={{ fontWeight: '500', mb: 1 }}>
                {timeString || '--:--:--'}
            </Typography>
            <Typography variant='h6' sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                {dateString || '---'}
            </Typography>
            <Typography variant='h2' sx={{ fontWeight: 'bold' }}>
                {temp !== undefined ? `${Math.round(temp)}°C` : '25°C'}
            </Typography>
            <Typography variant='h6' sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
                {weatherCode !== undefined ? getWeatherDescription(weatherCode) : 'Sunny'}
            </Typography>
        </Box>
    )
}

export default basicWeather