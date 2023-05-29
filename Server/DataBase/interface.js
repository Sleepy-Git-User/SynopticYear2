//Imports all the needed modules
const path = require("path");
const { DataBaseSystem } = require("./database.js");
const DDLPath = path.join(__dirname, "/ddl.sql");
const DbPath = path.join(__dirname, "/");
const crypto = require("../utili/password.js");

module.exports=(dbName = "Database")=>{

  //Creates the Database class
  const Database = new DataBaseSystem(dbName, DbPath);
  try {
    //Imports the DDL
    Database.importDDL(DDLPath);
  } catch (error) {
    console.log(error);
  }
  //Login Page
function loginChecker(UserID){
  return Database.inTable("User","UserID",UserID);
  }
  //loginChecker
  //console.log(loginChecker(""));
  
  
  function makeUser(Email,PhoneNumber,Fname,Lname,DoB,Password){
    const user_id = Database.generateUUID("User", "UserID"); //Creates users UUID.
    if (Database.inTable("User", "Email", Email) === true) {
      //Checks if the Email is already in the table and returns fales if its taken.
      return "Email Already in use";
    } else {
      if (Database.inTable("User", "PhoneNumber", PhoneNumber) === true) {
        return "Phone number already taken.";
      } else {  
        //SQL to insert data in to the User table.
        const insert_user_sql = Database.database.prepare(`
            INSERT INTO User
            (UserID, Email, PhoneNumber, Fname, Lname, DoB)
            VALUES (?,?,?,?,?,?)`);
  
        //Creates the salt for the new user, and hashes it with the users inputted password.
        let salt = crypto.makeSalt();
        let hashedPassword = crypto.saltNhash(Password, salt);
  
        //SQL to insert the users hashed password in to the database as well as the users salt.
        const insert_Password = Database.database.prepare(`
            INSERT INTO Password (UserID, Password, Salt)
            VALUES (?,?,?)`);
  
        //Runs the SQL statments
        insert_user_sql.run(user_id, Email, PhoneNumber, Fname, Lname, DoB);
        insert_Password.run(user_id, hashedPassword, salt);
  
        //Returns true after creating the new user.
        return "Account Created Successfully";
      }
    }
  }
  //makeUser Test
  //console.log(makeUser("car@gmail.com","12313232","Tester","Jones","02/04/2000","Game"));
  
  
  function removeUser(UserID){
  Database.deleteRecord("User","UserID",UserID);
  }
  //removeUser Test
  //removeUser("")
  
  function editFname(UserID,Fname){
    Database.updateRecord("User","Fname",Fname,"UserID",UserID);
  }
  function editLname(UserID,Lname){
    Database.updateRecord("User","Lname",Lname,"UserID",UserID);
  }
  
  //editFname + editLname Test
  //editFname("","");
  //editLname("","");
  
  function getUserDetails(userID){
  return Database.getRecord("User","UserID",userID)
  }
  //getUserDetails Test
  //console.log(getUserDetails(""));
  
  function getAllUserDetails(){
    return Database.getAllRecords("User")
  }
  return{
    Database,
    loginChecker,
    makeUser,
    removeUser,
    editFname,
    editLname,
    getUserDetails,
    getAllUserDetails,
  };

}