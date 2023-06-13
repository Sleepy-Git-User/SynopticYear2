import React, { useState, useEffect } from "react";
//Colour blind option
import axios from 'axios';

const BusinessID = sessionStorage.getItem("businessId")


export default function AccountPage() {

  const [businessInfo, setBusinessInfo] = useState();

  const [businessEmail, setBusinessEmail] = useState();
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState();
  const [businessName, setBusinessName] = useState();
  const [businessImg, setBusinessImg] = useState();

  const [form, setForm] = useState({
    BusinessID: sessionStorage.getItem("businessId")
  });

  const getBusinessDetails = () => {
    axios
      .post("/api/getBusinessDetails", form, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .then((info) => {
        if (info) {
          console.log(info);
          setBusinessEmail(info[0].Email);
          setBusinessPhoneNumber(info[0].PhoneNumber);
          setBusinessName(info[0].Name);
          setBusinessImg(info[0].img);
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
    <div className="businessDetails"> 
      <h2>Business Details</h2>
      <div className="details"> 
      <img className="businessImg" src={businessImg} alt="Business Logo" width="100" height="100" />
      <p>Name: {businessName}</p>
      <p>Email: {businessEmail}</p>
      <p>Phone: {businessPhoneNumber}</p>
      </div>
    </div>
  );
}