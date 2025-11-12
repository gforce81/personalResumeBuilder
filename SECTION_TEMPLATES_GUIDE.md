# Section Templates Guide

## Overview

The Personal Resume Builder includes 10 pre-formatted section templates stored as individual markdown files in `src/templates/`. This makes templates easy to view, edit, and maintain without touching any code.

## Template Files Location

All templates are located in: **`src/templates/`**

Each template is a separate `.md` file:
- `experience.md` - Work history
- `education.md` - Academic background
- `skills.md` - Technical and soft skills
- `summary.md` - Professional summary
- `certifications.md` - Licenses and certifications
- `projects.md` - Notable projects
- `awards.md` - Awards and recognition
- `publications.md` - Articles and talks
- `volunteer.md` - Volunteer work
- `blank.md` - Start from scratch

## How to Use Templates

### Adding a New Section

1. Click the **"Add Section"** button in the admin dashboard
2. A modal will appear showing available templates
3. Select the template that matches your content type
4. Click **"Add Section"**
5. The section will be created with example formatting
6. Replace the example content with your own information

### Available Templates

#### 1. **Work Experience**
Perfect for your job history with achievements.

**Format includes:**
- Job title as H2 heading
- Company name and location as H3
- Date range
- Company/role description
- Bullet points for achievements with impact

**Example:**
```markdown
## Senior Product Manager
### Tech Company, San Francisco, CA
January 2020 - Present
* Led team of 5 engineers, increased revenue by 40%
* Launched 3 major features with 99.9% uptime
```

#### 2. **Education**
For academic background and degrees.

**Format includes:**
- Degree and major in bold
- University name and location
- Graduation year
- GPA (optional)

**Example:**
```markdown
* **Bachelor of Science, Computer Science**  
  Stanford University, CA  
  2018
```

#### 3. **Skills**
Categorized list of technical and soft skills.

**Format includes:**
- Category names in bold
- Comma-separated skills
- Multiple skill categories

**Example:**
```markdown
* **Programming:** Python, JavaScript, React
* **Tools:** Git, Docker, AWS
* **Languages:** English (native), Spanish (fluent)
```

#### 4. **Professional Summary**
Brief overview highlighting expertise.

**Format includes:**
- 2-4 sentences
- Years of experience
- Key accomplishments
- Career focus

**Example:**
```markdown
Product manager with 10+ years of experience leading cross-functional teams.
Specialized in SaaS products with focus on user engagement and revenue growth.
```

#### 5. **Certifications**
Professional certifications and licenses.

**Format includes:**
- Certification name in bold
- Issuing organization
- Year obtained

**Example:**
```markdown
* **AWS Certified Solutions Architect** - Amazon Web Services (2023)
* **PMP Certification** - PMI (2022)
```

#### 6. **Projects**
Notable projects and contributions.

**Format includes:**
- Project name as H2 heading
- Technologies used
- Description
- Impact/results
- Optional link

**Example:**
```markdown
## Personal Resume Builder
**Technologies:** React, Firebase, Tailwind CSS

Open-source resume builder with markdown support.
* Deployed to 100+ users
* Link: [GitHub](https://github.com/...)
```

#### 7. **Awards & Recognition**
Awards, honors, and recognition.

**Format includes:**
- Award name in bold
- Organization and year
- Brief description

**Example:**
```markdown
* **Employee of the Year** - Tech Corp, 2023  
  Recognized for outstanding contribution to product development
```

#### 8. **Publications & Speaking**
Articles, papers, and conference talks.

**Format includes:**
- Title in quotes and bold
- Publication/conference name
- Year
- Optional description/link

**Example:**
```markdown
* **"Building Scalable Web Apps"** - Tech Conference, 2023  
  Keynote presentation on modern web architecture
```

#### 9. **Volunteer Experience**
Volunteer work and community involvement.

**Format includes:**
- Role/position as H2
- Organization name as H3
- Date range
- Bullet points for activities and impact

**Example:**
```markdown
## Mentor
### Code for Good
2020 - Present
* Mentored 15+ students in web development
* Organized monthly coding workshops
```

#### 10. **Blank Section**
Start from scratch with formatting hints.

**Includes:**
- Basic markdown formatting tips
- No pre-filled content

## Markdown Formatting Tips

### Headers
```markdown
# Main Title (rarely used in sections)
## Major Heading (job titles, project names)
### Subheading (company names, education institutions)
```

