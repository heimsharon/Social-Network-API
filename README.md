# Social Network API

This is a backend API for a social network application built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. It allows users to share their thoughts, react to friends' thoughts, and manage their friend list.

## Table of Contents

- [Social Network API](#social-network-api)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [API Endpoints](#api-endpoints)
    - [Users Database](#users-database)
    - [Thoughts Database](#thoughts-database)
    - [User Database Models](#user-database-models)
    - [Thought Database Models](#thought-database-models)
    - [Reaction (Sub-Document)](#reaction-sub-document)
  - [Media](#media)
    - [Screen Capture of API endpoints in Insomnia](#screen-capture-of-api-endpoints-in-insomnia)
    - [Video Demonstration of entire build](#video-demonstration-of-entire-build)
  - [License](#license)

## Prerequisites

- [**Node.js**](https://nodejs.org/) - JavaScript runtime
- [**Express.js**](https://expressjs.com/) - Web framework for Node.js
- [**TypeScript**](https://www.typescriptlang.org/) - Typed JavaScript at scale
- [**MongoDB**](https://www.mongodb.com/) - NoSQL database
- [**Mongoose**](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [**dotenv**](https://github.com/motdotla/dotenv) - Environment variable management
- [**moment**](https://momentjs.com/) - Date and time library
- **API Testing Tool** (e.g., [**Insomnia**](https://insomnia.rest/) or [**Postman**](https://www.postman.com/))

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd social-network-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root directory and add the following environment variables:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/socialNetworkDB
   PORT=3001
   ```

4. Build the TypeScript files:

   ```bash
   npm run build
   ```

5. Seed the database:

   ```bash
   npm run seed
   ```

6. Development mode or Production Mode:
   - Start the server in development mode:

     ```bash
     npm run dev
     ```

   - Start the server in production mode:

     ```bash
     npm start
     ```

## API Endpoints

### Users Database

- <span style="color: purple;">GET</span> /api/users - Get all users
- <span style="color: purple;">GET</span> /api/users/:id - Get a single user by ID
- <span style="color: green;">POST</span> /api/users - Create a new user
- <span style="color: orange;">PUT</span> /api/users/:id - Update a user by ID
- <span style="color: red;">DELETE</span> /api/users/:id - Delete a user by ID
- <span style="color: blue;">POST</span> /api/users/:userId/friends/:friendId - Add a friend
- <span style="color: red;">DELETE</span> /api/users/:userId/friends/:friendId - Remove a friend

### Thoughts Database

- <span style="color: purple;">GET</span> /api/thoughts - Get all thoughts
- <span style="color: purple;">GET</span> /api/thoughts/:id - Get a single thought by ID
- <span style="color: green;">POST</span> /api/thoughts - Create a new thought
- <span style="color: orange;">PUT</span> /api/thoughts/:id - Update a thought by ID
- <span style="color: red;">DELETE</span> /api/thoughts/:id - Delete a thought
- <span style="color: green;">POST</span> /api/thoughts/:thoughtId/reactions - Add a reaction to a thought
- <span style="color: red;">DELETE</span> /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought

### User Database Models

- username (String, required, unique)
- email (String, required, unique, must match a valid email format)
- thoughts (Array of ObjectIds referencing Thought)
- friends (Array of ObjectIds referencing User)
- Virtual: friendCount - Number of friends

### Thought Database Models

- thoughtText (String, required, 1-280 characters)
- createdAt (Date, default: current date)
- username (String, required)
- reactions (Array of sub-documents)
- Virtual: reactionCount - Number of reactions

### Reaction (Sub-Document)

- reactionBody (String, required, max 280 characters)
- username (String, required)
- createdAt (Date, default: current date)

## Media

### Screen Capture of API endpoints in Insomnia

Below is a screenshot showing the API endpoints tested in Insomnia:

![API Endpoints in Insomnia](./assets/insomniasocialnetworkapi.jpg)

### Video Demonstration of entire build

A video walkthrough of the project, including setup, API functionality, and usage, can be found [here](https://drive.google.com/file/d/12LKGpaz_1yW08DYpy_faghj0fJR8uJ7u/view?usp=drive_link).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
