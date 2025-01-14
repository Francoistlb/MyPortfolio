function copyEmail(event) {
    // Cible l'adresse e-mail
    const email = document.getElementById('email').textContent;

    // Copie l'adresse dans le presse-papiers
    navigator.clipboard.writeText(email).then(() => {
        console.log("E-mail copié : " + email);

        // Affiche un message de confirmation
        const copyMessage = document.getElementById('copy-message');
        
        // Positionne le message à l'endroit du clic
        copyMessage.style.left = `${event.pageX}px`;
        copyMessage.style.top = `${event.pageY}px`;
        copyMessage.classList.remove('hidden');

        // Cache le message après 2 secondes
        setTimeout(() => {
            copyMessage.classList.add('hidden');
        }, 2000);
    }).catch(err => {
        console.error("Erreur lors de la copie de l'e-mail : ", err);
    });
}

function linkedin() {

    window.open('https://www.linkedin.com/in/françois-talaban-a6b7a4194', '_blank');
}
