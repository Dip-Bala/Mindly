import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Memoir",
  description: "How Memoir collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-text">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

      <p className="text-sm text-text-muted mb-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          Your privacy matters. This policy explains what information Memoir
          collects and how it is used.
        </p>

        <h2 className="text-lg font-medium">1. Information We Collect</h2>
        <p>
          Memoir collects information you voluntarily provide, such as account
          details and content you save (links, notes, metadata).
        </p>

        <h2 className="text-lg font-medium">2. How We Use Your Data</h2>
        <p>
          We use your data to:
        </p>
        <ul className="list-disc ml-5 space-y-2">
          <li>Provide and improve Memoir’s features</li>
          <li>Enable search, recall, and AI-assisted responses</li>
          <li>Maintain security and prevent abuse</li>
        </ul>

        <h2 className="text-lg font-medium">3. AI Processing</h2>
        <p>
          Memoir may process your saved content using AI models to generate
          contextual answers. This processing is limited to providing features
          within the app and is not used for advertising.
        </p>

        <h2 className="text-lg font-medium">4. Data Sharing</h2>
        <p>
          Memoir does not sell your data. We may share limited information with
          trusted service providers only as necessary to operate the service.
        </p>

        <h2 className="text-lg font-medium">5. Data Security</h2>
        <p>
          We take reasonable measures to protect your data, but no system is
          completely secure. You use Memoir at your own risk.
        </p>

        <h2 className="text-lg font-medium">6. Data Retention</h2>
        <p>
          Your data is retained as long as your account is active or as needed
          to provide the service. You may request deletion of your account and
          associated data.
        </p>

        <h2 className="text-lg font-medium">7. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Continued use of
          Memoir indicates acceptance of the updated policy.
        </p>

        <h2 className="text-lg font-medium">8. Contact</h2>
        <p>
          For privacy-related questions, contact us at{" "}
          <span className="underline">dipanwita.bala.02@gmail.com</span>.
        </p>
      </section>
    </main>
  );
}
