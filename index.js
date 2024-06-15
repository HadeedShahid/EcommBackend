const { error } = require("console");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connection successful");
  })
  .catch((error) => console.log("error: ", error));

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`server started on port: ${process.env.PORT || 5000}`);
});
