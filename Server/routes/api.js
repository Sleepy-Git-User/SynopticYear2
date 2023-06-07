/**
 * Router Setup for API Requests
 * @returns Express Router
 */

const interface = require("../DataBase/interface.js")();

module.exports = (components) => {
	const { database, express } = components;
	const router = express.Router();

	router.get("/getAllUserDetails", (req, res) => {
		res.json({
			success: true,
			data: {
				UserDetails: interface.getAllUserDetails(),
			},
		});
	});

	router.post("/makeUser", (req, res) => {
		res.json(
			interface.makeUser(
				req.body.Email,
				req.body.PhoneNumber,
				req.body.Fname,
				req.body.Lname,
				req.body.DoB,
				req.body.Password,
				req.body.Line1,
				req.body.Line2,
				req.body.City,
				req.body.Postcode
			)
		);
	});

	router.post("/loginChecker", (req, res) => {
		const { Email, Password } = req.body;
		console.log(req.body);
		try {
			if (!Email || !Password) {
				return res.json({
					success: false,
					data: "Missing Email or Password",
				});
			}

			res.json(interface.loginChecker(Email, Password));
		} catch (error) {
			console.error(error);
			return res.json({ success: false, data: "Server error" });
		}
	});


	router.post("/makeBusiness", (req, res) => {
		const { Bname, Email, PhoneNumber, Line1, Line2, City, Postcode, UserID } = req.body;
		console.log(req.body);
		res.json(interface.makeBusiness(Bname, Email, PhoneNumber, Line1, Line2, City, Postcode, UserID));
	});


	router.post("/getBusinessDetails", (req, res) => {
		const { BusinessID } = req.body;
		console.log(req.body);
		res.json(interface.getBusinessDetails(BusinessID));
	});

	router.get("/getPurchase/:purchaseID", (req, res) => {
		res.json({
			success: true,
			data: interface.getPurchase(req.params.purchaseID),
		});
	});

	router.get("/getBusinessPannel/:purchaseID", (req, res) => {
		res.json({
			success: true,
			data: interface.getBusinessPannel(req.params.purchaseID),
		});
	});

	router.get("/getItemPannel/:purchaseID", (req, res) => {
		res.json({
			success: true,
			data: interface.getItemPannel(req.params.purchaseID),
		});
	});

	router.post("/getBusinessReviews", (req, res) => {
		console.log(req.body);
		res.json({
			success: true,
			data: interface.getBusinessReviews(req.body.BusinessID),
		});
	});

	router.post("/submitReview", (req, res) => {
		interface.createReview(
			req.body.BuyerID,
			req.body.PurchaseID,
			req.body.BusinessID,
			req.body.Title,
			req.body.Rating,
			req.body.Review
		);
		res.json({ success: true });
	});


	router.post("/createListing", (req, res) => {
		console.log(req.body);
		res.json(interface.createListing(
			req.body.Name,
			req.body.Desc,
			req.body.Price,
			req.body.img,
			req.body.Quantity,
			req.body.Category,
			req.body.SellerID,
			req.body.ListingDate,
			req.body.EndDate)

		)
	});


	router.post("/getListings", (req, res) => {
		console.log(req.body);
		console.log(interface.getListings());
		res.json(interface.getListings());

	});


	router.post("/reserveItem", (req, res) => {
		console.log(req.body);
		res.json(interface.reserveItem(req.body.ListingID, req.body.BuyerID, req.body.Quantity));

	});


	router.post("/getUserDetails", (req, res) => {
		console.log(req.body);
		res.json(interface.getUserDetails(req.body.UserID));

	});


	router.get("/categories", (req, res) => {
		console.log(req.body);
		res.json(interface.getCategories());

	});


	router.post("/getBusinessListings", (req, res) => {
		console.log(req.body);
		res.json(interface.getBusinessListings(req.body.BusinessID));

	});

	router.post("/getBoughtItems", (req, res) => {
		console.log(req.body);
		res.json(interface.getBoughtItems(req.body.UserID));

	});

	return router;
};
