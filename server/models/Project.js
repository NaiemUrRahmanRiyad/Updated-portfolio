const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['ML', 'Visualization', 'Research', 'Other'] 
  },
  technologies: [{ type: String }],
  description: { type: String, required: true, maxlength: 300 },
  githubUrl: { type: String, default: '' },
  liveDemoUrl: { type: String, default: '' },
  imageUrl: { type: String, default: null },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);