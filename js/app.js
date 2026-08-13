
// --- Video Modal Helpers ---
function playDeliVideo() {
    const placeholder = document.getElementById('videoPlaceholder');
    if (placeholder) {
        placeholder.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/jPcha7sUMh0?autoplay=1" title="DeliMarket Demo" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;border:0;"></iframe>';
    }
}

function resetDeliVideo() {
    const placeholder = document.getElementById('videoPlaceholder');
    if (placeholder) {
        placeholder.innerHTML = '<img src="assets/project1.jpg" alt="DeliMarket Demo" class="video-preview-img">' +
            '<div class="video-controls-overlay">' +
            '<i class="fa-solid fa-circle-play video-play-big"></i>' +
            '<span>Ver demo en video</span>' +
            '</div>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeVideoModal');
    const backdrop = document.getElementById('videoModal');
    if (closeBtn) closeBtn.addEventListener('click', resetDeliVideo);
    if (backdrop) backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) resetDeliVideo();
    });
});

/**
 * Bento Grid Portfolio Application Logic
 * Extended with AI Chatbot, GitHub API Live Fetch & Spotify Status
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Sound Effects Generator (Web Audio API) ---
    let soundEnabled = true;
    let audioCtx = null;

    const playUiSound = (type = 'click') => {
        if (!soundEnabled) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.05);
            } else if (type === 'tab') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.08);
            }
        } catch (e) {}
    };

    const soundToggleBtn = document.getElementById('soundToggleBtn');
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            soundToggleBtn.innerHTML = soundEnabled 
                ? '<i class="fa-solid fa-volume-high"></i>' 
                : '<i class="fa-solid fa-volume-xmark"></i>';
            soundToggleBtn.title = soundEnabled ? 'Efectos de Sonido (Activado)' : 'Efectos de Sonido (Silenciado)';
            showToast(soundEnabled ? '🔊 Sonidos de UI Activados' : '🔇 Sonidos de UI Silenciados');
        });
    }

    // --- 3. Tab Navigation ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            playUiSound('tab');
            const targetTab = button.getAttribute('data-tab');

            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            button.classList.add('active');
            const activeSection = document.getElementById(`tab-${targetTab}`);
            if (activeSection) {
                activeSection.classList.add('active');
            }

            if (targetTab === 'github') {
                fetchGitHubData('juanmks86-debug');
            }
        });
    });

    // --- 4. Counter Animation for Stat Cards ---
    const animateCounters = () => {
        const counterElements = document.querySelectorAll('.stat-number, .stat-number-large');
        
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 1800; // ms
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current);
                }
            }, stepTime);
        });
    };

    setTimeout(animateCounters, 300);

    // --- 4b. Hero Stats: GitHub repos/followers en vivo ---
    const fetchHeroGitHubStats = async () => {
        const reposEl = document.getElementById('heroReposCount');
        const followersEl = document.getElementById('heroFollowersCount');
        if (!reposEl || !followersEl) return;
        try {
            const res = await fetch('https://api.github.com/users/juanmks86-debug');
            if (!res.ok) return;
            const data = await res.json();
            reposEl.setAttribute('data-target', data.public_repos || 0);
            followersEl.setAttribute('data-target', data.followers || 0);
            animateCounters();
        } catch (err) {
            // Si falla (ej. rate limit), se quedan en 0 sin romper la página
        }
    };

    fetchHeroGitHubStats();

    // --- 6. GitHub API Live Data Fetch ---
    const fetchGitHubData = async (username) => {
        const reposGrid = document.getElementById('ghReposGrid');
        if (!reposGrid) return;

        reposGrid.innerHTML = '<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin"></i> Cargando repositorios de GitHub...</div>';

        try {
            const userRes = await fetch(`https://api.github.com/users/${username}`);
            if (userRes.ok) {
                const userData = await userRes.json();
                document.getElementById('ghPublicRepos').textContent = userData.public_repos || 0;
                document.getElementById('ghFollowers').textContent = userData.followers || 0;
                document.getElementById('ghFollowing').textContent = userData.following || 0;
            }

            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
            if (reposRes.ok) {
                const repos = await reposRes.json();
                reposGrid.innerHTML = '';

                if (repos.length === 0) {
                    reposGrid.innerHTML = '<p>No se encontraron repositorios públicos.</p>';
                    return;
                }

                repos.forEach(repo => {
                    const card = document.createElement('div');
                    card.className = 'repo-card';
                    card.innerHTML = `
                        <div>
                            <div class="repo-header">
                                <a href="${repo.html_url}" target="_blank" class="repo-title">${repo.name}</a>
                                <i class="fa-regular fa-folder"></i>
                            </div>
                            <p class="repo-desc">${repo.description || 'Repositorio público de código abierto.'}</p>
                        </div>
                        <div class="repo-footer">
                            <span><i class="fa-solid fa-circle" style="color:#7E7BE6;"></i> ${repo.language || 'JS/Code'}</span>
                            <span><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
                            <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                        </div>
                    `;
                    reposGrid.appendChild(card);
                });
            } else {
                reposGrid.innerHTML = '<p>Error al cargar repositorios. Intenta con otro usuario.</p>';
            }
        } catch (err) {
            reposGrid.innerHTML = '<p>No se pudo conectar a la API de GitHub.</p>';
        }
    };

    document.getElementById('fetchGhBtn')?.addEventListener('click', () => {
        playUiSound('click');
        const user = document.getElementById('ghUsernameInput').value.trim() || 'juanmks86-debug';
        fetchGitHubData(user);
    });

    // --- 7. Spotify Track Rotation Simulation ---
    const spotifyTracks = [
        "Daft Punk — One More Time",
        "The Weeknd — Blinding Lights",
        "Kavinsky — Nightcall",
        "Gorillaz — Feel Good Inc.",
        "Tame Impala — The Less I Know The Better"
    ];
    let trackIdx = 0;
    setInterval(() => {
        trackIdx = (trackIdx + 1) % spotifyTracks.length;
        const spotifyEl = document.getElementById('spotifyTrack');
        if (spotifyEl) {
            spotifyEl.textContent = spotifyTracks[trackIdx];
        }
    }, 12000);

    // --- 7b. Ambient Background Music (loop generado con Web Audio API) ---
    let ambientCtx = null;
    let ambientNodes = [];
    let ambientPlaying = false;

    const startAmbient = () => {
        if (!ambientCtx) {
            ambientCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (ambientCtx.state === 'suspended') ambientCtx.resume();

        const masterGain = ambientCtx.createGain();
        masterGain.gain.value = 0.05;
        masterGain.connect(ambientCtx.destination);

        const freqs = [130.81, 164.81, 196.00, 261.63]; // acorde suave C3-E3-G3-C4
        freqs.forEach((freq, i) => {
            const osc = ambientCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;

            const lfo = ambientCtx.createOscillator();
            lfo.frequency.value = 0.05 + i * 0.02;
            const lfoGain = ambientCtx.createGain();
            lfoGain.gain.value = 0.015;
            lfo.connect(lfoGain);
            lfoGain.connect(masterGain.gain);
            lfo.start();

            osc.connect(masterGain);
            osc.start();
            ambientNodes.push(osc, lfo);
        });

        ambientNodes.push(masterGain);
        ambientPlaying = true;
    };

    const stopAmbient = () => {
        ambientNodes.forEach(node => {
            try { node.stop && node.stop(); } catch (e) {}
            try { node.disconnect(); } catch (e) {}
        });
        ambientNodes = [];
        ambientPlaying = false;
    };

    const spotifyWidget = document.getElementById('spotifyWidget');
    const spotifyLabel = document.querySelector('.spotify-label');
    if (spotifyWidget) {
        spotifyWidget.style.cursor = 'pointer';
        spotifyWidget.title = 'Click para reproducir/pausar música de fondo';
        spotifyWidget.addEventListener('click', () => {
            playUiSound('click');
            if (ambientPlaying) {
                stopAmbient();
                if (spotifyLabel) spotifyLabel.textContent = 'Música en pausa';
            } else {
                startAmbient();
                if (spotifyLabel) spotifyLabel.textContent = 'Escuchando ahora en Spotify';
            }
        });
    }



    // --- 8. AI Chatbot Widget Logic ---
    const toggleAiChatBtn = document.getElementById('toggleAiChatBtn');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const closeAiChatBtn = document.getElementById('closeAiChatBtn');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiChatInput = document.getElementById('aiChatInput');
    const sendAiChatBtn = document.getElementById('sendAiChatBtn');

    if (toggleAiChatBtn && aiChatWindow) {
        toggleAiChatBtn.addEventListener('click', () => {
            playUiSound('click');
            aiChatWindow.classList.toggle('active');
            if (aiChatWindow.classList.contains('active')) {
                aiChatInput?.focus();
            }
        });

        closeAiChatBtn?.addEventListener('click', () => {
            aiChatWindow.classList.remove('active');
        });
    }

    const handleAiSendMessage = () => {
        const text = aiChatInput.value.trim();
        if (!text) return;

        playUiSound('click');
        // User message
        const userMsg = document.createElement('div');
        userMsg.className = 'ai-msg user';
        userMsg.textContent = text;
        aiChatMessages.appendChild(userMsg);
        aiChatInput.value = '';

        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

        // Bot Response Generation
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'ai-msg bot';

            const lower = text.toLowerCase();
            if (lower.includes('hola') || lower.includes('buenas')) {
                botMsg.textContent = "¡Hola! ¿Cómo estás? Soy el asistente de Juan. ¿Te gustaría saber más sobre sus proyectos, su formación o cómo contactarlo?";
            } else if (lower.includes('precio') || lower.includes('tarifa') || lower.includes('costo')) {
                botMsg.textContent = "Para consultas sobre proyectos o presupuestos, escribile directamente a juanmks86@gmail.com y coordinamos los detalles.";
            } else if (lower.includes('proyecto') || lower.includes('portafolio')) {
                botMsg.textContent = "Juan desarrolló Contax, DeliMarket y Cuentas Claras, apps propias desplegadas en Vercel. ¡Revisa la sección Portfolio para ver más!";
            } else if (lower.includes('contacto') || lower.includes('email') || lower.includes('correo')) {
                botMsg.textContent = "Puedes enviarle un mensaje directo haciendo clic en el botón 'Contacto' arriba o escribiendo a juanmks86@gmail.com.";
            } else if (lower.includes('estudi') || lower.includes('formacion') || lower.includes('formación') || lower.includes('universidad')) {
                botMsg.textContent = "Juan cursa Analista Programador Universitario en la Facultad de Ingeniería (UNJu) y la Tecnicatura Superior en Ciencias de Datos e IA en el IES N°6.";
            } else {
                botMsg.textContent = "¡Buena pregunta! Juan trabaja con React, Vite, JavaScript y PWAs, y está formándose en Ciencia de Datos e IA. Si querés coordinar algo, dejá tu mensaje en el formulario de contacto.";
            }

            aiChatMessages.appendChild(botMsg);
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
            playUiSound('tab');
        }, 700);
    };

    sendAiChatBtn?.addEventListener('click', handleAiSendMessage);
    aiChatInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleAiSendMessage();
    });

    // --- 9. Podcast episodes now link out to real external shows (no in-app fake player needed) ---

    // --- 10. Modals & Popups ---
    const setupModal = (triggerId, modalId, closeId) => {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);
        const closeBtn = document.getElementById(closeId);

        if (trigger && modal && closeBtn) {
            trigger.addEventListener('click', () => {
                playUiSound('click');
                modal.classList.add('active');
            });

            closeBtn.addEventListener('click', () => {
                playUiSound('click');
                modal.classList.remove('active');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    };

    setupModal('contactBtn', 'contactModal', 'closeContactModal');
    setupModal('editProfileBtn', 'editModal', 'closeEditModal');
    setupModal('openVideoModal', 'videoModal', 'closeVideoModal');
    setupModal('openCvBtn', 'cvModal', 'closeCvModal');
    setupModal('terminalToggleBtn', 'terminalModal', 'closeTerminalModal');

    document.getElementById('downloadPdfActionBtn')?.addEventListener('click', () => {
        playUiSound('click');
        showToast('📄 Descargando Curriculum Vitae PDF...');
        document.getElementById('cvModal')?.classList.remove('active');
    });

    // --- 11. Terminal CLI Logic ---
    const termInput = document.getElementById('termInput');
    const terminalBody = document.getElementById('terminalBody');
    const matrixCanvas = document.getElementById('matrixCanvas');

    let matrixInterval = null;
    const initMatrix = () => {
        if (!matrixCanvas) return;
        const ctx = matrixCanvas.getContext('2d');
        matrixCanvas.width = matrixCanvas.parentElement.clientWidth;
        matrixCanvas.height = matrixCanvas.parentElement.clientHeight;

        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const fontSize = 14;
        const columns = Math.floor(matrixCanvas.width / fontSize);
        const drops = Array(columns).fill(1);

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(13, 14, 18, 0.1)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            ctx.fillStyle = '#00FF66';
            ctx.font = `${fontSize}px monospace`;

            drops.forEach((y, i) => {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, y * fontSize);
                if (y * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        };

        if (matrixInterval) clearInterval(matrixInterval);
        matrixInterval = setInterval(drawMatrix, 50);
    };

    document.getElementById('terminalToggleBtn')?.addEventListener('click', () => {
        setTimeout(initMatrix, 100);
        setTimeout(() => termInput?.focus(), 200);
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
            e.preventDefault();
            const termModal = document.getElementById('terminalModal');
            if (termModal?.classList.contains('active')) {
                termModal.classList.remove('active');
            } else {
                termModal?.classList.add('active');
                setTimeout(initMatrix, 100);
                setTimeout(() => termInput?.focus(), 200);
            }
        }
    });

    if (termInput && terminalBody) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim().toLowerCase();
                termInput.value = '';

                const cmdLine = document.createElement('div');
                cmdLine.className = 'term-line';
                cmdLine.innerHTML = `<span class="prompt">juan@portfolio:~$</span> ${cmd}`;
                terminalBody.appendChild(cmdLine);

                const output = document.createElement('div');
                output.className = 'term-output';

                switch (cmd) {
                    case 'help':
                        output.textContent = 
`Comandos disponibles:
  help       - Muestra esta lista de comandos
  about      - Resumen sobre Juan Israel Flores
  skills     - Muestra las principales habilidades técnicas
  projects   - Lista los proyectos destacados
  contact    - Abre el formulario de contacto
  matrix     - Activa la animación del Matrix rain
  clear      - Limpia la pantalla de la terminal`;
                        break;
                    case 'about':
                        output.textContent = "Juan Israel Flores — Analista Programador Universitario (UNJu) y estudiante de Ciencias de Datos e IA (IES N°6). Desarrolla apps propias como Contax, DeliMarket y Cuentas Claras.";
                        break;
                    case 'skills':
                        output.textContent = "✦ Frontend: React, Vite, JavaScript, HTML/CSS\n✦ Datos/IA: Python, análisis de datos (en formación)\n✦ Apps: PWA, IndexedDB/localStorage, deploy en Vercel";
                        break;
                    case 'projects':
                        output.textContent = "1. Contax — Gestor de inventario y ventas\n2. DeliMarket — Marketplace de delivery\n3. Cuentas Claras — Gestión de préstamos";
                        break;
                    case 'contact':
                        output.textContent = "Abriendo el formulario de contacto...";
                        document.getElementById('terminalModal')?.classList.remove('active');
                        document.getElementById('contactModal')?.classList.add('active');
                        break;
                    case 'clear':
                        terminalBody.innerHTML = '';
                        return;
                    case 'matrix':
                        output.textContent = "🟢 Wake up, Neo... The Matrix has you.";
                        initMatrix();
                        break;
                    default:
                        if (cmd !== '') {
                            output.textContent = `Comando no reconocido: '${cmd}'. Escribe 'help' para ver la lista de comandos.`;
                        }
                        break;
                }

                terminalBody.appendChild(output);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    // --- 12. Stat Cards Navigation Click Handlers ---
    document.getElementById('openProjectsModal')?.addEventListener('click', () => {
        document.querySelector('.nav-btn[data-tab="github"]')?.click();
    });

    document.getElementById('openClientsModal')?.addEventListener('click', () => {
        showToast('🎓 Analista Programador (UNJu) + Ciencias de Datos e IA (IES N°6)');
    });

    document.getElementById('openAwardsModal')?.addEventListener('click', () => {
        document.querySelector('.nav-btn[data-tab="github"]')?.click();
    });

    document.getElementById('openGlobalAwardsModal')?.addEventListener('click', () => {
        document.querySelector('.nav-btn[data-tab="portfolio"]')?.click();
    });

    // --- 13. Form Submissions ---
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name    = document.getElementById('cName')?.value || '';
        const email   = document.getElementById('cEmail')?.value || '';
        const message = document.getElementById('cMsg')?.value || '';
        const subject = encodeURIComponent(`Contacto desde Portfolio — ${name}`);
        const body    = encodeURIComponent(`Hola Juan,\n\nSoy ${name} (${email}).\n\n${message}`);
        window.location.href = `mailto:juanmks86@gmail.com?subject=${subject}&body=${body}`;
        document.getElementById('contactModal')?.classList.remove('active');
        showToast('📧 Abriendo tu cliente de correo...');
    });

    document.getElementById('editProfileForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('eName').value;
        const newEmail = document.getElementById('eEmail').value;

        if (newName) document.getElementById('userName').textContent = newName;
        if (newEmail) {
            document.getElementById('userEmailText').textContent = newEmail;
            document.getElementById('userEmail').href = `mailto:${newEmail}`;
        }

        document.getElementById('editModal')?.classList.remove('active');
        showToast('✅ Perfil actualizado correctamente.');
    });

    // --- 14. Portfolio Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            playUiSound('click');
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 15. Toast Helper ---
    function showToast(message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;

        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
});


/* ============================================================
   NUEVOS SCRIPTS AGREGADOS
   ============================================================ */

