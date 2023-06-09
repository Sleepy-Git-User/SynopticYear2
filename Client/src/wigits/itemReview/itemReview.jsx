import React, { useState, useEffect } from "react";
import axios from "axios";
import "./itemReview.css";
import emptystr from "/emptystr.svg";
import fullstr from "/fullstr.svg";
import BusinessReviews from "../businessReviews/businessReviews";

export default function ItemReviews(ListingID) {
    const [loading, setLoading] = useState(true); // add this state
    const [Review, setReview] = useState([
        {
            ID: null,
            ReviewerName: null,
            Rating: null,
            Title: null,
            Desc: null,
            Date: null,
            img: null,
        },
    ]);

    const stars = (rating, fullstr, emptystr) => {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<img src={fullstr} alt="star" width="15" height="15" />);
        }
        for (let i = rating; i < 5; i++) {
            stars.push(
                <img src={emptystr} alt="star" width="15" height="15" />
            );
        }
        return stars;
    };

    const getReviews = async (ID) => {
        setLoading(true);

        await axios.post("/api/getItemReviews", ID).then((res) => {
            console.log(res.data.data);
            setReview(res.data.data);
        });
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        getReviews({ ListingID: "dbc8fb07-0fd5-4581-8191-90b7edd26659" });
    }, [ListingID]);

    return (
        <h2 id="loading">
            {loading ? (
                "Loading..."
            ) : (
                <div className="content">
                    <div className="reviews">
                        {Review.map((review) => (
                            <div className="review" key={review.ID}>
                                <div className="reviewName">
                                    <img
                                        src={review.img}
                                        alt="Image"
                                        width="50"
                                        height="50"
                                    />
                                    <h3>{review.ReviewerName}</h3>
                                </div>
                                <div className="reviewHeader">
                                    <div className="reviewRating">
                                        <h3>
                                            {" "}
                                            {stars(
                                                review.Rating,
                                                fullstr,
                                                emptystr
                                            )}
                                        </h3>
                                    </div>
                                    <div className="reviewTitle">
                                        <h3>{review.Title}</h3>
                                    </div>
                                </div>
                                <div className="reviewDate">
                                    <h3>Review on {review.Date}</h3>
                                </div>
                                <div className="reviewDesc">
                                    <p>{review.Desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <BusinessReviews
                        BusinessID={"2f3f4bd9-4236-42d8-ac39-93500601ea82"}
                    />
                </div>
            )}
        </h2>
    );
}
