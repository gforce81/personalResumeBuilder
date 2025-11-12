#!/bin/bash

##
# Prepare for GitHub Publishing Script
# This script updates files with placeholder data for public GitHub repository
##

echo "🚀 Preparing repository for GitHub publishing..."
echo ""

# 1. Update firestore.rules with placeholder
echo "1️⃣  Updating firestore.rules with placeholder email..."
sed -i.bak "s/g23e981@gmail.com/your-email@example.com/g" firestore.rules
rm firestore.rules.bak 2>/dev/null
echo "   ✅ Done"

# 2. Update index.html meta tags
echo "2️⃣  Updating index.html with placeholder meta tags..."
sed -i.bak 's/Gauthier Robe - Product Management Executive/Your Name - Your Professional Title/g' index.html
sed -i.bak 's/Product management executive with 15+ years of experience\. Expert in cloud products, AI\/ML, and technical leadership\. Former Google, AWS, and Coveo\./Your professional summary highlighting your expertise and experience\./g' index.html
sed -i.bak 's/product management, technical leadership, cloud computing, AI, machine learning, enterprise software/your, relevant, keywords, here/g' index.html
sed -i.bak 's/Gauthier Robe/Your Name/g' index.html
rm index.html.bak 2>/dev/null
echo "   ✅ Done"

# 3. Remove personal resume file
echo "3️⃣  Removing personal resume file..."
if [ -f "Gauthier Robe - Resume.md" ]; then
  rm "Gauthier Robe - Resume.md"
  echo "   ✅ Removed 'Gauthier Robe - Resume.md'"
else
  echo "   ℹ️  File already removed"
fi

# 4. Verify .gitignore is correct
echo "4️⃣  Verifying .gitignore..."
if grep -q "src/config.local.js" .gitignore; then
  echo "   ✅ config.local.js is in .gitignore"
else
  echo "   ⚠️  Adding config.local.js to .gitignore..."
  echo "src/config.local.js" >> .gitignore
fi

if grep -q "^\.firebaserc$" .gitignore; then
  echo "   ✅ .firebaserc is in .gitignore"
else
  echo "   ⚠️  Adding .firebaserc to .gitignore..."
  echo ".firebaserc" >> .gitignore
fi

# 5. Verify config.local.js exists locally
echo "5️⃣  Verifying local configuration..."
if [ -f "src/config.local.js" ]; then
  echo "   ✅ config.local.js exists (your personal data is safe)"
else
  echo "   ❌ ERROR: config.local.js not found!"
  echo "   Create it from config.local.js.example before publishing"
  exit 1
fi

echo ""
echo "✅ Repository is ready for GitHub!"
echo ""
echo "📋 Summary of changes:"
echo "   • firestore.rules: Updated with placeholder email"
echo "   • index.html: Updated with generic meta tags"
echo "   • Personal resume file: Removed"
echo "   • config.local.js: Verified (git-ignored)"
echo ""
echo "🔒 Your personal data remains in:"
echo "   • src/config.local.js (never committed)"
echo ""
echo "📤 Next steps:"
echo "   1. Review changes: git diff"
echo "   2. Test build: npm run build"
echo "   3. Create GitHub repository"
echo "   4. Push: git add . && git commit -m 'Initial commit' && git push"
echo ""
echo "🎉 You can now safely publish to GitHub!"

