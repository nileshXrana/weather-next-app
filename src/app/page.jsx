"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Box from '@mui/material/Box';
import AdvanceWeather from "@/components/advance-weather/advance-weather";
import BasicWeather from "@/components/basic-weather/basic-weather";
import ForcastWeather from "@/components/forcast-weather/forcast-weather";
import {useState, useEffect} from 'react'

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherForcast, setWeatherForcast] = useState(null);

  return (
    <Box sx={{ scale: 1, opacity: 0.9, position: 'relative', width: '100%', height: '100%' }}>
      <Image
        className={styles.backgroundImage}
        src="/background.avif"
        alt="background"
        placehlder="blur"
        fill
      />
      <Box className={styles.topContainer}>
        <Box className={styles.leftContainer}>
            <BasicWeather weatherData={weatherData} />
        </Box>
        <Box className={styles.rightContainer}>
            <AdvanceWeather setWeatherForcast={setWeatherForcast} setWeatherData={setWeatherData} />
        </Box>
      </Box>
      <Box className={styles.bottomContainer}>
          <ForcastWeather weatherData={weatherData} weatherForcast={weatherForcast}/>
      </Box>
    </Box>
  );
}