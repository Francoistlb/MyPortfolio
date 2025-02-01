function updateFileName(input, elementId) {
    console.log('test:',input)
    const fileName = input.files[0] ? input.files[0].name : 'Aucun fichier sélectionné';
    document.getElementById(elementId).textContent = `Nouveau fichier : ${fileName}`;
    
    // Si c'est une image, afficher l'aperçu
    if (input.files[0] && input.files[0].type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-image').style.backgroundImage = `url('${e.target.result}')`;
        }
        reader.readAsDataURL(input.files[0]);
    }
} 