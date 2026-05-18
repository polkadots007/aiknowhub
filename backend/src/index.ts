import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from './routes/ai.route'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notes", notesRoutes);

app.get("/", (_req, res) => {
  res.send("Server running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});