

**AURORA INSTITUTE OF TECHNOLOGY**

*Industry Internship Programme  |  Batch 2025-26*

**StudioGallery**

**Photography Portfolio Website with Staff Upload Backend**

| Black and White Stories |
| :---: |

*Photographers & Creative Studios  |  Hyderabad*

| DOCUMENT TYPE Project Requirement | VERSION v1.0  \-  Final | DEADLINE 30th June 2026 | STATUS Active |
| :---- | :---- | :---- | :---- |

*Prepared by Aurora Internship Programme  |  Confidential \- For Assigned Team Only*

| 01 | PROJECT OVERVIEW |
| :---: | :---- |

| About This Document This document is the official project requirement specification for your internship engagement with Black and White Stories. It supersedes any earlier project titles or descriptions you may have received. Please read carefully. |
| :---- |

| Project Name | StudioGallery \- Photography Portfolio Website with Staff Upload Backend |
| :---- | :---- |
| **Client Company** | Black and White Stories |
| **Industry** | Photographers & Creative Studios |
| **Project Type** | Website \+ Backend |
| **Deadline** | 30th June 2026 |

| 02 | ASSIGNED TEAM |
| :---: | :---- |

| \# | Student Name | Branch | Roll No |
| :---: | :---- | :---- | :---- |
| 1 | **Jella Durga Prasad** | B.Tech AI & ML | 252U1R6101 |
| 2 | **K Umesh** | B.Tech AI & ML | 252U1R6105 |
| 3 | **Vijayagiri Abhiram** | B.Tech AI & ML | 252U1R6276 |

| 03 | CLIENT CONTEXT & BUSINESS PROBLEM |
| :---: | :---- |

**About Black and White Stories**

Black and White Stories is a photography studio specialising in weddings, portraits, and corporate events. They need a portfolio website where clients can browse work and inquire, plus a backend for staff to manage gallery content without developer help.

**The Problem Being Solved**

The studio currently has no professional website, leading to:

* No portfolio for prospective clients to evaluate work quality

* Inquiry process is entirely through social media \- no structured capture

* Staff cannot update the portfolio after launch without developer assistance

**Build a portfolio website with event galleries and a staff-facing image upload backend.**

| 04 | PROJECT SCOPE & FUNCTIONAL REQUIREMENTS |
| :---: | :---- |

**Home Page**

* Studio name, hero image, brief intro

* WhatsApp inquiry CTA visible prominently

**Event Galleries**

* Separate gallery pages/sections for: Weddings, Portraits, Corporate Events, and other categories

* Masonry or grid layout

* Image lightbox with navigation between photos

**WhatsApp Inquiry**

* Button on all gallery pages: "Inquire for this event type"

* Pre-filled WhatsApp message with event category

**Contact**

* Contact form: name, phone, event type, event date, message

* Redirects/links to WhatsApp on submission

* Mobile-responsive design

**Staff Image Upload Backend**

* Login-protected admin panel

* Upload interface: drag-and-drop or file picker

* Select gallery category for each upload, add optional caption

* Image compression on upload to maintain quality while reducing file size

* Delete images from a gallery

* Create new gallery categories

| 05 | NON-FUNCTIONAL REQUIREMENTS |
| :---: | :---- |

| Requirement | Expectation |
| :---- | :---- |
| **Performance** | Gallery pages must use lazy loading \- images load as user scrolls |
| **Security** | Admin panel must be login-protected \- no public image uploads |
| **Responsiveness** | Works on mobile for both visitors and staff uploading images |

| 06 | RECOMMENDED TECH STACK |
| :---: | :---- |

| Note: Recommendation only. Discuss any changes with your internal guide before starting. |
| :---- |

| Layer | Recommended |
| :---- | :---- |
| **Frontend** | React.js or HTML/CSS/JavaScript |
| **Backend** | Node.js/Express or Python Flask |
| **Image Storage** | Cloudinary (free tier) for image hosting and transformation |
| **Database** | MongoDB or SQLite for gallery metadata |
| **Authentication** | JWT for admin login |

| 07 | DELIVERABLES & MILESTONE SCHEDULE |
| :---: | :---- |

| Wk | Milestone | Deliverable | Acceptance Criteria |
| :---: | :---- | :---- | :---- |
| **1** | **Foundation** | Admin login, image upload to Cloudinary, basic gallery display | Admin can upload an image and see it appear in the gallery |
| **2** | **Galleries** | All event gallery pages with lightbox, categories, filtering | Lightbox navigation works on mobile |
| **3** | **Contact \+ Polish** | WhatsApp CTA, contact form, mobile-responsive design | WhatsApp opens with pre-filled message; contact form submits |
| **4** | **Deploy** | Full system live on public URL, admin backend accessible | Staff can upload new images without developer help |

| 08 | INFORMATION TO COLLECT FROM CLIENT |
| :---: | :---- |

Before beginning development, your team must collect the following from Black and White Stories via your internal guide or ASE:

* Initial gallery images to populate site at launch (per category)

* Studio logo and brand colours

* Admin login credentials (email/password to set up)

* Categories of events to create gallery sections for

| 09 | OUT OF SCOPE |
| :---: | :---- |

| The following are explicitly OUT OF SCOPE. Do not spend time building these: E-commerce or print sales Client-facing portal with private gallery access Video portfolio (images only per the deliverable) |
| :---- |

| 10 | EVALUATION CRITERIA |
| :---: | :---- |

| Criteria | Weight | Notes |
| :---- | :---: | :---- |
| Gallery with lightbox and categories | **30%** | Core portfolio functionality |
| Staff upload backend working | **30%** | Non-developer staff must be able to upload |
| Mobile responsiveness | **20%** | Both site and admin panel must work on mobile |
| WhatsApp CTA and contact form | **10%** | Inquiry mechanism must work |
| Live deployment | **10%** | Both site and admin on public URLs |

*Aurora Institute of Technology \- Industry Internship Programme  |  Confidential \- For Assigned Team Only*