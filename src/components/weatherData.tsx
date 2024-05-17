'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WeatherDetails from './weatherDetails';

const WeatherData = ({ item }: any) => {
    const [singleweatherData, setWeatherData] = useState<any>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchBasicWeatherDetails = async (item: any) => {
        try {
            const response = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${item.latitude}&longitude=${item.longitude}&current=temperature_2m,precipitation,wind_speed_10m`
            );

            const weatherBasicData = {
                name: item.name,
                temperature: response.data.current.temperature_2m + response.data.current_units.temperature_2m,
                windspeed: response.data.current.wind_speed_10m.toString() + response.data.current_units.wind_speed_10m,
                precipitation: response.data.current.precipitation.toString() + '%',
                latitude: item.latitude,
                longitude: item.longitude,
            };

            setWeatherData(weatherBasicData);
            setLoading(false); // Set loading to false after data is fetched
            return weatherBasicData;
        } catch (error) {
            setLoading(false); // Set loading to false if there is an error
        }
    };

    useEffect(() => {
        fetchBasicWeatherDetails(item);
    }, [item]);

    const handleClick = () => {
        setShowDetails(true);
    };
    const handleCloseShowDetails = () => {
        setShowDetails(false);
    };

    return (
        <>
            <div 
                className="grid grid-cols-[13rem_20rem] cursor-pointer justify-items-center w-full justify-center font-black items-center border m-4 p-4 rounded-2xl border-solid"
                onClick={handleClick}
            >
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        <h1>{singleweatherData?.name}</h1>
                        <div>
                            <h1>Temperature: {singleweatherData?.temperature}</h1>
                            <h1>Wind Speed: {singleweatherData?.windspeed}</h1>
                            <h1>Precipitation: {singleweatherData?.precipitation}</h1>
                        </div>
                    </>
                )}
            </div>
            {showDetails && <WeatherDetails singleweatherData={singleweatherData} handleCloseShowDetails={handleCloseShowDetails} />}
        </>
    );
};

export default WeatherData;
