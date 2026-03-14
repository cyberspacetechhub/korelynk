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

Email: inntechlabs@gmail.com
Address: Abakaliki, Ebonyi State, Nigeria`
  }
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-midnight transition-colors">
      <SEO
        title="Privacy Policy - InnTechLabs"
        description="Learn how InnTechLabs collects, uses, and protects your personal information."
      />

      {/* Hero */}
      <section className="relative py-20 bg-gray-900 dark:bg-midnight overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-gradient-electric rounded-xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-300 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12 mb-8">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              At InnTechLabs, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-white/20 transition-all">
                <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-4">{section.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
