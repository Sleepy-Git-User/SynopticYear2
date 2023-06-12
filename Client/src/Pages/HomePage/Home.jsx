
import "./Home.css";

export default function Home() {
    return (
        <div id="pageContainer">
            <div class="bannerHome">
                <h1>Welcome to Grab-It and Govan</h1>
            </div>
            <div class="homeInfo">
                <div className="content">
                <h3>About Us:</h3><br/>
                At Grab-It and Govan, we are dedicated to reducing food waste and promoting sustainability in our community. We offer a service, where you can discover and purchase delicious surplus food from local restaurants, cafes, and grocery stores at discounted prices. By joining us, you not only enjoy incredible meals but also contribute to a greener future.<br/>

                <h3>Our Mission:</h3><br/>
                Our mission is to combat food waste, promote sustainable consumption, and support local businesses. We believe that every meal counts and that together, we can make a significant impact on our environment and create a more sustainable future for all.<br/>

                <h3>How It Works:</h3><br/>
                1. Discover: Browse through our list of participating establishments and find incredible deals on surplus food items that would otherwise go to waste.<br/>
                2. Reserve: Select the items you want and reserve them through our easy-to-use platform. Remember, quantities are limited, so act fast!<br/>
                3. Collect: Visit the restaurant, cafe, or store during the designated pickup time to collect your delicious meal. Bring your own reusable containers to further reduce waste.<br/>

                <h3>Advice and Tips:</h3><br/>
                Our website offers a dedicated advice page where you can find valuable information and tips on reducing food waste at home, sustainable cooking, composting, and much more. We are committed to providing you with the knowledge and resources you need to make a positive impact on our environment.<br/>

                <h3>Collaboration with Charities:</h3><br/>
                At Grab-It and Govan, we strongly believe in giving back to our community. We collaborate with local charities and donate a portion of our proceeds to support initiatives that fight hunger and promote sustainability. By using our service, you are not only helping to reduce food waste but also supporting these worthy causes.<br/>

                Join us in the fight against food waste and be a part of the sustainable movement. Together, we can make a difference, one meal at a time. Start exploring our website, reserve your first meal, and join the Grab-It and Govan community today!
                </div>
                <div class="image-column">
                <img className="people" src="../../../public/people.png"></img>
                <img className="people2" src="../../../public/people2.png"></img>  
                </div>
                
            </div>


        </div>
    );
}