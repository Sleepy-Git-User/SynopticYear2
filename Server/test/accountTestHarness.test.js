const expect = require("chai").expect;
const interface = require("../DataBase/interface.js")("AccountTestDatabase");
const describe = require("mocha").describe;
const crypto = require("../utili/password.js");
require("dotenv").config();

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

describe("makeUser",function(){
    it("should create a user with valid input",async function(){

        const Email = "test@test.com";
        const PhoneNumber = "0792301230";
        const Fname = "John";
        const Lname = "Peter";
        const DoB = "20/04/2000";
        const Password = "SecretPassword123";
        const Line1 = "13";
        const Line2 = "Divine";
        const City = "Govan";
        const Postcode = "nr5 9lk";
        const Img = "image";

        const result = await interface.makeUser(
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
            Img
        );

        expect(result).to.be.an("object");
        expect(result).to.have.property("success",true);
    });

    it("should thrown an error if Email is taken",async function(){

        const Email = "test@test.com";
        const PhoneNumber = "0792301230";
        const Fname = "John";
        const Lname = "Peter";
        const DoB = "20/04/2000";
        const Password = "SecretPassword123";
        const Line1 = "13";
        const Line2 = "Divine";
        const City = "Govan";
        const Postcode = "nr5 9lk";
        const Img = "image";

        const result = await interface.makeUser(
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
            Img
        );

        expect(result).to.be.an("object");
        expect(result).to.have.property("success",false);
    });

    it("should thrown an error if PhoneNumber is taken",async function(){

        const Email = "test@test.com";
        const PhoneNumber = "0792301230";
        const Fname = "John";
        const Lname = "Peter";
        const DoB = "20/04/2000";
        const Password = "SecretPassword123";
        const Line1 = "13";
        const Line2 = "Divine";
        const City = "Govan";
        const Postcode = "nr5 9lk";
        const Img = "image";

        const result = await interface.makeUser(
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
            Img
        );

        expect(result).to.be.an("object");
        expect(result).to.have.property("success",false);
    });

});

describe("makeBuisness", function(){
    it("should create a Buisness with valid input", async function(){
        const Name = "Test Bizz"
        const Email = "testBusiness@test.com";
        const PhoneNumber = "0722301230";
        const Line1 = "13";
        const Line2 = "Divine";
        const City = "Govan";
        const Postcode = "nr5 9lk";
        const ProfilePic = "image";
        const UserID = interface.getUserID("test@test.com")


        const result = await interface.makeBusiness(
            Name,
            Email,
            PhoneNumber,
            Line1,
            Line2,
            City,
            Postcode,
            UserID[0].UserID,
            ProfilePic
        );

        expect(result).to.be.an("object");
        expect(result).to.have.property("success",true);

    });

    it("should throw an error if the Email is aleady in use", async function(){
        const Name = "Test Bizz"
        const Email = "testBusiness@test.com";
        const PhoneNumber = "0922301230";
        const Line1 = "13";
        const Line2 = "Divine";
        const City = "Govan";
        const Postcode = "nr5 9lk";
        const ProfilePic = "image";
        const UserID = interface.getUserID("test@test.com")


        const result = await interface.makeBusiness(
            Name,
            Email,
            PhoneNumber,
            Line1,
            Line2,
            City,
            Postcode,
            UserID[0].UserID,
            ProfilePic
        );

        expect(result).to.be.an("object");
        expect(result).to.have.property("success",false);

    });

    it("should throw an error if the Phone Number is aleady in use", async function(){
        const Name = "Test Bizz"
        const Email = "testBusinezz@test.com";
        const PhoneNumber = "0722301230";
        const Line1 = "13";
        const Line2 = "Divine";
        const City = "Govan";
        const Postcode = "nr5 9lk";
        const ProfilePic = "image";
        const UserID = interface.getUserID("test@test.com")


        const result = await interface.makeBusiness(
            Name,
            Email,
            PhoneNumber,
            Line1,
            Line2,
            City,
            Postcode,
            UserID[0].UserID,
            ProfilePic
        );

        expect(result).to.be.an("object");
        expect(result).to.have.property("success",false);

    });


    it("should throw an error if the UserID isnt valid", async function(){
        const Name = "Test Bizz"
        const Email = "testBusiness@test.com";
        const PhoneNumber = "0722301230";
        const Line1 = "13";
        const Line2 = "Divine";
        const City = "Govan";
        const Postcode = "nr5 9lk";
        const ProfilePic = "image";
        const UserID = "notavaliduserid121312312312312"


        const result = await interface.makeBusiness(
            Name,
            Email,
            PhoneNumber,
            Line1,
            Line2,
            City,
            Postcode,
            UserID[0].UserID,
            ProfilePic
        );

        expect(result).to.be.an("object");
        expect(result).to.have.property("success",false);

    }); 

});

describe("userLogin", function(){

    it("should log the user in if valid creditails are given", async function(){
        const Email = "test@test.com";
        const Password = "SecretPassword123";
        const result = interface.loginChecker(Email,Password);

        expect(result).to.be.an("object");
        expect(result).to.have.property("success", true);
    });

    it("should an error if invalid email is given", async function(){
        const Email = "tet@test.com";
        const Password = "SecretPassword123";
        const result = interface.loginChecker(Email,Password);

        expect(result).to.be.an("object");
        expect(result).to.have.property("success", false);
    });

    it("should an error if invalid password is given", async function(){
        const Email = "test@test.com";
        const Password = "PublicPassword123";
        const result = interface.loginChecker(Email,Password);

        expect(result).to.be.an("object");
        expect(result).to.have.property("success", false);
    });
});

describe(".env", function(){

    it("should check the .env for a PING variable and print PONG", async function(){

        const result = process.env.PING

        expect(result).to.be.an("string");
        expect(result).to.equal("PONG");
    });

    
    it("should check the .env with a invald key and return null", async function(){

        const result = process.env.NOTHERE

        expect(result).to.be.an("undefined");
    });
});

describe("generateUniqueCode 1 - 12 digits", function(){

    it("should return a 4 digit code", async function(){

        const result = interface.Database.generate4Code("User","UserID",4);

        expect(result).to.be.an("string");
        expect(result).to.be.length("4");
    });

    it("should return a 7 digit code", async function(){

        const result = interface.Database.generate4Code("User","UserID",7);

        expect(result).to.be.an("string");
        expect(result).to.be.length("7");
    });

    it("should return a 12 digit code if the number of digits requested is larged that 12", async function(){

        const result = interface.Database.generate4Code("User","UserID",40);

        expect(result).to.be.an("string");
        expect(result).to.be.length("12");
    });
});

describe("Passwords", function(){

    it("should return a salt", async function(){
        const result = crypto.makeSalt();


        expect(result).to.be.an("string");
        expect(result).to.be.length("128");
    });

    it("should return a hashed password", async function(){
        const salt = crypto.makeSalt();
        const password = "SomeonesPassword";

        const result = crypto.saltNhash(password,salt);


        expect(result).to.be.an("string");
        expect(result).to.be.length("128");
    });
});