import {
  Calendar,
  Users,
  Target,
  Code,
  Database,
  TestTube,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export const skillsShowcase = [
  {
    category: "Development Methodologies",
    icon: <Target className="w-6 h-6" />,
    skills: ["Agile/Scrum", "Waterfall", "Kanban", "DevOps"],
    color: "bg-blue-500",
  },
  {
    category: "Programming Languages",
    icon: <Code className="w-6 h-6" />,
    skills: ["Java/J2EE", "JavaScript", "C/C++", "HTML/XML", ".NET"],
    color: "bg-green-500",
  },
  {
    category: "Data & Storage",
    icon: <Database className="w-6 h-6" />,
    skills: ["SQL", "Data Modeling", "PostgreSQL", "Data Manipulation"],
    color: "bg-purple-500",
  },
  {
    category: "Testing & Quality",
    icon: <TestTube className="w-6 h-6" />,
    skills: [
      "Test-Driven Development",
      "Unit Testing",
      "Integration Testing",
      "Quality Assurance",
    ],
    color: "bg-orange-500",
  },
];

export const tabs = [
  {
    id: "overview",
    label: "Project Overview",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    id: "agile",
    label: "Agile Board",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    id: "team",
    label: "Team Management",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "communication",
    label: "Communication Hub",
    icon: <MessageSquare className="w-4 h-4" />,
  },
];

export const teamMembers = [
  {
    id: 1,
    role: "Full-Stack Developer",
    people: [
      {
        name: "John Developer",
        email: "john@example.com",
        experience: "5+ years",
        skills: ["Java", "JavaScript", "React", "SQL", "Node.js"],
        certifications: ["AWS Certified Developer", "Oracle Java SE 11"],
        currentProjects: 2,
      },
      {
        name: "Sarah Frontend",
        email: "sarah.f@example.com",
        experience: "3+ years",
        skills: ["React", "TypeScript", "CSS", "HTML5"],
        certifications: ["Google UX Design"],
        currentProjects: 1,
      },
    ],
    responsibilities: [
      "Full-stack application development",
      "Code reviews and mentoring",
      "Architecture decisions",
      "Performance optimization",
    ],
  },
  {
    id: 2,
    role: "Database Administrator",
    people: [
      {
        name: "Sarah Database",
        email: "sarah@example.com",
        experience: "7+ years",
        skills: ["PostgreSQL", "Data Modeling", "SQL", "Performance Tuning"],
        certifications: ["PostgreSQL Certified", "AWS Database Specialty"],
        currentProjects: 3,
      },
    ],
    responsibilities: [
      "Database design and optimization",
      "Data migration and backup",
      "Performance monitoring",
      "Security compliance",
    ],
  },
  {
    id: 3,
    role: "QA Engineer",
    people: [
      {
        name: "Mike Quality",
        email: "mike@example.com",
        experience: "4+ years",
        skills: ["Test-Driven Development", "Selenium", "Jest", "Automation"],
        certifications: ["ISTQB Advanced Level", "Selenium WebDriver"],
        currentProjects: 2,
      },
      {
        name: "Lisa Testing",
        email: "lisa.t@example.com",
        experience: "2+ years",
        skills: ["Manual Testing", "Cypress", "API Testing"],
        certifications: ["Agile Testing Certified"],
        currentProjects: 1,
      },
    ],
    responsibilities: [
      "Test strategy development",
      "Automated test suite maintenance",
      "Quality gate enforcement",
      "Performance testing",
    ],
  },
  {
    id: 4,
    role: "DevOps Engineer",
    people: [
      {
        name: "Lisa DevOps",
        email: "lisa@example.com",
        experience: "6+ years",
        skills: ["CI/CD", "Docker", "Kubernetes", "Unix/Linux", ".NET"],
        certifications: [
          "AWS Solutions Architect",
          "Kubernetes Administrator",
        ],
        currentProjects: 4,
      },
    ],
    responsibilities: [
      "CI/CD pipeline management",
      "Infrastructure as code",
      "Monitoring and alerting",
      "Security and compliance",
    ],
  },
];

export const communicationItems = [
  {
    id: 1,
    type: "Technical Documentation",
    title: "API Documentation",
    preview:
      "Comprehensive REST API documentation with examples and response schemas",
    badge: "OpenAPI 3.0",
    content: {
      overview:
        "Complete API documentation covering all 15+ endpoints with request/response examples, authentication methods, and error handling.",
      sections: [
        "Authentication & Authorization",
        "Project Management Endpoints",
        "Task Management Endpoints",
        "Team Management Endpoints",
        "Testing & Quality Endpoints",
        "Communication Endpoints",
      ],
      features: [
        "Interactive examples",
        "Response schema validation",
        "Rate limiting documentation",
        "Versioning strategy",
      ],
      tools: [
        "Swagger/OpenAPI 3.0",
        "Postman Collections",
        "Auto-generated docs",
      ],
    },
  },
  {
    id: 2,
    type: "Technical Documentation",
    title: "Database Schema",
    preview: "Entity-relationship diagrams and data modeling documentation",
    badge: "ERD",
    content: {
      overview:
        "Detailed database design documentation with normalized schema, relationships, and performance considerations.",
      sections: [
        "Entity Relationship Diagrams",
        "Table Specifications",
        "Index Strategy",
        "Data Migration Plans",
        "Backup & Recovery Procedures",
      ],
      features: [
        "Visual ERD diagrams",
        "Column specifications",
        "Constraint documentation",
        "Performance indexes",
      ],
      tools: ["PostgreSQL", "DB Designer", "Migration scripts"],
    },
  },
  {
    id: 3,
    type: "Technical Documentation",
    title: "Code Standards",
    preview: "Coding conventions, best practices, and style guidelines",
    badge: "Style Guide",
    content: {
      overview:
        "Comprehensive coding standards ensuring consistent, maintainable, and scalable code across the entire project.",
      sections: [
        "JavaScript/React Conventions",
        "SQL Query Standards",
        "API Design Principles",
        "Testing Guidelines",
        "Git Workflow",
      ],
      features: [
        "ESLint configuration",
        "Prettier formatting",
        "Code review checklist",
        "Performance guidelines",
      ],
      tools: ["ESLint", "Prettier", "Husky", "SonarQube"],
    },
  },
];
