"use client";

import {
  Award,
  Users,
  BookOpen,
  Star,
  Target,
  Globe,
  Clock,
  CheckCircle,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Heart,
  Shield,
  Zap,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Head of Academics",
    qualification: "PhD in Applied Linguistics",
    experience: "15+ years",
    bio: "Former IELTS examiner with expertise in test preparation",
    image: "👩‍🏫",
    social: { FaLinkedin: "#", twitter: "#" },
  },
  {
    id: 2,
    name: "Prof. Michael Brown",
    role: "Senior English Instructor",
    qualification: "MA in TESOL",
    experience: "12+ years",
    bio: "Specializes in grammar and academic writing",
    image: "👨‍🏫",
    social: { FaLinkedin: "#", twitter: "#" },
  },
  {
    id: 3,
    name: "Emma Wilson",
    role: "IELTS Specialist",
    qualification: "CELTA Certified",
    experience: "8+ years",
    bio: "Expert in IELTS speaking and listening sections",
    image: "👩‍🎓",
    social: { FaLinkedin: "#", twitter: "#" },
  },
  {
    id: 4,
    name: "Dr. James Lee",
    role: "Curriculum Director",
    qualification: "EdD in Curriculum Design",
    experience: "10+ years",
    bio: "Develops comprehensive learning materials",
    image: "👨‍🎓",
    social: { FaLinkedin: "#", twitter: "#" },
  },
];

// Stats data
const stats = [
  {
    value: "50,000+",
    label: "Students Trained",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    value: "240+",
    label: "Learning Materials",
    icon: BookOpen,
    color: "bg-green-500",
  },
  {
    value: "98%",
    label: "Success Rate",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
  {
    value: "4.9/5",
    label: "Student Rating",
    icon: Star,
    color: "bg-yellow-500",
  },
  {
    value: "15+",
    label: "Expert Instructors",
    icon: GraduationCap,
    color: "bg-red-500",
  },
  { value: "50+", label: "Countries", icon: Globe, color: "bg-indigo-500" },
];

// Milestones
const milestones = [
  {
    year: "2015",
    title: "Founded",
    description: "Started as a small tutoring center",
  },
  {
    year: "2017",
    title: "Official IELTS Center",
    description: "Became an official IELTS test center",
  },
  {
    year: "2019",
    title: "10,000 Students",
    description: "Reached 10,000 students milestone",
  },
  {
    year: "2021",
    title: "Online Platform",
    description: "Launched our digital learning platform",
  },
  {
    year: "2023",
    title: "50,000 Students",
    description: "50,000+ students worldwide",
  },
  {
    year: "2024",
    title: "Global Recognition",
    description: "Recognized as top IELTS preparation center",
  },
];

// Values
const values = [
  {
    icon: Heart,
    title: "Student First",
    description:
      "Every decision we make prioritizes student success and satisfaction",
  },
  {
    icon: Shield,
    title: "Quality Excellence",
    description:
      "We maintain the highest standards in all our materials and instruction",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "Constantly evolving our methods with latest educational technology",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Making quality English education accessible worldwide",
  },
];

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-28">
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070')] bg-cover bg-center opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-red-400">
                Est. 2015
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Your Journey to{" "}
              <span className="text-red-500">English Mastery</span>
              <br />
              Starts Here
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              GoodTesting is Uzbekistan's premier IELTS Official Test Center,
              dedicated to helping students achieve their dreams through quality
              English education.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`text-center transition-all duration-500 hover:-translate-y-1 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
              >
                <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-6">
                  <Heart className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-semibold text-red-600">
                    Our Story
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  From Local Center to{" "}
                  <span className="text-red-600">Global Recognition</span>
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Founded in 2015, GoodTesting began as a small tutoring center
                  in Tashkent with a simple mission: to help students achieve
                  their desired IELTS scores. Through dedication and proven
                  results, we quickly became an Official IELTS Test Center in
                  2017.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Today, we've helped over 50,000 students worldwide achieve
                  their English learning goals. Our platform offers
                  comprehensive materials, expert instruction, and personalized
                  support to ensure every student succeeds.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We're proud to be recognized as one of the leading IELTS
                  preparation centers, with students consistently achieving band
                  scores of 7.5 and above.
                </p>
              </div>
              <div
                className={`relative transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              >
                <div className="bg-gradient-to-br from-red-50 to-gray-100 rounded-2xl p-8 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="text-3xl font-bold text-red-600">
                        50K+
                      </div>
                      <div className="text-sm text-gray-500">Students</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="text-3xl font-bold text-red-600">98%</div>
                      <div className="text-sm text-gray-500">Success Rate</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="text-3xl font-bold text-red-600">9+</div>
                      <div className="text-sm text-gray-500">Years</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="text-3xl font-bold text-red-600">15+</div>
                      <div className="text-sm text-gray-500">Experts</div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-1 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-red-500" />
                      <span>Official IELTS Test Center</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Our Mission
                </h3>
                <p className="text-gray-600">
                  To provide high-quality, accessible English education that
                  empowers students to achieve their academic and professional
                  goals through proven methodologies and expert guidance.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-8 text-center hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-600">
                  To become the most trusted English learning platform in
                  Central Asia, transforming lives through language education
                  and creating global opportunities for our students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-600">
                  Core Values
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                What Drives Us
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Our principles guide everything we do, from content creation to
                student support
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className={`bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
                <Calendar className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-600">
                  Our Journey
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Key Milestones
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-red-200 hidden md:block" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className="flex-1 md:w-1/2"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-white shadow-md hidden md:block" />
                    <div
                      className={`flex-1 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 text-right" : "md:pl-12"}`}
                    >
                      <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all">
                        <div className="text-2xl font-bold text-red-600">
                          {milestone.year}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mt-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
                <Users className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-600">
                  Expert Team
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Meet Our Instructors
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Learn from experienced educators who are passionate about your
                success
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                    {member.image}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-red-600 text-sm font-semibold mt-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {member.qualification}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {member.experience} experience
                  </p>
                  <p className="text-sm text-gray-600 mt-3">{member.bio}</p>
                  <div className="flex justify-center gap-3 mt-4">
                    <a
                      href={member.social.FaLinkedin}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
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
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
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
        <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who achieved their English
              goals with GoodTesting
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses">
                <button className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all">
                  Explore Courses
                </button>
              </Link>
              <Link href="/materials">
                <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                  Browse Materials
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
