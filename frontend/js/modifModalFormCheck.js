async function submitmodifData(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    // Ne pas ajouter form_id deux fois (il est déjà dans le formulaire)
    // formData.append('form_id', 'modifData');
    
    // Vérifier si le formulaire contient un champ de type fichier
    const hasFileInput = event.target.querySelector('input[type="file"]') !== null;
    const fileInputs = event.target.querySelectorAll('input[type="file"]');
    
    // Vérifier si des fichiers ont été sélectionnés
    let hasSelectedFile = false;
    fileInputs.forEach(input => {
        if (input.files && input.files.length > 0) {
            hasSelectedFile = true;
            console.log(`Fichier sélectionné pour ${input.name}:`, input.files[0].name);
        }
    });
    
    if (hasFileInput && !hasSelectedFile) {
        alert('Veuillez sélectionner un fichier');
        return;
    }
    
    console.log('Données envoyées :');
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
    
    // Récupérer le formulaire et créer/obtenir la div de message
    const form = event.target;
    let messageDiv = form.querySelector('.message-feedback');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'message-feedback mt-2 text-sm';
        form.appendChild(messageDiv);
    }
    
    try {
        // Utiliser l'URL appropriée pour les formulaires avec des fichiers
        const url = '/index.php';
        
        console.log('Envoi au URL:', url);
        console.log('FormData contient des fichiers:', hasFileInput);
        
        // Afficher le contenu du formulaire pour le débogage
        console.log('Contenu FormData:');
        for (let [key, value] of formData.entries()) {
            console.log(key, ':', value);
        }
        
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        console.log('Status HTTP:', response.status);
        console.log('Headers:', response.headers);
        
        const result = await response.json();
        console.log('Réponse du serveur:', result);
        
        if (result.success) {
            // Afficher le message de succès
            messageDiv.textContent = 'Modification enregistrée avec succès';
            messageDiv.className = 'message-feedback mt-2 text-sm text-green-500';
            
            // Recharger l'image si on a mis à jour la photo
            if (hasFileInput && form.querySelector('input[name="image"]')) {
                // Forcer le rechargement de l'image en ajoutant un paramètre timestamp
                const profileImages = document.querySelectorAll('img[src*="profile"]');
                profileImages.forEach(img => {
                    const src = img.src.split('?')[0]; // Supprimer les paramètres existants
                    img.src = src + '?v=' + new Date().getTime();
                });
            }
            
            // Optionnel : effacer le message après 3 secondes
            setTimeout(() => {
                messageDiv.textContent = '';
                
                // Fermer le modal uniquement après que le message a disparu
                // et seulement si ce n'est pas un formulaire de fichier
                if (!hasFileInput) {
                    const modal = document.getElementById('modal');
                    if (modal) {
                        modal.classList.add('hidden');
                    }
                }
            }, 3000);
            
            // Rechargement des données après mise à jour
            if (typeof loadAdminData === 'function') {
                loadAdminData();
            }
        } else {
            // Afficher le message d'erreur
            messageDiv.textContent = result.message || 'Échec de la modification';
            messageDiv.className = 'message-feedback mt-2 text-sm text-red-500';
        }
    } catch (error) {
        console.error('Erreur:', error);
        messageDiv.textContent = 'Erreur de connexion au serveur';
        messageDiv.className = 'message-feedback mt-2 text-sm text-red-500';
    }
}

// Debug : Vérifions si le script est chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('modifModalFormCheck.js chargé');
    document.body.addEventListener('submit', function(event) {
        if (event.target.closest('#modal')) {
            console.log('Formulaire soumis dans le modal');
            submitmodifData(event);
        }
    });
});