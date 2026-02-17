DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS menu_categories;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    client VARCHAR(255),
    venue VARCHAR(255),
    event_date DATE,
    event_time TIME,
    guests INTEGER,
    status VARCHAR(50),
    budget NUMERIC(12, 2),
    notes TEXT,
    image_url TEXT
);

CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE menu_categories (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES menu_categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2),
    dietary_info TEXT[] -- Stores arrays like ['vegan', 'gluten-free']
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    description TEXT,
    assigned_to VARCHAR(100),
    completed BOOLEAN DEFAULT FALSE,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE
);