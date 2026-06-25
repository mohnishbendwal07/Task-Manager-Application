const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const taskRoutes = require("./Routes/tasks");
const authRoutes = require("./Routes/auth");

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager Backend is Running 🚀");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});