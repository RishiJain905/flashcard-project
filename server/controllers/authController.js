import pool from "../db.js";
import bcrypt from "bcryptjs";
import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));

function checkPassword(password)
{
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

async function checkEmail(email){
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows.length > 0;
}

export const registerUser = async(req, res) => {
    const {fname, lname, email, password} = req.body;
    try{
        if(!checkPassword(password)) return res.status(400).json({message: "Invalid Password"});
        if(await checkEmail(email)) return res.status(400).json({message: "Email already in use"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query("INSERT INTO USERS(fname, lname, email, password) VALUES($1, $2, $3, $4) RETURNING*"
            ,[fname, lname, email, hashedPassword]
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
        const emailCheck = await checkEmail(email);
        if(!emailCheck){
            return res.status(400).json({message: "Invalid Email"});
        }
        const hashPass = await pool.query("SELECT password FROM users WHERE email = $1", [email]);
        const passCheck = await bcrypt.compare(password, hashPass.rows[0].password);
        if(!passCheck){
            return res.status(400).json({message: "Invalid Password"});
        }

        return res.status(200).json({message: "Successful Login"});

    }catch(err){
        console.error(err.message);
        return res.status(500).json({message: "Server Error"});
    }
};