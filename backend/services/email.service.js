const nodemailer = require('nodemailer');

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
        user: 'kazemwebdev@gmail.com',
        pass: 'szpoxyohpxtoilfg'
    }
});

// Function to send the password reset email

async function sendPasswordResetEmailToUser(email, token) {
    const mailOptions = {
        from: 'kazemwebdev@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `<p>Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>`
        // http://avigailtamuz.onrender.com/reset-password/${token}  for the production 
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
}

module.exports = {
    sendPasswordResetEmailToUser
};
