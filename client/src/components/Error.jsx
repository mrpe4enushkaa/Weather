import React from "react";
import { Link } from "react-router";

export default function Error() {
    return (
        <>
            <h1>Page not found</h1>
            <Link to='/'>Tap here to go to main page</Link>
        </>
    );
}