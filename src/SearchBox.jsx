import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import config from '../config'; // Import the config file
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    // While using config.js
    // const API_URL = config.API_URL;
    // const API_KEY = config.API_KEY;

   

    const getWeatherInfo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description
            };
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
            throw err; // Rethrow the error for the parent component to handle
        }
    };

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setError(false); // Reset error state
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className='Search-box'>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" value={city} required onChange={handleChange} />
                <br /> <br />
                <Button variant="contained" type='submit'>
                    Search
                </Button>
                {error && <p className='error'>No such place exists in our API!</p>}
            </form>
        </div>
    );
}
