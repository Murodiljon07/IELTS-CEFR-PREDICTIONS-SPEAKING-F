"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  Users,
  BookOpen,
  Star,
  Target,
  Globe,
  Clock,
  TrendingUp,
  Heart,
  Shield,
  Zap,
  Sparkles,
} from "lucide-react";
import AboutStats from "@/components/page/about/Stats";
import { FaTelegram } from "react-icons/fa";

// Team members
const teamMembers = [
  {
    id: 1,
    name: "Muhammadumarkhan",
    role: "IELTS Instructor",
    qualification: "IELTS Overall Band 8",
    experience: "IELTS Mentor",
    avatar: "👨‍🏫",
    bio: "Reading 9.0 📌 | Listening 8.0 📌",
  },
];

// Stats data
const stats = [
  {
    value: "8.0",
    label: "IELTS Score",
    icon: Award,
    color: "bg-red-500",
  },
  {
    value: "9.0",
    label: "Reading",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    value: "8.0",
    label: "Listening",
    icon: Star,
    color: "bg-green-500",
  },
  {
    value: "Daily",
    label: "Real Materials",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
  {
    value: "@umarkhan_band8",
    label: "Teacher",
    icon: Users,
    color: "bg-yellow-500",
  },
  {
    value: "@umarkhan_band8_admin2",
    label: "Admin",
    icon: Shield,
    color: "bg-indigo-500",
  },
];

// Values
const values = [
  {
    icon: Heart,
    title: "Real Materials",
    description: "Daily updated IELTS exam materials",
  },
  {
    icon: Shield,
    title: "Trusted Source",
    description: "Based on real IELTS experiences",
  },
  {
    icon: Zap,
    title: "Daily Updates",
    description: "Fresh Speaking, Reading & Listening content",
  },
  {
    icon: Globe,
    title: "Global Students",
    description: "Helping IELTS learners worldwide",
  },
];

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-full mb-4">
            <Award className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400">
              Est. 2015
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Daily Real <span className="text-red-500">IELTS Materials</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto">
            Teacher{" "}
            <span className="text-red-500 font-bold">Muhammadumarkhan</span>{" "}
            shares daily real IELTS Speaking materials, as well as recent IELTS
            Listening and Reading materials likely to appear in the exam.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <AboutStats stats={stats} />

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
                <Heart className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-600">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                About <span className="text-red-600">Muhammadumarkhan</span>
              </h2>

              <p className="text-gray-600 mb-4 leading-relaxed">
                This platform belongs to IELTS teacher{" "}
                <a
                  href="https://t.me/@umarkhan_band8"
                  target="_blank"
                  className="cursor-pointer text-red-500 font-bold"
                >
                  Umarkhan
                </a>
                , who achieved an Overall Band Score of 8 in IELTS.
              </p>

              <p className="text-gray-600 mb-4 leading-relaxed">
                Reading Score: 9.0 📌 <br />
                Listening Score: 8.0 📌
              </p>

              <p className="text-gray-600 leading-relaxed">
                On this website, you can find daily real IELTS Speaking
                materials, together with recent IELTS Listening and Reading
                materials that are likely to appear in the actual exam.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-gray-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-xl">
                  <div className="text-2xl font-bold text-red-600">15.6K+</div>
                  <div className="text-sm text-gray-500">Students</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <div className="text-2xl font-bold text-red-600">88%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <div className="text-2xl font-bold text-red-600">6+</div>
                  <div className="text-sm text-gray-500">Years</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                  <div className="text-2xl font-bold text-red-600">15+</div>
                  <div className="text-sm text-gray-500">Experts</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center gap-1 text-sm text-gray-600">
                  <Award className="w-4 h-4 text-red-500" />
                  Official IELTS Test Center
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To help IELTS students achieve higher band scores through real
                exam materials and practical learning resources.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To become one of the most trusted IELTS preparation platforms
                for students worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">
                Core Values
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">What Drives Us</h2>
            <p className="text-gray-500 mt-2">
              Our principles guide everything we do
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className={`bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-red-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-500">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
              <Users className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">
                Expert Team
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Meet Your IELTS Teacher
            </h2>

            <p className="text-gray-500 mt-2">
              Learn with real IELTS experience
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-red-600 text-sm font-semibold mt-1">
                  {member.role}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {member.qualification}
                </p>
                <p className="text-xs text-gray-400">
                  {member.experience} experience
                </p>
                <p className="text-sm text-gray-600 mt-3">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose <span className="text-red-600">GoodTesting</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "Official IELTS Center",
                desc: "Recognized and authorized test center",
              },
              {
                icon: Users,
                title: "Expert Instructors",
                desc: "15+ certified English teachers",
              },
              {
                icon: BookOpen,
                title: "Comprehensive Materials",
                desc: "240+ learning resources",
              },
              {
                icon: Star,
                title: "Proven Track Record",
                desc: "98% student success rate",
              },
              {
                icon: Clock,
                title: "Flexible Learning",
                desc: "Self-paced online courses",
              },
              {
                icon: Shield,
                title: "Money-back Guarantee",
                desc: "30-day satisfaction guarantee",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Preparing for IELTS Today
          </h2>

          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Access daily real IELTS materials and improve your score with
            @umarkhan_band8
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/courses">
              <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                Explore Courses
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
