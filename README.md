# MERN Initial Backend Structure

MERN Initial Backend Structure is a template for building the backend structure of web applications using the MERN (MongoDB, Express, React, Node.js) stack. It provides a solid foundation for your backend server, including routing, validation, database operations, and more.

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Author](#author)
- [Contact](#contact)

## Description

This project is designed to jumpstart your MERN backend development. It comes pre-configured with essential dependencies and scripts that streamline the development process.

The main features of this structure are:

- Routing setup using Express
- Request validation using express-validator
- MongoDB integration using mongoose
- CORS support using cors
- Environment variable management using dotenv

## Getting Started

### Installation

1. Clone this repository to your local machine or download the source code.
2. Navigate to the project directory in your terminal.

```
npm install
```

## Usage

The project includes helpful scripts to start and develop your backend server.

To start the server:

```
npm start
```

To run the server in development mode with automatic restart (using nodemon):

```
npm run dev
```

Make sure to configure your environment variables by creating a .env file in the root directory, and define the required variables.

## Dependencies

The project utilizes the following key dependencies:

- **babel-cli**: Babel command line interface for transpiling ES6+ code.
- **babel-preset-env**: Babel preset for compiling ES6+ syntax and modern JavaScript features.
- **bcrypt**: Library for hashing passwords.
- **cors**: Express middleware for enabling Cross-Origin Resource Sharing (CORS) support.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **express**: Web application framework for building APIs and handling routes.
- **express-validator**: Middleware for request validation in Express applications.
- **jsonwebtoken**: Library for generating JSON Web Tokens (JWT).
- **mongoose**: MongoDB object modeling for Node.js applications.
- **morgan**: HTTP request logger middleware for Express.
- **nodemon**: Utility that helps in developing node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Author

This project was authored by Nicolas Herrera.

## Contact

If you have any suggestions, questions, or need assistance, feel free to contact me. Your feedback is greatly appreciated!
