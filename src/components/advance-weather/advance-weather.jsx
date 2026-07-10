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

const advanceWeather = ({ weatherData, setWeatherData }) => {

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
        const result = await getCityDetails(data.city);
        if (result) {
            setWeatherData(result);
        }
        setShowSuggestions(false);
        setSuggestions([]);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ position: 'relative', flex: 1 }}>
                    <TextField
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.12)',
                            borderRadius: '8px',
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                color: '#fff',
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '8px',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.35)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.6)',
                                },
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: 'rgba(255, 255, 255, 0.6)',
                                opacity: 1,
                            },
                        }}
                        placeholder='enter city name'
                        variant="outlined"
                        size="small"
                        {...register("city")}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                        autoComplete="off"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <Box sx={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            bgcolor: '#ffffff',
                            borderRadius: '8px',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                            zIndex: 10,
                            overflow: 'hidden',
                            border: '1px solid rgba(0,0,0,0.1)',
                            mt: 0.5
                        }}>
                            {suggestions.map((city) => (
                                <Box
                                    key={city.id}
                                    sx={{
                                        p: 1.5,
                                        cursor: 'pointer',
                                        color: '#333',
                                        '&:hover': { bgcolor: '#f0f0f0' }
                                    }}
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
                    variant="contained"
                    type='submit'
                    sx={{
                        height: '40px',
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(4px)',
                        boxShadow: 'none',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.35)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            boxShadow: 'none',
                        },
                    }}
                >
                    Search
                </Button>
            </form>

            <Box sx={{ pr: '20px', pt: '10px', alignSelf: 'flex-end' }}>
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