import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Chatbot from './chatbot'; // Adjust path if necessary
import './resume.css'; // Add this line
// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeUploader = () => {
  const [file, setFile] = useState(null);           // Will store a data URL for preview
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [resumeText, setResumeText] = useState("");

  // On mount, load resumeText and file preview from localStorage if available
  useEffect(() => {
    const storedText = localStorage.getItem("resumeText");
    const storedFile = localStorage.getItem("resumeFile");
    if (storedText) {
      setResumeText(storedText);
    }
    if (storedFile) {
      setFile(storedFile);
    }
  }, []);

  // Read the file as an ArrayBuffer and extract text using PDF.js
  const extractTextFromPDF = async (fileObj) => {
    try {
      const arrayBuffer = await fileObj.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        text += pageText + "\n";
      }
      console.log("Extracted Resume Text:", text);
      setResumeText(text);
      localStorage.setItem("resumeText", text);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  // Convert file to Base64 Data URL and store it
  const convertFileToDataURL = (fileObj) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileDataUrl = event.target.result;
      setFile(fileDataUrl);
      localStorage.setItem("resumeFile", fileDataUrl);
    };
    reader.readAsDataURL(fileObj);
  };

  const onFileChange = (e) => {
    const fileObj = e.target.files[0];
    if (fileObj) {
      convertFileToDataURL(fileObj);
      extractTextFromPDF(fileObj);
    }
  };

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const downloadPDF = () => {
    if (!file) return;
    const link = document.createElement('a');
    link.href = file;
    link.download = 'resume.pdf';
    link.click();
  };

  return (
    <div>
      <h2>Upload Your Resume</h2>
      <input type="file" onChange={onFileChange} />
      {file && (
        <div>
          <Document file={file} onLoadSuccess={onLoadSuccess} loading="Loading PDF...">
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
              Previous
            </button>
            <span>Page {pageNumber} of {numPages}</span>
            <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)}>
              Next
            </button>
          </div>
          <button onClick={downloadPDF}>Download PDF</button>
        </div>
      )}
      {/* Once resumeText is extracted (or loaded), pass it to Chatbot */}
      {resumeText && (
        <div>
          {/* <h3>Extracted Resume Text</h3> */}
          <Chatbot conversationHistory={resumeText} />
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
