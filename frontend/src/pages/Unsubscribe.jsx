import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, CheckCircle, XCircle } from 'lucide-react';
import axios from '../api/axios';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(''); // 'success', 'error', ''

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await axios.post('/newsletter/unsubscribe', { email });
      if (response.data.success) {
        setStatus('success');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-6">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Unsubscribe from Newsletter
                </h1>
                <p className="text-gray-600">
                  We're sorry to see you go. You can unsubscribe from our newsletter below.
                </p>
              </div>

              {status === 'success' ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Successfully Unsubscribed
                  </h2>
                  <p className="text-gray-600 mb-6">
                    You have been successfully unsubscribed from our newsletter. 
                    You will no longer receive email updates from us.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Return to Homepage
                  </a>
                </div>
              ) : status === 'error' ? (
                <div className="text-center">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Unsubscribe Failed
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We couldn't find your email in our newsletter list, or there was an error processing your request.
                  </p>
                  <button
                    onClick={() => setStatus('')}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUnsubscribe}>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : null}
                    {loading ? 'Unsubscribing...' : 'Unsubscribe'}
                  </button>
                </form>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Changed your mind?{' '}
                  <a href="/" className="text-indigo-600 hover:text-indigo-700">
                    Return to homepage
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unsubscribe;