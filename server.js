const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const signupRoutes = require("./src/signup");

app.use("/api", signupRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
