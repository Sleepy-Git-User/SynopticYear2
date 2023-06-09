import React, { useState } from "react";
import axios from 'axios';

function CreateBusiness({ }) {

    const userID = sessionStorage.getItem('userId');
    const [file, setFile] = useState(null);
    //Form data for creating a business (including address)
    const [form, setForm] = useState({
        Bname: "",
        Email: "",
        PhoneNumber: "",
        Line1: "",
        Line2: "",
        City: "",
        Postcode: "",
        UserID: userID
    });


    const [error, setError] = useState("");


    //Handles submission of a new account - will need a
    // createUser method for this!
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach(key => {
            formData.append(key, form[key]);
        });
        formData.append("file", file, {
            type: file.type
        });
        console.log(form);
        await axios
            .post("/api/makeBusiness", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => response.data)
            .then((data) => {
                if (data.success) {
                    setError("");
                    alert("Business Created!");
                    sessionStorage.setItem("businessId", data.data);
                    window.location.reload();
                } else {
                    setError(data.data);
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



    //Returns the create business form
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Business</h2>

            <label htmlFor="bname">Business Name:</label>
            <input
                type="text"
                id="bname"
                name="Bname"
                value={form.Bname}
                onChange={handleChange}
            />


            <br />

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
                Create Business
            </button>
        </form>
    );
}

export default CreateBusiness;

