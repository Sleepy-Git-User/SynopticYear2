import "./Advice.css";
import React from "react";
import ReactDOM from "react-dom";

export default function AdvicePanel({content}) {
    return ReactDOM.createPortal (
        <div>
            <p>{content}</p>
        </div>
        ,document.getElementById("pageContainer")
    );
}