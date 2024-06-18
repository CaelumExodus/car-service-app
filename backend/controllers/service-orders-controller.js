const pool = require('../db');

exports.getServiceOrders = async (req, res) => {
    try {
        const query = 'SELECT * FROM serviceorders';
        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching service orders:', err);
        res.sendStatus(500);
    }
};

exports.getServiceOrdersByClientId = async (req, res) => {
    const { clientId } = req.params;
    try {
        const query = 'SELECT * FROM serviceorders WHERE clientid = $1';
        const { rows } = await pool.query(query, [clientId]);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching service orders by client ID:', err);
        res.sendStatus(500);
    }
};

exports.getServiceOrdersWithServicesByClient = async (req, res) => {
    const { clientId } = req.params;

    try {
        const query = `
            SELECT so.orderid, so.clientid, so.status, so.totalcost, so.createddate, so.completeddate,
                sod.orderdetailid, sod.serviceid,
                s.servicename, s.description, s.price
            FROM serviceorders so
            INNER JOIN serviceorderdetails sod ON so.orderid = sod.orderid
            INNER JOIN services s ON sod.serviceid = s.serviceid
            WHERE so.clientid = $1
        `;

        const { rows } = await pool.query(query, [clientId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No service orders found for the specified client' });
        }

        // Grouping service orders with their services
        const serviceOrdersWithServices = {};
        rows.forEach(row => {
            const orderId = row.orderid;
            if (!serviceOrdersWithServices[orderId]) {
                serviceOrdersWithServices[orderId] = {
                    orderid: row.orderid,
                    clientid: row.clientid,
                    status: row.status,
                    totalcost: row.totalcost,
                    createddate: row.createddate,
                    completeddate: row.completeddate,
                    services: [],
                };
            }
            // Add service details to services array
            serviceOrdersWithServices[orderId].services.push({
                serviceid: row.serviceid,
                servicename: row.servicename,
                description: row.description,
                price: row.price,
            });
        });

        // Convert object to array of service orders
        const serviceOrdersArray = Object.values(serviceOrdersWithServices);

        res.status(200).json(serviceOrdersArray);
    } catch (err) {
        console.error('Error fetching service orders with services:', err);
        res.status(500).json({ error: 'Failed to fetch service orders with services' });
    }
};

exports.getAllServiceOrdersWithServices = async (req, res) => {
    try {
        const query = `
            SELECT so.orderid, so.clientid, so.status, so.totalcost, so.createddate, so.completeddate,
                sod.orderdetailid, sod.serviceid,
                s.servicename, s.description, s.price
            FROM serviceorders so
            INNER JOIN serviceorderdetails sod ON so.orderid = sod.orderid
            INNER JOIN services s ON sod.serviceid = s.serviceid
        `;

        const { rows } = await pool.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No service orders found' });
        }

        // Grouping service orders with their services
        const serviceOrdersWithServices = {};
        rows.forEach(row => {
            const orderId = row.orderid;
            if (!serviceOrdersWithServices[orderId]) {
                serviceOrdersWithServices[orderId] = {
                    orderid: row.orderid,
                    clientid: row.clientid,
                    status: row.status,
                    totalcost: row.totalcost,
                    createddate: row.createddate,
                    completeddate: row.completeddate,
                    services: [],
                };
            }
            // Add service details to services array
            serviceOrdersWithServices[orderId].services.push({
                serviceid: row.serviceid,
                servicename: row.servicename,
                description: row.description,
                price: row.price,
            });
        });

        // Convert object to array of service orders
        const serviceOrdersArray = Object.values(serviceOrdersWithServices);

        res.status(200).json(serviceOrdersArray);
    } catch (err) {
        console.error('Error fetching service orders with services:', err);
        res.status(500).json({ error: 'Failed to fetch service orders with services' });
    }
};



// Function to create a new service order
exports.createServiceOrder = async (req, res) => {
    const { clientid, status, totalcost, serviceorderdetails } = req.body;

    try {
        // Start a transaction to ensure all queries are atomic
        const client = await pool.connect();
        await client.query('BEGIN');

        // Insert into serviceorders table
        const insertOrderQuery = 'INSERT INTO serviceorders (clientid, status, totalcost) VALUES ($1, $2, $3) RETURNING orderid';
        const orderValues = [clientid, status, totalcost];
        const orderResult = await client.query(insertOrderQuery, orderValues);
        const orderId = orderResult.rows[0].orderid;

        // Prepare the query for inserting into serviceorderdetails table
        const insertDetailsQuery = 'INSERT INTO serviceorderdetails (orderid, serviceid) VALUES ($1, $2)';

        // Insert each service detail into serviceorderdetails
        for (const detail of serviceorderdetails) {
            const detailValues = [orderId, detail.serviceId];
            await client.query(insertDetailsQuery, detailValues);
        }

        // Commit the transaction
        await client.query('COMMIT');
        client.release();

        res.status(201).json({ message: 'Service order created successfully' });
    } catch (err) {
        // Rollback the transaction in case of any error
        await client.query('ROLLBACK');
        client.release();

        console.error('Error creating service order:', err);
        res.status(500).json({ error: 'Failed to create service order' });
    }
};

exports.updateServiceOrder = async (req, res) => {
    const { id } = req.params;
    const { clientid, status, totalcost } = req.body;
    try {
        const query = 'UPDATE serviceorders SET clientid = $1, status = $2, totalcost = $3 WHERE orderid = $4';
        await pool.query(query, [clientid, status, totalcost, id]);
        res.status(200).json({ message: 'Service order updated successfully' });
    } catch (err) {
        console.error('Error updating service order:', err);
        res.sendStatus(500);
    }
};

exports.deleteServiceOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM serviceorders WHERE orderid = $1';
        await pool.query(query, [id]);
        res.status(200).json({ message: 'Service order deleted successfully' });
    } catch (err) {
        console.error('Error deleting service order:', err);
        res.sendStatus(500);
    }
};



