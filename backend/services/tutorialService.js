const Tutorial = require('../models/Tutorial');

const getAllTutorials = async (filters = {}) => {
  const query = { isPublished: true, ...filters };
  return await Tutorial.find(query)
    .sort({ order: 1 })
    .populate('nextLesson previousLesson', 'title slug')
    .lean();
};

const getTutorialsByCategory = async (category) => {
  return await Tutorial.find({ category, isPublished: true })
    .sort({ order: 1 })
    .select('title slug duration order')
    .lean();
};

const getTutorialBySlug = async (slug) => {
  const tutorial = await Tutorial.findOne({ slug, isPublished: true })
    .populate('nextLesson previousLesson', 'title slug category')
    .lean();
  
  if (tutorial) {
    await Tutorial.findByIdAndUpdate(tutorial._id, { $inc: { views: 1 } });
  }
  
  return tutorial;
};

const createTutorial = async (data) => {
  const tutorial = new Tutorial(data);
  return await tutorial.save();
};

const updateTutorial = async (id, data) => {
  return await Tutorial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteTutorial = async (id) => {
  return await Tutorial.findByIdAndDelete(id);
};

const getCategoryStats = async () => {
  return await Tutorial.aggregate([
    { $match: { isPublished: true } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        totalViews: { $sum: '$views' }
      }
    }
  ]);
};

module.exports = {
  getAllTutorials,
  getTutorialsByCategory,
  getTutorialBySlug,
  createTutorial,
  updateTutorial,
  deleteTutorial,
  getCategoryStats
};
