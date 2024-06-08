const pool = require('../db');

exports.getInvoices = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM invoices');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.createInvoice = async (req, res) => {
    const { orderid, clientid, amount, duedate, status } = req.body;
    try {
        await pool.query('INSERT INTO invoices (orderid, clientid, amount, duedate, status) VALUES ($1, $2, $3, $4, $5)', [orderid, clientid, amount, duedate, status]);
        res.status(200).send({ message: 'Invoice created successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.updateInvoice = async (req, res) => {
    const { id } = req.params;
    const { orderid, clientid, amount, duedate, status } = req.body;
    try {
        await pool.query('UPDATE invoices SET orderid = $1, clientid = $2, amount = $3, duedate = $4, status = $5 WHERE invoiceid = $6', [orderid, clientid, amount, duedate, status, id]);
        res.status(200).send({ message: 'Invoice updated successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.deleteInvoice = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM invoices WHERE invoiceid = $1', [id]);
        res.status(200).send({ message: 'Invoice deleted successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
