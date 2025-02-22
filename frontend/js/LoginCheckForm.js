async function submitLoginForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    // Vérifions tous les champs du formulaire
    console.log('FormData entries:');
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
    
    try {
        const response = await fetch('/index.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log('Réponse du serveur:', result);
        
        if (result.success) {
            window.location.href = '/administration.html';
        } else {
            alert(result.message || 'Échec de la connexion');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur de connexion au serveur');
    }
}

window.onload = function() {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', submitLoginForm);
    }
};