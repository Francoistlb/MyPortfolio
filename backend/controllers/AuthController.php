<?php
// backend/controllers/AuthController.php

class AuthController {

    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function login($nom, $password) {
        error_log("Tentative de connexion pour: " . $nom);
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM Profil WHERE Login = :nom");
            $stmt->bindParam(':nom', $nom, PDO::PARAM_STR);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            error_log("Utilisateur trouvé: " . print_r($user, true));

            if ($user && password_verify($password, $user['password'])) {
                error_log("Mot de passe vérifié avec succès");
                $_SESSION['user'] = [
                    'id' => $user['id'],
                    'nom' => $user['Login']
                ];
                error_log("Redirection vers /administration.html");
                header('Location: http://localhost:8080/administration.html');
                exit();
            } else {
                error_log("Échec de l'authentification");
                header('Location: /login.html?error=1');
                exit();
            }
        }
        catch (PDOException $e) {
            error_log("Erreur PDO: " . $e->getMessage());
            header('Location: /login.html?error=2');
            exit();
        }
    }
}
?>