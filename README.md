### Todo-App

## Summary
A full-stack project, the Todo List Application was created to help users effectively manage their tasks. Secure task management (CRUD), user authentication, and an intuitive user interface with extra features like responsive design and dark mode are all included in the application.


## Table of Contents
# Features
1. Technologies Used
2. Setup Instructions
3. Application Structure
4. Backend API Endpoints
5. Frontend Workflow
6. Additional Features
7. Hosting and Deployment
8. Future Enhancements


## Features
1. User Authentication
    Login and Registration: Secure authentication using JWT.
    Access Control: Users can only access their own data.
2. Todo List Management
    CRUD Operations: Create, read, update, and delete todo items.
    User-Specific Data: Each user can only manage their own todo items.
3. Frontend
    Responsive UI: Optimized for different screen sizes.
    Dark Mode Toggle: Allows users to switch between light and dark themes.
    Real-Time Feedback: Notifications for actions like adding, updating, or deleting tasks.
    Sorting and Filtering: Optional features for improved task organization.
4. Testing
    Unit Tests: For critical components and functions.
    Bug-Free Workflow: Validates against user errors and unexpected inputs.


## Technologies Used
# Frontend
    React.js
    Axios (for API requests)
    CSS for styling (includes light and dark mode)
    React Router for navigation
    Context API for state management
# Backend
    Express.js
    MongoDB with Mongoose (for database operations)
    JWT for authentication
    bcrypt for password hashing


## Setup Instructions
1. Prerequisites
    Node.js (v14 or higher)
    MongoDB instance (local or hosted, e.g., MongoDB Atlas)
    Git
2. Installation
    1. Clone the repository: 
        git clone https://github.com/Rockranx/To-Do
    2. Navigate to the backend directory: 
        cd backend
    3. Install backend dependencies: 
        npm install
    4. Set up the .env file in the backend directory: 
        JWT_SECRET=<your_jwt_secret>
        MONGO_URI=<your_mongodb_connection_string>
        PORT=8000
    5. Start the backend server: 
        npm run dev
    6. Navigate to the frontend directory: 
        cd ../frontend
    7. Install frontend dependencies: 
        npm install
    8. Start the frontend development server:
        npm run dev

### Application Structure

## Backend
        backend/
        │
        ├── src/
        │   ├── controllers/        # Handles API requests
        │   ├── models/             # Mongoose models
        │   ├── routes/             # API endpoints
        │   ├── middleware/         # Authentication middleware
        │   ├── utils/              # Utility functions
        │   ├── env/                # Environment configurations
        │   ├── index.ts            # Entry point for the backend server
        │
        ├── .env                    # Environment variables
        ├── package.json            # Backend dependencies
        └── README.md               # Backend instructions

## Frontend

        frontend/
        │
        ├── src/
        │   ├── components/         # React components (e.g., Navbar, TodoCard)
        │   ├── pages/              # React pages (Home, Login, Dashboard)
        │   ├── context/            # Context API for state management
        │   ├── styles/             # CSS for the application
        │   ├── App.js              # Main App component
        │   ├── index.js            # Entry point for the React app
        │
        ├── public/                 # Static files
        ├── package.json            # Frontend dependencies
        └── README.md               # Frontend instructions



## Backend API Endpoints

# Endpoint	            Method	    Description	                Protected
/api/v1/auth/register	POST	    Register a new user	        No
/api/v1/auth/login	    POST	    Login user	                No
/api/v1/auth/logout	    POST	    Logout user	                Yes
/api/v1/todos	        GET	        Get all todos for the user	Yes
/api/v1/todos/:id	    GET	        Get a specific todo	        Yes
/api/v1/todos	        POST	    Create a new todo	        Yes
/api/v1/todos/:id	    PUT	        Update a specific todo	    Yes
/api/v1/todos/:id	    DELETE	    Delete a specific todo	    Yes


## Frontend Workflow

# Login and Register

1. Components:
    1. Login.js
    2. Register.js
    3. Validates input and sends API requests to /auth/login and /auth/register.

2. Dashboard
    1. Components:
        1. Dashboard.js
        2. TodoCard.js
    2. Fetches user-specific todos using the /todos API.
    3. Provides options for CRUD operations.

3. Theme Toggle
    1. Uses React Context API to toggle and persist theme preferences in localStorage.

## Hosting and Deployment
    Backend: Deployed on Render .
    Frontend: Hosted on Firebase.