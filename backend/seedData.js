const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const Instructor = require('./models/Instructor');
const Course = require('./models/Course');
const Student = require('./models/Student');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedInstructors = async () => {
  const instructors = [
    {
      fullName: 'John Smith',
      email: 'john.smith@korelynk.com',
      password: 'password123',
      phone: '+234-801-234-5678',
      bio: 'Full-stack developer with 8+ years experience in web development and teaching.',
      expertise: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      isEmailVerified: true,
      isApproved: true,
      isActive: true
    },
    {
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@korelynk.com',
      password: 'password123',
      phone: '+234-802-345-6789',
      bio: 'Mobile app developer specializing in React Native and Flutter.',
      expertise: ['React Native', 'Flutter', 'Mobile Development', 'UI/UX'],
      isEmailVerified: true,
      isApproved: true,
      isActive: true
    },
    {
      fullName: 'Michael Brown',
      email: 'michael.brown@korelynk.com',
      password: 'password123',
      phone: '+234-803-456-7890',
      bio: 'Backend specialist with expertise in Node.js, Python, and cloud technologies.',
      expertise: ['Node.js', 'Python', 'AWS', 'Docker', 'Microservices'],
      isEmailVerified: true,
      isApproved: true,
      isActive: true
    }
  ];

  try {
    await Instructor.deleteMany({});
    const createdInstructors = await Instructor.insertMany(instructors);
    console.log('Instructors seeded successfully');
    return createdInstructors;
  } catch (error) {
    console.error('Error seeding instructors:', error);
    return [];
  }
};

