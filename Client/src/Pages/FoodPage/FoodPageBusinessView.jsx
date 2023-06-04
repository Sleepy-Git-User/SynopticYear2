import CreateListing from "./CreateListing.jsx";

export default function FoodPageBusinessView() {
    return (
        <div>
            
              
            <div class="mainInfo">
                <h2>Business</h2>
                {/* Check to see if a business id is stored in session storage, otherwise show an error message */}

                <div>
                <div>
                    <h3>Add Listing</h3>
                    <CreateListing />
                </div>
                <div>
                    <h3>Your Listings</h3>
                    {/*Function call to get a businesses listings and put each as an item in here*/}
                </div>
                <div>
                    <h3>Filters</h3>
                    {/*Will need Georges help with filters*/}
                </div>
                </div>


                <div>
                    <p>You are not registered as a business user. Please register on the account page to make listings.</p>
                </div>




            </div>


        </div>
    );
}