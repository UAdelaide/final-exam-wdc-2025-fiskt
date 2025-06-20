INSERT INTO WalkRequests (dog_id, request_time, duration, location, status)
VALUES (
    (SELECT dog_id FROM Dogs WHERE name = "Max"),
    "2025-06-10 08:00:00",
    30,
    "Parklands",
    "open"
);