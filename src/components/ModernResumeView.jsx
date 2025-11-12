import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Download, 
  FileText, 
  Github, 
  Linkedin, 
  Globe,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  BookOpen,
  Lightbulb,
  Users,
  FileCode,
  Target,
  Star,
  TrendingUp,
  GitBranch,
  Database,
  Heart,
  Zap,
  Shield,
  Wrench,
  Rocket
} from 'lucide-react';
import { getResume } from '../lib/resumeService';
import { exportToPDF } from '../lib/pdfExport';
import { exportToMarkdown } from '../lib/markdownExport';
import { parseSkills } from '../lib/skillParser';
import { getDefaultIconForTitle } from '../lib/iconList';
import '../styles/modern-resume.css';
import '../styles/colors.css';

const ModernResumeView = ({ onAdminClick }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResume();
  }, []);

  // Update page title when resume data loads
  useEffect(() => {
    if (resume?.header?.name) {
      document.title = `${resume.header.name} - Personal Resume Builder`;
    } else {
      document.title = 'Personal Resume Builder';
    }
  }, [resume]);

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

  // Get icon component for section
  const getSectionIcon = (section) => {
    // Use custom icon if set, otherwise use default based on title
    const iconType = section.icon || getDefaultIconForTitle(section.title);
    
    const iconMap = {
      'briefcase': <Briefcase />,
      'graduation-cap': <GraduationCap />,
      'code': <Code />,
      'award': <Award />,
      'file-code': <FileCode />,
      'book-open': <BookOpen />,
      'lightbulb': <Lightbulb />,
      'users': <Users />,
      'file-text': <FileText />,
      'target': <Target />,
      'star': <Star />,
      'trending-up': <TrendingUp />,
      'git-branch': <GitBranch />,
      'database': <Database />,
      'globe': <Globe />,
      'heart': <Heart />,
      'zap': <Zap />,
      'shield': <Shield />,
      'tool': <Wrench />,
      'rocket': <Rocket />
    };
    
    return iconMap[iconType] || <FileText />;
  };

  // Determine if section should go in sidebar
  const isSidebarSection = (title) => {
    const titleLower = title.toLowerCase();
    return titleLower.includes('skill') || 
           titleLower.includes('about') || 
           titleLower.includes('summary') ||
           titleLower.includes('language') ||
           titleLower.includes('certification');
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

  if (!resume) return null;

  const mainSections = resume.sections
    ?.filter(section => !isSidebarSection(section.title))
    .sort((a, b) => a.order - b.order) || [];

  const sidebarSections = resume.sections
    ?.filter(section => isSidebarSection(section.title))
    .sort((a, b) => a.order - b.order) || [];

  return (
    <div className="modern-resume-container">
      {/* Export Buttons */}
      <div className="modern-resume-export-buttons no-print">
        <button onClick={handleExportPDF} className="modern-resume-export-button">
          <Download size={18} />
          <span>PDF</span>
        </button>
        <button onClick={handleExportMarkdown} className="modern-resume-export-button">
          <FileText size={18} />
          <span>Markdown</span>
        </button>
      </div>

      <div className="modern-resume-wrapper">
        {/* Header/Hero Section */}
        <header className="modern-resume-header">
          <div className="modern-resume-header-content">
            {/* Profile Picture */}
            {resume.header.profilePicture ? (
              <img 
                src={resume.header.profilePicture} 
                alt={resume.header.name}
                className="modern-resume-profile-pic"
              />
            ) : (
              <div className="modern-resume-profile-pic-placeholder">
                {resume.header.name?.charAt(0) || 'U'}
              </div>
            )}

            {/* Header Info */}
            <div className="modern-resume-header-info">
              <h1 className="modern-resume-name">{resume.header.name}</h1>
              {resume.header.title && (
                <p className="modern-resume-title">{resume.header.title}</p>
              )}

              {/* Contact Info */}
              <div className="modern-resume-contact-info">
                {resume.header.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <a href={`mailto:${resume.header.email}`}>{resume.header.email}</a>
                  </div>
                )}
                {resume.header.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>{resume.header.phone}</span>
                  </div>
                )}
                {resume.header.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{resume.header.location}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {resume.header.socialLinks && (
                <div className="modern-resume-social-links">
                  {resume.header.socialLinks.github && (
                    <a 
                      href={resume.header.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modern-resume-social-link"
                      title="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {resume.header.socialLinks.linkedin && (
                    <a 
                      href={resume.header.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modern-resume-social-link"
                      title="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {resume.header.socialLinks.website && (
                    <a 
                      href={resume.header.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modern-resume-social-link"
                      title="Website"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Two-Column Layout */}
        <div className="modern-resume-grid">
          {/* Main Content Column */}
          <div className="modern-resume-main">
            {mainSections.map(section => (
              <div key={section.id} className="modern-resume-section-card">
                <div className="modern-resume-section-header">
                  <div className="modern-resume-section-icon">
                    {getSectionIcon(section)}
                  </div>
                  <h2 className="modern-resume-section-title">{section.title}</h2>
                </div>
                <div className="modern-resume-section-content">
                  <ReactMarkdown>{section.content}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Column */}
          <div className="modern-resume-sidebar">
            {sidebarSections.map(section => {
              const isSkillsSection = section.title.toLowerCase().includes('skill');
              const skillsData = isSkillsSection ? parseSkills(section.content) : null;

              return (
                <div key={section.id} className="modern-resume-section-card">
                  <div className="modern-resume-section-header">
                    <div className="modern-resume-section-icon">
                      {getSectionIcon(section)}
                    </div>
                    <h2 className="modern-resume-section-title">{section.title}</h2>
                  </div>
                  
                  {isSkillsSection && skillsData && skillsData.length > 0 ? (
                    /* Render skills as tags */
                    <div>
                      {skillsData.map((category, idx) => (
                        <div key={idx} className="modern-resume-skill-category">
                          <div className="modern-resume-skill-category-title">
                            {category.category}
                          </div>
                          <div className="modern-resume-skills-container">
                            {category.skills.map((skill, skillIdx) => (
                              <span key={skillIdx} className="modern-resume-skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Regular markdown content */
                    <div className="modern-resume-section-content">
                      <ReactMarkdown>{section.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="modern-resume-footer no-print">
          <p>
            Built with <Heart size={14} className="inline" /> using{' '}
            <a 
              href="https://github.com/gforce81/personalResumeBuilder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="modern-resume-footer-link"
            >
              PersonalResumeBuilder
            </a>
          </p>
        </footer>
      </div>

      {/* Admin Button */}
      {onAdminClick && (
        <button onClick={onAdminClick} className="modern-resume-admin-button no-print">
          Admin Panel
        </button>
      )}
    </div>
  );
};

export default ModernResumeView;

