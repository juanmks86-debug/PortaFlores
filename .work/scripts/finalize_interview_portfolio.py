from pathlib import Path
root = Path(r"C:\Users\JUAN009\Desktop\PortaFlores")
index = root / "index.html"
css = root / "css" / "style.css"
text = index.read_text(encoding="utf-8")

# Keep secondary content available in source, but remove low-priority items from the interview-first main navigation.
for block in [
'''                    <button class="nav-btn" data-tab="blog">
                        <i class="fa-solid fa-pen-nib"></i>
                        <span class="nav-text" data-i18n="nav.blog">Blog</span>
                    </button>
''',
'''                    <button class="nav-btn" data-tab="podcast">
                        <i class="fa-solid fa-podcast"></i>
                        <span class="nav-text" data-i18n="nav.podcast">Podcast</span>
                    </button>
''']:
    text = text.replace(block, '', 1)

# Add a clear availability badge before the testimonial area.
marker = '                        <!-- Testimonios -->'
availability = '''                        <div class="availability-banner">
                            <span class="availability-dot"></span>
                            <strong>Disponible jornada completa</strong>
                            <span>·</span>
                            <span>Incorporación inmediata</span>
                            <span class="availability-location"><i class="fa-solid fa-location-dot"></i> Perico, Jujuy</span>
                        </div>

'''
if marker in text and 'class="availability-banner"' not in text:
    text = text.replace(marker, availability + marker, 1)

# Hide unverifiable testimonials from the primary portfolio experience.
start = text.find('                        <!-- Testimonios -->')
end = text.find('                </section>', start)
if start != -1 and end != -1:
    text = text[:start] + '                        <!-- Testimonios omitidos: priorizamos evidencia verificable del CV. -->\n' + text[end:]

index.write_text(text, encoding='utf-8')

css_text = css.read_text(encoding='utf-8')
css_text += '''\n\n.availability-banner {\n    display: flex; align-items: center; gap: 9px; flex-wrap: wrap;\n    width: fit-content; margin: 22px 0 0 auto; padding: 10px 16px;\n    border-radius: 999px; background: #d8f7e9; color: #166534;\n    font-size: 12px; box-shadow: 0 8px 20px rgba(22,101,52,.08);\n}\n.availability-dot { width: 9px; height: 9px; border-radius: 50%; background: #16a34a; box-shadow: 0 0 0 4px rgba(22,163,74,.13); }\n.availability-location { margin-left: 5px; color: #4b6b58; }\n@media (max-width: 640px) { .availability-banner { margin-left: 0; font-size: 11px; } }\n'''
css.write_text(css_text, encoding='utf-8')
print('Ajuste final aplicado.')
