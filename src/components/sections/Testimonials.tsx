import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "IELTS Student",
    content:
      "Virtual Kitob helped me achieve a band 8.5 in IELTS! The materials are comprehensive and well-structured.",
    rating: 5,
    avatar: "👩‍🎓",
  },
  {
    name: "Ahmed Hassan",
    role: "University Student",
    content:
      "The vocabulary builder is amazing. I improved my English significantly in just 3 months.",
    rating: 5,
    avatar: "👨‍🎓",
  },
  {
    name: "Maria Garcia",
    role: "Professional",
    content:
      "Best platform for English learning. The practice tests are exactly like the real IELTS exam.",
    rating: 5,
    avatar: "👩‍💼",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl text-primary mb-4"
            style={{ fontWeight: 700 }}
          >
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of successful learners who achieved their goals
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 border border-border hover:shadow-lg transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="text-foreground mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-primary" style={{ fontWeight: 600 }}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
