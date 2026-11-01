import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, GraduationCap, Users, ShieldCheck } from 'lucide-react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ROLES = [
  { key: 'student', label: 'Student', icon: GraduationCap, color: 'indigo' },
  { key: 'instructor', label: 'Instructor', icon: Users, color: 'purple' },
  { key: 'admin', label: 'Admin', icon: ShieldCheck, color: 'gray' },
];

const Login = () => {
  const navigate = useNavigate();
  const { login: adminLogin } = useAuth();
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const active = ROLES.find(r => r.key === role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (role === 'admin') {
        const result = await adminLogin(email, password);
        if (result?.success) {
          toast.success('Welcome back!');
          navigate('/admin');
        } else {
          toast.error(result?.error || 'Login failed');
        }
      } else {
        const endpoint = role === 'student' ? '/students/login' : '/instructors/login';
        const response = await axios.post(endpoint, { email, password });
        if (response.data.success) {
          const { token, [role]: userData } = response.data.data;
          localStorage.setItem(`${role}Token`, token);
          localStorage.setItem(`${role}Data`, JSON.stringify(userData));
          toast.success('Login successful!');
          navigate(`/${role}/dashboard`);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const ringColor = { indigo: 'focus:ring-indigo-500', purple: 'focus:ring-purple-500', gray: 'focus:ring-gray-500' }[active.color];
  const btnColor = { indigo: 'bg-indigo-600 hover:bg-indigo-700', purple: 'bg-purple-600 hover:bg-purple-700', gray: 'bg-gray-800 hover:bg-gray-900' }[active.color];
  const iconBg = { indigo: 'bg-indigo-600', purple: 'bg-purple-600', gray: 'bg-gray-800' }[active.color];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className={`flex items-center justify-center w-16 h-16 ${iconBg} rounded-full mx-auto mb-4`}>
            <active.icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="mt-2 text-gray-600">Access your academy portal</p>
        </div>

        {/* Role tabs */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-white">
          {ROLES.map(r => (
            <button
              key={r.key}
              onClick={() => setRole(r.key)}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                role === r.key ? `bg-${r.color}-600 text-white` : 'text-gray-600 hover:bg-gray-50'
              }`}
              style={role === r.key ? { backgroundColor: r.color === 'gray' ? '#1f2937' : r.color === 'purple' ? '#9333ea' : '#4f46e5' } : {}}
            >
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${ringColor}`}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`pl-10 pr-12 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${ringColor}`}
                placeholder="Enter your password"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${btnColor} text-white py-3 px-4 rounded-lg font-semibold disabled:opacity-50 transition-colors`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center space-y-2">
          {role === 'student' && (
            <p className="text-sm text-gray-600">
              No account?{' '}
              <Link to="/student/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Register as student
              </Link>
            </p>
          )}
          {role === 'instructor' && (
            <p className="text-sm text-gray-600">
              No account?{' '}
              <Link to="/instructor/login" className="text-purple-600 hover:text-purple-800 font-medium">
                Register as instructor
              </Link>
            </p>
          )}
          <Link to="/" className="block text-sm text-gray-500 hover:text-gray-700">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
