import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { BrowserRouter, Routes, Route } from "react-router-dom";

import { setUserId, getUserId } from "./auth";

import Login from "./Pages/LoginAndAccountCreationPage/Login.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Pages/HomePage/Home.jsx";



function Main() {
  
  const [userIdUpdate, setUserIdUpdate] = useState(null);
  const storedId = sessionStorage.getItem('userId');


  const saveId = (id) => {
    setUserIdUpdate(id);
    sessionStorage.setItem('userId', id);
    console.log(id);
  };

  useEffect(() => {
    if (storedId !== null) {
      saveId(storedId);
    }
  }, []);

  if (userIdUpdate !== null) {
    return (
      <BrowserRouter>
        <Navbar saveId={saveId}/>

        <Routes>
          <Route path="/" element={<Home />} />

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
