from pathlib import Path

root = Path(r"C:\Users\JUAN009\Desktop\PortaFlores")
index = root / "index.html"
css = root / "css" / "style.css"

text = index.read_text(encoding="utf-8")

# Add a focused experience item to desktop navigation.
old_nav = '''                    <button class="nav-btn" data-tab="skills">
                        <i class="fa-solid fa-code"></i>
                        <span class="nav-text" data-i18n="nav.skills">Habilidades</span>
                    </button>'''
new_nav = '''                    <button class="nav-btn" data-tab="experience">
                        <i class="fa-solid fa-briefcase"></i>
                        <span class="nav-text">Experiencia</span>
                    </button>
                    <button class="nav-btn" data-tab="skills">
                        <i class="fa-solid fa-code"></i>
                        <span class="nav-text" data-i18n="nav.skills">Habilidades</span>
                    </button>'''
text = text.replace(old_nav, new_nav, 1)

# Update the hero positioning language and remove the distracting Spotify widget from the first impression.
text = text.replace('<span class="tab-icon">❖</span> About Me', '<span class="tab-icon">❖</span> Perfil profesional', 1)
text = text.replace('<span class="greeting" data-i18n="hero.greeting">Soy,</span>', '<span class="greeting" data-i18n="hero.greeting">Hola, soy</span>', 1)
text = text.replace('<p class="typing-effect" id="typingEffect"><span class="typing-cursor">|</span></p>', '<p class="hero-positioning">Desarrollador web junior<br><strong>Soporte e Infraestructura · Ciencia de Datos e IA</strong></p>', 1)
spotify_start = text.find('                            <!-- Spotify Live Player Status Bar -->')
spotify_end = text.find('                            <!-- Action CV Download Button -->', spotify_start)
if spotify_start != -1 and spotify_end != -1:
    text = text[:spotify_start] + text[spotify_end:]
text = text.replace('• MY DESIGN PORTFOLIO • 2026', '• DISPONIBILIDAD INMEDIATA • 2026', 1)

# Replace the YouTube test card with the real achievement.
old_feature_start = text.find('                                <!-- Featured Project Card -->')
old_feature_end = text.find('                                <!-- Stats Stack -->', old_feature_start)
new_feature = '''                                <!-- Featured achievement card -->
                                <div class="bento-card career-highlight-card" id="openExperienceModal">
                                    <div class="career-highlight-icon"><i class="fa-solid fa-trophy"></i></div>
                                    <span class="tag-badge">Logro destacado</span>
                                    <h3>1.er puesto — Hackathon INNOA 2026</h3>
                                    <p>Concurso de desarrollo web de la Facultad de Ingeniería. Resolución N.º 559/2026.</p>
                                    <span class="highlight-link">Ver experiencia <i class="fa-solid fa-arrow-right"></i></span>
                                </div>

'''
if old_feature_start != -1 and old_feature_end != -1:
    text = text[:old_feature_start] + new_feature + text[old_feature_end:]

# Replace the live GitHub stat stack with recruiter-relevant proof points while retaining the GitHub counters.
old_stats = '''                                <!-- Stats Stack -->
                                <div class="stats-stack">
                                    <!-- Mint Projects Card (GitHub repos en vivo) -->
                                    <div class="bento-card card-stat card-stat-mint" id="openProjectsModal">
                                        <span class="card-arrow-top">↗</span>
                                        <div class="stat-content">
                                            <span class="stat-number" id="heroReposCount" data-target="0">0</span>
                                            <span class="stat-label" data-i18n="hero.repos">Repos en GitHub</span>
                                        </div>
                                    </div>

                                    <!-- Purple Followers Card (GitHub followers en vivo) -->
                                    <div class="bento-card card-stat card-stat-purple" id="openAwardsModal">
                                        <span class="card-arrow-top">↗</span>
                                        <div class="stat-content">
                                            <span class="stat-number" id="heroFollowersCount" data-target="0">0</span>
                                            <span class="stat-label" data-i18n="hero.followers">Seguidores en GitHub</span>
                                        </div>
                                    </div>
                                </div>'''
