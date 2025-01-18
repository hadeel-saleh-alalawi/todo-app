<?php
// auth.php
session_start();
require_once('../config.php'); // Include the DB connection

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = $_POST['action'];

    if ($action === "login") {
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Check if email exists
        $stmt = $conn->prepare("SELECT id, fullname, email, password FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            // Verify password
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['fullname'];
                header("Location: ../home/home.php");
                exit();
            } else {
                header("Location: ../login/login-signup.html?message=Invalid+email+or+password");
                exit();
            }
        } else {
            header("Location: ../login/login-signup.html?message=Invalid+email+or+password");
            exit();
        }
    } elseif ($action === "signup") {
        $fullname = $_POST['fullname'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Check if email already exists
        $stmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows > 0) {
            header("Location: ../login/login-signup.html?message=Email+already+exists");
            exit();
        }

        // Insert user
        $stmt = $conn->prepare("INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $fullname, $email, $hashedPassword);

        if ($stmt->execute()) {
            header("Location: ../login/login-signup.html?message=You+can+now+login");
            exit();
        } else {
            header("Location: ../login/login-signup.html?message=Error+signing+up");
            exit();
        }
    }
}
?>

