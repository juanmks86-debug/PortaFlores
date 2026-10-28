from pathlib import Path
p = Path(r"C:\Users\JUAN009\Desktop\PortaFlores\index.html")
text = p.read_text(encoding='utf-8')
text = text.replace('<a href="https://github.com/juanmks86-debug/DeliMarket" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Repositorio</a><a href="https://delimarket-app.vercel.app/"', '<a href="#" class="disabled-link"><i class="fa-brands fa-github"></i> Repositorio</a><a href="https://delimarket-app.vercel.app/"', 1)
p.write_text(text, encoding='utf-8')
print('Enlace no confirmado de DeliMarket desactivado; se conserva su demo.')
