import React, { useState } from 'react';
import Editor from '../components/Editor';
import TemplatePreview from '../components/TemplatePreview';
import ImageUploader from '../components/ImageUploader';

const HomePage = () => {
  const [templateData, setTemplateData] = useState({
    title: '',
    content: '',
    footer: '',
    imageUrl: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);


  // Download the rendered template as an HTML file
  const downloadTemplate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/email/render', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      });

      if (response.ok) {
        const html = await response.text();
        const blob = new Blob([html], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'email_template.html';
        link.click();
      } else {
        alert('Error generating template.');
      }
    } catch (error) {
      alert('Error downloading template.');
    }
  };


  const saveTemplate = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/email/uploadEmailConfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      });

      if (response.ok) {
        alert('Template saved successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert('Error saving template. Please try again later.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Email Builder</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <Editor 
          templateData={templateData} 
          setTemplateData={setTemplateData}
          saveTemplate={saveTemplate}
          isSaving={isSaving} 
        />
        <TemplatePreview templateData={templateData} />
      </div>
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        <ImageUploader setTemplateData={setTemplateData} />
      
        <button
          onClick={downloadTemplate}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Download Template
        </button>
      </div>
    </div>
  );
};

export default HomePage;
