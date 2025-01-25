<?php
session_start();
if (!isset($_SESSION['user_name'])) {
    // If the session is not set (user is not logged in), redirect to login
    header("Location: ../login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">

    <!-- Link to External CSS -->
    <link rel="stylesheet" href="home.css">
</head>
<body>
    <div class="quote" id="quote"></div>
    <h1>Welcome to the Dashboard, <?php echo $_SESSION['user_name']; ?>!</h1>
    <span id="username">Is, <?php echo $_SESSION['user_name']; ?>! Ready to achieve!!</span>

    <div class="navigation">
        <a href="../tic-tac-toe/game.html">Tic Tac Toe</a>
        <a href="../todo-list/todo.html">To-Do List</a>
        <a href="../note-taker/index.html">Take Notes</a> 
    </div>

    <a href="../logout.php" class="logout">Logout</a>

    <!-- Link to External JavaScript -->
    <script src="home.js"></script>
</body>
</html>


