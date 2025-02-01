<?php
// backend/connexionBdd.php

class DatabaseConnexionController {
    private static $instance = null;
    
    public static function getInstance() {
        if (self::$instance === null) {
            $dsn = "mysql:host=db;dbname=portfolio";  // Notez que le host est 'db' (nom du service)
            $user = "Administrateur";  // L'utilisateur défini dans docker-compose.yml
            $pass = "MyportolioV2";    // Le mot de passe défini dans docker-compose.yml
            $charset = 'utf8mb4';

            $options = array(
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            );
            
            try {
                self::$instance = new PDO($dsn, $user, $pass, $options);
            } catch (\PDOException $e) {
                throw new \PDOException($e->getMessage(), (int)$e->getCode());
            }
        }
        return self::$instance;
    }
}
?>