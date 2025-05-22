<?php 

function respond($reply="We are not responding to requests at this time.") {
    echo json_encode(['text' => $reply]);
    exit;
}