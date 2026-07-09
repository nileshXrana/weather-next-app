"use client"

import React from 'react'
import styles from './advance-weather.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useForm } from "react-hook-form"
import {getCityDetails} from '@/services/weather.service'
import {getWeatherForecast} from '@/services/weather.service'
import {useState, useEffect} from 'react'

const advanceWeather = ({ setWeatherForcast, setWeatherData }) => {

    const [cityDetails, setCityDetails] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const cityDetails = await getCityDetails(data.city);
        setCityDetails(cityDetails);
        setWeatherData(cityDetails);
        console.log("City Details:", cityDetails);

        // if (cityDetails) {
        //     const { lat, lon } = cityDetails.coord;
        //     const forecastData = await getWeatherForecast(lat, lon);
        //     console.log("Forecast Data:", forecastData);
        //     setWeatherForcast(forecastData);
        // }
    }

    return (
        <Box>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <TextField sx={{ bgcolor: "#ffffffd8", borderRadius: "4px", width: "90%", }} id="outlined-basic" placeholder='enter city name' variant="outlined" {...register("city")} />
                <Button variant="contained" type='submit'>Search city</Button>
            </form>

            <Box className={styles.cityName}>
                {cityDetails && (
                    <Box>
                        <Typography variant='h6'>{cityDetails.name}</Typography>
                        {/* <Typography variant='h3'> {cityDetails.main.temp ? `${Math.round(cityDetails.main.temp - 273.15)}°C` : '25°C'}</Typography> */}
                        <Typography variant='h6'>{cityDetails.weather[0].description}</Typography>
                    </Box>
                )}
            </Box>

        </Box>
    )
}

export default advanceWeather