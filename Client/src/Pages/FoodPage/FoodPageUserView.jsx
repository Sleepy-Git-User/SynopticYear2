
import React, {useState, useEffect} from 'react';

export default function FoodPageUserView() {

    //Will need functions to get listings -

    const [listings, setListings] = useState([]);
    const [QuantityValue, setQuantityValue] = useState(1)
    const getListings = () => {
        fetch("/api/getListings", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((info) => {
                if(info.success){
                    console.log("TRUE!")
                    setListings(info.data);
                    console.log(listings);
                }
                else {
                    setListings("Error - listings cannot be shown.");
                }
            });
    };


    const reserveItem = (passedIn) => {
        fetch("/api/reserveItem", {
            method: "POST",
            body: JSON.stringify(passedIn),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((info) => {
                if(info.success){
                    alert("Reservation Successful!")
                }
                else {
                    alert("Reservation failed. Please try again.")
                }
            });
    };


    useEffect(() => {
        getListings();
      }, [])



    return (


        <div>
            
              
            <div class="mainInfo">
                <h2>User</h2>
                <div>
                    <h3>Filters</h3>
                    {/*Need George to help with filters really? */}
                </div>
                <div>
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
    );
}