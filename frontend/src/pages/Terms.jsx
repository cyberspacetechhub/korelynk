import React from 'react';
import { FileText } from 'lucide-react';
import SEO from '../components/SEO';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing and using InnTechLabs's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our services.`
  },
  {
    title: '2. Use of Services',
    content: `You agree to use our services only for lawful purposes and in a way that does not infringe the rights of others. You must not:

• Use our services for any unlawful purpose
• Attempt to gain unauthorized access to our systems
• Transmit any harmful, offensive, or disruptive content
• Impersonate any person or entity
• Interfere with the proper working of our services`
  },
  {
    title: '3. Intellectual Property',
    content: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of InnTechLabs and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`
  },
  {
    title: '4. User Accounts',
    content: `When you create an account with us, you must provide accurate and complete information. You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized use
• Ensuring your account information remains current`
  },
  {
    title: '5. Payment Terms',
    content: `For paid services, you agree to pay all fees associated with your chosen plan. All payments are non-refundable unless otherwise stated. We reserve the right to modify our pricing with reasonable notice.`
  },
  {
    title: '6. Disclaimer of Warranties',
    content: `Our services are provided "as is" without any warranties, express or implied. We do not warrant that our services will be uninterrupted, error-free, or free of viruses or other harmful components.`
  },
  {
    title: '7. Limitation of Liability',
    content: `To the maximum extent permitted by law, InnTechLabs shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.`
  },
  {
    title: '8. Termination',
    content: `We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.`
  },
  {
    title: '9. Changes to Terms',
    content: `We reserve the right to modify these terms at any time. We will notify users of significant changes via email or a prominent notice on our website. Your continued use of our services after changes constitutes acceptance of the new terms.`
  },
  {
    title: '10. Contact Information',
    content: `For questions about these Terms of Service, please contact us at:

Email: inntechlabs@gmail.com
Address: Abakaliki, Ebonyi State, Nigeria`
  }
];

const Terms = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-midnight transition-colors">
      <SEO
        title="Terms of Service - InnTechLabs"
        description="Read the Terms of Service for InnTechLabs's website and services."
      />

      {/* Hero */}
      <section className="relative py-20 bg-gray-900 dark:bg-midnight overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-gradient-electric rounded-xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-4">Terms of Service</h1>
          <p className="text-gray-300 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12 mb-8">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Please read these Terms of Service carefully before using InnTechLabs's website and services.
              These terms govern your access to and use of our platform.
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

export default Terms;
