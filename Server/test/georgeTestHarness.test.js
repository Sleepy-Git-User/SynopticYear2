const expect = require("chai").expect;
const interface = require("../DataBase/interface.js")("TestDatabase");

interface.makeUser(
    "omgitsblackbeard@gmail.com",
    09876543211,
    "George",
    "Wilson",
    20 / 02 / 2003,
    "123",
    "123",
    "123",
    "123",
    null
);
interface.makeBusiness(
    "Test Business",
    "test@gmail.com",
    09876543211,
    "123",
    "123",
    "123",
    "123",
    null
);
describe("createListing", function () {
    it("should create a listing with valid input", async function () {
        const Name = "Sample Product";
        const Desc = "This is a sample product for testing";
        const Price = 10.99;
        const img = "http://example.com/sample-product.jpg";
        const Quantity = 5;
        const Category = "Electronics";
        const SellerID = "seller123";
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
            ListingDate,
            EndDate
        );

        // Add assertions here to verify that the result is as expected
        expect(result).to.be.an("object");
        expect(result).to.have.property("Name", Name);
        expect(result).to.have.property("Desc", Desc);
        expect(result).to.have.property("Price", Price);
        expect(result).to.have.property("img", img);
        expect(result).to.have.property("Quantity", Quantity);
        expect(result).to.have.property("Category", Category);
        expect(result).to.have.property("SellerID", SellerID);
        expect(result).to.have.property("ListingDate").that.is.a("date");
        expect(result).to.have.property("EndDate").that.is.a("date");
    });

    it("should throw an error with invalid input", async function () {
        const Name = "";
        const Desc = "Invalid product";
        const Price = -1;
        const img = "";
        const Quantity = 0;
        const Category = "";
        const SellerID = "";
        const ListingDate = new Date();
        const EndDate = new Date(ListingDate.getTime() + 24 * 60 * 60 * 1000);

        try {
            const result = await createListing(
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
        } catch (error) {
            expect(error).to.be.an("error");
        }
    });
});
