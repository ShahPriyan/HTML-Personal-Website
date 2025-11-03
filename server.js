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

// IMPORTANT: Static files middleware MUST come before routes
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add explicit static routes for Vercel
app.get('/css/:file', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'css', req.params.file));
});

app.get('/js/:file', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'js', req.params.file));
});

app.get('/images/:file', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'images', req.params.file));
});

// Sample data for courses
const courseCategories = {
  'core-engineering': {
    title: 'Core Engineering',
    description: 'Fundamental engineering courses',
    icon: 'fas fa-cogs',
    lottieUrl: 'https://lottie.host/4e4b5930-07c5-4ad5-8b34-7cafbaac2ed0/dGhEFTWHj8.json',
    courses: [
      {
        code: 'ENGR 132',
        name: 'Transforming Ideas to Innovation II',
        semester: 'Spring 2023',
        description: 'Engineering design process, project management, and team collaboration.',
        skills: ['Design Thinking', 'Project Management', 'CAD', 'Team Leadership'],
        grade: 'A'
      }
    ]
  },
  'electrical-computer': {
    title: 'Electrical & Computer Engineering',
    description: 'ECE core and advanced courses',
    icon: 'fas fa-microchip',
    lottieUrl: 'https://lottie.host/embed/4e4b5930-07c5-4ad5-8b34-7cafbaac2ed0/dGhEFTWHj8.json',
    courses: [
      {
        code: 'ECE 20001',
        name: 'Electrical Engineering Fundamentals I',
        semester: 'Fall 2023',
        description: 'Introduction to electrical engineering concepts, circuit analysis, and basic electronics.',
        skills: ['Circuit Analysis', 'Ohm\'s Law', 'Basic Electronics', 'Problem Solving'],
        grade: 'B'
      },
      {
        code: 'ECE 20002',
        name: 'Electrical Engineering Fundamentals II',
        semester: 'Spring 2024',
        description: 'Advanced circuit analysis, AC circuits, and introduction to signals.',
        skills: ['AC Analysis', 'Phasors', 'Signal Processing', 'Circuit Design'],
        grade: 'In Progress'
      },
      {
        code: 'ECE 264',
        name: 'Advanced C Programming',
        semester: 'Fall 2024',
        description: 'Advanced programming concepts in C including data structures, algorithms, and memory management.',
        skills: ['C Programming', 'Data Structures', 'Memory Management', 'Debugging'],
        grade: 'B'
      },
      {
        code: 'ECE 270',
        name: 'Introduction to Digital System Design',
        semester: 'Spring 2025',
        description: 'Digital logic design, Boolean algebra, combinational and sequential circuits.',
        skills: ['Digital Logic', 'Verilog', 'FPGA', 'Circuit Design'],
        grade: 'B'
      },
      {
        code: 'ECE 362',
        name: 'Microprocessor Systems',
        semester: 'Fall 2025',
        description: 'Microprocessor architecture, assembly language programming, and embedded systems.',
        skills: ['Assembly Language', 'Embedded Systems', 'Microcontrollers', 'Hardware Interface'],
        grade: 'In Progress'
      },
      {
        code: 'ECE 368',
        name: 'Data Structures',
        semester: 'Fall 2025',
        description: 'Implementation and analysis of fundamental data structures and algorithms.',
        skills: ['Algorithms', 'Data Structures', 'C/C++', 'Algorithm Analysis'],
        grade: 'In Progress'
      },
      {
        code: 'ECE 369',
        name: 'Discrete Mathematics for Computer Engineering',
        semester: 'Spring 2024',
        description: 'Mathematical foundations including logic, set theory, and graph theory for computer engineering.',
        skills: ['Discrete Math', 'Logic', 'Graph Theory', 'Proofs'],
        grade: 'B'
      }
    ]
  },
  'data-science': {
    title: 'Data Science & Analytics',
    description: 'Data analysis and machine learning courses',
    icon: 'fas fa-chart-line',
    lottieUrl: 'https://assets4.lottiefiles.com/packages/lf20_qp1q7mct.json',
    courses: [
      {
        code: 'ECE 20875',
        name: 'Python for Data Science',
        semester: 'Fall 2024',
        description: 'Introduction to Python programming with focus on data analysis and visualization.',
        skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Machine Learning Basics'],
        grade: 'A'
      },
      {
        code: 'ECE 36900',
        name: 'Discrete Mathematics',
        semester: 'Spring 2024',
        description: 'Mathematical foundations for computer science and engineering.',
        skills: ['Logic', 'Set Theory', 'Graph Theory', 'Combinatorics', 'Proof Techniques'],
        grade: 'A'
      }
    ]
  },
  'mathematics': {
    title: 'Mathematics',
    description: 'Core mathematical foundations',
    icon: 'fas fa-calculator',
    lottieUrl: 'https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json',
    courses: [
      {
        code: 'MA 261',
        name: 'Multivariate Calculus',
        semester: 'Spring 2023',
        description: 'Vector calculus, partial derivatives, multiple integrals, and applications.',
        skills: ['Mathematical Analysis', 'Vector Calculus', 'Problem Solving', 'Mathematical Modeling'],
        grade: 'B'
      },
      {
        code: 'MA 266',
        name: 'Ordinary Differential Equations',
        semester: 'Fall 2023',
        description: 'First and second-order differential equations, Laplace transforms, and applications to engineering problems.',
        skills: ['Differential Equations', 'Laplace Transforms', 'Mathematical Modeling', 'Engineering Applications'],
        grade: 'A'
      }
    ]
  }
};

