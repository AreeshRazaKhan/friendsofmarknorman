"""Extract paragraph text from the issue .docx files into one markdown file."""
import zipfile
import re
import sys
from pathlib import Path
from xml.etree import ElementTree as ET

NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

FILES = [
    'Animal welfare.docx',
    'Data centers.docx',
    'Education.docx',
    'Ideology.docx',
    'Public safety.docx',
    'Small businesses are the backbone of Oregon.docx',
    'Transportation and energy.docx',
    'Universal health care.docx',
    'Veteran support.docx',
]

def para_text(p):
    return ''.join(t.text or '' for t in p.iter('{%s}t' % NS['w']))

def para_style(p):
    ppr = p.find('w:pPr', NS)
    if ppr is None:
        return ''
    style = ppr.find('w:pStyle', NS)
    if style is not None:
        return style.get('{%s}val' % NS['w'], '')
    return ''

def is_list_item(p):
    ppr = p.find('w:pPr', NS)
    return ppr is not None and ppr.find('w:numPr', NS) is not None

def is_bold(p):
    runs = p.findall('w:r', NS)
    if not runs:
        return False
    bold_runs = 0
    for r in runs:
        rpr = r.find('w:rPr', NS)
        if rpr is not None and rpr.find('w:b', NS) is not None:
            bold_runs += 1
    return bold_runs == len(runs)

downloads = Path(r'C:\Users\Dev\Downloads')
out = []

for fname in FILES:
    path = downloads / fname
    out.append(f'\n\n{"=" * 70}\nFILE: {fname}\n{"=" * 70}\n')
    with zipfile.ZipFile(path) as z:
        xml = z.read('word/document.xml')
    root = ET.fromstring(xml)
    for p in root.iter('{%s}p' % NS['w']):
        text = para_text(p).strip()
        if not text:
            continue
        style = para_style(p)
        prefix = ''
        if re.match(r'Heading1|Title', style):
            prefix = '# '
        elif re.match(r'Heading2', style):
            prefix = '## '
        elif re.match(r'Heading[3-9]', style):
            prefix = '### '
        elif is_list_item(p):
            prefix = '- '
        elif is_bold(p):
            prefix = '**B** '
        out.append(prefix + text)

result = '\n'.join(out)
Path(sys.argv[1]).write_text(result, encoding='utf-8')
print(f'Wrote {len(result)} chars')
