const express = require("express");
const physicianController = require("../controllers/physicianController");
const physiciansRouter = express.Router();

physiciansRouter.post("/listAllPhysician", physicianController.listAllPhysician);
physiciansRouter.post("/newPhysician", physicianController.newPhysician);
physiciansRouter.put("/updatePhysician", physicianController.updatePhysician);
physiciansRouter.delete("/deletePhysician/:id", physicianController.deletePhysician);
physiciansRouter.post("/authentication", physicianController.authentication);

module.exports = physiciansRouter;