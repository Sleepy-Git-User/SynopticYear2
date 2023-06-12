import React, { useState } from "react";
import AdvicePanel from "./AdvicePanel";


import "./Advice.css";

export default function AdvicePage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const [expandedSectionTitle, setExpandedSectionTitle] = useState();
  const [expandedSectionText, setExpandedSectionText] = useState();

  const handleSectionClick = (title, text) => {
    setExpandedSectionTitle(title);
    setExpandedSectionText(text);
    setExpandedSection(title);
  };

  const handleClosePopup = () => {
    setExpandedSection(null);
  };

  return (
    <div id="pageContainer">
              {expandedSection && (
        <div id="popup" onClose={handleClosePopup}>
          <h2>{expandedSectionTitle}</h2>
          <p>{expandedSectionText}</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
      <div className="bannerAdvice">
        <h1>Advice</h1>
      </div>
      <div className="gridContainerAdvice">
        <div
          className="infoBox1">
          <h2>Budget Meals</h2>
          <div className="HealthBox1" onClick={() => handleSectionClick(
            
          "INSERT TITLE",
          
          "INSERT TEXT"
          
          )}>
            <p>£5 Meals</p>
          </div>
          <div className="HealthBox2">
            <p>£5 Meals</p>
          </div>
        </div>
        <div
          className="infoBox2"
          
        >
          <h2>Schemes and Charities</h2>
          <div className="CharityBox1">
            <p>£5 Meals</p>
          </div>
          <div className="CharityBox2">
            <p>£5 Meals</p>
          </div>
        </div>
        <div
          className="infoBox3"
          
        >
          <h2>Deals</h2>
          <div className="DealsBox1">
            <p>£5 Meals</p>
          </div>
          <div className="DealsBox2">
            <p>£5 Meals</p>
          </div>
        </div>
        <div
          className="infoBox4"
        >
          <h2>Community Events</h2>
          <div className="EventsBox1">
            <p>£5 Meals</p>
          </div>
          <div className="EventsBox2">
            <p>£5 Meals</p>
          </div>
        </div>
      </div>
    </div>
  );
}