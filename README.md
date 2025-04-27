📋 Task Tracker App
A full-stack web application where users can:
- Sign up and log in securely
- Create up to 4 projects
- Add, edit, delete tasks inside projects
- Track tasks with statuses (Pending, In Progress, Completed)
- Update their profile (name, country)

⚙️ Tech Stack
- Frontend: React.js, TailwindCSS, Axios, React Router
- Backend: Node.js, Express.js, MongoDB Atlas, Mongoose
- Authentication: JWT (JSON Web Token)
- Deployment: Render (Backend) + Vercel (Frontend)

🚀 How to Run Locally
Follow these steps to run the project on your machine:

1. Clone the Repository
git clone https://github.com/yourusername/task-tracker-app.git
cd task-tracker

2. Setup Backend (Express API)
cd backend
npm install
Create a .env file inside the /backend folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000

3. Configure API calls:

Inside /frontend/src/services/api.js, make sure the baseURL is set to:
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

4. Start the backend server:
npm run dev
or
npm start
The backend will run at:
http://localhost:5000

5. Setup Frontend (React App)
cd ../frontend
npm install
- Start the React app:
npm start
The frontend will run at:

http://localhost:3000

✅ Now you can test everything locally by opening:
Frontend ➔ http://localhost:3000
Backend APIs ➔ http://localhost:5000/api


-Deployment
Ive deployed the app on Vercel and Render.
Frontend deployed on Vercel: https://task-tracker-eta-mauve.vercel.app
Backend deployed on Render: https://task-tracker-8hs5.onrender.com


