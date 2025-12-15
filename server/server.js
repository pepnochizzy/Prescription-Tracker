console.log("Hello world!");

//TODO: set up server
import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8080;
app.listen(PORT, () => {
  console.info(`server running on port:${PORT}`);
});

app.get("/", (req, res) => {
  res.json(`Welcome to the root route!`);
});
