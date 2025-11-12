import jsPDF from 'jspdf';
import { MdTextRender } from 'jspdf-md-renderer';

/**
 * Export resume to professional PDF with markdown formatting
 * Uses jspdf-md-renderer for proper markdown rendering
 * Maintains ATS compatibility with clean, readable formatting
 */
export const exportToPDF = async (resumeData) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;
  let yPosition = margin;

  // Header Section - Clean, centered format
  if (resumeData.header) {
    const { name, title, phone, email, location } = resumeData.header;
    
    // Name (centered, larger, bold)
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    const nameWidth = pdf.getStringUnitWidth(name || '') * 24 / pdf.internal.scaleFactor;
    const nameX = (pageWidth - nameWidth) / 2;
    pdf.text(name || '', nameX, yPosition);
    yPosition += 8;

    // Title (centered, medium)
    if (title) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'italic');
      const titleWidth = pdf.getStringUnitWidth(title) * 12 / pdf.internal.scaleFactor;
      const titleX = (pageWidth - titleWidth) / 2;
      pdf.text(title, titleX, yPosition);
      yPosition += 6;
    }

    // Contact info (centered, smaller)
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const contactParts = [email, phone, location].filter(Boolean);
    const contactInfo = contactParts.join(' • ');
    const contactWidth = pdf.getStringUnitWidth(contactInfo) * 10 / pdf.internal.scaleFactor;
    const contactX = (pageWidth - contactWidth) / 2;
    pdf.text(contactInfo, contactX, yPosition);
    yPosition += 10;

    // Divider line
    pdf.setDrawColor(100, 100, 100);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;
  }

  // Build markdown content for all sections
  let markdownContent = '';
  if (resumeData.sections) {
    resumeData.sections
      .sort((a, b) => a.order - b.order)
      .forEach((section) => {
        // Add section with proper markdown formatting
        markdownContent += `## ${section.title}\n\n`;
        markdownContent += `${section.content}\n\n`;
      });
  }

  // Render markdown content using jspdf-md-renderer
  const options = {
    cursor: { x: margin, y: yPosition },
    page: {
      format: 'a4',
      unit: 'mm',
      orientation: 'portrait',
      maxContentWidth: pageWidth - (margin * 2),
      maxContentHeight: 277,
      lineSpace: 1.3,
      defaultLineHeightFactor: 1.15,
      defaultFontSize: 10,
      defaultTitleFontSize: 12,
      topmargin: margin,
      xpading: margin,
      xmargin: margin,
      indent: 7,
    },
    font: {
      bold: { name: 'helvetica', style: 'bold' },
      regular: { name: 'helvetica', style: 'normal' },
      light: { name: 'helvetica', style: 'normal' },
    },
    endCursorYHandler: (y) => {
      // Optional: Log final cursor position
      console.log('PDF content ends at Y position:', y);
    },
  };

  await MdTextRender(pdf, markdownContent, options);

  // Save the PDF
  const fileName = `${resumeData.header?.name || 'Resume'} - Resume.pdf`;
  pdf.save(fileName);
};


