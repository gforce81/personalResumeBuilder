import jsPDF from 'jspdf';

/**
 * Export resume to ATS-optimized PDF
 * Uses simple, clean formatting that ATS systems can parse
 * This is separate from the modern web view for maximum compatibility
 */
export const exportToPDF = (resumeData) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 50;
  const contentWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper function to check if we need a new page
  const checkPageBreak = (requiredHeight) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper to add text with wrapping
  const addText = (text, fontSize, fontStyle = 'normal', lineHeight = fontSize * 1.3) => {
    if (!text) return;
    
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', fontStyle);
    
    const lines = pdf.splitTextToSize(text, contentWidth);
    const textHeight = lines.length * lineHeight;
    
    checkPageBreak(textHeight + 5);
    
    lines.forEach((line) => {
      checkPageBreak(lineHeight);
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
  };

  // Header Section - ATS-friendly format
  if (resumeData.header) {
    const { name, title, phone, email, location } = resumeData.header;
    
    // Name (centered, larger, bold)
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    const nameWidth = pdf.getStringUnitWidth(name || '') * 22 / pdf.internal.scaleFactor;
    const nameX = (pageWidth - nameWidth) / 2;
    pdf.text(name || '', nameX, yPosition);
    yPosition += 22;

    // Title (centered, medium)
    if (title) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'italic');
      const titleWidth = pdf.getStringUnitWidth(title) * 12 / pdf.internal.scaleFactor;
      const titleX = (pageWidth - titleWidth) / 2;
      pdf.text(title, titleX, yPosition);
      yPosition += 18;
    }

    // Contact info (centered, smaller)
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const contactParts = [email, phone, location].filter(Boolean);
    const contactInfo = contactParts.join(' • ');
    const contactWidth = pdf.getStringUnitWidth(contactInfo) * 10 / pdf.internal.scaleFactor;
    const contactX = (pageWidth - contactWidth) / 2;
    pdf.text(contactInfo, contactX, yPosition);
    yPosition += 25;

    // Divider line
    pdf.setDrawColor(100, 100, 100);
    pdf.setLineWidth(0.5);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 20;
  }

  // Sections - Simple, ATS-parseable format
  if (resumeData.sections) {
    resumeData.sections
      .sort((a, b) => a.order - b.order)
      .forEach((section) => {
        checkPageBreak(50);

        // Section Title - bold, uppercase
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(section.title.toUpperCase(), margin, yPosition);
        yPosition += 5;
        
        // Underline
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPosition, margin + 100, yPosition);
        yPosition += 15;

        // Section Content - parse markdown to ATS-friendly text
        const content = parseMarkdownToPlainText(section.content);
        addText(content, 10, 'normal', 13);
        
        yPosition += 15; // Space between sections
      });
  }

  // Save the PDF
  const fileName = `${resumeData.header?.name || 'Resume'} - Resume.pdf`;
  pdf.save(fileName);
};

/**
 * Convert markdown to plain text for ATS compatibility
 * Removes markdown formatting but preserves structure
 */
const parseMarkdownToPlainText = (markdown) => {
  if (!markdown) return '';

  let text = markdown;

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');

  // Convert headers to plain text with line breaks
  text = text.replace(/#{1,6}\s+(.+)/g, '\n$1\n');

  // Convert bold/italic to plain text
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '$1');
  text = text.replace(/\*\*(.+?)\*\*/g, '$1');
  text = text.replace(/\*(.+?)\*/g, '$1');
  text = text.replace(/___(.+?)___/g, '$1');
  text = text.replace(/__(.+?)__/g, '$1');
  text = text.replace(/_(.+?)_/g, '$1');

  // Convert links to just the text
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // Convert lists to simple bullets
  text = text.replace(/^\s*[-*+]\s+/gm, '• ');
  text = text.replace(/^\s*\d+\.\s+/gm, '');

  // Clean up extra line breaks
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();

  return text;
};

