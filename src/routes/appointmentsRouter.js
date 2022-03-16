const express = require("express");
const appointmentsController = require('../controllers/appointmentController');
const appointmentsRouter = express.Router();
const auth = require('../middlewares/auth');

appointmentsRouter.post('/', auth, appointmentsController.newAppointment)
appointmentsRouter.get('/patient/:id', auth, appointmentsController.searchAppointmentByPatientId)
appointmentsRouter.get('/physician/:id', auth, appointmentsController.searchAppointmentByPhysicianId)
appointmentsRouter.delete('/:id', auth, appointmentsController.deleteAppointment)

module.exports = appointmentsRouter;
