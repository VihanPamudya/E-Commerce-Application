const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const orderRoutes = require("./routes/orderRoute");
const productRoutes = require("./routes/productRoute");
const { MONGOURI } = require("./config/keys");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(MONGOURI)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("Database not connected!",err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
