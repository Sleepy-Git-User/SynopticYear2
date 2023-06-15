import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function VerifyEmail() {

    const [success, setSuccess] = useState(false);

    function verifyEmail() {
        const urlParams = new URLSearchParams(window.location.search);
        let ID = urlParams.get("userID");
        let userID = { UserID: ID }
        console.log(userID);
        if (ID !== null) {
            axios.post("/api/verifyEmail/", userID)
                .then((response) => response.data)
                .then((data) => {
                    if (data) {
                        setSuccess(true);
                        alert("Your email has been successfully verified");
                        window.location.href = "/";
                    } else {
                        setSuccess(false);

                    }
                }
                )
                .catch((error) => {
                    console.error("Error:", error);
                }
                );
        }
    }

    useEffect(() => {
        verifyEmail();
    }, []);

    return (
        <div>
            {success ? <div><h1>Your email has been successfully verified</h1></div> : <div><h1>Failed to verify email</h1></div>}
        </div>
    )
};