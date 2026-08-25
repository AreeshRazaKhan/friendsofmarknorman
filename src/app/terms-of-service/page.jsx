import Link from 'next/link'

import PageHero from '@/components/layout/page-hero'
import LegalProse from '@/components/layout/legal-prose'

import { CAMPAIGN, LEGAL } from '@/constants/site'

export const metadata = {
  title: `Terms of Service — ${CAMPAIGN.candidate} for Oregon`,
  description: `Terms of Service for ${LEGAL.entity} and the campaign SMS messaging program.`,
}

const TermsOfServicePage = () => {
  return (
    <>
      <PageHero
        eyebrow="terms of service"
        title="Terms of Service"
        lead={`These terms govern your use of this website and the ${LEGAL.programName}. Effective ${LEGAL.effectiveDate}.`}
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <LegalProse>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the{' '}
              <Link href="/">{CAMPAIGN.domain}</Link> website (&ldquo;the Site&rdquo;) operated by{' '}
              <strong>{LEGAL.entity}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;) and the {LEGAL.programName} (&ldquo;the SMS Program&rdquo;). By
              using the Site or opting into the SMS Program, you agree to these Terms.
            </p>

            <h2>1. About this site and the SMS program</h2>
            <p>
              <strong>Program name:</strong> {LEGAL.programName}.
            </p>
            <p>
              <strong>Description:</strong> When you opt in by checking the appropriate consent
              box on a sign-up, contact, volunteer, or RSVP form, you can expect to receive calls
              and text messages from {LEGAL.entity} of two types:
            </p>
            <ul>
              <li>
                <strong>Informational</strong> — campaign updates, event reminders, volunteer-shift
                coordination, and direct replies to inquiries.
              </li>
              <li>
                <strong>Promotional</strong> (separate opt-in) — fundraising appeals, donation
                drives, and event invitations tied to the campaign.
              </li>
            </ul>
            <p>
              Messaging may include requests for donation. Each consent type is collected with a
              separate, optional checkbox. Checking one does not opt you into the other, and
              neither is required to use this site or to make a donation.
            </p>

            <h2>2. Opt-out (STOP)</h2>
            <p>
              You can cancel the SMS service at any time. Simply text <strong>STOP</strong> to the
              shortcode or long code from which you received our message. After you send the SMS
              message &ldquo;STOP&rdquo; to us, we will send you an SMS message to confirm that you
              have been unsubscribed. After this, you will no longer receive SMS messages from us.
              If you want to join again, just sign up as you did the first time and we will start
              sending SMS messages to you again.
            </p>

            <h2>3. Help (HELP)</h2>
            <p>
              If you experience issues with the messaging program, reply with the keyword{' '}
              <strong>HELP</strong> for more assistance, or reach out directly to{' '}
              <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> or{' '}
              <a href={`tel:${LEGAL.phoneTel}`}>{LEGAL.phone}</a>.
            </p>

            <h2>4. Carrier liability</h2>
            <p>
              <strong>
                Carriers are not liable for delayed or undelivered messages.
              </strong>{' '}
              Delivery of SMS messages depends on the technical capabilities and policies of your
              wireless carrier and your handset, neither of which is under our control.
            </p>

            <h2>5. Message and data rates · message frequency</h2>
            <p>
              As always, Msg &amp; data rates may apply for messages sent to you from us and to us
              from you. Msg frequency may vary based on the cycle of the campaign and the type of
              consent you have given. You can reply STOP to opt-out at any time, or HELP for help.
            </p>

            <h2>6. Eligibility</h2>
            <p>
              The SMS Program is intended for U.S. residents 18 years of age or older with a U.S.
              mobile number. You represent that you are the account holder of the mobile number
              you provide, or that you are authorized to provide it.
            </p>

            <h2>7. Acceptable use of the website</h2>
            <ul>
              <li>You may not use the Site for any unlawful purpose.</li>
              <li>
                You may not attempt to gain unauthorized access to any part of the Site or any
                connected system.
              </li>
              <li>
                You may not submit false information through any form on the Site, or use any form
                to harass, threaten, or impersonate another person.
              </li>
              <li>
                You may not use automated tools (scrapers, bots, denial-of-service tools) against
                the Site.
              </li>
            </ul>

            <h2>8. Intellectual property</h2>
            <p>
              All content on the Site, including the {LEGAL.entity} logo, photography, copy, and
              code, is owned by or licensed to {LEGAL.entity} and is protected by U.S. and
              international copyright and trademark law. You may not reproduce, distribute, or
              create derivative works without our written permission, except for fair use.
            </p>

            <h2>9. Donations and campaign-finance compliance</h2>
            <p>
              Contributions to {LEGAL.entity} are not tax-deductible. By making a contribution,
              you certify that:
            </p>
            <ol>
              <li>You are a U.S. citizen or lawfully admitted permanent resident.</li>
              <li>The contribution is made from your own funds and not from the funds of another.</li>
              <li>You are at least 18 years old.</li>
              <li>You are not a federal contractor.</li>
              <li>The funds are not provided by a corporation, foreign national, or other prohibited source.</li>
            </ol>
            <p>{CAMPAIGN.disclosure}.</p>

            <h2>10. Disclaimers</h2>
            <p>
              The Site and the SMS Program are provided &ldquo;as is&rdquo; without warranty of
              any kind, express or implied. To the fullest extent permitted by law, {LEGAL.entity}{' '}
              disclaims all warranties of merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>

            <h2>11. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, {LEGAL.entity} will not be liable for any
              indirect, incidental, consequential, special, or punitive damages arising out of or
              relating to your use of the Site or the SMS Program.
            </p>

            <h2>12. Privacy</h2>
            <p>
              For privacy-related inquiries, please refer to our{' '}
              <Link href="/privacy-policy">Privacy Policy</Link>. The Privacy Policy explains how
              we collect, use, and share information, including phone numbers and SMS consent
              records.
            </p>

            <h2>13. Changes to these terms</h2>
            <p>
              We may update these Terms. The current effective date is at the top of the page.
              Material changes will be communicated on this page and, where legally required, by
              email or SMS to active subscribers.
            </p>

            <h2>14. Governing law</h2>
            <p>
              These Terms are governed by the laws of the State of {LEGAL.state}, without regard
              to its conflict-of-laws principles.
            </p>

            <h2>15. Contact</h2>
            <ul>
              <li>
                Email: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
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
  )
}

export default TermsOfServicePage
