// Déclaration des variables et fonctions globales
let globalCvPath = '/shared-assets/documents/cv.pdf';

function cv() {
    console.log('Téléchargement du CV depuis:', globalCvPath);
    window.open(globalCvPath, '_blank');
}

// Exposer la fonction cv au scope global pour l'attribut onclick
window.cv = cv;

document.addEventListener('DOMContentLoaded', function() {
    // Déterminer sur quelle page nous sommes
    const isAdminPage = window.location.href.includes('administration');
    const projetsListContainer = document.querySelector('.listprojets');
    
    // Charger les données immédiatement si on est sur la page admin ou si le conteneur de projets existe
    if (isAdminPage || projetsListContainer) {
        loadAdminData();
    }
    
    // Si nous sommes sur la page d'administration, ajuster la mise en page après le chargement
    if (isAdminPage) {
        // Attendre que les données soient chargées
        setTimeout(() => {
            // Forcer un recalcul de la mise en page
            const experiencesContainer = document.querySelector('.experiencelist');
            const diplomesContainer = document.querySelector('.diplomelist');
            const projetsContainer = document.querySelector('.projetslist');
            const projetsContainerModif = document.querySelector('.projetslistmodif');

            if (experiencesContainer) {
                experiencesContainer.style.display = 'none';
                setTimeout(() => { experiencesContainer.style.display = ''; }, 10);
            }
            
            if (diplomesContainer) {
                diplomesContainer.style.display = 'none';
                setTimeout(() => { diplomesContainer.style.display = ''; }, 10);
            }

            if (projetsContainer) {
                projetsContainer.style.display = 'none';
                setTimeout(() => { projetsContainer.style.display = ''; }, 10);
            }

            if (projetsListContainer) {
                projetsListContainer.style.display = 'none';
                setTimeout(() => { projetsListContainer.style.display = ''; }, 10);
            }

            if (projetsContainerModif) {
                projetsContainerModif.style.display = 'none';
                setTimeout(() => { projetsContainerModif.style.display = ''; }, 10);
            }
        }, 500);
    }
    
    // Observer les changements dans le DOM pour détecter quand home.html est chargé
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Vérifier si les conteneurs sont ajoutés
                const containers = {
                    diplomelist: document.querySelector('.diplomelist'),
                    experiencelist: document.querySelector('.experiencelist'),
                    ville: document.querySelector('.ville'),
                    age: document.querySelector('.age'),
                    telephone: document.querySelector('.telephone'),
                    email: document.querySelector('.email'),
                    listprojets: document.querySelector('.listprojets')
                };

                // Vérifier si un des conteneurs existe et est vide
                const needsReload = Object.values(containers).some(container => 
                    container && container.children.length === 0
                );

                if (needsReload) {
                    console.log('Conteneurs détectés vides, rechargement des données');
                    
                    // Déconnecter temporairement l'observateur pendant le chargement
                    observer.disconnect();
                    
                    // Charger les données
                    loadAdminData().then(() => {
                        // Une fois les données chargées, vérifier si nous devons défiler vers un projet
                        const scrollToId = sessionStorage.getItem('scrollToProject');
                        if (scrollToId && containers.listprojets) {
                            setTimeout(() => {
                                const element = document.getElementById(scrollToId);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    sessionStorage.removeItem('scrollToProject');
                                }
                            }, 500);
                        }
                        
                        // Reconnecter l'observateur
                        const dynamicContent = document.getElementById('dynamic-content');
                        if (dynamicContent) {
                            observer.observe(dynamicContent, { childList: true, subtree: true });
                        }
                    });
                }
            }
        });
    });
    
    // Observer les changements dans #dynamic-content
    const dynamicContent = document.getElementById('dynamic-content');
    if (dynamicContent) {
        observer.observe(dynamicContent, { childList: true, subtree: true });
    }

    // Vérifier si nous sommes sur la page des projets
    if (window.location.pathname.includes('projects.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const scrollToId = urlParams.get('scrollTo');
        
        if (scrollToId) {
            // Attendre que les projets soient chargés
            const checkElement = setInterval(() => {
                const element = document.getElementById(scrollToId);
                if (element) {
                    clearInterval(checkElement);
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500); // Délai pour laisser le temps au contenu de se charger complètement
                }
            }, 100);
        }
    }
});

