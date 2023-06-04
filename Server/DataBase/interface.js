//Imports all the needed modules
const path = require("path");
const { DataBaseSystem } = require("./database.js");
const DDLPath = path.join(__dirname, "/ddl.sql");
const DbPath = path.join(__dirname, "/");
const crypto = require("../utili/password.js");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "se.healthtracker101@gmail.com",
		pass: "btssdtghvfwpyiyo",
	},
});

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
		} else {
			if (PhoneNumber != null) {
				if (
					Database.inTable("User", "PhoneNumber", PhoneNumber) ===
					true
				) {
					return "Phone number already taken.";
				}
			} else {
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
		const listing_id = Database.generateUUID("Listing", "ListingID"); //Creates users UUID.
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
		return insert_listing_sql.run(
			listing_id,
			Name,
			Desc,
			Price,
			img,
			Quantity,
			SellerID,
			ListingDate,
			EndDate
		);
	}

	/**
	 * Updates one column in the listing table
	 * @param {*} ListingID Which listing is it
	 * @param {*} Column What column are you changing
	 * @param {*} NewValue What is the new value
	 * @param {*} CheckedColumn What column are you checking against
	 * @param {*} CheckedValue What is the value you are checking against
	 *
	 * @returns true if successful
	 */
	function updateListing(
		ListingID,
		Column,
		NewValue,
		CheckedColumn,
		CheckedValue
	) {
		return Database.updateRecord(
			"Listing",
			Column,
			NewValue,
			"ListingID",
			ListingID,
			CheckedColumn,
			CheckedValue
		);
	}

	/**
	 * Gets all listings that are active
	 * @returns All listings that are active
	 */
	function getListings() {
		return Database.getRecord("Listing", "Status", 0);
	}

	/**
	 * Gets a specific listing
	 * @param {*} ListingID Which specified listing are you looking for
	 * @returns True if found
	 */
	function getListing(ListingID) {
		return Database.getRecord("Listing", "ListingID", ListingID);
	}

	/**
	 * Gets all active listings from a specific business
	 * @param {*} BusinessID Which business are you looking for
	 * @returns All active listings from a specific business
	 */
	function getBusinessListings(BusinessID) {
		listing_sql = Database.database.prepare(
			`SELECT * FROM Listing WHERE SellerID = ? AND Status = 0`
		);
		return listing_sql.all(BusinessID);
	}

	/**
	 * Gets all listings from a specific business including expired listings
	 * @param {*} BusinessID Which business are you looking for
	 * @returns All listings from a specific business
	 */
	function getAllBusinessListings(BusinessID) {
		return Database.getRecord("Listing", "SellerID", BusinessID);
	}

	/**
	 *  Gets all listings from the database
	 * @returns All listings from the database
	 */
	function getAllRecords() {
		return Database.getAllRecords("Listing");
	}

	/**
	 *  Gets all expired listings
	 * @returns All expired listings
	 */
	function getExpiredListings() {
		return Database.getRecord("Listing", "Status", 1);
	}

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
			purchase_id = Database.generateUUID("Purchase", "PurchaseID");
			const insert_purchase_sql = Database.database.prepare(`
        INSERT INTO Purchase(PurchaseID, ListingID, BuyerID, Date, Quantity) VALUES (?,?,?,?,?)`);

			insert_purchase_sql.run(
				purchase_id,
				ListingID,
				BuyerID,
				new Date(),
				Quantity
			);

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

	/**
	 *  Gets all purchases from a specific buyer
	 * @param {*} BuyerID Which buyer are you looking for
	 * @returns All purchases from a specific buyer
	 */
	function getBoughtItems(BuyerID) {
		return Database.getRecord("Purchase", "BuyerID", BuyerID);
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
		return Database.getRecord("Purchase", "PurchaseID", PurchaseID);
	}

	//********************************************************/

	//********************** REVIEWS *************************/

	/**
	 *  Creates a new review using User, Item and Business
	 * @param {*} ReviewerID Who is writing the review
	 * @param {*} PurchaseID Which purchase is being reviewed
	 * @param {*} BusinessID Which business is being reviewed
	 * @param {*} Rating What rating is being given
	 * @param {*} Review What is being said
	 */
	function createReview(ReviewerID, PurchaseID, BusinessID, Rating, Review) {
		const insert_review_sql = Database.database.prepare(
			`INSERT INTO Review(ReviewerID, BusinessID, PurchaseID, Rating, Review, Date) VALUES (?,?,?,?,?,?)`
		);
		insert_review_sql.run(
			ReviewerID,
			BusinessID,
			PurchaseID,
			Rating,
			Review,
			new Date()
		);
	}

	/**
	 *  Gets all reviews from a specific business
	 * @param {*} BusinessID Which business are you looking for
	 * @returns All reviews from a specific business
	 */
	function getBusinessReviews(BusinessID) {
		return Database.getRecord("Review", "BusinessID", BusinessID);
	}

	/**
	 *  Gets the overall rating of the business 1-5
	 * @param {*} BusinessID  Which business are you looking for
	 * @returns  Rating of business
	 */
	function getBusinessRating(BusinessID) {
		let total = 0;
		const reviews = Database.getRecord(
			"Review",
			"BusinessID",
			BusinessID
		).forEach((review) => {
			total += review.Rating;
		});
		return total / reviews.length;
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
		return Database.getRecord("Review", "BusinessID", BusinessID).length;
	}

	/**
	 *  Gets all reviews from a specific user
	 * @param {*} UserID Which user are you looking for
	 * @returns All reviews from a specific user
	 */
	function getUserReviews(UserID) {
		return Database.getRecord("Review", "ReviewerID", UserID);
	}

	/**
	 * Gets the count of reviews a user has
	 * @param {*} UserID Which user are you looking for
	 * @returns Count of reviews a user has
	 */
	function getReviewCount(UserID) {
		return Database.getRecord("Review", "ReviewerID", UserID).length;
	}

	//********************************************************/

	//********************** Page Specifics *************************/

	function getBusinessPannel(BusinessID) {
		//ID, Name, IMG, Rating, Rating count
		const business = Database.getRecord(
			"Business",
			"BusinessID",
			BusinessID
		);
		const rating = getBusinessRating(BusinessID);
		const ratingCount = countBusinessReviews(BusinessID);
		return {
			ID: business.BusinessID,
			Name: business.Name,
			IMG: business.img,
			Rating: rating,
			RatingCount: ratingCount,
		};
	}

	function getItemPannel(PurchaseID) {
		//Purchase ID, Listing name, Listing img, Listing price, Purchase quantity, Purchase date\
		data = {
			ID: null,
			Name: null,
			img: null,
			Price: null,
			Quantity: null,
			Date: null,
		};
		const purchase = getPurchase(PurchaseID);
		const listing = getListing(purchase.ListingID);
		data.ID = purchase.PurchaseID;
		data.Name = listing.Name;
		data.img = listing.img;
		data.Price = listing.Price * purchase.Quantity;
		data.Quantity = purchase.Quantity;
		data.Date = purchase.Date;
		return data;
	}

	//********************************************************/

	//********************** Emails *************************/

	function sendWelcomeEmail(email) {
		//TODO

		ejs.renderFile(path.join(__dirname, "./emails/welcome.ejs"), function (err, str) {
		if (err) {
			console.log(err);
			return
		}
		let mailOptions = {
			from:  '"Grab-It & Govan" <se.healthtracker101@gmail.com>',
			to: email,
			subject: "Welcome to Grab-It & Govan!",
			html: str
		}

		transporter.sendMail(mailOptions, function (err, data) {
			if (err) {
				console.log(err);
				return
			}
			console.log("Email sent successfully");
		}
		)
		});

	}

	function sendVerificationEmail(userID) {
		//TODO
		let email = getUser(userID).Email;
		url = "http://localhost:3000/verify?userID=" + userID;
		ejs.renderFile(path.join(__dirname, "./emails/verify.ejs"), {
			url
		}, function (err, str) {
			if (err) {
				console.log(err);
				return
			}
			let mailOptions = {
				from:  '"Grab-It & Govan" <se.healthtracker101@gmail.com>',
				to: email,
				subject: "Verify your email address",
				html: str
			}
	
			transporter.sendMail(mailOptions, function (err, data) {
				if (err) {
					console.log(err);
					return
				}
				console.log("Email sent successfully");
			}
			)
			});
		
	}

	function sendReservedEmail(purchaseID) {
		//TODO
		let purchase = getPurchase(purchaseID);
		let listing = getListing(purchase.ListingID);
		let business = getBusiness(listing.BusinessID);
		let address = getBusinessAddress(listing.BusinessID);
		let email = getUser(purchase.UserID).Email;


		data = {
			ID: purchase.PurchaseID,
			Date: purchase.Date,
			Total: purchase.Quantity * listing.Price,
			img: listing.img,
			Item: listing.Name,
			Quantity: purchase.Quantity,
			Price: listing.Price,
			code: purchase.Code,
			Name: business.Name,
			Line1: address.Line1,
			Line2: address.Line2,
			postcode: address.postcode,
			
		};
		ejs.renderFile(path.join(__dirname, "./emails/reservedItem"), {
			data
		}, function (err, str) {
			if (err) {
				console.log(err);
				return
			}
			let mailOptions = {
				from: '"Grab-It & Govan" <se.healthtracker101@gmail.com>',
				to: email,
				subject: "You've reserved an item!",
				html: str
			}
	
			transporter.sendMail(mailOptions, function (err, data) {
				if (err) {
					console.log(err);
					return
				}
				console.log("Email sent successfully");
			}
			)
			});
		}
	

	function sendReviewEmail(purchaseID) {
		//TODO
		let purchase = getPurchase(purchaseID);
		let listing = getListing(purchase.ListingID);
		let business = getBusiness(listing.BusinessID);
		let email = getUser(purchase.UserID).Email;

		let data = {
			Name: listing.Name,
			Seller: business.Name,
			Date: purchase.Date,
		};
		let url =
			"https://localhost:5173/review?purchaseID="+purchaseID;
		ejs.render("../emails/review", { data, url }, function (err, str) {
			if (err) {
				console.log(err);
				return
			}
			let mailOptions = {
				from: '"Grab-It & Govan" <se.healthtracker101@gmail.com>',
				to: email,
				subject: "Leave a reivew on your recent purchase!",
				html: str
			}
	
			transporter.sendMail(mailOptions, function (err, data) {
				if (err) {
					console.log(err);
					return
				}
				console.log("Email sent successfully");
			}
			)
			});
	}

	return {
		Database,
		loginChecker,
		makeUser,
		removeUser,
		editFname,
		editLname,
		getUserDetails,
		getAllUserDetails,
		createListing,
		updateListing,
		getListings,
		getListing,
		getBusinessListings,
		getAllBusinessListings,
		getAllRecords,
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
	};
};
