<?php
session_start();

// Inclure les contrôleurs
require_once "controllers/DatabaseConnexionController.php";
require_once "controllers/AuthController.php";
require_once "controllers/SessionKillController.php";
require_once "controllers/ModifData.php";

// Obtenir l'instance PDO
$pdo = DatabaseConnexionController::getInstance();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log("POST reçu avec action: " . ($_POST['form_id'] ?? 'non définie'));    
    
    switch ($_POST['form_id']) {
        case 'logout':
            $sessionKillController = new SessionKillController();
            $sessionKillController->logout();
            exit();
            break;

        case 'login':
            $authController = new AuthController($pdo);
            $authController->login(
                $_POST['user_name'] ?? '',
                $_POST['user_password'] ?? ''
            );
            exit();
        
        case 'modifData':
            $modifDataController = new ModifData($pdo);
            $result = $modifDataController->updateData($_POST);
        
            $modifDataController->updateData(
                $_POST['poste'] ?? '',
                $_POST['bio'] ?? '',
                $_POST['email'] ?? '',
                $_POST['telephone'] ?? '',
                $_POST['age'] ?? '',
                $_POST['ville'] ?? '',
                $_POST['photo'] ?? '',
                $_POST['cv'] ?? ''
            );
            // Envoyer une réponse JSON
            header('Content-Type: application/json');
            echo json_encode([
                'success' => $result,
                'message' => $result ? 'Mise à jour réussie' : 'Échec de la mise à jour'
            ]);
            exit();
            
            break;

       
        default:
            # cod..
            break;
    }
    
}

?>