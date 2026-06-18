# Cognifyz Technologies Full Stack Internship Management Portal

This project is a COMPLETE PROFESSIONAL FULL STACK DEVELOPMENT PROJECT that satisfies ALL 8 Cognifyz Technologies internship tasks.

## Theme & Features
- Modern futuristic glassmorphism design with blue, purple, cyan and black gradients.
- Fully responsive for desktop, tablet, and mobile.
- Attractive transitions, card hover animations, floating background blobs, and scroll reveal effects.
- Advanced loading animations and interactive forms.
- Dark mode by default.
- Professional typography and Font Awesome icons.

## Technology Stack
**Frontend:** HTML5, CSS3, JavaScript ES6, Bootstrap 5, EJS
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Authentication:** JWT, bcrypt
**Additional:** Axios, Redis caching, Morgan logger, Body parser, Dotenv, Node-cron, express-rate-limit

## Installation Instructions

1. **Clone the repository or download the project folder.**
2. **Install Dependencies:**
   Ensure you have Node.js installed, then run the following in your terminal:
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Ensure your `.env` file is present in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/cognifyz
   JWT_SECRET=supersecretcognifyz2026
   REDIS_URL=redis://127.0.0.1:6379
   NODE_ENV=development
   ```

4. **Ensure External Services are Running (Optional for development):**
   - Make sure your local **MongoDB** instance is running on port 27017, or update the `MONGODB_URI` string to point to a MongoDB Atlas cluster.
   - If you want full Redis caching to be active, ensure **Redis** is running locally on port 6379 and uncomment the `await redisClient.connect()` line in `config/redis.js`.

5. **Run the Application:**
   Start the Node server:
   ```bash
   node server.js
   ```

6. **View the Application:**
   Open your browser and navigate to:
   [http://localhost:3000](http://localhost:3000)

## Task Completion Checklist
- [x] **Task 1: HTML Structure and Basic Server Interaction** (Hero section, forms, EJS rendering, Node server).
- [x] **Task 2: Inline Styles and Validation** (Client & server side validation, temporary array storage).
- [x] **Task 3: Advanced CSS Styling and Responsive Design** (Glassmorphism, animations, Bootstrap grid).
- [x] **Task 4: Complex Form Validation and Dynamic DOM** (Regex password rules, password strength meter, live character counting).
- [x] **Task 5: REST API Integration** (CRUD APIs, Axios frontend dashboard table fetching).
- [x] **Task 6: Database and Authentication** (MongoDB Collections, JWT, bcrypt hashing, Protected Routes).
- [x] **Task 7: External API Integration** (GitHub API integration, Express Rate Limiter, 404/500 error pages).
- [x] **Task 8: Advanced Server Functionality** (Morgan, Body Parser, Error Middleware, Node-Cron background cleanup jobs, Redis setup).

## Author
Developed for Cognifyz Technologies.
