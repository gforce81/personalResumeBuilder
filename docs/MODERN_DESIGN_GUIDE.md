# Modern Resume Design Guide

## Overview

Version 2.0 introduces a completely redesigned resume view with a modern, dynamic two-column layout. This guide explains the new design and how to customize it.

## Key Features

### 🎨 Modern Two-Column Layout

**Left Column (Main Content):**
- Work Experience
- Projects
- Publications
- Awards
- Volunteer Work

**Right Column (Sidebar):**
- Summary/About
- Skills (with visual tags)
- Certifications
- Languages
- Other supplementary info

**Auto-Detection:** Sections are automatically placed in the correct column based on their title.

### 🃏 Card-Based Design

Each section is displayed in its own card with:
- Subtle shadow and border
- Hover effect (slight lift)
- Icon representing the section type
- Clean, modern spacing

### 🎯 Section Icons

Icons automatically assigned based on section title:
- 💼 **Briefcase** - Experience, Work
- 🎓 **Graduation Cap** - Education
- 💻 **Code** - Skills, Technical
- 🏆 **Award** - Awards, Recognition
- 📁 **File Code** - Projects
- 📚 **Book** - Publications, Speaking
- 💡 **Lightbulb** - Summary, About
- 👥 **Users** - Volunteer
- 📄 **Document** - Default for other sections

### 🏷️ Skill Tags

Skills in the "Skills" section are automatically converted to visual tags:

**From Markdown:**
```markdown
* **Frontend:** React, Vue.js, JavaScript
* **Backend:** Node.js, Python, PostgreSQL
```

**Rendered As:**
Colorful pill-shaped tags for each skill, grouped by category.

### 👤 Profile Section

**Header includes:**
- Optional circular profile picture (or initial placeholder)
- Name in large, bold text
- Professional title
- Contact information with icons (email, phone, location)
- Social media links (GitHub, LinkedIn, Twitter, Website)
- Gradient background (blue to purple)

## Customization

### Change Color Scheme

Edit `src/styles/colors.css`:

```css
:root {
  /* Primary Color - Main brand color */
  --color-primary-600: #0284c7;  /* Change this for primary color */
  --color-primary-700: #0369a1;  /* Darker shade */
  
  /* Accent Color - Secondary highlights */
  --color-accent-600: #9333ea;   /* Change this for accent color */
  --color-accent-700: #7e22ce;   /* Darker shade */
}
```

**Popular Color Schemes:**

**Professional Blue (Current):**
- Primary: `#0284c7` (blue)
- Accent: `#9333ea` (purple)

**Corporate Green:**
- Primary: `#059669` (green)
- Accent: `#0891b2` (cyan)

**Creative Orange:**
- Primary: `#ea580c` (orange)
- Accent: `#dc2626` (red)

**Tech Purple:**
- Primary: `#7c3aed` (violet)
- Accent: `#ec4899` (pink)

### Configure Section Placement

**Force section to main column:** Name it without keywords like "skill", "about", "summary", "language", or "certification"

**Force section to sidebar:** Include one of those keywords in the title

**Custom Logic:** Edit `isSidebarSection()` function in `src/components/ModernResumeView.jsx`

### Adjust Layout Widths

Edit `src/styles/modern-resume.css`:

```css
.modern-resume-grid {
  grid-template-columns: 1fr 380px;  /* Change 380px for sidebar width */
  gap: 2rem;  /* Change gap between columns */
}
```

### Modify Card Appearance

Edit card styles in `modern-resume.css`:

```css
.modern-resume-section-card {
  border-radius: 0.75rem;  /* Roundness of corners */
  padding: 2rem;           /* Internal spacing */
  box-shadow: ...;         /* Shadow depth */
  border: 1px solid ...;   /* Border color */
}
```

### Change Header Gradient

Edit gradient in `modern-resume.css`:

```css
.modern-resume-header {
  background: linear-gradient(135deg, 
    var(--color-primary-600) 0%, 
    var(--color-accent-600) 100%
  );
}
```

## Responsive Breakpoints

The design adapts to different screen sizes:

**Desktop (1024px+):**
- Two columns: Main (expandable) + Sidebar (380px)
- Sidebar is sticky (follows scroll)
- Full-sized cards and spacing

**Tablet (768px - 1024px):**
- Two columns: Main (expandable) + Sidebar (320px)
- Narrower sidebar
- Sidebar not sticky

**Mobile (<768px):**
- Single column (stacked)
- Centered header
- Full-width cards
- Export buttons at top (not floating)

## Admin Configuration

### Adding Profile Picture

1. Upload image to a hosting service (Firebase Storage, Imgur, Cloudinary, etc.)
2. Copy the public URL
3. In Admin → Header Information → Profile Picture URL
4. Paste the URL
5. Save

**Tips:**
- Use square images (1:1 ratio) for best results
- Recommended size: 400x400px or larger
- Formats: JPG, PNG, WebP
- Keep file size under 500KB

### Adding Social Links

In Admin → Header Information → Social Links:

1. **GitHub**: Full URL (e.g., `https://github.com/yourusername`)
2. **LinkedIn**: Full URL (e.g., `https://linkedin.com/in/yourprofile`)
3. **Twitter**: Full URL (e.g., `https://twitter.com/yourhandle`)
4. **Website**: Full URL (e.g., `https://yourwebsite.com`)

**Note:** Leave blank if you don't want to display a particular social link.

### Skills Section Formatting

For skills to display as tags, format them like this:

```markdown
* **Category Name:** Skill 1, Skill 2, Skill 3
* **Another Category:** Skill A, Skill B, Skill C
```

**The parser will:**
1. Detect the bold category name
2. Split skills by commas
3. Create a tag for each skill
4. Group by category

## Print & PDF Export

### Online View (Modern)
- Two-column layout with cards
- Colorful gradient header
- Skill tags and icons
- Social media links

### PDF Export (ATS-Optimized)
- Simple, single-column layout
- Plain text header (centered)
- No colors or complex formatting
- Standard fonts (Helvetica)
- Maximum ATS compatibility

**Best of both worlds:** Beautiful online, professional for applications!

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS/Android)

## Performance

- Fast loading with optimized assets
- Smooth scrolling and animations
- No layout shift (CLS)
- Lazy-loaded images

## Troubleshooting

### Profile picture not showing
- Verify URL is publicly accessible
- Check browser console for errors
- Try a different image host
- Ensure URL starts with `https://`

### Skills not showing as tags
- Check markdown formatting (needs bold category + comma-separated skills)
- Section title must include word "skill"
- Verify content is saved in admin panel

### Layout looks broken on mobile
- Clear browser cache
- Check if using latest deployment
- Try different mobile browser

### Colors look wrong
- Verify `colors.css` is being loaded
- Check browser console for CSS errors
- Clear cache and hard reload (Cmd+Shift+R)

## Future Enhancements

Potential additions for future versions:
- Dark mode toggle
- Multiple color themes
- Drag-and-drop profile picture upload
- Custom section icons
- Animation effects
- Progress bars for skills
- Timeline view for experience

---

**Need help customizing?** See [README.md](../README.md) for complete documentation.