// --- A. Meta Tags Dinámicas por Sección ---
document.addEventListener('DOMContentLoaded', function() {
    const descMeta = document.querySelector('meta[name="description"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const twDesc = document.querySelector('meta[name="twitter:description"]');

    function updateMeta(tab) {
        const lang = window.currentLang || localStorage.getItem('portfolio-lang') || 'es';
        const titles = {
            es: {
                about: 'Sobre Mí | Juan Israel Flores — Full-Stack & Data/IA',
                skills: 'Habilidades & Stack | Juan Israel Flores',
                github: 'GitHub Live | Juan Israel Flores',
                portfolio: 'Proyectos | Juan Israel Flores — Portafolio',
                clients: 'Formación | Juan Israel Flores — UNJu & IES N°6',
                podcast: 'Podcasts | Juan Israel Flores',
                blog: 'Blog Técnico | Juan Israel Flores'
            },
            en: {
                about: 'About Me | Juan Israel Flores — Full-Stack & Data/AI',
                skills: 'Skills & Stack | Juan Israel Flores',
                github: 'GitHub Live | Juan Israel Flores',
                portfolio: 'Projects | Juan Israel Flores — Portfolio',
                clients: 'Education | Juan Israel Flores — UNJu & IES N°6',
                podcast: 'Podcasts | Juan Israel Flores',
                blog: 'Tech Blog | Juan Israel Flores'
            }
        };
        const descriptions = {
            es: {
                about: 'Conocé a Juan Israel Flores: Analista Programador Universitario (UNJu) y estudiante de Ciencias de Datos e IA (IES N°6).',
                skills: 'Stack técnico completo de Juan Israel Flores: React, TypeScript, Node.js, Python, Machine Learning y más.',
                github: 'Repositorios en vivo, contribuciones y actividad reciente de Juan Israel Flores en GitHub.',
                portfolio: 'Explorá los proyectos de Juan Israel Flores: DeliMarket, Contax, Cuentas Claras, PortaFlores y más.',
                clients: 'Trayectoria académica de Juan Israel Flores: UNJu (Analista Programador) e IES N°6 (Data Science & IA).',
                podcast: 'Podcasts de tecnología que sigue Juan Israel Flores: Syntax.fm, The Changelog, Microsiervos.',
                blog: 'Notas técnicas y artículos de Juan Israel Flores sobre desarrollo web, data science e inteligencia artificial.'
            },
            en: {
                about: 'Meet Juan Israel Flores: University Programming Analyst (UNJu) and Data Science & AI student (IES N°6).',
                skills: 'Full tech stack of Juan Israel Flores: React, TypeScript, Node.js, Python, Machine Learning and more.',
                github: 'Live repositories, contributions and recent activity of Juan Israel Flores on GitHub.',
                portfolio: 'Explore Juan Israel Flores projects: DeliMarket, Contax, Cuentas Claras, PortaFlores and more.',
                clients: 'Academic background of Juan Israel Flores: UNJu (Programming Analyst) and IES N°6 (Data Science & AI).',
                podcast: 'Technology podcasts Juan Israel Flores follows: Syntax.fm, The Changelog, Microsiervos.',
                blog: 'Technical notes and articles by Juan Israel Flores on web development, data science and artificial intelligence.'
            }
        };
        if (titles[lang] && titles[lang][tab]) document.title = titles[lang][tab];
        if (descriptions[lang] && descriptions[lang][tab]) {
            if (descMeta) descMeta.content = descriptions[lang][tab];
            if (ogDesc) ogDesc.content = descriptions[lang][tab];
            if (twDesc) twDesc.content = descriptions[lang][tab];
        }
    }

    document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            if (tab) updateMeta(tab);
        });
    });
});