new_stats = '''                                <!-- Recruiter proof points -->
                                <div class="stats-stack recruiter-proof-stack">
                                    <div class="bento-card proof-card proof-card-mint">
                                        <span class="proof-number">70%</span>
                                        <span class="proof-label">Ciencia de Datos e IA<br><small>carrera aprobada</small></span>
                                    </div>
                                    <div class="bento-card proof-card proof-card-yellow">
                                        <span class="proof-number"><i class="fa-solid fa-server"></i></span>
                                        <span class="proof-label">Soporte técnico<br><small>redes · hardware · Linux</small></span>
                                    </div>
                                </div>'''
text = text.replace(old_stats, new_stats, 1)

# Add a compact professional summary inside the bottom split card.
text = text.replace('<p class="award-text"><span data-i18n="hero.tagline">Full-Stack Dev<br>&amp; Data Science / IA.</span></p>', '<p class="award-text"><span>Aplicaciones web<br>&amp; soluciones orientadas a datos.</span></p>', 1)

# Insert an Experience tab before Skills.
marker = '                <!-- TAB 2: SKILLS & TECH STACK -->'
experience = '''                <!-- TAB 2: EXPERIENCE & INFRASTRUCTURE -->
                <section class="tab-content" id="tab-experience">
                    <div class="subpage-wrapper">
                        <header class="subpage-header">
                            <h2>Experiencia técnica <span class="arrow-accent">↗</span></h2>
                            <p>Una combinación de desarrollo web, soporte técnico e infraestructura para resolver problemas reales.</p>
                        </header>
                        <div class="experience-grid">
                            <article class="experience-card experience-card-primary">
                                <div class="experience-card-icon"><i class="fa-solid fa-network-wired"></i></div>
                                <div>
                                    <span class="experience-kicker">Trabajo autónomo</span>
                                    <h3>Consultoría y soporte técnico independiente</h3>
                                    <ul>
                                        <li>Instalación y configuración de Starlink, redes IP y cámaras de seguridad.</li>
                                        <li>Diagnóstico, reparación y optimización de hardware.</li>
                                        <li>Asistencia a usuarios y clases de Ofimática.</li>
                                    </ul>
                                </div>
                            </article>
                            <article class="experience-card">
                                <div class="experience-card-icon"><i class="fa-solid fa-code"></i></div>
                                <div>
                                    <span class="experience-kicker">Desarrollo aplicado</span>
                                    <h3>Aplicaciones web y soluciones offline-first</h3>
                                    <ul>
                                        <li>Contax, DeliMarket y Cuentas Claras como proyectos propios.</li>
                                        <li>Trabajo con Python, SQL, React, PWA, IndexedDB y despliegues web.</li>
                                        <li>Primer puesto en Hackathon INNOA 2026.</li>
                                    </ul>
                                </div>
                            </article>
                            <article class="experience-card">
                                <div class="experience-card-icon"><i class="fa-solid fa-people-arrows"></i></div>
                                <div>
                                    <span class="experience-kicker">Habilidades transferibles</span>
                                    <h3>Atención al cliente y resolución de problemas</h3>
                                    <ul>
                                        <li>Experiencia en atención directa, ventas y control de stock.</li>
                                        <li>Comunicación clara con usuarios técnicos y no técnicos.</li>
                                        <li>Disponibilidad para jornada completa e incorporación inmediata.</li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

'''
if marker in text and 'id="tab-experience"' not in text:
    text = text.replace(marker, experience + marker, 1)

# Update mobile nav to include Experience.
mobile_old = '<button class="mob-nav-btn active" data-tab="about"><i class="fa-solid fa-user-gear"></i><span>Sobre Mí</span></button>\n        <button class="mob-nav-btn" data-tab="skills">'
mobile_new = '<button class="mob-nav-btn active" data-tab="about"><i class="fa-solid fa-user-gear"></i><span>Sobre mí</span></button>\n        <button class="mob-nav-btn" data-tab="experience"><i class="fa-solid fa-briefcase"></i><span>Experiencia</span></button>\n        <button class="mob-nav-btn" data-tab="skills">'
text = text.replace(mobile_old, mobile_new, 1)

