const fs = require("fs");
const path = require("path");
const { Interface } = require("readline");
const UserData = path.join(__dirname, "/userData.csv");
const interface = require("../interface.js");
const database = interface.Database;

function importData(path) {
  let data = fs.readFileSync(path, "utf-8");
  let splitData = data.split("\r\n");

  for (let i = 0; i < splitData.length; i++) {
    let splitLine = splitData[i].split(",");

    if (path === UserData) {
      interface.makeUser(
        splitLine[0],
        splitLine[1]
      );
    }
}
}

importData(UserData);
