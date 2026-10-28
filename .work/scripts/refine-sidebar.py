from pathlib import Path
root = Path(r"C:\Users\JUAN009\Desktop\PortaFlores")
index = root / "index.html"
css = root / "css" / "style.css"
js = root / "js" / "app.js"

html = index.read_text(encoding='utf-8')
html = html.replace('<span class="logo-symbol">❖</span>', '<span class="logo-symbol" aria-hidden="true">◆</span>', 1)
html = html.replace('<span class="nav-text" data-i18n="nav.github">GitHub Live</span>', '<span class="nav-text">Código y proyectos</span>', 1)
formation = '''                    <button class="nav-btn" data-tab="clients">
                        <i class="fa-solid fa-graduation-cap"></i>
                        <span class="nav-text" data-i18n="nav.clients">Formación</span>
                    </button>'''
contact = formation + '''
                    <button class="nav-btn nav-contact-btn" id="sidebarContactBtn" type="button">
                        <i class="fa-regular fa-envelope"></i>
                        <span class="nav-text">Contacto</span>
                    </button>'''
html = html.replace(formation, contact, 1)
index.write_text(html, encoding='utf-8')

css_text = css.read_text(encoding='utf-8')
css_text += '''\n\n/* Sidebar refinement to match the approved mockup */\n.bento-frame { grid-template-columns: 210px 1fr; gap: 30px; }\n.sidebar-nav { padding: 8px 0 8px 0; }\n.sidebar-logo { gap: 12px; min-height: 56px; }\n.logo-symbol { color: #ec008c; font-size: 30px; line-height: 1; transform: rotate(45deg); margin: 5px 3px 0 4px; }\n.logo-symbol:hover { transform: rotate(135deg); }\n.sidebar-name { font-size: 17px; line-height: 1.08; letter-spacing: -.03em; }\n.nav-links { gap: 5px; margin-top: 42px; }\n.nav-btn { position: relative; min-height: 43px; padding: 10px 12px 10px 17px; border-radius: 0 999px 999px 0; color: #686a74; font-size: 13px; font-weight: 600; }\n.nav-btn:hover { color: #1a1b22; background: #f7f7f9; transform: none; }\n.nav-btn.active { color: #ec008c; background: #fff5fa; box-shadow: none; font-weight: 800; }\n.nav-btn.active::before { content: ''; position: absolute; left: 0; top: 7px; bottom: 7px; width: 3px; border-radius: 0 4px 4px 0; background: #ec008c; }\n.nav-btn.active i { color: #ec008c; }\n.nav-contact-btn { margin-top: 16px; padding-top: 16px; border-top: 1px solid #ececf0; border-radius: 0; }\n.nav-contact-btn:hover { border-radius: 0 999px 999px 0; }\n@media (max-width: 1120px) { .bento-frame { grid-template-columns: 190px 1fr; gap: 22px; } }\n'''
css.write_text(css_text, encoding='utf-8')

js_text = js.read_text(encoding='utf-8')
needle = "    setupModal('contactBtn', 'contactModal', 'closeContactModal');"
addition = needle + "\n    const sidebarContactBtn = document.getElementById('sidebarContactBtn');\n    if (sidebarContactBtn) sidebarContactBtn.addEventListener('click', () => document.getElementById('contactBtn')?.click());"
if needle in js_text and 'sidebarContactBtn' not in js_text:
    js_text = js_text.replace(needle, addition, 1)
js.write_text(js_text, encoding='utf-8')
print('Sidebar actualizado con navegación, estado activo y contacto.')
