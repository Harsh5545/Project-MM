import React from 'react';
import { Input } from "@/components/ui/input";
import UploadServices from './UploadServices';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const SeoComponent = ({ seoData, onSeoChange, formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onSeoChange({ [name]: value });
  };

  const handleKeywordsChange = (e) => {
    const keywords = e.target.value.split(',').map(keyword => keyword.trim());
    onSeoChange({ keywords });
  };

  const handleImageUpload = (imageData) => {
    onSeoChange({ og_image: imageData });
  };

  const addKeyword = () => {
    const newKeyword = document.getElementById('newKeyword').value.trim();
    if (newKeyword) {
      const updatedKeywords = [...(seoData.keywords || []), newKeyword];
      onSeoChange({ keywords: updatedKeywords });
      document.getElementById('newKeyword').value = '';
    }
  };

  const removeKeyword = (index) => {
    const updatedKeywords = seoData.keywords.filter((_, i) => i !== index);
    onSeoChange({ keywords: updatedKeywords });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">SEO Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Meta Title</label>
        <Input
          type="text"
          name="meta_title"
          value={seoData.meta_title || ''}
          onChange={handleInputChange}
          placeholder="Enter meta title"
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Meta Description</label>
        <Input
          type="text"
          name="meta_description"
          value={seoData.meta_description || ''}
          onChange={handleInputChange}
          placeholder="Enter meta description"
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">OG Title</label>
        <Input
          type="text"
          name="og_title"
          value={seoData.og_title || ''}
          onChange={handleInputChange}
          placeholder="Enter OG title"
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-2">OG Image:</label>
        <UploadServices formData={formData} setFormData={setFormData} type="og_image" />
        {seoData.og_image && (
          <div className="mt-4">
            <Image width={300} height={300} src={seoData.og_image} alt="OG Image" className="w-[20rem] h-auto rounded-lg shadow-md" />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Keywords</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {seoData.keywords && seoData.keywords.map((keyword, index) => (
            <div key={index} className="bg-gray-200 px-2 py-1 rounded-md flex items-center">
              <span>{keyword}</span>
              <button onClick={() => removeKeyword(index)} className="ml-2 text-red-500">&times;</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            id="newKeyword"
            placeholder="Enter a keyword"
            className="flex-grow"
          />
          <Button onClick={addKeyword} type="button">Add</Button>
        </div>
      </div>
    </div>
  );
};

export default SeoComponent;
