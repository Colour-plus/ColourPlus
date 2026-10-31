import Link from "next/link";
import type { Metadata } from "next";
import styles from "../privacy-policy/privacy-policy.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your use of the ColourPlus Polyurethanes website.",
};

export default function TermsOfServicePage() {
  return (
    <main className={styles.privacyPage}>
      <section className={styles.privacyHero}>
        <div className={styles.privacyHeroInner}>
          <div className={styles.privacyKicker}>LEGAL · WEBSITE USE</div>
          <h1>Terms of Service</h1>
          <p className={styles.privacyIntro}>
            These terms explain the conditions that apply when you access or
            use the ColourPlus website.
          </p>
          <div className={styles.privacyUpdated}>
            Last Updated: 31 October 2026
          </div>
        </div>
      </section>

      <section className={styles.privacyContent}>
        <div className={styles.privacyContainer}>
          <aside className={styles.privacySidebar}>
            <div className={styles.privacySidebarTitle}>On this page</div>
            <a href="#acceptance">Acceptance</a>
            <a href="#website-content">Website Content</a>
            <a href="#enquiries">Enquiries and Quotations</a>
            <a href="#intellectual-property">Intellectual Property</a>
            <a href="#acceptable-use">Acceptable Use</a>
            <a href="#third-party">Third-Party Services</a>
            <a href="#disclaimer">Disclaimer</a>
            <a href="#liability">Limitation of Liability</a>
            <a href="#changes">Changes to These Terms</a>
            <a href="#contact">Contact</a>
          </aside>

          <article className={styles.privacyDocument}>
            <p>
              These Terms of Service (“Terms”) apply to your access to and use
              of the website operated by ColourPlus Polyurethanes Pvt. Ltd.
              (“ColourPlus”, “we”, “us” or “our”). By using this website, you
              agree to these Terms. If you do not agree, please do not use the
              website.
            </p>

            <section id="acceptance">
              <h2>01. Acceptance and Scope</h2>
              <p>
                These Terms cover use of this website and its content, features
                and enquiry forms. They do not replace any separate written
                agreement, quotation, purchase order or other terms that may
                apply to the supply of our products or services.
              </p>
              <p>
                You must be legally capable of accepting these Terms. If you
                use the website on behalf of an organisation, you confirm that
                you are authorised to do so.
              </p>
            </section>

            <section id="website-content">
              <h2>02. Website Content</h2>
              <p>
                The website is provided for general information about
                ColourPlus, our products and services. We make reasonable
                efforts to keep information current, but product descriptions,
                technical information, imagery, availability and other content
                may change and may not always be complete or up to date.
              </p>
              <p>
                Website content is not a substitute for project-specific
                technical advice. Suitability and performance can depend on
                site conditions, installation and other factors. Please
                contact us to discuss your project requirements.
              </p>
            </section>

            <section id="enquiries">
              <h2>03. Enquiries and Quotations</h2>
              <p>
                Submitting an enquiry does not create a contract or guarantee
                that we will accept a project, provide a quotation or supply a
                product or service. Any quotation, order or engagement is
                subject to its own terms and written confirmation.
              </p>
              <p>
                You agree to provide accurate information when using our
                enquiry forms and to update it if it changes.
              </p>
            </section>

            <section id="intellectual-property">
              <h2>04. Intellectual Property</h2>
              <p>
                Unless stated otherwise, the website and its content—including
                text, graphics, logos, photographs and design—belong to
                ColourPlus or are used with permission, and are protected by
                applicable intellectual-property laws.
              </p>
              <p>
                You may view and use the website for personal or internal
                business reference. You must not copy, modify, distribute,
                publish or commercially exploit website content without our
                prior written permission, except where applicable law permits.
              </p>
            </section>

            <section id="acceptable-use">
              <h2>05. Acceptable Use</h2>
              <p>You must not use the website to:</p>
              <ul>
                <li>Break any applicable law or infringe another person’s rights</li>
                <li>Submit false, misleading, unlawful or harmful material</li>
                <li>Attempt to disrupt, damage or gain unauthorised access to the website or its systems</li>
                <li>Introduce malicious code or interfere with another person’s use of the website</li>
                <li>Collect or misuse information about other users</li>
              </ul>
              <p>
                We may restrict or suspend access where we reasonably believe
                these Terms have been breached or the website’s security or
                operation is at risk.
              </p>
            </section>

            <section id="third-party">
              <h2>06. Third-Party Services and Links</h2>
              <p>
                The website may contain links to third-party websites or use
                third-party services. These are provided for convenience. We
                do not control and are not responsible for third-party
                content, services or privacy practices. Your use of them is
                subject to their own terms and policies.
              </p>
            </section>

            <section id="disclaimer">
              <h2>07. Disclaimer</h2>
              <p>
                To the extent permitted by applicable law, the website and its
                content are provided on an “as is” and “as available” basis.
                We do not warrant uninterrupted or error-free access, or that
                all website information will be accurate, complete or suitable
                for a particular purpose.
              </p>
              <p>
                Nothing in these Terms excludes a warranty or right that
                cannot lawfully be excluded.
              </p>
            </section>

            <section id="liability">
              <h2>08. Limitation of Liability</h2>
              <p>
                To the extent permitted by applicable law, ColourPlus will not
                be liable for indirect or consequential loss arising from or
                in connection with use of, or inability to use, this website.
                This does not limit liability that cannot lawfully be limited.
              </p>
            </section>

            <section id="changes">
              <h2>09. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. The revised
                version will be posted on this page with an updated date.
                Your continued use of the website after an update means you
                accept the revised Terms.
              </p>
            </section>

            <section id="contact" className={styles.privacyContact}>
              <h2>10. Contact</h2>
              <p>
                If you have questions about these Terms, contact ColourPlus
                Polyurethanes Pvt. Ltd. at{" "}
                <a href="mailto:info@colourplus.in">info@colourplus.in</a>.
              </p>
            </section>

            <div className={styles.privacyBack}>
              <Link href="/">← Back to ColourPlus</Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
