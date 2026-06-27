# LuminosBook Requirements Checklist

This file tracks the requirements specified in the client PRD for LuminosBook (Luminos Studio).

---

## 🎨 Branding & Styling

- [X] Rebrand from "Black & White Stories" to **LuminosBook**
- [X] Implement premium dark theme using HSL tailored colors (deep obsidian, warm gold/amber gradient accents)
- [X] Integrate modern typography (**Outfit** font for body/controls, **Playfair Display** for headings)
- [X] Implement smooth micro-animations, glassmorphism panels, and hover glow effects

---

## 🏠 Public Site Features

### Home Page

- [X] Welcome introduction text for Luminos Studio
- [X] Dynamic **Featured Work Slider** with smooth cross-fade animations
- [X] **Service Highlights** grid highlighting key photography packages
- [X] Strong Call-to-Action (CTA) elements to explore services/galleries and book now

### Dynamic Portfolio Gallery

- [X] Category filtering (e.g. Weddings, Birthdays, Corporate Events, etc.)
- [X] Masonry/grid layout with lazy-loaded images (initial load < 4 seconds)
- [X] Premium lightbox viewer with image info, slide transitions, and index counter
- [X] Dynamic sorting based on admin-defined sequence

### Service Catalog

- [ ] Dedicated page listing service packages
- [ ] Package cards detailing pricing, duration, customization options, and deliverables
- [ ] Interactive "Add to Cart" button on each package card

---

## 🛒 Shopping Cart & Booking System

### Cart Drawer / Page

- [ ] View selected services and running total
- [ ] Add/remove services from the cart dynamically
- [ ] Floating cart indicator/badge on header showing item count

### Checkout & Bookings

- [ ] Checkout form collecting:
  - Full Name
  - Email Address
  - Event Date
  - Custom Event Notes
- [ ] Backend database storage for booking requests
- [X] **Email Notifications** (via Nodemailer):
  - Send booking notification to studio admin upon creation (from `saathwikmailapalli@gmail.com`)
  - Send booking confirmation email to customer ONLY when admin approves (status Confirms) the booking
  - Send booking cancellation email to customer if the booking status is changed to Cancelled
  - Fail-safe fallback that succeeds if SMTP configuration is absent

---

## 🔐 Admin Dashboard (Staff Portal)

- [X] Secure login-protected access using JWT
- [X] **Manage Services Tab**: Add, edit, delete service catalog listings
- [X] **Customer Bookings Tab**: View and manage booking inquiries (customer details, event date, services, total amount, status dropdown)
- [X] **Manage Galleries Tab**:
  - Upload images (drag-and-drop or select) with auto-compression
  - Delete portfolio images
  - **Reorder Portfolio Images** via Up/Down controls with instant saving
  - **Change Image Category**: Dynamic dropdown selector to assign to existing category or create a new category dynamically inline
- [X] **Manage Categories Tab**: Add/remove gallery categories dynamically

---

## ⚡ Technical Requirements

- [ ] Dynamic base API URL config (switchable between local backend and production URL)
- [ ] Responsive design optimized for mobile, tablet, and desktop viewports
- [ ] High visual aesthetics: avoid basic layouts and generic styling
