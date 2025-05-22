<?php
$tokens = ceil(strlen($userInput) / 4);
$ip = $_SERVER['REMOTE_ADDR'];
$now = time();
$db = new SQLite3(__DIR__ . '/data/usage.db');

// === TOKEN TRACKING ===
$db->exec('CREATE TABLE IF NOT EXISTS usage (
    id INTEGER PRIMARY KEY,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    tokens_used INTEGER
)');
$stmt = $db->prepare('INSERT INTO usage (tokens_used) VALUES (:tokens)');
$stmt->bindValue(':tokens', $tokens, SQLITE3_INTEGER);
$stmt->execute();

$totalTokens = $db->querySingle('SELECT SUM(tokens_used) FROM usage');
$tokenLimit = 1000000;
if ($totalTokens > $tokenLimit) {
    respond('Token limit exceeded');
    exit;
}

// === REQUEST RATE LIMITING ===
$db->exec('CREATE TABLE IF NOT EXISTS request_limits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip TEXT,
    timestamp INTEGER
)');

// Clean entries older than 24 hours (for daily limit)
$dayAgo = $now - 86400;
$db->exec("DELETE FROM request_limits WHERE timestamp < $dayAgo");

// Count requests in last 60 seconds (10 RPM)
$minuteAgo = $now - 60;
$stmt = $db->prepare("SELECT COUNT(*) as count FROM request_limits WHERE ip = :ip AND timestamp >= :ts");
$stmt->bindValue(':ip', $ip, SQLITE3_TEXT);
$stmt->bindValue(':ts', $minuteAgo, SQLITE3_INTEGER);
$rpm = $stmt->execute()->fetchArray(SQLITE3_ASSOC)['count'] ?? 0;

// Count all requests in last 24 hours (500/day)
$stmt = $db->prepare("SELECT COUNT(*) as total FROM request_limits WHERE timestamp >= :ts");
$stmt->bindValue(':ts', $dayAgo, SQLITE3_INTEGER);
$totalToday = $stmt->execute()->fetchArray(SQLITE3_ASSOC)['total'] ?? 0;

// Apply limits
if ($rpm >= 10) {
    http_response_code(429);
    respond('Rate limit exceeded: Max 10 requests per minute.');
    exit;
}

if ($totalToday >= 500) {
    http_response_code(429);
    respond('Daily limit exceeded: Max 500 requests per day.');
    exit;
}

// Log this request
$stmt = $db->prepare("INSERT INTO request_limits (ip, timestamp) VALUES (:ip, :ts)");
$stmt->bindValue(':ip', $ip, SQLITE3_TEXT);
$stmt->bindValue(':ts', $now, SQLITE3_INTEGER);
$stmt->execute();
