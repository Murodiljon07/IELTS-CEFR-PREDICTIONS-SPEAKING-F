"use client";

import { Award } from "lucide-react";

const partners = [
  { name: "British Council", logo: "🇬🇧" },
  { name: "IDP Education", logo: "🇦🇺" },
  { name: "Cambridge English", logo: "📚" },
  { name: "Oxford University", logo: "🎓" },
  { name: "ETS", logo: "📝" },
  { name: "Pearson", logo: "📖" },
];

export function Partners() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              Trusted Partners
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            Recognized by leading educational institutions worldwide
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div key={partner.name} className="text-center">
              <div className="text-4xl mb-2">{partner.logo}</div>
              <span className="text-xs text-gray-500">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
