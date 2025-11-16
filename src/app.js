import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import base44Routes from "./routes/base44.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("DEBUG → MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro Mongo:", err));

app.use("/api/base44", base44Routes);

app.get("/", (req, res) => {
  res.send("API ONLINE");
});

export default app;

