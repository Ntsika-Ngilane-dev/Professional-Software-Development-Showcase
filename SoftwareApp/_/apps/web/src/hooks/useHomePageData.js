import { useState, useEffect } from "react";

export function useHomePageData() {
  const [activeTab, setActiveTab] = useState("overview");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedTeamMember, setExpandedTeamMember] = useState(null);
  const [expandedCommItem, setExpandedCommItem] = useState(null);
  const [apiEndpoints, setApiEndpoints] = useState([]);
  const [dbTables, setDbTables] = useState([]);
  const [reactComponents, setReactComponents] = useState([]);
  const [testCoverage, setTestCoverage] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchDetailedData();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailedData = async () => {
    // Mock data for demonstration - in real app would fetch from APIs
    setApiEndpoints([
      {
        name: "GET /api/projects",
        description: "Fetch all projects with filtering",
        status: "Active",
      },
      {
        name: "POST /api/projects",
        description: "Create new project",
        status: "Active",
      },
      {
        name: "PUT /api/projects/:id",
        description: "Update project details",
        status: "Active",
      },
      {
        name: "GET /api/tasks",
        description: "Fetch tasks with project filtering",
        status: "Active",
      },
      {
        name: "POST /api/tasks",
        description: "Create new task",
        status: "Active",
      },
      {
        name: "PUT /api/tasks/:id",
        description: "Update task status and details",
        status: "Active",
      },
      {
        name: "GET /api/team-members",
        description: "Fetch all team members",
        status: "Active",
      },
      {
        name: "POST /api/team-members",
        description: "Add new team member",
        status: "Active",
      },
      {
        name: "GET /api/test-cases",
        description: "Fetch test cases",
        status: "Active",
      },
      {
        name: "PUT /api/test-cases/:id",
        description: "Update test results",
        status: "Active",
      },
      {
        name: "GET /api/sprints",
        description: "Fetch sprint information",
        status: "Active",
      },
      {
        name: "POST /api/sprints",
        description: "Create new sprint",
        status: "Active",
      },
      {
        name: "GET /api/communications",
        description: "Fetch project communications",
        status: "Active",
      },
      {
        name: "POST /api/communications",
        description: "Create new communication",
        status: "Active",
      },
      {
        name: "GET /api/code-reviews",
        description: "Fetch code review data",
        status: "Active",
      },
    ]);

    setDbTables([
      {
        name: "projects",
        rows: 3,
        description: "Main project information and metadata",
      },
      {
        name: "tasks",
        rows: 8,
        description: "User stories and development tasks",
      },
      {
        name: "team_members",
        rows: 4,
        description: "Team member profiles and skills",
      },
      {
        name: "sprints",
        rows: 2,
        description: "Sprint planning and timeline data",
      },
      {
        name: "test_cases",
        rows: 4,
        description: "Test suite and coverage tracking",
      },
      {
        name: "communications",
        rows: 3,
        description: "Project updates and messages",
      },
      {
        name: "code_reviews",
        rows: 2,
        description: "Code review and approval tracking",
      },
      {
        name: "sprint_tasks",
        rows: 6,
        description: "Sprint-task relationship mapping",
      },
    ]);

    setReactComponents([
      {
        name: "HomePage",
        type: "Page",
        lines: 420,
        description: "Main dashboard with skills showcase",
      },
      {
        name: "AgileBoardPage",
        type: "Page",
        lines: 380,
        description: "Interactive Kanban board for task management",
      },
      {
        name: "TestingPage",
        type: "Page",
        lines: 350,
        description: "TDD showcase and test case management",
      },
      {
        name: "TaskCard",
        type: "Component",
        lines: 85,
        description: "Individual task display with status",
      },
      {
        name: "TestCaseCard",
        type: "Component",
        lines: 75,
        description: "Test case display and execution",
      },
      {
        name: "ProjectStats",
        type: "Component",
        lines: 120,
        description: "Expandable project statistics",
      },
      {
        name: "SkillsShowcase",
        type: "Component",
        lines: 95,
        description: "Technical skills demonstration",
      },
      {
        name: "TeamMemberCard",
        type: "Component",
        lines: 110,
        description: "Team member profile and details",
      },
      {
        name: "CommunicationHub",
        type: "Component",
        lines: 140,
        description: "Project communication center",
      },
      {
        name: "ModalDialog",
        type: "Component",
        lines: 60,
        description: "Reusable modal component",
      },
      {
        name: "LoadingSpinner",
        type: "Component",
        lines: 25,
        description: "Loading state indicator",
      },
      {
        name: "ErrorBoundary",
        type: "Component",
        lines: 45,
        description: "Error handling wrapper",
      },
      {
        name: "NavTabs",
        type: "Component",
        lines: 80,
        description: "Tabbed navigation interface",
      },
      {
        name: "StatusBadge",
        type: "Component",
        lines: 35,
        description: "Status indicator component",
      },
      {
        name: "ProgressBar",
        type: "Component",
        lines: 40,
        description: "Progress visualization",
      },
      {
        name: "DatePicker",
        type: "Component",
        lines: 70,
        description: "Date selection component",
      },
      {
        name: "FormField",
        type: "Component",
        lines: 55,
        description: "Reusable form input field",
      },
      {
        name: "ConfirmDialog",
        type: "Component",
        lines: 50,
        description: "Confirmation modal",
      },
      {
        name: "ToastNotification",
        type: "Component",
        lines: 45,
        description: "Success/error notifications",
      },
      {
        name: "SearchFilter",
        type: "Component",
        lines: 65,
        description: "Data filtering interface",
      },
      {
        name: "ExportButton",
        type: "Component",
        lines: 55,
        description: "Data export functionality",
      },
      {
        name: "RefreshButton",
        type: "Component",
        lines: 30,
        description: "Data refresh trigger",
      },
      {
        name: "HelpTooltip",
        type: "Component",
        lines: 40,
        description: "Contextual help information",
      },
      {
        name: "UserAvatar",
        type: "Component",
        lines: 35,
        description: "User profile picture display",
      },
      {
        name: "PriorityBadge",
        type: "Component",
        lines: 30,
        description: "Task priority indicator",
      },
    ]);

    setTestCoverage([
      {
        file: "HomePage.test.js",
        coverage: 95,
        tests: 12,
        description: "Main dashboard functionality tests",
      },
      {
        file: "AgileBoardPage.test.js",
        coverage: 88,
        tests: 15,
        description: "Kanban board interaction tests",
      },
      {
        file: "TestingPage.test.js",
        coverage: 92,
        tests: 10,
        description: "Testing interface functionality",
      },
      {
        file: "api/projects.test.js",
        coverage: 100,
        tests: 8,
        description: "Projects API endpoint tests",
      },
      {
        file: "api/tasks.test.js",
        coverage: 96,
        tests: 12,
        description: "Tasks API endpoint tests",
      },
      {
        file: "api/team-members.test.js",
        coverage: 94,
        tests: 6,
        description: "Team members API tests",
      },
      {
        file: "components/TaskCard.test.js",
        coverage: 90,
        tests: 7,
        description: "Task card component tests",
      },
      {
        file: "components/ModalDialog.test.js",
        coverage: 85,
        tests: 5,
        description: "Modal component tests",
      },
      {
        file: "utils/dateHelpers.test.js",
        coverage: 100,
        tests: 4,
        description: "Date utility function tests",
      },
      {
        file: "utils/validation.test.js",
        coverage: 98,
        tests: 9,
        description: "Input validation tests",
      },
    ]);
  };

  const toggleCard = (cardType) => {
    setExpandedCard(expandedCard === cardType ? null : cardType);
  };

  const getCardData = (type) => {
    switch (type) {
      case "api":
        return {
          data: apiEndpoints,
          title: "API Endpoints",
          total: apiEndpoints.length,
        };
      case "db":
        return {
          data: dbTables,
          title: "Database Tables",
          total: dbTables.length,
        };
      case "components":
        return {
          data: reactComponents,
          title: "React Components",
          total: reactComponents.length,
        };
      case "coverage":
        return {
          data: testCoverage,
          title: "Test Coverage",
          total:
            Math.round(
              testCoverage.reduce((acc, test) => acc + test.coverage, 0) /
                testCoverage.length,
            ) + "%",
        };
      default:
        return { data: [], title: "", total: 0 };
    }
  };

  return {
    activeTab,
    setActiveTab,
    projects,
    loading,
    expandedCard,
    toggleCard,
    getCardData,
    expandedTeamMember,
    setExpandedTeamMember,
    expandedCommItem,
    setExpandedCommItem,
  };
}
