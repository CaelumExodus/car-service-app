const pool = require('../db');

exports.getComplaints = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM complaints');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.getComplaintsByClientId = async (req, res) => {
    const { clientId } = req.params;

    try {
        const data = await pool.query('SELECT * FROM complaints WHERE clientid = $1', [clientId]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

exports.createComplaint = async (req, res) => {
    const { orderid, clientid, description, status } = req.body;
    try {
        await pool.query('INSERT INTO complaints (orderid, clientid, description, status) VALUES ($1, $2, $3, $4)', [orderid, clientid, description, status]);
        res.status(200).send({ message: 'Complaint created successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.updateComplaint = async (req, res) => {
    const { id } = req.params;
    const { orderid, clientid, description, status } = req.body;
    try {
        await pool.query('UPDATE complaints SET orderid = $1, clientid = $2, description = $3, status = $4 WHERE complaintid = $5', [orderid, clientid, description, status, id]);
        res.status(200).send({ message: 'Complaint updated successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.deleteComplaint = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM complaints WHERE complaintid = $1', [id]);
        res.status(200).send({ message: 'Complaint deleted successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
