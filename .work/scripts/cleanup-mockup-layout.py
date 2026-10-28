from pathlib import Path
root = Path(r"C:\Users\JUAN009\Desktop\PortaFlores")
index = root / "index.html"
text = index.read_text(encoding='utf-8')
old_availability = '''                        <div class="availability-banner">
                            <span class="availability-dot"></span>
                            <strong>Disponible jornada completa</strong>
                            <span>·</span>
                            <span>Incorporación inmediata</span>
                            <span class="availability-location"><i class="fa-solid fa-location-dot"></i> Perico, Jujuy</span>
                        </div>

                        <!-- Testimonios omitidos: priorizamos evidencia verificable del CV. -->
'''
text = text.replace(old_availability, '', 1)
text = text.replace('<button class="home-projects-link" data-tab="portfolio">', '<button class="home-projects-link" type="button" onclick="document.querySelector(\'.nav-btn[data-tab=\\\'portfolio\\\']\').click()">', 1)
index.write_text(text, encoding='utf-8')
print('Restos anteriores eliminados y navegación de proyectos conectada.')
