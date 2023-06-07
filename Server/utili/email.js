const path = require("path");
const nodemailer = require("nodemailer");
const ejs = require("ejs");


const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "se.healthtracker101@gmail.com",
		pass: "btssdtghvfwpyiyo",
	},
});


function sendEmail(filename, email, subject, data) {
    ejs.renderFile(
        path.resolve(__dirname, `../emails/${filename}`),
        {data},
        (err, html) => {
            if (err) {
                console.error(err);
            } else {
                const mailOptions = {
                    from: '"Grab-It & Govan" <se.healthtracker101@gmail.com>',
                    to: email,
                    subject: subject,
                    html: html,
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("Email sent: " + info.response);
                    }
                }
                );
            }
        }
    );
}
                

module.exports = { sendEmail };


        