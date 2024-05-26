// src/components/AudioUpload.js

import React, { useState } from 'react';
import axios from 'axios';

const AudioUpload = ({ recordedFile }) => {
  const handleUpload = async () => {
    if (!recordedFile) {
      console.error('No recorded file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', recordedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AudioUpload;
