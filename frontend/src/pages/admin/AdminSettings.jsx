import React, { useState, useEffect } from 'react';
import { Settings, Upload, Save, Image, Globe, Mail, Phone, MapPin } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminSettings = () => {
  const defaultSettings = {
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      linkedin: '',
      github: '',
      instagram: ''
    },
    seoSettings: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  };
  
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [keywordInput, setKeywordInput] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUploading, setFaviconUploading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/admin/settings');
      if (response.data.success) {
        const fetchedSettings = response.data.data;
        setSettings({
          ...defaultSettings,
          ...fetchedSettings,
          socialLinks: {
            ...defaultSettings.socialLinks,
            ...(fetchedSettings.socialLinks || {})
          },
          seoSettings: {
            ...defaultSettings.seoSettings,
            ...(fetchedSettings.seoSettings || {}),
            keywords: fetchedSettings.seoSettings?.keywords || []
          }
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'logo') {
        setLogoUploading(true);
        try {
          const formData = new FormData();
          formData.append('image', file);
          
          const response = await axios.post('/admin/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          
          if (response.data.success) {
            setSettings(prev => ({ ...prev, logo: response.data.data.url }));
            toast.success('Logo uploaded successfully');
          }
        } catch (error) {
          console.error('Logo upload error:', error);
          toast.error('Failed to upload logo');
        } finally {
          setLogoUploading(false);
        }
      } else {
        setFaviconUploading(true);
        try {
          const formData = new FormData();
          formData.append('image', file);

          
          const response = await axios.post('/admin/upload-favicon', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          
          if (response.data.success) {
            setSettings(prev => ({ ...prev, favicon: response.data.data.url }));
            toast.success('Favicon uploaded successfully');
          }
        } catch (error) {
          console.error('Favicon upload error:', error);
          console.error('Error response:', error.response);
          console.error('Error status:', error.response?.status);
          console.error('Error data:', error.response?.data);
          toast.error(error.response?.data?.message || 'Failed to upload favicon');
        } finally {
          setFaviconUploading(false);
        }
      }
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !settings.seoSettings?.keywords?.includes(keywordInput.trim())) {
      setSettings(prev => ({
        ...prev,
        seoSettings: {
          ...prev.seoSettings,
          keywords: [...(prev.seoSettings?.keywords || []), keywordInput.trim()]
        }
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword) => {
    setSettings(prev => ({
      ...prev,
      seoSettings: {
        ...prev.seoSettings,
        keywords: (prev.seoSettings?.keywords || []).filter(k => k !== keyword)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await axios.put('/admin/settings', {
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        logo: settings.logo,
        favicon: settings.favicon,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
        address: settings.address,
        socialLinks: settings.socialLinks,
        seoSettings: settings.seoSettings
      });

      if (response.data.success) {
        toast.success('Settings updated successfully');
        fetchSettings();
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600">Manage your application settings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Site Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Site Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                <input
                  type="text"
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Logo & Favicon */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Image className="w-5 h-5 mr-2" />
              Logo & Favicon
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {logoUploading ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
                      <p className="text-sm text-gray-600">Uploading logo...</p>
                    </div>
                  ) : (
                    <>
                      {settings.logo && (
                        <img src={settings.logo} alt="Current logo" className="w-20 h-20 object-contain mx-auto mb-2" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'logo')}
                        className="hidden"
                        id="logo-upload"
                        disabled={logoUploading}
                      />
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload logo</p>
                      </label>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {faviconUploading ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
                      <p className="text-sm text-gray-600">Uploading favicon...</p>
                    </div>
                  ) : (
                    <>
                      {settings.favicon && (
                        <img src={settings.favicon} alt="Current favicon" className="w-8 h-8 object-contain mx-auto mb-2" />
                      )}
                      <input
                        type="file"
                        accept="image/png,image/jpg,image/jpeg,image/gif,image/webp,image/x-icon,image/svg+xml"
                        onChange={(e) => handleFileChange(e, 'favicon')}
                        className="hidden"
                        id="favicon-upload"
                        disabled={faviconUploading}
                      />
                      <label htmlFor="favicon-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload favicon</p>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  name="contactPhone"
                  value={settings.contactPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.keys(settings.socialLinks || {}).map(platform => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{platform}</label>
                  <input
                    type="url"
                    name={`socialLinks.${platform}`}
                    value={settings.socialLinks?.[platform] || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder={`https://${platform}.com/yourprofile`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                <input
                  type="text"
                  name="seoSettings.metaTitle"
                  value={settings.seoSettings?.metaTitle || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                <textarea
                  name="seoSettings.metaDescription"
                  value={settings.seoSettings?.metaDescription || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add keyword"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(settings.seoSettings?.keywords || []).map(keyword => (
                    <span
                      key={keyword}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-2 text-indigo-600 hover:text-indigo-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;