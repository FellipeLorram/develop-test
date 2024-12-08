# Back-end Application

## Overview
This is the back-end server application that provides API endpoints and services for the main application. It's built using Node.js and follows RESTful principles.

## Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Getting Started

### Installation
1. Clone the repository
2. Navigate to the back-end directory:
   ```bash
   cd back-end
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup
1. Create a `.env` file in the root of the back-end directory
2. Add the following environment variables (adjust values according to your setup):
   ```
   PORT=3000
   NODE_ENV=development
   ```

### Running the Application

#### Development Mode
To start the application in development mode with hot-reload:
```bash
npm run dev
```

#### Production Mode
To start the application in production mode:
```bash
npm start
```

## Project Structure
```
back-end/
├── src/
│   ├── server.ts     # Main server file
├── .env              # Environment variables
├── .gitignore        # Git ignore file
└── package.json      # Project dependencies and scripts
```

## Available Scripts
- `npm start`: Starts the server in production mode
- `npm run dev`: Starts the server in development mode with hot-reload
- `npm test`: Runs the test suite
- `npm run build`: Builds the application
