import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("api/auth", authRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});