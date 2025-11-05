import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const StudentCourseEnroll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [formData, setFormData] = useState({
    experience: '',
    motivation: '',
    availability: '',
    paymentMethod: 'bank_transfer'
  });
  const [paymentAccount, setPaymentAccount] = useState(null);
  const [step, setStep] = useState(1); // 1: enrollment form, 2: payment confirmation
  const [paymentMade, setPaymentMade] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      navigate('/student/login');
      return;
    }
    fetchCourse();
    fetchPaymentAccount();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`/courses/${id}`);
      if (response.data.success) {
        setCourse(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentAccount = async () => {
    try {
      const response = await axios.get('/payment-account/active');
      if (response.data.success) {
        setPaymentAccount(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching payment account:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'bank_transfer') {
      setStep(2); // Go to payment confirmation step
    } else {
      handleEnrollment(); // Direct enrollment for other methods
    }
  };

  const handlePaymentProofUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post('/upload/payment-proof', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setPaymentProof(response.data.data.url);
        toast.success('Payment proof uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload payment proof');
    } finally {
      setUploading(false);
    }
  };

  const handleEnrollment = async () => {
    setEnrolling(true);

    try {
      const token = localStorage.getItem('studentToken');
      
      // Get student profile to get correct ID
      const profileRes = await axios.get('/students/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!profileRes.data.success) {
        throw new Error('Failed to get student profile');
      }
      
      const enrollmentData = {
        studentId: profileRes.data.data._id,
        courseId: id,
        experience: formData.experience,
        motivation: formData.motivation,
        availability: formData.availability,
        paymentMethod: formData.paymentMethod,
        paymentProof: paymentProof
      };

      const response = await axios.post('/enrollments', enrollmentData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success('Enrollment submitted successfully! Check your email for confirmation.');
        navigate('/student/dashboard');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit enrollment');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <button onClick={() => navigate('/courses')} className="text-indigo-600 hover:text-indigo-800">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate(`/courses/${id}`)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course Details
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <BookOpen className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Enroll in Course</h1>
              <p className="text-gray-600">{course.title}</p>
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programming Experience *
              </label>
              <select
                required
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select your level</option>
                <option value="None">No experience</option>
                <option value="Basic">Basic knowledge</option>
                <option value="Intermediate">Some experience</option>
                <option value="Advanced">Advanced level</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why do you want to take this course? *
              </label>
              <textarea
                required
                rows="4"
                value={formData.motivation}
                onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tell us about your goals and motivation..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Availability *
              </label>
              <input
                type="text"
                required
                value={formData.availability}
                onChange={(e) => setFormData({...formData, availability: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Weekends, Evenings, 10-15 hours per week"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method *
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Bank Transfer</span>
                    <p className="text-sm text-gray-600">Transfer to our bank account after enrollment approval</p>
                  </div>
                </label>
                <label className="flex items-center opacity-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paystack"
                    disabled
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Paystack Payment</span>
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Coming Soon</span>
                    <p className="text-sm text-gray-600">Online payment with card or bank transfer</p>
                  </div>
                </label>
              </div>
            </div>

            {formData.paymentMethod === 'bank_transfer' && paymentAccount && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">Payment Instructions</h3>
                <div className="text-sm text-yellow-800 space-y-1">
                  <p><strong>Bank:</strong> {paymentAccount.bankName}</p>
                  <p><strong>Account Number:</strong> {paymentAccount.accountNumber}</p>
                  <p><strong>Account Name:</strong> {paymentAccount.accountName}</p>
                  <p><strong>Amount:</strong> ₦{course.price?.toLocaleString()}</p>
                  <p><strong>Reference:</strong> Use your full name as description</p>
                </div>
                <p className="text-xs text-yellow-700 mt-2">
                  * Payment details will be sent via email after enrollment approval
                </p>
              </div>
            )}

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">Course Summary</h3>
              <div className="text-sm text-indigo-800">
                <p><strong>Price:</strong> ₦{course.price?.toLocaleString()}</p>
                <p><strong>Duration:</strong> {course.duration}</p>
                <p><strong>Level:</strong> {course.level}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(`/courses/${id}`)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {formData.paymentMethod === 'bank_transfer' ? 'Continue to Payment' : 'Submit Enrollment'}
              </button>
            </div>
          </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Payment Instructions</h3>
                <div className="text-sm text-green-800 space-y-1">
                  <p><strong>Bank:</strong> {paymentAccount.bankName}</p>
                  <p><strong>Account Number:</strong> {paymentAccount.accountNumber}</p>
                  <p><strong>Account Name:</strong> {paymentAccount.accountName}</p>
                  <p><strong>Amount:</strong> ₦{course.price?.toLocaleString()}</p>
                  <p><strong>Reference:</strong> Use your full name as description</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="paymentMade"
                    checked={paymentMade}
                    onChange={(e) => setPaymentMade(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="paymentMade" className="text-sm font-medium text-gray-700">
                    I have made this payment
                  </label>
                </div>

                {paymentMade && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Payment Proof *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePaymentProofUpload}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                    {paymentProof && (
                      <div className="mt-2">
                        <img src={paymentProof} alt="Payment proof" className="max-w-xs h-auto rounded" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleEnrollment}
                  disabled={!paymentMade || !paymentProof || enrolling}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {enrolling ? 'Submitting...' : 'Complete Enrollment'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourseEnroll;