//Should show user details
//Have form for adding a business
//Will keep that business linked to the user after
import React, { useState, useEffect } from "react";
import CreateBusiness from "./CreateBusiness.jsx"
import BusinessDetails from "./BusinessDetails.jsx";
//Colour blind option





export default function AccountPage() {

    const [businessState, setBusinessState] = useState(<CreateBusiness />);

    useEffect(() => {
        // Try and get business ID for a user
        const businessID = sessionStorage.getItem('businessId');

        if (businessID === null){
            setBusinessState(<CreateBusiness />);
        } else {
            setBusinessState(<BusinessDetails />)
        }

        //Get User details

        //If business does not exist, render form to add one
        

        //Else, render business details
            //Fetch their reviews
            //

      }, [])

    return (
        <div id="pageContainer">

            <div class="banner">
                <h1>Account</h1>
                
            </div>

            <div class="mainInfo">
                <p> Text goes in here aaaaaaaaaaaaaaaaaaaaaa </p>
                <img></img>
            </div>

            <div>
                {businessState}
            </div>


            <div>
                <h2>User Details</h2>
                {/*Get User Details and put in here */}
            </div>



            <div>
                <h2>Purchase History</h2>
                {/*Get purchase history details and map in here*/}
            </div>


            <div>
                <h2>Your Reviews</h2>
                {/* Should ONLY appear if a user has a business */}
            </div>


        </div>
    );
}