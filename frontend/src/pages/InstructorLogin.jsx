import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Users, BookOpen } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const InstructorLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
    expertise: [],
    verificationCode: '',
    resetCode: '',
    newPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post('/instructors/login', {
          email: formData.email,
          password: formData.password
        });
        
        if (response.data.success) {
          localStorage.setItem('instructorToken', response.data.data.token);
          localStorage.setItem('instructorData', JSON.stringify(response.data.data.instructor));
          toast.success('Login successful!');
          window.location.href = '/instructor/dashboard';
        }
      } else {
        const response = await axios.post('/instructors/register', {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          bio: formData.bio,
          expertise: formData.expertise
        });
        
        if (response.data.success) {
          // Show code in toast for 5 seconds if available (dev mode)
          if (response.data.data.devCode) {
            toast.success(`Verification code: ${response.data.data.devCode}`, {
              autoClose: 5000,
              hideProgressBar: false
            });
          } else {
            toast.success('Verification code sent to your email!');
          }
          setStep(2);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/instructors/verify-email', {
        email: formData.email,
        code: formData.verificationCode
      });
      
      if (response.data.success) {
        localStorage.setItem('instructorToken', response.data.data.token);
        localStorage.setItem('instructorData', JSON.stringify(response.data.data.instructor));
        toast.success('Account verified successfully!');
        window.location.href = '/instructor/dashboard';
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (resetStep === 1) {
        await axios.post('/instructors/request-reset', { email: formData.email });
        toast.success('Reset code sent to your email!');
        setResetStep(2);
      } else if (resetStep === 2) {
        await axios.post('/instructors/reset-password', {
          email: formData.email,
          code: formData.resetCode,
          newPassword: formData.newPassword
        });
        toast.success('Password reset successfully!');
        setShowResetModal(false);
        setResetStep(1);
        setFormData({ ...formData, resetCode: '', newPassword: '' });
      }
    } catch (error) {
      console.error('Reset error:', error);
      toast.error(error.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Instructor Sign In' : 'Join as Instructor'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Access your teaching dashboard' : 'Start teaching with us'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required={!isLogin}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required={!isLogin}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your phone number"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="pl-10 pr-12 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio (Optional)
                </label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tell us about your teaching experience..."
                />
              </div>
            )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </div>

            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowResetModal(true)}
                  className="text-purple-600 hover:text-purple-800 text-sm"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 hover:text-purple-800"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="text-center">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                ← Back to Home
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerification} className="mt-8 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Verify Your Email</h3>
                <p className="text-gray-600 mt-2">Enter the 6-digit code sent to {formData.email}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData({...formData, verificationCode: e.target.value})}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg tracking-widest"
                  placeholder="000000"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Verifying...' : 'Verify Account'}
              </button>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 text-gray-600 hover:text-gray-800 text-sm"
                >
                  ← Back to registration
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const response = await axios.post('/instructors/register', {
                        fullName: formData.fullName,
                        email: formData.email,
                        password: formData.password,
                        phone: formData.phone,
                        bio: formData.bio,
                        expertise: formData.expertise
                      });
                      if (response.data.success) {
                        if (response.data.data.devCode) {
                          toast.success(`New code: ${response.data.data.devCode}`, {
                            autoClose: 5000,
                            hideProgressBar: false
                          });
                        } else {
                          toast.success('New verification code sent!');
                        }
                      }
                    } catch (error) {
                      toast.error('Failed to resend code');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="flex-1 text-purple-600 hover:text-purple-800 text-sm disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Resend Code'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Password Reset Modal */}
        {showResetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {resetStep === 1 ? 'Reset Password' : 'Enter Reset Code'}
              </h3>
              
              <form onSubmit={handlePasswordReset}>
                {resetStep === 1 ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your email"
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reset Code
                      </label>
                      <input
                        type="text"
                        required
                        maxLength="6"
                        value={formData.resetCode}
                        onChange={(e) => setFormData({...formData, resetCode: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
                        placeholder="000000"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={formData.newPassword}
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter new password"
                      />
                    </div>
                  </>
                )}
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetModal(false);
                      setResetStep(1);
                      setFormData({ ...formData, resetCode: '', newPassword: '' });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : (resetStep === 1 ? 'Send Code' : 'Reset Password')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorLogin;