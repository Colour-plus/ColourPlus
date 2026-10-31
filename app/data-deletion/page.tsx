import Link from "next/link";
import type { Metadata } from "next";
import styles from "../privacy-policy/privacy-policy.module.css";

export const metadata: Metadata = {
  title: "User Data Deletion",
  description:
    "Instructions for requesting deletion of personal data held by ColourPlus Polyurethanes Pvt. Ltd.",
};

export default function DataDeletionPage() {
  return (
    <main className={styles.privacyPage}>
      <section className={styles.privacyHero}>
        <div className={styles.privacyHeroInner}>
          <div className={styles.privacyKicker}>PRIVACY · YOUR DATA</div>
          <h1>User Data Deletion</h1>
          <p className={styles.privacyIntro}>
            You can ask ColourPlus Polyurethanes Pvt. Ltd. to delete personal
            information you have shared with us.
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
            <a href="#request">How to Request Deletion</a>
            <a href="#what-to-include">What to Include</a>
            <a href="#what-happens">What Happens Next</a>
            <a href="#platform-data">Third-Party Platform Data</a>
            <a href="#contact">Contact</a>
          </aside>

          <article className={styles.privacyDocument}>
            <p>
              These instructions apply to personal information that you have
              provided directly to ColourPlus, including information submitted
              through our website enquiry forms or received through a
              third-party lead form.
            </p>

            <section id="request">
              <h2>01. How to Request Deletion</h2>
              <p>
                Email{" "}
                <a href="mailto:info@colourplus.in?subject=Personal%20data%20deletion%20request">
                  info@colourplus.in
                </a>{" "}
                with the subject “Personal data deletion request”. You may
                also write to us at the postal address in the contact details
                below.
              </p>
              <p>
                We will use the details you provide to locate your records and
                respond to your request. We may contact you to verify your
                identity before acting, so that another person cannot request
                deletion of your information without authorisation.
              </p>
            </section>

            <section id="what-to-include">
              <h2>02. What to Include</h2>
              <p>To help us identify the right records, include:</p>
              <ul>
                <li>Your name</li>
                <li>The email address and/or phone number used when contacting us</li>
                <li>Where you submitted your information (for example, our website or a social media lead form), if known</li>
                <li>A clear statement that you want your personal information deleted</li>
              </ul>
              <p>
                Please do not send passwords, payment details or other
                sensitive information with your request.
              </p>
            </section>

            <section id="what-happens">
              <h2>03. What Happens Next</h2>
              <p>
                We will review your request and, where appropriate, delete or
                anonymise personal information that we hold and are not
                required or otherwise permitted to retain. If some information
                must be retained—for example, to meet a legal obligation,
                maintain required business records or resolve a dispute—we
                will restrict it to that purpose for the required period.
              </p>
              <p>
                We may ask for additional information to verify your identity
                or locate the relevant records. We will respond to your
                request in accordance with applicable law.
              </p>
            </section>

            <section id="platform-data">
              <h2>04. Data Held by Third-Party Platforms</h2>
              <p>
                If you submitted information through Facebook, Instagram or
                another platform, you can also use that platform’s own
                privacy settings or data-request process to manage information
                held by the platform. A request to ColourPlus concerns
                information held by us; it does not delete information held
                independently by the platform.
              </p>
            </section>

            <section id="contact" className={styles.privacyContact}>
              <h2>05. Contact</h2>
              <div className={styles.contactCard}>
                <h3>ColourPlus Polyurethanes Pvt. Ltd.</h3>
                <div className={styles.contactRow}>
                  <span>Email</span>
                  <a href="mailto:info@colourplus.in">info@colourplus.in</a>
                </div>
                <div className={styles.contactRow}>
                  <span>Phone</span>
                  <a href="tel:+919035026984">+91 9035026984</a>
                </div>
                <div className={styles.contactDivider} />
                <div className={styles.contactLabel}>Postal address</div>
                <p>
                  B-20, KSSIDC Tarihal Gamanagatti Road, Industrial Area,
                  Hubballi - 580025, Karnataka
                </p>
              </div>
              <p>
                For more information about how we collect and use personal
                information, see our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
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
