import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./ReviewTemplate.css";
import businessPannel from "./wigits/businessPannel";
import itemPannel from "./wigits/itemPannel";
import BusinessPannel from "./wigits/businessPannel";
import ItemPannel from "./wigits/itemPannel";
import emptystr from "/emptystr.svg";
import fullstr from "/fullstr.svg";
import { useNavigate } from "react-router-dom";
//I want this to be the page that leads from a email link
//I want to import and purchaseID from the link

export default function ReviewTemplate() {
	const [loading, setLoading] = useState(false); // add this state
	const [purchaseID, setPurchaseID] = useState();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		PurchaseID: null,
		BusinessID: null,
		BuyerID: null,
		Rating: 0,
		Review: "",
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

	const stars = (rating, fullstr, emptystr, handleClick) => {
		let stars = [];
		for (let i = 0; i < rating; i++) {
			stars.push(
				<button
					className="strBtn"
					value={i}
					onClick={() => handleClick(i)}
				>
					<img src={fullstr} alt="star" />
				</button>
			);
		}
		for (let i = rating; i < 5; i++) {
			stars.push(
				<button
					className="strBtn"
					value={i}
					onClick={() => handleClick(i)}
				>
					<img src={emptystr} alt="star" />
				</button>
			);
		}
		return stars;
	};

	const handleClick = (i) => {
		setForm({ ...form, Rating: i + 1 });
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("submitting");
		console.log(form);
		axios.post("/api/submitReview", form).then((res) => {
			console.log(res.status);
		});
		navigate("/");
	};

	useEffect(() => {
		getPurchaseID();
	}, [purchaseID]);

	return (
		<div>
			<h1 id="reviewHeader">Create Review</h1>
			<h2>
				{loading ? (
					"Loading..."
				) : (
					<div>
						<BusinessPannel businessID={purchase.BusinessID} />
						<ItemPannel purchaseID={purchase.PurchaseID} />
						<div className="review">
							<h1 id="formTitle">Write a Review:</h1>
							<div id="rating">
								<label htmlFor="rating">Rating:</label>
								<div id="stars" value={form.Rating}>
									{stars(
										form.Rating,
										fullstr,
										emptystr,
										handleClick
									)}
									<button
										id="clearBtn"
										onClick={() => handleClick(-1)}
									>
										Clear
									</button>
								</div>
							</div>
							<form id="reviewForm" onSubmit={handleSubmit}>
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
									<button type="submit">Submit</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</h2>
		</div>
	);
}
