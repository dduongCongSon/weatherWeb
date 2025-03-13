import { WeatherData } from "@/api/types.ts";
import { data } from "react-router-dom";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { format } from "date-fns";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface WeatherDetailsProps {
    data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {

    const { wind, main, sys } = data;

    const getWindDirection = (degree: number) => {
        const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8
        return direction[index];
    }


    const formatTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), "h:mm a");
    }

    const details = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        }, {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        }, {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°C)`,
            icon: Compass,
            color: "text-green-500"
        }, {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500"
        }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {details.map((details) => {
                        return <div key={details.title}
                            className="flex items-center gap-3 rounded-lg border p-4"
                        >
                            <details.icon className={`h-5 w-5 ${details.color}`} />
                            <div>
                                <p className="text-sm font-medium leading-none">{details.title}</p>
                                <p className="text-sm text-muted-foreground">{details.value}</p>
                            </div>
                        </div>
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

export default WeatherDetails;