// --- B. Hero Stats GitHub en vivo ---
(async function loadHeroStats() {
    const username = 'juanmks86-debug';
    try {
        const res = await fetch('https://api.github.com/users/' + username);
        if (!res.ok) throw new Error('GitHub API error');
        const data = await res.json();
        const reposEl = document.getElementById('heroReposCount');
        const followersEl = document.getElementById('heroFollowersCount');

        function animateCounter(el, target) {
            if (!el) return;
            let current = 0;
            const duration = 1500;
            const step = Math.ceil(target / (duration / 16));
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = current.toLocaleString();
            }, 16);
        }
        animateCounter(reposEl, data.public_repos);
        animateCounter(followersEl, data.followers);
    } catch (e) {
        console.log('No se pudieron cargar stats de GitHub:', e);
    }
})();

// --- C. Formspree Contact Form ---
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactStatus = document.getElementById('contactStatus');
    const submitBtn = document.getElementById('contactSubmitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactStatus.textContent = '✅ ¡Mensaje enviado! Te responderé pronto.';
                    contactStatus.className = 'form-status success';
                    contactStatus.style.display = 'block';
                    contactForm.reset();
                } else {
                    throw new Error('Error en el servidor');
                }
            } catch (err) {
                contactStatus.textContent = '❌ Hubo un error. Escribime directo a juanmks86@gmail.com';
                contactStatus.className = 'form-status error';
                contactStatus.style.display = 'block';
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                setTimeout(() => { contactStatus.style.display = 'none'; }, 6000);
            }
        });
    }
});

