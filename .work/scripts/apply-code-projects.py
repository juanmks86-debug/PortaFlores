from pathlib import Path
root = Path(r"C:\Users\JUAN009\Desktop\PortaFlores")
index = root / "index.html"
css = root / "css" / "style.css"
text = index.read_text(encoding='utf-8')
start = text.find('                <!-- TAB 3: GITHUB LIVE REPOSITORIES & ACTIVITY -->')
end = text.find('                <!-- TAB 4: PORTFOLIO GALLERY -->', start)
new_section = '''                <!-- TAB 3: CODE AND PROJECTS -->
                <section class="tab-content" id="tab-github">
                    <div class="code-projects-page">
                        <header class="code-projects-header">
                            <div>
                                <h2>Código en GitHub <span class="arrow-accent">↗</span></h2>
                                <p>Proyectos reales, código abierto y soluciones desarrolladas para problemas concretos.</p>
                            </div>
                            <a class="github-profile-btn" href="https://github.com/juanmks86-debug" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Ver mi GitHub</a>
                        </header>
                        <div class="code-metrics">
                            <div class="code-metric code-metric-pink"><span class="metric-icon"><i class="fa-solid fa-trophy"></i></span><div><strong>14</strong><span>Repositorios públicos</span></div></div>
                            <div class="code-metric code-metric-mint"><span class="metric-icon"><i class="fa-solid fa-grip"></i></span><div><strong>3</strong><span>Apps desplegadas</span></div></div>
                            <div class="code-metric code-metric-yellow"><span class="metric-icon"><i class="fa-solid fa-star"></i></span><div><strong>1.er puesto</strong><span>Hackathon INNOA 2026</span></div></div>
                        </div>
                        <div class="code-projects-grid">
                            <article class="code-project-card code-project-featured">
                                <div class="code-project-top"><span class="project-card-icon"><i class="fa-solid fa-trophy"></i></span><span class="project-kicker">Logro destacado</span></div>
                                <h3>COMPETENCIA-INNOA</h3><p>Primer puesto en Hackathon INNOA 2026</p><div class="project-tech-tags"><span>JavaScript</span><span>IA</span><span>Desarrollo web</span></div>
                                <div class="mini-preview mini-innoa"><span>INNOA</span><strong>Innovación<br>que genera impacto</strong><i class="fa-solid fa-seedling"></i></div>
                                <div class="project-links"><a href="https://github.com/juanmks86-debug/COMPETENCIA-INNOA" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Repositorio</a><a href="#" class="disabled-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a></div>
                            </article>
                            <article class="code-project-card">
                                <div class="code-project-top"><span class="project-card-icon mint-icon"><i class="fa-solid fa-message"></i></span></div>
                                <h3>Hacki</h3><p>Chatbot de apoyo para la competencia INNOA</p><div class="project-tech-tags"><span>JavaScript</span><span>Chatbot</span><span>IA</span></div>
                                <div class="mini-preview mini-hacki"><span>Hacki <i class="fa-solid fa-circle"></i></span><strong>¡Hola! Soy Hacki,<br>¿en qué puedo ayudarte?</strong><div class="mini-input">Escribe tu pregunta...</div></div>
                                <div class="project-links"><a href="https://github.com/juanmks86-debug/Hacki" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Repositorio</a><a href="#" class="disabled-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a></div>
                            </article>
                            <article class="code-project-card">
                                <div class="code-project-top"><span class="project-card-icon blue-icon"><i class="fa-solid fa-chart-column"></i></span></div>
                                <h3>Contax</h3><p>Gestión de clientes, facturación y reportes</p><div class="project-tech-tags"><span>React</span><span>PWA</span><span>SQL</span></div>
                                <div class="mini-preview mini-contax"><span>Contax</span><strong>Resumen</strong><div class="mini-bars"><i></i><i></i><i></i><i></i><i></i></div></div>
                                <div class="project-links"><a href="https://github.com/juanmks86-debug/Contax" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Repositorio</a><a href="#" class="disabled-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a></div>
                            </article>
                            <article class="code-project-card">
                                <div class="code-project-top"><span class="project-card-icon mint-icon"><i class="fa-solid fa-cart-shopping"></i></span></div>
                                <h3>DeliMarket</h3><p>Tienda online de abarrotes con catálogo y carrito</p><div class="project-tech-tags"><span>React</span><span>PWA</span><span>SQL</span></div>
                                <div class="mini-preview mini-deli"><span>DeliMarket</span><strong>Todo lo que<br>necesitas, más cerca</strong><i class="fa-solid fa-basket-shopping"></i></div>
                                <div class="project-links"><a href="https://github.com/juanmks86-debug/DeliMarket" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Repositorio</a><a href="https://delimarket-app.vercel.app/" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a></div>
                            </article>
                            <article class="code-project-card">
                                <div class="code-project-top"><span class="project-card-icon yellow-icon"><i class="fa-solid fa-chart-pie"></i></span></div>
                                <h3>Cuentas Claras</h3><p>Control de gastos, ingresos y ahorro personal</p><div class="project-tech-tags"><span>React</span><span>PWA</span><span>SQL</span></div>
                                <div class="mini-preview mini-cuentas"><span>Cuentas Claras</span><strong>Resumen financiero</strong><div class="mini-donut">58%</div></div>
                                <div class="project-links"><a href="https://github.com/juanmks86-debug/Adeuas" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Repositorio</a><a href="#" class="disabled-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a></div>
                            </article>
                            <article class="code-project-card">
                                <div class="code-project-top"><span class="project-card-icon purple-icon"><i class="fa-solid fa-diamond"></i></span></div>
                                <h3>PortaFlores</h3><p>Portafolio interactivo con CV, contacto y UI responsive</p><div class="project-tech-tags"><span>JavaScript</span><span>API</span><span>Desarrollo web</span></div>
                                <div class="mini-preview mini-portfolio"><span>PortaFlores</span><strong>Flores que<br>cuentan historias</strong><i class="fa-solid fa-leaf"></i></div>
                                <div class="project-links"><a href="https://github.com/juanmks86-debug/PortaFlores" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Repositorio</a><a href="https://porta-flores.vercel.app/" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a></div>
                            </article>
                        </div>
                    </div>
                </section>

'''
if start == -1 or end == -1:
    raise SystemExit('No se encontró la sección GitHub')
