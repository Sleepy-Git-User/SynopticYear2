import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateListing({ }) {
    //Form data for creating a business (including address)
    const [form, setForm] = useState({
        Name: "",
        Desc: "",
        Price: "",
        img: null,
        Quantity: "",
        Category: [],
        SellerID: sessionStorage.getItem("businessId"),
        ListingDate: new Date(),
        EndDate: "",
    });
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);

    const fetchCategories = () => {
        axios
            .get("/api/categories")
            .then((response) => response.data)
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

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
        axios
            .post("/api/createListing", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
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


    const handleCategoryChange = (event) => {
        console.log("HERE")
        const { value, checked } = event.target;
        console.log(value, checked);

        if (checked) {
            // Add the category
            setForm(prevState => ({
                ...prevState,
                Category: [...prevState.Category, value]
            }));

        } else {
            // Remove the category
            setForm((prevForm) => ({
                ...prevForm,
                Category: prevForm.Category.filter(
                    (category) => category !== value
                ),
            }));
        }
    };

    //Returns the create listing form
    return (
        <div>
        <div className="addListingsBox"> 
        <h3>Add Listing</h3> 
        <form className="listingBoxForm"onSubmit={handleSubmit}>

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

            <label htmlFor="category">Categories:</label>
            {categories.map((category) => (
                <div key={category.CategoryID}>
                    <input
                        type="checkbox"
                        id={category.CategoryID}
                        name="Category"
                        value={category.Name}
                        checked={form.Category.includes(category.Name)}
                        onChange={handleCategoryChange}
                    />
                    <label htmlFor={category.CategoryID}>{category.Name}</label>
                </div>
            ))}

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

            <button className="createListingBtn" type="submit">
                Create Listing
            </button>
        </form> 
        </div>
        </div>
    );
}

export default CreateListing;
