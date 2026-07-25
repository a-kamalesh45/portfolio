export const personalInfo = {
    name: "Kamalesh Acharya",
    firstName: "Kamalesh",
    lastName: "Acharya",
    role: "B.Tech. (Hons.) in Civil Engineering",
    tagline: "B.Tech. (Hons.) in Civil Engineering @ IIT Kharagpur",
    email: "kamaleshacharya224@gmail.com",
    phone: "+91 8895816001",
    location: "IIT Kharagpur",
    avatar: "/assets/face3.png",
    social: {
        github: "https://github.com/a-kamalesh45",
        linkedin: "https://linkedin.com/in/kamaleshacharya",
        twitter: "https://twitter.com/kamaleshacharya",
    },
}

export const aboutMe = {
    title: "About Me",
    subtitle: "B.Tech. (Hons.) in Civil Engineering @ IIT Kharagpur",
    bio: `I'm a B.Tech. (Hons.) student in Civil Engineering at IIT Kharagpur, graduating in 2028. I build software alongside my degree.

I worked as a Software Developer Intern at ResearchFundamental Pvt. Ltd. from Oct 2025 to Jun 2026, where I built the company website with React and MUI-X, developed a Node.js data layer for Excel-based financial datasets, and designed a Python metrics module.

My project work includes a real-time isolated-state market matching engine, a CRDT-based collaborative document editor, and an AI-driven query management platform. I also serve as Tech Head for National Students' Space Challenge and as an Executive Member of the Space Technology Students' Society at IIT Kharagpur.`,
    skills: [
        { name: "Languages", icon: "Code", description: "C, C++, Python, JavaScript, TypeScript, HTML, CSS" },
        { name: "Frameworks & Libraries", icon: "Layers", description: "React.js, Next.js, Node.js, Express.js, Socket.io, Yjs, Tailwind CSS, Material UI, JWT" },
        { name: "Tools & Technologies", icon: "Cpu", description: "MongoDB, PostgreSQL, Redis, Docker, MinIO, Kafka, AWS, Git/GitHub, Postman, REST APIs, WebSockets, Vercel" },
        { name: "Coursework", icon: "BookOpen", description: "Programming and Data Structures, Probability and Statistics, Linear Algebra, Advanced Calculus, Numerical Computational Laboratory, Fundamentals of Embedded and Control Systems, Internet of Things, Essentials of Machine Learning, AIML in Civil Engineering" },
    ],
    stats: [
        { label: "CGPA", value: 8.14, suffix: " / 10" },
        { label: "Projects", value: 3, suffix: "" },
        { label: "Positions", value: 2, suffix: "" },
        { label: "Graduation", value: 2028, suffix: "" },
    ],
}

export const resumeData = {
    education: [
        {
            title: "B.Tech. (Hons.) in Civil Engineering",
            organization: "IIT Kharagpur",
            duration: "2028",
            description: "CGPA: 8.14 / 10",
        },
        {
            title: "CBSE Class XII",
            organization: "LR DAV Public School",
            duration: "2023",
            description: "Marks: 91.8%",
        },
        {
            title: "CISCE Class X",
            organization: "St. Xavier's High School",
            duration: "2021",
            description: "Marks: 95.83%",
        },
    ],
    experience: [
        {
            title: "Software Developer Intern",
            organization: "ResearchFundamental Pvt. Ltd.",
            duration: "Oct 2025 - Jun 2026",
            description: "Built the company's website from scratch using React and MUI-X, visualizing financial data and segment-wise trends for 5000+ companies. Implemented a Node.js data layer to pull and serve financial datasets from Excel sources, later transitioning to production-grade REST APIs. Designed a segment-wise financial metrics module in Python, computing aggregated insights by grouping data across company-level datasets. Collaborated in pilot deployments, resolving production issues through systematic testing, debugging, and user-centric product iterations.",
            isCurrent: false,
        },
        {
            title: "Tech Head",
            organization: "National Students' Space Challenge, IIT Kharagpur",
            duration: "May 2026 - Present",
            description: "Developed the official website of India's largest astro-tech fest using Next.js, supporting 4500+ users across 300+ teams for 10+ events. Managed 5 society websites across 2 GitHub organization and repositories, handling everything from MERN builds to Vercel deployments. Collaborated with cross-functional teams to manage logistics and support for 550+ attendees, ensuring smooth on-ground execution.",
            isCurrent: true,
        },
        {
            title: "Executive Member",
            organization: "Space Technology Students' Society, IIT Kharagpur",
            duration: "May 2025 - Present",
            description: "Coordinated outreach, scheduling, and logistics for invited guest speakers, managing communication end-to-end throughout the fest. Mentored and coordinated 13 junior members in frontend web development, conducting technical interviews and smooth onboarding. Organized an internal web dev hackathon while co-managing technical workshops to strengthen society-wide technical engagement.",
            isCurrent: true,
        },
    ],
}

