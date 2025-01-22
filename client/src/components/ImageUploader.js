import React, { useState } from 'react';


const ImageUploader = ({ setTemplateData }) => {
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/api/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { imageUrl } = await response.json();
        setTemplateData((prev) => ({ ...prev, imageUrl }));
        alert('Image uploaded successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert('Error uploading image. Please try again later.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-gray-700 font-bold mb-2">Upload Image:</label>
      <input
        type="file"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-gray-700 file:bg-white hover:file:bg-gray-100"
      />
      {isUploading && <p className="text-blue-500 mt-2">Uploading...</p>}
    </div>
  );
};

export default ImageUploader;
