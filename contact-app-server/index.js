const express = require("express");
const cors = require("cors");
const contactRoutes = require("./src/routes/contactRoutes");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});