import {
  BookText,
  Brain,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
} from "lucide-react";

const categories = [
  {
    icon: BookText,
    name: "Grammar",
    count: "45 materials",
    color: "bg-blue-500",
  },
  {
    icon: Brain,
    name: "Vocabulary",
    count: "38 materials",
    color: "bg-purple-500",
  },
  {
    icon: Headphones,
    name: "Listening",
    count: "52 materials",
    color: "bg-green-500",
  },
  {
    icon: BookOpen,
    name: "Reading",
    count: "41 materials",
    color: "bg-orange-500",
  },
  {
    icon: PenTool,
    name: "Writing",
    count: "29 materials",
    color: "bg-pink-500",
  },
  { icon: Mic, name: "Speaking", count: "35 materials", color: "bg-red-500" },
];

export function Categories() {
  return (
    <section className="py-20 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl text-primary mb-4"
            style={{ fontWeight: 700 }}
          >
            Browse by Category
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose your focus area and start learning today
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
              >
                <div
                  className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-primary mb-1" style={{ fontWeight: 600 }}>
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.count}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
