document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    fadeElements.forEach(el => {
        el.classList.add('show'); // Ajoute immédiatement .show pour éviter les éléments invisibles
    });
});