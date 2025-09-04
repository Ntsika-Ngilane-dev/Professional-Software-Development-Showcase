import { ChevronDown, ChevronUp, X, ExternalLink, Database, Code, TestTube, Layers } from 'lucide-react';
import { useHomePageData } from '@/hooks/useHomePageData';

export function OverviewTab() {
  const { expandedCard, toggleCard, getCardData } = useHomePageData();

  const statsCards = [
    { type: 'api', icon: <Code className="w-8 h-8" />, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { type: 'db', icon: <Database className="w-8 h-8" />, color: 'text-green-600', bgColor: 'bg-green-50' },
    { type: 'components', icon: <Layers className="w-8 h-8" />, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { type: 'coverage', icon: <TestTube className="w-8 h-8" />, color: 'text-orange-600', bgColor: 'bg-orange-50' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Project Architecture & Methodology
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Frontend Technologies
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• React.js with Hooks</li>
                  <li>• JavaScript ES6+</li>
                  <li>• HTML5 & Responsive Design</li>
                  <li>• Component-Based Architecture</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Backend & Data
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Node.js API Development</li>
                  <li>• PostgreSQL Database</li>
                  <li>• RESTful API Design</li>
                  <li>• Data Modeling & SQL</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Development Approach
          </h3>
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 transform transition-all duration-300 hover:scale-105">
              <h4 className="font-medium text-blue-900">
                Agile Methodology
              </h4>
              <p className="text-blue-700 text-sm mt-1">
                Iterative development with sprint planning and
                continuous delivery
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 transform transition-all duration-300 hover:scale-105">
              <h4 className="font-medium text-green-900">
                Test-Driven Development
              </h4>
              <p className="text-green-700 text-sm mt-1">
                Write tests first, then implement features for quality
                assurance
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 transform transition-all duration-300 hover:scale-105">
              <h4 className="font-medium text-purple-900">
                Data-Driven Design
              </h4>
              <p className="text-purple-700 text-sm mt-1">
                Normalized database schema with efficient query
                patterns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Project Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => {
          const cardData = getCardData(card.type);
          const isExpanded = expandedCard === card.type;
          
          return (
            <div key={card.type} className="relative">
              <div 
                className={`bg-white border border-gray-200 rounded-lg p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${isExpanded ? 'shadow-lg' : ''}`}
                onClick={() => toggleCard(card.type)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${card.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 ${isExpanded ? 'scale-110' : ''}`}>
                  <div className={card.color}>
                    {card.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{cardData.total}</div>
                <div className="text-gray-600 text-sm mb-2">{cardData.title}</div>
                <div className="flex items-center justify-center text-blue-600">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
              
              {/* Expanded Content */}
              {isExpanded && (
                <div className="absolute top-full left-0 right-0 z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto animate-fade-in">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">{cardData.title} Details</h4>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCard(card.type);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cardData.data.map((item, itemIndex) => (
                        <div 
                          key={itemIndex} 
                          className="border-l-4 border-blue-200 pl-4 py-2 hover:bg-gray-50 transition-colors duration-200 animate-slide-in"
                          style={{ animationDelay: `${itemIndex * 0.05}s` }}
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-gray-900 text-sm">
                              {item.name || item.file || item.title}
                            </h5>
                            {item.status && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                {item.status}
                              </span>
                            )}
                            {item.type && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {item.type}
                              </span>
                            )}
                            {item.coverage && (
                              <span className={`px-2 py-1 rounded text-xs ${item.coverage >= 95 ? 'bg-green-100 text-green-800' : item.coverage >= 85 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                {item.coverage}%
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 text-xs mt-1">{item.description}</p>
                          {item.rows && (
                            <p className="text-gray-500 text-xs mt-1">{item.rows} rows</p>
                          )}
                          {item.lines && (
                            <p className="text-gray-500 text-xs mt-1">{item.lines} lines of code</p>
                          )}
                          {item.tests && (
                            <p className="text-gray-500 text-xs mt-1">{item.tests} test cases</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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