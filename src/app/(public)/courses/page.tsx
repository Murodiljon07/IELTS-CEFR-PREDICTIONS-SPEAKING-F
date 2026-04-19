"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  BookOpen,
  Star,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Users,
  Video,
  FileText,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap,
  Play,
  Calendar,
  Target,
  Globe,
} from "lucide-react";
import Link from "next/link";

// Types
interface Course {
  id: number;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  rating: number;
  students: number;
  duration: string;
  lectures: number;
  price: number;
  originalPrice?: number;
  isFree?: boolean;
  isPopular?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  instructor: string;
  instructorAvatar?: string;
  image?: string;
  topics: string[];
  includes: string[];
}

// Mock data
const coursesData: Course[] = [
  {
    id: 1,
    title: "Complete IELTS Preparation Course",
    description:
      "Master all 4 sections of IELTS with expert strategies and practice tests",
    level: "Intermediate",
    category: "IELTS",
    rating: 4.9,
    students: 12500,
    duration: "12 weeks",
    lectures: 48,
    price: 299,
    originalPrice: 499,
    isPopular: true,
    isBestseller: true,
    instructor: "Dr. Sarah Johnson",
    topics: ["Listening", "Reading", "Writing", "Speaking"],
    includes: ["Practice tests", "Study materials", "1-on-1 sessions"],
  },
  {
    id: 2,
    title: "English Grammar Mastery",
    description:
      "Complete grammar course from basics to advanced with exercises",
    level: "Beginner",
    category: "Grammar",
    rating: 4.8,
    students: 8900,
    duration: "8 weeks",
    lectures: 36,
    price: 149,
    originalPrice: 249,
    isPopular: true,
    instructor: "Prof. Michael Brown",
    topics: ["Tenses", "Parts of Speech", "Sentence Structure"],
    includes: ["Workbook", "Quizzes", "Certificate"],
  },
  {
    id: 3,
    title: "Advanced Vocabulary Builder",
    description:
      "Learn 2000+ advanced English words for academic and professional success",
    level: "Advanced",
    category: "Vocabulary",
    rating: 4.9,
    students: 6700,
    duration: "6 weeks",
    lectures: 24,
    price: 179,
    originalPrice: 299,
    isBestseller: true,
    instructor: "Emma Wilson",
    topics: ["Academic words", "Idioms", "Phrasal verbs"],
    includes: ["Flashcards", "Audio lessons", "Exercises"],
  },
  {
    id: 4,
    title: "IELTS Writing Task 2 Masterclass",
    description:
      "Learn to write high-scoring essays with proven templates and strategies",
    level: "Intermediate",
    category: "Writing",
    rating: 4.9,
    students: 5400,
    duration: "4 weeks",
    lectures: 16,
    price: 99,
    originalPrice: 199,
    isPopular: true,
    isNew: true,
    instructor: "James Lee",
    topics: ["Essay structures", "Vocabulary", "Grammar"],
    includes: ["Essay corrections", "Templates", "Sample essays"],
  },
  {
    id: 5,
    title: "IELTS Speaking Confidence",
    description:
      "Boost your speaking score with real practice and expert feedback",
    level: "Intermediate",
    category: "Speaking",
    rating: 4.8,
    students: 4300,
    duration: "4 weeks",
    lectures: 20,
    price: 89,
    originalPrice: 179,
    instructor: "Maria Garcia",
    topics: ["Fluency", "Pronunciation", "Vocabulary"],
    includes: ["Speaking sessions", "Feedback", "Practice tests"],
  },
  {
    id: 6,
    title: "Reading Speed & Comprehension",
    description: "Double your reading speed while improving understanding",
    level: "Advanced",
    category: "Reading",
    rating: 4.7,
    students: 3200,
    duration: "5 weeks",
    lectures: 15,
    price: 129,
    originalPrice: 229,
    instructor: "David Kim",
    topics: ["Speed reading", "Skimming", "Scanning"],
    includes: ["Exercises", "Progress tracking", "Certificate"],
  },
  {
    id: 7,
    title: "Free English Basics",
    description:
      "Start your English journey with this free introductory course",
    level: "Beginner",
    category: "Grammar",
    rating: 4.6,
    students: 15600,
    duration: "2 weeks",
    lectures: 10,
    price: 0,
    isFree: true,
    isPopular: true,
    instructor: "Anna Taylor",
    topics: ["Alphabet", "Basic grammar", "Simple conversations"],
    includes: ["Video lessons", "Exercises", "Certificate"],
  },
  {
    id: 8,
    title: "Business English Professional",
    description: "Master English for meetings, presentations, and negotiations",
    level: "Advanced",
    category: "Business",
    rating: 4.9,
    students: 2800,
    duration: "6 weeks",
    lectures: 28,
    price: 249,
    originalPrice: 399,
    isBestseller: true,
    instructor: "John Smith",
    topics: ["Presentations", "Emails", "Negotiations"],
    includes: ["Case studies", "Role plays", "Certificate"],
  },
  {
    id: 9,
    title: "Listening Skills Pro",
    description: "Understand native speakers in any situation",
    level: "Intermediate",
    category: "Listening",
    rating: 4.8,
    students: 5100,
    duration: "5 weeks",
    lectures: 22,
    price: 119,
    originalPrice: 199,
    instructor: "Lisa Wong",
    topics: ["Accents", "Fast speech", "Note taking"],
    includes: ["Audio library", "Transcripts", "Quizzes"],
  },
];

