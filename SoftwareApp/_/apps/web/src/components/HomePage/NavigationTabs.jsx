import { tabs } from "@/data/homePageData";

export function NavigationTabs({ activeTab, setActiveTab }) {
  return (
    <nav className="flex space-x-8 px-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
            activeTab === tab.id
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
