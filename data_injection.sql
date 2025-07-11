INSERT INTO digital_library.lending_records (
    id, book_id, borrower, borrow_date, return_date,
    created_at, created_by, updated_at, updated_by,
    deleted_at, deleted_by
) VALUES
-- 1: Returned book
('a1f761b1-b28f-4fd2-b726-4f1c8791b100', 'b1d79df4-28c6-4d6c-9b1a-0faae67c1111', 'alice@example.com',
 '2025-06-10 10:00:00', '2025-06-20 14:30:00',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 2: Still borrowed
('b2d462f2-11e2-4e79-a2ff-07db1fcad101', 'e1c6b9c9-3821-4f42-8aa5-2d3132d01a12', 'bob@example.com',
 '2025-07-01 09:00:00', NULL,
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 3: Returned book
('c3e3e34d-3494-4b93-a2d3-52fd305c3b10', 'cb2c81d4-133f-4524-aab2-14b8db61be12', 'charlie@example.com',
 '2025-05-15 15:45:00', '2025-05-22 10:00:00',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 4: Still borrowed
('d4f4c25e-33aa-4d5f-a8b0-08aaac6cc4a3', '8cf77f8d-d947-4c90-9c33-5d2892b12f11', 'dana@example.com',
 '2025-06-30 16:00:00', NULL,
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 5: Returned book
('e5a6f75d-2299-4d3d-b26e-0289c41ff991', '0fa2f6dc-3b0e-4d51-aedd-5d9c5314be23', 'erin@example.com',
 '2025-06-01 11:30:00', '2025-06-10 09:00:00',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 6: Still borrowed
('f6c1b7a8-8893-43f6-a52c-1119998cb612', '69af5bd4-e167-40f4-93a1-62088cf775ae', 'frank@example.com',
 '2025-07-05 13:45:00', NULL,
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 7: Returned book
('a7e7a839-94e7-4f20-8e4c-b5d9ac388b13', 'fe1a1570-2084-45d1-9463-f11ad4022b67', 'grace@example.com',
 '2025-04-10 08:00:00', '2025-04-18 14:00:00',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 8: Still borrowed
('b8f8420b-0075-4937-98fb-f42f9b8b72e1', '0cd685de-1841-4ae3-9d8c-97b4427e6b89', 'henry@example.com',
 '2025-07-07 10:15:00', NULL,
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 9: Returned book
('c9a6c3ab-1e91-41ef-9989-4df88e68fd92', '25ebdd57-1b68-46c1-96e2-b5b9d41c938f', 'isla@example.com',
 '2025-05-02 14:20:00', '2025-05-09 11:30:00',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 10: Still borrowed
('d0c8d1c4-2a9a-4a93-b879-350f00322e10', 'ea2ad676-c678-4b3f-a432-c3be947f5d34', 'julia@example.com',
 '2025-07-08 12:00:00', NULL,
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL);


INSERT INTO digital_library.books (
    id, title, author, isbn, quantity, category,
    created_at, created_by, updated_at, updated_by,
    deleted_at, deleted_by
) VALUES
-- 1
('b1d79df4-28c6-4d6c-9b1a-0faae67c1111', 'The Pragmatic Programmer', 'Andrew Hunt', '978-0201616224', 5, 'Programming',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 2
('e1c6b9c9-3821-4f42-8aa5-2d3132d01a12', 'Clean Code', 'Robert C. Martin', '978-0132350884', 3, 'Software Engineering',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 3
('cb2c81d4-133f-4524-aab2-14b8db61be12', 'Design Patterns', 'Erich Gamma', '978-0201633610', 2, 'Software Design',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 4
('8cf77f8d-d947-4c90-9c33-5d2892b12f11', 'Refactoring', 'Martin Fowler', '978-0201485677', 4, 'Software Engineering',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 5
('0fa2f6dc-3b0e-4d51-aedd-5d9c5314be23', 'You Don’t Know JS', 'Kyle Simpson', '978-1491904244', 6, 'JavaScript',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 6
('69af5bd4-e167-40f4-93a1-62088cf775ae', 'Cracking the Coding Interview', 'Gayle Laakmann McDowell', '978-0984782857', 10, 'Career',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 7
('fe1a1570-2084-45d1-9463-f11ad4022b67', 'Introduction to Algorithms', 'Thomas H. Cormen', '978-0262033848', 2, 'Algorithms',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 8
('0cd685de-1841-4ae3-9d8c-97b4427e6b89', 'The Mythical Man-Month', 'Frederick P. Brooks Jr.', '978-0201835953', 3, 'Project Management',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 9
('25ebdd57-1b68-46c1-96e2-b5b9d41c938f', 'Effective Java', 'Joshua Bloch', '978-0134685991', 7, 'Java',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL),

-- 10
('ea2ad676-c678-4b3f-a432-c3be947f5d34', 'Head First Design Patterns', 'Eric Freeman', '978-0596007126', 5, 'Software Design',
 NOW(), '11111111-1111-1111-1111-111111111111', NOW(), '11111111-1111-1111-1111-111111111111', NULL, NULL);
