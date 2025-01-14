document.addEventListener('DOMContentLoaded', function () {
    const dynamicContent = document.getElementById('dynamic-content');
    const loginModal = document.getElementById('login-modal');
    const visitButton = document.getElementById('visit-button'); // Ce bouton ouvre le modal de bienvenue
    const backhomeButton = document.getElementById('backhome'); // Ce bouton ferme le modal de connexion
    const loginDive = document.getElementById('login-dive'); // La div à l'intérieur du modal

    // Ouvrir le modal de connexion (par exemple, au clic sur un bouton ou une autre logique)
    visitButton.addEventListener('click', function () {
        // Afficher le modal avec une animation
        loginModal.style.display = 'flex';
        setTimeout(() => {
            loginDive.style.opacity = '1';
            loginDive.style.transform = 'scale(1)';
        }, 50); // Un petit délai pour permettre l'affichage avant la transition
    });

    // Fermer le modal et charger la page initiale au clic sur le bouton "Retour"
    backhomeButton.addEventListener('click', function () {    
        // Ajouter une animation de disparition
        loginDive.style.opacity = '1';
        loginDive.style.transform = 'scale(0.5)';
        
        // Supprimer le modal après l'animation
        setTimeout(() => {
            loginModal.style.display = 'none';
        }, 500); // Temps pour permettre à l'animation de se jouer

        // Charger le contenu initial (par exemple "home.html")
        fetch('home.html')
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

    // Fermer le modal en cliquant sur le fond autour du modal
    loginModal.addEventListener('click', function (event) {
        // Vérifie si l'utilisateur a cliqué en dehors du modal (fond noir)
        if (event.target === loginModal) {
            // Ajouter une animation de disparition
            loginDive.style.opacity = '0';
            loginDive.style.transform = 'scale(0.5)';
            
            // Supprimer le modal après l'animation
            setTimeout(() => {
                loginModal.style.display = 'none';
            }, 500); // Temps pour permettre à l'animation de se jouer

            // Charger la page d'accueil (home.html)
            fetch('home.html')
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
        }
    });
});
