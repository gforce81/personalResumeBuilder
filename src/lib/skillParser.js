/**
 * Parse skills from markdown content
 * Detects comma-separated skills and converts them to tags
 */

export const parseSkills = (markdownContent) => {
  if (!markdownContent) return [];

  const skills = [];
  const lines = markdownContent.split('\n');

  for (const line of lines) {
    // Match patterns like: "* **Category:** skill1, skill2, skill3"
    const match = line.match(/\*\s+\*\*([^*]+)\*\*[:\s]+(.+)/);
    
    if (match) {
      const category = match[1].trim();
      const skillsList = match[2]
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      skills.push({
        category,
        skills: skillsList
      });
    } else if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
      // Handle simple bullet points
      const skill = line.replace(/^[\*\-]\s+/, '').trim();
      if (skill && !skill.includes('**')) {
        skills.push({
          category: 'General',
          skills: [skill]
        });
      }
    }
  }

  return skills;
};

/**
 * Get all skills as a flat array (for skill tags)
 */
export const getAllSkills = (markdownContent) => {
  const parsed = parseSkills(markdownContent);
  const allSkills = [];
  
  parsed.forEach(category => {
    allSkills.push(...category.skills);
  });
  
  return allSkills;
};

