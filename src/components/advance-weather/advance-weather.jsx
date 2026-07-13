"use client"

import React, { useState, useEffect } from 'react'
import styles from './advance-weather.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useForm } from "react-hook-form"
import { useDebounce } from 'use-debounce'
import { getCityDetails, searchCities } from '@/services/weather.service'
import SearchIcon from '@mui/icons-material/Search';

const advanceWeather = ({ weatherData, setWeatherData, setLoading }) => {

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm()

    const cityInput = watch("city") || "";
    const [debouncedInput] = useDebounce(cityInput, 300);

    useEffect(() => {
        if (showSuggestions && debouncedInput.trim().length > 1) {
            searchCities(debouncedInput).then(setSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [debouncedInput, showSuggestions]);

    const onSubmit = async (data) => {
        setLoading(true);
        const result = await getCityDetails(data.city);
        if (result) {
            setWeatherData(result);
        }
        setLoading(false);
        setShowSuggestions(false);
        setSuggestions([]);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Box className={styles.inputWrapper}>
                    <TextField
                        className={styles.textField}
                        placeholder='enter city name'
                        variant="outlined"
                        size="small"
                        {...register("city")}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                        autoComplete="off"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <Box className={styles.suggestionsDropdown}>
                            {suggestions.map((city) => (
                                <Box
                                    key={city.id}
                                    className={styles.suggestionItem}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        setValue("city", city.name);
                                        setShowSuggestions(false);
                                        setSuggestions([]);
                                    }}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        {city.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#666' }}>
                                        {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
                <Button
                    className={styles.searchButton}
                    variant="contained"
                    type='submit'
                >
                    <SearchIcon />
                </Button>
            </form>

            <Box className={styles.cityName}>
                {weatherData && (
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', color: '#fff' }}>
                            {weatherData.city.name}
                        </Typography>
                        <Typography variant='h6' sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {weatherData.city.country}
                        </Typography>
                    </Box>
                )}
            </Box>

        </Box>
    )
}

export default advanceWeather