const seedCourses = async (instructors) => {
  if (instructors.length === 0) {
    console.log('No instructors available for courses');
    return;
  }

  const courses = [
    {
      title: 'Complete Web Development Bootcamp',
      description: 'Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
      category: 'Web Development',
      level: 'Beginner',
      duration: '12 weeks',
      price: 150000,
      instructor: instructors[0]._id,
      maxStudents: 30,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-04-26'),
      meetingSchedule: 'Mondays & Wednesdays 7-9 PM',
      prerequisites: ['Basic computer skills', 'Internet connection'],
      learningOutcomes: [
        'Build responsive websites with HTML, CSS, and JavaScript',
        'Create dynamic web applications with React',
        'Develop backend APIs with Node.js and Express',
        'Work with databases using MongoDB'
      ],
      curriculum: [
        { week: 1, title: 'HTML & CSS Fundamentals', topics: ['HTML structure', 'CSS styling', 'Responsive design'] },
        { week: 2, title: 'JavaScript Basics', topics: ['Variables and functions', 'DOM manipulation', 'Events'] },
        { week: 3, title: 'React Introduction', topics: ['Components', 'Props and State', 'Hooks'] }
      ],
      featured: true,
      isActive: true
    },
    {
      title: 'Mobile App Development with React Native',
      description: 'Build cross-platform mobile applications using React Native. Learn to create apps for both iOS and Android.',
      category: 'Mobile Development',
      level: 'Intermediate',
      duration: '10 weeks',
      price: 120000,
      instructor: instructors[1]._id,
      maxStudents: 25,
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-04-26'),
      meetingSchedule: 'Tuesdays & Thursdays 6-8 PM',
      prerequisites: ['JavaScript knowledge', 'Basic React understanding'],
      learningOutcomes: [
        'Build native mobile apps with React Native',
        'Handle navigation and state management',
        'Integrate with device APIs',
        'Deploy apps to app stores'
      ],
      curriculum: [
        { week: 1, title: 'React Native Setup', topics: ['Environment setup', 'First app', 'Components'] },
        { week: 2, title: 'Navigation', topics: ['Stack navigation', 'Tab navigation', 'Drawer navigation'] }
      ],
      featured: true,
      isActive: true
    },
    {
      title: 'Backend Development with Node.js',
      description: 'Master backend development with Node.js, Express, and MongoDB. Learn to build scalable APIs and microservices.',
      category: 'Backend Development',
      level: 'Intermediate',
      duration: '8 weeks',
      price: 100000,
      instructor: instructors[2]._id,
      maxStudents: 20,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-04-26'),
      meetingSchedule: 'Saturdays 10 AM - 12 PM',
      prerequisites: ['JavaScript proficiency', 'Basic web development knowledge'],
      learningOutcomes: [
        'Build RESTful APIs with Express.js',
        'Work with databases and ORMs',
        'Implement authentication and authorization',
        'Deploy applications to cloud platforms'
      ],
      curriculum: [
        { week: 1, title: 'Node.js Fundamentals', topics: ['Node.js basics', 'NPM', 'Modules'] },
        { week: 2, title: 'Express.js', topics: ['Routing', 'Middleware', 'Error handling'] }
      ],
      featured: false,
      isActive: true
    },
    {
      title: 'Database Design and Management',
      description: 'Learn database design principles, SQL, and NoSQL databases. Master MongoDB and PostgreSQL.',
      category: 'Database',
      level: 'Beginner',
      duration: '6 weeks',
      price: 80000,
      instructor: instructors[2]._id,
      maxStudents: 35,
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-04-26'),
      meetingSchedule: 'Fridays 5-7 PM',
      prerequisites: ['Basic programming knowledge'],
      learningOutcomes: [
        'Design efficient database schemas',
        'Write complex SQL queries',
        'Work with NoSQL databases',
        'Optimize database performance'
      ],
      curriculum: [
        { week: 1, title: 'Database Fundamentals', topics: ['Database concepts', 'Relational vs NoSQL'] },
        { week: 2, title: 'SQL Basics', topics: ['SELECT queries', 'JOINs', 'Aggregations'] }
      ],
      featured: false,
      isActive: true
    },
    {
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the principles of user interface and user experience design. Master Figma and design thinking.',
      category: 'UI/UX Design',
      level: 'Beginner',
      duration: '8 weeks',
      price: 90000,
      instructor: instructors[1]._id,
      maxStudents: 30,
      startDate: new Date('2024-02-20'),
      endDate: new Date('2024-04-16'),
      meetingSchedule: 'Wednesdays & Fridays 4-6 PM',
      prerequisites: ['Creative mindset', 'Basic computer skills'],
      learningOutcomes: [
        'Understand design principles and theory',
        'Create wireframes and prototypes',
        'Design user-centered interfaces',
        'Use professional design tools'
      ],
      curriculum: [
        { week: 1, title: 'Design Principles', topics: ['Color theory', 'Typography', 'Layout'] },
        { week: 2, title: 'User Research', topics: ['User personas', 'User journey mapping'] }
      ],
      featured: false,
      isActive: true
    }
  ];

  try {
    await Course.deleteMany({});
    await Course.insertMany(courses);
    console.log('Courses seeded successfully');
  } catch (error) {
    console.error('Error seeding courses:', error);
  }
};

const seedStudents = async () => {
  const students = [
    {
      fullName: 'Alice Johnson',
      email: 'alice@example.com',
      password: 'password123',
      phone: '+234-901-234-5678',
      preferences: {
        interests: ['Web Development', 'Mobile Development'],
        skillLevel: 'Beginner',
        learningGoals: ['Build websites', 'Learn programming'],
        preferredSchedule: 'Evening'
      },
      isEmailVerified: true,
      isActive: true
    },
    {
      fullName: 'Bob Smith',
      email: 'bob@example.com',
      password: 'password123',
      phone: '+234-902-345-6789',
      preferences: {
        interests: ['Backend Development', 'Database'],
        skillLevel: 'Intermediate',
        learningGoals: ['Master APIs', 'Database design'],
        preferredSchedule: 'Weekend'
      },
      isEmailVerified: true,
      isActive: true
    }
  ];

  try {
    await Student.deleteMany({});
    const createdStudents = await Student.insertMany(students);
    console.log('Students seeded successfully');
    return createdStudents;
  } catch (error) {
    console.error('Error seeding students:', error);
    return [];
  }
};

const seedData = async () => {
  await connectDB();
  
  console.log('Starting data seeding...');
  const instructors = await seedInstructors();
  const students = await seedStudents();
  await seedCourses(instructors);
  
  console.log('Data seeding completed!');
  process.exit(0);
};

seedData();