// --- D. Chatbot IA Inteligente con i18n ---
document.addEventListener('DOMContentLoaded', function() {
    const chatWindow = document.getElementById('aiChatWindow');
    const chatMessages = document.getElementById('aiChatMessages');
    const chatInput = document.getElementById('aiChatInput');
    const sendBtn = document.getElementById('sendAiChatBtn');
    const toggleBtn = document.getElementById('toggleAiChatBtn');
    const closeBtn = document.getElementById('closeAiChatBtn');
    const botStatus = document.getElementById('aiBotStatus');

    function getChatbotResponse(key) {
        const lang = window.currentLang || localStorage.getItem('portfolio-lang') || 'es';
        if (window.i18n && window.i18n[lang] && window.i18n[lang][key]) {
            return window.i18n[lang][key];
        }
        const fallbacks = {
            es: {
                'chatbot.hello': '¡Hola! 👋 Soy el asistente de Juan. ¿Te interesa saber sobre sus <strong>proyectos</strong>, <strong>habilidades</strong>, <strong>formación</strong> o cómo <strong>contactarlo</strong>?',
                'chatbot.projects': 'Juan tiene varios proyectos propios:<br>• <strong>DeliMarket</strong> — Marketplace de delivery (React + PWA)<br>• <strong>Contax</strong> — Gestor de inventario y ventas offline<br>• <strong>Cuentas Claras</strong> — Gestión de préstamos e intereses<br>• <strong>PortaFlores</strong> — Este portafolio interactivo<br>¿Querés ver alguno en particular?',
                'chatbot.skills': 'Juan domina:<br>• <strong>Frontend:</strong> React, Vite, TypeScript, Next.js<br>• <strong>Backend:</strong> Node.js, Express, Python<br>• <strong>Data/IA:</strong> Pandas, NumPy, Machine Learning<br>• <strong>Diseño:</strong> Figma, UI/UX, Design Systems<br>• <strong>DevOps:</strong> Git, Vercel, Proxmox/KVM',
                'chatbot.education': 'Juan está cursando dos carreras:<br>• <strong>Analista Programador Universitario</strong> — UNJu (Facultad de Ingeniería)<br>• <strong>Tec. en Ciencias de Datos e IA</strong> — IES N°6<br>También aprende de forma autodidacta React, Three.js y diseño UI/UX.',
                'chatbot.contact': 'Podés contactar a Juan por:<br>• 📧 <strong>juanmks86@gmail.com</strong><br>• 💻 <strong>github.com/juanmks86-debug</strong><br>• También podés usar el formulario de contacto del portafolio (botón "Contacto" arriba a la derecha). ¿Te gustaría que te redirija?',
                'chatbot.cv': 'Juan está abierto a oportunidades de <strong>desarrollo web</strong>, <strong>proyectos freelance</strong> y <strong>prácticas profesionales</strong>. Podés descargar su CV desde el botón "Descargar CV" en la sección principal, o escribirle directo por email.',
                'chatbot.data': 'Juan está formándose en <strong>Ciencias de Datos e IA</strong> (IES N°6). Maneja:<br>• Python (Pandas, NumPy, Scikit-learn)<br>• Machine Learning supervisado y no supervisado<br>• Procesamiento de Lenguaje Natural (PLN)<br>• Visualización de datos<br>¡Mirá su <strong>Mapa Mental de PLN</strong> en la sección Proyectos!',
                'chatbot.thanks': '¡De nada! 😊 Si tenés más preguntas, aquí estoy. ¡Suerte!',
                'chatbot.fallback': 'Mmm, no estoy seguro de entender eso 🤔<br>Podés preguntarme sobre sus <strong>proyectos</strong>, <strong>habilidades</strong>, <strong>formación</strong> o cómo <strong>contactarlo</strong>.'
            },
            en: {
                'chatbot.hello': "Hi! 👋 I'm Juan's assistant. Are you interested in his <strong>projects</strong>, <strong>skills</strong>, <strong>education</strong> or how to <strong>contact him</strong>?",
                'chatbot.projects': 'Juan has several own projects:<br>• <strong>DeliMarket</strong> — Delivery marketplace (React + PWA)<br>• <strong>Contax</strong> — Offline inventory and sales manager<br>• <strong>Cuentas Claras</strong> — Loan and interest management<br>• <strong>PortaFlores</strong> — This interactive portfolio<br>Want to see any in particular?',
                'chatbot.skills': 'Juan masters:<br>• <strong>Frontend:</strong> React, Vite, TypeScript, Next.js<br>• <strong>Backend:</strong> Node.js, Express, Python<br>• <strong>Data/AI:</strong> Pandas, NumPy, Machine Learning<br>• <strong>Design:</strong> Figma, UI/UX, Design Systems<br>• <strong>DevOps:</strong> Git, Vercel, Proxmox/KVM',
                'chatbot.education': 'Juan is studying two degrees:<br>• <strong>University Programming Analyst</strong> — UNJu (Engineering Faculty)<br>• <strong>Data Science & AI Technician</strong> — IES N°6<br>He also self-teaches React, Three.js and UI/UX design.',
                'chatbot.contact': 'You can contact Juan via:<br>• 📧 <strong>juanmks86@gmail.com</strong><br>• 💻 <strong>github.com/juanmks86-debug</strong><br>• You can also use the contact form in the portfolio ("Contact" button top right). Would you like me to redirect you?',
                'chatbot.cv': 'Juan is open to <strong>web development</strong>, <strong>freelance projects</strong> and <strong>internships</strong>. You can download his CV from the "Download CV" button in the main section, or write him directly by email.',
                'chatbot.data': 'Juan is training in <strong>Data Science & AI</strong> (IES N°6). He handles:<br>• Python (Pandas, NumPy, Scikit-learn)<br>• Supervised and unsupervised Machine Learning<br>• Natural Language Processing (NLP)<br>• Data visualization<br>Check out his <strong>NLP Mind Map</strong> in the Projects section!',
                'chatbot.thanks': "You're welcome! 😊 If you have more questions, I'm here. Good luck!",
                'chatbot.fallback': "Hmm, I'm not sure I understand 🤔<br>You can ask me about his <strong>projects</strong>, <strong>skills</strong>, <strong>education</strong> or how to <strong>contact him</strong>."
            }
        };
        return (fallbacks[lang] && fallbacks[lang][key]) ? fallbacks[lang][key] : key;
    }

    const knowledgeBase = [
        { keywords: ['hola', 'buenas', 'hey', 'hi', 'hello'], responseKey: 'chatbot.hello' },
        { keywords: ['proyecto', 'proyectos', 'app', 'apps', 'aplicación', 'contax', 'delimarket', 'cuentas claras', 'project', 'projects'], responseKey: 'chatbot.projects' },
        { keywords: ['habilidad', 'habilidades', 'skill', 'skills', 'stack', 'tecnología', 'tecnologías', 'lenguaje', 'lenguajes', 'technology'], responseKey: 'chatbot.skills' },
        { keywords: ['formación', 'estudio', 'estudios', 'carrera', 'universidad', 'unju', 'ies', 'facultad', 'education', 'study', 'university'], responseKey: 'chatbot.education' },
        { keywords: ['contacto', 'contactar', 'email', 'mail', 'correo', 'whatsapp', 'teléfono', 'linkedin', 'github', 'contact'], responseKey: 'chatbot.contact' },
        { keywords: ['cv', 'curriculum', 'trabajo', 'empleo', 'freelance', 'contratar', 'disponible', 'job', 'work', 'hire'], responseKey: 'chatbot.cv' },
        { keywords: ['data', 'datos', 'ia', 'inteligencia artificial', 'machine learning', 'ml', 'python', 'ai', 'artificial intelligence'], responseKey: 'chatbot.data' },
        { keywords: ['gracias', 'thank', 'ok', 'perfecto', 'genial', 'buena', 'adiós', 'chau', 'bye', 'thanks'], responseKey: 'chatbot.thanks' }
    ];

    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }

    function addMessage(text, isBot) {
        const div = document.createElement('div');
        div.className = 'ai-msg ' + (isBot ? 'bot' : 'user');
        div.innerHTML = '<div class="msg-content">' + text + '</div><div class="msg-time">' + getCurrentTime() + '</div>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'ai-msg bot';
        div.id = 'typingMsg';
        div.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTyping() {
        const t = document.getElementById('typingMsg');
        if (t) t.remove();
    }

    function findResponse(input) {
        const lower = input.toLowerCase();
        for (const item of knowledgeBase) {
            if (item.keywords.some(k => lower.includes(k))) {
                return getChatbotResponse(item.responseKey);
            }
        }
        return getChatbotResponse('chatbot.fallback');
    }

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;
        addMessage(text, false);
        chatInput.value = '';
        showTyping();
        if (botStatus) botStatus.innerHTML = '<span class="status-dot"></span> ' + getChatbotResponse('chatbot.typing');
        const delay = 800 + Math.random() * 800;
        setTimeout(() => {
            removeTyping();
            addMessage(findResponse(text), true);
            if (botStatus) botStatus.innerHTML = '<span class="status-dot"></span> ' + getChatbotResponse('chatbot.online');
        }, delay);
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (chatInput) chatInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') handleSend(); });
    if (toggleBtn) toggleBtn.addEventListener('click', function() { chatWindow.classList.toggle('active'); });
    if (closeBtn) closeBtn.addEventListener('click', function() { chatWindow.classList.remove('active'); });

    const initialTime = document.getElementById('msgTime0');
    if (initialTime) initialTime.textContent = getCurrentTime();
});

