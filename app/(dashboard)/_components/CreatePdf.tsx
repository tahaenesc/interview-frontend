"use client";

import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";

function CreatePdf() {
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (contentRef.current) {
      // HTML'den Canvas oluştur
      const canvas = await html2canvas(contentRef.current);

      // Canvas'ı görüntü olarak al
      const imgData = canvas.toDataURL("image/png");

      // PDF'e ekle
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // PDF'i indir
      pdf.save("screenshot.pdf");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* PDF için alınacak içerik */}
      <div
        ref={contentRef}
        className="w-full max-w-lg p-4 bg-gray-100 border rounded shadow"
      >
        <h1 className="text-xl font-bold text-center">This is a test content</h1>
        <p className="mt-2 text-gray-700">
          This content will be captured as an image and saved into a PDF file.
        </p>
        <ul className="mt-4 list-disc list-inside">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>

      {/* PDF oluşturma butonu */}
      <Button
        onClick={generatePDF}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        Generate PDF
      </Button>
    </div>
  );
}

export default CreatePdf;
