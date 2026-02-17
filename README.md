# Catering Management System

## Database Setup
We are using PostgreSQL for this project. Follow these steps to initialize your local database with the sample data.

### 1. Install Dependencies
Make sure you have PostgreSQL installed and running on your machine.

### 2. Environment Variables
Create a `.env` file in the root directory and add your local Postgres credentials (see `.env.example`).

### 3. Initialize Database
Run the following commands in your terminal from the project root:

```bash
# Create the database
psql postgres -c "CREATE DATABASE catering;"

# Run the schema to create tables
psql -d catering -f db/schema.sql

# Seed the database with sample data
psql -d catering -f db/seed.sql
```

### 4. Run Project in LocalHost
Run `npm run dev` and go to localhost 5173. Everything should work right.

---
## Available Data Tables
The database currently includes tables for:
* **events**: Core event details (Weddings, Galas, etc.)
* **menus**: Linked to specific events
* **menu_categories & menu_items**: Detailed food options and dietary info
* **tasks**: Todo items for staff (e.g., Emily, James, Sarah)

## Database Schema Overview

| Table | Purpose | Key Relations |
| :--- | :--- | :--- |
| **events** | Stores client info, venue, and budget | `id` is referenced by menus and tasks |
| **menus** | Container for event-specific food | Belongs to an `event_id` |
| **menu_items**| Individual dishes and prices | Belongs to a `category_id` |
| **tasks** | Management checklist items | Belongs to an `event_id` |
