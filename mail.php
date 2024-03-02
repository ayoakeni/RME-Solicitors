<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $message = $_POST['message'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $surname = $_POST['surname'];

    // Change these values to your own
    $to = 'ayoakeni64@gmail.com';
    $subject = 'New Message from Contact Form';
    $headers = 'From: ' . $email . "\r\n" .
               'Reply-To: ' . $email . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    // Send email to recipient
    $success = mail($to, $subject, $message, $headers);

    // Send email confirmation to user
    $user_subject = 'Message Received';
    $user_message = 'Thank you for your message. We have received it and will get back to you as soon as possible.';
    $user_headers = 'From: ayoakeni64@gmail.com' . "\r\n" .
                    'Reply-To: ayoakeni64@gmail.com' . "\r\n" .
                    'X-Mailer: PHP/' . phpversion();

    $user_success = mail($email, $user_subject, $user_message, $user_headers);

    if ($success && $user_success) {
        echo 'Emails sent successfully.';
    } else {
        echo 'Unable to send emails. Please try again later.';
    }
}
?>
