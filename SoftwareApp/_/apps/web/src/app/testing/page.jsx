import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Play, Code, FileText } from 'lucide-react';

export default function TestingPage() {
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  const testTypes = {
    unit: { label: 'Unit Tests', color: 'bg-blue-100 text-blue-800', icon: '🔧' },
    integration: { label: 'Integration Tests', color: 'bg-green-100 text-green-800', icon: '🔗' },
    e2e: { label: 'End-to-End Tests', color: 'bg-purple-100 text-purple-800', icon: '🌐' },
    performance: { label: 'Performance Tests', color: 'bg-orange-100 text-orange-800', icon: '⚡' }
  };

  const statusIcons = {
    passed: <CheckCircle className="w-5 h-5 text-green-600" />,
    failed: <XCircle className="w-5 h-5 text-red-600" />,
    pending: <Clock className="w-5 h-5 text-yellow-600" />
  };

  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = async () => {
    try {
      const response = await fetch('/api/test-cases?project_id=1');
      if (!response.ok) throw new Error('Failed to fetch test cases');
      
      const data = await response.json();
      setTestCases(data);
    } catch (error) {
      console.error('Error fetching test cases:', error);
      setError('Failed to load test cases');
    } finally {
      setLoading(false);
    }
  };

  const runTest = async (testId) => {
    try {
      // Simulate running a test
      const response = await fetch('/api/test-cases', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: testId, 
          status: Math.random() > 0.2 ? 'passed' : 'failed' 
        })
      });

      if (!response.ok) throw new Error('Failed to run test');

      const updatedTest = await response.json();
      setTestCases(testCases.map(test => 
        test.id === testId ? updatedTest : test
      ));
    } catch (error) {
      console.error('Error running test:', error);
      setError('Failed to run test');
    }
  };

  const getTestStats = () => {
    const total = testCases.length;
    const passed = testCases.filter(test => test.status === 'passed').length;
    const failed = testCases.filter(test => test.status === 'failed').length;
    const pending = testCases.filter(test => test.status === 'pending').length;
    
    return { total, passed, failed, pending, coverage: total > 0 ? Math.round((passed / total) * 100) : 0 };
  };

  const stats = getTestStats();

  const tddPrinciples = [
    {
      step: '1. Red',
      title: 'Write a Failing Test',
      description: 'Write a test for the desired functionality before implementing it',
      color: 'bg-red-50 border-red-200',
      icon: '🔴'
    },
    {
      step: '2. Green',
      title: 'Make the Test Pass',
      description: 'Write the minimum code necessary to make the test pass',
      color: 'bg-green-50 border-green-200',
      icon: '🟢'
    },
    {
      step: '3. Refactor',
      title: 'Improve the Code',
      description: 'Clean up the code while keeping all tests passing',
      color: 'bg-blue-50 border-blue-200',
      icon: '🔵'
    }
  ];

  const codeExamples = {
    unit: `// Unit Test Example - User Authentication
describe('UserAuth', () => {
  test('should validate email format', () => {
    const auth = new UserAuth();
    expect(auth.isValidEmail('test@example.com')).toBe(true);
    expect(auth.isValidEmail('invalid-email')).toBe(false);
  });

  test('should hash password correctly', () => {
    const auth = new UserAuth();
    const password = 'myPassword123';
    const hashed = auth.hashPassword(password);
    expect(hashed).not.toBe(password);
    expect(auth.verifyPassword(password, hashed)).toBe(true);
  });
});`,

    integration: `// Integration Test Example - API Endpoints
describe('Projects API', () => {
  test('should create and retrieve project', async () => {
    const projectData = {
      name: 'Test Project',
      description: 'Test Description'
    };

    const createResponse = await request(app)
      .post('/api/projects')
      .send(projectData)
      .expect(201);

    const projectId = createResponse.body.id;

    const getResponse = await request(app)
      .get(\`/api/projects/\${projectId}\`)
      .expect(200);

    expect(getResponse.body.name).toBe(projectData.name);
  });
});`,

    e2e: `// End-to-End Test Example - User Journey
describe('Project Management Flow', () => {
  test('user can create project and add tasks', async () => {
    await page.goto('/');
    
    // Create new project
    await page.click('[data-testid="new-project-btn"]');
    await page.fill('[data-testid="project-name"]', 'E2E Test Project');
    await page.click('[data-testid="create-project"]');
    
    // Verify project appears in list
    await expect(page.locator('text=E2E Test Project')).toBeVisible();
    
    // Add task to project
    await page.click('[data-testid="add-task-btn"]');
    await page.fill('[data-testid="task-title"]', 'Test Task');
    await page.click('[data-testid="save-task"]');
    
    // Verify task appears
    await expect(page.locator('text=Test Task')).toBeVisible();
  });
});`
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Test Suite...</p>
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
              <a href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </a>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Test-Driven Development</h1>
                <p className="text-gray-600">Quality Assurance & Testing Framework</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{stats.coverage}%</div>
                <div className="text-sm text-gray-600">Test Coverage</div>
              </div>
            </div>
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

      {/* Test Statistics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-gray-600">Total Tests</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{stats.passed}</div>
            <div className="text-gray-600">Passed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-red-600">{stats.failed}</div>
            <div className="text-gray-600">Failed</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-gray-600">Pending</div>
          </div>
        </div>

        {/* TDD Methodology */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Test-Driven Development Cycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tddPrinciples.map((principle, index) => (
              <div key={index} className={`${principle.color} border rounded-lg p-6`}>
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{principle.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{principle.step}</div>
                    <div className="font-medium text-gray-800">{principle.title}</div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Test Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Test Cases</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {testCases.map((test) => (
                  <div
                    key={test.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedTest(test)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        {statusIcons[test.status]}
                        <h4 className="font-medium text-gray-900">{test.name}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${testTypes[test.test_type]?.color}`}>
                          {testTypes[test.test_type]?.label}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            runTest(test.id);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {test.description && (
                      <p className="text-gray-600 text-sm mb-2">{test.description}</p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{testTypes[test.test_type]?.icon} {test.test_type}</span>
                      <span>{new Date(test.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Testing Code Examples</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {Object.entries(testTypes).slice(0, 3).map(([type, config]) => (
                  <div key={type}>
                    <div className="flex items-center mb-3">
                      <span className="text-lg mr-2">{config.icon}</span>
                      <h4 className="font-medium text-gray-900">{config.label}</h4>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-xs">
                        <code>{codeExamples[type]}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testing Best Practices */}
        <div className="bg-white rounded-lg shadow-sm mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Testing Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <Code className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">Unit Testing</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Test individual functions in isolation</li>
                <li>• Mock external dependencies</li>
                <li>• Fast execution and reliable results</li>
                <li>• High code coverage target (80%+)</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <FileText className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-medium text-gray-900">Integration Testing</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Test component interactions</li>
                <li>• Database and API integration</li>
                <li>• End-to-end data flow validation</li>
                <li>• Environment-specific testing</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                <h4 className="font-medium text-gray-900">Test Automation</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Continuous integration pipeline</li>
                <li>• Automated test execution</li>
                <li>• Regression testing on commits</li>
                <li>• Performance benchmarking</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center mb-3">
                <XCircle className="w-5 h-5 text-orange-600 mr-2" />
                <h4 className="font-medium text-gray-900">Quality Metrics</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Code coverage measurement</li>
                <li>• Test execution time tracking</li>
                <li>• Defect detection rate</li>
                <li>• Test maintenance overhead</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Test Detail Modal */}
      {selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Test Case Details</h3>
              <button
                onClick={() => setSelectedTest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{selectedTest.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-600">{selectedTest.description || 'No description provided'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <span className={`px-2 py-1 rounded text-xs ${testTypes[selectedTest.test_type]?.color}`}>
                    {testTypes[selectedTest.test_type]?.label}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex items-center space-x-2">
                    {statusIcons[selectedTest.status]}
                    <span className="capitalize">{selectedTest.status}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                <p className="text-gray-600">{new Date(selectedTest.created_at).toLocaleString()}</p>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={() => runTest(selectedTest.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Run Test</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}