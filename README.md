# RoboPhantoms FTC Team 23954 Website

A modern, responsive website for the RoboPhantoms First Tech Challenge team, inspired by leading FTC team websites.

## Features

- **Modern Design**: Clean, professional design with gradient accents and smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth scrolling, animated sections, and interactive navigation
- **Comprehensive Sections**:
  - Home/Hero section with team introduction
  - Meet the Robot showcase
  - Mission Statement
  - Team members and coaches
  - Outreach activities
  - Sponsors information
  - Join Us application section
  - Contact form and information

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. Clone or download this repository
2. Open `index.html` in a web browser

### Local Development Server

For the best development experience, use a local web server:

**Using Python 3:**
```bash
python -m http.server 8000
```

**Using Node.js (with http-server):**
```bash
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
RoboPhantoms/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Customization

### Team Information

Update the following in `index.html`:
- Team member names and bios (in the Team section)
- Robot descriptions and specifications
- Mission statement content
- Contact information
- Social media links

### Colors and Branding

Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;    /* Main brand color */
    --secondary-color: #8b5cf6;  /* Secondary color */
    --accent-color: #ec4899;     /* Accent color */
}
```

### Adding Images

Replace placeholder SVG elements with actual images:
1. Add image files to an `images/` folder
2. Update `<svg>` elements with `<img>` tags pointing to your images

Example:
```html
<!-- Replace this -->
<div class="robot-image-placeholder">...</div>

<!-- With this -->
<img src="images/robot.jpg" alt="RoboPhantoms Robot" class="robot-image">
```

## Deployment

### GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Select the main branch and save
4. Your site will be available at `https://username.github.io/RoboPhantoms`

### Other Hosting Options

- **Netlify**: Drag and drop the folder or connect your Git repository
- **Vercel**: Connect your repository for automatic deployments
- **Traditional Web Hosting**: Upload files via FTP/SFTP

## Features Explained

### Navigation
- Fixed navigation bar that stays visible while scrolling
- Smooth scroll to sections
- Mobile-responsive hamburger menu

### Sections
- **Hero**: Eye-catching introduction with call-to-action buttons
- **Robot**: Showcase of the team's robot with specifications
- **Mission**: Core values and goals in card format
- **Team**: Grid layout of team members with stats
- **Outreach**: Community engagement activities
- **Sponsors**: Sponsor showcase with call-to-action
- **Join**: Information for prospective members
- **Contact**: Contact form and social media links

### Interactive Elements
- Scroll-triggered animations
- Hover effects on cards and buttons
- Active navigation highlighting
- Contact form with email integration

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Add actual team photos and robot images
- Integrate with a backend for contact form submissions
- Add a blog/news section
- Include competition results and achievements
- Add a gallery for photos and videos
- Create individual pages for each section

## Contact

For questions or issues with this website:
- Email: robophantoms@gmail.com
- Team Number: FTC 23954

## License

This website is created for RoboPhantoms FTC Team 23954. All rights reserved.

## Credits

Inspired by:
- [Team 11260 Up-A-Creek Robotics](https://www.team11260.org/)
- [Team 118 Robonauts](http://www.118robonauts.org/)

Built with modern web technologies: HTML5, CSS3, and JavaScript.




