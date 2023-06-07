import FoodPageUserView from "./FoodPageUserView.jsx";
import FoodPageBusinessView from "./FoodPageBusinessView.jsx";
import React, { useState } from 'react'

export default function FoodPage() {
  const [tab, setTab] = useState(<FoodPageUserView />);

  return (
    <div id="pageContainer">
      <div className="banner">
        <h1>Food</h1>
      </div>
      <br/>
      <div className="mainInfo">
        <button onClick={() => setTab(<FoodPageUserView />)}>User View</button>
        <button onClick={() => setTab(<FoodPageBusinessView />)}>Business View</button>
      </div>
      {tab}
    </div>
  );
}