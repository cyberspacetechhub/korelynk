import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Eye, Heart, MessageCircle, Send, Trash2 } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminCodeSampleDetail = () => {
  const { id } = useParams();
  const [codeSample, setCodeSample] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyForms, setReplyForms] = useState({});

  useEffect(() => {
    fetchCodeSample();
  }, [id]);

  const fetchCodeSample = async () => {
    try {
      const response = await axios.get(`/code-samples/admin/${id}`);
      if (response.data.success) {
        setCodeSample(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching code sample:', error);
      toast.error('Failed to load code tutorial');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (commentId, e) => {
    e.preventDefault();
    const replyData = replyForms[commentId];
    if (!replyData?.content) {
      toast.error('Please enter reply content');
      return;
    }
    
    try {
      await axios.post(`/code-samples/${id}/comments/${commentId}/replies`, {
        content: replyData.content,
        author: {
          name: 'Admin',
          email: 'admin@korelynk.com'
        }
      });
      
      fetchCodeSample();
      setReplyForms({ ...replyForms, [commentId]: { content: '' } });
      toast.success('Reply added successfully!');
    } catch (error) {
      toast.error('Failed to add reply');
    }
  };

  const deleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`/code-samples/${id}/comments/${commentId}`);
        fetchCodeSample();
        toast.success('Comment deleted successfully');
      } catch (error) {
        toast.error('Failed to delete comment');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!codeSample) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Code Tutorial Not Found</h3>
        <Link to="/admin/code-samples" className="text-indigo-600 hover:text-indigo-700">
          ← Back to Code Tutorials
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/admin/code-samples"
            className="mr-4 p-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{codeSample.title}</h2>
            <p className="text-gray-600">Code Tutorial Details & Comments</p>
          </div>
        </div>
        <Link
          to={`/admin/code-samples/edit/${id}`}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Tutorial
        </Link>
      </div>

      {/* Tutorial Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Language</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              {codeSample.language.toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Difficulty</h3>
            <span className="text-sm text-gray-900 capitalize">{codeSample.difficulty}</span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              codeSample.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {codeSample.status}
            </span>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Eye className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{codeSample.views} views</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{codeSample.likes} likes</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{codeSample.comments?.length || 0} comments</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
          <p className="text-gray-700">{codeSample.description}</p>
        </div>

        {codeSample.tags?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {codeSample.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comments Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Comments Management ({codeSample.comments?.length || 0})
        </h3>

        {codeSample.comments?.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No comments yet.</p>
        ) : (
          <div className="space-y-6">
            {codeSample.comments.map((comment, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold">
                        {comment.author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{comment.author.name}</div>
                      <div className="text-sm text-gray-500">{comment.author.email}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteComment(comment._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-700 mb-4">{comment.content}</p>

                {/* Replies */}
                {comment.replies?.length > 0 && (
                  <div className="ml-6 space-y-3 mb-4">
                    {comment.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mr-2">
                            <span className="text-white text-xs font-semibold">
                              {reply.author.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{reply.author.name}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(reply.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm ml-8">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Admin Reply Form */}
                <div className="ml-6">
                  <form onSubmit={(e) => handleReply(comment._id, e)} className="flex gap-3">
                    <textarea
                      placeholder="Reply as admin..."
                      value={replyForms[comment._id]?.content || ''}
                      onChange={(e) => setReplyForms({ 
                        ...replyForms, 
                        [comment._id]: { content: e.target.value } 
                      })}
                      rows={2}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCodeSampleDetail;