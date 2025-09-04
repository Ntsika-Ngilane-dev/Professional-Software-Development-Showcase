import {
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  Users,
  MessageCircle,
  BookOpen,
} from "lucide-react";
import { communicationItems } from "@/data/homePageData";
import { useHomePageData } from "@/hooks/useHomePageData";

export function CommunicationTab() {
  const { expandedCommItem, setExpandedCommItem } = useHomePageData();

  const toggleCommItem = (itemId) => {
    setExpandedCommItem(expandedCommItem === itemId ? null : itemId);
  };

  const writtenCommItems = [
    {
      id: "specs",
      title: "Technical Specifications",
      description: "Detailed system requirements and architecture documents",
      examples: [
        "System Requirements Document",
        "API Specification",
        "Database Design Document",
        "Security Requirements",
      ],
      purpose:
        "Define clear technical requirements and ensure all stakeholders understand system architecture",
    },
    {
      id: "reviews",
      title: "Code Review Comments",
      description:
        "Constructive feedback and suggestions for code improvements",
      examples: [
        "Performance optimization suggestions",
        "Code style improvements",
        "Security vulnerability identification",
        "Best practices recommendations",
      ],
      purpose: "Maintain code quality and share knowledge across team members",
    },
    {
      id: "reports",
      title: "Project Status Reports",
      description:
        "Regular updates on project progress and milestone achievements",
      examples: [
        "Sprint retrospective reports",
        "Weekly progress updates",
        "Risk assessment documents",
        "Performance metrics",
      ],
      purpose: "Keep stakeholders informed and maintain project transparency",
    },
    {
      id: "stories",
      title: "User Stories & Acceptance Criteria",
      description: "Clear feature requirements from user perspective",
      examples: [
        "Epic breakdown",
        "User journey mapping",
        "Acceptance criteria definition",
        "Feature specification",
      ],
      purpose:
        "Ensure features meet user needs and provide clear development targets",
    },
  ];

  const verbalCommItems = [
    {
      id: "planning",
      title: "Sprint Planning Sessions",
      description:
        "Collaborative planning meetings for upcoming development cycles",
      details: [
        "Story estimation and sizing",
        "Capacity planning",
        "Sprint goal definition",
        "Risk identification",
      ],
      frequency: "Bi-weekly, 2-hour sessions",
    },
    {
      id: "architecture",
      title: "Technical Architecture Discussions",
      description:
        "Deep-dive sessions on system design and implementation approaches",
      details: [
        "Design pattern selection",
        "Technology stack evaluation",
        "Scalability considerations",
        "Integration strategies",
      ],
      frequency: "Weekly, 1-hour sessions",
    },
    {
      id: "presentations",
      title: "Stakeholder Presentations",
      description: "Regular updates and demos for project stakeholders",
      details: [
        "Feature demonstrations",
        "Progress reporting",
        "Requirement clarification",
        "Feedback collection",
      ],
      frequency: "Monthly, 30-minute sessions",
    },
    {
      id: "knowledge",
      title: "Knowledge Sharing Sessions",
      description:
        "Educational presentations on new technologies and best practices",
      details: [
        "Technology deep-dives",
        "Best practice sharing",
        "Lessons learned",
        "Tool demonstrations",
      ],
      frequency: "Monthly, 45-minute sessions",
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Communication & Documentation Hub
      </h3>
      <p className="text-gray-600 mb-6">
        Demonstrating excellent verbal and written communication skills
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Technical Documentation
          </h4>
          <div className="space-y-3">
            {communicationItems.map((item, index) => {
              const isExpanded = expandedCommItem === item.id;

              return (
                <div key={item.id} className="relative">
                  <div
                    className={`bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${isExpanded ? "shadow-lg border-blue-300" : ""}`}
                    onClick={() => toggleCommItem(item.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">
                        {item.title}
                      </h5>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${item.badge === "OpenAPI 3.0" ? "bg-blue-100 text-blue-800" : item.badge === "ERD" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}`}
                        >
                          {item.badge}
                        </span>
                        <div className="text-blue-600">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{item.preview}</p>
                  </div>

                  {/* Expanded Documentation Details */}
                  {isExpanded && (
                    <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h6 className="font-semibold text-gray-900 text-lg">
                            {item.title}
                          </h6>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCommItem(item.id);
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h7 className="font-medium text-gray-900 text-sm mb-2 block">
                              Overview:
                            </h7>
                            <p className="text-gray-700 text-sm">
                              {item.content.overview}
                            </p>
                          </div>

                          <div>
                            <h7 className="font-medium text-gray-900 text-sm mb-2 block">
                              Documentation Sections:
                            </h7>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {item.content.sections.map(
                                (section, sectionIndex) => (
                                  <div
                                    key={sectionIndex}
                                    className="flex items-center p-2 bg-gray-50 rounded animate-slide-in"
                                    style={{
                                      animationDelay: `${sectionIndex * 0.05}s`,
                                    }}
                                  >
                                    <FileText className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">
                                      {section}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div>
                            <h7 className="font-medium text-gray-900 text-sm mb-2 block">
                              Key Features:
                            </h7>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {item.content.features.map(
                                (feature, featureIndex) => (
                                  <div
                                    key={featureIndex}
                                    className="flex items-center p-2 bg-blue-50 rounded animate-slide-in"
                                    style={{
                                      animationDelay: `${featureIndex * 0.05}s`,
                                    }}
                                  >
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                                    <span className="text-sm text-gray-700">
                                      {feature}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div>
                            <h7 className="font-medium text-gray-900 text-sm mb-2 block">
                              Tools & Technologies:
                            </h7>
                            <div className="flex flex-wrap gap-2">
                              {item.content.tools.map((tool, toolIndex) => (
                                <span
                                  key={toolIndex}
                                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs animate-slide-in"
                                  style={{
                                    animationDelay: `${toolIndex * 0.05}s`,
                                  }}
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Communication Channels
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-3">
                  <MessageCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <h5 className="font-medium text-gray-900">
                    Written Communication
                  </h5>
                </div>
                <div className="space-y-2">
                  {writtenCommItems.map((item, index) => {
                    const isExpanded =
                      expandedCommItem === `written-${item.id}`;

                    return (
                      <div key={item.id} className="relative">
                        <div
                          className={`p-3 bg-white rounded-lg cursor-pointer transition-all duration-300 hover:shadow-sm ${isExpanded ? "shadow-md border border-blue-200" : ""}`}
                          onClick={() => toggleCommItem(`written-${item.id}`)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700 font-medium">
                              {item.title}
                            </span>
                            <div className="text-blue-600">
                              {isExpanded ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                          {!isExpanded && (
                            <p className="text-xs text-gray-500 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {isExpanded && (
                          <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-fade-in">
                            <p className="text-sm text-gray-700 mb-3">
                              {item.description}
                            </p>
                            <div className="mb-3">
                              <p className="text-xs font-medium text-gray-900 mb-2">
                                Examples:
                              </p>
                              <div className="space-y-1">
                                {item.examples.map((example, exIndex) => (
                                  <div
                                    key={exIndex}
                                    className="flex items-center text-xs text-gray-600"
                                  >
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                    {example}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-900 mb-1">
                                Purpose:
                              </p>
                              <p className="text-xs text-gray-600">
                                {item.purpose}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-green-600 mr-2" />
                  <h5 className="font-medium text-gray-900">
                    Verbal Communication
                  </h5>
                </div>
                <div className="space-y-2">
                  {verbalCommItems.map((item, index) => {
                    const isExpanded = expandedCommItem === `verbal-${item.id}`;

                    return (
                      <div key={item.id} className="relative">
                        <div
                          className={`p-3 bg-white rounded-lg cursor-pointer transition-all duration-300 hover:shadow-sm ${isExpanded ? "shadow-md border border-green-200" : ""}`}
                          onClick={() => toggleCommItem(`verbal-${item.id}`)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700 font-medium">
                              {item.title}
                            </span>
                            <div className="text-green-600">
                              {isExpanded ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                          {!isExpanded && (
                            <p className="text-xs text-gray-500 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {isExpanded && (
                          <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-fade-in">
                            <p className="text-sm text-gray-700 mb-3">
                              {item.description}
                            </p>
                            <div className="mb-3">
                              <p className="text-xs font-medium text-gray-900 mb-2">
                                Key Activities:
                              </p>
                              <div className="space-y-1">
                                {item.details.map((detail, detailIndex) => (
                                  <div
                                    key={detailIndex}
                                    className="flex items-center text-xs text-gray-600"
                                  >
                                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                                    {detail}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-900 mb-1">
                                Frequency:
                              </p>
                              <p className="text-xs text-gray-600">
                                {item.frequency}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Communication Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center transform transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-blue-600">25+</div>
              <div className="text-gray-600 text-sm">Documents</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center transform transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-gray-600 text-sm">Meetings/Week</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
