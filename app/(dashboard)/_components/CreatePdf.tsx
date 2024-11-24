"use client";

import React from "react";
import { jsPDF } from "jspdf";
import { Button } from "@/components/ui/button"; // Varsayılan bir Button bileşeni

function CreatePdf() {
  const generatePDF = () => {
    const doc = new jsPDF();

    // PDF içeriğini ekle
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Hello! This is your dynamically generated PDF.", 10, 20);

    doc.setFont("normal");
    doc.setFontSize(14);
    doc.text("Generated using React and jsPDF.", 10, 30);

    // Örnek tablo
    doc.text("Sample Table:", 10, 50);

    // PDF'i indir
    doc.save("example.pdf");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold">Generate PDF</h1>
      <Button
        onClick={generatePDF}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        Create PDF
      </Button>
    </div>
  );
}

export default CreatePdf;
