import React, { useState } from "react";
import AdvicePanel from "./AdvicePanel";


import "./Advice.css";

export default function AdvicePage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const [expandedSectionTitle, setExpandedSectionTitle] = useState();
  const [expandedSectionText, setExpandedSectionText] = useState();
  const [navButtonClicked, setNavButtonClicked] = useState(false);

  const handleSectionClick = (title, text) => {
    setExpandedSectionTitle(title);
    setExpandedSectionText(text);
    setExpandedSection(title);
  };

  const handleClosePopup = () => {
    setExpandedSection(null);
  };

  const handleNavButtonClick = () => {
    setNavButtonClicked(!navButtonClicked);
  };



  return (
    <div id="pageContainer">
        {expandedSection && (<div id="popup" className={`${navButtonClicked ? "nav-button-clicked" : ""}`}
    onClose={handleClosePopup}>
    <h2>{expandedSectionTitle}</h2>
    {expandedSectionText}
    <button className="close-btn" onClick={handleClosePopup}>
      <i className="fa-solid fa-xmark fa-xl"></i>
    </button>
  </div>
)}
      <div className="bannerAdvice">
        <h1>Advice</h1>
      </div>
      <div className="gridContainerAdvice">
        <div className="infoBox1">
          <h2>Budget Meals</h2>
          <div className="HealthBox1" onClick={() => handleSectionClick(
            
          "5 Delicious Meals for £5",
          
          <div className="content">Eating well on a budget is possible! With a little planning and smart shopping, you can enjoy delicious and nutritious meals without breaking the bank. In this article, we'll share five mouthwatering recipes that cost around £5 each, making them perfect for budget-conscious individuals or families.<br/><br/>
          1. Tesco's Sausage Stroganoff - Total: £4.95<br/>
          Ingredients:<br/>
          - Tagliatelle (£0.95)<br/>
          - Wholegrain Mustard (£0.80)<br/>
          - Soured Cream (£1.05)<br/>
          - Handful of Mushrooms (£0.63)<br/>
          - Pork Sausages (£1.40)<br/>
          - Onion (£0.14)<br/><br/>
          2. Tesco's Airfryer Spanish Dish - Total: £4.42<br/>
          Ingredients:<br/>
          - Pepper (£0.60)<br/>
          - Plum Tomatoes (£0.28)<br/>
          - Sweetcorn (£0.55)<br/>
          - Red Onion (£0.18)<br/>
          - Vegetarian Sausages (£1.50)<br/>
          - Rice x2 (£0.76)<br/>
          - Marinade (£0.55)<br/><br/>
          3. Aldi's Chicken Dish - Total: £5.35<br/>
          Ingredients:<br/>
          - Broccoli (£0.69)<br/>
          - Stuffing (£0.46)<br/>
          - Carrots (£0.28)<br/>
          - Whole Chicken (£3.69)<br/>
          - Baking Potato (£0.23)<br/><br/>
          4. Aldi's Stir Fry - Total: £5.18<br/>
          Ingredients:<br/>
          - Stir Fry Sauce (£0.79)<br/>
          - Stir Fry Mix (£0.95)<br/>
          - Noodles (£0.85)<br/>
          - Pork Stir Fry (£2.59)<br/><br/>
          Eating on a budget doesn't mean compromising on taste or nutrition. These five meals, all costing about £5, demonstrate that affordable cooking can still be delicious and satisfying. By planning your meals, making use of affordable ingredients, and shopping wisely, you can enjoy a variety of tasty dishes while keeping your budget intact. Don't let financial constraints hold you back from enjoying a healthy and flavorful diet. Give these recipes a try and discover how affordable and enjoyable cooking can be!
          </div>
          
          )}>
            <p>5 Delicious Meals for £5</p>
          </div>
          <div className="HealthBox2" onClick={() => handleSectionClick(
            
            "10 Ways to Improve Your Health",
            
            <div className="content">Improving your health doesn't have to be complicated or expensive. By making a few simple changes to your daily routine, you can enhance your overall well-being without breaking the bank. Here are ten easy and affordable ways to prioritize your health.<br/><br/>
            1. Stay hydrated: Carry a reusable water bottle with you and aim to drink enough water throughout the day for optimal hydration.<br/>
            2. Prioritize sleep: Establish a consistent sleep schedule and aim for 7-9 hours of quality sleep each night to rejuvenate your body and mind.<br/>
            3. Incorporate physical activity: Engage in free or low-cost activities like walking, jogging, or home workouts for at least 30 minutes most days of the week.<br/>
            4. Cook at home: Prepare meals at home using whole foods to have control over ingredients and portion sizes while saving money.<br/>
            5. Eat a balanced diet: Focus on nutrient-dense foods such as fruits, vegetables, whole grains, and lean proteins, and limit processed foods and sugary drinks.<br/>
            6. Practice portion control: Use smaller plates and bowls to help manage portion sizes and prevent overeating.<br/>
            7. Limit sugary snacks and drinks: Choose healthier alternatives like fresh fruits, nuts, or yogurt, and replace sugary drinks with water or herbal teas.<br/>
            8. Manage stress: Incorporate stress-management techniques like deep breathing exercises, mindfulness meditation, or engaging in hobbies to promote mental well-being.<br/>
            9. Practice good hygiene: Maintain good hygiene habits such as regular handwashing, oral care, and routine check-ups to prevent illnesses.<br/>
            10. Prioritize mental health: Dedicate time to activities that bring you joy and relaxation, such as reading, spending time with loved ones, or seeking professional support if needed.<br/><br/>
            Improving your health doesn't have to be complicated or expensive. By implementing these ten easy and affordable strategies into your daily life, you can take significant steps towards enhancing your overall well-being. Start incorporating these habits today and enjoy the positive impact on your health without breaking the bank.
            </div>
            )}>
            <p>10 Ways to Improve Your Health</p>
          </div>
        </div>
        <div className="infoBox2">
          <h2>Schemes and Charities</h2>
          <div className="CharityBox1" onClick={() => handleSectionClick(
            
            "Charities Information",
            
            <div className="content"> <h3>SEIN (South East Integration Network)</h3>
            Network of organisations providing support and services to refugees, asylum seekers and other migrant communities in southeast Glasgow.<br/>
            Phone: 07749902684 or 0141 4238856<br/>
            Email: info@seinglasgow.org.uk<br/>
            Open Monday-Thursday 10-5<br/><br/>
            
            <h3>Weekend Club - Interfaith Glasgow</h3>
            Hosts free, fun, family-friendly events for New Scots in Glasgow that aim to provide a warm welcome to Glasgow and reduce loneliness and social isolation at the weekend.<br/>
            Data top-ups are provided for online events and travel costs covered for in-person events.<br/>
            Email: weekendclub@interfaithglasgow.org<br/>
            Phone/text/WhatsApp: 07511 044814<br/><br/>
            
            <h3>Scottish Refugee Council</h3>
            Offers information, support, advice and advocacy to asylum seekers and refugees. We can signpost, refer or offer you services directly.<br/>
            Freephone helpline 88081967274 for clients, 0141 223 7979 for agencies or through our website contact section or chat.<br/>
            Monday - 10am to 1pm ; 2pm to 4pm<br/>
            Tuesday -10am to 1pm ; 2pm to 4pm<br/>
            Wednesday - 2pm to 4pm<br/>
            Thursday 10am to 1pm ; 2pm to 4pm<br/>
            Friday - 10am to 1pm ; 2pm to 4pm<br/><br/>
            
            <h3>Ubuntu Women Shelter</h3>
            Provides accommodation for up to two weeks for people with no recourse to public funds and who are destitute (subject to availability). We welcome trans women and sex workers to our shelter and support services. Offer help with legal support, mental health and wellbeing support, and advocacy.<br/>
            24-hour emergency accommodation line: 07570877817<br/>
            Non-emergency line (Mon- Fri, 10-6): 07543 491 900<br/>
            Email: info@ubunto-glasgow.org.uk<br/>
            Website: www.ubuntu-glasgow.org.uk<br/><br/>
            
            <h3>Women & Asylum Seeker Housing Project</h3>
            Supports asylum seekers to report housing repairs and issues to Migrant Help and Mears. This includes relocations and support for asylum seekers threatened with eviction. Puts people in contact with other charities and organisations. Empowering asylum seekers on their accommodation Rights and Responsibilities.<br/>
            Repairs & housing issues: 07736 646197<br/>
            Women's support: 07306 349886<br/>
            Evictions advocacy: 07986 740 645<br/>
            contact@ashproject.org.uk<br/><br/>
            
            <h3>Unity</h3>
            Offers support and solidarity to asylum seekers and migrants.<br/>
            24-hour phoneline: 0141 427 7992<br/>
            Email: unitycentremedia@gmail.com<br/>
            Centre is open Monday 9am-12pm for Food Bank voucher distribution<br/><br/>
            
            <h3>Govan Community Project</h3>
            Advice on applying for Home Office support and emergency accommodation and information on foodbanks, online English classes, online social groups.<br/>
            Free phone number: 0800 310 0054<br/>
            Monday 9:30-1; CLOSED in the afternoon<br/>
            Tuesday 9:30-4<br/>
            Wednesday 9:30-4<br/>
            Thursday 9:30-4<br/>
            Friday 9:30-4<br/><br/>
            
            <h3>MORE</h3>
            Provide mobile phone top-up and food support.<br/>
            Phone: 07465757303 or 07598880045, open Monday- Friday 9am 6pm, Saturday-Sunday 10am to 4pm<br/>
            Email: migrantempowerment@prontonmail.com<br/><br/>
            
            <h3>Maryhill Integration Network</h3>
            Currently offering:<br/>
            Online English classes, Online English Conversation: Mondays 5pm, MIN Voices Online Group: Tuesdays 6-7pm Joyous Choir Online Group: Fridays at 4pm, Creative Writing Online Group For woman: 3rd Monday of every month at 4pm, Knit for Unity Online Meet up: Wednesdays 1.30pm, Weekly wellbeing check-ins, Emergency support.<br/>
            Phone: 01419469106, Monday to Friday, 10am-12:45pm, 1:30pm- 3:45pm<br/>
            Email: hello@maryhillintegration.org.uk<br/><br/>
            
            <h3>Maslow's Community Shop</h3>
            Provide free clothing and household goods to asylum seekers and people in the local community experiencing hardship. We also provide toiletry Deliver one-off support packages of food/toiletries/packs to people newly referred to the shop.<br/>
            Contact: maslowscommunity@gmail.com<br/>
            or facebook.com/maslowsgovan.<br/>
            Phone at: 0141 387 0978 (line active only during open hours, email preferred to answering machine).<br/>
            Opening times (please check Facebook for most recently updated hours): Monday - Friday 10:00AM-16:00PM for customers, as well as Friday 10:00AM 16:00PM for donations.<br/><br/>
            
            <h3>No Evictions Network</h3>
            Provide emergency response for people who are worried they might be facing eviction or being targeted by immigration raids. Also provide mobile phone top-ups and general support for migrants.<br/>
            Phone: 07448515094<br/>
            Facebook: https://www.facebook.com/noevictions/<br/>
            Instagram: @no_evictions<br/><br/>
            
            <h3>PATH (Positive Action in Housing)</h3>
            Advice on asylum, housing and benefits, Home Office support and accommodation, homelessness, social housing, private housing, Universal credit. EU Settlement Scheme<br/>
            Phone: 0141 353 2220, Monday-Thursday, 9.30 am-4.30 pm<br/><br/>
            
            <h3>Refuweegee</h3>
            Deliver one-off support packages of food/toiletries/entertainment packs. You can no longer refer yourself for this, requests must be made by partner organisations only. The text message request system has also closed<br/>
            Partner organisations can request a pack through this Refuweegee<br/>
            online form www.refuweegee.co.uk/pack where they will be guided through the new pack request service.<br/><br/>
            
            <h3>Migrant Help</h3>
            Offers advice on how to claim asylum, applying for asylum support, reporting problems with your accommodation, problems with your ASPEN card and making complaints.<br/>
            Phone: 0808 8010 503, open 24 hours a day, 7 days a week. The number is free and interpreters are available.<br/><br/>
            
            <h3>Safe in Scotland</h3>
            Provide 24/7 accommodation for destitute asylum seekers, together with meals, casework and support to access other vital services and rights.<br/>
            To refer someone, please fill out this form: https://www.safeinscotland.com/referrals<br/>
            Phone us on: 07818372130<br/>
            Email: hello@safeinscotland.com (monitored Mon-Fri only) or referrals@safeinscotland.com (monitored 24/7)<br/><br/>
            
            <h3>British Red Cross</h3>
            Supporting refugees and asylum seekers in Scotland with emergency, one-off or long-term casework.<br/>
            Phone number: 07590 445367<br/>
            Monday; 09.30 - 13.00 and 14.00 - 16.00<br/>
            Tuesday; 09.30 - 13.00 and 14.00 - 16.00<br/>
            Wednesday; CLOSED<br/>
            Thursday; 09.30 - 13.00 and 14.00 - 16.00<br/>
            Friday; 09.30 - 13.00<br/><br/>
            
            <h3>Cranhill Development Trust</h3>
            Providing learning opportunities and advice for refugees, asylum seekers and people from other countries in Glasgow.<br/>
            Phone number: 0141 774 3344<br/>
            Email: david@cranhilldt.org.uk<br/>
            Monday-Friday 9am - 5pm<br/><br/>
            
            <h3>CWIN (Central & West Integration Network)</h3>
            Offer one-to-one support, emergency food provision, help with making destitution grant applications, enrolling on English college courses, help with looking for volunteering opportunities, online group support and signposting to other services.<br/>
            Online social group on Zoom every Tuesday at 5.30. Contact Hannah on 07448 127 120<br/>
            For support with enrolling into college, one to one digital skills support or food parcels contact Firdaus on 07503 691 854 or firdaus@cwin.org.uk<br/>
            Email: info@cwin.org.uk. Phone: 07503 691 854.<br/>
            Monday 9.30-2.30<br/>
            Tuesday 10- 4.30<br/>
            Thursday 10-1pm<br/>
            Friday 10-1pm<br/><br/>
            
            <h3>Glasgow City Mission</h3>
            Open for hot take-away food (breakfast: 10-12, lunch: 1-4pm. Monday-Friday). Women's Group online 12-1pm Tuesdays. Glaswegian Bible Study online 2-3pm Tuesdays. Zoom ESOL classes Beginners Group & Intermediate/Advanced Group 10.30am every Thursday.<br/>
            Call Adam on 07949032903 or Helen on 07496112203 to join our groups or to connect with us.            
            </div>
            
            )}>
            <p>Charities Information</p>
          </div>
          <div className="CharityBox2" onClick={() => handleSectionClick(
            
            "Govan Pantry/Moogety Hub",
            
            <div className="content">
            <h3>Govan Pantry</h3>
            The Govan Pantry is a subsidised community shop that helps families to shop smarter and budget better, providing access to food and other essential items at reduced cost.<br/>
            <br/>
            <h3>How does the Pantry work?</h3>
            Pantry membership costs £2.50 per week and allows each member to select ten items from the range of fresh, frozen, chilled and ambient food products and other essential items, helping families to make average savings of approximately £15 per shop. The pantry food supply comes from Fare Share West of Scotland, supporting a surplus food redistribution model, diverting food away from landfill and promoting a sustainable, dignified approach to food insecurity.<br/>
            <br/>
            <h3>Who can join the Pantry?</h3>
            Anyone with a G51-G52 postcode can join The Govan Pantry.<br/>
            <br/>
            <h3>When?</h3>
            We are open Wednesday and Thursday each week from 10.30am to 3pm.<br/>
            <br/>
            <h3>Where?</h3>
            The Govan Pantry is located within the Vestibule of The Pearce Institute (next to the monument) 840-860 Govan Road, G51 3UU.<br/>
            <a href="https://www.govanhelp.org/services/the-govan-pantry">https://www.govanhelp.org/services/the-govan-pantry</a>
            <h3 className="MF">Moogety Foods</h3>
            Moogety Foods is a non-profit social enterprise based in Govan, Glasgow, promoting healthy eating, cooking and participation within the community.<br/>
            For more information about volunteering or the services available, contact Kristina at<br/>
            193 Crossloan Rd,<br/>
            Glasgow Govan,<br/>
            G51 3QF<br/>
            Telephone 0141 4401097.<br/>
            <br/>
            <h3>The Moogety Food Hub</h3>
            The Moogety Food Hub is located at 30 Elderpark Street. Its philosophy is summed up as Growing, Cooking, Eating Together. It is a space shared by Moogety Foods and Urban Roots who deliver the NHS Food For Thought contract.<br/>
            In terms of activities, we hold cookery courses FREE 6-week cookery course, training such as REHIS Elementary Food Hygiene, and food workshops including a bread club, cookery demos and community meals, which often take place in the Elderpark Community Centre.<br/>
            For more information, contact Anne from Urban Roots on 0141 440 1259.<br/>
            <br/>
            <h3>Moogety Garden</h3>
            Moogety Garden is a wee oasis, run by Urban Roots, situated at the back of the Elderpark Community Centre between Elderpark St and Uist Street. It is described as a ‘Great place to chill out, take part and share food and community…and a very warm welcome if it’s your first time there.<br/>
            Activities include Pop Up Cafes, tending your vegetable beds, games, music and community gatherings.<br/>
            Call Paul on 07766 671538 for more details or check out their Facebook page.
            </div>
            
            )}>
            <p>Govan Pantry/Moogety Hub</p>
          </div>
        </div>
        <div className="infoBox3">
          <h2>Deals</h2>
          <div className="DealsBox1" onClick={() => handleSectionClick(
            
            "£1.50 for 5kg of Lidl fruit and veg",
            
            <div className="content">If you head into a Lidl store (find your nearest) you can pick up a 5kg 'Too Good To Waste' box of fruit and vegetables for £1.50. The boxes contain 'edible but not perfect' fruit and veg, which are slightly past its best, but still safe to eat. This is currently an ongoing offer with no end date, but we'll update you here if that changes.<br/>
            <br/>
            These are available in stores in England, Scotland, and Wales only, and found by the checkout area. However, they are subject to availability, so if you want one be quick as there are only a limited number of boxes available every day, from the time stores open until midday. Any unsold boxes will be donated to local good causes.<br/>
            <br/>
            What you'll actually get is completely random as the boxes are made up on the day with whatever fruit and veg is looking past its best in each store. Some could be damaged or discoloured, but you'll be able to see what you're getting before you buy.<br/>
            <br/>
            To give you a rough idea of how much of a saving you could make, when we picked up a box to check this deal out, we got:<br/>
            One 250g punnet of raspberries – normally £2.99<br/>
            Two x bananas – normally 37p for two (£0.78/kg)<br/>
            Five x apples – normally 89p for a 5-pack (17p each)<br/>
            13 x satsumas – normally 95p for a 500g bag (£1.90/kg)<br/>
            Two x pears – normally 95p for a 550g bag (£1.72/kg)<br/>
            One 500g pack of leeks – normally 69p for a 500g pack (£1.38/kg)<br/>
            Two x aubergines – normally 69p each<br/>
            Three x lettuce – normally 69p for a 2-pack (34p for one)<br/>
            13 x potatoes – normally 91p for a 2.5kg bag (36p/kg)<br/>
            One punnet of black grapes – normally £1.09<br/>
            <br/>
            Based on the price of each individual item in the box, we've calculated that it would cost over £10 to buy it all separately – so buying a box for £1.50 really does save a bunch.
            </div>
            
            )}>
            <p>£1.50 for 5kg of Lidl fruit and veg</p>
          </div>
          <div className="DealsBox2" onClick={() => handleSectionClick(
            
            "Sainsbury's £2 fruit and veg box",
            
            <div className="content">If you head into selected Sainsbury's stores (find your nearest), you can pick up a 'Taste Me, Don’t Waste Me’ box of surplus fruit and veg for £2. The boxes contain 'surplus' fresh fruit and vegetables that would have otherwise gone to waste.<br/>
            <br/>
            Sainsbury's trialled these boxes in a few stores in January and has now extended the scheme to over 200 supermarkets. There's no exhaustive list, but it’s likely they'll be available in larger stores, rather than Local stores (you can't get them online).<br/>
            <br/>
            If boxes are available, they'll be in the fresh produce aisle. Do note, they're subject to availability and what you'll actually get is completely random, though Sainsbury's did say typical contents could include: apples, bananas, broccoli, carrots, cauliflower, courgettes, oranges, peppers, plums, red cabbage, and swede.<br/>
            <br/>
            To give you a rough idea of how much of a saving you could make, we've made some calculations based on the products mentioned above:<br/>
            One pack Imperfectly Tasty Gala apples (six in pack) – normally 90p (15p each)<br/>
            One pack Fairtrade bananas (five in a pack) – normally 71p (14p each)<br/>
            One loose broccoli – normally £1.92<br/>
            One loose cauliflower – normally 95p<br/>
            One pack courgettes (500g) – normally £1.29<br/>
            Loose orange – normally 30p<br/>
            Loose red pepper – normally 50p<br/>
            One punnet of plums (400g) – normally 95p<br/>
            Loose red cabbage – normally 65p<br/>
            Loose swede – normally 65p<br/>
            <br/>
            Based on the price of each individual item in the box, we've calculated that it would £8.82 to buy it all separately – so we reckon buying a box for £2 is a good deal.
            </div>
            
            )}>
            <p>Sainsbury's £2 fruit and veg box </p>
          </div>
        </div>
        <div className="infoBox4">
          <h2>Community Events</h2>
          <div className="EventsBox1" onClick={() => handleSectionClick(
            
            "News/Events",
            
            <div className="content">APR 25 - The Fairfield Shipbuilding – New Signage<br/>
            JAN 24 - Govan Window Wanderland – February 2023<br/>
            NOV 7 - 100th Anniversary of Govan War Memorial<br/>
            SEP 29 - Elder Park Lamps Removal<br/>
            SEP 28 - Water Row Community Newsletter<br/>
            SEP 12 - Return of the Elder Park Gates and a film premiere!<br/>
            AUG 11 - Your help required for essential works
            </div>
            
            )}>
            <p>News/Events</p>
          </div>
          <div className="EventsBox2" onClick={() => handleSectionClick(
            
            "Saturday Market",
            
            <div className="content">A lively market takes place in Govan every Saturday from 10am to 3pm. It has approximately 20 stalls ranging from clothing to fresh produce. In addition to the Retail Market there is also a Car Boot Sale which operates along side the market, and is available to anyone wishing to sell second hand items and general bric a brac.<br/>
            The market is located around Govan Cross, Water Row and Napier Street – directly opposite Govan Underground train station and Govan Cross Shopping Centre.<br/>
            Why not make a day of it? Grab a bargain at the market, enjoy lunch in a traditional Govan cafe, before taking a tour of the Govan Stones or catching a ferry to Riverside Museum!<br/>
            More information on Govan’s Saturday Market, and other markets in Glasgow, can be found by emailing info@citymarketsglasgow.co.uk or calling City Markets Glasgow on 0141 287 2500.
            </div>
            
            )}>
            <p>Saturday Market</p>
          </div>
        </div>
      </div>
      <br/>
      <button className="pdf-btn">Download as PDF</button>
    </div>
  ); 
}