document.addEventListener('DOMContentLoaded', function() {
 
    fetch('../components/modal.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            initializeModal();
        });
});

function initializeModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    // Configuration des différents types de contenu
    const modalConfigs = {
        poste: {
            title: 'Modifier le poste',
            content: `
                <form class="flex flex-col gap-4" id="modifData">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="text" placeholder="Nouveau poste" name="poste" class="p-2 rounded bg-gray-600 text-white" required>
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        bio: {
            title: 'Modifier la bio',
            content: `
                <form class="flex flex-col gap-4" id="modifData">
                    <input type="hidden" name="form_id" value="modifData">    
                    <textarea placeholder="Nouvelle bio" name="bio" class="p-2 rounded bg-gray-600 text-white h-32" required></textarea>
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        email: {
            title: 'Modifier l\'email',
            content: `
                <form class="flex flex-col gap-4" id="modifData">
                    <input type="hidden" name="form_id" value="modifData">  
                    <input type="email" placeholder="Nouvel email" name="email" class="p-2 rounded bg-gray-600 text-white" required>
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        telephone: {
            title: 'Modifier le numéro de téléphone',
            content: `
                <form class="flex flex-col gap-4" id="modifData">
                    <input type="hidden" name="form_id" value="modifData">  
                    <input type="tel" placeholder="Nouveau numéro de téléphone" name="telephone" class="p-2 rounded bg-gray-600 text-white" required>
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },  
        age: {
            title: 'Modifier l\'âge',
            content: `
                <form class="flex flex-col gap-4" id="modifData" >
                    <input type="hidden" name="form_id" value="modifData">  
                    <input type="number" placeholder="Nouvel âge" name="age" class="p-2 rounded bg-gray-600 text-white" required>
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form> 
            `
        },
        ville: {
            title: 'Modifier la ville',
            content: `
                <form class="flex flex-col gap-4" id="modifData"> 
                    <input type="hidden" name="form_id" value="modifData">  
                    <input type="text" placeholder="Nouvelle ville" name="ville" class="p-2 rounded bg-gray-600 text-white" required> 
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        photo: {
            title: 'Modifier la photo de profil',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">  
                    <input type="file" name="image" class="p-2 rounded bg-gray-600 text-white">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        cv: {
            title: 'Modifier le CV',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">  
                    <input type="file" name="cv" class="p-2 rounded bg-gray-600 text-white">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        veille: {
            title: 'Modifier la veille',
            content: `  
                <form class="flex flex-col gap-4" id="modifData">
                    <input type="hidden" name="form_id" value="modifData">  
                    <textarea placeholder="veille" name="veille" class="p-2 rounded bg-gray-600 text-white h-60" required> </textarea>
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        diplome: {
            title: 'Ajouter un diplôme',
            content: `
                <form class="flex flex-col gap-4" id="modifData">
                    <input type="hidden" name="form_id" value="modifData"> 
                    <input type="text" placeholder="Titre du diplôme" name="titre_diplome" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="text" placeholder="Période (Sept 2023 - Juin 2024)" name="periode_diplome" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="text" placeholder="École" name="ecole_diplome" class="p-2 rounded bg-gray-600 text-white" required>
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        }, 
        experience: {
            title: 'Ajouter une experience',
            content: `
                <form class="flex flex-col gap-4" id="modifData">
                    <input type="hidden" name="form_id" value="modifData"> 
                    <input type="text" placeholder="Titre de l'experience" name="titre_experience" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="text" placeholder="Période (Sept 2023 - Juin 2024)" name="periode_experience" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="text" placeholder="Nom de l'entreprise" name="nom_experience" class="p-2 rounded bg-gray-600 text-white" required>
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },  
        competence: {
            title: 'Modifier la compétence',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" id="competence_id">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        projets: {
            title: 'Ajouter un projet',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    
                    <div class="mb-1 grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="titre">
                                Titre
                            </label>
                            <input type="text" id="titre" name="titre_projet" placeholder="Titre du projet" class="w-full p-2 rounded bg-gray-600 text-white" required>
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="icone_projet">
                                Icon
                            </label>
                            <input type="file" id="icone_projet" name="icone_projet" class="w-full p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png" required>
                        </div>
                    </div>

                    <div class="mb-1">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                            Description
                        </label>
                        <textarea id="description" name="description" placeholder="Description du projet" rows="2" class="w-full p-2 rounded bg-gray-600 text-white resize-none" required></textarea>
                    </div>

                    <div class="grid grid-cols-3 gap-4 mb-1">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="compt1">
                                Compétence 1
                            </label>
                            <input type="text" id="compt1" name="compt1" placeholder="Première compétence" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="compt2">
                                Compétence 2
                            </label>
                            <input type="text" id="compt2" name="compt2" placeholder="Deuxième compétence" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="compt3">
                                Compétence 3
                            </label>
                            <input type="text" id="compt3" name="compt3" placeholder="Troisième compétence" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-4 mb-1">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="icone_techno1">
                                Technologie 1
                            </label>
                            <input type="file" id="icone_techno1" name="icone_techno1" class="w-full p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="icone_techno2">
                                Technologie 2
                            </label>
                            <input type="file" id="icone_techno2" name="icone_techno2" class="w-full p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="icone_techno3">
                                Technologie 3
                            </label>
                            <input type="file" id="icone_techno3" name="icone_techno3" class="w-full p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-1">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="visiter">
                                Lien Visiter
                            </label>
                            <input type="text" id="visiter" name="visiter" placeholder="Lien vers le projet" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="code">
                                Lien Code
                            </label>
                            <input type="text" id="code" name="code" placeholder="Lien vers le code source" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                    </div>

                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        projetmodif: {
            title: 'Modifier le projet',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="projet_id" id="projet_id">
                    
                    <div class="mb-1 grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="titre">
                                Titre
                            </label>
                            <input type="text" id="titre" name="titre_projet_modif" placeholder="Titre du projet" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="icone_projet">
                                Icon
                            </label>
                            <input type="file" id="icone_projet_modif" name="icone_projet_modif" class="w-full p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                        </div>
                    </div>

                    <div class="mb-1">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                            Description
                        </label>
                        <textarea id="description" name="description" placeholder="Description du projet" rows="2" class="w-full p-2 rounded bg-gray-600 text-white resize-none"></textarea>
                    </div>

                    <div class="grid grid-cols-3 gap-4 mb-1">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="compt1">
                                Compétence 1
                            </label>
                            <input type="text" id="compt1" name="compt1" placeholder="Première compétence" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="compt2">
                                Compétence 2
                            </label>
                            <input type="text" id="compt2" name="compt2" placeholder="Deuxième compétence" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="compt3">
                                Compétence 3
                            </label>
                            <input type="text" id="compt3" name="compt3" placeholder="Troisième compétence" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                    </div>

                    <div class="grid grid-cols-3 gap-4 mb-1">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="icone_techno1">
                                Technologie 1
                            </label>
                            <input type="file" id="icone_techno1" name="icone_techno1" class="w-full p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="icone_techno2">
                                Technologie 2
                            </label>
                            <input type="file" id="icone_techno2" name="icone_techno2" class="w-full p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="icone_techno3">
                                Technologie 3
                            </label>
                            <input type="file" id="icone_techno3" name="icone_techno3" class="w-full p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-1">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="visiter">
                                Lien Visiter
                            </label>
                            <input type="text" id="visiter" name="visiter" placeholder="Lien vers le projet" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="code">
                                Lien Code
                            </label>
                            <input type="text" id="code" name="code" placeholder="Lien vers le code source" class="w-full p-2 rounded bg-gray-600 text-white">
                        </div>
                    </div>

                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer les modifications
                    </button>
                </form>
            `
        },
        recommandation : {
            title: 'Ajouter une recommandation',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="text" placeholder="Titre" name="titre_recommandation" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="number" name="year" placeholder="Année" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="document" class="p-2 rounded bg-gray-600 text-white" accept="image/png,application/pdf">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        }
    };

    // Gestionnaire de clic pour les boutons modifier
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modify-btn')) {
            const type = event.target.dataset.type;
            const config = modalConfigs[type];
            
            if (config) {
                modalTitle.textContent = config.title;
                modalContent.innerHTML = config.content;
                
                // Si c'est une compétence, on met à jour l'ID
                if (type === 'competence') {
                    const competenceId = event.target.dataset.id;
                    document.getElementById('competence_id').value = competenceId;
                }
                
                // Si c'est un projet à modifier
                if (type === 'projetmodif') {
                    const projetId = event.target.id;
                    document.getElementById('projet_id').value = projetId;
                    
                    // Faire une requête pour obtenir les données du projet
                    fetch(`/index.php?action=getProjet&id=${projetId}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                const projet = data.data;
                                // Remplir les champs avec les données existantes, en gérant les valeurs nulles
                                document.getElementById('titre').value = projet.Titre ?? '';
                                document.getElementById('description').value = projet.Description ?? '';
                                document.getElementById('compt1').value = projet.Compt_1 ?? '';
                                document.getElementById('compt2').value = projet.Compt_2 ?? '';
                                document.getElementById('compt3').value = projet.Compt_3 ?? '';
                                document.getElementById('visiter').value = projet.Visiter ?? '';
                                document.getElementById('code').value = projet.Code ?? '';
                            }
                        })
                        .catch(error => console.error('Erreur lors de la récupération des données du projet:', error));
                }
                
                modal.classList.remove('hidden');
            }
        }
    });

    // Fermer le modal
    closeBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    // Fermer le modal en cliquant à l'extérieur
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
} 