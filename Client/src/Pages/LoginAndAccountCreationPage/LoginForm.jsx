import React, { useState } from "react";
import { setUserId, getUserId } from "../../auth";
import axios from "axios";
import "./Login.css"; 

export default function LoginForm({ saveId }) {
    const [form, setForm] = useState({
        Email: "",
        Password: "",
    });

    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);
        axios.post("/api/loginChecker",
            form).then((response) => {
                if (response.data.success) {
                    setError("");
                    saveId(response.data.data[0].UserID);
                    sessionStorage.setItem("businessId", response.data.data2);
                } else {
                    setError(response.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            }
            );

    };



    //Handles updates to all of the data in the form
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };




    return (
        <div>
            <div id="pageContainer"> 
            <div class="gridContainerLogin">  
            <div class="loginBox">
            <form class="login-form" onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="Email"
                    value={form.Email}
                    onChange={handleChange}
                />

                <br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="Password"
                    value={form.Password}
                    onChange={handleChange}
                />

                <br />
                <p className="error">{error}</p>
                <button class="login-btn" type="submit">
                    Log In
                </button> 

            
                {/* <a className="forgotten"> Forgot password?</a> */}
                <p className="forgotten"> Forgot password? </p>

            </form>   
            </div>
            </div>
            </div>
        </div>
    );
}

