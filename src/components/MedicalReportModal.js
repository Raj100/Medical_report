import React from 'react';
import Modal from "react-modal";
import jsPDF from "jspdf";
import "jspdf-autotable";

Modal.setAppElement('body');

const MedicalReportModal = ({ isOpen, onRequestClose, extractedInfo, transcript }) => {
  const formatExtractedInfo = () => {
    return Object.entries(extractedInfo).map(([key, value]) => ({
      title: key,
      data: value.length > 0 ? value.join(", ") : "N/A",
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Medical Report", 14, 16);
    // doc.text(`Transcript: ${transcript}`, 14, 26);

    const formattedInfo = formatExtractedInfo();
    const data = formattedInfo.map(info => [info.title, info.data]);

    doc.autoTable({
      startY: 36, 
      head: [['Field', 'Information']],
      body: data,
    });

    doc.save('medical_report.pdf');
  };

  const formattedInfo = formatExtractedInfo();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Medical Report"
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-75"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Medical Report</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Transcript</h3>
          <p>{transcript}</p>
        </div>
        <div>
          {formattedInfo.map((info, index) => (
            <div key={index} className="mb-2">
              <h4 className="text-lg font-semibold">{info.title}</h4>
              <p>{info.data}</p>
            </div>
          ))}
        </div>
        <button
          onClick={generatePDF}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Download as PDF
        </button>
        <button
          onClick={onRequestClose}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded ml-2"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default MedicalReportModal;
