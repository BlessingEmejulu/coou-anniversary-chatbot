<?php
include __DIR__ ."/../config.php";

//security here!!
$secret = getenv('DEPLOY_SECRET'); // Match this in GitHub webhook settings

$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
$payload = file_get_contents('php://input');

$hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);

if (!hash_equals($signature, $hash)) {
    http_response_code(403);
    echo "Invalid signature";
    exit;
}

//do the git magic
$repoDir = getenv('DEPLOY_PATH');
$logFile = '/tmp/deploy.log';

$cmd = "cd $repoDir && git stash && git pull";
$output = shell_exec($cmd);

file_put_contents($logFile, "=== Deploy triggered at " . date('c') . " ===\n", FILE_APPEND);
file_put_contents($logFile, $output . "\n", FILE_APPEND);

echo "$output";

echo "✅ Deployment completed.";
