<?php
session_start();
// Assuming login validation logic here
// For example, checking username and password
$_SESSION['user_name'] = $username;  // Store username in session
header("Location: home/home.php");    // Redirect to home page
exit;
?>