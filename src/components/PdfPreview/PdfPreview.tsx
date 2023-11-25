import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { pdfjs } from 'react-pdf';

interface PdfPreviewProps {
  pdfLocation: string;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ pdfLocation }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfLocation} />
      </Worker>
    </div>
  );
};

export default PdfPreview;