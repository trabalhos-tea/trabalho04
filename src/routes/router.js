const express = require("express");
const patientesRouter = require("./patientesRouter");
const physiciansRouter = require("./physiciansRouter");
const appointmentsRouter = require("./appointmentsRouter");
const router = express.Router();

router.get("/", (req,res) => {
    res.send("It's working");
});

router.use("/physicians", physiciansRouter);
router.use("/patientes", patientesRouter);
router.use("/appointments", appointmentsRouter);

module.exports = router;