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
                    <textarea placeholder="veille" name="veille" class="p-2 rounded bg-gray-600 text-white h-32" required> </textarea>
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
        competence1: {
            title: 'Modifier la compétence n°1',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="1">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence2: {
            title: 'Modifier la compétence n°2',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="2">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence3: {
            title: 'Modifier la compétence n°3',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="3">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence4: {
            title: 'Modifier la compétence n°4',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="4">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence5: {
            title: 'Modifier la compétence n°5',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="5">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence6: {
            title: 'Modifier la compétence n°6',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="6">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence7: {
            title: 'Modifier la compétence n°7',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="7">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence8: {
            title: 'Modifier la compétence n°8',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="8">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence9: {
            title: 'Modifier la compétence n°9',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="9">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence10: {
            title: 'Modifier la compétence n°10',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="10">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence11: {
            title: 'Modifier la compétence n°11',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="11">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        competence12: {
            title: 'Modifier la compétence n°12',
            content: `
                <form class="flex flex-col gap-4" id="modifData" enctype="multipart/form-data">
                    <input type="hidden" name="form_id" value="modifData">
                    <input type="hidden" name="competence_id" value="12">
                    <input type="text" placeholder="Nom de la compétence" name="nom_competence" class="p-2 rounded bg-gray-600 text-white" required>
                    <input type="file" name="icone_competence" class="p-2 rounded bg-gray-600 text-white" accept="image/svg+xml,image/png">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        
    };

    // Gestionnaire de clic pour les boutons modifier
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modify-btn')) {
            const type = event.target.dataset.type;
            const config = modalConfigs[type];
            
            if (config) {
                modalTitle.textContent = config.title;
                modalContent.innerHTML = config.content;
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