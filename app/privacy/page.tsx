export default function Page() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-zinc-600">Operator: Avoidant Workbook · Support: nahijsupport@gmail.com</p>
        <p className="mt-1 text-xs text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-10 space-y-6 text-base leading-7">
          <section>
            <h2 className="text-xl font-semibold">1) Overview</h2>
            <p>
              This policy explains how we collect, use, and protect information when you use our website or purchase
              our digital products.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2) Information We Collect</h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Support communications:</strong> If you email us, we receive the information you send (such as
                your email address and message content).
              </li>
              <li>
                <strong>Transaction information:</strong> Payment providers may share limited transaction details with
                us (e.g., payment status, transaction ID, purchase amount, timestamps).
              </li>
              <li>
                <strong>Basic analytics:</strong> We may use privacy-friendly analytics to understand general usage
                patterns (e.g., page visits, device type). We aim to minimize data collection.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3) Payment Processing</h2>
            <p>
              Payments are processed by third-party providers such as PayPal or Paddle. We do not collect or store your
              full payment details (like card numbers). Your payment data is handled under the payment provider’s own
              privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4) How We Use Information</h2>
            <ul className="list-disc pl-6">
              <li>To deliver access to purchased digital products</li>
              <li>To respond to support inquiries</li>
              <li>To operate, secure, and improve the website</li>
              <li>To prevent fraud, abuse, or unauthorized sharing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5) Data Retention</h2>
            <p>
              We retain information only as long as needed for legitimate business purposes (support, accounting,
              fraud prevention) and as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6) Sharing</h2>
            <p>
              We do not sell your personal information. We may share limited information with service providers
              necessary to run the website (hosting, analytics, payment processors), only as needed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7) Your Choices</h2>
            <p>
              You can contact us to request access, correction, or deletion of personal information we hold, subject to
              legal and operational requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">8) Contact</h2>
            <p>Support: nahijsupport@gmail.com</p>
          </section>
        </div>
      </div>
    </main>
  );
}
