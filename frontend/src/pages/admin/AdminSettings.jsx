import React, { useState, useEffect } from 'react';
import { Upload, Save, Image, Globe, Mail } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const IconUploadBox = ({ field, label, description, value, uploading, onUpload }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <p className="text-xs text-gray-500 mb-3">{description}</p>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors">
      {uploading ? (
        <div className="flex flex-col items-center py-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
          <p className="text-sm text-gray-600">Uploading...</p>
        </div>
      ) : (
        <>
          {value ? (
            <div className="mb-3">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-2 ${field === 'darkIcon' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <img src={value} alt={label} className="w-12 h-12 object-contain" />
              </div>
              <p className="text-xs text-green-600 font-medium">✓ Uploaded</p>
            </div>
          ) : (
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            className="hidden"
            id={`${field}-upload`}
          />
          <label htmlFor={`${field}-upload`} className="cursor-pointer">
            <p className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              {value ? 'Replace icon' : 'Click to upload'}
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, SVG, WebP recommended</p>
          </label>
        </>
      )}
    </div>
  </div>
);

const AdminSettings = () => {
  const defaultSettings = {
    siteName: '',
    siteDescription: '',
    favicon: '',
    darkIcon: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialLinks: { facebook: '', twitter: '', linkedin: '', github: '', instagram: '' },
    seoSettings: { metaTitle: '', metaDescription: '', keywords: [] }
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [uploading, setUploading] = useState({ favicon: false, darkIcon: false });

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/admin/settings');
      if (response.data.success) {
        const d = response.data.data;
        setSettings({
          ...defaultSettings, ...d,
          favicon: d.favicon || d.logo || '',
          socialLinks: { ...defaultSettings.socialLinks, ...(d.socialLinks || {}) },
          seoSettings: { ...defaultSettings.seoSettings, ...(d.seoSettings || {}), keywords: d.seoSettings?.keywords || [] }
        });
      }
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({ ...prev, [parent]: { ...prev[parent], [child]: value } }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleIconUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [field]: true }));
    try {
      const formData = new FormData();
      formData.append('image', file);
      const endpoint = field === 'favicon' ? '/admin/upload-favicon' : '/admin/upload';
      const response = await axios.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (response.data.success) {
        const url = response.data.data.url;
        const saveRes = await axios.put('/admin/settings', { [field]: url });
        if (saveRes.data.success) {
          setSettings(prev => ({ ...prev, [field]: url }));
          toast.success(`${field === 'favicon' ? 'Light theme icon' : 'Dark theme icon'} saved successfully`);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to upload icon`);
    } finally {
      setUploading(prev => ({ ...prev, [field]: false }));
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !settings.seoSettings?.keywords?.includes(keywordInput.trim())) {
      setSettings(prev => ({ ...prev, seoSettings: { ...prev.seoSettings, keywords: [...(prev.seoSettings?.keywords || []), keywordInput.trim()] } }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword) => {
    setSettings(prev => ({ ...prev, seoSettings: { ...prev.seoSettings, keywords: prev.seoSettings.keywords.filter(k => k !== keyword) } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      siteName: settings.siteName,
      siteDescription: settings.siteDescription,
      favicon: settings.favicon,
      darkIcon: settings.darkIcon,
      contactEmail: settings.contactEmail,
      contactPhone: settings.contactPhone,
      address: settings.address,
      socialLinks: settings.socialLinks,
      seoSettings: settings.seoSettings
    };
    try {
      const response = await axios.put('/admin/settings', payload);
      if (response.data.success) {
        toast.success('Settings updated successfully');
        fetchSettings();
      }
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
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
              <input type="text" name="siteName" value={settings.siteName} onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
              <input type="text" name="siteDescription" value={settings.siteDescription} onChange={handleInputChange} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Brand Icons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <Image className="w-5 h-5 mr-2" />
            Brand Icons
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Upload separate icons for light and dark themes. Each will render automatically based on the active theme.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <IconUploadBox
              field="favicon"
              label="Light Theme Icon"
              description="Shown when the site is in light mode. Use a dark-colored icon for visibility on white backgrounds."
              value={settings.favicon}
              uploading={uploading.favicon}
              onUpload={(e) => handleIconUpload(e, 'favicon')}
            />
            <IconUploadBox
              field="darkIcon"
              label="Dark Theme Icon"
              description="Shown when the site is in dark mode. Use a light or colorful icon for visibility on dark backgrounds."
              value={settings.darkIcon}
              uploading={uploading.darkIcon}
              onUpload={(e) => handleIconUpload(e, 'darkIcon')}
            />
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
              <input type="email" name="contactEmail" value={settings.contactEmail} onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input type="text" name="contactPhone" value={settings.contactPhone} onChange={handleInputChange} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input type="text" name="address" value={settings.address} onChange={handleInputChange} className={inputClass} />
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
                  className={inputClass}
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
              <input type="text" name="seoSettings.metaTitle" value={settings.seoSettings?.metaTitle || ''} onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea name="seoSettings.metaDescription" value={settings.seoSettings?.metaDescription || ''} onChange={handleInputChange} rows={3} className={inputClass} />
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
                <button type="button" onClick={addKeyword} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(settings.seoSettings?.keywords || []).map(keyword => (
                  <span key={keyword} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                    {keyword}
                    <button type="button" onClick={() => removeKeyword(keyword)} className="ml-2 text-indigo-600 hover:text-indigo-800">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center">
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
