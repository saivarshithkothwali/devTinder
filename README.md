🧑‍💻 devConnect - A Networking Platform for Developers

devConnect is a full-stack web application designed to connect developers from around the world. Inspired by modern social platforms, it allows users to create profiles, showcase their skills, and connect with peers for collaboration, networking, and knowledge sharing. The application features real-time chat, a robust backend, and a responsive, modern front-end.

🚀 Live Demo & Links
   
   https://drive.google.com/file/d/1hwHNnJKuHPHXvMTDb-F0tuDpdzoJsnVs/view?usp=sharing
   
   https://thedevconnect.in/login

✨ Key Features
    
-> User Authentication: Secure user registration and login system using JWT (JSON Web Tokens) to protect user data and secure API endpoints.

-> Developer Profiles: Users can create and customize their profiles, adding skills, experience, and social links.

-> Real-Time Chat: Instant messaging functionality built with Socket.io allows developers to communicate and collaborate in real time.

-> Automated Email Notifications: Integrated with Amazon SES (Simple Email Service) for sending automated welcome emails and notifications.

-> Responsive Design: A clean and intuitive user interface built with React and styled with Tailwind CSS that works seamlessly across all devices.

-> Cloud Deployment: The application is deployed on AWS EC2, ensuring scalability and reliability.

🛠️ Tech Stack & Architecture

-> This project is a full-stack MERN application with a focus on modern development practices.

Front-End:

-> React.js (with Vite for a faster build process)

-> Redux Toolkit for efficient state management

-> Tailwind CSS for utility-first styling

Back-End:

-> Node.js & Express.js for building the RESTful API

-> MongoDB as the NoSQL database for storing user data

-> Real-Time Communication: Socket.io for enabling live chat
    
-> Cron Jobs (e.g., using node-cron) for running scheduled background tasks like sending emails.

Authentication:

-> JSON Web Tokens (JWT)

Deployment & Cloud Services:

-> AWS EC2 for hosting the application

-> Amazon SES for handling email services


## Learning Progress & Backend Concepts Covered

1. Project Initialization & Server Setup
  - Initialized a Node.js project using `npm init`
  - Understood the role of `package.json` in managing:
    - Project metadata
    - Scripts
    - Dependencies and devDependencies
  - Created a structured project layout using a `src` directory
  - Configured `app.js` as the application entry point
  - Set up an Express server to listen for incoming HTTP requests


2. Express Server Lifecycle
  - Imported and instantiated the Express application
  - Started the server using `app.listen()` on port `7777`
  - Verified server startup using browser and console logs
  - Understood the role of the `app.listen()` callback

3. Development Workflow
  - Installed and used Nodemon to automatically restart the server during development
  - Improved development efficiency by eliminating manual restarts


4. REST API Development & Testing
  - Implemented RESTful APIs using standard HTTP methods:
    - GET, POST, PUT, PATCH, DELETE
  - Tested and validated API requests and responses using Postman
  - Understood request–response lifecycle in Express

 
5. Routing & Request Handling
  - Implemented Express routing for handling client requests
  - Learned the difference between:
    - Route (Path) Parameters using `req.params`
    - Query Parameters using `req.query`
  - Understood when to use:
    - Route parameters for resource identification
    - Query parameters for filtering and optional data


6. Routing, Route Handlers, and Middleware
  - Learned the concept of routing in Express using `app.get()`, `app.post()`, `app.put()`, `app.patch()`, and `app.delete()`
  - Understood the role of route handlers in processing incoming requests and sending responses
  - Differentiated between:
    - Routes (URL paths)
    - Route handlers (request-processing logic)
    - Middleware functions (pre-processing logic)
  - Used multiple route handlers for a single route to modularize request processing
  - Applied middleware chaining by wrapping multiple middleware functions in arrays for cleaner and reusable route definitions


7. Middleware and the `next()` Function
  - Implemented custom middleware functions for request processing
  - Learned when and why to use the `next()` function to:
    - Pass control to the next middleware
    - Continue request execution flow
  - Understood middleware execution order and request lifecycle in Express


8. Authorization and Access Control
  - Implemented authorization logic to restrict access to routes
  - Differentiated user roles such as:
    - User
    - Admin
  - Protected routes based on role and authentication status


9. Route-Level Authorization
  - Applied middleware selectively to routes such as:
    - Login
    - Fetching protected data
    - Deleting sensitive data
  - Ensured that only authorized users can access or modify protected resources
  - Prevented unauthorized access by validating permissions before executing route handlers


10. Role-Based Authentication Functions
  - Created separate authentication functions for different user roles:
    - User authentication
    - Admin authentication
  - Centralized authentication logic to ensure reusability and consistency
  - Applied role-specific authentication middleware to protect routes based on access level
  - Ensured that only authorized users can perform privileged operations

11. Error Handling Using Try-Catch
  - Implemented `try-catch` blocks to handle runtime and asynchronous errors
  - Prevented application crashes by gracefully handling unexpected failures
  - Returned meaningful error responses to the client
  - Improved application stability and debuggability during API execution
  

12. Database, Schema and Mongoose ODM
  - Created a MongoDB Atlas cluster to host the database in the cloud
  - Used MongoDB Compass to view and inspect data stored in MongoDB Atlas
  - Used Mongoose (ODM) to model data and interact with MongoDB from the Node.js application
  - Established a database connection before starting the server to ensure the application only listens for requests after successful database connectivity
  - Implemented a "/signup" API using the HTTP "POST" method to create new users
  - Used the Mongoose "User" model to interact with the "users" collection
  - Created a new instance of the "User" model with request data
  - Persisted the user document to the database using model instance methods

13. Core Backend Concepts Strengthened
  -JSON vs JavaScript objects
  -Role of express.json() middleware
  -Difference between PUT and PATCH
  -findById vs findOne methods
  -Proper CRUD abstraction
  -Clean REST API design principles
  -Understanding and using Mongoose model methods:
   create(), save(), find(), findById(), findOne(), findByIdAndUpdate(), findOneAndUpdate(), findByIdAndDelete(), deleteOne().

14. Data Modeling & Schema Design (Mongoose)
   - Designed data models using Mongoose schemas
   - Used core schema types:
     - String
     - Number
     - Array
   - Enabled automatic timestamps (`createdAt`, `updatedAt`) for audit and tracking

15. Data Validation & Sanitization
   - Enforced schema-level validations to maintain data integrity
   - Applied:
     - Required field validation
     - Length and value constraints
   - Implemented input sanitization:
     - Lowercasing emails
     - Trimming whitespace
     - Default values for optional fields

16. Custom Schema-Level Validation
   - Implemented custom validators using the `validator` library:
     - Email format validation
     - Strong password enforcement
     - URL validation for profile images
     - Enum-based validation for controlled fields like gender
   - Added meaningful error messages for validation failures

17. Validation During Updates
   - Enforced validation during update operations using `runValidators: true`
   - Prevented invalid data from bypassing schema rules during updates

18. API-Level Update Control
   - Implemented field whitelisting for profile updates
   - Allowed updates only for non-sensitive fields such as:
     - firstName, lastName, photoUrl, gender, age, about, skills
   - Restricted updates to sensitive fields like email and password
   - Prevented mass assignment vulnerabilities



