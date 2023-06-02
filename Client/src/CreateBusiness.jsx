import React, { useState } from "react";


function CreateBusiness({  }) {
    
    //Form data for creating a business (including address)
    const [form, setForm] = useState({
        Bname: "",
        Email: "",
        PhoneNumber: "",
        Line1: "",
        Line2: "",
        City: "",
        Postcode: ""
    });


    //Handles submission of a new account - will need a
    // createUser method for this!
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);
        fetch("http://localhost:3000/api/makeBusiness", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((response) => response.json())

            .then((data) => {
                if (data) {
                    
                    alert("Business Created!");
                } else {
                    alert("Invalid business creation details.");
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



            <br />
            <br />
            <br />

            <button type="submit">
                Create Business
            </button>
        </form>
    );
}

export default CreateBusiness;

