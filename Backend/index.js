const express = require("express");
const DBConnection = require("./config/DBConnection");
const offreRouter = require("./routes/adminRoutes/offreRouter");
const locationRouter = require("./routes/adminRoutes/locationRoutes");
const categoryRouter = require("./routes/adminRoutes/categoryRouter");
const cookieParser = require('cookie-parser');
const  cors = require('cors')
const authRouter = require("./routes/authRouter/authRouter");
const statisticsRouter = require("./routes/adminRoutes/statisticsRouter");
const adminAuthRouter = require("./routes/authRouter/adminAuthRouter");
const profileRouter = require("./routes/profileRoutes/profileRouter");
const Offre = require("./models/offreSchema");
const userOffreRouter = require("./routes/userRoutes/userOffreRouter");
const candidateRouter = require("./routes/userRoutes/candidateRouter");
const adminCandidateRouter = require("./routes/adminRoutes/adminCandidateRouter");
const cloudinary = require('cloudinary').v2;   


require("dotenv").config();
const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin:['http://localhost:5173','http://localhost:5174'], 
  credentials:true,          
}))

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// API auth
app.use("/api/auth", authRouter); 
app.use("/api/admin/auth", adminAuthRouter); 

// API Profile
app.use("/api/profile",profileRouter);


// API Admin
app.use("/api/admin/location", locationRouter);
app.use("/api/admin/category", categoryRouter);
app.use("/api/admin/offre", offreRouter);
app.use("/api/admin/statistics", statisticsRouter);
app.use("/api/admin/candidate", adminCandidateRouter);


// API USER

app.use("/api/user/offre", userOffreRouter);
app.use("/api/user/candidate", candidateRouter);



const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  DBConnection();
});
