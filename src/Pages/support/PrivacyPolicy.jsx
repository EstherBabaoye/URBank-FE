import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | URBank";
  }, []);

  return (
    <section className="min-h-screen mt-16 bg-[#f9fafb] pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-2xl text-center font-bold text-[#051d40]">Your Bank, Your Privacy</h1>
        <p className="text-sm text-gray-700">
          At URBank and our affiliated service providers, your privacy matters.
          We're committed to transparency and responsible use of your personal data
          across all our services.
        </p>

        <Section title="1. URBank and You">
          <p>
            This Privacy Policy explains how URBank handles your data, your rights, and
            our responsibilities when offering services to you across all channels.
            Subsidiaries covered by this policy include:
          </p>
          <ul className="list-disc ml-6 text-sm mt-2">
            <li>URBank Ghana Limited</li>
            <li>URBank Gambia Limited</li>
            <li>URBank Sierra Leone Limited</li>
            <li>UR Pension Custodian Nigeria Limited</li>
            <li>UR Nominees Nigeria Limited</li>
          </ul>
        </Section>

        <Section title="2. Your Personal Information">
          <p>
            We collect your personal data via forms, calls, apps, emails, ATMs, and other
            URBank platforms.
          </p>
          <ul className="list-disc ml-6 text-sm mt-2">
            <li><strong>Identity Data:</strong> Name, DOB, Passport info</li>
            <li><strong>Contact Data:</strong> Address, phone, email</li>
            <li><strong>Financial & Transaction Data</strong></li>
            <li><strong>Technical & Profile Data:</strong> IP, device info, usage</li>
            <li><strong>Other:</strong> CCTV, call recordings</li>
          </ul>
        </Section>

        <Section title="3. Consent">
          <p>
            You consent to our data use when you fill out forms, tick boxes online, or use
            our services. We ensure consent is freely given, informed, and revocable.
          </p>
        </Section>

        <Section title="4. Use of Your Information">
          <p>
            We use your info to serve you better, deliver banking services, support you,
            comply with regulations, and improve our products. We will not use your data
            beyond its intended lawful basis.
          </p>
        </Section>

        <Section title="5. Cookies">
          <p>
            URBank uses cookies to optimize your experience. See our Cookie Policy for
            full details.
          </p>
        </Section>

        <Section title="6. Information Sharing and Disclosure">
          <p>
            We do not sell your data. We only share when you consent, or where law or
            audits require it. We may share with subsidiaries and affiliates for service
            purposes.
          </p>
        </Section>

        <Section title="7. Cross-Border Data Transfer">
          <p>
            URBank may transfer your data across borders securely, using authorized legal
            instruments, and only with compliant third-party providers.
          </p>
        </Section>

        <Section title="8. Information Protection">
          <p>
            We secure your data using best practices like encryption, staff training, and
            access control. You're responsible for keeping your login credentials safe.
          </p>
        </Section>

        <Section title="9. Retention">
          <p>
            We retain your data as required by law, regulations, and our internal policies
            — only for as long as necessary.
          </p>
        </Section>

        <Section title="10. Your Rights Under This Policy">
          <ul className="list-disc ml-6 text-sm">
            <li>Request or access your personal data</li>
            <li>Update or correct your data</li>
            <li>Withdraw consent at any time</li>
            <li>Request data deletion (subject to legal exceptions)</li>
            <li>Object to or restrict processing</li>
            <li>Not be subject to solely automated decisions</li>
          </ul>
        </Section>

        <Section title="11. Remedies & Complaints">
          <p className="text-sm">
            For questions, contact us via:
            <br />
            📧 <a href="mailto:urbank-admin@nhsurulere.site" className="text-[#051d40] underline">urbank.complaints@urbank.com</a><br />
            📧 <a href="mailto:urbank-admin@nhsurulere.site" className="text-[#051d40] underline">dataprotectionoffice@urbankgroup.com</a><br />
            ☎️ +234 8140475605
            <br />
            If unresolved, you may contact the Nigeria Data Protection Commission (NDPC): <br />
            📧 <a href="mailto:info@ndpc.gov.ng" className="text-[#051d40] underline">info@ndpc.gov.ng</a>
          </p>
        </Section>

        <div className="text-xs text-gray-500 mt-6">
          <p>Last updated: June 2025. We will notify you of changes via our website.</p>
        </div>
      </div>
    </section>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[#051d40] mb-2">{title}</h2>
      <div className="text-sm text-gray-700 space-y-2">{children}</div>
    </div>
  );
}
