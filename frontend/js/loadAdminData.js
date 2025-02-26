document.addEventListener('DOMContentLoaded', function() {
    loadAdminData();
});

async function loadAdminData() {
    try {
        console.log('Début du chargement des données');
        const response = await fetch('/index.php?action=getAdminData');
        const data = await response.json();
        
        if (data.success) {
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

/*function updateGeneralInfo(info) {
    // Mettre à jour les informations générales
    document.querySelector('#poste-actuel').textContent = info.Poste;
    // ... autres mises à jour ...
}*/

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
        <div class="rounded-md flex items-stretch">
            <div class="flex flex-col w-[15%] justify-center items-center"> 
                <div class="h-1/3">
                    <div class="bg-black h-full w-1"></div>
                </div>
                <image class="h-1/3 w-7" src="../assets/icon_design/row.svg"> </image>
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
                    <div class="h-2"> 
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
                <div class="h-1/3"></div>
                <image class="h-1/3 w-7" src="../assets/icon_design/row.svg"> </image>
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
                <div class="h-2"> 
                    <div class="bg-black h-full w-1"></div>
                </div>
            </div>
            <div class="w-[85%]"></div>
        </div>
    `).join('');

    experiencesContainer.innerHTML = html;
}

// ... autres fonctions de mise à jour ... 