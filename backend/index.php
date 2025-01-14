<?php
ob_start(); // Démarre le tampon de sortie
session_start(); // Démarre la session

if (isset($_POST['user_name']) && isset($_POST['user_password'])) {
    $nom = $_POST['user_name'];
    $password = $_POST['user_password'];

    try {
        require_once "connexionBdd.php";  // Inclure la connexion à la base de données
    
        // Préparer la requête SQL pour sécuriser l'accès aux données
        $stmt = $pdo->prepare("SELECT * FROM Profil WHERE Nom = :nom");
        $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
    
        // Exécuter la requête
        $stmt->execute();
    
        // Vérifier si l'utilisateur existe dans la base de données
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
        // Vérifier si un utilisateur a été trouvé et si le mot de passe est correct
        if ($user && password_verify($password, $user['Mdp'])) {
            // Si l'authentification est réussie
            $_SESSION['user'] = [
                'id' => $user['id'],
                'nom' => $user['Nom']
            ];
            
            // Rediriger vers la page d'administration
            header('Location: http://localhost:8080/administration.html');
            exit();
        } else {
            // Si l'authentification échoue
            echo "Nom d'utilisateur ou mot de passe incorrect";
        }
    } catch (PDOException $e) {
        echo "Erreur de connexion à la base de données: " . $e->getMessage();
    }
} else {
    echo "Nom d'utilisateur ou mot de passe manquant.";
}
ob_end_flush(); // Vide et ferme le tampon de sortie
?>
