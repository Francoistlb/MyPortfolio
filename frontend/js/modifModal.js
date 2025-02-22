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
                    <input type="text" placeholder="Nouveau poste" name="poste" class="p-2 rounded bg-gray-600 text-white">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        bio: {
            title: 'Modifier la bio',
            content: `
                <form class="flex flex-col gap-4" id="modifData"">
                    <input type="hidden" name="form_id" value="modifData">    
                    <textarea placeholder="Nouvelle bio" name="bio" class="p-2 rounded bg-gray-600 text-white h-32"></textarea>
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
                    <input type="email" placeholder="Nouvel email" name="email" class="p-2 rounded bg-gray-600 text-white">
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
                    <input type="tel" placeholder="Nouveau numéro de téléphone" name="telephone" class="p-2 rounded bg-gray-600 text-white">
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
                    <input type="number" placeholder="Nouvel âge" name="age" class="p-2 rounded bg-gray-600 text-white">
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
                    <input type="text" placeholder="Nouvelle ville" name="ville" class="p-2 rounded bg-gray-600 text-white"> 
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        photo: {
            title: 'Modifier la photo de profil',
            content: `
                <form class="flex flex-col gap-4" id="modifData">
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
                <form class="flex flex-col gap-4" id="modifData">
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
                    <input type="textarea" placeholder="veille" class="p-2 rounded bg-gray-600 text-white">
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
                    <input type="text" placeholder="Titre de l'experience" name="titre_experience" class="p-2 rounded bg-gray-600 text-white">
                    <input type="text" placeholder="Période (Sept 2023 - Juin 2024)" name="periode_experience" class="p-2 rounded bg-gray-600 text-white">
                    <input type="text" placeholder="Nom de l'entreprise" name="nom_experience" class="p-2 rounded bg-gray-600 text-white">
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },  
        competences: {
            title: 'Modifier les compétences',
            content: `
                <form class="flex flex-col gap-4" id="modifData">
                    <input type="hidden" name="form_id" value="modifData">  
                    <input type="text" placeholder="Nouvelle compétence" class="p-2 rounded bg-gray-600 text-white">    
                    <button type="submit" class="visite text-ml text-white px-4 py-2 bg-black rounded-ml transition">
                        Enregistrer
                    </button>
                </form>
            `
        },
        projets: {
            title: 'Modifier les projets',
            content: `  
                <form class="flex flex-col gap-4" id="modifData">
                    <input type="hidden" name="form_id" value="modifData">  
                    <input type="text" placeholder="Nouveau projet" class="p-2 rounded bg-gray-600 text-white">
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