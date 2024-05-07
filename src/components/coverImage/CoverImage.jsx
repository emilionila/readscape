import React, { useState } from 'react';
import './CoverImage.scss';

const CoverImage = ({ onChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target.result);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('imageInput').click();
  };

  return (
    <div className="cover-image-container">
      <div className="cover-image-field">
        <label className="title">Cover Image</label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="preview-image"
          />
        )}
        <button className="upload-button" onClick={handleButtonClick}>
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default CoverImage;