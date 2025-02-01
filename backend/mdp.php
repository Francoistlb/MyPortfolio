<?php
// Connexion à la base de données
require_once __DIR__ . "/controllers/DatabaseConnexionController.php";  // Utilisation de __DIR__

// Définir les valeurs à insérer (vous pouvez remplacer par des variables ou un formulaire selon votre besoin)
$username = 'Francois';  // Nom d'utilisateur
$password = '123';  // Mot de passe à hacher

// Hacher le mot de passe
$password_hash = password_hash($password, PASSWORD_DEFAULT);

// Préparer la requête SQL pour insérer un nouvel utilisateur avec le mot de passe haché
try {
    $stmt = $pdo->prepare("INSERT INTO Profil (Login, password) VALUES (:user_name, :password_hash)");
    $stmt->bindParam(':user_name', $username, PDO::PARAM_STR);
    $stmt->bindParam(':password_hash', $password_hash, PDO::PARAM_STR);

    // Exécuter la requête pour insérer l'utilisateur
    $stmt->execute();
    
    echo "Utilisateur ajouté avec succès!";
} catch (PDOException $e) {
    echo "Erreur lors de l'ajout de l'utilisateur : " . $e->getMessage();
}
?>
