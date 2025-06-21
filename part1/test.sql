-- USERS
INSERT INTO Users (username, email, password_hash, role) VALUES
('walker1', 'walker1@example.com', 'hash1', 'walker'),
('walker2', 'walker2@example.com', 'hash2', 'walker'),
('owner1', 'owner1@example.com', 'hash3', 'owner');

-- DOGS (owned by owner1, user_id = 3)
INSERT INTO Dogs (owner_id, name, size) VALUES
(3, 'Rex', 'large'),
(3, 'Luna', 'medium');

-- WALK REQUESTS (for owner1's dogs)
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
(1, '2024-06-01 10:00:00', 30, 'Central Park', 'completed'),
(2, '2024-06-02 11:00:00', 45, 'Riverside Park', 'completed');

-- WALK RATINGS (walker1 and walker2 rated by owner1)
INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments) VALUES
(1, 1, 3, 5, 'Great walk!'),
(2, 2, 3, 4, 'Good, but a bit late.');
