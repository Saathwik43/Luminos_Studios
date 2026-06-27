# Luminos Studio — LuminosBook

A premium photography studio portfolio, booking engine, and staff upload CMS created for **Luminos Studio** (Hyderabad). It features public-facing event galleries, a custom featured slideshow, service catalogs, booking carts, automated email notifications (via Nodemailer), and a secure staff dashboard for managing catalog packages, modifying booking statuses, and reordering gallery photos with instant save.

🔗 **Live Website:  [luminos-studios-public.onrender.com](https://luminos-studios-public.onrender.com/favicon.svg)**

## 🛠️ Technology Stack

| Layer              | Technology                                                             |
| :----------------- | :--------------------------------------------------------------------- |
| **Frontend** | React (Vite), TailwindCSS, React Router, Lucide Icons, CartContext API |
| **Backend**  | Node.js, Express, Mongoose (MongoDB)                                   |
| **Storage**  | Cloudinary (for compressed image hosting)                              |
| **Auth**     | JSON Web Tokens (JWT) & BcryptJS                                       |
| **Mail**     | Nodemailer (SMTP with secure STARTTLS)                                 |

---

## 🚀 Getting Started & Running the Project

You can run both the frontend and backend concurrently from the root directory using a single command.

### 1. Prerequisites

Ensure you have **Node.js** (v16+) and **npm** installed on your system.

### 2. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# SMTP credentials for booking notifications (e.g. Gmail App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_mail
SMTP_PASS=your_gmail_app_password
SMTP_SECURE=false

# Default Admin credentials
ADMIN_EMAIL=your_mail
ADMIN_PASSWORD=admin_password
```

### 3. Installation

Install dependencies for both the frontend and backend at once from the root directory:

```bash
npm run install:all
```

### 4. Database Seeding

To seed standard photography packages, categories, and create the default admin user:

```bash
cd backend
node seedData.js
```

### 5. Running the Application

To run the frontend and backend servers concurrently:

```bash
npm run dev
```

This command will automatically:

* Start the **Backend Server** (runs on `http://localhost:5000` or the configured `PORT`)
* Start the **Frontend Dev Server** (runs on `http://localhost:5173`)

#### Individual Scripts

If you want to run them separately from the root directory:

* Run only the Backend: `npm run backend`
* Run only the Frontend: `npm run frontend`

---

## 📁 Directory Structure

```text
├── backend/               # Node/Express API, database models, and routes
├── frontend/              # React/Vite/Tailwind frontend client
├── package.json           # Root package file orchestrating scripts
├── requirements_checklist.md # Client requirements checklist
└── README.md              # Project documentation
```

---

## 🖼️ Features & Checklist Status

### 🏠 Public Site

- [X] **Rebranded Theme:** Luxurious deep obsidian, warm gold/amber gradient accents, glassmorphic panels, and Outfit + Playfair Display typography.
- [X] **Featured Work Slider:** Auto-playing, cross-fade slide transitions presenting highlights on the Hero banner.
- [X] **Portfolio Gallery:** Interactive masonry/grid layout filtering categories (Weddings, Portraits, Corporate, Birthdays) with lazy-loaded images and responsive lightbox counter.
- [X] **Service Highlights & Catalog:** Card list detailing package prices, description scopes, features checklist, and "Add to Cart" triggers.
- [X] **Shopping Cart & Checkout:** Cart view showing selections, running total, and a validation checkout form (Name, Email, Event Date, Notes) submitting to MongoDB.

### 🔐 Admin Panel (Staff CMS Portal)

- [X] **Secure Login:** Protected dashboard using JWT auth.
- [X] **Customer Bookings:** View incoming booking requests, examine details, and update booking status (Pending, Confirmed, Completed, Cancelled).
- [X] **Email Status Automations:** On booking creation, sends admin alert. Once changed to Confirmed or Cancelled, it automatically dispatches confirmation/cancellation receipts to the customer.
- [X] **Manage Galleries:**
  - Upload interface (drag-and-drop or select) with automated compression.
  - Delete portfolio images.
  - **Dynamic Reordering:** Adjust portfolio sequence by clicking Up/Down buttons which automatically persist coordinates to the database.
  - **Change Image Category:** Dropdown menu to assign images to active categories or dynamically add a new category inline.
- [X] **Manage Services:** Add, edit, or delete service package listings.
- [X] **Category Management:** Dynamically add/remove new event categories.
