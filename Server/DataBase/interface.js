//Imports all the needed modules
const path = require("path");
const { DataBaseSystem } = require("./database.js");
const DDLPath = path.join(__dirname, "/ddl.sql");
const DbPath = path.join(__dirname, "/");
const crypto = require("../utili/password.js");

module.exports = (dbName = "Database") => {
    //Creates the Database class
    const Database = new DataBaseSystem(dbName, DbPath);
    try {
        //Imports the DDL
        Database.importDDL(DDLPath);
    } catch (error) {
        console.log(error);
    }
    //Login Page
    function loginChecker(UserID) {
        return Database.inTable("User", "UserID", UserID);
    }
    //loginChecker
    //console.log(loginChecker(""));

    function makeUser(
        Email,
        PhoneNumber,
        Fname,
        Lname,
        DoB,
        Password,
        Line1,
        Line2,
        City,
        Postcode
    ) {
        const user_id = Database.generateUUID("User", "UserID"); //Creates users UUID.
        if (Database.inTable("User", "Email", Email) === true) {
            //Checks if the Email is already in the table and returns fales if its taken.
            return "Email Already in use";
            }else {
                //SQL to insert data in to the User table.
                const insert_user_sql = Database.database.prepare(`
            INSERT INTO User
            (UserID, Email, PhoneNumber, Fname, Lname, Bname, DoB)
            VALUES (?,?,?,?,?,?)`);

                //Creates the salt for the new user, and hashes it with the users inputted password.
                let salt = crypto.makeSalt();
                let hashedPassword = crypto.saltNhash(Password, salt);

                //SQL to insert the users hashed password in to the database as well as the users salt.
                const insert_Password = Database.database.prepare(`
            INSERT INTO Password (UserID, Password, Salt)
            VALUES (?,?,?)`);

                //Runs the SQL statments
                insert_user_sql.run(
                    user_id,
                    Email,
                    PhoneNumber,
                    Fname,
                    Lname,
                    DoB
                );
                insert_Password.run(user_id, hashedPassword, salt);

                //Returns true after creating the new user.
                return "Account Created Successfully";
            }
        }
    //makeUser Test
    //console.log(makeUser("car@gmail.com","12313232","Tester","Jones","02/04/2000","Game"));

    function removeUser(UserID) {
        Database.deleteRecord("User", "UserID", UserID);
    }
    //removeUser Test
    //removeUser("")

    function editFname(UserID, Fname) {
        Database.updateRecord("User", "Fname", Fname, "UserID", UserID);
    }
    function editLname(UserID, Lname) {
        Database.updateRecord("User", "Lname", Lname, "UserID", UserID);
    }

    //editFname + editLname Test
    //editFname("","");
    //editLname("","");

    function getUserDetails(userID) {
        return Database.getRecord("User", "UserID", userID);
    }
    //getUserDetails Test
    //console.log(getUserDetails(""));

    function getAllUserDetails() {
        return Database.getAllRecords("User");
    }

    //********************************************************/

    //******************** Listings ***********************/

    function createListing(
        Name,
        Desc,
        Price,
        img,
        Quantity,
        SellerID,
        ListingDate,
        EndDate
    ) {
        const listing_id = Database.generateUUID("Food", "FoodID"); //Creates users UUID.
        if (Quantity < 0) {
            return "Invalid Quantity";
        }
        if (Price < 0) {
            return "Invalid Price";
        }
        if (EndDate < ListingDate) {
            return "Invalid End Date";
        }
        const insert_listing_sql = Database.database.prepare(`
    INSERT INTO Listing
    (ListingID, Name, Description, Price, img, Quantity, SellerID, SDate, EDate)
    VALUES (?,?,?,?,?,?,?,?,?)`);
        insert_listing_sql.run(
            listing_id,
            Name,
            Desc,
            Price,
            img,
            Quantity,
            SellerID,
            SDate,
            EDate
        );
    }

    //********************************************************/

    //******************** PURCHASE ***********************/

    function reserveItem(ListingID, BuyerID, Quantity) {
        //Get listing
        if (Database.inTable("Listing", "ListingID", ListingID) === true) {
            //Check if listing is still active
            const Listing = Database.getRecord(
                "Listing",
                "ListingID",
                ListingID
            );
            if (Listing.status === 1) {
                return "Listing is no longer active";
            }
            if (Quantity > Listing.Quantity) {
                return "Not enough items in stock";
            }

            //Insert into purchases section

            const insert_purchase_sql = Database.database.prepare(`
        INSERT INTO Purchase(ListingID, BuyerID, Date, Quantity) VALUES (?,?,?)`);

            insert_purchase_sql.run(ListingID, BuyerID, new Date(), Quantity);

            //Update Quantity in listing
            NewQuantity = Listing.Quantity - Quantity;

            Database.updateRecord(
                "Listing",
                "Quantity",
                NewQuantity,
                "ListingID",
                ListingID
            );

            //If Quantity = 0, delete listing
            if (NewQuantity === 0) {
                Database.updateRecord(
                    "Listing",
                    "Status",
                    1,
                    "ListingID",
                    ListingID
                );
            }
            return "Purchase Successful";
        }
        return "Listing does not exist";
    }

    function getBoughtItems(BuyerID) {
        return Database.getRecord("Purchase", "BuyerID", BuyerID);
    }

    function getSoldItems(SellerID) {
        //Joing purchase and listing tables using ListingID
        const sql = Database.database.prepare(
            `SELECT * FROM Purchase INNER JOIN Listing ON Purchase.ListingID = Listing.ListingID WHERE Listing.SellerID = ?`
        );
        return sql.all(SellerID);
    }

    //********************************************************/

    //******************** REVIEWS ***********************/

    return {
        Database,
        loginChecker,
        makeUser,
        removeUser,
        editFname,
        editLname,
        getUserDetails,
        getAllUserDetails,
    };
};
