import type { GeocodingResponse, WeatherData } from '@/api/types'
import React from 'react'

interface CurrentWeatherProps {
  data?: WeatherData,
  locationName?: GeocodingResponse
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [CurrentWeather],
    main: { temp, feels_like, humidity, temp_min, temp_max },
    wind: { speed },
  } = data;
  return (
  <div>CurrentWeather</div>
  )
}

export default CurrentWeather