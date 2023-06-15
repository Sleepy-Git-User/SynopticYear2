const crypto = require("crypto");
const fs = require("fs");

function makeSalt() {
  return crypto.randomBytes(64).toString("hex");
}

function saltNhash(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 46920, 64, "SHA256").toString("hex");
}


module.exports = { makeSalt, saltNhash };
