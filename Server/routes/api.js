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

	router.get("/getPurchase/:purchaseID", (req, res) => {
		let data = {
			PurchaseID: null,
			ListingID: null,
			BuyerID: null,
			Date: null,
			Time: null,
			Quantity: null,
			BusinessID: null,
		};
		console.log(req.params.purchaseID)
		data = interface.getPurchase(req.params.purchaseID);
		console.log("ListingID "+data[0].ListingID)
		let listing = interface.getListing(data[0].ListingID);
		console.log("BusinessID "+listing[0].businessID)
		data.BusinessID = listing[0].businessID;
		res.json({
			success: true,
			data: data,
		});
	});

	router.get("/getBusinessPannel/:businessID", (req, res) => {
		res.json({
			success: true,
			data: interface.getBusinessPannel(req.params.businessID),
		});
	});

	router.get("/getItemPannel/:purchaseID", (req, res) => {
		res.json({
			success: true,
			data: interface.getItemPannel(req.params.purchaseID),
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

	return router;
};
