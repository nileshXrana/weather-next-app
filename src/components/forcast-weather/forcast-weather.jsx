import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const getWeatherIcon = (code) => {
    if (code === 0) return "01d";
    if ([1, 2, 3].includes(code)) return "03d";
    if ([45, 48].includes(code)) return "50d";
    if ([51, 53, 55, 56, 57].includes(code)) return "09d";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "10d";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "13d";
    if ([95, 96, 99].includes(code)) return "11d";
    return "01d";
};

const getWeatherLabel = (code) => {
    if (code === 0) return "Clear";
    if ([1, 2, 3].includes(code)) return "Cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rainy";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
    if ([95, 96, 99].includes(code)) return "Stormy";
    return "Sunny";
};

const formatDayName = (dateStr, index) => {
    if (index === 0) return "Today";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const forcastWeather = ({ weatherData }) => {
    const daily = weatherData?.forecast?.daily;

    if (!daily) {
        return (
            <Typography variant='h6' sx={{ color: '#fff', opacity: 0.8 }}>
                Weather Forcast
            </Typography>
        );
    }

    const days = daily.time.map((time, index) => ({
        dayName: formatDayName(time, index),
        tempMax: Math.round(daily.temperature_2m_max[index]),
        tempMin: Math.round(daily.temperature_2m_min[index]),
        icon: getWeatherIcon(daily.weather_code[index]),
        label: getWeatherLabel(daily.weather_code[index])
    }));

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            overflowX: 'auto',
            gap: 2,
            py: 1,
            px: 2,
            justifyContent: 'space-between',
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
        }}>
            {days.map((day, idx) => {
                if (idx === 0) {
                    return (
                        <Box
                            key={idx}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // bgcolor: 'rgba(255, 255, 255, 0.18)',
                                // border: '1px solid rgba(255, 255, 255, 0.4)',
                                borderRadius: '16px',
                                p: 2,
                                minWidth: '200px',
                                // gap: 1,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-6px)',
                                    bgcolor: 'rgba(255, 255, 255, 0.03)'
                                }
                            }}
                        >
                            <Image
                                src={`/icons/${day.icon}.png`}
                                alt={day.label}
                                width={100}
                                height={100}
                            />

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Typography variant='body2' sx={{ color: '#fff', fontWeight: 'bold', mb: 0.5 }}>
                                    {day.dayName}
                                </Typography>
                                <Typography variant='body2' sx={{ color: '#fff', fontWeight: '600' }}>
                                    {day.tempMax}° / <span style={{ opacity: 0.6 }}>{day.tempMin}°</span>
                                </Typography>
                                <Typography variant='caption' sx={{ color: 'rgba(255, 255, 255, 0.85)', mt: 0.5 }}>
                                    {day.label}
                                </Typography>
                            </Box>
                        </Box>
                    );
                }

                return (
                    <Box
                        key={idx}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // bgcolor: 'rgba(255, 255, 255, 0.05)',
                            // border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            p: 2,
                            minWidth: '100px',
                            flex: 1,
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'translateY(-6px)',
                                bgcolor: 'rgba(255, 255, 255, 0.03)'
                            }
                        }}
                    >
                        <Typography variant='body2' sx={{ color: '#fff', mb: 1 }}>
                            {day.dayName}
                        </Typography>

                        <Image
                            src={`/icons/${day.icon}.png`}
                            alt={day.label}
                            width={70}
                            height={70}
                        />

                        <Typography variant='caption' sx={{ color: 'rgba(255, 255, 255, 0.7)', my: 0.5 }}>
                            {day.label}
                        </Typography>

                        <Typography variant='body2' sx={{ color: '#fff', fontWeight: '500', mt: 1 }}>
                            {day.tempMax}° / <span style={{ opacity: 0.6 }}>{day.tempMin}°</span>
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    )
}

export default forcastWeather
