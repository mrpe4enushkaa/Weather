import React, { useEffect, useState } from "react";

export default function DateCity(props) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const updateClock = () => {
            const nowTime = new Date();
            const utcTime = nowTime.getTime() + nowTime.getTimezoneOffset() * 60000;
            const localTime = new Date(utcTime + props.time * 1000);
            setDate(localTime);
        };

        updateClock();

        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, [props.time]);

    return (
        <div className="form__inner-date">
            <span className="ibm-plex-mono-semibold">{date.getDate()}.{date.getMonth()}.{date.getFullYear()}</span>
            <span className="ibm-plex-mono-semibold">{date.toLocaleTimeString()}</span>
        </div>
    );
}