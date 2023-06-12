//Should show user details
//Have form for adding a business
//Will keep that business linked to the user after
import React, { useState, useEffect } from "react";
import CreateBusiness from "./CreateBusiness.jsx"
import BusinessDetails from "./BusinessDetails.jsx";
import axios from 'axios';
//Colour blind option 
import "./Account.css";





export default function AccountPage() {

    const [businessState, setBusinessState] = useState(<CreateBusiness />);
    const [userDetails, setUserDetails] = useState();
    const [boughtItems, setBoughtItems] = useState([]);

    const getUserDetails = () => {
        axios
          .post("/api/getUserDetails", {
            UserID: sessionStorage.getItem("userId"),
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => response.data)
          .then((info) => {
            if (info.success) {
              setUserDetails(
                <div className="userInfo"> 
                <h2>User Details</h2>
                <div className="info">
                  Name: {info.data[0].Fname} {info.data[0].Lname} <br />
                  Email: {info.data[0].Email}<br />
                  Phone: {info.data[0].PhoneNumber}
                </div>
                </div>
              );
            } else {
              setUserDetails("Error getting user details.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };

    
      const getBoughtItems = () => {
        axios
          .post("/api/getBoughtItems", {
            UserID: sessionStorage.getItem("userId"),
          }, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => response.data)
          .then((info) => {
            if (info)
             {
                setBoughtItems(info.data)
                console.log(boughtItems);
            } else {
              setBoughtItems([]);
            }
          })
          .catch((error) => {
            setBoughtItems([]);
          });
      };
    

    useEffect(() => {
        // Try and get business ID for a user
        const businessID = sessionStorage.getItem('businessId');
        console.log("BUSINESSID");
        console.log(businessID);

        if (businessID === 'null'){
            setBusinessState(<CreateBusiness />);
        } else {
            setBusinessState(<BusinessDetails />)
        }

        //Get User details
        getUserDetails();

        getBoughtItems();

      }, [])

    return (
        <div id="pageContainer">

            <div class="bannerAccount">
                <h1>Hello, User</h1>
                
            </div> 
            <div className="gridContainerAccountPage">
            
            
                {/* <h2>User Details</h2> */}
                {/*Get User Details and put in here */}
                {userDetails}
            

            <div className="business">
                {businessState}
            </div>


          <div className="purchaseHistory">
          <h2>Purchase History</h2>
          {/*Map all items in a purchase history here! */}
          {boughtItems !== null ? (
            boughtItems.map((boughtItem) => (
              <div key={boughtItem.Purchase.Code}>
                <br />
                <img src={boughtItem.Listing.img} alt="Listing Image" width="75" height="75" />
                <p>Name: {boughtItem.Listing.Name}</p>
                <p>Description: {boughtItem.Listing.Desc}</p>
                <p>Price: £{boughtItem.Listing.Price}</p>
                <p>Quantity: {boughtItem.Purchase.Quantity}</p>
                <p>Code: {boughtItem.Purchase.Code}</p>
                <br />
              </div>
            ))
          ) : (
            <p>No purchases found.</p>
          )}
        </div>


            <div className="reviews">
                <h2>Your Reviews</h2>
                {/* Should ONLY appear if a user has a business */}
            </div> 

            </div>


        </div>
    );
}