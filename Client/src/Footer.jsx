import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";


function Footer() {
    return (
        <div className="footer-container">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                    integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
                    crossorigin="anonymous"
                    referrerpolicy="no-referrer"
                />
            </head>
            <section className="footer">
                <div className="social">
                    <a href="#">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                </div>
                <ul className="list">
                    <li>
                        <Link to="/">Contact us</Link>
                    </li>
                    <li>
                        <Link to="/">Privacy</Link>
                    </li>
                    <li>
                        <Link to="/">About us</Link>
                    </li>
                    <li>
                        <Link to="/">Terms & Conditions</Link>
                    </li>
                    <li>
                        <Link to="/">Privacy Policy</Link>
                    </li>
                </ul>
                <p className="copyright">Team 44 &copy; 2023</p>

                <div class="logo">
                    <img className="logo" src="./Logo.jpg" alt="" />
                </div> 
                
            </section>
        </div>
    );
}

export default Footer;
