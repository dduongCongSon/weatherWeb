import React from 'react'
import {useParams, useSearchParams} from "react-router-dom";
import {useForecastQuery, useWeatherQuery} from "@/hooks/use-weather.ts";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle, RefreshCw} from "lucide-react";
import WeatherSkeleton from "@/components/loading-skeleton.tsx";
import {Button} from "@/components/ui/button.tsx";
import CurrentWeather from "@/components/current-weather.tsx";
import HourlyTemperature from "@/components/hourly-temperature.tsx";
import WeatherDetails from "@/components/weather-details.tsx";
import WeatherForecast from "@/components/weather-forecast.tsx";

const CityPage = () => {
  const [searchParams] = useSearchParams()
  const params = useParams()
  const lat = parseFloat(searchParams.get("lat") || "0")
  const lon = parseFloat(searchParams.get("lon") || "0")
  const coordinates = {lat, lon}
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="fex flex-col gap-4">
            <p>Fail to fetch weather data. Please try again</p>
          </AlertDescription>
        </Alert>
    )
  }
  
  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />
  }
  
  
  return (

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">{params.cityName}, {weatherQuery.data.sys.country}</h1>
        </div>
        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <CurrentWeather data={weatherQuery.data} />
            <HourlyTemperature data={forecastQuery.data}/>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            <WeatherDetails data={weatherQuery.data}/>
            <WeatherForecast data={forecastQuery.data}/>
          </div>
        </div>
      </div>
  )
}

export default CityPage