// --- E. i18n Multi-idioma ES/EN ---
document.addEventListener('DOMContentLoaded', function() {
    const i18n = {
        es: {
            'nav.about': 'Sobre Mí', 'nav.skills': 'Habilidades', 'nav.github': 'GitHub Live', 'nav.portfolio': 'Proyectos', 'nav.clients': 'Formación', 'nav.podcast': 'Podcast', 'nav.blog': 'Blog',
            'hero.greeting': 'Soy,', 'hero.cv': 'Descargar CV', 'hero.contact': 'Contacto', 'hero.portfolio': 'Portfolio', 'hero.repos': 'Repos en GitHub', 'hero.followers': 'Seguidores en GitHub', 'hero.formation': 'Formación: UNJu & IES N°6', 'hero.tagline': 'Full-Stack Dev<br>& Data Science / IA.',
            'spotify.listening': 'Escuchando ahora en Spotify',
            'skills.title': 'Habilidades & Stack Técnico ↗', 'skills.desc': 'Herramientas y tecnologías que domino para desarrollo web y diseño UI/UX.',
            'github.title': 'GitHub Live & Código ↗', 'github.desc': 'Repositorios en vivo, contribuciones y actividad reciente sincronizada.', 'github.placeholder': 'Ingresa un usuario de GitHub...', 'github.load': 'Cargar Datos',
            'portfolio.title': 'Proyectos Seleccionados ↗', 'portfolio.desc': 'Apps propias, este portafolio y trabajos de la facultad — desarrollo web, sistemas y data & IA.',
            'filter.all': 'Todos', 'filter.webapp': 'Web Apps / PWA', 'filter.data': 'Data & IA', 'filter.frontend': 'Frontend / UI', 'filter.sistemas': 'Sistemas / Infraestructura',
            'clients.title': 'Formación Académica ↗', 'clients.desc': 'Mi trayectoria universitaria y técnica en desarrollo de software, datos e inteligencia artificial.',
            'podcast.title': 'Podcasts que sigo ↗', 'podcast.desc': 'Programas de tecnología que escucho habitualmente — abren en una pestaña nueva.',
            'blog.title': 'Blog Técnico ↗', 'blog.desc': 'Notas, apuntes y reflexiones sobre desarrollo web, ciencia de datos e inteligencia artificial.',
            'contact.title': '¡Hablemos de tu próximo proyecto!', 'contact.desc': 'Envía un mensaje y nos pondremos en contacto rápidamente.', 'contact.name': 'Tu Nombre', 'contact.email': 'Tu Email', 'contact.message': 'Mensaje', 'contact.namePlaceholder': 'Ej: María García', 'contact.emailPlaceholder': 'maria@empresa.com', 'contact.msgPlaceholder': 'Cuéntame sobre las metas de tu proyecto...', 'contact.send': 'Enviar Mensaje', 'contact.alt': 'O escribime directo a',
            'cv.title': 'Curriculum Vitae — Juan Israel Flores', 'cv.subtitle': 'Desarrollador Full-Stack & Data Science / IA', 'cv.download': 'Descargar PDF', 'cv.notYet': '¿No disponible aún? Escribime a',
            'edit.title': 'Personalizar Portafolio', 'edit.desc': 'Modifica los datos de tu perfil en tiempo real.', 'edit.name': 'Nombre Completo', 'edit.email': 'Correo Electrónico', 'edit.save': 'Guardar Cambios',
            'terminal.title': 'bash — juan@flores-portfolio ~ (CLI)',
            'chatbot.title': 'Asistente de Juan Israel Flores', 'chatbot.online': 'En línea', 'chatbot.typing': 'Escribiendo...',
            'blog.read': 'Leer nota', 'blog.min': 'min',
            'calculator.title': 'CUENTAS CLARAS', 'calculator.capital': 'Capital ($)', 'calculator.rate': 'Tasa anual (%)', 'calculator.term': 'Plazo (meses)', 'calculator.type': 'Tipo de interés', 'calculator.compound': 'Compuesto (capitalizable)', 'calculator.simple': 'Simple', 'calculator.calculate': 'Calcular', 'calculator.final': 'Monto Final', 'calculator.interest': 'Intereses', 'calculator.based': 'Basado en la app', 'calculator.cc': 'Cuentas Claras',
            'testimonials.title': 'Lo que dicen', 'badges.title': 'Certificaciones & Badges',
            'presentation.slide1': 'Analista Programador Universitario & Estudiante de Data Science / IA', 'presentation.slide1b': 'Full-Stack Developer • React • Python • Machine Learning',
            'presentation.slide2': 'React · TypeScript · Node.js · Python · Pandas · Scikit-learn · Figma · Git · Vercel', 'presentation.slide2b': 'Desarrollo web moderno + Ciencia de datos aplicada',
            'presentation.slide3': 'DeliMarket · Contax · Cuentas Claras · PortaFlores', 'presentation.slide3b': 'Apps propias desplegadas en Vercel con PWA, offline-first y UI/UX cuidada',
            'presentation.slide4a': 'UNJu — Analista Programador Universitario', 'presentation.slide4b': 'IES N°6 — Tec. en Ciencias de Datos e IA', 'presentation.slide4c': 'Autodidacta en React, Three.js, Design Systems y DevOps',
            'presentation.slide5': 'juanmks86@gmail.com', 'presentation.slide5b': 'github.com/juanmks86-debug'
        },
        en: {
            'nav.about': 'About Me', 'nav.skills': 'Skills', 'nav.github': 'GitHub Live', 'nav.portfolio': 'Projects', 'nav.clients': 'Education', 'nav.podcast': 'Podcast', 'nav.blog': 'Blog',
            'hero.greeting': 'I am,', 'hero.cv': 'Download CV', 'hero.contact': 'Contact', 'hero.portfolio': 'Portfolio', 'hero.repos': 'GitHub Repos', 'hero.followers': 'GitHub Followers', 'hero.formation': 'Education: UNJu & IES N°6', 'hero.tagline': 'Full-Stack Dev<br>& Data Science / AI.',
            'spotify.listening': 'Now playing on Spotify',
            'skills.title': 'Skills & Tech Stack ↗', 'skills.desc': 'Tools and technologies I master for web development and UI/UX design.',
            'github.title': 'GitHub Live & Code ↗', 'github.desc': 'Live repositories, contributions and recent synced activity.', 'github.placeholder': 'Enter a GitHub username...', 'github.load': 'Load Data',
            'portfolio.title': 'Selected Projects ↗', 'portfolio.desc': 'Own apps, this portfolio and college work — web development, systems and data & AI.',
            'filter.all': 'All', 'filter.webapp': 'Web Apps / PWA', 'filter.data': 'Data & AI', 'filter.frontend': 'Frontend / UI', 'filter.sistemas': 'Systems / Infrastructure',
            'clients.title': 'Academic Background ↗', 'clients.desc': 'My university and technical journey in software development, data and artificial intelligence.',
            'podcast.title': 'Podcasts I follow ↗', 'podcast.desc': 'Technology shows I listen to regularly — open in a new tab.',
            'blog.title': 'Tech Blog ↗', 'blog.desc': 'Notes, insights and reflections on web development, data science and artificial intelligence.',
            'contact.title': "Let's talk about your next project!", 'contact.desc': 'Send a message and we will get in touch quickly.', 'contact.name': 'Your Name', 'contact.email': 'Your Email', 'contact.message': 'Message', 'contact.namePlaceholder': 'E.g.: María García', 'contact.emailPlaceholder': 'maria@company.com', 'contact.msgPlaceholder': 'Tell me about your project goals...', 'contact.send': 'Send Message', 'contact.alt': 'Or write me directly at',
            'cv.title': 'Curriculum Vitae — Juan Israel Flores', 'cv.subtitle': 'Full-Stack Developer & Data Science / AI', 'cv.download': 'Download PDF', 'cv.notYet': 'Not available yet? Write me at',
            'edit.title': 'Customize Portfolio', 'edit.desc': 'Modify your profile data in real time.', 'edit.name': 'Full Name', 'edit.email': 'Email Address', 'edit.save': 'Save Changes',
            'terminal.title': 'bash — juan@flores-portfolio ~ (CLI)',
            'chatbot.title': "Juan Israel Flores' Assistant", 'chatbot.online': 'Online', 'chatbot.typing': 'Typing...',
            'blog.read': 'Read post', 'blog.min': 'min',
            'calculator.title': 'CUENTAS CLARAS', 'calculator.capital': 'Capital ($)', 'calculator.rate': 'Annual rate (%)', 'calculator.term': 'Term (months)', 'calculator.type': 'Interest type', 'calculator.compound': 'Compound (capitalizable)', 'calculator.simple': 'Simple', 'calculator.calculate': 'Calculate', 'calculator.final': 'Final Amount', 'calculator.interest': 'Interest', 'calculator.based': 'Based on the app', 'calculator.cc': 'Cuentas Claras',
            'testimonials.title': 'What they say', 'badges.title': 'Certifications & Badges',
            'presentation.slide1': 'University Programming Analyst & Data Science / AI Student', 'presentation.slide1b': 'Full-Stack Developer • React • Python • Machine Learning',
            'presentation.slide2': 'React · TypeScript · Node.js · Python · Pandas · Scikit-learn · Figma · Git · Vercel', 'presentation.slide2b': 'Modern web development + Applied data science',
            'presentation.slide3': 'DeliMarket · Contax · Cuentas Claras · PortaFlores', 'presentation.slide3b': 'Own apps deployed on Vercel with PWA, offline-first and polished UI/UX',
            'presentation.slide4a': 'UNJu — University Programming Analyst', 'presentation.slide4b': 'IES N°6 — Data Science & AI Technician', 'presentation.slide4c': 'Self-taught in React, Three.js, Design Systems and DevOps',
            'presentation.slide5': 'juanmks86@gmail.com', 'presentation.slide5b': 'github.com/juanmks86-debug'
        }
    };

    let currentLang = localStorage.getItem('portfolio-lang') || 'es';
    window.currentLang = currentLang;
    window.i18n = i18n;

    const langToggleBtn = document.getElementById('langToggleBtn');
    const langIcon = document.getElementById('langIcon');

    function translatePage(lang) {
        currentLang = lang;
        window.currentLang = lang;
        localStorage.setItem('portfolio-lang', lang);
        if (langIcon) langIcon.textContent = lang.toUpperCase();

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang] && i18n[lang][key]) {
                const hasFormatChildren = el.querySelector('i, span, strong, br, .arrow-accent');
                if (!hasFormatChildren || el.children.length === 0) {
                    el.innerHTML = i18n[lang][key];
                } else {
                    for (let i = 0; i < el.childNodes.length; i++) {
                        if (el.childNodes[i].nodeType === 3 && el.childNodes[i].textContent.trim()) {
                            el.childNodes[i].textContent = i18n[lang][key];
                            break;
                        }
                    }
                }
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (i18n[lang] && i18n[lang][key]) el.placeholder = i18n[lang][key];
        });

        const titles = {
            es: { about: 'Sobre Mí | Juan Israel Flores', skills: 'Habilidades & Stack | Juan Israel Flores', github: 'GitHub Live | Juan Israel Flores', portfolio: 'Proyectos | Juan Israel Flores', clients: 'Formación | Juan Israel Flores', podcast: 'Podcasts | Juan Israel Flores', blog: 'Blog Técnico | Juan Israel Flores' },
            en: { about: 'About Me | Juan Israel Flores', skills: 'Skills & Stack | Juan Israel Flores', github: 'GitHub Live | Juan Israel Flores', portfolio: 'Projects | Juan Israel Flores', clients: 'Education | Juan Israel Flores', podcast: 'Podcasts | Juan Israel Flores', blog: 'Tech Blog | Juan Israel Flores' }
        };
        const activeTab = document.querySelector('.nav-btn.active');
        if (activeTab && titles[lang] && titles[lang][activeTab.dataset.tab]) {
            document.title = titles[lang][activeTab.dataset.tab];
        }
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', function() {
            translatePage(currentLang === 'es' ? 'en' : 'es');
        });
    }

    translatePage(currentLang);
    window.translatePage = translatePage;
});

