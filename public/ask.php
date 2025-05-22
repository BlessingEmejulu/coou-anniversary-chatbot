<?php
session_start();
header('Content-Type: application/json');
include __DIR__ ."/../functions.php";
include __DIR__ ."/../config.php";


// Get raw input (assuming JSON)
$input = json_decode(file_get_contents('php://input'), true);
$userInput = $input['userInput'] ?? '';

include __DIR__ ."/../sqlite.php";

if (empty($userInput)) {
    http_response_code(400);
    respond('Missing user input.');
}

// Prepare request body
$requestBody = [
    'contents' => [[
        'role' => 'user',
        'parts' => [[
            'text' => $systemPrompt . "\n\nUser question: " . $userInput
        ]]
    ]]
];

// Send POST request to Gemini
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" . urlencode($apiKey);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestBody));

$response = curl_exec($ch);
if (curl_errno($ch)) {
    //echo json_encode(['text' => 'Error contacting Gemini: ' . curl_error($ch)]);
    curl_close($ch);
    respond('Error contacting Gemini');
}

curl_close($ch);
$data = json_decode($response, true);

// Extract and clean result
$reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? ($data['error']['message'] ?? "Sorry, I couldn't find an answer.");
$reply = str_replace('*', '', $reply);

respond($reply);
?>
