# Employee Management System

## Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React
- **Storage**: Firebase (Storage)

## Features:
- Authentication Feature: ✅
- CRUD Employees Feautre: ✅
- Storing Images in buckets(Firebase-storage): ✅
- Searching Feature: ⌛(building)

## Installation

### 1. Clone the Repository
- Clone this repository and clone it to your local machine.
   ```
   git clone https://github.com/vinodpatil2002/ems.git
   ```

### 2. Install Dependencies

#### For Backend:
1. Open the terminal in the root folder of the project.
2. Install the dependencies for the backend:

```bash
npm install
npm run dev
```

#### For Frontend:
1. cd into the folder.
2. Install the dependencies for the frontend

```bash
cd client
npm install
npm run dev
```


# API Endpoints

## Authentication

- **POST** `/api/user/signin`: User sign-in
- **POST** `/api/user/signup`: User sign-up
- **POST** `/api/user/signout`: User sign-out

## Employee Management

- **POST** `/api/employee/create`: Create a new employee
- **GET** `/api/employee/get/:id`: Get employee by ID
- **GET** `/api/employee/get/`: Get all employees
- **DELETE** `/api/employee/delete`: Delete an employee
- **PUT** `/api/employee/update`: Update employee details

## Live Link
You can access the live version of the Employee Management System here:  
Request: This project is deployed on render so it takes time to load(30s-40s). Please wait till it loads completely.
[Live Demo](https://ems-dealsdray.onrender.com/)

## Video Demo
Watch the video demo here:  
[Video Demo Link](#)


