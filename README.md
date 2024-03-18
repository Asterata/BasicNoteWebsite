# Basic Note Website
This is a basic website template for a web application designed for storing and editing user-written notes. The application provides functionality for user authentication, note creation, editing, and encryption of note texts.

## Features
**User Authentication:** Users are required to sign up with a username, email, and password. The password is securely hashed to ensure data confidentiality.

**Note Management:** Users can create, edit, and delete their notes. Each note is associated with the user who created it.

**Text Encryption:** The application encrypts the text of each note to ensure that the content remains confidential even if the database is compromised.

## Technologies Used
**Frontend:** HTML, CSS, JavaScript

**Backend:** Node.js

**Database:** MySQL

**Encryption:** AES encryption algorithm

## Setup Instructions

**Clone the Repository:** Clone this repository to your local machine using git clone.

**Install Dependencies:** Navigate to the project directory and install the required dependencies using npm install.

**Configure Environment Variables:** Create a .env file in the root directory and configure environment variables such as database connection URI, encryption key, and session secret.

```
PORT=3000
HOSTNAME=localhost
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```
**Start the Server:** Run the server using npm app.js. By default, the server will run on http://localhost:3000.

**Access the Website:** Open a web browser and navigate to http://localhost:3000 to access the website.
