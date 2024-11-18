# Epic Quotes

A RESTful API for managing movie quotes. This application allows users to add, update, and delete movies, add quotes to movies, and interact with quotes through likes and comments. Additionally, there is a news feed feature where users can see the latest quotes.

## Features

- **Movies**: Add and update movies in the system.
- **Quotes**: Add quotes to movies and interact with them.
- **Likes and Comments**: Users can like and comment on quotes posted by other users.
- **News Feed**: View the latest quotes posted by users.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js.
- **Prisma**: ORM for managing the database.
- **TypeScript**: Type-safe JavaScript for better code quality and maintenance.
- **multer**: Middleware for handling image uploads (for movie posters or user profile pictures).
- **Prisma Migrations**: For managing the database schema.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GiorgiTsukhishvili/Epic-Quotes.git
   cd epic-quotes
   ```

2. Install dependencies, set up environment variables, and run Prisma migrations:

   ```bash
   pnpm install && \
   cp .env && \
   pnpm run db:migrate-dev
   ```

3. Seed the database (optional, for initial data):

   ```bash
   pnpm run db:seed
   ```

4. Start the development server:

   ```bash
   pnpm run dev
   ```

The server should now be running at http://localhost:3000.
