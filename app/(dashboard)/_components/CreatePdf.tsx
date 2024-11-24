"use client";

import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";

function PageScreenshotPdf() {
  const handleGeneratePdf = async () => {
    try {
      // Mevcut ekran boyutlarını al
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Tüm sayfanın ekran görüntüsünü almak
      const canvas = await html2canvas(document.body, {
        width: screenWidth,
        height: screenHeight,
      });
      const imgData = canvas.toDataURL("image/png");

      // jsPDF ayarları (ekran boyutlarına göre)
      const pdf = new jsPDF({
        orientation: screenWidth > screenHeight ? "landscape" : "portrait", // Yatay veya dikey PDF
        unit: "px",
        format: [screenWidth, screenHeight], // Dinamik ekran boyutları
      });

      const pdfWidth = screenWidth;
      const pdfHeight = screenHeight;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Görüntüyü PDF'ye tam olarak sığdır
      const scaledWidth = pdfWidth;
      const scaledHeight = (imgHeight * scaledWidth) / imgWidth;

      // Görüntüyü PDF'ye ekle
      pdf.addImage(imgData, "PNG", 0, 0, scaledWidth, scaledHeight);
      pdf.save("PageScreenshot.pdf");
    } catch (error) {
      console.error("PDF oluşturulurken hata oluştu:", error);
    }
  };

  return (
    <div className="p-4">
      <Button
        onClick={handleGeneratePdf}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        Export PDF
      </Button>
    </div>
  );
}

export default PageScreenshotPdf;
