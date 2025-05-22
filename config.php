<?php
$envPath = __DIR__ . '/.env';
if (!file_exists($envPath)) {
    respond();
}

$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    if (str_starts_with(trim($line), '#')) continue;
    list($key, $value) = explode('=', $line, 2);
    putenv(trim($key) . '=' . trim($value));
}

$apiKey = getenv('GEMINI_API_KEY');

if (!$apiKey) {
    respond();
}

$promptFile = __DIR__ . '/model_data.txt';
if (!file_exists($promptFile)) {
    http_response_code(500);
    respond();
}
$systemPrompt = file_get_contents($promptFile);