async function loadAdminData() {
    try {
        console.log('Début du chargement des données');
        const response = await fetch('/index.php?action=getAdminData');
        const data = await response.json();
        
        if (data.success) {
            if (data.data.informations) {
                updateBio(data.data.informations);
                updatePoste(data.data.informations);
                updateImage(data.data.informations);
                updateCvLink(data.data.informations);
                updateVille(data.data.informations);
                updateAge(data.data.informations);
                updateTelephone(data.data.informations);
                updateEmail(data.data.informations);
            }
            if (data.data.diplomes) {
                updateDiplomes(data.data.diplomes);
            }
            if (data.data.experiences) {
                updateExperiences(data.data.experiences);
            }
            if (data.data.competences) {
                updateCompetences(data.data.competences);
                updateCompetencesAdmin(data.data.competences);
            }
            if (data.data.projets) {
                updateProjets(data.data.projets);
                updateProjetsList(data.data.projets);
                updateProjetModif(data.data.projets);
            }
            if (data.data.recommandations) {
                showRecommandation(data.data.recommandations);
            }
        }
        return true; // Indique que le chargement s'est bien terminé
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        return false; // Indique que le chargement a échoué
    }
}

function updatePoste(informations) {
    const posteContainer = document.querySelector('.poste');
    
    if (!posteContainer) {
        console.error('Container .poste non trouvé');
        return;
    }
    posteContainer.innerHTML = `<p class="text-[20px] font-bold">${informations.Poste || ''}</p>`;
}

function updateBio(informations) {
    const bioContainer = document.querySelector('.bio');
    
    if (!bioContainer) {
        console.error('Container .bio non trouvé');
        return;
    }
    // Accéder directement à la propriété Bio de l'objet informations
    bioContainer.innerHTML = `<p>${informations.Bio || ''}</p>`;
}

function updateVille(informations) {
    const villeContainer = document.querySelector('.ville');
    
    if (!villeContainer) {
        console.error('Container .ville non trouvé');
        return;
    }
    console.log('Ville reçue:', informations.Ville);
    villeContainer.innerHTML = `<p class="icon-profil py-1 px-3">${informations.Ville || 'Non spécifié'}</p>`;
}

function updateAge(informations) {
    const ageContainer = document.querySelector('.age');
    
    if (!ageContainer) {
        console.error('Container .age non trouvé');
        return;
    }
    console.log('Age reçu:', informations.Age);
    ageContainer.innerHTML = `<p class="icon-profil py-1 px-3">${informations.Age || 'Non spécifié'}</p>`;
}

function updateTelephone(informations) {
    const telephoneContainer = document.querySelector('.telephone');
    
    if (!telephoneContainer) {
        console.error('Container .telephone non trouvé');
        return;
    }
    telephoneContainer.innerHTML = `<p class="contact">${informations.Telephone || 'Non spécifié'}</p>`;
}

function updateEmail(informations) {
    const emailContainer = document.querySelector('.email');
    
    if (!emailContainer) {
        console.error('Container .email non trouvé');
        return; 
    }
    emailContainer.innerHTML = `<p class="contact">${informations.Email || 'Non spécifié'}</p>`;
}

function updateImage(informations) {
    const imageContainer = document.querySelector('.photoprofil');
    
    if (!imageContainer) {
        console.error('Container .photoprofil non trouvé');
        return;
    }
    
    // Utiliser directement le chemin stocké en base de données
    const imagePath = informations.Photo || '/shared-assets/image/profile.png';
   
    // Version originale avec bg-[10px_0px] pour le positionnement spécifique
    imageContainer.innerHTML = `<div class="h-[150px] w-[150px] rounded-full bg-cover bg-[10px_0px]" style="background-image: url('${imagePath}');"></div>`;
}

function updateCvLink(informations) {
    // Mettre à jour la variable globale avec le chemin du CV
    globalCvPath = informations.Cv || '/shared-assets/documents/cv.pdf';
}

function updateDiplomes(diplomes) {
    const diplomesContainer = document.querySelector('.diplomelist');
    
    if (!diplomesContainer) {
        console.error('Container .diplomelist non trouvé');
        return;
    }

    if (!Array.isArray(diplomes)) {
        console.error('diplomes n\'est pas un tableau:', diplomes);
        return;
    }

    const html = diplomes.map(diplome => `
        <div class="rounded-md flex items-stretch py-3">
            <div class="w-[15%] relative">
                <div class="absolute top-0 bottom-0 left-1/2 w-[3px] -translate-x-1/2 bg-black"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img class="h-[40px] w-[40px]" src="../assets/icon_design/row.svg"> 
                </div>
            </div>
            <div class="list w-[85%] p-2">
                <p class="exp-title">${diplome.Titre || ''}</p>
                <p class="exp-text">${diplome.Periode || ''}</p>
                <p class="exp-text">${diplome.Ecole || ''}</p>
            </div>
        </div>
        
    `).join('')+ `
    <div class="flex justify-center">
        <div class="w-1/2 h-[4px] rounded" style="background-color: rgb(53, 129, 123);"></div>
    </div>`;

    diplomesContainer.innerHTML = html;
}

