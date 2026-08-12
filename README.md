# Student Management System

A full-stack **Student Management System** built with a React frontend and a Spring Boot backend. The application provides functionality for managing student records through a web-based interface.

## Tech Stack

### Frontend

* **React**
* **Vite**
* **Axios**
* **Recharts**
* JavaScript / JSX
* **Bootstrap**
* HTML5
* CSS3

### Backend

* **Java 21**
* **Spring Boot**
* Spring Web MVC
* Spring Data JPA
* Spring Validation
* ModelMapper
* Apache POI
* Maven

### Database

* **MySQL**
* MySQL Connector/J

## Project Structure

```text
student-management-system/
│
├── student-management-frontend/   # React + Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── student-management-backend/    # Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   └── java/
│   │   └── test/
│   ├── pom.xml
│   └── ...
│
└── README.md
```

## Backend Technologies \& Dependencies

The backend is built using Spring Boot and includes:

* **Spring Data JPA**
* **Spring Web MVC**
* **Spring Validation** 
* **MySQL Connector/J**
* **ModelMapper**
* **Apache POI**
* **Spring Boot DevTools**

## Prerequisites

Make sure the following are installed on your system:

* Java 21 or later
* Maven
* Node.js and npm
* MySQL

You can verify the installations:

```bash
java -version
mvn -version
node -v
npm -v
mysql --version
```

## Database Setup

Create a MySQL database for the application:

```sql
CREATE DATABASE studentmanagementsystem;
```

Configure the database connection in the Spring Boot application's configuration file.

For example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/studentmanagementsystem
spring.datasource.username=root
spring.datasource.password=YOUR\_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

> Replace `YOUR\_PASSWORD` with your MySQL password.

## Running the Backend

Navigate to the backend directory:

```bash
cd student-management-backend
```

Build the project using Maven:

```bash
mvn clean install
```

Start the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend API will normally be available at:

```text
http://localhost:8080
```

## Running the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd student-management-frontend
```

Install the required npm packages:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal, typically:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

## Frontend Configuration

If the frontend communicates with the Spring Boot backend through REST APIs, configure the backend API URL according to your project setup.

For example, create a `.env` file inside the frontend directory:

```env
VITE\_API\_BASE\_URL=http://localhost:8080
```

The API URL can then be accessed in React using:

```javascript
const API\_URL = import.meta.env.VITE\_API\_BASE\_URL;
```

## Backend API

The backend provides REST APIs for managing student records, including creating, retrieving, updating, deleting, searching, sorting, and exporting student data to Excel.

### Base URL

```text
http://localhost:8080/students
```

### Student Management

|Method|Endpoint|Description|
|-|-|-|
|`POST`|`/students`|Create a new student|
|`GET`|`/students`|Retrieve all students|
|`GET`|`/students/{id}`|Retrieve a student by ID|
|`PUT`|`/students/{id}`|Update an existing student|
|`DELETE`|`/students/{id}`|Delete a student|

### Search and Filtering

|Method|Endpoint|Description|
|-|-|-|
|`GET`|`/students/search?name={name}`|Search students by name|
|`GET`|`/students/course/{course}`|Retrieve students by course|
|`GET`|`/students/course/count`|Get the number of students grouped by course|

### Sorting

|Method|Endpoint|Description|
|-|-|-|
|`GET`|`/students/sort/name`|Retrieve students sorted by name in ascending order|
|`GET`|`/students/sort/date`|Retrieve students sorted by date of joining|

### Excel Export

The API supports exporting student data to Excel format.

|Method|Endpoint|Description|
|-|-|-|
|`GET`|`/students/excel`|Export all students to Excel|
|`GET`|`/students/excel/name/{name}`|Export students with the specified name to Excel|
|`GET`|`/students/excel/course/{course}`|Export students belonging to the specified course to Excel|
|`GET`|`/students/excel/sort/name`|Export students sorted by name to Excel|
|`GET`|`/students/excel/sort/doj`|Export students sorted by date of joining to Excel|

### Example Requests

#### Create a Student

```http
POST /students
Content-Type: application/json
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "Computer Science"
}
```

#### Retrieve All Students

```http
GET /students
```

#### Search by Name

```http
GET /students/search?name=John
```

#### Retrieve Students by Course

```http
GET /students/course/Computer%20Science
```

#### Update a Student

```http
PUT /students/1
Content-Type: application/json
```

#### Delete a Student

```http
DELETE /students/1
```

#### Export All Students

```http
GET /students/excel
```

The Excel endpoints return an `.xlsx` file as a downloadable response.

## Excel Support

The backend uses **Apache POI** to provide Excel export functionality.

The application supports exporting:

* All student records
* Students filtered by name
* Students filtered by course
* Students sorted by name
* Students sorted by date of joining

## Data Mapping

The application uses **ModelMapper** to simplify conversion between entities and DTOs.

A typical application flow is:

```text
Client Request
      ↓
Controller
      ↓
Service
      ↓
DTO ↔ Entity
      ↓
Repository
      ↓
MySQL Database
```

## Validation

Spring Validation is used to validate incoming student data before processing it.

Validation may include:

* Required student fields
* Valid email addresses
* Valid phone numbers
* Valid dates
* Field length restrictions

## Testing

Run the backend tests using Maven:

```bash
cd student-management-backend
mvn test
```

## Building for Production

### Backend

Create a production JAR:

```bash
cd student-management-backend
mvn clean package
```

The generated JAR will be available in:

```text
target/
```

Run the generated JAR using:

```bash
java -jar target/student-management-system-0.0.1-SNAPSHOT.jar
```

### Frontend

Build the React application:

```bash
cd student-management-frontend
npm run build
```

The production files will be generated in:

```text
dist/
```

## Environment Variables

Do not store passwords or other sensitive information directly in the source code.

For example:

```env
DB\_USERNAME=root
DB\_PASSWORD=your\_password
```

Use environment-specific configuration for sensitive database credentials.

## Development

The application follows a typical full-stack architecture:

```text
React + Vite
     │
     │ REST API
     ▼
Spring Boot
     │
     │ JPA
     ▼
   MySQL
```

During development, run the frontend and backend simultaneously.

\---

## Authors

* **Pratik Takawale**
* **Chirag Patil**
* **Aaditya C K**

