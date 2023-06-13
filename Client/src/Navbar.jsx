import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { setUserId, getUserId } from "./auth";
import axios from "axios";
import "./Navbar.css";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";


export default function Navbar() {

    const [profilePic, setProfilePic] = useState(""); 


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

   function hamburgerFunction() {
        const hamburger =  document.querySelector('.hamburger');
        const navMenu = document.querySelector(".nav-menu");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active"); 
            navMenu.classList.toggle("active"); 

        })

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        })

    )}

    return (
        <>
            <header>
                <div class="header-left">
                    <div class="logo">
                        <Link to="/"> <img className="logo" src="./Logo.jpg" /> </Link>
                    </div>
                </div>
                <nav className="navbar">
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Food">Food</Link>
                        </li>
                        <li>
                            <Link to="/Advice">Advice</Link>
                        </li>

                        <div class="dropdown">
                        <button class="dropbtn">Accessibility</button>
                        <div class="dropdown-content">
                            <a href="#">Languages</a>
                            <a href="#">Colour Blind</a>
                            <a href="#">Larger Font</a>
                            <a href="#">Dyslexia</a>
                        </div> 
                        </div>  
                        

                        <li>
                            <Link id="logout" onClick={handleLogout}>
                                Logout
                            </Link> 
                        </li>

                        <li>
                        <Link to="/Account"> <img class="profile" src={profilePic} width="75" height="75" /> </Link>
                        <div class="overlay">
                        <Link to="/Account"> Account </Link>
                        </div>
                        </li>
            
                        {/* <li>
                                <Link id="logout" onClick={handleLogout}>
                                    Logout
                                </Link>
                            </li> */}
            
    
                    </ul>
                </nav>

                {/* <div class="header-right">
                    <div class="header-right"> 
                    <div class="dropdown">
                        <button class="dropbtn">Accessibility</button>
                        <div class="dropdown-content">
                            <a href="#">Languages</a>
                            <a href="#">Colour Blind</a>
                            <a href="#">Larger Font</a>
                            <a href="#">Dyslexia</a>
                        </div>
                        </div>            
                        <li>
                            <Link id="logout" onClick={handleLogout}>
                                Logout
                            </Link> 
                        </li>
                        <Link to="/Account"> <img class="profile" src={profilePic} width="75" height="75" /> </Link>
                    </div> */}
                    {/* <div onClick={hamburgerFunction} className="hamburger"> 
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div> */}
                
                <div onClick={hamburgerFunction} className="hamburger"> 
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                </div>
            </header>

            <Outlet />
        </>
    );
}