const Physician = require("../models/Physicians");
const Sequelize = require("sequelize");
const Physicians = require("../models/Physicians");


module.exports = {

    async listAllPhysician(req, res) {
        const physician = await Physician.findAll({
            order: [["name", "ASC"]],
        }).catch((error) => {
            res.status(500).json({ msg: "Falha na conexão" });
        });

        if (physician) res.status(200).json({ physician });
        else
            res.status(404).json({ msg: "Não foi possível encontrar o médico" });
    },



    async newPhysician(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ msg: "Dados obrigatórios não foram preenchidos." });
        }
        const isPhysicianNew = await Physician.findOne({
            where: { email },
        });
        if (isPhysicianNew)
            res.status(403).json({ msg: "Médico já foi cadastrado." });
        else {
            const physician = await Physician.create({
                name,
                email,
                password,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possivel inserir os dados" });
            });
            if (physician)
                res.status(201).json({ msg: "Novo médico foi adicionado." });
            else
                res.status(404).json({ msg: "Não foi possível cadastrar novo médico." });
        }
    },

    async updatePhysician(req, res) {
        const physicianId = req.body.id;
        const physician = req.body;
        if (!physicianId) res.status(400).json({ msg: "ID do Paciente vazio" });
        else {
            const physicianExists = await Physician.findByPk(physicianId);
            if (!physicianExists)
                res.status(404).json({ msg: "Paciente não encontrado." });
            else {
                if (physician.name || physician.email || physician.password) {
                    await Physician.update(physician, {
                        where: { id: physicianId },
                    });
                    return res.status(200).json({ msg: "Paciente atualizado com sucesso." });
                } else
                    return res.status(400).json({ msg: "Campos obrigatórios não preenchidos" });
            }
        }
    },

    async deletePhysician(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });
        const deleted = await Physician.destroy({
          where: {id,},
        });
        if (deleted <= 0)
          return res.status(404).json({ error: "Physician not found" }); 
        return res.json({msg: "Médico excluido com sucesso"});
      },

}

