document.addEventListener('DOMContentLoaded', () => {
    const welcomeDiv = document.getElementById('welcome-div');
    // Ajoutez une petite temporisation pour un effet plus fluide
    setTimeout(() => {
        welcomeDiv.classList.remove('opacity-0', 'scale-50');
        welcomeDiv.classList.add('opacity-100', 'scale-100');
    }, 100); // Le délai avant que l'animation ne commence (100ms ici)
});