/**
 * EmailJS Configuration for Agroplay
 * 
 * INSTRUCTIONS:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create an email service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Replace the values below with your actual EmailJS credentials
 */

const EMAIL_CONFIG = {
    // Replace with your EmailJS Service ID
    SERVICE_ID: 'service_your_service_id',
    
    // Replace with your EmailJS Template ID
    TEMPLATE_ID: 'template_your_template_id',
    
    // Replace with your EmailJS Public Key
    PUBLIC_KEY: 'your_public_key',
    
    // Email template content (for reference)
    TEMPLATE_SUBJECT: 'Reset Password - Agroplay',
    
    // Template variables that will be sent to EmailJS
    TEMPLATE_PARAMS: {
        to_email: '', // Will be filled dynamically
        to_name: '', // Will be filled dynamically
        reset_code: '', // Will be filled dynamically
        app_name: 'Agroplay',
        expiry_minutes: '15'
    }
};

// Initialize EmailJS when page loads
function initEmailJS() {
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.PUBLIC_KEY !== 'your_public_key') {
        emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
        console.log('✅ EmailJS initialized successfully');
        return true;
    } else {
        console.warn('⚠️ EmailJS not configured. Please update email-config.js with your credentials');
        return false;
    }
}
