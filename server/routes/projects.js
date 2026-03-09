const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');

// Debug log
console.log('📂 Projects route loaded');

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../public/uploads/projects');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log('📁 Created uploads directory:', dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    console.log('📝 Saving file:', filename);
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and WebP allowed.'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Get all projects (Public)
router.get('/', async (req, res) => {
  try {
    console.log('🔍 GET /api/projects - Fetching...');
    
    // Check if Project model is loaded
    if (!Project) {
      console.error('❌ Project model not loaded!');
      return res.status(500).json({ message: 'Project model not available' });
    }
    
    const projects = await Project.find().sort({ createdAt: -1 });
    console.log('✅ Found', projects.length, 'projects');
    res.json(projects);
  } catch (error) {
    console.error('❌ ERROR in GET /api/projects:', error.message);
    console.error(error.stack);
    res.status(500).json({ 
      message: 'Error fetching projects', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get single project (Public)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('❌ Error fetching single project:', error);
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
});

// Create project (Protected)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    console.log('📝 POST /api/projects - Creating project...');
    
    const projectData = {
      ...req.body,
      technologies: req.body.technologies ? req.body.technologies.split(',').map(t => t.trim()) : []
    };
    
    if (req.file) {
      projectData.imageUrl = `/uploads/projects/${req.file.filename}`;
    }

    const project = new Project(projectData);
    await project.save();
    console.log('✅ Project created:', project.title);
    res.status(201).json(project);
  } catch (error) {
    console.error('❌ Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
});

// Update project (Protected)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      technologies: req.body.technologies ? req.body.technologies.split(',').map(t => t.trim()) : []
    };

    if (req.file) {
      const oldProject = await Project.findById(req.params.id);
      if (oldProject && oldProject.imageUrl) {
        const oldPath = path.join(__dirname, '../../public', oldProject.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      projectData.imageUrl = `/uploads/projects/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id, 
      projectData, 
      { new: true }
    );
    
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('❌ Error updating project:', error);
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
});

// Delete project (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.imageUrl) {
      const imagePath = path.join(__dirname, '../../public', project.imageUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
});

module.exports = router;