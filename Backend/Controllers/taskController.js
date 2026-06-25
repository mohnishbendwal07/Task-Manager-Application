const fs = require("fs");
const path = require("path");

const filePath = path.join(
    __dirname,
    "../data/tasks.json"
);

exports.getTasks = (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(filePath));
    res.json(tasks);
};

exports.addTask = (req, res) => {
    const tasks = JSON.parse(fs.readFileSync(filePath));

    const newTask = {
        id: Date.now(),
        title: req.body.title
    };

    tasks.push(newTask);

    fs.writeFileSync(
        filePath,
        JSON.stringify(tasks, null, 2)
    );

    res.json(newTask);
};

exports.deleteTask = (req, res) => {
    let tasks = JSON.parse(fs.readFileSync(filePath));

    tasks = tasks.filter(
        task => task.id != req.params.id
    );

    fs.writeFileSync(
        filePath,
        JSON.stringify(tasks, null, 2)
    );

    res.json({
        message: "Task Deleted"
    });
};