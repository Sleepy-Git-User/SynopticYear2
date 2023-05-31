/**
 * Router Setup for API Requests
 * @returns Express Router
 */

const interface = require("../DataBase/interface.js")();

module.exports = (components) => {
    const {database, express} = components;
    const router = express.Router();

    router.get('/getAllUserDetails', (req, res)=>{
        res.json({success:true, data:{
            UserDetails:interface.getAllUserDetails()
        }});
    })

    router.post('/makeUser', (req, res)=>{
        interface.makeUser(req.body.Email,req.body.PhoneNumber,req.body.Fname,req.body.Lname,req.body.DoB,req.body.Password);
        res.json({success:true})
    });

    router.post('/loginChecker', async (req, res) => {
        
        try {
            const { userID } = req?.body;
            if (!userID) {
                return res.status(400).json({ success: false, message: 'Missing userID' });
            }
            const isValid = await interface.loginChecker(userID);
            return res.json({ success: isValid });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    });

    router.post('/removeUser', (req, res)=>{
        interface.removeUser(req.body.userID);
        res.json({success:true})
    });

    router.post('/editFname', (req, res)=>{
        interface.editFname(req.body.userID,req.body.Fname);
        res.json({success:true})
    });

    router.post('/editLname', (req, res)=>{
        interface.editLname(req.body.userID,req.body.Lname);
        res.json({success:true})
    });
    return router;
}