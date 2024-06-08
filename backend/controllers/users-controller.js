// controllers/usersController.js
const pool = require('../db');

exports.getUsers = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM users');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.createUser = async (req, res) => {
    const { username, password, email, phoneNumber, role } = req.body;
    try {
        await pool.query('INSERT INTO users (username, password, email, phoneNumber, role) VALUES ($1, $2, $3, $4, $5)', [username, password, email, phoneNumber, role]);
        res.status(200).send({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, email, phoneNumber, role } = req.body;
    try {
        await pool.query('UPDATE users SET username = $1, password = $2, email = $3, phoneNumber = $4, role = $5 WHERE userid = $6', [username, password, email, phoneNumber, role, id]);
        res.status(200).send({ message: 'User updated successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM users WHERE userid = $1', [id]);
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
