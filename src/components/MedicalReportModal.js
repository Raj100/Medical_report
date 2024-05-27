import React, { useState } from 'react';
import Modal from "react-modal";
import jsPDF from "jspdf";
import "jspdf-autotable";

Modal.setAppElement('body');

const MedicalReportModal = ({ isOpen, onRequestClose, extractedInfo, transcript }) => {
  const parseExtractedInfo = (dataString) => {
    if (typeof dataString !== 'string') {
      console.error("Expected dataString to be a string but received:", typeof dataString);
      return {};
    }

    const dataWithoutFirstLine = dataString.split("\n").slice(1).join("\n");

    const sections = dataWithoutFirstLine.split("\n\n## ");
    const info = {};

    sections.forEach(section => {
      const lines = section.split("\n");
      const sectionTitle = lines.shift().replace("## ", "").trim();
      info[sectionTitle] = lines.map(line => line.replace(/- /, "").trim());
    });
    return info;
  };

  const formatExtractedInfo = (parsedInfo) => {
    const formattedInfo = [];

    Object.entries(parsedInfo).forEach(([sectionTitle, details]) => {
      details.forEach(detail => {
        const [field, information] = detail.split(": ");
        formattedInfo.push({
          title: field,
          data: information ? information.replace(/\. /g, ".\n") : "",
        });
      });
    });

    return formattedInfo;
  };

  const [checkedFields, setCheckedFields] = useState({});
  const [editingFields, setEditingFields] = useState({});
  const [editedInfo, setEditedInfo] = useState({});

  const handleCheckboxChange = (title) => {
    setCheckedFields(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  const handleEditChange = (title, newData) => {
    setEditedInfo(prevState => ({
      ...prevState,
      [title]: newData
    }));
  };

  const toggleEdit = (title) => {
    setEditingFields(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Medical Report", 14, 16);

    const formattedInfo = formatExtractedInfo(parsedInfo);
    const data = formattedInfo
      .filter(info => checkedFields[info.title])
      .map(info => [info.title, editedInfo[info.title] || info.data]);

    doc.autoTable({
      startY: 36,
      head: [['Field', 'Information']],
      body: data,
    });

    doc.save('medical_report.pdf');
  };

  const parsedInfo = parseExtractedInfo(extractedInfo);
  const formattedInfo = formatExtractedInfo(parsedInfo);

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
            <div key={index} className="mb-2 flex items-start">
              <input
                type="checkbox"
                checked={!!checkedFields[info.title]}
                onChange={() => handleCheckboxChange(info.title)}
                className="mr-2 mt-1"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">{info.title}</h4>
                  <button
                    onClick={() => toggleEdit(info.title)}
                    className="ml-2 text-blue-500 underline"
                  >
                    {editingFields[info.title] ? "Save" : "Edit"}
                  </button>
                </div>
                {editingFields[info.title] ? (
                  <textarea
                    value={editedInfo[info.title] || info.data}
                    onChange={(e) => handleEditChange(info.title, e.target.value)}
                    className="w-full mt-2 p-2 border rounded"
                  />
                ) : (
                  <pre>{editedInfo[info.title] || info.data}</pre>
                )}
              </div>
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
