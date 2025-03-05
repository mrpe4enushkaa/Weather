import React from "react";
import { WiDaySunny, WiCloudy, WiFog, WiSnow, WiRain } from "react-icons/wi";

export default function Image({ weather }) {
    function renderWeatherIcon() {
        switch (weather) {
            case "Clear":
                return <WiDaySunny />;
            case "Rain":
                return <WiRain />;
            case "Clouds":
                return <WiCloudy />;
            case "Snow":
                return <WiSnow />;
            case "Haze":
                return <WiFog />;
            default:
                return <WiDaySunny />;
        }
    };

    return <div className="weather__image">{renderWeatherIcon()}</div>;
}
