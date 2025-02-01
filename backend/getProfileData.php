<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require_once "connexionBdd.php";

try {
    $stmt = $pdo->query("SELECT `Photo profil`, `Curriculum vitae` FROM Profil WHERE id = 1");
    $result = $stmt->fetch();
    echo json_encode([
        'photo' => $result['Photo profil'] ?? '/assets/image/default_profile.png',
        'cv' => $result['Curriculum vitae'] ?? null
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} 