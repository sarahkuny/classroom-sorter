# Classroom Sorter

This app is a tool for teachers and administrators in schools. A user will input student names and behavioral data for those students. The app will then sort students into classes, spreading behavioral attributes evenly between the classes. 


## Architecture

## Front-End

### User Flow Diagram
![User Flow Diagram](readme-assets/user-flow-diagram-classroom-sorter.png)
 
### Wireframe
![Wireframe](readme-assets/wireframe.png)


## Back-End

### Database Schema
![Database Schema](readme-assets/mvp-database-schema.png)

### API Routes
![API Routes 1](readme-assets/mvp-api-routes.png)







## Setup

### Dependencies
- BACKEND: Run 'npm install' in project directory. 
- FRONTEND: 'cd client' and run 'npm install'

### Database Prep
- Access the MySQL interface in your terminal by running 'mysql -u root -p'
- Create a new database called students: 'create database sorter;'
- Add a '.env' file to the project directory containing MySQL authentication, for example:

```bash
  DB_HOST=127.0.0.1
  DB_USER=root
  DB_NAME=facebook
  DB_PASS=YOURPASSWORD
```

- In a new terminal: in the project directory run 'npm run migrate' to create tables within the sorter database
- To view structure of tables, in MySQL console:
    - 'use sorter;'
    - 'describe students'

### Development
- BACKEND TERMINAL: in project directory run 'npm start' (runs on port 5000)
- FRONTEND TERMINAL: 'cd client' then 'npm start' (runs on port 3000)


    