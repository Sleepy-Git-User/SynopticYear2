import React, { useState } from "react";
import axios from "axios";
export default function CreateUser({ saveId }) {
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
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    //Handles submission of a new account - will need a
    // makeUser method for this!
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach(key => {
            formData.append(key, form[key]);
        });
        formData.append("file", file, {
            type: file.type
        });
        console.log(formData);
        const response = await axios.post("/api/makeUser", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then((response) => response.data)
            .then((data) => {
                if (data) {
                    alert("Account Created!");
                    console.log(data);
                    saveId(data.data.data);

                } else {
                    alert("Invalid account creation details.");
                }
            }
            )
            .catch((error) => {
                console.error("Error:", error);
            }
            );
    };

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
            <div>
                <label htmlFor="image">Profile Image:</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </div>
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
