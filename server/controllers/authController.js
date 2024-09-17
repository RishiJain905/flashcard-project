import pool from "../db.js";
import bcrypt from "bcryptjs";
import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));

function checkPassword(password)
{
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    return re.test(str);
}

async function checkEmail(email){
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if(result.rows.length > 0) return false;
    return true;
}

export const registerUser = async(req, res) => {
    const {fname, lname, email, password} = req.body;
    try{
        if(!checkPassword(password)) return res.status(400).json({message: "Invalid Password"});
        if(!checkEmail(email)) return res.status(400).json({message: "Email already in use"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query("INSERT INTO USERS(fname, lname, email, password) VALUES($1, $2, $3, $4) RETURNING*"
            ,[fname, lname, email, password]
        );

        return res.status(201).json({message: "User Registered Successfully", user: newUser.rows[0]});

    }catch(err){
        console.error(err.message);
        return res.status(500).json({message: "Server Error"});
    }
};

export const userLogin = async(req, res) => {
    const {email, password} = req.body;
    try{
        if(checkEmail(user)){
            return res.status(400).json({message: "Invalid Email"});
        }
        const hashPass = await pool.query("SELECT password FROM users WHERE email = $1", [email]);
        const check = await bcrypt.compare(password, hashPass);
        if(!check){
            return res.status(400).json({message: "Invalid Password"});
        }



    }catch(err){
        console.error(err.message);
        return res.status(500).json({message: "Server Error"});
    }
};