import React, { useState } from "react";


function CreateUser({saveId}) {
    
    //Form data for creating a user (including address)
    const [form, setForm] = useState({
        Email: "",
        PhoneNumber: "",
        Fname: "",
        Lname: "",
        DoB: "",
        Password: "",
        Line1: "",
        Line2: "",
        City: "",
        Postcode: ""
    });

    const [error, setError] = useState("");

    //Used to show error messages for invalid data
    //const [emailError, setEmailError] = useState("");
    //const [usernameError, setUsernameError] = useState("");

    //Handles submission of a new account - will need a
    // createUser method for this!
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);
        fetch("http://localhost:3000/api/makeUser", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            },

            //Will need to change the body here as it's not just string stuff!
        })
            .then((response) => response.json())

            .then((info) => {
                //May need to be updated to another page
                if (info.success) {
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
                console.error("Error:", error);
            });
    };



    //Handles updates to all of the data in the form
    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };



    //Returns the create user form
    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="Email"
                    value={form.Email}
                    onChange={handleChange}
                />

            <br />

            <label htmlFor="phone">Phone Number:</label>
                <input
                    type="text"
                    id="phone"
                    name="PhoneNumber"
                    value={form.PhoneNumber}
                    onChange={handleChange}
                />

            <br />

            <label htmlFor="fname">First Name:</label>
            <input
                type="text"
                id="fname"
                name="Fname"
                value={form.Fname}
                onChange={handleChange}
            />

            <br />

            <label htmlFor="lname">Last Name:</label>
            <input
                type="text"
                id="lname"
                name="Lname"
                value={form.Lname}
                onChange={handleChange}
            />

            <br />

            <label htmlFor="dob">Date of Birth:</label>
            <input
                type="date"
                id="dob"
                name="DoB"
                value={form.DoB}
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
            <br />
            <br />

            <label htmlFor="line1">Address Line 1:</label>
            <input
                type="text"
                id="line1"
                name="Line1"
                value={form.Line1}
                onChange={handleChange}
            />

            <br />


            <label htmlFor="line1">Address Line 2:</label>
            <input
                type="text"
                id="line2"
                name="Line2"
                value={form.Line2}
                onChange={handleChange}
            />

            <br />


            <label htmlFor="city">City:</label>
            <input
                type="text"
                id="city"
                name="City"
                value={form.City}
                onChange={handleChange}
            />

            <br />


            <label htmlFor="postcode">Postcode:</label>
            <input
                type="text"
                id="postcode"
                name="Postcode"
                value={form.Postcode}
                onChange={handleChange}
            />



            <br />
            <br />
            <br />

            <p>{error}</p>

            <button type="submit">
                Create Account
            </button>
        </form>
    );
}

export default CreateUser;