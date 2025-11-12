/**
 * Available icons for resume sections
 * Users can choose from this list in the admin panel
 */

export const AVAILABLE_ICONS = [
  { value: 'briefcase', label: 'Briefcase (Work/Experience)' },
  { value: 'graduation-cap', label: 'Graduation Cap (Education)' },
  { value: 'code', label: 'Code (Skills/Technical)' },
  { value: 'award', label: 'Award (Recognition)' },
  { value: 'file-code', label: 'File Code (Projects)' },
  { value: 'book-open', label: 'Book (Publications)' },
  { value: 'lightbulb', label: 'Lightbulb (Ideas/Summary)' },
  { value: 'users', label: 'Users (Team/Volunteer)' },
  { value: 'file-text', label: 'Document (General)' },
  { value: 'target', label: 'Target (Goals/Objectives)' },
  { value: 'star', label: 'Star (Highlights)' },
  { value: 'trending-up', label: 'Trending Up (Growth/Metrics)' },
  { value: 'git-branch', label: 'Git Branch (Development)' },
  { value: 'database', label: 'Database (Data/Backend)' },
  { value: 'globe', label: 'Globe (Global/Languages)' },
  { value: 'heart', label: 'Heart (Passion/Interests)' },
  { value: 'zap', label: 'Lightning (Fast/Performance)' },
  { value: 'shield', label: 'Shield (Security)' },
  { value: 'tool', label: 'Tool (Technical Tools)' },
  { value: 'rocket', label: 'Rocket (Launch/Innovation)' }
];

/**
 * Get default icon for a section based on its title
 */
export const getDefaultIconForTitle = (title) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('experience') || titleLower.includes('work')) return 'briefcase';
  if (titleLower.includes('education')) return 'graduation-cap';
  if (titleLower.includes('skill')) return 'code';
  if (titleLower.includes('award') || titleLower.includes('recognition')) return 'award';
  if (titleLower.includes('project')) return 'file-code';
  if (titleLower.includes('publication') || titleLower.includes('speaking')) return 'book-open';
  if (titleLower.includes('summary') || titleLower.includes('about')) return 'lightbulb';
  if (titleLower.includes('volunteer')) return 'users';
  if (titleLower.includes('language')) return 'globe';
  return 'file-text';
};

