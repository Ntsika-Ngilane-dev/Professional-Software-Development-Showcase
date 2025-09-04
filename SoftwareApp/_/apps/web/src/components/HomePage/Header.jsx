export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Professional Project Management System
            </h1>
            <p className="text-gray-600 mt-1">
              Showcasing Software Development Excellence
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="/agile-board"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Agile Board
            </a>
            <a
              href="/testing"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Testing Suite
            </a>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Production Ready
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
