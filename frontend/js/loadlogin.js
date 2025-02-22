// On écoute les clics sur le document
document.addEventListener('click', function(event) {
    // Si l'élément cliqué a l'ID 'config' ou est un enfant de l'élément avec l'ID 'config'
    const configButton = event.target.closest('#config');
    if (configButton) {
        loadAndAnimateLogin();
    }
});

// Fonction pour charger et animer le login
function loadAndAnimateLogin() {
    const dynamicContent = document.getElementById('dynamic-content');
    
    fetch('./components/login.html')
        .then(response => response.text())
        .then(html => {
            // Insérer le HTML
            dynamicContent.innerHTML = html;
            
            // Animer après un court délai pour s'assurer que le DOM est prêt
            setTimeout(() => {
                const loginDive = document.getElementById('login-dive');
                if (loginDive) {
                    loginDive.style.opacity = '1';
                    loginDive.style.transform = 'scale(0.7)';
                }
            }, 50);
        })
        .catch(error => console.error('Erreur:', error));
}