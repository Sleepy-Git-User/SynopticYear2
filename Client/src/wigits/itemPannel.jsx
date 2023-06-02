//Get item data from server and display it

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./itemPannel.css";

export default function ItemPannel(PurchaseID) {
	const [listing, setListing] = useState({
		ID: null,
		Name: null,
		img: null,
		Price: null,
		Quantity: null,
		Date: null,
	});

	const getListing = (ID) => {
		console.log(ID);
		axios.get("/api/getItemPannel/" + ID).then((res) => {
			console.log(res.data);
			setListing(res.data);
		});
	};

	useEffect(() => {
		getListing(PurchaseID);
	}, []);

	return (
		<div className="itemPannel">
			<div className="itemHeader">
				<div className="itemDP">
					<div className="itemDate">
						<h1>Date: </h1>
						<h1 id="purchaseDateInput">24/03/2003</h1>
					</div>
					<div className="itemPrice">
						<h1>Price: </h1>
						<h1 id="purchasePriceInput">£0.00</h1>
					</div>
				</div>
				<div className="purchaseID">
					<h1>PurchaseID: </h1>
					<h1 id="purchaseIDInput">0000000 </h1>
				</div>
			</div>
			<div className="itemMain">
				<img id="itemLogo" src={listing.img} alt="Item Image" />
				<div className="itemInfo">
					<p id="itemName">Test Item</p>
					<p id="itemQuantity">Quantity</p>
				</div>
			</div>
		</div>
	);
}
