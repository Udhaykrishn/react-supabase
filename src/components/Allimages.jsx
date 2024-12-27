import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
const AllImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('images')
        .list('uploads/');

      if (error) throw error;

      const imageUrls = data.map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(`uploads/${file.name}`);
        return publicUrl;
      });

      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Images</h1>
      <div className="grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            className="w-full h-48 object-cover rounded"
            style={{width:200,height:200}}
          />
        ))}
      </div>
    </div>
  );
};

export default AllImages;