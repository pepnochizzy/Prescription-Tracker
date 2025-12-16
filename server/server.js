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

app.post("/create-prescription", (req, res) => {
  //recieve data
  const newPrescription = req.body.formValues;
  console.log(newPrescription);
  //insert data into table
  const query = db.query(
    `INSERT INTO prescriptions (medication_name, dosage, how_often, time_of_day, re_order) VALUES ($1, $2, $3, $4, $5)`,
    [
      newPrescription.medicationName,
      newPrescription.dosage,
      newPrescription.howOften,
      newPrescription.timeOfDay,
      newPrescription.reOrder,
    ]
  );
  res.json({ status: "success!", values: newPrescription });
});

app.get("/get-info", async (req, res) => {
  const query = await db.query(`SELECT * FROM prescriptions`);
  console.log(query);
  res.json(query.rows);
});
//ensure newPrescription variable carries through form.js and that form names/for are camelcase in form.html
