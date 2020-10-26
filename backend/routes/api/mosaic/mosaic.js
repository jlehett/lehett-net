const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const rimraf = require('rimraf');
const spawn = require('child_process').spawn;
const base64Img = require('base64-img');
const nodeMailer = require('nodemailer');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 100000000},
}).single('img');

// Function to actually send the email via the transporter and log successes / errors
const sendEmail = (transporter, mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(
                'Photographic Mosaic Email Failed to Send - %s',
                error
            );
        } else {
            console.log(
                'Photographic Mosaic Email Sent!'
            );
        }
    });
}

// Function to email user the generated image
const emailImageToUser = (emailTo, img) => {
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
        to: emailTo,
        subject: 'Your Generated Mosaic from Lehett.net',
        text: 'Attached is your generated photographic mosaic! Enjoy!',
        attachments: [
            {
                path: img,
            }
        ]
    };
    sendEmail(transporter, mailOptions);
};

// Function to email user the error state
const emailErrorToUser = (emailTo, err) => {
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
        to: emailTo,
        subject: 'Error Generating Your Mosaic from Lehett.net',
        text: 'We ran into an issue while trying to generate your image. If you are using a big image, ' +
            'try scaling down the ouput image scale in the settings page of the site. Sorry for the inconvenience!',
    };
    sendEmail(transporter, mailOptions);
}

// API that will generate the requested mosaic given the
// image and the Bing search query.
router.post('/generate-mosaic/', function(req, res, next) {
    upload(req, res, (err) => {
        req.connection.setTimeout(60*60*1000);
        if (req.body.emailTo) {
            res.json({
                error: false,
                data: '',
            });
        };

        const uploadedImgPath = req.file.path;
        const randomKey = crypto.randomBytes(20).toString('hex');
        const rootFilepath = 'bin/mosaic/public/' + randomKey;
        const ls = spawn(
            'python3.7',
            [
                'bin/mosaic/mosaic-generation.py',
                req.body.bingSearch,
                uploadedImgPath,
                randomKey,
                req.body.numImages,
                req.body.tilingImageScale,
                req.body.outputImageScale,
            ]
        );
        ls.on('close', () => {
            let error = false;
            if (ls.exitCode) {
                error = true;
            }
            base64Img.base64(
                path.join(__dirname, '../../../', rootFilepath, '/output.png'),
                function(err, data) {
                    if (req.body.emailTo) {
                        if (err) {
                            emailErrorToUser(req.body.emailTo, err);
                        } else {
                            emailImageToUser(req.body.emailTo, data);
                        }
                    } else {
                        res.json({
                            error: !!error || !!err,
                            data,
                        });
                    }
                    rimraf(rootFilepath, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Deleted working folder...');
                        }
                    });
                    rimraf(uploadedImgPath, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Deleted uploaded image...');
                        }
                    });
                }
            );
        });
        ls.stdout.on('data', (data) => {
            console.log(`${data}`);
        });
        ls.stderr.on('data', (data) => {
            console.log(`${data}`);
        });
    });
});

module.exports = router;