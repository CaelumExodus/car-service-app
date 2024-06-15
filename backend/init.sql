-- Tworzenie tabeli Users
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Email VARCHAR(100),
    PhoneNumber VARCHAR(15),
    Role VARCHAR(20) NOT NULL
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

-- Dodawanie użytkowników
INSERT INTO Users (Username, Password, Email, PhoneNumber, Role) VALUES
('LClient', 'PClient', 'jan.kowalski@example.com', '123456789', 'client'),
('LService', 'PService', 'anna.nowak@example.com', '987654321', 'service'),
('LWarehouse', 'PWarehouse', 'piotr.wisniewski@example.com', '123123123', 'warehouse'),
('LAdmin', 'PAdmin', 'admin@example.com', '321321321', 'admin');

-- Dodawanie części
INSERT INTO Parts (PartName, PartCategory, QuantityInStock, UnitPrice, Supplier) VALUES
('Olej silnikowy', 'Płyny', 50, 100.00, 'Dostawca A'),
('Filtr powietrza', 'Filtry', 30, 50.00, 'Dostawca B'),
('Świeca zapłonowa', 'Świece', 100, 20.00, 'Dostawca C'),
('Klocki hamulcowe', 'Hamulce', 40, 150.00, 'Dostawca D'),
('Akumulator', 'Elektryka', 20, 300.00, 'Dostawca E');

-- Dodawanie zleceń serwisowych
INSERT INTO ServiceOrders (ClientID, Status, TotalCost) VALUES
(1, 'Nowe', 150.00),
(1, 'W trakcie', 300.00),
(1, 'Zakończone', 200.00);

-- Dodawanie faktur
INSERT INTO Invoices (OrderID, ClientID, Amount, DueDate, Status) VALUES
(1, 1, 150.00, '2024-06-30', 'Wystawiona'),
(2, 1, 300.00, '2024-07-15', 'Opłacona'),
(3, 1, 200.00, '2024-07-01', 'Anulowana');

-- Dodawanie reklamacji
INSERT INTO Complaints (OrderID, ClientID, Description, Status) VALUES
(1, 1, 'Problem z jakością usługi.', 'Rozwiązana'),
(2, 1, 'Niezadowalający czas realizacji.', 'W trakcie'),
(3, 1, 'Nieprawidłowa faktura.', 'Nowa');

-- Przypisywanie części do zleceń serwisowych
INSERT INTO ServiceOrderParts (OrderID, PartID, Quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 4),
(2, 4, 1),
(3, 5, 1);
