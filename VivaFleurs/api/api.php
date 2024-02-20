<?php
// Inclusion de la bibliothèque PHPMailer


header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$servername = "localhost";
$username = "VivaFleurs";
$password = "G([iES5F9k.0)Ft/";
$dbname = "vivafleurs";

$mysqli = new mysqli($servername, $username, $password, $dbname);
if ($mysqli->connect_error) {
    die("Erreur de connexion à la base de données : " . $mysqli->connect_error);
}

function generateCode($email,$pwd) {
    global $mysqli;


    $code = mt_rand(100000, 999999);


    $stmt = $mysqli->prepare("UPDATE codes SET code = ?, status = 0 WHERE email = ? AND password = ?");
    $stmt->bind_param("sss", $code, $email, $pwd);
    if ($stmt->execute()) {

        $from = "enzo.tessier72@gmail.com";
        $to = "enzo.tessier@bts-malraux.net";
        $subject = "sujet test 1";
        $message = "123456";
        $headers = "De :" . $from;
        mail($to,$subject,$message, $headers);



    
        $stmt->close();
        echo json_encode(['success' => true]);
    } else {
        error_log('Erreur lors de l\'exécution de la requête UPDATE : ' . $stmt->error);
        echo json_encode(['error' => 'Erreur lors de la mise à jour du code']);
    }
}

function verifyCode($code) {
    global $mysqli;

    $stmt = $mysqli->prepare("SELECT id FROM codes WHERE code = ? AND status = 0");
    $stmt->bind_param("s", $code);
    $stmt->execute();

    if ($stmt->num_rows > 0) {
        $stmt->close();
        $updateStmt = $mysqli->prepare("UPDATE codes SET status = 1 WHERE code = ?");
        $updateStmt->bind_param("s", $code);
        if ($updateStmt->execute()) {
            $updateStmt->close();
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Erreur lors de la mise à jour du statut']);
            
        }
        return;
    } else {
        echo json_encode(['success' => false]);
        return;
    }
}


function toggleVisibilityAfficher($id,$toggle){
    global $mysqli;
    $toggleBool;

    if($toggle === "on"){
        $toggleBool = 1;
    }else if($toggle === "off"){
        $toggleBool = 0;
    }

    $stmt = $mysqli->prepare("UPDATE produit SET afficher = ? WHERE id_produit = ?;");
    $stmt->bind_param("ss",$toggleBool, $id);
    if($stmt->execute()){
        $stmt->close();
        echo json_encode(['success' => true]);
    }else{
        error_log('Erreur lors de l\'exécution de la requête UPDATE : ' . $stmt->error);
        echo json_encode(['error' => 'Erreur lors du changement d\'etat de l\'affichage']);
    }

}

function toggleVisibilityEvenement($id,$toggle){
    global $mysqli;
    $toggleBool;

    if($toggle === "on"){
        $toggleBool = 1;
    }else if($toggle === "off"){
        $toggleBool = 0;
    }

    $stmt = $mysqli->prepare("UPDATE produit SET evenement = ? WHERE id_produit = ?;");
    $stmt->bind_param("ss",$toggleBool, $id);
    if($stmt->execute()){
        $stmt->close();
        echo json_encode(['success' => true]);
    }else{
        error_log('Erreur lors de l\'exécution de la requête UPDATE : ' . $stmt->error);
        echo json_encode(['error' => 'Erreur lors du changement d\'etat de l\'affichage event']);
    }

}


