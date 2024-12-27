import React, { useState } from 'react';
import { supabase } from './supabase/supabase'; // Adjust import path as needed
import AllImages from './components/Allimages';

const ImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const uploadImage = async () => {
    if (!file) return;

    try {
      setUploading(true);


      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="mb-4"
      />

      <button
        onClick={uploadImage}
        disabled={!file || uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded" style={{ width: 500, height: 500 }} />
        </div>
      )}



      <AllImages />


    </div>
  );
};

export default ImageUpload;