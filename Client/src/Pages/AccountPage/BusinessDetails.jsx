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
          setBusinessName(info[0].Bname);
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
    <div >
      <h3>Business Details</h3>
      <img src={businessImg} alt="Business Logo" width="100" height="100" />
      <p>{businessName}</p>
      <p>{businessEmail}</p>
      <p>{businessPhoneNumber}</p>


    </div>
  );
}