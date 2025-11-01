# Todo Application (Fullstack)
## Structure
- backend: Node.js + Express + MongoDB (Mongoose)
- frontend: React (Create React App style)

## Quick setup
1. Backend
   - cd backend
   - copy .env.example to .env and set MONGODB_URI
   - npm install
   - npm run start

2. Frontend
   - cd frontend
   - npm install
   - npm start

Backend runs on port 5000 by default. Frontend expects API at http://localhost:5000/api (you can set REACT_APP_API_URL).

## Notes
This project is packaged so you can unzip and submit. Make sure to `npm install` in both folders and have MongoDB running.
