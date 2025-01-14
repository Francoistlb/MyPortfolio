<?php


// Configuration des paramètres de la base de données
$host = 'db';
$dbname = 'portfolio';  
$username = 'PortfolioV2';    
$password = '123'; 

try {
    // Création d'une nouvelle instance de PDO
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8";
    $pdo = new PDO($dsn, $username, $password);

    // Configuration des options de PDO
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Mode d'erreur
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); // Mode de récupération des résultats

    echo "Connexion réussie à la base de données.";

} catch (PDOException $e) {
    // Gestion des erreurs de connexion
    echo "Erreur de connexion : " . $e->getMessage();
}


?>