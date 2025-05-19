# Book Review API

A RESTful API for managing books and reviews with JWT authentication.

## Tech Stack
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/samarvishwakarma/book-review-api.git
   cd book-review-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/book-review-api
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```
4. Ensure MongoDB is running locally (`mongod`).

## Running Locally
1. Start the server:
   ```bash
   npm run dev
   ```
2. The API will be available at `http://localhost:3000`.

## Example API Requests
### Authentication
- **POST /api/auth/signup**
  ```bash
  curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'
  ```

- **POST /api/auth/login**
  ```bash
  curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
  ```

### Books
- **POST /api/books** (Authenticated)
  ```bash
  curl -X POST http://localhost:3000/api/books \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Book Title","author":"Author Name","genre":"Fiction"}'
  ```

- **GET /api/books**
  ```bash
  curl http://localhost:3000/api/books?page=1&limit=10
  ```

- **GET /api/books/search**
  ```bash
  curl http://localhost:3000/api/books/search?q=book
  ```

### Reviews
- **POST /api/reviews/books/:id/reviews** (Authenticated)
  ```bash
  curl -X POST http://localhost:3000/api/reviews/books/<book-id>/reviews \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"comment":"Great book!"}'
  ```

- **DELETE /api/reviews/:id** (Authenticated)
  ```bash
  curl -X DELETE http://localhost:3000/api/reviews/<review-id> \
  -H "Authorization: Bearer <token>"
  ```

## Design Decisions
- **MongoDB**: Chosen for flexible schema design.
- **JWT**: Used for stateless authentication.
- **Pagination**: Implemented for books and reviews to optimize performance.
- **Search**: Case-insensitive regex for user-friendly book searches.

## Assumptions
- Ratings are 1-5.
- One review per user per book.
- Basic error handling; additional validation can be added.
