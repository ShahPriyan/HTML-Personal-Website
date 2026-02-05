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
        code: 'ENGR 13100',
        name: 'Transforming Ideas to Innovation I',
        semester: 'Fall 2023',
        description: 'Engineering design process, project management, and team collaboration.',
        skills: ['Design Thinking', 'Project Management', 'Team Collaboration', 'Problem Solving'],
        grade: 'A+'
      },
      {
        code: 'ENGR 13200',
        name: 'Transforming Ideas to Innovation II',
        semester: 'Spring 2024',
        description: 'Advanced engineering design, prototyping, and innovation methodologies.',
        skills: ['Advanced Design', 'Prototyping', 'CAD', 'Innovation', 'Team Leadership'],
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
        semester: 'Fall 2024',
        description: 'Basic circuit analysis, DC circuits, Kirchhoff\'s laws, and resistive networks.',
        skills: ['Circuit Analysis', 'Ohm\'s Law', 'Kirchhoff\'s Laws', 'DC Circuits', 'Resistive Networks'],
        grade: 'B'
      },
      {
        code: 'ECE 20002',
        name: 'Electrical Engineering Fundamentals II',
        semester: 'Spring 2025',
        description: 'AC circuits, phasors, frequency response, operational amplifiers, and filters.',
        skills: ['AC Circuits', 'Phasors', 'Frequency Response', 'Op-Amps', 'Filter Design'],
        grade: 'Currently Enrolled'
      },
      {
        code: 'ECE 36800',
        name: 'Data Structures',
        semester: 'Spring 2025',
        description: 'Arrays, linked lists, stacks, queues, trees, graphs, and algorithm analysis.',
        skills: ['Data Structures', 'Algorithms', 'C/C++', 'Algorithm Analysis', 'Problem Solving'],
        grade: 'Currently Enrolled'
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
        description: 'Python programming with focus on data analysis, visualization, and machine learning.',
        skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Visualization', 'Machine Learning'],
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
        code: 'MA 26100',
        name: 'Multivariate Calculus',
        semester: 'Spring 2024',
        description: 'Vector calculus, partial derivatives, multiple integrals, line and surface integrals.',
        skills: ['Vector Calculus', 'Partial Derivatives', 'Multiple Integrals', 'Mathematical Analysis'],
        grade: 'B'
      },
      {
        code: 'MA 26600',
        name: 'Ordinary Differential Equations',
        semester: 'Fall 2024',
        description: 'First and second-order ODEs, Laplace transforms, systems of equations.',
        skills: ['Differential Equations', 'Laplace Transforms', 'Mathematical Modeling', 'Engineering Applications'],
        grade: 'A'
      }
    ]
  },
  'physics': {
    title: 'Physics',
    description: 'Physics foundations for engineering',
    icon: 'fas fa-atom',
    lottieUrl: 'https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json',
    courses: [
      {
        code: 'PHYS 17200',
        name: 'Modern Mechanics',
        semester: 'Fall 2023',
        description: 'Newton\'s laws, energy, momentum, rotational motion, and oscillations.',
        skills: ['Classical Mechanics', 'Energy Conservation', 'Momentum', 'Problem Solving'],
        grade: 'B'
      },
      {
        code: 'PHYS 27200',
        name: 'Electric & Magnetic Interactions',
        semester: 'Spring 2024',
        description: 'Electric and magnetic fields, electromagnetic induction, and Maxwell\'s equations.',
        skills: ['Electromagnetism', 'Magnetic Fields', 'Maxwell\'s Equations', 'Wave Physics'],
        grade: 'B'
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
    technologies: ['Analog Circuits', 'Op-amps', '555 Timer', 'Circuit Analysis', 'Hardware Testing', 'Signal Processing'],
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
    technologies: ['Digital Circuits', '555 Timer IC', 'LED Control', 'Circuit Design', 'Power Distribution', 'Hardware Testing'],
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
    technologies: ['PCB Design', 'Schematic Design', 'CAD Software', 'Multi-layer PCB', 'Signal Integrity', 'Hardware Validation'],
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
    technologies: ['Python', 'Pandas', 'NumPy', 'Data Analysis', 'Data Visualization', 'Machine Learning', 'Git'],
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
    technologies: ['Embedded Systems', 'Microcontrollers', 'Sensors', 'Medical Device Design', 'Hardware Interface', 'Embedded C'],
    icon: 'fas fa-hand-holding-medical'
  }
];

const experiences = [
  {
    id: 1,
    title: 'Software and Design Intern',
    company: 'Spry Brands Inc.',
    date: 'May 2024 – Aug 2024',
    description: [
      'Designed and developed 300+ customer-facing, fully customizable products using XML, PageFlex Studio, and backend programming',
      'Streamlined production workflow by using licensed third-party software to automate customization and data imports',
      'Collaborated with cross-functional teams to integrate backend systems with product templates',
      'Designed and implemented customizable website templates for marketing and sales teams'
    ],
    skills: ['XML', 'PageFlex Studio', 'Backend Programming', 'Workflow Automation', 'Template Design', 'Cross-functional Collaboration']
  },
  {
    id: 2,
    title: 'Student Video Behavior Analysis Research',
    company: 'Purdue University Research Team',
    date: 'Apr 2024 – May 2024',
    description: [
      'Analyzed correlation between student video watch time and quiz performance',
      'Applied data analysis techniques using Python and statistical methods',
      'Collaborated on data organization, visualization, and research conclusions',
      'Presented findings to research team and faculty'
    ],
    skills: ['Python', 'Data Analysis', 'Statistical Analysis', 'Data Visualization', 'Research Methodology']
  },
  {
    id: 3,
    title: 'PCB Design & Implementation Specialist',
    company: 'Academic & Personal Projects',
    date: 'Aug 2024 – Dec 2024',
    description: [
      'Designed and implemented custom printed circuit boards for embedded systems',
      'Created comprehensive schematic designs and optimized PCB layouts',
      'Performed thorough testing and validation of manufactured circuit boards',
      'Collaborated with team members on hardware integration and troubleshooting'
    ],
    skills: ['PCB Design', 'Schematic Design', 'Circuit Analysis', 'Hardware Testing', 'Embedded Systems']
  },
  {
    id: 4,
    title: 'Robotics Team Lead',
    company: 'HSE High School Robotics Team',
    date: 'Aug 2021 – May 2022',
    description: [
      'Led team of 13 students in robot design and construction for national competition',
      'Managed project timelines and task assignments across 6-month build season',
      'Guided collaborative problem-solving and real-time debugging during tournaments',
      'Achieved regional qualification and competed at state level'
    ],
    skills: ['Leadership', 'Robotics Programming', 'Team Management', 'Project Management', 'C++ Programming']
  },
  {
    id: 5,
    title: 'CAD & 3D Modeling Specialist',
    company: 'Independent and Team Projects',
    date: 'Aug 2019 – May 2023',
    description: [
      'Utilized SolidWorks, Autodesk Inventor, and Fusion 360 for mechanical part design',
      'Produced 3D-printed components for engineering projects and competition robots',
      'Practiced iterative design with dimensional constraints and fabrication-ready models',
      'Created technical drawings and assembly instructions'
    ],
    skills: ['SolidWorks', 'Autodesk Inventor', 'Fusion 360', '3D Modeling', '3D Printing', 'Technical Drawing']
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
  
  // Log the contact attempt
  console.log('Contact form submission:', { name, email, message: message.substring(0, 50) + '...' });
  
  try {
    // Try to send email if configured
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
        subject: `Portfolio Contact from ${name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      
      res.json({ 
        success: true, 
        message: 'Email sent successfully! I\'ll get back to you soon.' 
      });
    } else {
      // Fallback when email isn't configured
      console.log('Email not configured, but form submission received');
      res.json({ 
        success: true, 
        message: 'Message received! I\'ll respond via email soon.' 
      });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    // Still return success to show the user their message was received
    res.json({ 
      success: true, 
      message: 'Message received! I\'ll get back to you soon.' 
    });
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