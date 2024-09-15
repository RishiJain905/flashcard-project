import pool from "../db.js";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

export const registerUser = async(req, res) => {
    const {fname, lname, email, password} = req.body;
}