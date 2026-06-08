I have deployed this website, When u visit the website and if u see no content is being displayed or u r not able to login then wait for 15-30 seconds because the backend of this website is hosted on render platform with free subscription plan so it takes time to load the website, live website link: https://nandishbadami.github.io/Odin-Blog-API/

At this point of this project only i can login with jwt tokens and i am the only authorised person to create or delete new blog posts. Regular users can view and comment on the blog post.

# Blog Engine API

A secure, scalable RESTful API backend designed for blog platforms. Built with Node.js, Express, and Prisma ORM, this API handles user authentication, post creation, and real-time comment management with secure database connectivity.

## Features

- **Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
- **Content Management:** Full CRUD operations for managing blog posts.
- **Interactive Comments:** Public or private nested comment management mapped directly to individual posts.
- **Robust Database Engine:** Uses Prisma ORM for clean schema migrations and fluid PostgreSQL/MySQL connectivity.
- **Enhanced Security:** Implements SSL verification with pre-configured authority files for cloud-hosted databases.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database ORM:** Prisma
- **Security:** JWT (JSON Web Tokens), SSL/TLS (via Aiven CA)

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org) (v16.x or higher recommended)
- [npm](https://npmjs.com) or [yarn](https://yarnpkg.com)
- A running PostgreSQL or MySQL database instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd Odin-Blog-API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and configure your database connection string:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db?schema=public"
   JWT_SECRET="your_super_secret_jwt_key"
   PORT=3000
   ```

4. **Run database migrations:**
   Push the schema modifications to your live database instance using Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the server:**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```
   The server will start running at `http://localhost:3000`.

---

## API Endpoints

### 🔐 Authentication & Users



| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/register` | Register a new user/author account | No |
| `POST` | `/api/login` | Authenticate credentials and return a JWT | No |

### 📝 Blog Posts



| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/posts` | Fetch all published blog posts | No |
| `GET` | `/api/posts/:postId` | Fetch details of a single blog post | No |
| `POST` | `/api/posts` | Create a new blog post | **Yes (Bearer Token)** |
| `PUT` | `/api/posts/:postId` | Update an existing blog post | **Yes (Bearer Token)** |
| `DELETE` | `/api/posts/:postId` | Delete a blog post and its comments | **Yes (Bearer Token)** |

### 💬 Comments



| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/posts/:postId/comments` | Fetch all comments for a specific post | No |
| `POST` | `/api/posts/:postId/comments`| Post a new comment under a blog entry | No / Optional |
| `DELETE` | `/api/posts/:postId/comments/:commentId` | Remove a specific comment | **Yes (Bearer Token)** |

---

## Example Request Payloads

### User Login (`POST /api/login`)
```json
{
  "username": "author_user",
  "password": "securepassword123"
}
```

### Create Post (`POST /api/posts`)
*Note: Requires Header `Authorization: Bearer <your_jwt_token>`*
```json
{
  "title": "Deploying Express APIs",
  "content": "This is the body text of the blog post regarding server architecture...",
  "published": true
}
```

### Create Comment (`POST /api/posts/:postId/comments`)
```json
{
  "username": "guest_reader",
  "content": "This article was highly informative. Thanks for sharing!"
}
```

---

## Project Structure

```text
├── prisma/               # Database schemas and migration histories
│   └── schema.prisma     # Core data models (User, Post, Comment)
├── app.js                # Core entry point and middleware configuration
├── routes.js             # API path mapping
├── controller.js         # Business logic layer executing database actions
├── prisma.config.js      # Prisma initialization and client pooling
└── aiven-ca.pem          # SSL certificate for cloud database verification
```
