import express from "express";
import { guestRouter, userRouter } from "./routes/api";
import cors from "cors";
import { corsOptions } from "./config/cors";
import "./types/global";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static("public"));

app.use("/api/v1", guestRouter);
app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
