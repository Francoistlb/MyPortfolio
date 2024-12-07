// Script pour charger le contenu dynamiquement
document.addEventListener('DOMContentLoaded', function () {
    const dynamicContent = document.getElementById('dynamic-content');

    // Ajouter un événement à tous les éléments ayant un ID spécifique
    document.addEventListener('click', function (event) {
        const target = event.target.closest('.open') || event.target.closest('.menu-btn'); // Vérifie si un élément parent a la classe "open"
        if (!target) return;

        const id = target.id; // Récupérer l'ID de l'élément cliqué
        let pageToLoad = '';

        // Définir quelle page charger en fonction de l'ID
        switch (id) {
            case 'contact':
                pageToLoad = 'contact.html';
                break;
            case 'menu-contact':
                pageToLoad = 'contact.html';
                break;
            case 'about':
                pageToLoad = 'about.html';
                break;
            case 'menu-about':
                pageToLoad = 'about.html';
                break;
            case 'projects':
                pageToLoad = 'projects.html';
                break;
            case 'menu-projects':
                pageToLoad = 'projects.html';
                break;
            case 'menu-home':
                pageToLoad = 'index.html';
                break;
            default:
                console.warn('Aucune page définie pour cet ID:', id);
                return;
        }

        // Charger la page via fetch
        fetch(pageToLoad)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de chargement : ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                // Insérer le contenu chargé dans le div
                dynamicContent.innerHTML = html;

               // Appliquer l'animation de transition une fois le contenu chargé
               setTimeout(() => {
                dynamicContent.style.opacity = '1';
            }, 300);  // Petit délai avant de commencer l'animation pour éviter le flash
            })
            .catch(error => {
                console.error('Erreur de chargement dynamique :', error);
            });
    });
});

function cv() {
    window.open('/assets/documents/cv.pdf', '_blank');
}
