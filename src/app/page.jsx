"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Box from '@mui/material/Box';
import AdvanceWeather from "@/components/advance-weather/advance-weather";
import BasicWeather from "@/components/basic-weather/basic-weather";
import ForcastWeather from "@/components/forcast-weather/forcast-weather";
import { useState, useEffect } from 'react'
import { getCityDetails } from '@/services/weather.service'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const getWeatherBackground = (code) => {
  if (code === 0) return "/weather_sunny.png";
  if ([1, 2, 3].includes(code)) return "/weather_cloudy.png";
  if ([45, 48].includes(code)) return "/weather_foggy.avif";
  if ([51, 53, 55, 56, 57].includes(code)) return "/weather_drizzle.jpg";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "/weather_rainy.png";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "/weather_snowy.png";
  if ([95, 96, 99].includes(code)) return "/weather_stormy.avif";
  return "/weather_sunny.png";

};

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [theme, setTheme] = useState('');

  const themeChange = (event) => {
    setTheme(event.target.value);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherDetails = await getCityDetails("New Delhi");
      setWeatherData(weatherDetails);
    };

    fetchWeatherData();
  }, []);

  const weatherCode = weatherData?.forecast?.current?.weather_code;
  const backgroundImage = getWeatherBackground(weatherCode);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{
        minWidth: 170,
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 4,
        zIndex: 1
      }}>
        <FormControl fullWidth sx={{ bgcolor: 'rgba(255, 255, 255, 0.11)', borderRadius: '8px', color: '#ffffffaf' }}>
          <InputLabel sx={{ color: '#ffffffaf' }} id="demo-simple-select-label">Theme</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={theme}
            label="Theme"
            sx={{
              color: '#ffffffaf', border: '1px solid rgba(255, 255, 255, 0.16)', borderRadius: '8px', boxShadow: 'none',
              '.MuiOutlinedInput-notchedOutline': { border: 0 },
              '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
              '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
            }}
            onChange={themeChange}
          >
            <MenuItem value={'/weather_sunny.png'}>Sunny</MenuItem>
            <MenuItem value={'/weather_cloudy.png'}>Cloudy</MenuItem>
            <MenuItem value={'/weather_rainy.png'}>Rainy</MenuItem>
            <MenuItem value={'/weather_snowy.png'}>Snowy</MenuItem>
            <MenuItem value={'/weather_stormy.avif'}>Stormy</MenuItem>
            <MenuItem value={'/weather_drizzle.jpg'}>Drizzle</MenuItem>
            <MenuItem value={'/weather_foggy.avif'}>Foggy</MenuItem>

          </Select>
        </FormControl>
      </Box>
      <Image
        className={styles.backgroundImage}
        src={theme || backgroundImage}
        alt="outer background"
        fill
        priority
      />
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(0, 0, 0, 0.65)',
        zIndex: 0
      }} />
      <Box sx={{
        width: '90%',
        maxWidth: '1000px',
        height: '80vh',
        position: 'relative',
        borderRadius: '24px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 1
      }}>
        <Image
          className={styles.backgroundImage}
          src={theme || backgroundImage}
          alt="inner background"
          fill
          priority
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0.14)',
          zIndex: 1
        }} />
        <Box sx={{ zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box className={styles.topContainer}>
            <Box className={styles.leftContainer}>
              <BasicWeather weatherData={weatherData} />
            </Box>
            <Box className={styles.rightContainer}>
              <AdvanceWeather weatherData={weatherData} setWeatherData={setWeatherData} />
            </Box>
          </Box>
          <Box className={styles.bottomContainer}>
            <ForcastWeather weatherData={weatherData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}