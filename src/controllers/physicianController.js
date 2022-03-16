const Physician = require("../models/Physicians");
const Sequelize = require("sequelize");
const Physicians = require("../models/Physicians");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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

        const passwordValid = passwordValidation(password);
        if (passwordValid !== "OK")
            return res.status(400).json({ msg: passwordValid });

        const isPhysicianNew = await Physician.findOne({
            where: { email },
        });

        if (isPhysicianNew)
            res.status(403).json({ msg: "Médico já foi cadastrado." });
        else {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(password, salt);

            const physician = await Physician.create({
                name,
                email,
                password: hash,
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
            where: { id, },
        });
        if (deleted <= 0)
            return res.status(404).json({ error: "Physician not found" });
        return res.json({ msg: "Médico excluido com sucesso" });
    },

    async authentication(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password)
            return res.status(400).json({ msg: "Campos obrigatórios vazios! " });
        try {
            const physician = await Physician.findOne({
                where: { email },
            });

            if (!physician)
                return res.status(404).json({ msg: "Usuário ou senha inválidos." });
            else {
                if (bcrypt.compareSync(password, physician.password))
                    return res.status(200).json({ msg: "Autenticado com sucesso" });
                else
                    return res.status(200).json({ msg: "Usuário ou senha inválidos." });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

}

function passwordValidation(password) {
    if (password.length < 8)
        return "Senha deve ter no mínimo 8 caracteres.";
    else if (!password.match(/[a-zA-Z]/g))
        return "Senha deve ter no mínimo uma letra.";
    else if (!password.match(/[0-9]+/))
        return "Senha deve ter no mínimo um número.";
    else return "OK";
}

function generateToken(id) {
	console.log(process.env.JWT_SECRET);
	process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
	console.log(process.env.JWT_SECRET);
	const token = jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: 82800, //Token expera em 24 horas
	});
	console.log(token);
	return token;
}