import React from 'react';
import { Shield } from 'lucide-react';
import SEO from '../components/SEO';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, contact us, subscribe to our newsletter, or submit feedback. This includes:
    
• Name, email address, and phone number
• Company name and project details
• Usage data and analytics
• Communications you send us`
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Send you technical notices and support messages
• Respond to your comments and questions
• Send you marketing communications (with your consent)
• Monitor and analyze usage patterns`
  },
  {
    title: '3. Information Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Service providers who assist in our operations
• Business partners with your consent
• Law enforcement when required by law
• Successors in the event of a merger or acquisition`
  },
  {
    title: '4. Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.`
  },
  {
    title: '5. Cookies',
    content: `We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.`
  },
  {
    title: '6. Your Rights',
    content: `You have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate data
• Request deletion of your personal data
• Opt out of marketing communications
• Data portability`
  },
  {
    title: '7. Contact Us',
    content: `If you have any questions about this Privacy Policy, please contact us at:

Email: inntechlabhq@gmail.com
Address: Abakaliki, Ebonyi State, Nigeria`
  }
];

const Privacy = () => {
  return (
    <div className="min-h-screen transition-colors bg-white dark:bg-midnight">
      <SEO
        title="Privacy Policy - InnTechLab"
        description="Learn how InnTechLab collects, uses, and protects your personal information."
      />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gray-900 dark:bg-midnight">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="container relative px-6 mx-auto text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-electric rounded-xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl font-display">Privacy Policy</h1>
          <p className="text-lg text-gray-300">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container max-w-4xl px-6 mx-auto">
          <div className="p-8 mb-8 border border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10 rounded-2xl md:p-12">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              At InnTechLab, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="p-8 transition-all bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl hover:border-gray-300 dark:hover:border-white/20">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 font-display dark:text-white">{section.title}</h2>
                <p className="leading-relaxed text-gray-600 whitespace-pre-line dark:text-gray-300">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
