# StudyNotion

Full-stack EdTech platform for online courses — React frontend, Node.js/Express backend, and MongoDB.

## Tech Stack

| Layer | Stack |
|-------|--------|
| Frontend | React, Redux Toolkit, Tailwind CSS, React Router |
| Backend | Node.js, Express, MongoDB (Mongoose) |
| Services | Cloudinary, Razorpay, Nodemailer (Gmail SMTP) |

## Prerequisites

- [Node.js](https://nodejs.org/) v18+ (v20+ recommended)
- [npm](https://www.npmjs.com/)
- MongoDB ([Atlas](https://www.mongodb.com/cloud/atlas) free tier or local MongoDB)

## Project Structure

```
StudyNotion-EdTech-Web/
├── src/                 # React frontend
├── server/              # Express API
│   ├── .env.example     # Backend env template
│   └── scripts/         # Seed script
├── .env                 # Frontend env (create this)
└── package.json         # Client scripts + `npm run dev`
```

## Local Setup

### 1. Clone and install dependencies

```bash
git clone https://github.com/Goutamsahu23/StudyNotion-EdTech-Web.git
cd StudyNotion-EdTech-Web

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Environment variables

#### Frontend — create `.env` in the project root

```env
REACT_APP_API_URL=http://localhost:4000/api/v1
```

#### Backend — create `server/.env`

```bash
cd server
cp .env.example .env
```

Fill in `server/.env`:

```env
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/StudyNotionDB
PORT=4000
JWT_SECRET=your_long_random_secret

# Email (Gmail App Password recommended)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your@gmail.com
MAIL_PASS=your_app_password

# Cloudinary (course thumbnails, videos, profile images)
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
FOLDER_NAME=StudyNotion

# Razorpay test keys (payments)
RAZORPAY_KEY=rzp_test_xxxxxxxx
RAZORPAY_SECRET=your_razorpay_secret

# Optional: allow OTP 123456 for signup testing (remove in production)
TEST_OTP_BYPASS=123456
```

| Variable | Required for | Notes |
|----------|----------------|-------|
| `MONGODB_URL` | Server start | Required |
| `JWT_SECRET` | Login / auth | Any long random string |
| `MAIL_*` | Signup OTP emails | Optional if using `TEST_OTP_BYPASS` |
| `CLOUD_NAME`, `API_KEY`, `API_SECRET`, `FOLDER_NAME` | Media uploads | Required for instructor course creation |
| `RAZORPAY_*` | Payments | Test keys from Razorpay dashboard |
| `TEST_OTP_BYPASS` | Dev signup | Set to `123456` to bypass email OTP |

### 3. Seed the database (recommended)

The seed script **deletes all existing data** in the connected database, then inserts demo users, courses, categories, and reviews.

```bash
cd server
npm run seed
```

Ensure `MONGODB_URL` is set in `server/.env` before running.

### 4. Run the app

**Option A — Frontend + backend together (recommended)**

From the project root:

```bash
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000](http://localhost:4000)

**Option B — Separate terminals**

```bash
# Terminal 1 — backend
cd server
npm run dev

# Terminal 2 — frontend (from project root)
npm start
```

> Run only **one** backend instance. Starting the server twice causes `EADDRINUSE` on port 4000.

## Demo Login Credentials

After seeding, all users share the password **`Password123`**.

| Role | Email |
|------|--------|
| Admin | `admin@studynotion.com` |
| Instructor | `instructor1@studynotion.com` |
| Instructor | `instructor2@studynotion.com` |
| Student | `student1@studynotion.com` |
| Student | `student2@studynotion.com` |
| Student | `student3@studynotion.com` |

## Signup Testing (without email)

If email is not configured:

1. Set `TEST_OTP_BYPASS=123456` in `server/.env`
2. Sign up and enter **`123456`** on the verify-email page

OTP is still generated normally; `123456` is accepted as a dev bypass only.

## Useful Commands

| Command | Location | Description |
|---------|----------|-------------|
| `npm run dev` | Root | Start client + server |
| `npm start` | Root | Frontend only |
| `npm run build` | Root | Production build |
| `npm run dev` | `server/` | Backend with nodemon |
| `npm run seed` | `server/` | Seed demo data |
| `npm start` | `server/` | Backend (no nodemon) |

## Troubleshooting

### `Network Error` in the browser

- Backend is not running → start `npm run dev` or `cd server && npm run dev`
- Restart the frontend after changing root `.env`

### `EADDRINUSE: port 4000`

Another process is using port 4000:

```powershell
netstat -ano | findstr :4000
taskkill /PID <pid> /F
```

Then restart the dev server.

### OTP email not received

- Use Gmail **App Password** (not your normal password)
- Or use `TEST_OTP_BYPASS=123456` for local testing

### Payments not working

- Add Razorpay **test** keys to `server/.env`
- For checkout in the browser, the Razorpay Key ID must be available to the frontend (Create React App only exposes `REACT_APP_*` variables)

## API Health Check

```text
GET http://localhost:4000/
GET http://localhost:4000/api/v1/course/getAllCourses
```

## License

ISC
