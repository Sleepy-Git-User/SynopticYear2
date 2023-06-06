//Get business data from server and display it
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./businessPannel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function BusinessPannel(purchaseID) {
	const [loading, setLoading] = useState(true); // add this state
	const [business, setBusiness] = useState({
		ID: null,
		Name: null,
		IMG: null,
		Rating: null,
		RatingCount: null,
	});

	const getBusiness = async (ID) => {
		setLoading(true);
		axios.get("/api/getBusinessPannel/" + ID.purchaseID).then((res) => {
			console.log(res.data.data);
			setBusiness(res.data.data);
		});
		setLoading(false);
	};

	useEffect(() => {
		setLoading(true);
		getBusiness(purchaseID);
	}, []);

	return (

		<h2 id="loading">
			{loading ? (
				"Loading..."
			) : (
				<div className="businessPannel">
					<img className="businessLogo" src={null} alt="Business Image" />

					<p className="businessName">{business.Name}</p>
					<div className="businessStats">
						<p className="businessRating">{business.Rating} Rating </p>
						<p className="businessSold"> Items Sold: {business.RatingCount} </p>
					</div>
					<div className="businessContact">
						<FontAwesomeIcon
							icon={faEnvelope}
							style={{ color: "#000000" }}
						/>
						<p className="businessEmail">Contact Seller</p>
					</div>
				</div>
			)}
		</h2>

	);
}
