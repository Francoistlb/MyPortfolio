async function submitmodifData(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    formData.append('form_id', 'modifData');
    
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
        const response = await fetch('/index.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log('Réponse du serveur:', result);
        
        if (result.success) {
            // Afficher le message de succès
            messageDiv.textContent = 'Modification enregistrée avec succès';
            messageDiv.className = 'message-feedback mt-2 text-sm text-green-500';
            
            // Optionnel : effacer le message après 3 secondes
            setTimeout(() => {
                messageDiv.textContent = '';
            }, 3000);
            
            // Optionnel : vider le champ
            const input = form.querySelector('input[type="text"], textarea');
            if (input) input.value = '';
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
    document.body.addEventListener('submit', function(event) {
        if (event.target.closest('#modal')) {
            submitmodifData(event);
        }
    });
});