import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from '../../api/axios';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const contactMutation = useMutation(
    (data) => axios.post('feedback', { 
      name: data.name,
      email: data.email, 
      subject: data.subject,
      message: data.message,
      rating: 5,
      category: null
    }),
    {
      onSuccess: () => {
        toast.success('Message sent successfully!');
        reset();
      },
      onError: (error) => {
        console.error('Error sending message:', error);
        toast.error(error.response?.data?.message || 'Failed to send message. Please try again.');
      }
    }
  );

  const onSubmit = (data) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Get in Touch</h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Have a story idea, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="p-8 bg-white shadow-lg rounded-2xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 ${
                    errors.subject ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message', { required: 'Message is required' })}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 ${
                    errors.message ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={contactMutation.isLoading}
                className="w-full px-6 py-3 font-semibold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactMutation.isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="p-8 bg-white shadow-lg rounded-2xl">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg">
                    <Email className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">hello@magazine.com</p>
                    <p className="text-gray-600">editorial@magazine.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+234 803 501 5172</p>
                    <p className="text-gray-600">+234 816 841 8960</p>
                    <p className="text-gray-600">+234 806 807 3321</p>
                    <p className="text-sm text-gray-600">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg">
                    <LocationOn className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Office</h3>
                    <p className="text-gray-600">17, Chukwuma Ofoke Street</p>
                    <p className="text-gray-600">Abakaliki, Ebonyi State</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="p-8 bg-white shadow-lg rounded-2xl">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">How can I submit an article?</h3>
                  <p className="text-sm text-gray-600">
                    Send your pitch to editorial@magazine.com with a brief outline and your credentials.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Do you accept guest posts?</h3>
                  <p className="text-sm text-gray-600">
                    Yes! We welcome high-quality guest contributions. Please review our guidelines first.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">How often do you publish?</h3>
                  <p className="text-sm text-gray-600">
                    We publish new content daily and release monthly themed editions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;