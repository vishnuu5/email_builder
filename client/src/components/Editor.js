import React from 'react';

const Editor = ({ templateData, setTemplateData, saveTemplate, isSaving }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTemplateData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md flex-1">
      <h2 className="text-xl font-bold mb-4">Editor</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={templateData.title}
          onChange={handleInputChange}
          className="border p-2 rounded-md w-full"
        />
        <textarea
          name="content"
          placeholder="Content"
          value={templateData.content}
          onChange={handleInputChange}
          className="border p-2 rounded-md w-full h-32"
        ></textarea>
        <input
          type="text"
          name="footer"
          placeholder="Footer"
          value={templateData.footer}
          onChange={handleInputChange}
          className="border p-2 rounded-md w-full"
        />
        <button
          onClick={saveTemplate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Template'}
        </button>
      </div>
    </div>
  );
};

export default Editor;
