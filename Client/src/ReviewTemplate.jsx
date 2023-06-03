import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./ReviewTemplate.css";
import businessPannel from "./wigits/businessPannel";
import itemPannel from "./wigits/itemPannel";
import BusinessPannel from "./wigits/businessPannel";
import ItemPannel from "./wigits/itemPannel";

//I want this to be the page that leads from a email link
//I want to import and purchaseID from the link

export default function ReviewTemplate() {
	const [loading, setLoading] = useState(false); // add this state
	const [purchaseID, setPurchaseID] = useState();

	const [form, setForm] = useState({
		PurchaseID: null,
		BusinessID: null,
		BuyerID: null,
		Rating: null,
		Review: null,
		Date: null,
	});

	const [purchase, setPurchase] = useState({
		PurchaseID: null,
		ListingID: null,
		BusinessID: null,
		BuyerID: null,
		Quantity: null,
		Date: null,
	});

	const getPurchaseID = async () => {
		setLoading(true);
		const urlParams = new URLSearchParams(window.location.search);
		let ID = urlParams.get("purchaseID");
		setPurchaseID(ID);

		if (ID) {
			await getPurchase(ID);
		}
		setLoading(false);
	};

	const getPurchase = async (ID) => {
		console.log(ID);
		await axios.get("/api/getPurchase/" + ID).then((res) => {
			console.log(res.status);
			setPurchase(res.data);
		});
		setForm({
			...form,
			PurchaseID: purchase.ID,
			ListingID: purchase.ListingID,
			BusinessID: purchase.BusinessID,
			BuyerID: purchase.BuyerID,
		});
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submitting");
		axios.post("/api/submitReview", form).then((res) => {
			console.log(res.status);
		});
	};

	// useEffect(() => {
	// 	getPurchaseID();
	// }, [purchaseID]);

	return (
		<div>
			<h1>Review Template</h1>
			<h2>purchaseID: {purchaseID}</h2>
			<h2>
				{loading ? (
					"Loading..."
				) : (
					<div>
						<BusinessPannel businessID={null} />
						<ItemPannel itemID={null} />
						<div className="review">
							<h1 id="formTitle">Write a Review:</h1>
							<form id="reviewForm">
								<label for="rating">Rating:</label>
								<input
									type="range"
									id="Rating"
									name="Rating"
									min="1"
									max="5"
									value={form.Rating}
									onChange={handleChange}
									required
								></input>
								<label for="review">Review:</label>
								<textarea
									type="text"
									id="Review"
									name="Review"
									value={form.Review}
									onChange={handleChange}
									required
								></textarea>
								<div id="reviewBtn">
									<button
										type="submit"
										onSubmit={handleSubmit}
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</h2>
		</div>
	);
}
