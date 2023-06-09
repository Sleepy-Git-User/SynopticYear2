import FoodPageUserView from "./FoodPageUserView.jsx";
import FoodPageBusinessView from "./FoodPageBusinessView.jsx";
import React, { useState } from 'react' 
import "./Food.css";

export default function FoodPage() {
  const [tab, setTab] = useState(<FoodPageUserView />);

  return (
    <div id="pageContainer">
      <div className="bannerFood">
        <h1>Food</h1>
      </div>
      <br/>
      <div className="mainInfo"> 
      <div className ="group-buttons">
        <button className="userViewBtn" onClick={() => setTab(<FoodPageUserView />)}>User View</button>
        <button className="BusinessViewBtn" onClick={() => setTab(<FoodPageBusinessView />)}>Business View</button>
      </div>
      </div>
      {tab}
    </div>
  );
}