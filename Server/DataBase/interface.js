//Imports all the needed modules
const path = require("path");
const { DataBaseSystem } = require("./database.js");
const DDLPath = path.join(__dirname, "/ddl.sql");
const DbPath = path.join(__dirname, "/");
const crypto = require("../utili/password.js");
const { log } = require("console");
const fs = require("fs");
const emailSender = require("../utili/email.js");
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();
const auth = require("../Auth/Auth.js");
const azureStorageConnectionString =
	process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "images";
console.log(azureStorageConnectionString);
const blobServiceClient = BlobServiceClient.fromConnectionString(
	azureStorageConnectionString
);
const containerClient = blobServiceClient.getContainerClient(containerName);

module.exports = (dbName = "Database") => {
	//Creates the Database class
	const Database = new DataBaseSystem(dbName, DbPath);
	try {
		//Imports the DDL
		Database.importDDL(DDLPath);
	} catch (error) {
		console.log(error);
	}

	function jazz() {
		console.log("jazz");
	}
	//********************************************************/

	//******************** Users ***********************/
	/**
	 *
	 * @param {*} Email that the user wants to use to login with.
	 * @param {*} Password that the user wants to use to login with.
	 * @returns true is the user can be allowed to loging, and fale if the details are wrong.
	 */
	function loginChecker(Email, Password) {
		const checkEmail = Database.inTable("User", "Email", Email); //Checks if the Email is in the system.
		if (checkEmail === false) {
			return { success: false, data: "Email or Password incorrect" };
		} else {
			const getUserID = Database.getField(
				"User",
				"UserID",
				"Email",
				Email
			); //Gets the UserID by using the email.

			const grabSalt = Database.getField(
				"Password",
				"Salt",
				"UserID",
				getUserID[0].UserID
			); //Gets the Salt from the pasword table using the UserID.
			const hashedPassword = Database.getField(
				"Password",
				"Password",
				"UserID",
				getUserID[0].UserID
			); //Gets the hashed password from password table.
			if (
				crypto.saltNhash(Password, grabSalt[0].Salt) ===
				hashedPassword[0].Password
			) {
				//Hashes the inputted password and comparess it to the stored password.
				console.log("HERE" + getUserID);
				try {
					let data2 = getUserBusinessIDs(getUserID[0].UserID);
					return { success: true, data: getUserID, data2: data2 };
				} catch (error) {
					return { success: true, data: getUserID, data2: null };
				}
			} else {
				return { success: false, data: "Email or Password incorrect" };
			}
		}
	}
	//loginChecker
	//console.log(loginChecker("bike@gmail.com","Game"));

	/**
	 *
	 * @param {*} Email
	 * @param {*} PhoneNumber
	 * @param {*} Fname
	 * @param {*} Lname
	 * @param {*} DoB
	 * @param {*} Password
	 * @param {*} Line1
	 * @param {*} Line2
	 * @param {*} City
	 * @param {*} Postcode
	 * @returns Returns Success true or false. Then data which will contain the new UserID
	 */
	async function makeUser(
		Email,
		PhoneNumber,
		Fname,
		Lname,
		DoB,
		Password,
		Line1,
		Line2,
		City,
		Postcode,
		ProfilePic
	) {
		const user_id = Database.generateUUID("User", "UserID"); //Creates users UUID.

		const address_id = Database.generateUUID("Address", "AddressID"); //Creates address UUID.
		if (Database.inTable("User", "Email", Email) === true) {
			//Checks if the Email is already in the table and returns fales if its taken.
			return { success: false, data: "Email Already in use" };
		} else {
			//SQL to insert data in to the User table.
			const insert_user_sql = Database.database.prepare(`
            INSERT INTO User
            (UserID, Email, PhoneNumber, Fname, Lname, DoB, img, AddressID)
            VALUES (?,?,?,?,?,?,?,?)`);

			//Creates the salt for the new user, and hashes it with the users inputted password.
			let salt = crypto.makeSalt();
			let hashedPassword = crypto.saltNhash(Password, salt);
			// generateProfPic(user_id);

			//SQL to insert the users hashed password in to the database as well as the users salt.
			const insert_Password = Database.database.prepare(`
            INSERT INTO Password (UserID, Password, Salt)
            VALUES (?,?,?)`);

			//SQL to insert data in to the User table.
			const insert_address_sql = Database.database.prepare(`
            INSERT INTO Address
            (AddressID, Line1, Line2, City, Postcode)
            VALUES (?,?,?,?,?)`);

			//Runs the SQL statments
			insert_address_sql.run(address_id, Line1, Line2, City, Postcode);
			insert_user_sql.run(
				user_id,
				Email,
				PhoneNumber,
				Fname,
				Lname,
				DoB,
				"https://synopticproject.blob.core.windows.net/images/" +
					user_id +
					".png",
				address_id
			);
			insert_Password.run(user_id, hashedPassword, salt);

			try {
				const blobClient = containerClient.getBlockBlobClient(
					user_id + ".png"
				);
				const uploadResponse = await blobClient.upload(
					ProfilePic.buffer,
					ProfilePic.size
				);
				console.log(`Upload succesful. ${uploadResponse.requestId}`);
			} catch (error) {
				console.error("No image uploaded");
				//throw error;
			}
			sendWelcomeEmail(Email);
			sendVerificationEmail(Email);
			//Returns true after creating the new user.
			return { success: true, data: user_id };
		}
	}

	function verifyEmail(UserID) {
		let ID = auth.readToken(UserID);
		Database.updateRecord("User", "Email_Confirmed", 1, "UserID", ID);
		return { success: true, data: "Email Confirmed" };
	}

	//makeUser Test
	//  console.log(makeUser("omgitsblackbeard@gmail.com","13313232","tafin","nover","02/04/2000","Game","Party","Lane","London","LN169NG"));

	function getProfilePic(userID) {
		return (
			"https://synopticproject.blob.core.windows.net/images/" +
			userID +
			".png"
		);
	}

	function removeUser(UserID) {
		Database.deleteRecord("User", "UserID", UserID);
	}

	function getUserID(Email) {
		return Database.getField("User", "UserID", "Email", Email);
	}
	//console.log(getUserID("bike@gmail.com"));

	function getUserDetails(userID) {
		console.log(Database.getRecord("User", "UserID", userID));
		return {
			success: true,
			data: Database.getRecord("User", "UserID", userID),
		};
	}
	//getUserDetails Test
	//console.log(getUserDetails("49e59c7f-a2cc-4ac4-a445-b0d56d43178c"));

	function getAllUserDetails() {
		return Database.getAllRecords("User");
	}

	function getUserBusinessIDs(UserID) {
		return Database.getRecord("User_Business", "UserID", UserID)[0]
			.BusinessID;
	}
	//console.log(getUserBusinessIDs("f987b616-7008-4257-af6e-cb2239a52def"));

	//********************************************************/

	//******************** Business ***********************/

	/**
	 *
	 * @param {*} Name Business Name
	 * @param {*} Email Main email for business
	 * @param {*} PhoneNumber Main Phonenumber for business
	 * @param {*} Line1 Business address
	 * @param {*} Line2
	 * @param {*} City
	 * @param {*} PostCode
	 * @param {*} UserID UserID for User who made the business.
	 * @returns Success true or false depending on errors. Data has business id if success or an error message.
	 */
	async function makeBusiness(
		Name,
		Email,
		PhoneNumber,
		Line1,
		Line2,
		City,
		PostCode,
		UserID,
		ProfilePic
	) {
		const business_id = Database.generateUUID("Business", "BusinessID"); //Creates users UUID.
		const address_id = Database.generateUUID("Address", "AddressID"); //Creates address UUID.
		const InvCode = Database.generate4Code("Business", "BusinessID", 8);
		if (Database.inTable("Business", "Email", Email) === true) {
			//Checks if the Email is already in the table and returns fales if its taken.
			return { success: false, data: "Email Already in use" };
		}
		if (Database.inTable("Business", "PhoneNumber", PhoneNumber) === true) {
			//Checks if the PhoneNumber is already in the table and returns fales if its taken.
			return { success: false, data: "PhoneNumber Already in use" };
		}
		if (Database.inTable("User", "UserID", UserID) === false) {
			return { success: false, data: "No User matching that ID" };
		} else {
			//SQL to insert data in to the User table.
			const insert_business_sql = Database.database.prepare(`
            INSERT INTO Business
            (BusinessID, Name, Email, PhoneNumber, img, AddressID, InvCode)
            VALUES (?,?,?,?,?,?,?)`);

			//SQL to insert data in to the User table.
			const insert_address_sql = Database.database.prepare(`
            INSERT INTO Address
            (AddressID, Line1, Line2, City, Postcode)
            VALUES (?,?,?,?,?)`);

			//Runs the SQL statments
			insert_address_sql.run(address_id, Line1, Line2, City, PostCode);
			insert_business_sql.run(
				business_id,
				Name,
				Email,
				PhoneNumber,
				"https://synopticproject.blob.core.windows.net/images/" +
					business_id +
					"bpp.png",
				address_id,
				InvCode
			);

			try {
				const blobClient = containerClient.getBlockBlobClient(
					business_id + "bpp.png"
				);
				const uploadResponse = await blobClient.upload(
					ProfilePic.buffer,
					ProfilePic.size
				);
				console.log(`Upload succesful. ${uploadResponse.requestId}`);
			} catch (error) {
				console.log("No image uploaded");
				//throw error;
			}

			const User_Business_sql = Database.database.prepare(`
            INSERT INTO User_Business
            (UserID, BusinessID)
            VALUES (?,?)`);

			User_Business_sql.run(UserID, business_id);
			console.log("Business Created");
			return { success: true, data: business_id };
		}
	}

	//console.log(makeBusiness("TarT Farm","tarT@farm.org","0989321303","4 Road","Clark","Nowhere","IDGAF4","f987b616-7008-4257-af6e-cb2239a52def"));

	function getBusinessDetails(BusinessID) {
		return Database.getRecord("Business", "BusinessID", BusinessID);
	}
	//console.log(getBusinessDetails("cbfa8b95-ffb4-4d73-8952-bf281af015c2"));

	/**
	 *
	 * @param {*} UserID  User ID to add to Business.
	 * @param {*} InvCode InvCode for the Buisness the User wants to join.
	 * @returns Success: True or False. Data: Error message or success message.
	 */
	function addUserToBusiness(UserID, InvCode) {
		if (Database.inTable("User", "UserID", UserID) === false) {
			return { success: false, data: "No User matching that ID" };
		}
		const bdata = Database.getRecord("Business", "InvCode", InvCode);
		if (bdata === false) {
			return { success: false, data: "Invalid Business Invite Code" };
		}

		const userBusinesLinks_sql = Database.database.prepare(
			"SELECT * FROM User_Business WHERE UserID = ? AND BusinessID = ?"
		);
		const linkeddata = userBusinesLinks_sql.all(
			UserID,
			bdata[0].BusinessID
		);
		console.log(linkeddata);
		console.log(linkeddata.length);
		if (linkeddata.length != 0) {
			return { success: false, data: "User already apart of Business" };
		} else {
			const User_Business_sql = Database.database.prepare(`
            INSERT INTO User_Business
            (UserID, BusinessID)
            VALUES (?,?)`);

			User_Business_sql.run(UserID, bdata[0].BusinessID);
			return { success: true, data: "User added to Business" };
		}
	}

	// console.log(
	// 	addUserToBusiness("4078deab-da6c-4bc6-89f6-7c59f9bc6fb3", "13885721")
	// );

	function updateBusinessDetails() {}

	//********************************************************/

	//******************** Listings ***********************/

	//Updating more than just the quantity??

	/**
	 *  Creates a new listing
	 * @param {*} Name The name of the item
	 * @param {*} Desc The description of the item
	 * @param {*} Price The price of the item
	 * @param {*} img The title of the image of the item
	 * @param {*} Quantity The quantity being sold
	 * @param {*} SellerID The businessID
	 * @param {*} ListingDate The start date of the listing
	 * @param {*} EndDate The end date of the listing
	 * @returns True if successful
	 */
	async function createListing(
		Name,
		Desc,
		Price,
		img,
		Quantity,
		Category,
		SellerID,
		ListingDate,
		EndDate
	) {
		const listing_id = Database.generateUUID("Listing", "ListingID");
		if (Quantity < 0) {
			return { success: false, data: "Invalid Quantity" };
		}
		if (Price < 0) {
			return { success: false, data: "Invalid Price" };
		}
		if (new Date(EndDate) < ListingDate) {
			return { success: false, data: "Invalid End Date" };
		}
		const insert_listing_sql = Database.database.prepare(`
    INSERT INTO Listing
    (ListingID, Name, Desc, Price, img, Quantity, SellerID, SDate, EDate)
    VALUES (?,?,?,?,?,?,?,?,?)`);
		insert_listing_sql.run(
			listing_id,
			Name,
			Desc,
			Price,
			"https://synopticproject.blob.core.windows.net/images/" +
				listing_id +
				"lispp.png",
			Quantity,
			SellerID,
			ListingDate,
			EndDate
		);

		try {
			const blobClient = containerClient.getBlockBlobClient(
				listing_id + "lispp.png"
			);
			const uploadResponse = await blobClient.upload(
				img.buffer,
				img.size
			);
			console.log(`Upload succesful. ${uploadResponse.requestId}`);
		} catch (error) {
			console.log("No image uploaded");
		}
		Category = Category.split(",");
		for (let i = 0; i < Category.length; i++) {
			let category = Database.getRecord("Category", "Name", Category[i]);
			let category_id = category[0].CategoryID;
			const insert_category_sql = Database.database.prepare(`
			INSERT INTO Item_Category
			(ListingID, CategoryID)
			VALUES (?,?)`);
			insert_category_sql.run(listing_id, category_id);
		}
		return { success: true, data: listing_id };
	}

	// console.log(
	//     createListing(
	//         "Tarr",
	//         "Tarr",
	//         10,
	//         "Tarr",
	//         10,
	//         ["Halal"],
	//         "2f3f4bd9-4236-42d8-ac39-93500601ea82",
	//         "2021-04-20",
	//         "2021-04-21"
	//     )
	// );

	function updateListingQuantity(ListingID, Quantity) {
		if (Quantity < 0) {
			return "Invalid Quantity";
		}
		try {
			Database.updateRecord(
				"Listing",
				"Quantity",
				Quantity,
				"ListingID",
				ListingID
			);
			return "Quantity Updated";
		} catch (error) {
			return "Invalid ListingID";
		}
	}

	function updateListingStatus() {
		try {
			Database.database
				.prepare(
					`UPDATE Listing SET Status = 1 WHERE EDate < date('now') OR Quantity <= 0`
				)
				.run();
			return "Status Updated";
		} catch (error) {
			console.log(error);
			return "Listing Status Update Failed";
		}
	}

	/**
	 * Gets all listings that are active
	 * @returns All listings that are active
	 */
	function getListings(filter) {
		updateListingStatus();
		let array = [];

		for (let key in filter) {
			if (filter[key] === true) {
				array.push(key);
			}
		}
		console.log(array);
		if (array.length === 0) {
			return {
				success: true,
				data: Database.getRecord("Listing", "Status", 0),
			};
		} else {
			let placeholders = array.map(() => "?").join(",");
			let sql_listing_select = Database.database.prepare(
				`SELECT * FROM Listing WHERE ListingID IN (SELECT ListingID FROM Item_Category WHERE CategoryID IN (SELECT CategoryID FROM Category WHERE Name IN (${placeholders}) ))AND Status = 0`
			);

			let data = sql_listing_select.all(...array);

			return {
				success: true,
				data: data,
			};
		}
	}

	// console.log(getListings());

	/**
	 * Gets a specific listing
	 * @param {*} ListingID Which specified listing are you looking for
	 * @returns True if found
	 */
	function getListing(ListingID) {
		try {
			return Database.getRecord("Listing", "ListingID", ListingID);
		} catch (error) {
			throw "Invalid ListingID";
		}
	}

	/**
	 * Gets all active listings from a specific business
	 * @param {*} BusinessID Which business are you looking for
	 * @returns All active listings from a specific business
	 */
	function getBusinessListings(BusinessID) {
		try {
			listing_sql = Database.database.prepare(
				`SELECT * FROM Listing WHERE SellerID = ? AND Status = 0`
			);
			return listing_sql.all(BusinessID);
		} catch (error) {
			throw "Invalid BusinessID";
		}
	}

	/**
	 * Gets all listings from a specific business including expired listings
	 * @param {*} BusinessID Which business are you looking for
	 * @returns All listings from a specific business
	 */
	function getAllBusinessListings(BusinessID) {
		try {
			return Database.getRecord("Listing", "SellerID", BusinessID);
		} catch (error) {
			throw "Invalid BusinessID";
		}
	}

	/**
	 *  Gets all listings from the database
	 * @returns All listings from the database
	 */
	function getAllListingRecords() {
		try {
			return Database.getAllRecords("Listing");
		} catch (error) {
			throw "No listings found";
		}
	}

	/**
	 *  Gets all expired listings
	 * @returns All expired listings
	 */
	function getExpiredListings() {
		return Database.getRecord("Listing", "Status", 1);
	}

	function createCategory(CategoryName) {
		if (CategoryName == null || CategoryName == "") {
			return "Category name cannot be empty";
		}
		if (Database.inTable("Category", "Name", CategoryName))
			return "Category already exists";
		const category_id = Database.generateUUID("Category", "CategoryID"); //Creates users UUID.
		const insert_category_sql = Database.database.prepare(`
		INSERT INTO Category
		(CategoryID, Name)
		VALUES (?,?)`);
		return {
			success: true,
			data: insert_category_sql.run(category_id, CategoryName),
		};
	}

	function getCategories() {
		return Database.getAllRecords("Category");
	}

	function getItemCategories(ListingID) {
		try {
			const category_sql = Database.database.prepare(
				`SELECT * FROM Item_Category WHERE ListingID = ?`
			);
			return category_sql.all(ListingID);
		} catch (error) {
			throw "Invalid ListingID";
		}
	}

	function getCategoryName(CategoryID) {
		try {
			let category = Database.getRecord(
				"Category",
				"CategoryID",
				CategoryID
			);
			return category[0].Name;
		} catch (error) {
			throw "Invalid CategoryID";
		}
	}

	// console.log(createCategory("Vegan"));
	// console.log(createCategory("Vegiterian"));
	// console.log(createCategory("Halal"));
	// console.log(createCategory("Kosher"));
	// let ct = getItemCategories("ca591894-06d0-4eab-aeae-8cd7d1c6e1ff");
	// let cid = ct[0].CategoryID;
	// console.log(getItemCategories("ca591894-06d0-4eab-aeae-8cd7d1c6e1ff"));
	// console.log(getCategoryName(cid));

	//********************************************************/

	//******************** PURCHASE ***********************/

	/**
	 *  Creates a new purchase of an item
	 *  Changes the quantity of the item and status if needed
	 * @param {*} ListingID The item being purcahsed
	 * @param {*} BuyerID WHo is purchasing the item
	 * @param {*} Quantity How many they are purchasing
	 * @returns "Purchase Successful" if successful
	 */
	function reserveItem(ListingID, BuyerID, Quantity) {
		//Get listing
		updateListingStatus();
		if (Quantity <= 0) {
			return { success: false, data: "Invalid Quantity" };
		}
		if (Database.inTable("Listing", "ListingID", ListingID) === true) {
			//Check if listing is still active

			const Listing = Database.getRecord(
				"Listing",
				"ListingID",
				ListingID
			);
			if (Listing[0].Status === 1) {
				return { success: false, data: "Listing is no longer active" };
			}
			if (Quantity > Listing[0].Quantity) {
				return { success: false, data: "Not enough items in stock" };
			}

			//Insert into purchases section\
			let date = new Date();
			let code = Database.generate4Code("Purchase", "Code", 4);
			purchase_id = Database.generateUUID("Purchase", "PurchaseID");

			const insert_purchase_sql = Database.database.prepare(`
        INSERT INTO Purchase(PurchaseID, ListingID, BuyerID, Date, Quantity, Code) VALUES (?,?,?,?,?,?)`);

			insert_purchase_sql.run(
				purchase_id,
				ListingID,
				BuyerID,
				date.toISOString(),
				Quantity,
				code
			);

			let NewQuantity = Listing[0].Quantity - Quantity;

			Database.updateRecord(
				"Listing",
				"Quantity",
				NewQuantity,
				"ListingID",
				ListingID
			);

			//If Quantity = 0, delete listing
			updateListingQuantity(ListingID, NewQuantity);
			updateListingStatus(ListingID);

			sendReservedEmail(purchase_id);
			sendReviewEmail(purchase_id);
			return { success: true, data: "Purchase Successful" };
		}
		return { success: false, data: "Listing does not exist" };
	}

	//  console.log(reserveItem("5a0112c7-2fad-435b-8a8c-9a48c350e06b","28179d4b-32ac-48d8-b1ef-d82987678c2c", 1));

	/**
	 *  Gets all purchases from a specific buyer
	 * @param {*} BuyerID Which buyer are you looking for
	 * @returns All purchases from a specific buyer
	 */
	function getBoughtItems(BuyerID) {
		let data = [];
		try {
			let purchases = Database.getRecord("Purchase", "BuyerID", BuyerID);

			purchases.forEach((purchase) => {
				data.push({ Purchase: [], Listing: [], Buyer: [] });
				data[data.length - 1].Purchase = purchase;
				let listing = Database.getRecord(
					"Listing",
					"ListingID",
					purchase.ListingID
				);
				data[data.length - 1].Listing = listing[0];
				let user = Database.getRecord(
					"User",
					"UserID",
					purchase.BuyerID
				);
				data[data.length - 1].Buyer = user[0];
			});
			return data;
		} catch (error) {
			throw "Invalid BuyerID";
		}
	}

	/**
	 *  Gets all the items sold by a business
	 * @param {*} SellerID Which business are you looking for
	 * @returns All items sold by a business
	 */
	function getSoldItems(SellerID) {
		//Joing purchase and listing tables using ListingID
		const sql = Database.database.prepare(
			`SELECT * FROM Purchase INNER JOIN Listing ON Purchase.ListingID = Listing.ListingID WHERE Listing.SellerID = ?`
		);
		return sql.all(SellerID);
	}

	/**
	 *  Gets all the purchases of a specific item
	 * @param {*} ListingID
	 * @returns All purchases of a specific item
	 */
	function getItemHistory(ListingID) {
		const sql = Database.database.prepare(
			`SELECT * FROM Purchase INNER JOIN Listing ON Purchase.ListingID = Listing.ListingID WHERE Listing.ListingID = ?`
		);
		return sql.all(ListingID);
	}

	/**
	 *  Gets a specific purchase
	 * @param {*} PurchaseID Which purchase are you looking for
	 * @returns A specific purchase
	 */
	function getPurchase(PurchaseID) {
		let data = {
			PurchaseID: null,
			ListingID: null,
			BusinessID: null,
			BuyerID: null,
			Quantity: null,
			Date: null,
			BusinessID: null,
		};
		try {
			data = Database.getRecord("Purchase", "PurchaseID", PurchaseID);
			let listing = Database.getRecord(
				"Listing",
				"ListingID",
				data[0].ListingID
			);
			data[0].BusinessID = listing[0].SellerID;

			return data;
		} catch (error) {
			throw "Invalid PurchaseID";
		}
	}

	//********************************************************/

	//********************** REVIEWS *************************/

	/**
	 *  Creates a new review using User, Item and Business
	 * @param {*} ReviewerID Who is writing the review
	 * @param {*} PurchaseID Which purchase is being reviewed
	 * @param {*} BusinessID Which business is being reviewed
	 * @param {*} Title What is the title of the review
	 * @param {*} Rating What rating is being given
	 * @param {*} Review What is being said
	 */
	function createReview(
		ReviewerID,
		PurchaseID,
		BusinessID,
		Title,
		Rating,
		Review
	) {
		let date = new Date();
		const insert_review_sql = Database.database.prepare(
			`INSERT INTO Review(ReviewerID, BusinessID, PurchaseID, Title, Rating, Review, Date) VALUES (?,?,?,?,?,?,?)`
		);
		try {
			let success = insert_review_sql.run(
				ReviewerID,
				BusinessID,
				PurchaseID,
				Title,
				Rating,
				Review,
				date.toISOString()
			);
			return { success: true, data: "Review Created" };
		} catch (error) {
			throw "Failed to create review";
		}
	}

	// console.log(
	// 	createReview(
	// 		"4078deab-da6c-4bc6-89f6-7c59f9bc6fb3",
	// 		"924ed693-4789-4739-9e87-0dfd6267fdb3",
	// 		"2f3f4bd9-4236-42d8-ac39-93500601ea82",
	// 		"Amazing Product",
	// 		5,
	// 		"This is a great product"
	// 	)
	// );

	/**
	 *  Gets all reviews from a specific business
	 * @param {*} BusinessID Which business are you looking for
	 * @returns All reviews from a specific business
	 */
	function getBusinessReviews(BusinessID) {
		try {
			let data = Database.database
				.prepare(
					"SELECT * FROM Review WHERE BusinessID = ? ORDER BY Date DESC"
				)
				.all(BusinessID);
			data.forEach((review) => {
				review.ReviewerName = Database.getRecord(
					"User",
					"UserID",
					review.ReviewerID
				)[0].Fname;
				let date = new Date(review.Date);
				review.Date =
					date.getDate() +
					"/" +
					date.getMonth() +
					"/" +
					date.getFullYear();
			});
			return data;
		} catch (error) {
			throw "Invalid BusinessID";
		}
	}

	function getItemReviews(ListingID) {
		let monthNames = [
			"Janurary",
			"Feburary",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"Septembreviewer",
			"October",
			"Novermber",
			"December",
		];
		//Get the reviews of the purchases of the item
		try {
			let stmt = Database.database.prepare(
				"SELECT * FROM Review join Purchase on Purchase.PurchaseID = Review.PurchaseID join Listing on Purchase.ListingID = Listing.ListingID WHERE Listing.ListingID = ?"
			);

			let data = stmt.all(ListingID);
			data.forEach((review) => {
				let user = Database.getRecord(
					"User",
					"UserID",
					review.ReviewerID
				)[0];
				review.ReviewerName = user.Fname;
				review.img = user.img;
				let date = new Date(review.Date);
				review.Date =
					date.getDate() +
					" " +
					monthNames[date.getMonth()] +
					" " +
					date.getFullYear();
			});
			return data;
		} catch (error) {
			throw "Invalid ListingID";
		}
	}

	/**
	 *  Gets the overall rating of the business 1-5
	 * @param {*} BusinessID  Which business are you looking for
	 * @returns  Rating of business
	 */
	function getBusinessRating(BusinessID) {
		let total = 0;
		const stmt = Database.database.prepare(
			"SELECT * FROM Review WHERE BusinessID = ?"
		);
		try {
			let sql_select_stmt = stmt.all(BusinessID);
			sql_select_stmt.forEach((review) => {
				total += review.Rating;
			});
			if (sql_select_stmt.length === 0) {
				return "N/A";
			}
			return total / sql_select_stmt.length;
		} catch (error) {
			throw "Invalid BusinessID";
		}
	}

	/**
	 *  Gets all reviews of a specific rating
	 * @param {*} BusinessID    Which business are you looking for
	 * @param {*} Rating  Which rating are you looking for
	 * @returns  All reviews of a specific rating
	 */
	function filterReviews(BusinessID, Rating) {
		const reviews = Database.getRecord(
			"Review",
			"BusinessID",
			BusinessID
		).filter((review) => {
			return review.Rating === Rating;
		});
		return reviews;
	}

	/**
	 *  Gets the number of reviews a business has
	 * @param {*} BusinessID Which business are you looking for
	 * @returns Number of reviews a business has
	 */
	function countBusinessReviews(BusinessID) {
		const stmt = Database.database.prepare(
			"SELECT * FROM Review WHERE BusinessID = ?"
		);
		try {
			return (sql_select_stmt = stmt.all(BusinessID).length);
		} catch (error) {
			throw "Invalid BusinessID";
		}
	}

	/**
	 *  Gets all reviews from a specific user
	 * @param {*} UserID Which user are you looking for
	 * @returns All reviews from a specific user
	 */
	function getUserReviews(UserID) {
		try {
			return Database.getRecord("Review", "ReviewerID", UserID);
		} catch (error) {
			return "Invalid UserID";
		}
	}

	/**
	 * Gets the count of reviews a user has
	 * @param {*} UserID Which user are you looking for
	 * @returns Count of reviews a user has
	 */

	function getReviewCount(UserID) {
		try {
			return Database.getRecord("Review", "ReviewerID", UserID).length;
		} catch (error) {
			return "Invalid UserID";
		}
	}

	//********************************************************/

	//********************** Page Specifics *************************/

	function getBusinessPannel(PurchaseID) {
		//ID, Name, IMG, Rating, Rating count
		try {
			const Purchase = Database.getRecord(
				"Purchase",
				"PurchaseID",
				PurchaseID
			);
			const Listing = Database.getRecord(
				"Listing",
				"ListingID",
				Purchase[0].ListingID
			);

			const BusinessID = Listing[0].SellerID;
			const business = Database.getRecord(
				"Business",
				"BusinessID",
				BusinessID
			);

			const rating = getBusinessRating(BusinessID);
			const ratingCount = countBusinessReviews(BusinessID);
			return {
				ID: BusinessID,
				Name: business[0].Name,
				IMG: business[0].img,
				Rating: rating,
				RatingCount: ratingCount,
			};
		} catch (error) {
			throw "Invalid PurchaseID";
		}
	}

	function getItemPannel(PurchaseID) {
		//Purchase ID, Listing name, Listing img, Listing price, Purchase quantity, Purchase date\
		try {
			let data = {
				ID: null,
				Name: null,
				img: null,
				Price: null,
				Quantity: null,
				Date: null,
			};
			const purchase = getPurchase(PurchaseID);
			const listing = getListing(purchase[0].ListingID);
			data.ID = purchase[0].PurchaseID;
			data.Name = listing[0].Name;
			data.img = listing[0].img;
			data.Price = listing[0].Price * purchase[0].Quantity;
			data.Quantity = purchase[0].Quantity;
			data.Date = purchase[0].Date;
			return data;
		} catch (error) {
			throw "Invalid PurchaseID";
		}
	}

	//********************************************************/

	//********************** Emails *************************/

	function sendWelcomeEmail(email) {
		//TODO
		return emailSender.sendEmail(
			"welcome.ejs",
			email,
			"Welcome to Grab-It & Govan",
			{}
		);
	}

	//   console.log(sendWelcomeEmail("omgitsblackbeard@gmail.com"));

	function sendVerificationEmail(email) {
		//TODO
		const userID = Database.getRecord("User", "Email", email)[0].UserID;

		const id = auth.makeToken(userID);

		url = "http://localhost:5173/verify?userID=" + id;

		return emailSender.sendEmail(
			"verifyEmail.ejs",
			email,
			"Verify your email address",
			{ url }
		);
	}

	//  console.log(sendVerificationEmail("omgitsblackbeard@gmail.com"));

	function sendReservedEmail(purchaseID) {
		//TODO
		let monthNames = [
			"Jan",
			"Feb",
			"March",
			"Apr",
			"May",
			"June",
			"July",
			"Aug",
			"Sept",
			"Oct",
			"Nov",
			"Dec",
		];
		let purchase = getPurchase(purchaseID);
		let listing = getListing(purchase[0].ListingID);
		let business = Database.getRecord(
			"Business",
			"BusinessID",
			listing[0].SellerID
		);
		let address = Database.getRecord(
			"Address",
			"AddressID",
			business[0].AddressID
		);
		let user = Database.getRecord("User", "UserID", purchase[0].BuyerID);
		let email = user[0].Email;
		let temp = new Date(purchase[0].Date);
		let date =
			temp.getDate() +
			" " +
			monthNames[temp.getMonth()] +
			" " +
			temp.getFullYear();

		let data = {
			ID: purchase[0].PurchaseID,
			Date: date,
			Total: purchase[0].Quantity * listing[0].Price,
			img: listing[0].img,
			Item: listing[0].Name,
			Quantity: purchase[0].Quantity,
			Price: listing[0].Price,
			code: purchase[0].Code,
			Name: business[0].Name,
			Line1: address[0].Line1,
			Line2: address[0].Line2,
			Postcode: address[0].Postcode,
		};

		return emailSender.sendEmail(
			"reservedItem.ejs",
			email,
			"You've reserved an item!",
			data
		);
	}
	//  console.log(sendReservedEmail("6f03d9b1-1f26-4036-80d1-0f1a43160411"));

	function sendReviewEmail(purchaseID) {
		//TODO
		let monthNames = [
			"Janurary",
			"Feburary",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"Novermber",
			"December",
		];
		let purchase = getPurchase(purchaseID);
		let listing = getListing(purchase[0].ListingID);
		let business = Database.getRecord(
			"Business",
			"BusinessID",
			listing[0].SellerID
		);
		let user = Database.getRecord("User", "UserID", purchase[0].BuyerID);
		let email = user[0].Email;
		let temp = new Date(purchase[0].Date);
		let date =
			temp.getDate() +
			" " +
			monthNames[temp.getMonth()] +
			" " +
			temp.getFullYear();
		let data = {
			Name: listing[0].Name,
			Seller: business[0].Name,
			Date: date,
			img: listing[0].img,
			url: "http://localhost:5173/review?purchaseID=" + purchaseID,
		};

		return emailSender.sendEmail(
			"review.ejs",
			email,
			"Leave a review on a recent purchase!",
			data
		);
	}

	//    console.log(sendReviewEmail("e2039d16-835f-482f-882a-7936235fbaee"));

	return {
		Database,
		loginChecker,
		makeUser,
		removeUser,
		getUserDetails,
		getAllUserDetails,
		createListing,
		getListings,
		getListing,
		getBusinessListings,
		getAllBusinessListings,
		getAllListingRecords,
		getExpiredListings,
		reserveItem,
		getBoughtItems,
		getSoldItems,
		getItemHistory,
		getPurchase,
		createReview,
		getBusinessReviews,
		getBusinessRating,
		filterReviews,
		countBusinessReviews,
		getUserReviews,
		getReviewCount,
		getBusinessPannel,
		getItemPannel,
		sendReservedEmail,
		sendReviewEmail,
		sendWelcomeEmail,
		sendVerificationEmail,
		getUserID,
		makeBusiness,
		addUserToBusiness,
		getBusinessDetails,
		getUserBusinessIDs,
		updateListingQuantity,
		updateListingStatus,
		updateBusinessDetails,
		getBusinessDetails,
		getCategories,
		getCategoryName,
		getItemCategories,
		getItemReviews,
		getUserBusinessIDs,
		jazz,
		verifyEmail,
		getProfilePic,
		createCategory,
	};
};
