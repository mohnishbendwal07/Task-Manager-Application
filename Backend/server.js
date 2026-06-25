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

app.listen(5000, () => {
    console.log("Server running on port 5000");
});