// Déclaration des variables et fonctions globales
let globalCvPath = '/shared-assets/documents/cv.pdf';

function cv() {
    console.log('Téléchargement du CV depuis:', globalCvPath);
    window.open(globalCvPath, '_blank');
}

// Exposer la fonction cv au scope global pour l'attribut onclick
window.cv = cv;

document.addEventListener('DOMContentLoaded', function() {
    // Déterminer si nous sommes sur la page d'administration
    const isAdminPage = window.location.href.includes('administration');
    
    // Charger les données immédiatement
    loadAdminData();
    
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
                // Vérifier si les conteneurs diplomelist ou experiencelist ont été ajoutés
                const diplomesContainer = document.querySelector('.diplomelist');
                const experiencesContainer = document.querySelector('.experiencelist');
                
                if (diplomesContainer || experiencesContainer) {
                    console.log('Conteneurs détectés, rechargement des données');
                    loadAdminData();
                }
            }
        });
    });
    
    // Observer les changements dans #dynamic-content
    const dynamicContent = document.getElementById('dynamic-content');
    if (dynamicContent) {
        observer.observe(dynamicContent, { childList: true, subtree: true });
    }
    
    setupCvDownload();
});

async function loadAdminData() {
    try {
        console.log('Début du chargement des données');
        const response = await fetch('/index.php?action=getAdminData');
        const data = await response.json();
        
        console.log('Données reçues:', data); // Afficher toutes les données
        
        if (data.success) {
            if (data.data.informations) {
                updateBio(data.data.informations);
                updatePoste(data.data.informations);
                updateImage(data.data.informations);
                updateCvLink(data.data.informations);
            }
            // Remplir les diplômes
            if (data.data.diplomes) {
                updateDiplomes(data.data.diplomes);
            }
            // Remplir les expériences
            if (data.data.experiences) {
                updateExperiences(data.data.experiences);
            }

            // Remplir les projets
            updateProjets(data.data.projets);

            updateGeneralInfo(data.data.informations);
        }
    } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
    }
}

function updatePoste(informations) {
    const posteContainer = document.querySelector('.poste');
    console.log('Poste mise à jour:', informations);
    
    if (!posteContainer) {
        console.error('Container #postel non trouvé');
        return;
    }
    posteContainer.innerHTML = `<p class="text-[20px] font-bold">${informations.Poste || ''}</p>`;
}

function updateBio(informations) {
    const bioContainer = document.querySelector('.bio');
    console.log('Bio mise à jour:', informations);
    
    if (!bioContainer) {
        console.error('Container .bio non trouvé');
        return;
    }
    // Accéder directement à la propriété Bio de l'objet informations
    bioContainer.innerHTML = `<p>${informations.Bio || ''}</p>`;
}

function updateImage(informations) {
    const imageContainer = document.querySelector('.photoprofil');
    
    if (!imageContainer) {
        console.error('Container .photoprofil non trouvé');
        return;
    }
    
    // Utiliser directement le chemin stocké en base de données
    const imagePath = informations.Photo || '/shared-assets/image/profile.png';
    console.log('Chemin de l\'image:', imagePath);
    
    // Version originale avec bg-[10px_0px] pour le positionnement spécifique
    imageContainer.innerHTML = `<div class="h-[150px] w-[150px] rounded-full bg-cover bg-[10px_0px]" style="background-image: url('${imagePath}');"></div>`;
}

function updateCvLink(informations) {
    // Mettre à jour la variable globale avec le chemin du CV
    globalCvPath = informations.Cv || '/shared-assets/documents/cv.pdf';
    console.log('Chemin du CV mis à jour:', globalCvPath);
}

function updateDiplomes(diplomes) {
    const diplomesContainer = document.querySelector('.diplomelist');
    console.log('Container trouvé:', diplomesContainer);
    
    if (!diplomesContainer) {
        console.error('Container #diplomelist non trouvé');
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
    console.log('Container trouvé:', experiencesContainer);
    
    if (!experiencesContainer) {
        console.error('Container des expériences non trouvé');
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

// ... autres fonctions de mise à jour ... 
// ... autres fonctions de mise à jour ... 