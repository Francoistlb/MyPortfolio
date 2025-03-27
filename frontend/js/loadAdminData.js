// Déclaration des variables et fonctions globales
let globalCvPath = '/shared-assets/documents/cv.pdf';

function cv() {
    console.log('Téléchargement du CV depuis:', globalCvPath);
    window.open(globalCvPath, '_blank');
}

// Exposer la fonction cv au scope global pour l'attribut onclick
window.cv = cv;

document.addEventListener('DOMContentLoaded', function() {
    // Charger les données immédiatement (sans vérification préalable des conteneurs)
    loadAdminData();
    
    // Déterminer si nous sommes sur la page d'administration
    const isAdminPage = window.location.href.includes('administration');
    
    // Si nous sommes sur la page d'administration, ajuster la mise en page après le chargement
    if (isAdminPage) {
        // Attendre que les données soient chargées
        setTimeout(() => {
            // Forcer un recalcul de la mise en page
            const experiencesContainer = document.querySelector('.experiencelist');
            const diplomesContainer = document.querySelector('.diplomelist');
            
            if (experiencesContainer) {
                experiencesContainer.style.display = 'none';
                setTimeout(() => { experiencesContainer.style.display = ''; }, 10);
            }
            
            if (diplomesContainer) {
                diplomesContainer.style.display = 'none';
                setTimeout(() => { diplomesContainer.style.display = ''; }, 10);
            }
        }, 500);
    }
    
    // Observer les changements dans le DOM pour détecter quand home.html est chargé
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Vérifier si les conteneurs diplomelist, experiencelist, ville ou age ont été ajoutés
                const diplomesContainer = document.querySelector('.diplomelist');
                const experiencesContainer = document.querySelector('.experiencelist');
                const villeContainer = document.querySelector('.ville');
                const ageContainer = document.querySelector('.age');
                const telephoneContainer = document.querySelector('.telephone');
                const emailContainer = document.querySelector('.email');

                // Vérifier si les conteneurs existent ET s'ils sont vides avant de recharger
                if ((diplomesContainer && diplomesContainer.children.length === 0) || 
                    (experiencesContainer && experiencesContainer.children.length === 0) ||
                    (villeContainer && villeContainer.children.length === 0) ||
                    (ageContainer && ageContainer.children.length === 0) ||
                    (telephoneContainer && telephoneContainer.children.length === 0) ||
                    (emailContainer && emailContainer.children.length === 0)) {
                    console.log('Conteneurs détectés vides, rechargement des données');
                    
                    // Déconnecter temporairement l'observateur pendant le chargement
                    observer.disconnect();
                    
                    // Charger les données
                    loadAdminData().then(() => {
                        // Reconnecter l'observateur après le chargement
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
            // Remplir les diplômes
            if (data.data.diplomes) {
                updateDiplomes(data.data.diplomes);
            }
            // Remplir les expériences
            if (data.data.experiences) {
                updateExperiences(data.data.experiences);
            }

            if (data.data.competences) {
                updateCompetences(data.data.competences);
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
            <div class="flex flex-col w-[15%] justify-center items-center"> 
                <div class="h-1/3">
                    <div class="bg-black h-full w-1"></div>
                </div>
                <img class="h-max-1/3 w-max-7" src="../assets/icon_design/row.svg">
                <div class="h-1/3 flex justify-center items-center">
                    <div class="bg-black h-full w-1"></div>
                </div>
            </div>
            <div class="list w-[85%] p-2">
                <p class="exp-title">${diplome.Titre || ''}</p>
                <p class="exp-text">${diplome.Periode || ''}</p>
                <p class="exp-text">${diplome.Ecole || ''}</p>
            </div>
        </div>
        <div class="rounded-md flex items-stretch">
                <div class="flex flex-col w-[15%] justify-center items-center "> 
                    <div class="h-3"> 
                        <div class="bg-black h-full w-1"></div>
                    </div>
                </div>
                <div class="w-[85%]"></div>
            </div>
    `).join('');

    diplomesContainer.innerHTML = html;
}

function updateExperiences(experiences) {
    const experiencesContainer = document.querySelector('.experiencelist');
    
    if (!experiencesContainer) {
        console.error('Container .expériences non trouvé');
        return;
    }

    const html = experiences.map(experience => `
        <div class="rounded-md flex items-stretch">
            <div class="flex flex-col w-[15%] justify-center items-center"> 
                <div class="h-1/3">
                    <div class="bg-black h-full w-1"></div>
                </div>
                <img class="h-max-1/3 w-max-7" src="../assets/icon_design/row.svg"> 
                <div class="h-1/3 flex justify-center items-center">
                    <div class="bg-black h-full w-1"></div>
                </div>
            </div>
            <div class="list w-[85%] p-2">
                <p class="exp-title">${experience.Titre || ''}</p>
                <p class="exp-text">${experience.Periode || ''}</p>
                <p class="exp-text">${experience.Entreprise || ''}</p>
            </div>
        </div>
        
        <!-- Séparateur entre les expériences -->
        <div class="rounded-md flex items-stretch">
            <div class="flex flex-col w-[15%] justify-center items-center"> 
                <div class="h-3"> 
                    <div class="bg-black h-full w-1"></div>
                </div>
            </div>
            <div class="w-[85%]"></div>
        </div>
    `).join('');

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
        const iconPath = `/shared-assets/competences/${competence.Nom.toLowerCase()}.svg`;
        html += `<div class="flex justify-center items-center">
                    <img class="h-[40px] w-[40px]" src="${iconPath}" alt="${competence.Nom}" title="${competence.Nom}">
                </div>`;
    });
    
    competencesContainer.innerHTML = html || '<p class="text-center w-full text-gray-400">Aucune compétence disponible</p>';
}


