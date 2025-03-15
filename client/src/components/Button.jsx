import React from "react";
import { Link } from "react-router";
import { BsDatabase } from "react-icons/bs";
import { MdExitToApp } from "react-icons/md";

export default function Button({ path }) {
    function setIcon() {
        switch (path) {
            case "/":
                return <MdExitToApp />
            case "/database":
                return <BsDatabase />;
        }
    }

    return (
        <Link to={path}>
            <div className="database__image">
                {setIcon()}
            </div>
        </Link>
    );
}