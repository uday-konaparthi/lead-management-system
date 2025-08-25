const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

const connectDB = require('./src/db/db');
const authRoutes = require('./src/routes/auth');
const leadRoutes = require('./src/routes/lead');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["https://lead-management-system-theta.vercel.app", "https://lead-management-system-2hy2aja1g-uday-konaparthi-s-projects.vercel.app"],
    credentials: true, 
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
