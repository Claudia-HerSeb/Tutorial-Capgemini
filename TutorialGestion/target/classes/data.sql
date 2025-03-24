-- Authors
INSERT INTO Author(name, nationality) VALUES ('Alan R. Moon', 'US');
INSERT INTO Author(name, nationality) VALUES ('Vital Lacerda', 'PT');
INSERT INTO Author(name, nationality) VALUES ('Simone Luciani', 'IT');
INSERT INTO Author(name, nationality) VALUES ('Reiner Knizia', 'DE');
INSERT INTO Author(name, nationality) VALUES ('Uwe Rosenberg', 'DE');
INSERT INTO Author(name, nationality) VALUES ('Richard Garfield', 'US');

-- Clients
INSERT INTO Client(name) VALUES ('Juan Pérez');
INSERT INTO Client(name) VALUES ('María García');
INSERT INTO Client(name) VALUES ('Carlos Sánchez');
INSERT INTO Client(name) VALUES ('Ana López');
INSERT INTO Client(name) VALUES ('Luis Fernández');
INSERT INTO Client(name) VALUES ('Elena Martínez');

-- Categories
INSERT INTO Category(name) VALUES ('Eurogames');
INSERT INTO Category(name) VALUES ('Ameritrash');
INSERT INTO Category(name) VALUES ('Familiar');
INSERT INTO Category(name) VALUES ('Strategy');
INSERT INTO Category(name) VALUES ('Party');
INSERT INTO Category(name) VALUES ('Card Game');

-- Games
INSERT INTO Game(title, age, category_id, author_id) VALUES ('The Legend of Zelda', '10', 1, 1);
INSERT INTO Game(title, age, category_id, author_id) VALUES ('Super Mario Bros', '9', 2, 2);
INSERT INTO Game(title, age, category_id, author_id) VALUES ('Minecraft', '10', 3, 3);
INSERT INTO Game(title, age, category_id, author_id) VALUES ('Catan', '10', 4, 4);
INSERT INTO Game(title, age, category_id, author_id) VALUES ('Agricola', '12', 5, 5);
INSERT INTO Game(title, age, category_id, author_id) VALUES ('Magic: The Gathering', '13', 6, 6);

-- Loans
INSERT INTO Loans(client_name, game_title, start_date, end_date) VALUES ('Juan Pérez', 'The Legend of Zelda', '2025-03-01', '2025-03-10');
INSERT INTO Loans(client_name, game_title, start_date, end_date) VALUES ('María García', 'Super Mario Bros', '2025-03-05', '2025-03-15');
INSERT INTO Loans(client_name, game_title, start_date, end_date) VALUES ('Carlos Sánchez', 'Minecraft', '2025-03-10', '2025-03-20');
INSERT INTO Loans(client_name, game_title, start_date, end_date) VALUES ('Ana López', 'Catan', '2025-03-15', '2025-03-25');
INSERT INTO Loans(client_name, game_title, start_date, end_date) VALUES ('Luis Fernández', 'Agricola', '2025-03-20', '2025-03-30');
INSERT INTO Loans(client_name, game_title, start_date, end_date) VALUES ('Elena Martínez', 'Magic: The Gathering', '2025-03-25', '2025-04-05');
