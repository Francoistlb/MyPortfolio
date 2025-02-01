<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $target_dir = "/var/www/html/assets/used/";
    $upload_status = "error";
    
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    require_once "connexionBdd.php";

    if(isset($_FILES["profile_image"])) {
        try {
            $imageFileType = strtolower(pathinfo($_FILES["profile_image"]["name"], PATHINFO_EXTENSION));
            $target_file = $target_dir . "profile." . $imageFileType;

            if (move_uploaded_file($_FILES["profile_image"]["tmp_name"], $target_file)) {
                $photo_path = "/assets/used/profile." . $imageFileType;
                
                $stmt = $pdo->prepare("UPDATE Profil SET `Photo profil` = ? WHERE id = 1");
                if($stmt->execute([$photo_path])) {
                    $upload_status = "success";
                }
            }
        } catch (PDOException $e) {
            $upload_status = "db_error_photo";
        }
    }

    if(isset($_FILES["cv_file"])) {
        try {
            $target_file = $target_dir . "cv.pdf";

            if (move_uploaded_file($_FILES["cv_file"]["tmp_name"], $target_file)) {
                $cv_path = "/assets/used/cv.pdf";
                
                $stmt = $pdo->prepare("UPDATE Profil SET `Curriculum vitae` = ? WHERE id = 1");
                if($stmt->execute([$cv_path])) {
                    $upload_status = "success";
                }
            }
        } catch (PDOException $e) {
            $upload_status = "db_error_cv";
        }
    }

    header("Location: http://localhost:8080/administration.html?status=" . $upload_status);
    exit();
}
?> 