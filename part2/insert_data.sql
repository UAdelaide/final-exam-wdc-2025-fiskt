INSERT INTO Users (username, email, password_hash, role) VALUES
("alice123", "alice@example.com", "hasehd123", "owner"),
("bobwalker", "bob@example.com", "hashed456", "walker"),
("carol123", "carol@example.com", "hashed789", "owner"),
("david123", "david@example.com", "hashed100", "owner"),
("walker1234", "walking@example.com", "iluvwalking", "walker");

INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = "alice123"), "Max", "medium"),
((SELECT user_id FROM Users WHERE username = "carol123"), "Bella", "small"),
((SELECT user_id FROM Users WHERE username = "carol123"), "Lucky", "large"),
((SELECT user_id FROM Users WHERE username = "david123"), "Mini", "large"),
((SELECT user_id FROM Users WHERE username = "david123"), "Daisy", "medium");

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT dog_id FROM Dogs WHERE name = "Max"), "2025-06-10 08:00:00", 30, "Parklands", "open"),
((SELECT dog_id FROM Dogs WHERE name = "Bella"), "2025-06-10 09:30:00", 45, "Beachside Ave", "accepted"),
((SELECT dog_id FROM Dogs WHERE name = "Mini"), "2025-07-02 05:25:00", 50, "Parklands", "open"),
((SELECT dog_id FROM Dogs WHERE name = "Lucky"), "2025-06-03 15:00:00", 35, "Beachside Ave", "completed"),
((SELECT dog_id FROM Dogs WHERE name = "Daisy"), "2025-06-16 03:55:00", 90, "Beachside Ave", "cancelled");
