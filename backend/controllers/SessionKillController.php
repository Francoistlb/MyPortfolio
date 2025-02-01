<?php

class SessionKillController {
    public function logout() {
        error_log("Début de la déconnexion");
        
        // Détruire la session
        session_start();
        error_log("Session ID avant destruction: " . session_id());
        
        session_destroy();
        error_log("Session détruite");
        
        // Rediriger vers la page d'accueil
        error_log("Redirection vers index.html");
        header('Location: /index.html');
        exit();
    }
}

?>