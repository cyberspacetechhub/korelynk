import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link, Check, MessageCircle, Phone } from 'lucide-react';

const ShareButton = ({ url, title, description, image }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    whatsappBusiness: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShare = (platform) => {
    window.open(shareData[platform], '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Facebook className="w-4 h-4 mr-3 text-blue-600" />
              Facebook
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Twitter className="w-4 h-4 mr-3 text-blue-400" />
              Twitter
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Linkedin className="w-4 h-4 mr-3 text-blue-700" />
              LinkedIn
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <MessageCircle className="w-4 h-4 mr-3 text-green-600" />
              WhatsApp
            </button>
            <button
              onClick={() => handleShare('whatsappBusiness')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Phone className="w-4 h-4 mr-3 text-green-700" />
              WhatsApp Business
            </button>
            <hr className="my-1" />
            <button
              onClick={copyToClipboard}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-3 text-green-600" />
              ) : (
                <Link className="w-4 h-4 mr-3" />
              )}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;