import pool from "../db.js";
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function checkPassword(password)
{
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

async function checkEmail(email){
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows.length > 0;
}

export const registerUser = async(req, res, next) => {
    const {fname, lname, email, password} = req.body;
    try{
        if(!checkPassword(password)) return res.status(400).json({message: "Invalid Password"});
        if(await checkEmail(email)) return res.status(400).json({message: "Email already in use"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query("INSERT INTO USERS(fname, lname, email, password) VALUES($1, $2, $3, $4) RETURNING*"
            ,[fname, lname, email, hashedPassword]
        );
        const token = jwt.sign(
            { id: newUser.rows[0].id, email: newUser.rows[0].email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({
            message: "User Registered Successfully",
            token,
            user: newUser.rows[0]
        });
    }catch(err){
        console.error(err.message);
        return res.status(500).json({ message: "Server Error"});
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userResult.rows.length === 0) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        const user = userResult.rows[0];
        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        // Generate JWT for the user
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "User Logged In Successfully",
            token,
            user
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }
};
