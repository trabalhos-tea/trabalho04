const Patients = require("../models/Patients");
const Appointment = require("../models/Appointments");
const Sequelize = require("sequelize");

module.exports = {
    async searchPatientByName(req, res) {
        const name = req.body.name;
        if (!name)
            res.status(400).json({ msg: "Parâmetro nome está vazio", });
        const Op = Sequelize.Op;
        const patients = await Patients.findAll({
            where: { name: { [Op.like]: "%" + name + "%" } },
        });
        if (patients) {
            if (patients == "")
                res.status(404).json({ msg: "Paciente não encontrado" });
            else res.status(200).json({ patients });
        } else
            res.status(404).json({ msg: "Paciente não encontrado" });
    },

    async newPatient(req, res) {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos." });
        }
        const isPatientNew = await Patients.findOne({
            where: { email },
        });
        if (isPatientNew)
            res.status(403).json({ msg: "Paciente já foi cadastrado." });
        else {
            const patients = await Patients.create({
                name,
                email,
                phone,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possivel inserir os dados" });
            });
            if (patients)
                res.status(201).json({ msg: "Novo paciente foi adicionado." });
            else
                res.status(404).json({ msg: "Não foi possível cadastrar novo paciente." });
        }
    },

    async updatePatient(req, res) {
        const patientId = req.body.id;
        const patient = req.body;
        if (!patientId) res.status(400).json({ msg: "ID do Paciente vazio" });
        else {
            const patientExists = await Patients.findByPk(patientId);
            if (!patientExists)
                res.status(404).json({ msg: "Paciente não encontrado." });
            else {
                if (patient.name || patient.email || patient.phone) {
                    await Patients.update(patient, {
                        where: { id: patientId },
                    });
                    return res.status(200).json({ msg: "Paciente atualizado com sucesso." });
                } else
                    return res.status(400).json({ msg: "Campos obrigatórios não preenchidos" });
            }
        }
    },

    async searchPatientByPhysicianId(req, res) {
        const physicianId = req.params.physicianId;
        if (!physicianId)
            res.status(400).json({ msg: "Campo medico vazio" });
        const appointment = await Appointment.findAll({
            where: { physicianId },
        }).catch((error) => res.status(500).json({ msg: "Falha na conexão" }));
        if (appointment) {
            if (appointment == "")
                res.status(404).json({ msg: "Não há pacientes para esse medico" });
            else res.status(200).json({ appointment });
        } else res.status(404).json({ msg: "Não foi possivel encontrar medicos" });
    },


}