// --- F. Calculadora Cuentas Claras ---
document.addEventListener('DOMContentLoaded', function() {
    const capitalInput = document.getElementById('ccCapital');
    const tasaInput = document.getElementById('ccTasa');
    const plazoInput = document.getElementById('ccPlazo');
    const tipoInput = document.getElementById('ccTipo');
    const calcularBtn = document.getElementById('ccCalcularBtn');
    const montoFinalEl = document.getElementById('ccMontoFinal');
    const interesesEl = document.getElementById('ccIntereses');
    const ctx = document.getElementById('ccChart');

    let chartInstance = null;

    function formatMoney(n) {
        return '$' + Math.round(n).toLocaleString('es-AR');
    }

    function calcular() {
        if (!capitalInput || !tasaInput || !plazoInput || !tipoInput) return;
        const capital = parseFloat(capitalInput.value) || 0;
        const tasaAnual = parseFloat(tasaInput.value) || 0;
        const plazoMeses = parseInt(plazoInput.value) || 1;
        const tipo = tipoInput.value;
        const tasaMensual = tasaAnual / 12 / 100;

        const labels = [];
        const dataCapital = [];
        const dataIntereses = [];
        let montoFinal = capital;
        let totalIntereses = 0;

        if (tipo === 'simple') {
            totalIntereses = capital * (tasaAnual / 100) * (plazoMeses / 12);
            montoFinal = capital + totalIntereses;
            for (let i = 0; i <= plazoMeses; i++) {
                labels.push('Mes ' + i);
                dataCapital.push(capital);
                dataIntereses.push(capital + (totalIntereses * (i / plazoMeses)));
            }
        } else {
            for (let i = 0; i <= plazoMeses; i++) {
                labels.push('Mes ' + i);
                const monto = capital * Math.pow(1 + tasaMensual, i);
                dataCapital.push(capital);
                dataIntereses.push(monto);
            }
            montoFinal = dataIntereses[plazoMeses];
            totalIntereses = montoFinal - capital;
        }

        montoFinalEl.textContent = formatMoney(montoFinal);
        interesesEl.textContent = '+' + formatMoney(totalIntereses);

        if (chartInstance) {
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = dataIntereses;
            chartInstance.data.datasets[1].data = dataCapital;
            chartInstance.update('active');
        } else if (ctx) {
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Monto acumulado', data: dataIntereses, borderColor: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.1)', fill: true, tension: 0.4, pointRadius: 2, pointHoverRadius: 5 },
                        { label: 'Capital inicial', data: dataCapital, borderColor: '#92400E', borderDash: [5, 5], pointRadius: 0, fill: false, tension: 0 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true, labels: { font: { size: 10 }, boxWidth: 10 } },
                        tooltip: { callbacks: { label: function(c) { return c.dataset.label + ': ' + formatMoney(c.parsed.y); } } }
                    },
                    scales: {
                        x: { ticks: { font: { size: 9 }, maxTicksLimit: 6 }, grid: { display: false } },
                        y: { ticks: { font: { size: 9 }, callback: function(v) { if (v >= 1000000) return '$' + (v/1000000).toFixed(1) + 'M'; if (v >= 1000) return '$' + (v/1000).toFixed(0) + 'k'; return '$' + v; } }, grid: { color: 'rgba(0,0,0,0.05)' } }
                    },
                    interaction: { intersect: false, mode: 'index' }
                }
            });
        }
    }

    if (calcularBtn) calcularBtn.addEventListener('click', calcular);
    if (capitalInput) capitalInput.addEventListener('input', calcular);
    if (tasaInput) tasaInput.addEventListener('input', calcular);
    if (plazoInput) plazoInput.addEventListener('input', calcular);
    if (tipoInput) tipoInput.addEventListener('change', calcular);
    // Solo calcular si existen los elementos
    if (capitalInput && tasaInput && plazoInput && tipoInput) calcular();
});

