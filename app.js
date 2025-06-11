const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config();

const connectDB = require('./lib/db.js');
const initDB = require("./init");
connectDB().then(initDB);

app.use(express.static(path.join(__dirname,"public")));

app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));

const indexRoutes = require("./routes/authroute.js");
app.use("/",indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})