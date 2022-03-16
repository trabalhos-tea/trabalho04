const Appointments = require("../models/Appointments");
const Patients = require("../models/Patients");
const Physicians = require("../models/Physicians");

module.exports = {
  async newAppointment(req, res) {
    const appointment = req.body;
    const { appointmentDate, description, physicianId, patientId } =
      appointment;

    if (!appointmentDate || !description || !physicianId || !patientId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const appointments = await Appointments.findAll({
      where: {
        physicianId: appointment.physicianId,
        appointmentDate: appointment.appointmentDate,
      },
    });

    if (appointments.length > 0) {
      return res.status(400).json({
        error: "This physician already has an appointment at this time",
      });
    }

    await Appointments.create(appointment);

    return res.status(201).send();
  },
  async searchAppointmentByPatientId(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    if (!(await Patients.findByPk(id)))
      return res.status(404).json({ error: "Patient not found" });

    return res.json(
      await Appointments.findAll({
        where: {
          patientId: id,
        },
      })
    );
  },
  async searchAppointmentByPhysicianId(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    if (!(await Physicians.findByPk(id)))
      return res.status(404).json({ error: "Physician not found" });

    return res.json(
      await Appointments.findAll({
        where: {
          physicianId: id,
        },
      })
    );
  },
  async deleteAppointment(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const deleted = await Appointments.destroy({
      where: {
        id,
      },
    });

    if (deleted <= 0)
      return res.status(404).json({ error: "Appointment not found" });

    return res.json({msg: "Appointment deleted"});
  },
};
