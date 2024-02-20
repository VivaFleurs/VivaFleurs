<?php
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Connexion à la base de données MySQL
$servername = "localhost";
$username = "VivaFleurs";
$password = "G([iES5F9k.0)Ft/";
$dbname = "vivafleurs";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Requête SQL pour récupérer des données (par exemple, tous les enregistrements de la table "ma_table")
$sql = "SELECT 
p.id_produit,
p.nom,
p.description,
p.prix,
p.composition,
p.entretien,
p.afficher,
p.evenement,
ph.photo1,
ph.photo2,
ph.photo3,
c.libelle AS categorie
FROM 
produit p
INNER JOIN 
photo ph ON p.id_photo = ph.id_photo
INNER JOIN 
categorie c ON p.id_categorie = c.id;";
$stmt = $conn->prepare($sql);

// Exécute la requête
$stmt->execute();

// Récupère le résultat
$result = $stmt->get_result();

// Convertir les résultats en un tableau associatif
$rows = array();
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

// Fermer la connexion à la base de données
$conn->close();

// Retourner les données au format JSON
header('Content-Type: application/json');
echo json_encode($rows);
?>
