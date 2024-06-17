const express = require("express");
const dbConnect = require("./config/connectDB");

const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT;

// Connect to DB
dbConnect();

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
