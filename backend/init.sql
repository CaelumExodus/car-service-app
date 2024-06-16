-- Tworzenie tabeli Users
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    PhoneNumber VARCHAR(15),
    Role VARCHAR(20) NOT NULL
);

-- Tworzenie tabeli Service
CREATE TABLE Services (
  serviceid SERIAL PRIMARY KEY,
  serviceName VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL
);

-- Tworzenie tabeli ServiceOrders
CREATE TABLE ServiceOrders (
    OrderID SERIAL PRIMARY KEY,
    ClientID INT REFERENCES Users(UserID),
    Status VARCHAR(20) NOT NULL,
    TotalCost DECIMAL(10, 2),
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CompletedDate TIMESTAMP
);

-- Tworzenie tabeli ServiceOrderDetails
CREATE TABLE ServiceOrderDetails (
    OrderDetailID SERIAL PRIMARY KEY,
    OrderID INT REFERENCES ServiceOrders(OrderID) ON DELETE CASCADE,
    ServiceID INT REFERENCES Services(serviceid) ON DELETE CASCADE
);

-- Tworzenie tabeli Parts
CREATE TABLE Parts (
    PartID SERIAL PRIMARY KEY,
    PartName VARCHAR(100) NOT NULL,
    PartCategory VARCHAR(50),
    QuantityInStock INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    Supplier VARCHAR(100)
);

-- Tworzenie tabeli Invoices
CREATE TABLE Invoices (
    InvoiceID SERIAL PRIMARY KEY,
    OrderID INT REFERENCES ServiceOrders(OrderID),
    ClientID INT REFERENCES Users(UserID),
    Amount DECIMAL(10, 2) NOT NULL,
    IssueDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    DueDate TIMESTAMP,
    Status VARCHAR(20) NOT NULL
);

-- Tworzenie tabeli Complaints
CREATE TABLE Complaints (
    ComplaintID SERIAL PRIMARY KEY,
    OrderID INT REFERENCES ServiceOrders(OrderID),
    ClientID INT REFERENCES Users(UserID),
    Description TEXT NOT NULL,
    Status VARCHAR(20) NOT NULL,
    CreatedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ResolvedDate TIMESTAMP
);

-- Dodawanie zleceń do części (relacja wiele-do-wielu)
CREATE TABLE ServiceOrderParts (
    OrderID INT REFERENCES ServiceOrders(OrderID),
    PartID INT REFERENCES Parts(PartID),
    Quantity INT NOT NULL,
    PRIMARY KEY (OrderID, PartID)
);

INSERT INTO Users (Username, Password, Email, PhoneNumber, Role)
VALUES
    ('admin', 'admin', 'admin@email.com', '+1234567890', 'admin'),
    ('client', 'client', 'client@email.com', '+1987654321', 'client'),
    ('warehouse', 'warehouse', 'warehouse@email.com', NULL, 'warehouse'),
    ('service', 'service', 'service@email.com', NULL, 'service');

INSERT INTO Services (serviceName, description, price)
VALUES
    ('Basic Cleaning', 'General cleaning service', 50.00),
    ('Deep Cleaning', 'Thorough cleaning including hard-to-reach areas', 100.00),
    ('Repair Services', 'Repairing various household items', 80.00);

INSERT INTO ServiceOrders (ClientID, Status, TotalCost, CreatedDate, CompletedDate)
VALUES
    (1, 'Pending', NULL, '2024-06-15 10:00:00', NULL),
    (2, 'Completed', 150.00, '2024-06-14 15:30:00', '2024-06-14 17:45:00');

INSERT INTO ServiceOrderDetails (OrderID, ServiceID)
VALUES
    (1, 1),
    (1, 3),
    (2, 2);

INSERT INTO Parts (PartName, PartCategory, QuantityInStock, UnitPrice, Supplier)
VALUES
    ('Screwdriver', 'Tools', 50, 5.00, 'Tool Suppliers Inc.'),
    ('Cleaning Solution', 'Cleaning Supplies', 100, 8.00, 'Cleaning Solutions LLC');

INSERT INTO Invoices (OrderID, ClientID, Amount, IssueDate, DueDate, Status)
VALUES
    (1, 1, 50.00, '2024-06-15', '2024-06-30', 'Pending'),
    (2, 2, 150.00, '2024-06-14', '2024-06-29', 'Paid');

INSERT INTO Complaints (OrderID, ClientID, Description, Status, CreatedDate, ResolvedDate)
VALUES
    (1, 1, 'Service not completed as expected.', 'Open', '2024-06-15 11:30:00', NULL),
    (2, 2, 'Part of the service was not satisfactory.', 'Resolved', '2024-06-14 18:00:00', '2024-06-15 09:00:00');
