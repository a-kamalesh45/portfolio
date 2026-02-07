export const personalInfo = {
    name: "Kamalesh Acharya",
    firstName: "Kamalesh",
    lastName: "Acharya",
    role: "Full-Stack Engineer • Creative Technologist",
    tagline: "I build robust systems and craft elegant digital experiences. From high-frequency trading platforms to modern web applications — engineering meets creativity.",
    email: "hello@kamaleshacharya.com",
    phone: "+91 98765 43210",
    location: "India",
    avatar: "/assets/face3.png",
    social: {
        github: "https://github.com/kamaleshacharya",
        linkedin: "https://linkedin.com/in/kamaleshacharya",
        twitter: "https://twitter.com/kamaleshacharya",
    },
}

export const aboutMe = {
    title: "About Me",
    subtitle: "Engineering Excellence, Creative Vision",
    bio: `I'm a full-stack engineer with a passion for building systems that scale. My expertise spans 
        from MERN stack applications to performance-critical C++ systems — including high-frequency 
        trading platforms where milliseconds matter.

        Beyond the code, I believe in clean architecture, thoughtful design, and solving problems that 
        make a real impact. Whether it's optimizing a trading algorithm or crafting an intuitive user 
        interface, I bring the same level of precision and creativity to every project.`,
    skills: [
        { name: "Full-Stack Development", icon: "Code", description: "Building scalable applications with React, Node.js, and modern frameworks" },
        { name: "Systems Engineering", icon: "Cpu", description: "High-performance C++ systems, HFT platforms, and low-latency solutions" },
        { name: "Architecture & Design", icon: "Layers", description: "Designing robust, maintainable systems that stand the test of time" },
        { name: "Problem Solving", icon: "Target", description: "Tackling complex challenges with analytical thinking and creative solutions" },
    ],
    stats: [
        { label: "Years Experience", value: 5, suffix: "+" },
        { label: "Projects Delivered", value: 40, suffix: "+" },
        { label: "Technologies Mastered", value: 25, suffix: "+" },
        { label: "Systems Built", value: 15, suffix: "" },
    ],
}

export const resumeData = {
    education: [
        {
            title: "Bachelor of Technology",
            organization: "Computer Science & Engineering",
            duration: "2019 - 2023",
            description: "Focused on algorithms, data structures, and system design. Active contributor to open-source projects.",
        },
        {
            title: "Advanced C++ & Systems",
            organization: "Self-Directed Learning",
            duration: "2021 - Present",
            description: "Deep dive into modern C++, memory management, and high-performance computing patterns.",
        },
        {
            title: "Full-Stack Web Development",
            organization: "Specialized Training",
            duration: "2020 - 2021",
            description: "Comprehensive training in MERN stack, TypeScript, and modern frontend frameworks.",
        },
    ],
    experience: [
        {
            title: "Full-Stack Engineer",
            organization: "Tech Startup",
            duration: "2023 - Present",
            description: "Building scalable web applications using React, Node.js, and TypeScript. Leading frontend architecture decisions.",
            isCurrent: true,
        },
        {
            title: "Systems Developer (C++)",
            organization: "FinTech Company",
            duration: "2022 - 2023",
            description: "Developed high-frequency trading systems and optimized latency-critical components.",
        },
        {
            title: "Software Engineer Intern",
            organization: "Software Consulting Firm",
            duration: "2021 - 2022",
            description: "Built REST APIs, implemented database solutions, and contributed to client projects.",
        },
    ],
}

export const portfolioData = {
    categories: ["All", "Web", "Systems", "Experiments"],
    projects: [
        {
            id: 1,
            title: "HFT Trading Engine",
            category: "Systems",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
            description: "Low-latency trading system in C++ with sub-microsecond execution",
        },
        {
            id: 2,
            title: "E-Commerce Platform",
            category: "Web",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
            description: "Full-stack MERN application with payment integration and real-time inventory",
        },
        {
            id: 3,
            title: "Real-Time Dashboard",
            category: "Web",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            description: "Analytics dashboard with WebSocket connections and live data visualization",
        },
        {
            id: 4,
            title: "Memory Allocator",
            category: "Systems",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
            description: "Custom memory allocator optimized for specific allocation patterns",
        },
        {
            id: 5,
            title: "AI Code Assistant",
            category: "Experiments",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            description: "Experimental LLM-powered coding assistant with context awareness",
        },
        {
            id: 6,
            title: "Portfolio Generator",
            category: "Web",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            description: "Dynamic portfolio builder with customizable themes and CMS integration",
        },
    ],
}

export const testimonialsData = [
    {
        id: 1,
        name: "Rajesh Kumar",
        role: "Engineering Lead, FinTech Corp",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        feedback: "Kamalesh's ability to optimize our trading systems was remarkable. He reduced latency by 40% and improved overall system stability.",
        rating: 5,
    },
    {
        id: 2,
        name: "Priya Sharma",
        role: "CTO, Digital Solutions",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        feedback: "A rare combination of deep technical knowledge and creative problem-solving. Kamalesh delivered beyond our expectations.",
        rating: 5,
    },
    {
        id: 3,
        name: "Amit Patel",
        role: "Founder, Tech Startup",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        feedback: "Working with Kamalesh transformed our product. His attention to performance and user experience is exceptional.",
        rating: 5,
    },
]

// Tech Stack Configuration
// Add/remove SVG files in /public/assets/tech/ and update this array
export const techStack = [
    { name: "React", icon: "react_light.svg" },
    { name: "Next.js", icon: "nextjs_icon_dark.svg" },
    { name: "JavaScript", icon: "javascript.svg" },
    { name: "Node.js", icon: "nodejs.svg" },
    { name: "Tailwind CSS", icon: "tailwindcss.svg" },
    { name: "Docker", icon: "docker.svg" },
    { name: "MongoDB", icon: "mongodb-icon-light.svg" },
    { name: "Redis", icon: "redis.svg" },
    { name: "Git", icon: "git.svg" },
    { name: "C++", icon: "c-plusplus.svg" },
    { name: "Python", icon: "python.svg" },
    { name: "AWS", icon: "aws_light.svg" },
    { name: "Express", icon: "expressjs.svg" },
    { name: "HTML5", icon: "html5.svg" },
    { name: "Nginx", icon: "nginx.svg" },
    { name: "Kafka", icon: "apache-kafka-light.svg" },
    { name: "TensorFlow", icon: "tensorflow-icon-light.svg" },
    { name: "JWT", icon: "jwt.svg" },
    { name: "VS Code", icon: "vscode.svg" },
    { name: "GitHub", icon: "github_light.svg" },
]
