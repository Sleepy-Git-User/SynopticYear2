import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { setUserId, getUserId } from "./auth";

import "./Navbar.css";


export default function Navbar() {

    {/*Old code for hamburger menu 
    useEffect(() => {
        const hamburger = document.querySelector(".hamburger");
        const nav = document.querySelector("nav");

        hamburger.addEventListener("click", function () {
            nav.classList.toggle("active");
        });
    }, []); */}

    //Action to logout a user
    const handleLogout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("businessId");
        setUserId(null);
        saveId(null)
    };

    return (
        <>
            <header>
                <div class="header-left">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">INSERT LOGO</Link>
                            </li>
                            <li>
                                <Link to="/Food">Food</Link>
                            </li>
                            <li>
                                <Link to="/Advice">Advice</Link>
                            </li>
                            <li>
                                <Link id="logout" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </li>
                            <li>
                                <Link to="/Account">INSERT PROFILE LOGO</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="header-right">
                    <div class="hamburger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </header>

            <Outlet />
        </>
    );
}