//Should show user details
//Have form for adding a business
//Will keep that business linked to the user after
import React, { useState, useEffect } from "react";
import CreateBusiness from "./CreateBusiness.jsx"
import BusinessDetails from "./BusinessDetails.jsx";
//Colour blind option





export default function AccountPage() {

    const [businessState, setBusinessState] = useState(<CreateBusiness />);
    const [userDetails, setUserDetails] = useState();

    const getUserDetails= () => {
        fetch("http://localhost:3000/api/getUserDetails", {
            method: "POST",
            body: JSON.stringify({UserID: sessionStorage.getItem("userId")}),
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((response) => response.json())

            .then((info) => {
                if (info.success) {
                    setUserDetails(<div>Name: {info.data[0].Fname} {info.data[0].Lname} <br/>Email: {info.data[0].Email}<br/>Phone: {info.data[0].PhoneNumber}</div>

                    );
                } else {
                    setUserDetails("Error getting user details.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    

    useEffect(() => {
        // Try and get business ID for a user
        const businessID = sessionStorage.getItem('businessId');
       

        if (businessID === null){
            setBusinessState(<CreateBusiness />);
        } else {
            setBusinessState(<BusinessDetails />)
        }

        //Get User details
        getUserDetails();
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
                {userDetails}
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