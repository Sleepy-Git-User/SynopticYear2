//Get item data from server and display it

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./itemPannel.css";

export default function ItemPannel(PurchaseID) {
    const [loading, setLoading] = useState(true); // add this state
    const [listing, setListing] = useState({
        ID: null,
        Name: null,
        img: null,
        Price: null,
        Quantity: null,
        Date: null,
    });

    const getListing = async (ID) => {
        setLoading(true);
        await axios.get("/api/getItemPannel/" + ID.purchaseID).then((res) => {
            let date = new Date(res.data.data.Date);
            res.data.data.Date =
                date.getDate() +
                "/" +
                date.getMonth() +
                "/" +
                date.getFullYear();
            setListing(res.data.data);
        });
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getListing(PurchaseID);
    }, []);

    return (
        <div className="itemPannel">
            <h2 id="loading">
                {loading ? (
                    "Loading..."
                ) : (
                    <div>
                        <div className="itemHeader">
                            <div className="itemDP">
                                <div className="itemDate">
                                    <h1>Date: </h1>
                                    <h1 id="purchaseDateInput">
                                        {listing.Date}
                                    </h1>
                                </div>
                                <div className="itemPrice">
                                    <h1>Price: </h1>
                                    <h1 id="purchasePriceInput">
                                        £{listing.Price}
                                    </h1>
                                </div>
                            </div>
                            <div className="purchaseID">
                                <h1>PurchaseID: </h1>
                                <h1 id="purchaseIDInput">#{listing.ID} </h1>
                            </div>
                        </div>
                        <div className="itemMain">
                            <div id="itemLogo">
                                <img
                                    alt="Item Image"
                                    src="https://synopticproject.blob.core.windows.net/images/account.png"
                                    width="100"
                                    height="100"
                                />
                            </div>
                            <div className="itemInfo">
                                <p id="itemName">{listing.Name}</p>
                                <p id="itemQuantity">
                                    Quantity: {listing.Quantity}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </h2>
        </div>
    );
}
