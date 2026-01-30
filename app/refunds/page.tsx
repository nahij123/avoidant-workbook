export default function Page() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-zinc-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Refund Policy</h1>
        <p className="mt-2 text-sm text-zinc-600">Operator: Avoidant Workbook · Support: nahijsupport@gmail.com</p>
        <p className="mt-1 text-xs text-zinc-500">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="mt-10 space-y-6 text-base leading-7">
          <section>
            <h2 className="text-xl font-semibold">1) Digital Products</h2>
            <p>
              Our products are digital downloads (e.g., PDF) delivered immediately after payment. Because access is
              provided instantly, all sales are generally final once delivery/access has occurred.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">2) Eligible Refund Cases</h2>
            <ul className="list-disc pl-6">
              <li>You were charged more than once for the same purchase (duplicate charge)</li>
              <li>You did not receive access due to a technical issue and we cannot resolve it</li>
              <li>The file is corrupted and we cannot provide a working replacement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">3) Not Eligible</h2>
            <ul className="list-disc pl-6">
              <li>Change of mind after delivery</li>
              <li>You did not read the product description before purchase</li>
              <li>You don’t like the product after downloading</li>
              <li>Device/app limitations (we can help troubleshoot, but it is not a refund basis)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">4) How to Request a Refund</h2>
            <p>
              Email <strong>nahijsupport@gmail.com</strong> with:
            </p>
            <ul className="list-disc pl-6">
              <li>Your PayPal/Paddle receipt or transaction ID</li>
              <li>The email used at checkout (if applicable)</li>
              <li>A brief description of the issue</li>
            </ul>
            <p className="mt-3">We aim to respond within 3 business days.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
