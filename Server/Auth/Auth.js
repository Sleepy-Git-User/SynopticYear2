const jwt = require('jsonwebtoken')
require("dotenv").config();

// Takes UserID and using JWT and a Secret key from .env makes a web token.
function makeToken(userID){
    const accessToken = jwt.sign(userID,process.env.ACCESS_TOKEN_SECRET)
    return accessToken;    
}

// Takes a JWT and using the Secret key converts it in to a UserID
function readToken(givenToken){
    user = jwt.verify(givenToken,process.env.ACCESS_TOKEN_SECRET)
    return user;
}

// Makes then Reads Token.
//console.log(readToken(makeToken("f987b616-7008-4257-af6e-cb2239a52def")));

module.exports={makeToken,readToken};