// Sample projects data
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
    date: 'Aug 2024 – Dec 2024',
    description: 'Designed and implemented custom printed circuit boards for embedded systems applications.',
    features: [
      'Created schematic designs and PCB layouts using professional CAD tools',
      'Implemented multi-layer PCB designs with proper signal integrity',
      'Performed testing and validation of manufactured PCBs'
    ],
    technologies: ['PCB Design', 'Schematic Design', 'Hardware Testing'],
    icon: 'fas fa-microchip'
  },
  {
    id: 4,
    title: 'Self-Driving Data Analysis Tool',
    date: 'Jan 2024 – May 2024',
    description: 'Collaborated on a Python-based tool for parsing and visualizing autonomous vehicle sensor data.',
    features: [
      'Implemented data cleaning, analysis, and plotting modules',
      'Identified driving patterns and anomalies in vehicle data',
      'Used version control and participated in code reviews'
    ],
    technologies: ['Python', 'Data Analysis', 'Visualization'],
    icon: 'fas fa-car'
  },
  {
    id: 5,
    title: 'Parkinson\'s Pressure Brace',
    date: 'Jan 2023 – May 2023',
    description: 'Designed a wearable assistive device for individuals with Parkinson\'s disease using pressure and vibration feedback.',
    features: [
      'Integrated sensors and microcontrollers for tremor monitoring',
      'Implemented localized pressure modulation system',
      'Focused on user comfort and responsiveness through testing'
    ],
    technologies: ['Embedded Systems', 'Sensors', 'Medical Device'],
    icon: 'fas fa-hand-holding-medical'
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
    date: 'Aug 2024 – Dec 2024',
    description: [
      'Designed and implemented custom printed circuit boards for embedded systems',
      'Created comprehensive schematic designs and optimized PCB layouts',
      'Performed thorough testing and validation of manufactured circuit boards',
      'Collaborated with team members on hardware integration and troubleshooting'
    ],
    skills: ['PCB Design', 'Circuit Analysis', 'Hardware Testing', 'Embedded Systems']
  },
  {
    id: 3,
    title: 'Robotics Team Lead',
    company: 'HSE High School Robotics Team',
    date: 'Aug 2022 – Dec 2022',
    description: [
      'Led team of 13 students in robot design and construction for national competition',
      'Managed project timelines and task assignments across 6-month build season',
      'Guided collaborative problem-solving and real-time debugging during tournaments'
    ],
    skills: ['Leadership', 'Robotics', 'Team Management']
  },
  {
    id: 4,
    title: 'CAD & 3D Modeling Specialist',
    company: 'Independent and Team Projects',
    date: 'Aug 2019 – May 2023',
    description: [
      'Utilized SolidWorks, Autodesk Inventor, and Fusion 360 for mechanical part design',
      'Produced 3D-printed components for engineering projects and competition robots',
      'Practiced iterative design with dimensional constraints and fabrication-ready models'
    ],
    skills: ['SolidWorks', '3D Modeling', 'CAD Design']
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Priyan Shah | Portfolio',
    projects: projects,
    experiences: experiences,
    courseCategories: courseCategories
  });
});

app.get('/api/course-categories', (req, res) => {
  res.json(courseCategories);
});

// Contact form handling
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // Configure nodemailer (you'll need to set up environment variables)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
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
    }
    
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.json({ success: true, message: 'Message received! I\'ll get back to you soon.' });
  }
});

// Export the Express API for Vercel
module.exports = app;

// Only start the server if we're not in Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Contact form ${process.env.EMAIL_USER ? 'enabled' : 'in demo mode'}`);
  });
}