'use client';
import { useState } from 'react';

export default function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);
    
    try {
      const response = await fetch('/api/content/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input 
        type="file" 
        name="file" 
        accept=".pdf,.jpg,.jpeg,.png,.gif"
        required 
      />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {/* {result && <p>Uploaded: {result?.url}</p>} */}
    </form>
  );
}