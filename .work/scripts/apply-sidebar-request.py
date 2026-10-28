from pathlib import Path
root = Path(r"C:\Users\JUAN009\Desktop\PortaFlores")
index = root / "index.html"
css = root / "css" / "style.css"
html = index.read_text(encoding='utf-8')
html = html.replace('<span class="nav-text">Código y proyectos</span>', '<span class="nav-text">Código en GitHub</span>', 1)
formation = '''                    <button class="nav-btn" data-tab="clients">
                        <i class="fa-solid fa-graduation-cap"></i>
                        <span class="nav-text" data-i18n="nav.clients">Formación</span>
                    </button>'''
logros = formation + '''
                    <button class="nav-btn" data-tab="achievements">
                        <i class="fa-solid fa-trophy"></i>
                        <span class="nav-text">Logros</span>
                    </button>'''
html = html.replace(formation, logros, 1)
marker = '                <!-- TAB 6: '
section = '''                <!-- TAB 6: LOGROS Y PARTICIPACIÓN -->
                <section class="tab-content" id="tab-achievements">
                    <div class="subpage-wrapper">
                        <header class="subpage-header">
                            <h2>Logros y participación <span class="arrow-accent">↗</span></h2>
                            <p>Resultados, experiencias y espacios de actualización que acompañan mi crecimiento profesional.</p>
                        </header>
                        <div class="achievement-page-grid">
                            <article class="achievement-page-card achievement-page-main">
                                <div class="achievement-page-icon"><i class="fa-solid fa-trophy"></i></div>
                                <span class="achievement-page-kicker">Reconocimiento destacado</span>
                                <h3>1.er puesto — Hackathon INNOA 2026</h3>
                                <p>Primer puesto en el concurso de desarrollo web. Resolución de la Facultad de Ingeniería N.º 559/2026.</p>
                            </article>
                            <article class="achievement-page-card">
                                <div class="achievement-page-icon"><i class="fa-solid fa-lightbulb"></i></div>
                                <span class="achievement-page-kicker">Innovación y tecnología</span>
                                <h3>Actualización continua</h3>
                                <p>Participación en Experiencia Endeavor Jujuy, encuentros de IA Generativa y jornadas de Ciencias de Datos e Inteligencia Artificial.</p>
                            </article>
                            <article class="achievement-page-card">
                                <div class="achievement-page-icon"><i class="fa-solid fa-robot"></i></div>
                                <span class="achievement-page-kicker">Formación aplicada</span>
                                <h3>IA y datos para resolver problemas</h3>
                                <p>Interés en aplicar Python, análisis de datos, automatización y herramientas de IA a necesidades concretas.</p>
                            </article>
                        </div>
                    </div>
                </section>

'''
if marker in html and 'id="tab-achievements"' not in html:
    html = html.replace(marker, section + marker, 1)
index.write_text(html, encoding='utf-8')
css_text = css.read_text(encoding='utf-8')
css_text += '''\n\n/* Expanded sidebar controls and achievements */\n.sidebar-footer { display: flex; flex-direction: row; gap: 8px; width: 100%; margin-top: 24px; padding-top: 16px; border-top: 1px solid #ececf0; }\n.sidebar-footer .icon-btn { display: flex; flex: 1; width: 34px; height: 34px; background: #f7f7f9; color: #252733; border: 0; border-radius: 50%; align-items: center; justify-content: center; cursor: pointer; }\n.sidebar-footer .icon-btn:hover { background: #ec008c; color: #fff; transform: translateY(-2px); }\n.sidebar-footer #editProfileBtn { display: none; }\n.achievement-page-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 24px; }\n.achievement-page-card { padding: 24px; min-height: 260px; border-radius: 22px; background: #f7f8fa; border: 1px solid rgba(20,20,30,.06); }\n.achievement-page-main { background: linear-gradient(145deg, #fde7f2, #fff); }\n.achievement-page-icon { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 15px; background: #ec008c; color: #fff; font-size: 20px; margin-bottom: 22px; }\n.achievement-page-kicker { color: #ec008c; text-transform: uppercase; letter-spacing: .08em; font-size: 10px; font-weight: 800; }\n.achievement-page-card h3 { font-family: var(--font-heading); font-size: 19px; line-height: 1.2; margin: 9px 0 14px; }\n.achievement-page-card p { color: #686a74; font-size: 12px; line-height: 1.6; }\n@media (max-width: 820px) { .achievement-page-grid { grid-template-columns: 1fr; } }\n'''
css.write_text(css_text, encoding='utf-8')
print('Sidebar ampliado aplicado: Logros agregado y controles conservados.')
