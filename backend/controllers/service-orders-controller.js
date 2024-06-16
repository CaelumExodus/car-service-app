const pool = require('../db');

exports.getServiceOrders = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM serviceorders');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.getServiceOrdersByClientId = async (req, res) => {
    const { clientId } = req.params;
    try {
        const data = await pool.query('SELECT * FROM serviceorders WHERE clientid = $1', [clientId]);
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

exports.createServiceOrder = async (req, res) => {
    const { clientid, status, totalcost } = req.body;
    try {
        await pool.query('INSERT INTO serviceorders (clientid, status, totalcost) VALUES ($1, $2, $3)', [clientid, status, totalcost]);
        res.status(200).send({ message: 'Service order created successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.updateServiceOrder = async (req, res) => {
    const { id } = req.params;
    const { clientid, status, totalcost } = req.body;
    try {
        await pool.query('UPDATE serviceorders SET clientid = $1, status = $2, totalcost = $3 WHERE orderid = $4', [clientid, status, totalcost, id]);
        res.status(200).send({ message: 'Service order updated successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.deleteServiceOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM serviceorders WHERE orderid = $1', [id]);
        res.status(200).send({ message: 'Service order deleted successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
