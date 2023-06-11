import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { BrowserRouter, Routes, Route } from "react-router-dom";

import { setUserId, getUserId } from "./auth";

import Login from "./Pages/LoginAndAccountCreationPage/Login.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Pages/HomePage/Home.jsx";
import Footer from "./Footer.jsx";

import AdvicePage from "./Pages/AdvicePage/AdvicePage.jsx";
import AccountPage from "./Pages/AccountPage/AccountPage.jsx";
import FoodPage from "./Pages/FoodPage/FoodPage.jsx";
import ReviewTemplate from './Pages/ReviewTemplate/ReviewTemplate.jsx';
import VerifyEmail from './Pages/VerifyEmail/verifyEmail.jsx';




function Main() {

  const [userIdUpdate, setUserIdUpdate] = useState(null);
  const storedId = sessionStorage.getItem('userId');


  const saveId = (id) => {
    setUserIdUpdate(id);
    console.log("id: " + id)
    sessionStorage.setItem('userId', id);
    console.log("sessionStorage: " + sessionStorage.getItem('userId'))
  };

  useEffect(() => {
    if (storedId !== null) {
      saveId(storedId);
    }
    document.title = "Grab It & Govan";
  }, []);

  if (userIdUpdate !== null) {
    return (
      <BrowserRouter>
        <Navbar saveId={saveId} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Advice" element={<AdvicePage />} />
          <Route path="/Account" element={<AccountPage />} />
          <Route path="/Food" element={<FoodPage />} />
          <Route path="/Review" element={<ReviewTemplate />} />
          <Route path="/verify" element={<VerifyEmail />} />



          <Route
            path="*"
            element={
              <h1>
                <br />
                <br />
                404: No pages here!
              </h1>
            }
          />
        </Routes>

        {/* Add Footer component here */}
        <Footer />
      </BrowserRouter>
    );
  } else {
    return <Login saveId={saveId} />;
  }
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
