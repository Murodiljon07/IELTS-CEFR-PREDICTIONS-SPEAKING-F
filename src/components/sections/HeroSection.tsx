import { ArrowRight, BookOpen, Download } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-white to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1
            className="text-5xl text-primary"
            style={{ fontWeight: 800, lineHeight: 1.2 }}
          >
            Master English with Smart Materials
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive IELTS preparation, vocabulary building, and practice
            tests designed to help you achieve your English learning goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg">
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2">
              Browse Materials
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-8 pt-4">
            <div>
              <div
                className="text-3xl text-primary"
                style={{ fontWeight: 700 }}
              >
                5000+
              </div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div>
              <div
                className="text-3xl text-primary"
                style={{ fontWeight: 700 }}
              >
                150+
              </div>
              <div className="text-muted-foreground">Materials</div>
            </div>
            <div>
              <div
                className="text-3xl text-primary"
                style={{ fontWeight: 700 }}
              >
                95%
              </div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-border">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-primary" style={{ fontWeight: 600 }}>
                    IELTS Preparation
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Complete study guide
                  </div>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-3/4"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div
                    className="text-2xl text-secondary"
                    style={{ fontWeight: 700 }}
                  >
                    8.5
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg. Score
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div
                    className="text-2xl text-secondary"
                    style={{ fontWeight: 700 }}
                  >
                    12 Weeks
                  </div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-destructive rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl"></div>
        </div>
      </div>
    </section>
  );
}
