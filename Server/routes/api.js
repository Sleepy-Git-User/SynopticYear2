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
		
		res.json({ success: true , Data: interface.makeUser(
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
		)});
	});

	router.post("/loginChecker", async (req, res) => {
		try {
			const { Email, Password } = req.body;
			if (!Email || !Password ) {
				return res
					.status(400)
					.json({ success: false, message: "Missing Email or Password" });
			}
			const isValid = await interface.loginChecker(Email,Password);
			return res.json({ success: true, Data: isValid });
		} catch (error) {
			console.error(error);
			return res
				.status(500)
				.json({ success: false, message: "Server error" });
		}
	});

	router.get("/getPurchase/:purchaseID", (req, res) => {
		const data = {
			PurchaseID: null,
			ListingID: null,
			BuyerID: null,
			Date: null,
			Time: null,
			Quantity: null,
			BusinessID: null,
		};

		data = interface.getPurchase(req.params.purchaseID);
		data.BusinessID = interface.getListing(data.listingID).businessID;
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
			req.body.Rating,
			req.body.Review
		);
		res.json({ success: true });
	});

	return router;
};
