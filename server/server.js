import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import env from "dotenv";
import session from "express-session";
import passport from "passport";
import pgSimple from "connect-pg-simple";
import pool from "./db.js";


const app = express();
const port = 5000;
const pgSession = pgSimple(session);
env.config();

app.use(
    session({
        store: new pgSession({
            pool: pool,
            tableName: "session"
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
        }
    })
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use("/api/auth", authRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});