// --- G. Mapa Mental Modal ---
document.addEventListener('DOMContentLoaded', function() {
    const mapaModal = document.getElementById('mapaModal');
    const openMapaBtn = document.getElementById('openMapaModal');
    const closeMapaBtn = document.getElementById('closeMapaModal');

    if (openMapaBtn && mapaModal) {
        openMapaBtn.addEventListener('click', function() {
            mapaModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    if (closeMapaBtn && mapaModal) {
        closeMapaBtn.addEventListener('click', function() {
            mapaModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    if (mapaModal) {
        mapaModal.addEventListener('click', function(e) {
            if (e.target === mapaModal) {
                mapaModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// --- H. Modo Presentación ---
(function initPresentation() {
    'use strict';
    const presentationOverlay = document.getElementById('presentationOverlay');
    const presentationBtn = document.getElementById('presentationBtn');
    const presentationExit = document.getElementById('presentationExit');
    const presentationPrev = document.getElementById('presentationPrev');
    const presentationNext = document.getElementById('presentationNext');
    const presentationCounter = document.getElementById('presentationCounter');
    const presentationProgress = document.getElementById('presentationProgress');
    const slides = document.querySelectorAll('.presentation-slide');
    let currentSlide = 0;
    let autoPlay = null;

    console.log('[Presentation] Init - overlay:', !!presentationOverlay, 'btn:', !!presentationBtn, 'slides:', slides.length);

    if (!presentationOverlay || !presentationBtn || slides.length === 0) {
        console.warn('[Presentation] Faltan elementos necesarios');
        return;
    }

    function showSlide(n) {
        slides.forEach((s, i) => s.classList.toggle('active', i === n));
        currentSlide = n;
        if (presentationCounter) presentationCounter.textContent = (n + 1) + ' / ' + slides.length;
        if (presentationProgress) presentationProgress.style.width = ((n + 1) / slides.length * 100) + '%';
    }

    function nextSlide() { showSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0); }
    function prevSlide() { showSlide(currentSlide > 0 ? currentSlide - 1 : slides.length - 1); }

    window.startPresentation = function() {
        console.log('[Presentation] Iniciando...');
        presentationOverlay.classList.add('active');
        showSlide(0);
        autoPlay = setInterval(nextSlide, 8000);
        document.body.style.overflow = 'hidden';
    };

    window.stopPresentation = function() {
        console.log('[Presentation] Cerrando...');
        presentationOverlay.classList.remove('active');
        clearInterval(autoPlay);
        document.body.style.overflow = '';
    };

    presentationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.startPresentation();
    });

    if (presentationExit) presentationExit.addEventListener('click', window.stopPresentation);
    if (presentationNext) presentationNext.addEventListener('click', () => { clearInterval(autoPlay); nextSlide(); autoPlay = setInterval(nextSlide, 8000); });
    if (presentationPrev) presentationPrev.addEventListener('click', () => { clearInterval(autoPlay); prevSlide(); autoPlay = setInterval(nextSlide, 8000); });

    document.addEventListener('keydown', function(e) {
        if (!presentationOverlay.classList.contains('active')) return;
        if (e.key === 'Escape') window.stopPresentation();
        if (e.key === 'ArrowRight') { clearInterval(autoPlay); nextSlide(); autoPlay = setInterval(nextSlide, 8000); }
        if (e.key === 'ArrowLeft') { clearInterval(autoPlay); prevSlide(); autoPlay = setInterval(nextSlide, 8000); }
    });

    console.log('[Presentation] Listo - click en el botón de pizarra para iniciar');
})();

// --- I. Konami Code + Confetti ---
document.addEventListener('DOMContentLoaded', function() {
    const konamiSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiIndex = 0;

    const konamiMsg = document.createElement('div');
    konamiMsg.className = 'konami-message';
    konamiMsg.innerHTML = '🎉 ¡Código Konami activado!<br><small>Sos un verdadero dev. Seguí así.</small>';
    document.body.appendChild(konamiMsg);

    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;';
    document.body.appendChild(confettiCanvas);
    const ctx = confettiCanvas.getContext('2d');

    function fireConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        const particles = [];
        const colors = ['#8B5CF6', '#34D399', '#FBBF24', '#F472B6', '#60A5FA', '#A78BFA'];
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: window.innerWidth / 2, y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20 - 5,
                size: Math.random() * 8 + 4, color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 10, life: 1
            });
        }
        function animate() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            let alive = false;
            particles.forEach(p => {
                if (p.life <= 0) return;
                alive = true;
                p.x += p.vx; p.y += p.vy; p.vy += 0.3; p.life -= 0.008; p.rotation += p.rotSpeed;
                ctx.save();
                ctx.translate(p.x, p.y); ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color; ctx.globalAlpha = p.life;
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                ctx.restore();
            });
            if (alive) requestAnimationFrame(animate);
            else ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
        animate();
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiSequence[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiSequence.length) {
                konamiIndex = 0;
                konamiMsg.classList.add('show');
                fireConfetti();
                setTimeout(() => konamiMsg.classList.remove('show'), 4000);
            }
        } else {
            konamiIndex = 0;
        }
    });
});

// --- J. Contador de Visitas ---
document.addEventListener('DOMContentLoaded', function() {
    const visitCounter = document.createElement('div');
    visitCounter.className = 'visit-counter';
    visitCounter.innerHTML = '<i class="fa-solid fa-eye"></i> <span id="visitCount">...</span> <span data-i18n="footer.visits">visitas</span>';
    document.body.appendChild(visitCounter);

    (async function loadVisits() {
        const countEl = document.getElementById('visitCount');
        if (!countEl) return;
        try {
            const res = await fetch('https://api.countapi.xyz/hit/juanisraelflores-portfolio/visits');
            const data = await res.json();
            countEl.textContent = data.value.toLocaleString();
        } catch (e) {
            countEl.textContent = '∞';
        }
    })();
});

// --- K. Toast Helper Global ---
window.showToast = function(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.style.cssText = 'background:#1F2937;color:#fff;padding:12px 20px;border-radius:10px;font-size:13px;margin-bottom:8px;animation:msgPop 0.3s ease;box-shadow:0 4px 12px rgba(0,0,0,0.15);';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
};

// --- L. AOS Init ---
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
    }
});


// --- M. Carrusel de Logos en Hero ---
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('logoCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.logo-slide');
    const dots = carousel.querySelectorAll('.logo-dot');
    let currentIndex = 0;
    let autoPlay = null;

    function showSlide(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        currentIndex = index;
    }

    function nextSlide() {
        showSlide((currentIndex + 1) % slides.length);
    }

    function startAutoPlay() {
        autoPlay = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlay);
    }

    // Click en dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            stopAutoPlay();
            showSlide(i);
            startAutoPlay();
        });
    });

    // Pausar al hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Click en la card → ir al tab de formación
    const card = document.getElementById('openClientsModal');
    if (card) {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.logo-dot')) return;
            document.querySelector('.nav-btn[data-tab="clients"]')?.click();
        });
    }

    startAutoPlay();
});

// --- Service Worker Registration ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((reg) => console.log('[SW] Registrado:', reg.scope))
            .catch((err) => console.log('[SW] Error:', err));
    });
}