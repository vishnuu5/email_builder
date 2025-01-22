const EmailConfig = require('../models/EmailConfig');

// Get HTML layout from server
exports.getEmailLayout = async (req, res) => {
  try {
    const layout = `<html>
      <body>
        <h1>{{title}}</h1>
        <p>{{content}}</p>
        <img src="{{imageUrl}}" alt="Email Image" />
      </body>
    </html>`;
    res.send(layout);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching email layout', error });
  }
};

// Save email configuration
exports.saveEmailConfig = async (req, res) => {
  try {
    const { title, content, footer, imageUrl } = req.body;
    const newConfig = new EmailConfig({ title, content, footer, imageUrl });
    await newConfig.save();
    res.status(201).json({ message: 'Email configuration saved', data: newConfig });
  } catch (error) {
    res.status(500).json({ message: 'Error saving email configuration', error });
  }
};

// Render and download email template
exports.renderAndDownloadTemplate = async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    const html = `<html>
      <body>
        <h1>${title}</h1>
        <p>${content}</p>
        <img src="${imageUrl}" alt="Email Image" />
      </body>
    </html>`;
    res.setHeader('Content-Disposition', 'attachment; filename="template.html"');
    res.send(html);
  } catch (error) {
    res.status(500).json({ message: 'Error rendering template', error });
  }
};


// Save email template configuration
exports.uploadEmailConfig = async (req, res) => {
  try {
    const emailConfig = new EmailConfig(req.body);
    await emailConfig.save();
    res.status(201).json({ message: 'Email configuration saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving email configuration', error });
  }
};
