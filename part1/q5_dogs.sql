INSERT INTO Dogs (owner_id, name, size)
VALUES (
    SELECT user_id FROM Users WHERE username = "alice123",
    "Max",
    "medium"
);

INSERT INTO Dogs (owner_id, name, size)
VALUES (
    SELECT user_id FROM Users WHERE username = "carol123",
    "Bella",
    "small"
);

INSERT INTO Dogs (owner_id, name, size)
VALUES (
    SELECT user_id FROM Users WHERE username = "alice123",
    "Max",
    "medium"
);

