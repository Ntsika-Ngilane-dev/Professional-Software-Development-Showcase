import { skillsShowcase } from "@/data/homePageData";

export function SkillsShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Technical Skills Demonstrated
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillsShowcase.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div
              className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}
            >
              {category.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {category.category}
            </h3>
            <ul className="space-y-2">
              {category.skills.map((skill, skillIndex) => (
                <li
                  key={skillIndex}
                  className="text-gray-600 text-sm flex items-center"
                >
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
