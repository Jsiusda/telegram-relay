<?php
header("Content-Type: application/json");

$token = "8527435443:AAFCaga7kI8KkQmlrN9U2HFqnrNSV3cLkVU"; 
$chat_id = "@KotNudExp";

// Leer datos enviados desde tu web
$data = json_decode(file_get_contents("php://input"), true);

$photo = $data["foto"] ?? "";
$caption = $data["mensaje"] ?? "";
$button = $data["boton"] ?? "";

$reply_markup = json_encode([
  "inline_keyboard" => [
    [
      ["text" => "⬇ DESCARGAR AHORA", "url" => $button]
    ]
  ]
]);

$url = "https://api.telegram.org/bot$token/sendPhoto";

$post = [
  "chat_id" => $chat_id,
  "photo" => $photo,
  "caption" => $caption,
  "reply_markup" => $reply_markup
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if (curl_errno($ch)) {
  echo json_encode(["error" => curl_error($ch)]);
  exit;
}

curl_close($ch);
echo $response;
