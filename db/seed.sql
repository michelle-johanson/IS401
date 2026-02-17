-- Events
INSERT INTO events (id, name, client, venue, event_date, event_time, guests, status, budget, notes, image_url) VALUES
(1, 'Johnson Wedding Reception', 'Sarah & Mike Johnson', 'Grand Ballroom, Hilton Downtown', '2026-03-15', '18:00', 150, 'Confirmed', 12000, 'Bride is vegetarian...', 'https://images.unsplash.com/...'),
(2, 'TechCorp Annual Gala', 'TechCorp Inc.', 'Convention Center Hall A', '2026-03-22', '19:00', 300, 'Confirmed', 25000, 'CEO speech at 8 PM...', 'https://images.unsplash.com/...');

-- Menus
INSERT INTO menus (id, name, event_id) VALUES
(1, 'Elegant Wedding Menu', 1),
(2, 'Corporate Gala Menu', 2);

-- Categories
INSERT INTO menu_categories (id, menu_id, name) VALUES
(1, 1, 'Appetizers'),
(2, 1, 'Main Course'),
(3, 2, 'Appetizers');

-- Items
INSERT INTO menu_items (category_id, name, description, price, dietary_info) VALUES
(1, 'Caprese Skewers', 'Fresh mozzarella, cherry tomatoes, basil', 4.50, '{"vegetarian"}'),
(1, 'Shrimp Cocktail', 'Jumbo shrimp with cocktail sauce', 6.00, '{}'),
(2, 'Grilled Salmon', 'Atlantic salmon with lemon dill sauce', 18.00, '{"gluten-free"}');

-- Tasks
INSERT INTO tasks (label, description, assigned_to, completed, event_id) VALUES
('Confirm floral arrangements', 'Call vendor for Johnson Wedding flowers', 'Emily', true, 1),
('Finalize gala seating chart', 'VIP table assignments for TechCorp', 'Sarah', false, 2);

-- Fix sequences (important for SERIAL IDs to work after manual inserts)
SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));
SELECT setval('menus_id_seq', (SELECT MAX(id) FROM menus));
SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks));