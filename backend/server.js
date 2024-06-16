const express = require("express");
const dbConnect = require("./db/db");

const app = express();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT;

// Connect to DB
dbConnect();

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
