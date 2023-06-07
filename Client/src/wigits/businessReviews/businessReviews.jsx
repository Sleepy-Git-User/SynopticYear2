import React, { useState, useEffect } from "react";
import axios from "axios";
import "./businessReviews.css";

export default function BusinessReviews(BusinessID) {
    const [loading, setLoading] = useState(true); // add this state
    const [Review, setReview] = useState([{
        ID: null,
        Fname: null,
        Rating: null,
        Title: null,
        Date: null,
    }]);

    const getReviews = async (ID) => {
        setLoading(true);
        await axios.post("/api/getBuseinessReviews", ID.BusinessID).then((res) => {
            let date = new Date(res.data.data.Date);
            res.data.data.Date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
            setReview(res.data.data);
        });
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getReviews("2f3f4bd9-4236-42d8-ac39-93500601ea82");
    }, [BusinessID]);

    return (
        <h2 id="loading">
            {loading ? (
                "Loading..."
            ) : (
                <div className="content">
                    <div className="reviews">
                        {Review.map((review) => (
                            <div className="review">
                                <div className="reviewRating">
                                    <h3>{review.Rating}★</h3>
                                </div>
                                <div className="reviewRating">
                                    <h3>{review.Fname} • </h3>
                                </div>
                                <div className="reviewDate">
                                    <h3>{review.Date}</h3>
                                </div>
                                <div className="reviewTitle">
                                    <h3>{review.Title}</h3>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            )}



        </h2>
    );
};