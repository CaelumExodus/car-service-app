const pool = require('../db');

exports.getServices = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM services');
        res.status(200).send(data.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

exports.createService = async (req, res) => {
    const { serviceName, description, price } = req.body;
    try {
        await pool.query('INSERT INTO services (serviceName, description, price) VALUES ($1, $2, $3)', [serviceName, description, price]);
        res.status(200).send({ message: 'Service created successfully' });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

exports.updateService = async (req, res) => {
    const { id } = req.params;
    const { serviceName, description, price } = req.body;
    try {
        await pool.query('UPDATE services SET serviceName = $1, description = $2, price = $3 WHERE serviceid = $4', [serviceName, description, price, id]);
        res.status(200).send({ message: 'Service updated successfully' });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

exports.deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM services WHERE serviceid = $1', [id]);
        res.status(200).send({ message: 'Service deleted successfully' });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};