export const portfolioData = {
    categories: ["All", "Systems", "Collaboration", "Full-Stack"],
    projects: [
        {
            id: "PROJECT-01",
            title: "Isolated-State Market Matching Engine",
            subtitle: "Trading Simulator",
            category: "Systems",
            description: "A trading simulator that streams live Binance data and lets users place synthetic trades that shift local price independently of real market.",
            stack: ["C++", "Node.js", "Next.js", "Redis", "std::thread", "WebSockets", "Redis queues", "Redis Pub/Sub", "Binance live trade data"],
            architecture: "Architected a fully decoupled microservices system using C++, Node.js, Next.js, and Redis for real-time, low-latency trading simulation. Engineered a multi-threaded C++ matching engine using std::thread, dedicating one CPU thread per asset across 8 parallel order books. Wired a Node.js WebSocket ingestion pipeline that normalizes and streams thousands of live Binance trades per minute into Redis queues. Broadcasted synthetic price updates via Redis Pub/Sub, simulating market impact and slippage with instant resync to the real market.",
            metrics: [
                { value: "8", label: "Parallel Order Books" },
                { value: "1", label: "CPU Thread / Asset" },
                { value: "Thousands", label: "Binance Trades / Minute" },
                { value: "Redis", label: "Queues + Pub/Sub" },
            ],
            date: "Mar 2026 - May 2026",
            bgText: "MARKET",
            status: "LIVE",
        },
        {
            id: "PROJECT-02",
            title: "Real-Time Collaborative Document Editor",
            subtitle: "CRDT Document Collaboration",
            category: "Collaboration",
            description: "Collaborative editor that lets multiple users edit a document at once, using Conflict-Free Replication Datatypes to stay synced, server-free.",
            stack: ["Yjs", "CRDT", "WebSockets", "Socket.io", "PostgreSQL", "JWT", "RBAC"],
            architecture: "Designed a dual-layer state machine using the Yjs CRDT engine, replacing last-write-wins logic with deterministic, conflict-free merging. Formed a WebSocket relay with Socket.io that transmits compressed binary deltas instead of full JSON payloads, reducing network latency. Developed an append-only version history engine in PostgreSQL, restoring past snapshots into active CRDT session without desync. Implemented dual-layer RBAC and stateless JWT authentication, enforcing Owner, Editor, and Viewer permissions across both layers.",
            metrics: [
                { value: "Owner / Editor / Viewer", label: "Roles" },
                { value: "Binary deltas", label: "Relay Transport" },
                { value: "Append-only", label: "Version History" },
                { value: "JWT", label: "Auth" },
            ],
            date: "Mar 2026 - Apr 2026",
            bgText: "SYNC",
            status: "LIVE",
        },
        {
            id: "PROJECT-03",
            title: "Intelligent Query Management Platform",
            subtitle: "AI Ticketing Platform",
            category: "Full-Stack",
            description: "A full-stack ticketing platform that uses AI to categorize queries, routes them to the right team, and tracks resolution against SLA deadlines.",
            stack: ["MERN", "MongoDB", "Express.js", "React.js", "Node.js", "LLM API", "MongoDB text search", "RBAC"],
            architecture: "Architected a full-stack MERN application with role-based access control, separating Participant, Admin, and Team Head permissions. Integrated the LLM API to auto-categorize incoming queries and generate confidence scores, routing tickets to the right Team Head. Built an SLA tracking system with priority-based deadlines and breach detection, surfacing real-time compliance metrics on dashboards. Implemented a knowledge base using MongoDB text search, suggesting resolved queries to users before they submit a duplicate ticket.",
            metrics: [
                { value: "Participant / Admin / Team Head", label: "Roles" },
                { value: "LLM", label: "Categorization" },
                { value: "SLA", label: "Tracking" },
                { value: "MongoDB", label: "Search" },
            ],
            date: "Nov 2025 - Jan 2026",
            bgText: "TICKETS",
            status: "LIVE",
        },
    ],
}

export const achievementsData = [
    {
        title: "Codeforces Rating",
        value: "1400+",
        detail: "Handle: starry_night_22",
    },
    {
        title: "Problems Solved",
        value: "330+",
        detail: "Across LeetCode & Codeforces (Trees, Graphs, DP, etc.)",
    },
    {
        title: "International Reasoning and Aptitude Olympiad",
        value: "State Rank 27",
        detail: "",
    },
    {
        title: "International Olympiad of Mathematics",
        value: "State Rank 44",
        detail: "",
    },
]

export const courseworkData = [
    "Programming and Data Structures",
    "Probability and Statistics",
    "Linear Algebra",
    "Advanced Calculus",
    "Numerical Computational Laboratory",
    "Fundamentals of Embedded and Control Systems",
    "Internet of Things",
    "Essentials of Machine Learning",
    "AIML in Civil Engineering",
]

export const testimonialsData: never[] = []

// Skill stack reference used by the tech visual sections and documentation.
export const techStack = [
    { name: "C", icon: "c.svg" },
    { name: "C++", icon: "c-plusplus.svg" },
    { name: "Python", icon: "python.svg" },
    { name: "JavaScript", icon: "javascript.svg" },
    { name: "TypeScript", icon: "typescript.svg" },
    { name: "HTML", icon: "html5.svg" },
    { name: "CSS", icon: "css3.svg" },
    { name: "React.js", icon: "react_light.svg" },
    { name: "Next.js", icon: "nextjs_icon_dark.svg" },
    { name: "Node.js", icon: "nodejs.svg" },
    { name: "Express.js", icon: "expressjs.svg" },
    { name: "Socket.io", icon: "socketio-light.svg" },
    { name: "Yjs", icon: "yjs.svg" },
    { name: "Tailwind CSS", icon: "tailwindcss.svg" },
    { name: "Material UI", icon: "material-ui.svg" },
    { name: "JWT", icon: "jwt.svg" },
    { name: "MongoDB", icon: "mongodb-icon-light.svg" },
    { name: "PostgreSQL", icon: "postgresql.svg" },
    { name: "Redis", icon: "redis.svg" },
    { name: "Docker", icon: "docker.svg" },
    { name: "MinIO", icon: "minio.svg" },
    { name: "Kafka", icon: "apache-kafka-light.svg" },
    { name: "AWS", icon: "aws_light.svg" },
    { name: "Git/GitHub", icon: "github_light.svg" },
    { name: "Postman", icon: "postman.svg" },
    { name: "REST APIs", icon: "rest-api.svg" },
    { name: "WebSockets", icon: "websockets.svg" },
    { name: "Vercel", icon: "vercel-light.svg" },
]
