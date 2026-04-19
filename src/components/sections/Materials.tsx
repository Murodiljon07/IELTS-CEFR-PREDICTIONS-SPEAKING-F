import { MaterialCard } from "../ui/MaterialCard";
import { Search } from "lucide-react";

const materials = [
  {
    title: "IELTS Vocabulary Builder",
    level: "Intermediate" as const,
    category: "Vocabulary",
    rating: 4.8,
    downloads: 2340,
  },
  {
    title: "Grammar Fundamentals",
    level: "Beginner" as const,
    category: "Grammar",
    rating: 4.9,
    downloads: 3120,
  },
  {
    title: "Advanced Reading Strategies",
    level: "Advanced" as const,
    category: "Reading",
    rating: 4.7,
    downloads: 1890,
  },
  {
    title: "Listening Practice Tests",
    level: "Intermediate" as const,
    category: "Listening",
    rating: 4.6,
    downloads: 2560,
  },
  {
    title: "Writing Task 2 Mastery",
    level: "Advanced" as const,
    category: "Writing",
    rating: 4.9,
    downloads: 2100,
  },
  {
    title: "Speaking Confidence Kit",
    level: "Beginner" as const,
    category: "Speaking",
    rating: 4.8,
    downloads: 1750,
  },
];

export function Materials() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-4xl text-primary mb-4"
            style={{ fontWeight: 700 }}
          >
            Learning Materials
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Explore our collection of high-quality English learning resources
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search materials..."
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material, index) => (
            <MaterialCard key={index} {...material} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-all">
            Load More Materials
          </button>
        </div>
      </div>
    </section>
  );
}
