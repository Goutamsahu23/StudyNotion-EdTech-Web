# Demo Data Seeding Script

This script populates the database with comprehensive demo data for testing and development.

## Usage

```bash
cd server
npm run seed
```

## What Gets Created

The script creates:

- **6 Users**:
  - 1 Admin user
  - 2 Instructor users
  - 3 Student users

- **5 Categories**:
  - Web Development
  - Data Science
  - Mobile Development
  - DevOps
  - Programming Fundamentals

- **5 Courses**:
  - Complete React Development Course
  - Node.js and Express Masterclass
  - Python for Data Science
  - React Native Mobile App Development
  - DevOps with Docker and Kubernetes

- **10 Sections** and **14 SubSections** with video content

- **9 Ratings and Reviews**

- **4 Course Progress Records**

## Login Credentials

All users have the same password: `Password123`

### Admin
- Email: `admin@studynotion.com`
- Password: `Password123`

### Instructors
- Email: `instructor1@studynotion.com`
- Password: `Password123`
- Email: `instructor2@studynotion.com`
- Password: `Password123`

### Students
- Email: `student1@studynotion.com`
- Password: `Password123`
- Email: `student2@studynotion.com`
- Password: `Password123`
- Email: `student3@studynotion.com`
- Password: `Password123`

## Important Notes

⚠️ **Warning**: This script will **DELETE ALL EXISTING DATA** in the database before seeding new data. Use with caution!

Make sure your `.env` file has the correct `MONGODB_URL` configured before running the script.
