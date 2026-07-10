"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Box from '@mui/material/Box';
import AdvanceWeather from "@/components/advance-weather/advance-weather";
import BasicWeather from "@/components/basic-weather/basic-weather";
import ForcastWeather from "@/components/forcast-weather/forcast-weather";
import { useState, useEffect } from 'react'
import { getCityDetails } from '@/services/weather.service'

const getWeatherDetailsByCode = (code) => {
  if (code === 0 || code === 1) {
    return { bg: "/weather_sunny.png" };
  }
  if ([2, 3, 45, 48].includes(code)) {
    return { bg: "/weather_cloudy.png" };
  }
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { bg: "/weather_rainy.png" };
  }
  if ([71, 73, 75, 77, 85, 86, 95, 96, 99].includes(code)) {
    return { bg: "/weather_snowy.png" };
  }
  return { bg: "/weather_sunny.png" };
};

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getCityDetails("New Delhi").then(setWeatherData);
  }, []);

  const weatherCode = weatherData?.forecast?.current?.weather_code ?? 0;
  const { bg: backgroundImage } = getWeatherDetailsByCode(weatherCode);

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
      <Image
        className={styles.backgroundImage}
        src={backgroundImage}
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
          src={backgroundImage}
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
          bgcolor: 'rgba(0, 0, 0, 0.35)',
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