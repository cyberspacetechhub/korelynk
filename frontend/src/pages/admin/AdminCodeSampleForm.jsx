import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

const AdminCodeSampleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: 'javascript',
    difficulty: 'beginner',
    tags: '',
    htmlCode: '',
    cssCode: '',
    jsCode: '',
    status: 'draft'
  });

  const sampleData = {
    'Responsive Card Grid': {
      description: 'Learn how to create a responsive card grid layout using CSS Grid and modern CSS techniques.',
      language: 'css',
      difficulty: 'intermediate',
      tags: 'responsive, css-grid, cards, layout',
      htmlCode: `<section class="card-grid">
  <article class="card">
    <h2>Card Title 1</h2>
    <p>This is a responsive card with modern CSS styling.</p>
    <button class="btn">Learn More</button>
  </article>
  <article class="card">
    <h2>Card Title 2</h2>
    <p>Another card demonstrating the grid layout system.</p>
    <button class="btn">Learn More</button>
  </article>
  <article class="card">
    <h2>Card Title 3</h2>
    <p>Third card showing responsive behavior.</p>
    <button class="btn">Learn More</button>
  </article>
</section>`,
      cssCode: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card h2 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.3s ease;
}

.btn:hover {
  opacity: 0.9;
}`,
      jsCode: ''
    },
    'Interactive Button Animation': {
      description: 'Create engaging button animations with CSS transforms and JavaScript interactions.',
      language: 'javascript',
      difficulty: 'beginner',
      tags: 'animation, buttons, javascript, interactive',
      htmlCode: `<div class="button-container">
  <button class="animated-btn" id="animatedBtn">
    <span>Click Me!</span>
    <div class="ripple"></div>
  </button>
</div>`,
      cssCode: `.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.animated-btn {
  position: relative;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.animated-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.animated-btn:active {
  transform: translateY(0);
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}`,
      jsCode: `document.getElementById('animatedBtn').addEventListener('click', function(e) {
  // Create ripple effect
  const ripple = this.querySelector('.ripple');
  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  // Reset animation
  ripple.style.animation = 'none';
  ripple.offsetHeight; // Trigger reflow
  ripple.style.animation = 'ripple-animation 0.6s linear';
  
  // Change button text temporarily
  const span = this.querySelector('span');
  const originalText = span.textContent;
  span.textContent = 'Clicked!';
  
  setTimeout(() => {
    span.textContent = originalText;
  }, 1000);
});`
    }
  };
  const [loading, setLoading] = useState(false);

  const languages = [
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'php', label: 'PHP' }
  ];

  useEffect(() => {
    if (isEdit) {
      fetchCodeSample();
    }
  }, [id, isEdit]);

  const fetchCodeSample = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/code-samples/admin/${id}`);
      if (response.data.success) {
        const sample = response.data.data;
        setFormData({
          title: sample.title,
          description: sample.description,
          language: sample.language,
          difficulty: sample.difficulty,
          tags: sample.tags.join(', '),
          htmlCode: sample.code.html || '',
          cssCode: sample.code.css || '',
          jsCode: sample.code.js || '',
          status: sample.status
        });
      }
    } catch (error) {
      console.error('Error fetching code sample:', error);
      toast.error('Failed to load code sample');
      navigate('/admin/code-samples');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        title: formData.title,
        description: formData.description,
        language: formData.language,
        difficulty: formData.difficulty,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        code: {
          html: formData.htmlCode,
          css: formData.cssCode,
          js: formData.jsCode
        },
        status: formData.status
      };

      if (isEdit) {
        await axios.put(`/code-samples/admin/${id}`, submitData);
        toast.success('Code tutorial updated successfully');
      } else {
        await axios.post('/code-samples/admin', submitData);
        toast.success('Code tutorial created successfully');
      }
      
      navigate('/admin/code-samples');
    } catch (error) {
      console.error('Error saving code sample:', error);
      toast.error('Failed to save code tutorial');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/admin/code-samples')}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Code Tutorial' : 'Create Code Tutorial'}
          </h2>
          <p className="text-gray-600">
            {isEdit ? 'Update your code tutorial' : 'Create a new interactive code tutorial'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter tutorial title"
                />
                <select
                  onChange={(e) => {
                    const sample = sampleData[e.target.value];
                    if (sample) {
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        ...sample
                      });
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Load Sample</option>
                  {Object.keys(sampleData).map(title => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language *
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty *
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Describe what this tutorial teaches"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.split(',').filter(tag => tag.trim()).map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center">
                  {tag.trim()}
                  <button
                    type="button"
                    onClick={() => {
                      const newTags = formData.tags.split(',').filter((t, i) => i !== index).join(', ');
                      setFormData({ ...formData, tags: newTags });
                    }}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Type tags separated by commas (e.g., responsive, animation, beginner)"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Content</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HTML Code
              </label>
              <textarea
                name="htmlCode"
                value={formData.htmlCode}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter HTML code here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CSS Code
              </label>
              <textarea
                name="cssCode"
                value={formData.cssCode}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter CSS code here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                JavaScript Code
              </label>
              <textarea
                name="jsCode"
                value={formData.jsCode}
                onChange={handleChange}
                rows={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter JavaScript code here..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/code-samples')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCodeSampleForm;