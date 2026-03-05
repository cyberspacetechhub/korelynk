require('dotenv').config();
const mongoose = require('mongoose');
const Tutorial = require('../models/Tutorial');

const tutorials = [
  {
    title: 'Introduction to HTML',
    slug: 'introduction-to-html',
    category: 'html',
    description: 'Learn the basics of HTML and create your first web page',
    content: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages.',
    codeExample: '<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>',
    duration: '15 min',
    order: 1,
    difficulty: 'Beginner',
    isPublished: true
  },
  {
    title: 'HTML Forms and Input',
    slug: 'html-forms-and-input',
    category: 'html',
    description: 'Master HTML forms and user input elements',
    content: 'HTML forms are used to collect user input with various input elements.',
    codeExample: '<form action="/submit" method="POST">\n  <input type="text" name="name" required>\n  <button type="submit">Submit</button>\n</form>',
    duration: '20 min',
    order: 2,
    difficulty: 'Beginner',
    isPublished: true
  },
  {
    title: 'CSS Basics',
    slug: 'css-basics',
    category: 'css',
    description: 'Learn CSS fundamentals and style your web pages',
    content: 'CSS is used to style and layout web pages with colors, fonts, and spacing.',
    codeExample: 'h1 {\n  color: blue;\n  font-size: 24px;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}',
    duration: '20 min',
    order: 1,
    difficulty: 'Beginner',
    isPublished: true
  },
  {
    title: 'Flexbox Layout',
    slug: 'flexbox-layout',
    category: 'css',
    description: 'Master CSS Flexbox for responsive layouts',
    content: 'Flexbox is a layout method for arranging items in rows or columns.',
    codeExample: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
    duration: '25 min',
    order: 2,
    difficulty: 'Intermediate',
    isPublished: true
  },
  {
    title: 'JavaScript Fundamentals',
    slug: 'javascript-fundamentals',
    category: 'javascript',
    description: 'Learn JavaScript basics and programming concepts',
    content: 'JavaScript adds interactivity to websites with variables and functions.',
    codeExample: 'let name = "John";\nconst age = 25;\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Alice"));',
    duration: '30 min',
    order: 1,
    difficulty: 'Beginner',
    isPublished: true
  },
  {
    title: 'Async JavaScript',
    slug: 'async-javascript',
    category: 'javascript',
    description: 'Master asynchronous JavaScript with Promises and async/await',
    content: 'Learn about Promises, async/await, and handling API calls.',
    codeExample: 'async function fetchData() {\n  const response = await fetch("https://api.example.com/data");\n  const data = await response.json();\n  return data;\n}',
    duration: '35 min',
    order: 2,
    difficulty: 'Intermediate',
    isPublished: true
  },
  {
    title: 'React Components',
    slug: 'react-components',
    category: 'react',
    description: 'Build reusable React components with props',
    content: 'React components are the building blocks of React applications.',
    codeExample: 'function Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\nexport default Welcome;',
    duration: '25 min',
    order: 1,
    difficulty: 'Beginner',
    isPublished: true
  },
  {
    title: 'React Hooks',
    slug: 'react-hooks',
    category: 'react',
    description: 'Learn React Hooks: useState, useEffect, and more',
    content: 'Hooks let you use state in functional components.',
    codeExample: 'const [count, setCount] = useState(0);\n\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);',
    duration: '30 min',
    order: 2,
    difficulty: 'Intermediate',
    isPublished: true
  },
  {
    title: 'Node.js Basics',
    slug: 'nodejs-basics',
    category: 'nodejs',
    description: 'Get started with Node.js and create your first server',
    content: 'Node.js is a JavaScript runtime for building server applications.',
    codeExample: 'const http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.end("Hello World!");\n});\n\nserver.listen(3000);',
    duration: '25 min',
    order: 1,
    difficulty: 'Beginner',
    isPublished: true
  },
  {
    title: 'Express.js Framework',
    slug: 'expressjs-framework',
    category: 'nodejs',
    description: 'Build REST APIs with Express.js framework',
    content: 'Express is a minimal Node.js web framework for building APIs.',
    codeExample: 'const express = require("express");\nconst app = express();\n\napp.get("/api/users", (req, res) => {\n  res.json({ users: ["Alice"] });\n});\n\napp.listen(3000);',
    duration: '35 min',
    order: 2,
    difficulty: 'Intermediate',
    isPublished: true
  },
  {
    title: 'Python Basics',
    slug: 'python-basics',
    category: 'python',
    description: 'Learn Python programming fundamentals',
    content: 'Python is a high-level language known for its simplicity.',
    codeExample: 'name = "Alice"\nage = 25\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Bob"))',
    duration: '25 min',
    order: 1,
    difficulty: 'Beginner',
    isPublished: true
  },
  {
    title: 'Python Functions',
    slug: 'python-functions',
    category: 'python',
    description: 'Master Python functions and code organization',
    content: 'Learn to create reusable functions in Python.',
    codeExample: 'def calculate_total(price, tax=0.1):\n    return price + (price * tax)\n\nprint(calculate_total(100))',
    duration: '30 min',
    order: 2,
    difficulty: 'Intermediate',
    isPublished: true
  },
  {
    title: 'MongoDB Introduction',
    slug: 'mongodb-introduction',
    category: 'mongodb',
    description: 'Learn MongoDB NoSQL database basics',
    content: 'MongoDB stores data in flexible JSON-like documents.',
    codeExample: 'db.users.insertOne({\n  name: "Alice",\n  email: "alice@example.com"\n});\n\ndb.users.find({ age: { $gte: 18 } });',
    duration: '30 min',
    order: 1,
    difficulty: 'Beginner',
    isPublished: true
  },
  {
    title: 'Mongoose ODM',
    slug: 'mongoose-odm',
    category: 'mongodb',
    description: 'Use Mongoose ODM with Node.js and MongoDB',
    content: 'Mongoose is an ODM library for MongoDB and Node.js.',
    codeExample: 'const userSchema = new mongoose.Schema({\n  name: String,\n  email: String\n});\n\nconst User = mongoose.model("User", userSchema);',
    duration: '35 min',
    order: 2,
    difficulty: 'Intermediate',
    isPublished: true
  },
  {
    title: 'Git Basics',
    slug: 'git-basics',
    category: 'git',
    description: 'Learn Git version control fundamentals',
    content: 'Git is a distributed version control system.',
    codeExample: 'git init\ngit add .\ngit commit -m "Initial commit"\ngit log',
    duration: '20 min',
    order: 1,
    difficulty: 'Beginner',
    isPublished: true
  },
  {
    title: 'Git Branching',
    slug: 'git-branching',
    category: 'git',
    description: 'Master Git branches and collaboration workflows',
    content: 'Learn to create branches and merge changes.',
    codeExample: 'git checkout -b feature-branch\ngit branch\ngit merge feature-branch\ngit push origin feature-branch',
    duration: '25 min',
    order: 2,
    difficulty: 'Intermediate',
    isPublished: true
  }
];

async function seedTutorials() {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('Connected to MongoDB');

    await Tutorial.deleteMany({});
    console.log('Cleared existing tutorials');

    const result = await Tutorial.insertMany(tutorials);
    console.log(`✅ Successfully seeded ${result.length} tutorials`);

    const stats = await Tutorial.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    console.log('\n📊 Tutorial Statistics:');
    stats.forEach(stat => {
      console.log(`  ${stat._id}: ${stat.count} tutorials`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding tutorials:', error);
    process.exit(1);
  }
}

seedTutorials();
