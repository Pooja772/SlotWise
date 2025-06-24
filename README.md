# SlotWise

A full-stack Slot Booking System built using **Next.js 15** for the frontend and **Node.js with Express & MongoDB** for the backend. It allows users to view available time slots, book appointments, and view booking history with a responsive UI and API-driven architecture.

---

## Tech Stack

| Area       | Stack                                |
| ---------- | ------------------------------------ |
| Frontend   | Next.js, React, MUI, RTK, TypeScript |
| Backend    | Node.js, Express, MongoDB, Mongoose  |
| State Mgmt | Redux Toolkit & RTK Query            |
| Styling    | Material UI + Custom SCSS            |
| Auth       | Session/token-based (future: JWT)    |

---

## Live Demo

* **Frontend (Render Host URL)**: [SlotWise-FE Url](https://slotwise-fe-qt4d.onrender.com/)

## Login Credentials

### User Login

* **Email**: `neha@yopmail.com`
* **Password**: `Neha@1234`

### Admin Login

* **Email**: `admin@yopmail.com`
* **Password**: `Admin@1234`

## Project Features

### Frontend 

* Built with **Next.js 15**, **TypeScript**, and **Material UI (MUI)**
* **USER PORTAL**
* *Login/logout* flow
* *Slot listing* with real-time availability
* *Booking form* with validation and confirmation modal
* **ADMIN PORTAL**
* *Login/logout* flow
* *Booking listing page* with data grid
* *Responsive design*

### Backend

* Built with **Node.js**, **Express**, and **MongoDB**
* RESTful APIs for:

  * User authentication
  * JWT authentication
  * Slot creation, listing
  * Booking creation and fetching
* Uses **Mongoose** for database modeling
* Proper error handling and validation

---

## CRON Jobs Setup

This project includes two scheduled cron jobs to manage slot generation automatically:

### 1 **Initial Cron Job – Slot Seeder**

* **Purpose:** Seeds initial slot data for **7 upcoming days**, excluding **Saturdays** and **Sundays**.
* **Slot Time Range:** From **9:00 AM to 4:00 PM**, each day.
* **Run:** Executed automatically during the initial setup.

### 2 **Recurring Cron Job – Daily Slot Updater**

* **Purpose:** Automatically generates **next day’s slots** every night.
* **Time:** Runs at **12:01 AM IST** daily.
* **Excludes:** Saturdays and Sundays.
* **Slot Window:** Same as above (9:00 AM to 4:00 PM).

>  These cron jobs ensure the slot schedule remains up-to-date without manual intervention.

---

## Getting Started

### Prerequisites

* Node.js >= 16.x
* MongoDB (local or cloud)

### Environment Variables

#### Frontend (.env.local)

```
NEXT_PUBLIC_STAGING_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_SECRET_KEY=1c7dbcb3b2e28ed325ad81b989e53133e34624f6e799b410d3d1a3bcd56bb2d9
NEXT_PUBLIC_IV=93f45f1cf6a2b5d063efc4ab7f3c0d91
```

#### Backend (.env)

```
MONGO_URI=mongodb://localhost:27017/booking_system
SECRET_KEY=1c7dbcb3b2e28ed325ad81b989e53133e34624f6e799b410d3d1a3bcd56bb2d9
IV=93f45f1cf6a2b5d063efc4ab7f3c0d91
JWT_SECRET=af1c8e3b76d84e0b9a4d6b6c6d1fdf77f48b26b64e3fcd2170d21be96d27e5a8
SERVERPORT=5000
```

---

## ⚙️ Setup Instructions

### Backend Setup

```bash
cd SlotWise_BE
npm install
npm run dev
```

Runs on: `http://localhost:5000`

### Frontend Setup

```bash
cd slotwise_fe
npm install
npm run build
npm run dev
```

Runs on: `http://localhost:3000`

---

## API Overview

### Auth

* `POST /api/v1/login`

### Users

* `POST /api/v1/user` - Create User with roleId
* `GET /api/v1/users` - List all users
* `GET /api/v1/user/:id` - List particular user
* `PUT /api/v1/user/:id` - Update particular user
* `DELETE /api/v1/user/:id` - Delete particular user

### Roles

* Seeder is written for two personas - **User and Admin**

### Slots

* `GET /api/v1/slots` - List all slots

### Bookings

* `GET /api/bookings` - List all bookings
* `POST /api/booking` - Create a new booking and also update the availability of slot

---

## Usage Flow

1. User logs in
2. User views available slots
3. User selects a slot and fills the booking form
4. On submission, confirmation modal shows details
5. User can see all there booked and available slots
6. User can view the total count of slots, booked slots & available slots.

---

## Future Improvements

* Role-based auth (admin, user)
* Email notifications
* Admin dashboard to manage slots/bookings

---

## Contributors

* [Pooja Srivastava](https://github.com/Pooja772/SlotWise)

---
