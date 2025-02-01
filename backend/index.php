<?php
session_start();

// Inclure les contrôleurs
require_once "controllers/DatabaseConnexionController.php";
require_once "controllers/AuthController.php";
require_once "controllers/SessionKillController.php";

// Obtenir l'instance PDO
$pdo = DatabaseConnexionController::getInstance();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    error_log("POST reçu avec action: " . ($_POST['action'] ?? 'non définie'));
    
    if (isset($_POST['action']) && $_POST['action'] === 'logout') {
        error_log("Action logout détectée");
        $sessionKillController = new SessionKillController();
        $sessionKillController->logout();
        exit();
    }
    
    //  Login controller
    if (!isset($_POST['user_name'])) {
        header('Location: http://localhost:8080/login.html?error=3');
        exit();
    }
    else {
        $authController = new AuthController($pdo);
        $authController->login(
            $_POST['user_name'] ?? '',
            $_POST['user_password'] ?? ''
        );
    }
}

?>