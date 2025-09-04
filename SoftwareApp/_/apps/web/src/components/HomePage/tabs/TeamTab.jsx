import {
  ChevronDown,
  ChevronUp,
  X,
  User,
  Mail,
  Award,
  Briefcase,
} from "lucide-react";
import { teamMembers } from "@/data/homePageData";
import { useHomePageData } from "@/hooks/useHomePageData";

export function TeamTab() {
  const { expandedTeamMember, setExpandedTeamMember } = useHomePageData();

  const toggleTeamMember = (memberId) => {
    setExpandedTeamMember(expandedTeamMember === memberId ? null : memberId);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Team Management & Collaboration
      </h3>
      <p className="text-gray-600 mb-6">
        Showcasing team coordination and communication skills
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">
            Team Roles & Responsibilities
          </h4>
          <div className="space-y-3">
            {teamMembers.map((member, index) => {
              const isExpanded = expandedTeamMember === member.id;

              return (
                <div key={member.id} className="relative">
                  <div
                    className={`bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${isExpanded ? "shadow-lg border-blue-300" : ""}`}
                    onClick={() => toggleTeamMember(member.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">
                              {member.role}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {member.people.length} member
                              {member.people.length > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Active
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
                  </div>

                  {/* Expanded Team Member Details */}
                  {isExpanded && (
                    <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h6 className="font-semibold text-gray-900 text-lg">
                            {member.role} Team
                          </h6>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTeamMember(member.id);
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Team Members */}
                        <div className="space-y-4 mb-6">
                          <h7 className="font-medium text-gray-900 text-sm">
                            Team Members:
                          </h7>
                          {member.people.map((person, personIndex) => (
                            <div
                              key={personIndex}
                              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200 animate-slide-in"
                              style={{
                                animationDelay: `${personIndex * 0.1}s`,
                              }}
                            >
                              <div className="flex items-start space-x-4">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    {person.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h8 className="font-medium text-gray-900">
                                      {person.name}
                                    </h8>
                                    <span className="text-xs text-gray-500">
                                      {person.experience}
                                    </span>
                                  </div>

                                  <div className="flex items-center text-gray-600 text-sm mb-2">
                                    <Mail className="w-4 h-4 mr-2" />
                                    {person.email}
                                  </div>

                                  <div className="flex items-center text-gray-600 text-sm mb-3">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    {person.currentProjects} active project
                                    {person.currentProjects > 1 ? "s" : ""}
                                  </div>

                                  {/* Skills */}
                                  <div className="mb-3">
                                    <p className="text-xs text-gray-500 mb-2">
                                      Core Skills:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {person.skills.map(
                                        (skill, skillIndex) => (
                                          <span
                                            key={skillIndex}
                                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                                          >
                                            {skill}
                                          </span>
                                        ),
                                      )}
                                    </div>
                                  </div>

                                  {/* Certifications */}
                                  {person.certifications &&
                                    person.certifications.length > 0 && (
                                      <div>
                                        <p className="text-xs text-gray-500 mb-2">
                                          Certifications:
                                        </p>
                                        <div className="flex flex-wrap gap-1">
                                          {person.certifications.map(
                                            (cert, certIndex) => (
                                              <span
                                                key={certIndex}
                                                className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center"
                                              >
                                                <Award className="w-3 h-3 mr-1" />
                                                {cert}
                                              </span>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Responsibilities */}
                        <div>
                          <h7 className="font-medium text-gray-900 text-sm mb-3 block">
                            Key Responsibilities:
                          </h7>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {member.responsibilities.map(
                              (responsibility, respIndex) => (
                                <div
                                  key={respIndex}
                                  className="flex items-center p-3 bg-gray-50 rounded-lg animate-slide-in"
                                  style={{
                                    animationDelay: `${respIndex * 0.05}s`,
                                  }}
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                                  <span className="text-sm text-gray-700">
                                    {responsibility}
                                  </span>
                                </div>
                              ),
                            )}
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
            Communication Protocols
          </h4>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center transform transition-all duration-300 hover:translate-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Daily standup meetings at 9:00 AM
              </li>
              <li className="flex items-center transform transition-all duration-300 hover:translate-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Sprint planning every two weeks
              </li>
              <li className="flex items-center transform transition-all duration-300 hover:translate-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Code reviews for all pull requests
              </li>
              <li className="flex items-center transform transition-all duration-300 hover:translate-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Weekly technical documentation updates
              </li>
              <li className="flex items-center transform transition-all duration-300 hover:translate-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                Monthly retrospectives and process improvements
              </li>
            </ul>
          </div>

          {/* Team Statistics */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center transform transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-blue-600">7</div>
              <div className="text-gray-600 text-sm">Team Members</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center transform transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-green-600">10</div>
              <div className="text-gray-600 text-sm">Active Projects</div>
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
