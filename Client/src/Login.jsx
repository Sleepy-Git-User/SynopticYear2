import React, { useState } from "react";
import { setUserId, getUserId } from "./auth";

export default function Login({saveId}) {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);
        fetch("http://localhost:3000/api/loginChecker", {
            method: "POST",
            body: JSON.stringify({userID: "2418895d-6f24-49ba-9bdc-b6f83646100d"}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())

            .then((data) => {
                if (data.success) {
                    
                    setUserId("2418895d-6f24-49ba-9bdc-b6f83646100d");
                    console.log("Success!");
                    const userIdTest = getUserId();
                    console.log(userIdTest);
                    saveId(userIdTest);
                    
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => {
                alert("Error:", error);
            });
    };



    //Handles updates to all of the data in the form
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };




    return (
        <div id="pageContainer">
        <h1> LOGIN PAGE </h1>
        <br/>
        <h1>SCOTLAND = BAD???</h1>
        <br/>
        <form class="login-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
            />

            <br />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
            />

            <br />

            <button class="login-btn" type="submit">
                Log In
            </button>
        </form>
        </div>
    );
}






