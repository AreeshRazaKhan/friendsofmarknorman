# Peerly 10DLC Compliance (load-bearing — do not break)

This site registers for 10DLC peer-to-peer texting through **Peerly**.
Peerly review sits **on top of** the A2P/TCR checklist in
`brand-rules.md` §14 — it does not replace it. Both must pass.

Source: Operation 1776 SOP — *Peerly 10DLC Compliance*
(`SOP_Peerly_10DLC_Compliance.pdf`, repo root).

**Registration type for this site: Political** (candidate committee,
`Friends of Mark Norman` PAC #24927). That determines everything below —
political registrations *must* carry donation language and *must* supply
a Campaign Verify token.

---

## 1. Phone field is OPTIONAL on every form — no exceptions

Peerly rejects a site where any phone field is `required`. Every form
that collects a phone number keeps it optional, on both the client and
the API route:

| Form | Component |
|------|-----------|
| Contact | `src/components/contact/contact-form.jsx` |
| Volunteer | `src/components/volunteer/volunteer-signup.jsx` |
| Event RSVP | `src/components/events/rsvp-form.jsx` |
| Ask Mark | `src/components/ask/ask-form.jsx` |
| Lead-magnet funnels | `src/components/socialism-101/socialism-101-form.jsx` |

The lead-magnet component is shared by `/socialism-101`,
`/5-minute-voter-guide`, and `/meet-mark`. Changing it changes three
funnels at once.

"Optional" still means *blank or complete* — a partially typed number is
rejected inline and with a `400`, per `forms-compliance-pattern.md` §2.
That is not the same as making the field required.

---

## 2. ONE consent checkbox, and its text is approved copy

There is exactly **one** SMS consent checkbox, on every form. It is
rendered by `<SmsConsent />` (`src/components/layout/sms-consent.jsx`) —
the single component every phone-collecting form imports. Never
re-implement consent markup inline in a form.

Text lives in `SMS_DISCLAIMER` (`src/constants/site.js`), split only so
the component can bold the entity name and hyperlink the policy link.
Concatenated it reads:

```
By providing your telephone number and checking this box, you consent to
receive calls and text messages from Friends of Mark Norman. Message & data
rates may apply. Message frequency may vary. Messaging may include campaign
updates, event invitations, volunteer opportunities, and requests for
donations. Reply STOP to opt out & HELP for help. View our Privacy Policy for
more information.
```

### CRITICAL

- **This is client-approved copy. Do not reword it** — not the
  abbreviations, not the ordering, not the message-type list. Carrier
  reviewers read the live page.
- **"requests for donations" is mandatory** for political
  registrations. Removing it fails review. (It is the one clause a
  for-profit registration must *not* have — irrelevant here, but that is
  why it can look removable and is not.)
- **The disclaimer is the checkbox label.** SOP Step 2 explicitly allows
  the disclaimer to be "embedded in a consent statement" rather than
  sitting in a separate block — that is the format in use. Do not add a
  second, standalone disclaimer block; it duplicates this text.
- **"Privacy Policy" must be a live hyperlink** to `/privacy-policy`.
- **Do not add a second checkbox.** An earlier build split consent into
  informational + promotional boxes; that was deliberately collapsed to
  one. See §3.
- Do not add explanatory copy below the checkbox — it was removed on
  purpose.

---

## 3. One checkbox — and why the two-checkbox pattern is gone

`brand-rules.md` §14.2 originally called for two separate optional
checkboxes (informational + promotional) and §14.5 required active
"I agree to receive…" phrasing. Both were superseded by the approved
copy above, which is a single passive-voice consent statement covering
every message type in one sentence.

This is intentional and client-approved. Do not "restore" the two-box
pattern or rewrite the sentence into the active voice to satisfy the
older rules — those sections now point here.

**Payload mapping.** The GHL webhook contract still carries two flags,
so the API routes derive both from the single checkbox:

```js
sms_updates: yesNo(body?.sms_consent),
sms_promo:   yesNo(body?.sms_consent),
```

That is correct, not a copy-paste bug: the approved copy covers campaign
updates, event invitations, volunteer opportunities *and* donation
requests, so a single tick is consent for both categories. The client
sends `sms_consent`; nothing sends `sms_updates`/`sms_promo` anymore.
Keeping both flags means no GHL workflow had to change.

---

## 4. Never on this site

- **No marketing, promotional-offer, or sweepstakes language** anywhere
  on the site or in the Peerly registration. Political fundraising
  ("fundraising appeals", "donation drives", "event invitations") is
  fine and expected. Commercial-sounding copy ("special promotions",
  "giveaway", "enter to win", "free gift") is not — it reads as a
  different use case than the one registered.
- **No language permitting sharing of SMS consent data**, except the
  "unless required by law" carve-out. The approved wording lives at
  `src/app/privacy-policy/page.jsx` under *Text Messaging Opt-In Data*
  and is reproduced below. Do not soften it, and do not let a general
  "we share with vendors" clause elsewhere in the policy swallow it —
  the policy explicitly excludes SMS opt-in data from those categories.

  > Text Messaging Opt-In Data: We will not share or sell your text
  > messaging opt-in data, consent, or related personal information with
  > any third parties, unless required by law.

---

## 5. Name consistency (adds two surfaces to §14.4)

`LEGAL.entity` (`Friends of Mark Norman`) must match **exactly** across:

1. Privacy Policy
2. Terms of Service
3. SMS consent checkbox language
4. Footer copyright
5. Contact page
6. **Campaign Verify submission** (committee name)
7. **Peerly registration** (Organization Legal Name)

A mismatch between the Campaign Verify committee name and the site is a
top rejection cause and cannot be fixed without re-running verification.

---

## 6. Out of scope for this repo

SOP Parts B and C are operational, not code. They are recorded here only
so nobody looks for them in the codebase:

- **Part B — Campaign Verify token.** Required for political
  registrations. Client obtains it at `campaignverify.org` ($95
  standard / $400 expedited), PIN by text or mail, token valid for a
  two-year election cycle. Track the expiration.
- **Part C — Peerly registration.** Organization info, two sample
  messages consistent with the on-site disclaimer and free of
  marketing/promotional/sweepstakes language, then submit with the
  Campaign Verify token. Political registrations need no further
  documents. Status is tracked in the campaign's Asana project.

---

## 7. Checklist — any change to a form, footer, or legal page

1. [ ] Phone field still optional on all five form components
2. [ ] `<SmsConsent />` still imported — never re-implement consent inline
3. [ ] `SMS_DISCLAIMER` text unchanged, word for word
4. [ ] Still exactly **one** checkbox — no second box, no standalone
       disclaimer block, no explanatory line beneath it
5. [ ] "Privacy Policy" hyperlinked to `/privacy-policy`
6. [ ] Checkbox not pre-checked, `disabled={!hasPhone}`, `required={hasPhone}`,
       and cleared by the `useEffect` when the phone is emptied
7. [ ] "requests for donations" still present in the consent text
8. [ ] Client sends `sms_consent`; every API route maps it to **both**
       `sms_updates` and `sms_promo`
9. [ ] No marketing/promotional-offer/sweepstakes wording introduced
10. [ ] `Text Messaging Opt-In Data` paragraph intact in the Privacy Policy
11. [ ] `LEGAL.entity` unchanged across all seven surfaces in §5
