from pathlib import Path
root = Path(r"C:\Users\JUAN009\Desktop\PortaFlores")
index = root / "index.html"
css = root / "css" / "style.css"
text = index.read_text(encoding='utf-8')
start = text.find('                <!-- TAB 5: FORMACIÓN ACADÉMICA -->')
end = text.find('                <!-- TAB 6: LOGROS Y PARTICIPACIÓN -->', start)
new_section = '''                <!-- TAB 5: FORMACIÓN ACADÉMICA -->
                <section class="tab-content" id="tab-clients">
                    <div class="education-page">
                        <header class="education-header">
                            <h2>Formación académica <span class="arrow-accent">↗</span></h2>
                            <p>Mi recorrido combina programación, infraestructura, ciencia de datos e inteligencia artificial.</p>
                        </header>
                        <div class="education-main-grid">
                            <article class="education-card education-card-pink">
                                <div class="education-card-icon"><i class="fa-solid fa-chart-column"></i></div>
                                <span class="education-progress">70% aprobado</span>
                                <h3>Ciencias de Datos e IA</h3>
                                <p class="education-institution">IES N.º 6 · 2024–actualidad</p>
                                <div class="education-tags"><span>Python</span><span>Machine Learning</span><span>Estadística</span></div>
                                <div class="education-divider"></div>
                                <p class="education-description">Formación orientada al análisis de datos, aprendizaje automático e inteligencia artificial aplicada a problemas reales.</p>
                            </article>
                            <article class="education-card education-card-mint">
                                <div class="education-card-icon"><i class="fa-solid fa-graduation-cap"></i></div>
                                <h3>Analista Programador Universitario</h3>
                                <p class="education-institution">Facultad de Ingeniería — UNJu<br>2023–actualidad</p>
                                <div class="education-tags"><span>Programación</span><span>SQL</span><span>Redes</span></div>
                                <div class="education-divider"></div>
                                <p class="education-description">Carrera universitaria con enfoque en desarrollo de software, bases de datos y redes de computadoras.</p>
                            </article>
                            <article class="education-card education-card-yellow">
                                <div class="education-card-icon"><i class="fa-solid fa-server"></i></div>
                                <h3>Soporte e Infraestructura</h3>
                                <p class="education-institution">Tecnicatura finalizada · 2018</p>
                                <div class="education-tags"><span>Hardware</span><span>Linux</span><span>Sistemas</span></div>
                                <div class="education-divider"></div>
                                <p class="education-description">Formación técnica en instalación, configuración y administración de sistemas e infraestructura tecnológica.</p>
                            </article>
                        </div>
                        <section class="education-complementary">
                            <h3>Formación complementaria</h3>
                            <div class="education-pills"><span><i class="fa-solid fa-tag"></i> Agentes de IA para Negocios</span><span><i class="fa-solid fa-tag"></i> Argentina Programa</span><span><i class="fa-solid fa-tag"></i> Ciberseguridad</span><span><i class="fa-solid fa-tag"></i> Visualización de Datos</span><span><i class="fa-solid fa-tag"></i> Oratoria</span><span><i class="fa-solid fa-tag"></i> Trello</span></div>
                        </section>
                        <div class="education-achievement-strip"><span class="education-strip-icon"><i class="fa-solid fa-trophy"></i></span><div><strong>1.er puesto — Hackathon INNOA 2026</strong><span>Resolución de la Facultad de Ingeniería N.º 559/2026</span></div></div>
                        <article class="education-other-card"><span class="education-other-icon"><i class="fa-regular fa-file-lines"></i></span><div><h3>Otros estudios</h3><ul><li>Licenciatura en Administración de Empresas · 45% de avance</li><li>Auxiliar Perito Contable e Impositivo · Finalizada</li></ul></div></article>
                    </div>
                </section>

'''
if start == -1 or end == -1:
    raise SystemExit('No se encontró el bloque de Formación')
text = text[:start] + new_section + text[end:]
index.write_text(text, encoding='utf-8')
css_text = css.read_text(encoding='utf-8')
css_text += '''\n\n/* Formación académica matching the approved mockup */\n.education-page { width:100%; }\n.education-header { margin-bottom:22px; } .education-header h2 { font-family:var(--font-heading); font-size:clamp(32px,4vw,52px); line-height:1; letter-spacing:-.05em; } .education-header p { color:var(--color-text-muted); font-size:13px; margin-top:9px; }\n.education-main-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:15px; }\n.education-card { min-height:340px; padding:24px; border-radius:18px; position:relative; overflow:hidden; } .education-card-pink { background:#fde7f2; } .education-card-mint { background:#def8ed; } .education-card-yellow { background:#fff4d3; }\n.education-card-icon { width:48px; height:48px; border-radius:50%; display:grid; place-items:center; background:#ec008c; color:#fff; font-size:20px; margin-bottom:20px; } .education-card-mint .education-card-icon { background:#53d6a6; color:#144f3e; } .education-card-yellow .education-card-icon { background:#f4ce40; color:#453b0f; }\n.education-progress { display:inline-block; background:#f7c9df; color:#e30081; border-radius:999px; padding:6px 10px; font-size:10px; font-weight:800; margin-bottom:9px; }\n.education-card h3 { font-family:var(--font-heading); font-size:20px; line-height:1.14; letter-spacing:-.025em; margin-bottom:8px; } .education-institution { color:#5d626f; font-size:12px; line-height:1.45; }\n.education-tags { display:flex; flex-wrap:wrap; gap:7px; margin-top:18px; } .education-tags span { background:rgba(255,255,255,.58); border-radius:999px; padding:7px 10px; font-size:10px; font-weight:700; color:#424650; }\n.education-divider { height:1px; background:rgba(40,40,50,.12); margin:22px 0 16px; } .education-description { color:#5d626f; font-size:12px; line-height:1.55; }\n.education-complementary { margin-top:26px; } .education-complementary h3 { font-family:var(--font-heading); font-size:27px; letter-spacing:-.04em; margin-bottom:14px; } .education-pills { display:flex; flex-wrap:wrap; gap:10px; } .education-pills span { padding:10px 14px; border:1px solid #e1e3e8; border-radius:999px; background:#fff; color:#4e535e; font-size:11px; display:inline-flex; align-items:center; gap:7px; } .education-pills i { font-size:10px; }\n.education-achievement-strip { display:flex; align-items:center; gap:16px; margin-top:20px; padding:18px 22px; background:#fde7f2; border-radius:17px; } .education-strip-icon { width:48px; height:48px; border-radius:50%; display:grid; place-items:center; flex:0 0 48px; background:#ec008c; color:#fff; font-size:20px; } .education-achievement-strip strong { display:block; font-family:var(--font-heading); font-size:20px; } .education-achievement-strip div span { display:block; margin-top:5px; color:#656a76; font-size:12px; }\n.education-other-card { display:flex; align-items:center; gap:16px; padding:20px 22px; margin-top:18px; border:1px solid #e6e7eb; border-radius:17px; background:#fff; } .education-other-icon { width:48px; height:48px; border-radius:50%; background:#dcd7ff; color:#37308c; display:grid; place-items:center; flex:0 0 48px; font-size:19px; } .education-other-card h3 { font-family:var(--font-heading); font-size:19px; margin-bottom:7px; } .education-other-card ul { margin:0; padding-left:17px; color:#656a76; font-size:12px; line-height:1.6; }\n@media (max-width:900px) { .education-main-grid { grid-template-columns:1fr; } .education-card { min-height:auto; } }\n'''
css.write_text(css_text, encoding='utf-8')
print('Formación Académica reemplazada por el diseño del mockup.')
