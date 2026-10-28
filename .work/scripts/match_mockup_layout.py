from pathlib import Path
root = Path(r"C:\Users\JUAN009\Desktop\PortaFlores")
index = root / "index.html"
css = root / "css" / "style.css"
text = index.read_text(encoding="utf-8")

text = text.replace('<div class="sidebar-logo">\n                    <span class="logo-symbol">❖</span>\n                </div>', '<div class="sidebar-logo">\n                    <span class="logo-symbol">❖</span>\n                    <span class="sidebar-name">Juan Israel<br>Flores</span>\n                </div>', 1)

start = text.find('                    <div class="bento-grid">')
end = text.find('                        <div class="availability-banner">', start)
new_home = '''                    <div class="recruiter-home-grid">
                        <div class="home-hero-copy">
                            <span class="home-eyebrow">HOLA, SOY</span>
                            <h1>Juan Israel Flores<span class="hero-dot">.</span></h1>
                            <h2>Desarrollador web junior <span>|</span> Soporte e Infraestructura <span>|</span> Ciencia de Datos e IA</h2>
                            <p>Construyo aplicaciones web, herramientas offline-first y soluciones orientadas a datos.</p>
                            <div class="home-actions">
                                <a class="cv-download-btn" href="assets/cv-juan-israel-flores.pdf" download="CV-Juan-Israel-Flores.pdf"><i class="fa-solid fa-download"></i> Descargar CV</a>
                                <button class="home-contact-btn" id="contactBtn"><i class="fa-regular fa-envelope"></i> Contactarme</button>
                            </div>
                            <div class="home-tech-chips">
                                <span><i class="fa-brands fa-python"></i> Python</span>
                                <span><i class="fa-solid fa-database"></i> SQL</span>
                                <span><i class="fa-brands fa-linux"></i> Linux</span>
                                <span><i class="fa-brands fa-react"></i> React</span>
                                <span><i class="fa-solid fa-layer-group"></i> PWA</span>
                                <span><i class="fa-solid fa-share-nodes"></i> Redes IP</span>
                            </div>
                        </div>

                        <div class="home-portrait-card">
                            <div class="portrait-note portrait-note-left">IDEAS<br>CÓDIGO<br>DATOS<br><b>IMPACTO</b></div>
                            <div class="portrait-note portrait-note-right">SEGUIMOS<br>CONSTRUYENDO<br><span>—</span></div>
                            <img src="assets/profile.jpg" alt="Juan Israel Flores" class="home-portrait">
                            <div class="portrait-caption">MISMAS GANAS<br>MÁS SOLUCIONES<br><span>—</span></div>
                        </div>

                        <div class="home-achievement-grid">
                            <article class="home-info-card home-info-pink">
                                <span class="home-info-icon"><i class="fa-solid fa-trophy"></i></span>
                                <div><strong>1.er puesto —<br>Hackathon INNOA 2026</strong><small>Solución destacada por su impacto y viabilidad.</small></div>
                            </article>
                            <article class="home-info-card home-info-mint">
                                <span class="home-info-icon"><i class="fa-solid fa-server"></i></span>
                                <div><strong>Soporte técnico,<br>redes e infraestructura</strong><small>Experiencia práctica y resolución de incidencias.</small></div>
                            </article>
                            <article class="home-info-card home-info-yellow">
                                <span class="home-info-icon"><i class="fa-solid fa-chart-column"></i></span>
                                <div><strong>70% aprobado —<br>Ciencia de Datos e IA</strong><small>Formación avanzada en análisis e inteligencia artificial.</small></div>
                            </article>
                        </div>

                        <div class="home-projects-heading">
                            <h2>Proyectos destacados</h2>
                            <span class="home-availability"><i class="fa-solid fa-circle"></i> Disponible jornada completa · Incorporación inmediata</span>
                            <button class="home-projects-link" data-tab="portfolio">Ver todos los proyectos <i class="fa-solid fa-arrow-right"></i></button>
                        </div>

                        <div class="home-projects-grid">
                            <a class="home-project-card project-contax" href="https://github.com/juanmks86-debug/Contax" target="_blank" rel="noopener">
                                <div class="project-preview"><span class="project-brand">▣ Contax</span><span class="project-chart"><i></i><i></i><i></i><i></i><i></i></span><strong>Gestión simple<br>para tu contabilidad</strong></div>
                                <h3>Contax</h3><p>Sistema web de gestión contable con facturación, reportes y control de clientes.</p><span class="project-tags">React · Python · SQL · PWA</span>
                            </a>
                            <a class="home-project-card project-delimarket" href="https://delimarket-app.vercel.app/" target="_blank" rel="noopener">
                                <div class="project-preview"><span class="project-brand">🛒 DeliMarket</span><span class="project-food">🍎 🥖 🥬</span><strong>Productos<br>más cerca de ti</strong></div>
                                <h3>DeliMarket</h3><p>Tienda online con catálogo, carrito de compras y administración de productos.</p><span class="project-tags">React · PWA · SQL · Linux</span>
                            </a>
                            <a class="home-project-card project-cuentas" href="https://github.com/juanmks86-debug/Adeuas" target="_blank" rel="noopener">
                                <div class="project-preview"><span class="project-brand">◔ Cuentas Claras</span><span class="project-donut">58%</span><strong>Tu dinero, en claro.</strong></div>
                                <h3>Cuentas Claras</h3><p>Aplicación para el control de gastos personales con estadísticas y gráficos interactivos.</p><span class="project-tags">JavaScript · Python · PWA · SQL</span>
                            </a>
                        </div>
                    </div>
'''
if start == -1 or end == -1:
    raise SystemExit('No se encontró el bloque principal para reemplazar')
