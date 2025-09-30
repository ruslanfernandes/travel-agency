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