const categories = [
  "All",
  "IELTS",
  "Grammar",
  "Vocabulary",
  "Speaking",
  "Writing",
  "Reading",
  "Listening",
  "Business",
];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "students", label: "Most Students" },
];

const ITEMS_PER_PAGE = 6;

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = coursesData.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });

    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.students - a.students);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "students":
        filtered.sort((a, b) => b.students - a.students);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedCourses.length / ITEMS_PER_PAGE,
  );
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedCourses, currentPage]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSortBy("popular");
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-blue-100 text-blue-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 lg:py-20">
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070')] bg-cover bg-center opacity-10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Award className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-red-400">
                Official IELTS Test Center
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Transform Your{" "}
              <span className="text-red-500">English Skills</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Expert-led courses designed to help you achieve your goals. From
              IELTS preparation to business English.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-red-400" />
                <span>50,000+ Students</span>
              </div>
              <div className="w-px h-5 bg-gray-600" />
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>4.8 Avg Rating</span>
              </div>
              <div className="w-px h-5 bg-gray-600" />
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-green-400" />
                <span>200+ Video Lessons</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-xs text-gray-500">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">9+</div>
                <div className="text-xs text-gray-500">Expert Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">200+</div>
                <div className="text-xs text-gray-500">Video Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-xs text-gray-500">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedCategory === cat
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      selectedLevel === level
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              {(selectedCategory !== "All" ||
                selectedLevel !== "All" ||
                searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-red-500 text-sm hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Mobile Filter Panel */}
            {isFilterOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          selectedCategory === cat
                            ? "bg-red-500 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          selectedLevel === level
                            ? "bg-red-500 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={resetFilters} className="text-red-500 text-sm">
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {paginatedCourses.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {filteredAndSortedCourses.length}
              </span>{" "}
              courses
            </p>
          </div>

          {/* Courses Grid */}
          {filteredAndSortedCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {paginatedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  levelColors={levelColors}
                  onViewDetails={() => handleViewCourse(course)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg transition-all ${
                      currentPage === page
                        ? "bg-red-500 text-white"
                        : "border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Course Details Modal */}
      {showModal && selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

// Course Card Component
function CourseCard({
  course,
  levelColors,
  onViewDetails,
}: {
  course: Course;
  levelColors: any;
  onViewDetails: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`text-xs px-2 py-1 rounded-full ${levelColors[course.level]}`}
              >
                {course.level}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                {course.category}
              </span>
              {course.isFree && (
                <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-white">
                  FREE
                </span>
              )}
              {course.isBestseller && (
                <span className="text-xs px-2 py-1 rounded-full bg-amber-500 text-white flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  BESTSELLER
                </span>
              )}
              {course.isNew && (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-500 text-white">
                  NEW
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {course.description}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-4 right-4 opacity-10">
          <BookOpen className="w-20 h-20 text-gray-900" />
        </div>
      </div>

      <div className="p-5">
        {/* Instructor & Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-red-600">
                {course.instructor
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <span className="text-sm text-gray-600">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold">{course.rating}</span>
          </div>
        </div>

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Video className="w-4 h-4" />
            <span>{course.lectures} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.topics.slice(0, 3).map((topic, idx) => (
            <span
              key={idx}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            {course.isFree ? (
              <span className="text-2xl font-bold text-green-600">Free</span>
            ) : (
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  ${course.price}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-gray-400 line-through ml-2">
                    ${course.originalPrice}
                  </span>
                )}
              </div>
            )}
          </div>
          <button className="px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all flex items-center gap-2">
            <Play className="w-4 h-4" />
            View Course
          </button>
        </div>
      </div>
    </div>
  );
}

// Course Modal Component
function CourseModal({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:opacity-70"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold pr-8">{course.title}</h2>
          <p className="text-red-100 mt-2">by {course.instructor}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <div className="text-sm font-semibold">{course.duration}</div>
              <div className="text-xs text-gray-500">Duration</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Video className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <div className="text-sm font-semibold">
                {course.lectures} lessons
              </div>
              <div className="text-xs text-gray-500">Lectures</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <div className="text-sm font-semibold">
                {course.students.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Students</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <div className="text-sm font-semibold">{course.rating} / 5</div>
              <div className="text-xs text-gray-500">Rating</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Course Description</h3>
            <p className="text-gray-600">{course.description}</p>
          </div>

          {/* What You'll Learn */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">What You'll Learn</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {course.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {topic}
                </div>
              ))}
            </div>
          </div>

          {/* Course Includes */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">This Course Includes</h3>
            <div className="flex flex-wrap gap-3">
              {course.includes.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Price & Enroll */}
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {course.isFree ? (
                <span className="text-3xl font-bold text-green-600">Free</span>
              ) : (
                <div>
                  <span className="text-3xl font-bold text-gray-900">
                    ${course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-lg text-gray-400 line-through ml-2">
                      ${course.originalPrice}
                    </span>
                  )}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                30-day money-back guarantee
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-8 py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-all">
                Add to Cart
              </button>
              <button className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
