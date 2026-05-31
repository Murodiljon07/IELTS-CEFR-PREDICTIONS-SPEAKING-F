export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-gray-500 mb-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our IELTS preparation platform, you agree to
            be bound by these Terms of Service. If you disagree with any part of
            the terms, you may not access the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. User Accounts</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              You must provide accurate and complete information when creating
              an account
            </li>
            <li>
              You are responsible for maintaining the security of your account
              credentials
            </li>
            <li>
              You are responsible for all activities that occur under your
              account
            </li>
            <li>
              Notify us immediately of any unauthorized use of your account
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Paid Services</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Some features require payment of fees</li>
            <li>
              All fees are non-refundable except as provided in our Refund
              Policy
            </li>
            <li>We reserve the right to change prices with 30 days notice</li>
            <li>You agree to pay all fees associated with your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. User Conduct</h2>
          <p>You agree NOT to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Share your account with multiple users</li>
            <li>
              Copy or redistribute our course materials without permission
            </li>
            <li>
              Use any automated system to access or interact with the platform
            </li>
            <li>Impersonate any person or entity</li>
            <li>Upload malicious code or attempt to hack the platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            5. Intellectual Property
          </h2>
          <p>
            All content on this platform — including practice tests, lessons,
            videos, and materials — is owned by IELTS Platform. You have a
            limited license to access content for personal, non-commercial use
            only.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            6. Limitation of Liability
          </h2>
          <p>
            IELTS Platform is not responsible for your actual IELTS exam
            performance. We provide preparation materials, but your results
            depend on your own efforts and ability. Our liability is limited to
            the amount you paid us in the last 12 months.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
          <p>
            We may suspend or terminate your account for violation of these
            terms, fraudulent activity, or non-payment. You may delete your
            account at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Governing Law</h2>
          <p>
            These terms shall be governed by the laws of [Your Country], without
            regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use of the platform constitutes acceptance of revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
          <p>For questions about these terms: legal@ieltsplatform.com</p>
        </section>
      </div>
    </div>
  );
}
