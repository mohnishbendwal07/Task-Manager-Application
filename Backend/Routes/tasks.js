const express = require("express");

const router = express.Router();

const {
    getTasks,
    addTask,
    deleteTask
} = require("../Controllers/taskController");

router.get("/", getTasks);

router.post("/", addTask);

router.delete("/:id", deleteTask);

module.exports = router;