const path = require('path');
const fs = require('fs');

// Fetch the email layout
exports.getTemplateLayout = (req, res) => {
  try {
    const layoutPath = path.join(__dirname, '../templates/layout.html');
    
    if (!fs.existsSync(layoutPath)) {
      return res.status(404).json({ message: 'Template layout not found' });
    }

    const layout = fs.readFileSync(layoutPath, 'utf-8');
    res.status(200).send(layout);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching template layout', error });
  }
};

// Render and customize the template
exports.renderTemplate = (req, res) => {
  const { title, content, footer, imageUrl } = req.body;

  // Load base layout
  const layoutPath = path.join(__dirname, '../templates/layout.html');
  fs.readFile(layoutPath, 'utf8', (err, layout) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading layout file.' });
    }

    // Replace placeholders with actual data
    const renderedTemplate = layout
      .replace('{{title}}', title)
      .replace('{{content}}', content)
      .replace('{{footer}}', footer)
      .replace('{{imageUrl}}', imageUrl || '');

    res.setHeader('Content-Disposition', 'attachment; filename="email_template.html"');
    res.setHeader('Content-Type', 'text/html');
    res.send(renderedTemplate);
  });
};