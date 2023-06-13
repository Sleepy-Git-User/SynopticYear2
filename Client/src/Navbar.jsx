import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { setUserId, getUserId } from "./auth";
import axios from "axios";
import "./Navbar.css";


export default function Navbar() {

    const [profilePic, setProfilePic] = useState("");

    // {Old code for hamburger menu 
    // useEffect(() => {
    //     const hamburger = document.querySelector(".hamburger");
    //     const nav = document.querySelector("nav");

    //     hamburger.addEventListener("click", function () {
    //         nav.classList.toggle("active");
    //     });
    // }, []); }

    //Action to logout a user
    const handleLogout = () => {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("businessId");
        setUserId(null);
        saveId(null)
    };

    async function getProfilePic() {
        let id = sessionStorage.getItem("userId");
        console.log(id);
        if (id !== null) {
            await axios.post("/api/getProfilePic", { UserID: id })
                .then((response) => response.data)
                .then((data) => {
                    if (data) {
                        setProfilePic(data);
                    } else {
                        setProfilePic("./profile5.png");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    useEffect(() => {
        getProfilePic();
    }, []);



    return (
        <>
            <header>
                <div class="header-left">
                    <div class="logo">
                        <Link to="/"> <img className="logo" src="./Logo.jpg" /> </Link>
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
                        <Link to="/Account"> <img class="profile" src={profilePic} width="75" height="75" /> </Link>
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