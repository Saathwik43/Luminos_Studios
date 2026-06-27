

**AURORA INSTITUTE OF TECHNOLOGY**

*Industry Internship Programme  |  Batch 2025-26*

**LuminosBook**

**Photography Studio Portfolio & Booking Website**

| Luminos Studio |
| :---: |

*Photographers & Creative Studios  |  Hyderabad*

| DOCUMENT TYPE Project Requirement | VERSION v1.0  \-  Final | DEADLINE 30th June 2026 | STATUS Active |
| :---- | :---- | :---- | :---- |

*Prepared by Aurora Internship Programme  |  Confidential \- For Assigned Team Only*

| 01 | PROJECT OVERVIEW |
| :---: | :---- |

| About This Document This document is the official project requirement specification for your internship engagement with Luminos Studio. It supersedes any earlier project titles or descriptions you may have received. Please read carefully. |
| :---- |

| Project Name | LuminosBook \- Photography Studio Portfolio & Booking Website |
| :---- | :---- |
| **Client Company** | Luminos Studio |
| **Industry** | Photographers & Creative Studios |
| **Project Type** | Website \+ Shopping Cart \+ Admin CMS |
| **Deadline** | 30th June 2026 |

| 02 | ASSIGNED TEAM |
| :---: | :---- |

| \# | Student Name | Branch | Roll No |
| :---: | :---- | :---- | :---- |
| 1 | **Chepuri Mokshagnya** | B.Tech AI & ML | 252U1R6048 |
| 2 | **Chelimi Kavitha** | B.Tech AI & ML | 252U1R6047 |
| 3 | **Veerupaka Harshavardhan Reddy** | B.Tech AI & ML | 252U1R6270 |

| 03 | CLIENT CONTEXT & BUSINESS PROBLEM |
| :---: | :---- |

**About Luminos Studio**

Luminos Studio is a photography studio offering services for weddings, birthdays, and corporate events. They need a full-featured website with portfolio, service booking, and admin content management.

**The Problem Being Solved**

Without a professional website, Luminos Studio:

* Cannot showcase work in a structured, filterable gallery

* Has no service catalog with pricing for clients to browse

* Cannot manage portfolio content without developer help after launch

**Build a portfolio and booking website with shopping cart and admin dashboard.**

| 04 | PROJECT SCOPE & FUNCTIONAL REQUIREMENTS |
| :---: | :---- |

**Home Page**

* Studio intro, featured work slider, service highlights

* CTA to explore portfolio or book

**Dynamic Portfolio Gallery**

* Category filtering: Weddings, Birthdays, Corporate Events, etc.

* Grid layout with lightbox viewer

* Smooth filter transitions

**Service Catalog**

* Each service: detailed description, pricing, customisation options, Add to Cart button

**Shopping Cart & Booking**

* Add/remove services, see running total

* Checkout form: name, email, event date, notes

* Email notification to studio on booking submission

* Customer receives confirmation message

**Admin Dashboard**

* Login-protected admin panel

* Upload portfolio images: category, caption, reorder, delete

* Add/edit/delete services with pricing and descriptions

* View customer booking inquiries

**Responsive Design**

* Fully responsive: mobile, tablet, desktop

| 05 | NON-FUNCTIONAL REQUIREMENTS |
| :---: | :---- |

| Requirement | Expectation |
| :---- | :---- |
| **Performance** | Gallery lazy loads images; initial page under 4 seconds |
| **Security** | Admin panel login-protected |
| **Email** | Booking confirmation delivered reliably to studio and customer |

| 06 | RECOMMENDED TECH STACK |
| :---: | :---- |

| Note: Recommendation only. Discuss any changes with your internal guide before starting. |
| :---- |

| Layer | Recommended |
| :---- | :---- |
| **Frontend** | React.js |
| **Backend** | Node.js with Express |
| **Database** | MongoDB |
| **Image Storage** | Cloudinary |
| **Authentication** | JWT |
| **Email** | Nodemailer |

| 07 | DELIVERABLES & MILESTONE SCHEDULE |
| :---: | :---- |

| Wk | Milestone | Deliverable | Acceptance Criteria |
| :---: | :---- | :---- | :---- |
| **1** | **Foundation** | Admin login, image upload, basic gallery display | Admin uploads image and it appears in gallery |
| **2** | **Gallery \+ Catalog** | Filtered gallery, service catalog, cart functionality | Cart adds/removes services correctly |
| **3** | **Booking \+ Admin Panel** | Checkout form with email; admin can manage content and view bookings | Booking email sent; admin dashboard shows inquiry |
| **4** | **Polish & Deploy** | Mobile responsive, UI polish, live deployment | Full system live on public URL |

| 08 | INFORMATION TO COLLECT FROM CLIENT |
| :---: | :---- |

Before beginning development, your team must collect the following from Luminos Studio via your internal guide or ASE:

* Portfolio photos per category

* Service packages with pricing

* Studio logo and brand colours

* Admin email for booking notifications

| 09 | OUT OF SCOPE |
| :---: | :---- |

| The following are explicitly OUT OF SCOPE. Do not spend time building these: Live payment processing Client portal for photo delivery Video portfolio |
| :---- |

| 10 | EVALUATION CRITERIA |
| :---: | :---- |

| Criteria | Weight | Notes |
| :---- | :---: | :---- |
| Gallery with filtering and lightbox | **25%** |  |
| Cart and booking with email notification | **25%** |  |
| Admin dashboard \- upload and manage content | **25%** |  |
| Mobile responsiveness | **15%** |  |
| Live deployment | **10%** |  |

*Aurora Institute of Technology \- Industry Internship Programme  |  Confidential \- For Assigned Team Only*