function ajoutProduit($nom, $description, $composition, $prix, $entretient, $categorie, $photo1, $photo2, $photo3) {
    global $mysqli;
    
    $categorie = intval($categorie);
    $afficher = "1";
    $evenement = "0";

    $stmt = $mysqli->prepare("SELECT MAX(id_photo) AS max_id FROM photo");
    if ($stmt->execute()) {
        $stmt->bind_result($max_id);
        $stmt->fetch();   
        $stmt->close();

        $id_photo = $max_id + 1;
    }


    $stmt = $mysqli->prepare("INSERT INTO `photo` (`id_photo`, `photo1`, `photo2`,`photo3`)
    VALUES (?, ?, ?, ?);");
    $stmt->bind_param("ssss",$id_photo ,$photo1, $photo2, $photo3);
    if ($stmt->execute()) {   
        $stmt->close();
    } else {
        error_log('Erreur lors de l\'exécution de la requête INSERT de la table Photo : ' . $stmt->error);
        echo json_encode(['error' => 'Erreur lors de la mise à jour du code']);
    }

    $stmt = $mysqli->prepare("INSERT INTO `produit` (`nom`, `description`, `prix`, `composition`, `entretien`, `id_categorie`, `id_photo`, `afficher`, `evenement`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
    $stmt->bind_param("sssssssss", $nom, $description, $prix, $composition, $entretient, $categorie, $id_photo, $afficher,$evenement);
    if ($stmt->execute()) {   
        $stmt->close();
        echo json_encode(['success' => true]);
    } else {
        error_log('Erreur lors de l\'exécution de la requête INSERT de la table Produit : ' . $stmt->error);
        echo json_encode(['error' => 'Erreur lors de la mise à jour du code']);
    }
}

function supprimerProduit($id){
    global $mysqli;


    $stmt_photo = $mysqli->prepare("SELECT id_photo FROM produit WHERE id_produit = ?");
    $stmt_photo->bind_param("s", $id);
    $stmt_photo->execute();
    $result = $stmt_photo->get_result();

    $row = $result->fetch_assoc();
    $id_photo = $row['id_photo'];

    $stmt_photo->close();




    $stmt_photo_URL = $mysqli->prepare("SELECT photo1, photo2, photo3 FROM photo WHERE id_photo = ?");
    $stmt_photo_URL->bind_param("s", $id_photo);
    $stmt_photo_URL->execute();
    $result = $stmt_photo_URL->get_result();
    $row = $result->fetch_assoc();
    
    // Supprimer les images du dossier
    foreach ($row as $lien_image) {
        
        if (!empty($lien_image)) {
            // Extraire le nom de fichier de l'URL de l'image
            $nom_fichier = basename($lien_image);
            echo json_encode(['success' => $nom_fichier]);
            // Chemin complet de l'image
            $chemin_image = '../images/' . $nom_fichier;
            // Vérifier si le fichier existe et le supprimer
            if (file_exists($chemin_image)) {
                if (unlink($chemin_image)) {
                    echo "L'image $nom_fichier a été supprimée avec succès.<br>";
                } else {
                    error_log("Une erreur s'est produite lors de la suppression de l'image $nom_fichier");
                    echo json_encode(['error' => "Une erreur s'est produite lors de la suppression de l'image $nom_fichier"]);
                }
            } else {
                error_log("L'image $nom_fichier n'existe pas dans le dossier");
                echo json_encode(['error' => "L'image $nom_fichier n'existe pas dans le dossier"]);
                
            }
        }
    }






    $stmt_produit = $mysqli->prepare("DELETE FROM produit WHERE id_produit = ?");
    $stmt_produit->bind_param("s", $id);
    if($stmt_produit->execute()){
        $stmt_produit->close();

        $stmt_photo = $mysqli->prepare("DELETE FROM photo WHERE id_photo = ?");
        $stmt_photo->bind_param("s", $id_photo);
        if($stmt_photo->execute()){
            $stmt_photo->close();
            echo json_encode(['success' => true]);
        } else {
            error_log('Erreur lors de l\'exécution de la requête DELETE pour les photos : ' . $stmt_photo->error);
            echo json_encode(['error' => 'Erreur lors de la suppression de la photo']);
        }
    } else {
        error_log('Erreur lors de l\'exécution de la requête DELETE pour les produits : ' . $stmt_produit->error);
        echo json_encode(['error' => 'Erreur lors de la suppression du produit']);
    }
}




function modifierProduit($id,$nom, $description, $composition, $prix, $entretient, $categorie, $photo1, $photo2, $photo3) {
    global $mysqli;






    $stmt_photo = $mysqli->prepare("SELECT id_photo FROM produit WHERE id_produit = ?");
    $stmt_photo->bind_param("s", $id);
    $stmt_photo->execute();
    $result = $stmt_photo->get_result();

    $row = $result->fetch_assoc();
    $id_photo = $row['id_photo'];

    $stmt_photo->close();

    

    $categorie = intval($categorie);
    $afficher = "1";
    $evenement = "0";

    if($photo1 != 0 && $photo2 != 0 && $photo3 != 0 ){

        if($photo1 == 0 && $photo2 != 0 && $photo3 != 0){
            $stmt_photo2 = $mysqli->prepare("UPDATE `photo` SET `photo2`=?,`photo3`=? WHERE `id_photo`=?");
            $stmt_photo2->bind_param("sss",  $photo2, $photo3, $id_photo);
        }else if($photo1 != 0 && $photo2 == 0 && $photo3 != 0){
            $stmt_photo2 = $mysqli->prepare("UPDATE `photo` SET `photo1`=?,`photo3`=? WHERE `id_photo`=?");
            $stmt_photo2->bind_param("sss",$photo1, $photo3, $id_photo);
        }else if($photo1 != 0 && $photo2 != 0 && $photo3 == 0){
            $stmt_photo2 = $mysqli->prepare("UPDATE `photo` SET `photo1`=?,`photo2`=? WHERE `id_photo`=?");
            $stmt_photo2->bind_param("sss", $photo1, $photo2, $id_photo);
        }else if($photo1 == 0 && $photo2 == 0 && $photo3 != 0){
            $stmt_photo2 = $mysqli->prepare("UPDATE `photo` SET `photo3`=? WHERE `id_photo`=?");
            $stmt_photo2->bind_param("ss", $photo3, $id_photo);
        }else if($photo1 == 0 && $photo2 != 0 && $photo3 == 0){
            $stmt_photo2 = $mysqli->prepare("UPDATE `photo` SET `photo2`=? WHERE `id_photo`=?");
            $stmt_photo2->bind_param("ss", $photo2, $id_photo);
        }else if($photo1 != 0 && $photo2 == 0 && $photo3 == 0){
            $stmt_photo2 = $mysqli->prepare("UPDATE `photo` SET `photo1`=?, WHERE `id_photo`=?");
            $stmt_photo2->bind_param("ss", $photo1, $id_photo);
        }
        
        
        if($stmt_photo2->execute()){
            $stmt_photo2->close();
        }else{
            error_log('Erreur lors de l\'exécution de la requête UPDATE de la table Photo : ' . $stmt->error);
            echo json_encode(['error' => 'Erreur lors de l\'exécution de la requête UPDATE de la table Photo']);
        }
    }

    $stmt = $mysqli->prepare("UPDATE `produit` SET `nom`=?, `description`=?,`prix`=?, `composition`=?, `entretien`=?, `id_categorie`=?, `id_photo`=?, `afficher`=?, `evenement`=? WHERE `id_produit`=? ;");
    $stmt->bind_param("ssssssssss", $nom, $description, $prix, $composition, $entretient, $categorie, $id_photo, $afficher,$evenement,$id);
    if ($stmt->execute()) {   
        $stmt->close();
        echo json_encode(['success' => true]);
    } else {
        error_log('Erreur lors de l\'exécution de la requête UPDATE de la table Produit : ' . $stmt->error);
        echo json_encode(['error' => 'Erreur lors de l\'exécution de la requête UPDATE de la table Produit']);
    }
 
}


function modifierEvent($image, $titre, $paragraphe ){
    global $mysqli;

    
    $stmt = $mysqli->prepare("UPDATE evenement SET `image` = ?, `titre` = ?, `paragraphe` = ? WHERE id_event = 1;");
    $stmt->bind_param("sss",$image, $titre, $paragraphe);
    if($stmt->execute()){
        $stmt->close();
        echo json_encode(['success' => true]);
    }else{
        error_log('Erreur lors de l\'exécution de la requête UPDATE : ' . $stmt->error);
        echo json_encode(['error' => 'Erreur lors du changement de la page event']);
    }
}

function viewEvent(){
    global $mysqli;


    $stmt_view = $mysqli->prepare("SELECT * FROM evenement");
    if($stmt_view->execute()){
        $stmt_view->bind_result($image, $titre, $paragraphe);

        $results = array();
        
        while ($stmt_view->fetch()) {
            $results[] = array(
                'image' => $image,
                'titre' => $titre,
                'paragraphe' => $paragraphe
            );
        }
        
        $stmt_view->close();
        
        echo json_encode($results);
    }else{
        error_log('Erreur lors de l\'exécution de la requête UPDATE : ' . $stmt->error);
        echo json_encode(['error' => 'Erreur lors du changement de la page event']);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    switch ($action) {
        case 'generateCode':
            generateCode($_POST['email'],$_POST['password']);
            break;
        case 'ajoutProduit':


            $images = array();
            foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
                $file_name = $_FILES['images']['name'][$key];
                $file_tmp = $_FILES['images']['tmp_name'][$key];
                $destination = '../images/' . $file_name;
                move_uploaded_file($file_tmp, $destination);
                $images[] = 'http://localhost/vivafleur/images/'.$file_name;
            }

            ajoutProduit($_POST['nom'],$_POST['description'],$_POST['composition'],$_POST['prix'],$_POST['entretient'],$_POST['categorie'],$images[0],$images[1],$images[2]);
            break;
        case 'verifyCode':
            verifyCode($_POST['code']);
            break;
        case 'toggleVisibilityAfficher':
            toggleVisibilityAfficher($_POST['id'], $_POST['toggle']);
            break;
        case 'toggleVisibilityEvenement':
            toggleVisibilityEvenement($_POST['id'], $_POST['toggle']);
            break;
        case 'supprimerProduit':
            supprimerProduit($_POST['id']);
            break;
        case 'modifierEvent':
            modifierEvent($_POST['image'],$_POST['titre'],$_POST['paragraphe']);
            break;
        case 'viewEvent':
            viewEvent();
            break;
        case 'modifierProduit':


            $images = array();
            $count = count($_POST['num_images']);
            $j=0;
            for ($i = 0; $i < $count; $i++) {
                if($_POST['num_images'][$i]== 1){
                    if (is_uploaded_file($_FILES['images']['tmp_name'][$j])) {
                        // Si c'est un fichier, traiter normalement
                        $file_name = $_FILES['images']['name'][$j];
                        $file_tmp = $_FILES['images']['tmp_name'][$j];
                        $destination = '../images/' . $file_name;
                        move_uploaded_file($file_tmp, $destination);
                        $images[$i] = 'http://localhost/vivafleur/images/' . $file_name;
                        $j++;
                    }
                } else {
                    $images[$i] = 0;
                }
            }



            
            modifierProduit($_POST['id'], $_POST['nom'], $_POST['description'], $_POST['composition'], $_POST['prix'], $_POST['entretient'], $_POST['categorie'], $images[0], $images[1], $images[2]);
            break;
        default:
            echo json_encode(['error' => 'Action inconnue']);
            break;
    }
}

$mysqli->close();
?>
