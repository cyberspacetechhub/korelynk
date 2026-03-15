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
          email: 'admin@inntechlab.com'
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
        <div className="w-12 h-12 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!codeSample) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Code Tutorial Not Found</h3>
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
            className="p-2 mr-4 text-gray-600 hover:text-gray-900"
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
          className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Tutorial
        </Link>
      </div>

      {/* Tutorial Info */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-500">Language</h3>
            <span className="px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
              {codeSample.language.toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-500">Difficulty</h3>
            <span className="text-sm text-gray-900 capitalize">{codeSample.difficulty}</span>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-500">Status</h3>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              codeSample.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {codeSample.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 mt-6 md:grid-cols-3">
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-sm text-gray-600">{codeSample.views} views</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-sm text-gray-600">{codeSample.likes} likes</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-gray-400" />
            <span className="text-sm text-gray-600">{codeSample.comments?.length || 0} comments</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-gray-500">Description</h3>
          <p className="text-gray-700">{codeSample.description}</p>
        </div>

        {codeSample.tags?.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium text-gray-500">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {codeSample.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 text-sm text-gray-700 bg-gray-100 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comments Management */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <h3 className="mb-6 text-lg font-semibold text-gray-900">
          Comments Management ({codeSample.comments?.length || 0})
        </h3>

        {codeSample.comments?.length === 0 ? (
          <p className="py-8 text-center text-gray-500">No comments yet.</p>
        ) : (
          <div className="space-y-6">
            {codeSample.comments.map((comment, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 mr-3 bg-indigo-600 rounded-full">
                      <span className="font-semibold text-white">
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

                <p className="mb-4 text-gray-700">{comment.content}</p>

                {/* Replies */}
                {comment.replies?.length > 0 && (
                  <div className="mb-4 ml-6 space-y-3">
                    {comment.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center justify-center w-6 h-6 mr-2 bg-gray-500 rounded-full">
                            <span className="text-xs font-semibold text-white">
                              {reply.author.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{reply.author.name}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(reply.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <p className="ml-8 text-sm text-gray-700">{reply.content}</p>
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
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
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