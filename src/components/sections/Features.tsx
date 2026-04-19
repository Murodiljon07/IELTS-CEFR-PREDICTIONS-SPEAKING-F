import { BookOpen, Brain, FileText, Download } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "IELTS Preparation",
    description:
      "Comprehensive study materials and practice tests tailored for IELTS success.",
  },
  {
    icon: Brain,
    title: "Vocabulary Builder",
    description:
      "Learn and memorize essential English words with our smart flashcard system.",
  },
  {
    icon: FileText,
    title: "Practice Tests",
    description:
      "Real exam simulations with detailed feedback and scoring analysis.",
  },
  {
    icon: Download,
    title: "Downloadable Materials",
    description:
      "Access PDF books, audio files, and study guides offline anytime.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl text-primary mb-4"
            style={{ fontWeight: 700 }}
          >
            Everything You Need to Excel
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform provides all the tools and resources you need to master
            English and ace your IELTS exam.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-secondary" />
                </div>
                <h3
                  className="text-xl text-primary mb-2"
                  style={{ fontWeight: 600 }}
                >
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