text = text[:start] + new_home + text[end:]
index.write_text(text, encoding='utf-8')

css_text = css.read_text(encoding='utf-8')
css_text += '''\n\n/* Exact recruiter-home composition matching the approved mockup */\n.sidebar-logo { align-items: flex-start; gap: 12px; }\n.sidebar-name { font-family: var(--font-heading); font-size: 16px; font-weight: 800; line-height: 1.15; color: var(--color-black); }\n.logo-symbol { color: #ec008c; font-size: 31px; line-height: .85; }\n.sidebar-footer { display: none; }\n.recruiter-home-grid { display: grid; grid-template-columns: minmax(0, 1.42fr) minmax(280px, .88fr); gap: 18px; }\n.home-hero-copy { background: #fff; padding: 26px 26px 20px; border-radius: 22px; min-height: 280px; }\n.home-eyebrow { font-size: 12px; font-weight: 800; letter-spacing: .2em; color: #6b7280; }\n.home-hero-copy h1 { font-family: var(--font-heading); font-size: clamp(38px, 5vw, 64px); line-height: .98; letter-spacing: -.05em; margin: 12px 0 12px; color: #101018; }\n.hero-dot { color: #ec008c; }\n.home-hero-copy h2 { font-size: clamp(13px, 1.35vw, 17px); line-height: 1.35; font-weight: 700; color: #20212a; }\n.home-hero-copy h2 span { color: #ec008c; font-weight: 400; }\n.home-hero-copy > p { max-width: 620px; margin-top: 12px; color: #676976; font-size: 14px; line-height: 1.5; }\n.home-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 18px; }\n.home-actions .cv-download-btn, .home-contact-btn { border: 0; border-radius: 11px; padding: 12px 18px; font: 700 13px var(--font-main); cursor: pointer; display: inline-flex; align-items: center; gap: 9px; text-decoration: none; }\n.home-actions .cv-download-btn { background: #ec008c; color: #fff; }\n.home-contact-btn { color: #181820; background: #fff; border: 1px solid #e5e7eb; }\n.home-tech-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 22px; }\n.home-tech-chips span { display: inline-flex; align-items: center; gap: 7px; padding: 8px 11px; border-radius: 999px; background: #f6f7f9; color: #3f424d; font-size: 11px; font-weight: 700; }\n.home-tech-chips i { color: #ec008c; }\n.home-portrait-card { min-height: 280px; border-radius: 22px; overflow: hidden; position: relative; background: #f1eef1; }\n.home-portrait { width: 100%; height: 100%; object-fit: cover; object-position: center 34%; filter: grayscale(.65) contrast(1.08); }\n.home-portrait-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,.22), transparent 35%, rgba(25,15,30,.15)); pointer-events: none; }\n.portrait-note, .portrait-caption { position: absolute; z-index: 2; color: #25232c; font: 700 9px/1.45 var(--font-mono); letter-spacing: .16em; }\n.portrait-note-left { left: 18px; top: 18px; }\n.portrait-note-left b { color: #ec008c; }\n.portrait-note-right { right: 18px; top: 18px; text-align: right; }\n.portrait-note-right span, .portrait-caption span { color: #ec008c; }\n.portrait-caption { right: 18px; bottom: 18px; text-align: right; }\n.home-achievement-grid { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }\n.home-info-card { min-height: 112px; border-radius: 18px; padding: 20px; display: flex; align-items: center; gap: 14px; }\n.home-info-pink { background: #fde7f2; } .home-info-mint { background: #dff8ed; } .home-info-yellow { background: #fff4d3; }\n.home-info-icon { flex: 0 0 44px; width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; background: #ec008c; color: white; font-size: 18px; }\n.home-info-mint .home-info-icon { background: #3bcf9a; } .home-info-yellow .home-info-icon { background: #f4c62e; color: #3b3210; }\n.home-info-card strong { display: block; font-family: var(--font-heading); font-size: 15px; line-height: 1.14; }\n.home-info-card small { display: block; color: #666a75; font-size: 10px; line-height: 1.35; margin-top: 7px; }\n.home-projects-heading { grid-column: 1 / -1; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-top: 4px; }\n.home-projects-heading h2 { font-family: var(--font-heading); font-size: 27px; letter-spacing: -.04em; }\n.home-availability { margin-left: auto; padding: 9px 13px; border-radius: 999px; background: #d8f7e9; color: #166534; font-size: 11px; font-weight: 700; }\n.home-availability i { font-size: 8px; color: #16a34a; margin-right: 5px; }\n.home-projects-link { border: 0; background: none; color: #ec008c; font: 700 11px var(--font-main); cursor: pointer; }\n.home-projects-grid { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }\n.home-project-card { display: block; color: inherit; text-decoration: none; min-width: 0; }\n.project-preview { height: 145px; padding: 15px; border-radius: 17px; position: relative; overflow: hidden; color: #fff; }\n.project-preview strong { position: absolute; left: 16px; bottom: 17px; font-family: var(--font-heading); font-size: 18px; line-height: 1.05; }\n.project-brand { font-size: 11px; font-weight: 800; }\n.project-contax .project-preview { background: linear-gradient(145deg, #15192d, #32365d); }\n.project-delimarket .project-preview { background: linear-gradient(145deg, #fff1e5, #f8c48c); color: #4e301f; }\n.project-cuentas .project-preview { background: linear-gradient(145deg, #063f3c, #0a7068); }\n.project-chart { position: absolute; right: 18px; bottom: 19px; display: flex; align-items: end; gap: 4px; height: 52px; }\n.project-chart i { display: block; width: 8px; background: #ef2a9b; border-radius: 3px 3px 0 0; } .project-chart i:nth-child(1) { height: 20px; } .project-chart i:nth-child(2) { height: 31px; } .project-chart i:nth-child(3) { height: 26px; } .project-chart i:nth-child(4) { height: 44px; } .project-chart i:nth-child(5) { height: 51px; }\n.project-food { position: absolute; right: 14px; top: 46px; font-size: 25px; letter-spacing: -7px; }\n.project-donut { position: absolute; right: 22px; top: 35px; width: 54px; height: 54px; border: 9px solid #24d1aa; border-right-color: #f4ca3e; border-radius: 50%; display: grid; place-items: center; font-size: 11px; font-weight: 800; }\n.home-project-card h3 { margin: 10px 4px 4px; font-family: var(--font-heading); font-size: 17px; }\n.home-project-card p { margin: 0 4px; color: #666a75; font-size: 11px; line-height: 1.4; min-height: 31px; }\n.project-tags { display: inline-block; margin: 8px 4px 0; padding: 5px 8px; background: #f4f5f7; border-radius: 999px; color: #555965; font-size: 9px; font-weight: 700; }\n@media (max-width: 1050px) { .recruiter-home-grid { grid-template-columns: 1fr; } .home-portrait-card { min-height: 300px; } }\n@media (max-width: 720px) { .home-achievement-grid, .home-projects-grid { grid-template-columns: 1fr; } .home-availability { margin-left: 0; } .home-projects-heading { gap: 9px; } .home-project-card p { min-height: auto; } }\n'''
css.write_text(css_text, encoding='utf-8')
print('Portada reestructurada para coincidir con el mockup.')
