from pathlib import Path
p = Path(r"C:\Users\JUAN009\Desktop\PortaFlores\index.html")
text = p.read_text(encoding='utf-8')
marker = '                <!-- TAB 2: SKILLS & TECH STACK -->'
section = '''                <!-- TAB 2: EXPERIENCE & INFRASTRUCTURE -->
                <section class="tab-content" id="tab-experience">
                    <div class="subpage-wrapper">
                        <header class="subpage-header">
                            <h2>Experiencia técnica <span class="arrow-accent">↗</span></h2>
                            <p>Desarrollo web, soporte técnico e infraestructura para resolver problemas reales.</p>
                        </header>
                        <div class="experience-grid">
                            <article class="experience-card experience-card-primary">
                                <div class="experience-card-icon"><i class="fa-solid fa-network-wired"></i></div>
                                <span class="experience-kicker">Trabajo autónomo</span>
                                <h3>Consultoría y soporte técnico independiente</h3>
                                <ul><li>Starlink, redes IP y cámaras de seguridad.</li><li>Diagnóstico, reparación y optimización de hardware.</li><li>Asistencia a usuarios y clases de Ofimática.</li></ul>
                            </article>
                            <article class="experience-card">
                                <div class="experience-card-icon"><i class="fa-solid fa-code"></i></div>
                                <span class="experience-kicker">Desarrollo aplicado</span>
                                <h3>Aplicaciones web y soluciones offline-first</h3>
                                <ul><li>Contax, DeliMarket y Cuentas Claras.</li><li>Python, SQL, React, PWA e IndexedDB.</li><li>Primer puesto en Hackathon INNOA 2026.</li></ul>
                            </article>
                            <article class="experience-card">
                                <div class="experience-card-icon"><i class="fa-solid fa-people-arrows"></i></div>
                                <span class="experience-kicker">Habilidades transferibles</span>
                                <h3>Atención al cliente y resolución de problemas</h3>
                                <ul><li>Atención directa, ventas y control de stock.</li><li>Comunicación con usuarios técnicos y no técnicos.</li><li>Jornada completa e incorporación inmediata.</li></ul>
                            </article>
                        </div>
                    </div>
                </section>

'''
if marker in text and 'id="tab-experience"' not in text:
    text = text.replace(marker, section + marker, 1)
p.write_text(text, encoding='utf-8')
print('Sección Experiencia restaurada y conectada al sidebar.')
