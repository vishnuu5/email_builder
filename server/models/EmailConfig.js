const mongoose = require('mongoose');

const EmailConfigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  footer: { type: String, required: true },
  imageUrl: { type: String, required: false },
});

module.exports = mongoose.model('EmailConfig', EmailConfigSchema);
