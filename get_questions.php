<?php
$serverName = "localhost";
$dbName = "ct0051";
$username = "ct0051";
$password = "hLyK3KsnEd3yzbRvzWME";

$conn = mysqli_connect($serverName, $username, $password, $dbName);

if(!$conn){
    die(json_encode(['error' => mysqli_connect_error()]));
}

$result = mysqli_query($conn, "SELECT * FROM quiz_questions");
$questions = [];
$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);

foreach($rows as $row){
    $questions[] = [
        'question' => $row['question'],
        'imagePath' => $row['image_path'],
        'options' => [$row['option1'], $row['option2'], $row['option3'], $row['option4']],
        'answer' => $row['answer']
    ];
}

echo json_encode($questions);
mysqli_close($conn);
?>