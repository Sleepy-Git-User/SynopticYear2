
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function FoodPageUserView() {

  //Will need functions to get listings -

  const [listings, setListings] = useState([]);
  const [QuantityValue, setQuantityValue] = useState(1)

  const [filter, setFilter] = useState({
    Vegan: false,
    Vegetarian: false,
    Halal: false,
    Kosher: false,
  });

  const getListings = () => {
    console.log(filter);
    axios
      .post("/api/getListings", filter, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .then((info) => {
        if (info.success) {
          console.log("TRUE!");
          setListings(info.data);
          console.log(listings);
        } else {
          setListings("Error - listings cannot be shown.");
        }
      });
  };


  const reserveItem = (passedIn) => {

    console.log("HERE");
    axios
      .post("/api/reserveItem", passedIn, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .then((info) => {
        console.log(info);
        if (info.success) {
          alert("Reservation Successful!");
        } else {
          alert("Reservation failed. Please try again.");
        }
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
      setFilter(prevState => ({
        ...prevState,
        [value]: checked
      }));
    } else {
      // Remove the category
      setFilter(prevState => ({
        ...prevState,
        [value]: checked
      }));
    }

  };



  useEffect(() => {
    fetchCategories();
    getListings();
  }, [filter])



  return (


    <div>


      <div class="mainInfo">
        <h2>User</h2>
        <div>
            
              
            <div id="pageContainer">  
                <div className='userViewGrid'>
                
                <div className='filtersBox'>
                    <h3>Filters</h3>
                
                    {categories.map((category) => (
            <div key={category.CategoryID}>
              <input
                type="checkbox"
                id={category.CategoryID}
                name="Category"
                value={category.Name}
                checked={category[category.Name]}
                onChange={handleCategoryChange}
              />
              <label htmlFor={category.CategoryID}>{category.Name}</label>
            </div>
          ))}
                </div>
                <div className='listingsBox'>
                    <h3>Listings</h3>
                    {/*Call a function to get all listings on a useEffect, and call it again when a filter is changed.*/}
                    {/*Each one should have a form to specify quantity and a button to submit, on which a function call is done to reserve the item*/}
                    {listings.map((listing) => (
                        <form key={listing.ListingID}>
                            <div>{listing.Name}</div>
                            <div>{listing.Description}</div>
                            <div>Price: £{listing.Price}</div>
                            <div>Total Quantity: {listing.Quantity}</div>
                            <label htmlFor="name">Quantity: </label>
                        <input
                            type="number"
                            id="quantity"
                            name="Quantity"
                            default="1"
                            value={QuantityValue}
                            onChange={(e) => setQuantityValue(e.target.value)}
                            max={listing.Quantity}
                        />
                        <button onClick={() => reserveItem({ListingID: listing.ListingID, BuyerID: sessionStorage.getItem("userId"), Quantity: QuantityValue.toString() })}>Reserve</button>
                        </form>
                    ))}
                </div>
                </div>


        </div>
        <div>

          {/*Call a function to get all listings on a useEffect, and call it again when a filter is changed.*/}
          {/*Each one should have a form to specify quantity and a button to submit, on which a function call is done to reserve the item*/}
          {listings.map((listing) => (
            <form key={listing.ListingID}>
              <img src={listing.img} alt="Listing Image" width="75" height="75" />
              <div>{listing.Name}</div>
              <div>{listing.Description}</div>
              <div>Price: £{listing.Price}</div>
              <div>Total Quantity: {listing.Quantity}</div>
              <label htmlFor="name">Quantity: </label>
              <input
                type="number"
                id="quantity"
                name="Quantity"
                default="1"
                value={QuantityValue}
                onChange={(e) => setQuantityValue(e.target.value)}
                max={listing.Quantity}
              />
              <button onClick={() => reserveItem({ ListingID: listing.ListingID, BuyerID: sessionStorage.getItem("userId"), Quantity: QuantityValue.toString() })}>Reserve</button>


            </form>
          ))}
        </div>


      </div>


    </div>
    </div>
  );
}