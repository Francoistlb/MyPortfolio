<?php

class ModifData {
    private $pdo;
    private $target_image = "/var/www/html/assets/image/";
    private $target_cv = "/var/www/html/assets/documents/";

    public function __construct($pdo) {
        $this->pdo = $pdo;
        // Créer les dossiers s'ils n'existent pas avec plus de détails sur les erreurs
        if (!file_exists($this->target_image)) {
            error_log("Tentative de création du répertoire: " . $this->target_image);
            $result = @mkdir($this->target_image, 0755, true);
            if (!$result) {
                error_log("Échec de création du répertoire. Erreur: " . error_get_last()['message']);
            }
        }
        if (!file_exists($this->target_cv)) {
            error_log("Tentative de création du répertoire: " . $this->target_cv);
            $result = @mkdir($this->target_cv, 0755, true);
            if (!$result) {
                error_log("Échec de création du répertoire. Erreur: " . error_get_last()['message']);
            }
        }
    }

    public function updateData($formData) {
        try {
            error_log("=== Début ModifData::updateData ===");
            error_log("Données reçues dans updateData: " . print_r($formData, true));
            error_log("Action: " . ($_GET['action'] ?? 'non spécifiée'));
            
            // Débogage des fichiers (à ajouter avant les conditions)
            error_log("FILES reçu: " . print_r($_FILES, true));
            
            // Vérification du répertoire de destination des images
            error_log("Le répertoire cible existe-t-il? " . (file_exists($this->target_image) ? 'Oui' : 'Non'));
            error_log("Permissions du répertoire cible: " . substr(sprintf('%o', fileperms($this->target_image)), -4));

            // Vérification des données requises
            if (!isset($formData['form_id'])) {
                error_log("Erreur: form_id manquant");
                return false;  // Retour simplifié
            }

            // Texte updates
            if (isset($formData['poste'])) {   
                $data = $formData['poste'];
                $stmt = $this->pdo->prepare("UPDATE Information SET Poste = ? WHERE id = 1");
                return $stmt->execute([$data]);  // Retour direct du résultat de l'exécution
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

            // Ajoutez ceci juste avant le traitement de $_FILES["image"]
            if (isset($_FILES)) {
                error_log("Fichiers reçus : " . print_r($_FILES, true));
            }

            if (isset($_FILES["image"])) {
                error_log("Traitement de l'image...");
                
                // Vérifier que le répertoire backend existe et le créer si nécessaire
                if (!file_exists($this->target_image)) {
                    if (!mkdir($this->target_image, 0777, true)) {
                        error_log("Impossible de créer le répertoire cible backend");
                        return false;
                    }
                }
                
                $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
                $target_file = $this->target_image . "profile." . $imageFileType;
                
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                    // Chemin pour la base de données - ajusté pour le frontend
                    $photo_path = "/shared-assets/image/profile." . $imageFileType;
                    
                    $stmt = $this->pdo->prepare("UPDATE Information SET Photo = ? WHERE id = 1");
                    return $stmt->execute([$photo_path]);
                } else {
                    error_log("Échec du téléchargement de l'image");
                    return false;
                }
            }

            if (isset($_FILES["cv"])) {
                $target_file = $this->target_cv . "cv.pdf";

                if (move_uploaded_file($_FILES["cv"]["tmp_name"], $target_file)) {
                    // Chemin pour la base de données
                    $cv_path = "/shared-assets/documents/cv.pdf";
                    
                    $stmt = $this->pdo->prepare("UPDATE Information SET Cv = ? WHERE id = 1");
                    return $stmt->execute([$cv_path]);
                }
            }

            if (isset($formData['veille'])) {
                $data = $formData['veille'];
                $stmt = $this->pdo->prepare("UPDATE Information SET Veille = ? WHERE id = 1");
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

            // Si aucune condition n'a été exécutée
            error_log("Aucun champ reconnu dans les données");
            return false;

        } catch (PDOException $e) {
            error_log("Erreur PDO dans updateData: " . $e->getMessage());
            return false;
        } catch (Exception $e) {
            error_log("Exception dans updateData: " . $e->getMessage());
            return false;
        }
    }
}
?>