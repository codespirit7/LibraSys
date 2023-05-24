const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

app.use(cors());
const port = process.env.PORT || 5000;
/**
 * importing defined routes
 */
const userRoute = require("./routes/users/user");
const adminRoute = require("./routes/admin/admin");
const bookRoute = require("./routes/books/books");

const mongoose = require("mongoose");

app.use(express.json());

dotenv.config();

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to mongoose"))
  .catch((err) => console.log(err));

app.use("/", userRoute);
app.use("/", adminRoute);
app.use("/", bookRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Backend is running on ${port}`);
});
