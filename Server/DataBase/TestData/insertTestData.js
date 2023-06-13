const fs = require("fs");
const path = require("path");
const { Interface } = require("readline");
const UserData = path.join(__dirname, "/userData.csv");
const BusinessData = path.join(__dirname, "/businessData.csv");
const interface = require("../interface.js")();
const database = interface.Database;

const azureStorageConnectionString =
    process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "images";
const blobServiceClient = BlobServiceClient.fromConnectionString(
    azureStorageConnectionString
);
const containerClient = blobServiceClient.getContainerClient(containerName);

function importData(path) {
    let data = fs.readFileSync(path, "utf-8");
    let splitData = data.split("\r\n");

    for (let i = 0; i < splitData.length; i++) {
        let splitLine = splitData[i].split(",");

        if (path === UserData) {
            interface.makeUser(
                splitLine[0],
                splitLine[1],
                splitLine[2],
                splitLine[3],
                splitLine[4],
                splitLine[5],
                splitLine[6],
                splitLine[7],
                splitLine[8],
                splitLine[9]
            );
        }
        if (path === BusinessData) {
            const userIDs = interface.getAllUserDetails();
            //console.log(userIDs[i].UserID);
            console.log(
                interface.makeBusiness(
                    splitLine[0],
                    splitLine[1],
                    splitLine[2],
                    splitLine[3],
                    splitLine[4],
                    splitLine[5],
                    splitLine[6],
                    userIDs[i].UserID
                )
            );
        }
    }
}

importData(UserData);
importData(BusinessData);
