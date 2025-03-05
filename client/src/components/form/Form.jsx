import React, { useEffect, useState } from "react";
import FormInnerTemprature from "./components/FormInnerTemprature";
import FormInnerCity from "./components/FormInnerCity";
import FormInnerNameWeather from "./components/FormInnerNameWeather";
import Image from "../Image";
import FormDate from "./components/FormDate";
import FormInnerParameters from "./components/FormInnerParameters";

export default function Form() {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [data, setData] = useState({ cod: 400 });

    async function getWeather(city) {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => setData(data));
    }

    const colors = {
        'Default': '#A2A8AD',
        'Clear': '#E5BC32',
        'Rain': '#8D9ECC',
        'Clouds': '#ACC2D9',
        'Snow': '#93E7FB',
        'Haze': '#CCDBDF'
    };

    useEffect(() => {
        if (!data?.weather?.[0]?.main) {
            document.documentElement.style.setProperty('--color', colors['Default']);
        } else {
            document.documentElement.style.setProperty('--color', colors[data.weather[0].main]);
        }
    }, [data]);

    return (
        <div className="form">
            <div className="form__conteiner">
                <div className="form__inner">
                    {data.cod === 200 &&
                        <>
                            <FormInnerNameWeather name={data.weather[0].main} />
                            <Image weather={data.weather[0].main} />
                            <FormDate time={data.timezone} />
                            <FormInnerTemprature temperature={data.main.temp} />
                            <FormInnerParameters wind={data.wind} humidity={data.main.humidity} />
                        </>
                    }
                </div>
                <FormInnerCity getWeather={getWeather} />
            </div>
        </div>
    );
}