text = text[:start] + new_section + text[end:]
index.write_text(text, encoding='utf-8')

css_text = css.read_text(encoding='utf-8')
css_text += '''\n\n/* Código en GitHub / project evidence page */\n.code-projects-page { width: 100%; }\n.code-projects-header { display:flex; justify-content:space-between; align-items:flex-start; gap:18px; margin-bottom:22px; }\n.code-projects-header h2 { font-family:var(--font-heading); font-size:clamp(31px,4vw,51px); line-height:1; letter-spacing:-.05em; }\n.code-projects-header p { color:var(--color-text-muted); font-size:13px; margin-top:9px; }\n.github-profile-btn { display:inline-flex; align-items:center; gap:9px; border:2px solid #ec008c; border-radius:12px; padding:12px 17px; color:#ec008c; text-decoration:none; font-size:12px; font-weight:800; white-space:nowrap; }\n.code-metrics { display:grid; grid-template-columns:repeat(3,1fr); gap:15px; margin-bottom:16px; }\n.code-metric { min-height:86px; border-radius:17px; padding:16px 20px; display:flex; align-items:center; gap:15px; }\n.code-metric-pink { background:#fde7f2; } .code-metric-mint { background:#def8ed; } .code-metric-yellow { background:#fff4d3; }\n.metric-icon { width:42px; height:42px; border-radius:50%; display:grid; place-items:center; background:#ec008c; color:#fff; font-size:17px; flex:0 0 42px; } .code-metric-mint .metric-icon { background:#53d6a6; } .code-metric-yellow .metric-icon { background:#f4ce40; color:#3b3210; }\n.code-metric strong { display:block; font-family:var(--font-heading); font-size:25px; line-height:1; } .code-metric-yellow strong { font-size:19px; } .code-metric span:not(.metric-icon) { display:block; margin-top:5px; font-size:11px; color:#555963; }\n.code-projects-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:15px; }\n.code-project-card { min-width:0; border:1px solid #ececf0; border-radius:18px; padding:16px; background:#fff; box-shadow:0 8px 20px rgba(20,20,30,.035); }\n.code-project-featured { background:linear-gradient(145deg,#fde7f2,#fff); border-color:#f7c5df; }\n.code-project-top { display:flex; align-items:center; gap:9px; min-height:35px; }\n.project-card-icon { width:35px; height:35px; display:grid; place-items:center; border-radius:50%; background:#ec008c; color:#fff; font-size:14px; } .mint-icon { background:#5adcad; } .blue-icon { background:#9fc4f6; color:#153b71; } .yellow-icon { background:#f4ce40; color:#41360e; } .purple-icon { background:#b7a8ef; color:#392e78; }\n.project-kicker { background:#f7cae2; color:#e30081; border-radius:999px; padding:5px 9px; text-transform:uppercase; font-size:8px; font-weight:800; }\n.code-project-card h3 { font-family:var(--font-heading); font-size:17px; margin:10px 0 4px; letter-spacing:-.02em; } .code-project-card p { height:30px; color:#656a76; font-size:11px; line-height:1.35; margin-bottom:8px; }\n.project-tech-tags { display:flex; flex-wrap:wrap; gap:5px; } .project-tech-tags span { padding:5px 8px; border-radius:999px; background:#f4f5f7; color:#555965; font-size:9px; font-weight:700; }\n.mini-preview { height:112px; margin-top:12px; border:1px solid rgba(20,20,30,.08); border-radius:10px; padding:12px; position:relative; overflow:hidden; } .mini-preview > span { font-size:9px; font-weight:800; } .mini-preview strong { position:absolute; left:13px; bottom:17px; font-family:var(--font-heading); font-size:14px; line-height:1.05; }\n.mini-innoa { background:linear-gradient(120deg,#14182d 0 20%,#fff 20%); color:#20212a; } .mini-innoa > span { color:#fff; } .mini-innoa i { position:absolute; right:30px; bottom:22px; color:#ec008c; font-size:31px; }\n.mini-hacki { background:#f9fbff; color:#20212a; } .mini-hacki > span i { color:#27bf78; font-size:6px; } .mini-hacki strong { bottom:39px; font-family:var(--font-main); font-size:11px; font-weight:700; } .mini-input { position:absolute; left:12px; right:12px; bottom:10px; border:1px solid #e4e7ef; color:#9ca1ad; border-radius:6px; padding:4px 7px; font-size:8px; }\n.mini-contax { background:linear-gradient(90deg,#14182d 0 24%,#fbfbfc 24%); } .mini-contax > span { color:#fff; } .mini-contax strong { left:36%; top:12px; bottom:auto; font-size:11px; } .mini-bars { position:absolute; left:36%; right:10px; bottom:16px; display:flex; align-items:end; gap:5px; height:35px; } .mini-bars i { flex:1; background:#ee70b5; border-radius:3px 3px 0 0; } .mini-bars i:nth-child(1){height:13px}.mini-bars i:nth-child(2){height:21px}.mini-bars i:nth-child(3){height:17px}.mini-bars i:nth-child(4){height:28px}.mini-bars i:nth-child(5){height:34px}\n.mini-deli { background:#fff1e4; color:#472e22; } .mini-deli i { position:absolute; right:24px; bottom:22px; color:#ef8b5d; font-size:33px; } .mini-cuentas { background:#e1faf2; color:#173e3b; } .mini-cuentas strong { top:32px; bottom:auto; font-size:10px; } .mini-donut { position:absolute; right:20px; top:26px; width:50px; height:50px; border:8px solid #22cfa5; border-right-color:#efc72c; border-radius:50%; display:grid; place-items:center; font-size:10px; font-weight:800; } .mini-portfolio { background:#fff3f7; color:#23222c; } .mini-portfolio i { position:absolute; right:26px; bottom:24px; color:#ec93ba; font-size:33px; }\n.project-links { display:flex; gap:10px; margin-top:11px; } .project-links a { color:#272932; text-decoration:none; font-size:10px; font-weight:800; display:inline-flex; align-items:center; gap:5px; } .project-links a + a { border-left:1px solid #dfe1e6; padding-left:10px; } .project-links .disabled-link { color:#a7abb4; pointer-events:none; }\n@media (max-width:900px) { .code-projects-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .code-projects-header { flex-direction:column; } .code-metrics { grid-template-columns:1fr; } }\n@media (max-width:560px) { .code-projects-grid { grid-template-columns:1fr; } }\n'''
css.write_text(css_text, encoding='utf-8')
print('Sección Código en GitHub reemplazada por el diseño del mockup.')
