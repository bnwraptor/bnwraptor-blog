const fs = require('fs');
const path = require('path');

const blogDir = __dirname;
const articles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'style.css');

// Step 1: Create folders and move files
articles.forEach(article => {
  const folderName = article.replace('.html', '');
  const folderPath = path.join(blogDir, folderName);
  const filePath = path.join(blogDir, article);
  
  // Create folder
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Created folder: ${folderName}`);
  }
  
  // Move file to index.html inside folder
  const destPath = path.join(folderPath, 'index.html');
  fs.copyFileSync(filePath, destPath);
  console.log(`Moved: ${article} -> ${folderName}/index.html`);
  
  // Remove original
  fs.unlinkSync(filePath);
  console.log(`Removed: ${article}`);
});

console.log('\nDone moving files. Now update index.html links...');

// Step 2: Update index.html links
let indexContent = fs.readFileSync(path.join(blogDir, 'index.html'), 'utf8');

// Replace hrefs like href="/article-name.html" with href="/article-name/"
articles.forEach(article => {
  const articleName = article.replace('.html', '');
  const regex = new RegExp(`href="/${articleName}\\.html"`, 'g');
  indexContent = indexContent.replace(regex, `href="/${articleName}/"`);
  console.log(`Replaced link: ${articleName}.html -> ${articleName}/`);
});

fs.writeFileSync(path.join(blogDir, 'index.html'), indexContent);
console.log('\nAll done!');