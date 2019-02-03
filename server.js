const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./routes/api/user");
const post = require("./routes/api/post");
const profile = require("./routes/api/profile");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

//DB CONFIG
const db = require("./config/keys").mongoURI;

//Connect to mongoDB through mongoose
mongoose.set("useFindAndModify", false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MONGODB CONNECTED SUCCESSFULLY..."))
  .catch(err => console.log(`UNABLE TO CONNECT: ${err}`));

const port = process.env.PORT || 5000;

// Body-parser middleware setup

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport middleware setup

app.use(passport.initialize());

// Passport config

require("./config/passport")(passport);

//USE ROUTES

app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/post", post);

//Connect server to static asset in client

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname, { index: "client/build/" }));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}...`));
