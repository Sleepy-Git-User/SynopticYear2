import React, { useState } from "react";
import axios from 'axios';

function CreateListing({  }) {
    
    //Form data for creating a business (including address)
    const [form, setForm] = useState({
        Name: "",
        Desc: "",
        Price: "",
        img: null,
        Quantity: "",
        SellerID: sessionStorage.getItem("businessId"),
        ListingDate: new Date(),
        EndDate: ""
    });


    //Handles submission of a new account - will need a
    // createUser method for this!
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);
        axios
          .post("/api/createListing", form, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => response.data)
          .then((data) => {
            if (data) {
              alert("Listing Created!");
            } else {
              alert("Invalid listing creation details.");
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



    //Returns the create listing form
    return (
        <form onSubmit={handleSubmit}>

            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="Name"
                value={form.Name}
                onChange={handleChange}
            />


            <br />

            <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="desc"
                    name="Desc"
                    value={form.Desc}
                    onChange={handleChange}
                />

            <br />

            <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    min="0"
                    step="0.01"
                    name="Price"
                    value={form.Price}
                    onChange={handleChange}
                />

            <br />

            <label htmlFor="quantity">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    min="1"
                    name="Quantity"
                    value={form.Quantity}
                    onChange={handleChange}
                />
            
            <br />
            
            <label htmlFor="enddate">End Date:</label>
            <input
                type="date"
                id="EndDate"
                name="EndDate"
                value={form.EndDate}
                onChange={handleChange}
            />

            <br />
            <br />
            <br />

            <button type="submit">
                Create Listing
            </button>
        </form>
    );
}

export default CreateListing;