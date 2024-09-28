import pool from "../db.js";
import bcrypt from "bcryptjs";
import express from "express";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";

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
        req.login(newUser.rows[0], (err) =>{
            if(err){
                return next(err);
            }
            return res.status(201).json({message: "User Registered Successfully", user: newUser.rows[0]});
        });
    }catch(err){
        console.error(err.message);
        return res.status(500).json({ message: "Server Error"});
    }
};

export const userLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server Error" });
        }
        if (!user) {
            return res.status(400).json({ message: info.message || "Login Failed" });
        }
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Server Error" });
            }
            return res.status(200).json({ message: "User Logged In Successfully", user: user });
        });
    })(req, res, next);
};

export const userLogout = (req, res) => {
    req.logout(function (err) {
        if (err) {
        return next(err);
        }
        return res.status(200).json({message: "User Succssfully Logged Out"});
    })
};

passport.use(
    new LocalStrategy({usernameField: 'email'}, async (email, password, cb) => {
        try{
            const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if(userResult.rows.length == 0){
                return cb(null, false, {message: "Invalid Email"});
            }
            const user = userResult.rows[0];
            const passCheck = await bcrypt.compare(password, user.password);
            if(!passCheck){
                return cb(null, false, {message: "Invalid Password"});
            }
    
            return cb(null, user);
    
        }catch(err){
            console.error(err.message);
            return cb(err);
        }
    })
)

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
    try {
        const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (userResult.rows.length === 0) {
            return cb(new Error("User not found"));
        }
        const user = userResult.rows[0];
        cb(null, user);
    } catch (err) {
        cb(err);
    }
});