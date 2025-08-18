

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const trustRoutes = require("./routes/trust");
const dashboardRoutes = require("./routes/dashboardRoutes");
const donationRoutes = require("./routes/donationRoutes");
const memberRoutes = require("./routes/memberRoutes");
const trusteeRoutes = require("./routes/trusteeRoutes"); // ✅ Add this line
const expenseRoutes = require("./routes/expenseRoutes");
const noteRoutes = require("./routes/noteRoutes");
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trust", trustRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/trustees", trusteeRoutes); // ✅ Register the trustee routes
app.use("/api/expenses", expenseRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/documents", require("./routes/documentRoutes"));
app.use("/api/setfee", require("./routes/setFeeRoutes"));
app.use("/api/notes", noteRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/TrustManagementSystem", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Server start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
