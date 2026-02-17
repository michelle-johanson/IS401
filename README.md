# Catering Management System

## 1. App Summary

The Catering Management System is a full-stack web application designed to help catering businesses plan, organize, and track everything involved in running events. The primary users are catering managers and their staff who need a centralized tool to coordinate events, menus, and task assignments. The application solves the problem of juggling scattered spreadsheets, notes, and communication by bringing event details, menu planning, and staff task lists into a single interface. Users can create and view events with client, venue, date, guest count, and budget information. Each event can be linked to a custom multi-course menu built with categories and individual items. A task management system lets managers assign to-do items to specific staff members and track completion status in real time. The dashboard provides at-a-glance KPIs including total revenue, event counts, and productivity metrics to support informed decision-making.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 (via Vite 7) |
| **Frontend Routing** | React Router DOM v7 |
| **Frontend Icons** | Lucide React |
| **Build Tool** | Vite |
| **Backend Framework** | Node.js + Express 4 |
| **Database** | PostgreSQL |
| **Database Client** | `pg` (node-postgres) |
| **Environment Config** | dotenv |
| **Dev Process Manager** | concurrently |
| **Authentication** | None (not implemented) |
| **External Services/APIs** | None |

---

## 3. Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                        USER                             │
│                (Browser @ localhost:5173)               │
└───────────────────────┬─────────────────────────────────┘
                        │  HTTP (React UI interactions)
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                             │
│           React 19 + React Router + Vite                │
│                                                         │
│  Pages: Home · Events · Event Detail · Create Event     │
│         Analytics · Menu · Menu Editor · Tasks          │
└───────────────────────┬─────────────────────────────────┘
                        │  REST API calls (fetch)
                        │  e.g. GET/POST /api/events
                        │       GET/POST /api/tasks
                        │       PATCH   /api/tasks/:id
                        │       GET/POST/PUT /api/menus
                        │       GET     /api/kpis
                        ▼
┌─────────────────────────────────────────────────────────┐
│                     BACKEND                             │
│               Node.js + Express                         │
│                (localhost:3001)                         │
│                                                         │
│  Routes: /api/events  /api/menus  /api/tasks  /api/kpis │
└───────────────────────┬─────────────────────────────────┘
                        │  SQL queries via node-postgres (pg)
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    DATABASE                             │
│              PostgreSQL (localhost:5432)                │
│                                                         │
│  Tables: events · menus · menu_categories               │
│          menu_items · tasks                             │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Prerequisites

The following software must be installed and available before running this project locally.

### Node.js (v20.19.0 or v22.12.0+)
Required to run the Vite dev server and the Express backend.
- Install: https://nodejs.org/en/download
- Verify:
  ```bash
  node --version
  npm --version
  ```

### PostgreSQL (v14+)
Required as the relational database.
- Install: https://www.postgresql.org/download/
- Verify:
  ```bash
  psql --version
  ```
  > `psql` must be available in your system PATH. On macOS, consider using [Postgres.app](https://postgresapp.com/) and following its CLI setup guide.

---

## 5. Installation and Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the example env file and fill in your local PostgreSQL credentials:
```bash
cp .env.example .env
```

Open `.env` and update the values:
```env
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=catering
```

### 4. Create the database
```bash
psql -U postgres -d postgres -c "CREATE DATABASE catering;"
```

### 5. Run the schema (creates all tables)
```bash
psql -U postgres -d catering -f db/schema.sql
```

### 6. Seed the database (loads sample data)
```bash
psql -U postgres -d catering -f db/seed.sql
```

---

## 6. Running the Application

Start both the backend API server and the Vite frontend dev server with a single command:

```bash
npm run dev
```

This uses `concurrently` to run:
- **Backend** — Express API server at `http://localhost:3001`
- **Frontend** — Vite dev server at `http://localhost:5173`

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 7. Verifying the Vertical Slice

This walkthrough demonstrates the full data flow: user action → API → database update → persistent state.

### Feature: Toggle a Task as Complete

**Step 1 — Open the Tasks page**
In the app, click **Tasks** in the sidebar. You should see a list of pending and completed tasks loaded from the database.

**Step 2 — Toggle a task**
Click the checkbox next to any pending task (e.g., *"Finalize gala seating chart"*). The task should visually move to the **Completed** section immediately.

**Step 3 — Confirm the database was updated**
Open a terminal and run the following query against your local database:
```bash
psql -d catering -c "SELECT label, completed FROM tasks;"
```
The task you checked should now show `completed = t`.

**Step 4 — Verify persistence after refresh**
Refresh the page (`Cmd+R` / `Ctrl+R`) in your browser. The task should still appear in the **Completed** section, confirming the change was persisted to PostgreSQL and is not just local UI state.