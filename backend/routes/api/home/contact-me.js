const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');

// API that emails my personal email address using a
// gmail account created for the site. The email subject
// will say who submitted a contact form. The email body
// will contain the message the user submitted.
router.post('/', function(req, res, next) {
    if (
        req.body.fromName
        && req.body.fromEmail
        && req.body.message
    ) {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.CONTACT_EMAIL_ADDRESS,
                pass: process.env.CONTACT_EMAIL_PASSWORD,
            }
        });
        const mailOptions = {
            to: process.env.MY_EMAIL_ADDRESS,
            subject: req.body.fromName + ' - ' + req.body.fromEmail,
            text: req.body.message
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(
                    'Email for %s - %s failed to send: %s',
                    req.body.fromName,
                    req.body.fromEmail,
                    error
                );
                res.json({
                    'error': true,
                    'message': error,
                });
            } else {
                console.log(
                    'Email sent for %s - %s',
                    req.body.fromName,
                    req.body.fromEmail
                );
                res.json({
                    'error': false,
                    'message': '',
                });
            }
        });
    } else {
        res.json({
            'error': true,
            'message': 'The correct req body parameters were not submitted.'
        });
    }
});

module.exports = router;