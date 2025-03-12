import type { ForecastData } from "@/api/types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <p></p>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
