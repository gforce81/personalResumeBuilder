/**
 * Section templates loaded from markdown files
 * This makes templates easy to edit and maintain
 */

import experienceTemplate from '../templates/experience.md?raw';
import educationTemplate from '../templates/education.md?raw';
import skillsTemplate from '../templates/skills.md?raw';
import summaryTemplate from '../templates/summary.md?raw';
import certificationsTemplate from '../templates/certifications.md?raw';
import projectsTemplate from '../templates/projects.md?raw';
import awardsTemplate from '../templates/awards.md?raw';
import publicationsTemplate from '../templates/publications.md?raw';
import volunteerTemplate from '../templates/volunteer.md?raw';
import blankTemplate from '../templates/blank.md?raw';

export const SECTION_TEMPLATES = {
  experience: {
    title: "Experience",
    content: experienceTemplate
  },
  education: {
    title: "Education",
    content: educationTemplate
  },
  skills: {
    title: "Skills",
    content: skillsTemplate
  },
  summary: {
    title: "Summary",
    content: summaryTemplate
  },
  certifications: {
    title: "Certifications & Licenses",
    content: certificationsTemplate
  },
  projects: {
    title: "Projects",
    content: projectsTemplate
  },
  awards: {
    title: "Awards & Recognition",
    content: awardsTemplate
  },
  publications: {
    title: "Publications & Speaking",
    content: publicationsTemplate
  },
  volunteer: {
    title: "Volunteer Experience",
    content: volunteerTemplate
  },
  blank: {
    title: "New Section",
    content: blankTemplate
  }
};

/**
 * Get template by type
 */
export const getTemplate = (type) => {
  return SECTION_TEMPLATES[type] || SECTION_TEMPLATES.blank;
};

/**
 * Get all template types for display
 */
export const getTemplateTypes = () => {
  return [
    { value: 'experience', label: 'Work Experience' },
    { value: 'education', label: 'Education' },
    { value: 'skills', label: 'Skills' },
    { value: 'summary', label: 'Professional Summary' },
    { value: 'certifications', label: 'Certifications' },
    { value: 'projects', label: 'Projects' },
    { value: 'awards', label: 'Awards & Recognition' },
    { value: 'publications', label: 'Publications' },
    { value: 'volunteer', label: 'Volunteer Work' },
    { value: 'blank', label: 'Blank Section' }
  ];
};
