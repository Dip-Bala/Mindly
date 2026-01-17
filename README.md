<p align="center"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" /> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/NextAuth-1A1A1A?style=for-the-badge&logo=auth0&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-023430?style=for-the-badge&logo=mongodb&logoColor=4DB33D" /> <img src="https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white" /> <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" /> <img src="https://img.shields.io/badge/TailwindCSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" /> <img src="https://img.shields.io/badge/TypeScript-0F172A?style=for-the-badge&logo=typescript&logoColor=3178C6" /> </p>

<h2 align="center">Memoir</h2>

<p align="center">
  Save anything in one place. Remember it when it matters.
</p>

<hr>

##  Introduction

**Memoir** is an open-source personal knowledge management web application designed to help users **capture, organize, and revisit** the content they encounter daily — links, tweets, videos, documents, images, and ideas — all in one place.

In a world full of information overload, Memoir acts as a **second brain for the web**, ensuring that inspirations, references, and learnings don’t get lost over time.

This project evolved from an earlier **React + MERN implementation** and has been **rebuilt from scratch using Next.js App Router**, with a strong focus on clean architecture, scalability, and real-world production patterns.

---

##  Core Goals

* Centralize scattered web content
* Organize content with categories
* Support multiple content types
* Provide fast access and clean browsing
* Lay a strong foundation for future AI/RAG features

---

##  Features (V1)

###  Authentication

* Email & password authentication
* OAuth with **Google** and **GitHub**
* Secure session handling with **NextAuth**
* Logout & session protection

---

###  Categories

* User-owned categories
* Default categories (Inbox, Learning, Work, Ideas, Archive)
* Custom categories with color support
* Sidebar navigation with collapsing behavior
* Category-based content filtering

---

###  Content Management

* Save:

  * Web links
  * YouTube videos
  * Tweets
  * PDFs
  * Images (PNG, JPG, etc.)
* Upload files via **Cloudinary**
* Automatic metadata handling:

  * title
  * source
  * content type
* Category assignment (with Inbox fallback)

---

###  Content Preview System

* Inline previews for:

  * PDFs
  * Images
  * YouTube videos
  * Tweets
* Icon-based cards for:

  * Instagram
  * Facebook
  * Unsupported platforms
* Graceful fallback when previews fail

---

###  Dashboard Experience

* Sidebar for categories
* Header with:

  * Current category
  * Add content button
  * User info
  * Theme toggle
  * Logout
* Responsive grid layout for content cards
* Empty states & basic loading states

---

###  Theming

* Light / Dark mode
* Theme persisted across sessions

---

##  Tech Stack

### Frontend

* **Next.js (App Router)**
* **React**
* **Tailwind CSS**
* Native `fetch` for data handling

### Backend

* **Next.js Route Handlers**
* **NextAuth**
* **MongoDB + Mongoose**

### File Storage

* **Cloudinary**

  * Secure uploads
  * PDF & image previews
  * CDN-backed delivery

---

##  Architecture Overview

### High-Level Flow

```
User Action (UI)
   ↓
Client-side validation & UX
   ↓
API Route (Next.js)
   ↓
Auth verification (NextAuth)
   ↓
Business logic + normalization
   ↓
MongoDB (persistent storage)
```

---

### Authentication Architecture

* NextAuth handles:

  * Credentials provider
  * OAuth providers
  * JWT-based sessions
* User identity is injected server-side
* APIs never trust client-provided `userId`

---

### File Upload Architecture

```
Client selects file
   ↓
Upload to Cloudinary
   ↓
Receive secure URL
   ↓
POST metadata to backend
   ↓
Save URL + metadata in DB
```

> Files never touch the application server directly.

---

### Data Ownership & Security

* All data is scoped by `userId`
* Categories & content are user-isolated
* Backend derives and validates critical fields
* Frontend assists UX, backend enforces truth

---

##  Project Structure

```
app/
 ├── (auth)              # Login & register flows
 ├── (dashboard)         # Authenticated app shell
 ├── api/                # Backend routes
 ├── providers.tsx       # Global providers
 └── layout.tsx          # Root layout

components/
 ├── layout/             # Landing page sections
 └── ui/                 # Reusable UI components

lib/
 ├── auth.ts             # NextAuth config
 ├── mongoDB.ts          # DB connection
 ├── cloudinary.ts       # File upload helper
 └── requireSession.ts   # Auth guards

models/
 ├── User.ts
 ├── Category.ts
 └── Content.ts
```

---

##  Migration: React (MERN) → Next.js

This project was **initially built using React + MERN** and later migrated to **Next.js App Router** to:

* Improve SEO & routing
* Simplify backend/frontend integration
* Enable server-side auth checks
* Reduce API boilerplate
* Prepare for AI-powered features

The migration involved:

* Rethinking routing & layouts
* Refactoring auth flow
* Adopting server components
* Redesigning data fetching strategy

---

##  Engineering Decisions

### Why no react-query or react-hook-form (yet)?

* V1 prioritizes clarity over abstraction
* Native fetch + controlled forms are sufficient
* Easy to refactor later if needed

### Why Cloudinary over local storage?

* No server load
* Built-in previews
* CDN-backed delivery
* Production-grade reliability

---

##  Challenges Faced

* NextAuth session handling with MongoDB ObjectIds
* OAuth + Credentials coexistence
* Server vs client component boundaries
* File uploads without Multer
* Schema normalization for future RAG usage

Each challenge was addressed with **production-oriented solutions**, not hacks.

---

##  Upcoming Features

### Near-Term

* Tags (orthogonal to categories)
* Search & filtering
* Edit / delete content
* Better error & loading states

### Long-Term (RAG / AI)

* Text extraction from PDFs & web pages
* Chunking & embeddings
* Vector database
* “Ask your knowledge” interface
* Context-aware responses

---

##  Demo

> Screenshots & short demo video coming soon.

---

##  License

MIT License — open for learning, extension, and experimentation.

---

##  Closing Note

Memoir is not just a bookmarking app — it is an evolving **personal knowledge system** built with real-world engineering principles and long-term extensibility in mind.


