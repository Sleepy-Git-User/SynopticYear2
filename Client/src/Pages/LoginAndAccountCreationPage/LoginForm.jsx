import React, { useState } from "react";
import { setUserId, getUserId } from "../../auth";


export default function LoginForm({saveId}) {
    const [form, setForm] = useState({
        Email: "",
        Password: "",
    });

    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);
        fetch("http://localhost:3000/api/loginChecker", {
            method: "POST",
            //CHANGE TO NOT MAKE IT JUST THIS ONE USER
            body: JSON.stringify({userID: "2418895d-6f24-49ba-9bdc-b6f83646100d"}),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())

            .then((info) => {
                if (info.success) {
                    
                    //CHANGE TO NOT SET THE ID TO JUST THE ONE USER
                    setError("");
                    setUserId(info.data);
                    console.log("Success!");
                    const userIdTest = getUserId();
                    console.log(userIdTest);
                    saveId(userIdTest);
                    
                } else {
                    setError(info.data);
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
        <div>
        <form class="login-form" onSubmit={handleSubmit}>
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
            <p>{error}</p>
            <button class="login-btn" type="submit">
                Log In
            </button>

        </form>
        </div>
    );
}

