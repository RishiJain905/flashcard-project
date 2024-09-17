import express from "express";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});