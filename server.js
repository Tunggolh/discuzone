const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose.connect(process.env.DATABASE);

app.listen(3000);
