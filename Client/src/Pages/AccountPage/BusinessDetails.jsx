import React, { useState, useEffect } from "react";
//Colour blind option


const BusinessID = sessionStorage.getItem("businessId")


export default function AccountPage() {

    const [businessInfo, setBusinessInfo] = useState();

    const [businessEmail, setBusinessEmail] = useState();
    const [businessPhoneNumber, setBusinessPhoneNumber] = useState();
    const [businessName, setBusinessName] = useState();

    const [form, setForm] = useState({
        BusinessID: sessionStorage.getItem("businessId")
    });

    const getBusinessDetails= () => {
        fetch("http://localhost:3000/api/getBusinessDetails", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((response) => response.json())

            .then((info) => {
                if (info) {
                    console.log(info);
                    setBusinessEmail(info[0].Email);
                    setBusinessPhoneNumber(info[0].PhoneNumber);
                    setBusinessName(info[0].Bname);
                } else {
                    setBusinessInfo("Error getting business details.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    
    useEffect(() => {
        getBusinessDetails();
    }, [])

    return (
        <div >
        <h3>Business Details</h3>   
        <p>{businessName}</p>
        <p>{businessEmail}</p>
        <p>{businessPhoneNumber}</p>


        </div>
    );
}