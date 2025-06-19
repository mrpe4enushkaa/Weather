import React, { useEffect, useState, useLayoutEffect } from "react";
import Temprature from "./components/Temprature";
import City from "./components/City";
import NameWeather from "./components/NameWeather";
import Image from "../Image";
import DateCity from "./components/DateCity";
import Parameters from "./components/Parameters";
import Button from "../Button";
import colors from "../../controllers/colors.json";

export default function Form() {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [data, setData] = useState({ cod: 400 });
    const [city, setCity] = useState();
    const [date, setDate] = useState(`${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`);

    useLayoutEffect(() => {
        setDate(`${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`);
    }, []);

    function turnColors() {
        if (!data?.weather?.[0]?.main) {
            document.documentElement.style.setProperty('--color', colors.Default);
        } else {
            document.documentElement.style.setProperty('--color', colors[data.weather[0].main]);
        }
    }

    function getCity(city) {
        if (city) {
            const splitted = city.split("");

            const first = splitted[0].toUpperCase();

            const rest = [...splitted];
            rest.splice(0, 1);

            const result = [first, ...rest].join("");

            setCity(result);
        }
    }

    async function getWeather(city) {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => setData(data));
    }

    async function sendData() {
        try {
            await fetch("http://localhost:2000/api/addData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    city: city,
                    weather: data.weather[0].main,
                    temperature: data.main.temp,
                    wind: data.wind.speed,
                    humidity: data.main.humidity,
                    date: date,
                    color: colors[data.weather[0].main]
                }),
            });
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    }

    useEffect(() => {
        turnColors();
        sendData();
    }, [data]);

    return (
        <div className="form">
            <div className="form__conteiner">
                <div className="form__inner">
                    {data.cod === 200 &&
                        <>
                            <NameWeather name={data.weather[0].main} />
                            <Image weather={data.weather[0].main} />
                            <DateCity time={data.timezone} />
                            <Temprature temperature={data.main.temp} />
                            <Parameters wind={data.wind} humidity={data.main.humidity} />
                        </>
                    }
                </div>
                <City getWeather={getWeather} getCity={getCity} />
                <Button path="/database" />
            </div>
        </div>
    );
}