const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const templateController = require('../controllers/templateController');



router.get('/template', templateController.getTemplateLayout);
router.post('/render', templateController.renderTemplate);
router.get('/layout', emailController.getEmailLayout);
router.post('/save', emailController.saveEmailConfig);
router.post('/render', emailController.renderAndDownloadTemplate);
router.post('/uploadEmailConfig', emailController.uploadEmailConfig);
module.exports = router;
