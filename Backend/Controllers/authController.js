const fs = require("fs");
const path = require("path");

const usersFile = path.join(
    __dirname,
    "../data/users.json"
);

// Register
exports.register = (req, res) => {

    const users = JSON.parse(
        fs.readFileSync(usersFile)
    );

    const { username, password } = req.body;

    const userExists = users.find(
        user => user.username === username
    );

    if(userExists){
        return res.status(400).json({
            message:"User already exists"
        });
    }

    users.push({
        username,
        password
    });

    fs.writeFileSync(
        usersFile,
        JSON.stringify(users,null,2)
    );

    res.json({
        message:"Registration Successful"
    });
};

// Login
exports.login = (req,res)=>{

    const users = JSON.parse(
        fs.readFileSync(usersFile)
    );

    const { username,password } = req.body;

    const user = users.find(
        u =>
        u.username === username &&
        u.password === password
    );

    if(!user){
        return res.status(401).json({
            message:"Invalid Credentials"
        });
    }

    res.json({
        message:"Login Successful",
        username:user.username
    });
};