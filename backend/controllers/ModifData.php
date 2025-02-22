<?php

class ModifData {
    private $pdo;
    private $target_image = "/var/www/html/frontend/assets/image/";
    private $target_cv = "/var/www/html/frontend/assets/documents/";

    public function __construct($pdo) {
        $this->pdo = $pdo;
        // Créer les dossiers s'ils n'existent pas
        if (!file_exists($this->target_image)) {
            mkdir($this->target_image, 0777, true);
        }
        if (!file_exists($this->target_cv)) {
            mkdir($this->target_cv, 0777, true);
        }
    }

    public function updateData($formData) {
        try {
            error_log("Données reçues : " . print_r($formData, true));  // Log des données reçues

            // Texte updates
            if (isset($formData['poste'])) {   
                $data = $formData['poste'];
                $stmt = $this->pdo->prepare("UPDATE Information SET Poste = ? WHERE id = 1");
                return $stmt->execute([$data]);
            }

            if (isset($formData['bio'])) {   
                $data = $formData['bio'];
                $stmt = $this->pdo->prepare("UPDATE Information SET bio = ? WHERE id = 1");
                return $stmt->execute([$data]);
            }

            if (isset($formData['email'])) {
                $data = $formData['email'];
                $stmt = $this->pdo->prepare("UPDATE Information SET Email = ? WHERE id = 1");
                return $stmt->execute([$data]);
            }

            if (isset($formData['telephone'])) {
                $data = $formData['telephone'];
                $stmt = $this->pdo->prepare("UPDATE Information SET Telephone = ? WHERE id = 1");
                return $stmt->execute([$data]);
            }

            if (isset($formData['age'])) {
                $data = $formData['age'];
                $stmt = $this->pdo->prepare("UPDATE Information SET Age = ? WHERE id = 1");
                return $stmt->execute([$data]);
            }

            if (isset($formData['ville'])) {
                $data = $formData['ville'];
                $stmt = $this->pdo->prepare("UPDATE Information SET Ville = ? WHERE id = 1");
                return $stmt->execute([$data]);
            }

            // File uploads
            if (isset($_FILES["image"])) {
                $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
                $target_file = $this->target_image . "profile." . $imageFileType;

                if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                    $photo_path = "../frontend/assets/image/profile." . $imageFileType;
                    $stmt = $this->pdo->prepare("UPDATE Information SET Photo = ? WHERE id = 1");
                    return $stmt->execute([$photo_path]);
                }
            }

            if (isset($_FILES["cv"])) {
                $target_file = $this->target_cv . "cv.pdf";

                if (move_uploaded_file($_FILES["cv"]["tmp_name"], $target_file)) {
                    $cv_path = "../frontend/assets/documents/cv.pdf";
                    $stmt = $this->pdo->prepare("UPDATE Information SET Cv = ? WHERE id = 1");
                    return $stmt->execute([$cv_path]);
                }
            }

            if (isset($formData['veille'])) {
                $data = $formData['veille'];
                $stmt = $this->pdo->prepare("UPDATE Veille SET Veille = ? WHERE id = 1");
                return $stmt->execute([$data]);
            }

            if (isset($formData['titre_diplome']) && isset($formData['periode_diplome']) && isset($formData['ecole_diplome'])) 
            {
                $data1 = $formData['titre_diplome'];
                $data2 = $formData['periode_diplome'];
                $data3 = $formData['ecole_diplome'];
                $stmt = $this->pdo->prepare("INSERT INTO Diplome (Titre, Periode, Ecole) VALUES (?, ?, ?)");
                return $stmt->execute([$data1,$data2,$data3]);  
            }

            if (isset($formData['titre_experience']) && isset($formData['periode_experience']) && isset($formData['nom_experience'])) 
            {
                $data1 = $formData['titre_experience'];
                $data2 = $formData['periode_experience'];
                $data3 = $formData['nom_experience'];
                $stmt = $this->pdo->prepare("INSERT INTO Experience (Titre, Periode, Entreprise) VALUES (?, ?, ?)");
                return $stmt->execute([$data1,$data2,$data3]);  
            }


            error_log("Les champs du diplôme ne sont pas tous présents");
            return false;
        }
        catch (PDOException $e) {
            error_log("Erreur SQL: " . $e->getMessage());
            return false;
        }
    }
}
?>