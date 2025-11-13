<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $company = htmlspecialchars($_POST["company"]);
    $date = htmlspecialchars($_POST["date"]);
    $message = htmlspecialchars($_POST["message"]);

    $to = "onene244@gmail.com";
    $subject = "Contact Form Message from $name";
    $body = "Name: $name\nEmail: $email\nCompany: $company\nDate: $date\n\nMessage:\n$message";
    $headers = "From: $email";

    if(mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message sent successfully!'); window.location.href='contact.html';</script>";
    } else {
        echo "<script>alert('Failed to send message.'); window.location.href='contact.html';</script>";
    }
} else {
    echo "<script>alert('Invalid request.'); window.location.href='contact.html';</script>";
}
?>
