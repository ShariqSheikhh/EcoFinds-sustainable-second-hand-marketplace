# EcoFinds: A Sustainable Second-Hand Marketplace ♻️

*A full-stack application built for the Odoo x NMIT Hackathon 2025.*

## Inspiration

Inspired by the surging popularity of thrifting and sustainable shopping in cities like Bengaluru, EcoFinds is a modern, secure, and user-friendly platform designed to facilitate the buying and selling of pre-owned goods. Our goal is to reduce waste and promote a circular economy by making it easy for items to find a second life.

## Core Features

* **Secure User Authentication:** Full registration and login system using JWTs and `bcrypt` for password hashing.
* **Dynamic Item Listings:** Users can create, and view second-hand items in real-time.
* **Sustainability Score:** Our unique "wow" factor! Every item displays an estimated amount of CO2 saved by purchasing it second-hand, directly promoting the app's eco-friendly mission.

## Tech Stack

| Category      | Technology                               |
| ------------- | ---------------------------------------- |
| **Frontend** | React.js                                 |
| **Backend** | Node.js, Express.js                      |
| **Database** | SQLite 3 (Local Database)                |
| **Security** | JWT (jsonwebtoken), Password Hashing (bcryptjs), Helmet |
| **Styling** | CSS Modules & Inline Styles              |

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/) installed
* [Git](https://git-scm.com/) installed

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ShariqSheikhh/EcoFinds-sustainable-second-hand-marketplace.git](https://github.com/ShariqSheikhh/EcoFinds-sustainable-second-hand-marketplace.git)
    cd EcoFinds-sustainable-second-hand-marketplace
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    npm run seed  # This populates the database with initial items
    npm start     # Starts the server on http://localhost:3001
    ```

3.  **Setup the Frontend (in a new terminal):**
    ```bash
    cd frontend
    npm install
    npm start     # Starts the React app on http://localhost:3000
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Features Checklist

* [✅] User Registration with secure password hashing.
* [✅] User Login with JSON Web Token (JWT) authentication.
* [✅] A fully-featured MVC architecture on the backend for scalability.
* [✅] Automated database migrations and seeding scripts.
* [✅] View a list of all available second-hand items with images.
* [✅] Create a new item listing with a title, price, description, and image URL.
* [✅] See an estimated CO2 savings for each item.
* [✅] Clean, centered, and responsive card-based UI.
* [✅] Proper use of version control with a `.gitignore` file.

## Team

* Shariq Sheikh
