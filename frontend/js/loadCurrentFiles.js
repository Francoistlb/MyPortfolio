async function loadCurrentFiles() {
    try {
        console.log('Chargement des fichiers...');
        const response = await fetch('http://localhost:8081/getProfileData.php');
        const data = await response.json();
        console.log('Données reçues:', data);

       

       
        
        // Afficher le nom du fichier image actuel
        const currentImageName = data.photo ? data.photo.split('/').pop() : 'Aucune image';
        console.log('Nom de l\'image:', currentImageName);
        const imageElement = document.getElementById('current-image-name');
        if (imageElement) {
            imageElement.textContent = `Image actuelle : ${currentImageName}`;
        } else {
            console.error('Element current-image-name non trouvé');
        }

        document.querySelector("#selected-image-name").textContent = `Ancien fichier : ${currentImageName}`;
        
        // Afficher le nom du fichier CV actuel
        const currentCVName = data.cv ? data.cv.split('/').pop() : 'Aucun CV';
        console.log('Nom du CV:', currentCVName);
        const cvElement = document.getElementById('current-cv-name');
        if (cvElement) {
            cvElement.textContent = `CV actuel : ${currentCVName}`;
        } else {
            console.error('Element current-cv-name non trouvé');
        }

        document.querySelector("#selected-cv-name").textContent = `Ancien fichier : ${currentCVName}`;
        
        
    } catch (error) {
        console.error('Erreur lors du chargement des fichiers:', error);
    }
}

// Charger les fichiers actuels au chargement de la page
document.addEventListener('DOMContentLoaded', loadCurrentFiles);
console.log('Script loadCurrentFiles.js chargé'); 