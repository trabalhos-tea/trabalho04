const express = require("express");
const appointmentsController = require('../controllers/appointmentController');
const appointmentsRouter = express.Router();

appointmentsRouter.post('/', appointmentsController.newAppointment)
appointmentsRouter.get('/patient/:id', appointmentsController.searchAppointmentByPatientId)
appointmentsRouter.get('/physician/:id', appointmentsController.searchAppointmentByPhysicianId)
appointmentsRouter.delete('/:id', appointmentsController.deleteAppointment)

module.exports = appointmentsRouter;
