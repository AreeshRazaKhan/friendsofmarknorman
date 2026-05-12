import Link from "next/link";

import PageHero from "@/components/layout/page-hero";
import LegalProse from "@/components/layout/legal-prose";

import { CAMPAIGN, LEGAL } from "@/constants/site";

export const metadata = {
  title: `Privacy Policy — ${CAMPAIGN.candidate} for Oregon`,
  description: `Privacy Policy for ${LEGAL.entity}, including the SMS messaging program.`,
};

const PrivacyPolicyPage = () => {
  return (
    <>
      <PageHero
        eyebrow="privacy policy"
        title="Privacy Policy"
        lead={`How ${LEGAL.entity} collects, uses, stores, and protects information from supporters and visitors — including data tied to our SMS messaging program. Effective ${LEGAL.effectiveDate}.`}
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="mb-10 max-w-3xl rounded-md border border-red/40 bg-red/5 p-5 text-sm leading-relaxed text-stone-dark">
            <p>
              <strong className="text-red">Draft for legal review.</strong> This
              document was prepared to satisfy the structural requirements of
              A2P 10DLC carrier review and the Telephone Consumer Protection Act
              (TCPA). It must be reviewed and finalized by {LEGAL.entity}&apos;s
              qualified legal counsel before publication.
            </p>
          </div>

          <LegalProse>
            <p>
              <strong>{LEGAL.entity}</strong> (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;, &ldquo;our&rdquo;) is the registered campaign
              committee operating this website at{" "}
              <Link href="/">{CAMPAIGN.domain}</Link> (&ldquo;the Site&rdquo;).
              We are committed to protecting the privacy of every visitor,
              supporter, donor, and volunteer who interacts with us. This
              Privacy Policy explains what information we collect, how we use
              it, who we share it with, and the choices you have. It applies to
              every page on this Site and to our SMS messaging program described
              in Section 4.
            </p>

            <h2>1. Who we are</h2>
            <p>
              <strong>{LEGAL.entity}</strong> · PAC #{LEGAL.pacId}.
            </p>
            <ul>
              <li>
                Mail:{" "}
                <a href={`mailto:${LEGAL.privacyEmail}`}>
                  {LEGAL.privacyEmail}
                </a>{" "}
                · <a href={`tel:${LEGAL.phoneTel}`}>{LEGAL.phone}</a>
              </li>
              <li>Address: {LEGAL.address}</li>
              <li>Disclosure: {CAMPAIGN.disclosure}.</li>
            </ul>

            <h2>2. Information we collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul>
              <li>
                Name, email, ZIP code, and (optional) phone number when you sign
                up.
              </li>
              <li>
                Volunteer interests, availability, and skills when you submit
                the volunteer form.
              </li>
              <li>RSVP information when you register for an event.</li>
              <li>The content of any message you send us.</li>
              <li>
                Donation information processed through our payment processor,
                including amount and billing details required by Oregon
                Secretary of State reporting rules.
              </li>
            </ul>
            <p>We also collect limited technical information automatically:</p>
            <ul>
              <li>
                Standard server logs (IP address, user agent, page requested,
                timestamp).
              </li>
              <li>
                Anonymous analytics to understand which pages and posts are
                useful. We do not use third-party advertising trackers.
              </li>
            </ul>

            <h2>3. How we use information</h2>
            <ul>
              <li>To respond to your messages and questions.</li>
              <li>To coordinate volunteer activity and event logistics.</li>
              <li>
                To send campaign updates, event reminders, and (with your
                separate opt-in) fundraising appeals.
              </li>
              <li>
                To comply with Oregon and federal campaign-finance reporting
                rules.
              </li>
              <li>To detect, prevent, and respond to fraud or abuse.</li>
            </ul>

            <h2>4. SMS / Text messaging program</h2>
            <p>
              {LEGAL.entity} operates an SMS program under the name{" "}
              <strong>{LEGAL.programName}</strong>. The program is opt-in only.
            </p>

            <h3>What we collect</h3>
            <ul>
              <li>
                The mobile phone number you provide on a sign-up, contact, or
                volunteer form.
              </li>
              <li>
                A timestamped record of your consent (which checkbox you ticked,
                on which page, at what time, from what IP address).
              </li>
            </ul>

            <h3>How we use phone numbers</h3>
            <ul>
              <li>
                <strong>Informational messages</strong> — campaign updates,
                event reminders, volunteer-shift coordination, replies to
                inquiries.
              </li>
              <li>
                <strong>Promotional messages</strong> (separate opt-in) —
                fundraising appeals, donation drives, occasional special
                promotions tied to the campaign.
              </li>
            </ul>
            <p>
              Message frequency varies. Message &amp; data rates may apply. You
              can reply STOP to any message to unsubscribe, or HELP for help.
            </p>

            <h3>Data retention</h3>
            <p>
              We retain phone numbers and timestamped consent records for the
              duration of the 2026 election cycle plus 5 years, to satisfy
              campaign-finance recordkeeping rules and to honor opt-out
              requests. Numbers that opt out are added to a permanent
              suppression list so we never message them again.
            </p>

            <h3>Data deletion requests</h3>
            <p>
              You can request that we delete your phone number, email, or other
              personal information at any time by emailing{" "}
              <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>{" "}
              or calling <a href={`tel:${LEGAL.phoneTel}`}>{LEGAL.phone}</a>. We
              honor opt-out requests within 10 business days, and full deletion
              requests within 30 days, subject to any legal recordkeeping
              obligations.
            </p>

            <h3>Text Messaging Opt-In Data</h3>
            <p>
              <strong>Text Messaging Opt-In Data:</strong> We will not share or
              sell your text messaging opt-in data, consent, or related personal
              information with any third parties, unless required by law. SMS
              opt-in data is excluded from any aggregated, partner, or vendor
              data sharing described elsewhere in this policy.
            </p>

            <h2>5. How we share information</h2>
            <p>We share information only in the following circumstances:</p>
            <ul>
              <li>
                With service providers who help us run the campaign (email
                platform, payment processor, voter file vendor) under written
                agreements that limit their use to providing services to us.
              </li>
              <li>
                With government agencies when required by Oregon or federal law.
              </li>
              <li>
                To protect the rights, property, or safety of the campaign,
                staff, or the public.
              </li>
            </ul>
            <p>
              We do not sell personal information. SMS opt-in data is never
              shared, even with the service-provider categories above, except to
              the SMS aggregator that physically delivers your message.
            </p>

            <h2>6. Your rights and choices</h2>
            <ul>
              <li>
                <strong>SMS opt-out:</strong> reply STOP to any campaign
                message, or contact us at{" "}
                <a href={`mailto:${LEGAL.privacyEmail}`}>
                  {LEGAL.privacyEmail}
                </a>
                .
              </li>
              <li>
                <strong>Email opt-out:</strong> click the unsubscribe link in
                any email from us.
              </li>
              <li>
                <strong>Access &amp; deletion:</strong> email{" "}
                <a href={`mailto:${LEGAL.privacyEmail}`}>
                  {LEGAL.privacyEmail}
                </a>{" "}
                to request a copy of your data or to have it deleted.
              </li>
              <li>
                <strong>Cookies:</strong> manage cookie preferences through your
                browser settings.
              </li>
            </ul>

            <h2>7. Children</h2>
            <p>
              The Site and the SMS program are not directed to children under
              18. We do not knowingly collect personal information from anyone
              under 18. If you believe we have, please email{" "}
              <a href={`mailto:${LEGAL.privacyEmail}`}>{LEGAL.privacyEmail}</a>{" "}
              and we will delete the information.
            </p>

            <h2>8. Security</h2>
            <p>
              We use reasonable administrative, technical, and physical
              safeguards to protect the information we hold. No system is
              perfectly secure; please contact us immediately if you suspect
              unauthorized access.
            </p>

            <h2>9. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy. The current effective date is
              at the top of the page. Material changes will be posted on this
              page and, where legally required, communicated by email or SMS to
              active subscribers.
            </p>

            <h2>10. Contact us</h2>
            <p>
              For privacy questions, deletion requests, or to exercise any right
              described above, contact us at:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a href={`mailto:${LEGAL.privacyEmail}`}>
                  {LEGAL.privacyEmail}
                </a>
              </li>
              <li>
                Phone: <a href={`tel:${LEGAL.phoneTel}`}>{LEGAL.phone}</a>
              </li>
              <li>
                Mail: {LEGAL.entity} · {LEGAL.address}
              </li>
            </ul>
          </LegalProse>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
