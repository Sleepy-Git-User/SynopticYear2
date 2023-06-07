import React, { useState } from "react";
import axios from 'axios';

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


    //Handles submission of a new account - will need a
    // makeUser method for this!
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);
        axios
          .post("/api/makeUser", form, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => response.data)
          .then((info) => {
            if (info.success) {
              setError("");
              saveId(info.data);
              console.log("Success!");
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
                <h1>Create Account</h1>
                <br />

            <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="Email"
                    value={form.Email}
                    onChange={handleChange}
                    required
                />

            <br />

            <label htmlFor="phone">Phone Number:</label>
                <input
                    type="text"
                    id="phone"
                    name="PhoneNumber"
                    value={form.PhoneNumber}
                    onChange={handleChange}
                    required
                />

            <br />

            <label htmlFor="fname">First Name:</label>
            <input
                type="text"
                id="fname"
                name="Fname"
                value={form.Fname}
                onChange={handleChange}
                required
            />

            <br />

            <label htmlFor="lname">Last Name:</label>
            <input
                type="text"
                id="lname"
                name="Lname"
                value={form.Lname}
                onChange={handleChange}
                required
            />

            <br />

            <label htmlFor="dob">Date of Birth:</label>
            <input
                type="date"
                id="dob"
                name="DoB"
                value={form.DoB}
                onChange={handleChange}
                required
            />

            <br />

            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="Password"
                value={form.Password}
                onChange={handleChange}
                required
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
                required
            />

            <br />


            <label htmlFor="line1">Address Line 2:</label>
            <input
                type="text"
                id="line2"
                name="Line2"
                value={form.Line2}
                onChange={handleChange}
                required
            />

            <br />


            <label htmlFor="city">City:</label>
            <input
                type="text"
                id="city"
                name="City"
                value={form.City}
                onChange={handleChange}
                required
            />

            <br />


            <label htmlFor="postcode">Postcode:</label>
            <input
                type="text"
                id="postcode"
                name="Postcode"
                value={form.Postcode}
                onChange={handleChange}
                required
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