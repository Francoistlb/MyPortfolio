<?php
session_start();

// Désactiver l'affichage des erreurs
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Inclure les contrôleurs
require_once "controllers/DatabaseConnexionController.php";
require_once "controllers/AuthController.php";
require_once "controllers/SessionKillController.php";
require_once "controllers/ModifData.php";
require_once "controllers/GetAdminData.php";

// Obtenir l'instance PDO
$pdo = DatabaseConnexionController::getInstance();

// Ajouter au tout début de index.php pour voir ce qui arrive
error_log("==== REQUÊTE REÇUE ====");
error_log("GET: " . print_r($_GET, true));
error_log("POST: " . print_r($_POST, true));
error_log("FILES: " . print_r($_FILES, true));

// Ajouter ceci au début pour diagnostiquer les problèmes d'upload
error_log("Upload max filesize: " . ini_get('upload_max_filesize'));
error_log("Post max size: " . ini_get('post_max_size'));
error_log("Memory limit: " . ini_get('memory_limit'));

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log("=== Début traitement POST ===");
    error_log("POST reçu avec form_id: " . ($_POST['form_id'] ?? 'non définie'));
    error_log("Contenu POST complet: " . print_r($_POST, true));
    if (!empty($_FILES)) {
        error_log("Fichiers reçus: " . print_r($_FILES, true));
    }
    
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
            try {
                error_log("=== Traitement modifData ===");
                
                // S'assurer qu'on n'a pas déjà envoyé des headers ou du contenu
                if (!headers_sent()) {
                    header('Content-Type: application/json');
                }
                
                $modifDataController = new ModifData($pdo);
                $result = $modifDataController->updateData($_POST);
                
                error_log("Résultat de updateData: " . ($result ? 'true' : 'false'));
                
                echo json_encode([
                    'success' => $result,
                    'message' => $result ? 'Mise à jour réussie' : 'Échec de la mise à jour'
                ]);
                exit();

            } catch (Exception $e) {
                error_log("Erreur dans modifData: " . $e->getMessage());
                
                if (!headers_sent()) {
                    header('Content-Type: application/json');
                }
                
                echo json_encode([
                    'success' => false,
                    'message' => 'Erreur lors de la mise à jour'
                ]);
            }
            
            exit();
            break;

       
        default:
            # cod..
            break;
    }
    
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action']) && $_GET['action'] === 'getAdminData') {
        $getAdminData = new GetAdminData($pdo);
        $result = $getAdminData->getAllData();
        
        header('Content-Type: application/json');
        echo json_encode($result);
        exit();
    }

    if (isset($_GET['action']) && $_GET['action'] === 'updateData') {
        // Puisque cette route est utilisée pour les uploads de fichiers,
        // nous devons vérifier si nous recevons un POST (pas un GET)
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Méthode incorrecte pour updateData'
            ]);
            exit;
        }
        
        // Assurez-vous que $modifData est une instance de ModifData
        $modifData = new ModifData($pdo);
        $result = $modifData->updateData($_POST);
        
        // Ajoutez un log pour vérifier si on arrive ici
        error_log("Routage vers updateData via GET - POST: " . print_r($_POST, true));
        error_log("Routage vers updateData via GET - FILES: " . print_r($_FILES, true));
        
        // Exemple de format correct pour la réponse
        header('Content-Type: application/json');
        echo json_encode([
            'success' => $result,
            'message' => $result ? 'Mise à jour réussie' : 'Échec de la mise à jour'
        ]);
        exit;
    }

    

}

?>