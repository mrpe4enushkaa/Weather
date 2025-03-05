import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

export default function FormInnerCity(props) {
    const [city, setCity] = useState("");
    const [isBlur, setBlur] = useState(false);

    useEffect(() => {
        if (isBlur) props.getWeather(city);
    }, [isBlur]);

    return (
        <div className="form__inner-city">
            <input
                type="text"
                className="city__input"
                onChange={(e) => {
                    setCity(e.target.value);
                    setBlur(false);
                }}
                placeholder="Введите город"
            />
            <div className="city__search" onClick={() => { setBlur(true) }}>
                <IoSearch />
            </div>
        </div>
    );
}