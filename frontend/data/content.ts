export const personalInfo = {
    name: "Kamalesh Acharya",
    firstName: "Kamalesh",
    lastName: "Acharya",
    role: "Frontend Developer • Civil Engineering @ IIT Kharagpur",
    tagline: "I build products that work. From financial dashboards serving real users to fest platforms scaling 2000+ attendees — software with purpose.",
    email: "kamaleshacharya224@gmail.com",
    phone: "+91 8895816001",
    location: "IIT Kharagpur, India",
    avatar: "/assets/face3.png",
    social: {
        github: "https://github.com/a-kamalesh45",
        linkedin: "https://linkedin.com/in/kamaleshacharya",
        twitter: "https://twitter.com/kamaleshacharya",
    },
}

export const aboutMe = {
    title: "About Me",
    subtitle: "Civil Engineering Student. Frontend Developer.",
    bio: `I'm a second-year undergraduate in Civil Engineering at IIT Kharagpur, building software on the side — and increasingly, building it for real.

        I started with curiosity and ended up shipping production-grade frontends: a financial dashboard used by real investors, a lost-and-found platform for 10,000+ students, and the official website for a fest with 2000+ participants.

        I care about interfaces that feel right — fast, clear, and honest. I work primarily in React and Next.js, and I bring the same analytical thinking from engineering into every product I build.`,
    skills: [
        { name: "Frontend Engineering", icon: "Code", description: "Building responsive, production-ready UIs with React, Next.js, MUI, and Tailwind CSS" },
        { name: "Full-Stack Development", icon: "Layers", description: "End-to-end MERN stack products with REST APIs, MongoDB, and Node.js backends" },
        { name: "Product Thinking", icon: "Target", description: "Translating real problems into clean, usable software — from idea to deployed product" },
        { name: "Event & Team Leadership", icon: "Cpu", description: "Coordinating large-scale technical fests and managing cross-functional teams at IIT KGP" },
    ],
    stats: [
        { label: "CGPA", value: 8, suffix: ".33 / 10" },
        { label: "Production Projects", value: 4, suffix: "+" },
        { label: "Participants Reached", value: 2500, suffix: "+" },
        { label: "Companies Visualized", value: 1500, suffix: "+" },
    ],
}

export const resumeData = {
    education: [
        {
            title: "BTech — Civil Engineering",
            organization: "Indian Institute of Technology, Kharagpur",
            duration: "2024 – Present",
            description: "CGPA: 8.33/10. Coursework includes Data Structures & Algorithms, Probability & Statistics, Linear Algebra.",
        },
        {
            title: "Class XII (CBSE)",
            organization: "LR DAV Public School, Cuttack",
            duration: "2023",
            description: "92.00% — Physics, Chemistry, Mathematics.",
        },
        {
            title: "Class X (ICSE)",
            organization: "St. Xavier's High School",
            duration: "2021",
            description: "96.00%",
        },
    ],
    experience: [
        {
            title: "Frontend Developer Intern",
            organization: "Research Fundamentals",
            duration: "Oct 2025 – Present",
            description: "Built the complete production frontend from scratch using React with MUI X Data Grid to visualize financial data of 1500+ companies. Designed the initial local backend by extracting and managing Excel-based datasets before integrating live external APIs. Product is currently deployed and in active use by selected users.",
            isCurrent: true,
        },
        {
            title: "Frontend Developer",
            organization: "Space Technology Students Society, IIT Kharagpur",
            duration: "Feb 2025 – Present",
            description: "Built the frontend of the National Students' Space Challenge website using Next.js for a fest with 2000+ participants. Focused on clean UI, smooth user experience, and consistent performance across mobile and desktop. Collaborated with backend and design teams to ship production-ready features under tight fest timelines.",
            isCurrent: true,
        },
        {
            title: "Event Coordinator",
            organization: "National Students' Space Challenge, IIT Kharagpur",
            duration: "Sep 2024 – Present",
            description: "Coordinated a flagship fest with 2500+ participants, owning logistics, scheduling, and on-ground execution end-to-end. Managed outreach and communication with high-profile guests and speakers across academia and industry. Led a team of volunteers to execute workshops, activities, and competitions.",
            isCurrent: true,
        },
    ],
}

export const portfolioData = {
    categories: ["All", "Web", "Full-Stack"],
    projects: [
        {
            id: 1,
            title: "Research Fundamentals",
            subtitle: "Financial Dashboard",
            category: "Web",
            url: "https://researchfundamental.com",
            image: "/assets/projects/research-fundamentals.png",
            description: "Production frontend built with React and MUI X Data Grid to render interactive, sortable dashboards over financial data of 1500+ companies. Includes a data pipeline from Excel-based datasets to live API integration.",
            stack: ["React", "MUI X Data Grid", "JavaScript", "REST APIs"],
            date: "Oct 2025 – Present",
        },
        {
            id: 2,
            title: "KGPath",
            subtitle: "Lost and Found Platform",
            category: "Full-Stack",
            url: "https://kgpath.vercel.app",
            image: "/assets/projects/kgpath.png",
            description: "Full-stack lost-and-found platform for IIT Kharagpur students using the MERN stack. Secure backend with authentication and CRUD APIs; responsive React frontend with status tracking, search, and filtering.",
            stack: ["React", "Node.js", "Express", "MongoDB"],
            date: "Nov 2025 – Mar 2026",
        },
        {
            id: 3,
            title: "Hive",
            subtitle: "Query Management System",
            category: "Full-Stack",
            url: "https://hive-ptyq.vercel.app",
            image: "/assets/projects/hive.png",
            description: "Role-based Query Management System with RESTful APIs supporting Participants, Admins, and Team Heads. Complete query workflows with state management and email notifications for query updates.",
            stack: ["React", "Node.js", "Express", "MongoDB"],
            date: "Dec 2025 – Jan 2026",
        },
        {
            id: 4,
            title: "National Students' Space Challenge",
            subtitle: "Fest Website",
            category: "Web",
            url: "https://nssc.in",
            image: "/assets/projects/nssc.png",
            description: "Official fest website frontend using Next.js, scaling for 2000+ attendees across registration, schedule, and event pages. Dynamic routing, optimised assets, and interactive UI components with cross-device responsiveness.",
            stack: ["Next.js", "Tailwind CSS", "JavaScript"],
            date: "Jun 2025 – Jul 2025",
        },
    ],
}

export const testimonialsData: never[] = []

// Tech Stack Configuration
// Only technologies actually used in projects
export const techStack = [
    { name: "React", icon: "react_light.svg" },
    { name: "Next.js", icon: "nextjs_icon_dark.svg" },
    { name: "JavaScript", icon: "javascript.svg" },
    { name: "Node.js", icon: "nodejs.svg" },
    { name: "Tailwind CSS", icon: "tailwindcss.svg" },
    { name: "MongoDB", icon: "mongodb-icon-light.svg" },
    { name: "Git", icon: "git.svg" },
    { name: "C++", icon: "c-plusplus.svg" },
    { name: "Python", icon: "python.svg" },
    { name: "Express", icon: "expressjs.svg" },
    { name: "HTML5", icon: "html5.svg" },
    { name: "VS Code", icon: "vscode.svg" },
    { name: "GitHub", icon: "github_light.svg" },
]
