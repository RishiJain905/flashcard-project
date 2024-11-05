import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import cors from "cors";
import env from "dotenv";


const app = express();
const port = 5000;
env.config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api", cardRoutes);       

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});