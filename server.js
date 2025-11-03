const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample data for courses
const courses = [
  {
    code: 'ECE 264',
    name: 'Advanced C Programming',
    semester: 'Spring 2024',
    description: 'Advanced programming concepts in C including data structures, algorithms, and memory management.',
    skills: ['C Programming', 'Data Structures', 'Memory Management', 'Debugging']
  },
  {
    code: 'ECE 270',
    name: 'Introduction to Digital System Design',
    semester: 'Fall 2023',
    description: 'Digital logic design, Boolean algebra, combinational and sequential circuits.',
    skills: ['Digital Logic', 'Verilog', 'FPGA', 'Circuit Design']
  },
  {
    code: 'ECE 368',
    name: 'Data Structures',
    semester: 'Fall 2024',
    description: 'Implementation and analysis of fundamental data structures and algorithms.',
    skills: ['Algorithms', 'Data Structures', 'C/C++', 'Algorithm Analysis']
  },
  {
    code: 'ECE 362',
    name: 'Microprocessor Systems',
    semester: 'Spring 2025',
    description: 'Microprocessor architecture, assembly language programming, and embedded systems.',
    skills: ['Assembly Language', 'Embedded Systems', 'Microcontrollers', 'Hardware Interface']
  },
  {
    code: 'ENGR 132',
    name: 'Transforming Ideas to Innovation II',
    semester: 'Spring 2023',
    description: 'Engineering design process, project management, and team collaboration.',
    skills: ['Design Thinking', 'Project Management', 'CAD', 'Team Leadership']
  },
  {
    code: 'MA 261',
    name: 'Multivariate Calculus',
    semester: 'Fall 2023',
    description: 'Vector calculus, partial derivatives, multiple integrals, and applications.',
    skills: ['Mathematical Analysis', 'Vector Calculus', 'Problem Solving', 'Mathematical Modeling']
  }
];

// Sample projects and experience data
const projects = [
  {
    id: 1,
    title: 'Analog Audio Equalizer',
    date: 'Aug 2024 – Dec 2024',
    description: 'Built a hardware-based audio equalizer using op-amps and 555 timer circuits for frequency-specific audio control.',
    features: [
      'Designed analog signal processing circuits for bass, mid, and treble control',
      'Implemented breadboard prototyping and component soldering',
      'Achieved stable audio output to connected speakers'
    ],
    technologies: ['Analog Circuits', 'Op-amps', '555 Timer'],
    icon: 'fas fa-volume-up'
  },
  {
    id: 2,
    title: 'Traffic Light Simulator',
    date: 'Aug 2024 – Dec 2024',
    description: 'Developed a timer-driven LED system that replicates real-world traffic light sequences.',
    features: [
      'Created timer-driven LED system using 555 timer IC',
      'Assembled and tested circuit on breadboard with LEDs and resistors',
      'Optimized timing logic and power distribution'
    ],
    technologies: ['Digital Circuits', '555 Timer', 'LED Control'],
    icon: 'fas fa-traffic-light'
  },
  {
    id: 3,
    title: 'PCB Design & Implementation',
    date: 'Aug 2025 – Dec 2025',
    description: 'Designed and implemented custom printed circuit boards for embedded systems applications.',
    features: [
      'Created schematic designs and PCB layouts using professional CAD tools',
      'Implemented multi-layer PCB designs with proper signal integrity',
      'Performed testing and validation of manufactured PCBs'
    ],
    technologies: ['PCB Design', 'Schematic Design', 'Hardware Testing'],
    icon: 'fas fa-microchip'
  }
];

const experiences = [
  {
    id: 1,
    title: 'Student Video Behavior Analysis Research',
    company: 'Purdue University Research Team',
    date: 'Apr 2025 – May 2025',
    description: [
      'Analyzed correlation between student video watch time and quiz performance',
      'Applied data analysis techniques to interpret viewing behavior patterns',
      'Collaborated on data organization, visualization, and research conclusions'
    ],
    skills: ['Data Analysis', 'Research', 'Statistical Analysis']
  },
  {
    id: 2,
    title: 'PCB Design & Implementation Specialist',
    company: 'Academic & Personal Projects',
    date: 'Aug 2025 – Dec 2025',
    description: [
      'Designed and implemented custom printed circuit boards for embedded systems',
      'Created comprehensive schematic designs and optimized PCB layouts',
      'Performed thorough testing and validation of manufactured circuit boards'
    ],
    skills: ['PCB Design', 'Circuit Analysis', 'Hardware Testing', 'Embedded Systems']
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Priyan Shah | Portfolio',
    projects: projects,
    experiences: experiences,
    courses: courses
  });
});

app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Contact form handling
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // Configure nodemailer (you'll need to set up environment variables)
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: 'shah899@purdue.edu',
      subject: `Portfolio Contact: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});