/**
 * Router Setup for API Requests
 * @returns Express Router
 */
const auth = require("../Auth/Auth.js");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(), limits: {fileSize: 50 * 1024 * 1024}  });

module.exports = (components) => {
	const { express, interface } = components;
	const router = express.Router();

	router.get("/getAllUserDetails", (req, res) => {
		res.json({
			success: true,
			data: {
				UserDetails: interface.getAllUserDetails(),
			},
		});
	});

	router.post("/makeUser", upload.single('file'), async (req, res) => {
		
		
		try{
			res.json({success: true, data: await interface.makeUser(
				req.body.Email,
				req.body.PhoneNumber,
				req.body.Fname,
				req.body.Lname,
				req.body.DoB,
				req.body.Password,
				req.body.Line1,
				req.body.Line2,
				req.body.City,
				req.body.Postcode,
				req.file,
			)})
			
			} catch (error) {
				console.error(error);
				return res.json({ success: false, data: "Server error" });
			}
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

	router.post("/makeBusiness", upload.single("file"), async (req, res) => {
		const {
			Bname,
			Email,
			PhoneNumber,
			Line1,
			Line2,
			City,
			Postcode,
			UserID,
		} = req.body;
		
		let data = await interface.makeBusiness(
				Bname,
				Email,
				PhoneNumber,
				Line1,
				Line2,
				City,
				Postcode,
				UserID,
				req.file
			)
		console.log(data);
		res.json(data);

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
	router.post("/getItemReviews", (req, res) => {
		console.log(req.body);
		res.json({
			success: true,
			data: interface.getItemReviews(req.body.ListingID),
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

	router.post("/createListing", upload.single("file"), async (req, res) => {
		console.log(req.body);
		try{
			res.json(await interface.createListing(
				req.body.Name,
				req.body.Desc,
				req.body.Price,
				req.file,
				req.body.Quantity,
				req.body.Category,
				req.body.SellerID,
				req.body.ListingDate,
				req.body.EndDate
			)
	);} catch (error) {
			console.error(error);
			return res.json({ success: false, data: "Server error" });
		}
	});

	router.post("/getListings", (req, res) => {
		console.log(req.body);

		res.json(interface.getListings(req.body));
	});

	router.post("/reserveItem", (req, res) => {
		console.log(req.body);
		res.json(
			interface.reserveItem(
				req.body.ListingID,
				req.body.BuyerID,
				req.body.Quantity
			)
		);
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
		res.json({success: true, data: interface.getBoughtItems(req.body.UserID)});
	});

	router.post("/verifyEmail", (req, res) => {
		cancelAnimationFrame
		res.json(interface.verifyEmail(req.body.UserID));
	});

	router.post("/getProfilePic", (req, res) => {
		res.json(interface.getProfilePic(req.body.UserID));
	});

	return router;
};
