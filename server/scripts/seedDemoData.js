const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Import models
const User = require("../models/User");
const Profile = require("../models/Profile");
const Category = require("../models/Category");
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const RatingAndReview = require("../models/RatingandReview");
const CourseProgress = require("../models/CourseProgress");
const OTP = require("../models/OTP");

const { MONGODB_URL } = process.env;

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

// Clear existing data
const clearDatabase = async () => {
  try {
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Profile.deleteMany({});
    await Category.deleteMany({});
    await Course.deleteMany({});
    await Section.deleteMany({});
    await SubSection.deleteMany({});
    await RatingAndReview.deleteMany({});
    await CourseProgress.deleteMany({});
    await OTP.deleteMany({});
    console.log("✅ Database cleared");
  } catch (error) {
    console.error("❌ Error clearing database:", error);
  }
};

// Seed demo data
const seedDemoData = async () => {
  try {
    console.log("🌱 Seeding demo data...");

    // Create Profiles
    const profiles = await Profile.insertMany([
      {
        gender: "Male",
        dateOfBirth: "1990-01-15",
        about: "Experienced full-stack developer and instructor with 10+ years of experience.",
        contactNumber: 9876543210,
      },
      {
        gender: "Female",
        dateOfBirth: "1992-05-20",
        about: "Passionate about web development and teaching. Love to share knowledge.",
        contactNumber: 9876543211,
      },
      {
        gender: "Male",
        dateOfBirth: "1988-03-10",
        about: "Senior software engineer specializing in React and Node.js.",
        contactNumber: 9876543212,
      },
      {
        gender: "Male",
        dateOfBirth: "1995-07-25",
        about: "Student passionate about learning new technologies.",
        contactNumber: 9876543213,
      },
      {
        gender: "Female",
        dateOfBirth: "1997-11-30",
        about: "Aspiring developer learning web development.",
        contactNumber: 9876543214,
      },
      {
        gender: "Male",
        dateOfBirth: "1993-09-12",
        about: "Tech enthusiast and coding bootcamp graduate.",
        contactNumber: 9876543215,
      },
    ]);

    // Hash password for all users
    const hashedPassword = await bcrypt.hash("Password123", 10);

    // Create Users
    const users = await User.insertMany([
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@studynotion.com",
        password: hashedPassword,
        accountType: "Admin",
        approved: true,
        additionalDetails: profiles[0]._id,
        image: "",
      },
      {
        firstName: "John",
        lastName: "Doe",
        email: "instructor1@studynotion.com",
        password: hashedPassword,
        accountType: "Instructor",
        approved: true,
        additionalDetails: profiles[1]._id,
        image: "",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "instructor2@studynotion.com",
        password: hashedPassword,
        accountType: "Instructor",
        approved: true,
        additionalDetails: profiles[2]._id,
        image: "",
      },
      {
        firstName: "Alice",
        lastName: "Johnson",
        email: "student1@studynotion.com",
        password: hashedPassword,
        accountType: "Student",
        approved: true,
        additionalDetails: profiles[3]._id,
        image: "",
      },
      {
        firstName: "Bob",
        lastName: "Williams",
        email: "student2@studynotion.com",
        password: hashedPassword,
        accountType: "Student",
        approved: true,
        additionalDetails: profiles[4]._id,
        image: "",
      },
      {
        firstName: "Charlie",
        lastName: "Brown",
        email: "student3@studynotion.com",
        password: hashedPassword,
        accountType: "Student",
        approved: true,
        additionalDetails: profiles[5]._id,
        image: "",
      },
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create Categories
    const categories = await Category.insertMany([
      {
        name: "Web Development",
        description: "Learn modern web development technologies and frameworks",
      },
      {
        name: "Data Science",
        description: "Master data analysis, machine learning, and AI",
      },
      {
        name: "Mobile Development",
        description: "Build mobile apps for iOS and Android",
      },
      {
        name: "DevOps",
        description: "Learn deployment, CI/CD, and cloud technologies",
      },
      {
        name: "Programming Fundamentals",
        description: "Master the basics of programming and algorithms",
      },
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // Public sample MP4s for demo playback (instructor uploads use Cloudinary URLs instead)
    const sampleVideos = [
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    ];

    // Create SubSections
    const subsections = await SubSection.insertMany([
      // Course 1 subsections
      {
        title: "Introduction to React",
        timeDuration: "15:30",
        description: "Learn the basics of React and its core concepts",
        videoUrl: sampleVideos[0],
      },
      {
        title: "Components and Props",
        timeDuration: "20:45",
        description: "Understanding React components and props",
        videoUrl: sampleVideos[1],
      },
      {
        title: "State and Lifecycle",
        timeDuration: "25:10",
        description: "Managing state in React components",
        videoUrl: sampleVideos[2],
      },
      {
        title: "Hooks in React",
        timeDuration: "30:20",
        description: "Using React Hooks for functional components",
        videoUrl: sampleVideos[3],
      },
      // Course 2 subsections
      {
        title: "Node.js Basics",
        timeDuration: "18:00",
        description: "Introduction to Node.js and its ecosystem",
        videoUrl: sampleVideos[4],
      },
      {
        title: "Express.js Framework",
        timeDuration: "22:30",
        description: "Building RESTful APIs with Express",
        videoUrl: sampleVideos[5],
      },
      {
        title: "Database Integration",
        timeDuration: "28:15",
        description: "Connecting Node.js with MongoDB",
        videoUrl: sampleVideos[6],
      },
      // Course 3 subsections
      {
        title: "Python Basics",
        timeDuration: "12:00",
        description: "Introduction to Python programming",
        videoUrl: sampleVideos[7],
      },
      {
        title: "Data Structures",
        timeDuration: "35:00",
        description: "Understanding Python data structures",
        videoUrl: sampleVideos[8],
      },
      {
        title: "NumPy and Pandas",
        timeDuration: "40:00",
        description: "Working with data using NumPy and Pandas",
        videoUrl: sampleVideos[9],
      },
      // Course 4 subsections
      {
        title: "React Native Introduction",
        timeDuration: "20:00",
        description: "Getting started with React Native",
        videoUrl: sampleVideos[10],
      },
      {
        title: "Navigation",
        timeDuration: "25:00",
        description: "Implementing navigation in React Native",
        videoUrl: sampleVideos[11],
      },
      // Course 5 subsections
      {
        title: "Docker Basics",
        timeDuration: "15:00",
        description: "Introduction to Docker containers",
        videoUrl: sampleVideos[12],
      },
      {
        title: "Kubernetes",
        timeDuration: "30:00",
        description: "Container orchestration with Kubernetes",
        videoUrl: sampleVideos[13],
      },
    ]);

    console.log(`✅ Created ${subsections.length} subsections`);

    // Create Sections
    const sections = await Section.insertMany([
      {
        sectionName: "React Fundamentals",
        subSection: [subsections[0]._id, subsections[1]._id],
      },
      {
        sectionName: "Advanced React",
        subSection: [subsections[2]._id, subsections[3]._id],
      },
      {
        sectionName: "Backend Basics",
        subSection: [subsections[4]._id, subsections[5]._id],
      },
      {
        sectionName: "Database",
        subSection: [subsections[6]._id],
      },
      {
        sectionName: "Python Introduction",
        subSection: [subsections[7]._id, subsections[8]._id],
      },
      {
        sectionName: "Data Analysis",
        subSection: [subsections[9]._id],
      },
      {
        sectionName: "Getting Started",
        subSection: [subsections[10]._id],
      },
      {
        sectionName: "Advanced Topics",
        subSection: [subsections[11]._id],
      },
      {
        sectionName: "Containerization",
        subSection: [subsections[12]._id],
      },
      {
        sectionName: "Orchestration",
        subSection: [subsections[13]._id],
      },
    ]);

    console.log(`✅ Created ${sections.length} sections`);

    // Create Courses
    const courseThumbnails = {
      react: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1024&h=576&fit=crop",
      nodejs: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1024&h=576&fit=crop",
      python: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1024&h=576&fit=crop",
      reactNative: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1024&h=576&fit=crop",
      devops: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1024&h=576&fit=crop",
    };

    const courses = await Course.insertMany([
      {
        courseName: "Complete React Development Course",
        courseDescription:
          "Master React from scratch. Learn hooks, context, routing, and build real-world projects.",
        instructor: users[1]._id, // instructor1
        whatYouWillLearn:
          "React fundamentals, Hooks, Context API, React Router, State management, Component lifecycle",
        courseContent: [sections[0]._id, sections[1]._id],
        price: 2999,
        thumbnail: courseThumbnails.react,
        tag: ["React", "JavaScript", "Frontend", "Web Development"],
        category: categories[0]._id,
        studentsEnroled: [users[3]._id, users[4]._id, users[5]._id],
        instructions: [
          "Basic knowledge of JavaScript",
          "HTML and CSS fundamentals",
          "A computer with internet connection",
        ],
        status: "Published",
      },
      {
        courseName: "Node.js and Express Masterclass",
        courseDescription:
          "Build scalable backend applications with Node.js and Express. Learn REST APIs, authentication, and more.",
        instructor: users[2]._id, // instructor2
        whatYouWillLearn:
          "Node.js basics, Express framework, RESTful APIs, Authentication, Database integration, Error handling",
        courseContent: [sections[2]._id, sections[3]._id],
        price: 3499,
        thumbnail: courseThumbnails.nodejs,
        tag: ["Node.js", "Express", "Backend", "API"],
        category: categories[0]._id,
        studentsEnroled: [users[3]._id, users[4]._id],
        instructions: [
          "JavaScript fundamentals",
          "Basic understanding of HTTP",
          "Familiarity with command line",
        ],
        status: "Published",
      },
      {
        courseName: "Python for Data Science",
        courseDescription:
          "Learn Python programming and data analysis with NumPy, Pandas, and visualization libraries.",
        instructor: users[1]._id, // instructor1
        whatYouWillLearn:
          "Python basics, Data structures, NumPy, Pandas, Data visualization, Data analysis",
        courseContent: [sections[4]._id, sections[5]._id],
        price: 3999,
        thumbnail: courseThumbnails.python,
        tag: ["Python", "Data Science", "NumPy", "Pandas"],
        category: categories[1]._id,
        studentsEnroled: [users[4]._id, users[5]._id],
        instructions: [
          "No prior programming experience required",
          "Basic math knowledge helpful",
        ],
        status: "Published",
      },
      {
        courseName: "React Native Mobile App Development",
        courseDescription:
          "Build cross-platform mobile apps with React Native. Learn navigation, state management, and deployment.",
        instructor: users[2]._id, // instructor2
        whatYouWillLearn:
          "React Native basics, Navigation, State management, API integration, App deployment",
        courseContent: [sections[6]._id, sections[7]._id],
        price: 4499,
        thumbnail: courseThumbnails.reactNative,
        tag: ["React Native", "Mobile", "iOS", "Android"],
        category: categories[2]._id,
        studentsEnroled: [users[3]._id],
        instructions: [
          "React knowledge recommended",
          "JavaScript fundamentals",
        ],
        status: "Published",
      },
      {
        courseName: "DevOps with Docker and Kubernetes",
        courseDescription:
          "Master containerization and orchestration. Learn Docker, Kubernetes, and CI/CD pipelines.",
        instructor: users[1]._id, // instructor1
        whatYouWillLearn:
          "Docker containers, Kubernetes orchestration, CI/CD, Cloud deployment, Monitoring",
        courseContent: [sections[8]._id, sections[9]._id],
        price: 4999,
        thumbnail: courseThumbnails.devops,
        tag: ["Docker", "Kubernetes", "DevOps", "CI/CD"],
        category: categories[3]._id,
        studentsEnroled: [users[5]._id],
        instructions: [
          "Linux command line basics",
          "Understanding of software development",
        ],
        status: "Published",
      },
    ]);

    console.log(`✅ Created ${courses.length} courses`);

    // Update categories with courses
    await Category.updateOne(
      { _id: categories[0]._id },
      { $set: { courses: [courses[0]._id, courses[1]._id] } }
    );
    await Category.updateOne(
      { _id: categories[1]._id },
      { $set: { courses: [courses[2]._id] } }
    );
    await Category.updateOne(
      { _id: categories[2]._id },
      { $set: { courses: [courses[3]._id] } }
    );
    await Category.updateOne(
      { _id: categories[3]._id },
      { $set: { courses: [courses[4]._id] } }
    );

    // Update instructors with their courses
    await User.updateOne(
      { _id: users[1]._id },
      { $set: { courses: [courses[0]._id, courses[2]._id, courses[4]._id] } }
    );
    await User.updateOne(
      { _id: users[2]._id },
      { $set: { courses: [courses[1]._id, courses[3]._id] } }
    );

    // Create Ratings and Reviews
    const ratings = await RatingAndReview.insertMany([
      {
        user: users[3]._id,
        rating: 5,
        review: "Excellent course! Very well explained and easy to follow.",
        course: courses[0]._id,
      },
      {
        user: users[4]._id,
        rating: 4,
        review: "Great content, but could use more examples.",
        course: courses[0]._id,
      },
      {
        user: users[5]._id,
        rating: 5,
        review: "Best React course I've taken. Highly recommended!",
        course: courses[0]._id,
      },
      {
        user: users[3]._id,
        rating: 4,
        review: "Good introduction to Node.js and Express.",
        course: courses[1]._id,
      },
      {
        user: users[4]._id,
        rating: 5,
        review: "Comprehensive backend course. Learned a lot!",
        course: courses[1]._id,
      },
      {
        user: users[4]._id,
        rating: 5,
        review: "Perfect for beginners in data science.",
        course: courses[2]._id,
      },
      {
        user: users[5]._id,
        rating: 4,
        review: "Good course, but needs more advanced topics.",
        course: courses[2]._id,
      },
      {
        user: users[3]._id,
        rating: 5,
        review: "Amazing React Native course!",
        course: courses[3]._id,
      },
      {
        user: users[5]._id,
        rating: 4,
        review: "Great DevOps course with practical examples.",
        course: courses[4]._id,
      },
    ]);

    console.log(`✅ Created ${ratings.length} ratings and reviews`);

    // Update courses with ratings
    for (const rating of ratings) {
      await Course.updateOne(
        { _id: rating.course },
        { $push: { ratingAndReviews: rating._id } }
      );
    }

    // Create Course Progress
    const courseProgress = await CourseProgress.insertMany([
      {
        courseID: courses[0]._id,
        userId: users[3]._id,
        completedVideos: [subsections[0]._id, subsections[1]._id],
      },
      {
        courseID: courses[0]._id,
        userId: users[4]._id,
        completedVideos: [subsections[0]._id],
      },
      {
        courseID: courses[1]._id,
        userId: users[3]._id,
        completedVideos: [subsections[4]._id],
      },
      {
        courseID: courses[2]._id,
        userId: users[4]._id,
        completedVideos: [subsections[7]._id, subsections[8]._id],
      },
    ]);

    console.log(`✅ Created ${courseProgress.length} course progress records`);

    // Update users with course progress
    await User.updateOne(
      { _id: users[3]._id },
      {
        $set: {
          courseProgress: [courseProgress[0]._id, courseProgress[2]._id],
        },
      }
    );
    await User.updateOne(
      { _id: users[4]._id },
      {
        $set: {
          courseProgress: [courseProgress[1]._id, courseProgress[3]._id],
        },
      }
    );

    // Create some OTP entries for testing
    const otps = await OTP.insertMany([
      {
        email: "test@studynotion.com",
        otp: "123456",
      },
      {
        email: "demo@studynotion.com",
        otp: "654321",
      },
    ]);

    console.log(`✅ Created ${otps.length} OTP entries for testing`);

    console.log("\n" + "=".repeat(60));
    console.log("✅ DEMO DATA SEEDED SUCCESSFULLY!");
    console.log("=".repeat(60));
    console.log("\n📋 Login Credentials:");
    console.log("─".repeat(60));
    console.log("Admin:");
    console.log("  Email: admin@studynotion.com");
    console.log("  Password: Password123");
    console.log("\nInstructors:");
    console.log("  Email: instructor1@studynotion.com");
    console.log("  Password: Password123");
    console.log("  Email: instructor2@studynotion.com");
    console.log("  Password: Password123");
    console.log("\nStudents:");
    console.log("  Email: student1@studynotion.com");
    console.log("  Password: Password123");
    console.log("  Email: student2@studynotion.com");
    console.log("  Password: Password123");
    console.log("  Email: student3@studynotion.com");
    console.log("  Password: Password123");
    console.log("─".repeat(60));
    console.log("\n📊 Summary:");
    console.log(`  - ${users.length} Users`);
    console.log(`  - ${categories.length} Categories`);
    console.log(`  - ${courses.length} Courses`);
    console.log(`  - ${sections.length} Sections`);
    console.log(`  - ${subsections.length} SubSections`);
    console.log(`  - ${ratings.length} Ratings & Reviews`);
    console.log(`  - ${courseProgress.length} Course Progress Records`);
    console.log("=".repeat(60) + "\n");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    throw error;
  }
};

// Main function
const main = async () => {
  await connectDB();
  await clearDatabase();
  await seedDemoData();
  await mongoose.connection.close();
  console.log("✅ Database connection closed");
  process.exit(0);
};

// Run the script
main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exit(1);
});
