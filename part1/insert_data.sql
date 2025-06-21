INSERT INTO Users (username, email, password_hash, role) VALUES
("alice123", "alice@example.com", "hasehd123", "owner"),
("bobwalker", "bob@example.com", "hashed456", "walker"),
("carol123", "carol@example.com", "hashed789", "owner"),
("david", "david@example.com", "hashed100", "walker"),
("walker1234", "walking@example.com", "iluvwalking", "walker")

INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = "alice123"), "Max", "medium"),
(SELECT user_id FROM Users WHERE username = "carol123"), "Bella", "small"),