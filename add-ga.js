const fs = require('fs');
const file = '/home/jquijanoq/.openclaw/workspace/bnwraptor-blog/canada-ai-accelerators-guide.html';
let content = fs.readFileSync(file, 'utf8');
const ga = `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-V45PK6W060"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-V45PK6W060');
</script>`;
content = content.replace('</head>', ga + '</head>');
fs.writeFileSync(file, content);
console.log('Done');