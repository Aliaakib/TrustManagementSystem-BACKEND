// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/auth");
// const trustRoutes = require("./routes/trust");
// const dashboardRoutes = require("./routes/dashboardRoutes");
// const donationRoutes = require("./routes/donationRoutes");
// const memberRoutes = require("./routes/memberRoutes");
// const trusteeRoutes = require("./routes/trusteeRoutes"); // ✅ Add this line
// const expenseRoutes = require("./routes/expenseRoutes");
// const noteRoutes = require("./routes/noteRoutes");
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/trust", trustRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/donations", donationRoutes);
// app.use("/api/members", memberRoutes);
// app.use("/api/trustees", trusteeRoutes); // ✅ Register the trustee routes
// app.use("/api/expenses", expenseRoutes);
// app.use("/uploads", express.static("uploads"));
// app.use("/api/documents", require("./routes/documentRoutes"));
// app.use("/api/setfee", require("./routes/setFeeRoutes"));
// app.use("/api/notes", noteRoutes);

// // MongoDB connection
// mongoose
//   .connect("mongodb://localhost:27017/TrustManagementSystem", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB error:", err));

// // Server start
// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const trustRoutes = require("./routes/trust");
const dashboardRoutes = require("./routes/dashboardRoutes");
const donationRoutes = require("./routes/donationRoutes");
const memberRoutes = require("./routes/memberRoutes");
const trusteeRoutes = require("./routes/trusteeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const noteRoutes = require("./routes/noteRoutes");
const documentRoutes = require("./routes/documentRoutes");
const setFeeRoutes = require("./routes/setFeeRoutes");

dotenv.config();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local dev
      "https://trust-track.vercel.app", // Vercel frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trust", trustRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/trustees", trusteeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/setfee", setFeeRoutes);
app.use("/api/notes", noteRoutes);

// Uploads (static files if needed)
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Backend running on Render 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
