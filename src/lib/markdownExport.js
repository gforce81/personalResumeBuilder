/**
 * Export resume data to markdown format
 */
export const exportToMarkdown = (resumeData) => {
  let markdown = '';

  // Header
  if (resumeData.header) {
    const { name, title, phone, email, location, socialLinks } = resumeData.header;
    markdown += `**${name}**  \n`;
    if (title) markdown += `_${title}_  \n`;
    if (phone) markdown += `${phone}  \n`;
    if (email) markdown += `${email}  \n`;
    if (location) markdown += `${location}\n`;
    
    // Social Links
    if (socialLinks) {
      const links = [];
      if (socialLinks.github) links.push(`[GitHub](${socialLinks.github})`);
      if (socialLinks.linkedin) links.push(`[LinkedIn](${socialLinks.linkedin})`);
      if (socialLinks.twitter) links.push(`[Twitter](${socialLinks.twitter})`);
      if (socialLinks.website) links.push(`[Website](${socialLinks.website})`);
      if (links.length > 0) {
        markdown += `\n${links.join(' | ')}\n`;
      }
    }
    markdown += '\n';
  }

  // Sections
  if (resumeData.sections) {
    resumeData.sections
      .sort((a, b) => a.order - b.order)
      .forEach((section) => {
        markdown += `# ${section.title}\n\n`;
        markdown += `${section.content}\n\n`;
      });
  }

  // Create and download the file
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${resumeData.header?.name || 'Resume'} - Resume.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

