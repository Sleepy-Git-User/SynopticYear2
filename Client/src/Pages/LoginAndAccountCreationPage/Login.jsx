import React, { useState } from "react";
import { setUserId, getUserId } from "../../auth";
import CreateUser from "./CreateUser";

import LoginForm from "./LoginForm";
import CreateListing from "../FoodPage/CreateListing"; 
import "./Login.css";
//import ReviewTemplate from "../ReviewTemplate/ReviewTemplate.jsx";


export default function Login({ saveId }) {

    const [form, setForm] = useState(<LoginForm saveId={saveId} />);
    const [number, setNumber] = useState(0);

    const toggleForm = () => {
        if (number === 0) {
            setForm(<CreateUser saveId={saveId} />);
            setNumber(1);
        } else {
            setForm(<LoginForm saveId={saveId} />);
            setNumber(0);
        }
    }
    return (
        <div id="pageContainer"> 
           <div class="bannerLogIn">
                <h1>Grab It & Govan</h1>
           </div>

            {form}
            <button className="changeBtn" onClick={toggleForm}>Change Form</button>
        </div>
    );
}






