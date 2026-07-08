import React, { useState } from 'react';
import { Copy, Printer, FileText, Download, Check } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportActionsProps {
  title?: string;
  data?: Record<string, string | number>;
  targetRef?: React.RefObject<HTMLElement>;
  [key: string]: any;
}

export function ExportActions({ title, data, targetRef, ...rest }: ExportActionsProps) {
  const [copied, setCopied] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const getFormatString = () => {
    const safeTitle = title || rest.calculatorName || 'Calculator';
    let str = `--- ${safeTitle.toUpperCase()} ---\n\n`;
    str += `Date: ${new Date().toLocaleString()}\n\n`;
    const safeData = data || { ...rest.inputs, ...rest.results } || {};
    Object.entries(safeData).forEach(([key, value]) => {
      str += `${key}: ${value}\n`;
    });
    return str;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormatString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!targetRef || !targetRef.current) {
      alert("PDF target not found.");
      return;
    }
    
    setIsExportingPDF(true);
    try {
      // Allow React updates to settle
      await new Promise(r => setTimeout(r, 100));
      
      const element = targetRef.current;
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'l' : 'p',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      const safeTitle = title || rest.calculatorName || 'Calculator';
      pdf.save(`${safeTitle.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (e) {
      console.error('PDF export failed', e);
      alert('Failed to generate PDF. Please try Print -> Save to PDF.');
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleDownloadCSV = () => {
    let csv = `Calculator,Timestamp,Parameter,Value\n`;
    const timestamp = new Date().toISOString();
    const safeTitle = title || rest.calculatorName || 'Calculator';
    const safeData = data || { ...rest.inputs, ...rest.results } || {};
    
    Object.entries(safeData).forEach(([key, value]) => {
      const safeKey = `"${key.replace(/"/g, '""')}"`;
      const safeValue = `"${String(value).replace(/"/g, '""')}"`;
      csv += `"${safeTitle}","${timestamp}",${safeKey},${safeValue}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeTitle.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.csv`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-6 print:hidden">
      <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 px-3 rounded-xl text-sm font-medium transition-colors shadow-sm active:scale-[0.98]">
        {copied ? <Check className="w-4 h-4 text-[#1a5f3f]" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied' : 'Copy Results'}
      </button>
      
      <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 px-3 rounded-xl text-sm font-medium transition-colors shadow-sm active:scale-[0.98]">
        <Printer className="w-4 h-4" />
        Print
      </button>
      
      <button 
        onClick={handleDownloadPDF} 
        disabled={isExportingPDF || !targetRef} 
        className="flex-1 flex items-center justify-center gap-2 bg-[#1a5f3f] hover:bg-[#154d32] text-white py-2.5 px-3 rounded-xl text-sm font-medium transition-colors shadow-sm disabled:opacity-50 active:scale-[0.98]"
      >
        <FileText className="w-4 h-4" />
        {isExportingPDF ? 'Generating...' : 'Download PDF'}
      </button>

      <button onClick={handleDownloadCSV} className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2.5 px-3 rounded-xl text-sm font-medium transition-colors shadow-sm active:scale-[0.98]">
        <Download className="w-4 h-4" />
        Download CSV
      </button>
    </div>
  );
}