index.write_text(text, encoding='utf-8')

css_text = css.read_text(encoding='utf-8')
css_text += '''\n\n/* Recruiter-focused refresh based on CV 2026 */\n.hero-positioning {\n    margin-top: 12px;\n    font-size: 13px;\n    line-height: 1.55;\n    color: rgba(255,255,255,.9);\n}\n.hero-positioning strong { color: #fff; font-weight: 700; }\n.career-highlight-card {\n    background: linear-gradient(135deg, #15151c 0%, #292532 100%);\n    color: #fff;\n    padding: 26px;\n    min-height: 246px;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n}\n.career-highlight-card::before {\n    content: ''; position: absolute; inset: 0;\n    background: radial-gradient(circle at 82% 18%, rgba(236,0,140,.45), transparent 35%);\n    pointer-events: none;\n}\n.career-highlight-icon {\n    position: absolute; top: 24px; left: 26px; width: 46px; height: 46px;\n    border-radius: 50%; display: grid; place-items: center;\n    color: #fff; background: #ec008c; font-size: 18px;\n}\n.career-highlight-card .tag-badge { position: relative; align-self: flex-start; margin-bottom: 10px; background: rgba(255,255,255,.13); color: #fff; }\n.career-highlight-card h3, .career-highlight-card p, .highlight-link { position: relative; }\n.career-highlight-card h3 { font-family: var(--font-heading); font-size: 21px; line-height: 1.12; margin-bottom: 8px; }\n.career-highlight-card p { color: rgba(255,255,255,.72); font-size: 12px; line-height: 1.5; max-width: 360px; }\n.highlight-link { margin-top: 16px; font-size: 12px; font-weight: 700; color: #ffc456; }\n.recruiter-proof-stack { gap: 14px; }\n.proof-card { padding: 20px; min-height: 116px; display: flex; align-items: center; gap: 14px; }\n.proof-card-mint { background: var(--color-mint); }\n.proof-card-yellow { background: var(--color-yellow); }\n.proof-number { font-family: var(--font-heading); font-size: 30px; font-weight: 800; line-height: 1; }\n.proof-number i { font-size: 25px; }\n.proof-label { font-size: 12px; font-weight: 800; line-height: 1.25; }\n.proof-label small { font-size: 10px; font-weight: 600; opacity: .7; }\n.experience-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 24px; }\n.experience-card { background: var(--card-bg-subtle); border: 1px solid rgba(20,20,30,.06); border-radius: 22px; padding: 24px; min-height: 300px; transition: transform .3s ease, box-shadow .3s ease; }\n.experience-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }\n.experience-card-primary { background: linear-gradient(145deg, #fce7f3, #fff); }\n.experience-card-icon { width: 44px; height: 44px; display: grid; place-items: center; background: var(--color-hero-purple); color: #fff; border-radius: 14px; margin-bottom: 20px; }\n.experience-kicker { color: var(--color-purple-accent); text-transform: uppercase; letter-spacing: .08em; font-size: 10px; font-weight: 800; }\n.experience-card h3 { font-family: var(--font-heading); font-size: 18px; line-height: 1.2; margin: 8px 0 16px; }\n.experience-card ul { padding-left: 18px; color: var(--color-text-muted); font-size: 12px; line-height: 1.65; }\n@media (max-width: 900px) { .experience-grid { grid-template-columns: 1fr; } }\n@media (max-width: 640px) { .career-highlight-card { min-height: 220px; } .proof-card { min-height: 96px; } }\n'''
css.write_text(css_text, encoding='utf-8')
print('Actualización aplicada: portada, navegación, experiencia y tarjetas de evidencia.')
