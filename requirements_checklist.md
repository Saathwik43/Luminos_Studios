# StudioGallery — Client Requirements Checklist

> **Client:** Black and White Stories (Photography Studio, Hyderabad)
> **Project:** Photography Portfolio Website + Staff Upload Backend
> **Deadline:** 30th June 2026

---

## 🏠 Home Page

- [X] Display studio name prominently
- [X] Hero image/banner section
- [X] Brief intro/about text for the studio
- [X] WhatsApp inquiry CTA — visible prominently on the home page

---

## 🖼️ Event Galleries

- [X] Separate gallery pages/sections for each category:
  - [X] Weddings
  - [X] Portraits
  - [X] Corporate Events
  - [X] Other categories (client-defined)
- [X] Masonry or grid layout for images
- [X] Image lightbox (full-screen image preview)
- [X] Lightbox navigation between photos (prev/next)
- [X] Lightbox works correctly on mobile devices

---

## 💬 WhatsApp Inquiry

- [X] "Inquire for this event type" button on **all** gallery pages
- [X] Button opens WhatsApp with a **pre-filled message** including the event category

---

## 📞 Contact Page

- [X] Contact form with the following fields:
  - [X] Name
  - [X] Phone
  - [X] Event type
  - [X] Event date
  - [X] Message
- [X] Form redirects/links to WhatsApp on submission
- [X] Mobile-responsive design for the contact page

---

## 🔐 Staff Image Upload Backend (Admin Panel)

- [X] Login-protected admin panel (no public access)
- [X] Upload interface: drag-and-drop **or** file picker
- [X] Select gallery category for each upload
- [X] Add optional caption to each uploaded image
- [X] Image compression on upload (maintain quality, reduce file size)
- [X] Delete images from a gallery
- [X] Create new gallery categories from the admin panel

---

## ⚙️ Non-Functional Requirements

### Performance

- [ ] Gallery pages use **lazy loading** — images load as user scrolls

### Security

- [X] Admin panel is login-protected — no public image uploads allowed

### Responsiveness

- [ ] Website works on mobile for **visitors** (public site)
- [ ] Admin panel works on mobile for **staff** uploading images

---

## 🧰 Recommended Tech Stack

| Layer          | Recommended                          |
| -------------- | ------------------------------------ |
| Frontend       | React.js or HTML/CSS/JavaScript      |
| Backend        | Node.js/Express or Python Flask      |
| Image Storage  | Cloudinary (free tier)               |
| Database       | MongoDB or SQLite (gallery metadata) |
| Authentication | JWT for admin login                  |

---

## 📦 Deliverables & Milestones

### Week 1 — Foundation

- [ ] Admin login system working
- [ ] Image upload to Cloudinary functional
- [ ] Basic gallery display
- [ ] ✅ **Acceptance:** Admin can upload an image and see it appear in the gallery

### Week 2 — Galleries

- [ ] All event gallery pages built
- [ ] Lightbox with navigation
- [ ] Categories & filtering implemented
- [ ] ✅ **Acceptance:** Lightbox navigation works on mobile

### Week 3 — Contact + Polish

- [ ] WhatsApp CTA integrated
- [ ] Contact form built and functional
- [ ] Mobile-responsive design polished
- [ ] ✅ **Acceptance:** WhatsApp opens with pre-filled message; contact form submits

### Week 4 — Deploy

- [ ] Full system live on a **public URL**
- [ ] Admin backend accessible on a public URL
- [ ] ✅ **Acceptance:** Staff can upload new images without developer help

---

## 📋 Pre-Development — Collect from Client

- [ ] Initial gallery images per category (to populate site at launch)
- [ ] Studio logo and brand colours
- [ ] Admin login credentials (email/password to set up)
- [ ] List of event categories for gallery sections

---

## 🚫 Out of Scope (Do NOT Build)

- ~~E-commerce or print sales~~
- ~~Client-facing portal with private gallery access~~
- ~~Video portfolio (images only)~~

---

## 📊 Evaluation Criteria

| Criteria                             |    Weight    |
| ------------------------------------ | :-----------: |
| Gallery with lightbox and categories | **30%** |
| Staff upload backend working         | **30%** |
| Mobile responsiveness (site + admin) | **20%** |
| WhatsApp CTA and contact form        | **10%** |
| Live deployment (public URLs)        | **10%** |
