#!/usr/bin/env python3
import os
import re

analytics_script = '''<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-V45PK6W060"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-V45PK6W060');
</script>'''

blog_dir = "/home/jquijanoq/.openclaw/workspace/bnwraptor-blog"
updated = []
skipped = []

for filename in os.listdir(blog_dir):
    if not filename.endswith('.html'):
        continue
    if filename == 'drafts':
        continue
    filepath = os.path.join(blog_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'G-V45PK6W060' in content:
        skipped.append(filename)
        continue
    
    if '</head>' in content:
        new_content = content.replace('</head>', analytics_script + '</head>')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated.append(filename)
    else:
        print(f"No </head> found in: {filename}")

print(f"\nUpdated: {len(updated)}")
for f in updated:
    print(f"  + {f}")
print(f"\nSkipped (already has GA): {len(skipped)}")
for f in skipped:
    print(f"  = {f}")