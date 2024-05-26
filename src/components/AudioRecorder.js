// src/components/AudioRecorder.js

import React, { useEffect, useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import Modal from 'react-modal';
import jsPDF from 'jspdf';

const AudioRecorder = ({ recording }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [responseData, setResponseData] = useState(null);

//   useEffect(() => {
//     Modal.setAppElement('#__next'); // This is the default root ID in Next.js
//   }, []);

  const handleStop = async (blobUrl, blob) => {
    const recordedFile = new File([blob], 'recorded_audio.wav', { type: 'audio/wav' });

    const formData = new FormData();
    formData.append('file', recordedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseData(response.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Medical Report', 20, 10);
    if (responseData) {
      Object.keys(responseData).forEach((key, index) => {
        doc.text(`${key}: ${responseData[key]}`, 20, 20 + index * 10);
      });
    }
    doc.save('report.pdf');
  };

  return (
    <>
      <ReactMediaRecorder
        audio
        onStop={handleStop}
        render={({ startRecording, stopRecording }) => {
          useEffect(() => {
            if (recording) {
              startRecording();
            } else {
              stopRecording();
            }
          }, [recording, startRecording, stopRecording]);

          return null;
        }}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Medical Report"
        className="bg-white p-4 rounded shadow-lg max-w-md mx-auto mt-20"
      >
        <h2 className="text-2xl font-bold mb-4">Medical Report</h2>
        {responseData ? (
          <div>
            {Object.keys(responseData).map((key) => (
              <p key={key}><strong>{key}:</strong> {responseData[key]}</p>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button
          onClick={generatePDF}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default AudioRecorder;
