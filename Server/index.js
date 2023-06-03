// JS Imports
const path = require("path");
// Express Imports
const express = require("express");
const cors = require("cors");
const app = express();

// CORS rubbish
app.use(
	cors({
		origin: "http://127.0.0.1:5173",
		optionsSuccessStatus: 200,
	})
);

app.use(
	express.static(path.resolve(__dirname, "../client/dist"), { index: false })
);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

// Server Middleware
app.use((req, res, next) => {
	const start = +new Date();
	next();
	const time = +new Date() - start;
	console.log("Request made to", req.path, "took", `${time}ms`);
});

// Server Config
const port = process.env.PORT || 3000;

// Routers
const APIRoute = require("./routes/api")({ express });

// Routes
app.use("/api", APIRoute);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../Client/dist", "index.html"));
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("../emails/welcome.ejs");
});

app.use(express.static("emails"));

// Open listener
app.listen(port, () => {
	console.log(`Super Cool Synoptic Project Server Listening on port ${port}`);
});
