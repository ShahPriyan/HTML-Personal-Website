const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const profile = {
  name: 'Priyan Shah',
  headline: 'Computer Engineering Student | Embedded Systems and Applied Software',
  location: 'West Lafayette, IN',
  summary:
    'I am a Computer Engineering student at Purdue University building practical systems across embedded hardware and software. I focus on shipping reliable solutions, learning quickly in technical teams, and translating complex engineering work into outcomes that matter.',
  phone: '317-734-9283',
  email: 'shah899@purdue.edu',
  linkedin: 'https://www.linkedin.com/in/priyanshah12',
  website: 'https://priyanshah.vercel.app',
  resumePath: '/Priyan_Shah_Resume_2025_2026.pdf'
};

const education = [
  {
    school: 'Purdue University',
    location: 'West Lafayette, IN',
    degree: 'Bachelor of Science in Computer Engineering',
    date: 'Expected May 2027',
    highlights: [
      'Coursework includes Embedded Systems, Software Engineering, Computer Graphics, Data Structures and Algorithms, Artificial Intelligence, and Computer Security.'
    ]
  },
  {
    school: 'Harvard University Online',
    location: 'Remote',
    degree: 'TinyML3: Deploying TinyML',
    date: 'Completed 2026',
    highlights: [
      'Completed a deployment-focused TinyML program and applied the concepts on embedded hardware.'
    ]
  },
  {
    school: 'Hamilton Southeastern High School',
    location: 'Fishers, IN',
    degree: 'High School Honors Diploma, Summa Cum Laude',
    date: 'Graduated Jun 2023',
    highlights: ['Completed the PLTW Engineering Program.']
  }
];

const experiences = [
  {
    role: 'Software and Design Intern',
    company: 'Spry Brands Inc.',
    location: 'Anderson, IN',
    date: 'May 2025 - Aug 2025',
    bullets: [
      'Designed and developed 300+ customer-facing, fully customizable products using XML, PageFlex Studio, and backend tools including Liftoff.',
      'Streamlined production workflows by automating customization and data imports through licensed third-party software.',
      'Partnered with cross-functional teams to integrate backend systems with product templates for faster and more reliable updates.',
      'Implemented customizable website templates that improved marketing and sales outreach efficiency.'
    ],
    stack: ['XML', 'PageFlex Studio', 'Liftoff', 'Template Systems', 'Workflow Automation']
  },
  {
    role: 'Team Member',
    company: 'PCB Implementation Research and Design',
    location: 'West Lafayette, IN',
    date: 'Aug 2025 - Jan 2026',
    bullets: [
      'Learned and applied industry PCB tools including KiCAD and Altium to build practical design fundamentals.',
      'Used an organizational database to coordinate project ideas, implementation details, and team progress.',
      'Contributed to PCB implementation efforts supporting future chip design and prototyping initiatives.'
    ],
    stack: ['KiCAD', 'Altium', 'PCB Design', 'Collaboration', 'Hardware Prototyping']
  }
];

const projects = [
  {
    title: 'Tiny Machine Learning Project',
    date: 'Dec 2025 - Jan 2026',
    type: 'Embedded AI',
    summary:
      'Built and deployed an edge ML pipeline on microcontroller hardware for real-time sign language motion classification.',
    challenge:
      'Run accurate inference directly on constrained embedded hardware while processing live IMU streams.',
    impact:
      'Validated model behavior and improved reliability through iterative on-device testing.',
    bullets: [
      'Developed and deployed a TinyML model on an Arduino-based platform using onboard sensor libraries.',
      'Processed IMU sensor data and implemented an inference pipeline for real-time classification.',
      'Evaluated model performance with repeated physical test runs and tuning passes.'
    ],
    technologies: ['Arduino', 'TinyML', 'IMU Sensors', 'Embedded Inference', 'Model Validation']
  },
  {
    title: 'Rudimentary Game Boy System',
    date: 'Dec 2025',
    type: 'Digital Systems',
    summary:
      'Designed a simplified Game Boy-inspired architecture spanning input control, game state logic, and rendered output behavior.',
    challenge:
      'Coordinate timing, input responsiveness, and stable state transitions in a low-level system design context.',
    impact:
      'Strengthened practical understanding of digital logic and embedded-style software architecture.',
    bullets: [
      'Implemented core game logic, input handling, and output update behavior in a cohesive architecture.',
      'Built control logic for user events, state transitions, and rendering-style updates.',
      'Debugged timing and responsiveness issues through iterative testing.'
    ],
    technologies: ['Analog Circuit Design', 'Digital Logic', 'System Design', 'Debugging', 'Low-level Architecture']
  }
];

const skills = {
  programming: ['Python', 'Java', 'C', 'HTML', 'CSS', 'MATLAB'],
  hardware: ['Analog Circuit Design', 'Op-amps', '555 Timers', 'Breadboarding', 'Soldering', 'FPGA'],
  tools: ['CAD', 'Arduino', 'Oscilloscope', 'KiCAD', 'Altium', 'PageFlex Studio', 'XML'],
  languages: ['English (Fluent)', 'Spanish (Conversational)', 'Hindi (Conversational)', 'Gujarati (Conversational)']
};

const certificationsAndAwards = [
  'Harvard TinyML3: Deploying TinyML',
  'AP Scholar with Honors',
  '1st Poom Black Belt Taekwondo'
];

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Priyan Shah | Computer Engineering Portfolio',
    profile,
    education,
    experiences,
    projects,
    skills,
    certificationsAndAwards
  });
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: email,
        to: profile.email,
        subject: `Portfolio Contact from ${name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      });
    }

    res.json({ success: true, message: 'Message received. Thank you for reaching out.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.json({ success: true, message: 'Message received. Thank you for reaching out.' });
  }
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
