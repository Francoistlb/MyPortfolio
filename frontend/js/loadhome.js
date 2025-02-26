document.addEventListener('DOMContentLoaded', function () {
    const dynamicContent = document.getElementById('dynamic-content');
    const modal = document.getElementById('welcome-modal');
    const visitButton = document.getElementById('visit-button');
    const welcomeDiv = document.getElementById('welcome-div');

    // Vérifier si les éléments existent avant d'ajouter les écouteurs
    if (visitButton && modal && dynamicContent && welcomeDiv) {
        // Animation d'entrée
        setTimeout(() => {
            welcomeDiv.classList.remove('opacity-0', 'scale-50');
            welcomeDiv.classList.add('opacity-100', 'scale-100');
        }, 100);

        visitButton.addEventListener('click', function () {
            // Animation de sortie
            modal.style.opacity = '1';
            modal.style.transition = 'opacity 0.5s ease-out';
            modal.style.opacity = '0';

            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);

            // Charger le contenu avec anti-cache
            const cacheBuster = '?v=' + new Date().getTime();
            
            fetch('./components/home.html' + cacheBuster, {
                cache: 'no-store', // Désactiver le cache
                headers: {
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Expires': '0'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur de chargement : ' + response.statusText);
                    }
                    return response.text();
                })
                .then(html => {
                    dynamicContent.innerHTML = html;
                    dynamicContent.style.opacity = '1';
                    console.log('Home content loaded with timestamp:', new Date().getTime());
                })
                .catch(error => {
                    console.error('Erreur de chargement dynamique :', error);
                });
        });
    } else {
        console.error('Un ou plusieurs éléments nécessaires sont manquants');
    }
});