import CreateListing from "./CreateListing.jsx";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function FoodPageBusinessView() {

    const [listings, setListings] = useState([]);
    const [businessUser, setBusinessUser] = useState(false);
    const businessId = sessionStorage.getItem("businessId")

    const [form, setForm] = useState({
        Category: [],
    });

    const getBusinessListings = () => {
        axios
          .post("/api/getBusinessListings", { BusinessID: businessId }, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => response.data)
          .then((info) => {
            if (info) {
              console.log(info);
              setListings(info);
            } else {
              setListings("Error getting your listings.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
    

    const [categories, setCategories] = useState([]);
    
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

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
      
        if (checked) {
          // Add the category
          setForm((prevForm) => ({
            ...prevForm,
            Category: [...prevForm.Category, value],
          }));
        } else {
          // Remove the category 
          setForm((prevForm) => ({
            ...prevForm,
            Category: prevForm.Category.filter((category) => category !== value),
          }));
        }
      };



    useEffect(() => {
        fetchCategories();
        console.log(sessionStorage.getItem("businessId"));
        if (sessionStorage.getItem("businessId") !== null){
            getBusinessListings();
            setBusinessUser(true);
        } else {
            setBusinessUser(false);
        }
      }, [])

    return (
        <div>
            
              
            <div id="pageContainer">
            {businessUser && <div>
                {/* Check to see if a business id is stored in session storage, otherwise show an error message */}

                <div className="businessViewGrid">
                
                    {/* <h3>Add Listing</h3> */}
                    <CreateListing />
                
                <div className="yourListingsBox">
                    <h3>Your Listings</h3>
                    {/*Function call to get a businesses listings and put each as an item in here*/}
                    {listings.map((listing) => (
                        <div>
                            <div>{listing.Name}</div>
                            <div>{listing.Description}</div>
                            <div>Price: £{listing.Price}</div>
                            <div>Total Quantity: {listing.Quantity}</div>
                            
                        </div>
                    ))}
                </div>
                <div className="businessFiltersBox">
                    <h3>Filters</h3>
                    {/*Will need Georges help with filters*/}


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
                </div>
                </div></div>}

                {!businessUser && <p> You are not registered as a business user. Please register as one on the account page to access this.</p>}





            </div>


        </div>
    );
}