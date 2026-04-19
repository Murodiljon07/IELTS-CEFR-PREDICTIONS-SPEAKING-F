import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl" style={{ fontWeight: 700 }}>
                Virtual Kitob
              </span>
            </div>
            <p className="text-blue-200 mb-4">
              Master English with our comprehensive learning platform designed
              for IELTS success.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center hover:bg-secondary transition-all"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center hover:bg-secondary transition-all"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center hover:bg-secondary transition-all"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4" style={{ fontWeight: 600 }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-blue-200">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Materials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4" style={{ fontWeight: 600 }}>
              Categories
            </h3>
            <ul className="space-y-2 text-blue-200">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Grammar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Vocabulary
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Listening
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Speaking
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4" style={{ fontWeight: 600 }}>
              Contact Us
            </h3>
            <ul className="space-y-3 text-blue-200">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>info@virtualkitob.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>+998 90 123 45 67</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Tashkent, Uzbekistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 pt-8 text-center text-blue-200">
          <p>&copy; 2026 Virtual Kitob. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
