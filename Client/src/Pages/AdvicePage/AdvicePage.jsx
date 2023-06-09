//Graces advice page
//If we have time, make it not static


import "./Advice.css";

export default function AdvicePage() {
    return (
        <div id="pageContainer">
            <div class="bannerAdvice">
                <h1>Advice</h1>
                
            </div>
            <div class="gridContainerAdvice">
                <div class="infoBox1">
                    <h2>Budget Meals</h2>
                    <div className="HealthBox1"> 
                    <p> £5 Meals </p>
                    </div>
                    <div className="HealthBox2"> 
                    <p> £5 Meals </p>
                    </div>
                </div>
                <div class="infoBox2">
                    <h2>Schemes and Charities</h2>
                    <div className="CharityBox1"> 
                    <p> £5 Meals </p>
                    </div>
                    <div className="CharityBox2"> 
                    <p> £5 Meals </p>
                    </div>
                </div>
                <div class="infoBox3">
                    <h2>Deals</h2> 
                    <div className="DealsBox1"> 
                    <p> £5 Meals </p>
                    </div>
                    <div className="DealsBox2"> 
                    <p> £5 Meals </p>
                    </div>
                </div>
                <div class="infoBox4">
                    <h2>Community Events</h2>
                    <div className="EventsBox1"> 
                    <p> £5 Meals </p>
                    </div>
                    <div className="EventsBox2"> 
                    <p> £5 Meals </p>
                    </div>
                </div>
            </div>


        </div>
    );
}