const express = require("express");
const physicianController = require("../controllers/physicianController");
const physiciansRouter = express.Router();
const auth = require('../middlewares/auth');

physiciansRouter.get("/listAllPhysician", physicianController.listAllPhysician);
physiciansRouter.post("/newPhysician", auth, physicianController.newPhysician);
physiciansRouter.put("/updatePhysician", auth, physicianController.updatePhysician);
physiciansRouter.delete("/deletePhysician/:id", auth, physicianController.deletePhysician);
physiciansRouter.post("/authentication", physicianController.authentication);

module.exports = physiciansRouter;
