# My List Backend Service (OTT Platform)

This repository implements the **“My List”** feature for an OTT platform, allowing users to save movies and TV shows to a personalized list.

The service is designed **as part of an existing OTT system** and follows **production-quality backend engineering practices**, with a focus on performance, scalability, and clean service boundaries.

---

## 🚀 Features

- Add a movie or TV show to a user’s list
- Remove an item from the user’s list
- List saved items with pagination
- Prevent duplicate items per user
- Optimized for frequent read access (home screen use case)
- Optional Redis caching for high-performance reads
- Integration tests for all APIs
- Seed scripts for local setup and evaluation

---

## 🧱 Tech Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Cache:** Redis (optional, best-effort)
- **Testing:** Jest + Supertest
- **Configuration:** dotenv

---

## 📌 Assumptions (as per assignment)

- Basic user authentication already exists
- A **mock user ID** is used for this assignment (via `x-user-id` header)
- User, Movie, and TVShow entities are part of an **existing system**
- This service does **not** own authentication or content catalogs
- Content metadata enrichment happens outside this service

---

## 🧩 Entity Modeling

The assignment provides representations for core entities.  
To support local testing and evaluation, **full schemas** are implemented for:

- `User`
- `Movie`
- `TVShow`
- `MyList`

### Important Design Decision

The **My List** feature stores **only references** to content:

```ts
userId;
contentId;
contentType(MOVIE | TV_SHOW);
addedAt;
```

It does **not duplicate or join** Movie or TVShow metadata.

---

## ⚡ Performance & Scalability

The `List My Items` API is performance-critical and optimized using MongoDB indexes and optional Redis caching.  
The design supports **sub-10ms read latency** under typical loads.

---

## 🔴 Redis (Optional Caching Layer)

Redis is used as a **best-effort caching layer** for the `GET /my-list` API.

- Cache key: `mylist:{userId}:page:{page}:limit:{limit}`
- TTL: 60 seconds
- MongoDB remains the system of record

---

## 📂 Project Structure

```
├── src/
│   ├── app.ts
│   ├── cache/
│   ├── controllers/
│   ├── config/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── services/
│   ├── tests/
│   └── types/
│
├── @types/
│   └── express/
|       └── index.d.ts
│
├── .gitignore
├── jest.config.ts
├── package.json
├── README.md
├── server.ts
└── tsconfig.json
```

---

## 🔧 Environment Variables

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/my_list
MONGODB_TEST_URI=mongodb://localhost:27017/my_list_test
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_TTL_SECONDS=60
```

---

## 🌱 Seed Data

Run once for local setup:

```
npm run seed
```

---

## ▶️ Running the Application

```
npm install
npm run seed
npm run dev
```

---

## 🧪 Running Tests

```
npm run test
```

---

## 📡 API Endpoints

- `POST /my-list`
- `GET /my-list?page=1&limit=20`
- `DELETE /my-list/:contentId`

---

## 📎 Final Note

This implementation focuses on **clarity, correctness, and production readiness**, closely mirroring how a real OTT backend would implement a “My List” feature.
