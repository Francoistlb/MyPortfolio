<?php

class UpdateDataController {
    private $pdo;
    private $target_image = "/var/www/html/assets/image/";
    private $target_cv = "/var/www/html/assets/documents/";
    private $target_competence = "/var/www/html/assets/competences/";
    private $target_technologie = "/var/www/html/assets/technologies/";
    private $target_projets = "/var/www/html/assets/projets/";
    private $target_recommandation = "/var/www/html/assets/recommandations/";

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
        if (!file_exists($this->target_competence)) {
            error_log("Tentative de création du répertoire: " . $this->target_competence);
            $result = @mkdir($this->target_competence, 0755, true);
            if (!$result) {
                error_log("Échec de création du répertoire. Erreur: " . error_get_last()['message']);
            }
        }
    }

    public function updateData($formData) {
        try {
            error_log("=== Début DataUpdateController::updateData ===");
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

            if (isset($formData['titre_recommandation']) && isset($_FILES['document']) && isset($formData['year'])) {
                $data = $formData['titre_recommandation'];
                $year = $formData['year'];
                
                // Vérifier que le répertoire existe
                if (!file_exists($this->target_recommandation)) {
                    if (!mkdir($this->target_recommandation, 0777, true)) {
                        error_log("Impossible de créer le répertoire pour les recommandations");
                        return false;
                    }
                }

                $target_file = $this->target_recommandation . $_FILES['document']['name'];

                if (move_uploaded_file($_FILES['document']['tmp_name'], $target_file)) {
                    // Chemin pour la base de données
                    $document_path = "/shared-assets/recommandations/" . $_FILES['document']['name'];
                    
                    $stmt = $this->pdo->prepare("INSERT INTO Recommandation (Titre, Url, Annee) VALUES (?, ?, ?)");
                    return $stmt->execute([$data, $document_path, $year]);
                }
                error_log("Échec du téléchargement du document de recommandation");
                return false;
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

            if (isset($formData['nom_competence']) && isset($formData['competence_id'])) {
                error_log("Traitement de la mise à jour de compétence ID: " . $formData['competence_id']);
                
                // Récupérer l'ID de la compétence
                $competence_id = $formData['competence_id'];
                $nom_competence = $formData['nom_competence'];
                
                // Si un fichier d'icône a été téléchargé
                if (isset($_FILES["icone_competence"]) && $_FILES["icone_competence"]["size"] > 0) {
                    error_log("Traitement du fichier d'icône de compétence...");
                    
                    // Vérifier que le répertoire de compétences existe
                    if (!file_exists($this->target_competence)) {
                        if (!mkdir($this->target_competence, 0777, true)) {
                            error_log("Impossible de créer le répertoire cible pour les compétences");
                            return false;
                        }
                    }
                    
                    // Déterminer l'extension du fichier
                    $iconFileType = strtolower(pathinfo($_FILES["icone_competence"]["name"], PATHINFO_EXTENSION));
                    
                    // Simplifier le nom de fichier - utiliser juste le nom de la compétence en minuscules
                    $icon_filename = strtolower(str_replace(' ', '', $nom_competence)) . "." . $iconFileType;
                    $target_file = $this->target_competence . $icon_filename;
                    
                    error_log("Tentative de déplacement du fichier vers: " . $target_file);
                    
                    if (move_uploaded_file($_FILES["icone_competence"]["tmp_name"], $target_file)) {
                        // Chemin complet pour la base de données avec shared-assets
                        $icon_path = "/shared-assets/competences/" . $icon_filename;
                        
                        error_log("Fichier déplacé avec succès, mise à jour de la BD avec chemin: " . $icon_path);
                        
                        // Effectuer la mise à jour - utiliser la colonne 'Image' comme dans votre base de données
                        $stmt = $this->pdo->prepare("UPDATE Competence SET Nom = ?, Image = ? WHERE id = ?");
                        return $stmt->execute([$nom_competence, $icon_path, $competence_id]);
                    } else {
                        error_log("Échec du téléchargement de l'icône de compétence. Erreur: " . error_get_last()['message']);
                        return false;
                    }
                } else {
                    // Mise à jour du nom de la compétence uniquement
                    $stmt = $this->pdo->prepare("UPDATE Competence SET Nom = ? WHERE id = ?");
                    return $stmt->execute([$nom_competence, $competence_id]);
                }
            }

            if (isset($formData['titre_projet'])) {
                $data1 = $formData['titre_projet'];
                $data2 = $formData['description'];
                $data3 = $formData['compt1'];
                $data4 = $formData['compt2'];
                $data5 = $formData['compt3'];
                $data9 = $formData['visiter'];
                $data11 = $formData['code'];
                
                if (isset($_FILES["icone_projet"]) && $_FILES["icone_projet"]["size"] > 0) {
                    // Vérifier que le répertoire de projets existe
                    if (!file_exists($this->target_projets)) {
                        if (!mkdir($this->target_projets, 0777, true)) {
                            error_log("Impossible de créer le répertoire cible pour les projets");
                            return false;
                        }
                    }

                    $iconFileType = strtolower(pathinfo($_FILES["icone_projet"]["name"], PATHINFO_EXTENSION));
                    $icon_filename = strtolower(str_replace(' ', '', $data1)) . "." . $iconFileType;
                    $target_file = $this->target_projets . $icon_filename;
                    
                    if (move_uploaded_file($_FILES["icone_projet"]["tmp_name"], $target_file)) {
                        $data10 = "/shared-assets/projets/" . $icon_filename;
                    }
                }

                if (isset($_FILES["icone_techno1"]) && $_FILES["icone_techno1"]["size"] > 0) {
                    // Vérifier que le répertoire de projets existe
                    if (!file_exists($this->target_projets)) {
                        if (!mkdir($this->target_projets, 0777, true)) {
                            error_log("Impossible de créer le répertoire cible pour les projets");
                            return false;
                        }
                    }
                    
                    $technoFileType = strtolower(pathinfo($_FILES["icone_techno1"]["name"], PATHINFO_EXTENSION));
                    $techno_filename = strtolower(str_replace(' ', '_', $data1)) . "techno1." . $technoFileType;
                    $target_file = $this->target_projets . $techno_filename;
                    
                    if (move_uploaded_file($_FILES["icone_techno1"]["tmp_name"], $target_file)) {
                        $data6 = "/shared-assets/projets/" . $techno_filename;
                    }
                }

                if (isset($_FILES["icone_techno2"]) && $_FILES["icone_techno2"]["size"] > 0) {
                    $technoFileType = strtolower(pathinfo($_FILES["icone_techno2"]["name"], PATHINFO_EXTENSION));
                    $techno_filename = strtolower(str_replace(' ', '_', $data1)) . "techno2." . $technoFileType;
                    $target_file = $this->target_projets . $techno_filename;
                    
                    if (move_uploaded_file($_FILES["icone_techno2"]["tmp_name"], $target_file)) {
                        $data7 = "/shared-assets/projets/" . $techno_filename;
                    }
                }

                if (isset($_FILES["icone_techno3"]) && $_FILES["icone_techno3"]["size"] > 0) {
                    $technoFileType = strtolower(pathinfo($_FILES["icone_techno3"]["name"], PATHINFO_EXTENSION));
                    $techno_filename = strtolower(str_replace(' ', '_', $data1)) . "techno3." . $technoFileType;
                    $target_file = $this->target_projets . $techno_filename;
                    
                    if (move_uploaded_file($_FILES["icone_techno3"]["tmp_name"], $target_file)) {
                        $data8 = "/shared-assets/projets/" . $techno_filename;
                    }
                }

                $stmt = $this->pdo->prepare("INSERT INTO Projet (Titre, Description,Icone, Compt_1, Compt_2, Compt_3, Techno_1, Techno_2, Techno_3, Visiter, Code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                return $stmt->execute([$data1,$data2,$data10,$data3,$data4,$data5,$data6,$data7,$data8,$data9,$data11]);
            }

            if (isset($formData['titre_projet_modif'])) {
                $projetId = $formData['projet_id'];
                $titre = $formData['titre_projet_modif'];
                $description = $formData['description'];
                $compt1 = $formData['compt1'];
                $compt2 = $formData['compt2'];
                $compt3 = $formData['compt3'];
                $visiter = $formData['visiter'];
                $code = $formData['code'];
                
                $updateFields = [];
                $params = [];

                // Mise à jour de l'icône si fournie
                if (isset($_FILES["icone_projet_modif"]) && $_FILES["icone_projet_modif"]["size"] > 0) {
                    if (!file_exists($this->target_projets)) {
                        mkdir($this->target_projets, 0777, true);
                    }

                    $iconFileType = strtolower(pathinfo($_FILES["icone_projet_modif"]["name"], PATHINFO_EXTENSION));
                    $icon_filename = strtolower(str_replace(' ', '', $titre)) . "." . $iconFileType;
                    $target_file = $this->target_projets . $icon_filename;
                    
                    if (move_uploaded_file($_FILES["icone_projet_modif"]["tmp_name"], $target_file)) {
                        $updateFields[] = "Icone = ?";
                        $params[] = "/shared-assets/projets/" . $icon_filename;
                    }
                }

                // Mise à jour des technologies si fournies
                $technoFields = ['icone_techno1' => 'Techno_1', 'icone_techno2' => 'Techno_2', 'icone_techno3' => 'Techno_3'];
                foreach ($technoFields as $fileKey => $dbField) {
                    if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]["size"] > 0) {
                        $technoFileType = strtolower(pathinfo($_FILES[$fileKey]["name"], PATHINFO_EXTENSION));
                        $techno_filename = strtolower(str_replace(' ', '_', $titre)) . $fileKey . "." . $technoFileType;
                        $target_file = $this->target_projets . $techno_filename;
                        
                        if (move_uploaded_file($_FILES[$fileKey]["tmp_name"], $target_file)) {
                            $updateFields[] = "$dbField = ?";
                            $params[] = "/shared-assets/projets/" . $techno_filename;
                        }
                    }
                }

                // Ajout des champs texte à mettre à jour
                $textFields = [
                    'Titre' => $titre,
                    'Description' => $description,
                    'Compt_1' => $compt1,
                    'Compt_2' => $compt2,
                    'Compt_3' => $compt3,
                    'Visiter' => $visiter,
                    'Code' => $code
                ];

                foreach ($textFields as $field => $value) {
                    $updateFields[] = "$field = ?";
                    $params[] = $value;
                }

                // Ajouter l'ID du projet pour la clause WHERE
                $params[] = $projetId;

                // Construire et exécuter la requête
                $sql = "UPDATE Projet SET " . implode(", ", $updateFields) . " WHERE id = ?";
                $stmt = $this->pdo->prepare($sql);
                return $stmt->execute($params);
            }

            // Si aucune condition n'a été exécutée
            error_log("Aucun champ reconnu dans les données");
            return false;

        } catch (PDOException $e) {
            error_log("Erreur PDO dans updateData: " . $e->getMessage());
            return false;
        }
    }
}
?>