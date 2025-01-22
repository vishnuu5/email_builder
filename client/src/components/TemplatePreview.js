import React from 'react';

const TemplatePreview = ({ templateData }) => {
  const { title, content, footer, imageUrl } = templateData;

  return (
    <div className="bg-white p-4 rounded-md shadow-md flex-1">
      <h2 className="text-xl font-bold mb-4">Template Preview</h2>
      <div className="border p-4 rounded-md">
        {imageUrl && <img src={imageUrl} alt="Uploaded" className="mb-4 w-full rounded-md" />}
        <h1 className="text-2xl font-bold">{title || 'Title goes here'}</h1>
        <p className="mt-4">{content || 'Content goes here'}</p>
        <footer className="mt-4 text-gray-500">{footer || 'Footer goes here'}</footer>
      </div>
    </div>
  );
};

export default TemplatePreview;
