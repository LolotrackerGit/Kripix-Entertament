console.log("Kripix System: Avvio Universale.");

// --- 1. GESTIONE HAMBURGER MENU ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if(hamburger && navMenu) {
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    newHamburger.addEventListener("click", () => {
        newHamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// --- 2. GESTIONE ACCOUNT / LOGIN ---
const navbarList = document.querySelector('.nav-menu') || document.querySelector('.nav-links');

if (navbarList) {
    let user = null;
    let color = '#e3c66c';

    // Lettura sicura dei dati
    try {
        user = localStorage.getItem('kripix_user');
        if(localStorage.getItem('kripix_color')) {
            color = localStorage.getItem('kripix_color');
        }
    } catch (e) {
        console.warn("Attenzione: Impossibile leggere dati utente.");
    }

    // Pulizia vecchi elementi
    const oldAuth = document.getElementById('auth-item');
    if (oldAuth) oldAuth.remove();

    // Creazione elemento menu
    const li = document.createElement('li');
    li.id = 'auth-item';
    li.className = 'nav-user-container';

    if (user) {
        // --- UTENTE LOGGATO ---
        li.innerHTML = `
            <div class="user-avatar" style="background-color: ${color};" title="${user}">
                ${user.charAt(0).toUpperCase()}
            </div>
            <div class="user-dropdown">
                <div class="user-header">
                    <span class="user-name">${user}</span>
                    <span class="user-role">Agente Operativo</span>
                </div>
                <a href="profilo.html">IL MIO PROFILO</a>
                <a href="libreria.html">Libreria Giochi</a>
                <a href="impostazioni.html">Configurazione</a>
                <a href="#" id="action-logout" style="color:#ff5555">Disconnetti</a>
            </div>
        `;

        // Gestione Click
        li.addEventListener('click', (e) => {
            const dropdown = li.querySelector('.user-dropdown');
            
            // LOGOUT: Pulisce TUTTO (Utente + Giochi)
            if (e.target.id === 'action-logout') {
                e.preventDefault();
                try { 
                    localStorage.removeItem('kripix_user'); 
                    localStorage.removeItem('kripix_color');
                    localStorage.removeItem('owned_game_harrow'); // <--- AGGIUNTO: Resetta anche il gioco
                } catch(e){}
                
                window.location.href = 'index.html'; // Torna alla home
                return;
            }

            // Toggle Menu
            if (e.target.closest('.user-avatar')) {
                dropdown.classList.toggle('show');
            }
        });

        // Chiudi cliccando fuori
        document.addEventListener('click', (e) => {
            const dropdown = li.querySelector('.user-dropdown');
            if (dropdown && !li.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

    } else {
        // --- NON LOGGATO ---
        li.innerHTML = `<a href="login.html" class="btn-login-nav">ACCEDI</a>`;
    }

    // Posizionamento nella navbar (Prima di Scarica App)
    const dlBtn = navbarList.querySelector('.btn-launcher');
    if (dlBtn) {
        navbarList.insertBefore(li, dlBtn.closest('li'));
    } else {
        navbarList.appendChild(li);
    }

} else {
    console.error("ERRORE: Navbar non trovata su questa pagina.");
}
