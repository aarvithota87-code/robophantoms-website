#!/bin/bash
# Script to add all website files to git

# Navigate to project directory
cd "/Users/kamalakarthota/Downloads/RoboPhantoms copy"

# Add HTML pages (9 files)
git add index.html team.html robot.html competitions.html outreach.html gallery.html sponsors.html join.html contact.html

# Add stylesheet
git add styles.css

# Add JavaScript files
git add script.js js/nav-footer.js

# Add logo files
git add RoboPhantomLogo.png FtcFirstLogo.jpeg

# Add image directories
git add TeamPictures/
git add Coaches/
git add Robot/
git add Sponsors/

# Add .gitignore (optional but recommended)
git add .gitignore

# Show status
echo "✅ Files added to git staging area"
echo ""
echo "Files staged:"
git status --short

echo ""
echo "To commit these files, run:"
echo "  git commit -m 'Add website files'"
echo ""
echo "Or if files are already committed, run:"
echo "  git status"

