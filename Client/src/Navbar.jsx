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
                <div class="logo">
                    <Link to="/"> <img className="logo" src="./Logo.jpg"/> </Link>
                </div>
                </div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/Food">Food</Link>
                            </li>
                            <li>
                                <Link to="/Advice">Advice</Link>
                            </li>
                            {/* <li>
                                <Link id="logout" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </li> */}
                        </ul>
                    </nav>
                    
                <div class="header-right"> 
                <div class="header-right">
                <li>
                    <Link id="logout" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </li>
                        <Link to="/Account"> <img class="profile" src="./profile5.png"/> </Link>
                </div>
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