import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from './routes/ai.route'


dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://aiknowhub-8nj6mdojq-polkadots007s-projects.vercel.app", // production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/notes", notesRoutes);

app.get("/", (_req, res) => {
  res.send("Server running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});