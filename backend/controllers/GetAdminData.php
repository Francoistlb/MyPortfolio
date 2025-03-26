<?php

class GetAdminData {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllData() {
        try {
            // Récupérer les informations générales
            $infoQuery = "SELECT * FROM Information WHERE id = 1";
            $infoStmt = $this->pdo->query($infoQuery);
            $informations = $infoStmt->fetch(PDO::FETCH_ASSOC);

            // Récupérer les diplômes
            $diplomesQuery = "SELECT * FROM Diplome ORDER BY periode DESC";
            $diplomesStmt = $this->pdo->query($diplomesQuery);
            $diplomes = $diplomesStmt->fetchAll(PDO::FETCH_ASSOC);

            // Récupérer les expériences
            $experiencesQuery = "SELECT * FROM Experience ORDER BY periode DESC";
            $experiencesStmt = $this->pdo->query($experiencesQuery);
            $experiences = $experiencesStmt->fetchAll(PDO::FETCH_ASSOC);

            // Récupérer les projets
            $projetsQuery = "SELECT * FROM Projet";
            $projetsStmt = $this->pdo->query($projetsQuery);
            $projets = $projetsStmt->fetchAll(PDO::FETCH_ASSOC);

            // Récupérer les compétences
            $competencesQuery = "SELECT * FROM Competence";
            $competencesStmt = $this->pdo->query($competencesQuery);
            $competences = $competencesStmt->fetchAll(PDO::FETCH_ASSOC);

            // Structurer les données
            return [
                'success' => true,
                'data' => [
                    'informations' => $informations,
                    'diplomes' => $diplomes,
                    'experiences' => $experiences,
                    'projets' => $projets,
                    'competences' => $competences,
                ]
            ];

        } catch (PDOException $e) {
            return [
                'success' => false,
                'message' => 'Erreur lors de la récupération des données: ' . $e->getMessage()
            ];
        }
    }
} 