### Text Formatting
```markdown
**Bold text** for emphasis
*Italic text* for subtle emphasis
[Link text](https://url.com) for links
```

### Lists
```markdown
* Bullet point item
* Another item
  * Nested item (indent with 2 spaces)

1. Numbered list
2. Second item
```

### Line Breaks
- Add two spaces at the end of a line for a line break
- Or use a blank line for paragraph spacing

## Editing Templates Directly

**New in v2.0:** Templates are now stored as markdown files, making them easy to edit!

### To Edit a Template:

1. Open the template file in `src/templates/` (e.g., `src/templates/experience.md`)
2. Edit the markdown content
3. Save the file
4. Rebuild: `npm run build`
5. Deploy: `firebase deploy --only hosting`

**Example:** To change the Experience template format:
```bash
# Open the file
code src/templates/experience.md

# Edit the markdown as needed

# Rebuild and deploy
npm run build
firebase deploy --only hosting
```

### To Add a New Template:

1. Create a new `.md` file in `src/templates/`
2. Add template content
3. Update `src/lib/sectionTemplates.js` to import and reference it
4. Add to `getTemplateTypes()` array
5. Rebuild and deploy

## Customizing Templates

### After Adding a Template to Your Resume

1. **Replace Example Content**: Delete the example text and add your own
2. **Adjust Formatting**: Modify headers, bullets, or structure as needed
3. **Keep What Works**: Templates are starting points, not requirements
4. **Use Preview**: Toggle preview to see how it will look

### Tips for Best Results

1. **Be Specific**: Replace vague examples with concrete achievements
2. **Use Numbers**: Quantify achievements whenever possible (e.g., "Increased sales by 25%")
3. **Action Verbs**: Start bullet points with strong verbs (Led, Developed, Achieved)
4. **Consistent Format**: Keep similar sections formatted the same way
5. **Proofread**: Check spelling and grammar before saving

## Benefits of Using Templates

### 1. **Consistency**
- All sections follow the same formatting style
- Professional appearance throughout

### 2. **Time-Saving**
- No need to remember markdown syntax
- Focus on content, not formatting

### 3. **Best Practices**
- Templates follow resume industry standards
- Proven structures that recruiters expect

### 4. **Learning Tool**
- See examples of good resume content
- Learn markdown formatting by example

### 5. **ATS-Friendly**
- Simple, clean formatting that ATS systems can parse
- No complex layouts or tables

## Troubleshooting

### Template Text Shows in Preview
**Problem:** Example text appears in your resume preview  
**Solution:** Make sure to replace ALL example content with your own information

### Formatting Looks Wrong
**Problem:** Bullets or headers don't display correctly  
**Solution:** 
- Check that there's a space after `*` for bullets
- Check that there's a space after `#` for headers
- Use preview to verify formatting

### Can't Find Template I Need
**Problem:** None of the templates match my section  
**Solution:** Choose "Blank Section" and format manually, or pick the closest template and modify it

### Template Content Too Long
**Problem:** Template has more fields than I need  
**Solution:** Delete the parts you don't need - templates are fully customizable

## Creating Custom Sections

If none of the templates fit:

1. Choose **"Blank Section"**
2. Add your title
3. Use the formatting tips provided
4. Reference other sections for consistency
5. Use preview to check your work

## Examples of Good Section Content

### Strong Experience Entry
```markdown
## Head of Product Management
### Tech Startup, Remote
Jan 2022 - Present

Led product strategy for B2B SaaS platform serving 500+ enterprise clients.

* Increased MRR from $2M to $8M (300% growth) through strategic feature launches
* Built and led cross-functional team of 12 (engineering, design, data)
* Reduced customer churn by 45% through improved onboarding experience
* Launched 5 major features with 99.9% uptime and positive user feedback
```

### Strong Skills Section
```markdown
* **Product Management:** Product strategy, roadmap planning, stakeholder management, user research
* **Technical:** Python, SQL, APIs, cloud architecture (AWS, GCP)
* **Tools:** Jira, Figma, Amplitude, Mixpanel, Salesforce
* **Certifications:** AWS Solutions Architect, Certified Scrum Product Owner
```

## Summary

Section templates help you create professional, well-formatted resume content quickly. They're starting points - customize them to tell your unique story!

---

**Need more help?** See [README.md](./README.md) for complete documentation.

