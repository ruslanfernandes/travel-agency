# Travel Agency Admin Dashboard

> A full-featured, production-ready admin dashboard built with React, TypeScript, Tailwind, and Appwrite.  
> Role-based access, real user tracking, CRUD operations, pagination — everything an admin panel should have.

---

## 🚀 Demo & Walkthrough

Since the admin panel requires credentials, I’ve included screenshots in the repo and a video walkthrough so you can see all features without logging in.

**Watch the walkthrough:** _[Insert your YouTube / Loom link here]_

---

## 🧰 Tech Stack & Architecture

| Layer               | Technology                       | Purpose                                     |
| ------------------- | -------------------------------- | ------------------------------------------- |
| Frontend            | React + TypeScript               | UI + typed safety                           |
| Routing / State     | React Router v7                  | File-based routing & navigation control     |
| Styling             | Tailwind CSS                     | Utility-first responsive design             |
| Backend / Auth / DB | Appwrite (self-hosted / cloud)   | Authentication, real-time database, storage |
| Data logic          | Pagination, filtering, CRUD APIs | Scalable data operations                    |
| Other               | Vite                             | Fast dev server & bundling                  |

---

## 📦 Key Features

- **Role-based Authentication** — Admins only, secure token-based access
- **Dashboard Analytics** — Visual summary of Trip & User metrics
- **CRUD Operations** — Create, read, update, delete for Users & Trips
- **Real Data Tracking** — Live user/trip data via Appwrite
- **Pagination & Filtering** — Efficient data pages for large sets
- **Responsive UI** — Works across desktop / tablet / mobile
- **Debugging & Performance** — Lazy loading, memoization, optimized fetches

---

## 📁 Repository Structure (suggested view)

/src
/components ─ reusable UI pieces (TripCard, InfoPill, etc.)
/routes ─ route components (Trips, TripDetail, CreateTrip, etc.)
/lib ─ utilities, types, helpers (parseTripData, etc.)
/appwrite ─ Appwrite client setup, APIs (getAllTrips, getTripById, etc.)
/styles ─ Tailwind configs, global styles
/assets ─ icons, images
public/
index.html
README.md

yaml
Copy code

---

## 🛠️ Setup & Running Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/ruslanfernandes/travel-agency.git
   cd travel-agency
   Install dependencies
   ```

bash
Copy code
npm install
Configure Appwrite backend

Create a project on Appwrite

Setup collections (Users, Trips, etc.)

Get endpoints, API keys

Add config file (e.g. .env.local) with Appwrite endpoint & keys

Run in dev mode

bash
Copy code
npm run dev
Build for production

bash
Copy code
npm run build
npm run preview
✅ Usage Notes & Tips
Sanitize data at loader level — components expect arrays and valid objects

Optional chaining & defaults — important to prevent runtime crashes

Paginated endpoints — always fetch slices, not full lists

Error handling — redirect or show fallback UI for unauthorized access

Future enhancements — add charts, export CSVs, real-time updates via subscriptions

💡 What I Learned
How to integrate Appwrite for backend services in a full-stack app

Building pagination and data fetching patterns with React Router loaders

Safely handling undefined / missing data across components

Structuring a scalable admin UI with reusability in mind

Optimizing debugging, routing and state transitions

📬 Let’s Connect
If you like this project or want to collaborate, hit me up.
I’m open to Front-End / Full-Stack Developer roles, feedback, or new opportunities.

Made with ❤️ by Ruslan Fernandes

pgsql
Copy code

If you like, I can also prepare a **README badge section** (build status, license, technologies) or auto-g
