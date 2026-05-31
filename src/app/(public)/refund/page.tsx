export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
      <p className="text-gray-500 mb-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-6 text-gray-700">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 font-medium">⏱️ Quick Summary:</p>
          <p className="text-red-600 text-sm mt-1">
            14-day money-back guarantee for all courses. No questions asked
            within 7 days.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            1. Eligibility for Refunds
          </h2>
          <p>You may request a refund under the following conditions:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              <strong>Within 7 days of purchase:</strong> Full refund, no
              questions asked
            </li>
            <li>
              <strong>Days 8-14:</strong> Full refund if you have completed less
              than 20% of course content
            </li>
            <li>
              <strong>After 14 days:</strong> No refunds except for technical
              issues preventing access
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            2. How to Request a Refund
          </h2>
          <p>
            Email us at <strong>refunds@ieltsplatform.com</strong> with:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Your full name and email address used for purchase</li>
            <li>Order number (found in your confirmation email)</li>
            <li>Reason for refund (optional but appreciated)</li>
          </ul>
          <p className="mt-3">
            We process refunds within 5-7 business days to your original payment
            method.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            3. Non-Refundable Items
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Monthly subscription fees after the first 14 days</li>
            <li>
              One-on-one tutoring sessions (rescheduling allowed, but no
              refunds)
            </li>
            <li>Downloadable PDFs or materials that have been accessed</li>
            <li>Practice test vouchers that have been redeemed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            4. Failed Payment Issues
          </h2>
          <p>
            If you were charged in error or experienced a duplicate charge,
            contact us immediately. We will verify and process a full refund
            within 48 hours.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            5. Subscription Cancellations
          </h2>
          <p>For monthly subscriptions:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Cancel anytime from your account settings</li>
            <li>
              Cancellation takes effect at the end of your current billing cycle
            </li>
            <li>No partial refunds for unused time in current cycle</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Technical Issues</h2>
          <p>
            If our platform has a verified technical issue that prevents you
            from accessing purchased content for more than 48 hours, you may
            request a pro-rated refund or free extension of your access period.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Chargebacks</h2>
          <p>
            If you initiate a chargeback without first requesting a refund
            through our process, your account will be immediately suspended. We
            reserve the right to dispute chargebacks where services were
            provided as described.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact for Refunds</h2>
          <p>📧 refunds@ieltsplatform.com</p>
          <p>🕐 Response time: 24-48 hours on business days</p>
        </section>
      </div>
    </div>
  );
}
