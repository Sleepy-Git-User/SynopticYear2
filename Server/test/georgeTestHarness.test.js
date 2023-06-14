const expect = require("chai").expect;
const interface = require("../DataBase/interface.js")("TestDatabase");
const describe = require("mocha").describe;

const tables = [
	"Review",
	"Purchase",
	"Category",
	"Listing",
	"Business",
	"User",
];
tables.forEach((table) => {
	//console.log(`Deleting all records from ${table}`);
	interface.Database.database.prepare(`DELETE FROM ${table}`).run();
});

interface.makeUser(
	"unrealemail@gmail.com",
	"09876543211",
	"George",
	"Wilson",
	"20/02/2003",
	"123",
	"123",
	"123",
	"123",
	"123",
	null
);

const UserID = interface.Database.getRecord(
	"User",
	"Email",
	"unrealemail@gmail.com"
)[0].UserID;

interface.makeBusiness(
	"Test Business",
	"test@gmail.com",
	"09876543211",
	"123",
	"123",
	"123",
	"123",
	UserID,
	null
);

const SellerID = interface.Database.getRecord(
	"Business",
	"Email",
	"test@gmail.com"
)[0].BusinessID;

interface.createListing(
	"Test",
	"Test",
	10,
	"Test",
	10,
	"Test",
	SellerID,
	"2024-04-20T00:00:00.000Z",
	"2025-04-20T00:00:00.000Z"
);

interface.createCategory("Test");

const CategoryID = interface.Database.getRecord("Category", "Name", "Test")[0]
	.CategoryID;

const ListingID = interface.Database.getRecord("Listing", "Name", "Test")[0]
	.ListingID;

interface.reserveItem(ListingID, UserID, 1);
const PurchaseID = interface.Database.getRecord(
	"Purchase",
	"BuyerID",
	UserID
)[0].PurchaseID;

interface.createReview(UserID, PurchaseID, SellerID, "Test", 5, "Test");
const ReviewID = interface.Database.getRecord(
	"Review",
	"PurchaseID",
	PurchaseID
)[0].ReviewID;

/*console.log("UserID: " + UserID);
console.log("SellerID: " + SellerID);
console.log("ListingID: " + ListingID);
console.log("CategoryID: " + CategoryID);
console.log("PurchaseID: " + PurchaseID);
console.log("ReviewID: " + ReviewID);*/

describe("createListing", function () {
	//console.log("CREATE" + SellerID);
	it("should create a listing with valid input", async function () {
		const Name = "Sample Product";
		const Desc = "This is a sample product for testing";
		const Price = 10.99;
		const img = "http://example.com/sample-product.jpg";
		const Quantity = 5;
		const Category = "Test";
		const ListingDate = new Date();
		const EndDate = new Date(ListingDate.getTime() + 24 * 60 * 60 * 1000); // 1 day later

		const result = await interface.createListing(
			Name,
			Desc,
			Price,
			img,
			Quantity,
			Category,
			SellerID,
			ListingDate.toISOString(),
			EndDate.toISOString()
		);

		// Add assertions here to verify that the result is as expected
		expect(result).to.be.an("object");
		expect(result).to.have.property("success", true);
	});

	it("should throw an error with invalid input", async function () {
		const Name = "";
		const Desc = "Invalid product";
		const Price = -1;
		const img = "";
		const Quantity = -1;
		const Category = "";
		const SellerID = "";
		const ListingDate = new Date();
		const EndDate = new Date(ListingDate.getTime() + 24 * 60 * 60 * 1000);

		const result = await interface.createListing(
			Name,
			Desc,
			Price,
			img,
			Quantity,
			Category,
			SellerID,
			ListingDate,
			EndDate
		);

		expect(result).to.be.an("object");
		expect(result).to.have.property("success", false);
	});
});

