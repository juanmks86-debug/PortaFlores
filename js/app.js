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

    // --- 2. Dark / Light Theme Toggle ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = savedTheme === 'dark' 
            ? '<i class="fa-solid fa-sun"></i>' 
            : '<i class="fa-solid fa-moon"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            playUiSound('click');
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            themeToggleBtn.innerHTML = newTheme === 'dark' 
                ? '<i class="fa-solid fa-sun"></i>' 
                : '<i class="fa-solid fa-moon"></i>';
            
            showToast(newTheme === 'dark' ? '🌙 Modo Oscuro Activado' : '☀️ Modo Claro Activado');
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

    // --- 5. 3D Canvas Sphere Animation ---
    const initSphereCanvas = () => {
        const canvas = document.getElementById('sphereCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height, angle = 0;
        let animFrame = null;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            width = canvas.width = parent.clientWidth || 90;
            height = canvas.height = parent.clientHeight || 90;
        };

        const drawSphere = () => {
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) * 0.38;

            const glowGradient = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius * 1.4);
            glowGradient.addColorStop(0, 'rgba(229, 123, 229, 0.9)');
            glowGradient.addColorStop(0.5, 'rgba(126, 123, 230, 0.7)');
            glowGradient.addColorStop(1, 'rgba(14, 14, 16, 0)');

            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 1.4, 0, Math.PI * 2);
            ctx.fill();

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);

            for (let i = 0; i < 6; i++) {
                ctx.beginPath();
                ctx.ellipse(0, 0, radius, radius * Math.cos(angle + i), angle + i, 0, Math.PI * 2);
                ctx.strokeStyle = `hsl(${(angle * 50 + i * 30) % 360}, 80%, 70%)`;
                ctx.lineWidth = 1.8;
                ctx.stroke();
            }

            ctx.restore();

            angle += 0.015;
            animFrame = requestAnimationFrame(drawSphere);
        };

        resize();
        drawSphere();

        // Recalcular al redimensionar la ventana
        window.addEventListener('resize', () => {
            resize();
        });
    };

    initSphereCanvas();

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

    // --- 9. Podcast Audio Player Logic ---
    let isPlayingAudio = false;
    const mainAudioPlayBtn = document.getElementById('mainAudioPlayBtn');
    const equalizer = document.getElementById('equalizer');
    const nowPlayingTitle = document.getElementById('nowPlayingTitle');
    const episodePlayBtns = document.querySelectorAll('.play-ep-btn');

    const toggleAudioPlay = (title = null) => {
        playUiSound('click');
        if (title) {
            nowPlayingTitle.textContent = title;
            isPlayingAudio = true;
        } else {
            isPlayingAudio = !isPlayingAudio;
        }

        if (isPlayingAudio) {
            mainAudioPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            equalizer?.classList.add('playing');
            showToast(`▶ Reproduciendo: ${nowPlayingTitle.textContent}`);
        } else {
            mainAudioPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            equalizer?.classList.remove('playing');
            showToast('⏸️ Reproducción pausada');
        }
    };

    if (mainAudioPlayBtn) {
        mainAudioPlayBtn.addEventListener('click', () => toggleAudioPlay());
    }

    episodePlayBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.episode-card');
            const title = card ? card.getAttribute('data-title') : 'Episodio de Podcast';
            toggleAudioPlay(title);
        });
    });

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
