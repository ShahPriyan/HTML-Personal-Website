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
  schoolEmail: 'shah899@purdue.edu',
  personalEmail: 'shah.priyan12@gmail.com',
  linkedin: 'https://www.linkedin.com/in/priyanshah12',
  website: 'https://priyanshah.vercel.app',
  resumePath: '/files/Resume_Priyan_Shah_Embedded_Systems_Engineer_2026-09.pdf'
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
    date: 'May 2025 - Aug 2025; May 2026 - Aug 2026',
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
    date: 'Nov 2025 - May 2026',
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
    technologies: ['C', 'RP2350', 'SD Card', 'Digital Logic', 'System Design']
  },
  {
    title: 'Analog Audio Equalizer',
    date: 'Aug 2024 - Dec 2024',
    type: 'Analog Hardware',
    summary:
      'Built a hardware audio equalizer using op-amps and 555 timer circuits for frequency-specific sound control.',
    challenge:
      'Tune analog filtering and stage behavior to maintain stable output while allowing useful frequency shaping.',
    impact:
      'Gained practical signal-chain debugging and component-level design experience on physical hardware.',
    bullets: [
      'Designed analog processing stages for bass, mid, and treble bands.',
      'Assembled and validated circuit behavior through breadboard prototyping and soldering workflows.',
      'Stabilized output response for speaker-connected use cases through iterative testing.'
    ],
    technologies: ['Analog Circuit Design', 'Op-amps', '555 Timers', 'Breadboarding', 'Soldering']
  },
  {
    title: 'Traffic Light Simulator',
    date: 'Aug 2024 - Dec 2024',
    type: 'Embedded Control',
    summary:
      'Developed a timer-driven LED control system to emulate real-world traffic sequencing behavior.',
    challenge:
      'Design reliable timing transitions and consistent signal ordering with hardware components.',
    impact:
      'Improved circuit timing design and hardware validation discipline under constrained lab setups.',
    bullets: [
      'Implemented LED sequencing logic with timer-based circuit control.',
      'Assembled and tested the full circuit with LEDs, resistors, and timing components.',
      'Optimized timing stability and power distribution for repeatable performance.'
    ],
    technologies: ['555 Timer IC', 'LED Control', 'Circuit Design', 'Hardware Testing']
  },
  {
    title: 'Self-Driving Data Analysis Tool',
    date: 'Jan 2024 - May 2024',
    type: 'Data Systems',
    summary:
      'Built Python workflows for cleaning and visualizing autonomous vehicle sensor data.',
    challenge:
      'Handle noisy time-series data and convert it into actionable behavioral patterns.',
    impact:
      'Produced analysis modules that improved insight into anomaly and trend detection.',
    bullets: [
      'Implemented data cleaning, analysis, and plotting modules for sensor datasets.',
      'Detected driving behavior patterns and outliers through structured analysis.',
      'Collaborated via version control and review workflows across project contributors.'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Git']
  },
  {
    title: "Parkinson's Pressure Brace",
    date: 'Jan 2023 - May 2023',
    type: 'Assistive Technology',
    summary:
      'Designed a wearable assistive brace concept using pressure and vibration feedback loops.',
    challenge:
      'Balance responsiveness, comfort, and sensor integration in a wearable form factor.',
    impact:
      'Strengthened human-centered engineering decision making for embedded medical-adjacent design.',
    bullets: [
      'Integrated sensors and microcontroller behavior for tremor monitoring workflows.',
      'Implemented pressure-modulation and haptic response concepts for localized feedback.',
      'Iterated on usability and comfort through repeated test-driven design adjustments.'
    ],
    technologies: ['Embedded Systems', 'Microcontrollers', 'Sensors', 'Hardware Prototyping']
  }
];

const skills = {
  programming: ['C', 'C++', 'Python', 'Verilog', 'Java', 'JavaScript', 'MATLAB'],
  hardware: ['Embedded Systems', 'FPGA', 'Digital Logic', 'PCB Design', 'Arduino', 'RP2350', 'IMU Sensors', 'SRAM', 'Analog Circuit Design', 'Op-amps', 'Soldering'],
  tools: ['Git', 'GitHub', 'Linux', 'KiCAD', 'Altium', 'CAD', 'VS Code', 'PageFlex Studio', 'Liftoff', 'XML', 'Zapier', 'NetSuite'],
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
        to: profile.schoolEmail,
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
