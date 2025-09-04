export function AgileTab() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Agile Development Board
      </h3>
      <p className="text-gray-600 mb-6">
        Demonstrating Agile/Scrum methodology with sprint planning and
        task management
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Backlog", "To Do", "In Progress", "Done"].map(
          (status, index) => (
            <div key={status} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center justify-between">
                {status}
                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {index === 0
                    ? "12"
                    : index === 1
                      ? "5"
                      : index === 2
                        ? "3"
                        : "8"}
                </span>
              </h4>
              <div className="space-y-2">
                {Array.from({ length: Math.min(3, index + 2) }).map(
                  (_, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="bg-white border border-gray-200 rounded p-3"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {status === "Backlog" &&
                          taskIndex === 0 &&
                          "Implement user authentication"}
                        {status === "Backlog" &&
                          taskIndex === 1 &&
                          "Design database schema"}
                        {status === "To Do" &&
                          taskIndex === 0 &&
                          "Create project dashboard"}
                        {status === "To Do" &&
                          taskIndex === 1 &&
                          "Setup testing framework"}
                        {status === "In Progress" &&
                          taskIndex === 0 &&
                          "Build API endpoints"}
                        {status === "In Progress" &&
                          taskIndex === 1 &&
                          "Frontend components"}
                        {status === "Done" &&
                          taskIndex === 0 &&
                          "Project setup & configuration"}
                        {status === "Done" &&
                          taskIndex === 1 &&
                          "Database initialization"}
                        {status === "Done" &&
                          taskIndex === 2 &&
                          "Basic routing structure"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Story Points:{" "}
                        {Math.floor(Math.random() * 8) + 1}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