function updateExperiences(experiences) {
    const experiencesContainer = document.querySelector('.experiencelist');
    
    if (!experiencesContainer) {
        console.error('Container .expériences non trouvé');
        return;
    }

    // Trier les expériences par ID décroissant
    const sortedExperiences = [...experiences].sort((a, b) => b.Id - a.Id);

    const html = sortedExperiences.map(experience => `
        <div class="rounded-md flex relative">
            <div class="w-[15%] relative">
                <div class="absolute top-0 bottom-0 left-1/2 w-[3px] -translate-x-1/2 bg-black"></div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img class="h-[40px] w-[40px]" src="../assets/icon_design/row.svg"> 
                </div>
            </div>
            <div class="w-[85%] py-1">
                <div class="list p-2">
                    <p class="exp-title">${experience.Titre || ''}</p>
                    <p class="exp-text">${experience.Periode || ''}</p>
                    <p class="exp-text">${experience.Entreprise || ''}</p>
                </div>
            </div>
        </div>
    `).join('') + `
    <div class="flex justify-center mt-2">
        <div class="w-1/2 h-[4px] rounded" style="background-color: rgb(53, 129, 123);"></div>
    </div>`;

    experiencesContainer.innerHTML = html;
}

function updateCompetences(competences) {
    const competencesContainer = document.querySelector('.competenceslist');
    
    if (!competencesContainer) {
        console.error('Container des compétences non trouvé');
        return;
    }
    
    // Remplacer les classes existantes pour une grille fixe
    competencesContainer.className = 'competenceslist grid grid-cols-4 gap-4 p-2';
    
    let html = '';
    console.log(`Nombre de compétences: ${competences.length}`);
    
    competences.forEach(competence => {
        html += `<div class="flex justify-center items-center">
                    <img class="h-[40px] w-[40px]" src="${competence.Image}" alt="${competence.Nom}" title="${competence.Nom}">
                </div>`;
    });
    
    competencesContainer.innerHTML = html || '<p class="text-center w-full text-gray-400">Aucune compétence disponible</p>';
}

function updateCompetencesAdmin(competences) {
    const competencesContainer = document.querySelector('.competenceslistadmin');
    
    if (!competencesContainer) {
        console.error('Container des compétences non trouvé');
        return;
    }
    
    // Remplacer les classes existantes pour une grille fixe
    competencesContainer.className = 'competenceslist grid grid-cols-2 gap-4 p-2';
    
    let html = '';
    competences.forEach((competence, index) => {
        const isRightColumn = index >= competences.length / 2;
        html += `
            <div class="flex items-center ${isRightColumn ? 'justify-between' : 'justify-between'}">
                ${isRightColumn ? `
                    <img class="h-[40px] w-[40px]" src="${competence.Image}" alt="${competence.Nom}" title="${competence.Nom}">
                    <button class="buttonadmin modify-btn" data-type="competence" data-id="${competence.Id}">
                        <img src="../assets/icon_design/editer1.svg"  class="h-[20px] w-[20px]">
                    </button>
                ` : `
                    <img class="h-[40px] w-[40px]" src="${competence.Image}" alt="${competence.Nom}" title="${competence.Nom}">    
                    <button class="buttonadmin modify-btn" data-type="competence" data-id="${competence.Id}">
                        <img src="../assets/icon_design/editer1.svg"  class="h-[20px] w-[20px]">
                    </button>
                `}
            </div>`;
    });
    
    competencesContainer.innerHTML = html || '<p class="text-center w-full text-gray-400">Aucune compétence disponible</p>';
}

