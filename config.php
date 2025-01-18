<?php
// config.php

// Database connection details
$host = 'localhost'; 
$db_name = 'diploma_db'; 
$username = 'root'; 
$password = ''; 

// Create a connection
$conn = new mysqli($host, $username, $password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
