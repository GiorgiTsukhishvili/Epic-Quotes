import express from "express";
import apiRouter from "./routes/api";
import cors from "cors";
import { corsOptions } from "./utils/cors";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use(apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
