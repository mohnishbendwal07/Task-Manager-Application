const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});