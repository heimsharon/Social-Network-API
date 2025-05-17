# Social Network API Documentation

> **Note:**
> These API endpoints are intended for use in development mode and can be tested using API clients such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).
> Make sure your server is running, your database is seeded with initial data, and your `.env` is configured.

---

## Users

### GET /api/users

-   Get all users

### GET /api/users/:id

-   Get a single user by ID

### POST /api/users

-   Create a new user

### PUT /api/users/:id

-   Update a user by ID

### DELETE /api/users/:id

-   Delete a user by ID

### POST /api/users/:userId/friends/:friendId

-   Add a friend

### DELETE /api/users/:userId/friends/:friendId

-   Remove a friend

---

## Thoughts

### GET /api/thoughts

-   Get all thoughts

### GET /api/thoughts/:id

-   Get a single thought by ID

### POST /api/thoughts

-   Create a new thought

### PUT /api/thoughts/:id

-   Update a thought by ID

### DELETE /api/thoughts/:id

-   Delete a thought

### POST /api/thoughts/:thoughtId/reactions

-   Add a reaction to a thought

### DELETE /api/thoughts/:thoughtId/reactions/:reactionId

-   Remove a reaction from a thought

---
