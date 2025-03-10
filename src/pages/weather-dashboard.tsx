import React from "react";
import { Button } from "../components/ui/button";
import { RefreshCw } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation";
import clsx from "clsx";
import WeatherSkeleton from "@/components/loading-skeleton";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();
  console.log("coordinates", coordinates);

  const hanldeRefresh = () => {
    getLocation();
    if (coordinates) {
    }
  };


  if (locationLoading){
    return <WeatherSkeleton/>
  }
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          <Button
            variant={"outline"}
            size={"icon"}
            // onClick={hanldeRefresh}
            // disabled={}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
};

export default WeatherDashboard;
