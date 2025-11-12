import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, FileText } from 'lucide-react';
import { getResume } from '../lib/resumeService';
import { exportToPDF } from '../lib/pdfExport';
import { exportToMarkdown } from '../lib/markdownExport';
import '../styles/resume.css';

const ResumeView = ({ onAdminClick }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      setLoading(true);
      const data = await getResume();
      if (data) {
        setResume(data);
      } else {
        setError('No resume data found. Please set up your resume in the admin panel.');
      }
    } catch (err) {
      setError('Failed to load resume. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (resume) {
      try {
        await exportToPDF(resume);
      } catch (error) {
        console.error('Failed to export PDF:', error);
        alert('Failed to export PDF. Please try again.');
      }
    }
  };

  const handleExportMarkdown = () => {
    if (resume) {
      exportToMarkdown(resume);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          {onAdminClick && (
            <button
              onClick={onAdminClick}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Go to Admin Panel
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!resume) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Export Buttons */}
      <div className="export-buttons no-print">
        <button onClick={handleExportPDF} className="export-button" title="Export as PDF">
          <Download />
          <span>PDF</span>
        </button>
        <button onClick={handleExportMarkdown} className="export-button" title="Export as Markdown">
          <FileText />
          <span>Markdown</span>
        </button>
      </div>

      {/* Resume Container */}
      <div className="resume-container">
        {/* Header */}
        {resume.header && (
          <header className="resume-header">
            <h1>{resume.header.name}</h1>
            <div className="resume-header-contact">
              {resume.header.phone && <span>{resume.header.phone}</span>}
              {resume.header.email && (
                <a href={`mailto:${resume.header.email}`}>{resume.header.email}</a>
              )}
              {resume.header.location && <span>{resume.header.location}</span>}
            </div>
          </header>
        )}

        {/* Sections */}
        {resume.sections &&
          resume.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <section key={section.id} className="resume-section">
                <h2 className="resume-section-title">{section.title}</h2>
                <div className="resume-section-content">
                  <ReactMarkdown>{section.content}</ReactMarkdown>
                </div>
              </section>
            ))}
      </div>

      {/* Admin Button */}
      {onAdminClick && (
        <button onClick={onAdminClick} className="admin-button no-print">
          Admin Panel
        </button>
      )}
    </div>
  );
};

export default ResumeView;

