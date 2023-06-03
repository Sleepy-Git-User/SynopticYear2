import React, { useState } from "react";
import { setUserId, getUserId } from "./auth";
import CreateUser from "./CreateUser";
import CreateBusiness from "./CreateBusiness";
import LoginForm from "./LoginForm";
import CreateListing from "./CreateListing";
import ReviewTemplate from "./ReviewTemplate";

export default function Login({saveId}) {

    return (
        <div id="pageContainer">
        <h1> LOGIN PAGE </h1>
        <br/>
        <h1>SCOTLAND = BAD???</h1>
        <br/>

        <LoginForm saveId={saveId} />
        <br/>
        <br/>
        <br/>
        <CreateUser />
        <br/>
        <br/>
        <br/>
        <CreateBusiness />
        <br/>
        <br/>
        <br/>
        <CreateListing />
        <br />
        <br />
        <br />
        <ReviewTemplate />
        
        </div>
    );
}