function updateProjets(projets) {
    const projetsContainer = document.querySelector('.projetslist');
    
    if (!projetsContainer) {
        console.error('Container .projetslist non trouvé'); 
        return;
    }

    let html = '';
    console.log(`Nombre de projets: ${projets.length}`);

    projets.forEach(projet => {
        console.log('Création du bouton pour le projet:', projet.Id);
        html += `
            <div class="card flex justify-between items-center w-full p-2"> 
                <div class="flex justify-start items-center"> 
                    <img class="mr-5 h-[20px] w-[20px]" src="${projet.Icone}" alt="${projet.Titre}">
                    <p><strong>${projet.Titre}</strong></p>
                </div>
                <button onclick="goToProject('projet-${projet.Id}')" class="hover:scale-110 transition-transform">
                    <img src="assets/icon_design/fleche.svg" alt="Voir le projet" class="h-[15px] w-[15px]">
                </button>
            </div>
        `;
    });

    projetsContainer.innerHTML = html || '<p class="text-center w-full text-gray-400">Aucun projet disponible</p>';
}

function updateProjetModif(projets) {
    const projetsContainer = document.querySelector('.projetslistmodif');

    if (!projetsContainer) {
        console.error('Container .projetslistmodif non trouvé'); 
        return;
    }

    let html = '';
    projets.forEach(projet => {
        html += `
            <div class="card flex justify-between items-center w-full p-2"> 
                <div class="flex justify-start items-center"> 
                    <img class="mr-5 h-[20px] w-[20px]" src="${projet.Icone}" alt="${projet.Titre}">
                    <p><strong>${projet.Titre}</strong></p>
                </div>
                <button id="${projet.Id}" class="buttonadmin modify-btn" data-type="projetmodif">
                   <img src="../assets/icon_design/editer1.svg"  class="h-[20px] w-[20px]">
                </button>
            </div>
        `;
    });   

    projetsContainer.innerHTML = html || '<p class="text-center w-full text-gray-400">Aucun projet disponible</p>';
}

function updateProjetsList(projets) {
    const projetsContainer = document.querySelector('.listprojets');
    
    if (!projetsContainer) {
        console.error('Container .listprojets non trouvé'); 
        return;
    }

    let html = '';
    projets.forEach(projet => {
        console.log('Création de la carte détaillée pour le projet:', projet.Id);
        // Construction des boutons seulement s'ils ont des liens
        let buttonsHtml = '';
        if (projet.Code) {
            buttonsHtml += `
                <div id="code" class="btn-project rounded-md w-[100px]" onclick="window.open('${projet.Code}', '_blank')"> 
                    <p>Code</p>
                    <img src="assets/icon_design/code.svg" alt="">
                </div>`;
        }
        if (projet.Visiter) {
            buttonsHtml += `
                <div id="link" class="btn-project rounded-md w-[100px]" onclick="window.open('${projet.Visiter}', '_blank')"> 
                    <p>Visiter</p>
                    <img src="assets/icon_design/rocket.svg" alt="">
                </div>`;
        }

        // Construction des technologies seulement si elles existent
        let technoHtml = '';
        if (projet.Techno_1 || projet.Techno_2 || projet.Techno_3) {
            technoHtml = '<div class="flex flex-row justify-start justify-center items-center gap-2"><h3>Techno :</h3>';
            if (projet.Techno_1) technoHtml += `<img class="h-[30px] w-[30px]" src="${projet.Techno_1}" alt="">`;
            if (projet.Techno_2) technoHtml += `<img class="h-[30px] w-[30px]" src="${projet.Techno_2}" alt="">`;
            if (projet.Techno_3) technoHtml += `<img class="h-[30px] w-[30px]" src="${projet.Techno_3}" alt="">`;
            technoHtml += '</div>';
        }

        html += `
            <div id="projet-${projet.Id}" class="card-project w-full gap-1"> 
                <div class="h-full p-4"> 
                    <div class="card-project-img bg-[url('${projet.Icone}')] bg-cover">
                        <div class="flex flex-row gap-5">
                            ${buttonsHtml}
                        </div>
                    </div>
                </div>
                <div class="h-full p-4"> 
                    <div class="w-full h-full flex flex-col justify-start gap-2">
                        <h2>${projet.Titre}</h2>
                        <p>${projet.Description || ''}</p>
                        <h3>Compétences clés</h3>
                        <ul>
                            ${projet.Compt_1 ? `<li>${projet.Compt_1}</li>` : ''}
                            ${projet.Compt_2 ? `<li>${projet.Compt_2}</li>` : ''}
                            ${projet.Compt_3 ? `<li>${projet.Compt_3}</li>` : ''}
                        </ul>
                        ${technoHtml}
                    </div>
                </div>  
            </div>
        `;
    });

    projetsContainer.innerHTML = html || '<p class="text-center w-full text-gray-400">Aucun projet disponible</p>';
}

