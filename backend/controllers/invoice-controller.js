const pool = require('../db');

const PDFDocument = require('pdfkit');

exports.generateInvoice = async (req, res) => {
    const { orderId } = req.params;

    try {
        const query = `
            SELECT so.orderid, so.clientid, so.status, so.totalcost, so.createddate, so.completeddate,
                sod.orderdetailid, sod.serviceid,
                s.servicename, s.description, s.price
            FROM serviceorders so
            INNER JOIN serviceorderdetails sod ON so.orderid = sod.orderid
            INNER JOIN services s ON sod.serviceid = s.serviceid
            WHERE so.orderid = $1
        `;
        const { rows } = await pool.query(query, [orderId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No service order found for the specified ID' });
        }

        const order = {
            orderid: rows[0].orderid,
            clientid: rows[0].clientid,
            status: rows[0].status,
            totalcost: rows[0].totalcost,
            createddate: rows[0].createddate,
            completeddate: rows[0].completeddate,
            services: rows.map(row => ({
                serviceid: row.serviceid,
                servicename: row.servicename,
                description: row.description,
                price: row.price,
            })),
        };

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=invoice_${order.orderid}.pdf`);

        doc.pipe(res);

        doc.fontSize(25).text('Invoice', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Order ID: ${order.orderid}`);
        doc.text(`Client ID: ${order.clientid}`);
        doc.text(`Status: ${order.status}`);
        doc.text(`Total Cost: ${order.totalcost} PLN`);
        doc.text(`Created Date: ${new Date(order.createddate).toLocaleDateString()}`);
        doc.text(`Completed Date: ${new Date(order.completeddate).toLocaleDateString()}`);
        doc.moveDown();
        doc.fontSize(18).text('Services:');
        order.services.forEach(service => {
            doc.fontSize(14).text(`- ${service.servicename}: ${service.price} PLN`);
            doc.fontSize(12).text(`  Description: ${service.description}`);
            doc.moveDown(0.5);
        });

        doc.end();
    } catch (err) {
        console.error('Error generating invoice:', err);
        res.status(500).json({ error: 'Failed to generate invoice' });
    }
};
