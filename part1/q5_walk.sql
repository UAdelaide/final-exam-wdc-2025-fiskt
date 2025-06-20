INSERT INTO WalkRequests (dog_id, request_time, duration, location, status)
VALUES (
    (SELECT dog_id FROM Dogs WHERE name = "Max"),
    "2025-06-10 08:00:00",
    30,
    "Parklands",
    "open"
);

INSERT INTO WalkRequests (dog_id, request_time, duration, location, status)
VALUES (
    (SELECT dog_id FROM Dogs WHERE name = "Bella"),
    "2025-06-10 09:30:00",
    45,
    "Beachside Ave",
    "accepted"
);

INSERT INTO WalkRequests (dog_id, request_time, duration, location, status)
VALUES (
    (SELECT dog_id FROM Dogs WHERE name = "Min"),
    "2025-07-2 05:25:00",
    50,
    "Parklands",
    "accepted"
);

INSERT INTO WalkRequests (dog_id, request_time, duration, location, status)
VALUES (
    (SELECT dog_id FROM Dogs WHERE name = "James"),
    "2025-06-10 15:30:00",
    45,
    "Beachside Ave",
    "accepted"
);

INSERT INTO WalkRequests (dog_id, request_time, duration, location, status)
VALUES (
    (SELECT dog_id FROM Dogs WHERE name = "Bella"),
    "2025-06-10 09:30:00",
    45,
    "Beachside Ave",
    "accepted"
);