function showRecommandation(recommandations) {
    let currentIndex = 0;

    const modal = document.createElement('div');
    modal.id = 'modal-recom';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50';
    modal.innerHTML = `
        <div class="bg-gray-800 rounded-lg w-[80%] max-w-4xl relative">
            <div class="flex justify-between items-center p-4 border-b border-gray-600">
                <h2 class="text-2xl font-bold text-white">Recommandations</h2>
                <button id="close-modal-recom" class="text-white hover:text-gray-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div id="recom-content" class="p-4">
                <div class="p-2 rounded bg-gray-600">
                    <iframe src="${recommandations[0]?.Url}" class="w-full h-[400px]" frameborder="0"></iframe>
                </div>
            </div>

            <div class="flex justify-between items-center p-4 border-t border-gray-600">
                <button id="prev-recom" class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <img src="assets/icon_design/fleche.svg" class="h-[20px] w-[20px] transform rotate-180" alt="Précédent">
                </button>
                <p id="recom-date" class="text-white text-lg font-semibold"></p>
                <button id="next-recom" class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <img src="assets/icon_design/fleche.svg" class="h-[20px] w-[20px]" alt="Suivant">
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Fonction pour mettre à jour l'image affichée
    function updateRecommandation() {
        const content = document.getElementById('recom-content');
        const dateElement = document.getElementById('recom-date');
        content.innerHTML = `
            <div class="p-2 rounded bg-gray-600">
                <iframe src="${recommandations[currentIndex]?.Url}" class="w-full h-[400px]" frameborder="0"></iframe>
            </div>
        `;

        // date
        const annee = recommandations[currentIndex]?.Annee || '';
        dateElement.textContent = annee ? `${annee}` : '';

        // Mettre à jour l'état des boutons
        const prevBtn = document.getElementById('prev-recom');
        const nextBtn = document.getElementById('next-recom');
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === recommandations.length - 1;
    }

    // Initialiser avec la première recommandation
    updateRecommandation();

    // Ajouter les événements de navigation
    document.getElementById('prev-recom').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateRecommandation();
        }
    });

    document.getElementById('next-recom').addEventListener('click', () => {
        if (currentIndex < recommandations.length - 1) {
            currentIndex++;
            updateRecommandation();
        }
    });

    // Ajouter l'événement de clic sur la div recommandation
    const recommandationDiv = document.getElementById('recommandation');
    if (recommandationDiv) {
        recommandationDiv.addEventListener('click', () => {
            currentIndex = 0;
            updateRecommandation();
            modal.classList.remove('hidden');
        });
    }

    // Fermer le modal
    document.getElementById('close-modal-recom').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.classList.add('hidden');
    });
}

// Fonction pour rediriger vers la page des projets avec l'ID du projet
window.goToProject = function(projectId) {
    console.log('goToProject appelé avec ID:', projectId);
    
    // Sauvegarder l'ID du projet dans le sessionStorage
    sessionStorage.setItem('scrollToProject', projectId);
    console.log('ID sauvegardé dans sessionStorage:', sessionStorage.getItem('scrollToProject'));
    
    // Simuler un clic sur la div projects
    const projectsDiv = document.getElementById('projects');
    if (projectsDiv) {
        console.log('Div projects trouvée, simulation du clic');
        projectsDiv.click();
        
        // Vérifier périodiquement si le container des projets est chargé
        const checkProjectsLoaded = setInterval(() => {
            const projectsContainer = document.querySelector('.listprojets');
            if (projectsContainer) {
                console.log('Container des projets trouvé');
                clearInterval(checkProjectsLoaded);
                
                // Attendre un peu que les projets soient rendus
                setTimeout(() => {
                    console.log('Recherche de l\'élément avec ID:', projectId);
                    const element = document.getElementById(projectId);
                    if (element) {
                        console.log('Élément trouvé, défilement en cours');
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        sessionStorage.removeItem('scrollToProject');
                    } else {
                        console.log('Élément non trouvé dans le DOM');
                    }
                }, 1000); // Augmenté le délai à 1 seconde pour s'assurer que tout est chargé
            }
        }, 100);
    } else {
        console.error('Div projects non trouvée');
        // Essayer avec le bouton menu-projects comme fallback
        const menuProjectsButton = document.getElementById('menu-projects');
        if (menuProjectsButton) {
            console.log('Bouton menu-projects trouvé comme fallback, simulation du clic');
            menuProjectsButton.click();
        }
    }
};

// Ajouter la fonction de défilement au scope global
window.scrollToProject = function(projectId) {
    const projectElement = document.getElementById(projectId);
    if (projectElement) {
        projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};