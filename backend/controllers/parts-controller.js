const pool = require('../db');

exports.getParts = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM parts');
        res.status(200).send(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.createPart = async (req, res) => {
    const { partname, partcategory, quantityinstock, unitprice, supplier } = req.body;
    try {
        await pool.query('INSERT INTO parts (partname, partcategory, quantityinstock, unitprice, supplier) VALUES ($1, $2, $3, $4, $5)', [partname, partcategory, quantityinstock, unitprice, supplier]);
        res.status(200).send({ message: 'Part created successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.updatePart = async (req, res) => {
    const { id } = req.params;
    const { partname, partcategory, quantityinstock, unitprice, supplier } = req.body;
    try {
        await pool.query('UPDATE parts SET partname = $1, partcategory = $2, quantityinstock = $3, unitprice = $4, supplier = $5 WHERE partid = $6', [partname, partcategory, quantityinstock, unitprice, supplier, id]);
        res.status(200).send({ message: 'Part updated successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.deletePart = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM parts WHERE partid = $1', [id]);
        res.status(200).send({ message: 'Part deleted successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.incrementQuantity = async (req, res) => {
    const { id, quantity } = req.body;


    try {
        await pool.query('UPDATE parts SET quantityinstock = quantityinstock + $1 WHERE partid = $2', [quantity, id]);
        res.status(200).send({ message: 'Quantity incremented successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

exports.decrementQuantity = async (req, res) => {
    const { id, quantity } = req.body;

    try {
        const result = await pool.query('SELECT quantityinstock FROM parts WHERE partid = $1', [id]);
        const currentQuantity = result.rows[0]?.quantityinstock;

        if (currentQuantity === undefined) {
            return res.status(404).send({ message: 'Part not found' });
        }

        if (currentQuantity - quantity < 0) {
            return res.status(400).send({ message: 'Insufficient stock to decrement by the specified amount' });
        }

        await pool.query('UPDATE parts SET quantityinstock = quantityinstock - $1 WHERE partid = $2', [quantity, id]);
        res.status(200).send({ message: 'Quantity decremented successfully' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};
