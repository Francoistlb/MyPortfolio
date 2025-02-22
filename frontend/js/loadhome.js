document.addEventListener('DOMContentLoaded', function () {
    const dynamicContent = document.getElementById('dynamic-content');
    const modal = document.getElementById('welcome-modal');
    const visitButton = document.getElementById('visit-button');

    // Cacher la modale et charger le contenu au clic sur "Visiter"
    visitButton.addEventListener('click', function () {
        // Ajouter une animation de disparition
        modal.style.opacity = '1';
        modal.style.transition = 'opacity 0.5s ease-out';
        modal.style.opacity = '0';

        // Supprimer la modale après l'animation
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);

        // Charger le contenu initial (par exemple "home.html")
        fetch('./components/home.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de chargement : ' + response.statusText);
                }
                return response.text();
            })
            .then(html => {
                dynamicContent.innerHTML = html;
                dynamicContent.style.opacity = '1'; // Réappliquer l'opacité
            })
            .catch(error => {
                console.error('Erreur de chargement dynamique :', error);
            });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const welcomeDiv = document.getElementById('welcome-div');
    
    // Ajoutez une petite temporisation pour un effet plus fluide
    setTimeout(() => {
        welcomeDiv.classList.remove('opacity-0', 'scale-50');
        welcomeDiv.classList.add('opacity-100', 'scale-60');
    }, 100); // Le délai avant que l'animation ne commence (100ms ici)
});