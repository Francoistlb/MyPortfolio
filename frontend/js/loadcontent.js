// Script pour charger le contenu dynamiquement
document.addEventListener('DOMContentLoaded', function () {
    const dynamicContent = document.getElementById('dynamic-content');

    // Ajouter un événement à tous les éléments ayant un ID spécifique
    document.addEventListener('click', function (event) {
        const target = event.target.closest('.open') || 
        event.target.closest('.menu-btn') || 
        event.target.closest('.config') || 
        event.target.closest('.backhome') ||
        event.target.closest('.out'); 
        if (!target) return;

        const id = target.id; // Récupérer l'ID de l'élément cliqué
        console.log('Élément cliqué :', id);
        let pageToLoad = '';

        // Définir quelle page charger en fonction de l'ID
        switch (id) {
            case 'contact':
                pageToLoad = './components/contact.html';
                break;
            case 'menu-contact':
                pageToLoad = './components/contact.html';
                break;
            case 'about':
                pageToLoad = './components/about.html';
                break;
            case 'menu-about':
                pageToLoad = './components/about.html';
                break;
            case 'projects':
                pageToLoad = './components/projects.html';
                break;
            case 'menu-projects':
                pageToLoad = './components/projects.html';
                break;
            case 'menu-home':
                pageToLoad = '../components/home.html';
                break;
            case 'config':
                pageToLoad = './components/login.html';
                break;
            case 'out':
                console.log('Déconnexion en cours...');
                fetch('/index.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'action=logout'
                })
                .then(response => {
                    console.log('Réponse reçue:', response);
                    window.location.href = '/index.html';
                })
                .catch(error => {
                    console.error('Erreur détaillée:', error);
                });
                return;
            case 'backhome':
                pageToLoad = 'home.html';
                break;
            default:
                console.warn('Aucune page définie pour cet ID:', id);
                return;
        }

        // Charger la page via fetch si pageToLoad est défini
        if (pageToLoad) {
            fetch(pageToLoad)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur de chargement : ' + response.statusText);
                    }
                    return response.text();
                })
                .then(html => {
                    dynamicContent.innerHTML = html;
                    // Appliquer l'animation de transition
                    setTimeout(() => {
                        dynamicContent.style.opacity = '1';
                    }, 300);
                })
                .catch(error => {
                    console.error('Erreur de chargement dynamique :', error);
                });
        }
    });
});

function cv() {
    window.open('/assets/documents/cv.pdf', '_blank');
}
