import { useState, useEffect } from "react";
import { Plus, User, Clock, Target, ArrowLeft } from "lucide-react";

export default function AgileBoardPage() {
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    story_points: 1,
    priority: "medium",
    assigned_to: "",
  });

  const statusColumns = [
    { id: "backlog", title: "Backlog", color: "bg-gray-100" },
    { id: "todo", title: "To Do", color: "bg-blue-100" },
    { id: "in_progress", title: "In Progress", color: "bg-yellow-100" },
    { id: "done", title: "Done", color: "bg-green-100" },
  ];

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksResponse, teamResponse] = await Promise.all([
        fetch("/api/tasks?project_id=1"),
        fetch("/api/team-members"),
      ]);

      if (!tasksResponse.ok || !teamResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const tasksData = await tasksResponse.json();
      const teamData = await teamResponse.json();

      setTasks(tasksData);
      setTeamMembers(teamData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load board data");
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task status");
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTask,
          project_id: 1,
          status: "backlog",
        }),
      });

      if (!response.ok) throw new Error("Failed to create task");

      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setNewTask({
        title: "",
        description: "",
        story_points: 1,
        priority: "medium",
        assigned_to: "",
      });
      setShowNewTaskForm(false);
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task");
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Agile Board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </a>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Agile Development Board
                </h1>
                <p className="text-gray-600">
                  Sprint Planning & Task Management
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNewTaskForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Board */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statusColumns.map((column) => (
            <div key={column.id} className={`${column.color} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="bg-white text-gray-700 text-xs px-2 py-1 rounded-full">
                  {getTasksByStatus(column.id).length}
                </span>
              </div>

              <div className="space-y-3">
                {getTasksByStatus(column.id).map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      const nextStatus = {
                        backlog: "todo",
                        todo: "in_progress",
                        in_progress: "done",
                      }[column.id];
                      if (nextStatus) {
                        updateTaskStatus(task.id, nextStatus);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {task.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded text-xs ${priorityColors[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Target className="w-3 h-3" />
                        <span>{task.story_points} pts</span>
                      </div>

                      {task.assigned_name && (
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{task.assigned_name}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex items-center text-xs text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(task.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}

                {getTasksByStatus(column.id).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">
                      No tasks in {column.title.toLowerCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Task Modal */}
      {showNewTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Create New Task
            </h3>

            <form onSubmit={createTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Task description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Story Points
                  </label>
                  <select
                    value={newTask.story_points}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        story_points: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 5, 8, 13, 21].map((points) => (
                      <option key={points} value={points}>
                        {points}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({ ...newTask, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign To
                </label>
                <select
                  value={newTask.assigned_to}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      assigned_to: e.target.value || null,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Unassigned</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} ({member.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewTaskForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Methodology Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Agile Methodology Implementation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Sprint Planning
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Story point estimation using Fibonacci sequence</li>
                <li>• Sprint capacity planning based on team velocity</li>
                <li>• User story prioritization and backlog grooming</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Daily Standups</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• What did you do yesterday?</li>
                <li>• What will you do today?</li>
                <li>• Any blockers or impediments?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Continuous Improvement
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Sprint retrospectives for process improvement</li>
                <li>• Velocity tracking and burndown charts</li>
                <li>• Regular stakeholder feedback integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
