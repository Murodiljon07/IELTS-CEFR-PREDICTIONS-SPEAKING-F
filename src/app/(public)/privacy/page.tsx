export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-3">
            1. Information We Collect
          </h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Name and email address when creating an account</li>
            <li>Payment information for course purchases</li>
            <li>Quiz and test answers to track your progress</li>
            <li>Communication preferences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            2. How We Use Your Information
          </h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide and improve our IELTS preparation services</li>
            <li>Track your learning progress and performance</li>
            <li>Process payments and refunds</li>
            <li>Send important updates about your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal information. However, no method of transmission over the
            internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Cookies</h2>
          <p>
            We use cookies to remember your login status and preferences. You
            can disable cookies in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            5. Third-Party Services
          </h2>
          <p>
            We use trusted third-party services for payment processing
            (Stripe/PayPal) and analytics (Google Analytics). These services
            have their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your
            personal data by contacting us at support@ieltsplatform.com
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Children's Privacy</h2>
          <p>
            Our services are not intended for users under 13. We do not
            knowingly collect information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            users of any material changes via email or platform notification.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
          <p>Email: support@ieltsplatform.com</p>
        </section>
      </div>
    </div>
  );
}
