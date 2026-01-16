import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Memoir",
  description: "Terms and conditions for using Memoir.",
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-text">
      <h1 className="text-3xl font-semibold mb-6">Terms of Service</h1>

      <p className="text-sm text-text-muted mb-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-6 text-sm leading-relaxed">
        <p>
          Memoir is a personal knowledge tool that helps you save, organize, and
          recall content from the web. By accessing or using Memoir, you agree
          to the following terms.
        </p>

        <h2 className="text-lg font-medium">1. Use of the Service</h2>
        <p>
          You may use Memoir for personal and non-commercial purposes. You agree
          not to misuse the service, interfere with its operation, or attempt to
          access it in unauthorized ways.
        </p>

        <h2 className="text-lg font-medium">2. Your Content</h2>
        <p>
          You retain ownership of the content you save to Memoir. By using the
          service, you grant Memoir permission to store, process, and display
          this content solely for providing the intended functionality.
        </p>

        <h2 className="text-lg font-medium">3. AI & Generated Responses</h2>
        <p>
          Memoir may provide AI-generated responses based on the content you
          save. These responses are informational only and may not always be
          accurate or complete. You are responsible for verifying important
          information.
        </p>

        <h2 className="text-lg font-medium">4. Availability</h2>
        <p>
          Memoir is provided on an “as is” and “as available” basis. We may
          modify, suspend, or discontinue the service at any time without
          notice.
        </p>

        <h2 className="text-lg font-medium">5. Limitation of Liability</h2>
        <p>
          Memoir is not liable for any indirect, incidental, or consequential
          damages arising from your use of the service.
        </p>

        <h2 className="text-lg font-medium">6. Changes to These Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of Memoir
          after changes means you accept the updated terms.
        </p>

        <h2 className="text-lg font-medium">7. Contact</h2>
        <p>
          If you have questions about these terms, please contact us at{" "}
          <span className="underline">dipanwita.bala.02@gmail.com</span>.
        </p>
      </section>
    </main>
  );
}
