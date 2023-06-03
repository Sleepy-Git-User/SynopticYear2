//Get business data from server and display it
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./businessPannel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function BusinessPannel(BusinessID) {
	const [business, setBusiness] = useState({
		ID: null,
		Name: null,
		IMG: null,
		Rating: null,
		RatingCount: null,
	});

	const getBusiness = (ID) => {
		console.log(ID);
		axios.get("/api/getBusinessPannel/" + ID).then((res) => {
			console.log(res.data);
			setBusiness(res.data);
		});
	};

	// useEffect(() => {
	//     getBusiness(BusinessID);
	// }, []);

	return (
		<div className="businessPannel">
			<img className="businessLogo" src={null} alt="Business Image" />

			<p className="businessName">Test Business</p>
			<div className="businessStats">
				<p className="businessRating">___ Rating </p>
				<p className="businessSold"> Items Sold: </p>
			</div>
			<div className="businessContact">
				<FontAwesomeIcon
					icon={faEnvelope}
					style={{ color: "#000000" }}
				/>
				<p className="businessEmail">Contact Seller</p>
			</div>
		</div>
	);
}
