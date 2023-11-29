<!-- server/index.php -->
<?php
header("Content-Type: application/json");

// Simulating database interactions
$users = [
    ["user_id" => 1, "username" => "user1", "role" => "project manager"],
    ["user_id" => 2, "username" => "user2", "role" => "team member"],
    // Add more data as needed
];

echo json_encode($users);
?>
