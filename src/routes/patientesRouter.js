const express = require("express");
const patientesRouter = express.Router();
const patientesController = require("../controllers/patientController");

module.exports = patientesRouter;

patientesRouter.post("/searchPatientesByName", patientesController.searchPatientByName);
patientesRouter.post("/newPatient", patientesController.newPatient);
patientesRouter.put("/updatePatient/", patientesController.updatePatient);
patientesRouter.get("/searchPatientByPhysicianId/:physicianId", patientesController.searchPatientByPhysicianId);