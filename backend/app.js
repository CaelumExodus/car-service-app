const express = require('express');
const cors = require('cors');
const usersController = require('./controllers/users-controller');
const servicesController = require('./controllers/services-controller');
const serviceOrdersController = require('./controllers/service-orders-controller');
const partsController = require('./controllers/parts-controller');
const complaintsController = require('./controllers/complaints-controller');
const invoiceController = require('./controllers/invoice-controller');
const port = 3000;

const app = express();

// Enable CORS for any origin
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes for users
app.get('/users', usersController.getUsers);
app.post('/users', usersController.createUser);
app.put('/users/:id', usersController.updateUser);
app.delete('/users/:id', usersController.deleteUser);
app.post('/users/login', usersController.loginUser);

// Routes for services
app.get('/services', servicesController.getServices);
app.post('/services', servicesController.createService);
app.put('/services/:id', servicesController.updateService);
app.delete('/services/:id', servicesController.deleteService);

// Routes for service orders
app.get('/service-orders', serviceOrdersController.getServiceOrders);
app.get('/service-orders/client/:clientId', serviceOrdersController.getServiceOrdersByClientId);
app.get('/service-orders/with-services/client/:clientId', serviceOrdersController.getServiceOrdersWithServicesByClient);
app.get('/service-orders/with-services', serviceOrdersController.getAllServiceOrdersWithServices);
app.post('/service-orders', serviceOrdersController.createServiceOrder);
app.put('/service-orders/:id', serviceOrdersController.updateServiceOrder);
app.delete('/service-orders/:id', serviceOrdersController.deleteServiceOrder);

// Routes for parts
app.get('/parts', partsController.getParts);
app.post('/parts', partsController.createPart);
app.post('/parts/add', partsController.incrementQuantity);
app.post('/parts/sub', partsController.decrementQuantity);
app.put('/parts/:id', partsController.updatePart);
app.delete('/parts/:id', partsController.deletePart);

// Routes for complaints
app.get('/complaints', complaintsController.getComplaints);
app.get('/complaints/:clientId', complaintsController.getComplaints);
app.post('/complaints', complaintsController.createComplaint);
app.put('/complaints/:id', complaintsController.updateComplaint);
app.delete('/complaints/:id', complaintsController.deleteComplaint);

// Routes for invoices
app.get('/invoices/:orderId', invoiceController.generateInvoice);

app.listen(port, () => console.log(`Server running on port: ${port}`));
