import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Eye, Heart, Copy, Check, MessageCircle, Send } from 'lucide-react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import SEO from '../components/SEO';

const CodeSampleDetail = () => {
  const { slug } = useParams();
  const [codeSample, setCodeSample] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('preview');
  const [copiedStates, setCopiedStates] = useState({});
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
  const [showComments, setShowComments] = useState(false);
  const [replyForms, setReplyForms] = useState({});
  const [showReplies, setShowReplies] = useState({});

  useEffect(() => {
    fetchCodeSample();
  }, [slug]);

  const fetchCodeSample = async () => {
    try {
      const response = await axios.get(`/code-samples/${slug}`);
      if (response.data.success) {
        setCodeSample(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching code sample:', error);
      toast.error('Code tutorial not found');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(`/code-samples/${codeSample._id}/like`);
      setCodeSample(prev => ({ ...prev, likes: prev.likes + (liked ? -1 : 1) }));
      setLiked(!liked);
      toast.success(liked ? 'Like removed' : 'Tutorial liked!');
    } catch (error) {
      toast.error('Failed to like tutorial');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.content) {
      toast.error('Please fill all fields');
      return;
    }
    
    try {
      const commentData = {
        content: commentForm.content,
        author: {
          name: commentForm.name,
          email: commentForm.email
        }
      };
      
      const response = await axios.post(`/code-samples/${codeSample._id}/comments`, commentData);
      if (response.data.success) {
        setCodeSample(prev => ({
          ...prev,
          comments: [...(prev.comments || []), response.data.data]
        }));
        setCommentForm({ name: '', email: '', content: '' });
        toast.success('Comment added successfully!');
      }
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleReply = async (commentId, e) => {
    e.preventDefault();
    const replyData = replyForms[commentId];
    if (!replyData?.name || !replyData?.email || !replyData?.content) {
      toast.error('Please fill all fields');
      return;
    }
    
    try {
      const response = await axios.post(`/code-samples/${codeSample._id}/comments/${commentId}/replies`, {
        content: replyData.content,
        author: {
          name: replyData.name,
          email: replyData.email
        }
      });
      
      if (response.data.success) {
        fetchCodeSample();
        setReplyForms({ ...replyForms, [commentId]: { name: '', email: '', content: '' } });
        toast.success('Reply added successfully!');
      }
    } catch (error) {
      toast.error('Failed to add reply');
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      html: 'from-orange-500 to-red-500',
      css: 'from-blue-500 to-indigo-500',
      javascript: 'from-yellow-500 to-orange-500',
      react: 'from-cyan-500 to-blue-500',
      nodejs: 'from-green-500 to-emerald-500',
      python: 'from-indigo-500 to-purple-500',
      php: 'from-purple-500 to-pink-500'
    };
    return colors[language] || 'from-gray-500 to-gray-600';
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates({ ...copiedStates, [type]: true });
      toast.success(`${type.toUpperCase()} code copied!`);
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [type]: false });
      }, 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const renderPreview = () => {
    const { html = '', css = '', js = '' } = codeSample.code;
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    :root {
      --primary-color: #3b82f6;
      --spacing: 1rem;
      --radius: 8px;
    }
    body {
      margin: 0;
      padding: 1rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
    }
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch(e) {
      console.error('Script error:', e);
    }
  </script>
</body>
</html>`;
    
    return (
      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute z-10 flex space-x-1 top-3 left-3">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
        </div>
        <div className="pt-8">
          <iframe
            srcDoc={fullHtml}
            className="w-full bg-white border-0 h-96"
            title="Code Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!codeSample) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Tutorial Not Found</h2>
          <Link to="/code-samples" className="text-indigo-600 hover:text-indigo-700">
            ← Back to Code Tutorials
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${codeSample.title} - Code Tutorial`}
        description={codeSample.description}
        keywords={codeSample.tags}
        url={`/code-samples/${codeSample.slug}`}
      />
      
      <div className="container px-6 py-8 mx-auto">
        <div className="mb-6">
          <Link 
            to="/code-samples"
            className="inline-flex items-center mb-4 text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Code Tutorials
          </Link>
          
          <div className="p-8 bg-white border border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getLanguageColor(codeSample.language)}`}>
                  {codeSample.language.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500 capitalize">{codeSample.difficulty}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {codeSample.views}
                </div>
                <button
                  onClick={handleLike}
                  className={`flex items-center hover:text-red-500 transition-colors ${
                    liked ? 'text-red-500' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-current' : ''}`} />
                  {codeSample.likes}
                </button>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {codeSample.comments?.length || 0}
                </button>
              </div>
            </div>
            
            <h1 className="mb-4 text-3xl font-bold text-gray-900">{codeSample.title}</h1>
            <p className="mb-6 text-lg text-gray-600">{codeSample.description}</p>
            
            {codeSample.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {codeSample.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'preview'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Play className="inline w-4 h-4 mr-2" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('html')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'html'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'css'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                CSS
              </button>
              <button
                onClick={() => setActiveTab('js')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'js'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                JavaScript
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'preview' && renderPreview()}
            {activeTab === 'html' && (
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(codeSample.code.html, 'html')}
                  className="absolute z-10 p-2 text-white transition-colors bg-gray-700 rounded-lg top-2 right-2 hover:bg-gray-600"
                >
                  {copiedStates.html ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="p-4 overflow-x-auto text-green-400 bg-gray-900 rounded-lg">
                  <code>{codeSample.code.html || '<!-- No HTML code provided -->'}</code>
                </pre>
              </div>
            )}
            {activeTab === 'css' && (
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(codeSample.code.css, 'css')}
                  className="absolute z-10 p-2 text-white transition-colors bg-gray-700 rounded-lg top-2 right-2 hover:bg-gray-600"
                >
                  {copiedStates.css ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="p-4 overflow-x-auto text-blue-400 bg-gray-900 rounded-lg">
                  <code>{codeSample.code.css || '/* No CSS code provided */'}</code>
                </pre>
              </div>
            )}
            {activeTab === 'js' && (
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(codeSample.code.js, 'js')}
                  className="absolute z-10 p-2 text-white transition-colors bg-gray-700 rounded-lg top-2 right-2 hover:bg-gray-600"
                >
                  {copiedStates.js ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="p-4 overflow-x-auto text-yellow-400 bg-gray-900 rounded-lg">
                  <code>{codeSample.code.js || '// No JavaScript code provided'}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Comments ({codeSample.comments?.length || 0})</h3>
            
            {/* Add Comment Form */}
            <form onSubmit={handleComment} className="mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm({...commentForm, name: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={commentForm.email}
                  onChange={(e) => setCommentForm({...commentForm, email: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
              <textarea
                placeholder="Write your comment..."
                value={commentForm.content}
                onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {codeSample.comments?.map((comment, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-semibold">
                        {comment.author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{comment.author.name}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 ml-11">{comment.content}</p>
                  
                  <div className="ml-11 mt-3">
                    <button
                      onClick={() => setShowReplies({ ...showReplies, [comment._id]: !showReplies[comment._id] })}
                      className="text-sm text-indigo-600 hover:text-indigo-700 mr-4"
                    >
                      {comment.replies?.length || 0} replies
                    </button>
                    <button
                      onClick={() => setReplyForms({ ...replyForms, [comment._id]: replyForms[comment._id] || { name: '', email: '', content: '' } })}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Reply
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyForms[comment._id] && (
                    <form onSubmit={(e) => handleReply(comment._id, e)} className="ml-11 mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Your name"
                          value={replyForms[comment._id].name}
                          onChange={(e) => setReplyForms({ ...replyForms, [comment._id]: { ...replyForms[comment._id], name: e.target.value } })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Your email"
                          value={replyForms[comment._id].email}
                          onChange={(e) => setReplyForms({ ...replyForms, [comment._id]: { ...replyForms[comment._id], email: e.target.value } })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          required
                        />
                      </div>
                      <textarea
                        placeholder="Write your reply..."
                        value={replyForms[comment._id].content}
                        onChange={(e) => setReplyForms({ ...replyForms, [comment._id]: { ...replyForms[comment._id], content: e.target.value } })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-3 text-sm"
                        required
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700">
                          Reply
                        </button>
                        <button
                          type="button"
                          onClick={() => setReplyForms({ ...replyForms, [comment._id]: null })}
                          className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Replies */}
                  {showReplies[comment._id] && comment.replies?.map((reply, replyIndex) => (
                    <div key={replyIndex} className="ml-11 mt-3 pl-4 border-l-2 border-gray-200">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-semibold">
                            {reply.author.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{reply.author.name}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm ml-8">{reply.content}</p>
                    </div>
                  ))}
                </div>
              ))}
              
              {(!codeSample.comments || codeSample.comments.length === 0) && (
                <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeSampleDetail;