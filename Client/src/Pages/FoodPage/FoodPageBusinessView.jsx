import CreateListing from "./CreateListing.jsx";
import React, {useState, useEffect} from 'react';

export default function FoodPageBusinessView() {

    const [listings, setListings] = useState([]);
    const [businessUser, setBusinessUser] = useState(false);
    const businessId = sessionStorage.getItem("businessId")

    const getBusinessListings= () => {
        fetch("http://localhost:3000/api/getBusinessListings", {
            method: "POST",
            body: JSON.stringify({ BusinessID: businessId }),
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((response) => response.json())

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

    useEffect(() => {
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
            
              
            <div class="mainInfo">
            {businessUser && <div><h2>Business</h2>
                {/* Check to see if a business id is stored in session storage, otherwise show an error message */}

                <div>
                <div>
                    <h3>Add Listing</h3>
                    <CreateListing />
                </div>
                <div>
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
                <div>
                    <h3>Filters</h3>
                    {/*Will need Georges help with filters*/}
                </div>
                </div></div>}

                {!businessUser && <p> You are not registered as a business user. Please register as one on the account page to access this.</p>}





            </div>


        </div>
    );
}