describe("updateListingQuantity", function () {
	it("should update the quantity of a listing", async function () {
		const Quantity = 10;

		const result = await interface.updateListingQuantity(
			ListingID,
			Quantity
		);
		//console.log(result);
		expect(result).to.be.an("string");
		expect(result).to.equal("Quantity Updated");
	});

	it("should throw an error with invalid input", async function () {
		const Quantity = -1;

		const result = await interface.updateListingQuantity(
			ListingID,
			Quantity
		);

		expect(result).to.be.an("string");
		expect(result).to.equal("Invalid Quantity");
	});
});

describe("updateListingStatus", function () {
	it("should update the status of a listing", async function () {
		const result = await interface.updateListingStatus();

		expect(result).to.be.an("string");
		expect(result).to.equal("Status Updated");
	});
});

describe("getListings", function () {
	it("should return a list of listings", async function () {
		const result = await interface.getListings({ Electronics: true });

		expect(result).to.be.an("object");
		expect(result).to.have.property("success", true);
	});

	it("should return a list of listings with a given category", async function () {
		const result = await interface.getListings({ NotaCategory: true });

		expect(result).to.be.an("object");
		expect(result).to.have.property("success", true);
		expect(result).to.have.property("data").that.is.deep.equal([]);
	});
});

describe("getListing", function () {
	it("should return a listing with a given ID", async function () {
		const result = await interface.getListing(ListingID);
		//console.log(result);
		expect(result).to.be.an("array").that.is.not.empty;
	});

	it("should return an error with an invalid ID", async function () {
		try {
			const result = await interface.getListing(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("getBusinessListings", function () {
	it("should return a list of listings for a given business", async function () {
		const result = await interface.getBusinessListings(SellerID);

		expect(result).to.be.an("array").that.is.not.empty;
	});

	it("should return an error with an invalid business ID", async function () {
		try {
			const result = await interface.getBusinessListings(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});
describe("getAllBusinessListings", function () {
	it("should return a list of listings for a given business", async function () {
		const result = await interface.getAllBusinessListings(SellerID);

		expect(result).to.be.an("array").that.is.not.empty;
	});

	it("should return an error with an invalid business ID", async function () {
		try {
			const result = await interface.getAllBusinessListings(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("createCategory", function () {
	it("should create a category with valid input", async function () {
		const Name = "Sample Category";

		const result = await interface.createCategory(Name);

		expect(result).to.be.an("object");
		expect(result).to.have.property("success", true);
	});

	it("should throw an error with invalid input", async function () {
		const Name = "";

		const result = await interface.createCategory(Name);

		expect(result).to.be.an("string");
		expect(result).to.equal("Category name cannot be empty");
	});

	it("should throw an error with duplicate input", async function () {
		const Name = "Sample Category";

		const result = await interface.createCategory(Name);

		expect(result).to.be.an("string");
		expect(result).to.equal("Category already exists");
	});
});

describe("getCategories", function () {
	it("should return a list of categories", async function () {
		const result = await interface.getCategories();

		expect(result).to.be.an("array").that.is.not.empty;
	});
});

describe("getItemCategories", function () {
	it("should return a list of categories for a given item", async function () {
		const result = await interface.getItemCategories(ListingID);

		expect(result).to.be.an("array").that.is.not.empty;
	});

	it("should return an error with an invalid item ID", async function () {
		try {
			const result = await interface.getItemCategories(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("getCategoryName", function () {
	it("should return a category name for a given category ID", async function () {
		const result = await interface.getCategoryName(CategoryID);

		expect(result).to.be.an("string");
	});

	it("should return an error with an invalid category ID", async function () {
		try {
			const result = await interface.getCategoryName(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("reserveItem", function () {
	it("should reserve an item with valid input", async function () {
		const result = await interface.reserveItem(ListingID, UserID, 1);

		expect(result).to.be.an("object");
		expect(result).to.have.property("success", true);
	});

	it("should throw an error with invalid input", async function () {
		const result = await interface.reserveItem(ListingID, UserID, -1);

		expect(result).to.be.an("object");
		expect(result).to.have.property("success", false);
		expect(result).to.have.property("data", "Invalid Quantity");
	});
});

describe("getBoughtItems", function () {
	it("should return a list of bought items for a given user", async function () {
		const result = await interface.getBoughtItems(UserID);

		expect(result).to.be.an("array").that.is.not.empty;
	});

	it("should return an error with an invalid user ID", async function () {
		try {
			const result = await interface.getBoughtItems(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("getPurchase", function () {
	it("should return a purchase for a given purchase ID", async function () {
		const result = await interface.getPurchase(PurchaseID);

		expect(result).to.be.an("array").that.is.not.empty;
	});

	it("should return an error with an invalid purchase ID", async function () {
		try {
			const result = await interface.getPurchase(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("createReview", function () {
	it("should create a review with valid input", async function () {
		const result = await interface.createReview(
			UserID,
			PurchaseID,
			SellerID,
			"Sample Review",
			5,
			"Sample Review"
		);

		expect(result).to.be.an("object");
		expect(result).to.have.property("success", true);
	});

	it("should throw an error with invalid input", async function () {
		try {
			const result = await interface.createReview(
				UserID,
				"Not Real Purchase",
				SellerID,
				"Random Review",
				5,
				""
			);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("getBusinessReviews", function () {
	it("should return a list of reviews for a given business", async function () {
		const result = await interface.getBusinessReviews(SellerID);

		expect(result).to.be.an("array").that.is.not.empty;
	});

	it("should return an error with an invalid business ID", async function () {
		try {
			const result = await interface.getBusinessReviews(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("getItemReviews", function () {
	it("should return a list of reviews for a given item", async function () {
		const result = await interface.getItemReviews(ListingID);

		expect(result).to.be.an("array").that.is.not.empty;
	});

	it("should return an error with an invalid item ID", async function () {
		try {
			const result = await interface.getItemReviews(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("getBusinessRating", function () {
	it("should return a rating for a given business", async function () {
		const result = await interface.getBusinessRating(SellerID);

		expect(result).to.be.an("number");
	});

	it("should return an error with an invalid business ID", async function () {
		try {
			const result = await interface.getBusinessRating(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("countBusinessReviews", function () {
	it("should return a count of reviews for a given business", async function () {
		const result = await interface.countBusinessReviews(SellerID);

		expect(result).to.be.an("number");
	});

	it("should return an error with an invalid business ID", async function () {
		try {
			const result = await interface.countBusinessReviews(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("getUserReviews", function () {
	it("should return a list of reviews for a given user", async function () {
		const result = await interface.getUserReviews(UserID);

		expect(result).to.be.an("array").that.is.not.empty;
	});

	it("should return an error with an invalid user ID", async function () {
		const result = await interface.getUserReviews(-1);

		expect(result).to.be.an("string");
	});
});

describe("getReviewCount", function () {
	it("should return a count of reviews for a given user", async function () {
		const result = await interface.getReviewCount(UserID);

		expect(result).to.be.an("number");
	});

	it("should return an error with an invalid user ID", async function () {
		const result = await interface.getReviewCount(-1);

		expect(result).to.be.an("string");
	});
});

describe("getBusinessPannel", function () {
	it("should return a business pannel for a given business", async function () {
		const result = await interface.getBusinessPannel(PurchaseID);

		expect(result).to.be.an("object");
	});

	it("should return an error with an invalid business ID", async function () {
		try {
			const result = await interface.getBusinessPannel(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});

describe("getItemPannel", function () {
	it("should return an item pannel for a given item", async function () {
		const result = await interface.getItemPannel(PurchaseID);

		expect(result).to.be.an("object");
	});

	it("should return an error with an invalid item ID", async function () {
		try {
			const result = await interface.getItemPannel(-1);
		} catch (error) {
			expect(error).to.be.an("string");
		}
	});
});
