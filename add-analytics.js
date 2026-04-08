const fs = require('fs');
const path = require('path');

const analyticsScript = `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-V45PK6W060"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-V45PK6W060');
</script>`;

const blogDir = __dirname;
const updated = [];
const skipped = [];

fs.readdirSync(blogDir).forEach(filename => {
  if (!filename.endsWith('.html')) return;
  if (filename === 'drafts' || filename === 'add-analytics.py') return;

  const filepath = path.join(blogDir, filename);
  let content = fs.readFileSync(filepath, 'utf8');

  if (content.includes('G-V45PK6W060')) {
    skipped.push(filename);
    return;
  }

  if (content.includes('</head>')) {
    content = content.replace('</head>', analyticsScript + '</head>');
    fs.writeFileSync(filepath, content);
    updated.push(filename);
  } else {
    console.log(`No </head> in: ${filename}`);
  }
});

console.log(`\nUpdated: ${updated.length}`);
updated.forEach(f => console.log(`  + ${f}`));
console.log(`\nSkipped: ${skipped.length}`);
skipped.forEach(f => console.log(`  = ${f}`));